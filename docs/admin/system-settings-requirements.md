# Tài liệu Phân tích Yêu cầu
## Phân hệ Cài đặt Hệ thống — EduMart Admin

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Cài đặt Hệ thống (System Settings) cung cấp giao diện tập trung để quản trị viên cấu hình toàn bộ tham số vận hành của nền tảng EduMart — từ nhận diện thương hiệu, bật/tắt tính năng theo module, đến cổng thanh toán, chính sách vận chuyển, thuế và xác thực OAuth. Thay vì phải can thiệp trực tiếp vào code hoặc database, Admin có thể điều chỉnh hành vi hệ thống qua giao diện trực quan và lưu ngay lập tức.

Mục tiêu nghiệp vụ chính:
- Tập trung toàn bộ tham số cấu hình vào một phân hệ duy nhất, giảm sự phụ thuộc vào kỹ thuật viên
- Cho phép bật/tắt từng tính năng (module) linh hoạt theo giai đoạn triển khai
- Quản lý thông tin thanh toán và pháp lý (VAT, mã số thuế) đúng quy định
- Bảo mật thông tin xác thực OAuth thông qua cơ chế mask và cảnh báo

### 1.2 Phạm vi

| Nhóm | Mô tả |
|------|-------|
| **Cấu hình chung** | Tên website, logo, favicon, thông tin liên hệ, múi giờ, tiền tệ, bật/tắt module |
| **Cài đặt Thanh toán** | Cổng thanh toán (MoMo, ZaloPay, VNPAY), phí vận chuyển theo khu vực, thuế VAT |
| **Cài đặt OAuth** | Google OAuth, Facebook OAuth — cấu hình credentials và bật/tắt từng provider |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Quyền truy cập |
|-------|----------------|
| **Super Admin** | Toàn bộ tính năng: đọc và ghi tất cả cài đặt |
| **Content Admin** | Chỉ xem — không có quyền thay đổi cài đặt hệ thống |
| **Read-only Admin** | Không truy cập phân hệ này |

> **Lý do giới hạn chặt:** Cài đặt hệ thống ảnh hưởng đến toàn bộ hoạt động nền tảng — sai cấu hình thanh toán hoặc OAuth có thể gây mất giao dịch hoặc lộ thông tin xác thực. Chỉ Super Admin mới có đủ quyền hạn và trách nhiệm pháp lý để thay đổi các tham số này.

### 1.4 Điều kiện tiên quyết

- Người dùng đã đăng nhập với `role='admin'`
- Dữ liệu cấu hình khởi tạo trong `sysConfig`, `sysPayment`, `sysOAuth` (localStorage)
- Hàm `escHtml()`, `toast()`, `todayStr()`, `fmt()` đã có sẵn

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Cấu hình chung

Phân thành 3 sub-tab: **Thông tin chung** / **Ngôn ngữ & Khu vực** / **Tính năng**.

#### FR-01.1 Thông tin website

**Mô tả:** Giao diện 2 cột cho phép Admin cập nhật nhận diện thương hiệu và thông tin liên hệ.

**Trường cấu hình — Thông tin website:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tên website | Text | Có | Hiển thị trên tiêu đề trình duyệt, email, hóa đơn |
| Mô tả website | Textarea | Không | Meta description, dùng cho SEO |
| URL Logo | Text | Không | Đường dẫn tương đối hoặc tuyệt đối |
| URL Favicon | Text | Không | File `.ico` hoặc `.png` 32×32 |

**Trường cấu hình — Thông tin liên hệ:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Email hỗ trợ | Email | Không | Hiển thị trên trang liên hệ và footer |
| Hotline | Text | Không | Định dạng tự do (1900 XXXX, 0901...) |
| Địa chỉ | Textarea | Không | Địa chỉ trụ sở / chi nhánh chính |
| Facebook | Text | Không | URL trang Facebook chính thức |
| Zalo | Text | Không | Số điện thoại Zalo OA |

**Preview logo và favicon:** Hiển thị block preview trực quan sau khi nhập URL, cho phép Admin kiểm tra trước khi lưu.

**Validate:**

| Trường | Điều kiện lỗi |
|--------|--------------|
| Tên website | Rỗng sau `trim()` → toast lỗi, không lưu |

