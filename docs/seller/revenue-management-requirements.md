# Yêu cầu chức năng: Quản lý Doanh thu & Thanh toán — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai  
**Module liên quan:** `seller-revenue`, `seller-payment`

---

## 1. Tổng quan

### 1.1 Mục đích

Module Quản lý Doanh thu & Thanh toán cung cấp cho seller đã được duyệt trên nền tảng EduMart công cụ toàn diện để theo dõi doanh thu, quản lý số dư tài khoản và cấu hình tài khoản ngân hàng nhận tiền. Module được chia thành hai phần chức năng riêng biệt nhưng liên quan chặt chẽ:

- **`sellerRevenueReport()`** — Báo cáo doanh thu theo nhiều chu kỳ thời gian, biểu đồ trực quan, phân tích theo danh mục sản phẩm và bảng giao dịch gần đây.
- **`sellerPaymentSettings(app)`** — Quản lý số dư và rút tiền, xem lịch sử giao dịch đầy đủ, và cài đặt tài khoản ngân hàng nhận thanh toán.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Báo cáo doanh thu (`seller-revenue`) | KPI 4 thẻ, biểu đồ cột theo chu kỳ, phân tích danh mục, bảng 7 giao dịch gần nhất | Đã triển khai |
| Số dư & Rút tiền (`balance` tab) | 3 thẻ số dư, form rút tiền có validation, lịch sử lệnh rút | Đã triển khai |
| Lịch sử giao dịch (`history` tab) | Thanh tổng hợp, bảng giao dịch đầy đủ có mã TXN | Đã triển khai |
| Tài khoản ngân hàng (`bank` tab) | Form liên kết ngân hàng với 14 ngân hàng, hiển thị tài khoản đã liên kết | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Xem báo cáo doanh thu, tạo lệnh rút tiền, cài đặt ngân hàng |
| Hệ thống | Tính toán phí hoa hồng, ghi nhận giao dịch, gửi thông báo (`addNotif`), hiển thị toast |
| Nền tảng EduMart | Thu phí hoa hồng ~9% trên mỗi giao dịch; xử lý lệnh rút tiền (T+3) |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại trong phiên).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- Dữ liệu `s.revenueData` phải tồn tại trong đối tượng seller; nếu chưa có, khởi tạo với cấu trúc mặc định.

---

## 2. Yêu cầu chức năng

### FR-01: Báo cáo doanh thu (`sellerRevenueReport`)

#### FR-01.1 Bộ chọn chu kỳ thời gian

Biến trạng thái: `sellerRevenuePeriod` (string, mặc định: `'month'`).

Có 4 chu kỳ được hỗ trợ, mỗi chu kỳ tương ứng với một tập nhãn trục X và một khóa dữ liệu biểu đồ:

| Chu kỳ | Giá trị | Nhãn trục X | Khóa dữ liệu |
|--------|---------|-------------|--------------|
| Hôm nay | `'day'` | `['6h','9h','12h','15h','18h','21h','23h']` | `'todayRev'` |
| Tuần này | `'week'` | `['T2','T3','T4','T5','T6','T7','CN']` | `'thisWeekRev'` |
| Tháng này | `'month'` | `['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12']` | `'thisMonthRev'` |
| Năm nay | `'year'` | `['Q1','Q2','Q3','Q4']` | `'totalRevenue'` |

Giao diện hiển thị 4 nút chọn chu kỳ; nút đang chọn có nền đậm. Khi đổi chu kỳ, biểu đồ và chỉ số KPI cập nhật ngay lập tức (không có API call, xử lý client-side).

#### FR-01.2 Hàng KPI — 4 thẻ chỉ số

Hiển thị 4 thẻ thống kê theo chiều ngang:

| # | Chỉ số | Nguồn dữ liệu | Màu chủ đạo | Ghi chú phụ |
|---|--------|---------------|-------------|-------------|
| 1 | Tổng doanh thu | Tổng `dailyChart` / `weeklyChart` / `monthlyChart` / `yearlyChart` theo chu kỳ | Xanh dương (`blue`) | Hiển thị % tăng trưởng so với kỳ trước |
| 2 | Thực nhận (sau phí) | ~91% của tổng doanh thu | Xanh lá (`green`) | "Trung bình phí: ~9%" |
| 3 | Phí nền tảng | ~9% của tổng doanh thu | Vàng (`yellow`) | "Tính theo từng giao dịch" |
| 4 | Đơn hoàn thành | Số giao dịch có `status === 'settled'` trong `transactions[]` | Tím (`purple`) | Đếm số lượng đơn |

#### FR-01.3 Biểu đồ cột (Bar Chart)

Biểu đồ được render dạng các thẻ div flex, không dùng thư viện đồ họa bên ngoài. Dữ liệu được lấy từ:

- `s.revenueData.dailyChart` — mảng số, mỗi phần tử là doanh thu theo giờ (7 phần tử).
- `s.revenueData.weeklyChart` — mảng số, mỗi phần tử là doanh thu theo ngày (7 phần tử).
- `s.revenueData.monthlyChart` — mảng số, mỗi phần tử là doanh thu theo tháng (12 phần tử).
- `s.revenueData.yearlyChart` — mảng số, mỗi phần tử là doanh thu theo quý (4 phần tử).

Chiều cao mỗi cột được tính theo tỉ lệ: `height = (value / maxValue) * 100%`. Nhãn trục X hiển thị theo cấu hình chu kỳ tương ứng ở FR-01.1.

#### FR-01.4 Phân tích theo danh mục (Panel phụ)

