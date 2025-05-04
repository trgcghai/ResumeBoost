# ResumeBoost – Ứng dụng tối ưu CV bằng AI

**ResumeBoost** là một ứng dụng sử dụng trí tuệ nhân tạo (AI) để giúp người dùng tối ưu hóa CV (Curriculum Vitae) dựa trên từng tin tuyển dụng cụ thể, tăng cơ hội gây ấn tượng với nhà tuyển dụng.

## Thành viên thực hiện

- Trương Công Hải
- Huỳnh Thanh Liêm
- Trần Quốc Bảo

## Mục tiêu

- Giúp người dùng tạo ra CV phù hợp nhất với từng công việc cụ thể.
- Tăng khả năng vượt qua hệ thống ATS và thu hút sự chú ý của nhà tuyển dụng.

## Tính năng chính

1. **Tải lên CV**: Người dùng tải CV (PDF) bằng cách kéo/thả hoặc chọn file.
2. **Nhập tin tuyển dụng (JD)**: Dán mô tả công việc để so sánh với CV.
3. **Phân tích CV**: AI đánh giá mức độ phù hợp, tính điểm (0-100), liệt kê từ khóa, kỹ năng thiếu và kinh nghiệm liên quan.
4. **Gợi ý cải thiện**: Đưa ra đề xuất cụ thể (thêm từ khóa, chỉnh sửa nội dung) và tạo phiên bản CV tối ưu hóa.

## Luồng hoạt động

1. **Tải lên CV**:

   - Hỗ trợ định dạng PDF.
   - Chuyển hóa thành dạng base64

2. **Nhập JD**:

   - Người dùng dán JD vào textarea.
   - Lưu JD để so sánh với CV.

3. **Phân tích và đánh giá**:

   - Sử dụng mô hình Gemini 2.0 để:
     - So khớp từ khóa.
     - Đánh giá kỹ năng và kinh nghiệm.
     - Tính điểm dựa trên mức độ phù hợp (VD: 85/100).
   - Kết quả: Điểm số, từ khóa thiếu, kỹ năng cần bổ sung.

4. **Gợi ý cải thiện**:

   - Đề xuất cụ thể (VD: "Thêm 'Machine Learning' vào kỹ năng").
   - Tự động tạo CV mới, giữ nguyên phong cách gốc.

## Công nghệ sử dụng

### Frontend

- **React.js + Vite + Typescript**: Xây dựng giao diện nhanh, mạnh mẽ.
- **TailwindCSS**: Thiết kế giao diện responsive, dễ tùy chỉnh.
- **react-dropzone**: Xử lý tải file CV.
- **ShadcnUI**: Thành phần giao diện đẹp và tái sử dụng.

### Backend

- **Firebase**: xử lý authentication, authorization, lưu trữ firestore.
- **Cloudinary**: lưu trữ thông tin các file được tải lên.
