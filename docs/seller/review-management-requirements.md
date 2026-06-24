# Yêu cầu chức năng: Quản lý Đánh giá — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai  
**Module liên quan:** `seller-reviews`, `sellerReviewCenter`

---

## 1. Tổng quan

### 1.1 Mục đích

Module quản lý đánh giá cho phép seller đã được duyệt theo dõi và phản hồi toàn bộ đánh giá mà người mua để lại cho các sản phẩm của họ trên nền tảng EduMart: xem tổng hợp thống kê đánh giá, lọc theo tab trạng thái phản hồi và mức sao, viết phản hồi cho đánh giá chưa trả lời, chỉnh sửa hoặc xóa phản hồi đã gửi, và báo cáo các đánh giá vi phạm để quản trị viên xem xét.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Trung tâm đánh giá (`sellerReviewCenter`) | Hàm render chính, tổng hợp toàn bộ module | Đã triển khai |
| Thống kê đánh giá | Điểm trung bình, phân bổ sao, 4 KPI tổng hợp | Đã triển khai |
| Bộ lọc tab (4 tab) | Tất cả, Chưa trả lời, Tích cực ≥4★, Tiêu cực ≤2★ | Đã triển khai |
| Bộ lọc sao | 6 nút lọc mức sao (Tất cả, 5★ → 1★) | Đã triển khai |
| Bộ lọc sản phẩm | Dropdown chọn theo sản phẩm cụ thể | Đã triển khai |
| Danh sách thẻ đánh giá | Hiển thị từng đánh giá, sắp xếp mới nhất trước | Đã triển khai |
| Viết phản hồi | `doSellerSaveReply` — gửi phản hồi mới | Đã triển khai |
| Sửa phản hồi | Chỉnh sửa phản hồi đã gửi qua `sellerReviewEditReplyId` | Đã triển khai |
| Xóa phản hồi | `doSellerDeleteReply` — xóa phản hồi hiện có | Đã triển khai |
| Báo cáo đánh giá | `doSellerReportReview` — báo cáo vi phạm lên admin | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Xem, lọc, phản hồi, sửa, xóa phản hồi, báo cáo đánh giá |
| Hệ thống | Lưu `reviewsStore` vào `localStorage`, gửi `addNotif()`, hiển thị toast |
| Người mua | Nguồn gốc đánh giá; dữ liệu xuất hiện trong `name`, `rate`, `text`, `date` |
| Quản trị viên | Nhận báo cáo đánh giá vi phạm; xem xét và xử lý trong vòng 24–48 giờ |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại trong phiên).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- `reviewsStore` được khởi tạo từ `LS.get('reviews', {})` — object toàn cục lưu đánh giá theo `productId`.
- Nếu chưa được duyệt, hệ thống hiển thị trang `sellerAppStatus()` thay vì module đánh giá.

---

## 2. Yêu cầu chức năng

### FR-01: Danh sách đánh giá và thống kê (`sellerReviewCenter`)

#### FR-01.1 Thu thập đánh giá từ tất cả sản phẩm

- Seller thấy đánh giá của **tất cả sản phẩm** thuộc về họ, không giới hạn theo loại.
- Bản đồ sản phẩm (product map) được xây dựng từ bốn tập hợp:

| Tập hợp | Nguồn dữ liệu |
|---------|---------------|
| Sách thường | `s.products` |
| Sách điện tử | `s.ebooks` |
| Văn phòng phẩm (VPP) | `s.vppProducts` |
| Thiết bị giáo dục (TBGD) | `s.tbgdProducts` |

- Mỗi đánh giá từ `reviewsStore[pid][]` được bổ sung hai trường trước khi xử lý: `pid` (product ID) và `pidx` (index trong mảng đánh giá của sản phẩm đó).

#### FR-01.2 Tính toán thống kê

Toàn bộ số liệu thống kê được tính từ **tập đánh giá chưa lọc** (tất cả đánh giá của mọi sản phẩm thuộc seller):

| Chỉ số | Công thức |
|--------|-----------|
| `cnt.all` | Tổng số đánh giá |
| `cnt.unanswered` | Số đánh giá không có `r.reply` |
| `cnt.positive` | Số đánh giá có `r.rate >= 4` |
| `cnt.negative` | Số đánh giá có `r.rate <= 2` |
| `totalReplied` | Số đánh giá có `!!r.reply === true` |
| `avgRate` | `sum(r.rate) / cnt.all`, hiển thị dạng `X.X` |
| Phân bổ `starDist[n]` | Số đánh giá có `r.rate === n` (n = 1..5) |

- `avgRate` hiển thị màu cam (`#f57f17`) với icon sao kèm theo.
- Phân bổ sao hiển thị dưới dạng thanh ngang (`width = starDist[n] / cnt.all * 100%`), màu `#f57f17`.

#### FR-01.3 Khối thống kê (Stats block)

Luôn hiển thị ở đầu trang, kể cả khi danh sách đánh giá sau lọc rỗng. Bao gồm:

