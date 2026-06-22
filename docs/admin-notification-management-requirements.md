# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Email & Thông báo — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Email & Thông báo (Notification Management) cung cấp cho quản trị viên EduMart công cụ để giao tiếp trực tiếp với người dùng qua kênh email. Thay vì gửi email thủ công bên ngoài hệ thống, Admin có thể soạn, nhắm mục tiêu, gửi và theo dõi hiệu quả toàn bộ chiến dịch email ngay trong giao diện quản trị.

Mục tiêu nghiệp vụ chính:
- Thông báo kịp thời các cập nhật quan trọng (khai giảng, khuyến mãi, chính sách) đến đúng nhóm người dùng
- Đo lường mức độ tương tác của người dùng qua chỉ số mở email, click, bounce
- Quản lý chất lượng danh sách newsletter (loại bỏ người dùng không tương tác, tôn trọng hủy đăng ký)
- Giảm tỷ lệ churn bằng cách duy trì kết nối sau mua hàng

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Soạn & Gửi email** | Soạn nội dung rich text, chọn nhóm nhận, gửi ngay, xem trước trước khi gửi |
| **Lịch sử & Thống kê** | Xem danh sách chiến dịch đã gửi, tỷ lệ mở/click/bounce/hủy đăng ký từng chiến dịch |
| **Newsletter** | Xem danh sách subscriber, lọc theo trạng thái/nguồn, hủy đăng ký, khôi phục, xóa |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng: soạn và gửi email, xem thống kê, quản lý newsletter |
| **Content Admin** | Xem lịch sử email và thống kê; không có quyền gửi email mới |
| **Read-only Admin** | Xem lịch sử email; không có quyền thao tác newsletter |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập với `role='admin'`
- Dữ liệu chiến dịch email khởi tạo trong `emailCampaigns[]`
- Dữ liệu subscriber khởi tạo trong `newsletterSubs[]`
- Hàm `escHtml()`, `toast()`, `todayStr()`, `fmtBig()` đã có sẵn

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Soạn & Gửi Email

#### FR-01.1 Giao diện soạn thảo

**Mô tả:** Màn hình soạn email gồm 2 cột — form soạn thảo bên trái (rộng) và panel thông tin hỗ trợ bên phải.

**Các trường nhập liệu:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tiêu đề email | Text input | Có | Khuyến nghị < 60 ký tự để không bị cắt trong inbox |
| Gửi đến nhóm | Select | Có | 4 lựa chọn, hiển thị số người nhận kế bên |
| Nội dung email | Contenteditable (rich text) | Có | Hỗ trợ in đậm, nghiêng, gạch chân, H2, đoạn văn, danh sách, liên kết |

**Các nhóm nhận hỗ trợ:**

| Giá trị | Nhãn hiển thị | Số người nhận (demo) |
|---------|--------------|---------------------|
| `all` | Tất cả người dùng | 15.420 |
| `buyer` | Người mua | 11.231 |
| `seller` | Nhà bán hàng | 892 |
| `new` | Người dùng mới (30 ngày) | 2.145 |

#### FR-01.2 Toolbar rich text

**Các lệnh định dạng:**

| Nút | Lệnh | Phím tắt tương đương |
|-----|------|---------------------|
| **B** | `execCommand('bold')` | Ctrl+B |
| *I* | `execCommand('italic')` | Ctrl+I |
| <u>U</u> | `execCommand('underline')` | Ctrl+U |
| H2 | `execCommand('formatBlock','H2')` | — |
| ¶ | `execCommand('formatBlock','P')` | — |
| ≡ | `execCommand('insertUnorderedList')` | — |
| 🔗 | `execCommand('createLink', url)` | Prompt URL |

> **Ghi chú kỹ thuật:** Toolbar KHÔNG gọi `renderAccount()` để tránh mất con trỏ soạn thảo. Tất cả lệnh định dạng thực thi trực tiếp trên DOM qua `document.execCommand()`.

#### FR-01.3 Banner số lượng người nhận

**Mô tả:** Dòng thông báo hiển thị động: "📬 Email sẽ được gửi đến **X** người dùng"

