import { Facebook, Github, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white text-sm text-textNormal py-4 border-t">
      <div className="container max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0">
          <div>
            <img src="/logo.png" className="rounded-lg w-16" alt="" />
            <p className="mt-2 sm:w-4/5 text-justify w-full">
              <span className="font-bold">ResumeBoost</span> - Nền tảng đánh giá
              CV miễn phí và chuyên nghiệp. Hãy để{" "}
              <span className="font-bold">ResumeBoost</span> đồng hành cùng bạn
              trên hành trình chinh phục sự nghiệp mơ ước.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-base mb-3">Thông tin liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Github className="h-5 w-5 text-textNormal" />
                <Link to="https://github.com" className="hover:text-main">
                  GitHub
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-textNormal " />
                <Link to="https://facebook.com" className="hover:text-main">
                  Facebook
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-textNormal " />
                <span>resumeboost@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-textNormal " />
                <span>+84 987 987 987</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3">Công nghệ sử dụng</h3>
            <ul className="space-y-2">
              <li>ReactJS</li>
              <li>Gemini API</li>
              <li>Cloudinary</li>
              <li>Redux</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-3">Thành viên nhóm</h3>
            <ul className="space-y-2">
              <li>Trường Công Hải</li>
              <li>Huỳnh Thanh Liêm</li>
              <li>Trần Quốc Bảo</li>
            </ul>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="text-center text-textLight flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p>© {new Date().getFullYear()} ResumeBoost. All rights reserved.</p>
          <p>
            <ul className="flex items-center gap-4">
              {["Privacy Policy", "Terms of Service", "Cookies"].map(
                (item, index) => {
                  return (
                    <li key={index} className="inline-block">
                      <Link to="#" className="hover:text-main">
                        {item}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