Hiển thị tỉ trọng doanh thu theo 4 danh mục sản phẩm dưới dạng thanh tiến trình ngang:

| Danh mục | Khóa dữ liệu | Màu thanh |
|----------|-------------|-----------|
| Sách (Books) | `revenueByCategory.books` | `#1565c0` (xanh dương đậm) |
| Ebook | `revenueByCategory.ebook` | `#6a1b9a` (tím) |
| Văn phòng phẩm (VPP) | `revenueByCategory.vpp` | `#2e7d32` (xanh lá đậm) |
| Thiết bị giáo dục (TBGD) | `revenueByCategory.tbgd` | `#e65100` (cam đậm) |

Tỉ lệ phần trăm: `pct = (categoryValue / catTotal) * 100`, với `catTotal = books + ebook + vpp + tbgd`.

Mỗi danh mục hiển thị: tên danh mục, giá trị bằng đồng (định dạng VNĐ), phần trăm tỉ trọng, và thanh tiến trình màu tương ứng.

#### FR-01.5 Bảng 7 giao dịch gần nhất

Bảng hiển thị 7 giao dịch mới nhất từ `s.revenueData.transactions[]`.

| Cột | Nguồn dữ liệu |
|-----|--------------|
| Mã đơn | `txn.orderId` |
| Người mua | `txn.buyer` |
| Danh mục | `txn.category` (hiển thị dạng badge màu) |
| Tổng đơn | `txn.orderTotal` (định dạng VNĐ) |
| Phí hoa hồng | `txn.commissionRate`% + `txn.commissionAmt` (định dạng VNĐ) |
| Thực nhận | `txn.netAmt` (định dạng VNĐ, màu xanh lá) |
| Trạng thái | `txn.status` (badge màu theo loại) |
| Ngày | `txn.date` |

Trạng thái giao dịch và màu badge:

| Trạng thái | Màu badge |
|-----------|-----------|
| `pending` — Chờ xử lý | Vàng |
| `processing` — Đang xử lý | Xanh dương |
| `settled` — Đã thanh toán | Xanh lá |
| `refunded` — Hoàn tiền | Đỏ |

---

### FR-02: Số dư & Rút tiền (Tab `balance`)

#### FR-02.1 Ba thẻ số dư

Hiển thị ba thẻ thông tin số dư:

| Thẻ | Nguồn dữ liệu | Màu chủ đạo | Ghi chú |
|-----|--------------|-------------|---------|
| Số dư có thể rút | `bal.available` | Xanh lá (`green`) | Số tiền có thể yêu cầu rút ngay |
| Đang chờ từ đơn hàng | `bal.pendingFromOrders` | Vàng (`yellow`) | "Sẽ khả dụng sau T+3" |
| Tổng đã rút | `bal.totalWithdrawn` | Tím (`purple`) | Lũy kế từ trước đến nay |

#### FR-02.2 Form yêu cầu rút tiền

Form gồm:
- **Số tiền rút** (bắt buộc): ô nhập số, giá trị tối thiểu `100.000đ`, giá trị tối đa bằng `bal.available`.
- **Ghi chú** (tùy chọn): ô nhập văn bản tự do.
- Nút "Yêu cầu rút tiền" → gọi `doSellerRequestWithdrawal()`.

#### FR-02.3 Xử lý yêu cầu rút tiền (`doSellerRequestWithdrawal`)

**Validation:**
1. Đọc giá trị `amount` từ ô nhập.
2. Nếu `amount < 100.000` → toast lỗi "Số tiền rút tối thiểu là 100.000đ." Dừng xử lý.
3. Nếu `amount > bal.available` → toast lỗi "Số dư không đủ." Dừng xử lý.
4. Nếu seller chưa liên kết ngân hàng → toast lỗi hướng dẫn sang tab "Tài khoản ngân hàng".

**Luồng xử lý thành công:**
1. Tạo bản ghi rút tiền mới:
   ```javascript
   {
     id: 'WD-' + Date.now(),
     amount: amount,
     bankName: s.shopInfo.bank.bankName,
     bankAcc: '****' + last4Digits,    // che 4 chữ số cuối: ****XXXX
     bankHolder: s.shopInfo.bank.bankHolder,
     status: 'pending',
     note: note,
     requestedAt: todayStr(),
     completedAt: ''
   }
   ```
2. Trừ `amount` khỏi `bal.available`.
3. Cộng `amount` vào `bal.totalWithdrawn`.
4. Đẩy bản ghi mới vào mảng lịch sử rút tiền của seller.
5. Gọi `saveActiveSellers()`.
6. Gọi `addNotif(...)` để thêm thông báo hệ thống.
7. Hiển thị toast thành công: "Đã gửi yêu cầu rút tiền thành công."
8. Re-render giao diện (`renderAccount()`).

#### FR-02.4 Bảng lịch sử lệnh rút tiền

Hiển thị danh sách tất cả lệnh rút tiền của seller theo thứ tự mới nhất trước:

| Cột | Nguồn dữ liệu |
|-----|--------------|
| Mã lệnh | `wd.id` (VD: `WD-1719204800000`) |
| Số tiền | `wd.amount` (định dạng VNĐ) |
| Tài khoản | `wd.bankAcc` (đã được che `****XXXX`) |
| Ghi chú | `wd.note` |
| Ngày yêu cầu | `wd.requestedAt` |
| Ngày hoàn thành | `wd.completedAt` (hiển thị "—" nếu chưa hoàn thành) |
| Trạng thái | Badge màu theo trạng thái |

Trạng thái lệnh rút và màu badge:

