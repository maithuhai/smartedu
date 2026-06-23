# Sơ đồ UML & Mô tả Luồng Hoạt động
## Phân hệ Quản trị viên — EduMart

**Phiên bản:** 1.0 | **Ngày:** 20/06/2026  
**Phạm vi:** 6 phân hệ quản trị (Người dùng · Nhà cung cấp · Sản phẩm · Đơn hàng · Tài chính · Nội dung)  
**Định dạng:** Mermaid — render trong VS Code (Markdown Preview), GitHub, Obsidian

---

## Phần A — Tổng quan hệ thống

### A.1 Sơ đồ Use Case tổng quan

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef module fill:#d5e8d4,stroke:#82b366,color:#000
    classDef moduleRO fill:#fff2cc,stroke:#d6b656,color:#000

    SA(["👤 Super Admin"]):::actor
    CA(["👤 Content Admin"]):::actor
    RA(["👤 Read-only Admin"]):::actor

    subgraph SYS["🖥️  Hệ thống Quản trị EduMart"]
        direction TB
        M1["📊 Tổng quan Dashboard"]:::module
        M2["👥 Quản lý Người dùng"]:::module
        M3["🏪 Quản lý Nhà cung cấp"]:::module
        M4["📦 Quản lý Sản phẩm"]:::module
        M5["📋 Quản lý Đơn hàng"]:::module
        M6["💰 Quản lý Tài chính"]:::module
        M7["📝 Quản lý Nội dung"]:::module
    end

    SA --> M1 & M2 & M3 & M4 & M5 & M6 & M7
    CA --> M1 & M4 & M7
    RA --> M1 & M2 & M3 & M4 & M5
```

### A.2 Bảng phân quyền Actor

| Phân hệ | Super Admin | Content Admin | Read-only Admin |
|---------|:-----------:|:-------------:|:---------------:|
| Dashboard Tổng quan | ✅ Toàn quyền | ✅ Xem | ✅ Xem |
| Quản lý Người dùng | ✅ Toàn quyền | ❌ | ✅ Xem |
| Quản lý Nhà cung cấp | ✅ Toàn quyền | ❌ | ✅ Xem |
| Quản lý Sản phẩm | ✅ Toàn quyền | ✅ Duyệt, kiểm duyệt | ✅ Xem |
| Quản lý Đơn hàng | ✅ Toàn quyền | ❌ | ✅ Xem |
| Quản lý Tài chính | ✅ Toàn quyền | ❌ | ❌ |
| Quản lý Nội dung | ✅ Toàn quyền | ✅ Blog, Bình luận, Banner | ❌ |

---

## Phần B — Quản lý Người dùng

### B.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor
    RA(["👤 Read-only Admin"]):::actor

    subgraph DS["📋 Xem & Tìm kiếm"]
        direction TB
        b1["Xem danh sách người dùng"]:::uc
        b2["Tìm kiếm theo tên / email"]:::uc
        b3["Lọc theo vai trò / trạng thái"]:::uc
        b4["Phân trang kết quả"]:::uc
    end

    subgraph QL["⚙️ Quản lý tài khoản"]
        direction TB
        b5["Xem chi tiết tài khoản"]:::uc
        b6["Xem lịch sử đăng nhập"]:::uc
        b7["Xem thống kê đơn hàng"]:::uc
        b8["Khóa tài khoản"]:::ucSuper
        b9["Mở khóa tài khoản"]:::ucSuper
        b10["Đặt lại mật khẩu"]:::ucSuper
    end

    subgraph ADM["🔑 Quản lý Admin"]
        direction TB
        b11["Tạo tài khoản Admin mới"]:::ucSuper
        b12["Chỉnh sửa cấp quyền"]:::ucSuper
        b13["Xóa tài khoản Admin"]:::ucSuper
    end

    SA --> b1 & b2 & b3 & b4 & b5 & b6 & b7 & b8 & b9 & b10 & b11 & b12 & b13
    RA --> b1 & b2 & b3 & b4 & b5 & b6 & b7
```

---

### B.2 Biểu đồ hoạt động: Khóa / Mở khóa tài khoản

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Quản lý Người dùng]
    A --> B[Hệ thống hiển thị danh sách\n10 bản ghi / trang]
    B --> C[Admin tìm kiếm hoặc lọc\ntheo vai trò / trạng thái]
    C --> D{Tìm thấy\ntài khoản?}
    D -->|Không| C
    D -->|Có| E[Click nút Xem trên dòng tài khoản]
    E --> F[Hệ thống hiển thị trang chi tiết:\nthông tin, lịch sử, đơn hàng]
    F --> G{Trạng thái\nhiện tại?}
    G -->|active| H[Hiện nút Khóa tài khoản]
    G -->|locked| I[Hiện nút Mở khóa tài khoản]
    H --> J[Admin click Khóa]
    I --> K[Admin click Mở khóa]
    J --> L[Hiện confirm dialog\nkèm tên người dùng]
    K --> M[Hiện confirm dialog\nkèm tên người dùng]
    L --> N{Admin\nxác nhận?}
    M --> O{Admin\nxác nhận?}
    N -->|Hủy| F
    O -->|Hủy| F
    N -->|Xác nhận| P["Cập nhật:\nstatus = 'locked'\nlockedAt = today"]
    O -->|Xác nhận| Q["Cập nhật:\nstatus = 'active'\nlockedAt = null"]
    P --> R[Toast: Đã khóa tài khoản]
    Q --> T[Toast: Đã mở khóa tài khoản]
    R --> U[Re-render: badge đỏ Bị khóa]
    T --> V[Re-render: badge xanh Hoạt động]
    U --> Z([🔴 Kết thúc])
    V --> Z
