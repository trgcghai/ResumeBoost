import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Users, Target, BarChart3, Heart, ChevronDown, Github, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { useRef, useState } from "react";
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

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface FAQ {
  question: string;
  answer: string;
}

// FAQ Component
const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <motion.div 
      className="border-b border-gray-200 py-4"
      variants={itemVariants}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <span className="text-xl font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <p className="text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutUs = () => {
  // Refs for scroll animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { 
    once: true, 
    amount: 0.1 
  });
  const missionInView = useInView(missionRef, { 
    once: true, 
    amount: 0.1 
  });
  const teamInView = useInView(teamRef, { 
    once: true, 
    amount: 0.1 
  });
  const statsInView = useInView(statsRef, { 
    once: true, 
    amount: 0.1 
  });
  const faqInView = useInView(faqRef, { 
    once: true, 
    amount: 0.1 
  });

  // FAQ State
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Team members data
  const teamMembers = [
    {
      name: "Trương Công Hải",
      role: "Nhóm trưởng",
      studentId: "20110681",
      image: "images/anh1.jpg",
      social: {
        github: "https://github.com/truongconghai",
        facebook: "https://facebook.com/truongconghai",
        instagram: "https://instagram.com/truongconghai"
      }
    },
    {
      name: "Trần Quốc Bảo",
      role: "Thành viên",
      studentId: "20110682",
      image: "images/anh2.png",
      social: {
        github: "https://github.com/tranquocbao",
        facebook: "https://facebook.com/tranquocbao",
        instagram: "https://instagram.com/tranquocbao"
      }
    },
    {
      name: "Huỳnh Thanh Liêm",
      role: "Thành viên",
      studentId: "22639061",
      image: "images/anh3.png",
      social: {
        github: "https://github.com/liemhuynhthanh",
        facebook: "https://www.facebook.com/huynh.liem.271977/",
        instagram: "https://instagram.com/huynhthanhliem"
      }
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

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "Tại sao tôi cần ResumeBoost?",
      answer: "Trong thị trường việc làm cạnh tranh hiện nay, một CV chuyên nghiệp và nổi bật là chìa khóa để được nhà tuyển dụng chú ý. ResumeBoost giúp bạn: 1) Tối ưu hóa CV theo tiêu chuẩn ngành, 2) Phát hiện và sửa lỗi tự động, 3) Nhận gợi ý cải thiện từ AI, 4) Tăng tỷ lệ được mời phỏng vấn, và 5) Tiết kiệm thời gian chỉnh sửa CV."
    },
    {
      question: "ResumeBoost là gì?",
      answer: "ResumeBoost là nền tảng đánh giá và tối ưu hóa CV thông minh, sử dụng công nghệ AI tiên tiến để giúp người dùng tạo CV chuyên nghiệp và nổi bật."
    },
    {
      question: "ResumeBoost có gì khác biệt?",
      answer: "ResumeBoost nổi bật với khả năng phân tích CV thông minh, đưa ra gợi ý cụ thể và chi tiết, cùng với giao diện người dùng thân thiện và dễ sử dụng. Chúng tôi sử dụng AI để phân tích xu hướng tuyển dụng và tối ưu hóa CV theo yêu cầu cụ thể của từng ngành nghề."
    },
    {
      question: "Công nghệ nào được sử dụng?",
      answer: "Chúng tôi sử dụng các công nghệ AI tiên tiến như xử lý ngôn ngữ tự nhiên (NLP), machine learning, và deep learning để phân tích và đánh giá CV. Hệ thống của chúng tôi được huấn luyện trên hàng triệu mẫu CV thành công để đảm bảo độ chính xác cao trong việc đánh giá và đưa ra gợi ý."
    },
    {
      question: "Sứ mệnh của ResumeBoost là gì?",
      answer: "Sứ mệnh của chúng tôi là giúp mọi người tạo ra CV chất lượng cao, tăng cơ hội thành công trong sự nghiệp thông qua việc sử dụng công nghệ AI để phân tích và đưa ra gợi ý cải thiện CV. Chúng tôi tin rằng mọi người đều xứng đáng có cơ hội việc làm tốt."
    },
    {
      question: "Làm thế nào để liên hệ với đội ngũ?",
      answer: "Bạn có thể liên hệ với chúng tôi qua email support@resumeboost.com hoặc thông qua form liên hệ trên website. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn trong vòng 24 giờ."
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl font-bold text-blue-600 mb-6"
            variants={textVariants}
          >
            Về ResumeBoost
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            variants={textVariants}
          >
            Tìm hiểu thêm về đội ngũ và công nghệ đằng sau ResumeBoost
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        ref={missionRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={missionInView ? "visible" : "hidden"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
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
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
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
                className="text-xl font-semibold mb-1"
                variants={textVariants}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-blue-600 font-medium mb-1"
                variants={textVariants}
              >
                {member.studentId}
              </motion.p>
              <motion.p
                className="text-gray-600 mb-4"
                variants={textVariants}
              >
                {member.role}
              </motion.p>
              <motion.div 
                className="flex justify-center space-x-4"
                variants={itemVariants}
              >
                <motion.a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={member.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="container mx-auto px-4 py-16 bg-white rounded-lg shadow-lg mb-16"
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={textVariants}
        >
          Liên hệ với chúng tôi
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">support@resumeboost.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Điện thoại</h3>
                <p className="text-gray-600">+84 123 456 789</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-4">
              <Github className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Github</h3>
                <a 
                  href="https://github.com/resumeboost" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/resumeboost
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Facebook className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Facebook</h3>
                <a 
                  href="https://facebook.com/resumeboost" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  facebook.com/resumeboost
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Instagram className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Instagram</h3>
                <a 
                  href="https://instagram.com/resumeboost" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @resumeboost
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
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

      {/* FAQ Section */}
      <motion.div
        ref={faqRef}
        className="container mx-auto px-4 py-16 max-w-3xl"
        initial="hidden"
        animate={faqInView ? "visible" : "hidden"}
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={textVariants}
        >
          Câu hỏi thường gặp
        </motion.h2>
        <motion.div className="bg-white rounded-xl shadow-lg p-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs; 