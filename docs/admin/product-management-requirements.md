# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Sản phẩm — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Sản phẩm cung cấp cho quản trị viên EduMart công cụ toàn diện để kiểm soát chất lượng sản phẩm trên nền tảng — từ thẩm định sản phẩm mới trước khi xuất hiện trên sàn, xử lý nội dung vi phạm do người dùng báo cáo, đến tổ chức hệ thống danh mục sản phẩm. Mục tiêu là đảm bảo toàn bộ sản phẩm trên EduMart đáp ứng tiêu chuẩn chất lượng, trung thực và pháp lý, đồng thời duy trì cấu trúc danh mục rõ ràng giúp người mua tìm sản phẩm dễ dàng.

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Duyệt sản phẩm mới** | Thẩm định sản phẩm do seller đăng, phê duyệt hoặc yêu cầu chỉnh sửa |
| **Kiểm duyệt nội dung** | Xử lý sản phẩm bị người dùng báo cáo vi phạm |
| **Quản lý danh mục** | Tổ chức, thêm, sửa, ẩn/hiện, xóa danh mục và thể loại sản phẩm |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng: duyệt, từ chối, ẩn, xóa sản phẩm; quản lý danh mục |
| **Content Admin** | Duyệt sản phẩm, kiểm duyệt nội dung — không quản lý danh mục |
| **Read-only Admin** | Chỉ xem danh sách và thống kê |

### 1.4 Điều kiện tiên quyết

- Người dùng đã có tài khoản với `role='admin'` và đã đăng nhập
- Hệ thống có dữ liệu sản phẩm chờ duyệt trong `pendingProds[]`
- Hệ thống có dữ liệu sản phẩm bị báo cáo trong `reportedProds[]`
- Cấu trúc danh mục được lưu trong `adminCats[]`

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Duyệt sản phẩm mới

#### FR-01.1 Bảng thống kê tổng quan

**Mô tả:** Hiển thị 4 chỉ số tổng hợp dạng card ngay đầu tab.

| Chỉ số | Điều kiện | Màu |
|--------|-----------|-----|
| Chờ duyệt | `status='pending'` | Cam `#e67e22` |
| Đã duyệt hôm nay | Duyệt trong ngày hiện tại | Xanh lá `#27ae60` |
| Yêu cầu sửa | `status='need-edit'` | Xanh dương `#2980b9` |
| Từ chối | `status='rejected'` | Đỏ `#c0392b` |

**Badge trên tab:** Hiển thị số sản phẩm `pending` dưới dạng badge đỏ trên tiêu đề tab.

#### FR-01.2 Danh sách sản phẩm chờ duyệt

**Mô tả:** Bảng liệt kê toàn bộ sản phẩm chờ duyệt với tìm kiếm và phân trang.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Ảnh | Ảnh bìa sản phẩm (48×48) |
| Sản phẩm | Tên sản phẩm (đậm) + Seller · Ngày nộp |
| Danh mục | Badge màu theo danh mục |
| Giá | Giá bán (đồng) |
| Trạng thái | Badge màu (xem bảng FR-01.3) |
| Hành động | Nút "Xem chi tiết" |

**Sắp xếp mặc định:** Mới nhất trước (theo `submittedAt`).

**Phân trang:** 8 bản ghi/trang.

**Tìm kiếm:** Realtime, khớp chuỗi con không phân biệt hoa/thường trên tên sản phẩm và tên seller.

#### FR-01.3 Trạng thái sản phẩm chờ duyệt

| Trạng thái | Giá trị | Badge |
|------------|---------|-------|
| Chờ duyệt | `pending` | Cam — "Chờ duyệt" |
| Yêu cầu sửa | `need-edit` | Xanh dương — "Cần chỉnh sửa" |
| Đã duyệt | `approved` | Xanh lá — "Đã duyệt" |
| Từ chối | `rejected` | Xám — "Đã từ chối" |

#### FR-01.4 Chi tiết sản phẩm chờ duyệt

**Mô tả:** Trang chi tiết hiển thị đầy đủ thông tin sản phẩm cần thẩm định.

**Thông tin header:**
- Tên sản phẩm, badge danh mục, badge trạng thái
- Seller, ngày nộp, giá bán

**Nội dung chi tiết:**

| Nhóm | Trường |
|------|--------|
| **Thông tin cơ bản** | Tên sách/sản phẩm, tác giả, nhà xuất bản |
| **Phân loại** | Danh mục, ISBN (nếu có) |
| **Thương mại** | Giá niêm yết, giá bán, số lượng tồn kho |
| **Mô tả** | Mô tả chi tiết sản phẩm (khối riêng, nền nhạt) |
| **Kênh phân phối** | Sách giấy / Ebook / Sách nói / Kết hợp |

**Banner thông báo:**
- Nếu `status='need-edit'`: banner xanh dương hiển thị nội dung yêu cầu chỉnh sửa và admin gửi
- Nếu `status='rejected'`: banner đỏ hiển thị lý do từ chối