```

**Mô tả luồng:**

| Bước | Actor | Hành động | Kết quả |
|------|-------|-----------|---------|
| 1 | Admin | Truy cập Quản lý Người dùng | Danh sách 10 bản ghi/trang hiển thị |
| 2 | Admin | Tìm kiếm / lọc theo vai trò, trạng thái | Kết quả thu hẹp realtime |
| 3 | Admin | Click "Xem" trên dòng tài khoản cần xử lý | Trang chi tiết mở |
| 4 | Hệ thống | Kiểm tra `status` tài khoản | Hiện nút phù hợp (Khóa / Mở khóa) |
| 5 | Admin | Click nút Khóa / Mở khóa | Confirm dialog xuất hiện |
| 6a | Admin | Hủy confirm | Không thay đổi, quay về chi tiết |
| 6b | Admin | Xác nhận | Hệ thống cập nhật `status`, `lockedAt` |
| 7 | Hệ thống | Gọi `saveUsers()`, re-render | Toast xác nhận + badge cập nhật |

---

### B.3 Biểu đồ hoạt động: Tạo tài khoản Admin mới

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Quản lý Admin]
    A --> B[Hệ thống hiển thị danh sách\ncác tài khoản admin hiện tại]
    B --> C[Admin click + Thêm tài khoản Admin]
    C --> D[Form tạo Admin xuất hiện:\nHọ tên, Email, Mật khẩu, Cấp quyền]
    D --> E[Admin điền form]
    E --> F{Validation\nForm?}
    F -->|Thiếu trường bắt buộc| G[Toast cảnh báo\ntrường còn thiếu]
    G --> E
    F -->|Email đã tồn tại| H[Toast: Email đã được sử dụng]
    H --> E
    F -->|Hợp lệ| I[Hệ thống tạo object Admin:\nid, name, email, role=admin,\nlevel, createdAt]
    I --> J[Lưu vào users array\ngọi saveUsers]
    J --> K[Toast: Đã tạo tài khoản Admin]
    K --> L[Re-render danh sách\nAdmin mới xuất hiện]
    L --> Z([🔴 Kết thúc])

    D --> M[Admin chọn Cấp quyền]
    M --> M1{Loại cấp quyền?}
    M1 -->|super| M2[Toàn bộ quyền hạn]
    M1 -->|content| M3[Sản phẩm và Nội dung]
    M1 -->|readonly| M4[Chỉ xem báo cáo]
    M2 & M3 & M4 --> F
```

**Mô tả luồng:**

| Bước | Actor | Hành động | Kết quả |
|------|-------|-----------|---------|
| 1 | Admin | Mở tab Quản lý Admin | Danh sách admin hiện tại |
| 2 | Admin | Click "+ Thêm tài khoản Admin" | Form tạo mới xuất hiện |
| 3 | Admin | Điền Họ tên, Email, Mật khẩu | — |
| 4 | Admin | Chọn Cấp quyền (super/content/readonly) | Quyết định phạm vi truy cập |
| 5 | Hệ thống | Validate: trường bắt buộc, email unique | Toast cảnh báo nếu lỗi |
| 6 | Hệ thống | Tạo object, lưu, re-render | Toast xác nhận, admin mới trong danh sách |

---

## Phần C — Quản lý Nhà cung cấp

### C.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor

    subgraph REG["📝 Duyệt đăng ký Seller"]
        direction TB
        c1["Xem danh sách hồ sơ chờ duyệt"]:::uc
        c2["Xem chi tiết hồ sơ\n(CCCD, GPKD, thông tin shop)"]:::uc
        c3["Duyệt hồ sơ đăng ký"]:::ucSuper
        c4["Từ chối (có lý do)"]:::ucSuper
        c5["Yêu cầu bổ sung thông tin"]:::ucSuper
    end

    subgraph ACT["🏪 Quản lý Seller hoạt động"]
        direction TB
        c6["Xem danh sách Seller"]:::uc
        c7["Xem thống kê bán hàng"]:::uc
        c8["Xem lịch sử vi phạm"]:::uc
        c9["Gửi cảnh báo vi phạm"]:::ucSuper
        c10["Đình chỉ tài khoản Seller"]:::ucSuper
        c11["Khóa tài khoản Seller"]:::ucSuper
    end

    subgraph COM["💹 Cài đặt hoa hồng"]
        direction TB
        c12["Xem hoa hồng theo danh mục"]:::uc
        c13["Đặt % hoa hồng theo danh mục"]:::ucSuper
        c14["Đặt hoa hồng đặc biệt cho Seller"]:::ucSuper
        c15["Xem lịch sử thay đổi hoa hồng"]:::uc
    end

    SA --> c1 & c2 & c3 & c4 & c5
    SA --> c6 & c7 & c8 & c9 & c10 & c11
    SA --> c12 & c13 & c14 & c15
```

---

### C.2 Biểu đồ hoạt động: Duyệt đăng ký Seller

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Duyệt đăng ký]
    A --> B[Hệ thống hiển thị danh sách\nhồ sơ pending / more-info]
    B --> C[Admin click Xem hồ sơ]
    C --> D[Trang chi tiết hồ sơ:\nThông tin cá nhân, CCCD, GPKD,\nTên shop, Mô tả, Danh mục]
    D --> E{Admin đánh giá\nhồ sơ}
    E -->|Đầy đủ, hợp lệ| F[Click Duyệt hồ sơ]
    E -->|Thiếu thông tin| G[Click Yêu cầu bổ sung]
    E -->|Vi phạm / Không hợp lệ| H[Click Từ chối]
    F --> F1[Confirm dialog]
    F1 -->|Hủy| D
    F1 -->|Xác nhận| F2["status = 'approved'\nreviewedAt = today\nreviewedBy = Admin\nShop tạo trong activeSellers"]
    F2 --> F3[Toast: Đã duyệt — Seller mới hoạt động]
    G --> G1[Prompt: Nhập yêu cầu bổ sung]
    G1 -->|Hủy hoặc rỗng| D
    G1 -->|Có nội dung| G2["status = 'more-info'\nreviewNote = nội dung yêu cầu"]
    G2 --> G3[Toast: Đã gửi yêu cầu bổ sung]
    H --> H1[Prompt: Nhập lý do từ chối]
    H1 -->|Hủy hoặc rỗng| D
    H1 -->|Có lý do| H2["status = 'rejected'\nreviewNote = lý do\nreviewedAt = today"]
    H2 --> H3[Toast: Đã từ chối hồ sơ]
    F3 & G3 & H3 --> Z([🔴 Kết thúc])
```

