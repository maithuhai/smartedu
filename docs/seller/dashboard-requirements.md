# Yêu cầu chức năng: Dashboard Tổng quan — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai (Production)  
**Tác giả:** EduMart Platform Team

---

## 1. Tổng quan

### 1.1 Mục đích

Dashboard Tổng quan (`seller-dashboard`) là màn hình chính của Cổng Người bán EduMart, cung cấp cho seller một cái nhìn toàn cảnh về tình trạng hoạt động của gian hàng theo thời gian thực. Seller có thể theo dõi doanh thu, số đơn hàng, tồn kho và nhận cảnh báo nhanh mà không cần chuyển sang các module khác.

### 1.2 Phạm vi

| Thành phần | Mô tả |
|---|---|
| Tiêu đề gian hàng | Avatar, tên shop, danh mục, trạng thái hoạt động, chuông thông báo chưa đọc |
| Bộ chọn kỳ thống kê | Ba tab: Hôm nay / Tuần này / Tháng này |
| KPI Cards (4 thẻ) | Doanh thu, Đơn mới hôm nay, Sản phẩm đang bán, Cảnh báo tồn kho |
| Biểu đồ doanh thu 7 ngày | Bar chart CSS dọc theo ngày trong tuần |
| Bảng đơn hàng gần đây | Hiển thị 5 đơn mới nhất với trạng thái |
| Cảnh báo tồn kho | Banner cảnh báo cho sản phẩm hết/sắp hết hàng |
| Banner đình chỉ | Thông báo nếu tài khoản đang bị tạm đình chỉ |
| Nút hành động nhanh | Liên kết tới Sản phẩm, Thanh toán, Thông báo |

### 1.3 Tác nhân

| Tác nhân | Mô tả |
|---|---|
| Seller (đã duyệt) | Người dùng có tài khoản seller với `status === 'approved'` trong `sellerApps` và tồn tại trong `activeSellers` |
| Hệ thống EduMart | Cung cấp dữ liệu thống kê, đơn hàng, thông báo qua `localStorage` key `activeSellers` |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập (`user` tồn tại trong session).
- Hồ sơ đăng ký seller đã được Admin phê duyệt (`sellerApp.status === 'approved'`).
- Tồn tại bản ghi trong mảng `activeSellers` có `email === user.email`.
- Biến điều hướng `acctTab` được thiết lập thành `'seller-dashboard'`.

---

## 2. Yêu cầu chức năng

### FR-01: Kiểm tra điều kiện hiển thị

**Mô tả:** Trước khi render dashboard, hệ thống kiểm tra sự tồn tại của bản ghi seller trong `activeSellers`.

**Logic:**

```javascript
const s = activeSellers.find(x => x.email === user.email);
if (!s) return '<div class="panel"><p>Đang khởi tạo tài khoản seller…</p></div>';
```

- Nếu không tìm thấy bản ghi: hiển thị thông báo chờ khởi tạo.
- Nếu tìm thấy: tiến hành render toàn bộ dashboard.

---

### FR-02: Tiêu đề gian hàng (Shop Header)

**Mô tả:** Hiển thị thông tin định danh của gian hàng ở đầu trang.

**Các thành phần:**

| Thành phần | Nguồn dữ liệu | Ghi chú |
|---|---|---|
| Avatar | `s.shopName.charAt(0).toUpperCase()` | Chữ cái đầu tên shop, nền màu theo danh mục |
| Tên shop | `s.shopName` | Font đậm 17px |
| Badge danh mục | `NCC_CAT_LBL[s.category]`, `NCC_CAT_CLR[s.category]` | Màu nền theo danh mục |
| Badge trạng thái | `s.status` | Xem bảng trạng thái bên dưới |
| Ngày tham gia | `s.joinedAt` | Hiển thị dạng `dd/mm/yyyy` |
| Chuông thông báo | `s.sellerNotifs.filter(n => !n.read).length` | Chỉ hiện khi có thông báo chưa đọc |

**Bảng trạng thái tài khoản:**

| Giá trị `s.status` | Nhãn hiển thị | Màu |
|---|---|---|
| `'active'` | ● Hoạt động | `#27ae60` (xanh lá) |
| `'warning'` | ⚠ Cảnh báo | `#e67e22` (cam) |
| `'suspended'` | ⏸ Đình chỉ | `#c0392b` (đỏ) |
| `'locked'` | 🔒 Đã khóa | `#7f8c8d` (xám) |

**Danh mục và màu sắc:**

