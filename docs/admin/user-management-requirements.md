# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Người dùng — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 19/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Người dùng cung cấp cho quản trị viên EduMart công cụ toàn diện để theo dõi, kiểm soát và vận hành tất cả tài khoản người dùng trên nền tảng. Đây là thành phần cốt lõi trong hệ thống quản trị nội bộ, đảm bảo an toàn, minh bạch và tuân thủ chính sách sử dụng.

### 1.2 Phạm vi

Phân hệ bao gồm ba nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách người dùng** | Xem, tìm kiếm, lọc toàn bộ tài khoản trên hệ thống |
| **Quản lý tài khoản** | Xem chi tiết, khóa/mở khóa, đổi vai trò, reset mật khẩu, xóa mềm |
| **Tạo tài khoản Admin** | Thêm quản trị viên mới, phân cấp quyền hạn, chỉnh sửa, xóa |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Super Admin** | Quản trị viên toàn quyền | Toàn bộ tính năng |
| **Content Admin** | Quản trị nội dung | Xem danh sách, không quản lý admin |
| **Read-only Admin** | Chỉ xem báo cáo | Xem danh sách, không thực hiện hành động |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách người dùng

#### FR-01.1 Hiển thị danh sách

**Mô tả:** Hệ thống hiển thị toàn bộ tài khoản đã đăng ký dưới dạng bảng có phân trang.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Avatar | Chữ cái đầu tên, màu theo vai trò | Phân biệt nhanh vai trò |
| Tên / Email | Tên đầy đủ + địa chỉ email | |
| Vai trò | Badge màu + cấp quyền (nếu là admin) | |
| Trạng thái | Hoạt động / Bị khóa / Đã xóa | Badge màu xanh/đỏ/xám |
| Ngày tạo | DD/MM/YYYY | |
| Hành động | Nút "Xem" → mở chi tiết | |

**Phân trang:** 10 bản ghi/trang, hiển thị tổng số người dùng và số trang hiện tại.

**Màu sắc vai trò:**

| Vai trò | Màu |
|---------|-----|
| Học sinh | Xanh dương `#2980b9` |
| Sinh viên | Tím `#8e44ad` |
| Phụ huynh | Xanh lá `#27ae60` |
| Trường học | Cam `#e67e22` |
| Quản trị viên | Đỏ `#c0392b` |

#### FR-01.2 Tìm kiếm

**Mô tả:** Ô tìm kiếm realtime theo tên hoặc email.

**Quy tắc:**
- Tìm kiếm không phân biệt hoa/thường
- Khớp chuỗi con (substring match), không yêu cầu khớp đầy đủ
- Kết quả cập nhật ngay khi người dùng gõ (sự kiện `oninput`)
- Reset về trang đầu khi thay đổi từ khóa

**Ví dụ:** Gõ "nguyen" → hiển thị tất cả user có "Nguyen" hoặc "nguyen" trong tên hoặc email.

#### FR-01.3 Lọc theo vai trò

**Mô tả:** Dropdown lọc theo vai trò người dùng.

**Tùy chọn:**
- Tất cả vai trò *(mặc định)*
- Quản trị viên
- Học sinh
- Sinh viên
- Phụ huynh
- Trường học / Tổ chức
- Người bán

#### FR-01.4 Lọc theo trạng thái

**Mô tả:** Dropdown lọc theo trạng thái tài khoản.

**Tùy chọn:**
- Tất cả trạng thái *(mặc định)*
- Hoạt động
- Bị khóa
- Đã xóa

**Lưu ý:** Các bộ lọc có thể kết hợp đồng thời (AND logic).

#### FR-01.5 Xóa bộ lọc

Nút "Xóa lọc" reset toàn bộ: từ khóa tìm kiếm, bộ lọc vai trò, bộ lọc trạng thái về mặc định.

---

### 2.2 FR-02: Chi tiết tài khoản

#### FR-02.1 Xem hồ sơ

**Mô tả:** Trang chi tiết hiển thị đầy đủ thông tin của một người dùng.

**Thông tin hiển thị:**