**Hành vi:** Khi Admin thay đổi nhóm nhận từ dropdown, số lượng cập nhật ngay bằng `notifUpdateCount(group)` — cập nhật trực tiếp `innerHTML` của `#notifCountNum` mà không re-render toàn trang.

#### FR-01.4 Hành động từ form soạn thảo

| Hành động | Điều kiện kích hoạt | Kết quả |
|-----------|--------------------|---------| 
| **Gửi email ngay** | Tiêu đề và nội dung không rỗng | Confirm → tạo campaign mới → chuyển sang tab Lịch sử |
| **Xem trước** | Bất kỳ lúc nào | Mở cửa sổ popup HTML preview đúng định dạng email |
| **Xóa nháp** | Bất kỳ lúc nào | Confirm → reset tiêu đề = rỗng, nội dung = mẫu mặc định |

#### FR-01.5 Panel hỗ trợ bên phải

| Block | Nội dung |
|-------|---------|
| Thống kê nhanh | 4 card hiển thị số người nhận từng nhóm |
| Mẹo soạn thảo | 4 gợi ý viết tiêu đề, CTA, kiểm tra trước khi gửi |
| Gửi gần đây | 3 chiến dịch cuối cùng: tiêu đề + ngày gửi + nhóm nhận |

---

### 2.2 FR-02: Xử lý Gửi Email (`doSendEmail`)

**Luồng xử lý:**

```
[1] Đọc giá trị từ DOM:
    - subject  ← document.getElementById('emSubject').value.trim()
    - target   ← document.getElementById('emTarget').value
    - content  ← document.getElementById('emContent').innerHTML

[2] Validate:
    - subject rỗng → toast lỗi, dừng
    - content rỗng (sau strip HTML) → toast lỗi, dừng

[3] Confirm:
    - Dialog: "Xác nhận gửi email: '{subject}' đến {nhóm}?
      Hành động này không thể thu hồi."
    - Từ chối → dừng

[4] Tạo campaign object:
    {
      id: 'EM-' + Date.now().slice(-5),
      subject, targetGroup: target,
      targetCount: groupCounts[target],
      sentAt: todayStr(), sentBy: user.name,
      status: 'sent', content,
      stats: { sent: targetCount, opened: 0, clicked: 0,
               bounced: 0, unsubscribed: 0 }
    }

[5] Lưu:
    emailCampaigns.unshift(newCampaign)
    saveEmailCampaigns()

[6] Chuyển sang tab lịch sử:
    admNotifTab = 'history'
    renderAccount()
    toast('✅ Đã gửi email đến X người dùng!')
```

**Quy tắc validation:**

| Trường | Điều kiện lỗi | Thông báo |
|--------|--------------|-----------|
| subject | `trim() === ''` | "Vui lòng nhập tiêu đề email" |
| content | `innerHTML` sau khi strip thẻ HTML là rỗng | "Vui lòng nhập nội dung email" |

---

### 2.3 FR-03: Lịch sử Email & Thống kê

#### FR-03.1 KPI tổng quan

**Mô tả:** 4 card hiển thị ở đầu trang lịch sử, tính từ toàn bộ `emailCampaigns[]`.

| Card | Công thức |
|------|-----------|
| Chiến dịch đã gửi | `emailCampaigns.length` |
| Tổng email đã gửi | `SUM(stats.sent)` |
| Tỷ lệ mở TB | `AVG(stats.opened / stats.sent × 100)` |
| Tỷ lệ click TB | `AVG(stats.clicked / stats.sent × 100)` |

#### FR-03.2 Bảng lịch sử chiến dịch

**Dữ liệu hiển thị mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Tiêu đề / Thời gian | Tiêu đề email (ellipsis nếu dài) + ngày gửi + người gửi | `title` truncate với `max-width: 250px` |
| Nhóm nhận | Badge nhỏ hiển thị tên nhóm | |
| Đã gửi | Số lượng, định dạng locale VN | Căn phải |
| Tỷ lệ mở | % + progress bar màu theo ngưỡng | Xanh ≥40%, cam 25–39%, đỏ <25% |
| Tỷ lệ click | % + progress bar màu theo ngưỡng | Xanh ≥20%, cam 10–19%, đỏ <10% |
| Bounce | % | Xanh ≤3%, đỏ >3% |
| Hủy đăng ký | % | Xanh ≤1%, đỏ >1% |
| Hành động | Nút "Xem" mở chi tiết popup | |