**Mô tả luồng:**

| Bước | Actor | Hành động | Kết quả |
|------|-------|-----------|---------|
| 1 | Admin | Vào tab Duyệt đăng ký | Danh sách hồ sơ `pending` + `more-info` |
| 2 | Admin | Click "Xem hồ sơ" | Trang chi tiết CCCD, GPKD, thông tin shop |
| 3a | Admin | Duyệt | Confirm → `status='approved'`, tạo shop trong `activeSellers` |
| 3b | Admin | Yêu cầu bổ sung | Prompt lý do → `status='more-info'`, banner xanh xuất hiện |
| 3c | Admin | Từ chối | Prompt lý do (bắt buộc) → `status='rejected'`, banner đỏ |
| 4 | Hệ thống | Lưu và re-render | Toast + badge cập nhật |

---

### C.3 Biểu đồ hoạt động: Xử lý vi phạm Seller (Cảnh báo → Đình chỉ → Khóa)

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin xem danh sách Seller hoạt động]
    A --> B[Click vào Seller cần xem]
    B --> C[Trang chi tiết:\nThống kê, lịch sử vi phạm, tab Cảnh báo]
    C --> D{Mức độ\nvi phạm?}
    D -->|Nhẹ - lần đầu| E[Admin click Gửi cảnh báo]
    D -->|Nghiêm trọng| F[Admin click Đình chỉ]
    D -->|Rất nghiêm trọng| G[Admin click Khóa tài khoản]
    E --> E1[Prompt: Nhập nội dung cảnh báo]
    E1 -->|Rỗng| C
    E1 -->|Có nội dung| E2["Thêm violation:\n{type, desc, severity='low', date}"]
    E2 --> E3["status vẫn = 'active'\nviolationCount tăng"]
    E3 --> E4[Toast: Đã gửi cảnh báo đến Seller]
    F --> F1[Prompt: Lý do + Thời gian đình chỉ]
    F1 -->|Rỗng| C
    F1 -->|Có lý do| F2["status = 'suspended'\nsuspendedUntil = ngày kết thúc\nsuspendedReason = lý do"]
    F2 --> F3[Toast: Đã đình chỉ Seller]
    G --> G1[Prompt: Lý do khóa vĩnh viễn]
    G1 -->|Rỗng| C
    G1 -->|Có lý do| G2["status = 'locked'\nlockedReason = lý do\nlockedAt = today"]
    G2 --> G3[Toast: Đã khóa tài khoản Seller]
    E4 & F3 & G3 --> H[Lưu dữ liệu: saveActiveSellers]
    H --> I[Re-render: badge trạng thái cập nhật]
    I --> Z([🔴 Kết thúc])
```

**Mô tả luồng:**

| Bước | Hành động | Trạng thái Seller | Mức độ |
|------|-----------|-------------------|--------|
| Cảnh báo | Ghi vi phạm, `violationCount++` | Vẫn `active` | Nhẹ |
| Đình chỉ | Set `suspended` + `suspendedUntil` | `suspended` | Vừa |
| Khóa | Set `locked` vĩnh viễn | `locked` | Nặng |
| Tất cả | Lý do bắt buộc, không được để rỗng | — | — |

---

## Phần D — Quản lý Sản phẩm

### D.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor
    CA(["👤 Content Admin"]):::actor

    subgraph PEN["📥 Duyệt sản phẩm mới"]
        direction TB
        d1["Xem danh sách sản phẩm chờ duyệt"]:::uc
        d2["Xem chi tiết sản phẩm\n(tác giả, NXB, ISBN, mô tả, giá)"]:::uc
        d3["Duyệt sản phẩm"]:::ucSuper
        d4["Yêu cầu chỉnh sửa"]:::ucSuper
        d5["Từ chối sản phẩm"]:::ucSuper
    end

    subgraph MOD["🚨 Kiểm duyệt nội dung"]
        direction TB
        d6["Xem sản phẩm bị báo cáo"]:::uc
        d7["Xem chi tiết tố cáo"]:::uc
        d8["Ẩn sản phẩm vi phạm"]:::ucSuper
        d9["Bỏ ẩn sản phẩm"]:::ucSuper
        d10["Xóa sản phẩm vi phạm"]:::ucSuper
        d11["Gửi cảnh báo đến Seller"]:::ucSuper
    end

    subgraph CAT["📂 Quản lý danh mục"]
        direction TB
        d12["Xem danh mục và thể loại"]:::uc
        d13["Thêm danh mục / thể loại"]:::ucSuper
        d14["Chỉnh sửa danh mục"]:::ucSuper
        d15["Sắp xếp thứ tự hiển thị"]:::ucSuper
        d16["Ẩn / Hiện danh mục"]:::ucSuper
        d17["Xóa danh mục\n(kiểm tra ràng buộc)"]:::ucSuper
    end

    SA --> d1 & d2 & d3 & d4 & d5 & d6 & d7 & d8 & d9 & d10 & d11
    SA --> d12 & d13 & d14 & d15 & d16 & d17
    CA --> d1 & d2 & d3 & d4 & d5 & d6 & d7 & d8 & d10 & d11
```

---

### D.2 Biểu đồ hoạt động: Duyệt sản phẩm mới

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Duyệt sản phẩm mới]
    A --> B[Hiển thị danh sách pending + need-edit]
    B --> C[Admin tìm kiếm theo tên / seller]
    C --> D[Click Xem chi tiết sản phẩm]
    D --> E[Xem: Tên, tác giả, NXB, ISBN,\nGiá, Mô tả, Kênh phân phối]
    E --> F{Đánh giá\nnội dung?}
    F -->|Đầy đủ, hợp lệ| G[Click Duyệt sản phẩm]
    F -->|Thiếu thông tin| H[Click Yêu cầu chỉnh sửa]
    F -->|Vi phạm| I[Click Từ chối]
    G --> G1[Confirm dialog]
    G1 -->|Hủy| E
    G1 -->|Xác nhận| G2["status = 'approved'\nreviewedBy, reviewedAt ghi nhận\nSản phẩm xuất hiện trên sàn"]
    G2 --> G3[Toast: Đã duyệt sản phẩm]
    H --> H1[Prompt: Nhập nội dung yêu cầu]
    H1 -->|Rỗng| E
    H1 -->|Có nội dung| H2["status = 'need-edit'\nreviewNote = yêu cầu\nBanner xanh hiện trên trang"]
    H2 --> H3[Toast: Đã gửi yêu cầu chỉnh sửa]
    I --> I1[Prompt: Nhập lý do từ chối]
    I1 -->|Rỗng| E
    I1 -->|Có lý do| I2["status = 'rejected'\nreviewNote = lý do\nBanner đỏ hiện trên trang"]
    I2 --> I3[Toast: Đã từ chối sản phẩm]
    G3 & H3 & I3 --> Z([🔴 Kết thúc])