| Trạng thái | Nhãn | Màu badge |
|-----------|------|-----------|
| `pending` | Chờ xử lý | Vàng |
| `processing` | Đang xử lý | Xanh dương |
| `completed` | Hoàn thành | Xanh lá |
| `rejected` | Bị từ chối | Đỏ |

---

### FR-03: Lịch sử giao dịch (Tab `history`)

#### FR-03.1 Thanh tóm tắt tổng hợp

Hiển thị 3 chỉ số tổng hợp trên toàn bộ lịch sử giao dịch:

| Chỉ số | Cách tính |
|--------|-----------|
| Tổng doanh thu gộp | Tổng `txn.orderTotal` của tất cả giao dịch |
| Tổng phí hoa hồng | Tổng `txn.commissionAmt` của tất cả giao dịch |
| Tổng thực nhận | Tổng `txn.netAmt` của tất cả giao dịch |

#### FR-03.2 Bảng giao dịch đầy đủ

Hiển thị toàn bộ `s.revenueData.transactions[]` (không giới hạn 7 như ở FR-01.5), với cột bổ sung mã TXN:

| Cột | Nguồn dữ liệu |
|-----|--------------|
| Mã TXN | `txn.id` (mã định danh giao dịch nội bộ) |
| Mã đơn | `txn.orderId` |
| Người mua | `txn.buyer` |
| Danh mục | `txn.category` (badge màu) |
| Tổng đơn | `txn.orderTotal` (định dạng VNĐ) |
| Phí (`rate`% / `amount`) | `txn.commissionRate`% và `txn.commissionAmt` |
| Thực nhận | `txn.netAmt` (màu xanh lá) |
| Trạng thái | Badge màu (cùng quy ước với FR-01.5) |
| Ngày | `txn.date` |

Khi không có giao dịch nào: hiển thị thông báo "Chưa có giao dịch nào."

---

### FR-04: Tài khoản ngân hàng (Tab `bank`)

#### FR-04.1 Hiển thị tài khoản đã liên kết

Nếu seller đã liên kết ngân hàng (`s.shopInfo.bank` tồn tại và không rỗng):
- Hiển thị thẻ thông tin: tên ngân hàng, số tài khoản đã được che (`****XXXX`), tên chủ tài khoản.
- Hiển thị badge "✓ Đã liên kết" màu xanh lá.
- Vẫn hiển thị form để cho phép cập nhật thông tin.

Nếu chưa liên kết (`s.shopInfo.bank` rỗng hoặc không tồn tại):
- Hiển thị banner cảnh báo màu vàng: "Chưa có tài khoản ngân hàng. Vui lòng liên kết để có thể rút tiền."

#### FR-04.2 Form liên kết / cập nhật ngân hàng

Form gồm 3 trường:
- **Ngân hàng** (`bankName`): dropdown chọn từ 14 ngân hàng được hỗ trợ (xem FR-04.4).
- **Số tài khoản** (`bankAcc`): ô nhập văn bản.
- **Tên chủ tài khoản** (`bankHolder`): ô nhập văn bản.
- Nút "Lưu tài khoản" → gọi `doUpdateSellerPayment(appId)`.
- Ghi chú bảo mật: "🔒 Không lưu CVV hoặc mã PIN."

#### FR-04.3 Xử lý cập nhật ngân hàng (`doUpdateSellerPayment`)

**Tham số:** `appId` — ID của ứng dụng seller đang hoạt động.

**Luồng xử lý:**
1. Đọc giá trị `bankName`, `bankAcc`, `bankHolder` từ form.
2. **Validation:** Kiểm tra cả 3 trường không được rỗng; nếu thiếu → toast lỗi tương ứng.
3. Xây dựng chuỗi bank: `"bankName – bankAcc – bankHolder"`.
4. Cập nhật `sellerApps[idx].shopInfo.bank = bankString`.
5. Đồng bộ cập nhật `activeSellers` với thông tin bank mới.
6. Gọi `saveActiveSellers()`.
7. Hiển thị toast thành công: "Đã cập nhật tài khoản ngân hàng."
8. Re-render giao diện (`renderAccount()`).

#### FR-04.4 Danh sách 14 ngân hàng được hỗ trợ

| # | Tên ngân hàng |
|---|--------------|
| 1 | Vietcombank |
| 2 | Techcombank |
| 3 | MB Bank |
| 4 | BIDV |
| 5 | VietinBank |
| 6 | Agribank |
| 7 | TPBank |
| 8 | VPBank |
| 9 | SHB |
| 10 | ACB |
| 11 | Sacombank |
| 12 | HDBank |
| 13 | OCB |
| 14 | SeABank |

---

## 3. Mô hình dữ liệu

### 3.1 Cấu trúc `revenueData`