**Phân trang:** 8 dòng/trang.

**Tìm kiếm:** Lọc theo tiêu đề email (case-insensitive substring match).

#### FR-03.3 Màu ngưỡng chỉ số email

| Chỉ số | Tốt | Trung bình | Cần cải thiện |
|--------|-----|------------|--------------|
| Tỷ lệ mở | ≥ 40% 🟢 | 25–39% 🟠 | < 25% 🔴 |
| Tỷ lệ click | ≥ 20% 🟢 | 10–19% 🟠 | < 10% 🔴 |
| Bounce | ≤ 3% 🟢 | — | > 3% 🔴 |
| Hủy đăng ký | ≤ 1% 🟢 | — | > 1% 🔴 |

> **Cơ sở benchmark:** Tỷ lệ mở email ngành giáo dục trung bình 28–35% (theo Mailchimp 2024). EduMart đặt ngưỡng tốt là 40% do danh sách người dùng đã opt-in.

#### FR-03.4 Popup xem chi tiết chiến dịch

**Mô tả:** Mở cửa sổ popup (`window.open`) hiển thị:
- Tiêu đề, thời gian gửi, nhóm nhận, số người gửi
- 4 stat card: Đã mở (+ %), Click (+ %), Bounce, Hủy đăng ký
- Nội dung HTML đầy đủ của email trong khung preview có styling

---

### 2.4 FR-04: Quản lý Newsletter Subscribers

#### FR-04.1 KPI tổng quan

| Card | Công thức |
|------|-----------|
| Tổng subscriber | `newsletterSubs.length` |
| Đang đăng ký | `status='active'` count |
| Đã hủy đăng ký | `status='unsubscribed'` count |
| Tỷ lệ duy trì | `active / total × 100` |

#### FR-04.2 Phân tích nguồn subscriber

**Mô tả:** Block hiển thị số lượng subscriber theo từng nguồn:

| Nguồn (`source`) | Nhãn |
|-----------------|------|
| `register` | Đăng ký |
| `checkout` | Thanh toán |
| `manual` | Thêm thủ công |

#### FR-04.3 Bộ lọc và tìm kiếm

| Bộ lọc | Loại | Giá trị |
|--------|------|---------|
| Tìm kiếm | Text | Lọc theo email hoặc tên (case-insensitive) |
| Trạng thái | Select | Tất cả / Đang đăng ký / Đã hủy |
| Nguồn | Select | Tất cả / Đăng ký / Thanh toán / Thêm thủ công |

Bộ lọc kết hợp: tất cả điều kiện đều phải thỏa đồng thời (AND logic).

#### FR-04.4 Bảng danh sách subscriber

**Dữ liệu mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Tên / Email | Tên in đậm, email nhỏ bên dưới |
| Ngày đăng ký | `subscribedAt` định dạng DD/MM/YYYY |
| Nguồn | Badge nhỏ |
| Trạng thái | ✅ Đang đăng ký (xanh) hoặc ❌ Đã hủy (đỏ) |
| Hành động | Nút hủy/khôi phục đăng ký + nút Xóa |

**Phân trang:** 10 dòng/trang.

#### FR-04.5 Hành động trên subscriber

**Hủy đăng ký (`doUnsubscribeNL`):**
```
Điều kiện: status='active'
→ Confirm: "Hủy đăng ký newsletter của {tên} ({email})?"
→ s.status = 'unsubscribed'
→ saveNewsletterSubs()
→ renderAccount()
→ toast("Đã hủy đăng ký: {email}")
```

**Khôi phục đăng ký (`doResubscribeNL`):**
```
Điều kiện: status='unsubscribed'
→ Không cần confirm
→ s.status = 'active'
→ saveNewsletterSubs()
→ renderAccount()
→ toast("Đã khôi phục đăng ký: {email}")
```

