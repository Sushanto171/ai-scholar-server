const Stripe = require("stripe");
const mongoose = require("mongoose");
const Course = require("../../models/Course");
const User = require("../../models/User");
const CoursePurchase = require("../../models/CoursePurchase");
const StudentCourses = require("../../models/StudentCourses");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
const createPaymentIntent = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Validate inputs
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and User ID are required",
      });
    }

    // Get course and user details
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({
        success: false,
        message: "Course or user not found",
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.pricing * 100), // Convert to cents
      currency: "usd",
      metadata: {
        courseId: course._id.toString(),
        userId: user._id.toString(),
        userName: user.name,
        userEmail: user.email,
        courseTitle: course.title,
        courseImage: course.image,
        instructorName: course.instructor.instructorName,
        instructorEmail: course.instructor.instructorEmail,
      },
      description: `Purchase of ${course.title}`,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      courseDetails: {
        id: course._id.toString(),
        title: course.title,
        image: course.image,
        price: course.pricing,
        instructor: course.instructor.instructorName,
      },
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

// Confirm Payment and Update Database
const confirmPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentIntentId } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const { metadata } = paymentIntent;
    const amount = paymentIntent.amount / 100;

    // Validate required metadata
    if (!metadata.courseId || !metadata.userId) {
      throw new Error("Missing required metadata in payment intent");
    }

    // 1. Create purchase record
    await CoursePurchase.create(
      [
        {
          userId: metadata.userId,
          userName: metadata.userName,
          userEmail: metadata.userEmail,
          paymentStatus: "completed",
          orderDate: new Date(),
          instructorName: metadata.instructorName,
          instructorEmail: metadata.instructorEmail,
          courseImage: metadata.courseImage,
          courseTitle: metadata.courseTitle,
          courseId: metadata.courseId,
          coursePricing: amount,
          paymentId: paymentIntent.id,
        },
      ],
      { session }
    );

    // 2. Update student courses
    await StudentCourses.findOneAndUpdate(
      { userId: metadata.userId },
      {
        $push: {
          courses: {
            courseId: metadata.courseId,
            title: metadata.courseTitle,
            instructorName: metadata.instructorName,
            instructorEmail: metadata.instructorEmail,
            dateOfPurchase: new Date(),
            courseImage: metadata.courseImage,
          },
        },
      },
      { upsert: true, session }
    );

    // 3. Update course enrollment
    await Course.findByIdAndUpdate(
      metadata.courseId,
      {
        $inc: { enrolled: 1 },
        $addToSet: {
          students: {
            studentId: metadata.userId,
            studentName: metadata.userName,
            studentEmail: metadata.userEmail,
            paidAmount: amount,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Payment confirmed and records updated",
      courseId: metadata.courseId,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Payment confirmation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
};
