# Yêu cầu chức năng: Analytics & Phân tích Bán hàng — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai (Production)  
**Tác giả:** EduMart Platform Team

---

## 1. Tổng quan

### 1.1 Mục đích

Module Analytics & Phân tích Bán hàng (`seller-analytics`) cung cấp cho seller bộ công cụ phân tích dữ liệu kinh doanh toàn diện trên Cổng Người bán EduMart. Seller có thể theo dõi xu hướng doanh thu theo nhiều kỳ thống kê, đánh giá hiệu suất từng sản phẩm, phân tích hành vi khách hàng, xem phễu chuyển đổi, và xuất báo cáo ra định dạng CSV (Excel) hoặc PDF để phục vụ nhu cầu lưu trữ và báo cáo nội bộ.

### 1.2 Phạm vi

| Thành phần | Mô tả |
|---|---|
| Tab điều hướng | Hai tab: Phân tích cơ bản / Phân tích nâng cao |
| Nút xuất báo cáo | Xuất Excel (CSV) và Xuất PDF (popup in) |
| Bộ chọn kỳ thống kê | Ba chế độ: Ngày / Tuần / Tháng (chỉ trong tab cơ bản) |
| Biểu đồ xu hướng doanh thu | Bar chart gradient, hiển thị giá trị trên cột và tổng bên dưới |
| Bảng top sản phẩm | Top 7 sản phẩm theo doanh thu, gồm mini bar và màu loại sản phẩm |
| Xu hướng danh mục | So sánh doanh thu tháng này vs tháng trước cho 4 danh mục |
| Phễu chuyển đổi | 4 bước: lượt xem → giỏ hàng → thanh toán → mua thành công |
| Nguồn traffic | Danh sách nguồn truy cập với tỷ lệ phần trăm và thanh ngang |
| Hành vi khách hàng | 4 KPI: thời gian xem trang, bounce rate, trang/phiên, thời lượng phiên |
| Biểu đồ khách mới vs cũ | Stacked bar chart 7 ngày phân loại khách hàng mới và quay lại |

### 1.3 Tác nhân

| Tác nhân | Mô tả |
|---|---|
| Seller (đã duyệt) | Người dùng có tài khoản seller với `status === 'approved'` trong `sellerApps` và tồn tại trong `activeSellers` |
| Hệ thống EduMart | Cung cấp dữ liệu phân tích qua `s.analyticsData` trong bản ghi `activeSellers` |

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập (`user` tồn tại trong session).
- Hồ sơ đăng ký seller đã được Admin phê duyệt (`sellerApp.status === 'approved'`).
- Tồn tại bản ghi trong mảng `activeSellers` có `email === user.email`.
- Bản ghi seller có thuộc tính `analyticsData` hợp lệ với đầy đủ các trường con.
- Biến điều hướng `acctTab` được thiết lập thành `'seller-analytics'`.

---

## 2. Yêu cầu chức năng

### FR-01: Tab Phân tích Cơ bản (`_analyticsBasicTab`)

#### FR-01.1: Bộ chọn kỳ thống kê

**Mô tả:** Seller có thể chuyển đổi giữa 3 chế độ xem dữ liệu doanh thu: theo ngày, theo tuần, theo tháng.

**Trạng thái:** Lưu trong biến `sellerAnalyticsPeriod` (mặc định: `'week'`).

**Cấu hình kỳ thống kê:**

| Giá trị `sellerAnalyticsPeriod` | Nguồn dữ liệu biểu đồ | Nhãn trục X | Tiêu đề |
|---|---|---|---|
| `'day'` | `(ad.salesTrend \|\| {}).daily` | `['T2','T3','T4','T5','T6','T7','CN']` | `'7 ngày qua'` |
| `'week'` | `ad.salesTrend.weekly` | `['W-6','W-5','W-4','W-3','W-2','W-1','Tuần này']` | `'7 tuần qua'` |
| `'month'` | `ad.salesTrend.monthly` | `['T1','T2',...,'T12']` | `'12 tháng'` |

**Hiển thị:** Ba nút toggle nằm ngang, nút đang chọn được tô nền xanh đậm `#1565c0`, màu chữ trắng; nút chưa chọn nền trắng, viền xám.

**Hành vi:** Khi click vào nút kỳ nào, `sellerAnalyticsPeriod` được cập nhật và giao diện render lại toàn bộ tab cơ bản.

---

#### FR-01.2: Biểu đồ xu hướng doanh thu (Sales Trend Bar Chart)

**Mô tả:** Hiển thị doanh thu theo kỳ thống kê đang chọn dưới dạng biểu đồ cột CSS.

**Thông số hiển thị:**

| Thuộc tính | Giá trị |
|---|---|
| Loại biểu đồ | CSS bar chart dạng cột đứng |
| Màu cột | Gradient từ `#1565c0` (đáy) đến `#42a5f5` (đỉnh) |
| Giá trị trên cột | Hiển thị giá trị doanh thu định dạng nghìn đồng (ví dụ: `1.200k`) |
| Nhãn dưới cột | Nhãn kỳ thống kê tương ứng (T2, T3, ... / W-6, ... / T1, ...) |
| Chiều cao cột | Tỷ lệ tương đối so với giá trị lớn nhất trong mảng dữ liệu |
| Dưới biểu đồ | Hiển thị tổng cộng toàn kỳ |