**Hành động hiển thị:** Chỉ hiện khi `status='pending'` hoặc `status='need-edit'`.

#### FR-01.5 Duyệt sản phẩm

**Điều kiện áp dụng:** Sản phẩm có `status='pending'` hoặc `status='need-edit'`.

**Luồng:**
1. Admin click "✓ Duyệt sản phẩm"
2. Hộp thoại xác nhận
3. Hệ thống:
   - Cập nhật `status='approved'`, ghi `reviewedBy`, `reviewedAt`
   - Sản phẩm chuyển sang trạng thái công bố trên sàn
4. Toast xác nhận, quay về danh sách

#### FR-01.6 Yêu cầu chỉnh sửa

**Điều kiện áp dụng:** Sản phẩm có `status='pending'`.

**Luồng:**
1. Admin click "✎ Yêu cầu chỉnh sửa"
2. Prompt nhập nội dung yêu cầu *(bắt buộc, tối thiểu 1 ký tự)*
3. Hệ thống:
   - Cập nhật `status='need-edit'`, lưu `reviewNote`, `reviewedBy`, `reviewedAt`
4. Toast xác nhận kèm tên sản phẩm

**Quy tắc validation:** Nội dung rỗng → toast cảnh báo, không lưu.

**Khác biệt với Từ chối:** Seller vẫn được phép sửa và nộp lại để được xét duyệt.

#### FR-01.7 Từ chối sản phẩm

**Điều kiện áp dụng:** Sản phẩm có `status='pending'` hoặc `status='need-edit'`.

**Luồng:**
1. Admin click "✕ Từ chối"
2. Prompt nhập lý do *(bắt buộc)*
3. Hệ thống: cập nhật `status='rejected'`, lưu `reviewNote`, `reviewedBy`, `reviewedAt`
4. Toast xác nhận

**Quy tắc validation:** Lý do rỗng → toast cảnh báo, không lưu.

---

### 2.2 FR-02: Kiểm duyệt nội dung

#### FR-02.1 Bảng thống kê tổng quan

**Mô tả:** 4 chỉ số tổng hợp dạng card ngay đầu tab.

| Chỉ số | Điều kiện | Màu |
|--------|-----------|-----|
| Chờ xử lý | `status='reported'` | Đỏ `#c0392b` |
| Đang xem xét | `status='reviewing'` | Cam `#e67e22` |
| Đã xử lý | `status='resolved'` | Xanh lá `#27ae60` |
| Đã xóa | `status='deleted'` | Xám |

**Badge trên tab:** Số sản phẩm `reported` dưới dạng badge đỏ.

#### FR-02.2 Danh sách sản phẩm bị báo cáo

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung |
|-----|---------|
| Ảnh | Ảnh bìa sản phẩm (48×48) |
| Sản phẩm | Tên sản phẩm (đậm) + Seller · Số lần báo cáo |
| Danh mục | Badge màu |
| Loại vi phạm | Badge màu theo loại (xem FR-02.4) |
| Ngày báo cáo | DD/MM/YYYY |
| Trạng thái | Badge màu (xem FR-02.3) |
| Hành động | Nút "Xem chi tiết" + Nút "Ẩn" nhanh (nếu đang hoạt động) |

**Tìm kiếm:** Theo tên sản phẩm hoặc tên seller.  
**Phân trang:** 8 bản ghi/trang.  
**Sắp xếp mặc định:** Mới nhất trước.

#### FR-02.3 Trạng thái kiểm duyệt nội dung

| Trạng thái | Giá trị | Badge |
|------------|---------|-------|
| Chờ xử lý | `reported` | Đỏ — "Chờ xử lý" |
| Đang xem xét | `reviewing` | Cam — "Đang xem xét" |
| Đã giải quyết | `resolved` | Xanh lá — "Đã giải quyết" |
| Đã ẩn | `hidden` | Xám — "Đã ẩn" |
| Đã xóa | `deleted` | Xám đậm — "Đã xóa" |

#### FR-02.4 Loại vi phạm

| Loại | Mô tả | Màu badge |
|------|-------|-----------|
| `fake` | Hàng giả / hàng nhái | Đỏ `#c0392b` |
| `copyright` | Vi phạm bản quyền | Đỏ `#c0392b` |
| `mislead` | Thông tin sai lệch | Cam `#e67e22` |
| `inappropriate` | Nội dung không phù hợp | Cam `#e67e22` |
| `other` | Lý do khác | Xám |

#### FR-02.5 Chi tiết sản phẩm bị báo cáo

**Thông tin header:** Tên sản phẩm, seller, số lần báo cáo, loại vi phạm, ngày báo cáo, trạng thái.

**Thông tin sản phẩm:** Tương tự FR-01.4 (tên, mô tả, danh mục, giá).

**Nội dung tố cáo (khối nền hồng nhạt):**
- Tiêu đề: "Nội dung tố cáo từ người dùng"
- Mô tả chi tiết vi phạm do người báo cáo cung cấp

**Hành động hiển thị:** Chỉ hiện khi `status` không phải `deleted`.

