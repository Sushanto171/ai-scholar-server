const Stripe = require("stripe");
const mongoose = require("mongoose");
const Course = require("../../models/Course");
const User = require("../../models/User");
const CoursePurchase = require("../../models/CoursePurchase");
const StudentCourses = require("../../models/StudentCourses");

// INITIALIZE STRIPE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * =====================================================
 * CREATE PAYMENT INTENT FOR COURSE PURCHASE
 * =====================================================
 */
const createPaymentIntent = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // VALIDATE REQUIRED INPUTS
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "COURSE ID AND USER ID ARE REQUIRED",
      });
    }

    // FETCH COURSE AND USER DETAILS
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({
        success: false,
        message: "COURSE OR USER NOT FOUND",
      });
    }

    // CREATE STRIPE PAYMENT INTENT
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.pricing * 100), // STRIPE EXPECTS AMOUNT IN CENTS
      currency: "usd",
      metadata: {
        courseId: course._id.toString(),
        userId: user._id.toString(),
        userName: user.name,
        userEmail: user.email,
        courseTitle: course.title,
        courseImage: course.image,
        coursePricing: course.pricing,
        courseCategory: course.category,
        courseLevel: course.level,
        primaryLanguage: course.primaryLanguage,
        enrolledStudent: course.enrolled,
        instructorName: course.instructor.instructorName,
        instructorEmail: course.instructor.instructorEmail,
      },
      description: `PURCHASE OF ${course.title}`,
    });

    // RETURN CLIENT SECRET AND COURSE DETAILS TO FRONTEND
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
    console.error("PAYMENT INTENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "FAILED TO CREATE PAYMENT INTENT",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  }
};

/**
 * =====================================================
 * CONFIRM PAYMENT AND UPDATE DATABASE RECORDS
 * =====================================================
 */
const confirmPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentIntentId } = req.body;

    // RETRIEVE PAYMENT DETAILS FROM STRIPE
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // VERIFY IF PAYMENT WAS SUCCESSFUL
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: "PAYMENT NOT COMPLETED",
      });
    }

    const { metadata } = paymentIntent;
    const amount = paymentIntent.amount / 100;

    // VALIDATE NECESSARY METADATA FROM STRIPE
    if (!metadata.courseId || !metadata.userId) {
      throw new Error("MISSING REQUIRED METADATA IN PAYMENT INTENT");
    }

    // 1. SAVE COURSE PURCHASE RECORD
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
          courseId: metadata.courseId,
          courseImage: metadata.courseImage,
          courseTitle: metadata.courseTitle,
          coursePricing: amount,
          courseCategory: metadata.courseCategory,
          courseLevel: metadata.courseLevel,
          paymentId: paymentIntent.id,
        },
      ],
      { session }
    );

    // 2. ADD COURSE TO STUDENT'S ENROLLED COURSES
    await StudentCourses.findOneAndUpdate(
      { userId: metadata.userId },
      {
        $push: {
          courses: {
            courseId: metadata.courseId,
            courseTitle: metadata.courseTitle,
            courseImage: metadata.courseImage,
            coursePricing: amount,
            courseCategory: metadata.courseCategory,
            courseLevel: metadata.courseLevel,
            primaryLanguage: metadata.primaryLanguage,
            enrolledStudent: metadata.enrolledStudent,
            instructorName: metadata.instructorName,
            instructorEmail: metadata.instructorEmail,
            dateOfPurchase: new Date(),
          },
        },
      },
      { upsert: true, session }
    );

    // 3. INCREMENT ENROLLMENT COUNT IN COURSE
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

    // COMMIT TRANSACTION IF EVERYTHING SUCCEEDS
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "PAYMENT CONFIRMED AND RECORDS UPDATED",
      courseId: metadata.courseId,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("PAYMENT CONFIRMATION ERROR:", error);
    res.status(500).json({
      success: false,
      message: "FAILED TO CONFIRM PAYMENT",
      error: process.env.NODE_ENV === "development" ? error.message : null,
    });
  } finally {
    session.endSession();
  }
};

// EXPORT CONTROLLER FUNCTIONS
module.exports = {
  createPaymentIntent,
  confirmPayment,
};