**Nguồn dữ liệu:** Mảng `number[]` từ `ad.salesTrend.daily`, `ad.salesTrend.weekly`, hoặc `ad.salesTrend.monthly` tuỳ theo `sellerAnalyticsPeriod`.

---

#### FR-01.3: Bảng top sản phẩm

**Mô tả:** Hiển thị 7 sản phẩm có doanh thu cao nhất trong kỳ thống kê, kèm thông tin hiệu suất chi tiết.

**Cấu trúc bảng:**

| Cột | Nội dung | Ghi chú |
|---|---|---|
| Xếp hạng | Số thứ tự 1-7 | Viền tròn, nền xanh `#1565c0` |
| Tên sản phẩm | `product.name` | Font đậm |
| Badge loại | `product.type` | Màu theo loại (xem bảng bên dưới) |
| Mini bar | Thanh ngang tỷ lệ theo `product.revenue` | Nền `#e3f2fd`, fill `#1565c0` |
| Số lượng bán | `product.sold` | Căn phải |
| Doanh thu | `product.revenue` | Định dạng tiền VND |
| Lượt xem | `product.views` | Căn phải |
| Tỷ lệ chuyển đổi | `product.convRate`% | Màu theo ngưỡng |

**Bảng màu badge loại sản phẩm:**

| Giá trị `product.type` | Màu nền |
|---|---|
| `'books'` | `#1565c0` (xanh dương đậm) |
| `'ebook'` | `#6a1b9a` (tím) |
| `'vpp'` | `#2e7d32` (xanh lá) |
| `'tbgd'` | `#e65100` (cam) |

**Bảng màu tỷ lệ chuyển đổi (`convRate`):**

| Điều kiện | Màu chữ |
|---|---|
| `convRate >= 5` | Xanh lá (`green`) |
| `convRate >= 2` | Cam (`orange`) |
| `convRate < 2` | Đỏ (`red`) |

**Nguồn dữ liệu:** `ad.topProducts` — mảng tối đa 7 phần tử, lấy `slice(0,7)`.

---

#### FR-01.4: Xu hướng danh mục (Category Trends)

**Mô tả:** Hiển thị panel so sánh doanh thu tháng này với tháng trước cho từng danh mục sản phẩm.

**Thông tin mỗi danh mục:**

| Thành phần | Mô tả |
|---|---|
| Nhãn danh mục | `category.lbl` |
| Màu nhận diện | `category.clr` (dùng làm viền trái và màu nhãn) |
| Doanh thu tháng này | `category.thisMonth` — định dạng tiền VND |
| Doanh thu tháng trước | `category.lastMonth` — định dạng tiền VND |
| Chỉ số tăng trưởng | `g = ((thisMonth - lastMonth) / lastMonth) * 100` — hiển thị `+X%` hoặc `-X%` |
| Màu tăng trưởng | Xanh lá nếu `g >= 0`, đỏ nếu `g < 0` |
| Hướng mũi tên | `▲` nếu tăng, `▼` nếu giảm |

**Số lượng danh mục:** Cố định 4 danh mục.

**Nguồn dữ liệu:** `ad.categoryTrends` — mảng 4 phần tử `[{lbl, clr, thisMonth, lastMonth}]`.

---

### FR-02: Tab Phân tích Nâng cao (`_analyticsAdvancedTab`)

#### FR-02.1: Phễu chuyển đổi (Conversion Funnel)

**Mô tả:** Trực quan hóa hành trình của khách hàng qua 4 bước từ lượt xem đến mua hàng thành công.

**Các bước phễu:**

| Bước | Tên hiển thị | Trường dữ liệu | Màu |
|---|---|---|---|
| 1 | Lượt xem sản phẩm | `ad.funnel.views` | `#1565c0` |
| 2 | Thêm vào giỏ | `ad.funnel.addToCart` | `#1976d2` |
| 3 | Tiến hành thanh toán | `ad.funnel.checkout` | `#388e3c` |
| 4 | Mua thành công | `ad.funnel.purchased` | `#f57c00` |

**Công thức tính:**

- Tỷ lệ mỗi bước: `pct = (val / views) * 100`
- Tỷ lệ rơi giữa 2 bước liền kề: `dropPct = ((prev - cur) / prev) * 100`
- Tỷ lệ chuyển đổi cuối cùng: `(purchased / views) * 100`

**Hiển thị:**
- Mỗi bước hiển thị: tên bước, số lượng tuyệt đối, tỷ lệ % so với bước đầu.
- Thanh ngang (progress bar) theo màu bước, độ rộng tỷ lệ với `pct`.
- Giữa 2 bước liên tiếp: hiển thị `▼ Mất X%` màu đỏ nhạt.
- Cuối phễu: ô tổng kết hiển thị "Tỷ lệ chuyển đổi cuối: X%".

**Nguồn dữ liệu:** `ad.funnel = { views: number, addToCart: number, checkout: number, purchased: number }`.

---

#### FR-02.2: Nguồn traffic (Traffic Sources)

**Mô tả:** Phân tích nguồn lưu lượng truy cập đến gian hàng của seller.

**Hiển thị mỗi nguồn:**

