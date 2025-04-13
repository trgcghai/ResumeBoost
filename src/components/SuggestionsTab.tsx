import React from "react";

const SuggestionsTab: React.FC = () => {
  const suggestions = [
    "Viết lại phần kinh nghiệm tại Công ty X để nhấn mạnh kỹ năng lập kế hoạch.",
    "Thêm các dự án cụ thể liên quan đến phân tích dữ liệu.",
    "Cấu trúc lại phần kỹ năng để nổi bật hơn.",
    "Bổ sung thông tin định lượng (ví dụ: tăng hiệu suất 40%, quản lý nhóm 5 người).",
  ];

  return (
    <>
      <div className="">
        <h3 className="text-md font-semibold mb-2">Gợi ý cải thiện</h3>
        <div className="flex flex-wrap gap-2">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-textDark px-2 py-1 rounded-full">
                {index + 1}. {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SuggestionsTab;