**Xóa subscriber (`doDeleteSub`):**
```
→ Confirm: "Xóa vĩnh viễn subscriber {email} khỏi danh sách?
   Hành động không thể hoàn tác."
→ newsletterSubs = newsletterSubs.filter(x => x.id !== id)
→ saveNewsletterSubs()
→ renderAccount()
→ toast("Đã xóa subscriber: {email}")
```

**Quy tắc hiển thị nút hành động:**

| Trạng thái | Nút hiển thị |
|-----------|-------------|
| `active` | [Hủy đăng ký] (cam) + [Xóa] (đỏ) |
| `unsubscribed` | [Đăng ký lại] (xanh) + [Xóa] (đỏ) |

---

## 3. Mô hình dữ liệu

### 3.1 Campaign Object (`emailCampaigns[]`)

```javascript
{
  id: string,          // 'EM-001', 'EM-002', ...
  subject: string,     // Tiêu đề email
  targetGroup: string, // 'all' | 'buyer' | 'seller' | 'new'
  targetCount: number, // Số người trong nhóm tại thời điểm gửi
  sentAt: string,      // 'DD/MM/YYYY'
  sentBy: string,      // Tên Admin đã gửi
  status: string,      // 'sent' (chỉ có 1 trạng thái)
  content: string,     // HTML nội dung email
  stats: {
    sent: number,        // = targetCount (gửi thành công)
    opened: number,      // Số người mở email
    clicked: number,     // Số người click link
    bounced: number,     // Email không giao được
    unsubscribed: number // Số người hủy từ email này
  }
}
```

### 3.2 Subscriber Object (`newsletterSubs[]`)

```javascript
{
  id: string,           // 'NS-001', 'NS-002', ...
  email: string,        // Địa chỉ email
  name: string,         // Tên hiển thị
  userId: string,       // Liên kết tài khoản ('U001', ...) hoặc null
  subscribedAt: string, // 'DD/MM/YYYY'
  status: string,       // 'active' | 'unsubscribed'
  source: string,       // 'register' | 'checkout' | 'manual'
  tags: string[]        // Nhãn phân loại (vd: ['hocsinh', 'giaovien'])
}
```

---

## 4. Luồng hoạt động

### 4.1 Luồng soạn và gửi email thông báo

```
Admin → Tab "Soạn email"
      → Nhập tiêu đề
      → Chọn nhóm nhận → Banner cập nhật số người nhận ngay
      → Soạn nội dung (rich text editor)
      → [Tùy chọn] Xem trước → Popup preview → Đóng
      → Nhấn "Gửi email ngay"
          → Validate: tiêu đề và nội dung không rỗng?
              ✗ → Toast lỗi, giữ form
              ✓ → Confirm dialog
                  ✗ Từ chối → Giữ form
                  ✓ Xác nhận → Tạo campaign object
                             → Lưu vào emailCampaigns (đầu mảng)
                             → Chuyển sang tab "Lịch sử gửi"
                             → Toast thành công
```

### 4.2 Luồng xem thống kê chiến dịch

```
Admin → Tab "Lịch sử gửi"
      → [Tùy chọn] Tìm kiếm theo tiêu đề
      → Xem bảng: tỷ lệ mở, click, bounce được tô màu theo ngưỡng
      → Nhấn "Xem" trên một chiến dịch
          → Popup mở: header email, 4 stat card, nội dung HTML đầy đủ
```

### 4.3 Luồng quản lý subscriber

```
Admin → Tab "Newsletter"
      → Xem KPI: tổng/active/unsubscribed/tỷ lệ duy trì
      → [Tùy chọn] Lọc theo trạng thái, nguồn, tìm kiếm
      → Với subscriber đang active:
          → Hủy đăng ký: Confirm → status='unsubscribed' → Lưu
          → Xóa: Confirm (cảnh báo không hoàn tác) → Xóa khỏi mảng → Lưu
      → Với subscriber đã hủy:
          → Đăng ký lại: Không cần confirm → status='active' → Lưu
          → Xóa: Confirm → Xóa khỏi mảng → Lưu
```

---

## 5. Giao diện người dùng (UI Mockups)

### 5.1 Màn hình Soạn Email