| Trường | Mô tả |
|--------|-------|
| Avatar (chữ cái đầu) | Màu theo vai trò |
| Họ và tên | Font lớn, nổi bật |
| Email | |
| Vai trò | Badge màu |
| Cấp quyền admin | Nếu là admin: Toàn quyền / Chỉ xem / Nội dung |
| Trạng thái | Badge màu, kèm lý do nếu bị khóa |
| Ngày tạo tài khoản | |
| Điểm thưởng | |
| Số điện thoại | |
| Mã giới thiệu | |
| Phương thức đăng nhập | Email & Mật khẩu / Google / Facebook |
| Số lần bị khóa | Nếu có lịch sử khóa |
| Ngày khóa gần nhất | Nếu đang bị khóa |
| Ngày xóa | Nếu đã xóa mềm |

**Nhận diện "bạn":** Nếu đang xem chính tài khoản đang đăng nhập, hiển thị nhãn `(bạn)` bên cạnh tên.

#### FR-02.2 Khóa tài khoản

**Điều kiện áp dụng:** Tài khoản đang hoạt động, không phải chính mình.

**Luồng:**
1. Admin click "Khóa tài khoản"
2. Hệ thống hiện hộp thoại nhập lý do khóa
3. Admin nhập lý do → xác nhận
4. Hệ thống cập nhật `status='locked'`, lưu `lockedReason`, `lockedAt`, tăng `lockHistory`
5. Hiển thị toast xác nhận

**Dữ liệu ghi lại:**

```
status: 'locked'
lockedReason: string       // lý do do admin nhập
lockedAt: 'DD/MM/YYYY'    // ngày khóa
lockHistory: number        // đếm tổng số lần bị khóa
```

**Tác động:** Tài khoản bị khóa không thể đăng nhập; hệ thống hiển thị lý do khóa trên màn hình đăng nhập.

#### FR-02.3 Mở khóa tài khoản

**Điều kiện áp dụng:** Tài khoản đang bị khóa.

**Luồng:** Admin click "Mở khóa tài khoản" → cập nhật ngay, xóa `lockedReason` và `lockedAt`, set `status='active'`.

#### FR-02.4 Reset mật khẩu

**Mô tả:** Tạo mật khẩu tạm thời ngẫu nhiên cho người dùng.

**Luồng:**
1. Admin click "Reset mật khẩu"
2. Hệ thống tạo mật khẩu ngẫu nhiên dạng `Edu@XXXXX`
3. Cập nhật `pwHash` trong cơ sở dữ liệu
4. Hiển thị mật khẩu mới trong alert để admin sao chép gửi cho người dùng

**Lưu ý bảo mật:** Trong môi trường production, mật khẩu tạm thời phải được gửi qua email đến người dùng, không hiển thị trực tiếp trên màn hình.

#### FR-02.5 Đổi vai trò

**Mô tả:** Thay đổi vai trò (role) của người dùng.

**Tùy chọn vai trò:** Học sinh, Sinh viên, Phụ huynh, Trường học, Quản trị viên.

**Quy tắc:**
- Nếu đổi sang `admin`: tự động gán `adminLevel='readonly'` (cấp thấp nhất) nếu chưa có
- Nếu đổi từ `admin` sang vai trò khác: xóa trường `adminLevel`
- Hiển thị toast xác nhận sau khi áp dụng

#### FR-02.6 Xóa mềm tài khoản

**Mô tả:** Vô hiệu hóa tài khoản nhưng giữ lại toàn bộ lịch sử đơn hàng.

**Điều kiện áp dụng:** Tài khoản chưa bị xóa, không phải chính mình.

**Luồng:**
1. Admin click "Xóa mềm"
2. Hộp thoại xác nhận hiển thị cảnh báo giữ lịch sử
3. Admin xác nhận → set `deletedAt`, `status='deleted'`
4. Quay về danh sách

**Tác động:** Tài khoản xóa mềm không thể đăng nhập; không xuất hiện trên danh sách khi lọc trạng thái khác "Đã xóa".

#### FR-02.7 Khôi phục tài khoản

**Điều kiện áp dụng:** Tài khoản đang ở trạng thái "Đã xóa".