```javascript
const NCC_CAT_LBL = { sach:'Sách', vpp:'Văn phòng phẩm', tbgd:'Thiết bị GD', ebook:'Ebook', audiobook:'Sách nói' };
const NCC_CAT_CLR = { sach:'#c0392b', vpp:'#e67e22', tbgd:'#2980b9', ebook:'#27ae60', audiobook:'#8e44ad' };
```

**Badge thông báo chưa đọc:**

```javascript
const unread = sNotifs.filter(n => !n.read).length;
// Nếu unread > 0: hiển thị pill đỏ "🔔 N chưa đọc"
// Click → acctTab = 'seller-notif'; renderAccount()
```

---

### FR-03: Banner đình chỉ tài khoản

**Mô tả:** Khi `s.status === 'suspended'`, hiển thị banner cảnh báo ngay dưới header.

**Logic:**

```javascript
const suspHtml = s.status === 'suspended'
  ? '<div ...>⏸ Tài khoản đang bị đình chỉ đến ' + s.suspendedUntil + '. Lý do: ' + s.suspendedReason + '</div>'
  : '';
```

**Trường dữ liệu liên quan:**

- `s.suspendedUntil` — ngày hết hạn đình chỉ (ví dụ: `'12/07/2025'`)
- `s.suspendedReason` — lý do đình chỉ (ví dụ: `'Bán hàng giả mạo thương hiệu'`)

---

### FR-04: Bộ chọn kỳ thống kê (Period Selector)

**Mô tả:** Ba nút tab cho phép seller xem số liệu KPI theo kỳ thời gian khác nhau.

**Biến trạng thái:**

```javascript
let sellerDashPeriod = 'month'; // Mặc định: tháng này
```

**Ánh xạ dữ liệu:**

```javascript
const pData = {
  today: { o: st.todayOrders   || 0, r: st.todayRev    || 0, l: 'Hôm nay'    },
  week:  { o: st.thisWeekOrders|| 0, r: st.thisWeekRev  || 0, l: 'Tuần này'   },
  month: { o: st.thisMonthOrders||0, r: st.thisMonthRev  || 0, l: 'Tháng này'  }
};
const pd = pData[sellerDashPeriod] || pData.month;
```

**Hành vi:**

- Click một tab → `sellerDashPeriod = '<kỳ>'; renderAccount()` để re-render toàn bộ dashboard.
- Tab đang chọn: nền màu theo danh mục, viền màu, chữ đậm.
- Tab chưa chọn: nền trong suốt, viền xám, chữ nhạt.

---

### FR-05: KPI Cards (4 thẻ chỉ số chính)

**Mô tả:** Lưới 4 thẻ hiển thị các chỉ số quan trọng nhất của gian hàng.

**Grid layout:** `grid-template-columns: repeat(4, 1fr)`, khoảng cách 12px.

#### KPI Card 1 — Doanh thu

| Thuộc tính | Giá trị |
|---|---|
| Nhãn | `"Doanh thu · <kỳ>"` (kỳ phụ thuộc `sellerDashPeriod`) |
| Giá trị chính | `fmtMil(pd.r) + 'đ'` (định dạng triệu) |
| Chú thích phụ | `pd.o + ' đơn hoàn thành'` |
| Màu | Theo danh mục seller (`clr`) |
| Icon | SVG tiền tệ (dollar sign) |

#### KPI Card 2 — Đơn mới hôm nay

| Thuộc tính | Giá trị |
|---|---|
| Nhãn | `"Đơn mới hôm nay"` (cố định, không đổi theo period) |
| Giá trị chính | `st.todayOrders || 0` |
| Chú thích phụ | `"đơn hàng mới nhận"` |
| Màu | `#2980b9` (xanh dương) |
| Icon | SVG giỏ hàng |

#### KPI Card 3 — Sản phẩm đang bán

| Thuộc tính | Giá trị |
|---|---|
| Nhãn | `"Sản phẩm đang bán"` |
| Giá trị chính | `s.totalProducts \|\| products.length \|\| 0` |
| Chú thích phụ | `"mặt hàng trong kho"` |
| Màu | `#27ae60` (xanh lá) |
| Icon | SVG sách mở |

#### KPI Card 4 — Cảnh báo tồn kho

| Thuộc tính | Giá trị |
|---|---|
| Nhãn | `"Cảnh báo tồn kho"` |
| Giá trị chính | `allWarn.length` (tổng sản phẩm cần chú ý) |
| Chú thích phụ | Nếu có cảnh báo: `"X hết · Y sắp hết"`, không có: `"Tồn kho ổn định"` |
| Màu | `#e67e22` nếu `allWarn.length > 0`, xám nếu bình thường |
| Icon | SVG tam giác cảnh báo |