```javascript
s.revenueData = {
  // Số dư tài khoản
  balance: {
    available: number,          // Số dư có thể rút (VNĐ)
    pendingFromOrders: number,  // Đang chờ từ đơn hàng chưa chốt (VNĐ)
    totalEarned: number,        // Tổng đã kiếm được từ trước đến nay (VNĐ)
    totalWithdrawn: number      // Tổng đã rút từ trước đến nay (VNĐ)
  },

  // Doanh thu phân loại theo danh mục
  revenueByCategory: {
    books: number,   // Doanh thu từ sách (VNĐ)
    ebook: number,   // Doanh thu từ ebook (VNĐ)
    vpp: number,     // Doanh thu từ văn phòng phẩm (VNĐ)
    tbgd: number     // Doanh thu từ thiết bị giáo dục (VNĐ)
  },

  // Dữ liệu biểu đồ theo từng chu kỳ
  dailyChart: number[],    // Doanh thu theo giờ trong ngày — 7 phần tử
  weeklyChart: number[],   // Doanh thu theo ngày trong tuần — 7 phần tử
  monthlyChart: number[],  // Doanh thu theo tháng trong năm — 12 phần tử
  yearlyChart: number[],   // Doanh thu theo quý trong năm — 4 phần tử

  // Danh sách giao dịch
  transactions: [
    {
      id: string,              // Mã giao dịch nội bộ (VD: 'TXN-001')
      orderId: string,         // Mã đơn hàng liên quan (VD: '#SL-001')
      buyer: string,           // Tên người mua
      category: string,        // Danh mục: 'books' | 'ebook' | 'vpp' | 'tbgd'
      orderTotal: number,      // Giá trị đơn hàng gộp (VNĐ)
      commissionRate: number,  // Tỉ lệ phí hoa hồng (%, VD: 9)
      commissionAmt: number,   // Số tiền phí hoa hồng (VNĐ)
      netAmt: number,          // Thực nhận = orderTotal - commissionAmt (VNĐ)
      status: string,          // 'pending' | 'processing' | 'settled' | 'refunded'
      date: string             // Ngày giao dịch — todayStr()
    }
  ]
}
```

### 3.2 Cấu trúc bản ghi rút tiền (Withdrawal)

```javascript
{
  id: string,           // Mã lệnh rút, định dạng 'WD-' + Date.now()
  amount: number,       // Số tiền yêu cầu rút (VNĐ)
  bankName: string,     // Tên ngân hàng đích
  bankAcc: string,      // Số tài khoản đã che: '****' + 4 chữ số cuối
  bankHolder: string,   // Tên chủ tài khoản
  status: string,       // 'pending' | 'processing' | 'completed' | 'rejected'
  note: string,         // Ghi chú của seller (có thể rỗng)
  requestedAt: string,  // Ngày tạo lệnh — todayStr()
  completedAt: string   // Ngày hoàn thành (rỗng nếu chưa xong)
}
```

### 3.3 Cấu trúc thông tin ngân hàng (`shopInfo.bank`)

Thông tin ngân hàng được lưu dưới dạng chuỗi ghép:

```javascript
s.shopInfo.bank = "bankName – bankAcc – bankHolder"
// VD: "Vietcombank – 1234567890 – Nguyen Van A"
```

Chuỗi này được đồng bộ lên cả `sellerApps[idx].shopInfo.bank` và `activeSellers[idx].shopInfo.bank` khi cập nhật.

### 3.4 Biến trạng thái toàn cục

```javascript
let sellerRevenuePeriod = 'month';   // Chu kỳ hiển thị biểu đồ: 'day'|'week'|'month'|'year'
let sellerPayTab = 'balance';        // Tab thanh toán: 'balance'|'history'|'bank'
```

### 3.5 Cấu hình chu kỳ biểu đồ

```javascript
const periodConfigs = {
  day:   { labels: ['6h','9h','12h','15h','18h','21h','23h'], key: 'todayRev' },
  week:  { labels: ['T2','T3','T4','T5','T6','T7','CN'],      key: 'thisWeekRev' },
  month: { labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'], key: 'thisMonthRev' },
  year:  { labels: ['Q1','Q2','Q3','Q4'],                      key: 'totalRevenue' }
}
```

### 3.6 Định tuyến (`acctTab` routing)

| Giá trị `acctTab` | Hàm render |
|-------------------|-----------|
| `'seller-revenue'` | `sellerRevenueReport()` |
| `'seller-payment'` | `sellerPaymentSettings(app)` |

### 3.7 Lưu trữ

- Toàn bộ dữ liệu seller (bao gồm `revenueData`, `shopInfo.bank`, lịch sử rút tiền) lưu tại `localStorage` key: `edumart_activeSellers`.
- Hàm đọc: `LS.get('activeSellers', null)`.
- Hàm ghi: `saveActiveSellers()` → `LS.set('activeSellers', activeSellers)`.

---

## 4. Luồng hoạt động

### 4.1 Luồng báo cáo doanh thu

```
Seller đăng nhập
        │
        ▼
   acctTab = 'seller-revenue'
        │
        ▼
   sellerRevenueReport()
        │
        ├─ Đọc s.revenueData từ activeSellers
        │
        ├─ Render KPI 4 thẻ (tổng, thực nhận, phí, đơn hoàn thành)
        │
        ├─ Render biểu đồ cột theo sellerRevenuePeriod (mặc định 'month')
        │        │
        │        ├─ [Chọn 'day']   → dùng dailyChart,   nhãn theo giờ
        │        ├─ [Chọn 'week']  → dùng weeklyChart,  nhãn theo ngày
        │        ├─ [Chọn 'month'] → dùng monthlyChart, nhãn theo tháng
        │        └─ [Chọn 'year']  → dùng yearlyChart,  nhãn theo quý
        │
        ├─ Render phân tích danh mục (4 thanh tiến trình màu)
        │
        └─ Render bảng 7 giao dịch gần nhất
```

### 4.2 Luồng yêu cầu rút tiền