| Thành phần | Mô tả |
|---|---|
| Nhãn nguồn | `source.lbl` (ví dụ: Tìm kiếm trực tiếp, Mạng xã hội, ...) |
| Số lượt truy cập | `source.visits` |
| Tỷ lệ phần trăm | `source.pct`% |
| Màu thanh | `source.clr` |
| Thanh ngang | Độ rộng tỷ lệ theo `source.pct`, màu theo `source.clr` |

**Nguồn dữ liệu:** `ad.trafficSources` — mảng `[{lbl: string, visits: number, pct: number, clr: string}]`.

---

#### FR-02.3: Hành vi khách hàng (Behavior Metrics)

**Mô tả:** Hiển thị 4 chỉ số hành vi người dùng trên gian hàng dưới dạng thẻ KPI 4 cột.

**Bảng KPI hành vi:**

| Chỉ số | Trường dữ liệu | Đơn vị | Logic hiển thị |
|---|---|---|---|
| Thời gian xem trang TB | `ad.behavior.avgTimeOnPage` | giây | Chuyển đổi sang định dạng `"Xp Ys"` (phút, giây) |
| Tỷ lệ thoát (Bounce Rate) | `ad.behavior.bounceRate` | % | Màu đỏ nếu `> 50%`, màu xanh lá nếu `≤ 50%` |
| Trang/Phiên TB | `ad.behavior.avgPagesPerSession` | trang/phiên | Hiển thị số thập phân 1 chữ số |
| Thời lượng phiên TB | `ad.behavior.avgSessionDuration` | giây | Chuyển đổi sang định dạng `"Xp Ys"` |

**Công thức định dạng thời gian:**
```
minutes = Math.floor(seconds / 60)
secs = seconds % 60
display = `${minutes}p ${secs}s`
```

**Nguồn dữ liệu:** `ad.behavior = { avgTimeOnPage: number, bounceRate: number, avgPagesPerSession: number, avgSessionDuration: number }`.

---

#### FR-02.4: Biểu đồ khách mới vs khách quay lại (New vs Returning Customers)

**Mô tả:** Biểu đồ thanh xếp chồng (stacked bar chart) theo 7 ngày, phân loại khách hàng mới và khách quay lại.

**Cấu trúc biểu đồ:**

| Lớp | Màu | Dữ liệu |
|---|---|---|
| Khách quay lại (lớp dưới) | `#1565c0` (xanh dương) | `ad.customerMix.returning[i]` |
| Khách mới (lớp trên) | `#6a1b9a` (tím) | `ad.customerMix.newCustomers[i]` |

**Thông tin hiển thị bổ sung:**
- Legend giải thích 2 màu.
- Nhãn ngày dưới mỗi cột: `ad.customerMix.labels[i]`.
- Tổng số khách mỗi ngày: `newCustomers[i] + returning[i]`.
- Tỷ lệ phần trăm từng nhóm trong ngày.

**Nguồn dữ liệu:** `ad.customerMix = { labels: string[], newCustomers: number[], returning: number[] }` — mỗi mảng gồm 7 phần tử.

---

### FR-03: Xuất báo cáo (`doSellerExportReport`)

#### FR-03.1: Xuất Excel (CSV)

**Mô tả:** Tạo file CSV chứa dữ liệu phân tích đầy đủ, tải xuống trực tiếp trình duyệt.

**Kích hoạt:** Nút `📥 Excel` trên thanh tiêu đề module analytics.

**Quy trình thực thi:**

1. Lấy bản ghi seller hiện tại từ `activeSellers` theo `user.email`.
2. Đọc `s.analyticsData` và `s.revenueData.transactions`.
3. Tạo nội dung CSV theo cấu trúc (xem bên dưới).
4. Thêm tiền tố BOM `﻿` để đảm bảo Excel đọc đúng UTF-8.
5. Tạo `Blob` với `type: 'text/csv;charset=utf-8;'`.
6. Tạo thẻ `<a>` tạm, gán `href = URL.createObjectURL(blob)`.
7. Đặt `download = 'bao-cao-phan-tich-DD-MM-YYYY.csv'` (tên file có ngày hiện tại).
8. Kích hoạt `.click()` để tải xuống, sau đó thu hồi Object URL.

**Cấu trúc nội dung CSV:**

```
[Dòng 1] Báo cáo Phân tích — <tên shop>
[Dòng 2] Ngày xuất: <DD/MM/YYYY>
[Dòng 3] (dòng trống)
[Dòng 4] === Doanh thu theo tháng ===
[Dòng 5] Tháng,Doanh thu
[Dòng 6-17] T1,...,T12 với giá trị từ salesTrend.monthly
[Dòng 18] (dòng trống)
[Dòng 19] === Top sản phẩm ===
[Dòng 20] Sản phẩm,Đã bán,Doanh thu,Lượt xem,Tỷ lệ chuyển đổi
[Dòng 21+] Mỗi dòng là một sản phẩm từ topProducts[]
[...] (dòng trống)
[...] === Chi tiết giao dịch ===
[...] Mã đơn,Ngày,Sản phẩm,Số lượng,Thành tiền
[...] Mỗi dòng từ revenueData.transactions[]
```

**Tên file:** `bao-cao-phan-tich-DD-MM-YYYY.csv` (DD, MM, YYYY theo ngày xuất thực tế).