```
┌─────────────────────────────────────────────────────────────────────┐
│ Quản lý Email & Thông báo                                          │
│ [✉ Soạn email] [📊 Lịch sử gửi] [📋 Newsletter]                   │
├─────────────────────────────────────────┬───────────────────────────┤
│ ✉ Soạn email thông báo                  │ 📊 Thống kê nhanh        │
│                                         │                           │
│ Tiêu đề email *                         │ ┌────────────────────┐    │
│ ┌─────────────────────────────────────┐ │ │ Tất cả  15.420     │    │
│ │ Thông báo khai giảng...             │ │ │ Người mua 11.231   │    │
│ └─────────────────────────────────────┘ │ │ Nhà bán   892      │    │
│                                         │ │ Mới       2.145    │    │
│ Gửi đến nhóm *                          │ └────────────────────┘    │
│ ┌─────────────────────────────────────┐ │                           │
│ │ Tất cả người dùng (15.420 người) ▾  │ │ 💡 Mẹo soạn thảo        │
│ └─────────────────────────────────────┘ │ • Tiêu đề < 60 ký tự    │
│                                         │ • Thông tin quan trọng   │
│ Nội dung email *                        │   đặt đầu tiên           │
│ [B][I][U][—][H2][¶][≡][🔗]             │ • Thêm CTA rõ ràng       │
│ ┌─────────────────────────────────────┐ │ • Kiểm tra kỹ trước khi  │
│ │ Xin chào,                           │ │   gửi — không thu hồi   │
│ │                                     │ │                           │
│ │                                     │ │ 📬 Gửi gần đây          │
│ │ Trân trọng,                         │ │ ┌────────────────────┐    │
│ │ Đội ngũ EduMart                     │ │ │ Thông báo khai giảng│   │
│ └─────────────────────────────────────┘ │ │ 05/08/2025 · Tất cả│    │
│                                         │ ├────────────────────┤    │
│ 📬 Email sẽ được gửi đến 15.420 người  │ │ Flash Sale 8/3      │   │
│                                         │ │ 06/03/2025 · Buyer │    │
│ [🚀 Gửi email ngay] [👁 Xem trước]     │ └────────────────────┘    │
│ [🗑 Xóa nháp]                           │                           │
└─────────────────────────────────────────┴───────────────────────────┘
```

### 5.2 Màn hình Lịch sử Gửi