**Logic tính cảnh báo tồn kho:**

```javascript
const products   = s.products || [];
const outOfStock = products.filter(p => p.stock === 0);
const lowStock   = products.filter(p => p.stock > 0 && p.stock <= 5);
const allWarn    = [
  ...outOfStock.map(p => ({ ...p, wt: 'out' })),
  ...lowStock.map(p =>   ({ ...p, wt: 'low' }))
];
```

- Hết hàng (`wt: 'out'`): `stock === 0`
- Sắp hết (`wt: 'low'`): `0 < stock <= 5`

---

### FR-06: Biểu đồ doanh thu 7 ngày

**Mô tả:** Bar chart dọc hiển thị doanh thu theo từng ngày trong 7 ngày gần nhất, được tô bằng CSS thuần.

**Nguồn dữ liệu:**

```javascript
const chart     = s.revenueChart     || [0, 0, 0, 0, 0, 0, 0]; // Giá trị doanh thu mỗi ngày (VNĐ)
const chartDays = s.revenueChartDays || ['T2','T3','T4','T5','T6','T7','CN']; // Nhãn ngày
const maxR      = Math.max(...chart, 1); // Giá trị max (dùng làm chuẩn chiều cao)
const CH        = 80; // Chiều cao tối đa cột (px)
```

**Cấu trúc render (3 hàng từ trên xuống):**

1. **Hàng giá trị** (`valRow`): Số rút gọn trên mỗi cột (đơn vị `k` = nghìn đồng). Chỉ hiển thị khi `v > 0`.
2. **Hàng cột** (`barRow`): Cột có chiều cao tỷ lệ thuận với doanh thu. Cột cuối cùng (hôm nay) tô màu đậm theo danh mục, các cột còn lại tô màu nhạt hơn 40% (`clr + '66'`).
3. **Hàng nhãn ngày** (`dayRow`): Nhãn `T2–CN` hoặc tương đương. Nhãn cột cuối cùng tô màu danh mục.

**Công thức tính chiều cao cột:**

```javascript
height: Math.max(Math.round((v / maxR) * CH), 3) + 'px'
// Tối thiểu 3px để cột không biến mất khi giá trị = 0
```

---

### FR-07: Bảng đơn hàng gần đây

**Mô tả:** Bảng hiển thị tối đa 5 đơn hàng mới nhất từ `s.recentOrders`.

**Nguồn dữ liệu:**

```javascript
const rOrders = s.recentOrders || [];
rOrders.slice(0, 5) // Chỉ lấy 5 đơn đầu tiên
```

**Cột bảng:**

| Cột | Trường | Mô tả |
|---|---|---|
| Đơn | `o.id` | Mã đơn hàng, in đậm |
| Khách hàng | `o.buyer` | Tên người mua |
| SP | `o.items` | Số lượng sản phẩm trong đơn, căn giữa |
| Doanh thu | `o.revenue` | Giá trị đơn (`fmtBig()` + `đ`), in đậm |
| Trạng thái | `o.status` | Badge màu theo trạng thái |
| Ngày | `o.date` | Ngày đặt hàng |

**Ánh xạ trạng thái đơn hàng:**

```javascript
const oStLbl = {
  pending:    'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipping:   'Đang giao',
  delivered:  'Đã giao',
  cancelled:  'Đã hủy'
};
const oStClr = {
  pending:    '#e67e22',  // Cam
  processing: '#2980b9',  // Xanh dương
  shipping:   '#8e44ad',  // Tím
  delivered:  '#27ae60',  // Xanh lá
  cancelled:  '#7f8c8d'   // Xám
};
```

**Trạng thái rỗng:** Khi `rOrders.length === 0`, hiển thị một hàng duy nhất colspan=6 với thông báo `"Chưa có đơn hàng nào"`.

---

### FR-08: Banner cảnh báo tồn kho

**Mô tả:** Khi `allWarn.length > 0`, hiển thị một banner màu vàng liệt kê từng sản phẩm cần chú ý.

**Logic hiển thị:**

```javascript
const stockHtml = allWarn.length
  ? '<div style="background:#fff9f0;border:1.5px solid #f5c518...">...' // Banner cảnh báo
  : ''; // Ẩn hoàn toàn khi không có cảnh báo
```

**Nội dung từng thẻ sản phẩm:**

| Loại cảnh báo | Icon | Màu viền | Văn bản |
|---|---|---|---|
| `wt === 'out'` (hết hàng) | 🔴 | `#e74c3c` (đỏ) | `"Hết hàng"` |
| `wt === 'low'` (sắp hết) | 🟡 | `#f39c12` (vàng) | `"Còn X cái"` |