---

#### FR-03.2: Xuất PDF (in trang)

**Mô tả:** Mở cửa sổ popup chứa báo cáo HTML được định dạng sẵn để in, seller sử dụng chức năng in của trình duyệt.

**Kích hoạt:** Nút `📄 PDF` trên thanh tiêu đề module analytics.

**Quy trình thực thi:**

1. Xây dựng chuỗi HTML báo cáo đầy đủ trong bộ nhớ.
2. Mở cửa sổ popup: `window.open('', '_blank', 'width=900,height=700')`.
3. Ghi HTML vào cửa sổ popup: `popup.document.write(html)`.
4. Đóng stream: `popup.document.close()`.
5. Cửa sổ popup tự hiển thị nút "In báo cáo" — khi nhấn, gọi `window.print()`.

**Cấu trúc trang HTML báo cáo:**

| Phần | Nội dung |
|---|---|
| Tiêu đề | Tên shop, ngày xuất báo cáo |
| KPI Grid | 4 thẻ: Tổng doanh thu (`totalEarned`), Đơn đã giao, Tỷ lệ chuyển đổi, Bounce Rate |
| Bảng top sản phẩm | Tên, số lượng bán, doanh thu, lượt xem, tỷ lệ chuyển đổi |
| Bảng giao dịch | Mã đơn, ngày, sản phẩm, số lượng, thành tiền |
| Bảng hành vi | 4 chỉ số từ `ad.behavior` |

---

### FR-04: Điều hướng và khởi tạo (`sellerAnalytics`)

**Mô tả:** Hàm chính khởi tạo toàn bộ module, quản lý routing tab và kết xuất container chính.

**Kích hoạt:** `acctTab === 'seller-analytics'` trong hàm routing `acctTab`.

**Luồng khởi tạo:**

```javascript
// 1. Lấy seller record
const s = activeSellers.find(x => x.email === user.email);
if (!s) return '<div class="panel"><p>Đang khởi tạo...</p></div>';

// 2. Lấy analytics data
const ad = s.analyticsData;

// 3. Render container với 2 tab
// Tab active theo sellerAnalyticsTab ('basic' | 'advanced')

// 4. Routing nội dung tab
if (sellerAnalyticsTab === 'basic') return _analyticsBasicTab(s, ad);
if (sellerAnalyticsTab === 'advanced') return _analyticsAdvancedTab(s, ad);
```

**Trạng thái tab:** Lưu trong biến `sellerAnalyticsTab` (mặc định: `'basic'`). Khi seller click tab, biến này được cập nhật và `render()` được gọi lại.

**Thanh tiêu đề chứa:**
- Tên module: "Analytics & Phân tích Bán hàng"
- Nút `📥 Excel` gọi `doSellerExportReport('excel')`
- Nút `📄 PDF` gọi `doSellerExportReport('pdf')`
- Tab `📊 Phân tích cơ bản` (kích hoạt `sellerAnalyticsTab = 'basic'`)
- Tab `🔬 Phân tích nâng cao` (kích hoạt `sellerAnalyticsTab = 'advanced'`)

---

## 3. Mô hình dữ liệu

### 3.1 Cấu trúc `analyticsData`

Đây là đối tượng gốc được lưu tại `s.analyticsData` trong bản ghi seller thuộc mảng `activeSellers`.

```javascript
s.analyticsData = {
  salesTrend:     SalesTrend,       // Dữ liệu xu hướng doanh thu
  topProducts:    TopProduct[],     // Top sản phẩm (tối đa 7)
  categoryTrends: CategoryTrend[],  // Xu hướng 4 danh mục
  funnel:         Funnel,           // Phễu chuyển đổi
  trafficSources: TrafficSource[],  // Nguồn traffic
  behavior:       Behavior,         // Hành vi khách hàng
  customerMix:    CustomerMix,      // Phân loại khách hàng
  weeklyOrders:   number[]          // Số đơn hàng theo 7 ngày (dự phòng)
}
```

### 3.2 `SalesTrend`

```javascript
{
  daily:   number[],  // Doanh thu 7 ngày gần nhất (T2 → CN), độ dài = 7
  weekly:  number[],  // Doanh thu 7 tuần gần nhất (W-6 → Tuần này), độ dài = 7
  monthly: number[]   // Doanh thu 12 tháng (T1 → T12), độ dài = 12
}
```

### 3.3 `TopProduct`

```javascript
{
  name:     string,  // Tên sản phẩm
  type:     string,  // Loại: 'books' | 'ebook' | 'vpp' | 'tbgd'
  sold:     number,  // Số lượng đã bán
  revenue:  number,  // Doanh thu (VND)
  views:    number,  // Lượt xem sản phẩm
  convRate: number   // Tỷ lệ chuyển đổi (%)
}
```

### 3.4 `CategoryTrend`

```javascript
{
  lbl:       string,  // Nhãn danh mục (ví dụ: "Sách giáo khoa")
  clr:       string,  // Mã màu CSS (ví dụ: "#1565c0")
  thisMonth: number,  // Doanh thu tháng này (VND)
  lastMonth: number   // Doanh thu tháng trước (VND)
}
```

### 3.5 `Funnel`