#### FR-02.6 Ẩn sản phẩm vi phạm

**Điều kiện áp dụng:** Sản phẩm không đang ở `status='hidden'` hoặc `'deleted'`.

**Luồng:**
1. Admin click "👁 Ẩn sản phẩm"
2. Hộp thoại xác nhận: "Sản phẩm sẽ bị ẩn khỏi danh sách tìm kiếm nhưng chưa xóa vĩnh viễn."
3. Hệ thống: cập nhật `status='hidden'`, ghi `reviewedBy`, `reviewedAt`
4. Toast xác nhận

#### FR-02.7 Bỏ ẩn sản phẩm

**Điều kiện áp dụng:** `status='hidden'`.

**Luồng:**
1. Admin click "👁 Bỏ ẩn"
2. Hộp thoại xác nhận
3. Hệ thống: cập nhật `status='reviewing'`, giữ nguyên lịch sử
4. Toast xác nhận

#### FR-02.8 Xóa sản phẩm vi phạm

**Điều kiện áp dụng:** Sản phẩm không đang ở `status='deleted'`.

**Luồng:**
1. Admin click "🗑 Xóa sản phẩm"
2. Prompt nhập lý do xóa *(bắt buộc)*
3. Hộp thoại xác nhận với cảnh báo: "Hành động không thể hoàn tác"
4. Hệ thống: cập nhật `status='deleted'`, lưu `reviewNote`
5. Toast xác nhận

**Thiết kế an toàn:** Đây là soft delete (chỉ đổi status), không xóa bản ghi khỏi database.

#### FR-02.9 Gửi cảnh báo đến Seller

**Điều kiện áp dụng:** Bất kỳ sản phẩm báo cáo nào chưa `deleted`.

**Luồng:**
1. Admin click "⚠ Cảnh báo Seller"
2. Prompt nhập nội dung cảnh báo *(bắt buộc)*
3. Hệ thống:
   - Tìm seller trong `activeSellers[]` theo `shopName` khớp với `sellerName` của sản phẩm
   - Nếu tìm thấy: thêm bản ghi vi phạm vào `activeSellers[idx].violations[]` với `type='other'`, `severity='medium'`
   - Toast: "Đã gửi cảnh báo đến Seller: [Tên shop]" hoặc "Seller không có trong danh sách đang hoạt động" nếu không tìm thấy

**Tích hợp module:** Hành động này ghi dữ liệu sang module **Quản lý Nhà cung cấp**, tạo ra sự liên kết dữ liệu giữa hai phân hệ.

---

### 2.3 FR-03: Quản lý danh mục

#### FR-03.1 Tổng quan giao diện

**Mô tả:** Grid card, mỗi card đại diện một danh mục hoặc thể loại. Giao diện cho phép thêm, sửa, sắp xếp, ẩn/hiện, và xóa danh mục.

**Phân nhóm theo loại:**
- **Danh mục chính** (`type='main'`): Sách, Văn phòng phẩm, Thiết bị giáo dục, Ebook, Sách nói
- **Thể loại phụ** (`type='genre'`): Văn học, Khoa học, Lịch sử, Thiếu nhi, Giáo trình, Tự học

**Grid layout:** `auto-fill, minmax(240px, 1fr)` — tự điều chỉnh số cột theo màn hình.

#### FR-03.2 Thông tin hiển thị trên mỗi card

| Thành phần | Nội dung |
|------------|---------|
| Icon | Emoji icon danh mục |
| Tên | Tên danh mục (đậm) |
| Mô tả | Mô tả ngắn |
| Số sản phẩm | "X sản phẩm" đếm từ dữ liệu |
| Nút sắp xếp | ↑ / ↓ (disabled ở đầu/cuối cùng nhóm) |
| Nút hành động | Ẩn/Hiện · Sửa · Xóa |
| Trạng thái ẩn | Card giảm opacity 55% + tag "Đang ẩn" |

#### FR-03.3 Thêm danh mục mới

**Mô tả:** Form thêm mới hiển thị ngay đầu danh sách (trước các card).

**Các trường bắt buộc:**

| Trường | Input | Ghi chú |
|--------|-------|---------|
| Loại | Radio: Danh mục chính / Thể loại | Quyết định nhóm hiển thị |
| Icon | Text input | Emoji ký tự đơn |
| Tên danh mục | Text input | Bắt buộc, unique trong nhóm |
| Mô tả | Textarea | Không bắt buộc |

**Nút:** "Thêm danh mục" và "Hủy".

**Luồng thêm mới:**
1. Admin điền form và click "Thêm danh mục"
2. Kiểm tra: tên không rỗng và không trùng danh mục cùng loại
3. Nếu hợp lệ:
   - Tạo object mới `{ id: 'cat-' + Date.now().toString(36), type, icon, name, desc, visible:true }`
   - Thêm vào cuối mảng `adminCats[]`
   - Lưu `saveAdminCats()`
   - Ẩn form, toast xác nhận
4. Nếu không hợp lệ: toast cảnh báo tương ứng