Banner chỉ hiển thị tổng số sản phẩm cần cảnh báo trong tiêu đề: `"⚠ Cảnh báo Tồn kho (N)"`.

---

### FR-09: Nút hành động nhanh (Quick Actions)

**Mô tả:** Lưới 3 cột nút ở cuối dashboard cho phép seller điều hướng nhanh đến các module khác.

**Grid layout:** `grid-template-columns: repeat(3, 1fr)`, khoảng cách 10px.

| Nút | Điều hướng | Ghi chú |
|---|---|---|
| Quản lý sản phẩm | `acctTab = 'seller-products'; renderAccount()` | Icon sách mở |
| Thông tin thanh toán | `acctTab = 'seller-payment'; renderAccount()` | Icon thẻ tín dụng |
| Thông báo | `acctTab = 'seller-notif'; renderAccount()` | Hiển thị số chưa đọc nếu có, badge đỏ |

**Logic nhãn nút thông báo:**

```javascript
// Nếu unread > 0:
'Thông báo (' + unread + ')'
// Kèm badge đỏ nhỏ hiển thị số
```

---

### FR-10: Điều hướng về Dashboard

**Mô tả:** Seller có thể vào dashboard từ nhiều điểm trong ứng dụng.

**Các điểm vào:**

| Nguồn | Code |
|---|---|
| Sau khi hồ sơ được duyệt | `acctTab='seller-dashboard'; renderAccount()` |
| Banner trạng thái `approved` | Link "Vào Tổng quan ›" |
| Navigation sidebar | Tab "Tổng quan" trong menu seller |

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng Seller (activeSellers entry)

```javascript
{
  // Thông tin định danh
  id:             string,          // 'seller-sapp-001', 'seller-001', ...
  shopName:       string,          // 'Sách & VPP Minh Long'
  ownerName:      string,          // 'Nguyễn Văn Long'
  email:          string,          // Khóa tra cứu từ user.email
  phone:          string,          // '0912 345 678'
  joinedAt:       string,          // 'dd/mm/yyyy'
  category:       'sach'|'vpp'|'tbgd'|'ebook'|'audiobook',
  rating:         number,          // 0–5.0
  totalProducts:  number,

  // Trạng thái tài khoản
  status:         'active'|'warning'|'suspended'|'locked',
  suspendedUntil: string|undefined,    // 'dd/mm/yyyy'
  suspendedReason:string|undefined,

  // Thống kê (object stats)
  stats: {
    totalOrders:      number,
    totalRevenue:     number,          // VNĐ
    returnRate:       number,          // %
    todayOrders:      number,
    todayRev:         number,          // VNĐ
    thisWeekOrders:   number,
    thisWeekRev:      number,          // VNĐ
    thisMonthOrders:  number,
    thisMonthRev:     number,          // VNĐ
    growth:           number           // % tăng trưởng so với kỳ trước
  },

  // Biểu đồ doanh thu 7 ngày
  revenueChart:     number[],          // [320000, 480000, ..., 285000] — 7 phần tử
  revenueChartDays: string[],          // ['T3','T4','T5','T6','T7','CN','T2']

  // Đơn hàng gần đây (dùng cho dashboard)
  recentOrders: [
    {
      id:      string,    // '#ORD-2025-089'
      buyer:   string,    // Tên người mua
      items:   number,    // Số lượng mặt hàng
      revenue: number,    // VNĐ
      status:  'pending'|'processing'|'shipping'|'delivered'|'cancelled',
      date:    string     // 'dd/mm/yyyy'
    }
  ],

  // Sản phẩm (để tính cảnh báo tồn kho)
  products: [
    {
      id:    string,
      name:  string,
      stock: number,       // 0 = hết hàng, 1–5 = sắp hết
      price: number,
      sold:  number,
      status:'active'|'draft'|'outofstock'
      // ... các trường khác
    }
  ],

  // Thông báo seller
  sellerNotifs: [
    {
      id:   string,
      type: 'order'|'report'|'review'|'stock',
      t:    string,          // Nội dung thông báo
      time: string,          // '15 phút trước', '2 giờ trước', ...
      read: boolean
    }
  ],

  // Quản trị
  violations:        array,
  commissionOverride:number|null,
  warnings:          number
}
```

### 3.2 Biến trạng thái module Dashboard