```javascript
{
  views:      number,  // Lượt xem sản phẩm (bước 1)
  addToCart:  number,  // Lượt thêm vào giỏ (bước 2)
  checkout:   number,  // Lượt tiến hành thanh toán (bước 3)
  purchased:  number   // Lượt mua thành công (bước 4)
}
```

**Ràng buộc:** `purchased <= checkout <= addToCart <= views`.

### 3.6 `TrafficSource`

```javascript
{
  lbl:    string,  // Tên nguồn traffic (ví dụ: "Tìm kiếm EduMart")
  visits: number,  // Số lượt truy cập từ nguồn này
  pct:    number,  // Tỷ lệ phần trăm (%)
  clr:    string   // Mã màu CSS dùng cho thanh hiển thị
}
```

**Ràng buộc:** Tổng `pct` của tất cả nguồn xấp xỉ 100%.

### 3.7 `Behavior`

```javascript
{
  avgTimeOnPage:       number,  // Thời gian xem trang trung bình (giây)
  bounceRate:          number,  // Tỷ lệ thoát (%)
  avgPagesPerSession:  number,  // Số trang trung bình mỗi phiên
  avgSessionDuration:  number   // Thời lượng phiên trung bình (giây)
}
```

### 3.8 `CustomerMix`

```javascript
{
  labels:       string[],  // Nhãn 7 ngày (ví dụ: ["T2","T3","T4","T5","T6","T7","CN"])
  newCustomers: number[],  // Số khách hàng mới mỗi ngày, độ dài = 7
  returning:    number[]   // Số khách hàng quay lại mỗi ngày, độ dài = 7
}
```

### 3.9 Dữ liệu phụ trợ cho xuất báo cáo

Hàm `doSellerExportReport` còn sử dụng thêm:

```javascript
s.revenueData = {
  transactions: Transaction[]  // Danh sách giao dịch chi tiết
}

// Transaction
{
  id:       string,  // Mã đơn hàng
  date:     string,  // Ngày giao dịch (DD/MM/YYYY)
  product:  string,  // Tên sản phẩm
  qty:      number,  // Số lượng
  amount:   number   // Thành tiền (VND)
}
```

---

## 4. Luồng hoạt động

### 4.1 Luồng truy cập module

```
Seller đăng nhập
    │
    ▼
Chọn mục "Analytics" trên thanh điều hướng bên trái
    │
    ▼
acctTab = 'seller-analytics' → render() gọi sellerAnalytics()
    │
    ▼
Tìm bản ghi seller: activeSellers.find(x => x.email === user.email)
    │
    ├─── Không tìm thấy ──→ Hiển thị thông báo "Đang khởi tạo..."
    │
    └─── Tìm thấy ──→ Đọc s.analyticsData
                          │
                          ▼
                    Render container chính
                    (tiêu đề + nút xuất + tab nav)
                          │
                          ▼
                    sellerAnalyticsTab === 'basic'?
                    │                          │
                   Có                         Không
                    │                          │
                    ▼                          ▼
         _analyticsBasicTab(s, ad)   _analyticsAdvancedTab(s, ad)
```

### 4.2 Luồng chuyển đổi kỳ thống kê (Basic Tab)

```
Seller click nút "Ngày" / "Tuần" / "Tháng"
    │
    ▼
sellerAnalyticsPeriod = 'day' | 'week' | 'month'
    │
    ▼
render() → _analyticsBasicTab(s, ad)
    │
    ▼
Đọc mảng dữ liệu tương ứng từ ad.salesTrend
    │
    ▼
Cập nhật biểu đồ + nhãn trục X + tiêu đề kỳ
```

### 4.3 Luồng xuất Excel

```
Seller click nút "📥 Excel"
    │
    ▼
doSellerExportReport('excel')
    │
    ▼
Lấy s = activeSellers.find(...)
Lấy ad = s.analyticsData
    │
    ▼
Xây dựng chuỗi CSV:
  - Header: tên shop, ngày xuất
  - Doanh thu theo tháng (salesTrend.monthly)
  - Top sản phẩm (topProducts)
  - Chi tiết giao dịch (revenueData.transactions)
    │
    ▼
Thêm BOM '﻿' vào đầu chuỗi
    │
    ▼
new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    │
    ▼
Tạo thẻ <a>, gán href = URL.createObjectURL(blob)
Đặt download = 'bao-cao-phan-tich-DD-MM-YYYY.csv'
    │
    ▼
a.click() → Trình duyệt tải file xuống
    │
    ▼
URL.revokeObjectURL(href) — giải phóng bộ nhớ
```

### 4.4 Luồng xuất PDF

```
Seller click nút "📄 PDF"
    │
    ▼
doSellerExportReport('pdf')
    │
    ▼
Xây dựng chuỗi HTML báo cáo trong bộ nhớ:
  - Thông tin shop, ngày xuất
  - KPI grid (4 chỉ số tổng hợp)
  - Bảng top sản phẩm
  - Bảng giao dịch
  - Bảng hành vi
    │
    ▼
popup = window.open('', '_blank', 'width=900,height=700')
popup.document.write(html)
popup.document.close()
    │
    ▼
Seller xem trước báo cáo trong popup
    │
    ▼
Seller click "In báo cáo" → window.print()
    │
    ▼
Hộp thoại in hệ thống mở ra → Chọn máy in / Lưu PDF
```