```
Seller vào tab 'balance'
        │
        ▼
Nhập số tiền & ghi chú → [Yêu cầu rút tiền]
        │
        ▼
doSellerRequestWithdrawal()
        │
   ┌────┴──────────────────────────────┐
   │ Validation                        │
   │                                   │
   ├─ amount < 100.000 ──► toast lỗi  │
   │   "Tối thiểu 100.000đ"            │
   │                                   │
   ├─ amount > available ► toast lỗi  │
   │   "Số dư không đủ"                │
   │                                   │
   └─ chưa có ngân hàng ► toast lỗi  │
       "Liên kết ngân hàng trước"      │
        │
        ▼ (Validation passed)
Tạo bản ghi WD-{timestamp}
        │
        ├─ bal.available -= amount
        ├─ bal.totalWithdrawn += amount
        ├─ Push vào withdrawals[]
        ├─ saveActiveSellers()
        ├─ addNotif(...)
        └─ toast thành công
                │
                ▼
        renderAccount()
```

### 4.3 Luồng tính hoa hồng

```
Đơn hàng được giao thành công (status = 'delivered')
        │
        ▼
Tạo bản ghi giao dịch mới trong transactions[]
        │
        ├─ commissionRate = 9  (%)
        ├─ commissionAmt  = orderTotal * 0.09
        ├─ netAmt         = orderTotal - commissionAmt
        └─ status         = 'pending'
                │
                ▼
        (T+3 ngày làm việc)
                │
                ▼
        status → 'settled'
        bal.available += netAmt
        bal.pendingFromOrders -= netAmt
```

### 4.4 Luồng cập nhật ngân hàng

```
Seller vào tab 'bank'
        │
        ▼
[Chọn ngân hàng] → [Nhập số TK] → [Nhập tên chủ TK]
        │
        ▼
[Lưu tài khoản] → doUpdateSellerPayment(appId)
        │
   ┌────┴──────────────────────────────┐
   │ Validation                        │
   │                                   │
   └─ Thiếu trường bắt buộc ─► toast  │
       lỗi tương ứng                   │
        │
        ▼ (Validation passed)
sellerApps[idx].shopInfo.bank = "bankName – bankAcc – bankHolder"
activeSellers[idx].shopInfo.bank = cùng giá trị
        │
        ├─ saveActiveSellers()
        └─ toast thành công "Đã cập nhật tài khoản ngân hàng"
                │
                ▼
        renderAccount()
```

---

## 5. Giao diện người dùng