1. **Điểm trung bình**: Số lớn màu cam (`avgRate`) + chuỗi sao tương ứng.
2. **Thanh phân bổ sao** (5★ → 1★): chiều rộng tỉ lệ với `starDist[n] / cnt.all`.
3. **4 ô KPI mini**:

| KPI | Điều kiện | Màu |
|-----|-----------|-----|
| Tích cực ≥4★ | `cnt.positive` | Xanh lá |
| Tiêu cực ≤2★ | `cnt.negative` | Đỏ |
| Chưa trả lời | `cnt.unanswered` | Vàng |
| Đã trả lời | `totalReplied` | Xanh dương |

---

### FR-02: Bộ lọc (`sellerReviewFilter`, `sellerReviewStarFilter`, `sellerReviewProductFilter`)

#### FR-02.1 Bộ lọc tab (4 tab)

| Tab | Nhãn | Điều kiện lọc | Biến |
|-----|------|---------------|------|
| Tất cả | Tất cả | Không lọc | `sellerReviewFilter === 'all'` |
| Chưa trả lời | Chưa trả lời | `!r.reply` | `sellerReviewFilter === 'unanswered'` |
| Tích cực | Tích cực ≥4★ | `r.rate >= 4` | `sellerReviewFilter === 'positive'` |
| Tiêu cực | Tiêu cực ≤2★ | `r.rate <= 2` | `sellerReviewFilter === 'negative'` |

Mỗi tab hiển thị số đếm tương ứng từ `cnt.*` trong dấu ngoặc đơn. Tab đang chọn có viền/nền đặc trưng.

#### FR-02.2 Bộ lọc sao (6 nút)

| Nút | Giá trị | Điều kiện lọc |
|-----|---------|---------------|
| Tất cả | `0` | Không lọc theo sao |
| 5★ | `5` | `r.rate === 5` |
| 4★ | `4` | `r.rate === 4` |
| 3★ | `3` | `r.rate === 3` |
| 2★ | `2` | `r.rate === 2` |
| 1★ | `1` | `r.rate === 1` |

- Biến: `sellerReviewStarFilter` (number, mặc định `0`).
- Nút đang chọn có viền màu cam (orange border).
- Lọc sao chỉ áp dụng khi `sellerReviewStarFilter > 0`.

#### FR-02.3 Bộ lọc sản phẩm (Dropdown)

- Biến: `sellerReviewProductFilter` (string, mặc định `'all'`).
- Giá trị `'all'`: không lọc theo sản phẩm.
- Giá trị cụ thể: lọc `r.pid === productId`.
- Dropdown liệt kê tất cả sản phẩm có đánh giá của seller, hiển thị tên sản phẩm.

#### FR-02.4 Trình tự áp dụng bộ lọc

Các bộ lọc áp dụng **theo thứ tự tuần tự** trên toàn bộ tập đánh giá:

1. **Tab filter**: lọc theo `sellerReviewFilter`.
2. **Star filter**: nếu `sellerReviewStarFilter > 0` → lọc thêm theo `r.rate`.
3. **Product filter**: nếu `sellerReviewProductFilter !== 'all'` → lọc thêm theo `r.pid`.

#### FR-02.5 Sắp xếp kết quả

Danh sách sau khi lọc được sắp xếp **mới nhất trước** (descending) theo `r.date` (định dạng `DD/MM/YYYY` được parse về `Date` để so sánh).

---

### FR-03: Viết và sửa phản hồi (`doSellerSaveReply`)

#### FR-03.1 Trạng thái chỉnh sửa

- Biến: `sellerReviewEditReplyId` (string|null, mặc định `null`).
- Định dạng key: `'pid:idx'` (ví dụ: `'prod-001:2'`).
- Chỉ một thẻ đánh giá ở chế độ chỉnh sửa tại một thời điểm.

#### FR-03.2 Viết phản hồi mới

**Điều kiện:** Đánh giá chưa có `r.reply` (hoặc `r.reply` rỗng).

**Luồng xử lý:**
1. Nhấn "💬 Viết phản hồi" → đặt `sellerReviewEditReplyId = 'pid:idx'`, re-render.
2. Hiển thị textarea rỗng với ID `taId` (dạng `'ta_pid_idx'`).
3. Nhập nội dung phản hồi và nhấn "💾 Lưu phản hồi".
4. Gọi `doSellerSaveReply(pid, idx, taId)`:
   a. Đọc giá trị từ `document.getElementById(taId).value.trim()`.
   b. **Validation:** Nếu rỗng → toast lỗi, dừng xử lý.
   c. Gán `reviewsStore[pid][idx].reply = text`.
   d. Gán `reviewsStore[pid][idx].replyDate = todayStr()`.
   e. Gọi `LS.set('reviews', reviewsStore)`.
   f. Đặt `sellerReviewEditReplyId = null`.
   g. Re-render (`renderAccount()`).
5. Nhấn "Hủy" → đặt `sellerReviewEditReplyId = null`, re-render mà không lưu.