**Luồng:** Admin click "Khôi phục" → xóa `deletedAt`, set `status='active'` → toast xác nhận.

#### FR-02.8 Điều chỉnh cấp quyền Admin

**Điều kiện áp dụng:** Chỉ hiển thị khi người dùng có vai trò `admin`.

**Các cấp quyền:**

| Cấp | Mã | Mô tả |
|-----|----|-------|
| Toàn quyền | `super` | Truy cập và chỉnh sửa mọi tính năng, bao gồm quản lý admin khác |
| Chỉ xem | `readonly` | Xem báo cáo và dữ liệu, không thể thay đổi |
| Quản lý nội dung | `content` | Duyệt sản phẩm, shop, nội dung — không quản lý tài khoản |

**Luồng:** Admin click vào nút cấp quyền → lưu ngay → toast xác nhận.

---

### 2.3 FR-03: Tạo tài khoản Admin

#### FR-03.1 Form tạo mới

**Mô tả:** Form nhập liệu để tạo tài khoản quản trị viên mới.

**Trường dữ liệu:**

| Trường | Loại | Bắt buộc | Quy tắc |
|--------|------|----------|---------|
| Họ và tên | Text | Có | Không rỗng |
| Email | Email | Có | Định dạng hợp lệ, chưa tồn tại trong hệ thống |
| Mật khẩu | Password | Có | Tối thiểu 8 ký tự |
| Xác nhận mật khẩu | Password | Có | Khớp với mật khẩu |
| Cấp quyền | Radio card | Có | Mặc định: Toàn quyền |

**Layout cấp quyền:** 3 card chọn (radio) hiển thị tên + mô tả ngắn, card đang chọn có viền nổi bật.

#### FR-03.2 Validation

Lỗi hiển thị tại chỗ (inline error) trước khi submit:

| Trường hợp | Thông báo lỗi |
|------------|---------------|
| Tên rỗng | "Vui lòng nhập họ tên" |
| Email không hợp lệ | "Email không hợp lệ" |
| Mật khẩu < 8 ký tự | "Mật khẩu phải từ 8 ký tự trở lên" |
| Mật khẩu không khớp | "Mật khẩu xác nhận không khớp" |
| Email đã tồn tại | "Email này đã được sử dụng" |

#### FR-03.3 Luồng tạo thành công

1. Validate toàn bộ dữ liệu đầu vào
2. Tạo đối tượng user mới với `role='admin'`, `adminLevel` theo lựa chọn
3. Hash mật khẩu bằng `hashPw()`
4. Thêm vào `authUsers[]` và lưu localStorage
5. Hiển thị toast "Đã tạo Admin: [Tên]"
6. Tự động chuyển về danh sách người dùng

---

### 2.4 FR-04: Bảo vệ đăng nhập

**Mô tả:** Hệ thống từ chối đăng nhập với thông báo cụ thể nếu tài khoản không hợp lệ.

| Tình huống | Thông báo hiển thị |
|------------|-------------------|
| Sai email/mật khẩu | "Email hoặc mật khẩu không đúng. Quên mật khẩu?" |
| Tài khoản bị khóa | "Tài khoản đã bị khóa: [lý do]. Vui lòng liên hệ hỗ trợ." |
| Tài khoản đã xóa | "Tài khoản này đã bị xóa. Vui lòng liên hệ hỗ trợ." |

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm và lọc phải phản hồi trong < 100ms (xử lý client-side)
- Không có độ trễ nhận thấy khi chuyển trang phân trang
- Render danh sách 23 bản ghi không gây giật lag

### 3.2 NFR-02: Bảo mật

- **XSS Prevention:** Tất cả dữ liệu người dùng hiển thị trên giao diện phải qua hàm `escHtml()` để chống Cross-Site Scripting
- **Self-protection:** Admin không thể tự khóa hoặc xóa chính tài khoản đang đăng nhập
- **Mật khẩu:** Không lưu plaintext, chỉ lưu hash `pwHash`
- **Cấp quyền:** Cấp quyền `super` mới được phép quản lý tài khoản admin khác *(enforcement trong roadmap)*

### 3.3 NFR-03: Khả năng phục hồi dữ liệu