#### FR-03.4 Chỉnh sửa danh mục

**Mô tả:** Form inline xuất hiện bên trong card đang chỉnh sửa (thay thế nội dung card).

**Luồng:**
1. Admin click "✎ Sửa" trên card
2. State `admCatView = 'edit-{id}'` → form inline hiển thị trong card với giá trị hiện tại
3. Admin chỉnh sửa Icon / Tên / Mô tả
4. Click "Lưu":
   - Kiểm tra tên không rỗng và không trùng với danh mục khác cùng loại
   - Cập nhật danh mục, gọi `saveAdminCats()`
   - State `admCatView='list'`, toast xác nhận
5. Click "Hủy": `admCatView='list'`, không lưu

**Không cho phép thay đổi:** Loại danh mục (`type`) và `key` (định danh nội bộ).

#### FR-03.5 Sắp xếp thứ tự hiển thị

**Mô tả:** Mỗi card có 2 nút ↑ và ↓ để điều chỉnh vị trí trong cùng nhóm (main hoặc genre).

**Luồng doMoveCatUp(id):**
1. Lọc các danh mục cùng `type`
2. Tìm index của `id` trong nhóm đó
3. Nếu `idx > 0`: hoán đổi vị trí với phần tử trước trong mảng gốc `adminCats`
4. Gọi `saveAdminCats()`, re-render

**Luồng doMoveCatDown(id):** Tương tự, hoán đổi với phần tử sau.

**Nút disabled:**
- ↑ disabled khi danh mục ở vị trí đầu tiên của nhóm
- ↓ disabled khi danh mục ở vị trí cuối cùng của nhóm

**Không di chuyển xuyên nhóm:** ↑ từ danh mục đầu nhóm genre không lên nhóm main.

#### FR-03.6 Ẩn / Hiện danh mục

**Mô tả:** Toggle hiển thị danh mục mà không xóa.

**Luồng:**
1. Admin click "👁 Ẩn" hoặc "👁 Hiện"
2. Toggle `visible = !visible` trên đối tượng danh mục
3. Gọi `saveAdminCats()`
4. Toast: "Đã ẩn: [Tên]" hoặc "Đã hiện: [Tên]"

**Visual feedback:** Card ẩn (`visible=false`) hiển thị với opacity 55% và tag "Đang ẩn".

**Hiệu ứng lên sàn:** Danh mục ẩn vẫn tồn tại trong hệ thống; sản phẩm vẫn thuộc danh mục đó nhưng không hiển thị trên menu khám phá của người mua.

#### FR-03.7 Xóa danh mục

**Điều kiện áp dụng:** Chỉ xóa được danh mục không có sản phẩm.

**Luồng:**
1. Admin click "🗑 Xóa"
2. Đếm sản phẩm đang dùng danh mục: `P.filter(p => p.cat === c.key || GENRE_MAP[p.id] === c.key).length`
3. **Nếu có sản phẩm:**
   - Toast cảnh báo: "Không thể xóa — có X sản phẩm đang thuộc danh mục [Tên]. Hãy chuyển sản phẩm sang danh mục khác trước."
   - Hủy thao tác
4. **Nếu không có sản phẩm:**
   - Hộp thoại xác nhận: "Xóa danh mục [Tên]? Không thể hoàn tác."
   - Xác nhận → xóa khỏi `adminCats[]`, lưu, toast xác nhận

**Bảo vệ dữ liệu:** Kiểm tra ràng buộc sản phẩm là điều kiện bắt buộc trước mọi thao tác xóa.

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm sản phẩm phản hồi trong < 100ms (client-side)
- Trang chi tiết sản phẩm tải ngay sau click (dữ liệu đã có trong memory)
- Grid danh mục tái render trong < 50ms sau thao tác sắp xếp/ẩn/xóa

### 3.2 NFR-02: Tính toàn vẹn dữ liệu

- Mỗi hành động (duyệt/từ chối/ẩn/xóa) đều ghi `reviewedBy` và `reviewedAt`
- Xóa sản phẩm là **soft delete** (chỉ đổi status), không mất dữ liệu
- Xóa danh mục yêu cầu kiểm tra ràng buộc sản phẩm trước khi cho phép
- Không thể thay đổi `key` và `type` của danh mục sau khi tạo

### 3.3 NFR-03: Bảo mật

- **XSS Prevention:** Mọi nội dung sản phẩm, tên seller, mô tả phải qua `escHtml()` trước khi render
- Lý do từ chối/cảnh báo lưu dưới dạng plaintext, không thực thi
- Cảnh báo Seller qua module báo cáo không tự động chuyển seller sang `warning` — chỉ ghi vi phạm vào lịch sử

### 3.4 NFR-04: Persistence

- Dữ liệu `pendingProds`, `reportedProds`, `adminCats` được lưu vào `localStorage`
- Dữ liệu mặc định được seed tự động nếu chưa có
- Thay đổi danh mục có hiệu lực ngay lập tức — không cần publish step