### 5.1 Trang báo cáo doanh thu

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Báo cáo Doanh thu                                                       │
│                                                                         │
│  [ Hôm nay ] [ Tuần này ] [● Tháng này ] [ Năm nay ]                  │
├──────────────┬──────────────┬──────────────┬──────────────────────────────┤
│  Tổng DT    │  Thực nhận  │  Phí nền tảng│  Đơn hoàn thành              │
│  45.200.000đ │  41.132.000đ │  4.068.000đ  │  127 đơn                    │
│  🔵          │  🟢          │  🟡          │  🟣                          │
│  ↑ 12.4%    │  Phí ~9%    │  Theo giao   │                              │
│  so kỳ trước│              │  dịch        │                              │
├─────────────────────────────────────────────────────────────────────────┤
│  Doanh thu theo tháng              │  Theo danh mục                      │
│                                    │                                     │
│        ▐▌                          │  Sách   ████████████ 62% 28.0tr   │
│      ▐▌▐▌▐▌                        │  Ebook  ████         21% 9.5tr    │
│    ▐▌▐▌▐▌▐▌▐▌                      │  VPP    ██           11% 5.0tr    │
│  ▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌▐▌          │  TBGD   █             6% 2.7tr   │
│  T1 T2 T3 T4 T5 T6 T7 T8 T9 T10...│                                    │
├─────────────────────────────────────────────────────────────────────────┤
│  7 Giao dịch gần nhất                                                   │
│  ┌──────────┬──────────┬────────┬──────────┬───────────┬────────┬──────┐ │
│  │ Mã đơn  │ Người mua│ DM    │ Tổng đơn │ Hoa hồng  │ TN    │ TT   │ │
│  ├──────────┼──────────┼────────┼──────────┼───────────┼────────┼──────┤ │
│  │ #SL-127 │ Nguyễn A │ Sách  │ 185.000đ │ 9%/16.650│168.350│ Đã TT│ │
│  │ #SL-126 │ Trần B   │ Ebook │ 220.000đ │ 9%/19.800│200.200│ Chờ  │ │
│  └──────────┴──────────┴────────┴──────────┴───────────┴────────┴──────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Tab số dư & rút tiền

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [💰 Số dư & Rút tiền] [📋 Lịch sử giao dịch] [🏦 Tài khoản ngân hàng] │
├──────────────────┬──────────────────────┬───────────────────────────────┤
│  Số dư có thể    │  Đang chờ từ đơn    │  Tổng đã rút                  │
│  rút             │  hàng               │                               │
│  12.500.000đ    │  3.200.000đ         │  45.000.000đ                  │
│  🟢              │  🟡 (Sau T+3)       │  🟣                           │
├─────────────────────────────────────────────────────────────────────────┤
│  Yêu cầu rút tiền                                                       │
│                                                                         │
│  Số tiền rút *  [                2.000.000                           ]  │
│  Ghi chú        [ Rút tiền tháng 6/2026                              ]  │
│                                                                         │
│  [                    Yêu cầu rút tiền                               ]  │
│                                                                         │
│  Tối thiểu 100.000đ · Số dư khả dụng: 12.500.000đ                     │
├─────────────────────────────────────────────────────────────────────────┤
│  Lịch sử rút tiền                                                        │
│  ┌─────────────────┬───────────┬──────────┬─────────────┬─────────────┐  │
│  │ Mã lệnh        │ Số tiền   │ Tài khoản│ Ngày YC     │ Trạng thái │  │
│  ├─────────────────┼───────────┼──────────┼─────────────┼─────────────┤  │
│  │ WD-1719204800  │2.000.000đ │****7890  │ 24/06/2026  │ Chờ xử lý │  │
│  │ WD-1718000100  │5.000.000đ │****7890  │ 10/06/2026  │ Hoàn thành │  │
│  └─────────────────┴───────────┴──────────┴─────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Tab lịch sử giao dịch

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [💰 Số dư & Rút tiền] [📋 Lịch sử giao dịch] [🏦 Tài khoản ngân hàng] │
├──────────────────┬──────────────────────┬───────────────────────────────┤
│  Tổng DT gộp     │  Tổng phí hoa hồng  │  Tổng thực nhận               │
│  87.500.000đ    │  7.875.000đ         │  79.625.000đ                  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌────────┬────────┬──────────┬────────┬──────────┬───────────┬────────┐ │
│  │Mã TXN │ Mã đơn │ Người mua│ DM    │ Tổng đơn │ Hoa hồng  │ TN    │ │
│  ├────────┼────────┼──────────┼────────┼──────────┼───────────┼────────┤ │
│  │TXN-127 │#SL-127 │Nguyễn A  │ Sách  │185.000đ  │9%/16.650đ │168.350│ │
│  │TXN-126 │#SL-126 │Trần B    │ Ebook │220.000đ  │9%/19.800đ │200.200│ │
│  └────────┴────────┴──────────┴────────┴──────────┴───────────┴────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Tab tài khoản ngân hàng (đã liên kết)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [💰 Số dư & Rút tiền] [📋 Lịch sử giao dịch] [🏦 Tài khoản ngân hàng] │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  Vietcombank                               ✓ Đã liên kết         │  │
│  │  Số TK: ****7890                                                  │  │
│  │  Chủ TK: NGUYEN VAN A                                             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Cập nhật tài khoản ngân hàng                                           │
│                                                                         │
│  Ngân hàng *   [ Vietcombank                                       ▼ ]  │
│  Số tài khoản *[ 1234567890                                           ]  │
│  Chủ tài khoản*[ NGUYEN VAN A                                         ]  │
│                                                                         │
│  [                     Lưu tài khoản                                 ]  │
│                                                                         │
│  🔒 Không lưu CVV hoặc mã PIN                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Tab tài khoản ngân hàng (chưa liên kết)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚠ Chưa có tài khoản ngân hàng. Vui lòng liên kết để có thể rút tiền. │
├─────────────────────────────────────────────────────────────────────────┤
│  Ngân hàng *   [  -- Chọn ngân hàng --                            ▼ ]  │
│  Số tài khoản *[                                                      ]  │
│  Chủ tài khoản*[                                                      ]  │
│                                                                         │
│  [                     Lưu tài khoản                                 ]  │
│                                                                         │
│  🔒 Không lưu CVV hoặc mã PIN                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mô tả |
|---------|-------|
| Render biểu đồ | Biểu đồ dạng div flex, không thư viện ngoài; render < 16ms (một frame 60fps) |
| Tính toán KPI | Toàn bộ tính toán client-side trên mảng dữ liệu; phản hồi < 50ms với < 1.000 giao dịch |
| Đổi chu kỳ biểu đồ | Re-render tức thì khi nhấn nút chu kỳ, không delay |
| Lưu trữ | `saveActiveSellers()` ghi đồng bộ vào `localStorage`; với dữ liệu lớn cân nhắc debounce |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Phân quyền | Chỉ seller được duyệt mới truy cập module doanh thu và thanh toán |
| Cô lập dữ liệu | Seller chỉ xem dữ liệu của chính mình (`s.email === user.email`) |
| Che số tài khoản | Số tài khoản ngân hàng luôn được che dạng `****XXXX` (4 chữ số cuối) khi hiển thị |
| Không lưu CVV/PIN | Hệ thống không thu thập và không lưu CVV hoặc mã PIN ngân hàng |
| Escape đầu ra | Dữ liệu người dùng (tên chủ TK, ghi chú) được escape qua `escHtml()` trước khi render |
| Validation nhập liệu | Số tiền rút phải là số dương, tối thiểu 100.000đ, tối đa bằng số dư khả dụng |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Phản hồi tức thì | Toast thông báo kết quả mọi thao tác (rút tiền, cập nhật ngân hàng) |
| Chỉ báo trạng thái | Badge màu sắc nhất quán cho trạng thái giao dịch và lệnh rút tiền |
| Ngăn rút vượt số dư | Form rút tiền disable hoặc từ chối nếu không có ngân hàng liên kết |
| Hướng dẫn ngữ cảnh | Nếu chưa liên kết ngân hàng, banner cảnh báo hướng dẫn chuyển sang tab Bank |
| Số liệu rõ ràng | Tất cả số tiền định dạng nhất quán dạng VNĐ với dấu chấm ngàn (VD: 12.500.000đ) |
| Thanh tóm tắt | Tab Lịch sử luôn hiển thị 3 chỉ số tổng hợp đầu trang để dễ đọc tổng quan |

### 6.4 Tương thích

| Yêu cầu | Mô tả |
|---------|-------|
| Lưu trữ | `localStorage` — dữ liệu tồn tại giữa các phiên trên cùng thiết bị/trình duyệt |
| Định dạng tiền | Số tiền hiển thị nhất quán dạng đồng Việt Nam với dấu chấm ngàn |
| Responsive | Hàng KPI và bảng giao dịch hỗ trợ cuộn ngang trên màn hình nhỏ (`overflow-x: auto`) |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Khi chọn chu kỳ "Hôm nay" (`sellerRevenuePeriod = 'day'`), biểu đồ hiển thị đúng 7 cột ứng với nhãn `['6h','9h','12h','15h','18h','21h','23h']` và dữ liệu từ `dailyChart`.