| Biến | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `sellerDashPeriod` | `string` | `'month'` | Kỳ thống kê đang chọn: `'today'`, `'week'`, `'month'` |
| `acctTab` | `string` | `''` | Tab hiện tại của Account panel; phải là `'seller-dashboard'` |
| `user` | `object` | — | Đối tượng người dùng đang đăng nhập, dùng `user.email` để tra cứu |
| `activeSellers` | `array` | — | Mảng toàn bộ seller, đọc từ `localStorage` key `'activeSellers'` |

### 3.3 Hàm tiện ích liên quan

| Hàm | Mục đích |
|---|---|
| `sellerDashboard(app)` | Hàm render chính của dashboard |
| `saveActiveSellers()` | Lưu mảng `activeSellers` vào `localStorage` |
| `renderAccount()` | Re-render toàn bộ Account panel (kích hoạt khi đổi tab/kỳ) |
| `fmtMil(n)` | Định dạng số lớn theo triệu (ví dụ: `4.1M`) |
| `fmtBig(n)` | Định dạng số với dấu phân cách hàng nghìn |
| `escHtml(s)` | Escape HTML để tránh XSS |

### 3.4 localStorage Keys

| Key | Nội dung |
|---|---|
| `'activeSellers'` | Mảng JSON toàn bộ tài khoản seller đã được duyệt |
| `'sellerApps'` | Mảng hồ sơ đăng ký seller (bao gồm `status: 'approved'`) |

---

## 4. Luồng hoạt động

### 4.1 Luồng render Dashboard

```
Người dùng truy cập trang Account
        │
        ▼
acctTab === 'seller-dashboard' ?
        │
        ├─ Không → Render tab tương ứng
        │
        └─ Có
              │
              ▼
        isApproved ?  (sellerApp.status === 'approved')
              │
              ├─ Không → sellerAppStatus(myApp)
              │          (Banner chờ duyệt/từ chối/bổ sung)
              │
              └─ Có
                    │
                    ▼
              activeSellers.find(x => x.email === user.email)
                    │
                    ├─ Không tìm thấy → "Đang khởi tạo tài khoản..."
                    │
                    └─ Tìm thấy (s)
                          │
                          ▼
                    Tính toán: outOfStock, lowStock, allWarn,
                               rOrders, sNotifs, unread,
                               pd (theo sellerDashPeriod),
                               chart, maxR
                          │
                          ▼
                    Render HTML:
                    1. Shop Header
                    2. Banner đình chỉ (nếu có)
                    3. Period tabs
                    4. KPI Cards (4 thẻ)
                    5. Chart + Recent orders (2 cột)
                    6. Stock warning banner (nếu có)
                    7. Quick action buttons
```

### 4.2 Luồng đổi kỳ thống kê

```
Seller click tab "Hôm nay" / "Tuần này" / "Tháng này"
        │
        ▼
sellerDashPeriod = '<kỳ mới>'
        │
        ▼
renderAccount()  ← re-render toàn bộ Account panel
        │
        ▼
sellerDashboard() đọc pd = pData[sellerDashPeriod]
        │
        ▼
KPI Card 1 cập nhật: doanh thu & số đơn theo kỳ mới
(Các KPI khác không thay đổi vì là chỉ số tuyệt đối)
```

### 4.3 Luồng điều hướng từ Quick Actions

```
Seller click "Quản lý sản phẩm"
        │
        ▼
acctTab = 'seller-products'
renderAccount()
        │
        ▼
sellerProductList() được render

─────────────────────────────

Seller click "Thông báo" (có N chưa đọc)
        │
        ▼
acctTab = 'seller-notif'
renderAccount()
        │
        ▼
sellerNotifCenter() được render
(Danh sách thông báo với badge chưa đọc)
```

---

## 5. Giao diện người dùng