#### FR-01.2 Ngôn ngữ & Khu vực

**Mô tả:** Cài đặt các tham số địa phương hóa ảnh hưởng đến hiển thị trên toàn hệ thống.

| Cài đặt | Tùy chọn | Mặc định |
|---------|---------|---------|
| Múi giờ | Asia/Ho_Chi_Minh, Asia/Bangkok, Asia/Singapore, Asia/Tokyo, UTC | Asia/Ho_Chi_Minh |
| Đơn vị tiền tệ | VND (đ), USD ($), EUR (€) | VND |
| Định dạng ngày | DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD | DD/MM/YYYY |

**Preview tức thì:** Hiển thị ví dụ cụ thể (ngày hôm nay, giá mẫu) theo cài đặt hiện tại để Admin xác nhận kết quả trước khi lưu.

**Tác động của múi giờ:** Ảnh hưởng đến hiển thị giờ đơn hàng, thời gian Flash Sale, báo cáo doanh thu theo ngày.

#### FR-01.3 Quản lý tính năng (Module Toggles)

**Mô tả:** Grid các card tính năng, mỗi card có toggle switch bật/tắt độc lập.

**Danh sách module:**

| Module Key | Tên hiển thị | Mô tả |
|-----------|-------------|-------|
| `ebook` | Sách điện tử (Ebook) | Cho phép mua/bán file ebook |
| `vpp` | Văn phòng phẩm (VPP) | Danh mục văn phòng phẩm |
| `tbgd` | Thiết bị giáo dục | Thiết bị dạy học, thí nghiệm |
| `audiobook` | Sách nói (Audiobook) | Nội dung audio bản quyền |
| `blog` | Blog / Tin tức | Hệ thống bài viết & tin tức |
| `flashsale` | Flash Sale | Chương trình khuyến mãi theo giờ |
| `voucher` | Mã giảm giá | Hệ thống voucher toàn sàn |
| `points` | Điểm thưởng | Chương trình tích lũy điểm |
| `review` | Đánh giá sản phẩm | Cho phép người mua đánh giá |
| `chat` | Chat trực tiếp | Chat giữa buyer và seller |

**Hành vi toggle:**
- Toggle từng module → cập nhật `sysConfig.modules[key]` → `saveSysConfig()` → `renderAccount()` → toast phản hồi
- Module đang tắt hiển thị card với opacity giảm + badge "Đã tắt"
- Module đang bật hiển thị badge "✅ Đang hoạt động"

**Nút hàng loạt:**
- "Bật tất cả" → set toàn bộ `modules[key] = true`
- "Tắt tất cả" → set toàn bộ `modules[key] = false`

**Counter tổng quan:** Hiển thị "X/Y tính năng đang bật" ở đầu grid.

---

### 2.2 FR-02: Cài đặt Thanh toán

Phân thành 3 sub-tab: **Cổng thanh toán** / **Phí vận chuyển** / **Thuế (VAT)**.

#### FR-02.1 Cấu hình cổng thanh toán

**Mô tả:** Grid 3 card, mỗi card đại diện một cổng thanh toán.

**Cổng thanh toán được hỗ trợ:**

| ID | Tên | Loại | Mặc định |
|----|-----|------|---------|
| `momo` | MoMo | Ví điện tử | Bật (Sandbox) |
| `zalopay` | ZaloPay | Ví / Gateway | Bật (Sandbox) |
| `vnpay` | VNPAY | ATM, Visa, Master | Tắt (Production) |

**Thông tin mỗi card:**

| Trường | Hiển thị |
|--------|---------|
| Tên + Icon | Nhận diện cổng |
| Mô tả | Loại thanh toán hỗ trợ |
| Client ID / App ID | Hiển thị rõ (thường không nhạy cảm) |
| Secret Key | Masked `••••••••••••` — không hiển thị giá trị thật |
| Môi trường | Badge màu: 🟢 Sandbox (xanh) / 🔴 Production (vàng) |
| Trạng thái | "Đang hoạt động" / "Đã tắt" |