### 3.5 NFR-05: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 800px | Grid danh mục chuyển sang 2 cột |
| ≤ 500px | Grid danh mục chuyển sang 1 cột |
| ≤ 700px | Bảng sản phẩm ẩn cột giá, thu gọn cột trạng thái |

---

## 4. Mô hình dữ liệu

### 4.1 PendingProduct Object (Sản phẩm chờ duyệt)

```javascript
{
  id: string,              // 'pp-001'
  name: string,            // Tên sản phẩm
  seller: string,          // Tên shop seller
  sellerEmail: string,
  category: CategoryEnum,  // Danh mục
  price: number,           // Giá bán (VND)
  listPrice: number,       // Giá niêm yết (VND)
  stock: number,           // Số lượng tồn kho
  submittedAt: string,     // 'DD/MM/YYYY'
  status: PendingStatusEnum,

  details: {
    author: string,        // Tác giả
    publisher: string,     // Nhà xuất bản
    isbn: string,          // ISBN (nếu có)
    desc: string,          // Mô tả sản phẩm
    format: FormatEnum,    // Kênh phân phối
    image: string          // URL ảnh bìa
  },

  reviewNote: string,      // Lý do từ chối / nội dung yêu cầu sửa
  reviewedBy: string|null,
  reviewedAt: string|null
}
```

```javascript
type PendingStatusEnum = 'pending' | 'need-edit' | 'approved' | 'rejected'
type CategoryEnum = 'sach' | 'vpp' | 'tbgd' | 'ebook' | 'audiobook'
type FormatEnum = 'paperback' | 'ebook' | 'audiobook' | 'combo'
```

### 4.2 ReportedProduct Object (Sản phẩm bị báo cáo)

```javascript
{
  id: string,              // 'rp-001'
  name: string,            // Tên sản phẩm
  seller: string,          // Tên shop seller
  sellerEmail: string,
  category: CategoryEnum,
  price: number,
  reportedAt: string,      // 'DD/MM/YYYY'
  reportCount: number,     // Số lần bị báo cáo
  reportType: ReportTypeEnum,
  reportDesc: string,      // Nội dung tố cáo chi tiết
  status: ReportStatusEnum,
  image: string,

  reviewedBy: string|null,
  reviewedAt: string|null,
  reviewNote: string
}
```

```javascript
type ReportTypeEnum = 'fake' | 'copyright' | 'mislead' | 'inappropriate' | 'other'

type ReportStatusEnum = 'reported' | 'reviewing' | 'resolved' | 'hidden' | 'deleted'
```

### 4.3 AdminCategory Object (Danh mục)

```javascript
{
  id: string,        // 'cat-sach' | 'genre-vanhoc' | 'cat-' + timestamp
  key: string,       // 'sach' | 'vanhoc' (dùng để join với P[].cat)
  type: 'main'|'genre',
  icon: string,      // Emoji: '📚'
  name: string,      // Tên hiển thị: 'Sách'
  desc: string,      // Mô tả
  visible: boolean   // true = hiển thị trên sàn
}
```

**Danh mục mặc định (11 bản ghi):**

```javascript
// Danh mục chính (type='main')
{ id:'cat-sach',     key:'sach',     icon:'📚', name:'Sách',              visible:true }
{ id:'cat-vpp',      key:'vpp',      icon:'✏️', name:'Văn phòng phẩm',   visible:true }
{ id:'cat-tbgd',     key:'tbgd',     icon:'🎒', name:'Thiết bị giáo dục', visible:true }
{ id:'cat-ebook',    key:'ebook',    icon:'💻', name:'Ebook',             visible:true }
{ id:'cat-audio',    key:'audiobook',icon:'🎧', name:'Sách nói',          visible:true }

// Thể loại (type='genre')
{ id:'genre-vanhoc', key:'vanhoc',   icon:'📖', name:'Văn học',           visible:true }
{ id:'genre-khoa',   key:'khoahoc',  icon:'🔬', name:'Khoa học',          visible:true }
{ id:'genre-ls',     key:'lichsu',   icon:'🏺', name:'Lịch sử',           visible:true }
{ id:'genre-thieu',  key:'thieunhi', icon:'🌈', name:'Thiếu nhi',         visible:true }
{ id:'genre-giao',   key:'giaotrinh',icon:'📐', name:'Giáo trình',        visible:true }
{ id:'genre-tuhoc',  key:'tuhoc',    icon:'💡', name:'Tự học',            visible:true }
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng duyệt sản phẩm mới

```
Admin → Tab "Sản phẩm" → Tab con "Duyệt sản phẩm mới"
  → Bảng thống kê: Chờ duyệt (4), Cần sửa (2), Đã duyệt (1)
  → Click "Xem chi tiết" sản phẩm "Toán 12 Nâng cao"
  → Xem: Tác giả, NXB, ISBN, Giá, Mô tả, Kênh
  → Đánh giá: thông tin đầy đủ, hợp lệ
  → Click "✓ Duyệt sản phẩm" → Confirm
  → Toast "Đã duyệt: Toán 12 Nâng cao"
  → Sản phẩm xuất hiện trên sàn cho người mua
