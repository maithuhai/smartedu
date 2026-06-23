# Tài liệu Phân tích Yêu cầu
## Chức năng: Dashboard Tổng quan — Phân hệ Quản trị viên
### EduMart — Sàn sách & thiết bị giáo dục

---

## 1. Thông tin tài liệu

| Trường | Nội dung |
|--------|----------|
| Dự án | EduMart |
| Phiên bản | 1.0 |
| Ngày tạo | 19/06/2026 |
| Trạng thái | Đang triển khai |
| Phạm vi | Màn hình Tổng quan trong phân hệ Quản trị viên |

---

## 2. Bối cảnh & Mục tiêu

### 2.1. Bối cảnh

EduMart là sàn thương mại điện tử chuyên về sách giáo khoa, văn phòng phẩm và thiết bị giáo dục. Hệ thống phục vụ nhiều nhóm người dùng (học sinh, sinh viên, phụ huynh, trường học, người bán). Quản trị viên cần một công cụ tập trung để giám sát vận hành toàn sàn theo thời gian thực và theo kỳ.

### 2.2. Mục tiêu chức năng

- Cung cấp bức tranh tổng thể về sức khỏe nền tảng tại một màn hình duy nhất.
- Giúp quản trị viên phát hiện bất thường (doanh thu sụt giảm, shop vi phạm, đơn hàng tồn đọng) sớm.
- Hỗ trợ ra quyết định dựa trên dữ liệu thay vì cảm tính.

### 2.3. Ngoài phạm vi (Out of Scope)

- Chỉnh sửa dữ liệu trực tiếp từ màn hình Tổng quan (chỉ xem).
- Export báo cáo (thuộc module Báo cáo riêng, phiên bản sau).
- Cảnh báo push notification / email (phiên bản sau).

---

## 3. Người dùng (Actor)

| Actor | Mô tả | Quyền trên Dashboard |
|-------|-------|----------------------|
| **Quản trị viên hệ thống** | Nhân viên nội bộ EduMart, toàn quyền vận hành | Xem toàn bộ |
| **Quản trị viên cấp khu vực** | Giám sát một vùng địa lý hoặc danh mục | Xem dữ liệu thuộc phạm vi được giao *(phiên bản sau)* |

Tài liệu này tập trung vào **Quản trị viên hệ thống**.

---

## 4. Yêu cầu Chức năng (Functional Requirements)

### FR-01 · Bộ chọn khoảng thời gian

| ID | FR-01 |
|----|-------|
| Tên | Chọn khoảng thời gian phân tích |
| Mô tả | Quản trị viên chọn một trong ba khoảng: **7 ngày**, **30 ngày**, **90 ngày**. Tất cả chỉ số trên màn hình cập nhật tức thì theo khoảng được chọn. |
| Kích hoạt | Click vào pill 7 / 30 / 90 ngày |
| Điều kiện tiên quyết | Người dùng đã xác thực với role `admin` |
| Kết quả | Toàn bộ KPI, biểu đồ, danh sách làm mới dữ liệu theo kỳ mới |
| Ghi chú | Mặc định hiển thị **30 ngày** khi vào màn hình |

---

### FR-02 · KPI Tổng quan (4 thẻ chỉ số)

| ID | FR-02 |
|----|-------|
| Tên | Hiển thị 4 thẻ KPI chính |
| Mô tả | Mỗi thẻ gồm: giá trị hiện tại, nhãn, số mới trong kỳ, % tăng trưởng so kỳ trước tương đương |

#### Danh sách KPI

| STT | Chỉ số | Giá trị hiển thị | Chỉ số phụ | Tăng trưởng |
|-----|--------|-----------------|------------|-------------|
| 1 | **Người dùng** | Tổng tài khoản đăng ký | + X tài khoản trong kỳ | % so kỳ trước |
| 2 | **Người bán** | Tổng shop đang hoạt động | + X shop mới trong kỳ | % so kỳ trước |
| 3 | **Sản phẩm** | Tổng SKU trên sàn | + X sản phẩm mới trong kỳ | % so kỳ trước |
| 4 | **Doanh thu** | Tổng GMV trong kỳ (VNĐ) | Hiển thị rút gọn (M / B) | % so kỳ trước |