**Hành động:**
- **Toggle bật/tắt:** Nếu bật cổng chưa cấu hình đầy đủ → confirm cảnh báo trước
- **Nút Cấu hình:** Mở sequence 3 `prompt()` nhập Client ID, Secret Key, môi trường (sandbox/production). Secret Key chỉ cập nhật nếu người dùng nhập giá trị mới (để trống = giữ nguyên)

**Lưu ý bảo mật:** Secret Key chỉ lưu trong `localStorage` (môi trường demo). Ghi chú rõ trong UI rằng production cần dùng server-side secret management.

#### FR-02.2 Cấu hình phí vận chuyển

**Mô tả:** Form cho phép đặt ngưỡng miễn phí vận chuyển và phí từng khu vực địa lý.

**Ngưỡng miễn phí:**

| Trường | Loại | Ghi chú |
|--------|------|---------|
| Miễn phí vận chuyển từ (VNĐ) | Number | Đặt 0 để tắt chính sách miễn phí |

**Phí theo khu vực:**

| Khu vực | Phí mặc định |
|---------|-------------|
| TP. Hồ Chí Minh | 20.000 đ |
| Hà Nội | 25.000 đ |
| Miền Trung | 35.000 đ |
| Miền Bắc (ngoài HN) | 40.000 đ |
| Miền Nam (ngoài HCM) | 35.000 đ |
| Vùng xa / Hải đảo | 60.000 đ |

**Luồng lưu:** Đọc tất cả input đồng thời → validate số dương → `Object.assign` vào từng region → `saveSysPayment()` → toast.

#### FR-02.3 Cài đặt Thuế (VAT)

**Mô tả:** Cấu hình chính sách thuế GTGT và thông tin pháp lý xuất hóa đơn.

**Trường cấu hình:**

| Trường | Loại | Ghi chú |
|--------|------|---------|
| Bật tính VAT | Toggle | Bật/tắt toàn bộ tính năng thuế |
| Thuế suất VAT | Number (0–100%) | Áp dụng cho toàn bộ đơn hàng |
| Giá đã bao gồm VAT | Toggle | Ảnh hưởng đến cách hiển thị giá |
| Tên công ty | Text | Xuất hiện trên hóa đơn VAT |
| Mã số thuế | Text | Mã số thuế doanh nghiệp |
| Địa chỉ đăng ký KD | Text | Địa chỉ trên hóa đơn |

**Validate:**
- Thuế suất < 0 hoặc > 100 → toast lỗi, không lưu

**Tác động của "Giá đã bao gồm VAT":**
- `true`: Giá hiển thị đã gồm VAT → không cộng thêm khi thanh toán
- `false`: Giá hiển thị chưa gồm VAT → cộng thêm X% khi checkout

---

### 2.3 FR-03: Cài đặt OAuth

**Mô tả:** Grid 2 card — Google OAuth và Facebook OAuth. Mỗi card cấu hình độc lập.

#### FR-03.1 Cấu hình Google OAuth

**Trường cấu hình:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Bật Google Login | Toggle | — | Bật/tắt toàn bộ luồng Google OAuth |
| Client ID | Text | Khi bật | Định dạng `xxxxx.apps.googleusercontent.com` |
| Client Secret | Password | Khi bật | Nhập mới để thay thế; để trống giữ nguyên |
| Redirect URI | Text (readonly) | — | `https://edumart.vn/auth/google/callback` |

#### FR-03.2 Cấu hình Facebook OAuth

**Trường cấu hình:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Bật Facebook Login | Toggle | — | Bật/tắt toàn bộ luồng Facebook OAuth |
| App ID | Text | Khi bật | ID ứng dụng từ Meta Developer Portal |
| App Secret | Password | Khi bật | Nhập mới để thay thế; để trống giữ nguyên |
| Redirect URI | Text (readonly) | — | `https://edumart.vn/auth/facebook/callback` |

#### FR-03.3 Hành vi chung

**Toggle bật provider:**
```
Điều kiện: Client ID chứa 'placeholder' → confirm cảnh báo "chưa cấu hình đầy đủ"
→ p.enabled = !p.enabled
→ saveSysOAuth()
→ renderAccount()
→ toast phản hồi
```

**Lưu cấu hình (`doSaveOAuth`):**
- Client ID/App ID: cập nhật nếu không rỗng; giữ nguyên nếu rỗng
- Secret: chỉ cập nhật nếu người dùng nhập giá trị mới (bảo vệ secret cũ khỏi bị xóa nhầm)
- Redirect URI: readonly, không thay đổi được qua UI