#### FR-03.3 Sửa phản hồi đã có

**Điều kiện:** Đánh giá đã có `r.reply` và không đang ở chế độ chỉnh sửa.

**Luồng xử lý:**
1. Nhấn "✏️ Sửa" → đặt `sellerReviewEditReplyId = 'pid:idx'`, re-render.
2. Hiển thị textarea **đã điền sẵn** nội dung `r.reply` hiện tại.
3. Nhấn "💾 Lưu phản hồi" → cùng luồng như FR-03.2 bước 4 (ghi đè `reply` và `replyDate`).
4. Nhấn "Hủy" → đặt `sellerReviewEditReplyId = null`, không lưu thay đổi.

---

### FR-04: Xóa phản hồi (`doSellerDeleteReply`)

**Điều kiện:** Đánh giá đã có `r.reply` và không đang ở chế độ chỉnh sửa.

**Luồng xử lý (`doSellerDeleteReply(pid, idx)`):**
1. Hiển thị hộp thoại `confirm()` yêu cầu xác nhận xóa.
2. Nếu người dùng hủy → dừng xử lý.
3. Xóa `reviewsStore[pid][idx].reply`.
4. Xóa `reviewsStore[pid][idx].replyDate`.
5. Gọi `LS.set('reviews', reviewsStore)`.
6. Re-render (`renderAccount()`).

---

### FR-05: Báo cáo đánh giá vi phạm (`doSellerReportReview`)

**Điều kiện:** Đánh giá chưa được báo cáo (`!r.reported`).

**Luồng xử lý (`doSellerReportReview(pid, idx)`):**
1. Hiển thị `prompt()` yêu cầu nhập lý do báo cáo.
2. **Validation:** Nếu lý do rỗng hoặc người dùng hủy → dừng xử lý.
3. Gán `reviewsStore[pid][idx].reported = true`.
4. Gán `reviewsStore[pid][idx].reportReason = reason`.
5. Gán `reviewsStore[pid][idx].reportDate = todayStr()`.
6. Gọi `LS.set('reviews', reviewsStore)`.
7. Gọi `addNotif('⚑ Bạn đã báo cáo 1 đánh giá — quản trị viên sẽ xem xét trong 24–48 giờ.')`.
8. Hiển thị toast xác nhận.
9. Re-render (`renderAccount()`).

**Sau khi báo cáo:** Nút báo cáo được thay bằng badge "⚑ Đã báo cáo" màu cam; seller không thể báo cáo lại cùng đánh giá đó.

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng đánh giá (`Review`)

```javascript
reviewsStore[pid][idx] = {
  // Thông tin người đánh giá
  name: string,          // Tên người mua (VD: "Nguyễn Văn A")

  // Nội dung đánh giá
  rate: number,          // Mức sao: 1 | 2 | 3 | 4 | 5
  date: string,          // Ngày đánh giá: "DD/MM/YYYY"
  text: string,          // Nội dung đánh giá

  // Phản hồi của seller (tuỳ chọn)
  reply?: string,        // Nội dung phản hồi (undefined nếu chưa có)
  replyDate?: string,    // Ngày phản hồi: "DD/MM/YYYY" (undefined nếu chưa có)

  // Báo cáo vi phạm (tuỳ chọn)
  reported?: boolean,    // true nếu đã báo cáo
  reportReason?: string, // Lý do báo cáo
  reportDate?: string    // Ngày báo cáo: "DD/MM/YYYY"
}
```

### 3.2 Cấu trúc `reviewsStore`

```javascript
// Object toàn cục lưu đánh giá theo sản phẩm
reviewsStore = {
  [productId: string]: Review[]  // Mảng đánh giá của từng sản phẩm
}

// VD:
reviewsStore = {
  'prod-001': [
    { name: 'Nguyễn Văn A', rate: 5, date: '24/06/2026', text: '...' },
    { name: 'Trần Thị B', rate: 2, date: '20/06/2026', text: '...', reply: '...' }
  ],
  'ebook-003': [
    { name: 'Lê Văn C', rate: 4, date: '18/06/2026', text: '...', reported: true }
  ]
}
```

### 3.3 Biến trạng thái toàn cục

```javascript
let sellerReviewFilter = 'all';           // Tab lọc: 'all' | 'unanswered' | 'positive' | 'negative'
let sellerReviewStarFilter = 0;           // Lọc sao: 0 (tất cả) | 1 | 2 | 3 | 4 | 5
let sellerReviewProductFilter = 'all';    // Lọc sản phẩm: 'all' | productId
let sellerReviewEditReplyId = null;       // Key đánh giá đang chỉnh sửa: 'pid:idx' | null
```

### 3.4 Bản đồ sản phẩm (Product Map)

```javascript
// Xây dựng từ 4 tập hợp sản phẩm của seller
const productMap = {};
[...s.products, ...s.ebooks, ...s.vppProducts, ...s.tbgdProducts].forEach(p => {
  productMap[p.id] = p;
});
```