```
┌─────────────────────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────┐  ┌─────────┐  ┌──────────┐         │
│ │    6     │  │   92.180     │  │  45%    │  │   14%    │         │
│ │ Chiến dịch│  │ Tổng đã gửi │  │ Mở TB   │  │ Click TB │         │
│ └──────────┘  └──────────────┘  └─────────┘  └──────────┘         │
│                                                                     │
│ [Tìm theo tiêu đề...]                    [+ Tạo chiến dịch mới]   │
│                                                                     │
│ Tiêu đề / Thời gian  │ Nhóm  │  Gửi   │ Mở      │ Click  │ Xem   │
│─────────────────────────────────────────────────────────────────── │
│ Thông báo khai giảng │ Tất cả│ 15.420 │ ▓▓▓ 47% │ ▓▓ 14% │ [Xem] │
│ 05/08/2025 · Admin   │       │        │         │        │        │
│─────────────────────────────────────────────────────────────────── │
│ Flash Sale ngày 8/3  │ Buyer │ 11.231 │ ▓▓▓ 52% │ ▓▓▓ 28%│ [Xem] │
│ 06/03/2025 · Admin   │       │        │         │        │        │
│─────────────────────────────────────────────────────────────────── │
│ Chào mừng thành viên │ Mới   │  2.145 │ ▓▓ 38%  │ ▓ 18%  │ [Xem] │
│ 15/01/2025 · Admin   │       │        │         │        │        │
│                                                          [1][2]    │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Màn hình Newsletter

```
┌─────────────────────────────────────────────────────────────────────┐
│ ┌───────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│ │    20     │  │      17      │  │      3       │  │   85%     │  │
│ │  Tổng     │  │  Đang ĐK     │  │   Đã hủy     │  │ Duy trì   │  │
│ └───────────┘  └──────────────┘  └──────────────┘  └───────────┘  │
│                                                                     │
│ Nguồn subscriber:                                                   │
│ [12 Đăng ký] [5 Thanh toán] [3 Thêm thủ công]                     │
│                                                                     │
│ [Tìm email hoặc tên...] [Tất cả trạng thái ▾] [Tất cả nguồn ▾]   │
│                                                    20 kết quả      │
│                                                                     │
│ Tên / Email          │ Ngày ĐK    │ Nguồn  │ Trạng thái │ Hành động│
│─────────────────────────────────────────────────────────────────── │
│ Nguyễn An            │ 01/01/2025 │ Đăng ký│ ✅ Đang ĐK  │[Hủy ĐK] │
│ nguyen.an@gmail.com  │            │        │            │  [Xóa]  │
│─────────────────────────────────────────────────────────────────── │
│ Trần Bình            │ 02/01/2025 │ Thanh  │ ✅ Đang ĐK  │[Hủy ĐK] │
│ tran.binh@gmail.com  │            │ toán   │            │  [Xóa]  │
│─────────────────────────────────────────────────────────────────── │
│ Lê Cường             │ 03/01/2025 │ Đăng ký│ ❌ Đã hủy   │[Phục hồi│
│ le.cuong@gmail.com   │            │        │            │  [Xóa]  │
│                                                       [1][2]       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu suất

| Yêu cầu | Mức độ |
|---------|--------|
| Cập nhật banner số người nhận | Tức thì (DOM manipulation, không re-render) |
| Re-render sau gửi email | < 300ms (chuyển tab + renderAccount) |
| Popup xem trước / chi tiết | Mở < 500ms |
| Lọc/tìm kiếm newsletter | Tức thì (filter trên mảng < 1000 phần tử) |

### 6.2 Bảo mật

| Quy tắc | Áp dụng |
|---------|---------|
| Escape HTML đầu vào | `escHtml()` cho tên, email, tiêu đề trước khi render |
| Content email | Render nguyên HTML trong popup cách ly (`window.open`), không inject vào SPA DOM |
| Confirm trước destructive action | Xóa subscriber, gửi email (không thể thu hồi) |

### 6.3 Khả năng sử dụng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Responsive | 2-cột → 1-cột ở viewport < 900px |
| Trạng thái rỗng | Hiển thị thông báo "Chưa có chiến dịch nào" / "Không tìm thấy subscriber" |
| Placeholder editor | Chỉ dẫn soạn thảo hiển thị khi editor trống (CSS `:empty::before`) |
| Tooltip tiêu đề dài | `title` attribute cho tiêu đề bị cắt |

### 6.4 Lưu trữ

| Key | Cấu trúc |
|-----|---------|
| `emailCampaigns` | Mảng Campaign objects, lưu vào `localStorage` |
| `newsletterSubs` | Mảng Subscriber objects, lưu vào `localStorage` |

---

## 7. Tiêu chí chấp nhận

### 7.1 Soạn & Gửi Email

| # | Tiêu chí |
|---|---------|
| AC-01 | Admin có thể nhập tiêu đề, chọn nhóm nhận và soạn nội dung rich text |
| AC-02 | Số người nhận cập nhật ngay khi thay đổi nhóm nhận |
| AC-03 | Nhấn "Xem trước" mở popup HTML preview đúng định dạng |
| AC-04 | Gửi email thiếu tiêu đề hiển thị toast lỗi, không gửi |
| AC-05 | Gửi email thiếu nội dung hiển thị toast lỗi, không gửi |
| AC-06 | Gửi email hợp lệ yêu cầu confirm trước khi thực hiện |
| AC-07 | Sau khi gửi, campaign xuất hiện ở đầu tab Lịch sử gửi |
| AC-08 | Toast xác nhận hiển thị số lượng người đã gửi |
| AC-09 | Nhấn "Xóa nháp" reset form về mẫu mặc định sau confirm |

### 7.2 Lịch sử & Thống kê

| # | Tiêu chí |
|---|---------|
| AC-10 | KPI 4 card hiển thị đúng: số chiến dịch, tổng đã gửi, tỷ lệ mở TB, tỷ lệ click TB |
| AC-11 | Tỷ lệ mở ≥40% hiển thị màu xanh, 25–39% cam, <25% đỏ |
| AC-12 | Tỷ lệ click ≥20% hiển thị màu xanh, 10–19% cam, <10% đỏ |
| AC-13 | Tìm kiếm theo tiêu đề lọc đúng, không phân biệt hoa thường |
| AC-14 | Phân trang: 8 dòng/trang, điều hướng đúng |
| AC-15 | Nút "Xem" mở popup với đầy đủ stat + nội dung HTML của chiến dịch |

### 7.3 Newsletter

| # | Tiêu chí |
|---|---------|
| AC-16 | KPI: tổng, active, unsubscribed, tỷ lệ duy trì tính đúng |
| AC-17 | Block nguồn subscriber hiển thị đúng count cho mỗi nguồn |
| AC-18 | Bộ lọc trạng thái, nguồn, tìm kiếm hoạt động độc lập và kết hợp |
| AC-19 | Subscriber `active` chỉ hiển thị nút "Hủy đăng ký" (không có "Đăng ký lại") |
| AC-20 | Subscriber `unsubscribed` chỉ hiển thị nút "Đăng ký lại" (không có "Hủy đăng ký") |
| AC-21 | Hủy đăng ký yêu cầu confirm, đổi status đúng, toast phản hồi |
| AC-22 | Đăng ký lại không cần confirm, đổi status đúng, toast phản hồi |
| AC-23 | Xóa subscriber yêu cầu confirm với cảnh báo không hoàn tác |
| AC-24 | Sau xóa, subscriber biến mất khỏi danh sách và không còn trong localStorage |
| AC-25 | Phân trang: 10 dòng/trang, điều hướng đúng |

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Admin gửi nhầm nội dung hoặc sai nhóm — không thu hồi được | Cao | Confirm dialog rõ ràng; hiển thị popup xem trước; cảnh báo "không thể thu hồi" |
| R-02 | Nội dung email chứa HTML độc hại khi preview | Trung bình | Preview chạy trong `window.open` cách ly, không inject vào DOM chính |
| R-03 | Danh sách subscriber lớn làm chậm filter | Thấp | Filter trên mảng JS thuần (<10.000 phần tử); phân trang 10 dòng/trang |
| R-04 | Mất dữ liệu khi user xóa localStorage | Thấp | Seed data tự khởi tạo lại lần đầu; đây là giới hạn của kiến trúc demo |
| R-05 | Thống kê email (opened, clicked) không thực tế trong demo | Thấp | Seed data có sẵn các chỉ số hợp lý; nhãn rõ ràng đây là môi trường demo |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Soạn email với rich text editor (bold, italic, underline, H2, list, link)
- [x] Gửi email theo 4 nhóm người dùng
- [x] Banner số người nhận cập nhật real-time
- [x] Xem trước email trong popup HTML đúng định dạng
- [x] Lịch sử chiến dịch với tỷ lệ mở/click/bounce màu theo ngưỡng
- [x] Xem chi tiết từng chiến dịch
- [x] Danh sách subscriber với lọc 3 chiều (trạng thái, nguồn, tìm kiếm)
- [x] Hủy đăng ký / Khôi phục / Xóa subscriber

### P2 — Phát triển tiếp theo

- [ ] Lên lịch gửi email (scheduled email) theo giờ/ngày
- [ ] Mẫu email (template library) có sẵn cho các dịp phổ biến
- [ ] Segment subscriber nâng cao (theo hành vi mua, hạng thành viên)
- [ ] A/B testing tiêu đề email
- [ ] Export danh sách subscriber ra CSV

### P3 — Tính năng nâng cao

- [ ] Tích hợp email service thực (SendGrid / AWS SES)
- [ ] Tracking pixel để đo tỷ lệ mở thực tế
- [ ] Automated email triggers (chào mừng đăng ký, nhắc giỏ hàng bỏ quên)
- [ ] Double opt-in cho newsletter subscription
- [ ] Báo cáo xu hướng tỷ lệ tương tác theo thời gian

---

*Tài liệu này mô tả phân hệ Quản lý Email & Thông báo đã được triển khai trong phiên bản demo của EduMart Admin. Mọi chỉ số thống kê email trong demo là dữ liệu mẫu minh họa, không phản ánh gửi email thực tế.*