**Nút hiện/ẩn Secret (`sysOAuthToggleSecret`):**
- Toggle `input.type` giữa `'password'` và `'text'`
- Icon nút đổi từ 👁 → 🙈 và ngược lại

**Kiểm tra kết nối (`doTestOAuth`):**
- Nếu provider đang tắt → toast cảnh báo
- Nếu Client ID chứa 'placeholder' → toast cảnh báo "chưa nhập đủ"
- Ngược lại → toast mô phỏng kết quả (môi trường demo)

---

## 3. Mô hình dữ liệu

### 3.1 `sysConfig` — Cấu hình chung

```javascript
{
  // Website identity
  siteName: string,        // 'EduMart'
  siteDesc: string,        // Meta description
  logoUrl: string,         // '/logo.png'
  faviconUrl: string,      // '/favicon.ico'

  // Contact
  email: string,           // 'support@edumart.vn'
  phone: string,           // '1900 1234'
  address: string,         // Địa chỉ đầy đủ
  facebook: string,        // URL trang Facebook
  zalo: string,            // SĐT Zalo OA

  // Locale
  timezone: string,        // 'Asia/Ho_Chi_Minh'
  currency: string,        // 'VND'
  currencySymbol: string,  // 'đ'
  dateFormat: string,      // 'DD/MM/YYYY'

  // Module toggles
  modules: {
    ebook: boolean,
    vpp: boolean,
    tbgd: boolean,
    audiobook: boolean,
    blog: boolean,
    flashsale: boolean,
    voucher: boolean,
    points: boolean,
    review: boolean,
    chat: boolean
  }
}
```

**localStorage key:** `sysConfig`

### 3.2 `sysPayment` — Cài đặt Thanh toán

```javascript
{
  gateways: [
    {
      id: string,          // 'momo' | 'zalopay' | 'vnpay'
      name: string,        // Tên hiển thị
      icon: string,        // Emoji icon
      enabled: boolean,
      clientId: string,    // Partner Code / App ID / TMN Code
      secretKey: string,   // Secret Key (masked trong UI)
      env: string,         // 'sandbox' | 'production'
      desc: string         // Mô tả ngắn
    }
  ],
  shipping: {
    freeThreshold: number, // Ngưỡng miễn phí (VNĐ), 0 = tắt
    regions: [
      {
        id: string,        // 'hcm' | 'hn' | 'central' | ...
        name: string,      // Tên khu vực
        fee: number        // Phí vận chuyển (VNĐ)
      }
    ]
  },
  tax: {
    vatEnabled: boolean,   // Bật/tắt tính VAT
    vatRate: number,       // Thuế suất % (0–100)
    vatIncluded: boolean,  // Giá hiển thị đã gồm VAT chưa
    taxCode: string,       // Mã số thuế doanh nghiệp
    companyName: string,   // Tên công ty
    taxAddress: string     // Địa chỉ đăng ký kinh doanh
  }
}
```

**localStorage key:** `sysPayment`

### 3.3 `sysOAuth` — Cài đặt OAuth

```javascript
{
  google: {
    enabled: boolean,
    clientId: string,      // xxx.apps.googleusercontent.com
    clientSecret: string,  // GOCSPX-...
    redirectUri: string    // https://edumart.vn/auth/google/callback
  },
  facebook: {
    enabled: boolean,
    appId: string,         // 16 chữ số
    appSecret: string,     // 32 ký tự hex
    redirectUri: string    // https://edumart.vn/auth/facebook/callback
  }
}
```

**localStorage key:** `sysOAuth`

---

## 4. Luồng hoạt động

### 4.1 Luồng cập nhật thông tin website

```
Admin → Tab "Cài đặt" → Sub-tab "Thông tin chung"
      → Chỉnh sửa các trường (tên site, logo, liên hệ...)
      → Xem preview logo/favicon
      → Nhấn "Lưu thay đổi"
          → Validate: tên website không rỗng?
              ✗ → Toast lỗi, giữ form
              ✓ → Đọc toàn bộ trường từ DOM
                → Object.assign vào sysConfig
                → saveSysConfig()
                → renderAccount()
                → Toast thành công
```

