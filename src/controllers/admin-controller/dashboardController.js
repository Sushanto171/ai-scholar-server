const Course = require("../../models/Course");
const User = require("../../models/User");
const CoursePurchase = require("../../models/CoursePurchase");
const { sendResponse } = require("../../utils/responseHandler");

/* ============================================================
   🔸 HELPER FUNCTION - GET LAST 12 MONTHS DATA
=============================================================== */
const getLast12MonthsData = async (model) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const last12Months = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );

    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    let revenue = 0;

    if (model === CoursePurchase) {
      const result = await model.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$coursePricing" },
          },
        },
      ]);

      if (result.length > 0) {
        revenue = result[0].total;
      }
    }

    last12Months.push({
      month: `${monthName} ${year}`,
      count,
      revenue,
    });
  }

  return last12Months;
};

/* ============================================================
   🔸 HELPER FUNCTION - GET DASHBOARD STATS
=============================================================== */
const getStats = async () => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalInstructors = await User.countDocuments({ role: "instructor" });
    const totalStudents = await User.countDocuments({ role: "student" });

    const revenueResult = await CoursePurchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$coursePricing" },
        },
      },
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    return {
      totalCourses,
      totalInstructors,
      totalStudents,
      totalRevenue,
    };
  } catch (error) {
    console.error("ERROR FETCHING DASHBOARD STATS:", error);
    throw error;
  }
};

/* ============================================================
   🔸 HELPER FUNCTION - GET CHARTS DATA
=============================================================== */
const getCharts = async () => {
  try {
    const enrollmentData = await getLast12MonthsData(CoursePurchase);
    const revenueData = await getLast12MonthsData(CoursePurchase);

    const categoryData = await Course.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0,
        },
      },
    ]);

    const roleData = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0,
        },
      },
    ]);

    return {
      enrollmentData,
      revenueData,
      categoryData,
      roleData,
    };
  } catch (error) {
    console.error("ERROR FETCHING CHARTS DATA:", error);
    throw error;
  }
};

/* ============================================================
   🔸 HELPER FUNCTION - GET TABLES DATA
=============================================================== */
const getTables = async () => {
  try {
    const topCourses = await Course.find()
      .sort({ enrolled: -1 })
      .limit(5)
      .select("title instructor enrolled students pricing")
      .lean();

    const formattedTopCourses = topCourses.map((course) => ({
      title: course.title,
      instructor: course.instructor.instructorName,
      students: course.enrolled,
      revenue: course.students.reduce(
        (sum, student) => sum + parseFloat(student.paidAmount || 0),
        0
      ),
      category: course.category,
    }));

    const recentEnrollments = await CoursePurchase.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("userName courseTitle coursePricing createdAt")
      .lean();

    const formattedRecentEnrollments = recentEnrollments.map((enrollment) => ({
      studentName: enrollment.userName,
      courseTitle: enrollment.courseTitle,
      amount: enrollment.coursePricing,
      date: new Date(enrollment.createdAt).toLocaleDateString(),
    }));

    const newUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role image createdAt")
      .lean();

    const formattedNewUsers = newUsers.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      joinedOn: new Date(user.createdAt).toLocaleDateString(),
    }));

    return {
      topCourses: formattedTopCourses,
      recentEnrollments: formattedRecentEnrollments,
      newUsers: formattedNewUsers,
    };
  } catch (error) {
    console.error("ERROR FETCHING TABLES DATA:", error);
    throw error;
  }
};

/* ============================================================
   🔸 CONTROLLER - GET DASHBOARD STATS (GET /dashboard/stats)
=============================================================== */
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await getStats();
    sendResponse(res, 200, true, "DASHBOARD STATS FETCHED SUCCESSFULLY", stats);
  } catch (error) {
    sendResponse(res, 500, false, "ERROR FETCHING DASHBOARD STATS");
  }
};

/* ============================================================
   🔸 CONTROLLER - GET CHARTS DATA (GET /dashboard/charts)
=============================================================== */
exports.getChartsData = async (req, res) => {
  try {
    const charts = await getCharts();
    sendResponse(res, 200, true, "CHARTS DATA FETCHED SUCCESSFULLY", charts);
  } catch (error) {
    sendResponse(res, 500, false, "ERROR FETCHING CHARTS DATA");
  }
};

/* ============================================================
   🔸 CONTROLLER - GET TABLES DATA (GET /dashboard/tables)
=============================================================== */
exports.getTablesData = async (req, res) => {
  try {
    const tables = await getTables();
    sendResponse(res, 200, true, "TABLES DATA FETCHED SUCCESSFULLY", tables);
  } catch (error) {
    sendResponse(res, 500, false, "ERROR FETCHING TABLES DATA");
  }
};

/* ============================================================
   🔸 CONTROLLER - GET ALL DASHBOARD DATA (GET /dashboard)
=============================================================== */
exports.getDashboardData = async (req, res) => {
  try {
    const [stats, charts, tables] = await Promise.all([
      getStats(),
      getCharts(),
      getTables(),
    ]);

    const responseData = {
      success: true,
      message: "DASHBOARD DATA FETCHED SUCCESSFULLY",
      data: {
        stats,
        charts: {
          enrollmentData: charts.enrollmentData,
          revenueData: charts.revenueData,
          categoryData: charts.categoryData,
          roleData: charts.roleData,
        },
        tables: {
          topCourses: tables.topCourses,
          recentEnrollments: tables.recentEnrollments,
          newUsers: tables.newUsers,
        },
      },
    };

    console.log(
      "DASHBOARD DATA RESPONSE:",
      JSON.stringify(responseData, null, 2)
    );
    res.status(200).json(responseData);
  } catch (error) {
    console.error("ERROR FETCHING DASHBOARD DATA:", error);
    res.status(500).json({
      success: false,
      message: "ERROR FETCHING DASHBOARD DATA",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};