- Xóa tài khoản sử dụng kỹ thuật **soft delete** (xóa mềm): ghi nhận `deletedAt` và `status='deleted'`, không xóa vật lý khỏi bộ nhớ
- Lịch sử đơn hàng của tài khoản đã xóa vẫn được bảo toàn
- Tài khoản xóa mềm có thể được khôi phục bất kỳ lúc nào

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 600px | Grid chi tiết chuyển sang 2 cột; form tạo admin chuyển sang 1 cột; level cards xếp dọc |
| ≤ 860px | (kế thừa từ admin dashboard — không ảnh hưởng riêng module này) |

### 3.5 NFR-05: Nhất quán UI

- Màu badge theo vai trò nhất quán giữa danh sách và chi tiết
- Trạng thái khóa/xóa/hoạt động dùng cùng màu (đỏ/xám/xanh) trên toàn phân hệ
- Toast notification dùng cùng component với phần còn lại của ứng dụng

---

## 4. Mô hình dữ liệu

### 4.1 User Object

```javascript
{
  id: string,            // 'demo-admin' | 'mock-01' | 'adm' + timestamp
  name: string,          // Họ và tên đầy đủ
  email: string,         // Địa chỉ email (unique)
  pwHash: string,        // Hash mật khẩu: 'h' + abs(djb2).toString(36)
  role: RoleEnum,        // Vai trò (xem bảng dưới)
  adminLevel?: LevelEnum,// Chỉ có khi role='admin'
  status: StatusEnum,    // Trạng thái tài khoản
  points: number,        // Điểm thưởng tích lũy
  phone: string,         // Số điện thoại
  ref: string,           // Mã giới thiệu
  checkin: null | string,// Ngày check-in gần nhất
  streak: number,        // Chuỗi check-in liên tiếp
  createdAt: string,     // 'DD/MM/YYYY'
  provider?: string,     // 'google' | 'facebook' (OAuth)

  // Khóa tài khoản
  lockedReason?: string, // Lý do khóa
  lockedAt?: string,     // 'DD/MM/YYYY'
  lockHistory?: number,  // Đếm số lần bị khóa (cộng dồn)

  // Xóa mềm
  deletedAt?: string,    // 'DD/MM/YYYY'
}
```

### 4.2 Enums

```javascript
type RoleEnum = 'admin' | 'hocsinh' | 'sinhvien' | 'parent' | 'school' | 'seller'

type LevelEnum = 'super' | 'readonly' | 'content'

type StatusEnum = 'active' | 'locked' | 'deleted'
```

### 4.3 Status Logic

```
_admStatus(u):
  if u.deletedAt → 'deleted'
  else → u.status || 'active'
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng xem và xử lý tài khoản vi phạm

```
Admin → Tab "Người dùng"
  → Danh sách (tất cả người dùng)
  → Filter: Trạng thái = "Hoạt động" + Tìm kiếm tên nghi vấn
  → Click "Xem" vào user
  → Trang chi tiết: xem lịch sử, vai trò
  → Click "Khóa tài khoản"
  → Nhập lý do: "Vi phạm điều khoản sử dụng"
  → Toast: "Đã khóa: [Tên]"
  → Về danh sách: user hiển thị badge "Bị khóa"
```

### 5.2 Luồng tạo admin mới

```
Admin → Tab "Người dùng"
  → Click "+ Tạo Admin mới"
  → Điền form: Tên, Email, Mật khẩu ×2
  → Chọn cấp quyền (card radio)
  → Click "Tạo tài khoản"
  → [Validation pass] → Toast "Đã tạo Admin: ..."
  → Về danh sách: admin mới xuất hiện với badge "Quản trị viên"