### 4.2 Luồng bật/tắt module tính năng

```
Admin → Sub-tab "Tính năng"
      → Xem grid các module (active count hiển thị đầu trang)
      → Toggle một module
          → sysConfig.modules[key] = !current
          → saveSysConfig()
          → renderAccount() (card module đổi màu + badge)
          → Toast: "✅ Đã bật: {Tên module}" hoặc "⚫ Đã tắt: {Tên module}"
      → [Tùy chọn] Nhấn "Tắt tất cả"
          → set toàn bộ modules[key] = false
          → Lưu + re-render + toast
```

### 4.3 Luồng cấu hình cổng thanh toán

```
Admin → Tab "Thanh toán" → Sub-tab "Cổng thanh toán"
      → Chọn cổng cần cấu hình → Nhấn "⚙️ Cấu hình"
          → Prompt 1: Client ID / App ID (giữ nguyên nếu để trống)
          → Prompt 2: Secret Key (giữ nguyên nếu để trống)
          → Prompt 3: Môi trường (sandbox/production — chỉ nhận 2 giá trị)
          → Cập nhật gateway object
          → saveSysPayment()
          → renderAccount()
          → Toast thành công
      → Toggle bật cổng
          → Kiểm tra credentials có phải placeholder?
              ✓ Có → confirm cảnh báo
          → Cập nhật enabled
          → Lưu + toast
```

### 4.4 Luồng cấu hình OAuth

```
Admin → Tab "OAuth"
      → Chọn provider (Google / Facebook)
      → Nhập Client ID / App ID
      → Nhập Secret (trường password) → [Tùy chọn] nhấn 👁 để xem
      → Kiểm tra Redirect URI trong developer console của provider
      → Nhấn "💾 Lưu cấu hình"
          → Client ID cập nhật nếu không rỗng
          → Secret cập nhật chỉ khi nhập giá trị mới
          → saveSysOAuth()
          → renderAccount()
          → Toast thành công
      → [Tùy chọn] Toggle bật provider
          → Kiểm tra App ID có phải placeholder?
              ✓ Có → confirm cảnh báo
          → Cập nhật enabled + lưu
      → [Tùy chọn] Nhấn "🧪 Kiểm tra kết nối"
          → Kiểm tra provider đang bật và credentials hợp lệ
          → Toast kết quả kiểm tra
```

---

## 5. Giao diện người dùng (UI Mockups)

### 5.1 Tab Cấu hình chung — Sub-tab Thông tin

```
┌─────────────────────────────────────────────────────────────────────┐
│ Cài đặt hệ thống                                                   │
│ [⚙️ Cấu hình chung] [💳 Thanh toán] [🔐 OAuth]                    │
│ [Thông tin chung] [Ngôn ngữ & Khu vực] [Tính năng]                │
├──────────────────────────────┬──────────────────────────────────────┤
│ 🏢 Thông tin website         │ 📞 Thông tin liên hệ               │
│                              │                                     │
│ Tên website *                │ Email hỗ trợ                       │
│ ┌────────────────────────┐   │ ┌────────────────────────────────┐  │
│ │ EduMart                │   │ │ support@edumart.vn             │  │
│ └────────────────────────┘   │ └────────────────────────────────┘  │
│                              │                                     │
│ Mô tả website                │ Hotline                            │
│ ┌────────────────────────┐   │ ┌────────────────────────────────┐  │
│ │ Sàn TMĐT sách & thiết  │   │ │ 1900 1234                      │  │
│ │ bị giáo dục...         │   │ └────────────────────────────────┘  │
│ └────────────────────────┘   │                                     │
│                              │ Địa chỉ                            │
│ [URL Logo] [URL Favicon]     │ ┌────────────────────────────────┐  │
│                              │ │ 123 Nguyễn Huệ, Q.1, HCM      │  │
│ ┌──────────────────────────┐ │ └────────────────────────────────┘  │
│ │ Logo preview  Fav. preview│ │                                     │
│ │ [📚 EduMart]  [📚]       │ │ [Facebook URL] [Zalo]              │
│ └──────────────────────────┘ │                                     │
│                              │ [💾 Lưu thay đổi]                 │
└──────────────────────────────┴──────────────────────────────────────┘
```