```

**Mô tả luồng:**

| Bước | Actor | Hành động | Điều kiện / Kết quả |
|------|-------|-----------|---------------------|
| 1 | Admin | Xem danh sách chờ duyệt | Badge đỏ số sản phẩm `pending` |
| 2 | Admin | Xem chi tiết sản phẩm | Đầy đủ: tác giả, NXB, ISBN, giá, kho, mô tả |
| 3a | Admin | Duyệt | Confirm → `approved`, sản phẩm lên sàn |
| 3b | Admin | Yêu cầu sửa | Prompt (bắt buộc) → `need-edit`, banner xanh; Seller được sửa và nộp lại |
| 3c | Admin | Từ chối | Prompt (bắt buộc) → `rejected`, banner đỏ; Seller không nộp lại |

---

### D.3 Biểu đồ hoạt động: Xử lý sản phẩm vi phạm

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Kiểm duyệt nội dung]
    A --> B[Hệ thống hiển thị sản phẩm bị báo cáo\nsắp xếp theo số lần báo cáo]
    B --> C[Click Xem chi tiết sản phẩm bị báo cáo]
    C --> D[Hiển thị: thông tin SP + nội dung tố cáo\nloại vi phạm: fake/copyright/mislead/other]
    D --> E{Mức độ\nvi phạm?}
    E -->|Nghi vấn, cần xem xét| F["Click Ẩn sản phẩm\n(pending investigation)"]
    E -->|Xác nhận vi phạm nhẹ| G[Click Cảnh báo Seller]
    E -->|Xác nhận vi phạm nặng| H[Click Xóa sản phẩm]
    F --> F1[Confirm: SP ẩn khỏi tìm kiếm nhưng chưa xóa]
    F1 -->|Hủy| D
    F1 -->|Xác nhận| F2["status = 'hidden'\nreviewedBy, reviewedAt"]
    F2 --> F3[Toast: Đã ẩn sản phẩm]
    G --> G1[Prompt: Nội dung cảnh báo]
    G1 -->|Rỗng| D
    G1 -->|Có nội dung| G2[Tìm seller trong activeSellers\ntheo tên shop]
    G2 --> G3{Tìm thấy\nSeller?}
    G3 -->|Không| G4[Toast: Seller không trong DS hoạt động]
    G3 -->|Có| G5["Thêm violation vào activeSellers\n{type='other', severity='medium'}"]
    G5 --> G6[Toast: Đã gửi cảnh báo đến Seller]
    H --> H1[Prompt: Lý do xóa]
    H1 -->|Rỗng| D
    H1 -->|Có lý do| H2[Confirm: Không thể hoàn tác]
    H2 -->|Hủy| D
    H2 -->|Xác nhận| H3["status = 'deleted'\nreviewNote = lý do"]
    H3 --> H4[Toast: Đã xóa sản phẩm vi phạm]
    F3 & G4 & G6 & H4 --> Z([🔴 Kết thúc])
```

---

## Phần E — Quản lý Đơn hàng

### E.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor
    RA(["👤 Read-only Admin"]):::actor

    subgraph OV["📋 Tổng quan đơn hàng"]
        direction TB
        e1["Xem tất cả đơn hàng hệ thống"]:::uc
        e2["Lọc theo trạng thái / seller / buyer"]:::uc
        e3["Tìm kiếm đơn hàng"]:::uc
        e4["Xem chi tiết đơn hàng"]:::uc
        e5["Xem lịch sử trạng thái (timeline)"]:::uc
    end

    subgraph INT["🔧 Can thiệp đơn hàng"]
        direction TB
        e6["Cập nhật trạng thái thủ công"]:::ucSuper
        e7["Ghi chú can thiệp của Admin"]:::ucSuper
        e8["Mở khiếu nại (complaint)"]:::ucSuper
        e9["Điều tra khiếu nại"]:::ucSuper
        e10["Giải quyết khiếu nại"]:::ucSuper
        e11["Từ chối khiếu nại"]:::ucSuper
    end

    subgraph REF["💸 Hoàn tiền"]
        direction TB
        e12["Khởi tạo yêu cầu hoàn tiền"]:::ucSuper
        e13["Xử lý hoàn tiền"]:::ucSuper
        e14["Hoàn tất hoàn tiền"]:::ucSuper
        e15["Từ chối hoàn tiền"]:::ucSuper
    end

    subgraph LOG["📜 Nhật ký can thiệp"]
        direction TB
        e16["Xem nhật ký can thiệp tổng hợp"]:::uc
        e17["Xem nhật ký theo từng đơn"]:::uc
    end

    SA --> e1 & e2 & e3 & e4 & e5 & e6 & e7 & e8 & e9 & e10 & e11
    SA --> e12 & e13 & e14 & e15 & e16 & e17
    RA --> e1 & e2 & e3 & e4 & e5 & e16 & e17
