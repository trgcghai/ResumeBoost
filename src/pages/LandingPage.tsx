import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h1
              className="text-5xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Tối ưu hóa CV của bạn với AI
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              variants={itemVariants}
            >
              ResumeBoost giúp bạn tạo CV chuyên nghiệp và tăng cơ hội thành công trong sự nghiệp
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/home"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bắt đầu ngay <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1"
            variants={itemVariants}
          >
            <img
              src="https://img.freepik.com/free-vector/recruitment-agency-searching-job-candidates_1262-19873.jpg"
              alt="CV Optimization"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          Tính năng nổi bật
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Đánh giá thông minh",
              description: "Phân tích CV của bạn với AI tiên tiến",
              image: "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7135.jpg"
            },
            {
              title: "Gợi ý cải thiện",
              description: "Nhận gợi ý chi tiết để cải thiện CV",
              image: "https://img.freepik.com/free-vector/online-resume-concept-illustration_114360-5416.jpg"
            },
            {
              title: "Theo dõi tiến độ",
              description: "Xem sự tiến bộ của CV qua thời gian",
              image: "https://img.freepik.com/free-vector/career-progress-concept-illustration_114360-5339.jpg"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-full h-48 mb-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;