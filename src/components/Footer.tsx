const Footer = () => {
  return (
    <footer className="bg-white text-sm text-textNormal py-4 border-t">
      <div className="container mx-auto flex items-start justify-around gap-8">
        <div>
          <p className="font-bold">Về chúng tôi</p>
          <p>Điều khoản sử dụng</p>
          <p>Chính sách bảo mật</p>
        </div>
        <div>
          <p className="font-bold">Thông tin liên hệ</p>
          <p>facebook</p>
          <p>+84 987 987 987</p>
          <p>resumeboost@gmail.com</p>
        </div>
      </div>
      <div className="mt-4 text-center text-xs">
        © 2025 ResumeBoost. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