#### Quy tắc hiển thị tăng trưởng

- `▲ X%` màu xanh lá → tăng trưởng dương
- `▼ X%` màu đỏ → tăng trưởng âm
- So sánh: kỳ hiện tại vs kỳ liền trước cùng độ dài (ví dụ: 30 ngày gần nhất vs 30 ngày trước đó)

---

### FR-03 · Hoạt động gần đây

| ID | FR-03 |
|----|-------|
| Tên | Luồng hoạt động thời gian thực |
| Mô tả | Danh sách sự kiện mới nhất trên nền tảng, sắp xếp theo thứ tự thời gian ngược (mới nhất trên cùng) |

#### Loại sự kiện

| Loại | Icon màu | Ví dụ nội dung |
|------|----------|----------------|
| `reg` — Đăng ký tài khoản | Xanh dương | "Nguyễn Thị Lan đăng ký tài khoản Học sinh" |
| `shop` — Shop chờ duyệt / được duyệt | Cam | "Shop VPP Minh Long đang chờ duyệt" |
| `order` — Đơn hàng mới | Xanh lá | "#EDU-28471 · Fahasa · 345.000đ" |

#### Quy tắc hiển thị

- Hiển thị **8 sự kiện** gần nhất, có thể mở rộng (phiên bản sau).
- Mỗi dòng gồm: icon màu · nội dung · thời gian tương đối ("2 phút trước").
- Có badge **● Trực tiếp** cho biết dữ liệu cập nhật liên tục.

---

### FR-04 · Top 5 Shop bán chạy

| ID | FR-04 |
|----|-------|
| Tên | Bảng xếp hạng shop theo doanh thu |
| Mô tả | Liệt kê 5 shop có GMV cao nhất trong khoảng thời gian đang chọn |

#### Thông tin mỗi dòng

| Trường | Mô tả |
|--------|-------|
| Thứ hạng | 1–5, hạng 1 highlight màu vàng |
| Tên shop | Tên đầy đủ của gian hàng |
| Thanh bar | Thể hiện tỷ lệ doanh thu so với shop đứng đầu (100%) |
| Doanh thu | GMV rút gọn (M / B VNĐ) |
| Số đơn | Tổng đơn hoàn thành trong kỳ |
| Tăng trưởng | % so kỳ trước (▲/▼) |

---

### FR-05 · Phân bổ doanh thu theo danh mục

| ID | FR-05 |
|----|-------|
| Tên | Biểu đồ thanh ngang — phân bổ theo danh mục |
| Mô tả | Hiển thị tỷ lệ % và giá trị tuyệt đối của từng danh mục sản phẩm trong tổng GMV kỳ đang chọn |

#### Danh mục

| Danh mục | Màu đại diện |
|----------|-------------|
| Sách giáo khoa | Đỏ `#c0392b` |
| Văn phòng phẩm | Cam `#e67e22` |
| Thiết bị giáo dục | Xanh dương `#2980b9` |
| Ebook & Audio | Xanh lá `#27ae60` |
| Khác | Tím `#8e44ad` |

#### Quy tắc

- Thanh bar ngang, chiều rộng = % đóng góp (tối đa 100%).
- Hiển thị: dấu chấm màu · tên danh mục · thanh bar · % · giá trị VNĐ rút gọn.
- Dòng cuối: tổng doanh thu toàn kỳ.

---

### FR-06 · Điều hướng phân hệ Admin

| ID | FR-06 |
|----|-------|
| Tên | Menu điều hướng sidebar cho Admin |
| Mô tả | Sidebar trái hiển thị các tab quản trị thay thế hoàn toàn sidebar người mua |

#### Các tab

| Tab | ID | Trạng thái |
|-----|----|-----------|
| Tổng quan | `dashboard` | ✅ Hoạt động |
| Người dùng | `adm-users` | 🔄 Phiên bản sau |
| Sản phẩm | `adm-products` | 🔄 Phiên bản sau |
| Đơn hàng | `adm-orders` | 🔄 Phiên bản sau |
| Shop / NCC | `adm-shops` | 🔄 Phiên bản sau |

