# Yêu cầu chức năng: Khuyến mãi Gian hàng — Phân hệ Người bán

**Phiên bản:** 1.0  
**Ngày cập nhật:** 24/06/2026  
**Trạng thái:** Đã triển khai  
**Module liên quan:** `seller-promo`, `sellerPromoCenter`, `_sellerVoucherTab`, `_sellerFlashSaleTab`

---

## 1. Tổng quan

### 1.1 Mục đích

Module Khuyến mãi Gian hàng cho phép seller đã được duyệt tự tạo và quản lý hai công cụ khuyến mãi độc lập: **Voucher giảm giá** (mã giảm giá dùng khi thanh toán) và **Flash Sale** (khuyến mãi flash giới hạn thời gian và số lượng). Seller có thể tạo mới, chỉnh sửa, tạm dừng/kích hoạt lại, xem thống kê hiệu quả và xóa voucher; đồng thời tạo mới, theo dõi tiến độ và hủy flash sale. Hệ thống tự động phân loại trạng thái dựa trên ngày giờ thực tế để hỗ trợ seller ra quyết định tiếp thị kịp thời.

### 1.2 Phạm vi

| Thành phần | Mô tả | Trạng thái |
|------------|-------|------------|
| Tab Voucher (`_sellerVoucherTab`) | Tạo, chỉnh sửa, tạm dừng/bật lại, xem thống kê, xóa voucher | Đã triển khai |
| Form Voucher (`_sellerVoucherForm`) | Nhập liệu tạo/sửa voucher với validation | Đã triển khai |
| Thống kê Voucher (stats panel) | Lượt dùng, tỉ lệ sử dụng, ước tính tác động giảm giá | Đã triển khai |
| Tab Flash Sale (`_sellerFlashSaleTab`) | Xem danh sách theo nhóm trạng thái, hủy flash sale | Đã triển khai |
| Form Flash Sale (`_sellerFlashSaleForm`) | Chọn sản phẩm, nhập giá flash, số lượng, khung giờ | Đã triển khai |
| Logic trạng thái Voucher (`vStatus`) | Tính toán động: active / paused / expired | Đã triển khai |
| Logic trạng thái Flash Sale (`_flashLiveStatus`) | Tính toán động: active / upcoming / ended | Đã triển khai |
| Thanh thống kê tổng quan | Stats bar tóm tắt cho cả hai tab | Đã triển khai |

### 1.3 Tác nhân

| Tác nhân | Vai trò |
|----------|---------|
| Seller (đã duyệt) | Tạo, quản lý và theo dõi voucher và flash sale trong gian hàng |
| Người mua | Thực thể sử dụng voucher và mua hàng qua flash sale (dữ liệu phản ánh qua `usedCount`, `soldQty`) |
| Hệ thống | Tự động tính trạng thái, thêm thông báo (`addNotif`), hiển thị toast kết quả, lưu dữ liệu |

### 1.4 Điều kiện tiên quyết

- Người dùng phải đăng nhập (`user` tồn tại trong phiên).
- Tài khoản seller phải được duyệt (`sellerApps[].status === 'approved'`).
- Seller phải tồn tại trong mảng `activeSellers` (lưu tại `localStorage` key `edumart_activeSellers`).
- Để tạo Flash Sale, seller phải có ít nhất một sản phẩm đã đăng bán (thuộc bất kỳ loại: books, ebooks, vpp, tbgd).

### 1.5 Định tuyến

| Giá trị `acctTab` | Hàm render |
|-------------------|-----------|
| `'seller-promo'` | `sellerPromoCenter()` |

---

## 2. Yêu cầu chức năng

### FR-01: Trung tâm khuyến mãi (`sellerPromoCenter`)

#### FR-01.1 Cấu trúc tổng thể

Hàm `sellerPromoCenter()` render trang chính với:

- **Tiêu đề:** "Khuyến mãi gian hàng" kèm subtitle mô tả ngắn.
- **Hai tab điều hướng:**

| Tab | Nhãn | Điều kiện kích hoạt |
|-----|------|---------------------|
| Voucher giảm giá | 🏷 Voucher giảm giá | `sellerPromoTab === 'vouchers'` |
| Flash Sale | ⚡ Flash Sale | `sellerPromoTab === 'flashsale'` |

- Khi nhấn tab, cập nhật `sellerPromoTab` và re-render.
- Nội dung bên dưới tab được điều phối bằng `sellerPromoTab`:
  - `'vouchers'` → `_sellerVoucherTab(s, pd)`
  - `'flashsale'` → `_sellerFlashSaleTab(s, pd)`

#### FR-01.2 Dữ liệu nguồn

Toàn bộ dữ liệu khuyến mãi được lưu tại `s.promotionsData`:

```javascript
s.promotionsData = {
  vouchers: [],    // mảng đối tượng Voucher
  flashSales: []   // mảng đối tượng FlashSale
}
```

---

### FR-02: Tab Voucher (`_sellerVoucherTab`)

#### FR-02.1 Thanh thống kê tổng quan

Khi mảng `vouchers` không rỗng, hiển thị stats bar với 3 card:

| Card | Giá trị | Màu |
|------|---------|-----|
| Tổng voucher | `vouchers.length` | Xanh dương |
| Đang hoạt động | Số voucher có `vStatus(v) === 'active'` | Xanh lá |
| Lượt dùng tổng cộng | Tổng `v.usedCount` trên tất cả voucher | Vàng |

Khi mảng rỗng: không hiển thị stats bar, chỉ hiển thị trạng thái trống và nút tạo mới.

#### FR-02.2 Logic tính trạng thái voucher (`vStatus`)

Hàm `vStatus(v)` tính trạng thái hiển thị cho mỗi voucher theo thứ tự ưu tiên:

1. Trả về `'paused'` nếu `v.status === 'paused'`.
2. Trả về `'expired'` nếu `endDate < today` (so sánh theo ngày).
3. Trả về `'active'` trong mọi trường hợp còn lại.

Lưu ý: Trạng thái `'paused'` được ưu tiên trước `'expired'` — voucher đã tạm dừng dù hết hạn vẫn hiển thị là "Tạm dừng".

#### FR-02.3 Hiển thị card voucher

Mỗi voucher trong danh sách được render thành một card gồm:

**Phần trái — khung hiển thị giá trị giảm:**

- `discDisplay`: nếu `type === 'pct'` thì hiển thị `-X%`; nếu `type === 'fixed'` thì hiển thị `-Xđ`.
- Màu nền khung: xanh dương cho `pct`, xanh lá cho `fixed`.

**Phần giữa — thông tin voucher:**