```

---

### E.2 Biểu đồ hoạt động: Xử lý khiếu nại đơn hàng

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Khiếu nại]
    A --> B[Danh sách đơn có complaint\nsắp xếp theo độ khẩn cấp]
    B --> C[Click vào đơn hàng có khiếu nại]
    C --> D[Trang chi tiết đơn:\nBloc thông tin Khiếu nại]
    D --> E{Trạng thái\nkhiếu nại?}
    E -->|open| F{Admin quyết định}
    E -->|investigating| G{Admin quyết định}
    F -->|Bắt đầu điều tra| H[Click Điều tra]
    F -->|Từ chối ngay| I[Click Từ chối]
    G -->|Đủ bằng chứng| J[Click Giải quyết]
    G -->|Không có cơ sở| I
    H --> H1["complaint.status = 'investigating'\nGhi adminLog"]
    H1 --> H2[Toast: Đang điều tra khiếu nại]
    H2 --> D
    I --> I1[Prompt: Lý do từ chối]
    I1 -->|Rỗng| D
    I1 -->|Có lý do| I2["complaint.status = 'rejected'\nresolution = lý do\nresolvedAt = today"]
    I2 --> I3[Toast: Đã từ chối khiếu nại]
    J --> J1[Prompt: Nhập giải pháp / kết quả]
    J1 -->|Rỗng| D
    J1 -->|Có nội dung| J2["complaint.status = 'resolved'\nresolution = giải pháp\nresolvedAt = today\nresolvedBy = Admin"]
    J2 --> J3[Toast: Đã giải quyết khiếu nại]
    H2 & I3 & J3 --> K[Lưu saveAdminOrders]
    K --> L[Re-render giao diện]
    L --> Z([🔴 Kết thúc])
```

**Mô tả luồng:**

| Trạng thái khiếu nại | Hành động khả dụng | Kết quả |
|----------------------|-------------------|---------|
| `open` | Điều tra / Từ chối | Chuyển `investigating` hoặc `rejected` |
| `investigating` | Giải quyết / Từ chối | Chuyển `resolved` hoặc `rejected` |
| `resolved` / `rejected` | Không có | Chỉ xem |

---

### E.3 Biểu đồ hoạt động: Hoàn tiền (Refund)

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin xem chi tiết đơn hàng]
    A --> B{Đơn có refund\nhiện tại?}
    B -->|Chưa có| C[Click Khởi tạo hoàn tiền]
    B -->|Đã có| D{Trạng thái\nrefund?}
    C --> C1[Prompt: Lý do hoàn tiền]
    C1 -->|Rỗng| A
    C1 -->|Có lý do| C2[Prompt: Số tiền hoàn\nmax = order.total]
    C2 -->|Rỗng hoặc > total| C3[Toast: Số tiền không hợp lệ]
    C3 --> A
    C2 -->|Hợp lệ| C4["refund = {status:'requested',\namount, reason, requestedAt}"]
    C4 --> C5[Toast: Đã khởi tạo yêu cầu hoàn tiền]
    D -->|requested| E{Admin quyết định}
    D -->|processing| F[Click Hoàn tất]
    D -->|completed/rejected| G[Chỉ xem lịch sử]
    E -->|Xử lý| H[Click Xử lý hoàn tiền]
    E -->|Từ chối| I[Click Từ chối]
    H --> H1[Prompt: Ghi chú xử lý]
    H1 --> H2["refund.status = 'processing'"]
    H2 --> H3[Toast: Đang xử lý hoàn tiền]
    I --> I1[Prompt: Lý do từ chối]
    I1 -->|Rỗng| A
    I1 -->|Có lý do| I2["refund.status = 'rejected'\nnote = lý do"]
    I2 --> I3[Toast: Đã từ chối hoàn tiền]
    F --> F1[Confirm: Xác nhận hoàn tất?]
    F1 -->|Hủy| A
    F1 -->|Xác nhận| F2["refund.status = 'completed'\norder.status = 'refunded'\nStatusHistory ghi nhận"]
    F2 --> F3[Toast: Hoàn tiền hoàn tất]
    C5 & H3 & I3 & F3 --> K[Lưu saveAdminOrders + re-render]
    K --> Z([🔴 Kết thúc])
```

**Mô tả luồng trạng thái Refund:**

```
Không có  →  [Khởi tạo]  →  requested
requested  →  [Xử lý]    →  processing  →  [Hoàn tất]  →  completed
requested  →  [Từ chối]  →  rejected
processing →  [Hoàn tất] →  completed   +  order.status = 'refunded'
```

---

## Phần F — Quản lý Tài chính

### F.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor

    subgraph OV["📊 Tổng quan tài chính"]
        direction TB
        f1["Xem KPI: Tổng GMV, Hoa hồng,\nTăng trưởng, Đã thanh toán"]:::uc
        f2["Xem biểu đồ doanh thu theo tháng"]:::uc
        f3["Xem phân bổ theo danh mục"]:::uc
        f4["Xem top Seller đóng góp doanh thu"]:::uc
    end

    subgraph WD["💳 Thanh toán Seller"]
        direction TB
        f5["Xem danh sách yêu cầu rút tiền\n(pending / processing / paid / rejected)"]:::uc
        f6["Duyệt yêu cầu → Đang xử lý"]:::ucSuper
        f7["Từ chối yêu cầu rút tiền"]:::ucSuper
        f8["Xác nhận đã chuyển khoản → Paid"]:::ucSuper
    end

    subgraph HIS["📜 Lịch sử thanh toán"]
        direction TB
        f9["Xem lịch sử thanh toán đã thực hiện"]:::uc
        f10["Tìm kiếm theo seller / mã giao dịch"]:::uc
        f11["Xuất báo cáo tài chính (file .txt)"]:::ucSuper
    end

    SA --> f1 & f2 & f3 & f4
    SA --> f5 & f6 & f7 & f8
    SA --> f9 & f10 & f11
```

---

