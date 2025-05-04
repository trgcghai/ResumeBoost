import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Facebook } from "lucide-react";
import { useRef, useState } from "react";
import {
  containerVariants,
  itemVariants,
  textVariants,
  cardVariants,
  teamContainerVariants,
  teamMemberVariants,
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
            <p className="text-gray-600 text-justify">{answer}</p>
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
  const faqRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.1,
  });
  const missionInView = useInView(missionRef, {
    once: true,
    amount: 0.1,
  });
  const teamInView = useInView(teamRef, {
    once: true,
    amount: 0.1,
  });
  const faqInView = useInView(faqRef, {
    once: true,
    amount: 0.1,
  });

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Trương Công Hải",
      role: "Nhóm trưởng",
      social: {
        github: "https://github.com",
        facebook: "https://facebook.com/",
      },
    },
    {
      name: "Trần Quốc Bảo",
      role: "Thành viên",
      social: {
        github: "https://github.com",
        facebook: "https://facebook.com/",
      },
    },
    {
      name: "Huỳnh Thanh Liêm",
      role: "Thành viên",
      social: {
        github: "https://github.com",
        facebook: "https://www.facebook.com",
      },
    },
  ];

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "Tại sao tôi cần ResumeBoost?",
      answer:
        "Trong thị trường việc làm cạnh tranh hiện nay, một CV chuyên nghiệp và nổi bật là chìa khóa để được nhà tuyển dụng chú ý. ResumeBoost giúp bạn: 1) Tối ưu hóa CV theo tiêu chuẩn ngành, 2) Phát hiện và sửa lỗi tự động, 3) Nhận gợi ý cải thiện từ AI, 4) Tăng tỷ lệ được mời phỏng vấn, và 5) Tiết kiệm thời gian chỉnh sửa CV.",
    },
    {
      question: "ResumeBoost là gì?",
      answer:
        "ResumeBoost là nền tảng đánh giá và tối ưu hóa CV thông minh, sử dụng công nghệ AI tiên tiến để giúp người dùng tạo CV chuyên nghiệp và nổi bật.",
    },
    {
      question: "ResumeBoost có gì khác biệt?",
      answer:
        "ResumeBoost nổi bật với khả năng phân tích CV thông minh, đưa ra gợi ý cụ thể và chi tiết, cùng với giao diện người dùng thân thiện và dễ sử dụng. Chúng tôi sử dụng AI để phân tích xu hướng tuyển dụng và tối ưu hóa CV theo yêu cầu cụ thể của từng ngành nghề.",
    },
    {
      question: "Công nghệ nào được sử dụng?",
      answer:
        "Chúng tôi sử dụng các công nghệ AI tiên tiến như xử lý ngôn ngữ tự nhiên (NLP), machine learning, và deep learning để phân tích và đánh giá CV. Hệ thống của chúng tôi được huấn luyện trên hàng triệu mẫu CV thành công để đảm bảo độ chính xác cao trong việc đánh giá và đưa ra gợi ý.",
    },
    {
      question: "Sứ mệnh của ResumeBoost là gì?",
      answer:
        "Sứ mệnh của chúng tôi là giúp mọi người tạo ra CV chất lượng cao, tăng cơ hội thành công trong sự nghiệp thông qua việc sử dụng công nghệ AI để phân tích và đưa ra gợi ý cải thiện CV. Chúng tôi tin rằng mọi người đều xứng đáng có cơ hội việc làm tốt.",
    },
    {
      question: "Làm thế nào để liên hệ với đội ngũ?",
      answer:
        "Bạn có thể liên hệ với chúng tôi qua email support@resumeboost.com hoặc thông qua form liên hệ trên website. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn trong vòng 24 giờ.",
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden mt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.div
          ref={heroRef}
          className="container mx-auto px-4 py-4"
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

        <motion.div
          ref={missionRef}
          className="container mx-auto px-4 py-4"
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
              <motion.p className="text-gray-600" variants={textVariants}>
                Chúng tôi giúp bạn tạo CV chuyên nghiệp và tăng cơ hội thành
                công trong sự nghiệp.
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
              <motion.p className="text-gray-600" variants={textVariants}>
                Sử dụng AI để phân tích và đánh giá CV một cách chính xác và
                khách quan.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          ref={teamRef}
          className="container mx-auto px-4 py-4"
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
                <motion.h3
                  className="text-xl font-semibold mb-1"
                  variants={textVariants}
                >
                  {member.name}
                </motion.h3>
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={faqRef}
          className="container mx-auto px-4 py-4 mb-16 max-w-3xl"
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
      </div>
    </motion.div>
  );
};

export default AboutUs;