| Thành phần | Mô tả |
|------------|-------|
| Mã code | `v.code` với font monospace, `letter-spacing: 2px` |
| Mô tả | `v.desc` |
| Điều kiện | "Đơn tối thiểu: Xđ" (nếu `minOrder > 0`) hoặc "Không yêu cầu đơn tối thiểu" |
| Khoảng thời gian | `startDate → endDate` |
| Progress bar sử dụng | `usedPct = (usedCount / maxUses) * 100`; thanh đổi sang màu đỏ khi `usedPct >= 90` |
| Giới hạn sử dụng | "X / Y lượt" hoặc "X / ∞ lượt" nếu `maxUses === null` |

**Badge trạng thái (phần phải):**

| Trạng thái `vStatus` | Nhãn | Màu |
|----------------------|------|-----|
| `'active'` | Đang hoạt động | Xanh lá |
| `'paused'` | Tạm dừng | Vàng |
| `'expired'` | Hết hạn | Xám |

#### FR-02.4 Panel thống kê chi tiết voucher

Khi `sellerVoucherStatsId === v.id`, một block mở rộng xuất hiện dưới thông tin chính của card, hiển thị:

| Chỉ số | Mô tả |
|--------|-------|
| Lượt đã dùng | `v.usedCount` |
| Lượt còn lại | `v.maxUses - v.usedCount` hoặc "Không giới hạn" |
| Tỉ lệ sử dụng | `usedPct%` kèm progress bar |
| Ước tính tác động giảm giá (`estImpact`) | Xem công thức bên dưới |

**Công thức `estImpact`:**

- Nếu `type === 'pct'`: `estImpact = usedCount × minOrder × (value / 100)`
- Nếu `type === 'fixed'`: `estImpact = usedCount × value`

Kết quả định dạng VNĐ, hiển thị dưới nhãn "Ước tính tổng giảm giá đã cấp".

#### FR-02.5 Các nút thao tác trên card voucher

| Nút | Điều kiện | Hàm gọi | Kết quả |
|-----|-----------|---------|---------|
| ⏸ Tạm dừng | `v.status === 'active'` | `doSellerToggleVoucher(v.id)` | `status → 'paused'` |
| ▶ Bật lại | `v.status === 'paused'` | `doSellerToggleVoucher(v.id)` | `status → 'active'` |
| ✏️ Chỉnh sửa | Luôn hiển thị | `sellerVoucherEditId = v.id`, mở form | Mở form sửa voucher |
| 📊 Thống kê | Luôn hiển thị | Toggle `sellerVoucherStatsId` | Mở/đóng panel thống kê |
| 🗑 Xóa | Luôn hiển thị | `doSellerDeleteVoucher(v.id)` | Xóa sau khi xác nhận |

---

### FR-03: Form Voucher (`_sellerVoucherForm`)

Form hiển thị khi `sellerVoucherShowForm === true`. Được dùng cho cả tạo mới lẫn chỉnh sửa (phân biệt bằng `sellerVoucherEditId`).

#### FR-03.1 Các trường nhập liệu

| Trường | Loại | Bắt buộc | Ràng buộc |
|--------|------|----------|-----------|
| code | Text | Có | Tối đa 20 ký tự, tự động chuyển UPPERCASE qua `oninput` |
| desc | Text | Không | Mô tả hiển thị cho người mua |
| type | Radio (pct / fixed) | Có | `'pct'` = phần trăm, `'fixed'` = số tiền cố định |
| value | Number | Có | > 0; nếu `type === 'pct'` thì ≤ 100 |
| minOrder | Number | Không | ≥ 0; mặc định 0 (không yêu cầu tối thiểu) |
| maxUses | Number hoặc rỗng | Không | Nếu để trống → `null` (không giới hạn lượt dùng) |
| startDate | Date (DD/MM/YYYY) | Có | — |
| endDate | Date (DD/MM/YYYY) | Có | — |

#### FR-03.2 Validation trong `doSellerSaveVoucher()`

Các điều kiện kiểm tra theo thứ tự:

1. `code` phải không rỗng.
2. `code` phải là duy nhất: kiểm tra không trùng với bất kỳ voucher nào khác trong `vouchers` (bỏ qua voucher đang sửa theo `sellerVoucherEditId`).
3. `value` phải > 0.
4. Nếu `type === 'pct'`: `value` phải ≤ 100.
5. `startDate` phải không rỗng.
6. `endDate` phải không rỗng.

Nếu validation thất bại: hiển thị toast lỗi mô tả cụ thể, dừng xử lý.

#### FR-03.3 Luồng lưu voucher

**Tạo mới** (khi `sellerVoucherEditId === null`):

1. Tạo đối tượng voucher mới với `id = 'sv-' + Date.now().toString(36)`.
2. `usedCount = 0`, `status = 'active'`, `createdAt = todayStr()`.
3. Push vào `s.promotionsData.vouchers`.
4. Gọi `saveActiveSellers()`.
5. Toast thành công, đóng form (`sellerVoucherShowForm = false`), re-render.

**Chỉnh sửa** (khi `sellerVoucherEditId !== null`):

1. Tìm voucher theo `sellerVoucherEditId`.
2. Cập nhật các trường: `code`, `desc`, `type`, `value`, `minOrder`, `maxUses`, `startDate`, `endDate`.
3. Giữ nguyên `id`, `usedCount`, `status`, `createdAt`.
4. Gọi `saveActiveSellers()`.
5. Toast thành công, đặt `sellerVoucherEditId = null`, đóng form, re-render.

---

### FR-04: Thao tác Voucher

#### FR-04.1 Tạm dừng / Bật lại (`doSellerToggleVoucher`)

```
doSellerToggleVoucher(vid):
  v = tìm voucher theo vid
  if v.status === 'active':
    v.status = 'paused'
    toast "Voucher [code] đã tạm dừng."
  else:
    v.status = 'active'
    toast "Voucher [code] đã được bật lại."
  saveActiveSellers()
  re-render
```

#### FR-04.2 Xóa voucher (`doSellerDeleteVoucher`)

```
doSellerDeleteVoucher(vid):
  Hiển thị confirm(): "Xóa voucher này?"
  Nếu người dùng xác nhận:
    Lọc bỏ voucher có id === vid khỏi vouchers[]
    saveActiveSellers()
    Toast thành công
    re-render
```

---

### FR-05: Tab Flash Sale (`_sellerFlashSaleTab`)

#### FR-05.1 Thanh thống kê tổng quan

Khi mảng `flashSales` không rỗng, hiển thị stats bar với 4 card:

| Card | Giá trị | Màu |
|------|---------|-----|
| Tổng Flash Sale | `flashSales.length` | Vàng |
| Đang/Sắp diễn ra | Số flash sale có `_flashLiveStatus(fs) !== 'ended'` | Xanh lá |
| SP đã bán Flash Sale | Tổng `fs.soldQty` của các flash sale `'ended'` | Đỏ |
| Doanh thu Flash Sale | Tổng `fs.soldQty × fs.flashPrice` của các flash sale `'ended'` | Xanh dương |

#### FR-05.2 Logic tính trạng thái flash sale (`_flashLiveStatus`)

Hàm `_flashLiveStatus(fs)`:

1. Xác định `today = new Date()` với `hours, minutes, seconds, ms` đều = 0 (so sánh theo ngày).
2. Parse `fs.endDate` và `fs.startDate` từ định dạng DD/MM/YYYY.
3. Trả về `'ended'` nếu `endDate < today`.
4. Trả về `'upcoming'` nếu `startDate > today`.
5. Trả về `'active'` trong mọi trường hợp còn lại (bao gồm cả ngày hôm nay).

#### FR-05.3 Phân nhóm flash sale theo trạng thái

Danh sách flash sale được hiển thị theo 3 nhóm riêng biệt theo thứ tự:

| Nhóm | Nhãn | Màu nhãn | Điều kiện |
|------|------|----------|-----------|
| Đang diễn ra | ⚡ Đang diễn ra | Cam | `_flashLiveStatus(fs) === 'active'` |
| Sắp diễn ra | 🕐 Sắp diễn ra | Xanh dương | `_flashLiveStatus(fs) === 'upcoming'` |
| Đã kết thúc | ✓ Đã kết thúc | Xám | `_flashLiveStatus(fs) === 'ended'` |

Mỗi nhóm chỉ hiển thị khi có ít nhất một flash sale thuộc nhóm đó.

#### FR-05.4 Hiển thị card flash sale

Mỗi flash sale được render thành một card gồm:

**Phần thông tin sản phẩm và giá:**

| Thành phần | Mô tả |
|------------|-------|
| Tên sản phẩm | `fs.productName` |
| Giá gốc | `fs.originalPrice` định dạng VNĐ, in gạch ngang (strikethrough) |
| Giá Flash Sale | `fs.flashPrice` định dạng VNĐ, màu cam, cỡ chữ lớn |
| Badge % giảm | `round((originalPrice - flashPrice) / originalPrice * 100)%` |

**Phần thời gian và trạng thái:**

| Thành phần | Mô tả |
|------------|-------|
| Khoảng ngày | `startDate → endDate` |
| Khung giờ | `startTime – endTime` |
| Số lượng | `soldQty / qty` |
| Badge trạng thái | active = cam, upcoming = xanh dương, ended = xám |

**Phần tiến độ (chỉ với active và upcoming):**

- Thanh progress: `(soldQty / qty) * 100`
- Nhãn: "Đã bán: soldQty / qty sản phẩm"

**Phần kết quả (chỉ với ended):**

| Thành phần | Giá trị |
|------------|---------|
| Đã bán | `soldQty / qty` |
| Tỉ lệ bán | `round(soldQty / qty * 100)%` |
| Doanh thu | `soldQty × flashPrice` định dạng VNĐ |

Thông điệp đánh giá kết quả:

| Điều kiện | Thông điệp |
|-----------|-----------|
| Tỉ lệ ≥ 90% | 🏆 Bán rất tốt! Nên tổ chức lại. |
| Tỉ lệ ≥ 50% | ✓ Kết quả khả quan. |
| Tỉ lệ < 50% | 💡 Tỷ lệ thấp. Thử giảm giá sâu hơn. |

#### FR-05.5 Các nút thao tác trên card flash sale

| Nút | Điều kiện | Hàm gọi | Kết quả |
|-----|-----------|---------|---------|
| ✏️ Sửa | `status === 'active'` hoặc `'upcoming'` | `sellerFlashEditId = fs.id`, mở form | Mở form sửa flash sale |
| 🗑 Hủy | `status === 'active'` hoặc `'upcoming'` | `doSellerDeleteFlashSale(fs.id)` | Xóa sau khi xác nhận |

Flash sale đã kết thúc (`ended`) không hiển thị nút thao tác — chỉ hiển thị kết quả.

---

### FR-06: Form Flash Sale (`_sellerFlashSaleForm`)

Form hiển thị khi `sellerFlashShowForm === true`. Dùng cho cả tạo mới và chỉnh sửa.

#### FR-06.1 Bộ chọn sản phẩm

- Dropdown liệt kê tất cả sản phẩm của seller từ tất cả loại: books, ebooks, vpp, tbgd.
- Mỗi tùy chọn hiển thị dạng: `"[Loại] Tên sản phẩm — Xđ"` (VD: `[Sách] Toán 6 Cánh Diều — 65.000đ`).
- Khi chọn sản phẩm, hệ thống tự động điền `originalPrice` từ `product.price`.

#### FR-06.2 Banner thông tin

Một banner thông tin màu vàng hiển thị phía trên form:

> "Flash Sale giúp tăng lượt hiển thị lên đến 5×. Giá Flash Sale phải thấp hơn giá gốc ít nhất 10%."

#### FR-06.3 Các trường nhập liệu

| Trường | Loại | Bắt buộc | Giá trị mặc định | Ràng buộc |
|--------|------|----------|-----------------|-----------|
| product | Select | Có | — | Phải chọn sản phẩm |
| flashPrice | Number | Có | — | > 0, phải < originalPrice và giảm ≥ 10% |
| qty | Number | Có | — | > 0, số nguyên dương |
| startDate | Date (DD/MM/YYYY) | Có | — | — |
| startTime | Time (HH:MM) | Có | 20:00 | — |
| endTime | Time (HH:MM) | Có | 22:00 | — |

Lưu ý: `endDate` được gán bằng `startDate` (flash sale chỉ diễn ra trong một ngày).

#### FR-06.4 Validation trong `doSellerSaveFlashSale()`

Các điều kiện kiểm tra theo thứ tự:

1. `product` phải được chọn (không rỗng).
2. `flashPrice` phải > 0.
3. `qty` phải > 0.
4. `startDate` phải không rỗng.
5. `startTime` phải không rỗng.
6. `endTime` phải không rỗng.
7. `flashPrice` phải < `prod.price` (giá flash phải nhỏ hơn giá gốc).
8. `discPct = round((originalPrice - flashPrice) / originalPrice * 100)` phải ≥ 10.
   - Nếu không đạt: toast lỗi `"Cần giảm ít nhất 10% so với giá gốc (hiện tại: -X%)"`.

#### FR-06.5 Luồng lưu flash sale

**Tạo mới** (khi `sellerFlashEditId === null`):