```

### 5.2 Luồng yêu cầu chỉnh sửa sản phẩm

```
Admin → Chi tiết "Sách Tiếng Anh B1 Grammar"
  → Phát hiện: mô tả sơ sài, thiếu thông tin ISBN
  → Click "✎ Yêu cầu chỉnh sửa"
  → Prompt: "Vui lòng bổ sung mã ISBN và viết lại mô tả chi tiết hơn (tối thiểu 100 từ)"
  → Toast "Đã yêu cầu chỉnh sửa: Sách Tiếng Anh B1 Grammar"
  → Sản phẩm chuyển sang "Cần chỉnh sửa" — banner xanh xuất hiện trên trang
  → Seller nhận thông báo, chỉnh sửa và nộp lại
  → Sản phẩm quay về danh sách "Chờ duyệt" cho admin xét lại
```

### 5.3 Luồng xử lý sản phẩm bị báo cáo

```
Admin → Tab "Kiểm duyệt nội dung"
  → Badge đỏ: 3 sản phẩm chờ xử lý
  → Click "Xem chi tiết" sản phẩm bị báo cáo 5 lần
  → Đọc nội dung tố cáo: "Hàng giả, ảnh thật nhưng giao sách photocopy"
  → Đánh giá: vi phạm nghiêm trọng
  → Click "🗑 Xóa sản phẩm"
  → Prompt lý do: "Xác nhận hàng giả qua nhiều báo cáo — vi phạm điều khoản mục 3.2"
  → Confirm "Không thể hoàn tác" → Xác nhận
  → Toast "Đã xóa sản phẩm vi phạm"
  → Click "⚠ Cảnh báo Seller"
  → Prompt: "Sản phẩm của bạn đã bị xóa do xác nhận vi phạm bản quyền/hàng giả..."
  → Toast "Đã gửi cảnh báo đến Seller: Hoa Nguyen Books"
  → Vi phạm ghi vào lịch sử seller trong module Quản lý NCC
```

### 5.4 Luồng thêm danh mục mới

```
Admin → Tab "Quản lý danh mục"
  → Click "+ Thêm danh mục"
  → Form xuất hiện đầu danh sách
  → Chọn Loại: Thể loại
  → Icon: 🎯  Tên: Kỹ năng mềm  Mô tả: Kỹ năng giao tiếp, lãnh đạo
  → Click "Thêm danh mục"
  → Toast "Đã thêm danh mục: Kỹ năng mềm"
  → Card mới xuất hiện cuối nhóm "Thể loại"