---

## 5. Giao diện người dùng

### 5.1 Mockup Tab Phân tích Cơ bản

```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Analytics & Phân tích Bán hàng    [📥 Excel] [📄 PDF]      │
├─────────────────────────────────────────────────────────────────┤
│  [📊 Phân tích cơ bản ▓▓▓]  [🔬 Phân tích nâng cao]           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Kỳ thống kê: [Ngày] [Tuần ▓] [Tháng]                          │
│                                                                 │
│  ── Xu hướng doanh thu — 7 tuần qua ──────────────────────     │
│                                                                 │
│  1.2M  1.5M  0.9M  1.8M  2.1M  1.7M  2.4M                     │
│   ██    ███   ██   ████  ████  ████  █████                      │
│   W-6   W-5   W-4  W-3   W-2   W-1  Tuần này                   │
│                                                                 │
│  Tổng: 11.600.000 đ                                             │
│                                                                 │
│  ── Top 7 sản phẩm ────────────────────────────────────────     │
│  #  Sản phẩm          Bán   Doanh thu    Xem   Chuyển đổi      │
│  1  Toán lớp 12 [sách] ██   320  2.400k  680    4.7% 🟠        │
│  2  Ebook Lý 11  [pdf]  ██   285  1.990k  520    5.5% 🟢        │
│  ...                                                            │
│                                                                 │
│  ── Xu hướng danh mục ─────────────────────────────────────     │
│  │ Sách giáo khoa    Tháng này: 4.200k  Tháng trước: 3.800k ▲+10.5% │
│  │ Ebook             Tháng này: 2.100k  Tháng trước: 2.300k ▼-8.7%  │
│  │ VPP               Tháng này: 1.500k  Tháng trước: 1.200k ▲+25%   │
│  │ Thiết bị          Tháng này:   800k  Tháng trước:   900k ▼-11.1% │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Mockup Tab Phân tích Nâng cao

```
┌─────────────────────────────────────────────────────────────────┐
│  [📊 Phân tích cơ bản]  [🔬 Phân tích nâng cao ▓▓▓▓▓▓▓▓]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ── Phễu chuyển đổi ───────────────────────────────────────     │
│  [🟦 Lượt xem sản phẩm     12.000  100%  ████████████████]     │
│                              ▼ Mất 65.0%                        │
│  [🟦 Thêm vào giỏ           4.200   35%  █████████]            │
│                              ▼ Mất 52.4%                        │
│  [🟩 Tiến hành thanh toán   2.000   16.7%  ████]               │
│                              ▼ Mất 25.0%                        │
│  [🟧 Mua thành công         1.500   12.5%  ███]                 │
│                                                                 │
│  Tỷ lệ chuyển đổi cuối: 12.5%                                   │
│                                                                 │
│  ── Nguồn traffic ─────────────────────────────────────────     │
│  Tìm kiếm EduMart   3.200  45%  ████████████████████████       │
│  Mạng xã hội        2.100  29%  ████████████████               │
│  Trực tiếp          1.400  20%  ███████████                     │
│  Khác                 430   6%  ███                             │
│                                                                 │
│  ── Hành vi khách hàng ─────────────────────────────────────    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  2p 15s  │ │  38.5%   │ │   3.2    │ │  8p 40s  │           │
│  │Xem trang │ │Bounce Rate│ │Trang/Phiên│ │T/lượng phiên│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
│  ── Khách mới vs Quay lại (7 ngày) ─────────────────────────   │
│       ██   ██   ██   ██   ██   ██   ██                          │
│       ██   ██   ██   ██   ██   ██   ██   ← Khách mới (tím)     │
│       ██   ██   ██   ██   ██   ██   ██   ← Quay lại (xanh)    │
│       T2   T3   T4   T5   T6   T7   CN                          │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Quy tắc màu sắc và phong cách

| Yếu tố | Giá trị |
|---|---|
| Màu nền tab đang chọn | `#1565c0` (xanh dương đậm) |
| Màu chữ tab đang chọn | `#ffffff` |
| Màu cột biểu đồ | Gradient `#1565c0 → #42a5f5` (dưới → trên) |
| Màu badge Sách | `#1565c0` |
| Màu badge Ebook | `#6a1b9a` (tím) |
| Màu badge VPP | `#2e7d32` (xanh lá) |
| Màu badge Thiết bị | `#e65100` (cam) |
| Màu tỷ lệ chuyển đổi tốt (≥5%) | `green` |
| Màu tỷ lệ chuyển đổi trung bình (≥2%) | `orange` |
| Màu tỷ lệ chuyển đổi kém (<2%) | `red` |
| Màu bounce rate cao (>50%) | `red` |
| Màu bounce rate tốt (≤50%) | `green` |
| Màu tăng trưởng dương | Xanh lá |
| Màu tăng trưởng âm | Đỏ |

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mục tiêu |
|---|---|
| Thời gian render lần đầu | < 300ms |
| Thời gian chuyển tab | < 150ms |
| Thời gian tạo file CSV | < 1 giây (với tối đa 1.000 giao dịch) |
| Thời gian mở popup PDF | < 500ms |
| Không block UI thread | Render sử dụng string concatenation, không có async I/O |