1. Tạo đối tượng flash sale mới với `id = 'sf-' + Date.now().toString(36)`.
2. `soldQty = 0`, `endDate = startDate`.
3. Push vào `s.promotionsData.flashSales`.
4. Gọi `addNotif('⚡ Flash Sale mới: "productName" vào startDate startTime–endTime')`.
5. Gọi `saveActiveSellers()`.
6. Toast thành công, đóng form, re-render.

**Chỉnh sửa** (khi `sellerFlashEditId !== null`):

1. Tìm flash sale theo `sellerFlashEditId`.
2. Cập nhật các trường: `productId`, `productName`, `originalPrice`, `flashPrice`, `qty`, `startDate`, `endDate`, `startTime`, `endTime`.
3. Giữ nguyên `id`, `soldQty`.
4. Gọi `saveActiveSellers()`.
5. Toast thành công, đặt `sellerFlashEditId = null`, đóng form, re-render.

---

### FR-07: Xóa flash sale (`doSellerDeleteFlashSale`)

```
doSellerDeleteFlashSale(fid):
  Hiển thị confirm(): "Hủy flash sale này?"
  Nếu người dùng xác nhận:
    Lọc bỏ flash sale có id === fid khỏi flashSales[]
    saveActiveSellers()
    Toast thành công
    re-render
```

---

## 3. Mô hình dữ liệu

### 3.1 Đối tượng Voucher

```javascript
{
  id: string,           // 'sv-' + Date.now().toString(36), VD: 'sv-m3xyz'
  code: string,         // Mã giảm giá — chữ hoa, chữ số, tối đa 20 ký tự, duy nhất trong gian hàng
  desc: string,         // Mô tả hiển thị cho người mua khi áp dụng voucher
  type: 'pct' | 'fixed', // 'pct' = phần trăm, 'fixed' = số tiền cố định (VNĐ)
  value: number,        // Giá trị giảm: nếu pct thì 1–100 (%); nếu fixed thì > 0 (VNĐ)
  minOrder: number,     // Giá trị đơn hàng tối thiểu (VNĐ); 0 = không yêu cầu
  maxUses: number|null, // Số lượt dùng tối đa; null = không giới hạn
  usedCount: number,    // Số lượt đã sử dụng; khởi tạo = 0
  startDate: string,    // Ngày bắt đầu hiệu lực, định dạng DD/MM/YYYY
  endDate: string,      // Ngày kết thúc hiệu lực, định dạng DD/MM/YYYY
  status: 'active' | 'paused', // Trạng thái do seller kiểm soát thủ công
  createdAt: string     // Ngày tạo — todayStr()
}
```

**Lưu ý quan trọng về trạng thái hiển thị:** Trường `status` lưu trạng thái thủ công (`active` hoặc `paused`). Trạng thái hiển thị cuối cùng được tính bởi hàm `vStatus(v)` có thể là `'active'`, `'paused'`, hoặc `'expired'` — trường hợp `expired` không được lưu vào object mà chỉ được tính runtime.

### 3.2 Đối tượng FlashSale

```javascript
{
  id: string,            // 'sf-' + Date.now().toString(36), VD: 'sf-n4abc'
  productId: string,     // ID của sản phẩm tham gia flash sale
  productName: string,   // Tên sản phẩm tại thời điểm tạo flash sale
  originalPrice: number, // Giá gốc sản phẩm tại thời điểm tạo (VNĐ)
  flashPrice: number,    // Giá flash sale — phải < originalPrice và giảm ≥ 10%
  qty: number,           // Số lượng giới hạn cho flash sale, > 0
  soldQty: number,       // Số đã bán trong flash sale; khởi tạo = 0
  startDate: string,     // Ngày diễn ra, định dạng DD/MM/YYYY
  endDate: string,       // Ngày kết thúc (= startDate trong phiên bản hiện tại)
  startTime: string,     // Giờ bắt đầu, định dạng HH:MM (mặc định: '20:00')
  endTime: string        // Giờ kết thúc, định dạng HH:MM (mặc định: '22:00')
}
```

**Lưu ý:** FlashSale không có trường `status` — trạng thái được tính hoàn toàn runtime bởi `_flashLiveStatus(fs)` dựa trên so sánh `startDate`/`endDate` với ngày hiện tại.

### 3.3 Cấu trúc dữ liệu khuyến mãi (`promotionsData`)

```javascript
// Truy cập qua: activeSellers[sIdx].promotionsData
s.promotionsData = {
  vouchers: Voucher[],     // Mảng tất cả voucher của gian hàng
  flashSales: FlashSale[]  // Mảng tất cả flash sale của gian hàng
}
```

Nếu `s.promotionsData` chưa tồn tại (seller cũ chưa khởi tạo), các hàm tab tự khởi tạo:
```javascript
const pd = s.promotionsData || { vouchers: [], flashSales: [] };
```

### 3.4 Biến trạng thái toàn cục

```javascript
let sellerPromoTab = 'vouchers';       // Tab đang chọn: 'vouchers' | 'flashsale'

// Voucher
let sellerVoucherShowForm = false;     // Hiển thị form voucher hay không
let sellerVoucherEditId = null;        // ID voucher đang sửa; null = đang tạo mới
let sellerVoucherStatsId = null;       // ID voucher đang mở panel thống kê; null = không mở

// Flash Sale
let sellerFlashShowForm = false;       // Hiển thị form flash sale hay không
let sellerFlashEditId = null;          // ID flash sale đang sửa; null = đang tạo mới
```

### 3.5 Lưu trữ

- Dữ liệu khuyến mãi lưu cùng cấu trúc seller tại `localStorage` key: `edumart_activeSellers`.
- Hàm đọc: `LS.get('activeSellers', null)`.
- Hàm ghi: `saveActiveSellers()` → `LS.set('activeSellers', activeSellers)`.
- Dữ liệu nằm tại: `activeSellers[sIdx].promotionsData`.

---

## 4. Luồng hoạt động

### 4.1 Vòng đời Voucher

```
[Tạo voucher mới]
        │
        │  doSellerSaveVoucher() — sellerVoucherEditId === null
        ▼
   status = 'active'
   usedCount = 0
   createdAt = todayStr()
        │
   ┌────┴─────────────────────────────────────────┐
   ▼                                              ▼
[Đang hoạt động]                         [Tạm dừng]
vStatus = 'active'                      vStatus = 'paused'
   │                                              │
   │  Người mua dùng voucher                      │
   │  → usedCount++                               │
   │                                              │
   │  doSellerToggleVoucher()                     │  doSellerToggleVoucher()
   └──────────────────────────────────────────────┘
        │
        │  endDate < today (runtime check)
        ▼
   [Hết hạn]
   vStatus = 'expired'
   (status vẫn là 'active' trong object)
        │
        ▼  (bất kỳ lúc nào)
   doSellerDeleteVoucher() → Xóa khỏi danh sách
```

