import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  imageVariants,
  cardVariants,
  buttonVariants,
} from "@/animations/variants";

const LandingPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const whyUsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.1,
  });
  const featuresInView = useInView(featuresRef, {
    once: true,
    amount: 0.1,
  });
  const whyUsInView = useInView(whyUsRef, {
    once: true,
    amount: 0.1,
  });

  const features = [
    {
      title: "Đánh giá thông minh",
      description: "Phân tích CV của bạn với AI tiên tiến",
      image:
        "https://img.freepik.com/free-vector/artificial-intelligence-concept-illustration_114360-7135.jpg",
    },
    {
      title: "Gợi ý cải thiện",
      description: "Nhận gợi ý chi tiết để cải thiện CV",
      image:
        "https://img.freepik.com/free-vector/online-resume-concept-illustration_114360-5416.jpg",
    },
    {
      title: "Theo dõi tiến độ",
      description: "Xem sự tiến bộ của CV qua thời gian",
      image:
        "https://img.freepik.com/free-vector/career-progress-concept-illustration_114360-5339.jpg",
    },
  ];

  const reasons = [
    {
      title: "Công nghệ AI tiên tiến",
      description:
        "Sử dụng trí tuệ nhân tạo để phân tích và đánh giá CV một cách chính xác và khách quan",
      icon: "🤖",
    },
    {
      title: "Tiết kiệm thời gian",
      description:
        "Nhận đánh giá chi tiết chỉ trong vài phút, giúp bạn nhanh chóng cải thiện CV",
      icon: "⏱️",
    },
    {
      title: "Gợi ý thông minh",
      description:
        "Nhận gợi ý cụ thể để cải thiện CV dựa trên yêu cầu của nhà tuyển dụng",
      icon: "💡",
    },
    {
      title: "Hoàn toàn miễn phí",
      description:
        "Sử dụng dịch vụ không giới hạn mà không phải trả bất kỳ chi phí nào",
      icon: "🎁",
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.div
          ref={heroRef}
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1, margin: "-100px" }}
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
                ResumeBoost giúp bạn tạo CV chuyên nghiệp và tăng cơ hội thành
                công trong sự nghiệp
              </motion.p>
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Bắt đầu ngay <ArrowRight className="ml-2" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex-1"
              variants={imageVariants}
              style={{ y }}
            >
              <motion.img
                src="https://img.freepik.com/free-vector/recruitment-agency-searching-job-candidates_1262-19873.jpg"
                alt="CV Optimization"
                className="w-full h-auto rounded-lg shadow-xl"
                whileHover={{ scale: 1.02, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          ref={featuresRef}
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Tính năng nổi bật
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div
                  className="w-full h-48 mb-6 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  variants={itemVariants}
                >
                  {feature.title}
                </motion.h3>
                <motion.p className="text-gray-600" variants={itemVariants}>
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={whyUsRef}
          className="container mx-auto px-4 py-16"
          initial="hidden"
          animate={whyUsInView ? "visible" : "hidden"}
          variants={containerVariants}
          viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Tại sao nên chọn ResumeBoost?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {reason.icon}
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  variants={itemVariants}
                >
                  {reason.title}
                </motion.h3>
                <motion.p className="text-gray-600" variants={itemVariants}>
                  {reason.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
