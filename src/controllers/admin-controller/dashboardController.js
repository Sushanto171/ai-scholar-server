const Course = require('../../models/Course');
const User = require('../../models/User');
const CoursePurchase = require('../../models/CoursePurchase');
const StudentCourses = require('../../models/StudentCourses');
const { sendResponse } = require('../../utils/responseHandler');

// Helper function to get last 12 months data
const getLast12MonthsData = async (model) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
    
    // Calculate start and end of month
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Count documents created in this month
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    
    // For revenue, sum the coursePricing
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
            total: { $sum: '$coursePricing' },
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

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalStudents = await User.countDocuments({ role: 'student' });
    
    // Calculate total revenue
    const revenueResult = await CoursePurchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$coursePricing' },
        },
      },
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    
    sendResponse(res, 200, true, 'Dashboard stats fetched successfully', {
      totalCourses,
      totalInstructors,
      totalStudents,
      totalRevenue,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    sendResponse(res, 500, false, 'Error fetching dashboard stats');
  }
};

// Get charts data
exports.getChartsData = async (req, res) => {
  try {
    // Enrollment data (using CoursePurchase as proxy for enrollments)
    const enrollmentData = await getLast12MonthsData(CoursePurchase);
    
    // Revenue data
    const revenueData = await getLast12MonthsData(CoursePurchase);
    
    // Course categories distribution
    const categoryData = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          value: '$count',
          _id: 0,
        },
      },
    ]);
    
    // User role distribution
    const roleData = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          value: '$count',
          _id: 0,
        },
      },
    ]);
    
    sendResponse(res, 200, true, 'Charts data fetched successfully', {
      enrollmentData,
      revenueData,
      categoryData,
      roleData,
    });
  } catch (error) {
    console.error('Error fetching charts data:', error);
    sendResponse(res, 500, false, 'Error fetching charts data');
  }
};

// Get tables data
exports.getTablesData = async (req, res) => {
  try {
    // Top performing courses (by enrolled students)
    const topCourses = await Course.find()
      .sort({ enrolled: -1 })
      .limit(5)
      .select('title instructor enrolled students pricing')
      .lean();
    
    // Format top courses data
    const formattedTopCourses = topCourses.map(course => ({
      title: course.title,
      instructor: course.instructor.instructorName,
      students: course.enrolled,
      revenue: course.students.reduce((sum, student) => sum + parseFloat(student.paidAmount || 0), 0),
      category: course.category,
    }));
    
    // Recent enrollments (using CoursePurchase)
    const recentEnrollments = await CoursePurchase.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('userName courseTitle coursePricing createdAt')
      .lean();
    
    // Format recent enrollments
    const formattedRecentEnrollments = recentEnrollments.map(enrollment => ({
      studentName: enrollment.userName,
      courseTitle: enrollment.courseTitle,
      amount: enrollment.coursePricing,
      date: new Date(enrollment.createdAt).toLocaleDateString(),
    }));
    
    // Newly registered users
    const newUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role image createdAt')
      .lean();
    
    // Format new users
    const formattedNewUsers = newUsers.map(user => ({
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      joinedOn: new Date(user.createdAt).toLocaleDateString(),
    }));
    
    sendResponse(res, 200, true, 'Tables data fetched successfully', {
      topCourses: formattedTopCourses,
      recentEnrollments: formattedRecentEnrollments,
      newUsers: formattedNewUsers,
    });
  } catch (error) {
    console.error('Error fetching tables data:', error);
    sendResponse(res, 500, false, 'Error fetching tables data');
  }
};

// Get all dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // Get stats
    const stats = await this.getDashboardStats(req, res, true);
    
    // Get charts data
    const charts = await this.getChartsData(req, res, true);
    
    // Get tables data
    const tables = await this.getTablesData(req, res, true);
    
    sendResponse(res, 200, true, 'Dashboard data fetched successfully', {
      stats: stats.data,
      charts: charts.data,
      tables: tables.data,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    sendResponse(res, 500, false, 'Error fetching dashboard data');
  }
};