### 6.2 Khả năng sử dụng (Usability)

- Biểu đồ không phụ thuộc thư viện bên ngoài (Canvas/SVG/D3) — dùng CSS thuần để tối đa khả năng tương thích.
- Màu sắc phân biệt rõ ràng, đáp ứng tiêu chuẩn tương phản WCAG AA (tỷ lệ tương phản tối thiểu 4.5:1 đối với chữ thường).
- Nhãn số liệu hiển thị ngay trên biểu đồ, không yêu cầu hover để xem giá trị.
- Tên file xuất có ngày tháng để seller dễ quản lý phiên bản.

### 6.3 Tương thích trình duyệt

| Trình duyệt | Phiên bản tối thiểu |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Edge | 90+ |
| Safari | 14+ |

**Lưu ý:** Tính năng `URL.createObjectURL` và `Blob` được hỗ trợ từ phiên bản trên. Safari trên iOS giới hạn `window.open()` — popup PDF có thể bị chặn nếu không phát sinh từ sự kiện click trực tiếp.

### 6.4 Bảo mật

- Tất cả dữ liệu hiển thị được lấy từ `activeSellers` theo `user.email` — seller chỉ thấy dữ liệu của chính mình.
- Nội dung CSV và HTML báo cáo không nhúng JavaScript thực thi.
- Popup PDF chỉ chứa nội dung tĩnh, không gọi API ra ngoài.

### 6.5 Khả năng mở rộng

- Cấu trúc `analyticsData` được thiết kế để dễ bổ sung trường mới (ví dụ: `hourlyTrend`, `regionData`) mà không ảnh hưởng các trường hiện có.
- Hàm `_analyticsBasicTab` và `_analyticsAdvancedTab` tách biệt hoàn toàn — có thể mở rộng tab nâng cao độc lập.

---

## 7. Tiêu chí chấp nhận

### AC-01: Tab Phân tích Cơ bản

| ID | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-01.1 | Bộ chọn kỳ mặc định là "Tuần" khi lần đầu vào module | Load module, kiểm tra `sellerAnalyticsPeriod === 'week'` |
| AC-01.2 | Click "Ngày" → biểu đồ hiển thị 7 cột với nhãn T2-CN | Click nút "Ngày", đếm cột và kiểm tra nhãn |
| AC-01.3 | Click "Tháng" → biểu đồ hiển thị 12 cột T1-T12 | Click nút "Tháng", đếm cột và kiểm tra nhãn |
| AC-01.4 | Cột biểu đồ có màu gradient từ `#1565c0` đến `#42a5f5` | Kiểm tra CSS `background` của phần tử cột |
| AC-01.5 | Giá trị doanh thu hiển thị ngay trên mỗi cột | Kiểm tra DOM có phần tử giá trị phía trên mỗi cột |
| AC-01.6 | Tổng doanh thu hiển thị đúng bên dưới biểu đồ | So sánh giá trị hiển thị với tổng của mảng `salesTrend.weekly` |
| AC-01.7 | Bảng top sản phẩm hiển thị tối đa 7 hàng | Đếm số hàng trong bảng |
| AC-01.8 | Badge loại "ebook" có màu `#6a1b9a` | Kiểm tra CSS `background-color` của badge |
| AC-01.9 | `convRate < 2%` hiển thị màu đỏ | Tìm sản phẩm có convRate < 2, kiểm tra màu |
| AC-01.10 | Danh mục có tăng trưởng âm hiển thị `▼` màu đỏ | Tìm danh mục lastMonth > thisMonth, kiểm tra icon và màu |

### AC-02: Tab Phân tích Nâng cao

| ID | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-02.1 | Phễu hiển thị đúng 4 bước theo thứ tự views→addToCart→checkout→purchased | Kiểm tra DOM 4 phần tử bước và nhãn |
| AC-02.2 | Tỷ lệ bước 1 (views) luôn là 100% | Kiểm tra giá trị pct của bước views |
| AC-02.3 | "▼ Mất X%" hiển thị giữa mỗi 2 bước liền kề | Kiểm tra DOM có 3 phần tử dropPct |
| AC-02.4 | Bounce rate > 50% hiển thị màu đỏ | Set `bounceRate = 60`, kiểm tra màu |
| AC-02.5 | Bounce rate ≤ 50% hiển thị màu xanh lá | Set `bounceRate = 40`, kiểm tra màu |
| AC-02.6 | `avgTimeOnPage = 135` hiển thị "2p 15s" | Kiểm tra giá trị hiển thị |
| AC-02.7 | Stacked bar chart khách mới và quay lại hiển thị 7 ngày | Đếm nhóm cột trong biểu đồ |
| AC-02.8 | Màu khách mới là `#6a1b9a`, màu quay lại là `#1565c0` | Kiểm tra CSS fill của mỗi lớp |
| AC-02.9 | Nguồn traffic hiển thị thanh ngang tỷ lệ với `pct` | So sánh độ rộng thanh với giá trị pct |

### AC-03: Xuất báo cáo