Mỗi đối tượng sản phẩm trong `productMap` có ít nhất các trường: `id`, `name`, và loại sản phẩm (sách/ebook/vpp/tbgd) để hiển thị badge.

### 3.5 Định tuyến (acctTab routing)

| Giá trị `acctTab` | Hàm render |
|-------------------|-----------|
| `'seller-reviews'` | `sellerReviewCenter()` |

### 3.6 Lưu trữ

- `reviewsStore` lưu tại `localStorage` key: `reviews` (tách biệt với `edumart_activeSellers`).
- Hàm đọc: `LS.get('reviews', {})`.
- Hàm ghi: `LS.set('reviews', reviewsStore)` (gọi trực tiếp, không qua `saveActiveSellers()`).

---

## 4. Luồng hoạt động

### 4.1 Luồng tổng thể module đánh giá

```
Người dùng đăng nhập
        │
        ▼
   acctTab = 'seller-reviews'
        │
        ▼
   sellerContent()
        │
        ├─ seller chưa duyệt ──► sellerAppStatus()
        │
        └─ seller đã duyệt  ──► sellerReviewCenter()
                                        │
                     ┌──────────────────┼─────────────────────┐
                     ▼                  ▼                     ▼
              [Lọc tab/sao/sp]   [Xem thống kê]      [Thao tác đánh giá]
                     │                  │                     │
                     ▼                  ▼          ┌──────────┼──────────┐
              Danh sách             Stats block    ▼          ▼          ▼
              đánh giá             luôn hiển thị  Viết     Sửa/Xóa   Báo cáo
              đã lọc               (kể cả rỗng)   phản hồi  phản hồi  vi phạm
```

### 4.2 Luồng viết phản hồi

```
Thẻ đánh giá (chưa có reply)
        │
        │  [💬 Viết phản hồi]
        ▼
sellerReviewEditReplyId = 'pid:idx'
        │
        ▼
Hiển thị textarea rỗng + [💾 Lưu phản hồi] + [Hủy]
        │
   ┌────┴───────────────────┐
   ▼                        ▼
[💾 Lưu phản hồi]         [Hủy]
   │                        │
   ▼                        ▼
doSellerSaveReply(       sellerReviewEditReplyId = null
  pid, idx, taId)        renderAccount()
   │
   ├─ text rỗng ──► toast lỗi (dừng)
   │
   ▼
reviewsStore[pid][idx].reply = text
reviewsStore[pid][idx].replyDate = todayStr()
LS.set('reviews', reviewsStore)
sellerReviewEditReplyId = null
renderAccount()
```

### 4.3 Luồng sửa và xóa phản hồi

```
Thẻ đánh giá (đã có reply, không đang chỉnh sửa)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[✏️ Sửa]                       [🗑 Xóa]
   │                               │
   ▼                               ▼
sellerReviewEditReplyId = 'pid:idx'   doSellerDeleteReply(pid, idx)
   │                               │
   ▼                               ▼
Textarea điền sẵn reply cũ    confirm() dialog
   │                               │
   │                          ┌────┴────────┐
   │                          ▼             ▼
[💾 Lưu phản hồi]          [OK]           [Hủy]
   │                          │             │
   ▼                          ▼             ▼
doSellerSaveReply(...)    delete reply    dừng xử lý
(ghi đè reply + replyDate) delete replyDate
                           LS.set('reviews', reviewsStore)
                           renderAccount()
```

### 4.4 Luồng báo cáo vi phạm

```
Thẻ đánh giá (chưa báo cáo: !r.reported)
        │
        │  [⚑ Báo cáo]
        ▼
doSellerReportReview(pid, idx)
        │
        ▼
prompt('Lý do báo cáo?')
        │
   ┌────┴──────────────────┐
   ▼                       ▼
[Lý do rỗng / Hủy]     [Có lý do]
   │                       │
   ▼                       ▼
dừng xử lý         r.reported = true
                    r.reportReason = reason
                    r.reportDate = todayStr()
                    LS.set('reviews', reviewsStore)
                    addNotif('⚑ Bạn đã báo cáo 1 đánh giá...')
                    toast xác nhận
                    renderAccount()
                         │
                         ▼
                 Badge "⚑ Đã báo cáo" thay nút
```

### 4.5 Luồng áp dụng bộ lọc

```
Toàn bộ đánh giá của seller (allReviews)
        │
        │  Bước 1: Tab filter
        ▼
'unanswered' → lọc !r.reply
'positive'   → lọc r.rate >= 4
'negative'   → lọc r.rate <= 2
'all'        → không lọc
        │
        │  Bước 2: Star filter (nếu sellerReviewStarFilter > 0)
        ▼
lọc r.rate === sellerReviewStarFilter
        │
        │  Bước 3: Product filter (nếu !== 'all')
        ▼
lọc r.pid === sellerReviewProductFilter
        │
        │  Sắp xếp: mới nhất trước
        ▼
parse date 'DD/MM/YYYY' → Date → sort descending
        │
        ▼
Danh sách thẻ đánh giá hiển thị
```