### F.2 Biểu đồ hoạt động: Xử lý yêu cầu rút tiền của Seller

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Thanh toán Seller]
    A --> B[Xem sub-tab Chờ duyệt\nDanh sách withdrawal pending]
    B --> C[Admin đọc thông tin:\nSeller, Số tiền, Số dư, Tài khoản NH]
    C --> D{Admin\nquyết định}
    D -->|Duyệt xử lý| E[Click Duyệt xử lý]
    D -->|Từ chối| F[Click Từ chối]
    E --> E1[Prompt: Ghi chú xử lý\nví dụ: Đang chuyển khoản...]
    E1 --> E2["status = 'processing'\nnote = ghi chú\nprocessedAt = today\nprocessedBy = Admin"]
    E2 --> E3[Toast: Đã duyệt yêu cầu rút tiền]
    E3 --> G[Admin chuyển sang sub-tab Đang xử lý]
    G --> H[Thực hiện chuyển khoản thực tế\nqua ngân hàng]
    H --> I[Admin click Xác nhận đã thanh toán]
    I --> I1[Prompt: Nhập mã tham chiếu giao dịch NH]
    I1 -->|Rỗng| G
    I1 -->|Có mã| I2[Confirm: Xác nhận đã chuyển + số tiền]
    I2 -->|Hủy| G
    I2 -->|Xác nhận| I3["status = 'paid'\nprocessedAt = today"]
    I3 --> I4["Tạo bản ghi finPayments:\n{id:PAY-WD***, seller, amount,\n period, paidAt, bank, ref, by}"]
    I4 --> I5[Toast: Đã hoàn tất thanh toán]
    F --> F1[Prompt: Lý do từ chối]
    F1 -->|Rỗng| C
    F1 -->|Có lý do| F2["status = 'rejected'\nrejectedReason = lý do\nprocessedAt = today"]
    F2 --> F3[Toast: Đã từ chối yêu cầu]
    E3 & I5 & F3 --> J[saveFinWithdrawals + re-render]
    J --> Z([🔴 Kết thúc])
```

**Mô tả vòng đời yêu cầu rút tiền:**

```
pending  →  [Duyệt xử lý]         →  processing
pending  →  [Từ chối]              →  rejected
processing → [Xác nhận thanh toán] →  paid  →  Tạo bản ghi finPayments
```

---

### F.3 Biểu đồ hoạt động: Xuất báo cáo tài chính

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Lịch sử thanh toán]
    A --> B[Xem danh sách tất cả giao dịch\nVà tổng số tiền đã thanh toán]
    B --> C[Admin tìm kiếm / lọc nếu cần]
    C --> D[Admin click Xuất báo cáo]
    D --> E[Hệ thống tổng hợp dữ liệu]
    E --> F["Tạo nội dung báo cáo .txt:\n• Tiêu đề + ngày xuất\n• Tổng quan 6 tháng (GMV + Hoa hồng)\n• Phân bổ theo danh mục\n• Lịch sử thanh toán từng giao dịch\n• Trạng thái yêu cầu rút tiền"]
    F --> G["Tạo Blob URL:\nnew Blob(content, 'text/plain')\nURL.createObjectURL(blob)"]
    G --> H[Tạo thẻ a, click() tự động\ntải file bao-cao-tai-chinh-edumart.txt]
    H --> I[URL.revokeObjectURL để giải phóng bộ nhớ]
    I --> J[Toast: Đã xuất báo cáo tài chính]
    J --> Z([🔴 Kết thúc])
```

---

## Phần G — Quản lý Nội dung

### G.1 Sơ đồ Use Case

```mermaid
flowchart LR
    classDef actor fill:#dae8fc,stroke:#6c8ebf,font-weight:bold,color:#000
    classDef uc fill:#fff2cc,stroke:#d6b656,color:#000
    classDef ucSuper fill:#ffe6cc,stroke:#d79b00,color:#000

    SA(["👤 Super Admin"]):::actor
    CA(["👤 Content Admin"]):::actor

    subgraph BLG["✍️ Blog"]
        direction TB
        g1["Xem danh sách bài viết\n(tìm kiếm, lọc, phân trang)"]:::uc
        g2["Tạo bài viết mới (rich text editor)"]:::ucSuper
        g3["Chỉnh sửa bài viết"]:::ucSuper
        g4["Xuất bản bài viết"]:::ucSuper
        g5["Lưu bản nháp"]:::ucSuper
        g6["Ẩn bài viết"]:::ucSuper
        g7["Xóa bài viết"]:::ucSuper
        g8["Ghim bài nổi bật (Featured)"]:::ucSuper
    end

    subgraph CMT["💬 Bình luận Blog"]
        direction TB
        g9["Xem danh sách bình luận"]:::uc
        g10["Duyệt bình luận"]:::ucSuper
        g11["Xóa bình luận vi phạm"]:::ucSuper
        g12["Cấm người dùng bình luận"]:::ucSuper
    end

    subgraph BAN["🖼️ Banner & Quảng cáo"]
        direction TB
        g13["Xem danh sách banner"]:::uc
        g14["Thêm banner mới"]:::ucSuper
        g15["Chỉnh sửa banner"]:::ucSuper
        g16["Bật / Tắt banner"]:::ucSuper
        g17["Sắp xếp thứ tự banner"]:::ucSuper
        g18["Xóa banner"]:::ucSuper
        g19["Cài đặt popup khuyến mãi"]:::ucSuper
    end

    subgraph STA["📄 Trang tĩnh"]
        direction TB
        g20["Chỉnh sửa Về chúng tôi"]:::ucSuper
        g21["Chỉnh sửa Điều khoản sử dụng"]:::ucSuper
        g22["Chỉnh sửa Chính sách bảo mật"]:::ucSuper
        g23["Chỉnh sửa Chính sách đổi/trả"]:::ucSuper
    end

    SA --> g1 & g2 & g3 & g4 & g5 & g6 & g7 & g8
    SA --> g9 & g10 & g11 & g12
    SA --> g13 & g14 & g15 & g16 & g17 & g18 & g19
    SA --> g20 & g21 & g22 & g23
    CA --> g1 & g2 & g3 & g4 & g5 & g6 & g7 & g8
    CA --> g9 & g10 & g11 & g12
    CA --> g13 & g14 & g15 & g16 & g17 & g18 & g19
```

---