---

## 5. Yêu cầu Phi chức năng (Non-functional Requirements)

| ID | Loại | Yêu cầu |
|----|------|---------|
| NFR-01 | Hiệu năng | Màn hình render trong < 300ms sau khi chọn khoảng thời gian |
| NFR-02 | Responsive | Hiển thị đúng trên màn 360px (mobile) đến 1920px (full HD); layout tự chuyển 2 cột → 1 cột dưới 860px |
| NFR-03 | Bảo mật | Chỉ người dùng có `user.role === 'admin'` mới được render nội dung; mọi route khác chuyển hướng về login |
| NFR-04 | Khả năng mở rộng | Dữ liệu mock có thể thay bằng API call mà không thay đổi cấu trúc UI |
| NFR-05 | Nhất quán | Dùng chung design token (CSS variables) với toàn bộ ứng dụng |

---

## 6. Mô hình dữ liệu (Data Model)

### 6.1. Dữ liệu tổng hợp theo kỳ

```
AdminPeriodStats {
  period:      7 | 30 | 90          // số ngày
  newUsers:    number                // người dùng mới trong kỳ
  newSellers:  number                // shop mới trong kỳ
  newProducts: number                // sản phẩm mới trong kỳ
  gmv:         number                // tổng doanh thu (VNĐ)
  growth: {
    users:     number                // % so kỳ trước
    sellers:   number
    products:  number
    revenue:   number
  }
}
```

### 6.2. Dữ liệu tích lũy (không phụ thuộc kỳ)

```
AdminTotals {
  totalUsers:    number              // tổng tài khoản từ đầu
  totalSellers:  number              // tổng shop đang hoạt động
  totalProducts: number              // tổng SKU hiện có
}
```

### 6.3. Sự kiện hoạt động

```
ActivityEvent {
  type:  'reg' | 'shop' | 'order'
  text:  string                      // mô tả ngắn
  time:  string                      // thời gian tương đối
}
```

### 6.4. Xếp hạng Shop

```
ShopRank {
  name:    string
  orders:  number                    // đơn hoàn thành trong kỳ
  revenue: number                    // GMV trong kỳ (VNĐ)
  growth:  number                    // % tăng trưởng so kỳ trước
}
```

### 6.5. Phân bổ danh mục

```
CategoryShare {
  name:    string
  pct:     number                    // phần trăm trong tổng GMV
  color:   string                    // màu hex
}
```

---

## 7. Luồng người dùng (User Flow)

```
[Người dùng truy cập /account]
        │
        ▼
[Kiểm tra user.role]
        │
   role==='admin'? ──No──▶ [renderLogin() hoặc dashboard người mua]
        │ Yes
        ▼
[renderAccount() → adminContent()]
        │
        ▼
[adminOverview() — mặc định 30 ngày]
   ┌────┴────────────────────────┐
   │                             │
[Click 7 ngày]           [Click 90 ngày]
   │                             │
   ▼                             ▼
[adminDays=7]             [adminDays=90]
[renderAccount()]         [renderAccount()]
   │                             │
   └──────────┬──────────────────┘
              ▼
     [adminOverview() với kỳ mới]
```

---