---

## 5. Giao diện người dùng

### 5.1 Khối thống kê (Stats block)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Tổng quan đánh giá                                                      │
│                                                                         │
│       4.3 ★★★★☆                                                         │
│   (màu cam, font lớn)                                                   │
│                                                                         │
│  5★ ████████████████████░░░░  (24 đánh giá)                            │
│  4★ ████████░░░░░░░░░░░░░░░░  (11 đánh giá)                            │
│  3★ ███░░░░░░░░░░░░░░░░░░░░░  (4 đánh giá)                             │
│  2★ █░░░░░░░░░░░░░░░░░░░░░░░  (2 đánh giá)                             │
│  1★ █░░░░░░░░░░░░░░░░░░░░░░░  (1 đánh giá)                             │
│                                                                         │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │     35     │ │      3     │ │      8     │ │     34     │          │
│  │ Tích cực  │ │  Tiêu cực │ │ Chưa trả  │ │ Đã trả    │          │
│  │    ≥4★    │ │    ≤2★    │ │    lời    │ │    lời    │          │
│  │  (xanh lá)│ │   (đỏ)   │ │  (vàng)   │ │ (xanh dương)│         │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Thanh tab và bộ lọc (Filter bar)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [ Tất cả (42) ] [ Chưa trả lời (8) ] [ Tích cực ≥4★ (35) ] [ Tiêu cực ≤2★ (3) ]  │
├─────────────────────────────────────────────────────────────────────────┤
│  Lọc theo sao:                                                          │
│  [Tất cả] [5★] [4★] [3★] [2★] [1★]                                    │
│           (nút đang chọn có viền cam)                                   │
│                                                                         │
│  Lọc theo sản phẩm:  [▾ Tất cả sản phẩm              ▾]               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Thẻ đánh giá — Trạng thái chưa có phản hồi

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [N]  Nguyễn Văn A       ★★★★★ (5)         [sách] 24/06/2026  [⚑ Báo cáo] │
│  (avatar màu theo chữ cái đầu)                                          │
│                                                                         │
│  📦 Toán 6 Cánh Diều (tập 1)                                           │
│                                                                         │
│  Sách in rõ ràng, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!  │
│                                                                         │
│  [💬 Viết phản hồi]                                                     │
└─────────────────────────────────────────────────────────────────────────┘
(Viền thẻ: xanh lá vì rate=5 ≥ 4)
```

### 5.4 Thẻ đánh giá — Trạng thái đang chỉnh sửa phản hồi

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [N]  Nguyễn Văn A       ★★★★★ (5)         [sách] 24/06/2026  [⚑ Báo cáo] │
│                                                                         │
│  📦 Toán 6 Cánh Diều (tập 1)                                           │
│                                                                         │
│  Sách in rõ ràng, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Cảm ơn bạn đã tin tưởng mua hàng tại shop! Rất vui được phục   │   │
│  │ vụ bạn. Chúc bạn học tốt!                                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  [💾 Lưu phản hồi]   [Hủy]                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Thẻ đánh giá — Trạng thái đã có phản hồi (không đang chỉnh sửa)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [N]  Nguyễn Văn A       ★★★★★ (5)         [sách] 24/06/2026  [⚑ Báo cáo] │
│                                                                         │
│  📦 Toán 6 Cánh Diều (tập 1)                                           │
│                                                                         │
│  Sách in rõ ràng, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!  │
│                                                                         │
│  ▌ Phản hồi của shop (24/06/2026):                                     │
│  ▌ Cảm ơn bạn đã tin tưởng mua hàng tại shop! Rất vui được phục      │
│  ▌ vụ bạn. Chúc bạn học tốt!                                          │
│  (viền trái xanh dương)                  [✏️ Sửa]  [🗑 Xóa]           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Thẻ đánh giá — Trạng thái tiêu cực, đã báo cáo

```
┌─────────────────────────────────────────────────────────────────────────┐
│  (Viền đỏ — rate ≤ 2)                                                   │
│  [T]  Trần Thị B         ★★☆☆☆ (2)       [ebook] 20/06/2026  [⚑ Đã báo cáo] │
│  (badge "Đã báo cáo" màu cam, không thể nhấn)                          │
│                                                                         │
│  📦 Atomic Habits (ebook)                                               │
│                                                                         │
│  File PDF bị lỗi, không mở được trên máy tính. Thất vọng.             │
│                                                                         │
│  [💬 Viết phản hồi]                                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.7 Trạng thái rỗng (Empty state)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Khối thống kê vẫn hiển thị đầy đủ ở trên]                           │
│                                                                         │
│                 🌟 Không có đánh giá nào phù hợp bộ lọc.               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mô tả |
|---------|-------|
| Lọc và sắp xếp client-side | Toàn bộ lọc/sắp xếp xử lý trong bộ nhớ, không gọi API; phản hồi < 50ms với < 500 đánh giá |
| Parse ngày cho sắp xếp | Hàm parse `DD/MM/YYYY` sang `Date` được gọi mỗi lần render; nên cache nếu danh sách lớn |
| Render thẻ đánh giá | Mỗi thẻ render toàn bộ HTML; với > 200 thẻ sau lọc cân nhắc phân trang hoặc virtual scroll |
| Ghi `localStorage` | `LS.set('reviews', reviewsStore)` ghi đồng bộ; với nhiều sản phẩm tích lũy dài hạn cần xem xét nén dữ liệu |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Phân quyền | Chỉ seller được duyệt mới truy cập `sellerReviewCenter()`; không có API endpoint công khai |
| Cô lập dữ liệu | Product map chỉ gồm sản phẩm của `s` (seller hiện tại); đánh giá từ `pid` không thuộc seller không hiển thị |
| Escape đầu ra | Tên người mua (`r.name`), nội dung đánh giá (`r.text`), nội dung phản hồi (`r.reply`) phải qua `escHtml()` trước khi render |
| Validation nhập liệu | Nội dung phản hồi không được rỗng (`.trim().length > 0`); lý do báo cáo không được rỗng |
| Thao tác xóa | `doSellerDeleteReply` yêu cầu xác nhận `confirm()` trước khi xóa không thể khôi phục |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Màu viền ngữ cảnh | Thẻ đánh giá tiêu cực (≤2★) có viền đỏ, tích cực (≥4★) có viền xanh lá, trung lập có viền xám |
| Avatar màu sắc | Vòng tròn avatar màu dựa trên ký tự đầu của `r.name`, giúp nhận diện nhanh người đánh giá |
| Badge loại sản phẩm | Badge hiển thị loại sản phẩm (books/ebook/vpp/tbgd) giúp seller định vị nhanh đánh giá |
| Stats block cố định | Khối thống kê luôn hiển thị dù kết quả lọc rỗng, giúp seller nắm bức tranh tổng thể |
| Chỉ một khung soạn thảo | `sellerReviewEditReplyId` đảm bảo không mở hai textarea cùng lúc, tránh nhầm lẫn |
| Toast phản hồi | Mọi thao tác lưu/xóa/báo cáo đều hiển thị toast xác nhận kết quả |
| Phản hồi phân biệt đánh giá | Khi ở chế độ sửa, textarea điền sẵn nội dung cũ, tránh mất nội dung đã viết |
| Badge trạng thái đã báo cáo | Sau khi báo cáo, nút thay bằng badge rõ ràng, tránh báo cáo trùng lặp |