### G.2 Biểu đồ hoạt động: Viết & Xuất bản bài viết Blog

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Blog]
    A --> B{Tạo mới\nhay chỉnh sửa?}
    B -->|Tạo mới| C[Click + Viết bài mới\nadmBlogEditId = 'new']
    B -->|Chỉnh sửa| D[Click Sửa trên dòng bài viết\nadmBlogEditId = blog.id]
    C --> E[Editor mở:\nForm trống, content mặc định]
    D --> F[Editor mở:\nDữ liệu bài viết điền sẵn]
    E & F --> G[Admin soạn thảo]
    G --> G1[Nhập tiêu đề]
    G --> G2[Sử dụng toolbar:\nB/I/U, H2/H3, List, Link, Image]
    G --> G3[Sidebar: Chọn danh mục, nhập tags]
    G --> G4[Sidebar: URL thumbnail]
    G --> G5[Sidebar: Checkbox ghim bài]
    G1 & G2 & G3 & G4 & G5 --> H{Admin\nchọn hành động}
    H -->|Xuất bản ngay| I[Click Xuất bản ngay]
    H -->|Lưu nháp| J[Click Lưu nháp]
    H -->|Ẩn bài| K[Click Ẩn bài viết]
    I & J & K --> L{Tiêu đề\ncó rỗng?}
    L -->|Rỗng| M[Toast: Vui lòng nhập tiêu đề\nDừng lưu]
    M --> G
    L -->|Có tiêu đề| N[Đọc tất cả giá trị DOM\nBao gồm innerHTML của editor]
    N --> O{Tạo mới\nhay cập nhật?}
    O -->|Mới| P["cmsBlogs.unshift({id mới,\ntitle, content, status,\nslug, createdAt = today})"]
    O -->|Cập nhật| Q["Cập nhật object hiện tại\nupdatedAt = today\nNếu published: publishedAt = today (lần đầu)"]
    P & Q --> R["saveCmsBlogs()\nadmBlogEditId = null\nrenderAccount()"]
    R --> S1[Toast: Đã tạo / Đã lưu bài viết]
    S1 --> T[Quay về danh sách\nbài viết mới hiển thị]
    T --> Z([🔴 Kết thúc])
```

**Mô tả luồng soạn thảo:**

| Công cụ toolbar | Hành động | Kết quả |
|----------------|-----------|---------|
| **B / I / U** | Chọn text → click | `execCommand('bold'/'italic'/'underline')` |
| **H2 / H3** | Đặt con trỏ → click | `execCommand('formatBlock', 'H2'/'H3')` |
| **≡ / 1.** | Click | `execCommand('insertUnorderedList'/'insertOrderedList')` |
| **🔗** | Click → Prompt URL | `execCommand('createLink', url)` |
| **🖼** | Click → Prompt URL | `execCommand('insertImage', url)` |

**Lưu ý quan trọng:** Editor `contenteditable` **không** gọi `renderAccount()` trong quá trình soạn thảo — tránh mất nội dung chưa lưu.

---

### G.3 Biểu đồ hoạt động: Kiểm duyệt bình luận

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Bình luận]
    A --> B[Xem danh sách bình luận\nBadge đỏ: số pending]
    B --> C[Admin lọc Chờ duyệt\nhoặc tìm kiếm]
    C --> D[Đọc nội dung bình luận]
    D --> E{Đánh giá\nnội dung}
    E -->|Hợp lệ| F[Click Duyệt]
    E -->|Vi phạm / spam| G[Click Xóa]
    E -->|User thường xuyên vi phạm| H[Click Cấm]
    F --> F1["comment.status = 'approved'"]
    F1 --> F2[Toast: Đã duyệt bình luận]
    G --> G1[Confirm dialog]
    G1 -->|Hủy| D
    G1 -->|Xác nhận| G2["comment.status = 'deleted'\n(soft delete)"]
    G2 --> G3[Toast: Đã xóa bình luận]
    H --> H1["Confirm: Cấm toàn bộ bình\nluận của userId này?"]
    H1 -->|Hủy| D
    H1 -->|Xác nhận| H2["Tất cả comments cùng userId:\nbannedUser = true"]
    H2 --> H3[Toast: Đã cấm người dùng bình luận]
    F2 & G3 & H3 --> I[saveCmsComments + re-render]
    I --> J[Badge pending giảm\nTag Đã cấm xuất hiện nếu cần]
    J --> Z([🔴 Kết thúc])
```

**Mô tả phạm vi lệnh Cấm:**

| Hành động | Phạm vi | Reversible? |
|-----------|---------|-------------|
| Xóa bình luận | Chỉ bình luận đang xét (`status='deleted'`) | Không (soft delete) |
| Cấm người dùng | **Tất cả** bình luận cùng `userId` (`bannedUser=true`) | Không (MVP) |
| Duyệt | Chỉ bình luận đang xét (`status='approved'`) | Không áp dụng |

---

### G.4 Biểu đồ hoạt động: Quản lý Banner & Popup

```mermaid
flowchart TD
    S([🔵 Bắt đầu]) --> A[Admin vào tab Banner & Quảng cáo]
    A --> B{Chọn\nsub-tab}
    B -->|Banner trang chủ| C[Xem danh sách banner\nvới số thứ tự và trạng thái]
    B -->|Popup khuyến mãi| D[Form cài đặt Popup\nhiện trạng thái hiện tại]

    C --> E{Admin\nhành động}
    E -->|Thêm mới| F[Click + Thêm banner\nadmBannerEditId = 'new']
    E -->|Chỉnh sửa| G[Click Sửa\nadmBannerEditId = banner.id]
    E -->|Bật / Tắt| H[Click toggle\nb.active = !b.active]
    E -->|Sắp xếp| I[Click ▲ hoặc ▼]
    E -->|Xóa| J[Click Xóa]

    F & G --> K[Form thêm/sửa xuất hiện:\nTiêu đề, URL ảnh, URL link,\nAlt text, Ngày bắt đầu, Ngày kết thúc]
    K --> L[Admin điền / chỉnh sửa]
    L --> M{Tiêu đề\nrỗng?}
    M -->|Rỗng| N[Toast: Nhập tiêu đề]
    N --> L
    M -->|Có tiêu đề| O[Chuyển đổi ngày:\nYYYY-MM-DD → DD/MM/YYYY]
    O --> P{Thêm mới\nhay sửa?}
    P -->|Mới| Q[cmsBanners.push object mới]
    P -->|Sửa| R[Object.assign cập nhật]
    Q & R --> S1[saveCmsBanners\nadmBannerEditId=null\nre-render]

    H --> H1[saveCmsBanners\nre-render]
    H1 --> H2[Toast: Đã bật / tắt banner]

    I --> I1[Tìm index trong mảng\nHoán đổi với i-1 hoặc i+1]
    I1 --> I2{Biên\nhợp lệ?}
    I2 -->|Không| C
    I2 -->|Có| I3["[arr[i], arr[ni]] = [arr[ni], arr[i]]"]
    I3 --> I4[saveCmsBanners + re-render\nSố thứ tự cập nhật]

    J --> J1[Confirm dialog]
    J1 -->|Hủy| C
    J1 -->|Xác nhận| J2[cmsBanners.filter + save]
    J2 --> J3[Toast: Đã xóa banner]

    D --> D1[Admin điền form Popup]
    D1 --> D2[Click Lưu cài đặt popup]
    D2 --> D3["Object.assign(cmsPopup, {...})\nupdatedAt = today\nsaveCmsPopup"]
    D3 --> D4[Toast: Đã lưu cài đặt popup]

    S1 & H2 & I4 & J3 & D4 --> Z([🔴 Kết thúc])
```