```

### 5.3 Luồng khôi phục tài khoản đã xóa

```
Admin → Tab "Người dùng"
  → Filter: Trạng thái = "Đã xóa"
  → Tìm user cần khôi phục
  → Click "Xem" → Chi tiết
  → Click "Khôi phục"
  → Toast xác nhận
  → Trạng thái chuyển về "Hoạt động"
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Danh sách người dùng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Quản lý người dùng                             [+ Tạo Admin mới]       │
├─────────────────────────────────────────────────────────────────────────┤
│  [Tìm theo tên hoặc email...] [Tất cả vai trò ▼] [Tất cả trạng thái ▼] [Xóa lọc] │
├────┬──────────────────────┬──────────────────┬────────────┬─────────────┤
│    │ NGƯỜI DÙNG           │ VAI TRÒ          │ TRẠNG THÁI │ NGÀY TẠO   │
├────┼──────────────────────┼──────────────────┼────────────┼─────────────┤
│ A  │ Admin EduMart        │ Quản trị viên    │ ● Hoạt động│ 01/01/2025  │ [Xem]
│    │ admin@edumart.vn     │ Toàn quyền       │            │             │
├────┼──────────────────────┼──────────────────┼────────────┼─────────────┤
│ N  │ Nguyễn Học Sinh      │ Học sinh         │ ● Hoạt động│ 01/01/2025  │ [Xem]
│    │ hocsinh@demo.vn      │                  │            │             │
├────┼──────────────────────┼──────────────────┼────────────┼─────────────┤
│ H  │ Hoàng Thị Mai        │ Học sinh         │ ● Bị khóa  │ 18/04/2025  │ [Xem]
│    │ htmai@gmail.com      │                  │            │             │
└────┴──────────────────────┴──────────────────┴────────────┴─────────────┘
             ← Trước    Trang 1/3 · 23 người dùng    Tiếp →
```

### 6.2 Chi tiết tài khoản

```
← Danh sách người dùng

┌─────────────────────────────────────────────────────────────────────────┐
│  [H]  Hoàng Thị Mai                                                     │
│       htmai@gmail.com                                                   │
│       [Học sinh]  [● Bị khóa — Đăng sản phẩm giả mạo]                 │
│                                                                         │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                │
│  │ NGÀY TẠO      │ │ ĐIỂM THƯỞNG  │ │ SỐ ĐIỆN THOẠI│                │
│  │ 18/04/2025    │ │ 60            │ │ —             │                │
│  └───────────────┘ └───────────────┘ └───────────────┘                │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                │
│  │ MÃ GIỚI THIỆU│ │ ĐĂNG NHẬP QUA│ │ SỐ LẦN KHÓA  │                │
│  │ EDU9002       │ │ Email & MK    │ │ 1 lần         │                │
│  └───────────────┘ └───────────────┘ └───────────────┘                │
│                                                                         │
│  ĐỔI VAI TRÒ                                                           │
│  [Học sinh ▼]  [Áp dụng]                                               │
│                                                                         │
│  [Reset mật khẩu]  [Mở khóa tài khoản]  [Xóa mềm]                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Tạo Admin mới