### 6.4 Tương thích

| Yêu cầu | Mô tả |
|---------|-------|
| Lưu trữ | `localStorage` key `reviews` — dữ liệu tồn tại giữa các phiên, tách biệt với `edumart_activeSellers` |
| Loại sản phẩm | Hỗ trợ cả bốn loại: sách (`products`), ebook (`ebooks`), văn phòng phẩm (`vppProducts`), thiết bị giáo dục (`tbgdProducts`) |
| Parse ngày | Định dạng `DD/MM/YYYY` — nhất quán với các module khác trong hệ thống |
| Định dạng hiển thị sao | Chuỗi sao `★☆` kết hợp số `(X)` — đọc được trên mọi trình duyệt |

---

## 7. Tiêu chí chấp nhận

**AC-01:** `sellerReviewCenter()` thu thập đúng đánh giá từ cả bốn tập hợp sản phẩm (`products`, `ebooks`, `vppProducts`, `tbgdProducts`) của seller hiện tại; không hiển thị đánh giá của sản phẩm thuộc seller khác.

**AC-02:** Khối thống kê hiển thị đúng `avgRate` (1 chữ số thập phân), phân bổ thanh sao tỉ lệ chính xác với `starDist`, và 4 ô KPI (`cnt.positive`, `cnt.negative`, `cnt.unanswered`, `totalReplied`) khớp với dữ liệu thực.

**AC-03:** Khối thống kê luôn hiển thị ngay cả khi kết quả lọc trả về danh sách rỗng.

**AC-04:** Tab "Chưa trả lời" chỉ liệt kê đánh giá có `r.reply` là `undefined`, `null` hoặc chuỗi rỗng.

**AC-05:** Tab "Tích cực" chỉ liệt kê đánh giá có `r.rate >= 4`; tab "Tiêu cực" chỉ liệt kê đánh giá có `r.rate <= 2`.

**AC-06:** Bộ lọc sao và bộ lọc sản phẩm áp dụng **sau** bộ lọc tab; kết quả là giao (AND) của cả ba bộ lọc.

**AC-07:** Danh sách đánh giá sau lọc được sắp xếp mới nhất trước; đánh giá cùng ngày giữ nguyên thứ tự nguồn.

**AC-08:** Nút lọc sao đang chọn có viền màu cam; khi chuyển sang nút khác, viền cam chuyển theo nút mới.