### 5.1 Layout tổng thể Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  [M] Sách & VPP Minh Long                    🔔 2 chưa đọc    │
│      Sách  ● Hoạt động  · Tham gia 12/06/2025                  │
├─────────────────────────────────────────────────────────────────┤
│  [Hôm nay]  [Tuần này]  [Tháng này*]                           │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│ Doanh thu    │ Đơn mới      │ Sản phẩm     │ Cảnh báo tồn kho  │
│ Tháng này    │ hôm nay      │ đang bán     │                    │
│              │              │              │                    │
│  4.1Mđ       │      3       │      6       │        2           │
│ 52 đơn hc    │ đơn mới nhận │ mặt hàng     │ 1 hết · 1 sắp hết │
├──────────────┴──┬───────────┴──────────────┴────────────────────┤
│ Doanh thu 7 ngày│          Đơn hàng gần đây                    │
│                 │  Đơn       Khách    SP   DT       TT    Ngày  │
│    ██          │  ORD-089  Hoa       3   245K  Chờ xđ  23/6   │
│  ████    ██   │  ORD-088  Nam       1    32K  Đã giao  22/6   │
│ ██████  ████  │  ORD-087  Linh      2   128K  Đang giao 22/6  │
│ T3 T4 T5 T6 T7│  ORD-086  Phm Nam  4   380K  Đã giao  21/6   │
│ CN T2(hôm nay)│  ORD-085  Tú        1    88K  Đã giao  20/6   │
├─────────────────┴─────────────────────────────────────────────── │
│ ⚠ Cảnh báo Tồn kho (2)                                         │
│ 🔴 Dế Mèn Phiêu Lưu Ký — Hết hàng                              │
│ 🟡 Bộ SGK Lớp 5 Kết nối tri thức — Còn 3 cái                  │
├─────────────────────────────────────────────────────────────────┤
│ [📚 Quản lý sản phẩm ›] [💳 Thông tin thanh toán ›] [🔔 Thông báo (2) ›] │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Mockup KPI Cards

```
┌────────────────────┐ ┌────────────────────┐
│ $  DOANH THU       │ │ 🛒 ĐƠN MỚI HÔM NAY │
│    THÁNG NÀY       │ │                    │
│                    │ │                    │
│    4.1Mđ           │ │        3           │
│  52 đơn hoàn thành │ │  đơn hàng mới nhận │
└────────────────────┘ └────────────────────┘
┌────────────────────┐ ┌────────────────────┐
│ 📖 SẢN PHẨM        │ │ ⚠ CẢNH BÁO TỒN KHO│
│    ĐANG BÁN        │ │ (màu cam, nền cam) │
│                    │ │                    │
│        6           │ │        2           │
│  mặt hàng trong kho│ │  1 hết · 1 sắp hết │
└────────────────────┘ └────────────────────┘
```

### 5.3 Mockup Biểu đồ Doanh thu 7 ngày

```
  720k
        █
  480k  │
      ██│
  320k  │   █
      ██│  ██   █
  215k  │  ██  ██  █
      ██│ ███ ███ ██
       T3  T4  T5  T6  T7  CN  T2
                               (hôm nay — màu đậm)
```

### 5.4 Mockup Bảng đơn hàng gần đây

```
┌──────────────┬───────────────┬────┬─────────┬─────────────┬────────┐
│ Đơn          │ Khách hàng    │ SP │ Doanh   │ Trạng thái  │ Ngày   │
│              │               │    │ thu     │             │        │
├──────────────┼───────────────┼────┼─────────┼─────────────┼────────┤
│ #ORD-2025-089│ Nguyễn Thị Hoa│  3 │ 245,000 │[Chờ xác nhận│23/06/25│
│ #ORD-2025-088│ Trần Văn Nam  │  1 │  32,000 │ [Đã giao]   │22/06/25│
│ #ORD-2025-087│ Lê Thị Linh   │  2 │ 128,000 │ [Đang giao] │22/06/25│
│ #ORD-2025-086│ Phạm Hoài Nam │  4 │ 380,000 │ [Đã giao]   │21/06/25│
│ #ORD-2025-085│ Nguyễn Văn Tú │  1 │  88,000 │ [Đã giao]   │20/06/25│
└──────────────┴───────────────┴────┴─────────┴─────────────┴────────┘
```

### 5.5 Mockup Banner Cảnh báo Tồn kho

