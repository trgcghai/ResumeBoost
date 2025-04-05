# ResumeBoost – Ứng dụng tối ưu CV bằng AI

**ResumeBoost** là một ứng dụng sử dụng trí tuệ nhân tạo (AI) để giúp người dùng tối ưu hóa CV (Curriculum Vitae) dựa trên từng tin tuyển dụng cụ thể, tăng cơ hội vượt qua hệ thống ATS (Applicant Tracking System) và gây ấn tượng với nhà tuyển dụng.

## Mục tiêu và giá trị cốt lõi

### Mục tiêu

- Giúp người dùng tạo ra CV phù hợp nhất với từng công việc cụ thể.
- Tăng khả năng vượt qua hệ thống ATS và thu hút sự chú ý của nhà tuyển dụng.

### Giá trị cốt lõi

- **Tự động hóa**: Tối ưu CV nhanh chóng, tiết kiệm thời gian.
- **Cá nhân hóa**: Điều chỉnh CV dựa trên từng mô tả công việc (JD).
- **Đánh giá khách quan**: Cung cấp phân tích và gợi ý cải thiện dựa trên AI.

## Tính năng chính

1. **Tải lên CV**: Người dùng tải CV (PDF/DOCX) bằng cách kéo/thả hoặc chọn file.
2. **Nhập tin tuyển dụng (JD)**: Dán mô tả công việc để so sánh với CV.
3. **Phân tích CV**: AI đánh giá mức độ phù hợp, tính điểm (0-100), liệt kê từ khóa, kỹ năng thiếu và kinh nghiệm liên quan.
4. **Gợi ý cải thiện**: Đưa ra đề xuất cụ thể (thêm từ khóa, chỉnh sửa nội dung) và tạo phiên bản CV tối ưu hóa.
5. **Tải xuống CV mới**: Hiển thị kết quả phân tích và cho phép tải CV đã tối ưu dưới dạng PDF.

## Luồng hoạt động

1. **Tải lên CV**:

   - Hỗ trợ định dạng PDF/DOCX.
   - Trích xuất văn bản bằng PDF.js (PDF) hoặc Mammoth (DOCX).
   - Lưu tạm nội dung trong cơ sở dữ liệu hoặc cache (Redis).

2. **Nhập JD**:

   - Người dùng dán JD vào textarea.
   - Lưu JD để so sánh với CV.

3. **Phân tích và đánh giá**:

   - Sử dụng OpenAI GPT-4 Turbo để:
     - So khớp từ khóa ATS (VD: "Python", "Data Analysis").
     - Đánh giá kỹ năng và kinh nghiệm.
     - Tính điểm dựa trên mức độ phù hợp (VD: 85/100).
   - Kết quả: Điểm số, từ khóa thiếu, kỹ năng cần bổ sung.

4. **Gợi ý cải thiện**:

   - Đề xuất cụ thể (VD: "Thêm 'Machine Learning' vào kỹ năng").
   - Tự động tạo CV mới, giữ nguyên phong cách gốc.

5. **Hiển thị và tải xuống**:
   - Báo cáo phân tích: Điểm số, biểu đồ, danh sách gợi ý.
   - So sánh CV gốc và CV tối ưu hóa.
   - Tải CV mới dưới dạng PDF (dùng jsPDF).

## Thiết kế giao diện

### Màn hình chính

- **Tiêu đề**: "ResumeBoost – Tối ưu CV của bạn ngay hôm nay!"
- **Khu vực tải CV**: Khung kéo/thả với dòng chữ "Kéo CV của bạn vào đây (PDF/DOCX)".
- **Ô nhập JD**: Textarea với placeholder "Dán mô tả công việc hoặc URL tuyển dụng".
- **Nút hành động**: "Phân tích CV ngay" (nút xanh nổi bật).

### Màn hình kết quả

- **Phần đánh giá**:
  - "Điểm CV của bạn: 87/100" (màu sắc thay đổi theo điểm: xanh >80, vàng 60-80, đỏ <60).
  - Biểu đồ tròn: "Mức độ phù hợp: 90%".
- **Phần chi tiết**:
  - Kỹ năng thiếu: "SQL, Agile".
  - Từ khóa cần bổ sung: "Data Analysis, Team Leadership".
  - Gợi ý: "Viết lại kinh nghiệm tại Công ty X để nhấn mạnh kỹ năng lập kế hoạch".
- **Phần CV mới**:
  - Hiển thị CV gốc và CV tối ưu hóa cạnh nhau.
  - Nút "Tải CV mới" (PDF).

## Công nghệ sử dụng

### Frontend

- **React.js + Vite + Typescript**: Xây dựng giao diện nhanh, mạnh mẽ.
- **TailwindCSS**: Thiết kế giao diện responsive, dễ tùy chỉnh.
- **react-dropzone**: Xử lý tải file CV.
- **ShadcnUI**: Thành phần giao diện đẹp và tái sử dụng.

### Backend

- **Express.js + Node.js**: Xử lý logic phía server.
- **PDF.js**: Trích xuất văn bản từ PDF.
- **Mammoth.js**: Trích xuất văn bản từ DOCX.
- **OpenAI API**: Phân tích CV và JD bằng GPT-4 Turbo.

### Database

- **MongoDB**: Lưu trữ dữ liệu người dùng, CV, JD (NoSQL, linh hoạt).
- **PostgreSQL** (tùy chọn): Nếu cần cấu trúc dữ liệu chặt chẽ hơn.

### AI & NLP

- **OpenAI GPT-4 Turbo**: So sánh văn bản, tạo gợi ý cải thiện.
- **natural (Node.js)** (tùy chọn): Phân tích từ khóa cơ bản, giảm chi phí API.

### Triển khai

- **Frontend**: Vercel (miễn phí, CI/CD dễ dàng).
- **Backend**: Render (hỗ trợ Node.js, giá rẻ).
- **Database**: MongoDB Atlas (miễn phí tier đầu tiên).
- **API Key**: Lưu trong `.env` với `dotenv` để bảo mật.

## Cài đặt và chạy dự án

### Yêu cầu

- Node.js (>= 18.x)
- npm hoặc yarn
- Tài khoản OpenAI API (cần API Key)
- MongoDB (local hoặc Atlas)

### Hướng dẫn cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/username/resumeboost.git
   cd resumeboost
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Tạo file `.env` trong thư mục gốc và thêm các biến môi trường:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Chạy dự án:

   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm run start
     ```

5. Truy cập ứng dụng tại: `http://localhost:5173` (hoặc port mặc định của Vite).

## Tính năng mở rộng (dự kiến)

- **Hỗ trợ đa ngôn ngữ**: Phân tích CV/JD bằng tiếng Anh, Đức, Pháp, v.v. (Google Translate API hoặc OpenAI).
- **Xuất PDF đẹp hơn**: Tích hợp `puppeteer` để tạo file PDF chuyên nghiệp.

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository.
2. Tạo branch mới (`git checkout -b feature/your-feature`).
3. Commit thay đổi (`git commit -m "Add your feature"`).
4. Push lên branch (`git push origin feature/your-feature`).
5. Tạo Pull Request.