**AC-09:** `doSellerSaveReply(pid, idx, taId)` từ chối (toast lỗi) nếu `document.getElementById(taId).value.trim()` rỗng; không ghi vào `reviewsStore` và không đóng textarea.

**AC-10:** `doSellerSaveReply` gán đúng `reviewsStore[pid][idx].reply` và `reviewsStore[pid][idx].replyDate = todayStr()`, sau đó gọi `LS.set('reviews', reviewsStore)` và đặt `sellerReviewEditReplyId = null`.

**AC-11:** Khi mở chỉnh sửa phản hồi đã có, textarea phải được điền sẵn nội dung `r.reply` hiện tại.

**AC-12:** Nhấn "Hủy" trong bất kỳ chế độ chỉnh sửa nào đặt `sellerReviewEditReplyId = null` và re-render mà không thay đổi dữ liệu trong `reviewsStore`.

**AC-13:** Tại bất kỳ thời điểm nào, tối đa một thẻ đánh giá ở chế độ chỉnh sửa (`sellerReviewEditReplyId` chỉ lưu một giá trị); mở chỉnh sửa thẻ khác tự động đóng thẻ đang chỉnh sửa trước.

**AC-14:** `doSellerDeleteReply(pid, idx)` hiển thị `confirm()` trước khi xóa; nếu người dùng hủy thì không thay đổi dữ liệu.

**AC-15:** Sau `doSellerDeleteReply`, cả `reviewsStore[pid][idx].reply` và `reviewsStore[pid][idx].replyDate` đều bị xóa (không còn key trong object); `LS.set('reviews', reviewsStore)` được gọi.

**AC-16:** `doSellerReportReview(pid, idx)` không thực hiện nếu `r.reported === true` (nút báo cáo không hiển thị hoặc đã thay bằng badge).

**AC-17:** `doSellerReportReview` từ chối (dừng xử lý) nếu `prompt()` trả về chuỗi rỗng hoặc `null`.

**AC-18:** Sau `doSellerReportReview`, `r.reported === true`, `r.reportReason` chứa lý do đã nhập, `r.reportDate === todayStr()`, `LS.set('reviews', reviewsStore)` được gọi, `addNotif()` được gọi với thông báo đúng.

**AC-19:** Sau khi báo cáo, thẻ đánh giá hiển thị badge "⚑ Đã báo cáo" thay vì nút "⚑ Báo cáo"; badge không có sự kiện click.

**AC-20:** Thẻ đánh giá hiển thị viền đỏ khi `r.rate <= 2`, viền xanh lá khi `r.rate >= 4`, viền xám cho `r.rate === 3`.

**AC-21:** Badge loại sản phẩm (books/ebook/vpp/tbgd) hiển thị đúng loại dựa trên `pid` tìm trong `productMap`.

**AC-22:** Dropdown bộ lọc sản phẩm liệt kê đúng tên các sản phẩm có đánh giá thuộc seller hiện tại; không liệt kê sản phẩm không có đánh giá nào.