## 8. Mockup bố cục

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER NAV                                                     │
├──────────────┬──────────────────────────────────────────────────┤
│  Sidebar     │  Tổng quan hệ thống        [ 7 ngày ][ 30 ngày ][ 90 ngày ] │
│  ──────────  │  EduMart Admin · ngày      ────────────────────────────────  │
│  Tổng quan ● │                                                             │
│  Người dùng  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  Sản phẩm    │  │ 👤       │ │ 🏪       │ │ 📦       │ │ 📈       │      │
│  Đơn hàng    │  │ 48.200   │ │ 1.240    │ │ 34.800   │ │ 627Mđ    │      │
│  Shop / NCC  │  │ NGƯỜI    │ │ NGƯỜI    │ │ SẢN      │ │ DOANH    │      │
│  ──────────  │  │ DÙNG     │ │ BÁN      │ │ PHẨM     │ │ THU      │      │
│  Đăng xuất   │  │▲15.3%    │ │▲7.8%     │ │▲11.2%    │ │▲22.4%    │      │
│              │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│              │                                                             │
│              │  ┌───────────────────────┐  ┌──────────────────────────┐  │
│              │  │ Hoạt động gần đây ●   │  │ Top 5 shop bán chạy      │  │
│              │  │ ─────────────────     │  │ ──────────────────────── │  │
│              │  │ 👤 Đăng ký · 2 phút   │  │ 1. NXB Giáo dục VN ████ │  │
│              │  │ 🏪 Shop chờ · 8 phút  │  │ 2. Fahasa Official ███   │  │
│              │  │ 📦 #EDU-28471 · 12p   │  │ 3. Alphabooks ██         │  │
│              │  │ 👤 Trường · 25 phút   │  │ 4. Đinh Tị Books █       │  │
│              │  │ 🏪 Duyệt shop · 1g    │  │ 5. Sbooks █              │  │
│              │  │ ...                   │  │ ────────────────────────  │  │
│              │  └───────────────────────┘  │ Phân bổ doanh thu        │  │
│              │                             │ ● Sách GK  ████████  38% │  │
│              │                             │ ● VPP      █████     22% │  │
│              │                             │ ● Thiết bị ████      18% │  │
│              │                             │ ● Ebook    ███       14% │  │
│              │                             │ ● Khác     ██         8% │  │
│              │                             └──────────────────────────┘  │
└──────────────┴──────────────────────────────────────────────────────────┘
```

---

## 9. Điều kiện chấp nhận (Acceptance Criteria)

| ID | Tiêu chí | Cách kiểm tra |
|----|----------|---------------|
| AC-01 | Người dùng không phải admin không thể xem dashboard admin | Đăng nhập với role `hocsinh` → không thấy `.adm-kpi-grid` |
| AC-02 | 4 thẻ KPI hiển thị đúng giá trị cho từng kỳ | Chọn 7/30/90 ngày → doanh thu thay đổi tương ứng |
| AC-03 | Growth tag đổi màu đúng: xanh khi dương, đỏ khi âm | Kiểm tra shop "Đinh Tị Books" có `▼` đỏ |
| AC-04 | 8 dòng hoạt động gần đây hiển thị đủ | `document.querySelectorAll('.adm-act-row').length === 8` |
| AC-05 | Top 5 shop hiển thị đủ với bar chart | `document.querySelectorAll('.adm-shop-row').length === 5` |
| AC-06 | 5 danh mục hiển thị đủ, tổng = 100% | `38+22+18+14+8 === 100` |
| AC-07 | Layout 2 cột trên ≥860px, 1 cột trên <860px | Kiểm tra responsive tại 860px breakpoint |
| AC-08 | Không có JS error trên console | `console.error` = 0 khi render màn hình |

---

## 10. Rủi ro & Hạn chế (Risks & Constraints)

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Dữ liệu mock tĩnh, không phản ánh thực tế | Trung bình | Đánh dấu rõ "Demo data"; khi có API chỉ thay hàm `ADM` |
| R-02 | Không có auto-refresh dữ liệu | Thấp | Thêm polling/WebSocket khi có backend |
| R-03 | Số liệu KPI tích lũy (totals) không thay đổi theo kỳ | Thấp | Đây là thiết kế đúng — totals là snapshot toàn thời gian |
| R-04 | Màn hình không có phân quyền chi tiết (RBAC) | Trung bình | Phiên bản 1 chỉ có 2 level: admin / không phải admin |

---

## 11. Lịch sử thay đổi

| Ngày | Phiên bản | Thay đổi |
|------|-----------|---------|
| 19/06/2026 | 1.0 | Tạo tài liệu ban đầu, bao gồm FR-01 → FR-06, mockup, acceptance criteria |