**AC-02:** Khi chọn chu kỳ "Tháng này" (`sellerRevenuePeriod = 'month'`), biểu đồ hiển thị đúng 12 cột ứng với nhãn `['T1'...'T12']` và dữ liệu từ `monthlyChart`.

**AC-03:** Thẻ KPI "Thực nhận" hiển thị xấp xỉ 91% của tổng doanh thu, kèm ghi chú "Trung bình phí: ~9%".

**AC-04:** Thẻ KPI "Phí nền tảng" hiển thị xấp xỉ 9% của tổng doanh thu, kèm ghi chú "Tính theo từng giao dịch".

**AC-05:** Thẻ KPI "Đơn hoàn thành" đếm đúng số giao dịch có `status === 'settled'` trong `transactions[]`.

**AC-06:** Tổng tỉ lệ 4 danh mục (books + ebook + vpp + tbgd) bằng 100%. Thanh tiến trình của mỗi danh mục hiển thị đúng màu và chiều rộng tương ứng.

**AC-07:** Bảng giao dịch trên trang báo cáo chỉ hiển thị 7 giao dịch gần nhất; bảng trong tab "Lịch sử giao dịch" hiển thị toàn bộ `transactions[]`.

**AC-08:** `doSellerRequestWithdrawal()` từ chối (toast lỗi) khi `amount < 100.000` và khi `amount > bal.available`.

**AC-09:** `doSellerRequestWithdrawal()` từ chối (toast lỗi) khi seller chưa liên kết ngân hàng.

**AC-10:** Sau khi rút tiền thành công, `bal.available` giảm đúng bằng `amount` và `bal.totalWithdrawn` tăng đúng bằng `amount`.

**AC-11:** Bản ghi rút tiền mới được thêm vào mảng lịch sử với `id = 'WD-' + timestamp`, `status = 'pending'`, `bankAcc` có dạng `****XXXX` (số tài khoản bị che).

**AC-12:** Bảng lịch sử rút tiền hiển thị đúng `completedAt = '—'` cho lệnh chưa hoàn thành.

**AC-13:** Tab "Lịch sử giao dịch" tính đúng tổng gộp, tổng phí và tổng thực nhận từ toàn bộ `transactions[]`.

**AC-14:** `doUpdateSellerPayment(appId)` từ chối (toast lỗi) khi thiếu bất kỳ trường nào trong `bankName`, `bankAcc`, `bankHolder`.

**AC-15:** Sau khi cập nhật ngân hàng thành công, chuỗi `"bankName – bankAcc – bankHolder"` được ghi đồng thời vào cả `sellerApps[idx].shopInfo.bank` và `activeSellers[idx].shopInfo.bank`.

**AC-16:** Khi seller đã liên kết ngân hàng, badge "✓ Đã liên kết" và thẻ thông tin ngân hàng hiển thị đúng với số tài khoản bị che (`****XXXX`).

**AC-17:** Khi seller chưa liên kết ngân hàng, banner cảnh báo màu vàng hiển thị trước form.

**AC-18:** Dropdown ngân hàng liệt kê đúng 14 ngân hàng được hỗ trợ.

**AC-19:** Sau mọi thao tác thay đổi dữ liệu, `saveActiveSellers()` được gọi và dữ liệu được persisted vào `localStorage`.

**AC-20:** `addNotif()` được gọi sau mỗi lần yêu cầu rút tiền thành công.

**AC-21:** Tất cả số tiền hiển thị dưới định dạng VNĐ với dấu chấm ngàn (VD: 12.500.000đ, không phải 12500000).

