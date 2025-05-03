import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Users, Target, BarChart3, Heart } from "lucide-react";
import { useRef } from "react";
import {
  containerVariants,
  itemVariants,
  textVariants,
  cardVariants,
  imageVariants,
  teamContainerVariants,
  teamMemberVariants,
  iconVariants,
  buttonVariants,
} from "@/animations/variants";

const AboutUs = () => {
  // Refs for scroll animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Team members data
  const teamMembers = [
    {
      name: "Trương Công Hải",
      role: "Nhóm trưởng",
      image: "images/anh1.jpg",
    },
    {
      name: "Trần Quốc Bảo",
      role: "Thành viên",
      image: "images/anh2.png",
    },
    {
      name: "Huỳnh Thanh Liêm",
      role: "Thành viên",
      image: "images/anh3.png",
    },
  ];

  // Stats data
  const stats = [
    {
      icon: <Users className="w-12 h-12" />,
      value: "1000+",
      label: "Người dùng",
    },
    {
      icon: <Target className="w-12 h-12" />,
      value: "95%",
      label: "Tỷ lệ thành công",
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      value: "50+",
      label: "Công ty đối tác",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      value: "4.9/5",
      label: "Đánh giá",
    },
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
              variants={textVariants}
            >
              Về chúng tôi
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              variants={textVariants}
            >
              ResumeBoost là nền tảng đánh giá và tối ưu hóa CV thông minh, giúp bạn tạo CV chuyên nghiệp và tăng cơ hội thành công trong sự nghiệp.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex-1"
            variants={imageVariants}
            style={{ y }}
          >
            <motion.img
              src="https://img.freepik.com/free-vector/about-us-concept-illustration_114360-639.jpg"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-xl"
              whileHover="hover"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        ref={missionRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={missionInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={textVariants}
        >
          Sứ mệnh của chúng tôi
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-2xl font-semibold mb-4"
              variants={textVariants}
            >
              Tối ưu hóa CV
            </motion.h3>
            <motion.p
              className="text-gray-600"
              variants={textVariants}
            >
              Chúng tôi giúp bạn tạo CV chuyên nghiệp và tăng cơ hội thành công trong sự nghiệp.
            </motion.p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-2xl font-semibold mb-4"
              variants={textVariants}
            >
              Đánh giá thông minh
            </motion.h3>
            <motion.p
              className="text-gray-600"
              variants={textVariants}
            >
              Sử dụng AI để phân tích và đánh giá CV một cách chính xác và khách quan.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        ref={teamRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={teamContainerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={textVariants}
        >
          Đội ngũ của chúng tôi
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={teamMemberVariants}
              whileHover="hover"
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                variants={imageVariants}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover="hover"
                />
              </motion.div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                variants={textVariants}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-gray-600"
                variants={textVariants}
              >
                {member.role}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={textVariants}
        >
          Thành tựu của chúng tôi
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="text-blue-600 mb-4"
                variants={iconVariants}
                whileHover="hover"
              >
                {stat.icon}
              </motion.div>
              <motion.h3
                className="text-3xl font-bold mb-2"
                variants={textVariants}
              >
                {stat.value}
              </motion.h3>
              <motion.p
                className="text-gray-600"
                variants={textVariants}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs; 