**Ràng buộc:** Voucher hết hạn không thể tự động kích hoạt lại; phải tạo mới hoặc sửa `endDate` để gia hạn.

### 4.2 Vòng đời Flash Sale

```
[Tạo flash sale mới]
        │
        │  doSellerSaveFlashSale() — sellerFlashEditId === null
        │  addNotif('⚡ Flash Sale mới: ...')
        ▼
   soldQty = 0
   endDate = startDate
        │
        │  startDate > today (runtime check)
        ▼
   [Sắp diễn ra]
   _flashLiveStatus = 'upcoming'
        │
        │  startDate ≤ today ≤ endDate
        ▼
   [Đang diễn ra]
   _flashLiveStatus = 'active'
   → Người mua mua hàng: soldQty++ (cập nhật từ luồng mua hàng)
        │
        │  endDate < today
        ▼
   [Đã kết thúc]
   _flashLiveStatus = 'ended'
   → Hiển thị kết quả: soldQty/qty, tỉ lệ bán, doanh thu
   → Không thể sửa hoặc hủy
```

**Ràng buộc:** Flash sale `'ended'` chỉ được xem kết quả, không thể chỉnh sửa hay hủy.

### 4.3 Luồng tổng thể module khuyến mãi

```
Seller đăng nhập → acctTab = 'seller-promo'
        │
        ▼
sellerContent() → sellerPromoCenter()
        │
   ┌────┴─────────────────────────────┐
   ▼                                  ▼
[Tab Vouchers]                [Tab Flash Sale]
_sellerVoucherTab(s, pd)      _sellerFlashSaleTab(s, pd)
   │                                  │
   ├─ [+ Tạo voucher]                 ├─ [+ Tạo Flash Sale]
   │       │                          │        │
   │  sellerVoucherShowForm=true  sellerFlashShowForm=true
   │       │                          │        │
   │  _sellerVoucherForm()       _sellerFlashSaleForm()
   │       │                          │        │
   │  doSellerSaveVoucher()      doSellerSaveFlashSale()
   │                                  │
   ├─ [✏️ Chỉnh sửa]                  ├─ [✏️ Sửa]
   │  sellerVoucherEditId = id        │  sellerFlashEditId = id
   │  mở _sellerVoucherForm()         │  mở _sellerFlashSaleForm()
   │                                  │
   ├─ [⏸/▶ Toggle]                    ├─ [🗑 Hủy]
   │  doSellerToggleVoucher()         │  doSellerDeleteFlashSale()
   │                                  │
   ├─ [📊 Thống kê]                   └─ [Xem kết quả ended]
   │  toggle sellerVoucherStatsId         → kết quả tự động hiển thị
   │
   └─ [🗑 Xóa]
      doSellerDeleteVoucher()
```

### 4.4 Luồng validation tạo Flash Sale

```
Seller nhập thông tin Flash Sale
        │
        ▼
doSellerSaveFlashSale()
        │
   Kiểm tra product được chọn?
        │ Không → Toast lỗi "Vui lòng chọn sản phẩm"
        │ Có ↓
   Kiểm tra flashPrice > 0?
        │ Không → Toast lỗi
        │ Có ↓
   Kiểm tra qty > 0?
        │ Không → Toast lỗi
        │ Có ↓
   Kiểm tra startDate, startTime, endTime không rỗng?
        │ Không → Toast lỗi
        │ Có ↓
   Kiểm tra flashPrice < prod.price?
        │ Không → Toast lỗi "Giá flash phải thấp hơn giá gốc"
        │ Có ↓
   discPct = round((originalPrice - flashPrice) / originalPrice * 100)
   Kiểm tra discPct >= 10?
        │ Không → Toast lỗi "Cần giảm ít nhất 10% so với giá gốc (hiện tại: -X%)"
        │ Có ↓
   Tạo/cập nhật flash sale
   addNotif() (chỉ khi tạo mới)
   saveActiveSellers()
   Toast thành công
   Đóng form, re-render
```

---

## 5. Giao diện người dùng

