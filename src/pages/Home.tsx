const Home = () => {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-center text-2xl font-bold mb-2">ResumeBoost – Tối ưu CV của bạn ngay hôm nay!</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Tăng cơ hội vượt qua hệ thống ATS và gây ấn tượng với nhà tuyển dụng
        </p>
  
        <div className="mb-6">
          <label className="block font-semibold mb-2">Tải lên CV của bạn</label>
          <div className="border-2 border-dashed border-blue-300 bg-blue-100 text-center py-10">
            Kéo và thả file vào đây<br />
            <span className="text-gray-500">Hoặc</span><br />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:scale-105">Tìm kiếm file</button>
          </div>
        </div>
  
        <div className="mb-6">
          <label className="block font-semibold mb-2">Nhập mô tả công việc</label>
          <textarea
            className="w-full p-4 border rounded resize-none"
            rows={6}
            placeholder="Dán mô tả công việc vào đây…"
          />
        </div>
  
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:scale-105">Phân tích ngay</button>
      </div>
    );
  };
  
  export default Home;
  