**AC-23:** `acctTab = 'seller-reviews'` định tuyến đúng vào `sellerReviewCenter()`.

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Seller xóa phản hồi quan trọng gây mất thông tin hỗ trợ khách hàng | Trung bình | P2: Thêm xác nhận rõ ràng hơn trong `confirm()` dialog; P3: Lưu lịch sử phản hồi đã xóa (soft delete) |
| R-02 | Hai tab trình duyệt cùng chỉnh sửa phản hồi của cùng một đánh giá → ghi đè nhau | Trung bình | P3: Chuyển lưu trữ sang server-side với timestamp optimistic lock; P2: Dùng `storage` event để đồng bộ giữa tab |
| R-03 | Nội dung phản hồi chứa HTML/script (XSS nếu thiếu `escHtml()`) | Cao | P1 (đã xử lý): Đảm bảo mọi nội dung từ `r.text`, `r.reply`, `r.name` đều qua `escHtml()` trước khi render |
| R-04 | `reviewsStore` tách riêng khỏi `activeSellers` — đồng bộ hóa phức tạp khi sản phẩm bị xóa | Trung bình | P2: Khi xóa sản phẩm, xóa đồng thời `reviewsStore[pid]`; P3: Dùng foreign key integrity ở server |
| R-05 | Seller báo cáo đánh giá tích cực hợp lệ với lý do giả để gỡ bỏ cạnh tranh | Thấp | P3: Admin xem xét báo cáo với context đầy đủ; P2: Giới hạn số lần báo cáo mỗi ngày theo seller |
| R-06 | `localStorage` quá tải khi `reviewsStore` tích lũy hàng nghìn đánh giá qua nhiều năm (> 5 MB) | Trung bình | P3: Chuyển lưu trữ server-side; P2: Phân trang đánh giá theo thời gian, chỉ load review 12 tháng gần nhất |
| R-07 | Parse `DD/MM/YYYY` sang `Date` trả về `Invalid Date` nếu định dạng ngày không chuẩn → sắp xếp sai | Thấp | P2: Bọc hàm parse trong `try/catch`; gán fallback `new Date(0)` cho ngày không hợp lệ; log cảnh báo |
| R-08 | Sản phẩm bị xóa khỏi `productMap` nhưng đánh giá vẫn tồn tại trong `reviewsStore` → tên sản phẩm hiển thị là `undefined` | Thấp | P1 (workaround): Hiển thị `productMap[r.pid]?.name || '[Sản phẩm đã xóa]'` thay vì để trống |
| R-09 | Seller không nhận biết có đánh giá mới khi không vào tab đánh giá | Trung bình | P2: Hiển thị badge số đếm đánh giá chưa trả lời trên icon nav "Đánh giá" trong sidebar seller |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Hàm render chính `sellerReviewCenter()` tích hợp đầy đủ thống kê, lọc, và danh sách thẻ
- [x] Thu thập đánh giá từ bốn loại sản phẩm: `products`, `ebooks`, `vppProducts`, `tbgdProducts`
- [x] Khối thống kê: điểm trung bình, thanh phân bổ sao (5★ → 1★), 4 ô KPI màu sắc
- [x] 4 tab lọc với số đếm động: Tất cả, Chưa trả lời, Tích cực ≥4★, Tiêu cực ≤2★
- [x] Bộ lọc 6 nút sao (Tất cả, 5★, 4★, 3★, 2★, 1★) với viền cam khi chọn
- [x] Dropdown lọc theo sản phẩm cụ thể
- [x] Áp dụng bộ lọc theo thứ tự (tab → sao → sản phẩm) với sắp xếp mới nhất trước
- [x] Thẻ đánh giá với viền màu ngữ cảnh (đỏ/xanh/xám theo mức sao)
- [x] Avatar vòng tròn màu theo ký tự đầu tên người đánh giá
- [x] Badge loại sản phẩm (books/ebook/vpp/tbgd) và hiển thị tên sản phẩm
- [x] Ba trạng thái khối phản hồi: chưa có reply / đang chỉnh sửa / đã có reply
- [x] `doSellerSaveReply(pid, idx, taId)` — lưu phản hồi mới và sửa phản hồi cũ
- [x] `doSellerDeleteReply(pid, idx)` — xóa phản hồi với `confirm()` dialog
- [x] `doSellerReportReview(pid, idx)` — báo cáo vi phạm với `prompt()` lý do
- [x] Badge "⚑ Đã báo cáo" thay nút sau khi báo cáo; `addNotif()` thông báo hệ thống
- [x] Trạng thái rỗng: "🌟 Không có đánh giá nào phù hợp bộ lọc." với stats block vẫn hiển thị
- [x] Lưu trữ tách biệt qua `LS.set('reviews', reviewsStore)` (không dùng `saveActiveSellers()`)
- [x] Định tuyến `acctTab = 'seller-reviews'` → `sellerReviewCenter()`
- [x] Toast phản hồi cho tất cả thao tác quan trọng

### P2 — Cải tiến tiếp theo

- [ ] Badge số đếm "chưa trả lời" trên icon nav "Đánh giá" trong sidebar seller
- [ ] Tìm kiếm nội dung đánh giá (full-text search trong `r.text` và `r.name`)
- [ ] Phân trang danh sách đánh giá khi số lượng sau lọc vượt ngưỡng (VD: > 50)
- [ ] Giới hạn số lần báo cáo mỗi seller mỗi ngày để ngăn lạm dụng
- [ ] Cảnh báo khi sản phẩm trong `reviewsStore` không còn trong `productMap` (đã bị xóa)
- [ ] Làm giàu `confirm()` dialog xóa phản hồi với nội dung preview để tránh xóa nhầm
- [ ] Lọc theo khoảng thời gian đánh giá (ngày từ – đến)
- [ ] Sắp xếp tùy chọn: mới nhất / cũ nhất / sao cao nhất / sao thấp nhất

### P3 — Tầm nhìn dài hạn

- [ ] Chuyển lưu trữ `reviewsStore` sang server-side; `localStorage` chỉ dùng làm cache
- [ ] Push notification thời gian thực khi có đánh giá mới (WebSocket hoặc SSE)
- [ ] Template phản hồi nhanh: seller lưu sẵn mẫu phản hồi và chèn vào textarea bằng một click
- [ ] Phân tích cảm xúc tự động (sentiment analysis) để phân loại đánh giá trung lập (3★) thành tích cực/tiêu cực
- [ ] Dashboard phân tích xu hướng đánh giá theo thời gian (biểu đồ avgRate theo tuần/tháng)
- [ ] Quy trình xem xét báo cáo có cấu trúc: admin dashboard, trạng thái xử lý, phản hồi lại seller
- [ ] Hệ thống từ khóa từ đánh giá: tự động trích xuất từ khóa thường xuất hiện (word cloud)
- [ ] Cho phép seller cảm ơn (like) đánh giá tích cực để tăng tương tác với người mua
- [ ] Xuất báo cáo đánh giá ra CSV/Excel với bộ lọc tùy chọn