| ID | Tiêu chí | Cách kiểm tra |
|---|---|---|
| AC-03.1 | File CSV được tải xuống khi click "📥 Excel" | Click nút, xác nhận trình duyệt tải file |
| AC-03.2 | Tên file CSV có định dạng `bao-cao-phan-tich-DD-MM-YYYY.csv` | Kiểm tra tên file sau khi tải |
| AC-03.3 | File CSV mở đúng tiếng Việt trong Excel (không lỗi font) | Mở file trong Excel, kiểm tra cột tên sản phẩm |
| AC-03.4 | CSV chứa đủ 3 section: doanh thu tháng, top sản phẩm, giao dịch | Mở file CSV, kiểm tra các header section |
| AC-03.5 | Popup PDF mở khi click "📄 PDF" | Click nút, xác nhận popup xuất hiện |
| AC-03.6 | Popup PDF chứa 4 KPI: totalEarned, đơn giao, chuyển đổi, bounce rate | Kiểm tra nội dung popup |
| AC-03.7 | Nút "In báo cáo" trong popup gọi `window.print()` | Click nút in, xác nhận hộp thoại in xuất hiện |

---

## 8. Rủi ro và Giải pháp

| Rủi ro | Mức độ | Giải pháp |
|---|---|---|
| `analyticsData` bị `null` hoặc `undefined` khi seller mới tạo | Cao | Kiểm tra `if (!ad)` trước khi render, hiển thị thông báo "Dữ liệu đang được tổng hợp..." |
| Mảng `salesTrend.daily` có độ dài khác 7 | Trung bình | Dùng `(ad.salesTrend \|\| {}).daily \|\| []` và kiểm tra độ dài trước khi render |
| `funnel.lastMonth = 0` gây chia cho 0 trong tính tăng trưởng danh mục | Cao | Kiểm tra `lastMonth > 0` trước khi tính `g`; nếu = 0 hiển thị "—" |
| Popup PDF bị trình duyệt chặn (Safari iOS) | Trung bình | Gọi `window.open()` trực tiếp trong event handler click, không qua setTimeout |
| File CSV có ký tự đặc biệt trong tên sản phẩm làm vỡ cấu trúc CSV | Trung bình | Wrap giá trị có dấu phẩy hoặc ngoặc kép trong `"..."`, escape dấu `"` thành `""` |
| Dữ liệu `topProducts` rỗng (`[]`) | Thấp | Render thông báo "Chưa có dữ liệu sản phẩm" thay vì bảng trống |
| `trafficSources` tổng `pct` khác 100% do làm tròn | Thấp | Chỉ hiển thị `pct` như dữ liệu gốc, không tính lại |
| Seller có nhiều tab mở đồng thời gây xung đột `sellerAnalyticsPeriod` | Thấp | Biến là global JS scope — chấp nhận hành vi này trong phiên bản hiện tại |

---

## 9. Lộ trình phát triển

### 9.1 Phiên bản hiện tại (v1.0 — Đã triển khai)

- Tab Phân tích Cơ bản: bộ chọn kỳ, biểu đồ doanh thu, bảng top sản phẩm, xu hướng danh mục.
- Tab Phân tích Nâng cao: phễu chuyển đổi, nguồn traffic, hành vi khách hàng, stacked bar chart khách hàng.
- Xuất CSV (Excel) và PDF (popup in).
- Toàn bộ dữ liệu lấy từ `localStorage` (`activeSellers`), không cần API backend.

### 9.2 Phiên bản tiếp theo (v1.1 — Kế hoạch)

| Tính năng | Mô tả | Độ ưu tiên |
|---|---|---|
| Bộ lọc khoảng ngày tuỳ chỉnh | Cho phép seller chọn from/to date thay vì chỉ các kỳ cố định | Cao |
| Biểu đồ đường (line chart) | Thêm tùy chọn xem xu hướng dạng đường thay vì cột | Trung bình |
| So sánh nhiều danh mục | Overlay 2 danh mục trên cùng biểu đồ để so sánh trực tiếp | Trung bình |
| Cảnh báo ngưỡng | Tự động highlight khi bounce rate vượt ngưỡng hoặc convRate giảm | Cao |
| Lưu cài đặt tab | Ghi nhớ tab cuối cùng seller đang xem khi quay lại module | Thấp |

### 9.3 Phiên bản dài hạn (v2.0 — Định hướng)

| Tính năng | Mô tả |
|---|---|
| Kết nối API thời gian thực | Thay thế dữ liệu `localStorage` bằng API endpoint thực, cập nhật định kỳ |
| Dự báo doanh thu | Mô hình ML đơn giản dự báo doanh thu tuần/tháng tới |
| Phân tích cạnh tranh | So sánh hiệu suất gian hàng với trung bình ngành trên EduMart |
| Heatmap hành vi | Bản đồ nhiệt thể hiện khu vực seller quan tâm nhiều nhất trên trang sản phẩm |
| Dashboard đa gian hàng | Seller có nhiều gian hàng có thể xem tổng hợp và drill-down từng shop |
| Xuất nhiều định dạng | Bổ sung xuất XLSX thực (không phải CSV), PPTX slide tóm tắt |

---

*Tài liệu này mô tả trạng thái triển khai thực tế của module `seller-analytics` trong `app.js` (hàm `sellerAnalytics`, `_analyticsBasicTab`, `_analyticsAdvancedTab`, `doSellerExportReport`). Mọi thay đổi yêu cầu cập nhật tài liệu này đồng bộ với code.*