```
┌───────────────────────────────────────────────────────────────┐
│ ⚠ Cảnh báo Tồn kho (2)                          nền vàng nhạt│
│ ┌─────────────────────────────────┐ ┌──────────────────────┐  │
│ │ 🔴 Dế Mèn Phiêu Lưu Ký        │ │ 🟡 Bộ SGK Lớp 5     │  │
│ │    Hết hàng        (viền đỏ)   │ │    Còn 3 cái (viền   │  │
│ └─────────────────────────────────┘ │    vàng)             │  │
│                                     └──────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### 5.6 Mockup Quick Action Buttons

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ 📖 Quản lý sản phẩm   › │ 💳 Thông tin thanh toán ›│ 🔔 Thông báo (2)  [2] › │
│  (nền trắng, viền xám)   │  (nền trắng, viền xám)   │  (badge đỏ số 2)        │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Tiêu chí | Yêu cầu |
|---|---|
| Thời gian render | < 100ms cho dashboard với dữ liệu đầy đủ |
| Số lần re-render khi đổi kỳ | 1 lần duy nhất (không re-fetch) |
| Tính toán `allWarn` | O(n) với n là số sản phẩm |
| Số đơn hàng hiển thị | Giới hạn cứng 5 đơn (`rOrders.slice(0, 5)`) |
| Số ngày trong biểu đồ | Cố định 7 ngày |

### 6.2 Bảo mật

| Tiêu chí | Yêu cầu |
|---|---|
| Kiểm tra phiên đăng nhập | `user` phải tồn tại, nếu không redirect về trang đăng nhập |
| Phân quyền | Chỉ seller đã duyệt (`isApproved === true`) mới xem được dashboard |
| Tách biệt dữ liệu | Chỉ tra cứu dữ liệu theo `user.email`, không truy cập dữ liệu seller khác |
| Escape đầu ra | Mọi chuỗi từ `localStorage` đều được `escHtml()` trước khi render |
| Không có API call | Toàn bộ dữ liệu từ `localStorage` — không có nguy cơ IDOR phía server trong phase này |

### 6.3 Trải nghiệm người dùng

| Tiêu chí | Yêu cầu |
|---|---|
| Responsive | Grid KPI Cards tự co lại trên màn hình nhỏ (`flex-wrap`) |
| Feedback ngay lập tức | Đổi kỳ thống kê re-render ngay, không có loading state |
| Trạng thái rỗng | Mọi section đều có fallback khi không có dữ liệu |
| Màu sắc nhất quán | Màu danh mục được áp dụng xuyên suốt: avatar, KPI card 1, border tab đang chọn, cột cuối biểu đồ |
| Khả năng đọc | Font size tối thiểu 11px, nhãn uppercase cho header KPI |

### 6.4 Khả năng mở rộng

| Tiêu chí | Yêu cầu |
|---|---|
| Thêm kỳ mới | Chỉ cần thêm entry vào object `pData` |
| Thêm KPI card | Chỉnh CSS grid columns và thêm HTML card |
| Thêm cột bảng | Mở rộng `rOrders` object và cập nhật template |
| Thêm loại cảnh báo | Mở rộng logic `allWarn` với điều kiện mới |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Seller đã duyệt (`status === 'approved'`) truy cập `acctTab='seller-dashboard'` thấy dashboard đầy đủ.

**AC-02:** Seller chưa duyệt hoặc bị từ chối không thể thấy dashboard — được redirect sang `sellerAppStatus()`.

**AC-03:** KPI Card "Doanh thu" hiển thị đúng giá trị theo kỳ đang chọn (Hôm nay / Tuần này / Tháng này).

**AC-04:** KPI Card "Đơn mới hôm nay" luôn hiển thị `st.todayOrders` bất kể kỳ đang chọn.

**AC-05:** KPI Card "Cảnh báo tồn kho" có màu cam và hiển thị số lượng khi có ít nhất 1 sản phẩm `stock === 0` hoặc `stock <= 5`.

**AC-06:** KPI Card "Cảnh báo tồn kho" hiển thị màu xám và "Tồn kho ổn định" khi tất cả sản phẩm có `stock > 5`.

**AC-07:** Biểu đồ 7 ngày có cột cuối cùng màu đậm hơn các cột còn lại, tương ứng với ngày gần nhất.

**AC-08:** Bảng đơn hàng gần đây hiển thị tối đa 5 dòng, badge trạng thái đúng màu.

**AC-09:** Bảng đơn hàng hiển thị thông báo "Chưa có đơn hàng nào" khi `recentOrders` rỗng.

**AC-10:** Banner cảnh báo tồn kho xuất hiện khi có sản phẩm hết/sắp hết, ẩn hoàn toàn khi không có cảnh báo.

**AC-11:** Banner đình chỉ (`s.status === 'suspended'`) hiển thị đúng ngày và lý do đình chỉ.

**AC-12:** Badge thông báo chưa đọc hiển thị đúng số lượng. Click vào badge → chuyển sang `'seller-notif'`.

**AC-13:** Nút "Quản lý sản phẩm" → chuyển sang `'seller-products'` thành công.

**AC-14:** Nút "Thông tin thanh toán" → chuyển sang `'seller-payment'` thành công.

**AC-15:** Đổi kỳ thống kê (tab) cập nhật ngay KPI Card doanh thu mà không reload trang.

**AC-16:** Tên shop, tên khách hàng, lý do đình chỉ đều được `escHtml()` — không thể inject HTML/JS.

**AC-17:** Dashboard hiển thị thông báo "Đang khởi tạo tài khoản seller…" nếu seller được duyệt nhưng chưa có bản ghi trong `activeSellers`.

**AC-18:** Màu sắc của avatar, KPI card 1, tab đang chọn và cột cuối biểu đồ khớp với màu danh mục (`NCC_CAT_CLR[s.category]`).

---

## 8. Rủi ro và Giải pháp

| Rủi ro | Mức độ | Giải pháp đã áp dụng |
|---|---|---|
| `s.stats` undefined — crash khi truy cập `st.todayOrders` | Trung bình | `const st = s.stats \|\| {}` — destructure an toàn với fallback `{}` |
| `s.products` undefined — crash khi tính `allWarn` | Trung bình | `const products = s.products \|\| []` |
| `s.revenueChart` không đủ 7 phần tử — `maxR = 0` gây chia cho 0 | Cao | `const maxR = Math.max(...chart, 1)` — luôn tối thiểu 1 |
| Cột biểu đồ có chiều cao 0px khi giá trị = 0 | Thấp | `Math.max(Math.round(...), 3)` — tối thiểu 3px |
| `s.sellerNotifs` undefined — crash khi đếm chưa đọc | Thấp | `const sNotifs = s.sellerNotifs \|\| []` |
| XSS qua dữ liệu `shopName`, `buyer` | Cao | `escHtml()` áp dụng cho mọi giá trị render |
| Dữ liệu `recentOrders` có nhiều hơn 5 đơn — render chậm | Thấp | `.slice(0, 5)` giới hạn cứng |
| Seller bị đình chỉ vẫn thấy và thao tác trên dashboard | Trung bình | Hiển thị banner đình chỉ rõ ràng; logic đình chỉ thực sự do Admin áp dụng ở phía backend |
| Dữ liệu `revenueChart` không đồng bộ với `recentOrders` | Thấp | Phase hiện tại: dữ liệu là seed tĩnh; cần đồng bộ khi chuyển sang API thực |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (Hiện tại)

- [x] Shop header với avatar, badge danh mục, trạng thái, badge thông báo chưa đọc
- [x] Bộ chọn kỳ thống kê 3 tab (Hôm nay / Tuần này / Tháng này)
- [x] 4 KPI cards: Doanh thu, Đơn mới, Sản phẩm, Cảnh báo tồn kho
- [x] Biểu đồ bar chart CSS 7 ngày với nhãn ngày động
- [x] Bảng 5 đơn hàng gần đây với badge trạng thái màu sắc
- [x] Banner cảnh báo tồn kho hết hàng/sắp hết hàng
- [x] Banner đình chỉ tài khoản
- [x] 3 nút hành động nhanh (Sản phẩm, Thanh toán, Thông báo)
- [x] Fallback an toàn cho mọi trường dữ liệu có thể undefined
- [x] Escape XSS cho tất cả dữ liệu người dùng

### P2 — Cải tiến ngắn hạn (Đề xuất)

- [ ] Nút "Xem tất cả đơn" dưới bảng recent orders → chuyển sang `'seller-orders'`
- [ ] Tooltip hover trên cột biểu đồ hiển thị giá trị chính xác
- [ ] KPI Card hiển thị mũi tên tăng/giảm so với kỳ trước (dựa trên `st.growth`)
- [ ] Bộ lọc thêm kỳ "Quý này" và "Năm này"
- [ ] Hiển thị top 3 sản phẩm bán chạy nhất ngay trên dashboard
- [ ] Section "Đánh giá mới" — tóm tắt rating trung bình và số đánh giá gần nhất
- [ ] Nút "Nhập hàng nhanh" từ banner cảnh báo tồn kho → mở inline restock form
- [ ] Hiển thị tỷ lệ hủy đơn (`st.returnRate`) trong KPI hoặc cảnh báo

### P3 — Tính năng dài hạn (Kế hoạch tương lai)

- [ ] Đồng bộ dữ liệu real-time từ backend API thay vì `localStorage`
- [ ] Dashboard tùy chỉnh: seller kéo thả sắp xếp vị trí các widget KPI
- [ ] Biểu đồ đường (line chart) so sánh kỳ này vs kỳ trước trên cùng một chart
- [ ] Thông báo push notification real-time khi có đơn mới (WebSocket/SSE)
- [ ] Export báo cáo tổng quan PDF trực tiếp từ dashboard
- [ ] Widget dự báo tồn kho: ước tính số ngày còn hàng dựa trên tốc độ bán
- [ ] Tích hợp bản đồ nhiệt địa lý (heatmap tỉnh thành) cho phân bố đơn hàng
- [ ] Dashboard đa gian hàng: seller quản lý nhiều shop trong một tài khoản
- [ ] Chỉ số NPS (Net Promoter Score) dựa trên tổng hợp đánh giá khách hàng