---

## Phần H — Tổng hợp trạng thái & chuyển đổi

### H.1 Sơ đồ trạng thái: Tài khoản Người dùng

```mermaid
stateDiagram-v2
    [*] --> active : Đăng ký thành công
    active --> locked : Admin khóa
    locked --> active : Admin mở khóa
    active --> deleted : Xóa mềm
    locked --> deleted : Xóa mềm
    deleted --> [*]
```

### H.2 Sơ đồ trạng thái: Hồ sơ Seller

```mermaid
stateDiagram-v2
    [*] --> pending : Seller nộp hồ sơ
    pending --> more_info : Yêu cầu bổ sung
    more_info --> pending : Seller bổ sung và nộp lại
    pending --> approved : Admin duyệt
    pending --> rejected : Admin từ chối
    approved --> suspended : Vi phạm nghiêm trọng
    approved --> locked : Vi phạm rất nghiêm trọng
    suspended --> approved : Hết thời gian đình chỉ
    suspended --> locked : Vi phạm tiếp theo
```

### H.3 Sơ đồ trạng thái: Sản phẩm chờ duyệt

```mermaid
stateDiagram-v2
    [*] --> pending : Seller đăng sản phẩm
    pending --> need_edit : Yêu cầu chỉnh sửa
    need_edit --> pending : Seller sửa và nộp lại
    pending --> approved : Admin duyệt
    need_edit --> approved : Admin duyệt sau khi sửa
    pending --> rejected : Admin từ chối
    need_edit --> rejected : Admin từ chối
```

### H.4 Sơ đồ trạng thái: Đơn hàng & Hoàn tiền

```mermaid
stateDiagram-v2
    direction LR
    [*] --> pending : Người mua đặt
    pending --> confirmed : Seller xác nhận
    confirmed --> processing : Đang chuẩn bị
    processing --> shipping : Đang giao
    shipping --> delivered : Đã giao
    delivered --> completed : Người mua xác nhận
    pending --> cancelled : Hủy đơn
    confirmed --> cancelled : Hủy đơn
    delivered --> refunded : Hoàn tiền thành công
    completed --> refunded : Hoàn tiền sau nhận hàng
```

### H.5 Sơ đồ trạng thái: Yêu cầu rút tiền Seller

```mermaid
stateDiagram-v2
    [*] --> pending : Seller gửi yêu cầu
    pending --> processing : Admin duyệt
    pending --> rejected : Admin từ chối
    processing --> paid : Admin xác nhận đã chuyển khoản
```

### H.6 Sơ đồ trạng thái: Bài viết Blog

```mermaid
stateDiagram-v2
    [*] --> draft : Lưu nháp
    draft --> published : Xuất bản
    draft --> hidden : Ẩn
    published --> draft : Chuyển về nháp
    published --> hidden : Ẩn bài
    hidden --> published : Xuất bản lại
    hidden --> draft : Chuyển về nháp
    published --> [*] : Xóa bài
    draft --> [*] : Xóa bài
    hidden --> [*] : Xóa bài
```

---

## Phần I — Ma trận chức năng & trạng thái

### I.1 Điều kiện hiển thị nút hành động theo trạng thái

**Đơn hàng — Complaint:**

| Trạng thái complaint | Điều tra | Giải quyết | Từ chối |
|---------------------|:--------:|:----------:|:-------:|
| `open` | ✅ | ❌ | ✅ |
| `investigating` | ❌ | ✅ | ✅ |
| `resolved` | ❌ | ❌ | ❌ |
| `rejected` | ❌ | ❌ | ❌ |

**Đơn hàng — Refund:**

| Trạng thái refund | Xử lý | Hoàn tất | Từ chối |
|------------------|:-----:|:--------:|:-------:|
| `requested` | ✅ | ❌ | ✅ |
| `processing` | ❌ | ✅ | ❌ |
| `completed` | ❌ | ❌ | ❌ |
| `rejected` | ❌ | ❌ | ❌ |

**Bình luận Blog:**

| Trạng thái | Duyệt | Xóa | Cấm user |
|-----------|:-----:|:---:|:--------:|
| `pending` | ✅ | ✅ | ✅ (nếu chưa cấm) |
| `approved` | ❌ | ✅ | ✅ (nếu chưa cấm) |
| `deleted` | ❌ | ❌ | ❌ |

**Yêu cầu rút tiền Seller:**

| Trạng thái | Duyệt xử lý | Xác nhận paid | Từ chối |
|-----------|:-----------:|:-------------:|:-------:|
| `pending` | ✅ | ❌ | ✅ |
| `processing` | ❌ | ✅ | ❌ |
| `paid` | ❌ | ❌ | ❌ |
| `rejected` | ❌ | ❌ | ❌ |

---

*Tài liệu này được tạo tự động từ phân tích mã nguồn `public/app.js` và các tài liệu yêu cầu trong thư mục `docs/`. Cập nhật cùng với mỗi sprint phát triển.*