### 5.2 Sub-tab Tính năng

```
┌─────────────────────────────────────────────────────────────────────┐
│ 8/10 tính năng đang bật              [Bật tất cả] [Tắt tất cả]   │
│                                                                     │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────┐  │
│ │ 📖 Sách điện tử      │ │ ✏️ Văn phòng phẩm    │ │ 🔭 TB GD   │  │
│ │ Mua/bán file ebook   │ │ Danh mục VPP         │ │ Thiết bị   │  │
│ │              [ ●─ ] │ │              [ ●─ ] │ │     [ ─● ]│  │
│ │ ✅ Đang hoạt động    │ │ ✅ Đang hoạt động    │ │ ⚫ Đã tắt  │  │
│ └──────────────────────┘ └──────────────────────┘ └─────────────┘  │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────┐  │
│ │ 🎧 Audiobook         │ │ 📰 Blog / Tin tức    │ │ ⚡ Flash   │  │
│ │ Nội dung audio       │ │ Bài viết & tin tức   │ │ Sale       │  │
│ │              [ ●─ ] │ │              [ ●─ ] │ │     [ ●─ ]│  │
│ │ ✅ Đang hoạt động    │ │ ✅ Đang hoạt động    │ │ ✅ Hoạt động│ │
│ └──────────────────────┘ └──────────────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Tab Thanh toán — Cổng thanh toán

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Cổng thanh toán] [Phí vận chuyển] [Thuế (VAT)]                   │
│                                                                     │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────┐  │
│ │ 💜 MoMo         [ ●]│ │ 🔵 ZaloPay      [ ●]│ │🔴 VNPAY [○]│  │
│ │ Ví điện tử MoMo      │ │ Ví ZaloPay Gateway   │ │ ATM,Visa   │  │
│ │──────────────────────│ │──────────────────────│ │────────────│  │
│ │ Client ID            │ │ App ID               │ │ TMN Code   │  │
│ │ MOMOPAY_PARTNER...   │ │ 553035               │ │ EDUMART01  │  │
│ │ Secret Key           │ │ Secret Key           │ │ Secret Key │  │
│ │ ••••••••••••         │ │ ••••••••••••         │ │ ••••••••   │  │
│ │ Môi trường           │ │ Môi trường           │ │ Môi trường │  │
│ │ 🟢 Sandbox           │ │ 🟢 Sandbox           │ │🔴 Production│ │
│ │──────────────────────│ │──────────────────────│ │────────────│  │
│ │ [⚙️ Cấu hình] Đang  │ │ [⚙️ Cấu hình] Đang  │ │[⚙️ Cấu hình│  │
│ │             hoạt động│ │             hoạt động│ │     Đã tắt │  │
│ └──────────────────────┘ └──────────────────────┘ └─────────────┘  │
│                                                                     │
│ 💡 Sandbox: kiểm thử, không phát sinh giao dịch thật.             │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.4 Tab OAuth

```
┌─────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────┐ ┌──────────────────────┐  │
│ │ 🔴 Google OAuth            [Bật ●─ ] │ │ 🔵 Facebook OAuth    │  │
│ │ ✅ Đang bật                           │ │ ⚫ Đã tắt     [○ ─ ]│  │
│ │                                       │ │                      │  │
│ │ Client ID                             │ │ App ID               │  │
│ │ ┌───────────────────────────────────┐ │ │ ┌──────────────────┐ │  │
│ │ │ 123456789-abcdef.googleuser...    │ │ │ │ 1234567890123456 │ │  │
│ │ └───────────────────────────────────┘ │ │ └──────────────────┘ │  │
│ │                                       │ │                      │  │
│ │ Client Secret                         │ │ App Secret           │  │
│ │ ┌─────────────────────────────┐ [👁] │ │ ┌────────────────┐[👁│  │
│ │ │ ••••••••••••••••••••••••••• │     │ │ │ ••••••••••••   │   │  │
│ │ └─────────────────────────────┘     │ │ └────────────────┘   │  │
│ │                                       │ │                      │  │
│ │ Redirect URI (readonly)               │ │ Redirect URI         │  │
│ │ https://edumart.vn/auth/google/...    │ │ https://edumart.vn/  │  │
│ │                                       │ │ auth/facebook/...    │  │
│ │ [💾 Lưu cấu hình] [🧪 Kiểm tra]     │ │ [💾 Lưu] [🧪 Test]  │  │
│ └───────────────────────────────────────┘ └──────────────────────┘  │
│ 🔐 Không bao giờ commit Secret vào source code. Dùng env vars.     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu suất

| Yêu cầu | Mức độ |
|---------|--------|
| Lưu cài đặt (bất kỳ) | < 200ms (localStorage write + re-render) |
| Toggle module | Tức thì — không có animation delay |
| Chuyển sub-tab | Tức thì — pure re-render không fetch API |

### 6.2 Bảo mật

| Quy tắc | Áp dụng |
|---------|---------|
| Escape HTML đầu vào | `escHtml()` trước khi render tên site, địa chỉ, tên công ty |
| Mask Secret Key | Gateway secretKey hiển thị `••••••••••••`, không bao giờ render giá trị thật |
| Mask OAuth Secret | Input type `password`, toggle hiện/ẩn theo yêu cầu |
| Cảnh báo credentials | Toast / confirm khi bật provider chưa cấu hình |
| Thông báo in-UI | Ghi chú rõ "không commit secret vào source code" ngay trong giao diện |
| Validate kiểu dữ liệu | Thuế suất: 0–100; phí vận chuyển: ≥ 0; không cho phép NaN |

### 6.3 Khả năng sử dụng (UX)

| Yêu cầu | Chi tiết |
|---------|---------|
| Responsive | 2-cột → 1-cột ở viewport < 900px |
| Toggle switch | CSS thuần, không cần thư viện, accessible với keyboard |
| Preview trực quan | Logo/favicon preview ngay khi nhập URL, locale preview theo cài đặt hiện tại |
| Readonly URI | Redirect URI không chỉnh sửa được, có hint giải thích |
| Secret giữ nguyên | Để trống trường Secret khi lưu = giữ giá trị cũ (tránh xóa nhầm) |

### 6.4 Lưu trữ

| Key | Kiểu | Ghi chú |
|-----|------|---------|
| `sysConfig` | Object | Khởi tạo seed nếu `null` |
| `sysPayment` | Object | Khởi tạo seed với 3 gateway + 6 khu vực |
| `sysOAuth` | Object | Khởi tạo seed với Google (bật) + Facebook (tắt) |

---

## 7. Tiêu chí chấp nhận

### 7.1 Cấu hình chung

| # | Tiêu chí |
|---|---------|
| AC-01 | Lưu thành công khi tên website không rỗng |
| AC-02 | Toast lỗi khi tên website rỗng, form không bị reset |
| AC-03 | Preview logo/favicon hiển thị đúng sau khi cập nhật URL |
| AC-04 | Select múi giờ, tiền tệ, định dạng ngày render đúng giá trị đang lưu |
| AC-05 | Preview ngày/tiền cập nhật theo cài đặt mới sau khi lưu |
| AC-06 | Toggle module đơn lẻ đổi trạng thái đúng, toast hiển thị tên module |
| AC-07 | "Tắt tất cả" đặt toàn bộ module = false; counter "0/10" |
| AC-08 | "Bật tất cả" đặt toàn bộ module = true; counter "10/10" |
| AC-09 | Module đang tắt hiển thị card opacity giảm + badge "⚫ Đã tắt" |

### 7.2 Thanh toán

| # | Tiêu chí |
|---|---------|
| AC-10 | Secret Key của gateway luôn hiển thị masked (`••••••••••••`) |
| AC-11 | Bật gateway chưa cấu hình hiện confirm cảnh báo |
| AC-12 | Nút "Cấu hình" mở 3 prompt theo đúng thứ tự: Client ID → Secret → Môi trường |
| AC-13 | Để trống Secret trong prompt = giữ nguyên giá trị cũ |
| AC-14 | Môi trường chỉ nhận `sandbox` hoặc `production`, giá trị khác bị bỏ qua |
| AC-15 | Lưu phí vận chuyển cập nhật đúng từng region, ngưỡng miễn phí |
| AC-16 | Thuế suất < 0 hoặc > 100 → toast lỗi, không lưu |
| AC-17 | Toggle "Bật tính VAT" ảnh hưởng đúng đến `tax.vatEnabled` |

### 7.3 OAuth

| # | Tiêu chí |
|---|---------|
| AC-18 | Input Secret mặc định type=password, icon 👁 chuyển thành 🙈 khi hiển thị |
| AC-19 | Redirect URI là readonly — không chỉnh sửa được |
| AC-20 | Lưu với Client ID rỗng → giữ nguyên giá trị cũ |
| AC-21 | Lưu với Secret rỗng → giữ nguyên Secret cũ |
| AC-22 | Bật provider khi App ID chứa 'placeholder' → confirm cảnh báo |
| AC-23 | "Kiểm tra kết nối" khi provider đang tắt → toast cảnh báo |
| AC-24 | "Kiểm tra kết nối" khi credentials hợp lệ → toast thành công |
| AC-25 | Hai provider (Google, Facebook) lưu độc lập nhau |

---

## 8. Rủi ro và Giải pháp

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Secret Key lưu trong localStorage có thể bị đọc qua DevTools | Cao | Cảnh báo rõ trong UI; đây là giới hạn demo — production phải dùng server-side secret storage |
| R-02 | Admin tắt nhầm module đang có seller/buyer phụ thuộc | Trung bình | Toast mô tả tác động; P2: thêm modal cảnh báo "X sản phẩm đang active trong module này" |
| R-03 | Admin nhập sai Redirect URI → OAuth bị lỗi | Thấp | URI là readonly, không thể sửa qua UI; có hint hướng dẫn đăng ký đúng trong Developer Console |
| R-04 | Cổng VNPAY Production vô tình được bật trong môi trường test | Trung bình | Badge màu vàng nổi bật cho Production; confirm khi bật cổng Production |
| R-05 | Thuế VAT cấu hình sai → sai giá hiển thị toàn sàn | Cao | Validate range 0–100%; preview tức thì ảnh hưởng; P2: cần approval 2 người cho thay đổi VAT |

---

## 9. Lộ trình phát triển

### P1 — Đã triển khai (phiên bản hiện tại)

- [x] Thông tin website: tên, mô tả, logo, favicon, liên hệ
- [x] Preview logo/favicon trực quan
- [x] Ngôn ngữ & Khu vực: múi giờ, tiền tệ, định dạng ngày với preview
- [x] Bật/tắt 10 module tính năng, nút Bật/Tắt tất cả
- [x] Cấu hình 3 cổng thanh toán với masked secret
- [x] Phí vận chuyển 6 khu vực + ngưỡng miễn phí
- [x] Cài đặt VAT + thông tin doanh nghiệp xuất hóa đơn
- [x] Google OAuth và Facebook OAuth với toggle, secret mask, kiểm tra kết nối

### P2 — Phát triển tiếp theo

- [ ] Modal cảnh báo tác động khi tắt module có dữ liệu phụ thuộc
- [ ] Audit log: lưu lịch sử thay đổi cài đặt (ai thay đổi gì, lúc nào)
- [ ] Export/Import cấu hình (JSON backup)
- [ ] Kiểm tra kết nối gateway thanh toán thực tế (ping API sandbox)
- [ ] Phê duyệt 2 người cho thay đổi VAT và cổng Production

### P3 — Tính năng nâng cao

- [ ] Secret Manager tích hợp (HashiCorp Vault, AWS Secrets Manager)
- [ ] Webhook cấu hình để nhận sự kiện từ cổng thanh toán
- [ ] Đa ngôn ngữ (i18n) — cài đặt ngôn ngữ giao diện Admin
- [ ] Thêm cổng thanh toán: ShopeePay, ViettelMoney, ngân hàng nội địa
- [ ] OAuth bổ sung: Apple ID, Microsoft, GitHub (cho seller/developer)
- [ ] White-label: cho phép đối tác tùy chỉnh logo/màu sắc từng tenant

---

*Tài liệu này mô tả phân hệ Cài đặt Hệ thống đã được triển khai trong phiên bản demo của EduMart Admin. Thông tin xác thực (Client ID, Secret Key, App Secret) trong seed data là giá trị placeholder, không có hiệu lực trong môi trường thực.*
