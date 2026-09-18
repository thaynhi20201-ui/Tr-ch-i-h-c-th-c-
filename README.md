# Trò Chơi Kéo Co Địa Lý 5v5 (Tug of War Geography)

Trò chơi đối kháng kéo co 5v5 kết hợp trắc nghiệm kiến thức Địa lý Việt Nam và Thế giới, được xây dựng hoàn toàn bằng **HTML5, CSS3, Vanilla JavaScript** thuần túy, không phụ thuộc vào framework phức tạp, sẵn sàng chạy ngay trên trình duyệt hoặc triển khai trực tiếp lên **GitHub Pages**.

---

## 🌟 Các tính năng nổi bật
1. **Đấu đối kháng 5v5:**
   - **Đội Xanh:** Quá (Tiên phong), Mập (Lực sĩ), Nhiên (Kỹ thuật), Hạo (Tiếp sức), Lý (Mỏ neo).
   - **Đội Đỏ:** Sơn (Tiên phong), Hải (Lực sĩ), Đức (Kỹ thuật), Cường (Tiếp sức), Long (Mỏ neo).
2. **Cơ chế kéo co theo luật:**
   - **Trả lời Đúng:** Kéo dây **1 nhịp (+15%)** về phía đội mình.
   - **Trả lời Sai:** Đối thủ được kéo **2 nhịp (+30%)** về phía họ.
3. **⏱️ Tùy chọn thời gian linh hoạt:**
   - Lựa chọn thời gian trả lời cho mỗi câu: **30 giây**, **60 giây**, hoặc **90 giây**.
   - Có đồng hồ đếm ngược và thanh tiến trình nhấp nháy cảnh báo khi sắp hết giờ.
4. **📝 Tab Quản lý câu hỏi Địa lý:**
   - **Thêm câu hỏi mới:** Nhập câu hỏi, 4 phương án A-B-C-D, chọn đáp án đúng và lời giải thích.
   - **Chỉnh sửa câu hỏi:** Sửa nội dung câu hỏi hoặc đáp án bất kỳ lúc nào.
   - **Xóa câu hỏi:** Xóa câu hỏi không mong muốn (hệ thống tự động đồng bộ số câu trong trận đấu).
   - **Khôi phục mặc định:** Đưa về ngân hàng 10 câu hỏi Địa lý gốc.
   - Tự động lưu trữ thông qua `localStorage`, không lo bị mất dữ liệu khi tải lại trang.
5. **Chế độ chơi đa dạng:**
   - Đấu với Máy thông minh (AI Bot).
   - Đấu 2 Người chơi (PvP) trên cùng một máy.
6. **Âm thanh Web Audio API:**
   - Âm thanh tích tắc khẩn cấp, tiếng giật kéo dây, chuông đúng, buzzer sai và nhạc khải hoàn chiến thắng.

---

## 🚀 Hướng dẫn Deploy lên GitHub Pages trong 3 bước

### Cách 1: Tải trực tiếp lên Repository GitHub
1. **Tạo repository mới** trên GitHub (ví dụ: `game-keo-co-dia-ly`).
2. **Upload toàn bộ các file** của dự án lên nhánh `main`:
   - `index.html` (ở thư mục gốc)
   - `style.css` (ở thư mục gốc)
   - `main.js` (ở thư mục gốc)
3. **Kích hoạt GitHub Pages:**
   - Vào mục **Settings** của repository -> chọn thẻ **Pages** ở thanh bên trái.
   - Tại phần **Build and deployment > Source**, chọn **Deploy from a branch**.
   - Chọn nhánh **`main`** và thư mục **`/ (root)`**, sau đó nhấn **Save**.
   - Chờ khoảng 1-2 phút, trang web của bạn sẽ hoạt động trực tiếp tại địa chỉ:  
     `https://<tên-tài-khoản-github>.github.io/<tên-repo>/`

### Cách 2: Chạy trực tiếp trên máy (Offline không cần cài đặt)
- Chỉ cần nhấp đúp chuột mở file `index.html` hoặc `public/game_keo_co.html` trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari) là có thể chơi ngay lập tức mà không cần cài thêm bất kỳ phần mềm nào.