### 5.1 Trang chính — Khuyến mãi gian hàng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Khuyến mãi gian hàng                                                   │
│  Tạo voucher và flash sale để thu hút người mua                         │
├─────────────────────────────────────────────────────────────────────────┤
│  [ 🏷 Voucher giảm giá ]   [ ⚡ Flash Sale ]                            │
│  ─────────────────────────────────────────────────────────────          │
│  [Nội dung tab đang chọn]                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Tab Voucher — Stats bar và danh sách

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🏷 Voucher giảm giá                         [+ Tạo voucher mới]       │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐  │
│  │  Tổng voucher    │  │  Đang hoạt động  │  │  Lượt dùng tổng cộng │  │
│  │       5          │  │        3         │  │          47          │  │
│  │    (xanh dương)  │  │   (xanh lá)      │  │       (vàng)         │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ ┌──────┐  SUMMER20          Giảm 20% toàn bộ sách     ●Đang hoạt│   │
│  │ │ -20% │  ──────────────    Đơn tối thiểu: 100.000đ   động      │   │
│  │ │(xanh)│  Ngày: 01/06 → 30/06/2026                              │   │
│  │ └──────┘  ████████░░ 32/50 lượt  [⏸ Tạm dừng][✏️][📊][🗑]    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ ┌──────┐  GIAM50K           Giảm 50.000đ cho đơn VPP    ●Tạm    │   │
│  │ │-50đ  │  ──────────────    Đơn tối thiểu: 200.000đ    dừng     │   │
│  │ │(lá)  │  Ngày: 01/06 → 31/07/2026                              │   │
│  │ └──────┘  ██░░░░░░░░ 5/30 lượt  [▶ Bật lại][✏️][📊][🗑]       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Panel thống kê voucher (mở rộng khi nhấn 📊)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ┌──────┐  SUMMER20            Giảm 20% toàn bộ sách        ●Đang hoạt  │
│ │ -20% │  ──────────────      Đơn tối thiểu: 100.000đ       động       │
│ │(xanh)│  Ngày: 01/06 → 30/06/2026                                      │
│ └──────┘  ████████░░ 32/50 lượt  [⏸][✏️][📊 ▲][🗑]                   │
│ ─────────────────────────────────────────────────────────────────────── │
│  📊 Thống kê chi tiết                                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────────┐ │
│  │ Lượt đã dùng  │  │ Lượt còn lại  │  │ Tỉ lệ sử dụng              │ │
│  │      32        │  │      18        │  │  ████████░░  64%           │ │
│  └────────────────┘  └────────────────┘  └────────────────────────────┘ │
│  Ước tính tổng giảm giá đã cấp: 640.000đ                               │
│  (32 lượt × 100.000đ đơn tối thiểu × 20%)                             │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Form tạo/sửa Voucher

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ✏️ Tạo Voucher mới                                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Mã voucher *                                                            │
│  [ SUMMER20___________________ ]  (tối đa 20 ký tự, tự động UPPERCASE) │
│                                                                         │
│  Mô tả                                                                  │
│  [ Giảm 20% cho tất cả sách giáo khoa_____________________________ ]   │
│                                                                         │
│  Loại giảm giá *                                                        │
│  ◉ Phần trăm (%)    ○ Số tiền cố định (đ)                              │
│                                                                         │
│  Giá trị giảm *           Đơn hàng tối thiểu          Giới hạn lượt   │
│  [ 20          ]%         [ 100000         ]đ          [ 50      ]      │
│                                                                         │
│  Ngày bắt đầu *           Ngày kết thúc *                              │
│  [ 01/06/2026  ]          [ 30/06/2026    ]                             │
│                                                                         │
│  [Hủy]                                              [💾 Lưu Voucher]   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Tab Flash Sale — Stats bar và nhóm theo trạng thái

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ Flash Sale                                      [+ Tạo Flash Sale]  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────────┐  ┌──────────────┐  ┌──────────┐ │
│  │Tổng Flash   │  │Đang/Sắp diễn ra  │  │SP đã bán     │  │Doanh thu │ │
│  │Sale: 8      │  │      5           │  │Flash Sale: 63│  │1.890.000đ│ │
│  │   (vàng)    │  │   (xanh lá)      │  │    (đỏ)      │  │(xanh dương│ │
│  └─────────────┘  └──────────────────┘  └──────────────┘  └──────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│  ⚡ Đang diễn ra                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Toán 12 Cánh Diều                                    ● Đang diễn│   │
│  │ ~~75.000đ~~  →  45.000đ  [-40%]                                  │   │
│  │ 20/06/2026  20:00–22:00   |  12/30 sp                            │   │
│  │ ████░░░░░░  Đã bán: 12 / 30  [✏️ Sửa] [🗑 Hủy]                 │   │
│  └──────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  🕐 Sắp diễn ra                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Vở ô ly Hồng Hà                                    ○ Sắp diễn ra│   │
│  │ ~~12.000đ~~  →  9.000đ  [-25%]                                   │   │
│  │ 25/06/2026  19:00–21:00   |  0/100 sp                            │   │
│  │ ░░░░░░░░░░  Đã bán: 0 / 100  [✏️ Sửa] [🗑 Hủy]                 │   │
│  └──────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  ✓ Đã kết thúc                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Atomic Habits (bản dịch)                           ✓ Đã kết thúc│   │
│  │ ~~95.000đ~~  →  65.000đ  [-32%]                                  │   │
│  │ 10/06/2026  20:00–22:00                                          │   │
│  │ Đã bán: 48/50  |  Tỉ lệ: 96%  |  Doanh thu: 3.120.000đ         │   │
│  │ 🏆 Bán rất tốt! Nên tổ chức lại.                                │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Form tạo/sửa Flash Sale

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ Tạo Flash Sale mới                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  ⚠️  Flash Sale giúp tăng lượt hiển thị lên đến 5×.                    │
│      Giá Flash Sale phải thấp hơn giá gốc ít nhất 10%.                 │
├─────────────────────────────────────────────────────────────────────────┤
│  Sản phẩm *                                                             │
│  [ [Sách] Toán 12 Cánh Diều — 75.000đ         ▼ ]                      │
│                                                                         │
│  Giá Flash Sale *         Số lượng giới hạn *                          │
│  [ 45000           ]đ     [ 30              ] sản phẩm                  │
│  (Giá gốc: 75.000đ — Đang giảm 40%)                                    │
│                                                                         │
│  Ngày diễn ra *           Giờ bắt đầu *        Giờ kết thúc *         │
│  [ 20/06/2026  ]          [ 20:00     ]         [ 22:00    ]            │
│                                                                         │
│  [Hủy]                                          [⚡ Tạo Flash Sale]    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

| Yêu cầu | Mô tả |
|---------|-------|
| Tính trạng thái runtime | `vStatus()` và `_flashLiveStatus()` tính toán trực tiếp mỗi lần render — không lưu cache; cần kiểm tra hiệu năng khi danh sách > 100 mục |
| Render client-side | Toàn bộ lọc, tính toán và phân nhóm xử lý trên client; phản hồi < 50ms với danh sách < 200 mục |
| Lưu trữ đồng bộ | `saveActiveSellers()` ghi đồng bộ vào `localStorage`; với dữ liệu lớn cần xem xét debounce |
| Không phân trang | Danh sách hiển thị toàn bộ không phân trang; cần xem xét khi danh sách voucher/flash sale > 50 mục |

### 6.2 Bảo mật

| Yêu cầu | Mô tả |
|---------|-------|
| Phân quyền | Chỉ seller được duyệt mới truy cập module; kiểm tra trước khi render `sellerPromoCenter()` |
| Cô lập dữ liệu | Mỗi seller chỉ xem và quản lý dữ liệu `s.promotionsData` của chính mình |
| Escape đầu ra | Toàn bộ chuỗi người dùng nhập (code, desc, productName) được escape qua `escHtml()` trước khi chèn HTML |
| Validation đầu vào | Kiểm tra đầy đủ kiểu dữ liệu và miền giá trị trước khi lưu; từ chối giá trị âm, ngoài phạm vi |
| Mã voucher | Code phải là chuỗi alphanumeric — không cho phép ký tự đặc biệt có thể gây injection |

### 6.3 Trải nghiệm người dùng

| Yêu cầu | Mô tả |
|---------|-------|
| Phản hồi tức thì | Toast thông báo kết quả mọi thao tác (tạo, sửa, xóa, toggle) |
| UPPERCASE tự động | Mã voucher tự động chuyển chữ hoa qua `oninput` — không cần người dùng gõ đúng hoa/thường |
| Giá trị mặc định | Form Flash Sale có `startTime = '20:00'` và `endTime = '22:00'` sẵn — phù hợp khung giờ thực tế |
| Banner hướng dẫn | Thông tin quy tắc 10% được hiển thị ngay trong form — giảm lỗi validation |
| Trạng thái tự động | Voucher hết hạn và flash sale kết thúc tự động phản ánh đúng trạng thái mà không cần thao tác thủ công |
| Thông điệp kết quả | Flash sale kết thúc hiển thị đánh giá cụ thể (🏆/✓/💡) giúp seller rút kinh nghiệm |
| Xác nhận trước khi xóa | Cả xóa voucher và hủy flash sale đều yêu cầu `confirm()` để tránh thao tác nhầm |
| Stats bar contextual | Stats bar chỉ hiển thị khi có dữ liệu — tránh hiển thị số 0 vô nghĩa khi chưa có gì |
| Thông báo hệ thống | `addNotif()` gửi thông báo khi tạo flash sale mới — giúp seller theo dõi hoạt động |

### 6.4 Tương thích

| Yêu cầu | Mô tả |
|---------|-------|
| Lưu trữ | `localStorage` — tồn tại giữa các phiên trên cùng thiết bị/trình duyệt |
| Định dạng ngày | DD/MM/YYYY nhất quán với toàn bộ hệ thống EduMart |
| Định dạng giờ | HH:MM (24 giờ) |
| Định dạng tiền | VNĐ với dấu chấm ngàn (VD: 75.000đ) |
| ID duy nhất | Dùng `Date.now().toString(36)` với prefix — đảm bảo unique trong phiên, đủ dùng cho client-side storage |

---

## 7. Tiêu chí chấp nhận

**AC-01:** Hai tab Voucher và Flash Sale chuyển đổi đúng; `sellerPromoTab` cập nhật và nội dung render tương ứng khi nhấn tab.

**AC-02:** `vStatus(v)` trả về `'paused'` nếu `v.status === 'paused'`, `'expired'` nếu `endDate < today`, và `'active'` trong mọi trường hợp còn lại — đúng thứ tự ưu tiên.

**AC-03:** Stats bar Voucher hiển thị đúng: tổng số voucher, số voucher `vStatus === 'active'`, và tổng `usedCount`.

**AC-04:** Stats bar Flash Sale hiển thị đúng: tổng flash sale, số `active + upcoming`, tổng `soldQty` của `ended`, tổng doanh thu `soldQty × flashPrice` của `ended`.

**AC-05:** Progress bar sử dụng voucher đổi màu đỏ khi `usedPct >= 90`.

**AC-06:** Panel thống kê (`sellerVoucherStatsId`) mở/đóng đúng khi nhấn nút 📊; chỉ một panel được mở cùng lúc.

**AC-07:** `estImpact` tính đúng: với `pct` = `usedCount × minOrder × (value/100)`; với `fixed` = `usedCount × value`.

**AC-08:** Form voucher tự động chuyển `code` thành UPPERCASE qua `oninput`.

**AC-09:** `doSellerSaveVoucher()` từ chối và hiển thị toast lỗi khi: code rỗng, code trùng, value ≤ 0, pct và value > 100, thiếu startDate hoặc endDate.

**AC-10:** Khi tạo voucher mới: `id = 'sv-' + Date.now().toString(36)`, `usedCount = 0`, `status = 'active'`, `createdAt = todayStr()`.

**AC-11:** Khi sửa voucher: chỉ cập nhật các trường nhập liệu; giữ nguyên `id`, `usedCount`, `status`, `createdAt`.

**AC-12:** `doSellerToggleVoucher(vid)` chuyển `active → paused` và ngược lại; gọi `saveActiveSellers()` và hiển thị toast.

**AC-13:** `doSellerDeleteVoucher(vid)` chỉ xóa sau khi `confirm()` trả về `true`; gọi `saveActiveSellers()`.

**AC-14:** `_flashLiveStatus(fs)` trả về đúng: `'ended'` nếu `endDate < today`, `'upcoming'` nếu `startDate > today`, `'active'` còn lại.

**AC-15:** Flash sale được hiển thị đúng 3 nhóm (`⚡ Đang diễn ra`, `🕐 Sắp diễn ra`, `✓ Đã kết thúc`) — mỗi nhóm chỉ xuất hiện khi có flash sale thuộc nhóm đó.

**AC-16:** Card flash sale `ended` hiển thị đúng thông điệp đánh giá: 🏆 khi ≥ 90%, ✓ khi ≥ 50%, 💡 khi < 50%.

**AC-17:** Nút ✏️ Sửa và 🗑 Hủy không xuất hiện trên card flash sale có trạng thái `ended`.

**AC-18:** Dropdown sản phẩm trong form Flash Sale liệt kê đúng tất cả sản phẩm từ tất cả loại (books, ebooks, vpp, tbgd) của seller.

**AC-19:** `doSellerSaveFlashSale()` từ chối khi: thiếu trường bắt buộc, flashPrice ≥ originalPrice, hoặc discPct < 10%; thông báo lỗi phải hiển thị giá trị % hiện tại.

**AC-20:** Khi tạo flash sale mới: `id = 'sf-' + Date.now().toString(36)`, `soldQty = 0`, `endDate = startDate`, `addNotif()` được gọi.

**AC-21:** Khi sửa flash sale: giữ nguyên `id` và `soldQty`; không gọi `addNotif()`.

**AC-22:** `doSellerDeleteFlashSale(fid)` chỉ xóa sau khi `confirm()` trả về `true`.

**AC-23:** Sau mọi thao tác tạo/sửa/xóa/toggle, `saveActiveSellers()` được gọi và dữ liệu được lưu vào `localStorage`.

**AC-24:** `s.promotionsData` được khởi tạo thành `{ vouchers: [], flashSales: [] }` nếu chưa tồn tại (backward compatibility với seller cũ).

**AC-25:** Stats bar không hiển thị khi mảng `vouchers` (hoặc `flashSales`) là rỗng.

**AC-26:** Form Flash Sale hiển thị banner cảnh báo về quy tắc giảm giá tối thiểu 10%.

**AC-27:** Giá trị mặc định của `startTime` và `endTime` trong form Flash Sale lần lượt là `'20:00'` và `'22:00'`.

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Voucher hết hạn vẫn có thể được người mua nhập thủ công nếu không có kiểm tra server-side | Cao | P1 workaround: Hệ thống kiểm tra `vStatus` trước khi áp dụng voucher; P3: Validate server-side khi tích hợp backend |
| R-02 | `usedCount` được cập nhật thủ công từ luồng mua hàng — có thể desync nếu giao dịch thất bại | Cao | P2: Tạo atomic update cho `usedCount`; P3: Chuyển sang server-side tracking |
| R-03 | Flash Sale `startDate === endDate` — không hỗ trợ flash sale kéo dài nhiều ngày | Trung bình | P2: Tách `startDate` và `endDate` thành hai trường riêng biệt trong form; update `_flashLiveStatus` tương ứng |
| R-04 | `_flashLiveStatus` chỉ so sánh ngày (không so sánh giờ) — flash sale 19:00–21:00 ngày hôm nay vẫn hiển thị "active" dù đã qua 21:00 | Trung bình | P2: Kết hợp so sánh `startTime`/`endTime` trong `_flashLiveStatus`; dùng `Date` object đầy đủ giờ phút |
| R-05 | Code voucher không validate ký tự — có thể nhập ký tự đặc biệt gây vấn đề khi hiển thị hoặc so sánh | Trung bình | P2: Thêm regex validate `code` phải là `[A-Z0-9_-]{1,20}` trong `doSellerSaveVoucher()` |
| R-06 | Seller xóa sản phẩm đang có Flash Sale `upcoming` — flash sale vẫn tồn tại nhưng sản phẩm không còn | Trung bình | P2: Kiểm tra tham chiếu sản phẩm khi xóa; cảnh báo nếu sản phẩm đang có flash sale active/upcoming |
| R-07 | `localStorage` đầy khi tích lũy nhiều flash sale kết thúc theo thời gian | Thấp | P2: Tự động archive flash sale `ended` > 90 ngày; P3: Chuyển sang server-side storage |
| R-08 | Hai tab trình duyệt cùng thao tác trên cùng dữ liệu promotionsData — ghi đè nhau | Thấp | P3: Đồng bộ qua `storage` event; dài hạn dùng server-side với locking |
| R-09 | `discPct` tính bằng `round()` có thể làm một số trường hợp giảm đúng 10% bị từ chối do làm tròn | Thấp | P1 workaround: Kiểm tra `discPct >= 10` sau khi làm tròn — nếu flashPrice đủ giảm 10% thực tế thì round sẽ trả về ≥ 10; cần test edge case |
| R-10 | Không có giới hạn số lượng voucher/flash sale — seller có thể tạo hàng trăm mục gây UI lag | Thấp | P2: Giới hạn mềm 50 voucher và 30 flash sale kèm cảnh báo; hiển thị phân trang hoặc lazy load |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (hiện tại)

- [x] Module chính `sellerPromoCenter()` với 2 tab điều hướng (Voucher / Flash Sale)
- [x] Định tuyến `acctTab = 'seller-promo'` → `sellerPromoCenter()`
- [x] Hàm `_sellerVoucherTab(s, pd)`: stats bar, danh sách card, panel thống kê
- [x] Logic trạng thái voucher `vStatus(v)`: active / paused / expired
- [x] Progress bar sử dụng voucher với cảnh báo đỏ khi ≥ 90%
- [x] Panel thống kê chi tiết voucher với `estImpact` (toggle qua `sellerVoucherStatsId`)
- [x] Form voucher `_sellerVoucherForm()` với tự động UPPERCASE và đầy đủ trường
- [x] Validation đầy đủ trong `doSellerSaveVoucher()` (code unique, value, pct ≤ 100, ngày)
- [x] `doSellerToggleVoucher(vid)`: tạm dừng / bật lại voucher
- [x] `doSellerDeleteVoucher(vid)`: xóa với confirm()
- [x] Hàm `_sellerFlashSaleTab(s, pd)`: stats bar 4 card, phân nhóm 3 trạng thái
- [x] Logic trạng thái flash sale `_flashLiveStatus(fs)`: active / upcoming / ended
- [x] Card flash sale với progress bar, kết quả đánh giá (🏆/✓/💡) cho ended
- [x] Form flash sale `_sellerFlashSaleForm()` với dropdown sản phẩm đa loại
- [x] Banner hướng dẫn 10% trong form flash sale
- [x] Validation đầy đủ trong `doSellerSaveFlashSale()` bao gồm kiểm tra giảm ≥ 10%
- [x] Thông báo lỗi động: `"Cần giảm ít nhất 10% so với giá gốc (hiện tại: -X%)"`
- [x] `addNotif()` khi tạo flash sale mới
- [x] `doSellerDeleteFlashSale(fid)`: hủy với confirm()
- [x] Nút Sửa và Hủy chỉ hiển thị cho flash sale active/upcoming (không hiện với ended)
- [x] Toast thông báo cho tất cả thao tác
- [x] Khởi tạo `promotionsData` backward-compatible khi chưa tồn tại
- [x] Tất cả thao tác ghi gọi `saveActiveSellers()`

### P2 — Cải tiến tiếp theo

- [ ] Validate regex mã voucher: chỉ cho phép `[A-Z0-9_-]{1,20}`
- [ ] Hỗ trợ Flash Sale nhiều ngày (tách `startDate` và `endDate` trong form)
- [ ] Kết hợp giờ trong `_flashLiveStatus` để phân biệt flash sale trong ngày đã kết thúc hay chưa
- [ ] Cảnh báo khi xóa sản phẩm đang có flash sale active/upcoming
- [ ] Giới hạn mềm số lượng voucher (≤ 50) và flash sale (≤ 30) kèm cảnh báo giao diện
- [ ] Tìm kiếm / lọc danh sách voucher theo code, trạng thái, loại giảm giá
- [ ] Sắp xếp danh sách voucher theo ngày tạo, lượt dùng, trạng thái
- [ ] Tự động archive flash sale ended > 90 ngày
- [ ] Tích hợp bộ đếm `usedCount` với luồng thanh toán (atomic update)
- [ ] Hiển thị lịch sử sử dụng voucher (danh sách đơn hàng đã dùng)
- [ ] Gợi ý mã voucher tự động (VD: `SHOP + năm + random`)
- [ ] Nhân bản (duplicate) flash sale đã kết thúc với một click để tổ chức lại

### P3 — Tầm nhìn dài hạn

- [ ] Chuyển lưu trữ sang server-side; xác thực voucher server-side tránh bypass
- [ ] API đồng bộ `usedCount` và `soldQty` theo thời gian thực
- [ ] Hệ thống phân tích hiệu quả khuyến mãi: so sánh doanh thu trước/trong/sau flash sale
- [ ] Dashboard khuyến mãi tích hợp vào Analytics với biểu đồ timeline
- [ ] Flash Sale nhiều sản phẩm trong một chiến dịch (bundle flash sale)
- [ ] Voucher theo phân khúc khách hàng (khách hàng thân thiết, mua lần đầu)
- [ ] Lên lịch tự động kích hoạt/tạm dừng voucher theo ngày giờ chỉ định
- [ ] Tích hợp với hệ thống email marketing: tự động gửi code voucher theo chiến dịch
- [ ] A/B testing khuyến mãi: đo lường hiệu quả các mức giảm giá khác nhau
- [ ] Công cụ so sánh và đề xuất mức giảm giá tối ưu dựa trên lịch sử bán hàng