```

### 5.5 Luồng xóa danh mục

```
Admin → Card danh mục "Văn học" → Click "🗑 Xóa"
  [Trường hợp 1: có sản phẩm]
  → Đếm: 12 sản phẩm thuộc "Văn học"
  → Toast đỏ: "Không thể xóa — có 12 sản phẩm đang thuộc danh mục Văn học.
                Hãy chuyển sản phẩm sang danh mục khác trước."
  → Hủy thao tác

  [Trường hợp 2: không có sản phẩm]
  → Confirm: "Xóa danh mục Kỹ năng mềm? Không thể hoàn tác."
  → Xác nhận → Toast "Đã xóa danh mục: Kỹ năng mềm"
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Tab Duyệt sản phẩm mới — Danh sách

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Duyệt sản phẩm 4]  [Kiểm duyệt nội dung 3]  [Quản lý danh mục]      │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│  │    4     │ │    1     │ │    2     │ │    1     │                 │
│  │ Chờ duyệt│ │Đã duyệt  │ │Cần chỉnh │ │ Từ chối  │                 │
│  │          │ │hôm nay   │ │sửa       │ │          │                 │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                 │
├────────────────────────────────────────────────────────────────────────┤
│  [Tìm theo tên sản phẩm, seller...]                                   │
├──────┬──────────────────────────────────┬──────────┬──────┬──────────┤
│      │ SẢN PHẨM                         │ DANH MỤC │ GIÁ  │ TRẠNG TH │
├──────┼──────────────────────────────────┼──────────┼──────┼──────────┤
│ [img]│ Toán 12 Nâng cao                 │ [Sách]   │89.000│[Chờ duyệt│ [Xem chi tiết]
│      │ Sách & VPP Minh Long · 10/06     │          │      │          │
├──────┼──────────────────────────────────┼──────────┼──────┼──────────┤
│ [img]│ Bộ bút viết Stabilo 10 màu       │ [VPP]    │75.000│[Cần sửa] │ [Xem chi tiết]
│      │ VPP An Khang · 09/06             │          │      │          │
└──────┴──────────────────────────────────┴──────────┴──────┴──────────┘
```

### 6.2 Chi tiết sản phẩm chờ duyệt

```
← Danh sách sản phẩm

┌─────────────────────────────────────────────────────────────────────┐
│ Toán 12 Nâng cao                    [Sách]   [Chờ duyệt]           │
│ Sách & VPP Minh Long · 10/06/2025 · 89.000đ                        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ TÁC GIẢ          │ NHÀ XUẤT BẢN     │ ISBN                 │   │
│  │ Nguyễn Văn Lâm   │ NXB Giáo dục VN  │ 978-604-0-12345-6   │   │
│  ├──────────────────┼──────────────────┼──────────────────────┤   │
│  │ GIÁ NIÊM YẾT     │ GIÁ BÁN          │ KHO HÀNG            │   │
│  │ 110.000đ         │ 89.000đ (−19%)   │ 250 cuốn            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ── Mô tả sản phẩm ─────────────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Sách Toán 12 Nâng cao biên soạn theo chương trình GDPT 2018 │   │
│  │ của Bộ GD&ĐT, phù hợp cho học sinh lớp 12 chuyên ban A...  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [✓ Duyệt sản phẩm]  [✎ Yêu cầu chỉnh sửa]  [✕ Từ chối]          │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Tab Kiểm duyệt nội dung

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                 │
│  │    3     │ │    2     │ │    8     │ │    2     │                 │
│  │ Chờ xử lý│ │Đang xem  │ │Đã giải   │ │ Đã xóa   │                 │
│  │          │ │xét       │ │quyết     │ │          │                 │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                 │
├────────────────────────────────────────────────────────────────────────┤
│  [img] Từ điển Tiếng Anh Oxford      [Sách]  [Hàng giả] 12/06 [Chờ] │ [Xem] [Ẩn]
│        Fahasa Official · 5 báo cáo                                    │
│                                                                        │
│  [img] Bộ compa 5 món Nhật Bản       [VPP]   [Sai mô tả] 11/06 [Chờ]│ [Xem] [Ẩn]
│        Dụng cụ học sinh · 3 báo cáo                                   │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Tab Quản lý danh mục

```
┌────────────────────────────────────────────────────────────────────────┐
│  [+ Thêm danh mục]                                                    │
│                                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ Loại: ○ Danh mục chính  ● Thể loại                              │  │
│  │ Icon: [🎯]  Tên: [Kỹ năng mềm______]                            │  │
│  │ Mô tả: [Kỹ năng giao tiếp, lãnh đạo_____________________]      │  │
│  │                          [Thêm danh mục]  [Hủy]                 │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  Danh mục chính                                                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐         │
│  │ 📚              │ │ ✏️              │ │ 🎒              │         │
│  │ Sách            │ │ Văn phòng phẩm  │ │ Thiết bị GD     │         │
│  │ Sách, tài liệu… │ │ Văn phòng phẩm  │ │ Thiết bị học tập│         │
│  │ 248 sản phẩm    │ │ 0 sản phẩm      │ │ 12 sản phẩm     │         │
│  │ [↑][↓]          │ │ [↑][↓]          │ │ [↑][↓]          │         │
│  │[Ẩn][Sửa][Xóa]  │ │[Ẩn][Sửa][Xóa]  │ │[Ẩn][Sửa][Xóa]  │         │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘         │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.5 Inline form chỉnh sửa trong card

```
  ┌─────────────────────────────────┐
  │ ✎ Chỉnh sửa                    │
  │                                 │
  │ Icon: [📖]                      │
  │ Tên: [Văn học________________]  │
  │ Mô tả: [Tiểu thuyết, truyện   ] │
  │        [ngắn, thơ ca...        ] │
  │                                 │
  │  [Lưu thay đổi]   [Hủy]        │
  └─────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Hiển thị danh sách sản phẩm chờ duyệt

- [ ] Tab "Duyệt sản phẩm" hiển thị badge đỏ với số sản phẩm `pending`
- [ ] Bảng hiển thị đúng: ảnh, tên sản phẩm, seller, ngày, danh mục, giá, trạng thái
- [ ] Tìm kiếm realtime hoạt động theo tên sản phẩm và tên seller
- [ ] Sản phẩm `approved`/`rejected` không hiển thị nút hành động

### AC-02: Chi tiết sản phẩm

- [ ] Mở chi tiết → đủ thông tin: tác giả, NXB, ISBN, giá, kho, mô tả
- [ ] Sản phẩm `need-edit` → banner xanh hiển thị đúng nội dung yêu cầu
- [ ] Sản phẩm `rejected` → banner đỏ hiển thị lý do từ chối

### AC-03: Duyệt sản phẩm

- [ ] Duyệt → confirm → Toast xác nhận
- [ ] `status` chuyển sang `approved`, `reviewedBy` và `reviewedAt` được ghi
- [ ] Sản phẩm đã duyệt không còn nút hành động

### AC-04: Yêu cầu chỉnh sửa và từ chối

- [ ] Yêu cầu chỉnh sửa: nội dung rỗng → toast cảnh báo, không lưu
- [ ] Yêu cầu chỉnh sửa thành công → `status='need-edit'`, banner xanh xuất hiện
- [ ] Từ chối: lý do rỗng → toast cảnh báo, không lưu
- [ ] Từ chối thành công → badge "Đã từ chối", banner đỏ hiển thị lý do

### AC-05: Danh sách sản phẩm bị báo cáo

- [ ] Tab "Kiểm duyệt" hiển thị badge đỏ với số sản phẩm `reported`
- [ ] Bảng hiển thị: ảnh, tên, seller, số báo cáo, loại vi phạm, ngày, trạng thái
- [ ] Badge loại vi phạm hiển thị đúng màu (đỏ cho fake/copyright, cam cho mislead)

### AC-06: Ẩn, bỏ ẩn, xóa sản phẩm vi phạm

- [ ] Ẩn → confirm → `status='hidden'`, badge cập nhật
- [ ] Bỏ ẩn → `status='reviewing'`
- [ ] Xóa → prompt lý do → confirm "không hoàn tác" → `status='deleted'`
- [ ] Sản phẩm `deleted` → không hiển thị nút hành động

### AC-07: Cảnh báo Seller từ báo cáo

- [ ] Gửi cảnh báo → tìm seller trong `activeSellers[]` theo tên shop
- [ ] Tìm thấy → thêm bản ghi vi phạm vào `violations[]` → toast thành công
- [ ] Không tìm thấy → toast thông báo rõ ràng

### AC-08: Hiển thị danh mục

- [ ] Grid hiển thị đúng 2 nhóm: Danh mục chính và Thể loại
- [ ] Card ẩn (`visible=false`) có opacity 55% và tag "Đang ẩn"
- [ ] Số sản phẩm trên card đếm đúng từ dữ liệu thực

### AC-09: Thêm danh mục mới

- [ ] Tên trống → toast cảnh báo "Vui lòng nhập tên danh mục"
- [ ] Tên trùng trong cùng nhóm → toast cảnh báo "Danh mục đã tồn tại"
- [ ] Thêm thành công → card mới xuất hiện cuối nhóm tương ứng

### AC-10: Sửa và sắp xếp danh mục

- [ ] Click "Sửa" → form inline xuất hiện trong card với giá trị hiện tại
- [ ] Hủy chỉnh sửa → dữ liệu không thay đổi
- [ ] ↑/↓ hoán đổi đúng vị trí trong cùng nhóm; không di chuyển xuyên nhóm
- [ ] Nút ↑ disabled khi là phần tử đầu tiên; ↓ disabled khi là phần tử cuối

### AC-11: Xóa danh mục

- [ ] Xóa khi có sản phẩm → toast cảnh báo rõ số sản phẩm ràng buộc
- [ ] Xóa khi không có sản phẩm → confirm → xóa thành công
- [ ] Ẩn/Hiện → toggle `visible`, card cập nhật ngay lập tức

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Admin duyệt nhầm sản phẩm giả mạo | Cao | Bổ sung checklist thẩm định bắt buộc (ISBN, NXB hợp lệ) trước khi cho phép duyệt |
| Xóa danh mục làm mất phân loại sản phẩm | Cao | Chặn xóa khi còn sản phẩm — giải pháp đã triển khai |
| Seller bị cảnh báo nhầm do báo cáo ác ý | Trung bình | Mỗi cảnh báo cần admin xem xét thủ công; cảnh báo không tự động khóa |
| Danh mục quá nhiều ảnh hưởng UX người mua | Thấp | Giới hạn số danh mục chính (≤ 8); khuyến khích dùng "ẩn" thay vì xóa |
| XSS qua nội dung sản phẩm từ seller | Trung bình | Mọi output qua `escHtml()` bắt buộc |
| Conflict dữ liệu khi cảnh báo seller không tìm thấy | Thấp | Toast thông báo rõ ràng; không throw silent error |
| Sản phẩm `need-edit` bị bỏ quên | Thấp | Badge đếm số `need-edit` trên stat card; xem xét email nhắc seller |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Upload ảnh sản phẩm thực** | Cho phép seller tải ảnh bìa thực thay vì dùng placeholder |
| P1 | **Thông báo email cho Seller** | Tự động gửi email khi sản phẩm được duyệt/từ chối/yêu cầu sửa |
| P1 | **Lịch sử duyệt sản phẩm** | Xem toàn bộ sản phẩm đã duyệt/từ chối theo thời gian |
| P2 | **Bulk action** | Duyệt/từ chối nhiều sản phẩm cùng lúc bằng checkbox |
| P2 | **Template lý do từ chối** | Danh sách lý do từ chối mẫu có sẵn để admin chọn nhanh |
| P2 | **Kéo thả sắp xếp danh mục** | Drag-and-drop thay thế nút ↑/↓ |
| P2 | **Lịch sử kiểm duyệt** | Audit log mọi hành động ẩn/xóa kèm admin thực hiện |
| P3 | **AI gợi ý phân loại** | Tự động gợi ý danh mục cho sản phẩm dựa trên tên và mô tả |
| P3 | **Dashboard thống kê kiểm duyệt** | Biểu đồ xu hướng vi phạm theo thời gian, theo seller, theo danh mục |
| P3 | **Quy trình kháng nghị** | Seller gửi kháng nghị khi sản phẩm bị từ chối; admin xét lại |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