```
← Danh sách người dùng

┌─────────────────────────────────────────────────────────────────────────┐
│  Tạo tài khoản Admin mới                                                │
│                                                                         │
│  Họ và tên                    Email                                     │
│  [Nguyễn Văn Admin      ]    [admin@edumart.vn          ]              │
│                                                                         │
│  Mật khẩu                    Xác nhận mật khẩu                         │
│  [••••••••               ]    [••••••••                  ]              │
│                                                                         │
│  Cấp quyền Admin                                                        │
│  ╔══════════════════╗  ┌──────────────────┐  ┌──────────────────────┐ │
│  ║ ✓ Toàn quyền    ║  │  Chỉ xem        │  │  Quản lý nội dung   │ │
│  ║ Truy cập & chỉnh║  │  Xem báo cáo,   │  │  Duyệt sản phẩm,    │ │
│  ║ sửa mọi tính    ║  │  không thay đổi │  │  shop — không QL TK │ │
│  ╚══════════════════╝  └──────────────────┘  └──────────────────────┘ │
│                                                                         │
│  [Tạo tài khoản]  [Hủy]                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách hiển thị đúng

- [ ] Mở tab "Người dùng", bảng hiển thị tối thiểu 10 bản ghi/trang
- [ ] Mỗi dòng có avatar, tên, email, vai trò (badge màu), trạng thái, ngày tạo
- [ ] Nút "Xem" chuyển đến trang chi tiết đúng người dùng

### AC-02: Tìm kiếm hoạt động

- [ ] Nhập "nguyen" → chỉ hiển thị user có "nguyen" trong tên hoặc email
- [ ] Xóa từ khóa → hiển thị lại toàn bộ
- [ ] Kết quả cập nhật ngay khi gõ, không cần nhấn Enter

### AC-03: Bộ lọc hoạt động

- [ ] Chọn "Bị khóa" → chỉ hiển thị user có `status='locked'`
- [ ] Chọn "Học sinh" → chỉ hiển thị user có `role='hocsinh'`
- [ ] Kết hợp hai bộ lọc cùng lúc → AND logic

### AC-04: Khóa tài khoản

- [ ] Click "Khóa" → hiện prompt nhập lý do
- [ ] Hủy prompt → không thay đổi gì
- [ ] Nhập lý do → trạng thái chuyển sang "Bị khóa", hiện badge đỏ kèm lý do
- [ ] User bị khóa đăng nhập → hiện thông báo lý do khóa

### AC-05: Xóa mềm và khôi phục

- [ ] Click "Xóa mềm" → hiện confirm dialog
- [ ] Xác nhận → trạng thái "Đã xóa", quay về danh sách
- [ ] Lọc "Đã xóa" → tìm thấy user vừa xóa
- [ ] Click "Xem" → chi tiết có nút "Khôi phục"
- [ ] Khôi phục → trạng thái về "Hoạt động"

### AC-06: Tạo Admin mới

- [ ] Bỏ trống tên → lỗi "Vui lòng nhập họ tên"
- [ ] Email đã tồn tại → lỗi "Email này đã được sử dụng"
- [ ] Mật khẩu < 8 ký tự → lỗi tương ứng
- [ ] Mật khẩu không khớp → lỗi tương ứng
- [ ] Điền đúng → admin mới xuất hiện trong danh sách với badge "Quản trị viên"

### AC-07: Bảo vệ tự khóa/xóa

- [ ] Đang đăng nhập bằng Admin A → vào chi tiết Admin A → **không** có nút "Khóa" và "Xóa mềm"

### AC-08: Điều chỉnh cấp quyền Admin

- [ ] Vào chi tiết user có `role='admin'` → hiện section "Cấp quyền Admin"
- [ ] Click "Chỉ xem" → toast xác nhận, nút "Chỉ xem" được highlight
- [ ] Vào chi tiết user thường → **không** hiện section cấp quyền admin

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| XSS qua tên/email người dùng | Cao | Áp dụng `escHtml()` bắt buộc trước khi render bất kỳ dữ liệu user nào |
| Admin tự xóa/khóa chính mình | Trung bình | Kiểm tra `user.id === u.id` trước khi hiển thị các nút nguy hiểm |
| Mất dữ liệu khi xóa nhầm | Trung bình | Soft delete bắt buộc; không có tính năng hard delete trong giao diện |
| Tạo admin tràn quyền | Trung bình | Mặc định cấp quyền thấp nhất (`readonly`) khi đổi role sang admin |
| Mật khẩu reset hiển thị công khai | Thấp | Ghi chú trong tài liệu: môi trường production phải dùng email OTP |
| Phân quyền chưa enforce ở tầng render | Thấp | Trong roadmap: kiểm tra `adminLevel` trước mỗi action |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Enforce phân quyền** | `readonly` admin không thể thực hiện hành động, chỉ xem |
| P1 | **Audit log** | Ghi lại lịch sử: ai đã khóa/mở khóa/xóa user nào, lúc nào |
| P2 | **Gửi email reset mật khẩu** | Thay thế alert bằng email thực gửi qua SMTP / SendGrid |
| P2 | **Bulk action** | Chọn nhiều user → khóa / xóa / đổi role hàng loạt |
| P2 | **Export danh sách** | Xuất CSV / Excel danh sách người dùng đã lọc |
| P3 | **Lịch sử đăng nhập** | Xem IP, thiết bị, thời gian đăng nhập của từng user |
| P3 | **2FA Admin** | Bắt buộc xác thực 2 bước cho tài khoản admin |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