**AC-22:** Chiều cao mỗi cột biểu đồ tỉ lệ chính xác với giá trị tương ứng trong mảng dữ liệu so với giá trị lớn nhất (`maxValue`).

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Seller rút tiền nhiều lần nhanh (double-submit) dẫn đến tổng rút vượt số dư khả dụng | Cao | P1: Disable nút "Yêu cầu rút tiền" ngay sau lần nhấn đầu tiên cho đến khi xử lý xong; P2: Kiểm tra lại số dư ngay trước khi ghi |
| R-02 | Dữ liệu `revenueData` không tồn tại trong `activeSellers` (seller cũ chưa có trường này) gây lỗi render | Cao | P1: Khởi tạo `revenueData` với cấu trúc mặc định (số 0, mảng rỗng) nếu trường chưa tồn tại trước khi render |
| R-03 | Tỉ lệ hoa hồng 9% được hardcode — khó thay đổi khi chính sách phí thay đổi | Trung bình | P2: Đưa `commissionRate` vào cấu hình tập trung (`PLATFORM_CONFIG`) thay vì hardcode; cho phép cấu hình theo danh mục sản phẩm |
| R-04 | Số tài khoản ngân hàng được lưu dạng plaintext trong `localStorage` | Trung bình | P2: Mã hóa nhẹ (`btoa`/obfuscation) phía client; P3 (dài hạn): Lưu thông tin ngân hàng trên server với mã hóa end-to-end |
| R-05 | Lịch sử giao dịch lớn (> 1.000 mục) làm chậm render bảng và tính toán tổng hợp | Trung bình | P2: Phân trang bảng lịch sử; pre-compute tổng hợp khi ghi dữ liệu thay vì tính lại mỗi lần render |
| R-06 | Số dư `available` trong `localStorage` có thể bị chỉnh sửa bằng DevTools, gây rút tiền sai | Trung bình | P3: Chuyển validation và xử lý rút tiền sang server-side; `localStorage` chỉ dùng cho UI cache |
| R-07 | Seller liên kết sai số tài khoản ngân hàng — tiền chuyển đến tài khoản sai | Cao | P2: Thêm bước xác nhận (hiển thị lại thông tin đã nhập, yêu cầu seller xác nhận trước khi lưu); P3: Tích hợp API xác thực số tài khoản ngân hàng (bank account validation) |
| R-08 | Dữ liệu biểu đồ (`dailyChart`, `weeklyChart`, ...) không đồng bộ với `transactions[]` thực tế | Thấp | P2: Tự động tính lại dữ liệu biểu đồ từ `transactions[]` thay vì lưu riêng; đảm bảo nhất quán dữ liệu |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Bộ chọn 4 chu kỳ thời gian: Hôm nay, Tuần này, Tháng này, Năm nay (`sellerRevenuePeriod`)
- [x] Biểu đồ cột doanh thu theo chu kỳ (div flex, không thư viện ngoài)
- [x] KPI 4 thẻ: Tổng doanh thu, Thực nhận (~91%), Phí nền tảng (~9%), Đơn hoàn thành
- [x] Phân tích doanh thu theo 4 danh mục với thanh tiến trình màu (books, ebook, vpp, tbgd)
- [x] Bảng 7 giao dịch gần nhất với đầy đủ thông tin và badge trạng thái
- [x] Định tuyến `acctTab = 'seller-revenue'` → `sellerRevenueReport()`
- [x] 3 thẻ số dư: Có thể rút, Đang chờ (T+3), Tổng đã rút
- [x] Form yêu cầu rút tiền với validation (tối thiểu 100.000đ, không vượt số dư)
- [x] Xử lý rút tiền `doSellerRequestWithdrawal()`: tạo bản ghi WD-, che số TK, cập nhật số dư
- [x] Bảng lịch sử lệnh rút tiền với đầy đủ thông tin và badge trạng thái
- [x] Tab lịch sử giao dịch với thanh tóm tắt tổng hợp (tổng gộp, tổng phí, tổng thực nhận)
- [x] Bảng giao dịch đầy đủ trong tab lịch sử có mã TXN
- [x] Form liên kết tài khoản ngân hàng với dropdown 14 ngân hàng
- [x] Xử lý `doUpdateSellerPayment(appId)`: lưu chuỗi bank, đồng bộ sellerApps và activeSellers
- [x] Hiển thị thẻ ngân hàng đã liên kết với badge "✓ Đã liên kết" và số TK bị che
- [x] Banner cảnh báo khi chưa liên kết ngân hàng
- [x] Ghi chú bảo mật "🔒 Không lưu CVV hoặc mã PIN"
- [x] Toast thông báo và `addNotif()` cho các thao tác rút tiền và cập nhật ngân hàng
- [x] Định tuyến `acctTab = 'seller-payment'` → `sellerPaymentSettings(app)`
- [x] 3 tab trong trang thanh toán: `balance`, `history`, `bank` (`sellerPayTab`)

### P2 — Cải tiến tiếp theo

- [ ] Disable nút rút tiền sau lần nhấn đầu để ngăn double-submit
- [ ] Bước xác nhận trước khi lưu tài khoản ngân hàng (hiển thị lại thông tin để seller kiểm tra)
- [ ] Validate định dạng số tài khoản ngân hàng theo từng ngân hàng (độ dài, ký tự hợp lệ)
- [ ] Phân trang bảng lịch sử giao dịch khi số lượng vượt ngưỡng (VD: > 50)
- [ ] Bộ lọc lịch sử giao dịch theo khoảng thời gian (ngày từ – đến)
- [ ] Bộ lọc theo trạng thái giao dịch (`pending`, `settled`, `refunded`)
- [ ] Xuất lịch sử giao dịch ra CSV/Excel
- [ ] Đưa `commissionRate` vào cấu hình tập trung, hỗ trợ phí khác nhau theo danh mục
- [ ] Cải thiện biểu đồ: tooltip khi hover vào cột, hiển thị giá trị
- [ ] Tự động tính dữ liệu biểu đồ từ `transactions[]` để đảm bảo nhất quán

### P3 — Tầm nhìn dài hạn

- [ ] Chuyển xử lý rút tiền sang server-side với hàng đợi phê duyệt (maker-checker)
- [ ] Tích hợp API xác thực số tài khoản ngân hàng thời gian thực
- [ ] Lưu thông tin ngân hàng trên server với mã hóa; loại bỏ lưu plaintext trong `localStorage`
- [ ] Dashboard doanh thu nâng cao: so sánh nhiều kỳ, dự báo xu hướng
- [ ] Biểu đồ đường (line chart) cho phân tích xu hướng dài hạn
- [ ] Báo cáo thuế tự động: tổng hợp thu nhập theo năm tài chính, xuất PDF
- [ ] Hỗ trợ nhiều tài khoản ngân hàng; cho phép chọn tài khoản mặc định khi rút tiền
- [ ] Webhook thông báo khi lệnh rút tiền được xử lý (email, SMS, push notification)
- [ ] Tích hợp ví điện tử (MoMo, VNPay, ZaloPay) như kênh nhận tiền thay thế
- [ ] Tính năng tự động rút tiền định kỳ (VD: mỗi thứ 6 hàng tuần khi số dư đạt ngưỡng)
