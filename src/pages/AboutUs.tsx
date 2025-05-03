import { motion, useInView } from "framer-motion";
import { Users, Target, BarChart3, Heart } from "lucide-react";
import { useRef } from "react";

const AboutUs = () => {
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

  // Refs for scroll animations
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      role: "Founder & CEO",
      image: "/team/member1.jpg",
    },
    {
      name: "Trần Thị B",
      role: "CTO",
      image: "/team/member2.jpg",
    },
    {
      name: "Lê Văn C",
      role: "Lead Developer",
      image: "/team/member3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center mb-16"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h1
            className="text-5xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Về ResumeBoost
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Chúng tôi là nền tảng đánh giá CV thông minh, giúp bạn tối ưu hóa hồ sơ xin việc và tăng cơ hội thành công trong sự nghiệp.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          ref={missionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <Target className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sứ Mệnh</h3>
            <p className="text-gray-600">
              Giúp mọi người tạo ra những CV chuyên nghiệp và hiệu quả nhất.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tầm Nhìn</h3>
            <p className="text-gray-600">
              Trở thành nền tảng đánh giá CV hàng đầu tại Việt Nam.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <Heart className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Giá Trị Cốt Lõi</h3>
            <p className="text-gray-600">
              Đặt chất lượng và sự hài lòng của người dùng lên hàng đầu.
            </p>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          ref={teamRef}
          className="text-center mb-16"
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Đội Ngũ Của Chúng Tôi
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            Những người đã tạo nên ResumeBoost
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h3>
            <p className="text-gray-600">Người dùng</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-600 mb-2">95%</h3>
            <p className="text-gray-600">Tỷ lệ hài lòng</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-600 mb-2">50,000+</h3>
            <p className="text-gray-600">CV đã đánh giá</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-600 mb-2">4.9/5</h3>
            <p className="text-gray-600">Đánh giá từ người dùng</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs; 