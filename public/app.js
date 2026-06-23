/* ---------------- Persistence (localStorage) ---------------- */
const LS={
  get(k,d){try{const v=localStorage.getItem('edumart_'+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem('edumart_'+k,JSON.stringify(v));}catch(e){}}
};

/* ---------------- Data ---------------- */
const fmt = n => n.toLocaleString('vi-VN') + 'đ';
const AUD = {tieuhoc:'Tiểu học',thcs:'THCS',thpt:'THPT',sinhvien:'Sinh viên',giaovien:'Giáo viên',school:'Trường học'};
const CATLBL = {sach:'Sách nổi bật',vpp:'Văn phòng phẩm',tbgd:'Thiết bị giáo dục',ebook:'Ebook',audiobook:'Sách nói'};

const P = [
  {id:1,name:'Bộ SGK lớp 6 - Kết nối tri thức',by:'NXB Giáo Dục Việt Nam',cat:'sach',aud:['thcs'],nxb:'Giáo Dục',price:187000,old:249000,rate:4.9,sold:1200,c:'#2f6ca5',isbn:'9786040281708'},
  {id:2,name:'Dế Mèn phiêu lưu ký',by:'Tô Hoài',cat:'sach',aud:['tieuhoc'],nxb:'Kim Đồng',price:45000,old:55000,rate:4.8,sold:5400,c:'#3a7a52',isbn:'9786041060487'},
  {id:3,name:'Tư duy nhanh và chậm',by:'Daniel Kahneman',cat:'sach',aud:['sinhvien'],nxb:'NXB Trẻ',price:169000,old:199000,rate:4.7,sold:2800,c:'#7a4a8c',isbn:'9786041149595'},
  {id:4,name:'Mắt biếc',by:'Nguyễn Nhật Ánh',cat:'sach',aud:['thpt'],nxb:'NXB Trẻ',price:88000,old:110000,rate:5.0,sold:8100,c:'#c1572f',isbn:'9786041071230'},
  {id:5,name:'Atomic Habits - Thay đổi tí hon',by:'James Clear',cat:'sach',aud:['sinhvien','thpt'],nxb:'Thế Giới',price:145000,old:180000,rate:4.9,sold:6700,c:'#1f6e6e',isbn:'9786041168237'},
  {id:6,name:'Luyện thi THPT QG môn Toán',by:'NXB ĐHQG Hà Nội',cat:'sach',aud:['thpt'],nxb:'ĐHQG',price:95000,old:120000,rate:4.6,sold:3300,c:'#384c9c',isbn:'9786041093447'},
  {id:7,name:'Combo bút bi Thiên Long 20 cây',by:'Thiên Long',cat:'vpp',sub:'but',aud:['thcs','thpt','sinhvien'],nxb:'Thiên Long',price:48000,old:80000,rate:5.0,sold:9200,c:'#2563a8',icon:'pen'},
  {id:8,name:'Vở Campus 200 trang (lốc 10)',by:'Campus',cat:'vpp',sub:'vo',aud:['thcs','thpt'],nxb:'Campus',price:102000,old:120000,rate:4.9,sold:5600,c:'#e08a2e',icon:'note'},
  {id:9,name:'Bộ bút màu Colokit 24 màu',by:'Colokit',cat:'vpp',sub:'hoapham',aud:['tieuhoc'],nxb:'Colokit',price:65000,old:85000,rate:4.8,sold:4100,c:'#c94f7c',icon:'palette'},
  {id:10,name:'Balo chống gù Hami',by:'Hami',cat:'vpp',sub:'balo',aud:['tieuhoc','thcs'],nxb:'Hami',price:320000,old:420000,rate:4.7,sold:2200,c:'#3d6e9c',icon:'bag'},
  /* ===== Văn phòng phẩm mở rộng ===== */
  {id:44,name:'Bút chì 2B Hồng Hà (hộp 12 cây)',by:'Hồng Hà',cat:'vpp',sub:'but',aud:['tieuhoc','thcs'],nxb:'Hồng Hà',price:32000,old:45000,rate:4.7,sold:6800,c:'#8a6020',icon:'pen'},
  {id:45,name:'Bút dạ quang Stabilo Boss (8 màu)',by:'Stabilo',cat:'vpp',sub:'but',aud:['thcs','thpt','sinhvien'],nxb:'Stabilo',price:78000,old:98000,rate:4.9,sold:4200,c:'#d4b200',tag:'hot',icon:'pen'},
  {id:46,name:'Bộ bút gel Thiên Long G-03 (10 cây)',by:'Thiên Long',cat:'vpp',sub:'but',aud:['thcs','thpt','sinhvien'],nxb:'Thiên Long',price:52000,old:72000,rate:4.8,sold:7300,c:'#1e4d8c',icon:'pen'},
  {id:47,name:'Vở kẻ ngang Hồng Hà A5 200 trang (lốc 10)',by:'Hồng Hà',cat:'vpp',sub:'vo',aud:['tieuhoc','thcs','thpt'],nxb:'Hồng Hà',price:78000,old:98000,rate:4.8,sold:8900,c:'#c85a00',icon:'note'},
  {id:48,name:'Sổ tay bìa cứng Kraft A5 (192 trang)',by:'Artbox',cat:'vpp',sub:'vo',aud:['thpt','sinhvien'],nxb:'Artbox',price:95000,old:130000,rate:4.7,sold:2300,c:'#7a5c3a',tag:'new',icon:'note'},
  {id:49,name:'Giấy in A4 Double A 80gsm (ream 500 tờ)',by:'Double A',cat:'vpp',sub:'vo',aud:['sinhvien','giaovien'],nxb:'Double A',price:108000,old:138000,rate:4.9,sold:5400,c:'#4a6ea8',icon:'note'},
  {id:50,name:'Bộ dụng cụ học toán (thước, compa, eke)',by:'DELI',cat:'vpp',sub:'dungcu',aud:['thcs','thpt'],nxb:'DELI',price:45000,old:65000,rate:4.6,sold:3800,c:'#2a7a2a',icon:'ruler'},
  {id:51,name:'Máy tính Casio fx-580VN X',by:'Casio',cat:'vpp',sub:'dungcu',aud:['thpt','sinhvien'],nxb:'Casio',price:480000,old:580000,rate:4.9,sold:12000,c:'#1a1a4a',tag:'hot',icon:'calc'},
  {id:52,name:'Bộ kéo + băng dán + ghim văn phòng DELI',by:'DELI',cat:'vpp',sub:'dungcu',aud:['giaovien','school'],nxb:'DELI',price:62000,old:82000,rate:4.5,sold:1800,c:'#5a3a1a',icon:'tool'},
  {id:53,name:'Màu nước Sakura 24 màu + 3 cọ',by:'Sakura',cat:'vpp',sub:'hoapham',aud:['tieuhoc','thcs'],nxb:'Sakura',price:125000,old:165000,rate:4.8,sold:2100,c:'#c04060',tag:'new',icon:'palette'},
  {id:54,name:'Màu sáp dầu Crayola 32 màu',by:'Crayola',cat:'vpp',sub:'hoapham',aud:['tieuhoc'],nxb:'Crayola',price:95000,old:125000,rate:4.9,sold:3400,c:'#d04000',icon:'palette'},
  {id:55,name:'Sổ vẽ Artbook A4 120g (50 tờ)',by:'Artbox',cat:'vpp',sub:'hoapham',aud:['tieuhoc','thcs','thpt'],nxb:'Artbox',price:68000,old:88000,rate:4.7,sold:1800,c:'#3a6a4a',icon:'note'},
  {id:56,name:'Balo học sinh chống gù Haras 18L',by:'Haras',cat:'vpp',sub:'balo',aud:['tieuhoc','thcs'],nxb:'Haras',price:395000,old:520000,rate:4.8,sold:3600,c:'#1e5f8a',tag:'hot',icon:'bag'},
  {id:57,name:'Túi đựng bút canvas 3 ngăn',by:'Artbox',cat:'vpp',sub:'balo',aud:['thcs','thpt','sinhvien'],nxb:'Artbox',price:65000,old:88000,rate:4.7,sold:2800,c:'#6a4a2a',icon:'bag'},
  {id:58,name:'Hộp đựng đồ bàn học DELI 5 ngăn',by:'DELI',cat:'vpp',sub:'dungcu',aud:['tieuhoc','thcs','thpt','sinhvien'],nxb:'DELI',price:82000,old:110000,rate:4.6,sold:1500,c:'#4a8a4a',icon:'tool'},
  {id:11,name:'Máy tính Casio fx-580VN X',by:'Casio',cat:'tbgd',sub:'mtinh',aud:['thpt','sinhvien'],nxb:'Casio',price:490000,old:599000,rate:4.8,sold:3400,c:'#2b3a4a',icon:'calc'},
  {id:12,name:'Bộ dụng cụ thí nghiệm Vật lý 12',by:'Thiết bị GD',cat:'tbgd',sub:'tn',aud:['thpt'],nxb:'Thiết bị GD',price:360000,old:450000,rate:4.6,sold:980,c:'#1f6e6e',icon:'flask',instock:false},
  {id:13,name:'Địa cầu phát sáng 25cm',by:'EduGlobe',cat:'tbgd',sub:'bando',aud:['tieuhoc','thcs'],nxb:'EduGlobe',price:210000,old:280000,rate:4.9,sold:1600,c:'#2f6ca5',icon:'globe'},
  {id:14,name:'Bộ dạy học giáo viên - bảng & phấn',by:'EduPro',cat:'tbgd',sub:'dayho',aud:['giaovien'],nxb:'EduPro',price:175000,old:230000,rate:4.7,sold:1100,c:'#7a4a8c',icon:'board'},
  /* ===== Thiết bị giáo dục mở rộng ===== */
  {id:59,name:'Máy tính Casio fx-991EX Classwiz',by:'Casio',cat:'tbgd',sub:'mtinh',aud:['thpt','sinhvien'],nxb:'Casio',price:295000,old:380000,rate:4.9,sold:8700,c:'#1a2a4a',tag:'hot',icon:'calc'},
  {id:60,name:'Máy tính đồ thị Casio fx-CG50',by:'Casio',cat:'tbgd',sub:'mtinh',aud:['sinhvien'],nxb:'Casio',price:1850000,old:2200000,rate:4.8,sold:1200,c:'#2a1a4a',icon:'calc'},
  {id:61,name:'Kính hiển vi học sinh 400x – 1000x',by:'Optima Lab',cat:'tbgd',sub:'tn',aud:['thcs','thpt'],nxb:'Optima Lab',price:680000,old:890000,rate:4.7,sold:840,c:'#1a4a2a',tag:'hot',icon:'micro'},
  {id:62,name:'Bộ thí nghiệm Hóa học THCS (25 dụng cụ)',by:'EduLab',cat:'tbgd',sub:'tn',aud:['thcs'],nxb:'EduLab',price:450000,old:580000,rate:4.5,sold:620,c:'#4a1a2a',icon:'flask',instock:false},
  {id:63,name:'Mô hình cấu trúc DNA 3D tháo lắp',by:'BioModel',cat:'tbgd',sub:'tn',aud:['thpt','sinhvien'],nxb:'BioModel',price:380000,old:490000,rate:4.7,sold:510,c:'#1a4a4a',tag:'new',icon:'flask'},
  {id:64,name:'Bản đồ Việt Nam treo tường 80×120cm',by:'EduMap',cat:'tbgd',sub:'bando',aud:['tieuhoc','thcs'],nxb:'EduMap',price:178000,old:245000,rate:4.6,sold:2300,c:'#3a5a1a',icon:'globe'},
  {id:65,name:'Địa cầu chính trị 30cm có đèn LED',by:'EduGlobe',cat:'tbgd',sub:'bando',aud:['thcs','thpt'],nxb:'EduGlobe',price:310000,old:420000,rate:4.8,sold:1450,c:'#1a3a6a',icon:'globe'},
  {id:66,name:'Bảng trắng từ tính 80×120cm khung nhôm',by:'EduPro',cat:'tbgd',sub:'dayho',aud:['giaovien','school'],nxb:'EduPro',price:470000,old:620000,rate:4.8,sold:1820,c:'#3a1a5a',tag:'hot',icon:'board'},
  {id:67,name:'Bộ thẻ học từ vựng Tiếng Anh 500 thẻ',by:'EduCard',cat:'tbgd',sub:'dayho',aud:['tieuhoc','thcs'],nxb:'EduCard',price:88000,old:120000,rate:4.7,sold:3400,c:'#5a3a1a',tag:'new',icon:'note'},
  {id:68,name:'Đèn học LED chống cận EduLight',by:'EduLight',cat:'tbgd',sub:'dayho',aud:['tieuhoc','thcs','thpt'],nxb:'EduLight',price:278000,old:360000,rate:4.9,sold:4200,c:'#4a4a1a',icon:'lamp'},
  {id:69,name:'Máy chiếu mini EduPro 3000 Lumen',by:'EduPro',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'EduPro',price:3200000,old:4200000,rate:4.7,sold:680,c:'#1a3a5a',tag:'hot',icon:'screen'},
  {id:70,name:'Máy đọc sách EduReader 6" E-Ink',by:'EduMart Tech',cat:'tbgd',sub:'cntt',aud:['sinhvien','giaovien'],nxb:'EduMart Tech',price:1290000,old:1680000,rate:4.6,sold:920,c:'#2a2a4a',tag:'new',icon:'note'},
  {id:71,name:'Camera tài liệu IPEVO V4K 4K',by:'IPEVO',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'IPEVO',price:2450000,old:3100000,rate:4.8,sold:460,c:'#1a4a3a',icon:'cam'},
  {id:72,name:'Màn chiếu gập EduScreen 120"',by:'EduPro',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'EduPro',price:890000,old:1200000,rate:4.5,sold:380,c:'#3a3a1a',icon:'screen',instock:false},
  {id:26,name:'Sách giáo viên Ngữ văn lớp 10 - Kết nối tri thức',by:'NXB Giáo Dục Việt Nam',cat:'sach',aud:['giaovien'],nxb:'Giáo Dục',price:62000,old:82000,rate:4.8,sold:890,c:'#384c9c'},
  {id:27,name:'Hướng dẫn dạy học theo phương pháp tích cực',by:'Trường ĐHSP Hà Nội',cat:'sach',aud:['giaovien'],nxb:'ĐHSP',price:118000,old:155000,rate:4.7,sold:620,c:'#2a5a5a'},
  {id:28,name:'Kế hoạch bài dạy 4.0 - Mẫu soạn giáo án chuẩn mới',by:'EduPro Digital',cat:'ebook',aud:['giaovien'],nxb:'EduMart Digital',price:85000,old:120000,rate:4.9,sold:480,c:'#7a4400',ebook:true,format:'PDF',pages:240,size:6.2},
  {id:15,name:'Lập trình JavaScript từ con số 0',by:'Nguyễn Minh',cat:'ebook',aud:['sinhvien'],nxb:'EduMart Digital',price:79000,old:120000,rate:4.8,sold:2300,c:'#1f6e6e',ebook:true,format:'PDF · EPUB',pages:312,size:8.4},
  {id:16,name:'Tiếng Anh giao tiếp cấp tốc',by:'Lê Hằng',cat:'ebook',aud:['sinhvien','thpt'],nxb:'EduMart Digital',price:59000,old:99000,rate:4.7,sold:4100,c:'#2f6ca5',ebook:true,format:'PDF · EPUB',pages:198,size:5.1},
  {id:17,name:'Tư duy phản biện cho học sinh',by:'Trần Quốc',cat:'ebook',aud:['thpt'],nxb:'EduMart Digital',price:65000,old:90000,rate:4.9,sold:1800,c:'#7a4a8c',ebook:true,format:'PDF',pages:256,size:6.7},
  {id:18,name:'Cẩm nang ôn thi THPT Quốc gia',by:'Tổ Giáo Dục',cat:'ebook',aud:['thpt'],nxb:'EduMart Digital',price:99000,old:150000,rate:4.6,sold:3600,c:'#c1572f',ebook:true,format:'PDF · EPUB',pages:420,size:12.3},
  {id:19,name:'Toán tư duy cho học sinh tiểu học',by:'Phạm Lan',cat:'ebook',aud:['tieuhoc'],nxb:'EduMart Digital',price:49000,old:75000,rate:4.8,sold:2900,c:'#3a7a52',ebook:true,format:'PDF · EPUB',pages:164,size:4.2},
  {id:20,name:'Đắc Nhân Tâm (sách nói)',by:'Dale Carnegie',cat:'audiobook',aud:['sinhvien'],nxb:'EduMart Audio',price:69000,old:99000,rate:4.9,sold:5200,c:'#c1572f',audio:true,narrator:'Minh Quân',duration:372,format:'MP3'},
  {id:21,name:'Tư duy nhanh và chậm (sách nói)',by:'Daniel Kahneman',cat:'audiobook',aud:['sinhvien'],nxb:'EduMart Audio',price:89000,old:129000,rate:4.7,sold:2400,c:'#7a4a8c',audio:true,narrator:'Thu Hà',duration:540,format:'MP3'},
  {id:22,name:'Luyện nghe Tiếng Anh mỗi ngày (sách nói)',by:'Lê Hằng',cat:'audiobook',aud:['thpt','sinhvien'],nxb:'EduMart Audio',price:55000,old:85000,rate:4.8,sold:3100,c:'#2f6ca5',audio:true,narrator:'David Le',duration:248,format:'MP3'},
  /* ===== Ebook & Sách nói mở rộng ===== */
  {id:35,name:'Ngữ văn 12 – Phân tích tác phẩm trọng tâm',by:'Nguyễn Thị Lan',cat:'ebook',aud:['thpt'],nxb:'EduMart Digital',price:75000,old:110000,rate:4.7,sold:940,c:'#6a1a3a',tag:'hot',ebook:true,format:'PDF · EPUB',pages:288,size:7.4},
  {id:36,name:'Hóa học cơ bản THCS – Lý thuyết & bài tập',by:'Trần Minh Đức',cat:'ebook',aud:['thcs'],nxb:'EduMart Digital',price:55000,old:80000,rate:4.5,sold:620,c:'#1a5a3a',ebook:true,format:'PDF',pages:220,size:5.8},
  {id:37,name:'Kỹ năng học tập thông minh cho sinh viên',by:'Phạm Anh Tuấn',cat:'ebook',aud:['sinhvien'],nxb:'EduMart Digital',price:69000,old:95000,rate:4.6,sold:380,c:'#1e3a5a',tag:'new',ebook:true,format:'PDF · EPUB',pages:192,size:4.9},
  {id:38,name:'Toán 5 – Bộ đề luyện thi cuối cấp',by:'Đội ngũ EduMart',cat:'ebook',aud:['tieuhoc'],nxb:'EduMart Digital',price:45000,old:65000,rate:4.4,sold:510,c:'#2d5a2d',ebook:true,format:'PDF',pages:180,size:4.5},
  {id:39,name:'Python từ số 0 đến dự án thực tế',by:'Lê Hải Nam',cat:'ebook',aud:['sinhvien'],nxb:'EduMart Digital',price:89000,old:135000,rate:4.8,sold:1270,c:'#1f5577',tag:'new',ebook:true,format:'PDF · EPUB',pages:356,size:9.2},
  {id:40,name:'IELTS Foundation – Lộ trình 3 tháng',by:'Trung tâm EduMart',cat:'ebook',aud:['thpt','sinhvien'],nxb:'EduMart Digital',price:119000,old:180000,rate:4.9,sold:2030,c:'#7a4400',tag:'hot',ebook:true,format:'PDF · EPUB',pages:480,size:14.1},
  {id:41,name:'Mindset – Tâm thế thành công (sách nói)',by:'Carol S. Dweck',cat:'audiobook',aud:['sinhvien','giaovien'],nxb:'EduMart Audio',price:75000,old:110000,rate:4.8,sold:1560,c:'#4a1e7a',audio:true,narrator:'Lan Anh',duration:320,format:'MP3'},
  {id:42,name:'Atomic Habits – Thói quen nguyên tử (sách nói)',by:'James Clear',cat:'audiobook',aud:['sinhvien','giaovien'],nxb:'EduMart Audio',price:85000,old:125000,rate:4.9,sold:3120,c:'#c1572f',tag:'hot',audio:true,narrator:'Minh Khoa',duration:410,format:'MP3'},
  {id:43,name:'The Power of Now – Sức mạnh hiện tại (sách nói)',by:'Eckhart Tolle',cat:'audiobook',aud:['sinhvien'],nxb:'EduMart Audio',price:79000,old:115000,rate:4.7,sold:890,c:'#1a5a5a',audio:true,narrator:'Thu Giang',duration:295,format:'MP3'},
  {id:23,name:'Tắt đèn',by:'Ngô Tất Tố',cat:'sach',aud:['thpt'],nxb:'NXB Văn Học',price:72000,old:95000,rate:4.7,sold:2100,c:'#5a3a2a',isbn:'9786041023345'},
  {id:24,name:'Cây chuối non đi giày xanh',by:'Nguyễn Nhật Ánh',cat:'sach',aud:['thcs','thpt'],nxb:'NXB Trẻ',price:110000,old:135000,rate:4.9,sold:4300,c:'#2f8f6a',isbn:'9786041112780'},
  {id:25,name:'Bộ SGK lớp 1 - Cánh Diều',by:'NXB ĐH Sư Phạm',cat:'sach',aud:['tieuhoc'],nxb:'Cánh Diều',price:165000,old:210000,rate:4.8,sold:1800,c:'#c1572f',instock:false}
];

/* ---------------- Thể loại sách (genre) ---------------- */
const GENRE={sgk:'Sách giáo khoa',thamkhao:'Sách tham khảo',vanhoc:'Văn học',thieunhi:'Thiếu nhi',kynang:'Kỹ năng sống',ngoaingu:'Ngoại ngữ'};
const GENREDESC={
  sgk:'Sách giáo khoa các bộ Kết nối tri thức, Chân trời sáng tạo, Cánh diều theo lớp.',
  thamkhao:'Sách bài tập, luyện thi và tài liệu tham khảo theo môn học, cấp học.',
  vanhoc:'Tác phẩm văn học trong và ngoài chương trình, kinh điển đến hiện đại.',
  thieunhi:'Truyện tranh, sách kỹ năng và thế giới diệu kỳ cho các bạn nhỏ.',
  kynang:'Phát triển bản thân, tư duy và thói quen tốt cho học sinh, sinh viên.',
  ngoaingu:'Sách học tiếng Anh và ngoại ngữ: từ vựng, giao tiếp, luyện thi.'
};
const BOOKDESC={
  2:'Tác phẩm kinh điển của Tô Hoài kể về cuộc phiêu lưu kỳ thú của chú Dế Mèn — người bạn đồng hành tuổi thơ không thể thiếu của nhiều thế hệ bạn đọc Việt Nam.',
  3:'Giải thưởng Nobel Kinh tế học — Daniel Kahneman khám phá hai hệ thống tư duy của não bộ và cách chúng ảnh hưởng đến mọi quyết định trong cuộc sống hàng ngày.',
  4:'Tình yêu học trò trong sáng của Ngạn và Hà Lan trải qua bao năm tháng — kiệt tác văn học xúc động nhất của Nguyễn Nhật Ánh, đã được chuyển thể thành phim điện ảnh.',
  5:'Phương pháp khoa học giúp xây dựng thói quen tốt thông qua những thay đổi nhỏ bé hàng ngày. Cuốn sách đã thay đổi tư duy của hàng triệu độc giả trên toàn thế giới.',
  6:'Bộ đề thi thử và tài liệu luyện thi THPT Quốc gia môn Toán được biên soạn kỹ lưỡng bởi đội ngũ chuyên gia tại NXB Đại học Quốc gia Hà Nội.',
  20:'Nghệ thuật giao tiếp và chinh phục lòng người — một trong những cuốn sách phát triển bản thân bán chạy nhất mọi thời đại của Dale Carnegie.',
  23:'Hành trình khám phá bản thân qua triết học thiền định — tác phẩm của Thích Nhất Hạnh giúp người đọc tìm lại sự bình yên trong cuộc sống hiện đại.',
  24:'Câu chuyện tình yêu đầy xúc động về mất mát và hành trình chữa lành của Haruki Murakami — bestseller số một Nhật Bản nhiều năm liền.',
  42:'Khám phá tư duy tài chính khác biệt giữa người giàu và người nghèo qua cách họ dạy con về tiền bạc, đầu tư và tự do tài chính.',
  43:'Nhật ký Anne Frank — tài liệu lịch sử đầy xúc động về một cô gái Do Thái ghi lại cuộc sống ẩn náu trong thời kỳ Thế chiến II.',
};
const GENRE_MAP={1:'sgk',2:'thieunhi',3:'kynang',4:'vanhoc',5:'kynang',6:'thamkhao',15:'kynang',16:'ngoaingu',17:'kynang',18:'thamkhao',19:'thamkhao',20:'kynang',21:'kynang',22:'ngoaingu',23:'vanhoc',24:'thieunhi',25:'sgk',35:'vanhoc',36:'thamkhao',37:'kynang',38:'sgk',39:'kynang',40:'ngoaingu',41:'kynang',42:'kynang',43:'kynang'};
P.forEach(p=>{if(GENRE_MAP[p.id])p.genre=GENRE_MAP[p.id];});
const NEW_DATE_MAP={1:'2025-09-01',2:'2024-08-15',3:'2026-05-28',4:'2026-05-15',5:'2026-06-01',6:'2025-08-10',15:'2025-12-01',16:'2026-04-10',17:'2026-05-20',18:'2025-10-15',19:'2025-11-01',20:'2025-10-01',21:'2026-03-15',22:'2026-04-20',23:'2025-07-15',24:'2026-04-20',25:'2025-08-01',26:'2025-09-15',27:'2025-10-20',28:'2026-05-01',35:'2026-02-10',36:'2025-12-15',37:'2026-06-10',38:'2025-11-20',39:'2026-05-20',40:'2026-06-15',41:'2026-04-25',42:'2026-06-05',43:'2026-03-10'};
P.forEach(p=>{if(NEW_DATE_MAP[p.id])p.releaseDate=NEW_DATE_MAP[p.id];});

/* ---------------- Tìm theo tâm trạng ---------------- */
const MOODS=[
  {e:'🌸',l:'Sách nhẹ nhàng',      k:'nhe-nhang', kw:['nhẹ nhàng','nhẹ','thư giãn'],   fn:p=>p.cat==='sach'&&p.genre==='vanhoc'&&p.rate>=4.3},
  {e:'⚡',l:'Truyền cảm hứng',      k:'cam-hung',  kw:['cảm hứng','động lực','truyền cảm'],fn:p=>p.genre==='kynang'&&p.rate>=4.5},
  {e:'🌙',l:'Đọc trước khi ngủ',   k:'truoc-ngu', kw:['ngủ','buổi tối','trước khi ngủ'],fn:p=>!!p.audio||(p.genre==='vanhoc'&&p.rate>=4.5)},
  {e:'🎯',l:'Ôn thi hiệu quả',     k:'on-thi',    kw:['ôn thi','luyện thi','thi cử'],    fn:p=>['sgk','thamkhao'].includes(p.genre)},
  {e:'🌍',l:'Mở mang tầm nhìn',    k:'tam-nhin',  kw:['tầm nhìn','mở mang','ngoại ngữ'],fn:p=>p.genre==='ngoaingu'||(p.genre==='kynang'&&p.rate>=4.7)},
  {e:'👶',l:'Sách cho bé',          k:'cho-be',    kw:['bé','thiếu nhi','trẻ em'],        fn:p=>p.genre==='thieunhi'},
];

/* ---------------- Bộ sưu tập (global) ---------------- */
const COLLS=[
  {id:'bien-tap', tag:'Tuyển chọn biên tập', aud:'all', genre:'vanhoc',
   title:'100 cuốn sách nên đọc trong đời',
   desc:'Hành trình văn học vượt thời gian, từ kinh điển đến hiện đại.',
   img:'1771647287015-f30dbb239646', tint:'rgba(120,30,20,.6)',
   bookIds:[4,5,3,20,23,24,2,42,43]},
  {id:'hoc-duong', tag:'Học đường', aud:'hocsinh', genre:'mixed',
   title:'Sách kinh điển cho học sinh',
   desc:'Những tác phẩm trong và ngoài chương trình nuôi dưỡng tâm hồn.',
   img:'1535688391459-479d308104f8', tint:'rgba(30,50,80,.5)',
   bookIds:[1,2,23,6,18,25]},
  {id:'on-thi', tag:'Ôn thi', aud:'hocsinh', genre:'thamkhao',
   title:'Luyện thi THPT Quốc gia',
   desc:'Tuyển tập đề và sách luyện thi tinh gọn theo từng môn học.',
   img:'1514369118554-e20d93546b30', tint:'rgba(80,55,15,.55)',
   bookIds:[6,18,38,17,36]},
  {id:'nguoi-tre', tag:'Người trẻ', aud:'sinhvien', genre:'kynang',
   title:'Phát triển bản thân cho sinh viên',
   desc:'Tư duy, kỹ năng và những thói quen tốt dành cho người trẻ.',
   img:'1570945880236-10f34833a271', tint:'rgba(30,65,40,.52)',
   bookIds:[5,3,17,37,39,15,41,43]},
  {id:'thieu-nhi', tag:'Thiếu nhi', aud:'thieunhi', genre:'thieunhi',
   title:'Sách thiếu nhi hay nhất',
   desc:'Thế giới diệu kỳ và những bài học đầu đời cho các bạn nhỏ.',
   img:'1777639629798-e3e75d967d3d', tint:'rgba(80,25,55,.5)',
   bookIds:[2,24,19,9,53,54]},
  {id:'suu-tam', tag:'Sưu tầm', aud:'all', genre:'vanhoc',
   title:'Sách cũ & sách hiếm',
   desc:'Những ấn bản đặc biệt và bản in đầu từ nhà cung cấp uy tín.',
   img:'1644211492216-8a5e874023f4', tint:'rgba(40,28,18,.55)',
   bookIds:[23,4,24,20,21,22]},
];

/* Mục lục (TOC) cho từng ebook, danh sách track cho audiobook */
const EBOOK_TOC={
  15:['Lập trình là gì & tại sao học JavaScript?','Biến, kiểu dữ liệu và toán tử','Cấu trúc điều khiển & vòng lặp','Hàm, closure và scope','DOM, sự kiện và dự án thực tế'],
  16:['Vượt rào ngại ngùng khi nói tiếng Anh','Phát âm chuẩn & ngữ điệu tự nhiên','Mẫu câu giao tiếp thiết yếu','Từ vựng theo tình huống hàng ngày','Luyện tập & tự tin hội thoại'],
  17:['Tư duy phản biện là gì & vì sao cần?','Nhận diện lỗi lập luận phổ biến','Đặt câu hỏi đúng — kỹ năng cốt lõi','Phân tích thông tin và nguồn tin','Ứng dụng trong học tập & cuộc sống'],
  18:['Tổng quan cấu trúc đề thi THPTQG','Ngữ văn: lý thuyết & luyện đề thực chiến','Toán học: công thức & bài tập chọn lọc','Tiếng Anh: ngữ pháp & từ vựng trọng điểm','Chiến lược ôn thi & quản lý thời gian hiệu quả'],
  19:['Số học thú vị qua câu chuyện','Hình học & không gian qua trò chơi','Tư duy logic & sáng tạo','Cộng trừ nhân chia theo hình ảnh','Ôn luyện vui cùng bài tập minh họa'],
  28:['Thiết kế bài dạy theo chuẩn năng lực 4.0','Mục tiêu & chuẩn đầu ra theo thang Bloom','Hoạt động học tập chủ động & hợp tác','Đánh giá quá trình và phản hồi hiệu quả','Mẫu giáo án & hồ sơ dạy học hoàn chỉnh'],
  35:['Tổng quan cấu trúc đề Ngữ văn THPTQG','Nam Cao & Nguyễn Tuân: phân tích chuyên sâu','Thơ Tố Hữu, Xuân Quỳnh & thơ kháng chiến','Văn bản nghị luận: kỹ thuật phân tích đề','Mẫu dàn ý & bài văn mẫu đạt điểm cao'],
  36:['Nguyên tử, phân tử & cấu trúc chất','Bảng tuần hoàn & tính chất các nguyên tố','Phản ứng hóa học & cân bằng phương trình','Hóa hữu cơ cơ bản & bài tập thực hành','Đề ôn luyện có đáp án giải chi tiết'],
  37:['Biết cách học — nền tảng thành công','Quản lý thời gian & lịch học tập hiệu quả','Đọc chủ động, ghi chú & ghi nhớ lâu dài','Kỹ năng viết báo cáo & thuyết trình','Học nhóm, ôn thi & vượt áp lực'],
  38:['Số học & phép tính: ôn luyện toàn diện','Phân số, tỉ số và bài toán đố','Hình học phẳng — diện tích & chu vi','Thống kê và biểu đồ đơn giản','Bộ đề thi thử cuối năm có lời giải'],
  39:['Cài đặt Python & làm quen môi trường','Kiểu dữ liệu, biến và cấu trúc điều khiển','Hàm, module và lập trình hướng đối tượng','Xử lý file, API & thư viện phổ biến','Dự án thực tế: web scraper & data dashboard'],
  40:['Tổng quan IELTS & lộ trình học 3 tháng','Listening: chiến thuật & bài luyện theo band','Reading: kỹ thuật skimming/scanning & đề thật','Writing Task 1 & 2: cấu trúc & mẫu câu band 7+','Speaking: giao tiếp tự nhiên & mock test'],
};
const AUDIO_TRACKS={
  20:[{t:'Phần 1: Kỹ thuật cơ bản về xử lý người',d:72},{t:'Phần 2: Sáu cách lấy lòng người',d:85},{t:'Phần 3: Mười hai cách thu phục cảm tình',d:91},{t:'Phần 4: Chín cách thuyết phục người khác',d:78},{t:'Phần 5: Viết thư & nghệ thuật giao tiếp',d:46}],
  21:[{t:'Phần 1: Hai hệ thống tư duy',d:110},{t:'Phần 2: Heuristics & thiên kiến nhận thức',d:108},{t:'Phần 3: Sự tự tin thái quá',d:95},{t:'Phần 4: Lựa chọn, giá trị & kết quả',d:120},{t:'Phần 5: Kinh nghiệm và ký ức',d:107}],
  22:[{t:'Ngày 1–10: Phát âm nền tảng',d:52},{t:'Ngày 11–20: Hội thoại hàng ngày',d:58},{t:'Ngày 21–30: Tình huống công sở',d:55},{t:'Ngày 31–40: Du lịch & mua sắm',d:48},{t:'Ngày 41–50: Nâng cao & luyện thi',d:35}],
  41:[{t:'Phần 1: Hai tư duy — Cố định và Phát triển',d:68},{t:'Phần 2: Tư duy trong học đường & thể thao',d:72},{t:'Phần 3: Tư duy trong kinh doanh & lãnh đạo',d:65},{t:'Phần 4: Các mối quan hệ & tư duy Phát triển',d:70},{t:'Phần 5: Hành trình thay đổi tư duy',d:45}],
  42:[{t:'Phần 1: Nền tảng — Tại sao thói quen quan trọng',d:82},{t:'Phần 2: Quy luật 1 & 2: Rõ ràng & Hấp dẫn',d:88},{t:'Phần 3: Quy luật 3 & 4: Dễ dàng & Thỏa mãn',d:90},{t:'Phần 4: Thói quen nâng cao & vượt giới hạn',d:85},{t:'Phần 5: Xây dựng hệ thống sống tốt hơn',d:65}],
  43:[{t:'Phần 1: Bạn không phải là tâm trí của bạn',d:58},{t:'Phần 2: Ý thức — Vượt qua đau khổ',d:62},{t:'Phần 3: Đi sâu vào thời khắc hiện tại',d:60},{t:'Phần 4: Chiến lược tâm trí & cảm xúc',d:55},{t:'Phần 5: Sống với sự thức tỉnh',d:60}],
};
P.forEach(p=>{if(EBOOK_TOC[p.id])p.toc=EBOOK_TOC[p.id];if(AUDIO_TRACKS[p.id])p.tracks=AUDIO_TRACKS[p.id];});

/* ---------------- Ebook: nội dung, sở hữu, tiến độ đọc ---------------- */
function ebookChapters(p){
  const titles=p.toc||['Lời mở đầu','Nền tảng cốt lõi','Thực hành & ví dụ','Nâng cao và mở rộng','Tổng kết & lộ trình'];
  const pagesPerCh=Math.round((p.pages||200)/titles.length);
  return titles.map((t,i)=>({
    t:t,
    pages:pagesPerCh,
    body:'<p>Đây là nội dung minh họa của ebook <b>"'+p.name+'"</b> do '+p.by+' biên soạn, phát hành bởi '+p.nxb+'.</p>'+
      '<p>'+(i===0
        ? 'Chương mở đầu giới thiệu mục tiêu, đối tượng phù hợp và cách học hiệu quả nhất. Bạn đang đọc bản xem thử — hãy sở hữu ebook để mở khóa toàn bộ '+p.pages+' trang.'
        : 'Chương này đi sâu vào chủ đề: <em>'+t+'</em>. Nội dung được trình bày mạch lạc với ví dụ thực tế, bài tập áp dụng và lưu ý quan trọng cho người tự học.')+'</p>'+
      '<p>Tiến độ đọc được lưu tự động. Bạn có thể đánh dấu trang, thêm ghi chú và đổi giao diện bằng thanh công cụ phía trên.</p>'+
      '<p style="color:var(--text-soft);font-size:13px;border-top:1px solid var(--line);padding-top:14px;margin-top:22px">— Nội dung minh họa · '+t+' · ~'+pagesPerCh+' trang —</p>'
  }));
}
let library = LS.get('library',[]);          // ebook/audiobook id đã sở hữu vĩnh viễn
function isOwned(id){return library.includes(Number(id));}
function grantEbook(id){id=Number(id);if(!isOwned(id)){library.push(id);LS.set('library',library);}}
function readProgress(){return LS.get('readprog',{});}
function setReadProgress(id,ch){const m=readProgress();m[id]=ch;LS.set('readprog',m);}

/* Thuê ebook có thời hạn */
let rentals = LS.get('rentals',{});          // {id: timestamp hết hạn}
function rentalActive(id){const e=rentals[Number(id)];return !!e&&e>Date.now();}
function rentDaysLeft(id){const e=rentals[Number(id)];if(!e||e<=Date.now())return 0;return Math.ceil((e-Date.now())/86400000);}
function hasAccess(id){return isOwned(id)||rentalActive(id);}
function rentEbook(id,days){id=Number(id);rentals[id]=Date.now()+days*86400000;LS.set('rentals',rentals);}

/* Bookmark & ghi chú trong trình đọc */
let bookmarks = LS.get('bookmarks',{});       // {id:[chương đã đánh dấu]}
let notesStore = LS.get('notes',{});          // {id:[{ch,text}]}
function isBookmarked(id,ch){return (bookmarks[Number(id)]||[]).includes(ch);}
function toggleBookmark(id){id=Number(id);const arr=bookmarks[id]||[];const i=arr.indexOf(readerCh);if(i>=0)arr.splice(i,1);else arr.push(readerCh);bookmarks[id]=arr;LS.set('bookmarks',bookmarks);toast(i>=0?'Đã bỏ đánh dấu':'Đã đánh dấu chương này');renderReader();}
function addReaderNote(id){id=Number(id);const t=val('noteInput');if(!t){toast('Nhập nội dung ghi chú nhé');return;}(notesStore[id]=notesStore[id]||[]).push({ch:readerCh,text:t,ts:todayStr()});LS.set('notes',notesStore);toast('Đã lưu ghi chú');renderReader();}
function delReaderNote(id,idx){notesStore[Number(id)].splice(idx,1);LS.set('notes',notesStore);renderReader();}

/* Audiobook: thời lượng, vị trí nghe */
function fmtTime(s){s=Math.max(0,Math.floor(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),ss=s%60;const mm=String(m).padStart(2,'0'),s2=String(ss).padStart(2,'0');return h>0?h+':'+mm+':'+s2:m+':'+s2;}
function audioPos(){return LS.get('audiopos',{});}
function setAudioPos(id,sec){const m=audioPos();m[id]=sec;LS.set('audiopos',m);}

const ICONS = {
  pen:'<path d="M5 19l1-4L17 4l3 3L9 18l-4 1Z"/>',
  note:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="9" r="1"/>',
  bag:'<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2"/>',
  ruler:'<path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 7v4M12 7v6M16 7v4"/>',
  tool:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3 3Z"/><path d="M5 21l9.4-9.4M3 3l3.4 3.4M2 8l4-4M8 2l-4 4"/>',
  flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  board:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M12 17v4M8 21h8"/>',
  micro:'<circle cx="10" cy="14" r="5"/><path d="M10 9V3M7 5h6M10 19v2M5 14H3M17 14h1"/>',
  screen:'<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21h8M12 16v5"/>',
  lamp:'<path d="M9 21h6M12 3a6 6 0 0 1 5 9.47L15 17H9l-2-4.53A6 6 0 0 1 12 3Z"/><path d="M9 17h6"/>',
  cam:'<rect x="2" y="8" width="20" height="12" rx="2"/><circle cx="12" cy="14" r="3"/><path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>'
};

function cover(p,scale){
  if(p.cat==='sach'||p.cat==='ebook'||p.cat==='audiobook'){
    const rb=p.audio?'<span class="eb-ribbon audio">AUDIO</span>':p.ebook?'<span class="eb-ribbon">E-BOOK</span>':'';
    return '<div class="book-cover'+(p.ebook||p.audio?' ebook':'')+'" style="background:linear-gradient(150deg,'+p.c+',rgba(0,0,0,.35))">'+rb+'<div class="bc-t">'+p.name+'</div><div class="bc-a">'+p.by+'</div></div>';
  }
  return '<div class="obj-cover" style="background:linear-gradient(150deg,'+p.c+',rgba(0,0,0,.3))"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[p.icon]||'')+'</svg></div>';
}
function discount(p){return Math.round((1-p.price/p.old)*100);}

/* ---------------- Cart ---------------- */
let cart = LS.get('cart',{});
function saveCart(){LS.set('cart',cart);}
function addToCart(id,qty){
  qty=qty||1; cart[id]=(cart[id]||0)+qty;
  saveCart(); updateCartCount(); toast('Đã thêm vào giỏ hàng');
}
function setQty(id,q){ if(q<=0){delete cart[id];}else{cart[id]=q;} saveCart(); updateCartCount(); if(view==='cart')renderCart(); }
function updateCartCount(){
  const n=Object.values(cart).reduce((a,b)=>a+b,0);
  const el=document.getElementById('cartCount');
  el.textContent=n; el.style.display=n>0?'flex':'none';
}
function cartSubtotal(){return Object.entries(cart).reduce((s,[id,q])=>s+P.find(x=>x.id==id).price*q,0);}

let voucherPct=0;
function applyVoucher(){
  const code=document.getElementById('vCode').value.trim().toUpperCase();
  if(code==='EDU10'){voucherPct=10;toast('Áp dụng EDU10 — giảm 10%');}
  else if(code==='GIAOVIEN'){voucherPct=15;toast('Ưu đãi giáo viên — giảm 15%');}
  else {voucherPct=0;toast('Mã không hợp lệ');}
  renderCart();
}

/* ---------------- Wishlist ---------------- */
let wishlist = LS.get('wishlist',[]);          // mảng id sản phẩm
function inWish(id){return wishlist.includes(Number(id));}
function toggleWish(id){
  id=Number(id);
  if(inWish(id)){wishlist=wishlist.filter(x=>x!==id);toast('Đã bỏ khỏi yêu thích');}
  else{wishlist.push(id);toast('Đã lưu vào yêu thích');addNotif('Đã thêm "'+P.find(p=>p.id===id).name+'" vào danh sách yêu thích');}
  LS.set('wishlist',wishlist); updateWishCount();
  if(view==='wishlist')renderWishlist();
  // cập nhật icon tim đang hiển thị
  document.querySelectorAll('[data-wish="'+id+'"]').forEach(el=>el.classList.toggle('on',inWish(id)));
}
function updateWishCount(){
  const el=document.getElementById('wishCount'); if(!el)return;
  el.textContent=wishlist.length; el.style.display=wishlist.length>0?'flex':'none';
}

/* ---------------- Recently viewed ---------------- */
let recentIds = LS.get('recent',[]);
function pushRecent(id){
  id=Number(id); recentIds=[id,...recentIds.filter(x=>x!==id)].slice(0,8);
  LS.set('recent',recentIds);
}

/* ---------------- Notifications ---------------- */
let notifs = LS.get('notifs',[
  {t:'Chào mừng bạn đến EduMart! Nhập mã EDU10 để giảm 10% đơn đầu tiên.',time:'Hôm nay',read:false},
  {t:'Flash Sale sách tham khảo đang diễn ra — giảm tới 40%.',time:'Hôm nay',read:false}
]);
function saveNotifs(){LS.set('notifs',notifs);updateNotifCount();}
function addNotif(text){notifs.unshift({t:text,time:'Vừa xong',read:false});saveNotifs();}
function updateNotifCount(){
  const el=document.getElementById('notifCount'); if(!el)return;
  const n=notifs.filter(x=>!x.read).length;
  el.textContent=n; el.style.display=n>0?'flex':'none';
}

/* ---------------- Reviews & Q&A (per product) ---------------- */
let reviewsStore = LS.get('reviews',{});   // {id:[{a,name,rate,text,img,date}]}
let questionsStore = LS.get('questions',{}); // {id:[{q,a,date}]}

/* ---------------- B2B / RFQ ---------------- */
let rfqs = LS.get('rfqs',[]);

/* ---------------- Toast ---------------- */
let toastT;
function toast(msg){
  const t=document.getElementById('toast');
  t.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ee0a8" stroke-width="2.5"><path d="m5 13 4 4L19 7"/></svg>'+msg;
  t.classList.add('show'); clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),1900);
}

/* ---------------- Router ---------------- */
let view='home', arg=null;
let srchHistory=LS.get('srchHistory',[]);

function normVi(s){return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[đĐ]/g,'d');}

function go(v,a){if(typeof audioTimer!=='undefined'){clearInterval(audioTimer);audioPlaying=false;}view=v;arg=a||null;window.scrollTo(0,0);searchClose();render();}
function doSearch(){const q=document.getElementById('searchInput')?.value.trim();if(q)searchExec(q);}

function searchSuggest(){
  const inp=document.getElementById('searchInput');
  const drop=document.getElementById('searchDrop');
  if(!inp||!drop)return;
  const q=inp.value.trim();
  const qn=normVi(q);
  let html='';
  if(!q){
    const hist=LS.get('srchHistory',[]);
    srchHistory=hist;
    if(hist.length>0){
      html+='<div class="sdrop-sec"><div class="sdrop-sh"><span>Tìm kiếm gần đây</span><button class="sdrop-clr" onclick="clearSrchHistory()">Xóa tất cả</button></div>';
      hist.slice(0,5).forEach(h=>{
        const he=h.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
        html+='<div class="sdrop-item" onclick="searchExec(\''+he+'\')">'+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>'+
          '<span>'+h+'</span>'+
          '<button class="sdrop-del" onclick="event.stopPropagation();removeSrchHistory(\''+he+'\')" title="Xóa">×</button>'+
        '</div>';
      });
      html+='</div>';
    }
    const TRENDS=['Atomic Habits','Đắc Nhân Tâm','Nguyễn Nhật Ánh','SGK lớp 6','Luyện IELTS','Bút Thiên Long','Sách kỹ năng','Tư duy tích cực','Casio fx-991','Vở Campus','Sách thiếu nhi'];
    const trendIcon='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
    html+='<div class="sdrop-sec"><div class="sdrop-sh">Xu hướng tìm kiếm</div>'+
      '<div class="sdrop-trend-row">'+
      TRENDS.map(t=>'<button class="trend-pill" onclick="searchExec(\''+t.replace(/'/g,"\\'")+'\')" >'+trendIcon+t+'</button>').join('')+
      '</div></div>';
    html+='<div class="sdrop-sec sdrop-moods"><div class="sdrop-sh">Tâm trạng của bạn hôm nay?</div>'+
      '<div class="sdrop-mood-row">'+
      MOODS.map(m=>'<button class="mood-chip" onclick="go(\'listing\',\'mood:'+m.k+'\');searchClose()">'+m.e+' '+m.l+'</button>').join('')+
      '</div></div>';
  } else {
    const matches=P.filter(p=>normVi(p.name).includes(qn)||normVi(p.by).includes(qn)||(p.nxb&&normVi(p.nxb).includes(qn))).slice(0,5);
    if(matches.length>0){
      html+='<div class="sdrop-sec"><div class="sdrop-sh">Sách &amp; sản phẩm</div>';
      matches.forEach(p=>{
        const hl=s=>{try{return String(s).replace(new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'),m=>'<mark>'+m+'</mark>');}catch(e){return s;}};
        const slug=HIMG[p.id];
        const thumb=slug?'<img src="'+uimg(slug,60)+'" class="sdrop-thumb" loading="lazy">':'<div class="sdrop-thumb-ph" style="background:'+p.c+'"></div>';
        html+='<div class="sdrop-item" onclick="go(\'product\','+p.id+');searchClose()">'+
          thumb+
          '<div class="sdrop-pinfo"><div class="sdrop-pname">'+hl(p.name)+'</div><div class="sdrop-pby">'+hl(p.by)+'</div></div>'+
          '<div class="sdrop-pprice">'+fmt(p.price)+'</div>'+
        '</div>';
      });
      html+='</div>';
    }
    const cats=[
      {k:'sach giao khoa',l:'Sách giáo khoa',c:'sgk'},{k:'van hoc',l:'Văn học',c:'vanhoc'},
      {k:'thieu nhi',l:'Thiếu nhi',c:'thieunhi'},{k:'ky nang',l:'Kỹ năng sống',c:'kynang'},
      {k:'ngoai ngu',l:'Ngoại ngữ',c:'ngoaingu'},{k:'van phong pham',l:'Văn phòng phẩm',c:'vpp'},
      {k:'thiet bi giao duc',l:'Thiết bị giáo dục',c:'tbgd'},{k:'ebook',l:'Ebook',c:'ebook'},
      {k:'sach noi',l:'Sách nói',c:'audiobook'},{k:'tham khao',l:'Sách tham khảo',c:'thamkhao'},
    ];
    const catHits=cats.filter(x=>x.k.includes(qn)||normVi(x.l).includes(qn)).slice(0,3);
    if(catHits.length>0){
      html+='<div class="sdrop-sec"><div class="sdrop-sh">Danh mục</div>';
      catHits.forEach(cat=>{
        html+='<div class="sdrop-item" onclick="go(\'listing\',\''+cat.c+'\');searchClose()">'+
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'+
          '<span>'+cat.l+'</span>'+
        '</div>';
      });
      html+='</div>';
    }
    const moodHit=MOODS.find(m=>m.kw.some(kw=>normVi(kw).includes(qn)||qn.includes(normVi(kw))));
    if(moodHit){
      const cnt=P.filter(moodHit.fn).length;
      html+='<div class="sdrop-item sdrop-mood-hint" onclick="go(\'listing\',\'mood:'+moodHit.k+'\');searchClose()">'+
        '<span class="sdrop-mood-ic">'+moodHit.e+'</span>'+
        '<span class="sdrop-mood-lbl">'+moodHit.l+'</span>'+
        '<span class="sdrop-mood-cnt">'+cnt+' sách</span>'+
      '</div>';
    }
    if(!matches.length&&!catHits.length&&!moodHit){
      html+='<div class="sdrop-empty">Không tìm thấy gợi ý cho "<strong>'+q+'</strong>"</div>';
    }
    html+='<div class="sdrop-all" onclick="doSearch()">Xem tất cả kết quả cho "<strong>'+q+'</strong>" →</div>';
  }
  drop.innerHTML=html;
  drop.style.display='';
}

function searchClose(){
  const drop=document.getElementById('searchDrop');
  if(drop)drop.style.display='none';
}

function searchExec(q){
  const inp=document.getElementById('searchInput');
  if(inp)inp.value=q;
  if(!srchHistory.includes(q)){srchHistory.unshift(q);srchHistory=srchHistory.slice(0,10);LS.set('srchHistory',srchHistory);}
  searchClose();
  go('listing',{q});
}

function clearSrchHistory(){srchHistory=[];LS.set('srchHistory',[]);searchSuggest();}
function removeSrchHistory(q){srchHistory=srchHistory.filter(h=>h!==q);LS.set('srchHistory',srchHistory);searchSuggest();}

/* ---------------- Voice search ---------------- */
function startVoiceSearch(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const btn=document.getElementById('micBtn');
  if(!SR){if(btn)btn.title='Trình duyệt chưa hỗ trợ';return;}
  const r=new SR();
  r.lang='vi-VN';r.interimResults=false;r.maxAlternatives=1;
  r.onstart=()=>{if(btn)btn.classList.add('listening');};
  r.onend=()=>{if(btn)btn.classList.remove('listening');};
  r.onresult=e=>{
    const q=(e.results[0][0].transcript||'').trim();
    if(!q)return;
    const inp=document.getElementById('searchInput');
    if(inp)inp.value=q;
    searchExec(q);
  };
  r.onerror=()=>{if(btn)btn.classList.remove('listening');};
  r.start();
}

/* ---------------- ISBN camera scan ---------------- */
let _isbnStream=null,_isbnTimer=null;
function openISBNScan(){
  if(!navigator.mediaDevices?.getUserMedia){alert('Trình duyệt không hỗ trợ camera');return;}
  document.getElementById('isbnModal').style.display='flex';
  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}})
    .then(stream=>{
      _isbnStream=stream;
      const vid=document.getElementById('isbnVideo');
      vid.srcObject=stream;vid.play();
      const BD=window.BarcodeDetector;
      if(BD){
        const det=new BD({formats:['ean_13','ean_8','upc_a','upc_e']});
        _isbnTimer=setInterval(async()=>{
          try{
            const res=await det.detect(vid);
            if(res.length){
              const isbn=res[0].rawValue;
              closeISBNModal();
              const found=P.find(p=>p.isbn===isbn);
              if(found)go('product',found.id);
              else{const inp=document.getElementById('searchInput');if(inp)inp.value=isbn;searchExec(isbn);}
            }
          }catch(e){}
        },400);
      }
    })
    .catch(()=>{closeISBNModal();alert('Không thể mở camera. Vui lòng kiểm tra quyền truy cập.');});
}
function closeISBNModal(){
  clearInterval(_isbnTimer);
  if(_isbnStream)_isbnStream.getTracks().forEach(t=>t.stop());
  _isbnStream=null;
  const m=document.getElementById('isbnModal');
  if(m)m.style.display='none';
}
function submitManualISBN(){
  const val=(document.getElementById('isbnManual')?.value||'').trim();
  if(!val)return;
  closeISBNModal();
  const found=P.find(p=>p.isbn===val);
  if(found)go('product',found.id);
  else searchExec(val);
}

function render(){
  if(view==='home')renderHome();
  else if(view==='listing')renderListing();
  else if(view==='product')renderProduct();
  else if(view==='cart')renderCart();
  else if(view==='huyenhoc')renderHuyenHoc();
  else if(view==='account')renderAccount();
  else if(view==='checkout')renderCheckout();
  else if(view==='orderdone')renderOrderDone();
  else if(view==='wishlist')renderWishlist();
  else if(view==='order')renderOrderDetail();
  else if(view==='notif')renderNotifications();
  else if(view==='rfq')renderRFQ();
  else if(view==='classlist')renderClassList();
  else if(view==='promo')renderPromoHub();
  else if(view==='wheel')renderWheel();
  else if(view==='missions')renderMissions();
  else if(view==='referral')renderReferral();
  else if(view==='reader')renderReader();
  else if(view==='library')renderLibrary();
  else if(view==='player')renderPlayer();
  else if(view==='ebooks')renderEbookStore();
  else if(view==='stationery')renderVPPStore();
  else if(view==='equipment')renderTBGDStore();
  else if(view==='collections')renderCollections();
  else if(view==='bestseller')renderBestseller();
  else if(view==='newbooks')renderNewBooks();
}

/* ---------------- Cards ---------------- */
function pcard(p){
  return '<div class="pcard">'+
    '<div class="pcover" style="background:#f3ede3" onclick="go(\'product\','+p.id+')">'+
      (p.old>p.price?'<span class="badge">-'+discount(p)+'%</span>':'')+
      (p.instock===false?'<div class="oos-ov"></div><span class="badge-oos">Hết hàng</span>':'')+
      '<button class="fav'+(inWish(p.id)?' on':'')+'" data-wish="'+p.id+'" onclick="event.stopPropagation();toggleWish('+p.id+')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
      cover(p)+
    '</div>'+
    '<div class="pinfo">'+
      '<div class="nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="meta"><span class="star"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span>· đã bán '+(p.sold>=1000?(p.sold/1000).toFixed(1)+'k':p.sold)+'</div>'+
      '<div><span class="price">'+fmt(p.price)+'</span>'+(p.old>p.price?'<span class="price-old">'+fmt(p.old)+'</span>':'')+'</div>'+
      (p.instock===false?'<button class="add oos" disabled>Hết hàng</button>':'<button class="add" onclick="addToCart('+p.id+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>')+
    '</div></div>';
}

/* ---------------- Home ---------------- */
function triSearch(){
  const t=document.getElementById('tsTitle'),a=document.getElementById('tsAuthor'),k=document.getElementById('tsKw');
  const q=[t&&t.value,a&&a.value,k&&k.value].filter(Boolean).join(' ').trim();
  go('listing',{q:q});
}
/* Photo assets (Unsplash) for the redesigned home page */
const HIMG={1:'1595123550384-b81222e23cf9',2:'1513185041617-8ab03f83d6c5',3:'1456513080510-7bf3a84b82f8',4:'1595123336219-5eedd543bc4a',5:'1506880018603-83d5b814b5a6',7:'1501349800519-48093d60bde0',8:'1513542789411-b6a5d4f31634',9:'1516383607781-913a19294fd1',10:'1630343710506-89f8b9f21d31',11:'1762265591492-1454ae17f31a',12:'1761546571631-a4d61b55cd2f',13:'1761821170104-ccd3e3e21318',14:'1762831063505-68022b6133a9'};
const HTAG={1:'Bán chạy',4:'Yêu thích',7:'HOT',11:'Chính hãng'};
const GENT_SUBS={
  sgk:[
    {l:'Tiểu học',d:'Lớp 1 – 5',c:'#2d5a2d',bg:'#e8f4e8',t:'tieuhoc'},
    {l:'THCS',d:'Lớp 6 – 9',c:'#1e3a5a',bg:'#e8f0f8',t:'thcs'},
    {l:'THPT',d:'Lớp 10 – 12',c:'#7a3800',bg:'#fdf0e0',t:'thpt'},
    {l:'Giáo viên',d:'SGK & tài liệu tham khảo',c:'#1a5a2a',bg:'#e8f5ec',t:'giaovien'},
  ],
  thamkhao:[
    {l:'Tiểu học',d:'Bài tập & ôn luyện',c:'#2d5a2d',bg:'#e8f4e8',t:'tieuhoc'},
    {l:'THCS',d:'Nâng cao, luyện thi',c:'#1e3a5a',bg:'#e8f0f8',t:'thcs'},
    {l:'THPT',d:'Luyện thi đại học',c:'#7a3800',bg:'#fdf0e0',t:'thpt'},
    {l:'Sinh viên',d:'Giáo trình & bài tập',c:'#4a1e7a',bg:'#f0e8f8',t:'sinhvien'},
  ],
  vanhoc:[
    {l:'Thiếu nhi',d:'Truyện & cổ tích',c:'#2d5a2d',bg:'#e8f4e8',t:'tieuhoc'},
    {l:'Học sinh',d:'Trong & ngoài chương trình',c:'#1e3a5a',bg:'#e8f0f8',t:'thcs'},
    {l:'Người trẻ',d:'Tiểu thuyết, tản văn',c:'#4a1e7a',bg:'#f0e8f8',t:'sinhvien'},
    {l:'Người lớn',d:'Kinh điển & đương đại',c:'#7a3800',bg:'#fdf0e0',t:'sach'},
  ],
  thieunhi:[
    {l:'Mầm non',d:'Tranh truyện & tô màu',c:'#7a4500',bg:'#fff3e0',t:'tieuhoc'},
    {l:'Tiểu học',d:'Lớp 1 – 5',c:'#2d5a2d',bg:'#e8f4e8',t:'tieuhoc'},
    {l:'Thiếu niên',d:'Tuổi teen & teen fiction',c:'#1e3a5a',bg:'#e8f0f8',t:'thcs'},
    {l:'Phụ huynh',d:'Sách nuôi dạy con',c:'#6a1a3a',bg:'#f5eaf0',t:'sach'},
  ],
  kynang:[
    {l:'Học sinh',d:'Tư duy & thói quen tốt',c:'#1e3a5a',bg:'#e8f0f8',t:'thpt'},
    {l:'Sinh viên',d:'Giao tiếp & quản lý thời gian',c:'#4a1e7a',bg:'#f0e8f8',t:'sinhvien'},
    {l:'Giáo viên',d:'Nghiệp vụ & phát triển bản thân',c:'#1a5a2a',bg:'#e8f5ec',t:'giaovien'},
    {l:'Người đi làm',d:'Lãnh đạo & tài chính cá nhân',c:'#7a3800',bg:'#fdf0e0',t:'sach'},
  ],
  ngoaingu:[
    {l:'Tiểu học',d:'Tiếng Anh cho bé',c:'#2d5a2d',bg:'#e8f4e8',t:'tieuhoc'},
    {l:'THCS / THPT',d:'Luyện thi, giao tiếp',c:'#1e3a5a',bg:'#e8f0f8',t:'thcs'},
    {l:'Sinh viên',d:'TOEIC, IELTS, TOEFL',c:'#4a1e7a',bg:'#f0e8f8',t:'sinhvien'},
    {l:'Giáo viên',d:'Phương pháp giảng dạy',c:'#1a5a2a',bg:'#e8f5ec',t:'giaovien'},
  ],
};
function uimg(slug,w){return 'https://images.unsplash.com/photo-'+slug+'?auto=format&fit=crop&w='+(w||600)+'&q=80';}
function himg(id,w){return uimg(HIMG[id],w);}
const ARR='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

/* Home-only product card (photo cover) — does not touch the shared pcard() */
function hmCard(p,dark,rank){
  const isBook=p.cat==='sach';
  const overlay=isBook?'linear-gradient(to top,rgba(15,8,4,.68),rgba(15,8,4,.1) 55%,transparent)':'linear-gradient(to top,rgba(15,8,4,.3),transparent 60%)';
  const tag=HTAG[p.id];
  const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':p.sold;
  return '<div class="hm-card'+(dark?' dark':'')+'">'+
    '<div class="hm-cover" onclick="go(\'product\','+p.id+')">'+
      ((p.ebook||p.audio)
        ? '<div class="hm-ebcover" style="background:linear-gradient(150deg,'+p.c+',rgba(0,0,0,.42))">'+(p.audio?'<span class="eb-ribbon audio">AUDIO</span>':'<span class="eb-ribbon">E-BOOK</span>')+'<div class="ebt">'+p.name+'</div><div class="eba">'+p.by+'</div>'+(p.audio?'<div class="eba-play">▶</div>':'')+'</div>'
        : '<img src="'+himg(p.id,500)+'" alt="'+p.name+'" loading="lazy"><div class="hm-cov-ov" style="background:'+overlay+'"></div>'+(isBook?'<div class="hm-cov-tt"><div class="t">'+p.name+'</div><div class="a">'+p.by+'</div></div>':''))+
      '<span class="hm-disc">-'+discount(p)+'%</span>'+
      (tag?'<span class="hm-tag">'+tag+'</span>':'')+
      (rank?'<span class="hm-rank-num">'+rank+'</span>':'')+
      '<button class="hm-fav'+(inWish(p.id)?' on':'')+'" data-wish="'+p.id+'" onclick="event.stopPropagation();toggleWish('+p.id+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
    '</div>'+
    '<div class="hm-info">'+
      '<div class="hm-nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="hm-meta"><span class="hm-star"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span><span class="dot">·</span>Đã bán '+sold+'</div>'+
      '<div class="hm-price"><span class="now">'+fmt(p.price)+'</span><span class="old">'+fmt(p.old)+'</span></div>'+
      '<button class="hm-add" onclick="addToCart('+p.id+')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>'+
    '</div></div>';
}
function mkCrumb(items){
  // items: [[label], [label, onclickStr], ...] — last item = current page (no link)
  return '<nav class="breadcrumb" aria-label="breadcrumb">'+
    items.map((it,i)=>
      i===items.length-1
        ? '<span class="bc-cur">'+it[0]+'</span>'
        : '<a class="bc-a" onclick="'+it[1]+'">'+it[0]+'</a>'
    ).join('<span class="bc-sep">›</span>')+
  '</nav>';
}
function hmHead(title,kicker,target,linkView){
  const allLink=linkView
    ?'<a class="all" onclick="go(\''+linkView+'\')">Xem tất cả '+ARR+'</a>'
    :(target?'<a class="all" onclick="go(\'listing\',\''+target+'\')">Xem tất cả '+ARR+'</a>':'');
  return '<div class="hm-sechead"><div class="row"><div class="left">'+
    (kicker?'<span class="kick">'+kicker+'</span>':'')+'<h2>'+title+'</h2></div>'+
    allLink+
    '</div><div class="bar"></div></div>';
}
function hmColl(c,tall){
  return '<div class="hm-coll'+(tall?' tall':'')+'" onclick="go(\'listing\',\'coll:'+c.id+'\')">'+
    '<img src="'+uimg(c.img,800)+'" alt="'+c.title+'" loading="lazy">'+
    '<div class="tint" style="background:'+c.tint+'"></div><div class="grad"></div>'+
    '<span class="kick">'+c.tag+'</span>'+
    '<div class="body"><h3>'+c.title+'</h3><p>'+c.desc+'</p><span class="link">Xem danh sách '+ARR+'</span></div>'+
  '</div>';
}

function toggleGenSub(cat){
  const existing=document.getElementById('genSubPanel');
  document.querySelectorAll('.gen-card').forEach(c=>c.classList.remove('active'));
  if(existing&&existing.dataset.cat===cat){existing.remove();return;}
  if(existing)existing.remove();
  const subs=GENT_SUBS[cat];
  if(!subs)return;
  const card=document.querySelector('.gen-card[data-cat="'+cat+'"]');
  if(card)card.classList.add('active');
  const panel=document.createElement('div');
  panel.id='genSubPanel';
  panel.dataset.cat=cat;
  panel.className='gen-sub-panel';
  panel.innerHTML=
    '<div class="gsp-head">'+
      '<span class="gsp-title">Phân loại theo đối tượng</span>'+
      '<button class="gsp-close" onclick="toggleGenSub(\''+cat+'\')">'+
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>'+
      '</button>'+
    '</div>'+
    '<div class="gsp-grid">'+
      subs.map(s=>
        '<div class="gsp-card" style="background:'+s.bg+';border-color:'+s.c+'33" onclick="go(\'listing\',\''+s.t+'\')">'+
          '<div class="gsp-lbl" style="color:'+s.c+'">'+s.l+'</div>'+
          '<div class="gsp-desc">'+s.d+'</div>'+
          '<span class="gsp-link" style="color:'+s.c+'">Xem sách <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>'+
        '</div>'
      ).join('')+
    '</div>';
  const grid=document.getElementById('genGrid');
  if(grid)grid.after(panel);
}
function bsRankCard(p,rank){
  const slug=HIMG[p.id];
  const disc=p.old>p.price?Math.round((1-p.price/p.old)*100):0;
  const badge=disc>0?'<span class="bsr-badge disc">Giảm '+disc+'%</span>':(p.audio?'<span class="bsr-badge audio">Sách nói</span>':(p.ebook?'<span class="bsr-badge ebook">Ebook</span>':''));
  const cvr=slug?'<img src="'+uimg(slug,400)+'" alt="'+p.name+'" class="bsr-img" loading="lazy">':'<div class="bsr-grad" style="background:linear-gradient(155deg,'+p.c+',rgba(0,0,0,.6))"><div class="bsr-gnm">'+p.name+'</div><div class="bsr-gby">'+p.by+'</div></div>';
  const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':String(p.sold);
  return '<div class="bsr-card" onclick="go(\'product\','+p.id+')">'+
    '<div class="bsr-cover">'+cvr+'<div class="bsr-rank">'+rank+'</div>'+badge+'</div>'+
    '<div class="bsr-info">'+
      '<div class="bsr-title">'+p.name+'</div>'+
      '<div class="bsr-by">'+p.by+'</div>'+
      '<div class="bsr-rating">'+
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+
        '<span class="bsr-rate-val">'+p.rate.toFixed(1)+'</span>'+
        '<span class="bsr-rate-sold">· '+sold+' bán</span>'+
      '</div>'+
      '<div class="bsr-price">'+fmt(p.price)+'</div>'+
    '</div>'+
  '</div>';
}
function updateCatCircArr(){
  const r=document.getElementById('catcircRow');
  if(!r)return;
  const l=document.querySelector('.catcirc-arr-l');
  const rr=document.querySelector('.catcirc-arr-r');
  const atStart=r.scrollLeft<=4;
  const atEnd=r.scrollLeft+r.clientWidth>=r.scrollWidth-4;
  if(l)l.classList.toggle('vis',!atStart);
  if(rr)rr.classList.toggle('hidden',atEnd);
}
function updateShelfArrows(){
  const t=document.getElementById('shelfTrack');
  if(!t)return;
  const l=document.querySelector('.bs-arr-l');
  if(l)l.classList.toggle('vis',t.scrollLeft>4);
}
function shelfScroll(dir){
  const t=document.getElementById('shelfTrack');
  if(t){t.scrollBy({left:dir*560,behavior:'smooth'});setTimeout(updateShelfArrows,350);}
}

function renderHome(){
  const suppColors=['#1a7a4a','#d4547a','#1e3a8a','#7c3aed','#b45309','#0891b2','#dc2626','#9333ea'];
  const _suppMap={};P.forEach(p=>{if(p.nxb){if(!_suppMap[p.nxb])_suppMap[p.nxb]={name:p.nxb,count:0,cat:p.cat};_suppMap[p.nxb].count++;}});
  const topSupps=Object.values(_suppMap).sort((a,b)=>b.count-a.count).slice(0,6).map((s,i)=>{s.short=s.name.replace(/^(NXB|Nhà xuất bản)\s*/i,'').slice(0,2).toUpperCase();s.c=suppColors[i];return s;});
  const bsFiltBase=bstabFmt==='giay'?P.filter(p=>p.cat==='sach'&&!p.ebook&&!p.audio):bstabFmt==='ebook'?P.filter(p=>p.ebook):bstabFmt==='audio'?P.filter(p=>p.audio):P.filter(p=>p.cat==='sach'||p.ebook||p.audio);
  const bsFiltBooks=bsFiltBase.slice().sort((a,b)=>b.sold-a.sold).slice(0,4);
  const featBooks=P.filter(p=>p.cat==='sach').sort((a,b)=>b.sold*b.rate-a.sold*a.rate).slice(0,8);
  const bsTagMap={1:{l:'Bán chạy',c:'#c0392b'},2:{l:'Kinh điển',c:'#8e44ad'},3:{l:'Best seller',c:'#2980b9'},4:{l:'Yêu thích',c:'#c1572f'},5:{l:'HOT',c:'#e67e22'},6:{l:'Luyện thi',c:'#1a7a4a'},26:{l:'Giáo viên',c:'#27ae60'},27:{l:'Phương pháp',c:'#3498db'}};
  const vpp=P.filter(p=>p.cat==='vpp');
  const tb=P.filter(p=>p.cat==='tbgd');
  const flashItems=[7,4,1,5,9].map(id=>P.find(x=>x.id===id));
  const ebs=P.filter(p=>p.ebook||p.audio).slice(0,5);

  const AUDT=[
    ['Tiểu học','#e8f4e8','#2d5a2d','tieuhoc','<path d="M9 3 4 6v12l5 3 6-3 5 3V6l-5-3-6 3Z"/>'],
    ['THCS / THPT','#e8f0f8','#1e3a5a','thcs','<path d="M4 7l8-4 8 4-8 4-8-4Z M4 7v6l8 4 8-4V7"/>'],
    ['Sinh viên','#f0e8f8','#4a1e7a','sinhvien','<path d="M3 9l9-5 9 5-9 5-9-5Z M7 11v5a5 3 0 0 0 10 0v-5"/>'],
    ['Giáo viên','#fdf0e0','#7a4400','giaovien','<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M12 17v4M8 21h8"/>'],
    ['Văn phòng phẩm','#f5eaf0','#6a1a3a','vpp','<path d="M5 19l1-4L17 4l3 3L9 18l-4 1Z"/>'],
    ['Thiết bị GD','#e8f5f5','#1a5a5a','tbgd','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
    ['Ngoại ngữ','#f8f0e8','#5a3a10','sach','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
    ['Trường học · Mua sỉ','#f0f0f5','#2a2a5a','school','<path d="M3 21h18M3 10l9-7 9 7"/><path d="M9 21V14h6v7"/>']
  ];
  const ARTS=[
    ['Mẹo học tập','Ôn thi hiệu quả trong giai đoạn nước rút','08 tháng 6, 2026','Lập kế hoạch, chia nhỏ mục tiêu và giữ sức khỏe — ba chìa khóa cho mùa thi. Những chiến thuật được kiểm chứng bởi chuyên gia giáo dục hàng đầu.','1553729784-e91953dec042','rgba(110,30,20,.45)'],
    ['Hướng dẫn','Chọn máy tính cầm tay cho kỳ thi','05 tháng 6, 2026','So sánh các dòng máy được phép mang vào phòng thi và mẹo dùng nhanh.','1762265591492-1454ae17f31a','rgba(20,40,65,.48)'],
    ['Góc học tập','Sắp xếp bàn học giúp con tập trung hơn','01 tháng 6, 2026','Ánh sáng, bố cục và một chút phong thủy cho không gian học ở nhà.','1761821170104-ccd3e3e21318','rgba(60,45,15,.48)']
  ];
  const fa=ARTS[0];
  const GENT=[
    ['sgk','Sách giáo khoa','#e8f0f8','#1e3a5a','<path d="M4 19V5a1 1 0 0 1 1-1h6v16H5a1 1 0 0 1-1-1Z"/><path d="M13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6"/>'],
    ['thamkhao','Tham khảo','#fdf2dc','#8a5a00','<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9h16M9 4v16"/>'],
    ['vanhoc','Văn học','#f5eaf0','#6a1a3a','<path d="M12 7a4 3 0 0 0-8 0v11a4 3 0 0 1 8 0 4 3 0 0 1 8 0V7a4 3 0 0 0-8 0Z"/>'],
    ['thieunhi','Thiếu nhi','#e8f4e8','#2d5a2d','<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>'],
    ['kynang','Kỹ năng sống','#f0e8f8','#4a1e7a','<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>'],
    ['ngoaingu','Ngoại ngữ','#e8f5f5','#1a5a5a','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>']
  ];

  document.getElementById('app').innerHTML=
  /* Hero / search band */
  '<section class="hm-hero">'+
    '<div class="hm-hero-l">'+
      '<div class="bg"></div><div class="ring r1"></div><div class="ring r2"></div>'+
      '<div class="content">'+
        '<div class="eyebrow"><span class="ln"></span>Sàn sách &amp; học liệu số 1 Việt Nam</div>'+
        '<h1>Tìm sách, dụng cụ<br><em>học tập &amp; thiết bị</em></h1>'+
        '<p class="lead">Hàng nghìn đầu sách, văn phòng phẩm và thiết bị từ các nhà cung cấp uy tín trên khắp Việt Nam.</p>'+
        '<div class="hm-tri">'+
          '<div class="tf"><label>Tựa sách</label><input id="tsTitle" placeholder="Ví dụ: Mắt biếc"></div>'+
          '<div class="tf"><label>Tác giả</label><input id="tsAuthor" placeholder="Ví dụ: Nguyễn Nhật Ánh"></div>'+
          '<div class="tf"><label>Từ khóa / ISBN</label><input id="tsKw" placeholder="Lớp, môn, mã ISBN…" onkeydown="if(event.key===\'Enter\')triSearch()"></div>'+
          '<button class="go" onclick="triSearch()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>Tìm kiếm</button>'+
        '</div>'+
        '<div class="qk"><span>Phổ biến:</span>'+
          '<button onclick="go(\'listing\',\'thcs\')">SGK lớp 6</button>'+
          '<button onclick="go(\'listing\',\'thpt\')">Luyện thi THPT</button>'+
          '<button onclick="go(\'ebooks\')">📚 Ebook & Sách nói</button>'+
          '<button onclick="go(\'listing\',\'vpp\')">Văn phòng phẩm</button>'+
          '<button onclick="go(\'huyenhoc\')">Quẻ sách</button>'+
        '</div>'+
        '<div class="stats">'+
          '<div><div class="v">200K+</div><div class="l">đầu sách</div></div>'+
          '<div><div class="v">1.2M+</div><div class="l">lượt mua</div></div>'+
          '<div><div class="v">5.000+</div><div class="l">nhà cung cấp</div></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="hm-hero-r">'+
      '<img src="'+uimg('1625053376622-e462848c453f',900)+'" alt="Thư viện sách">'+
      '<div class="blend"></div>'+
      '<div class="badge"><div class="k">Mới cập nhật</div><div class="t">Kho sách tháng 6/2026</div><div class="m">Hơn 3.400 tựa mới ›</div></div>'+
    '</div>'+
  '</section>'+

  /* ── Danh mục (app-icon style) ── */
  '<div class="qcat-section">'+
    '<h2 class="qcat-title">Danh mục</h2>'+
    '<div class="qcat-row">'+
    (()=>{
      const cats=[
        {l:'Sách Văn học',    c:'vanhoc',    e:'📖', g:'#e8705a,#c8362a'},
        {l:'Sách Thiếu nhi',  c:'thieunhi',  e:'🌟', g:'#4caf7d,#2d7a52'},
        {l:'Phát triển bản thân',c:'kynang', e:'⚡', g:'#50b8d0,#1a6878'},
        {l:'Sách Giáo khoa',  c:'sgk',       e:'📘', g:'#4a90d8,#1a5098'},
        {l:'Luyện thi & Tham khảo',c:'thamkhao',e:'📝',g:'#7a6dd8,#302880'},
        {l:'Ngoại ngữ',       c:'ngoaingu',  e:'🌐', g:'#40c8b8,#107868'},
        {l:'Văn phòng phẩm',  c:'vpp',       e:'✏️', g:'#f0a050,#c87020'},
        {l:'Thiết bị GD',     c:'tbgd',      e:'🔬', g:'#5898d8,#1a3880'},
        {l:'Sách nói',        c:'audiobook', e:'🎧', g:'#9878d8,#3a1878'},
        {l:'Ebook',           c:'ebook',     e:'💻', g:'#48b088,#105838'},
      ];
      return cats.map(n=>
        '<div class="qcat-item" onclick="go(\'listing\',\''+n.c+'\')">'+
          '<div class="qcat-icon" style="background:linear-gradient(135deg,'+n.g+')">'+n.e+'</div>'+
          '<div class="qcat-lbl">'+n.l+'</div>'+
        '</div>'
      ).join('');
    })()+
    '</div>'+
  '</div>'+

  /* Collections */
  hmHead('Bộ sưu tập tuyển chọn','Tuyển chọn',null,'collections')+
  '<div class="hm-colls">'+
    '<div class="feat-slot">'+hmColl(COLLS[0],true)+'</div>'+
    hmColl(COLLS[1])+hmColl(COLLS[2])+
    '<div class="coll-row">'+hmColl(COLLS[3])+hmColl(COLLS[4])+hmColl(COLLS[5])+'</div>'+
  '</div>'+

  /* Flash sale */
  '<div class="hm-flash">'+
    '<img class="bg" src="'+uimg('1603058817990-2b9a9abbce86',1080)+'" alt="">'+
    '<div class="ov"></div><div class="glow"></div>'+
    '<div class="inner">'+
      '<div class="fhead">'+
        '<div><div class="kick"><span class="ln"></span>Ưu đãi có giới hạn<span class="ln"></span></div>'+
          '<h2>🔥 Flash Sale từ nhà cung cấp</h2>'+
          '<p>Số lượng có hạn — mua ngay kẻo hết!</p></div>'+
        '<div class="cd">'+
          '<div class="u"><div class="b" id="cdH">02</div><div class="l">giờ</div></div>'+
          '<div class="sep">:</div>'+
          '<div class="u"><div class="b" id="cdM">45</div><div class="l">phút</div></div>'+
          '<div class="sep">:</div>'+
          '<div class="u"><div class="b" id="cdS">10</div><div class="l">giây</div></div>'+
        '</div>'+
      '</div>'+
      '<div class="fline"></div>'+
      '<div class="hm-grid g5">'+flashItems.map(p=>hmCard(p,true)).join('')+'</div>'+
    '</div>'+
  '</div>'+

  /* Top sản phẩm bán chạy */
  hmHead('Top sản phẩm bán chạy','','','bestseller')+
  '<div class="bsr-tabs">'+
    [['all','Tất cả'],['giay','Sách giấy'],['ebook','Sách điện tử'],['audio','Sách nói']].map(([k,v])=>
      '<button class="bsr-tab'+(bstabFmt===k?' on':'')+'" onclick="bstabFmt=\''+k+'\';renderHome()">'+v+'</button>'
    ).join('')+
  '</div>'+
  '<div class="hm-grid g4 top-sell">'+bsFiltBooks.map((p,i)=>hmCard(p,false,i+1)).join('')+'</div>'+

  /* Sách mới nhất */
  hmHead('Sách Mới Nhất','','','newbooks')+
  '<div class="hm-grid g4">'+
    P.filter(p=>(p.cat==='sach'||p.ebook||p.audio)&&p.releaseDate)
      .sort((a,b)=>new Date(b.releaseDate)-new Date(a.releaseDate))
      .slice(0,4)
      .map(p=>'<div class="nb-card-wrap">'+hmCard(p)+'<span class="nb-badge-new">MỚI</span></div>').join('')+
  '</div>'+

  /* Nhà bán nổi bật */
  hmHead('Nhà bán nổi bật')+
  '<div class="sup-row">'+
    topSupps.map(s=>'<div class="sup-card" onclick="go(\'listing\',\''+s.cat+'\')">'+
      '<div class="sup-avatar"><div class="sup-av-in" style="background:'+s.c+'18;color:'+s.c+'">'+s.short+'</div></div>'+
      '<div class="sup-name">'+s.name+'</div>'+
      '<div class="sup-cnt">'+s.count+' sản phẩm</div>'+
    '</div>').join('')+
  '</div>'+

  /* ── Sách nổi bật ── */
  hmHead('Sách nổi bật','','sach')+
  '<div class="hm-grid g4">'+featBooks.slice(0,4).map(p=>hmCard(p)).join('')+'</div>'+

  /* Stationery */
  '<div class="vpp-banner">'+
    '<div class="vpb-l">'+
      '<div class="vpb-eyebrow">✏ Cửa hàng VPP EduMart</div>'+
      '<h2 class="vpb-h">Văn phòng phẩm<br>&amp; Dụng cụ học tập</h2>'+
      '<p class="vpb-sub">'+P.filter(p=>p.cat==='vpp').length+' sản phẩm · Từ bút bi đến máy tính Casio</p>'+
      '<div class="vpb-chips">'+
        Object.values(VPP_SUBS).slice(0,5).map(v=>'<span>'+v.icon+' '+v.lbl+'</span>').join('')+
      '</div>'+
    '</div>'+
    '<div class="vpb-r">'+
      '<button class="vpb-cta" onclick="event.stopPropagation();go(\'stationery\')">Vào cửa hàng VPP ›</button>'+
    '</div>'+
  '</div>'+
  hmHead('Bán chạy nhất','Văn phòng phẩm','vpp')+
  '<div class="hm-grid g4">'+P.filter(p=>p.cat==='vpp').slice().sort((a,b)=>b.sold-a.sold).slice(0,4).map(p=>hmCard(p)).join('')+'</div>'+

  /* Equipment */
  '<div class="tbgd-banner">'+
    '<div class="tbb-l">'+
      '<div class="tbb-eyebrow">🏫 Thiết bị giáo dục EduMart</div>'+
      '<h2 class="tbb-h">Thiết bị &amp;<br>Công nghệ lớp học</h2>'+
      '<p class="tbb-sub">'+P.filter(p=>p.cat==='tbgd').length+' sản phẩm · Máy tính, kính hiển vi, máy chiếu</p>'+
      '<div class="tbb-chips">'+Object.values(TBGD_SUBS).map(v=>'<span>'+v.icon+' '+v.lbl+'</span>').join('')+'</div>'+
    '</div>'+
    '<div class="tbb-r">'+
      '<button class="tbb-cta" onclick="event.stopPropagation();go(\'equipment\')">Vào cửa hàng ›</button>'+
    '</div>'+
  '</div>'+
  hmHead('Được yêu thích','Thiết bị giáo dục','tbgd')+
  '<div class="hm-grid g4">'+P.filter(p=>p.cat==='tbgd').slice().sort((a,b)=>b.sold-a.sold).slice(0,4).map(p=>hmCard(p)).join('')+'</div>'+

  /* Ebook & Audiobook */
  '<div class="eb-banner" onclick="go(\'ebooks\')">'+
    '<div class="eb-ban-l">'+
      '<div class="eb-ban-eyebrow">📚 Tủ sách số EduMart</div>'+
      '<h2 class="eb-ban-h">Ebook & Sách nói</h2>'+
      '<p class="eb-ban-sub">'+P.filter(p=>p.ebook||p.audio).length+' đầu sách số · Đọc/Nghe ngay sau thanh toán · Sở hữu vĩnh viễn</p>'+
      '<div class="eb-ban-chips">'+
        '<span>📖 Ebook PDF/EPUB</span>'+
        '<span>🎧 Sách nói MP3</span>'+
        '<span>📐 Học sinh</span>'+
        '<span>🎓 Sinh viên</span>'+
        '<span>👨‍🏫 Giáo viên</span>'+
      '</div>'+
    '</div>'+
    '<div class="eb-ban-r">'+
      '<button class="eb-ban-cta">Xem tất cả ebook ›</button>'+
      '<div class="eb-ban-stat">'+
        '<div><b>'+P.filter(p=>p.ebook&&!p.audio).length+'</b><span>Ebook</span></div>'+
        '<div><b>'+P.filter(p=>p.audio).length+'</b><span>Sách nói</span></div>'+
        '<div><b>30%</b><span>Giảm thuê</span></div>'+
      '</div>'+
    '</div>'+
  '</div>'+
  hmHead('Nổi bật tháng này','Sách số EduMart','ebook')+
  '<div class="hm-grid g5">'+ebs.map(p=>hmCard(p)).join('')+'</div>'+

  /* Articles */
  '<div class="hm-arts-head"><h2>Khám phá thêm</h2><a onclick="toast(\'Mở trang bài viết\')">Tất cả bài viết '+ARR+'</a></div>'+
  '<div class="hm-arts-bar"></div>'+
  '<div class="hm-arts">'+
    '<div class="hm-art feat" onclick="toast(\'Mở bài viết\')">'+
      '<img src="'+uimg(fa[4],900)+'" alt="'+fa[1]+'" loading="lazy">'+
      '<div class="tint" style="background:'+fa[5]+'"></div><div class="grad"></div>'+
      '<span class="tag">'+fa[0]+'</span>'+
      '<div class="body"><h3>'+fa[1]+'</h3><p>'+fa[3]+'</p><div class="meta"><span class="date">'+fa[2]+'</span><span class="read">Đọc ngay '+ARR+'</span></div></div>'+
    '</div>'+
    '<div class="col2">'+ARTS.slice(1).map(a=>'<div class="hm-art sm" onclick="toast(\'Mở bài viết\')"><img src="'+uimg(a[4],700)+'" alt="'+a[1]+'" loading="lazy"><div class="tint" style="background:'+a[5]+'"></div><div class="grad"></div><span class="tag">'+a[0]+'</span><div class="body"><h3>'+a[1]+'</h3><span class="date">'+a[2]+'</span></div></div>').join('')+'</div>'+
  '</div>';

  // Flash-sale countdown (giờ : phút : giây)
  let cs={h:2,m:45,s:10}; clearInterval(window._cd);
  const pad2=n=>String(n).padStart(2,'0');
  window._cd=setInterval(()=>{
    const H=document.getElementById('cdH'); if(!H){clearInterval(window._cd);return;}
    let h=cs.h,m=cs.m,s=cs.s-1;
    if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=0;m=0;s=0;}
    cs={h,m,s};
    H.textContent=pad2(h);
    document.getElementById('cdM').textContent=pad2(m);
    document.getElementById('cdS').textContent=pad2(s);
  },1000);
}

/* ---------------- Collections page ---------------- */
const COLL_AUD_OPTS=[
  {k:null,       e:'📚', l:'Tất cả'},
  {k:'thieunhi', e:'🧒', l:'Thiếu nhi'},
  {k:'hocsinh',  e:'✏️',  l:'Học sinh'},
  {k:'sinhvien', e:'🎓', l:'Sinh viên'},
  {k:'all',      e:'🌟', l:'Tổng hợp'},
];
const COLL_SORT_OPTS=[
  {k:'default', l:'Mặc định'},
  {k:'az',      l:'Tên A → Z'},
  {k:'cnt',     l:'Nhiều sách nhất'},
];
function resetCollFilters(){collSearch='';collAudFilter=null;collGenreFilter=null;collSort='default';renderCollections();}
function renderCollections(){
  const app=document.getElementById('app');
  let filtered=COLLS.slice();
  if(collAudFilter!==null)filtered=filtered.filter(c=>c.aud===collAudFilter);
  if(collSearch){const q=collSearch.toLowerCase().trim();filtered=filtered.filter(c=>c.title.toLowerCase().includes(q)||c.tag.toLowerCase().includes(q)||c.desc.toLowerCase().includes(q));}
  if(collSort==='az')filtered.sort((a,b)=>a.title.localeCompare(b.title,'vi'));
  else if(collSort==='cnt')filtered.sort((a,b)=>b.bookIds.length-a.bookIds.length);
  const hasFilter=!!(collSearch||collAudFilter!==null||collSort!=='default');

  app.innerHTML=
    '<div class="colls-page">'+
      '<div class="colls-hero" style="background-image:url('+uimg('1625053376622-e462848c453f',1600)+')">'+
        '<div class="colls-hero-ov"></div>'+
        '<div class="colls-hero-box">'+
          '<h1>BỘ SƯU TẬP SÁCH</h1>'+
          '<p>Những tuyển tập được biên tập kỹ lưỡng theo từng chủ đề và đối tượng độc giả</p>'+
        '</div>'+
      '</div>'+
      mkCrumb([['Trang chủ',"go('home')"],['Bộ sưu tập']])+
      '<div class="colls-filter-bar">'+
        '<div class="cfb-row1">'+
          '<div class="colls-search-wrap">'+
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>'+
            '<input class="colls-search-input" type="text" placeholder="Tìm theo tên, chủ đề, mô tả…" value="'+collSearch.replace(/"/g,'&quot;')+'" oninput="collSearch=this.value;renderCollections()">'+
            (collSearch?'<button class="colls-search-clear" onclick="collSearch=\'\';renderCollections()">×</button>':'')+
          '</div>'+
          '<div class="cfb-sort">'+
            '<label class="cfb-sort-lbl">Sắp xếp</label>'+
            '<select class="cfb-sort-sel" onchange="collSort=this.value;renderCollections()">'+
              COLL_SORT_OPTS.map(o=>'<option value="'+o.k+'"'+(collSort===o.k?' selected':'')+'>'+o.l+'</option>').join('')+
            '</select>'+
          '</div>'+
        '</div>'+
        (hasFilter?'<div class="cfb-row2"><button class="cfb-reset" onclick="resetCollFilters()">× Xóa bộ lọc</button></div>':'')+
      '</div>'+
      (filtered.length===0?
        '<div class="colls-empty">'+
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>'+
          '<p>Không có bộ sưu tập nào phù hợp với bộ lọc đã chọn</p>'+
          '<button onclick="resetCollFilters()">Xóa bộ lọc</button>'+
        '</div>':
        '<div class="colls-grid">'+
          filtered.map(c=>{
            const cnt=c.bookIds.map(id=>P.find(p=>p.id===id)).filter(Boolean).length;
            return '<div class="coll-card" onclick="go(\'listing\',\'coll:'+c.id+'\')">'+
              '<div class="coll-card-img" style="background-image:url('+uimg(c.img,800)+')">'+
                '<div class="coll-card-tint" style="background:'+c.tint+'"></div>'+
                '<div class="coll-card-badges">'+
                  '<span class="coll-card-tag">'+c.tag+'</span>'+
                  '<span class="coll-card-cnt">'+cnt+' cuốn</span>'+
                '</div>'+
              '</div>'+
              '<div class="coll-card-body">'+
                '<h3 class="coll-card-title">'+c.title+'</h3>'+
                '<p class="coll-card-desc">'+c.desc+'</p>'+
                '<span class="coll-card-link">Xem bộ sưu tập '+ARR+'</span>'+
              '</div>'+
            '</div>';
          }).join('')+
        '</div>'
      )+
    '</div>';
}

/* ---------------- Listing ---------------- */
let filt={aud:[],price:'all',sort:'sold',brand:[],fmt:null,bookfmt:null,rating:null,sale:false,instock:false,q:'',priceMin:0,priceMax:0,genre:[]};
let listView='grid';
let _listCtx=null;
let brandExpanded=false;
let genreExpanded=false;
let nbGenreFilter=[],nbNxbFilter=[],nbSort='date',nbNxbExpanded=false,nbGenreExpanded=false;
let nbAud=[],nbBookfmt=null,nbPrice='all',nbPriceMin=0,nbPriceMax=0,nbRating=null,nbSale=false,nbInstock=false,nbQ='';
let collSearch='',collAudFilter=null,collGenreFilter=null,collSort='default';
const CATDESC={
  sach:'Sách giáo khoa, tham khảo, văn học và kỹ năng từ các nhà xuất bản uy tín.',
  ebook:'Sách số đọc ngay trên mọi thiết bị — mua hoặc thuê tiết kiệm.',
  audiobook:'Sách nói chất lượng cao, nghe mọi lúc mọi nơi, tự lưu vị trí.',
  vpp:'Bút viết, vở, dụng cụ học tập, họa phẩm và túi balo — đầy đủ văn phòng phẩm cho mọi cấp học.',
  tbgd:'Máy tính khoa học, kính hiển vi, bản đồ, thiết bị thí nghiệm và công nghệ lớp học hiện đại.'
};
const PRICE_LBL={all:'Tất cả',lo:'Dưới 100.000đ',mid:'100.000 – 300.000đ',hi:'Trên 300.000đ',custom:'Tùy chỉnh'};
const AUDDESC={
  tieuhoc:'Sách giáo khoa, truyện thiếu nhi, bút màu và dụng cụ học tập dành cho học sinh Tiểu học (lớp 1–5).',
  thcs:'Sách giáo khoa, bài tập và dụng cụ học tập cho học sinh THCS (lớp 6–9). Chuẩn bị tốt cho cấp 3.',
  thpt:'Sách giáo khoa, luyện thi THPT Quốc gia và sách phát triển kỹ năng cho học sinh lớp 10–12.',
  sinhvien:'Giáo trình, sách kỹ năng, ebook và tài liệu học tập chuyên sâu dành cho sinh viên đại học.',
  giaovien:'Sách tham khảo, giáo án điện tử, thiết bị dạy học và ưu đãi đặc biệt dành cho nhà giáo.',
  school:'Mua sỉ số lượng lớn, đặt hàng theo danh sách lớp và yêu cầu báo giá cho trường học.'
};
function clearFilter(k){if(k==='price'){filt.price='all';filt.priceMin=0;filt.priceMax=0;}else if(k==='rating')filt.rating=null;else if(k==='sale')filt.sale=false;else if(k==='instock')filt.instock=false;else if(k==='q')filt.q='';else if(k.startsWith('genre_')){const _g=k.slice(6);const _i=filt.genre.indexOf(_g);if(_i>=0)filt.genre.splice(_i,1);}else if(k==='aud'||k.startsWith('aud_')){if(k==='aud')filt.aud=[];else{const _a=k.slice(4);const _i=filt.aud.indexOf(_a);if(_i>=0)filt.aud.splice(_i,1);}}else if(k==='brand'||k.startsWith('brand_')){if(k==='brand')filt.brand=[];else{const _b=k.slice(6);const _i=filt.brand.indexOf(_b);if(_i>=0)filt.brand.splice(_i,1);}}else filt[k]=null;renderListing();}
function resetFilters(){filt.aud=[];filt.brand=[];filt.fmt=null;filt.bookfmt=null;filt.price='all';filt.priceMin=0;filt.priceMax=0;filt.rating=null;filt.sale=false;filt.instock=false;filt.q='';filt.genre=[];renderListing();}
function toggleGenre(g){const i=filt.genre.indexOf(g);if(i>=0)filt.genre.splice(i,1);else filt.genre.push(g);renderListing();}
function toggleAud(a){const i=filt.aud.indexOf(a);if(i>=0)filt.aud.splice(i,1);else filt.aud.push(a);renderListing();}
function toggleBrand(b){const i=filt.brand.indexOf(b);if(i>=0)filt.brand.splice(i,1);else filt.brand.push(b);renderListing();}
function applyCustomPrice(){const mn=document.getElementById('prMinI');const mx=document.getElementById('prMaxI');filt.priceMin=mn?+mn.value||0:0;filt.priceMax=mx?+mx.value||0:0;renderListing();}
function setSearchQ(v){filt.q=(v||'').trim();renderListing();}
function nbToggleGenre(g){const i=nbGenreFilter.indexOf(g);if(i>=0)nbGenreFilter.splice(i,1);else nbGenreFilter.push(g);renderNewBooks();}
function nbToggleNxb(n){const i=nbNxbFilter.indexOf(n);if(i>=0)nbNxbFilter.splice(i,1);else nbNxbFilter.push(n);renderNewBooks();}
function nbToggleAud(a){const i=nbAud.indexOf(a);if(i>=0)nbAud.splice(i,1);else nbAud.push(a);renderNewBooks();}
function nbSetQ(v){nbQ=(v||'').trim();renderNewBooks();}
function nbApplyPrice(){const mn=document.getElementById('nbPrMin');const mx=document.getElementById('nbPrMax');nbPriceMin=mn?+mn.value||0:0;nbPriceMax=mx?+mx.value||0:0;renderNewBooks();}
function nbResetFilters(){nbGenreFilter=[];nbNxbFilter=[];nbAud=[];nbBookfmt=null;nbPrice='all';nbPriceMin=0;nbPriceMax=0;nbRating=null;nbSale=false;nbInstock=false;nbQ='';nbNxbExpanded=false;nbGenreExpanded=false;renderNewBooks();}
function renderBestseller(){
  const allBase=P.filter(p=>p.cat==='sach'||p.ebook||p.audio);
  let base=allBase.slice();
  if(bsGenre!=='all')base=base.filter(p=>p.genre===bsGenre);
  if(bsFmt==='giay')base=base.filter(p=>!p.ebook&&!p.audio);
  else if(bsFmt==='ebook')base=base.filter(p=>!!p.ebook);
  else if(bsFmt==='audio')base=base.filter(p=>!!p.audio);
  const ranked=base.slice().sort((a,b)=>b.sold-a.sold).slice(0,20);
  if(bsActive>=ranked.length)bsActive=0;
  const maxSold=ranked.length>0?ranked[0].sold:1;
  const gtabHtml=[['all','Tất cả'],...Object.entries(GENRE)].map(([k,v])=>{
    const cnt=k==='all'?allBase.length:allBase.filter(p=>p.genre===k).length;
    const dis=cnt===0;
    return '<button class="bs-gtab'+(bsGenre===k?' on':'')+(dis?' dis':'')+'" onclick="'+(dis?'':'bsGenre=\''+k+'\';bsActive=0;renderBestseller()')+'">'
      +v+'</button>';
  }).join('');
  const fpillHtml=[['all','Tất cả'],['giay','Sách giấy'],['ebook','Ebook'],['audio','Sách nói']].map(([k,v])=>
    '<button class="bs-fpill'+(bsFmt===k?' on':'')+'" onclick="bsFmt=\''+k+'\';bsActive=0;renderBestseller()">'+v+'</button>'
  ).join('');
  function rBadge(r){
    if(r===1)return '<span class="bs-badge bs-b1">Top 1</span>';
    if(r===2)return '<span class="bs-badge bs-b2">Top 2</span>';
    if(r===3)return '<span class="bs-badge bs-b3">Top 3</span>';
    return '';
  }
  const listHtml=ranked.map((p,i)=>{
    const r=i+1;
    const slug=HIMG[p.id];
    const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':String(p.sold);
    const pct=Math.round(p.sold/maxSold*100);
    const cvr=slug
      ?'<img src="'+uimg(slug,120)+'" alt="" class="bs-row-img" loading="lazy">'
      :'<div class="bs-row-img bs-row-grad" style="background:linear-gradient(135deg,'+p.c+',#333)"></div>';
    return '<div class="bs-row'+(bsActive===i?' on':'')+'" onclick="bsActive='+i+';renderBestseller()">'+
      '<span class="bs-rnum'+(r<=3?' top':'')+'" data-rank="'+r+'">'+r+'</span>'+
      cvr+
      '<div class="bs-row-info">'+
        rBadge(r)+
        '<div class="bs-row-title">'+p.name+'</div>'+
        '<div class="bs-row-by">'+p.by+'</div>'+
        '<div class="bs-bar-wrap"><div class="bs-bar-track"><div class="bs-bar" style="width:'+pct+'%"></div></div>'+
        '<span class="bs-sold">'+sold+' đã bán</span></div>'+
      '</div>'+
    '</div>';
  }).join('');
  let pvHtml='';
  if(ranked.length>0){
    const p=ranked[bsActive]||ranked[0];
    const r=(ranked[bsActive]?bsActive:0)+1;
    const slug=HIMG[p.id];
    const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':String(p.sold);
    const disc=p.old>p.price?Math.round((1-p.price/p.old)*100):0;
    const rlabel=r===1?'Top 1':r===2?'Top 2':r===3?'Top 3':'#'+r;
    const glabel=bsGenre==='all'?'Tất cả sách':GENRE[bsGenre];
    const cvr=slug
      ?'<img src="'+uimg(slug,400)+'" alt="'+p.name+'" class="bs-pv-img" onclick="go(\'product\','+p.id+')" loading="lazy">'
      :'<div class="bs-pv-img bs-pv-grad" style="background:linear-gradient(135deg,'+p.c+',#222)" onclick="go(\'product\','+p.id+')"></div>';
    const stars=Array.from({length:5},(_,j)=>'<svg width="12" height="12" viewBox="0 0 24 24" fill="'+(j<Math.round(p.rate)?'#c8362a':'#ddd')+'"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>').join('');
    const desc=BOOKDESC[p.id]||'';
    pvHtml=
      '<div class="bs-preview">'+
        '<div class="bs-pv-inner">'+
          cvr+
          '<div class="bs-pv-body">'+
            '<span class="bs-pv-badge">'+rlabel+' &middot; '+glabel+'</span>'+
            '<h2 class="bs-pv-title" onclick="go(\'product\','+p.id+')">'+p.name+'</h2>'+
            '<div class="bs-pv-meta">'+
              '<span class="bs-pv-auth">'+p.by+'</span>'+
              (p.nxb?'<span class="bs-pv-nxb">NXB '+p.nxb+'</span>':'')+
            '</div>'+
            '<div class="bs-pv-stars">'+stars+'<span class="bs-pv-rval">'+p.rate.toFixed(1)+'</span></div>'+
            '<div class="bs-pv-sold-big">'+sold+' đã bán</div>'+
            '<div class="bs-pv-price">'+fmt(p.price)+
              (disc>0?'<span class="bs-pv-old">'+fmt(p.old)+'</span><span class="bs-pv-disc">-'+disc+'%</span>':'')+
            '</div>'+
            '<div class="bs-pv-acts">'+
              (p.instock===false
                ?'<button class="bs-pv-cart" disabled>Hết hàng</button>'
                :'<button class="bs-pv-cart" onclick="addToCart('+p.id+')">Thêm vào giỏ</button>'
              )+
              '<a class="bs-pv-det" onclick="go(\'product\','+p.id+')">Xem chi tiết sản phẩm ›</a>'+
            '</div>'+
          '</div>'+
        '</div>'+
        (desc?'<div class="bs-pv-desc"><div class="bs-pv-desc-h">Mô tả sản phẩm</div><p class="bs-pv-desc-t">'+desc+'</p></div>':'')+
      '</div>';
  }
  document.getElementById('app').innerHTML=
    mkCrumb([["Trang chủ","go('home')"],["Bảng xếp hạng"]])+
    '<div class="bs-page">'+
      '<div class="bs-hd">'+
        '<div class="bs-hero" style="background-image:url('+uimg('1625053376622-e462848c453f',1400)+')">'+
          '<div class="bs-hero-ov"></div>'+
          '<div class="bs-hero-box">'+
            '<h1 class="bs-hdtitle">Bảng Xếp Hạng Sách Bán Chạy</h1>'+
            '<p class="bs-hdsub">Cập nhật theo doanh số thực tế</p>'+
          '</div>'+
        '</div>'+
        '<div class="bs-gtabs">'+gtabHtml+'</div>'+
      '</div>'+
      (ranked.length===0
        ?'<div class="bs-empty">Không có sách nào trong danh mục này.</div>'
        :'<div class="bs-body"><div class="bs-list">'+listHtml+'</div>'+pvHtml+'</div>'
      )+
    '</div>';
}
function renderNewBooks(){
  const _now=new Date(),_ms=90*24*60*60*1000;
  const isRecent=p=>p.tag==='new'||(p.releaseDate&&(_now-new Date(p.releaseDate))<=_ms);
  const base=P.filter(p=>(p.cat==='sach'||p.ebook||p.audio)&&isRecent(p));
  const allGenres=[...new Set(base.map(p=>p.genre).filter(Boolean))];
  const allNxbs=[...new Set(base.map(p=>p.nxb))].sort((a,b)=>a.localeCompare(b,'vi'));
  /* ── Apply filters ── */
  let list=base.slice();
  if(nbQ){const q=nbQ.toLowerCase();list=list.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q)||(p.nxb||'').toLowerCase().includes(q));}
  if(nbAud.length)list=list.filter(p=>nbAud.some(a=>p.aud&&p.aud.includes(a)));
  if(nbGenreFilter.length)list=list.filter(p=>nbGenreFilter.includes(p.genre));
  if(nbNxbFilter.length)list=list.filter(p=>nbNxbFilter.includes(p.nxb));
  if(nbBookfmt==='giay')list=list.filter(p=>!p.ebook&&!p.audio);
  else if(nbBookfmt==='ebook')list=list.filter(p=>!!p.ebook);
  else if(nbBookfmt==='audio')list=list.filter(p=>!!p.audio);
  if(nbPrice==='lo')list=list.filter(p=>p.price<100000);
  else if(nbPrice==='mid')list=list.filter(p=>p.price>=100000&&p.price<300000);
  else if(nbPrice==='hi')list=list.filter(p=>p.price>=300000);
  else if(nbPrice==='custom'){if(nbPriceMin>0)list=list.filter(p=>p.price>=nbPriceMin);if(nbPriceMax>0)list=list.filter(p=>p.price<=nbPriceMax);}
  if(nbRating)list=list.filter(p=>p.rate>=(+nbRating));
  if(nbSale)list=list.filter(p=>p.old>p.price);
  if(nbInstock)list=list.filter(p=>p.instock!==false);
  /* ── Sort ── */
  if(nbSort==='date')list.sort((a,b)=>new Date(b.releaseDate||'2000-01-01')-new Date(a.releaseDate||'2000-01-01'));
  else if(nbSort==='sold')list.sort((a,b)=>b.sold-a.sold);
  else if(nbSort==='rate')list.sort((a,b)=>b.rate-a.rate);
  else if(nbSort==='priceAsc')list.sort((a,b)=>a.price-b.price);
  else if(nbSort==='priceDesc')list.sort((a,b)=>b.price-a.price);
  /* ── Sidebar helpers ── */
  const audOpts=Object.entries(AUD).map(([k,v])=>'<label><input type="checkbox" class="sq-chk"'+(nbAud.includes(k)?' checked':'')+' onchange="nbToggleAud(\''+k+'\')">'+v+'</label>').join('');
  const GLIMIT=4,_gkeys=Object.keys(GENRE).filter(k=>allGenres.includes(k));
  const visG=nbGenreExpanded?_gkeys:_gkeys.slice(0,GLIMIT);
  const genreOpts=visG.map(k=>'<label><input type="checkbox" class="sq-chk"'+(nbGenreFilter.includes(k)?' checked':'')+' onchange="nbToggleGenre(\''+k+'\')"><span>'+GENRE[k]+'</span></label>').join('')+
    (_gkeys.length>GLIMIT?'<button class="brand-more" onclick="nbGenreExpanded=!nbGenreExpanded;renderNewBooks()">'+(nbGenreExpanded?'Rút gọn ▲':'Xem thêm '+(_gkeys.length-GLIMIT)+' ▼')+'</button>':'');
  const NLIMIT=5,visN=nbNxbExpanded?allNxbs:allNxbs.slice(0,NLIMIT);
  const nxbOpts=visN.map(n=>'<label><input type="checkbox" class="sq-chk"'+(nbNxbFilter.includes(n)?' checked':'')+' onchange="nbToggleNxb(\''+n.replace(/'/g,"\\'")+'\')">&nbsp;'+n+'</label>').join('')+
    (allNxbs.length>NLIMIT?'<button class="brand-more" onclick="nbNxbExpanded=!nbNxbExpanded;renderNewBooks()">'+(nbNxbExpanded?'Rút gọn ▲':'Xem thêm '+(allNxbs.length-NLIMIT)+' ▼')+'</button>':'');
  const fmtOpts='<label><input type="radio" name="nbfmt"'+(nbBookfmt===null?' checked':'')+' onchange="nbBookfmt=null;renderNewBooks()">Tất cả</label>'+
    '<label><input type="radio" name="nbfmt"'+(nbBookfmt==='giay'?' checked':'')+' onchange="nbBookfmt=\'giay\';renderNewBooks()">📚 Sách giấy</label>'+
    '<label><input type="radio" name="nbfmt"'+(nbBookfmt==='ebook'?' checked':'')+' onchange="nbBookfmt=\'ebook\';renderNewBooks()">📖 Ebook</label>'+
    '<label><input type="radio" name="nbfmt"'+(nbBookfmt==='audio'?' checked':'')+' onchange="nbBookfmt=\'audio\';renderNewBooks()">🎧 Sách nói</label>';
  const prOpts=[['all','Tất cả'],['lo','Dưới 100.000đ'],['mid','100.000 – 300.000đ'],['hi','Trên 300.000đ'],['custom','Tùy chỉnh']].map(([k,v])=>
    '<label><input type="radio" name="nbprice"'+(nbPrice===k?' checked':'')+' onchange="nbPrice=\''+k+'\''+(k!=='custom'?';nbPriceMin=0;nbPriceMax=0':'')+';renderNewBooks()">'+v+'</label>').join('')+
    (nbPrice==='custom'?'<div class="price-custom"><input id="nbPrMin" type="number" class="price-inp" min="0" value="'+(nbPriceMin||'')+'" placeholder="Từ" onkeydown="if(event.key===\'Enter\')nbApplyPrice()"><span class="price-sep">–</span><input id="nbPrMax" type="number" class="price-inp" min="0" value="'+(nbPriceMax||'')+'" placeholder="Đến" onkeydown="if(event.key===\'Enter\')nbApplyPrice()"><button class="price-go" onclick="nbApplyPrice()">OK</button></div>':'');
  const ratOpts='<label><input type="radio" name="nbrat"'+(nbRating===null?' checked':'')+' onchange="nbRating=null;renderNewBooks()">Tất cả</label>'+
    ['4','3','2','1'].map(r=>'<label><input type="radio" name="nbrat"'+(nbRating===r?' checked':'')+' onchange="nbRating=\''+r+'\';renderNewBooks()">'+r+'★ trở lên</label>').join('');
  /* ── Chips ── */
  const chips=[];
  if(nbQ)chips.push(['q','Tìm: "'+nbQ+'"','nbQ=\'\';renderNewBooks()']);
  nbAud.forEach(a=>chips.push(['aud_'+a,AUD[a],'nbToggleAud(\''+a+'\')']));
  nbGenreFilter.forEach(g=>chips.push(['g_'+g,GENRE[g],'nbToggleGenre(\''+g+'\')']));
  nbNxbFilter.forEach(n=>chips.push(['n_'+n,n,'nbToggleNxb(\''+n.replace(/'/g,"\\'")+'\')']));
  if(nbBookfmt)chips.push(['fmt',{giay:'Sách giấy',ebook:'Ebook',audio:'Sách nói'}[nbBookfmt],'nbBookfmt=null;renderNewBooks()']);
  if(nbPrice!=='all')chips.push(['price',nbPrice==='custom'?(nbPriceMin>0||nbPriceMax>0?'Giá: '+(nbPriceMin||0)+'–'+(nbPriceMax||'∞'):'Tùy chỉnh'):PRICE_LBL[nbPrice],'nbPrice=\'all\';nbPriceMin=0;nbPriceMax=0;renderNewBooks()']);
  if(nbRating)chips.push(['rat','Đánh giá '+nbRating+'★+','nbRating=null;renderNewBooks()']);
  if(nbSale)chips.push(['sale','Đang giảm giá','nbSale=false;renderNewBooks()']);
  if(nbInstock)chips.push(['ins','Còn hàng','nbInstock=false;renderNewBooks()']);
  const chipsHtml=chips.length
    ?'<div class="active-chips">'+chips.map(c=>'<span class="achip">'+c[1]+'<button onclick="'+c[2]+'">×</button></span>').join('')+'<button class="freset" onclick="nbResetFilters()">Xóa tất cả</button></div>'
    :'';
  /* ── Grid ── */
  function nbCard(p){return '<div class="nb-card-wrap">'+hmCard(p)+'<span class="nb-badge-new">MỚI</span></div>';}
  const sortOpts=[['date','Mới nhất'],['sold','Bán chạy'],['rate','Đánh giá cao'],['priceAsc','Giá thấp→cao'],['priceDesc','Giá cao→thấp']]
    .map(([k,v])=>'<option value="'+k+'"'+(nbSort===k?' selected':'')+'>'+v+'</option>').join('');
  const grid=list.length===0
    ?'<div class="list-empty"><svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6"/></svg><p>Không tìm thấy sách mới phù hợp.</p><button onclick="nbResetFilters()">Xóa bộ lọc</button></div>'
    :'<div class="hm-grid g4">'+list.map(nbCard).join('')+'</div>';
  const hasFilter=chips.length>0;
  document.getElementById('app').innerHTML=
    mkCrumb([["Trang chủ","go('home')"],["Sách mới"]])+
    '<div class="nb-page">'+
      '<div class="bs-hero" style="background-image:url('+uimg('1512820790803-83ca734da794',1400)+')">'+
        '<div class="bs-hero-ov"></div>'+
        '<div class="bs-hero-box">'+
          '<h1 class="bs-hdtitle">Sách Mới Nhất</h1>'+
          '<p class="bs-hdsub">Những tựa sách vừa ra mắt — cập nhật liên tục</p>'+
        '</div>'+
      '</div>'+
      '<div class="nb-wrap">'+
        '<div class="listing">'+
          '<aside class="filters">'+
            '<div class="filt-head"><h4>Bộ lọc</h4>'+(hasFilter?'<button class="freset-sm" onclick="nbResetFilters()">Đặt lại</button>':'')+'</div>'+
            '<div class="fgroup"><div class="ftitle">Tìm trong danh mục</div><div class="filt-search"><input value="'+nbQ.replace(/"/g,'&quot;')+'" placeholder="Tên, tác giả…" onkeydown="if(event.key===\'Enter\')nbSetQ(this.value)"><button onclick="nbSetQ(this.previousElementSibling.value)">Tìm</button></div></div>'+
            '<div class="fgroup"><div class="ftitle">Đối tượng</div>'+audOpts+'</div>'+
            (genreOpts?'<div class="fgroup"><div class="ftitle genre-ftitle">Thể loại</div>'+genreOpts+'</div>':'')+
            (allNxbs.length>1?'<div class="fgroup"><div class="ftitle">Nhà xuất bản</div>'+nxbOpts+'</div>':'')+
            '<div class="fgroup"><div class="ftitle">Định dạng</div>'+fmtOpts+'</div>'+
            '<div class="fgroup"><div class="ftitle">Khoảng giá</div>'+prOpts+'</div>'+
            '<div class="fgroup"><div class="ftitle">Đánh giá</div>'+ratOpts+'</div>'+
            '<div class="fgroup"><div class="ftitle">Khác</div>'+
              '<label><input type="checkbox" class="sq-chk"'+(nbSale?' checked':'')+' onchange="nbSale=this.checked;renderNewBooks()">Đang giảm giá</label>'+
              '<label><input type="checkbox" class="sq-chk"'+(nbInstock?' checked':'')+' onchange="nbInstock=this.checked;renderNewBooks()">Chỉ còn hàng</label>'+
            '</div>'+
          '</aside>'+
          '<div>'+
            chipsHtml+
            '<div class="list-top"><span class="cnt">'+
              (hasFilter?'<b>'+list.length+'</b><span class="cnt-slash">/</span><span class="cnt-total">'+base.length+'</span> tựa sách mới':'<b>'+list.length+'</b> tựa sách mới')+
            '</span>'+
              '<div class="list-top-r"><select onchange="nbSort=this.value;renderNewBooks()">'+sortOpts+'</select></div>'+
            '</div>'+
            grid+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
}
function renderListing(){
  let title='Tất cả sản phẩm', base=P.slice(), ctxKey='all', catKey=null, heroDesc='', audKey=null, ebSubTab=null, isVpp=false, isTbgd=false, collCtx=null;
  if(typeof arg==='string'){
    if(arg==='ebook'||arg==='audiobook'){
      const isAudio=arg==='audiobook';
      title=isAudio?'Sách nói':'Ebook & Sách nói';
      base=P.filter(p=>p.ebook||p.audio);
      catKey=arg; ctxKey='cat:'+arg;
      heroDesc=isAudio?'Nghe sách mọi lúc mọi nơi — gần 10 tựa sách nói từ bestseller đến chuyên môn.':'Kho ebook và sách nói số EduMart — nhận ngay sau thanh toán, đọc/nghe trên mọi thiết bị.';
      ebSubTab=isAudio?'audio':'all';
    }
    else if(AUD[arg]){title=AUD[arg];base=P.filter(p=>(p.aud&&p.aud.includes(arg))||arg==='school');ctxKey='aud:'+arg;audKey=arg;heroDesc=AUDDESC[arg]||'';}
    else if(arg==='vpp'){title='Văn phòng phẩm';base=P.filter(p=>p.cat==='vpp');ctxKey='cat:vpp';catKey='vpp';isVpp=true;heroDesc=CATDESC['vpp']||'';if(vppSub!=='all')base=base.filter(p=>p.sub===vppSub);}
    else if(arg==='tbgd'){title='Thiết bị giáo dục';base=P.filter(p=>p.cat==='tbgd');ctxKey='cat:tbgd';catKey='tbgd';isTbgd=true;heroDesc=CATDESC['tbgd']||'';if(tbgdSub!=='all')base=base.filter(p=>p.sub===tbgdSub);}
    else if(CATLBL[arg]){title=CATLBL[arg];base=P.filter(p=>p.cat===arg);ctxKey='cat:'+arg;catKey=arg;heroDesc=CATDESC[arg]||'';}
    else if(GENRE[arg]){title=GENRE[arg];base=P.filter(p=>p.genre===arg);ctxKey='genre:'+arg;heroDesc=GENREDESC[arg]||'';}
    else if(arg.startsWith('mood:')){const mk=arg.slice(5);const mood=MOODS.find(m=>m.k===mk);if(mood){title=mood.e+' '+mood.l;base=P.filter(mood.fn);ctxKey='mood:'+mk;heroDesc='Gợi ý được chọn lọc theo tâm trạng của bạn.';}}
    else if(arg.startsWith('coll:')){const ck=arg.slice(5);const coll=COLLS.find(c=>c.id===ck);if(coll){title=coll.title;base=coll.bookIds.map(id=>P.find(p=>p.id===id)).filter(Boolean);ctxKey='coll:'+ck;heroDesc=coll.desc;collCtx=coll;}}
  } else if(arg&&arg.q){title='Kết quả cho "'+arg.q+'"';const q=arg.q.toLowerCase();base=P.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q));ctxKey='q:'+arg.q;}
  if(_listCtx!==ctxKey){_listCtx=ctxKey;filt.aud=[];filt.brand=[];filt.fmt=null;filt.bookfmt=null;filt.price='all';filt.priceMin=0;filt.priceMax=0;filt.rating=null;filt.sale=false;filt.instock=false;filt.q='';filt.genre=[];brandExpanded=false;genreExpanded=false;}

  const isBookCat=!catKey||catKey==='sach'||catKey==='ebook'||catKey==='audiobook';
  const brandLabel=(catKey==='vpp'||catKey==='tbgd')?'Thương hiệu':'Nhà xuất bản';
  const brands=[...new Set(base.map(p=>p.nxb))].sort((a,b)=>a.localeCompare(b,'vi'));

  let list=base.slice();
  if(filt.aud.length)list=list.filter(p=>filt.aud.some(a=>p.aud&&p.aud.includes(a)));
  if(filt.brand.length)list=list.filter(p=>filt.brand.includes(p.nxb));
  if(filt.fmt)list=list.filter(p=>(p.format||'').includes(filt.fmt));
  if(filt.price==='lo')list=list.filter(p=>p.price<100000);
  else if(filt.price==='mid')list=list.filter(p=>p.price>=100000&&p.price<300000);
  else if(filt.price==='hi')list=list.filter(p=>p.price>=300000);
  else if(filt.price==='custom'){if(filt.priceMin>0)list=list.filter(p=>p.price>=filt.priceMin);if(filt.priceMax>0)list=list.filter(p=>p.price<=filt.priceMax);}
  if(filt.bookfmt==='giay')list=list.filter(p=>!p.ebook&&!p.audio);
  else if(filt.bookfmt==='ebook')list=list.filter(p=>!!p.ebook);
  else if(filt.bookfmt==='audio')list=list.filter(p=>!!p.audio);
  if(filt.rating==='4')list=list.filter(p=>p.rate>=4);
  else if(filt.rating==='3')list=list.filter(p=>p.rate>=3);
  else if(filt.rating==='2')list=list.filter(p=>p.rate>=2);
  else if(filt.rating==='1')list=list.filter(p=>p.rate>=1);
  if(filt.sale)list=list.filter(p=>p.old>p.price);
  if(filt.instock)list=list.filter(p=>p.instock!==false);
  if(filt.genre.length)list=list.filter(p=>filt.genre.includes(p.genre));
  if(filt.q){const q=filt.q.toLowerCase();list=list.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q)||(p.nxb||'').toLowerCase().includes(q));}
  if(filt.sort==='sold')list.sort((a,b)=>b.sold-a.sold);
  else if(filt.sort==='priceAsc')list.sort((a,b)=>a.price-b.price);
  else if(filt.sort==='priceDesc')list.sort((a,b)=>b.price-a.price);
  else if(filt.sort==='rate')list.sort((a,b)=>b.rate-a.rate);

  const audOpts=Object.entries(AUD).map(([k,v])=>'<label><input type="checkbox" class="sq-chk" '+(filt.aud.includes(k)?'checked':'')+' onchange="toggleAud(\''+k+'\')">'+v+'</label>').join('');
  const BRAND_LIMIT=5;
  const visibleBrands=brandExpanded?brands:brands.slice(0,BRAND_LIMIT);
  const brandOpts=visibleBrands.map(b=>{const be=b.replace(/'/g,"\\'");return '<label><input type="checkbox" class="sq-chk" '+(filt.brand.includes(b)?'checked':'')+' onchange="toggleBrand(\''+be+'\')">'+b+'</label>';}).join('')+
    (brands.length>BRAND_LIMIT?'<button class="brand-more" onclick="brandExpanded=!brandExpanded;renderListing()">'+(brandExpanded?'Thu gọn ▲':'Xem thêm '+(brands.length-BRAND_LIMIT)+' ▼')+'</button>':'');
  const GENRE_LIMIT=4;
  const _genreKeys=Object.keys(GENRE);
  const _visGenres=genreExpanded?_genreKeys:_genreKeys.slice(0,GENRE_LIMIT);
  const genreOpts=_visGenres.map(k=>'<label><input type="checkbox" class="sq-chk" '+(filt.genre.includes(k)?'checked':'')+' onchange="toggleGenre(\''+k+'\')"><span>'+GENRE[k]+'</span></label>').join('')+(_genreKeys.length>GENRE_LIMIT?'<button class="brand-more" onclick="genreExpanded=!genreExpanded;renderListing()">'+(genreExpanded?'Rút gọn ▲':'Xem thêm '+(_genreKeys.length-GENRE_LIMIT)+' ▼')+'</button>':'');
  const showGenreFilter=!GENRE[arg]&&!collCtx&&catKey!=='vpp'&&catKey!=='tbgd'&&catKey!=='ebook'&&catKey!=='audiobook';
  const fmtOpts=catKey==='ebook'?'<label><input type="radio" name="ffmt" '+(!filt.fmt?'checked':'')+' onchange="filt.fmt=null;renderListing()">Tất cả</label>'+['PDF','EPUB'].map(f=>'<label><input type="radio" name="ffmt" '+(filt.fmt===f?'checked':'')+' onchange="filt.fmt=\''+f+'\';renderListing()">'+f+'</label>').join(''):'';
  const showBookFmt=catKey!=='vpp'&&catKey!=='tbgd'&&catKey!=='ebook'&&catKey!=='audiobook';
  const bookFmtOpts=showBookFmt?
    '<label><input type="radio" name="fbf" '+(filt.bookfmt===null?'checked':'')+' onchange="filt.bookfmt=null;renderListing()">Tất cả</label>'+
    '<label><input type="radio" name="fbf" '+(filt.bookfmt==="giay"?'checked':'')+' onchange="filt.bookfmt=\'giay\';renderListing()">📚 Sách giấy</label>'+
    '<label><input type="radio" name="fbf" '+(filt.bookfmt==="ebook"?'checked':'')+' onchange="filt.bookfmt=\'ebook\';renderListing()">📖 Ebook</label>'+
    '<label><input type="radio" name="fbf" '+(filt.bookfmt==="audio"?'checked':'')+' onchange="filt.bookfmt=\'audio\';renderListing()">🎧 Sách nói</label>':'';
  const ratingOpts=
    '<label><input type="radio" name="frat" '+(filt.rating===null?'checked':'')+' onchange="filt.rating=null;renderListing()">Tất cả</label>'+
    '<label><input type="radio" name="frat" '+(filt.rating==="4"?'checked':'')+' onchange="filt.rating=\'4\';renderListing()">4★ trở lên</label>'+
    '<label><input type="radio" name="frat" '+(filt.rating==="3"?'checked':'')+' onchange="filt.rating=\'3\';renderListing()">3★ trở lên</label>'+
    '<label><input type="radio" name="frat" '+(filt.rating==="2"?'checked':'')+' onchange="filt.rating=\'2\';renderListing()">2★ trở lên</label>'+
    '<label><input type="radio" name="frat" '+(filt.rating==="1"?'checked':'')+' onchange="filt.rating=\'1\';renderListing()">1★ trở lên</label>';
  const priceOpts=[['all','Tất cả'],['lo','Dưới 100.000đ'],['mid','100.000 – 300.000đ'],['hi','Trên 300.000đ'],['custom','Tùy chỉnh']].map(([k,v])=>'<label><input type="radio" name="fpr" '+(filt.price===k?'checked':'')+' onchange="filt.price=\''+k+'\''+(k!=='custom'?';filt.priceMin=0;filt.priceMax=0':'')+';renderListing()">'+v+'</label>').join('')+
    (filt.price==='custom'?'<div class="price-custom"><input id="prMinI" type="number" class="price-inp" min="0" value="'+(filt.priceMin||'')+'" placeholder="Từ" onkeydown="if(event.key===\'Enter\')applyCustomPrice()"><span class="price-sep">–</span><input id="prMaxI" type="number" class="price-inp" min="0" value="'+(filt.priceMax||'')+'" placeholder="Đến" onkeydown="if(event.key===\'Enter\')applyCustomPrice()"><button class="price-go" onclick="applyCustomPrice()">OK</button></div>':'');
  const sortOpts=[['sold','Bán chạy'],['rate','Đánh giá cao'],['priceAsc','Giá thấp đến cao'],['priceDesc','Giá cao đến thấp']].map(([k,v])=>'<option value="'+k+'"'+(filt.sort===k?' selected':'')+'>'+v+'</option>').join('');

  const chips=[];
  if(filt.q)chips.push(['q','Tìm: "'+filt.q+'"']);
  filt.aud.forEach(a=>chips.push(['aud_'+a,AUD[a]]));
  filt.brand.forEach(b=>chips.push(['brand_'+b,b]));
  if(filt.fmt)chips.push(['fmt',filt.fmt]);
  if(filt.price!=='all')chips.push(['price',filt.price==='custom'?(filt.priceMin>0||filt.priceMax>0?'Giá: '+(filt.priceMin>0?fmt(filt.priceMin):'0')+'–'+(filt.priceMax>0?fmt(filt.priceMax):'∞'):'Tùy chỉnh'):PRICE_LBL[filt.price]]);
  if(filt.bookfmt)chips.push(['bookfmt',{giay:'Sách giấy',ebook:'Ebook',audio:'Sách nói'}[filt.bookfmt]]);
  if(filt.rating)chips.push(['rating','Đánh giá '+filt.rating+'★+']);
  if(filt.sale)chips.push(['sale','Đang giảm giá']);
  if(filt.instock)chips.push(['instock','Còn hàng']);
  filt.genre.forEach(g=>chips.push(['genre_'+g,'Thể loại: '+GENRE[g]]));
  const chipHtml=chips.length?'<div class="active-chips">'+chips.map(c=>'<span class="achip">'+c[1]+'<button onclick="clearFilter(\''+c[0]+'\')">×</button></span>').join('')+'<button class="freset" onclick="resetFilters()">Xóa tất cả</button></div>':'';

  /* Breadcrumb hierarchy */
  const _home=["Trang chủ","go('home')"];
  const _crumb=[_home];
  if(collCtx){_crumb.push(["Bộ sưu tập","go('collections')"]);_crumb.push([collCtx.title]);}
  else if(arg==='audiobook'){_crumb.push(["Ebook & Sách nói","go('listing','ebook')"]);_crumb.push(["Sách nói"]);}
  else if(typeof arg==='string'&&GENRE[arg]){_crumb.push(["Sách","go('listing','sach')"]);_crumb.push([title]);}
  else if(typeof arg==='string'&&arg.startsWith('mood:')){const _mk=arg.slice(5);const _md=MOODS.find(m=>m.k===_mk);_crumb.push([_md?_md.e+' '+_md.l:title]);}
  else if(arg&&arg.q){_crumb.push(['Tìm kiếm: "'+arg.q+'"']);}
  else{_crumb.push([title]);}

  const _lstImg=catKey==='vpp'?null:catKey==='tbgd'?null:catKey==='sach'||GENRE[arg]?'1512820790803-83ca734da794':catKey==='ebook'||catKey==='audiobook'?'1625053376622-e462848c453f':AUD[arg]?'1512820790803-83ca734da794':null;
  document.getElementById('app').innerHTML=
  (collCtx?
    '<div class="coll-list-hero" style="background-image:url('+uimg(collCtx.img,1200)+')">'+
      '<div class="coll-list-hero-ov" style="background:'+collCtx.tint+'"></div>'+
      '<div class="coll-list-hero-inner">'+
        '<button class="coll-list-back" onclick="go(\'collections\')">'+
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>'+
          'Bộ sưu tập'+
        '</button>'+
        '<span class="coll-list-tag">'+collCtx.tag+'</span>'+
        '<h1>'+collCtx.title+'</h1>'+
        '<p>'+collCtx.desc+'</p>'+
        '<span class="coll-list-cnt">'+base.length+' cuốn sách</span>'+
      '</div>'+
    '</div>':
    (_lstImg&&heroDesc?
      '<div class="bs-hero lst-hero" style="background-image:url('+uimg(_lstImg,1400)+')">'+
        '<div class="bs-hero-ov"></div>'+
        '<div class="bs-hero-box">'+
          '<h1 class="bs-hdtitle">'+title+'</h1>'+
          '<p class="bs-hdsub">'+heroDesc+'</p>'+
        '</div>'+
      '</div>'
    :'')
  )+
  mkCrumb(_crumb)+
  '<div class="listing">'+
    '<aside class="filters">'+
      '<div class="filt-head"><h4>Bộ lọc</h4>'+(chips.length?'<button class="freset-sm" onclick="resetFilters()">Đặt lại</button>':'')+'</div>'+
      '<div class="fgroup"><div class="ftitle">Tìm trong danh mục</div><div class="filt-search"><input value="'+filt.q.replace(/"/g,'&quot;')+'" placeholder="Tên, tác giả…" onkeydown="if(event.key===\'Enter\')setSearchQ(this.value)"><button onclick="setSearchQ(this.previousElementSibling.value)">Tìm</button></div></div>'+
      '<div class="fgroup"><div class="ftitle">Đối tượng</div>'+audOpts+'</div>'+
      (showGenreFilter?'<div class="fgroup"><div class="ftitle genre-ftitle">Thể loại</div>'+genreOpts+'</div>':'')+
      (brands.length>1?'<div class="fgroup"><div class="ftitle">'+brandLabel+'</div>'+brandOpts+'</div>':'')+
      (fmtOpts?'<div class="fgroup"><div class="ftitle">Định dạng số</div>'+fmtOpts+'</div>':'')+
      (bookFmtOpts?'<div class="fgroup"><div class="ftitle">Định dạng</div>'+bookFmtOpts+'</div>':'')+
      '<div class="fgroup"><div class="ftitle">Khoảng giá</div>'+priceOpts+'</div>'+
      '<div class="fgroup"><div class="ftitle">Đánh giá</div>'+ratingOpts+'</div>'+
      '<div class="fgroup"><div class="ftitle">Khác</div><label><input type="checkbox" class="sq-chk" '+(filt.sale?'checked':'')+' onchange="filt.sale=this.checked;renderListing()">Đang giảm giá</label><label><input type="checkbox" class="sq-chk" '+(filt.instock?'checked':'')+' onchange="filt.instock=this.checked;renderListing()">Chỉ còn hàng</label></div>'+
    '</aside>'+
    '<div>'+
      (!collCtx&&heroDesc&&!_lstImg?'<div class="cat-hero"><h1>'+title+'</h1><p>'+heroDesc+'</p></div>':'')+
      (ebSubTab!==null?'<div class="eb-subtabs">'+
        ['all','ebook','audio'].map(k=>({all:'Tất cả',ebook:'📖 Ebook',audio:'🎧 Sách nói'})[k]).map((lbl,i)=>{const k=['all','ebook','audio'][i];return '<button class="eb-stab'+(ebSubTab===k?' active':'')+'" onclick="go(\'listing\','+(k==='all'?'\'ebook\'':k==='audio'?'\'audiobook\'':'\'ebook\'')+')">'+lbl+'</button>';}).join('')+
        '<a class="eb-lib-link" onclick="go(\'library\')">📚 Tủ sách của tôi</a>'+
      '</div>':'')+
      (isVpp?'<div class="eb-subtabs">'+
        [['all','Tất cả'],['but','🖊 Bút viết'],['vo','📓 Vở & giấy'],['dungcu','📐 Dụng cụ'],['hoapham','🎨 Họa phẩm'],['balo','🎒 Túi & balo']].map(([k,lbl])=>
          '<button class="eb-stab'+(vppSub===k?' active':'')+'" onclick="vppSub=\''+k+'\';go(\'listing\',\'vpp\')">'+lbl+(k!=='all'?' <span class="vst-cnt">('+P.filter(p=>p.cat==='vpp'&&p.sub===k).length+')</span>':'')+'</button>'
        ).join('')+
        '<a class="eb-lib-link" onclick="go(\'stationery\')">🛒 Cửa hàng VPP</a>'+
      '</div>':'')+
      (isTbgd?'<div class="eb-subtabs">'+
        [['all','Tất cả'],['mtinh','🔢 Máy tính'],['tn','🔬 Thí nghiệm'],['bando','🌍 Bản đồ'],['dayho','📋 Dạy học'],['cntt','💻 Công nghệ']].map(([k,lbl])=>
          '<button class="eb-stab'+(tbgdSub===k?' active':'')+'" onclick="tbgdSub=\''+k+'\';go(\'listing\',\'tbgd\')">'+lbl+(k!=='all'?' <span class="vst-cnt">('+P.filter(p=>p.cat==='tbgd'&&p.sub===k).length+')</span>':'')+'</button>'
        ).join('')+
        '<a class="eb-lib-link" onclick="go(\'equipment\')">🏫 Cửa hàng TBGD</a>'+
      '</div>':'')+
      chipHtml+
      '<div class="list-top"><span class="cnt">'+
        (filt.q
          ? '<b>'+list.length+'</b> kết quả cho <span class="cnt-query">"'+filt.q+'"</span>'
          : chips.length
            ? '<b>'+list.length+'</b><span class="cnt-slash">/</span><span class="cnt-total">'+base.length+'</span> sản phẩm'
            : '<b>'+list.length+'</b> sản phẩm')+
      '</span>'+
        '<div class="list-top-r">'+
          '<select onchange="filt.sort=this.value;renderListing()">'+sortOpts+'</select>'+
          '<div class="view-toggle">'+
            '<button class="'+(listView==='grid'?'on':'')+'" onclick="listView=\'grid\';renderListing()" title="Dạng lưới"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></button>'+
            '<button class="'+(listView==='list'?'on':'')+'" onclick="listView=\'list\';renderListing()" title="Dạng danh sách"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>'+
          '</div>'+
        '</div>'+
      '</div>'+
      (list.length
        ?'<div class="grid listing-grid'+(listView==='list'?' list-view':'')+'">'+list.map(pcard).join('')+'</div>'
        :'<div class="list-empty">'+
            '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6"/></svg>'+
            '<p>'+(filt.q?'Không tìm thấy kết quả nào cho "<b>'+filt.q+'</b>"':'Không có sản phẩm phù hợp với bộ lọc đã chọn')+'</p>'+
            '<button onclick="resetFilters()">Xóa bộ lọc</button>'+
          '</div>')+
    '</div>'+
  '</div>';
}

/* ---------------- Product detail ---------------- */
let pdpQty=1,pdpVar=0;
function renderProduct(){
  const p=P.find(x=>x.id==arg); pdpQty=1;pdpVar=0; window._rvStar=5;
  pushRecent(p.id);
  const related=P.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,5);
  const variants=p.cat==='sach'?['Bìa mềm','Bìa cứng']:['Loại tiêu chuẩn','Combo tiết kiệm'];
  const seed=[{name:'Ngọc Anh',rate:5,text:'Sách đẹp, giao nhanh, đóng gói cẩn thận. Rất hài lòng!'},{name:'Thầy Tuấn',rate:5,text:'Mua cho lớp, chất lượng tốt, giá hợp lý cho giáo viên.'},{name:'Hương',rate:4,text:'Nội dung ổn, ship hơi lâu một chút.'}];
  const reviews=[...(reviewsStore[p.id]||[]),...seed];

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <a onclick="go(\'listing\',\''+p.cat+'\')">'+CATLBL[p.cat]+'</a> › <b>'+p.name+'</b></div>'+
  '<div class="pdp">'+
    '<div class="pdp-gallery" style="background:#f3ede3">'+cover(p)+'</div>'+
    '<div class="pdp-info">'+
      '<h1>'+p.name+'</h1>'+
      (p.aud&&p.aud.length?'<div class="pdp-aud">Phù hợp cho: '+p.aud.map(a=>'<a onclick="go(\'listing\',\''+a+'\')">'+AUD[a]+'</a>').join(' · ')+'</div>':'')+
      '<div class="by">'+((p.cat==='sach'||p.ebook||p.audio)?'Tác giả: ':'Thương hiệu: ')+p.by+' · '+(p.audio?'Người đọc: '+p.narrator:'NXB/Hãng: '+p.nxb)+'</div>'+
      '<div class="pdp-rate"><span class="star">★ '+p.rate.toFixed(1)+'</span><span>'+p.sold.toLocaleString('vi-VN')+(p.audio?' lượt nghe':p.ebook?' lượt tải':' đã bán')+'</span><span>'+(p.audio?'Bản sách nói':p.ebook?'Bản điện tử':'Còn hàng')+'</span></div>'+
      '<div class="price-box"><div class="big">'+fmt(p.price)+'</div>'+(p.old>p.price?'<div class="save">Tiết kiệm '+fmt(p.old-p.price)+' (-'+discount(p)+'%) so với '+fmt(p.old)+'</div>':'')+'</div>'+
      (p.ebook? ebookCTA(p) : p.audio? audioCTA(p) : (
        '<div style="font-size:13.5px;font-weight:500">Phân loại</div>'+
        '<div class="variants" id="pdpVars">'+variants.map((v,i)=>'<button class="'+(i===0?'on':'')+'" onclick="pickVar('+i+')">'+v+'</button>').join('')+'</div>'+
        '<div style="font-size:13.5px;font-weight:500;margin-bottom:6px">Số lượng</div>'+
        '<div class="qty"><button onclick="pdpStep(-1)">−</button><span id="pdpQ">1</span><button onclick="pdpStep(1)">+</button></div>'+
        '<div class="pdp-cta"><button class="cart-btn" onclick="addToCart('+p.id+',pdpQty)">Thêm vào giỏ</button><button class="buy-btn" onclick="addToCart('+p.id+',pdpQty);go(\'cart\')">Mua ngay</button></div>'+
        '<div class="perks"><span>🚚 Giao nhanh toàn quốc</span><span>↩ Đổi trả trong 7 ngày</span><span>✔ Sách chính hãng</span><span>💳 MoMo · ZaloPay · VNPay · COD</span></div>'
      ))+
    '</div>'+
  '</div>'+

  '<div class="tabs">'+
    '<div class="tab-heads"><button class="on" onclick="pdpTab(0,this)">Mô tả</button><button onclick="pdpTab(1,this)">Đánh giá ('+reviews.length+')</button><button onclick="pdpTab(2,this)">Hỏi đáp</button></div>'+
    '<div class="tab-body" id="tabBody"></div>'+
  '</div>'+

  '<div class="section-head"><h2>Sản phẩm liên quan</h2></div>'+
  '<div class="grid">'+related.map(pcard).join('')+'</div>'+
  recentSection(p.id);

  window._pdpReviews=reviews; window._pdpP=p; pdpTab(0,null);
}
function pickVar(i){pdpVar=i;document.querySelectorAll('#pdpVars button').forEach((b,j)=>b.classList.toggle('on',j===i));}
function pdpStep(d){pdpQty=Math.max(1,pdpQty+d);document.getElementById('pdpQ').textContent=pdpQty;}
function pdpTab(i,btn){
  if(btn){document.querySelectorAll('.tab-heads button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');}
  const p=window._pdpP,el=document.getElementById('tabBody');
  if(i===0){const audText=p.aud&&p.aud.length?'Phù hợp cho đối tượng: '+p.aud.map(a=>AUD[a]).join(', ')+'. ':'';el.innerHTML='<p>'+p.name+' là sản phẩm '+(p.cat==='sach'?'thuộc danh mục sách, được biên soạn kỹ lưỡng, in ấn rõ nét.':'thuộc nhóm '+CATLBL[p.cat].toLowerCase()+', bền đẹp và phù hợp cho việc học tập.')+' '+audText+'Hãng/NXB: '+p.nxb+'. Sản phẩm chính hãng, có đầy đủ hóa đơn VAT khi yêu cầu.</p>';}
  else if(i===1){
    const list=window._pdpReviews.map(r=>'<div class="review"><div class="rh"><div class="av">'+(r.name||'?').charAt(0).toUpperCase()+'</div><div><div class="rn">'+r.name+'</div><div class="rs">'+'★'.repeat(r.rate)+'☆'.repeat(5-r.rate)+'</div></div></div>'+(r.img?'<img src="'+r.img+'" alt="" style="max-width:140px;border-radius:8px;margin:6px 0;display:block">':'')+'<p style="margin:0;font-size:14px">'+r.text+'</p></div>').join('');
    el.innerHTML='<div class="rv-form"><div class="rv-h">Viết đánh giá của bạn</div><div class="rv-stars" id="rvStars">'+[1,2,3,4,5].map(n=>'<span data-n="'+n+'" onclick="setRvStar('+n+')">★</span>').join('')+'</div><textarea id="rvText" placeholder="Chia sẻ cảm nhận về sản phẩm…"></textarea><input id="rvImg" placeholder="Dán link ảnh thực tế (không bắt buộc)"><button class="btn-primary" onclick="addReview('+p.id+')">Gửi đánh giá</button></div>'+list;
    setRvStar(window._rvStar||5);
  }
  else {
    const qs=questionsStore[p.id]||[];
    const list=qs.length?qs.map(x=>'<div class="review"><div style="font-weight:600;font-size:14px">❓ '+x.q+'</div>'+(x.a?'<div style="font-size:13.5px;color:var(--text-soft);margin-top:5px">↳ '+x.a+'</div>':'<div style="font-size:12.5px;color:var(--text-soft);margin-top:5px">Người bán sẽ trả lời sớm.</div>')+'</div>').join(''):'<p style="color:var(--text-soft)">Chưa có câu hỏi nào. Hãy là người đầu tiên!</p>';
    el.innerHTML='<div class="rv-form"><div class="rv-h">Đặt câu hỏi cho người bán</div><input id="qaText" placeholder="Ví dụ: Sách có kèm đáp án không?"><button class="btn-primary" onclick="addQuestion('+p.id+')">Gửi câu hỏi</button></div>'+list;
  }
}
function setRvStar(n){window._rvStar=n;document.querySelectorAll('#rvStars span').forEach(s=>s.classList.toggle('on',Number(s.dataset.n)<=n));}
function addReview(id){
  const t=(document.getElementById('rvText').value||'').trim(); if(!t){toast('Nhập nội dung đánh giá nhé');return;}
  const img=(document.getElementById('rvImg').value||'').trim();
  const r={name:user?user.name:'Khách EduMart',rate:window._rvStar||5,text:t,img:img};
  (reviewsStore[id]=reviewsStore[id]||[]).unshift(r); LS.set('reviews',reviewsStore);
  window._pdpReviews=[r,...window._pdpReviews]; window._rvStar=5;
  if(user){user.points=(user.points||0)+20;saveUser();}
  toast('Cảm ơn đánh giá của bạn!'+(user?' +20 điểm':'')); pdpTab(1,null);
}
function addQuestion(id){
  const t=(document.getElementById('qaText').value||'').trim(); if(!t){toast('Nhập câu hỏi nhé');return;}
  (questionsStore[id]=questionsStore[id]||[]).unshift({q:t,a:''}); LS.set('questions',questionsStore);
  toast('Đã gửi câu hỏi cho người bán'); pdpTab(2,null);
}
function recentSection(excludeId){
  const items=recentIds.filter(id=>id!==Number(excludeId)).map(id=>P.find(p=>p.id===id)).filter(Boolean).slice(0,5);
  if(!items.length)return '';
  return '<div class="section-head"><h2>Đã xem gần đây</h2></div><div class="grid">'+items.map(pcard).join('')+'</div>';
}

/* ---------------- Cart ---------------- */
function renderCart(){
  const ids=Object.keys(cart);
  if(!ids.length){
    document.getElementById('app').innerHTML='<div class="empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 13h11l2-9H6"/></svg><div style="font-size:17px;margin-bottom:6px">Giỏ hàng của bạn đang trống</div><a class="hero-cta" style="display:inline-flex" onclick="go(\'home\')">Tiếp tục mua sắm</a></div>';
    return;
  }
  const items=ids.map(id=>{const p=P.find(x=>x.id==id),q=cart[id];return '<div class="cart-item"><div class="cover-sm">'+cover(p)+'</div><div class="ci-info"><div class="nm">'+p.name+'</div><div class="pr">'+fmt(p.price)+'</div></div><div class="qty"><button onclick="setQty('+id+','+(q-1)+')">−</button><span>'+q+'</span><button onclick="setQty('+id+','+(q+1)+')">+</button></div><button class="ci-remove" onclick="setQty('+id+',0)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg></button></div>';}).join('');
  const sub=cartSubtotal(), ship=sub>300000?0:25000, disc=Math.round(sub*voucherPct/100), total=sub-disc+ship;

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Giỏ hàng</b></div>'+
  '<div class="cart">'+
    '<div>'+items+'</div>'+
    '<div class="summary"><h3>Tóm tắt đơn hàng</h3>'+
      '<div class="voucher"><input id="vCode" placeholder="Mã giảm giá (EDU10, GIAOVIEN)"><button onclick="applyVoucher()">Áp dụng</button></div>'+
      '<div class="sum-row"><span>Tạm tính</span><span>'+fmt(sub)+'</span></div>'+
      (disc>0?'<div class="sum-row"><span>Giảm giá ('+voucherPct+'%)</span><span style="color:#1a7a4a">-'+fmt(disc)+'</span></div>':'')+
      '<div class="sum-row"><span>Vận chuyển</span><span>'+(ship===0?'Miễn phí':fmt(ship))+'</span></div>'+
      (ship>0?'<div style="font-size:11.5px;color:var(--text-soft)">Mua thêm '+fmt(300000-sub)+' để được miễn phí ship</div>':'')+
      '<div class="sum-row total"><span>Tổng cộng</span><b>'+fmt(total)+'</b></div>'+
      '<button class="checkout" onclick="go(\'checkout\')">Tiến hành thanh toán</button>'+
      '<div class="pay-icons"><span>MoMo</span><span>ZaloPay</span><span>VNPay</span><span>COD</span><span>ATM/Visa</span><span>Trả góp</span></div>'+
    '</div>'+
  '</div>';
}

/* ---------------- Huyền học ---------------- */
const READINGS={
  1:['Người Tiên Phong','khao khát dẫn đầu và tự lập. Bạn học tốt nhất khi được chủ động khám phá thay vì học vẹt, và rất hợp những cuốn sách khơi dậy tư duy độc lập.'],
  2:['Người Đồng Hành','nhạy cảm, tinh tế và giỏi lắng nghe. Bạn tiếp thu sâu khi học cùng bạn bè, và hợp với sách nuôi dưỡng cảm xúc lẫn kỹ năng kết nối.'],
  3:['Người Kể Chuyện','sáng tạo, giàu cảm hứng và yêu cái đẹp của ngôn từ. Sách văn học và sách khơi gợi trí tưởng tượng sẽ làm bạn tỏa sáng.'],
  4:['Người Kiến Tạo','kỷ luật, thực tế và kiên trì. Bạn học chắc qua phương pháp rõ ràng, và hợp với sách rèn nề nếp, tư duy hệ thống.'],
  5:['Người Phiêu Lưu','tò mò, linh hoạt và mê trải nghiệm mới. Bạn dễ chán lối học cứng nhắc, nên hợp những cuốn sách mở rộng tầm nhìn.'],
  6:['Người Gìn Giữ','ấm áp, trách nhiệm và quan tâm tới mọi người. Bạn hợp với sách về sống đẹp, chữa lành và phát triển bản thân.'],
  7:['Người Tìm Kiếm','sâu sắc, thích chiêm nghiệm và đặt câu hỏi lớn. Sách tư duy, triết lý và khoa học sẽ nuôi dưỡng trí tuệ của bạn.'],
  8:['Người Dẫn Dắt','tham vọng, quyết đoán và có khiếu tổ chức. Bạn hợp với sách về tư duy thành công, lãnh đạo và quản lý thời gian.'],
  9:['Người Truyền Cảm Hứng','rộng lượng, lý tưởng và giàu lòng trắc ẩn. Bạn hợp với sách mở rộng trái tim lẫn tầm nhìn về thế giới.']
};
const CHANTS=['Mỗi trang sách hôm nay là một bước tiến của ngày mai.','Kiên trì đọc, bền bỉ học — thành công sẽ tìm đến bạn.','Tri thức là ánh sáng, và bạn đang thắp nó mỗi ngày.','Học bằng đam mê, đọc bằng cả trái tim.'];

function lifePath(d){let s=d.replace(/-/g,'').split('').map(Number).reduce((a,b)=>a+b,0);while(s>9&&s!==11&&s!==22&&s!==33){s=String(s).split('').reduce((a,b)=>a+Number(b),0);}return s;}
function quePickBooks(num){const s=P.filter(p=>p.cat==='sach');const st=num%s.length;return [s[st%s.length],s[(st+1)%s.length],s[(st+2)%s.length]];}
function showQue(name,num,tt,luan,chant,ai){
  const books=quePickBooks(num);
  const el=document.getElementById('mResult');
  el.innerHTML=
    '<div class="mseal"><div class="num">'+num+'</div><div><div class="tt">'+name+' — '+tt+(ai?'<span class="ai-badge">✦ Gợi ý bằng AI</span>':'')+'</div><div class="ss">Số chủ đạo · '+num+'</div></div></div>'+
    '<div class="mluan">'+luan+'</div>'+
    '<div class="mbooks">'+books.map(p=>'<div class="mbook">'+cover(p)+'<div class="mb-t">'+p.name+'</div><div class="mb-w">'+p.by+' — '+fmt(p.price)+'</div><button class="add" style="background:var(--coral)" onclick="addToCart('+p.id+')">Thêm vào giỏ</button></div>').join('')+'</div>'+
    '<div class="mchant">"'+chant+'"</div>';
  el.classList.add('show');
}
function renderHuyenHoc(){
  document.getElementById('app').innerHTML=
  '<div class="mystic-page">'+
    '<p class="eyebrow">EduMart · Huyền học</p>'+
    '<h1>Quẻ sách <em>thần số</em></h1>'+
    '<p class="lead">Nhập ngày sinh để lộ ra con số chủ đạo — trợ lý AI luận đôi nét tính cách và chọn cho bạn ba cuốn sách hợp duyên.</p>'+
    '<div class="mform">'+
      '<div class="fld"><label>Họ và tên</label><input id="mName" placeholder="Nguyễn Văn An"></div>'+
      '<div class="fld"><label>Ngày sinh</label><input id="mDob" type="date"></div>'+
      '<div class="fld"><label>Đọc để…</label><select id="mGoal"><option>phát triển bản thân</option><option>ôn thi, học tốt hơn</option><option>cảm hứng và sáng tạo</option><option>thư giãn, giải trí</option></select></div>'+
      '<button onclick="gieoQue()">Gieo quẻ chọn sách</button>'+
    '</div>'+
    '<div class="mresult" id="mResult"></div>'+
    '<p class="mnote">Tính năng mang tính giải trí và gợi ý đọc sách, không phải lời khuyên về sức khỏe, tài chính hay quyết định quan trọng.</p>'+
  '</div>';
}
async function gieoQue(){
  const name=document.getElementById('mName').value.trim(),dob=document.getElementById('mDob').value,goal=document.getElementById('mGoal').value;
  if(!name||!dob){toast('Bạn nhập giúp họ tên và ngày sinh nhé');return;}
  const num=lifePath(dob); const base=num>9?({11:2,22:4,33:6})[num]:num;
  const el=document.getElementById('mResult'); el.classList.add('show');
  el.innerHTML='<div style="padding:18px 0;color:#9aa0c2"><span class="spinner-m"></span>Thầy đồ số đang luận quẻ…</div>';
  try{
    const prompt='Bạn là "Thầy đồ số" của sàn sách EduMart, kết hợp thần số học với việc đọc sách, giọng ấm áp và truyền cảm hứng.\n'+
      'Người dùng tên "'+name+'", số chủ đạo thần số học là '+num+', muốn đọc sách để "'+goal+'".\n'+
      'Trả về DUY NHẤT một JSON hợp lệ (không markdown, không giải thích, không kèm dấu ```), dạng:\n'+
      '{"tieu_de":"một biệt danh ngắn theo số chủ đạo, ví dụ \'Người Kiến Tạo\'","loi_luan":"2-3 câu luận tính cách và thiên hướng học tập theo số chủ đạo '+num+', có nhắc tên người dùng","cau_chu":"một câu động lực học tập ngắn gọn, tích cực"}\nChỉ trả JSON.';
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,messages:[{role:'user',content:prompt}]})});
    const data=await res.json();
    const text=(data.content||[]).map(b=>b.type==='text'?b.text:'').join('');
    const r=JSON.parse(text.replace(/```json|```/g,'').trim());
    showQue(name,num,r.tieu_de,r.loi_luan,r.cau_chu,true);
  }catch(e){
    const rd=READINGS[base];
    showQue(name,num,rd[0],name+' mang số chủ đạo '+num+' — '+rd[1]+' Với mong muốn "'+goal+'", đây là ba cuốn sách hợp duyên với bạn lúc này.',CHANTS[num%CHANTS.length],false);
  }
}

/* ---------------- Account / Auth ---------------- */
/* Phân hệ: Người mua · Trường học / Tổ chức · Người bán / NCC · Quản trị viên */
const ROLELBL={hocsinh:'Học sinh',sinhvien:'Sinh viên',parent:'Phụ huynh',school:'Trường học / Tổ chức',seller:'Người bán / NCC',admin:'Quản trị viên'};
const ROLE_GROUPS=[
  {
    group:'Người mua',
    desc:'Học sinh · Sinh viên · Phụ huynh',
    roles:[
      {k:'hocsinh',name:'Học sinh',desc:'SGK, dụng cụ học tập, sách tham khảo',ic:'<path d="M9 3 4 6v12l5 3 6-3 5 3V6l-5-3-6 3Z"/>'},
      {k:'sinhvien',name:'Sinh viên',desc:'Giáo trình, sách kỹ năng, ebook',ic:'<path d="M3 9l9-5 9 5-9 5-9-5Z M7 11v5a5 3 0 0 0 10 0v-5"/>'},
      {k:'parent',name:'Phụ huynh',desc:'Mua cho con, theo dõi học tập',ic:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/>'},
    ],
    kind:'nguoimua'
  },
  {
    group:'Trường học / Tổ chức',
    desc:'Mua sỉ · Báo giá · Thư viện số trường',
    roles:[
      {k:'school',name:'Trường học / Tổ chức',desc:'Mua sỉ, yêu cầu báo giá, thư viện số',ic:'<path d="M3 21h18M3 10l9-7 9 7M9 21V14h6v7"/>'},
    ],
    kind:'truonghoc'
  },
  {
    group:'Người bán / NCC',
    desc:'Nhà xuất bản · Nhà cung cấp · Đại lý',
    roles:[
      {k:'seller',name:'Người bán / NCC',desc:'Quản lý gian hàng, đơn, tồn kho',ic:'<path d="M3 9l1-5h16l1 5M5 9v11h14V9"/>'},
    ],
    kind:'ncc'
  },
  {
    group:'Quản trị viên',
    desc:'Vận hành & giám sát toàn sàn',
    roles:[
      {k:'admin',name:'Quản trị viên',desc:'Vận hành toàn sàn',ic:'<circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 19 4.7l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>'},
    ],
    kind:'admin'
  }
];
const ROLES=ROLE_GROUPS.flatMap(g=>g.roles.map(r=>({...r,kind:g.kind,to:g.to})));
let lgRole='hocsinh', authView='login', authResetToken=null;
let user=LS.get('user',null), orders=LS.get('orders',[]), acctTab='dashboard';
let profileTab='info';
let pfEditMode=false, emailChangeStep=null, emailChangePending='';
let adminDays=30;
let admUsersView='list', admUserSearch='', admUserRoleFilter='all', admUserStatusFilter='all', admSelectedUserId=null, admUserPage=0;
let admShopsTab='pending', admShopsView='list', admShopsSelectedId=null;
let admShopsPendingSearch='', admShopsPendingPage=0;
let admShopsActiveSearch='', admShopsActiveFilter='all', admShopsActivePage=0;
let admProductsTab='pending', admProductsView='list', admProductsSelectedId=null;
let admPendingSearch='', admPendingPage=0;
let admReportedSearch='', admReportedPage=0;
let admCatView='list';
let admOrdersTab='all', admOrdersView='list', admOrdersSelectedId=null;
let admOrdersSearch='', admOrdersStatusFilter='all', admOrdersSellerFilter='all';
let admOrdersPage=0, admComplaintsPage=0;
let admFinTab='overview', admFinWithdrawTab='pending', admFinPayPage=0, admFinWdPage=0;
let admFinPaySearch='', admFinWdSearch='';
let admCmsTab='blog', admCmsBannerSubTab='banners';
let admBlogPage=0, admBlogSearch='', admBlogStatusFilter='all', admBlogCatFilter='all';
let admBlogEditId=null;
let admCmntPage=0, admCmntSearch='', admCmntStatusFilter='all';
let admBannerEditId=null;
let admStaticPage='about';
// Promotion Management
let admPromoTab='vouchers';
let admVoucherPage=0, admVoucherSearch='', admVoucherStatusFilter='all';
let admVoucherEditId=null;
let admFlashSaleEditId=null, admFlashSaleDetailId=null;
let admFsFilter='all';
let admPointsTab='settings';
// System Settings
let admSettingsTab='general';
let admSettingsGeneralTab='info';
let admSettingsPaymentTab='gateways';
// Email & Notification Management
let admNotifTab='compose';
// Seller Portal
let sellerRegStep=1;
let sellerDashPeriod='month';
let sellerEditProductId=null;
let sellerProductSearch='';
let sellerProductStatusFilter='all';
let sellerSelectedProds=[];
let sellerRestockProductId=null;
let sellerEditEbookId=null;
let sellerEbookStatusFilter='all';
let sellerEbookStatsId=null;
let sellerEditVppId=null;
let sellerVppSearch='';
let sellerVppStatusFilter='all';
let sellerRestockVppId=null;
let sellerEditTbgdId=null;
let sellerTbgdSearch='';
let sellerTbgdStatusFilter='all';
let sellerRestockTbgdId=null;
let sellerOrderSearch='';
let sellerOrderStatusFilter='all';
let sellerOrderSelected=[];
let sellerViewOrderId=null;
let sellerCancelOrderId=null;
let sellerTrackingOrderId=null;
let sellerWarehouseTab='stock';
let sellerStockFilter='all';
let sellerStockSearch='';
let sellerEditReceiptId=null;
let sellerReceiptLines=[];
let sellerReceiptSupplier='';
let sellerReceiptNote='';
let sellerReceiptStatus='';
let sellerRevenuePeriod='month';
let sellerPayTab='balance';
let sellerAnalyticsTab='basic';
let sellerAnalyticsPeriod='week';
let sellerReviewFilter='all';
let sellerReviewStarFilter=0;
let sellerReviewProductFilter='all';
let sellerReviewEditReplyId=null;
let admEmailPage=0, admEmailSearch='';
let admSubsPage=0, admSubsSearch='', admSubsStatusFilter='all', admSubsSourceFilter='all';
let orderFilter='all';
let libFilter='all';
let bstabFmt='all';
let bsGenre='all',bsFmt='all',bsActive=0;
let vppSub='all';
let tbgdSub='all';
let returns=LS.get('returns',[]);
function saveReturns(){LS.set('returns',returns);}
let pointsLog=LS.get('pointsLog',[]);
function savePointsLog(){LS.set('pointsLog',pointsLog);}
function saveUser(){LS.set('user',user);}
function saveOrders(){LS.set('orders',orders);}
let children=LS.get('children',[]);                 // hồ sơ con (phụ huynh)
function saveChildren(){LS.set('children',children);}
let addresses=LS.get('addresses',[]);
function saveAddresses(){LS.set('addresses',addresses);}
let editingAddressId=null;
const PROVINCES={
  'TP. Hồ Chí Minh':{'Quận 1':['P. Bến Nghé','P. Bến Thành','P. Cầu Kho','P. Cô Giang'],'Quận 3':['P. Võ Thị Sáu','P. Nguyễn Thái Bình','P. Phạm Ngũ Lão'],'Quận 7':['P. Tân Phú','P. Tân Quy','P. Phú Thuận'],'Quận Bình Thạnh':['P. 1','P. 2','P. 11','P. 12'],'TP. Thủ Đức':['P. Linh Xuân','P. Hiệp Bình Chánh','P. An Khánh']},
  'Hà Nội':{'Quận Ba Đình':['P. Phúc Xá','P. Trúc Bạch','P. Nguyễn Trung Trực'],'Quận Hoàn Kiếm':['P. Hàng Bạc','P. Hàng Gai','P. Tràng Tiền'],'Quận Đống Đa':['P. Văn Chương','P. Nam Đồng','P. Phương Liên'],'Quận Cầu Giấy':['P. Dịch Vọng','P. Nghĩa Đô','P. Quan Hoa'],'Quận Long Biên':['P. Bồ Đề','P. Ngọc Lâm','P. Gia Thụy']},
  'Đà Nẵng':{'Quận Hải Châu':['P. Hải Châu 1','P. Hải Châu 2','P. Thạch Thang'],'Quận Thanh Khê':['P. Thanh Khê Đông','P. Xuân Hà','P. Tân Chính'],'Quận Sơn Trà':['P. Mân Thái','P. Phước Mỹ','P. An Hải Bắc']},
  'Bình Dương':{'TP. Thủ Dầu Một':['P. Phú Cường','P. Hiệp Thành','P. Phú Hòa'],'TP. Dĩ An':['P. Dĩ An','P. Đông Hòa','P. An Bình'],'TP. Thuận An':['P. An Phú','P. Thuận Giao','P. Bình Chuẩn']},
  'Đồng Nai':{'TP. Biên Hòa':['P. Trung Dũng','P. Tân Hiệp','P. Hòa Bình'],'H. Long Thành':['TT. Long Thành','X. An Phước','X. Tam An']},
  'Cần Thơ':{'Q. Ninh Kiều':['P. An Bình','P. An Cư','P. An Lạc'],'Q. Bình Thủy':['P. Bình Thủy','P. Long Hòa','P. Long Tuyền']},
  'Hải Phòng':{'Q. Hồng Bàng':['P. Hoàng Văn Thụ','P. Minh Khai','P. Quán Toan'],'Q. Ngô Quyền':['P. Đổng Quốc Bình','P. Cầu Tre','P. Vạn Mỹ']},
  'Nghệ An':{'TP. Vinh':['P. Hưng Bình','P. Hà Huy Tập','P. Lê Lợi'],'H. Nghi Lộc':['X. Nghi Kim','X. Nghi Liên','X. Nghi Ân']},
  'Khánh Hòa':{'TP. Nha Trang':['P. Vạn Thắng','P. Vạn Thạnh','P. Phương Sơn'],'H. Cam Lâm':['X. Cam Tân','X. Cam Hòa','X. Cam Hải Đông']},
  'Lâm Đồng':{'TP. Đà Lạt':['P. 1','P. 2','P. 3','P. 4'],'H. Đức Trọng':['TT. Liên Nghĩa','X. N\'Thol Hạ','X. Tà Hine']}
};
// Auth users DB & tokens
let authUsers=LS.get('authUsers',[]);
function saveAuthUsers(){LS.set('authUsers',authUsers);}
let resetTokens=LS.get('resetTokens',{});
function saveResetTokens(){LS.set('resetTokens',resetTokens);}
let loginLog=LS.get('loginLog',[]);
function saveLoginLog(){LS.set('loginLog',loginLog);}
let activeSessions=LS.get('activeSessions',null);
function saveActiveSessions(){LS.set('activeSessions',activeSessions);}
let privacySet=LS.get('privacy',{analytics:true,marketing:true,thirdParty:false,push:true});
function savePrivacySet(){LS.set('privacy',privacySet);}
let twoFAStep=null,twoFAMethod='sms',twoFABackupCodes=null,otpResendSec=0,otpResendTimer=null;
// Auth helpers
function hashPw(pw){let h=0;for(let i=0;i<pw.length;i++){h=((h<<5)-h)+pw.charCodeAt(i);h|=0;}return 'h'+Math.abs(h).toString(36);}
function genToken(){return Math.random().toString(36).slice(2,10)+Math.random().toString(36).slice(2,10);}
function validEmail(s){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);}
function validPw(s){return s&&s.length>=6;}
function showAuthErr(id,msg){const el=document.getElementById(id);if(el){el.innerHTML=msg;el.style.display=msg?'':'none';}}
const EYE_SVG='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_SVG='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18 18 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18 18 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
function togglePw(id,btn){const el=document.getElementById(id);if(!el)return;const show=el.type==='password';el.type=show?'text':'password';btn.innerHTML=show?EYE_OFF_SVG:EYE_SVG;}
function updatePwStrength(){const pw=val('rgPw')||'';const el=document.getElementById('pwStr');if(!el)return;const s=!pw?0:pw.length<6?1:pw.length>=10&&/[0-9]/.test(pw)&&/[^a-zA-Z0-9]/.test(pw)?4:pw.length>=8&&(/[0-9]/.test(pw)||/[^a-zA-Z0-9]/.test(pw))?3:2;const lbls=['','Quá ngắn','Yếu','Trung bình','Mạnh'];const cols=['','#e74c3c','#e67e22','#f39c12','#27ae60'];const pcts=[0,25,50,75,100];el.innerHTML='<div class="pws-bar"><div class="pws-fill" style="width:'+pcts[s]+'%;background:'+cols[s]+'"></div></div>'+(pw?'<span class="pws-lbl" style="color:'+cols[s]+'">'+lbls[s]+'</span>':'');}
function _addrFullStr(province,district,ward,street){return [street,ward,district,province].filter(Boolean).join(', ');}
function _addrFormVals(prefix){
  prefix=prefix||'ad';
  const name=val(prefix+'Name'),phone=val(prefix+'Phone');
  const label=document.querySelector('input[name="'+prefix+'Label"]:checked');
  const province=val(prefix+'Province'),district=val(prefix+'District'),ward=val(prefix+'Ward'),street=val(prefix+'Street');
  return {name,phone,label:label?label.value:'Nhà',province,district,ward,street};
}
function addAddress(){
  const v=_addrFormVals('ad');
  if(!v.province){toast('Chọn Tỉnh/Thành phố');return;}
  if(!v.district){toast('Chọn Quận/Huyện');return;}
  if(!v.street){toast('Nhập số nhà, tên đường');return;}
  const addr=_addrFullStr(v.province,v.district,v.ward,v.street);
  addresses.push({id:Date.now(),name:v.name||(user?user.name:''),phone:v.phone||(user?user.phone:''),label:v.label,province:v.province,district:v.district,ward:v.ward,street:v.street,addr,def:addresses.length===0});
  saveAddresses();editingAddressId=null;renderAccount();toast('Đã thêm địa chỉ');
}
function editAddress(id){editingAddressId=id;renderAccount();}
function cancelEditAddress(){editingAddressId=null;renderAccount();}
function updateAddress(id){
  const a=addresses.find(x=>x.id===id);if(!a)return;
  const v=_addrFormVals('ea');
  if(!v.province){toast('Chọn Tỉnh/Thành phố');return;}
  if(!v.street){toast('Nhập số nhà, tên đường');return;}
  a.name=v.name||a.name;a.phone=v.phone||a.phone;a.label=v.label;
  a.province=v.province;a.district=v.district;a.ward=v.ward;a.street=v.street;
  a.addr=_addrFullStr(v.province,v.district,v.ward,v.street);
  saveAddresses();editingAddressId=null;renderAccount();toast('Đã cập nhật địa chỉ');
}
function removeAddress(id){addresses=addresses.filter(a=>a.id!==id);if(editingAddressId===id)editingAddressId=null;saveAddresses();renderAccount();}
function setDefaultAddress(id){addresses.forEach(a=>{a.def=(a.id===id);});saveAddresses();renderAccount();}
function _addrProvinceOpts(sel){return Object.keys(PROVINCES).map(p=>'<option'+(sel===p?' selected':'')+'>'+p+'</option>').join('');}
function _addrDistrictOpts(prov,sel){const dists=PROVINCES[prov]?Object.keys(PROVINCES[prov]):[];return dists.map(d=>'<option'+(sel===d?' selected':'')+'>'+d+'</option>').join('');}
function _addrWardOpts(prov,dist,sel){const wards=PROVINCES[prov]&&PROVINCES[prov][dist]?PROVINCES[prov][dist]:[];return wards.map(w=>'<option'+(sel===w?' selected':'')+'>'+w+'</option>').join('');}
function onAddrProvinceChange(pid,did,wid){const prov=document.getElementById(pid).value;document.getElementById(did).innerHTML='<option value="">-- Quận/Huyện --</option>'+_addrDistrictOpts(prov,'');document.getElementById(wid).innerHTML='<option value="">-- Phường/Xã --</option>';}
function onAddrDistrictChange(pid,did,wid){const prov=document.getElementById(pid).value;const dist=document.getElementById(did).value;document.getElementById(wid).innerHTML='<option value="">-- Phường/Xã --</option>'+_addrWardOpts(prov,dist,'');}
function _addrLabelBtns(prefix,sel){return ['Nhà','Văn phòng','Khác'].map(l=>'<label class="addr-type-btn'+(sel===l?' on':'')+'"><input type="radio" name="'+prefix+'Label" value="'+l+'" '+(sel===l?'checked':'')+' style="display:none" onchange="this.closest(\'.addr-type-row\').querySelectorAll(\'.addr-type-btn\').forEach(b=>b.classList.remove(\'on\'));this.closest(\'.addr-type-btn\').classList.add(\'on\')">'+l+'</label>').join('');}
function _addrForm(prefix,a){
  a=a||{};
  const prov=a.province||'';const dist=a.district||'';const ward=a.ward||'';
  return '<div class="form-row"><div class="form-field"><label>Họ tên người nhận</label><input id="'+prefix+'Name" value="'+(a.name||(user?user.name:'')).replace(/"/g,'&quot;')+'"></div>'+
    '<div class="form-field"><label>Số điện thoại</label><input id="'+prefix+'Phone" placeholder="09xx xxx xxx" value="'+(a.phone||(user?user.phone:'')||'')+'"></div></div>'+
    '<div class="form-field"><label>Loại địa chỉ</label><div class="addr-type-row">'+_addrLabelBtns(prefix,a.label||'Nhà')+'</div></div>'+
    '<div class="form-row"><div class="form-field"><label>Tỉnh / Thành phố</label>'+
      '<select id="'+prefix+'Province" onchange="onAddrProvinceChange(\''+prefix+'Province\',\''+prefix+'District\',\''+prefix+'Ward\')">'+
      '<option value="">-- Chọn Tỉnh/TP --</option>'+_addrProvinceOpts(prov)+'</select></div>'+
    '<div class="form-field"><label>Quận / Huyện</label>'+
      '<select id="'+prefix+'District" onchange="onAddrDistrictChange(\''+prefix+'Province\',\''+prefix+'District\',\''+prefix+'Ward\')">'+
      '<option value="">-- Quận/Huyện --</option>'+_addrDistrictOpts(prov,dist)+'</select></div></div>'+
    '<div class="form-row"><div class="form-field"><label>Phường / Xã / Thị trấn</label>'+
      '<select id="'+prefix+'Ward"><option value="">-- Phường/Xã --</option>'+_addrWardOpts(prov,dist,ward)+'</select></div>'+
    '<div class="form-field"><label>Số nhà, tên đường</label><input id="'+prefix+'Street" placeholder="VD: 12 Nguyễn Huệ" value="'+(a.street||'').replace(/"/g,'&quot;')+'"></div></div>';
}
function gradeAud(g){const n=parseInt((g||'').replace(/\D/g,''))||6;return n<=5?'tieuhoc':n<=9?'thcs':'thpt';}
function addChild(){const name=val('chName');if(!name){toast('Nhập tên của con');return;}children.push({name,grade:document.getElementById('chGrade').value});saveChildren();toast('Đã thêm hồ sơ con');renderAccount();}
function removeChild(i){children.splice(i,1);saveChildren();renderAccount();}

function refCode(n){return 'EDU'+String((n||'EDUMART').split('').reduce((a,c)=>a+c.charCodeAt(0),0)%9000+1000);}
function pickRole(k){lgRole=k;renderAuthBody();}
// authTab: backward compat (1→login, 0→register) + new string views
function authTab(v){
  if(v===1||v==='login')authView='login';
  else if(v===0||v==='register')authView='register';
  else authView=v||'login';
  renderAuthBody();
}
function renderLogin(view){
  authView=view||'login';
  document.getElementById('app').innerHTML=
    '<div class="auth-wrap wide">'+
    '<div class="auth-tabs" id="authTabsBar">'+
    '<button id="tabLogin" onclick="authTab(\'login\')">Đăng nhập</button>'+
    '<button id="tabReg" onclick="authTab(\'register\')">Đăng ký</button>'+
    '</div>'+
    '<div class="form-card" id="authBody"></div></div>';
  renderAuthBody();
}
function _rolePicker(){
  return '<div class="form-label">Chọn phân hệ của bạn</div>'+
    '<div class="role-groups">'+ROLE_GROUPS.map(g=>{
      const cards=g.roles.map(r=>'<button class="role-card'+(r.k===lgRole?' on':'')+(g.kind==='redirect'?' redirect':'')+'" onclick="pickRole(\''+r.k+'\')">'+
        '<span class="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">'+r.ic+'</svg></span>'+
        '<span class="rt">'+r.name+'</span><span class="rd">'+r.desc+'</span></button>').join('');
      return '<div class="role-group'+(g.roles.some(r=>r.k===lgRole)?' active-group':'')+'">'+
        '<div class="rg-label">'+g.group+'</div>'+
        '<div class="role-grid rg-cols-'+g.roles.length+'">'+cards+'</div></div>';
    }).join('')+'</div>';
}
const DEMO_ACCOUNTS=[
  {role:'admin',   label:'Quản trị viên',        email:'admin@edumart.vn',  pw:'admin123'},
  {role:'hocsinh', label:'Học sinh',               email:'hocsinh@demo.vn',  pw:'demo123'},
  {role:'sinhvien',label:'Sinh viên',              email:'sinhvien@demo.vn', pw:'demo123'},
  {role:'parent',  label:'Phụ huynh',              email:'phuhuynh@demo.vn', pw:'demo123'},
];
function demoFill(role,email,pw){
  lgRole=role;
  const eEl=document.getElementById('lgEmail');
  const pEl=document.getElementById('lgPw');
  if(eEl)eEl.value=email;
  if(pEl)pEl.value=pw;
  document.querySelectorAll('.demo-pill').forEach(x=>x.classList.remove('on'));
  const active=document.querySelector('.demo-pill[data-role="'+role+'"]');
  if(active)active.classList.add('on');
  renderAuthBody();
}
function _demoPanel(){
  const pills=DEMO_ACCOUNTS.map(a=>
    '<button class="demo-pill'+(lgRole===a.role?' on':'')+'" data-role="'+a.role+'" onclick="demoFill(\''+a.role+'\',\''+a.email+'\',\''+a.pw+'\')">'+a.label+'</button>'
  ).join('');
  return '<div class="demo-panel"><span class="demo-panel-label">Demo nhanh</span>'+pills+'</div>';
}
function _loginForm(sel){
  const rem=LS.get('rememberMe',false);
  const prefill=DEMO_ACCOUNTS.find(a=>a.role===sel.k);
  const emailVal=prefill?prefill.email:'';
  const pwVal=prefill?prefill.pw:'';
  return '<div class="form-field"><label>Email</label>'+
    '<input id="lgEmail" type="email" placeholder="ten@email.com" autocomplete="email" value="'+emailVal+'"></div>'+
    '<div class="form-field"><div class="auth-label-row"><label>Mật khẩu</label>'+
    '<a class="auth-link" onclick="authTab(\'forgot\')">Quên mật khẩu?</a></div>'+
    '<div class="pw-wrap"><input id="lgPw" type="password" placeholder="Tối thiểu 6 ký tự" autocomplete="current-password" value="'+pwVal+'" onkeydown="if(event.key===\'Enter\')doLogin()">'+
    '<button type="button" class="pw-toggle" onclick="togglePw(\'lgPw\',this)" tabindex="-1">'+EYE_SVG+'</button></div></div>'+
    '<div class="auth-check-row"><label class="auth-check"><input type="checkbox" id="lgRemember"'+(rem?' checked':'')+'>'+
    '<span>Ghi nhớ đăng nhập</span></label></div>'+
    '<div id="lgErr" class="field-error"></div>'+
    '<button class="btn-primary" style="width:100%;margin-top:6px" onclick="doLogin()">Đăng nhập — '+sel.name+'</button>'+
    '<div class="auth-sep">hoặc tiếp tục với</div>'+
    '<div class="social-btns">'+
    '<button class="sb-google" onclick="doSocialAuth(\'google\')">G&nbsp;Google</button>'+
    '<button class="sb-fb" onclick="doSocialAuth(\'facebook\')">f&nbsp;Facebook</button>'+
    '</div>'+
    '<p class="auth-switch">Chưa có tài khoản? <a class="auth-link" onclick="authTab(\'register\')">Đăng ký ngay</a></p>';
}
function _registerForm(sel){
  return '<div class="form-row">'+
    '<div class="form-field"><label>Họ và tên</label>'+
    '<input id="rgName" placeholder="Nguyễn Văn An" autocomplete="name"></div>'+
    '<div class="form-field"><label>Số điện thoại <span class="opt-tag">(tùy chọn)</span></label>'+
    '<input id="rgPhone" type="tel" placeholder="0912 345 678" autocomplete="tel"></div>'+
    '</div>'+
    '<div class="form-field"><label>Email</label>'+
    '<input id="rgEmail" type="email" placeholder="ten@email.com" autocomplete="email"></div>'+
    '<div class="form-field"><label>Mật khẩu</label>'+
    '<div class="pw-wrap"><input id="rgPw" type="password" placeholder="Tối thiểu 6 ký tự" autocomplete="new-password" oninput="updatePwStrength()">'+
    '<button type="button" class="pw-toggle" onclick="togglePw(\'rgPw\',this)" tabindex="-1">'+EYE_SVG+'</button></div>'+
    '<div id="pwStr"></div></div>'+
    '<div class="form-field"><label>Xác nhận mật khẩu</label>'+
    '<div class="pw-wrap"><input id="rgPw2" type="password" placeholder="Nhập lại mật khẩu" autocomplete="new-password" onkeydown="if(event.key===\'Enter\')doRegister()">'+
    '<button type="button" class="pw-toggle" onclick="togglePw(\'rgPw2\',this)" tabindex="-1">'+EYE_SVG+'</button></div></div>'+
    '<div class="auth-check-row auth-terms"><label class="auth-check"><input type="checkbox" id="rgTerms">'+
    '<span>Tôi đồng ý với <a class="auth-link" href="#" onclick="event.preventDefault();alert(\'Điều khoản sẽ được cập nhật sớm!\')">Điều khoản sử dụng</a></span></label></div>'+
    '<div id="rgErr" class="field-error"></div>'+
    '<button class="btn-primary" style="width:100%;margin-top:6px" onclick="doRegister()">Tạo tài khoản — '+sel.name+'</button>'+
    '<div class="auth-sep">hoặc tiếp tục với</div>'+
    '<div class="social-btns">'+
    '<button class="sb-google" onclick="doSocialAuth(\'google\')">G&nbsp;Google</button>'+
    '<button class="sb-fb" onclick="doSocialAuth(\'facebook\')">f&nbsp;Facebook</button>'+
    '</div>'+
    '<p class="auth-switch">Đã có tài khoản? <a class="auth-link" onclick="authTab(\'login\')">Đăng nhập</a></p>';
}
function _forgotForm(){
  return '<a class="auth-back" onclick="authTab(\'login\')">← Về đăng nhập</a>'+
    '<h3 class="auth-view-title">Quên mật khẩu</h3>'+
    '<p class="auth-view-sub">Nhập email đăng ký — chúng tôi sẽ gửi link đặt lại.</p>'+
    '<div class="form-field"><label>Email tài khoản</label>'+
    '<input id="fgEmail" type="email" placeholder="ten@email.com" autocomplete="email" onkeydown="if(event.key===\'Enter\')doForgotPw()"></div>'+
    '<div id="fgErr" class="field-error"></div>'+
    '<button class="btn-primary" style="width:100%;margin-top:6px" onclick="doForgotPw()">Gửi link đặt lại mật khẩu</button>';
}
function _resetForm(){
  return '<a class="auth-back" onclick="authTab(\'login\')">← Về đăng nhập</a>'+
    '<h3 class="auth-view-title">Đặt lại mật khẩu</h3>'+
    '<p class="auth-view-sub">Nhập mật khẩu mới cho tài khoản của bạn.</p>'+
    '<div class="form-field"><label>Token xác nhận</label>'+
    '<input id="rtToken" placeholder="Dán token từ email" value="'+(authResetToken||'')+'" autocomplete="off"></div>'+
    '<div class="form-row">'+
    '<div class="form-field"><label>Mật khẩu mới</label><input id="rtPw" type="password" placeholder="Tối thiểu 6 ký tự" autocomplete="new-password"></div>'+
    '<div class="form-field"><label>Xác nhận</label><input id="rtPw2" type="password" placeholder="Nhập lại" autocomplete="new-password" onkeydown="if(event.key===\'Enter\')doResetPw()"></div>'+
    '</div>'+
    '<div id="rtErr" class="field-error"></div>'+
    '<button class="btn-primary" style="width:100%;margin-top:6px" onclick="doResetPw()">Cập nhật mật khẩu</button>';
}
function renderAuthBody(){
  const body=document.getElementById('authBody');
  if(!body)return;
  const bar=document.getElementById('authTabsBar');
  const inForm=(authView==='forgot'||authView==='reset');
  if(bar)bar.style.display=inForm?'none':'';
  const tl=document.getElementById('tabLogin'),tr=document.getElementById('tabReg');
  if(tl)tl.classList.toggle('on',authView==='login');
  if(tr)tr.classList.toggle('on',authView==='register');
  const sel=ROLES.find(r=>r.k===lgRole)||ROLES[0];
  const selGroup=ROLE_GROUPS.find(g=>g.roles.some(r=>r.k===lgRole))||ROLE_GROUPS[0];
  const isRedirect=selGroup.kind==='redirect'&&!inForm;
  let html='';
  if(!inForm)html=_rolePicker();
  if(authView==='forgot')html+=_forgotForm();
  else if(authView==='reset')html+=_resetForm();
  else if(isRedirect)html+='<div class="role-note">Phân hệ "<b>'+selGroup.group+'</b>" có cổng riêng.</div>'+
    '<button class="btn-primary" style="width:100%" onclick="window.location.href=\''+selGroup.to+'\'">Vào cổng '+selGroup.group+' ›</button>';
  else if(authView==='login')html+=_loginForm(sel);
  else html+=_registerForm(sel);
  body.innerHTML=html;
}

/* Auth actions */
function doLogin(){
  const email=(val('lgEmail')||'').trim().toLowerCase();
  const pw=val('lgPw')||'';
  const sel=ROLES.find(r=>r.k===lgRole)||ROLES[0];
  if(sel.kind==='redirect'){window.location.href=sel.to;return;}
  if(!email){showAuthErr('lgErr','Vui lòng nhập email');return;}
  if(!pw){showAuthErr('lgErr','Vui lòng nhập mật khẩu');return;}
  const found=authUsers.find(u=>(u.email===email||u.phone===email)&&u.pwHash===hashPw(pw));
  if(!found){showAuthErr('lgErr','Email hoặc mật khẩu không đúng. <a class="auth-link" onclick="authTab(\'forgot\')">Quên mật khẩu?</a>');return;}
  if(found.deletedAt){showAuthErr('lgErr','Tài khoản này đã bị xóa. Vui lòng liên hệ hỗ trợ.');return;}
  if(found.status==='locked'){showAuthErr('lgErr','Tài khoản đã bị khóa: <b>'+escHtml(found.lockedReason||'Vi phạm điều khoản')+'</b>. Vui lòng liên hệ hỗ trợ.');return;}
  LS.set('rememberMe',!!document.getElementById('lgRemember')?.checked);
  user={...found};saveUser();
  toast('Đăng nhập thành công · '+ROLELBL[user.role]);acctTab='dashboard';go('account');
}
function doRegister(){
  const name=(val('rgName')||'').trim();
  const phone=(val('rgPhone')||'').trim();
  const email=(val('rgEmail')||'').trim().toLowerCase();
  const pw=val('rgPw')||'',pw2=val('rgPw2')||'';
  const sel=ROLES.find(r=>r.k===lgRole)||ROLES[0];
  if(sel.kind==='redirect'){window.location.href=sel.to;return;}
  if(!name){showAuthErr('rgErr','Vui lòng nhập họ tên');return;}
  if(!validEmail(email)){showAuthErr('rgErr','Email không hợp lệ');return;}
  if(!validPw(pw)){showAuthErr('rgErr','Mật khẩu phải từ 6 ký tự trở lên');return;}
  if(pw!==pw2){showAuthErr('rgErr','Mật khẩu xác nhận không khớp');return;}
  if(!document.getElementById('rgTerms')?.checked){showAuthErr('rgErr','Vui lòng đồng ý với Điều khoản sử dụng');return;}
  if(authUsers.find(u=>u.email===email)){
    showAuthErr('rgErr','Email này đã được đăng ký. <a class="auth-link" onclick="authTab(\'login\')">Đăng nhập?</a>');return;
  }
  const nu={id:'u'+Date.now().toString(36),name,email,phone:phone||'',pwHash:hashPw(pw),role:lgRole,
    points:0,ref:refCode(name),checkin:null,streak:0,createdAt:todayStr()};
  authUsers.push(nu);saveAuthUsers();
  user={...nu};saveUser();
  toast('Tạo tài khoản thành công · '+ROLELBL[lgRole]);acctTab='dashboard';go('account');
}
function doSocialAuth(provider){
  const sel=ROLES.find(r=>r.k===lgRole)||ROLES[0];
  if(sel.kind==='redirect'){window.location.href=sel.to;return;}
  const pname=provider==='google'?'Google':provider==='facebook'?'Facebook':'Zalo';
  const fakeName=prompt('Giả lập đăng nhập qua '+pname+'\n\nNhập tên hiển thị:','');
  if(fakeName===null)return;
  const displayName=fakeName.trim()||pname+' User';
  const fakeEmail=displayName.toLowerCase().replace(/\s+/g,'.')+'.'+provider+'@demo.local';
  let found=authUsers.find(u=>u.email===fakeEmail);
  if(!found){
    found={id:'u'+Date.now().toString(36),name:displayName,email:fakeEmail,
      pwHash:'__social__'+provider,role:lgRole,provider,
      points:0,phone:'',ref:refCode(displayName),checkin:null,streak:0,createdAt:todayStr()};
    authUsers.push(found);saveAuthUsers();
    toast('Đăng ký qua '+pname+' thành công · '+ROLELBL[lgRole]);
  } else {
    toast('Đăng nhập qua '+pname+' · '+ROLELBL[found.role||lgRole]);
  }
  user={...found,role:found.role||lgRole};saveUser();
  acctTab='dashboard';go('account');
}
function doForgotPw(){
  const email=(val('fgEmail')||'').trim().toLowerCase();
  if(!validEmail(email)){showAuthErr('fgErr','Vui lòng nhập đúng định dạng email');return;}
  const found=authUsers.find(u=>u.email===email);
  const token=genToken();
  if(found){
    const tk={...resetTokens};
    Object.keys(tk).forEach(k=>{if(tk[k].expires<Date.now())delete tk[k];});
    tk[token]={email,expires:Date.now()+3600000};
    resetTokens=tk;saveResetTokens();
  }
  const tokenHtml=found
    ?'<div class="auth-token-box">'+
      '<div class="auth-token-label">TOKEN ĐỂ TEST (thay thế email thật):</div>'+
      '<code class="auth-token-code">'+token+'</code>'+
      '<button class="btn-ghost" style="width:100%;margin-top:10px" onclick="authResetToken=\''+token+'\';authTab(\'reset\')">Đặt lại mật khẩu ngay ›</button>'+
      '</div>'
    :'<p style="font-size:12.5px;color:var(--text-soft);margin-top:10px">Nếu email tồn tại, bạn sẽ nhận được link trong vài phút.</p>';
  document.getElementById('authBody').innerHTML=
    '<a class="auth-back" onclick="authTab(\'forgot\')">← Thử lại</a>'+
    '<div class="auth-msg-success">'+
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="20 6 9 17 4 12"/></svg>'+
    '<div><b>Link đặt lại đã gửi!</b>'+
    '<p style="margin:4px 0 0;font-size:12.5px;color:var(--text-soft)">Kiểm tra hộp thư <b>'+email+'</b>. Link có hiệu lực trong 1 giờ.</p></div></div>'+
    tokenHtml;
}
function doResetPw(){
  const token=(val('rtToken')||authResetToken||'').trim();
  const pw=val('rtPw')||'',pw2=val('rtPw2')||'';
  if(!token){showAuthErr('rtErr','Vui lòng nhập token xác nhận');return;}
  if(!validPw(pw)){showAuthErr('rtErr','Mật khẩu phải từ 6 ký tự trở lên');return;}
  if(pw!==pw2){showAuthErr('rtErr','Mật khẩu xác nhận không khớp');return;}
  const td=resetTokens[token];
  if(!td){showAuthErr('rtErr','Token không hợp lệ. Vui lòng yêu cầu lại.');return;}
  if(td.expires<Date.now()){showAuthErr('rtErr','Token đã hết hạn. <a class="auth-link" onclick="authTab(\'forgot\')">Yêu cầu lại</a>');return;}
  const idx=authUsers.findIndex(u=>u.email===td.email);
  if(idx===-1){showAuthErr('rtErr','Không tìm thấy tài khoản');return;}
  authUsers[idx].pwHash=hashPw(pw);saveAuthUsers();
  const tk={...resetTokens};delete tk[token];resetTokens=tk;saveResetTokens();
  authResetToken=null;
  toast('Mật khẩu đã được cập nhật!');authTab('login');
}
function logout(){
  user=null;LS.set('user',null);
  if(!LS.get('rememberMe',false))LS.set('rememberMe',false);
  acctTab='dashboard';toast('Đã đăng xuất');go('home');
}
function goOrders(){acctTab='orders';go('account');}

function orderCard(o){
  return '<div class="order-card"><div class="oh"><span>Mã đơn <b>#'+o.id+'</b> · '+o.date+'</span><span class="ostatus">'+o.status+'</span></div>'+
    o.items.map(it=>{const p=P.find(x=>x.id==it.id);return '<div class="oi"><div class="cover-sm">'+cover(p)+'</div><div style="flex:1">'+p.name+' × '+it.qty+'</div><div style="font-weight:600">'+fmt(p.price*it.qty)+'</div></div>';}).join('')+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px"><button class="act-track" onclick="go(\'order\',\''+o.id+'\')">Theo dõi đơn ›</button><span style="font-weight:700;color:var(--coral)">Tổng: '+fmt(o.total)+'</span></div></div>';
}
function orderCardFull(o){
  const s=orderStage(o);
  return '<div class="order-card"><div class="oh">'+
    '<span>Mã đơn <b>#'+o.id+'</b> · '+o.date+'</span>'+
    '<span class="ostatus" style="'+(s===4?'background:#1a7a4a;color:#fff':s===3?'background:#d06000;color:#fff':'')+'">'+o.status+'</span>'+
    '</div>'+
    o.items.map(it=>{const p=P.find(x=>x.id==it.id);return '<div class="oi"><div class="cover-sm">'+cover(p)+'</div><div style="flex:1">'+p.name+' × '+it.qty+'</div><div style="font-weight:600">'+fmt(p.price*it.qty)+'</div></div>';}).join('')+
    '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:8px">'+
      '<div style="display:flex;gap:8px">'+
        '<button class="act-track" onclick="go(\'order\',\''+o.id+'\')">Theo dõi ›</button>'+
        '<button class="act-track" onclick="reorder(\''+o.id+'\')">Mua lại</button>'+
      '</div>'+
      '<span style="font-weight:700;color:var(--coral)">Tổng: '+fmt(o.total)+'</span>'+
    '</div></div>';
}
function acctContent(){
  if(user.role==='admin')return adminContent();
  if(user.role==='seller')return sellerContent();
  const PF_SUBTABS=[['info','Thông tin'],['security','Bảo mật'],['devices','Thiết bị & Lịch sử'],['privacy','Quyền riêng tư'],['danger','Xóa tài khoản']];
  const pfSubBar=acctTab==='profile'?'<div class="pf-subtab-bar">'+PF_SUBTABS.map(([k,l])=>'<button class="pf-stab'+(profileTab===k?' on':'')+(k==='danger'?' pf-stab-del':'')+'" onclick="profileTab=\''+k+'\';twoFAStep=null;pfEditMode=false;emailChangeStep=null;emailChangePending=\'\';renderAccount()">'+l+'</button>').join('')+'</div>':'';
  if(acctTab==='dashboard'){
    const isTeacher=user.teacherVerified==='verified';
    const tierPct=isTeacher?'15%':'5%';
    const stats=[['Đơn hàng',orders.length],['Điểm thưởng',user.points||0],['Yêu thích',wishlist.length],['Tủ sách',library.length]];
    let sc;
    if(user.role==='school')sc=[
      ['Yêu cầu báo giá (RFQ)',"go('rfq')"],
      ['Mua theo danh sách lớp',"go('classlist')"],
      ['Đơn báo giá của tôi',"acctTab='rfq';renderAccount()"],
      ['Thiết bị giáo dục',"go('equipment')"]
    ];
    else if(isTeacher)sc=[
      [user.teacherVerified==='pending'?'Đang xét duyệt GV ⏳':'Xác thực giáo viên',"acctTab='teacher';renderAccount()"],
      ['Sách & tài liệu giáo viên',"go('listing','giaovien')"],
      ['Ưu đãi giáo viên ('+tierPct+')',"go('promo')"]
    ];
    else if(user.role==='parent'){const firstChildAud=children.length?gradeAud(children[0].grade):null;sc=[['Theo dõi học tập của con',"acctTab='children';renderAccount()"],(firstChildAud?['Sách cho '+children[0].name+' ('+AUD[firstChildAud]+')',"go('listing','"+firstChildAud+"');"]:['Mua theo đối tượng',"go('listing','tieuhoc');"]),['Mua theo danh sách lớp',"go('classlist')"]];}
    else if(user.role==='hocsinh'){
      const g=parseInt((user.grade||'').replace(/\D/g,''))||0;
      const audKey=g<=5?'tieuhoc':g<=9?'thcs':'thpt';
      sc=[
        ['SGK & tài liệu '+(user.grade||'theo lớp'),"go('listing','"+audKey+"')"],
        ['Ebook & Sách nói',"go('listing','ebook')"],
        [g>=10?'Luyện thi THPTQG':'Văn phòng phẩm',"go('listing','"+(g>=10?'thpt':'vpp')+"')"]
      ];
      if(!user.grade)sc.unshift(['Chọn lớp học của bạn',"acctTab='study';renderAccount()"]);
    }
    else if(user.role==='sinhvien'){
      const majorShort=(user.major||'').split(' ').slice(0,2).join(' ');
      sc=[
        [user.major?'Giáo trình: '+majorShort:'Giáo trình đại học',"go('listing','sinhvien')"],
        ['Ebook & Thuê sách',"go('listing','ebook')"],
        [user.studentVerified?'Thẻ SV đã xác thực ✓':'Xác thực sinh viên',"acctTab='verify';renderAccount()"]
      ];
    }
    else sc=[['Ebook & Sách nói',"go('listing','ebook')"],['Mua theo đối tượng',"go('listing','thcs')"],['Trung tâm ưu đãi',"go('promo')"]];
    const roleLbl=user.role==='school'?'Trường học / Tổ chức':(ROLELBL[user.role]||'Người mua');
    return '<div class="panel"><h3>Xin chào, '+user.name+'!</h3>'+
      '<p style="color:var(--text-soft);margin:-6px 0 14px;font-size:13.5px">Bảng điều khiển — <b>'+roleLbl+'</b>'+(isTeacher?' · <span style="color:#7a4400;font-weight:600">Giáo viên xác thực ✓</span>':'')+'.</p>'+
      '<div class="stat-row">'+stats.map(s=>'<div class="stat-box"><div class="v">'+s[1]+'</div><div class="l">'+s[0]+'</div></div>').join('')+'</div>'+
      '<div style="font-weight:600;font-size:14px;margin:18px 0 10px">Lối tắt cho bạn</div>'+
      '<div class="dash-sc">'+sc.map(x=>'<button class="dash-card" onclick="'+x[1]+'">'+x[0]+' ›</button>').join('')+'</div>'+
    '</div>';
  }
  if(acctTab==='children'){
    const prog=readProgress(), apos=audioPos();
    const reading=library.map(id=>P.find(p=>p.id===id)).filter(p=>p&&(p.ebook||p.audio));
    const gradeOpts=Array.from({length:12},(_,i)=>'<option>Lớp '+(i+1)+'</option>').join('');
    const cards=children.length?children.map((c,i)=>'<div class="child-card"><div class="ch-head"><div class="ch-av">'+c.name.charAt(0).toUpperCase()+'</div><div><div class="ch-nm">'+c.name+'</div><div class="ch-gr">'+c.grade+'</div></div><button class="ci-remove" title="Xóa" onclick="removeChild('+i+')">✕</button></div><div class="ch-acts"><button class="btn-ghost" onclick="go(\'classlist\')">Đồ dùng theo lớp</button><button class="btn-ghost" onclick="go(\'listing\',\''+gradeAud(c.grade)+'\')">Sách gợi ý theo cấp</button></div></div>').join(''):'<p style="color:var(--text-soft)">Chưa có hồ sơ con nào. Thêm để theo dõi học tập &amp; mua sắm nhanh hơn.</p>';
    const readList=reading.length?reading.map(p=>'<div class="oi"><div class="cover-sm">'+cover(p)+'</div><div style="flex:1">'+p.name+'<div style="font-size:12px;color:var(--text-soft)">'+(p.audio?'Đã nghe '+fmtTime(apos[p.id]||0):'Chương '+((prog[p.id]||0)+1)+'/5')+'</div></div><button class="act-track" onclick="'+(p.audio?'openPlayer('+p.id+')':'openReader('+p.id+',true)')+'">'+(p.audio?'Nghe tiếp':'Đọc tiếp')+' ›</button></div>').join(''):'<p style="color:var(--text-soft);font-size:13.5px">Chưa có sách số trong tủ. <a style="color:var(--ink);font-weight:500" onclick="go(\'listing\',\'ebook\')">Khám phá ebook ›</a></p>';
    return '<div class="panel"><h3>Theo dõi học tập của con</h3>'+
      '<div class="child-add"><input id="chName" placeholder="Tên của con"><select id="chGrade">'+gradeOpts+'</select><button class="btn-primary" onclick="addChild()">Thêm con</button></div>'+
      '<div class="child-list">'+cards+'</div>'+
      '<div style="font-weight:600;font-size:14px;margin:18px 0 8px">Tiến độ đọc / nghe trong Tủ sách</div>'+readList+
    '</div>';
  }
  if(acctTab==='orders'){
    const oFilters=[['all','Tất cả'],['processing','Đang xử lý'],['shipping','Đang giao'],['done','Đã giao']];
    const oFMap={all:()=>true,processing:o=>orderStage(o)<3,shipping:o=>orderStage(o)===3,done:o=>orderStage(o)===4};
    const oList=orders.filter(oFMap[orderFilter]||oFMap.all);
    const chips=oFilters.map(f=>'<button class="fchip2'+(orderFilter===f[0]?' on':'')+'" onclick="orderFilter=\''+f[0]+'\';renderAccount()">'+f[1]+(f[0]==='all'?' ('+orders.length+')':'')+'</button>').join('');
    return '<div class="panel"><h3>Đơn hàng của tôi</h3>'+
      '<div class="chiprow" style="margin:0 0 16px">'+chips+'</div>'+
      (oList.length?oList.map(orderCardFull).join(''):'<p style="color:var(--text-soft)">'+(!orders.length?'Bạn chưa có đơn hàng nào. <a style="color:var(--ink);font-weight:500" onclick="go(\'home\')">Mua sắm ngay ›</a>':'Không có đơn nào trong danh mục này.')+'</p>')+
    '</div>';
  }
  if(acctTab==='returns'){
    return '<div class="panel"><h3>Yêu cầu đổi / trả</h3>'+
      (returns.length?returns.map(r=>'<div class="order-card"><div class="oh">'+
        '<span>Mã <b>#'+r.id+'</b> · Đơn #'+r.orderId+' · '+r.date+'</span>'+
        '<span class="ostatus">'+r.status+'</span>'+
        '</div>'+
        '<div style="font-size:13.5px;font-weight:500;margin-top:6px">'+r.reason+'</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:4px">'+r.detail+'</div></div>').join('')
      :'<p style="color:var(--text-soft)">Chưa có yêu cầu đổi/trả nào. Vào chi tiết đơn đã nhận để gửi yêu cầu.</p>')+
    '</div>';
  }
  if(acctTab==='study'){
    if(user.role==='hocsinh'){
      const g=parseInt((user.grade||'').replace(/\D/g,''))||0;
      const audKey=g<=5?'tieuhoc':g<=9?'thcs':'thpt';
      const suggestedProds=P.filter(p=>p.aud&&p.aud.includes(audKey)).slice(0,4);
      const prog=readProgress();
      const readingItems=library.map(id=>P.find(p=>p.id===id)).filter(p=>p&&p.ebook);
      const gradeBanner=!user.grade?
        '<div style="background:#fdf5e0;border:1.5px solid #e8d08a;border-radius:12px;padding:16px;margin-bottom:18px">'+
          '<div style="font-weight:600;color:#8a5a00;font-size:14.5px">⚡ Chọn lớp học để nhận gợi ý sách phù hợp hơn</div>'+
          '<p style="font-size:13px;color:var(--text-soft);margin:6px 0 12px">Mở khóa gợi ý sách giáo khoa, đề thi và đồ dùng theo đúng lớp của bạn.</p>'+
          '<select id="quickGrade" style="padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;margin-right:10px">'+
          Array.from({length:12},(_,i)=>'<option>Lớp '+(i+1)+'</option>').join('')+
          '</select>'+
          '<button class="btn-primary" onclick="user.grade=document.getElementById(\'quickGrade\').value;saveUser();renderAccount()">Lưu lớp học</button>'+
        '</div>':'';
      let examSection='';
      if(g>=10){
        const now=new Date();
        const examDate=new Date(now.getFullYear(),5,1);
        if(examDate<now)examDate.setFullYear(now.getFullYear()+1);
        const daysLeft=Math.ceil((examDate-now)/(1000*60*60*24));
        examSection='<div class="exam-countdown">'+
          '<div class="ec-label">Kỳ thi THPTQG</div>'+
          '<div class="ec-days">'+daysLeft+'</div>'+
          '<div class="ec-sub">ngày nữa</div>'+
          '<button class="btn-ghost" style="margin-top:12px;width:100%" onclick="go(\'listing\',\'thpt\')">Xem sách luyện thi ›</button>'+
        '</div>';
      }
      const prodGrid=suggestedProds.length?
        '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:12px;margin-top:10px">'+
        suggestedProds.map(pcard).join('')+'</div>':
        '<p style="color:var(--text-soft)">Chưa có sản phẩm. <a style="color:var(--ink)" onclick="go(\'listing\',\''+audKey+'\')">Xem tất cả ›</a></p>';
      const readList=readingItems.length?
        readingItems.map(p=>'<div class="oi"><div class="cover-sm">'+cover(p)+'</div>'+
          '<div style="flex:1">'+p.name+'<div style="font-size:12px;color:var(--text-soft)">Chương '+((prog[p.id]||0)+1)+'/5</div></div>'+
          '<button class="act-track" onclick="openReader('+p.id+',true)">Đọc tiếp ›</button></div>').join(''):
        '<p style="color:var(--text-soft);font-size:13.5px">Tủ sách trống. <a style="color:var(--ink);font-weight:500" onclick="go(\'listing\',\'ebook\')">Khám phá ebook ›</a></p>';
      return '<div class="panel">'+gradeBanner+
        (examSection?'<div class="panel-exam">'+examSection+'</div>':'')+
        '<h3>Gợi ý sách cho '+(user.grade||(audKey==='tieuhoc'?'Tiểu học':audKey==='thcs'?'THCS':'THPT'))+'</h3>'+prodGrid+
        '<h3 style="margin-top:22px">Đang đọc</h3>'+readList+'</div>';
    }
    if(user.role==='sinhvien'){
      const svProds=P.filter(p=>p.aud&&p.aud.includes('sinhvien')).slice(0,4);
      const prog=readProgress();
      const readingItems=library.map(id=>P.find(p=>p.id===id)).filter(p=>p&&p.ebook);
      const profilePrompt=(!user.major||!user.university)?
        '<div style="background:#eef2ff;border:1.5px solid #b3c2f7;border-radius:12px;padding:16px;margin-bottom:18px">'+
          '<div style="font-weight:600;color:#1a3a8a;font-size:14.5px">📚 Cập nhật chuyên ngành để nhận gợi ý giáo trình phù hợp</div>'+
          '<p style="font-size:13px;color:var(--text-soft);margin:6px 0 12px">Nhập chuyên ngành và trường để EduMart gợi ý giáo trình đúng học phần.</p>'+
          '<div class="form-row"><div class="form-field"><input id="qMajor" value="'+(user.major||'')+'" placeholder="VD: Công nghệ thông tin"></div>'+
          '<div class="form-field"><input id="qUni" value="'+(user.university||'')+'" placeholder="VD: ĐH Bách Khoa HN"></div></div>'+
          '<button class="btn-primary" onclick="const m=document.getElementById(\'qMajor\').value,u=document.getElementById(\'qUni\').value;if(m)user.major=m;if(u)user.university=u;saveUser();renderAccount()">Lưu thông tin</button>'+
        '</div>':'';
      const infoLine=(user.major||user.university)?
        '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px">'+
          (user.major?'<span style="font-size:13px;background:var(--sand);padding:4px 12px;border-radius:20px">📖 '+user.major+'</span>':'')+
          (user.university?'<span style="font-size:13px;background:var(--sand);padding:4px 12px;border-radius:20px">🏫 '+user.university+'</span>':'')+
          (user.studentVerified===true?'<span style="font-size:13px;background:#f0faf4;border:1px solid #b3e0c5;padding:4px 12px;border-radius:20px;color:#1a7a4a;font-weight:600">✔ Sinh viên xác thực</span>':'')+
        '</div>':'';
      const prodGrid=svProds.length?
        '<div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:12px;margin-top:10px">'+
        svProds.map(pcard).join('')+'</div>':
        '<p style="color:var(--text-soft)">Chưa có giáo trình. <a style="color:var(--ink)" onclick="go(\'listing\',\'sinhvien\')">Xem tất cả ›</a></p>';
      const readList=readingItems.length?
        readingItems.map(p=>'<div class="oi"><div class="cover-sm">'+cover(p)+'</div>'+
          '<div style="flex:1">'+p.name+'<div style="font-size:12px;color:var(--text-soft)">Chương '+((prog[p.id]||0)+1)+'/5</div></div>'+
          '<button class="act-track" onclick="openReader('+p.id+',true)">Đọc tiếp ›</button></div>').join(''):
        '<p style="color:var(--text-soft);font-size:13.5px">Tủ sách trống. <a style="color:var(--ink);font-weight:500" onclick="go(\'listing\',\'ebook\')">Khám phá ebook / thuê sách ›</a></p>';
      return '<div class="panel">'+profilePrompt+infoLine+
        '<h3>Giáo trình & tài liệu sinh viên</h3>'+prodGrid+
        '<h3 style="margin-top:22px">Đang đọc</h3>'+readList+'</div>';
    }
    return '';
  }
  if(acctTab==='verify'&&user.role==='sinhvien'){
    const vs=user.studentVerified;
    if(vs===true)return '<div class="panel"><h3>Xác thực sinh viên</h3>'+
      '<div style="background:#f0faf4;border:1.5px solid #b3e0c5;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px;margin-bottom:16px">'+
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a7a4a" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg>'+
        '<div><div style="font-weight:700;color:#1a7a4a;font-size:15px">Tài khoản sinh viên đã được xác thực</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:3px">Bạn đang được hưởng <b>ưu đãi sinh viên độc quyền</b> và giá thuê ebook ưu tiên.</div></div></div>'+
      '<div class="form-field"><label>Mã số sinh viên</label><input value="'+(user.studentId||'')+'" readonly></div>'+
      '<div class="form-field"><label>Trường / Khoa</label><input value="'+(user.svUni||'')+'" readonly></div>'+
      '<p style="font-size:12px;color:var(--text-soft)">Cập nhật thông tin: liên hệ hotline <b>1900 6868</b>.</p></div>';
    if(vs==='pending')return '<div class="panel"><h3>Xác thực sinh viên</h3>'+
      '<div style="background:#fdf5e0;border:1.5px solid #e8d08a;border-radius:12px;padding:16px;margin-bottom:16px">'+
        '<div style="font-weight:600;color:#8a5a00;font-size:14px">⏳ Đang chờ EduMart xem xét</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:6px">Hồ sơ gửi ngày <b>'+(user.svVfyDate||todayStr())+'</b>. Thường xét duyệt trong 1–2 ngày làm việc.</div>'+
      '</div>'+
      '<div class="form-field"><label>Mã số sinh viên đã gửi</label><input value="'+(user.studentId||'')+'" readonly></div>'+
      '<div class="form-field"><label>Trường đã gửi</label><input value="'+(user.svUni||'')+'" readonly></div>'+
      '<button class="btn-ghost" onclick="user.studentVerified=null;saveUser();renderAccount()">Hủy và gửi lại</button></div>';
    return '<div class="panel"><h3>Xác thực sinh viên</h3>'+
      '<p style="color:var(--text-soft);font-size:14px;margin:0 0 18px">Xác thực thẻ sinh viên để nhận <b>ưu đãi độc quyền</b>, giá thuê ebook ưu đãi và combo giáo trình theo học kỳ.</p>'+
      '<div class="sv-benefits">'+
        '<div class="sv-bft"><span>🎁</span><span>Combo giáo trình theo học kỳ</span></div>'+
        '<div class="sv-bft"><span>📖</span><span>Thuê ebook giá sinh viên</span></div>'+
        '<div class="sv-bft"><span>🏷️</span><span>Voucher chào học kỳ mới</span></div>'+
      '</div>'+
      '<div class="form-field" style="margin-top:18px"><label>Mã số sinh viên</label><input id="svCode" placeholder="VD: B21DCCN001"></div>'+
      '<div class="form-field"><label>Trường / Khoa công tác</label><input id="svUni" placeholder="VD: Khoa CNTT — ĐH Bách Khoa HN"></div>'+
      '<div class="form-field"><label>Ảnh thẻ sinh viên (không bắt buộc)</label><input type="text" id="svImg" placeholder="Link ảnh hoặc mô tả thẻ SV"></div>'+
      '<button class="btn-primary" onclick="submitStudentVerify()">Gửi yêu cầu xác thực</button>'+
      '<p style="font-size:12px;color:var(--text-soft);margin-top:10px">Thông tin chỉ dùng để xác thực và không chia sẻ bên ngoài EduMart.</p></div>';
  }
  if(acctTab==='profile'&&profileTab==='info'){
    const isSocial=user.pwHash&&user.pwHash.startsWith('__social__');
    function dobDisplay(d){if(!d)return '—';const p=d.split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:'—';}
    const genderLabel=user.gender&&user.gender!==''?user.gender:'—';
    const roleSpecificView=user.role==='hocsinh'?'<div class="pf-info-item"><div class="pf-info-label">Lớp</div><div class="pf-info-value">'+(user.grade||'—')+'</div></div>':
      user.role==='sinhvien'?'<div class="pf-info-item"><div class="pf-info-label">Chuyên ngành</div><div class="pf-info-value">'+(user.major||'—')+'</div></div>'+
        '<div class="pf-info-item"><div class="pf-info-label">Trường</div><div class="pf-info-value">'+(user.university||'—')+'</div></div>':
      user.role==='school'?'<div class="pf-info-item"><div class="pf-info-label">Tên tổ chức</div><div class="pf-info-value">'+(user.orgName||'—')+'</div></div>'+
        '<div class="pf-info-item"><div class="pf-info-label">Mã số thuế</div><div class="pf-info-value">'+(user.taxCode||'—')+'</div></div>':'';
    if(!pfEditMode){
      return pfSubBar+'<div class="panel">'+
        '<div class="prof-hdr">'+
          '<div class="prof-av-lg">'+user.name.charAt(0).toUpperCase()+'</div>'+
          '<div class="prof-hdr-info">'+
            '<div class="prof-nm-lg">'+user.name+'</div>'+
            '<div class="prof-role-lbl">'+ROLELBL[user.role]+'<span class="prof-ref-tag">Mã: '+(user.ref||'N/A')+'</span></div>'+
            (isSocial?'<div class="pf-social-tag">Đăng nhập qua '+(user.provider||'mạng xã hội')+'</div>':'')+
          '</div>'+
          '<button class="btn-ghost pf-edit-toggle" onclick="pfEditMode=true;renderAccount()">'+
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'+
            ' Chỉnh sửa'+
          '</button>'+
        '</div>'+
        '<div class="sec-divider"></div>'+
        '<div class="pf-section-title">Thông tin cá nhân</div>'+
        '<div class="pf-info-grid">'+
          '<div class="pf-info-item"><div class="pf-info-label">Họ và tên</div><div class="pf-info-value">'+user.name+'</div></div>'+
          '<div class="pf-info-item"><div class="pf-info-label">Giới tính</div><div class="pf-info-value">'+genderLabel+'</div></div>'+
          '<div class="pf-info-item"><div class="pf-info-label">Số điện thoại</div><div class="pf-info-value">'+(user.phone||'—')+
            (user.phone?'<span class="pf-badge unverified">Chưa xác minh</span>':'')+'</div></div>'+
          '<div class="pf-info-item"><div class="pf-info-label">Ngày sinh</div><div class="pf-info-value">'+dobDisplay(user.dob)+'</div></div>'+
          roleSpecificView+
        '</div>'+
        '<div class="sec-divider"></div>'+
        '<div class="pf-section-title">Liên hệ</div>'+
        (emailChangeStep===null?
          '<div class="pf-info-grid">'+
            '<div class="pf-info-item pf-info-full">'+
              '<div class="pf-info-label">Email</div>'+
              '<div class="pf-info-value" style="justify-content:space-between;flex-wrap:wrap;gap:8px">'+
                '<span>'+(user.email||'—')+'</span>'+
                '<button class="pf-email-change-btn" onclick="emailChangeStep=\'input\';renderAccount()">'+
                  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'+
                  ' Đổi email'+
                '</button>'+
              '</div>'+
            '</div>'+
          '</div>':
        emailChangeStep==='input'?
          '<div class="pf-email-change-box">'+
            '<div class="pf-ecb-title">Đổi địa chỉ email</div>'+
            '<div class="pf-ecb-cur">Email hiện tại: <b>'+(user.email||'—')+'</b></div>'+
            '<div class="form-field" style="margin-bottom:10px"><label>Email mới</label>'+
              '<input id="emNewEmail" type="email" placeholder="email-moi@example.com" value="'+emailChangePending.replace(/"/g,'&quot;')+'">'+
            '</div>'+
            '<div id="emErr" class="field-error"></div>'+
            '<div style="display:flex;gap:8px">'+
              '<button class="btn-primary" onclick="startEmailChange()">Gửi mã xác nhận →</button>'+
              '<button class="btn-ghost" onclick="emailChangeStep=null;emailChangePending=\'\';renderAccount()">Hủy</button>'+
            '</div>'+
          '</div>':
          /* step otp */
          '<div class="pf-email-change-box pf-ecb-otp">'+
            '<div class="pf-ecb-title">Xác nhận email mới</div>'+
            '<div class="pf-ecb-cur">Nhập mã 6 số đã gửi đến <b>'+emailChangePending+'</b> <span class="demo-hint">Demo: <b>123456</b></span></div>'+
            '<div class="otp-row" style="margin:14px 0">'+
              Array.from({length:6},(_,i)=>'<input class="otp-box" id="emob'+i+'" type="text" maxlength="1" inputmode="numeric" onkeyup="emOtpNav('+i+',event)" oninput="if(this.value&&'+i+'<5)document.getElementById(\'emob\'+('+i+'+1)).focus()">').join('')+
            '</div>'+
            '<div id="emOtpErr" class="field-error"></div>'+
            '<div style="display:flex;gap:8px">'+
              '<button class="btn-primary" onclick="confirmEmailChange()">Xác nhận đổi email</button>'+
              '<button class="btn-ghost" onclick="emailChangeStep=\'input\';renderAccount()">← Nhập lại</button>'+
            '</div>'+
          '</div>'
        )+
      '</div>';
    }
    const genderOpts=['','Nam','Nữ','Khác'].map(g=>'<option value="'+g+'"'+((user.gender||'')===g?' selected':'')+'>'+( g||'— Chưa chọn —')+'</option>').join('');
    return pfSubBar+'<div class="panel">'+
      '<div class="prof-hdr">'+
        '<div class="prof-av-lg">'+user.name.charAt(0).toUpperCase()+'</div>'+
        '<div class="prof-hdr-info">'+
          '<div class="prof-nm-lg">'+user.name+'</div>'+
          '<div class="prof-role-lbl">'+ROLELBL[user.role]+'<span class="prof-ref-tag">Mã: '+(user.ref||'N/A')+'</span></div>'+
        '</div>'+
        '<div style="display:flex;gap:8px;align-items:center">'+
          '<button class="btn-primary pf-save-hdr" onclick="saveProfile()">Lưu thay đổi</button>'+
          '<button class="btn-ghost" onclick="pfEditMode=false;renderAccount()">Hủy</button>'+
        '</div>'+
      '</div>'+
      '<div class="sec-divider"></div>'+
      '<div class="pf-section-title">Thông tin cá nhân</div>'+
      '<div class="form-row">'+
        '<div class="form-field"><label>Họ và tên <span style="color:#c8362a">*</span></label><input id="pfName" value="'+user.name.replace(/"/g,'&quot;')+'"></div>'+
        '<div class="form-field"><label>Giới tính</label><select id="pfGender">'+genderOpts+'</select></div>'+
      '</div>'+
      '<div class="form-row">'+
        '<div class="form-field"><label>Số điện thoại</label><input id="pfPhone" value="'+(user.phone||'')+'" placeholder="09xx xxx xxx" inputmode="numeric"></div>'+
        '<div class="form-field"><label>Ngày sinh</label><input id="pfDob" type="date" value="'+(user.dob||'')+'"></div>'+
      '</div>'+
      (user.role==='hocsinh'?'<div class="form-field"><label>Lớp học hiện tại</label><select id="pfGrade">'+Array.from({length:12},(_,i)=>'<option'+(user.grade==='Lớp '+(i+1)?' selected':'')+'>Lớp '+(i+1)+'</option>').join('')+'</select></div>':'')+
      (user.role==='sinhvien'?'<div class="form-row"><div class="form-field"><label>Chuyên ngành</label><input id="pfMajor" value="'+(user.major||'').replace(/"/g,'&quot;')+'" placeholder="VD: Công nghệ thông tin..."></div><div class="form-field"><label>Trường đại học / Cao đẳng</label><input id="pfUni" value="'+(user.university||'').replace(/"/g,'&quot;')+'" placeholder="VD: ĐH Bách Khoa Hà Nội"></div></div>':'')+
      (user.role==='school'?'<div class="form-row"><div class="form-field"><label>Tên tổ chức / Trường</label><input id="pfOrg" value="'+(user.orgName||'').replace(/"/g,'&quot;')+'" placeholder="VD: Trường THPT Nguyễn Huệ"></div><div class="form-field"><label>Mã số thuế (nếu có)</label><input id="pfTax" value="'+(user.taxCode||'')+'" placeholder="0100100000"></div></div>':'')+
      '<div class="sec-divider"></div>'+
      '<div class="pf-section-title">Liên hệ</div>'+
      '<div class="form-field"><label>Email</label>'+
        '<div class="pf-email-locked">'+
          '<input value="'+(user.email||'')+'" disabled style="flex:1;opacity:.7;cursor:not-allowed">'+
          '<button class="pf-email-change-btn" onclick="pfEditMode=false;emailChangeStep=\'input\';renderAccount()">'+
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'+
            ' Đổi email'+
          '</button>'+
        '</div>'+
      '</div>'+
    '</div>';
  }
  if(acctTab==='address'){
    const ADDR_ICONS={Nhà:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>','Văn phòng':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',Khác:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'};
    const addrCards=addresses.map(a=>{
      if(editingAddressId===a.id){
        return '<div class="addr-card addr-edit-card">'+
          '<div class="addr-edit-header"><span class="addr-badge '+(a.def?'def':'')+'">Đang chỉnh sửa</span></div>'+
          _addrForm('ea',a)+
          '<div style="display:flex;gap:8px;margin-top:14px">'+
          '<button class="btn-primary" style="flex:1" onclick="updateAddress('+a.id+')">Lưu thay đổi</button>'+
          '<button class="btn-ghost" onclick="cancelEditAddress()">Hủy</button>'+
          '</div></div>';
      }
      const lbl=a.label||'Nhà';
      return '<div class="addr-card'+(a.def?' addr-default':'')+'">'+
        '<div class="addr-card-top">'+
          '<span class="addr-type-tag"><span class="addr-type-icon">'+ADDR_ICONS[lbl]+'</span>'+lbl+'</span>'+
          (a.def?'<span class="addr-badge def">Mặc định</span>':'')+
          '<div class="addr-actions">'+
          (!a.def?'<button class="act-track" onclick="setDefaultAddress('+a.id+')">Đặt mặc định</button>':'')+
          '<button class="act-track" onclick="editAddress('+a.id+')">Sửa</button>'+
          '<button class="act-track" style="color:var(--coral)" onclick="removeAddress('+a.id+')">Xóa</button>'+
          '</div>'+
        '</div>'+
        '<div class="addr-name">'+a.name+' · <span class="addr-phone">'+a.phone+'</span></div>'+
        '<div class="addr-detail">'+a.addr+'</div>'+
      '</div>';
    }).join('');
    const showAddForm=editingAddressId===null&&editingAddressId!=='hide';
    return '<div class="panel">'+
      '<div class="addr-header"><h3 style="margin:0">Sổ địa chỉ</h3>'+
        '<span style="font-size:13px;color:var(--text-soft)">'+addresses.length+' địa chỉ đã lưu</span></div>'+
      (addresses.length?'<div class="addr-list">'+addrCards+'</div>':'<div class="addr-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--line)" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><p>Chưa có địa chỉ nào được lưu.<br>Thêm địa chỉ để thanh toán nhanh hơn!</p></div>')+
      (showAddForm&&editingAddressId===null?'<div class="addr-add-section">'+
        '<div class="addr-add-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Thêm địa chỉ mới</div>'+
        _addrForm('ad')+
        '<button class="btn-primary" style="margin-top:14px" onclick="addAddress()">Lưu địa chỉ</button>'+
      '</div>':'')+
    '</div>';
  }
  if(acctTab==='points'){
    const logRows=pointsLog.length?pointsLog.map(l=>'<div class="oi" style="font-size:13.5px"><div style="flex:1"><b>'+l.desc+'</b><div style="font-size:12px;color:var(--text-soft)">'+l.date+'</div></div><div style="color:#1a7a4a;font-weight:700">+'+l.pts+' điểm</div></div>').join(''):'<p style="color:var(--text-soft);font-size:13.5px">Chưa có giao dịch điểm nào. Mua hàng để tích điểm!</p>';
    return '<div class="panel"><h3>Điểm thưởng</h3>'+
      '<div class="stat-row"><div class="stat-box"><div class="v">'+user.points+'</div><div class="l">Điểm tích lũy</div></div><div class="stat-box"><div class="v">Vàng</div><div class="l">Hạng thành viên</div></div><div class="stat-box"><div class="v">'+(user.teacherVerified==='verified'?'15%':user.role==='school'?'10%':'5%')+'</div><div class="l">Ưu đãi của bạn</div></div></div>'+
      '<p style="font-size:13px;color:var(--text-soft);margin-top:14px">Mỗi 1.000đ chi tiêu tích 1 điểm. Đổi điểm lấy voucher giảm giá ở mục khuyến mãi.</p>'+
      '<div class="acct-promo"><button class="btn-ghost" onclick="go(\'missions\')">Điểm danh</button><button class="btn-ghost" onclick="go(\'wheel\')">Vòng quay</button><button class="btn-ghost" onclick="go(\'referral\')">Giới thiệu bạn</button></div>'+
      '<div style="font-weight:600;font-size:14px;margin:20px 0 10px">Lịch sử tích điểm</div>'+
      logRows+'</div>';
  }
  if(acctTab==='rfq'){
    return '<div class="panel"><h3>Yêu cầu báo giá của tôi</h3>'+(rfqs.length?rfqs.map(r=>'<div class="order-card"><div class="oh"><span>Mã <b>#'+r.id+'</b> · '+r.date+'</span><span class="ostatus">'+r.status+'</span></div><div style="font-size:13.5px;font-weight:500">'+r.org+' · '+r.phone+'</div><div style="font-size:13px;color:var(--text-soft);white-space:pre-line;margin-top:6px">'+r.items+'</div></div>').join(''):'<p style="color:var(--text-soft)">Chưa có yêu cầu nào. <a style="color:var(--ink);font-weight:500" onclick="go(\'rfq\')">Gửi yêu cầu báo giá ›</a></p>')+'</div>';
  }
  if(acctTab==='teacher'){
    const vs=user.teacherVerified;
    if(vs===true)return '<div class="panel"><h3>Xác thực giáo viên</h3>'+
      '<div style="background:#f0faf4;border:1.5px solid #b3e0c5;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px;margin-bottom:16px">'+
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a7a4a" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg>'+
        '<div><div style="font-weight:700;color:#1a7a4a;font-size:15px">Tài khoản đã xác thực giáo viên</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:3px">Bạn đang hưởng ưu đãi đến <b>15%</b> và quyền mua sỉ cho lớp học.</div></div></div>'+
      '<div class="form-field"><label>Trường công tác</label><input value="'+(user.teacherSchool||'')+'"></div>'+
      '<p style="font-size:12px;color:var(--text-soft)">Cập nhật thông tin công tác: liên hệ <b>hotline 1900 6868</b> hoặc email support@edumart.vn.</p></div>';
    if(vs==='pending')return '<div class="panel"><h3>Xác thực giáo viên</h3>'+
      '<div style="background:#fdf5e0;border:1.5px solid #e8d08a;border-radius:12px;padding:16px;margin-bottom:16px">'+
        '<div style="font-weight:600;color:#8a5a00;font-size:14px">⏳ Đang chờ EduMart xem xét</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:6px">Hồ sơ gửi ngày <b>'+(user.teacherVfyDate||todayStr())+'</b> đang được xem xét. Thường trong 1–2 ngày làm việc.</div>'+
      '</div>'+
      '<div class="form-field"><label>Mã giáo viên đã gửi</label><input value="'+(user.teacherCode||'')+'"></div>'+
      '<div class="form-field"><label>Trường công tác đã gửi</label><input value="'+(user.teacherSchool||'')+'"></div>'+
      '<button class="btn-ghost" onclick="user.teacherVerified=null;saveUser();renderAccount()">Hủy và gửi lại</button></div>';
    return '<div class="panel"><h3>Xác thực giáo viên</h3>'+
      '<p style="color:var(--text-soft);font-size:14px;margin:0 0 18px">Xác thực để nhận ưu đãi riêng đến <b>15%</b> và quyền mua sỉ cho lớp học.</p>'+
      '<div class="form-field"><label>Mã giáo viên / Mã biên chế</label><input id="tvcCode" placeholder="VD: GV-0123456789"></div>'+
      '<div class="form-field"><label>Trường công tác</label><input id="tvcSchool" placeholder="VD: THPT Chu Văn An, Hà Nội"></div>'+
      '<div class="form-field"><label>Số điện thoại cơ quan (không bắt buộc)</label><input id="tvcPhone" placeholder="024 xxxx xxxx"></div>'+
      '<button class="btn-primary" onclick="submitTeacherVerify()">Gửi yêu cầu xác thực</button>'+
      '<p style="font-size:12px;color:var(--text-soft);margin-top:10px">Thông tin chỉ dùng để xác thực và không chia sẻ bên ngoài EduMart.</p></div>';
  }
  /* ── Bảo mật ── */
  if(acctTab==='profile'&&profileTab==='security'){
    const isSocial=user.pwHash&&user.pwHash.startsWith('__social__');
    const has2FA=user.twoFA===true;
    const methodIcons={'sms':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>','totp':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>','email':'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'};
    const methodLabel={'sms':'SMS về SĐT','totp':'Ứng dụng TOTP','email':'Email'}[user.twoFAMethod||'sms']||'SMS';
    const TFA_STEPS=['method','otp','backup'];
    const stepIdx=TFA_STEPS.indexOf(twoFAStep);
    const stepBar=(twoFAStep&&twoFAStep!=='disable')?'<div class="tfa-steps">'+
      [['1','Phương thức'],['2','Xác nhận OTP'],['3','Mã dự phòng']].map(([n,l],i)=>
        '<div class="tfa-step'+(i<stepIdx+1?' done':i===stepIdx+1?' active':'')+'">'+
          '<span class="tfa-step-n">'+n+'</span><span class="tfa-step-l">'+l+'</span>'+
          (i<2?'<span class="tfa-step-line"></span>':'')+
        '</div>'
      ).join('')+
    '</div>':'';
    let tfaHtml='';
    if(twoFAStep==='method'){
      tfaHtml=stepBar+'<div class="tfa-setup">'+
        '<div class="tfa-setup-title">Chọn cách nhận mã xác thực:</div>'+
        [['sms','SMS về số điện thoại','Nhận OTP qua tin nhắn đến '+(user.phone?user.phone.replace(/(\d{4})\d{3}(\d{3})/,'$1 xxx $2'):'SĐT đã đăng ký')],
         ['totp','Ứng dụng Authenticator','Google / Microsoft / Authy Authenticator'],
         ['email','Email','Nhận OTP qua '+(user.email?user.email.replace(/(.{2})(.*)(@.*)/,(a,b,c,d)=>b+'***'+d):'email đăng ký')]
        ].map(([k,t,d])=>
          '<label class="tfa-opt'+(twoFAMethod===k?' on':'')+'"><div class="tfa-opt-ic">'+methodIcons[k]+'</div>'+
          '<input type="radio" name="tfaM" value="'+k+'"'+(twoFAMethod===k?' checked':'')+' style="display:none" onchange="twoFAMethod=\''+k+'\';document.querySelectorAll(\'.tfa-opt\').forEach(x=>x.classList.toggle(\'on\',x.querySelector(\'input\').value===\''+k+'\'))">'+
          '<div class="tfa-opt-body"><div class="tfa-opt-title">'+t+'</div><div class="tfa-opt-desc">'+d+'</div></div>'+
          '<div class="tfa-opt-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div></label>'
        ).join('')+
        '<div class="tfa-actions"><button class="btn-primary" onclick="startOtpTimer();twoFAStep=\'otp\';renderAccount()">Gửi mã xác nhận →</button><button class="btn-ghost" onclick="twoFAStep=null;renderAccount()">Huỷ</button></div>'+
      '</div>';
    } else if(twoFAStep==='otp'){
      const dest={'sms':'SĐT '+(user.phone?user.phone.replace(/(\d{4})\d{3}(\d{3})/,'$1 xxx $2'):'của bạn'),'totp':'ứng dụng xác thực của bạn','email':'email '+(user.email?user.email.replace(/(.{2})(.*)(@.*)/,(a,b,c,d)=>b+'***'+d):'của bạn')}[twoFAMethod]||'';
      tfaHtml=stepBar+'<div class="tfa-setup">'+
        '<div class="tfa-setup-title">Nhập mã 6 chữ số</div>'+
        '<div class="tfa-otp-dest">Đã gửi đến <b>'+dest+'</b> <span class="demo-hint">(Demo: <b>123456</b>)</span></div>'+
        '<div class="otp-row">'+Array.from({length:6},(_,i)=>'<input class="otp-box" id="ob'+i+'" type="text" maxlength="1" inputmode="numeric" onkeyup="otpNav('+i+',event)" oninput="if(this.value&&'+i+'<5)document.getElementById(\'ob\'+('+i+'+1)).focus()">').join('')+'</div>'+
        '<div id="otpCountdown" class="otp-countdown"></div>'+
        '<div class="tfa-actions"><button class="btn-primary" onclick="confirm2FA()">Xác nhận →</button><button class="btn-ghost" onclick="twoFAStep=\'method\';renderAccount()">← Quay lại</button></div>'+
      '</div>';
    } else if(twoFAStep==='backup'){
      const codes=twoFABackupCodes||[];
      tfaHtml=stepBar+'<div class="tfa-setup tfa-backup">'+
        '<div class="tfa-backup-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a7a4a" stroke-width="2"><path d="m5 13 4 4L19 7"/></svg></div>'+
        '<div class="tfa-backup-title">Xác thực 2 yếu tố đã được bật!</div>'+
        '<div class="tfa-backup-note">Lưu các mã dự phòng bên dưới. Mỗi mã chỉ dùng được <b>1 lần</b> khi không truy cập được phương thức chính.</div>'+
        '<div class="tfa-backup-grid">'+codes.map(c=>'<code class="backup-code">'+c+'</code>').join('')+'</div>'+
        '<div class="tfa-actions">'+
          '<button class="btn-ghost" onclick="copyBackupCodes()">📋 Sao chép tất cả</button>'+
          '<button class="btn-primary" onclick="twoFAStep=null;twoFABackupCodes=null;renderAccount()">Hoàn tất ✓</button>'+
        '</div>'+
      '</div>';
    } else if(twoFAStep==='disable'){
      tfaHtml='<div class="tfa-setup tfa-disable-box">'+
        '<div class="tfa-setup-title" style="color:#c0392b">Tắt xác thực 2 yếu tố</div>'+
        '<div class="tfa-otp-dest" style="margin-bottom:14px">Nhập mật khẩu tài khoản để xác nhận:</div>'+
        '<div class="pw-wrap" style="max-width:320px"><input id="tfaDPw" type="password" placeholder="Mật khẩu tài khoản" onkeydown="if(event.key===\'Enter\')disable2FA()">'+
        '<button type="button" class="pw-toggle" onclick="togglePw(\'tfaDPw\',this)" tabindex="-1">'+EYE_SVG+'</button></div>'+
        '<div id="tfaDErr" class="field-error"></div>'+
        '<div class="tfa-actions"><button class="btn-primary" style="background:#c0392b" onclick="disable2FA()">Tắt 2FA</button><button class="btn-ghost" onclick="twoFAStep=null;renderAccount()">Huỷ</button></div>'+
      '</div>';
    } else {
      tfaHtml='<div class="two-fa-row">'+
        '<div>'+
          '<div class="tfa-status-badge'+(has2FA?' on':'')+'">'+
            (has2FA?'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Đang bật':'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Chưa bật')+
          '</div>'+
          '<div style="font-size:13px;color:var(--text-soft);margin-top:6px">'+
            (has2FA?'Phương thức: <b>'+methodLabel+'</b> · Bật từ: '+(user.twoFADate||todayStr()):
             'Thêm lớp bảo mật bằng mã OTP mỗi lần đăng nhập. Hỗ trợ SMS · TOTP · Email.')+
          '</div>'+
        '</div>'+
        '<button class="btn-ghost '+(has2FA?'btn-danger-outline':'')+'" style="white-space:nowrap" onclick="twoFAStep=\''+(has2FA?'disable':'method')+'\';renderAccount()">'+(has2FA?'Tắt 2FA':'Bật 2FA')+'</button>'+
      '</div>';
    }
    return pfSubBar+'<div class="panel">'+
      '<div class="sec-block-header"><h3>Đổi mật khẩu</h3></div>'+
      (isSocial?
        '<div class="info-note">Tài khoản đăng nhập qua <b>'+(user.provider||'mạng xã hội')+'</b> không dùng mật khẩu.</div>':
        '<div class="form-field"><label>Mật khẩu hiện tại</label>'+
          '<div class="pw-wrap"><input id="cpOld" type="password" placeholder="Mật khẩu đang dùng">'+
          '<button type="button" class="pw-toggle" onclick="togglePw(\'cpOld\',this)" tabindex="-1">'+EYE_SVG+'</button></div></div>'+
        '<div class="form-row">'+
          '<div class="form-field"><label>Mật khẩu mới</label>'+
            '<div class="pw-wrap"><input id="cpNew" type="password" placeholder="Tối thiểu 6 ký tự" oninput="updateCpStrength()">'+
            '<button type="button" class="pw-toggle" onclick="togglePw(\'cpNew\',this)" tabindex="-1">'+EYE_SVG+'</button></div>'+
            '<div id="cpStr"></div></div>'+
          '<div class="form-field"><label>Xác nhận mật khẩu mới</label>'+
            '<div class="pw-wrap"><input id="cpNew2" type="password" placeholder="Nhập lại" onkeydown="if(event.key===\'Enter\')doChangePw()">'+
            '<button type="button" class="pw-toggle" onclick="togglePw(\'cpNew2\',this)" tabindex="-1">'+EYE_SVG+'</button></div></div>'+
        '</div>'+
        '<div id="cpErr" class="field-error"></div>'+
        '<button class="btn-primary" onclick="doChangePw()">Cập nhật mật khẩu</button>'
      )+
      '<div class="sec-divider"></div>'+
      '<div class="sec-block-header"><h3>Xác thực 2 yếu tố (2FA)</h3></div>'+
      tfaHtml+
    '</div>';
  }
  /* ── Thiết bị & Lịch sử ── */
  if(acctTab==='profile'&&profileTab==='devices'){
    const sessions=getActiveSessions();
    const log=getLoginLog();
    const hasOthers=sessions.some(s=>!s.current);
    const DEV_IC={
      desktop:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      mobile:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      tablet:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
    };
    const sessHtml=sessions.map(s=>'<div class="device-card'+(s.current?' device-current':'')+'">'+
      '<div class="dev-icon-wrap'+(s.current?' cur':'')+'">'+( DEV_IC[s.icon]||DEV_IC.desktop)+'</div>'+
      '<div class="dev-info">'+
        '<div class="dev-name">'+s.device+(s.current?' <span class="badge-cur">Thiết bị này</span>':'')+'</div>'+
        '<div class="dev-meta"><span>'+s.ip+'</span><span>'+s.loc+'</span><span class="dev-last'+(s.current?' active':'')+'">'+s.last+'</span></div>'+
      '</div>'+
      (!s.current?'<button class="dev-revoke-btn" onclick="revokeDevice(\''+s.id+'\')">Thu hồi</button>':
       '<span class="dev-this-tag">Phiên hiện tại</span>')+
    '</div>').join('');
    const failCount=log.filter(l=>!l.ok).length;
    const logHtml=log.map(l=>'<div class="login-log-item">'+
      '<div class="log-dot-wrap"><span class="log-dot'+(l.ok?'':' log-fail')+'"></span></div>'+
      '<div class="log-info">'+
        '<div class="log-dev">'+l.device+(l.note?' <span class="log-note">'+l.note+'</span>':'')+'</div>'+
        '<div class="log-meta">'+l.date+' · '+l.time+' · '+l.ip+' · '+l.loc+'</div>'+
      '</div>'+
      '<span class="log-status'+(l.ok?'':' log-status-fail')+'">'+(l.ok?'Thành công':'Thất bại')+'</span>'+
    '</div>').join('');
    return pfSubBar+'<div class="panel">'+
      '<div class="dev-section-hdr">'+
        '<h3 style="margin:0">Thiết bị đang đăng nhập <span class="dev-count">'+sessions.length+'</span></h3>'+
        (hasOthers?'<button class="btn-ghost btn-sm-ghost" onclick="revokeAllDevices()">Đăng xuất tất cả</button>':'')+
      '</div>'+
      '<div class="device-list">'+sessHtml+'</div>'+
      (failCount?'<div class="info-note warn-note">'+
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'+
        ' Phát hiện <b>'+failCount+'</b> lần đăng nhập thất bại gần đây. '+
        '<a style="color:var(--coral);font-weight:600;cursor:pointer;text-decoration:underline" onclick="profileTab=\'security\';renderAccount()">Đổi mật khẩu ngay</a>'+
      '</div>':'')+
      '<div class="sec-divider"></div>'+
      '<div class="dev-section-hdr"><h3 style="margin:0">Lịch sử đăng nhập</h3></div>'+
      '<div class="login-log-list">'+(log.length?logHtml:'<p style="color:var(--text-soft);font-size:13.5px">Chưa có lịch sử.</p>')+'</div>'+
    '</div>';
  }
  /* ── Quyền riêng tư ── */
  if(acctTab==='profile'&&profileTab==='privacy'){
    const rows=[
      ['analytics','📊','Dữ liệu hành vi mua sắm','Giúp cải thiện gợi ý sản phẩm phù hợp với bạn.'],
      ['marketing','📧','Nhận email marketing','Khuyến mãi, sản phẩm mới và bản tin hàng tuần.'],
      ['thirdParty','🤝','Chia sẻ dữ liệu bên thứ ba','Đối tác quảng cáo và phân tích. Tắt sẽ thu hồi quyền OAuth đã cấp.'],
      ['push','🔔','Thông báo đẩy (push)','Đơn hàng, khuyến mãi qua trình duyệt.'],
    ];
    return pfSubBar+'<div class="panel">'+
      '<h3 style="margin:0 0 16px">Quyền riêng tư & Dữ liệu</h3>'+
      rows.map(([key,ic,title,desc])=>'<div class="privacy-row">'+
        '<div class="privacy-info"><div class="privacy-title">'+ic+' '+title+'</div><div class="privacy-desc">'+desc+'</div></div>'+
        '<label class="toggle-sw"><input type="checkbox" id="pv_'+key+'"'+(privacySet[key]?' checked':'')+' onchange="privacySet[\''+key+'\']=this.checked"><span class="toggle-track"><span class="toggle-thumb"></span></span></label>'+
      '</div>').join('')+
      '<div style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">'+
        '<button class="btn-primary" onclick="doSavePrivacy()">Lưu cài đặt</button>'+
        '<button class="btn-ghost" onclick="toast(\'Dữ liệu sẽ được gửi vào email trong 24h\')">📥 Tải dữ liệu của tôi</button>'+
      '</div>'+
      '<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line);font-size:12.5px;color:var(--text-soft)">'+
        'Xem <a class="auth-link" href="#" onclick="event.preventDefault()">Chính sách bảo mật</a> · <a class="auth-link" href="#" onclick="event.preventDefault()">Điều khoản sử dụng</a>'+
      '</div>'+
    '</div>';
  }
  /* ── Xóa tài khoản ── */
  if(acctTab==='profile'&&profileTab==='danger'){
    const isSocial=user.pwHash&&user.pwHash.startsWith('__social__');
    const hasActive=orders.some(o=>orderStage(o)<4);
    return pfSubBar+'<div class="panel">'+
      '<h3 style="margin:0 0 4px;color:#c0392b">⚠ Vùng nguy hiểm</h3>'+
      '<p style="font-size:13px;color:var(--text-soft);margin:0 0 18px">Các thao tác trong mục này có thể gây mất dữ liệu và không thể hoàn tác.</p>'+
      '<div class="danger-zone">'+
        '<div class="danger-zone-title">🗑 Xóa tài khoản vĩnh viễn</div>'+
        '<div class="danger-zone-desc" style="margin:6px 0 14px">Sau khi xóa: toàn bộ đơn hàng, điểm thưởng và dữ liệu sẽ bị ẩn. Tài khoản bị <b>xóa vĩnh viễn sau 30 ngày</b>. Không thể khôi phục sau thời hạn này.</div>'+
        (hasActive?'<div class="info-note" style="background:#fff8f7;border-color:#f5c6c0;color:#c0392b;margin-bottom:14px">⚠ Bạn có đơn hàng đang xử lý. Sau khi xóa tài khoản, các đơn hàng này sẽ bị hủy.</div>':'')+
        (!isSocial?
          '<div class="form-field"><label>Nhập mật khẩu để xác nhận</label>'+
            '<div class="pw-wrap"><input id="delPw" type="password" placeholder="Mật khẩu tài khoản của bạn">'+
            '<button type="button" class="pw-toggle" onclick="togglePw(\'delPw\',this)" tabindex="-1">'+EYE_SVG+'</button></div></div>':'')+
        '<div class="del-confirm-row">'+
          '<label class="del-confirm-chk">'+
            '<input type="checkbox" id="delConfirmChk">'+
            '<span>Tôi hiểu rằng hành động này <b>không thể hoàn tác</b> và tài khoản sẽ bị xóa vĩnh viễn sau 30 ngày.</span>'+
          '</label>'+
        '</div>'+
        '<div id="delErr" class="field-error"></div>'+
        '<button class="btn-delete" onclick="doDeleteAccount()">Xóa tài khoản của tôi</button>'+
      '</div>'+
    '</div>';
  }
}
function startEmailChange(){
  const em=val('emNewEmail').trim();
  if(!em){showAuthErr('emErr','Nhập email mới');return;}
  if(!validEmail(em)){showAuthErr('emErr','Email không hợp lệ');return;}
  if(em===user.email){showAuthErr('emErr','Email mới phải khác email hiện tại');return;}
  emailChangePending=em;
  emailChangeStep='otp';
  renderAccount();
}
function emOtpNav(i,e){
  const boxes=document.querySelectorAll('#app .otp-box');
  if(e.key>='0'&&e.key<='9'&&i<5)setTimeout(()=>boxes[i+1]?.focus(),10);
  if(e.key==='Backspace'&&i>0&&!boxes[i].value)boxes[i-1]?.focus();
}
function confirmEmailChange(){
  const otp=Array.from(document.querySelectorAll('#app .otp-box')).map(b=>b.value).join('');
  if(otp.length<6){showAuthErr('emOtpErr','Nhập đủ 6 số OTP');return;}
  if(otp!=='123456'){showAuthErr('emOtpErr','Mã OTP không đúng — demo: 123456');return;}
  const oldEmail=user.email;
  user.email=emailChangePending;
  const idx=authUsers.findIndex(u=>u.id===user.id);
  if(idx>-1){authUsers[idx].email=emailChangePending;saveAuthUsers();}
  saveUser();
  emailChangeStep=null;emailChangePending='';
  loginLog.unshift({id:Date.now(),time:new Date().getHours()+':'+String(new Date().getMinutes()).padStart(2,'0'),date:todayStr(),device:'Trình duyệt hiện tại',ip:'103.xx.xx.x',loc:'—',ok:true,note:'Đổi email'});
  saveLoginLog();
  renderAccount();
  toast('Email đã được cập nhật thành '+user.email);
}
function saveProfile(){
  const name=val('pfName');
  if(!name||name.length<2){toast('Họ tên không được để trống (tối thiểu 2 ký tự)');return;}
  const phone=val('pfPhone');
  if(phone&&!/^0\d{9}$/.test(phone)){toast('Số điện thoại không hợp lệ (VD: 0912345678)');return;}
  const dob=document.getElementById('pfDob')?.value||'';
  if(dob){const d=new Date(dob);const now=new Date();if(isNaN(d.getTime())||d>now){toast('Ngày sinh không hợp lệ');return;}}
  const gender=document.getElementById('pfGender')?.value;
  user.name=name;
  user.phone=phone;
  if(dob)user.dob=dob;
  if(gender!==undefined)user.gender=gender;
  const grade=document.getElementById('pfGrade')?.value;
  const major=val('pfMajor'), uni=val('pfUni');
  const orgName=val('pfOrg'), taxCode=val('pfTax');
  if(grade)user.grade=grade;
  if(major)user.major=major;
  if(uni)user.university=uni;
  if(orgName)user.orgName=orgName;
  if(taxCode)user.taxCode=taxCode;
  saveUser();
  pfEditMode=false;
  renderAccount();
  toast('Đã lưu thay đổi hồ sơ');
}
function submitTeacherVerify(){
  const code=val('tvcCode'),school=val('tvcSchool');
  if(!code||!school){toast('Nhập mã giáo viên và tên trường công tác');return;}
  user.teacherVerified='pending';user.teacherCode=code;user.teacherSchool=school;user.teacherVfyDate=todayStr();
  saveUser();toast('Đã gửi hồ sơ — EduMart sẽ phê duyệt trong 1–2 ngày làm việc');renderAccount();
}
function submitStudentVerify(){
  const sid=val('svCode'),uni=val('svUni');
  if(!sid||!uni){toast('Nhập mã số sinh viên và tên trường nhé');return;}
  user.studentVerified='pending';user.studentId=sid;user.svUni=uni;user.svVfyDate=todayStr();
  saveUser();toast('Đã gửi hồ sơ — EduMart sẽ phê duyệt trong 1–2 ngày làm việc');renderAccount();
}
/* ── Security functions ── */
function updateCpStrength(){const pw=val('cpNew')||'';const el=document.getElementById('cpStr');if(!el)return;const s=!pw?0:pw.length<6?1:pw.length>=10&&/[0-9]/.test(pw)&&/[^a-zA-Z0-9]/.test(pw)?4:pw.length>=8&&(/[0-9]/.test(pw)||/[^a-zA-Z0-9]/.test(pw))?3:2;const lbls=['','Quá ngắn','Yếu','Trung bình','Mạnh'];const cols=['','#e74c3c','#e67e22','#f39c12','#27ae60'];const pcts=[0,25,50,75,100];el.innerHTML='<div class="pws-bar"><div class="pws-fill" style="width:'+pcts[s]+'%;background:'+cols[s]+'"></div></div>'+(pw?'<span class="pws-lbl" style="color:'+cols[s]+'">'+lbls[s]+'</span>':'');}
function doChangePw(){
  const oldPw=val('cpOld')||'',newPw=val('cpNew')||'',newPw2=val('cpNew2')||'';
  if(!oldPw){showAuthErr('cpErr','Nhập mật khẩu hiện tại');return;}
  if(user.pwHash!==hashPw(oldPw)){showAuthErr('cpErr','Mật khẩu hiện tại không đúng');return;}
  if(!validPw(newPw)){showAuthErr('cpErr','Mật khẩu mới phải từ 6 ký tự trở lên');return;}
  if(newPw===oldPw){showAuthErr('cpErr','Mật khẩu mới phải khác mật khẩu cũ');return;}
  if(newPw!==newPw2){showAuthErr('cpErr','Mật khẩu xác nhận không khớp');return;}
  const idx=authUsers.findIndex(u=>u.id===user.id);
  if(idx>-1){authUsers[idx].pwHash=hashPw(newPw);saveAuthUsers();}
  user.pwHash=hashPw(newPw);saveUser();
  const now=new Date();
  loginLog.unshift({id:Date.now(),time:now.getHours()+':'+String(now.getMinutes()).padStart(2,'0'),date:todayStr(),device:'Trình duyệt hiện tại',ip:'103.xx.xx.x',loc:'Hà Nội, VN',ok:true,note:'Đổi mật khẩu'});
  saveLoginLog();
  showAuthErr('cpErr','');toast('✅ Đã cập nhật mật khẩu!');renderAccount();
}
function otpNav(i,e){
  const boxes=document.querySelectorAll('.otp-box');
  if(e.key>='0'&&e.key<='9'&&i<5)setTimeout(()=>boxes[i+1]?.focus(),10);
  if(e.key==='Backspace'&&i>0&&!boxes[i].value)boxes[i-1]?.focus();
}
function startOtpTimer(){
  clearInterval(otpResendTimer);otpResendSec=60;
  otpResendTimer=setInterval(()=>{
    otpResendSec--;
    const el=document.getElementById('otpCountdown');
    if(el)el.textContent=otpResendSec>0?'Gửi lại sau '+otpResendSec+'s':'';
    if(otpResendSec<=0)clearInterval(otpResendTimer);
  },1000);
}
function confirm2FA(){
  const otp=Array.from(document.querySelectorAll('.otp-box')).map(b=>b.value).join('');
  if(otp.length<6){toast('Nhập đủ 6 số OTP');return;}
  if(otp!=='123456'){toast('Mã OTP không đúng — demo: 123456');return;}
  user.twoFA=true;user.twoFAMethod=twoFAMethod;user.twoFADate=todayStr();
  saveUser();clearInterval(otpResendTimer);
  const alpha='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  twoFABackupCodes=Array.from({length:8},()=>Array.from({length:8},()=>alpha[Math.floor(Math.random()*alpha.length)]).join('').replace(/(.{4})/,'$1-').replace(/-$/,''));
  twoFAStep='backup';renderAccount();
}
function copyBackupCodes(){
  if(!twoFABackupCodes)return;
  navigator.clipboard.writeText(twoFABackupCodes.join('\n')).then(()=>toast('Đã sao chép mã dự phòng'));
}
function disable2FA(){
  const pw=val('tfaDPw')||'';
  if(!pw){showAuthErr('tfaDErr','Nhập mật khẩu để xác nhận');return;}
  if(hashPw(pw)!==user.pwHash){showAuthErr('tfaDErr','Mật khẩu không đúng');return;}
  user.twoFA=false;delete user.twoFAMethod;delete user.twoFADate;
  saveUser();twoFAStep=null;toast('Đã tắt xác thực 2 yếu tố');renderAccount();
}
/* ── Device & Log functions ── */
function getActiveSessions(){
  if(!activeSessions||!activeSessions.length){
    const ua=navigator.userAgent;
    const os=ua.includes('Win')?'Windows':ua.includes('Mac')?'macOS':ua.includes('Android')?'Android':'Linux';
    const br=ua.includes('Chrome')?'Chrome':ua.includes('Firefox')?'Firefox':ua.includes('Safari')?'Safari':'Trình duyệt';
    activeSessions=[
      {id:'s_cur',device:br+' · '+os,icon:'desktop',ip:'103.21.xx.x',loc:'Hà Nội, VN',last:'Đang hoạt động',current:true},
      {id:'s_mob',device:'Safari · iPhone 14',icon:'mobile',ip:'118.69.xx.x',loc:'TP. Hồ Chí Minh, VN',last:'2 giờ trước',current:false},
      {id:'s_tab',device:'Chrome · macOS',icon:'desktop',ip:'27.64.xx.x',loc:'Đà Nẵng, VN',last:'1 ngày trước',current:false},
    ];
    saveActiveSessions();
  }
  return activeSessions;
}
function getLoginLog(){
  if(!loginLog||!loginLog.length){
    const now=new Date();
    const fmt=(d)=>d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    const d1=new Date(now);d1.setDate(d1.getDate()-1);
    const d3=new Date(now);d3.setDate(d3.getDate()-3);
    loginLog=[
      {id:1,time:'14:32',date:fmt(now),device:'Chrome · Windows',ip:'103.21.xx.x',loc:'Hà Nội, VN',ok:true},
      {id:2,time:'09:15',date:fmt(d1),device:'Safari · iPhone',ip:'118.69.xx.x',loc:'TP.HCM, VN',ok:true},
      {id:3,time:'23:44',date:fmt(d1),device:'Firefox · Unknown',ip:'45.xx.xx.x',loc:'Singapore',ok:false},
      {id:4,time:'11:00',date:fmt(d3),device:'Chrome · Windows',ip:'103.21.xx.x',loc:'Hà Nội, VN',ok:true},
    ];
    saveLoginLog();
  }
  return loginLog;
}
function revokeDevice(id){
  activeSessions=(activeSessions||[]).filter(s=>s.id!==id);
  saveActiveSessions();toast('Đã thu hồi quyền truy cập của thiết bị');renderAccount();
}
function revokeAllDevices(){
  activeSessions=(activeSessions||[]).filter(s=>s.current);
  saveActiveSessions();toast('Đã đăng xuất khỏi tất cả thiết bị khác');renderAccount();
}
/* ── Privacy functions ── */
function doSavePrivacy(){
  ['analytics','marketing','thirdParty','push'].forEach(k=>{const el=document.getElementById('pv_'+k);if(el)privacySet[k]=el.checked;});
  savePrivacySet();toast('Đã lưu cài đặt quyền riêng tư');
}
/* ── Delete account ── */
function doDeleteAccount(){
  const isSocial=user.pwHash&&user.pwHash.startsWith('__social__');
  if(!isSocial){
    const pw=val('delPw')||'';
    if(!pw){showAuthErr('delErr','Nhập mật khẩu để xác nhận');return;}
    if(hashPw(pw)!==user.pwHash){showAuthErr('delErr','Mật khẩu không đúng');return;}
  }
  const chk=document.getElementById('delConfirmChk');
  if(!chk||!chk.checked){showAuthErr('delErr','Vui lòng xác nhận bằng cách tích vào ô bên trên');return;}
  const idx=authUsers.findIndex(u=>u.id===user.id);
  if(idx>-1){authUsers[idx].deletedAt=todayStr();saveAuthUsers();}
  user=null;LS.set('user',null);
  toast('Tài khoản đã được đánh dấu xóa. Sẽ xóa vĩnh viễn sau 30 ngày.');
  go('home');
}
/* ── ADMIN MOCK DATA ──────────────────────────────── */
const ADM={
  totals:{users:48200,sellers:1240,products:34800},
  perDay:{users:162,orders:840,revenue:20900000},
  growth:{
    7: {users:8.2, sellers:3.1, products:5.4, revenue:12.7},
    30:{users:15.3,sellers:7.8, products:11.2,revenue:22.4},
    90:{users:31.5,sellers:18.2,products:23.7,revenue:48.9}
  },
  cats:[
    {name:'Sách giáo khoa',pct:38,clr:'#c0392b'},
    {name:'Văn phòng phẩm',pct:22,clr:'#e67e22'},
    {name:'Thiết bị GD',   pct:18,clr:'#2980b9'},
    {name:'Ebook & Audio', pct:14,clr:'#27ae60'},
    {name:'Khác',          pct:8, clr:'#8e44ad'}
  ],
  shops:[
    {name:'NXB Giáo dục VN',orders:4820,rev:284000000,g:12.3},
    {name:'Fahasa Official', orders:3640,rev:198000000,g:8.7},
    {name:'Alphabooks',      orders:2910,rev:156000000,g:15.2},
    {name:'Đinh Tị Books',   orders:2180,rev:124000000,g:-2.1},
    {name:'Sbooks',          orders:1840,rev:98000000, g:6.4}
  ],
  act:[
    {tp:'reg',  text:'Nguyễn Thị Lan đăng ký tài khoản Học sinh',            t:'2 phút'},
    {tp:'shop', text:'Shop "VPP Minh Long" đang chờ duyệt',                   t:'8 phút'},
    {tp:'order',text:'#EDU-28471 · Fahasa · 345.000đ',                        t:'12 phút'},
    {tp:'reg',  text:'Trường THPT Nguyễn Du đăng ký tài khoản Trường học',    t:'25 phút'},
    {tp:'shop', text:'Shop "Thiết bị GD EduPro" đã được duyệt ✓',             t:'1 giờ'},
    {tp:'order',text:'#EDU-28468 · Alphabooks · 128.000đ',                    t:'1 giờ'},
    {tp:'reg',  text:'Lê Văn Minh đăng ký tài khoản Sinh viên',               t:'2 giờ'},
    {tp:'order',text:'#EDU-28461 · NXB Giáo dục VN · 890.000đ',               t:'3 giờ'}
  ]
};
/* ── SELLER APP & ACTIVE SELLER DATA ─────────────────────── */
let sellerApps=LS.get('sellerApps',null);
if(!sellerApps){
  sellerApps=[
    {id:'sapp-001',shopName:'Sách & VPP Minh Long',ownerName:'Nguyễn Văn Long',email:'minhlong.vpp@gmail.com',phone:'0912 345 678',submittedAt:'10/06/2025',status:'pending',category:'sach',
     gpkd:{number:'ĐKKD-HN-2024-112345',issued:'05/03/2024',place:'Sở KH&ĐT Hà Nội',type:'Hộ kinh doanh cá thể'},
     cccd:{number:'034089012345',name:'Nguyễn Văn Long',issued:'15/01/2021',place:'Công an TP Hà Nội'},
     shopInfo:{name:'Sách & VPP Minh Long',desc:'Chuyên cung cấp sách giáo khoa, sách tham khảo và văn phòng phẩm cho học sinh toàn cấp. Hàng nhập trực tiếp từ các NXB uy tín trong nước.',address:'45 Nguyễn Trãi, Thanh Xuân, Hà Nội',bank:'Vietcombank – 1234567890089 – Nguyễn Văn Long',mainCats:['Sách GK','Sách tham khảo','Văn phòng phẩm']},
     reviewNote:'',reviewedBy:null,reviewedAt:null},
    {id:'sapp-002',shopName:'Thiết bị GD EduTech',ownerName:'Trần Thị Huyền',email:'edutech.tb@gmail.com',phone:'0987 654 321',submittedAt:'09/06/2025',status:'more-info',category:'tbgd',
     gpkd:{number:'GP-HCM-2023-887766',issued:'12/08/2023',place:'Sở KH&ĐT TP.HCM',type:'Công ty TNHH'},
     cccd:{number:'079234567890',name:'Trần Thị Huyền',issued:'20/05/2019',place:'Công an TP.HCM'},
     shopInfo:{name:'EduTech – Thiết bị Giáo dục',desc:'Cung cấp thiết bị thí nghiệm, dụng cụ học tập chuyên dụng cho trường học và trung tâm giáo dục. Đối tác chính thức của nhiều thương hiệu châu Âu.',address:'201 Lê Lợi, Q1, TP.HCM',bank:'Techcombank – 9988776655 – Trần Thị Huyền',mainCats:['Thiết bị thí nghiệm','Dụng cụ GD','Đồ dùng học sinh']},
     reviewNote:'Vui lòng bổ sung ảnh chụp GPKD bản gốc và ảnh CCCD 2 mặt còn hiệu lực.',reviewedBy:'Admin EduMart',reviewedAt:'10/06/2025'},
    {id:'sapp-003',shopName:'Nhà sách Hoàng Gia',ownerName:'Lê Minh Hoàng',email:'hoanggiabooks@outlook.com',phone:'0365 111 222',submittedAt:'07/06/2025',status:'pending',category:'sach',
     gpkd:{number:'ĐKKD-DN-2022-004512',issued:'10/11/2022',place:'Sở KH&ĐT Đà Nẵng',type:'Hộ kinh doanh cá thể'},
     cccd:{number:'048199012344',name:'Lê Minh Hoàng',issued:'03/07/2020',place:'Công an TP Đà Nẵng'},
     shopInfo:{name:'Nhà sách Hoàng Gia',desc:'Chuyên kinh doanh sách văn học, sách giáo dục tâm lý và sách ngoại ngữ. Đang mở rộng kênh online sau 5 năm bán lẻ trực tiếp tại Đà Nẵng.',address:'78 Trần Phú, Hải Châu, Đà Nẵng',bank:'BIDV – 3344556677889 – Lê Minh Hoàng',mainCats:['Sách văn học','Sách ngoại ngữ','Sách kỹ năng']},
     reviewNote:'',reviewedBy:null,reviewedAt:null},
    {id:'sapp-004',shopName:'VPP Phương Nam',ownerName:'Nguyễn Phương Linh',email:'vpp.phuongnam@gmail.com',phone:'0777 888 999',submittedAt:'05/06/2025',status:'rejected',category:'vpp',
     gpkd:{number:'ĐKKD-CT-2021-000123',issued:'20/09/2021',place:'Sở KH&ĐT Cần Thơ',type:'Hộ kinh doanh cá thể'},
     cccd:{number:'092123456780',name:'Nguyễn Phương Linh',issued:'01/03/2022',place:'Công an TP Cần Thơ'},
     shopInfo:{name:'VPP Phương Nam',desc:'Cung cấp văn phòng phẩm số lượng lớn, nhập khẩu từ Trung Quốc.',address:'33 Nguyễn Văn Cừ, Ninh Kiều, Cần Thơ',bank:'Agribank – 5566778899 – Nguyễn Phương Linh',mainCats:['Văn phòng phẩm nhập khẩu']},
     reviewNote:'Hồ sơ không đủ điều kiện: Giấy phép kinh doanh hết hạn hiệu lực. Mô tả sản phẩm không rõ nguồn gốc xuất xứ. Đề nghị nộp lại sau khi gia hạn GPKD.',reviewedBy:'Admin EduMart',reviewedAt:'06/06/2025'},
    {id:'sapp-005',shopName:'Đinh Tị Books Online',ownerName:'Đinh Thị Tú',email:'dinhtitubooks@gmail.com',phone:'0901 234 567',submittedAt:'01/06/2025',status:'pending',category:'sach',
     gpkd:{number:'GP-HN-2020-556677',issued:'14/06/2020',place:'Sở KH&ĐT Hà Nội',type:'Công ty TNHH MTV'},
     cccd:{number:'001984567890',name:'Đinh Thị Tú',issued:'25/10/2022',place:'Công an TP Hà Nội'},
     shopInfo:{name:'Đinh Tị Books Online',desc:'Thương hiệu sách trẻ em và sách kỹ năng sống uy tín. Đã có 3 năm kinh nghiệm phát hành sách bản quyền quốc tế. Muốn mở rộng kênh thương mại điện tử.',address:'12 Đinh Tiên Hoàng, Hoàn Kiếm, Hà Nội',bank:'MB Bank – 0987654321 – Đinh Thị Tú',mainCats:['Sách thiếu nhi','Sách kỹ năng','Sách ngoại ngữ']},
     reviewNote:'',reviewedBy:null,reviewedAt:null}
  ];
  LS.set('sellerApps',sellerApps);
}
function saveSellerApps(){LS.set('sellerApps',sellerApps);}

let activeSellers=LS.get('activeSellers',null);
if(!activeSellers){
  activeSellers=[
    {id:'seller-001',shopName:'NXB Giáo dục VN',ownerName:'Trần Thị Hoa',email:'nxbgd@official.vn',phone:'024 3868 4070',joinedAt:'10/01/2023',status:'active',category:'sach',rating:4.9,totalProducts:248,
     stats:{totalOrders:4820,totalRevenue:284000000,returnRate:0.25,thisMonthOrders:420,thisMonthRev:28000000,growth:12.3},
     violations:[],commissionOverride:null,warnings:0},
    {id:'seller-002',shopName:'Fahasa Official',ownerName:'Phan Hải Đăng',email:'seller@fahasa.com',phone:'028 3822 6999',joinedAt:'15/02/2023',status:'active',category:'sach',rating:4.8,totalProducts:1240,
     stats:{totalOrders:3640,totalRevenue:198000000,returnRate:0.8,thisMonthOrders:350,thisMonthRev:19800000,growth:8.7},
     violations:[],commissionOverride:6,warnings:0},
    {id:'seller-003',shopName:'Alphabooks',ownerName:'Nguyễn Bảo Thư',email:'contact@alphabooks.vn',phone:'028 3930 6455',joinedAt:'01/03/2023',status:'active',category:'sach',rating:4.7,totalProducts:534,
     stats:{totalOrders:2910,totalRevenue:156000000,returnRate:1.2,thisMonthOrders:290,thisMonthRev:15600000,growth:15.2},
     violations:[],commissionOverride:null,warnings:0},
    {id:'seller-004',shopName:'Đinh Tị Books',ownerName:'Lê Quang Định',email:'dinhtibooks@gmail.com',phone:'024 3944 8812',joinedAt:'20/04/2023',status:'warning',category:'sach',rating:4.1,totalProducts:128,
     stats:{totalOrders:2180,totalRevenue:124000000,returnRate:3.8,thisMonthOrders:140,thisMonthRev:8000000,growth:-2.1},
     violations:[
       {id:'v-004-1',type:'description',desc:'Mô tả sản phẩm sai so với hàng thực tế — 14 khiếu nại được xác nhận trong tháng 5',date:'02/06/2025',severity:'medium',action:'warning',note:'Cảnh báo lần 1. Yêu cầu cập nhật lại toàn bộ mô tả sản phẩm trong 7 ngày.'},
       {id:'v-004-2',type:'return',desc:'Tỷ lệ hoàn hàng vượt ngưỡng cho phép (>3%)',date:'28/05/2025',severity:'low',action:'noted',note:'Ghi nhận. Theo dõi thêm 30 ngày.'}
     ],commissionOverride:null,warnings:1},
    {id:'seller-005',shopName:'Sbooks',ownerName:'Hoàng Thị Lan',email:'sbooks.official@gmail.com',phone:'0906 123 456',joinedAt:'10/05/2023',status:'active',category:'sach',rating:4.6,totalProducts:312,
     stats:{totalOrders:1840,totalRevenue:98000000,returnRate:1.5,thisMonthOrders:180,thisMonthRev:9800000,growth:6.4},
     violations:[],commissionOverride:null,warnings:0},
    {id:'seller-006',shopName:'VPP Minh Phát',ownerName:'Vũ Minh Phát',email:'minhphat.vpp@gmail.com',phone:'0383 456 789',joinedAt:'15/06/2023',status:'suspended',category:'vpp',rating:3.2,totalProducts:89,
     stats:{totalOrders:890,totalRevenue:42000000,returnRate:6.5,thisMonthOrders:0,thisMonthRev:0,growth:-45.0},
     violations:[
       {id:'v-006-1',type:'fake',desc:'Bán hàng giả mạo thương hiệu — 8 đơn hàng xác nhận có hàng kém chất lượng không đúng mô tả',date:'12/06/2025',severity:'high',action:'suspended',note:'Đình chỉ 30 ngày. Yêu cầu cung cấp hóa đơn nhập hàng toàn bộ sản phẩm đang bán.'},
       {id:'v-006-2',type:'description',desc:'Mô tả sai chất liệu sản phẩm — 27 khiếu nại trong tháng 5',date:'01/06/2025',severity:'medium',action:'warning',note:'Cảnh báo lần 1.'}
     ],commissionOverride:null,warnings:2,
     suspendedUntil:'12/07/2025',suspendedReason:'Bán hàng giả mạo thương hiệu — vi phạm nghiêm trọng Điều 5.3 Quy chế sàn'},
    {id:'seller-007',shopName:'EduPro Thiết bị GD',ownerName:'Ngô Thanh Tùng',email:'edupro.tbgd@gmail.com',phone:'0912 999 777',joinedAt:'22/03/2024',status:'active',category:'tbgd',rating:4.5,totalProducts:76,
     stats:{totalOrders:560,totalRevenue:38000000,returnRate:0.5,thisMonthOrders:62,thisMonthRev:4200000,growth:22.1},
     violations:[],commissionOverride:null,warnings:0}
  ];
  LS.set('activeSellers',activeSellers);
}
function saveActiveSellers(){LS.set('activeSellers',activeSellers);}

/* ── Demo seller migration: approve sapp-001 + ensure activeSellers entry ── */
(function(){
  const s1=sellerApps.find(a=>a.id==='sapp-001');
  if(s1&&s1.status!=='approved'){s1.status='approved';s1.reviewedBy='Admin EduMart';s1.reviewedAt='12/06/2025';saveSellerApps();}
  if(!activeSellers.find(s=>s.id==='seller-sapp-001')){
    activeSellers.unshift({id:'seller-sapp-001',shopName:'Sách & VPP Minh Long',ownerName:'Nguyễn Văn Long',email:'minhlong.vpp@gmail.com',phone:'0912 345 678',joinedAt:'12/06/2025',status:'active',category:'sach',rating:4.3,totalProducts:5,
      stats:{totalOrders:124,totalRevenue:8200000,returnRate:0.8,todayOrders:3,todayRev:285000,thisWeekOrders:18,thisWeekRev:1420000,thisMonthOrders:52,thisMonthRev:4100000,growth:18.5},
      recentOrders:[
        {id:'#ORD-2025-089',buyer:'Nguyễn Thị Hoa',items:3,revenue:245000,status:'pending',date:'23/06/2025'},
        {id:'#ORD-2025-088',buyer:'Trần Văn Nam',items:1,revenue:32000,status:'delivered',date:'22/06/2025'},
        {id:'#ORD-2025-087',buyer:'Lê Thị Linh',items:2,revenue:128000,status:'shipping',date:'22/06/2025'},
        {id:'#ORD-2025-086',buyer:'Phạm Hoài Nam',items:4,revenue:380000,status:'delivered',date:'21/06/2025'},
        {id:'#ORD-2025-085',buyer:'Nguyễn Văn Tú',items:1,revenue:88000,status:'delivered',date:'20/06/2025'}
      ],
      products:[
        {id:'slp-001',name:'Bộ SGK Lớp 5 Kết nối tri thức',stock:3,price:185000,sold:24},
        {id:'slp-002',name:'Vở ô ly 4 ô 200 trang (50 quyển)',stock:0,price:45000,sold:156},
        {id:'slp-003',name:'Bút bi Thiên Long RT-007 (Hộp 20c)',stock:12,price:65000,sold:89},
        {id:'slp-004',name:'Sách GK Toán 6 Cánh Diều',stock:28,price:32000,sold:67},
        {id:'slp-005',name:'Sách Tiếng Anh 7 Global Success',stock:45,price:35000,sold:53}
      ],
      revenueChart:[320000,480000,215000,560000,390000,720000,285000],
      revenueChartDays:['T3','T4','T5','T6','T7','CN','T2'],
      sellerNotifs:[
        {id:'sn-001',type:'order',t:'Đơn hàng mới #ORD-2025-089 từ Nguyễn Thị Hoa — 3 sản phẩm, 245.000đ',time:'15 phút trước',read:false},
        {id:'sn-002',type:'order',t:'Đơn hàng mới #ORD-2025-088 từ Trần Văn Nam — 1 sản phẩm, 32.000đ',time:'1 giờ trước',read:false},
        {id:'sn-003',type:'stock',t:'Cảnh báo hết hàng: "Vở ô ly 4 ô 200 trang (50 quyển)" đã hết hàng — cần nhập thêm hàng ngay',time:'2 giờ trước',read:true},
        {id:'sn-004',type:'report',t:'Sản phẩm "Bộ SGK Lớp 5 Kết nối tri thức" bị 1 báo cáo — vui lòng kiểm tra và cập nhật thông tin',time:'Hôm qua',read:true},
        {id:'sn-005',type:'review',t:'Đánh giá mới 5★ từ Minh Anh: "Sách mới nguyên, giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!"',time:'Hôm qua',read:true},
        {id:'sn-006',type:'stock',t:'Cảnh báo sắp hết hàng: "Bộ SGK Lớp 5 Kết nối tri thức" còn 3 sản phẩm — cần nhập thêm hàng',time:'2 ngày trước',read:true},
        {id:'sn-007',type:'review',t:'Đánh giá mới 4★ từ Thanh Hoa: "Sản phẩm tốt, đúng mô tả. Giao hàng hơi chậm nhưng đóng gói kỹ."',time:'3 ngày trước',read:true}
      ],
      violations:[],commissionOverride:null,warnings:0});
    saveActiveSellers();
  }
})();

/* ── Migrate seller-sapp-001 products to full struct ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx!==-1&&activeSellers[sIdx].products&&!activeSellers[sIdx].products[0].genre){
    activeSellers[sIdx].products=[
      {id:'slp-001',name:'Bộ SGK Lớp 5 Kết nối tri thức (2024-2025)',by:'Bộ GD&ĐT',nxb:'NXB Giáo dục Việt Nam',isbn:'978-604-0-12345-6',year:2024,pages:240,lang:'vi',genre:'sgk',aud:['tieuhoc'],desc:'Bộ sách giáo khoa lớp 5 theo chương trình GDPT 2018 bộ Kết nối tri thức với cuộc sống. Gồm 8 môn học, in ấn sắc nét, bìa cứng chống thấm.',price:185000,oldPrice:210000,stock:3,sold:24,rating:4.5,ratingCount:12,status:'active',imageCount:3,createdAt:'15/06/2025',updatedAt:'23/06/2025',restockHistory:[]},
      {id:'slp-002',name:'Sách GK Toán 6 Cánh Diều',by:'Đỗ Đức Thái (CB)',nxb:'NXB Đại học Sư phạm',isbn:'978-604-0-98765-4',year:2024,pages:168,lang:'vi',genre:'sgk',aud:['thcs'],desc:'Sách giáo khoa Toán lớp 6 bộ Cánh Diều theo chương trình GDPT mới. Bài tập phong phú, hình ảnh minh họa sinh động.',price:32000,oldPrice:0,stock:28,sold:67,rating:4.6,ratingCount:23,status:'active',imageCount:2,createdAt:'15/05/2025',updatedAt:'18/06/2025',restockHistory:[]},
      {id:'slp-003',name:'Sách Tiếng Anh 7 Global Success',by:'Nguyễn Thị Chi (CB)',nxb:'NXB Giáo dục Việt Nam',isbn:'978-604-0-11111-1',year:2024,pages:192,lang:'bilingual',genre:'sgk',aud:['thcs'],desc:'Sách giáo khoa Tiếng Anh lớp 7 bộ Global Success theo chương trình mới. Song ngữ Anh-Việt với các bài đọc, nghe, nói và viết.',price:35000,oldPrice:0,stock:45,sold:53,rating:4.8,ratingCount:18,status:'active',imageCount:2,createdAt:'15/05/2025',updatedAt:'15/06/2025',restockHistory:[]},
      {id:'slp-004',name:'Dế Mèn Phiêu Lưu Ký (Bìa Cứng Kỷ Niệm)',by:'Tô Hoài',nxb:'NXB Kim Đồng',isbn:'978-604-2-17890-1',year:2023,pages:208,lang:'vi',genre:'thieunhi',aud:['tieuhoc','thcs'],desc:'Tác phẩm văn học kinh điển Việt Nam dành cho thiếu nhi, bản bìa cứng kỷ niệm 75 năm. Minh họa màu sắc của họa sĩ Tạ Huy Long.',price:88000,oldPrice:110000,stock:0,sold:156,rating:4.9,ratingCount:87,status:'outofstock',imageCount:4,createdAt:'01/04/2025',updatedAt:'20/06/2025',restockHistory:[{qty:50,reason:'Nhập kho lần đầu',date:'01/04/2025'},{qty:100,reason:'Nhập thêm do hết hàng',date:'15/05/2025'}]},
      {id:'slp-005',name:'Atomic Habits – Thói Quen Nguyên Tử',by:'James Clear',nxb:'NXB Lao động',isbn:'978-604-3-34567-8',year:2023,pages:344,lang:'vi',genre:'kynang',aud:['thpt','sinhvien'],desc:'Cuốn sách về việc xây dựng thói quen tốt và loại bỏ thói quen xấu. Phương pháp khoa học đã được kiểm chứng bởi hàng triệu người.',price:115000,oldPrice:145000,stock:12,sold:89,rating:4.7,ratingCount:56,status:'active',imageCount:3,createdAt:'10/05/2025',updatedAt:'20/06/2025',restockHistory:[]},
      {id:'slp-006',name:'Oxford Quick Placement Test – Prep Book',by:'Many Authors',nxb:'Oxford University Press',isbn:'978-0-19-401234-5',year:2023,pages:256,lang:'en',genre:'ngoaingu',aud:['thpt','sinhvien'],desc:'Sách luyện thi Oxford Quick Placement Test cho học sinh THPT và sinh viên muốn xác định trình độ tiếng Anh.',price:195000,oldPrice:240000,stock:8,sold:34,rating:4.4,ratingCount:21,status:'draft',imageCount:2,createdAt:'20/05/2025',updatedAt:'10/06/2025',restockHistory:[]}
    ];
    activeSellers[sIdx].totalProducts=6;
    saveActiveSellers();
  }
})();

/* ── Seed seller-sapp-001 ebooks ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx!==-1&&!activeSellers[sIdx].ebooks){
    activeSellers[sIdx].ebooks=[
      {id:'sle-001',name:'Hướng dẫn ôn thi THPT Quốc gia Toán 2025',by:'TS Nguyễn Văn Minh',nxb:'EduMart Digital',genre:'thamkhao',aud:['thpt'],desc:'Tài liệu ôn thi THPT Quốc gia môn Toán từ cơ bản đến nâng cao, có bài giải chi tiết và đề thi thử cập nhật.',price:49000,formats:['PDF','EPUB'],pages:324,previewPages:30,size:8.5,tableOfContents:'Chương 1: Đại số tổ hợp\nChương 2: Hàm số và đồ thị\nChương 3: Tích phân & Ứng dụng\nChương 4: Số phức\nChương 5: Hình học không gian',status:'active',imageCount:1,totalDownloads:284,downloadsByFormat:{PDF:198,EPUB:86,MOBI:0},previewCount:1240,purchaseCount:284,revenue:13916000,revenueChart:[1200000,980000,1540000,890000,2100000,1680000,780000],createdAt:'01/05/2025',updatedAt:'20/06/2025'},
      {id:'sle-002',name:'Sổ Tay Từ Vựng Tiếng Anh 2000 Từ Thiết Yếu',by:'Nhóm giáo viên EduMart',nxb:'EduMart Digital',genre:'ngoaingu',aud:['thcs','thpt','sinhvien'],desc:'Bộ 2000 từ vựng tiếng Anh thiết yếu theo chủ đề, kèm ví dụ câu và phiên âm quốc tế. Phù hợp ôn thi và giao tiếp.',price:35000,formats:['PDF','EPUB','MOBI'],pages:186,previewPages:20,size:4.2,tableOfContents:'Phần 1: Gia đình & Bạn bè\nPhần 2: Trường học & Giáo dục\nPhần 3: Nghề nghiệp & Công việc\nPhần 4: Công nghệ & Số hóa',status:'active',imageCount:1,totalDownloads:512,downloadsByFormat:{PDF:280,EPUB:167,MOBI:65},previewCount:1890,purchaseCount:512,revenue:17920000,revenueChart:[2200000,1900000,2800000,1600000,3100000,2400000,1400000],createdAt:'15/04/2025',updatedAt:'22/06/2025'},
      {id:'sle-003',name:'Kỹ Năng Tư Duy Phản Biện cho Học Sinh',by:'PGS.TS Lê Thị Mai',nxb:'EduMart Digital',genre:'kynang',aud:['thpt','sinhvien'],desc:'Hướng dẫn thực hành tư duy phản biện, giải quyết vấn đề và ra quyết định có căn cứ dành cho học sinh và sinh viên.',price:55000,formats:['PDF'],pages:210,previewPages:15,size:5.8,tableOfContents:'Bài 1: Tư duy phản biện là gì?\nBài 2: Phân tích và đánh giá lập luận\nBài 3: Nhận biết ngụy biện phổ biến\nBài 4: Kỹ thuật ra quyết định',status:'draft',imageCount:1,totalDownloads:0,downloadsByFormat:{PDF:0,EPUB:0,MOBI:0},previewCount:0,purchaseCount:0,revenue:0,revenueChart:[0,0,0,0,0,0,0],createdAt:'15/06/2025',updatedAt:'23/06/2025'}
    ];
    saveActiveSellers();
  }
})();

/* ── Seed seller-sapp-001 VPP products ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx!==-1&&!activeSellers[sIdx].vppProducts){
    activeSellers[sIdx].vppProducts=[
      {id:'svp-001',name:'Bút bi Thiên Long TL-027',brand:'Thiên Long',category:'viet',unit:'Cây',desc:'Bút bi ngòi 0.5mm, mực xanh bền màu, êm tay khi viết.',price:4500,oldPrice:5000,stock:240,lowStockThreshold:20,sold:520,rating:4.7,ratingCount:98,imageCount:2,status:'active',createdAt:'10/04/2025',updatedAt:'20/06/2025',restockHistory:[{qty:200,reason:'Nhập hàng tháng 6',date:'01/06/2025'}]},
      {id:'svp-002',name:'Vở ô ly Hồng Hà 96 trang',brand:'Hồng Hà',category:'giay',unit:'Quyển',desc:'Vở ô ly 96 trang bìa cứng, giấy trắng 70gsm, đường kẻ mờ.',price:8500,oldPrice:0,stock:185,lowStockThreshold:15,sold:310,rating:4.5,ratingCount:62,imageCount:1,status:'active',createdAt:'10/04/2025',updatedAt:'18/06/2025',restockHistory:[]},
      {id:'svp-003',name:'Kẹp bướm 19mm (Hộp 12 cái)',brand:'Stacom',category:'giam',unit:'Hộp',desc:'Kẹp bướm inox 19mm, lực kẹp mạnh, không rỉ sét. Hộp 12 cái.',price:12000,oldPrice:15000,stock:7,lowStockThreshold:10,sold:88,rating:4.3,ratingCount:31,imageCount:1,status:'active',createdAt:'12/04/2025',updatedAt:'19/06/2025',restockHistory:[]},
      {id:'svp-004',name:'Băng keo trong 5cm×50m',brand:'Tesa',category:'muc',unit:'Cuộn',desc:'Băng keo trong suốt rộng 5cm, dài 50m, dính tốt, không vàng theo thời gian.',price:18000,oldPrice:22000,stock:0,lowStockThreshold:8,sold:145,rating:4.6,ratingCount:47,imageCount:1,status:'outofstock',createdAt:'15/04/2025',updatedAt:'15/06/2025',restockHistory:[]},
      {id:'svp-005',name:'Bộ màu sáp Faber-Castell 24 màu',brand:'Faber-Castell',category:'viet',unit:'Bộ',desc:'Màu sáp chất lượng cao 24 màu chuẩn EU, an toàn cho trẻ em, màu tươi sáng.',price:68000,oldPrice:80000,stock:42,lowStockThreshold:5,sold:73,rating:4.9,ratingCount:55,imageCount:3,status:'active',createdAt:'20/04/2025',updatedAt:'22/06/2025',restockHistory:[]}
    ];
    saveActiveSellers();
  }
})();

/* ── Seed seller-sapp-001 TBGD products ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx!==-1&&!activeSellers[sIdx].tbgdProducts){
    activeSellers[sIdx].tbgdProducts=[
      {id:'std-001',name:'Máy tính bảng Samsung Galaxy Tab A8',brand:'Samsung',category:'maytinh',unit:'Cái',desc:'Màn hình 10.5" TFT, chip Unisoc T618, RAM 3GB, bộ nhớ 32GB, pin 7040mAh. Phù hợp học trực tuyến và đọc tài liệu.',price:6290000,oldPrice:7490000,stock:18,lowStockThreshold:5,warrantyMonths:24,warrantyNote:'Bảo hành chính hãng Samsung Việt Nam 24 tháng.',sold:42,rating:4.6,ratingCount:37,imageCount:3,status:'active',createdAt:'05/04/2025',updatedAt:'20/06/2025',restockHistory:[{qty:20,reason:'Nhập đầu tháng 6',date:'01/06/2025'}]},
      {id:'std-002',name:'Máy chiếu Optoma X400LVe',brand:'Optoma',category:'maychieuvan',unit:'Cái',desc:'Độ sáng 4500 lumens, độ phân giải XGA (1024×768), công nghệ DLP, tuổi thọ bóng đèn 12.000 giờ ECO+.',price:14500000,oldPrice:16800000,stock:5,lowStockThreshold:3,warrantyMonths:36,warrantyNote:'Bảo hành 36 tháng tại trung tâm ủy quyền Optoma.',sold:15,rating:4.8,ratingCount:12,imageCount:2,status:'active',createdAt:'08/04/2025',updatedAt:'18/06/2025',restockHistory:[]},
      {id:'std-003',name:'Loa hội trường TOA ZA-2120',brand:'TOA',category:'amthanh',unit:'Bộ',desc:'Bộ âm thanh 2 kênh 120W, micro không dây UHF kèm theo, điều khiển từ xa, cổng kết nối Bluetooth + AUX.',price:3850000,oldPrice:0,stock:2,lowStockThreshold:2,warrantyMonths:12,warrantyNote:'Bảo hành 12 tháng, đổi mới trong 30 ngày nếu lỗi kỹ thuật.',sold:8,rating:4.5,ratingCount:8,imageCount:2,status:'active',createdAt:'10/04/2025',updatedAt:'19/06/2025',restockHistory:[]},
      {id:'std-004',name:'Bảng từ viết xóa 1.2×0.8m BAVICO',brand:'BAVICO',category:'bangbiet',unit:'Cái',desc:'Bảng từ viết tay xóa được kích thước 1.2×0.8m, bề mặt men tráng trắng, khung nhôm, kèm khay phấn từ.',price:850000,oldPrice:1100000,stock:0,lowStockThreshold:4,warrantyMonths:12,warrantyNote:'Bảo hành khung và bề mặt 12 tháng.',sold:64,rating:4.4,ratingCount:51,imageCount:2,status:'outofstock',createdAt:'12/04/2025',updatedAt:'10/06/2025',restockHistory:[]},
      {id:'std-005',name:'Camera IP Hikvision DS-2CD1143G2-I',brand:'Hikvision',category:'camera',unit:'Cái',desc:'Camera IP dome 4MP, hồng ngoại 40m, chuẩn IK10 chống va đập, chống bụi bẩn IP67, H.265+.',price:1250000,oldPrice:1500000,stock:28,lowStockThreshold:5,warrantyMonths:24,warrantyNote:'Bảo hành 24 tháng tại các trung tâm Hikvision ủy quyền.',sold:31,rating:4.7,ratingCount:24,imageCount:2,status:'active',createdAt:'15/04/2025',updatedAt:'22/06/2025',restockHistory:[]}
    ];
    saveActiveSellers();
  }
})();

/* ── Seed seller-sapp-001 full orders ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx===-1||activeSellers[sIdx].orders) return;
  activeSellers[sIdx].orders=[
    {id:'ORD-2025-089',buyer:'Nguyễn Thị Hoa',buyerPhone:'0901 234 567',buyerAddress:'123 Nguyễn Trãi, P.3, Q.5, TP.HCM',items:[{name:'Bộ SGK Lớp 5 Kết nối tri thức',qty:2,price:185000,unit:'Bộ'},{name:'Bút bi Thiên Long TL-027',qty:10,price:4500,unit:'Cây'}],subtotal:415000,shippingFee:30000,total:445000,status:'pending',trackingNumber:'',note:'Giao hàng giờ hành chính, gọi trước 30 phút.',cancelReason:'',cancelledAt:'',date:'23/06/2025',updatedAt:'23/06/2025'},
    {id:'ORD-2025-088',buyer:'Trần Văn Nam',buyerPhone:'0912 345 678',buyerAddress:'45 Lê Lợi, P.Bến Nghé, Q.1, TP.HCM',items:[{name:'Sách Tiếng Anh 7 Global Success',qty:1,price:35000,unit:'Quyển'}],subtotal:35000,shippingFee:20000,total:55000,status:'delivered',trackingNumber:'GHTK8834521',note:'',cancelReason:'',cancelledAt:'',date:'22/06/2025',updatedAt:'23/06/2025'},
    {id:'ORD-2025-087',buyer:'Lê Thị Linh',buyerPhone:'0977 654 321',buyerAddress:'78 Trần Hưng Đạo, P.Cầu Ông Lãnh, Q.1, TP.HCM',items:[{name:'Dế Mèn Phiêu Lưu Ký (Bìa Cứng)',qty:1,price:88000,unit:'Quyển'},{name:'Atomic Habits – Thói Quen Nguyên Tử',qty:1,price:115000,unit:'Quyển'}],subtotal:203000,shippingFee:25000,total:228000,status:'shipping',trackingNumber:'VTP9921034',note:'Giao trước 17h',cancelReason:'',cancelledAt:'',date:'22/06/2025',updatedAt:'23/06/2025'},
    {id:'ORD-2025-086',buyer:'Phạm Hoài Nam',buyerPhone:'0966 111 222',buyerAddress:'56 Đinh Tiên Hoàng, P.Đa Kao, Q.1, TP.HCM',items:[{name:'Bộ SGK Lớp 5 Kết nối tri thức',qty:1,price:185000,unit:'Bộ'},{name:'Vở ô ly Hồng Hà 96 trang',qty:5,price:8500,unit:'Quyển'},{name:'Kẹp bướm 19mm (Hộp 12 cái)',qty:2,price:12000,unit:'Hộp'}],subtotal:251500,shippingFee:25000,total:276500,status:'delivered',trackingNumber:'GHTK7734210',note:'',cancelReason:'',cancelledAt:'',date:'21/06/2025',updatedAt:'22/06/2025'},
    {id:'ORD-2025-085',buyer:'Nguyễn Văn Tú',buyerPhone:'0888 999 000',buyerAddress:'12 Bà Triệu, P.Hàng Bài, Q.Hoàn Kiếm, Hà Nội',items:[{name:'Atomic Habits – Thói Quen Nguyên Tử',qty:1,price:115000,unit:'Quyển'}],subtotal:115000,shippingFee:35000,total:150000,status:'delivered',trackingNumber:'VTP8812099',note:'',cancelReason:'',cancelledAt:'',date:'20/06/2025',updatedAt:'21/06/2025'},
    {id:'ORD-2025-084',buyer:'Vũ Thị Thanh',buyerPhone:'0933 456 789',buyerAddress:'90 Nguyễn Văn Cừ, P.An Khánh, Q.Ninh Kiều, Cần Thơ',items:[{name:'Sách GK Toán 6 Cánh Diều',qty:3,price:32000,unit:'Quyển'},{name:'Bút bi Thiên Long TL-027',qty:20,price:4500,unit:'Cây'}],subtotal:186000,shippingFee:30000,total:216000,status:'processing',trackingNumber:'',note:'',cancelReason:'',cancelledAt:'',date:'23/06/2025',updatedAt:'23/06/2025'},
    {id:'ORD-2025-083',buyer:'Hoàng Minh Đức',buyerPhone:'0944 222 333',buyerAddress:'34 Lý Thường Kiệt, P.7, Q.Tân Bình, TP.HCM',items:[{name:'Màu sáp Faber-Castell 24 màu',qty:2,price:68000,unit:'Bộ'}],subtotal:136000,shippingFee:20000,total:156000,status:'cancelled',trackingNumber:'',note:'',cancelReason:'Khách hàng đổi ý, không có nhu cầu mua nữa.',cancelledAt:'19/06/2025',date:'18/06/2025',updatedAt:'19/06/2025'},
    {id:'ORD-2025-082',buyer:'Đặng Thu Hà',buyerPhone:'0956 333 444',buyerAddress:'67 Pasteur, P.Bến Nghé, Q.1, TP.HCM',items:[{name:'Máy tính bảng Samsung Galaxy Tab A8',qty:1,price:6290000,unit:'Cái'}],subtotal:6290000,shippingFee:0,total:6290000,status:'delivered',trackingNumber:'GHTK6621088',note:'Miễn phí vận chuyển đơn trên 5tr',cancelReason:'',cancelledAt:'',date:'17/06/2025',updatedAt:'19/06/2025'}
  ];
  saveActiveSellers();
})();

/* ── Seed seller-sapp-001 warehouse receipts ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx===-1||activeSellers[sIdx].receipts) return;
  activeSellers[sIdx].receipts=[
    {id:'PNK-001',supplier:'Công ty TNHH Phát Hành Sách TP.HCM',note:'Nhập đầu tháng 6/2025',status:'confirmed',createdAt:'01/06/2025',confirmedAt:'01/06/2025',
      lines:[
        {productId:'slp-001',productType:'books',productName:'Bộ SGK Lớp 5 Kết nối tri thức',unit:'Bộ',qty:20,importPrice:140000,total:2800000},
        {productId:'slp-003',productType:'books',productName:'Sách Tiếng Anh 7 Global Success',unit:'Quyển',qty:50,importPrice:24000,total:1200000}
      ],totalQty:70,totalValue:4000000},
    {id:'PNK-002',supplier:'Thiên Long Group',note:'Nhập VPP tháng 6',status:'confirmed',createdAt:'01/06/2025',confirmedAt:'01/06/2025',
      lines:[
        {productId:'svp-001',productType:'vpp',productName:'Bút bi Thiên Long TL-027',unit:'Cây',qty:200,importPrice:2800,total:560000},
        {productId:'svp-002',productType:'vpp',productName:'Vở ô ly Hồng Hà 96 trang',unit:'Quyển',qty:100,importPrice:5500,total:550000}
      ],totalQty:300,totalValue:1110000},
    {id:'PNK-003',supplier:'Nhà phân phối Samsung Việt Nam',note:'Nhập thiết bị quý 2',status:'confirmed',createdAt:'01/06/2025',confirmedAt:'01/06/2025',
      lines:[
        {productId:'std-001',productType:'tbgd',productName:'Máy tính bảng Samsung Galaxy Tab A8',unit:'Cái',qty:20,importPrice:4500000,total:90000000}
      ],totalQty:20,totalValue:90000000},
    {id:'PNK-004',supplier:'Công ty TNHH Phát Hành Sách TP.HCM',note:'Nhập bổ sung tháng 6 — đơn nháp chờ xác nhận',status:'draft',createdAt:'20/06/2025',confirmedAt:'',
      lines:[
        {productId:'slp-004',productType:'books',productName:'Dế Mèn Phiêu Lưu Ký (Bìa Cứng Kỷ Niệm)',unit:'Quyển',qty:50,importPrice:62000,total:3100000},
        {productId:'svp-004',productType:'vpp',productName:'Băng keo trong 5cm×50m',unit:'Cuộn',qty:30,importPrice:11000,total:330000}
      ],totalQty:80,totalValue:3430000}
  ];
  saveActiveSellers();
})();

/* ── Seed seller-sapp-001 revenue & payment data ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx===-1||activeSellers[sIdx].revenueData) return;
  activeSellers[sIdx].revenueData={
    balance:{available:3240000,pendingFromOrders:1890000,totalEarned:27480000,totalWithdrawn:22350000},
    revenueByCategory:{books:14200000,ebook:5800000,vpp:4300000,tbgd:3180000},
    dailyChart:[185000,420000,310000,680000,240000,890000,520000],
    weeklyChart:[1850000,2340000,1620000,3100000,2580000,1940000,2720000],
    monthlyChart:[3800000,4200000,3500000,5100000,4800000,4200000,4600000,3900000,5300000,4700000,5800000,4900000],
    yearlyChart:[38000000,45000000,42000000,51000000],
    transactions:[
      {id:'TXN-089',orderId:'ORD-2025-089',buyer:'Nguyễn Thị Hoa',category:'books',orderTotal:445000,commissionRate:8,commissionAmt:35600,netAmt:409400,status:'pending',date:'23/06/2025'},
      {id:'TXN-088',orderId:'ORD-2025-088',buyer:'Trần Văn Nam',category:'books',orderTotal:55000,commissionRate:8,commissionAmt:4400,netAmt:50600,status:'settled',date:'22/06/2025'},
      {id:'TXN-087',orderId:'ORD-2025-087',buyer:'Lê Thị Linh',category:'books',orderTotal:228000,commissionRate:8,commissionAmt:18240,netAmt:209760,status:'settled',date:'22/06/2025'},
      {id:'TXN-086',orderId:'ORD-2025-086',buyer:'Phạm Hoài Nam',category:'vpp',orderTotal:276500,commissionRate:10,commissionAmt:27650,netAmt:248850,status:'settled',date:'21/06/2025'},
      {id:'TXN-085',orderId:'ORD-2025-085',buyer:'Nguyễn Văn Tú',category:'books',orderTotal:150000,commissionRate:8,commissionAmt:12000,netAmt:138000,status:'settled',date:'20/06/2025'},
      {id:'TXN-084',orderId:'ORD-2025-084',buyer:'Vũ Thị Thanh',category:'vpp',orderTotal:216000,commissionRate:10,commissionAmt:21600,netAmt:194400,status:'processing',date:'23/06/2025'},
      {id:'TXN-082',orderId:'ORD-2025-082',buyer:'Đặng Thu Hà',category:'tbgd',orderTotal:6290000,commissionRate:12,commissionAmt:754800,netAmt:5535200,status:'settled',date:'17/06/2025'}
    ],
    withdrawals:[
      {id:'WD-003',amount:5000000,bankName:'Techcombank',bankAcc:'****5678',bankHolder:'NGUYEN VAN LONG',status:'completed',note:'Rút tháng 6/2025 lần 2',requestedAt:'15/06/2025',completedAt:'17/06/2025'},
      {id:'WD-002',amount:8000000,bankName:'Techcombank',bankAcc:'****5678',bankHolder:'NGUYEN VAN LONG',status:'completed',note:'Rút tháng 5/2025',requestedAt:'31/05/2025',completedAt:'02/06/2025'},
      {id:'WD-001',amount:9350000,bankName:'Techcombank',bankAcc:'****5678',bankHolder:'NGUYEN VAN LONG',status:'completed',note:'Rút tháng 4/2025',requestedAt:'30/04/2025',completedAt:'03/05/2025'}
    ]
  };
  saveActiveSellers();
})();

/* ── Seed seller-sapp-001 analytics data ── */
(function(){
  const sIdx=activeSellers.findIndex(s=>s.id==='seller-sapp-001');
  if(sIdx===-1||activeSellers[sIdx].analyticsData) return;
  activeSellers[sIdx].analyticsData={
    salesTrend:{
      daily:  [185000,420000,310000,680000,240000,890000,520000],
      weekly: [1850000,2340000,1620000,3100000,2580000,1940000,2720000],
      monthly:[3800000,4200000,3500000,5100000,4800000,4200000,4600000,3900000,5300000,4700000,5800000,4900000]
    },
    topProducts:[
      {id:'slp-004',name:'Dế Mèn Phiêu Lưu Ký (Bìa Cứng)',type:'books',sold:156,revenue:13728000,views:4200,convRate:3.7},
      {id:'svp-001',name:'Bút bi Thiên Long TL-027',type:'vpp',sold:520,revenue:2340000,views:3100,convRate:16.8},
      {id:'slp-005',name:'Atomic Habits – Thói Quen Nguyên Tử',type:'books',sold:89,revenue:10235000,views:2800,convRate:3.2},
      {id:'std-001',name:'Samsung Galaxy Tab A8',type:'tbgd',sold:42,revenue:264180000,views:1940,convRate:2.2},
      {id:'slp-001',name:'Bộ SGK Lớp 5 Kết nối tri thức',type:'books',sold:24,revenue:4440000,views:1560,convRate:1.5},
      {id:'svp-005',name:'Màu sáp Faber-Castell 24 màu',type:'vpp',sold:73,revenue:4964000,views:1420,convRate:5.1},
      {id:'sle-002',name:'Sổ Tay Từ Vựng Tiếng Anh 2000 Từ',type:'ebook',sold:512,revenue:17920000,views:6800,convRate:7.5}
    ],
    categoryTrends:[
      {k:'books', lbl:'Sách giấy', clr:'#1565c0',thisMonth:4900000,lastMonth:4200000},
      {k:'ebook', lbl:'Ebook',     clr:'#6a1b9a',thisMonth:5800000,lastMonth:4900000},
      {k:'vpp',   lbl:'VPP',       clr:'#2e7d32',thisMonth:2100000,lastMonth:2400000},
      {k:'tbgd',  lbl:'Thiết bị',  clr:'#e65100',thisMonth:3800000,lastMonth:3100000}
    ],
    funnel:{views:12400,addToCart:3120,checkout:1840,purchased:1382},
    trafficSources:[
      {src:'search',   lbl:'Tìm kiếm nội bộ', visits:5840, pct:47, clr:'#1565c0'},
      {src:'recommend',lbl:'Gợi ý / Đề xuất', visits:2980, pct:24, clr:'#6a1b9a'},
      {src:'category', lbl:'Duyệt danh mục',  visits:1980, pct:16, clr:'#2e7d32'},
      {src:'direct',   lbl:'Truy cập trực tiếp',visits:990,pct:8,  clr:'#e65100'},
      {src:'external', lbl:'Nguồn bên ngoài',  visits:610, pct:5,  clr:'#795548'}
    ],
    behavior:{avgTimeOnPage:185,bounceRate:34.2,avgPagesPerSession:3.4,avgSessionDuration:312},
    customerMix:{
      labels:['T2','T3','T4','T5','T6','T7','CN'],
      newCustomers:   [12,18,9,24,15,31,22],
      returning:      [8, 14,11,19,12,24,18]
    },
    weeklyOrders:    [8,14,9,21,16,28,19]
  };
  saveActiveSellers();
})();

/* ── Seed demo reviews for seller-sapp-001 products ── */
(function(){
  if(reviewsStore['_seller_sapp_001_seeded']) return;
  const seed={
    'slp-001':[
      {name:'Phụ huynh Minh Anh',rate:5,text:'Sách rất đẹp, in ấn sắc nét. Con học rất thích bộ SGK này. Giao hàng nhanh, đóng gói cẩn thận.',date:'10/06/2025'},
      {name:'Thầy Nguyễn Hùng',rate:4,text:'Sách chất lượng tốt. Bìa cứng, giấy dày. Chỉ có điều giá hơi cao so với bản thường.',date:'08/06/2025'},
      {name:'Mẹ bé Hà',rate:3,text:'Nội dung đầy đủ nhưng giao hàng hơi chậm. Bộ sách bị lệch trang ở quyển Tiếng Việt.',date:'05/06/2025'}
    ],
    'slp-004':[
      {name:'Lê Bảo Châu',rate:5,text:'Sách in đẹp, bìa cứng chắc chắn. Dế Mèn phiêu lưu ký bản bìa cứng này rất xứng đáng làm quà tặng!',date:'12/06/2025',reply:'Cảm ơn bạn đã tin tưởng shop! Chúc bạn và gia đình đọc sách vui vẻ 📚',replyDate:'13/06/2025'},
      {name:'Trần Minh Khôi',rate:1,text:'Sản phẩm nhận được bị móp góc, bìa cứng bị trầy xước. Đóng gói quá sơ sài. Không hài lòng chút nào.',date:'09/06/2025'},
      {name:'Nguyễn Thị Lan',rate:5,text:'Tuyệt vời! Đây là lần thứ ba tôi mua ở đây. Luôn tin tưởng shop.',date:'07/06/2025',reply:'Cảm ơn chị đã ủng hộ shop lần này nữa! Sẽ tiếp tục mang đến những sản phẩm tốt nhất 💙',replyDate:'07/06/2025'}
    ],
    'slp-005':[
      {name:'Hoàng Gia Huy',rate:5,text:'Cuốn sách hay nhất tôi đọc năm nay. Dịch rất tốt, giữ được cái hồn của bản gốc.',date:'11/06/2025'},
      {name:'Nguyễn Bảo Anh',rate:4,text:'Sách hay, nhiều kiến thức thực tế. Giao hàng nhanh trong 1 ngày.',date:'06/06/2025'},
      {name:'Trung Hiếu',rate:2,text:'Sách bị ố vàng một số trang. Có vẻ là hàng tồn kho lâu. Cần cải thiện khâu bảo quản.',date:'04/06/2025'}
    ],
    'svp-001':[
      {name:'Học sinh Minh Trí',rate:5,text:'Bút viết trơn, không bị tắc mực. Mua một hộp 10 cây cho cả lớp dùng. Giá rẻ hơn văn phòng phẩm ngoài.',date:'13/06/2025'},
      {name:'Văn phòng ABC',rate:4,text:'Mua số lượng lớn, giá ổn. Giao hàng đúng hẹn. Sẽ mua tiếp.',date:'09/06/2025',reply:'Cảm ơn công ty đã lựa chọn shop! Hãy liên hệ shop nếu cần báo giá số lượng lớn nhé 😊',replyDate:'09/06/2025'}
    ],
    'std-001':[
      {name:'Phụ huynh Thanh Tùng',rate:5,text:'Máy tính bảng cho con học online rất tốt. Pin trâu, màn hình sắc nét. Đặt hàng chiều tối, sáng hôm sau đã nhận được.',date:'14/06/2025'},
      {name:'Giáo viên Hải Yến',rate:4,text:'Thiết bị học tốt, cài được nhiều app học tiếng Anh. Chỉ cần thêm bao da bảo vệ đi kèm thì hoàn hảo hơn.',date:'11/06/2025'}
    ],
    'sle-002':[
      {name:'Nguyễn Văn Bình',rate:5,text:'Ebook format đẹp, phông chữ dễ đọc. Mình học được rất nhiều từ vựng thực tế. Rất đáng tiền!',date:'11/06/2025',reply:'Cảm ơn bạn đã trải nghiệm ebook của shop! Bạn có thể xem thêm series từ vựng nâng cao trong danh mục ebook nhé 📖',replyDate:'12/06/2025'},
      {name:'Cao Thị Hoa',rate:3,text:'Nội dung ổn nhưng file PDF hơi nặng, mở hơi chậm trên điện thoại. Hy vọng shop tối ưu thêm.',date:'08/06/2025'},
      {name:'Phan Đức Long',rate:1,text:'File ebook bị lỗi font chữ khi đọc trên Kindle. Không dùng được. Cần hỗ trợ gấp.',date:'06/06/2025'}
    ]
  };
  Object.entries(seed).forEach(function(entry){
    var pid=entry[0], revs=entry[1];
    reviewsStore[pid]=(reviewsStore[pid]||[]).concat(revs);
  });
  reviewsStore['_seller_sapp_001_seeded']=true;
  LS.set('reviews',reviewsStore);
})();

let commissionCfg=LS.get('commissionCfg',null);
if(!commissionCfg){
  commissionCfg={
    byCategory:{sach:8,vpp:10,tbgd:12,ebook:15,audiobook:15},
    history:[
      {id:'ch-001',date:'01/04/2025',field:'cat:sach',oldVal:10,newVal:8,by:'Admin EduMart',reason:'Kích cầu nhà bán sách trong giai đoạn đầu năm học'},
      {id:'ch-002',date:'15/03/2025',field:'seller:seller-002',oldVal:8,newVal:6,by:'Admin EduMart',reason:'Ưu đãi đặc biệt cho đối tác chiến lược Fahasa'},
      {id:'ch-003',date:'01/01/2025',field:'cat:ebook',oldVal:12,newVal:15,by:'Admin EduMart',reason:'Điều chỉnh theo chi phí hạ tầng nội dung số'}
    ]
  };
  LS.set('commissionCfg',commissionCfg);
}
function saveCommissionCfg(){LS.set('commissionCfg',commissionCfg);}

/* ── PRODUCT ADMIN DATA ─────────────────────── */
let pendingProds=LS.get('pendingProds',null);
if(!pendingProds){
  pendingProds=[
    {id:'pp-001',sellerId:'seller-001',sellerName:'NXB Giáo dục VN',name:'Bộ SGK Lớp 1 Kết nối tri thức 2025-2026',by:'Bộ Giáo dục và Đào tạo',cat:'sach',genre:'sgk',aud:['tieuhoc'],price:195000,oldPrice:220000,desc:'Bộ sách giáo khoa lớp 1 theo chương trình GDPT 2018 bộ Kết nối tri thức với cuộc sống, gồm 5 cuốn: Tiếng Việt, Toán, Tự nhiên và Xã hội, Đạo đức, Hoạt động trải nghiệm. In ấn sắc nét, bìa cứng chống thấm.',imageCount:4,submittedAt:'17/06/2025',status:'pending',reviewNote:'',reviewedBy:null,reviewedAt:null},
    {id:'pp-002',sellerId:'seller-003',sellerName:'Alphabooks',name:'Nhà Giả Kim - Paulo Coelho (Tái bản 2025)',by:'Paulo Coelho',cat:'sach',genre:'vanhoc',aud:['thpt','sinhvien'],price:88000,oldPrice:110000,desc:'Tiểu thuyết bestseller toàn cầu của Paulo Coelho về hành trình tìm kiếm kho báu và ý nghĩa cuộc đời. Bản dịch mới nhất 2025 của Lê Chu Cầu, bìa mềm 228 trang.',imageCount:3,submittedAt:'16/06/2025',status:'needs-edit',reviewNote:'Vui lòng bổ sung thông tin: số ISBN, nhà xuất bản, năm xuất bản, và cập nhật ảnh bìa độ phân giải cao hơn (tối thiểu 800×1200px).',reviewedBy:'Admin EduMart',reviewedAt:'17/06/2025'},
    {id:'pp-003',sellerId:'seller-005',sellerName:'Sbooks',name:'Bộ bút màu 36 cây Staedtler Triangular',by:'Staedtler',cat:'vpp',genre:null,aud:['tieuhoc','thcs'],price:145000,oldPrice:168000,desc:'Bộ bút màu gỗ 36 màu cao cấp Staedtler Noris Triangular, thiết kế thân tam giác chống lăn, ngòi bút mềm mại cho nét vẽ đồng đều, màu sắc tươi sáng không phai, phù hợp học sinh tiểu học và trung học.',imageCount:5,submittedAt:'15/06/2025',status:'pending',reviewNote:'',reviewedBy:null,reviewedAt:null},
    {id:'pp-004',sellerId:'seller-002',sellerName:'Fahasa Official',name:'Dế Mèn Phiêu Lưu Ký - Tô Hoài (Bản minh họa đặc biệt)',by:'Tô Hoài',cat:'sach',genre:'thieunhi',aud:['tieuhoc','thcs'],price:72000,oldPrice:85000,desc:'Tác phẩm văn học kinh điển Việt Nam, bản đặc biệt với 48 trang minh họa màu của họa sĩ Tạ Huy Long. Bìa cứng, giấy tốt, phù hợp làm quà tặng.',imageCount:6,submittedAt:'14/06/2025',status:'approved',reviewNote:'',reviewedBy:'Admin EduMart',reviewedAt:'15/06/2025'},
    {id:'pp-005',sellerId:'seller-006',sellerName:'VPP Minh Phát',name:'Vở Ô ly 4 ô 200 trang (Hộp 20 quyển)',by:'Không rõ thương hiệu',cat:'vpp',genre:null,aud:['tieuhoc'],price:65000,oldPrice:null,desc:'Hộp 20 quyển vở ô ly 4 ô, 200 trang/quyển. Giấy trắng sáng 70gsm.',imageCount:2,submittedAt:'13/06/2025',status:'rejected',reviewNote:'Hồ sơ seller bị đình chỉ (vi phạm Điều 5.3). Không thể duyệt sản phẩm mới trong thời gian đình chỉ. Vui lòng chờ đến 12/07/2025.',reviewedBy:'Admin EduMart',reviewedAt:'14/06/2025'},
    {id:'pp-006',sellerId:'seller-007',sellerName:'EduPro Thiết bị GD',name:'Kính hiển vi sinh học EduScope Pro 1000x',by:'EduScope',cat:'tbgd',genre:null,aud:['thcs','thpt','school'],price:1850000,oldPrice:2200000,desc:'Kính hiển vi sinh học quang học 4 vật kính (4x, 10x, 40x, 100x), độ phóng đại tối đa 1000x. Thích hợp phòng thí nghiệm trường THCS và THPT. Kèm bộ tiêu bản mẫu vật 12 chiếc.',imageCount:7,submittedAt:'12/06/2025',status:'pending',reviewNote:'',reviewedBy:null,reviewedAt:null}
  ];
  LS.set('pendingProds',pendingProds);
}
function savePendingProds(){LS.set('pendingProds',pendingProds);}

let reportedProds=LS.get('reportedProds',null);
if(!reportedProds){
  reportedProds=[
    {id:'rp-001',productId:18,productName:'Giải Nhanh Bài Tập Vật Lý 12',sellerId:'seller-004',sellerName:'Đinh Tị Books',cat:'sach',price:58000,reportCount:14,reports:[{reason:'Mô tả sai nội dung',count:8,date:'10/06/2025'},{reason:'Ảnh sản phẩm không đúng thực tế',count:4,date:'11/06/2025'},{reason:'Giá không minh bạch',count:2,date:'12/06/2025'}],status:'active',reviewStatus:'pending',reportedAt:'10/06/2025',resolvedAt:null,resolvedBy:null,adminNote:''},
    {id:'rp-002',productId:34,productName:'Bút bi Thiên Long xanh (Hộp 10 cây)',sellerId:'seller-006',sellerName:'VPP Minh Phát',cat:'vpp',price:35000,reportCount:23,reports:[{reason:'Hàng giả/nhái thương hiệu',count:15,date:'08/06/2025'},{reason:'Chất lượng kém, không đúng mô tả',count:8,date:'09/06/2025'}],status:'hidden',reviewStatus:'resolved',reportedAt:'08/06/2025',resolvedAt:'12/06/2025',resolvedBy:'Admin EduMart',adminNote:'Đã ẩn sản phẩm và cảnh báo seller. Liên quan vụ đình chỉ seller VPP Minh Phát.'},
    {id:'rp-003',productId:21,productName:'Từ điển Anh-Việt Oxford 2024',sellerId:'seller-005',sellerName:'Sbooks',cat:'sach',price:125000,reportCount:6,reports:[{reason:'Ảnh bìa sản phẩm bị mờ, không rõ',count:3,date:'14/06/2025'},{reason:'Mô tả thiếu thông tin NXB và ISBN',count:3,date:'15/06/2025'}],status:'active',reviewStatus:'pending',reportedAt:'14/06/2025',resolvedAt:null,resolvedBy:null,adminNote:''},
    {id:'rp-004',productId:8,productName:'Thước kẻ 30cm Thiên Long',sellerId:'seller-004',sellerName:'Đinh Tị Books',cat:'vpp',price:12000,reportCount:4,reports:[{reason:'Giá quá cao so với thị trường',count:4,date:'16/06/2025'}],status:'active',reviewStatus:'pending',reportedAt:'16/06/2025',resolvedAt:null,resolvedBy:null,adminNote:''}
  ];
  LS.set('reportedProds',reportedProds);
}
function saveReportedProds(){LS.set('reportedProds',reportedProds);}

let adminCats=LS.get('adminCats',null);
if(!adminCats){
  adminCats=[
    {id:'c-sach',key:'sach',name:'Sách',icon:'📚',desc:'Sách giáo khoa, sách tham khảo, sách văn học và các loại sách khác',order:1,visible:true,type:'main'},
    {id:'c-vpp',key:'vpp',name:'Văn phòng phẩm',icon:'✏️',desc:'Bút, vở, dụng cụ học tập và đồ dùng văn phòng các loại',order:2,visible:true,type:'main'},
    {id:'c-tbgd',key:'tbgd',name:'Thiết bị giáo dục',icon:'🔬',desc:'Thiết bị thí nghiệm, máy tính khoa học, bản đồ, dụng cụ giảng dạy',order:3,visible:true,type:'main'},
    {id:'c-ebook',key:'ebook',name:'Ebook',icon:'📱',desc:'Sách điện tử định dạng PDF, EPUB cho mọi thiết bị',order:4,visible:true,type:'main'},
    {id:'c-audio',key:'audiobook',name:'Sách nói',icon:'🎧',desc:'Sách audio chất lượng cao, nghe mọi lúc mọi nơi',order:5,visible:true,type:'main'},
    {id:'g-sgk',key:'sgk',name:'Sách giáo khoa',icon:'📖',desc:'SGK chính khóa theo chương trình GDPT 2018 của Bộ GD&ĐT',order:1,visible:true,type:'genre',parentKey:'sach'},
    {id:'g-thamkhao',key:'thamkhao',name:'Sách tham khảo',icon:'📝',desc:'Sách bài tập, đề thi thử, tài liệu ôn luyện các môn',order:2,visible:true,type:'genre',parentKey:'sach'},
    {id:'g-vanhoc',key:'vanhoc',name:'Văn học',icon:'📜',desc:'Tiểu thuyết, truyện ngắn, thơ ca trong nước và dịch thuật quốc tế',order:3,visible:true,type:'genre',parentKey:'sach'},
    {id:'g-thieunhi',key:'thieunhi',name:'Thiếu nhi',icon:'🌟',desc:'Truyện tranh, sách tô màu, truyện cổ tích cho trẻ em',order:4,visible:true,type:'genre',parentKey:'sach'},
    {id:'g-kynang',key:'kynang',name:'Kỹ năng sống',icon:'💡',desc:'Sách phát triển bản thân, kỹ năng mềm, quản lý thời gian',order:5,visible:true,type:'genre',parentKey:'sach'},
    {id:'g-ngoaingu',key:'ngoaingu',name:'Ngoại ngữ',icon:'🌍',desc:'Giáo trình ngoại ngữ, từ điển, tài liệu luyện thi IELTS/TOEIC',order:6,visible:true,type:'genre',parentKey:'sach'}
  ];
  LS.set('adminCats',adminCats);
}
function saveAdminCats(){LS.set('adminCats',adminCats);}

/* ── ADMIN SYSTEM ORDERS DATA ────────────────────── */
let sysOrders=LS.get('sysOrders',null);
if(!sysOrders){
  sysOrders=[
    {id:'EDU-28471',buyerId:'mock-01',buyerName:'Nguyễn Văn An',buyerEmail:'nva001@gmail.com',buyerPhone:'0912 345 111',
     sellerId:'seller-001',sellerName:'NXB Giáo dục VN',
     items:[{prodId:1,prodName:'Bộ SGK lớp 6 - Kết nối tri thức',qty:1,unitPrice:187000},{prodId:6,prodName:'Luyện thi THPT QG môn Toán',qty:1,unitPrice:95000}],
     subtotal:282000,shippingFee:25000,discount:0,total:307000,paymentMethod:'momo',
     shippingAddr:'45 Nguyễn Trãi, Thanh Xuân, Hà Nội',orderDate:'10/06/2025',status:'delivered',
     statusHistory:[
       {status:'pending',date:'10/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'10/06/2025',note:'Seller xác nhận đơn hàng',by:'seller'},
       {status:'shipping',date:'11/06/2025',note:'Đã bàn giao cho GHTK',by:'seller'},
       {status:'delivered',date:'13/06/2025',note:'Giao hàng thành công',by:'system'}
     ],
     complaint:{reason:'Nhận được sách cũ, không phải bản 2025',desc:'Đặt bộ SGK lớp 6 bản Kết nối tri thức 2025 nhưng nhận được sách in lại từ năm 2023. Bìa bị nhàu, một số trang bị cong. Yêu cầu đổi hàng hoặc hoàn tiền.',filedAt:'14/06/2025',status:'open',resolution:'',resolvedAt:null,resolvedBy:null},
     refund:null,adminLog:[]},
    {id:'EDU-28468',buyerId:'mock-02',buyerName:'Trần Thị Bình',buyerEmail:'ttbinh@yahoo.com',buyerPhone:'0987 654 321',
     sellerId:'seller-002',sellerName:'Fahasa Official',
     items:[{prodId:4,prodName:'Mắt biếc',qty:1,unitPrice:88000},{prodId:3,prodName:'Tư duy nhanh và chậm',qty:1,unitPrice:169000}],
     subtotal:257000,shippingFee:30000,discount:0,total:287000,paymentMethod:'cod',
     shippingAddr:'78 Trần Hưng Đạo, Q1, TP.HCM',orderDate:'09/06/2025',status:'completed',
     statusHistory:[
       {status:'pending',date:'09/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'09/06/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'10/06/2025',note:'Đã giao GHTK',by:'seller'},
       {status:'delivered',date:'12/06/2025',note:'Giao thành công',by:'system'},
       {status:'completed',date:'12/06/2025',note:'Người mua xác nhận',by:'buyer'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28461',buyerId:'mock-03',buyerName:'Lê Hồng Phúc',buyerEmail:'lhphuc@gmail.com',buyerPhone:'0905 111 222',
     sellerId:'seller-003',sellerName:'Alphabooks',
     items:[{prodId:5,prodName:'Atomic Habits - Thay đổi tí hon',qty:2,unitPrice:145000},{prodId:24,prodName:'Cây chuối non đi giày xanh',qty:1,unitPrice:110000}],
     subtotal:400000,shippingFee:30000,discount:30000,total:400000,paymentMethod:'bank',
     shippingAddr:'12 Lê Duẩn, Đà Nẵng',orderDate:'08/06/2025',status:'shipping',
     statusHistory:[
       {status:'pending',date:'08/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'08/06/2025',note:'Xác nhận',by:'seller'},
       {status:'processing',date:'09/06/2025',note:'Đang đóng gói',by:'seller'},
       {status:'shipping',date:'10/06/2025',note:'Đã bàn giao ViettelPost. Mã: VT2025061001',by:'seller'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28445',buyerId:'mock-04',buyerName:'Phạm Minh Tuấn',buyerEmail:'pmtuan@edu.vn',buyerPhone:'024 3333 4444',
     sellerId:'seller-004',sellerName:'Đinh Tị Books',
     items:[{prodId:23,prodName:'Tắt đèn - Ngô Tất Tố',qty:3,unitPrice:72000}],
     subtotal:216000,shippingFee:25000,discount:0,total:241000,paymentMethod:'momo',
     shippingAddr:'Trường THPT Nguyễn Du, Hà Nội',orderDate:'05/06/2025',status:'delivered',
     statusHistory:[
       {status:'pending',date:'05/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'05/06/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'06/06/2025',note:'Đang giao',by:'seller'},
       {status:'delivered',date:'07/06/2025',note:'Đã giao',by:'system'}
     ],
     complaint:{reason:'Mô tả sản phẩm không đúng thực tế',desc:'Sách được mô tả là "mới 100%, chất lượng cao" nhưng nhận được sản phẩm bìa bị ố vàng và giấy đã ngả màu. Yêu cầu trả lại toàn bộ 3 cuốn.',filedAt:'08/06/2025',status:'resolved',resolution:'Đã liên hệ seller yêu cầu đổi hàng mới. Seller xác nhận giao hàng mới trong 3 ngày và hoàn 15% giá trị đơn.',resolvedAt:'10/06/2025',resolvedBy:'Admin EduMart'},
     refund:null,adminLog:[{id:'log-a1',action:'Giải quyết khiếu nại',note:'Đã liên hệ seller, yêu cầu đổi hàng mới',date:'10/06/2025',by:'Admin EduMart'}]},
    {id:'EDU-28440',buyerId:'mock-06',buyerName:'Vũ Quốc Bảo',buyerEmail:'vqbao@gmail.com',buyerPhone:'0909 888 777',
     sellerId:'seller-001',sellerName:'NXB Giáo dục VN',
     items:[{prodId:1,prodName:'Bộ SGK lớp 6 - Kết nối tri thức',qty:2,unitPrice:187000},{prodId:25,prodName:'Bộ SGK lớp 1 - Cánh Diều',qty:1,unitPrice:165000}],
     subtotal:539000,shippingFee:0,discount:0,total:539000,paymentMethod:'momo',
     shippingAddr:'88 Đinh Tiên Hoàng, Bình Thạnh, TP.HCM',orderDate:'01/06/2025',status:'refunded',
     statusHistory:[
       {status:'pending',date:'01/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'01/06/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'02/06/2025',note:'Đang giao',by:'seller'},
       {status:'delivered',date:'04/06/2025',note:'Đã giao',by:'system'},
       {status:'refunded',date:'07/06/2025',note:'Hoàn tiền thành công: 539.000đ',by:'Admin EduMart'}
     ],
     complaint:{reason:'Giao nhầm sản phẩm',desc:'Đặt SGK lớp 6 bộ Kết nối tri thức nhưng nhận được bộ Cánh Diều. Yêu cầu hoàn tiền toàn bộ vì không còn thời gian để đổi hàng.',filedAt:'05/06/2025',status:'resolved',resolution:'Xác nhận lỗi từ phía seller. Đã hoàn tiền toàn bộ 539.000đ vào ví MoMo trong 24h.',resolvedAt:'07/06/2025',resolvedBy:'Admin EduMart'},
     refund:{amount:539000,reason:'Giao nhầm hàng',status:'completed',requestedAt:'05/06/2025',processedAt:'07/06/2025',processedBy:'Admin EduMart',note:'Hoàn tiền vào ví MoMo trong 24h'},
     adminLog:[
       {id:'log-b1',action:'Khởi tạo hoàn tiền: 539.000đ',note:'Giao nhầm hàng',date:'06/06/2025',by:'Admin EduMart'},
       {id:'log-b2',action:'Hoàn tiền hoàn tất: 539.000đ',note:'',date:'07/06/2025',by:'Admin EduMart'}
     ]},
    {id:'EDU-28425',buyerId:'mock-06',buyerName:'Vũ Quốc Bảo',buyerEmail:'vqbao@gmail.com',buyerPhone:'0909 888 777',
     sellerId:'seller-005',sellerName:'Sbooks',
     items:[{prodId:16,prodName:'Tiếng Anh giao tiếp cấp tốc (ebook)',qty:1,unitPrice:59000},{prodId:15,prodName:'Lập trình JavaScript từ con số 0 (ebook)',qty:1,unitPrice:79000}],
     subtotal:138000,shippingFee:0,discount:0,total:138000,paymentMethod:'momo',
     shippingAddr:'88 Đinh Tiên Hoàng, Bình Thạnh, TP.HCM',orderDate:'15/05/2025',status:'processing',
     statusHistory:[
       {status:'pending',date:'15/05/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'15/05/2025',note:'Xác nhận',by:'seller'},
       {status:'processing',date:'15/05/2025',note:'Đang chuẩn bị file ebook',by:'seller'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28410',buyerId:'mock-07',buyerName:'Đặng Thu Hà',buyerEmail:'dtha@gmail.com',buyerPhone:'0378 111 222',
     sellerId:'seller-002',sellerName:'Fahasa Official',
     items:[{prodId:2,prodName:'Dế Mèn phiêu lưu ký',qty:2,unitPrice:45000}],
     subtotal:90000,shippingFee:30000,discount:0,total:120000,paymentMethod:'cod',
     shippingAddr:'21 Lê Lợi, Cần Thơ',orderDate:'20/05/2025',status:'cancelled',
     statusHistory:[
       {status:'pending',date:'20/05/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'20/05/2025',note:'Xác nhận',by:'seller'},
       {status:'cancelled',date:'21/05/2025',note:'Người mua hủy: Đặt nhầm số lượng',by:'buyer'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28398',buyerId:'mock-08',buyerName:'Ngô Văn Hải',buyerEmail:'nvhai@outlook.com',buyerPhone:'0901 555 666',
     sellerId:'seller-006',sellerName:'VPP Minh Phát',
     items:[{prodId:7,prodName:'Combo bút bi Thiên Long 20 cây',qty:1,unitPrice:48000}],
     subtotal:48000,shippingFee:25000,discount:0,total:73000,paymentMethod:'momo',
     shippingAddr:'55 Nguyễn Huệ, Đà Nẵng',orderDate:'10/05/2025',status:'delivered',
     statusHistory:[
       {status:'pending',date:'10/05/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'10/05/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'11/05/2025',note:'Đang giao',by:'seller'},
       {status:'delivered',date:'13/05/2025',note:'Đã giao',by:'system'}
     ],
     complaint:{reason:'Hàng giả, không phải Thiên Long chính hãng',desc:'Bút nhận được có bao bì in kém chất lượng, logo Thiên Long bị mờ và sai màu. Ngòi bút bị rò mực, không viết được. Đây là hàng nhái thương hiệu.',filedAt:'14/05/2025',status:'investigating',resolution:'',resolvedAt:null,resolvedBy:null},
     refund:{amount:73000,reason:'Hàng giả không đúng mô tả',status:'requested',requestedAt:'14/05/2025',processedAt:null,processedBy:null,note:''},
     adminLog:[
       {id:'log-c1',action:'Chuyển khiếu nại sang Đang xem xét',note:'',date:'15/05/2025',by:'Admin EduMart'},
       {id:'log-c2',action:'Cập nhật trạng thái: Đang giao → Đã giao',note:'Xác nhận lại theo GHTK',date:'16/05/2025',by:'Admin EduMart'}
     ]},
    {id:'EDU-28380',buyerId:'mock-09',buyerName:'Bùi Thị Lan',buyerEmail:'btlan@gmail.com',buyerPhone:'0346 777 888',
     sellerId:'seller-007',sellerName:'EduPro Thiết bị GD',
     items:[{prodId:61,prodName:'Kính hiển vi học sinh 400x – 1000x',qty:1,unitPrice:680000}],
     subtotal:680000,shippingFee:50000,discount:0,total:730000,paymentMethod:'bank',
     shippingAddr:'Trường THPT Chu Văn An, Hà Nội',orderDate:'05/05/2025',status:'completed',
     statusHistory:[
       {status:'pending',date:'05/05/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'05/05/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'07/05/2025',note:'Đã bàn giao Viettel',by:'seller'},
       {status:'delivered',date:'10/05/2025',note:'Giao thành công',by:'system'},
       {status:'completed',date:'11/05/2025',note:'Người mua xác nhận hoàn thành',by:'buyer'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28355',buyerId:'mock-11',buyerName:'Lý Thị Kim',buyerEmail:'ltkim@gmail.com',buyerPhone:'0923 111 999',
     sellerId:'seller-001',sellerName:'NXB Giáo dục VN',
     items:[{prodId:26,prodName:'Sách giáo viên Ngữ văn lớp 10',qty:2,unitPrice:62000},{prodId:27,prodName:'Hướng dẫn dạy học theo phương pháp tích cực',qty:1,unitPrice:118000}],
     subtotal:242000,shippingFee:25000,discount:0,total:267000,paymentMethod:'momo',
     shippingAddr:'15 Trần Phú, Cần Thơ',orderDate:'18/06/2025',status:'pending',
     statusHistory:[{status:'pending',date:'18/06/2025',note:'Đặt hàng thành công',by:'system'}],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28340',buyerId:'mock-12',buyerName:'Đinh Văn Mạnh',buyerEmail:'dvmanh@edu.vn',buyerPhone:'028 9999 3333',
     sellerId:'seller-003',sellerName:'Alphabooks',
     items:[{prodId:3,prodName:'Tư duy nhanh và chậm',qty:1,unitPrice:169000}],
     subtotal:169000,shippingFee:30000,discount:0,total:199000,paymentMethod:'bank',
     shippingAddr:'33 Nguyễn Đình Chiểu, Q3, TP.HCM',orderDate:'17/06/2025',status:'confirmed',
     statusHistory:[
       {status:'pending',date:'17/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'17/06/2025',note:'Seller xác nhận đơn hàng',by:'seller'}
     ],
     complaint:null,refund:null,adminLog:[]},
    {id:'EDU-28315',buyerId:'mock-14',buyerName:'Phan Văn Lợi',buyerEmail:'pvloi@gmail.com',buyerPhone:'0912 666 777',
     sellerId:'seller-005',sellerName:'Sbooks',
     items:[{prodId:5,prodName:'Atomic Habits - Thay đổi tí hon',qty:1,unitPrice:145000},{prodId:22,prodName:'Luyện nghe Tiếng Anh mỗi ngày (sách nói)',qty:1,unitPrice:55000}],
     subtotal:200000,shippingFee:30000,discount:0,total:230000,paymentMethod:'momo',
     shippingAddr:'99 Hoàng Diệu, Đà Nẵng',orderDate:'16/06/2025',status:'shipping',
     statusHistory:[
       {status:'pending',date:'16/06/2025',note:'Đặt hàng thành công',by:'system'},
       {status:'confirmed',date:'16/06/2025',note:'Xác nhận',by:'seller'},
       {status:'shipping',date:'17/06/2025',note:'Đã bàn giao GHTK',by:'seller'}
     ],
     complaint:null,refund:null,adminLog:[]}
  ];
  LS.set('sysOrders',sysOrders);
}
function saveAdminOrders(){LS.set('sysOrders',sysOrders);}

/* ── FINANCE DATA ────────────────────────────────── */
/* Tĩnh: biểu đồ tổng quan (không persist) */
const FIN_MONTHS=['T1/25','T2/25','T3/25','T4/25','T5/25','T6/25'];
const FIN_GMV   =[480,520,610,555,590,627];   // triệu đồng, GMV nền tảng
const FIN_COMM  =[48.1,52.0,61.1,55.7,59.1,62.8]; // hoa hồng thu được
const FIN_CATS=[
  {name:'Sách giáo khoa',  pct:38,rate:8,  gmvM:238.3,commM:19.1,clr:'#c0392b'},
  {name:'Văn phòng phẩm',  pct:22,rate:10, gmvM:137.9,commM:13.8,clr:'#e67e22'},
  {name:'Thiết bị giáo dục',pct:18,rate:12,gmvM:112.9,commM:13.5,clr:'#2980b9'},
  {name:'Ebook & Sách nói', pct:14,rate:15,gmvM:87.8, commM:13.2,clr:'#27ae60'},
  {name:'Khác',             pct:8, rate:10, gmvM:50.2, commM:5.0, clr:'#8e44ad'}
];

/* Danh sách yêu cầu rút tiền của seller */
let finWithdrawals=LS.get('finWithdrawals',null);
if(!finWithdrawals){
  finWithdrawals=[
    {id:'WD-001',sellerId:'seller-001',sellerName:'NXB Giáo dục VN',category:'sach',
     amount:25000000,availableBalance:32000000,bank:'Vietcombank – 1234567890 – Trần Thị Hoa',
     requestedAt:'18/06/2025',status:'pending',note:'',processedAt:null,processedBy:null,rejectedReason:''},
    {id:'WD-002',sellerId:'seller-002',sellerName:'Fahasa Official',category:'sach',
     amount:18000000,availableBalance:21500000,bank:'BIDV – 9988776655 – Phan Hải Đăng',
     requestedAt:'17/06/2025',status:'pending',note:'',processedAt:null,processedBy:null,rejectedReason:''},
    {id:'WD-005',sellerId:'seller-007',sellerName:'EduPro Thiết bị GD',category:'tbgd',
     amount:5500000,availableBalance:6800000,bank:'MB Bank – 5566778899 – Ngô Thanh Tùng',
     requestedAt:'14/06/2025',status:'pending',note:'',processedAt:null,processedBy:null,rejectedReason:''},
    {id:'WD-003',sellerId:'seller-003',sellerName:'Alphabooks',category:'sach',
     amount:12500000,availableBalance:14200000,bank:'Techcombank – 3344556677 – Nguyễn Bảo Thư',
     requestedAt:'16/06/2025',status:'processing',note:'Đã chuyển khoản, chờ xác nhận ngân hàng.',processedAt:'18/06/2025',processedBy:'Admin EduMart',rejectedReason:''},
    {id:'WD-004',sellerId:'seller-005',sellerName:'Sbooks',category:'sach',
     amount:8200000,availableBalance:9100000,bank:'VCB – 1122334455 – Hoàng Thị Lan',
     requestedAt:'15/06/2025',status:'paid',note:'',processedAt:'17/06/2025',processedBy:'Admin EduMart',rejectedReason:''},
    {id:'WD-006',sellerId:'seller-006',sellerName:'VPP Minh Phát',category:'vpp',
     amount:3000000,availableBalance:3200000,bank:'Agribank – 7788990011 – Vũ Minh Phát',
     requestedAt:'13/06/2025',status:'rejected',note:'',processedAt:'14/06/2025',processedBy:'Admin EduMart',rejectedReason:'Tài khoản seller đang bị đình chỉ đến 12/07/2025. Không thể thanh toán trong thời gian đình chỉ.'},
    {id:'WD-007',sellerId:'seller-004',sellerName:'Đinh Tị Books',category:'sach',
     amount:9800000,availableBalance:11500000,bank:'VietinBank – 2233445566 – Lê Quang Định',
     requestedAt:'10/06/2025',status:'paid',note:'',processedAt:'12/06/2025',processedBy:'Admin EduMart',rejectedReason:''}
  ];
  LS.set('finWithdrawals',finWithdrawals);
}
function saveFinWithdrawals(){LS.set('finWithdrawals',finWithdrawals);}

/* Lịch sử thanh toán đã hoàn thành */
let finPayments=LS.get('finPayments',null);
if(!finPayments){
  finPayments=[
    {id:'PAY-WD007',sellerId:'seller-004',sellerName:'Đinh Tị Books',amount:9800000,period:'01/06/2025 – 12/06/2025',paidAt:'12/06/2025',bank:'VietinBank – 2233445566 – Lê Quang Định',ref:'TX20250612001',by:'Admin EduMart'},
    {id:'PAY-WD004',sellerId:'seller-005',sellerName:'Sbooks',amount:8200000,period:'01/06/2025 – 17/06/2025',paidAt:'17/06/2025',bank:'VCB – 1122334455 – Hoàng Thị Lan',ref:'TX20250617001',by:'Admin EduMart'},
    {id:'PAY-001',sellerId:'seller-001',sellerName:'NXB Giáo dục VN',amount:22000000,period:'01/05/2025 – 31/05/2025',paidAt:'05/06/2025',bank:'Vietcombank – 1234567890 – Trần Thị Hoa',ref:'TX20250605001',by:'Admin EduMart'},
    {id:'PAY-002',sellerId:'seller-002',sellerName:'Fahasa Official',amount:16500000,period:'01/05/2025 – 31/05/2025',paidAt:'05/06/2025',bank:'BIDV – 9988776655 – Phan Hải Đăng',ref:'TX20250605002',by:'Admin EduMart'},
    {id:'PAY-003',sellerId:'seller-003',sellerName:'Alphabooks',amount:11800000,period:'01/05/2025 – 31/05/2025',paidAt:'06/06/2025',bank:'Techcombank – 3344556677 – Nguyễn Bảo Thư',ref:'TX20250606001',by:'Admin EduMart'},
    {id:'PAY-004',sellerId:'seller-005',sellerName:'Sbooks',amount:7200000,period:'01/05/2025 – 31/05/2025',paidAt:'07/06/2025',bank:'VCB – 1122334455 – Hoàng Thị Lan',ref:'TX20250607001',by:'Admin EduMart'},
    {id:'PAY-005',sellerId:'seller-007',sellerName:'EduPro Thiết bị GD',amount:4100000,period:'01/05/2025 – 31/05/2025',paidAt:'07/06/2025',bank:'MB Bank – 5566778899 – Ngô Thanh Tùng',ref:'TX20250607002',by:'Admin EduMart'},
    {id:'PAY-006',sellerId:'seller-001',sellerName:'NXB Giáo dục VN',amount:19500000,period:'01/04/2025 – 30/04/2025',paidAt:'05/05/2025',bank:'Vietcombank – 1234567890 – Trần Thị Hoa',ref:'TX20250505001',by:'Admin EduMart'},
    {id:'PAY-007',sellerId:'seller-002',sellerName:'Fahasa Official',amount:14200000,period:'01/04/2025 – 30/04/2025',paidAt:'05/05/2025',bank:'BIDV – 9988776655 – Phan Hải Đăng',ref:'TX20250505002',by:'Admin EduMart'},
    {id:'PAY-008',sellerId:'seller-004',sellerName:'Đinh Tị Books',amount:8900000,period:'01/04/2025 – 30/04/2025',paidAt:'08/05/2025',bank:'VietinBank – 2233445566 – Lê Quang Định',ref:'TX20250508001',by:'Admin EduMart'}
  ];
  LS.set('finPayments',finPayments);
}
function saveFinPayments(){LS.set('finPayments',finPayments);}

/* ── CMS DATA ─────────────────────────────────── */
let cmsBlogs=LS.get('cmsBlogs',null);
if(!cmsBlogs){
  cmsBlogs=[
    {id:'blog-001',title:'10 phương pháp học hiệu quả cho học sinh THPT',slug:'10-phuong-phap-hoc-hieu-qua',
     category:'hoc-tap',tags:['học tập','kỹ năng','THPT','ôn thi'],status:'published',featured:true,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Khám phá 10 phương pháp học tập khoa học giúp học sinh THPT đạt kết quả tốt nhất trong kỳ thi.',
     content:'<h2>Giới thiệu</h2><p>Việc học hiệu quả không chỉ phụ thuộc vào thời gian mà còn vào phương pháp. Dưới đây là 10 phương pháp được các chuyên gia giáo dục khuyến nghị.</p><h2>1. Phương pháp Pomodoro</h2><p>Chia nhỏ thời gian học thành các phiên <strong>25 phút</strong>, xen kẽ nghỉ ngắn 5 phút. Sau 4 phiên, nghỉ dài 15–30 phút.</p><h2>2. Mind Map tư duy</h2><p>Sử dụng sơ đồ tư duy để kết nối các khái niệm, giúp ghi nhớ lâu hơn và hệ thống hóa kiến thức.</p>',
     publishedAt:'15/06/2025',createdAt:'14/06/2025',updatedAt:'15/06/2025',views:1247,commentCount:8},
    {id:'blog-002',title:'Top 20 cuốn sách không thể thiếu cho học sinh lớp 10',slug:'top-20-sach-hoc-sinh-lop-10',
     category:'thu-vien',tags:['sách hay','lớp 10','văn học','khoa học'],status:'published',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Danh sách 20 đầu sách được các thầy cô và chuyên gia giáo dục đề xuất cho học sinh đầu cấp THPT.',
     content:'<h2>Nhóm sách Ngữ văn</h2><ul><li><em>Tắt đèn</em> – Ngô Tất Tố</li><li><em>Số đỏ</em> – Vũ Trọng Phụng</li></ul><h2>Nhóm sách Khoa học</h2><ul><li><em>Vật lý vui</em> – Perelman</li><li><em>Những tia sáng của Einstein</em></li></ul>',
     publishedAt:'10/06/2025',createdAt:'09/06/2025',updatedAt:'10/06/2025',views:842,commentCount:5},
    {id:'blog-003',title:'EduMart ra mắt tính năng gợi ý sách thông minh bằng AI',slug:'edumart-goi-y-sach-ai',
     category:'tin-tuc',tags:['tin tức','AI','tính năng mới'],status:'published',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'EduMart chính thức triển khai hệ thống gợi ý sách cá nhân hóa dựa trên AI, giúp mỗi học sinh tìm đúng sách phù hợp.',
     content:'<h2>Tính năng gợi ý thông minh</h2><p>Dựa trên lịch sử mua hàng, độ tuổi, lớp học và sở thích, hệ thống AI của EduMart sẽ đề xuất các đầu sách phù hợp nhất cho từng học sinh.</p><p>Tính năng này hiện đang trong giai đoạn <strong>thử nghiệm beta</strong> và sẽ ra mắt chính thức vào tháng 8/2025.</p>',
     publishedAt:'05/06/2025',createdAt:'04/06/2025',updatedAt:'05/06/2025',views:628,commentCount:3},
    {id:'blog-004',title:'Hướng dẫn chọn văn phòng phẩm chất lượng cao cho năm học mới',slug:'chon-van-phong-pham-chat-luong',
     category:'chia-se',tags:['văn phòng phẩm','năm học mới','mẹo hay'],status:'published',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Bộ văn phòng phẩm đúng chuẩn giúp học sinh học tập hiệu quả hơn. Cùng EduMart tìm hiểu cách chọn đồ dùng học tập thông minh.',
     content:'<h2>Chọn bút viết</h2><p>Bút bi ngòi 0.5mm phù hợp cho chữ viết nhỏ gọn. Các thương hiệu uy tín như Thiên Long, Bến Nghé được nhiều giáo viên khuyên dùng.</p><h2>Vở và sổ ghi chép</h2><p>Vở ô ly 5mm lý tưởng cho các môn tự nhiên. Chọn giấy 70gsm trở lên để không bị thấm mực.</p>',
     publishedAt:'01/06/2025',createdAt:'30/05/2025',updatedAt:'01/06/2025',views:391,commentCount:2},
    {id:'blog-005',title:'Ebook vs Sách giấy: Đâu là lựa chọn tốt hơn cho học sinh?',slug:'ebook-vs-sach-giay',
     category:'thu-vien',tags:['ebook','sách giấy','so sánh'],status:'draft',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Cuộc tranh luận giữa ebook và sách giấy vẫn chưa có hồi kết. Bài viết này phân tích ưu nhược điểm của cả hai.',
     content:'<h2>Ưu điểm của Ebook</h2><p>Tiện lợi, nhẹ nhàng, có thể mang theo hàng nghìn cuốn. Tìm kiếm nội dung dễ dàng.</p><h2>Ưu điểm của Sách giấy</h2><p>Không gây mỏi mắt, dễ ghi chú, phù hợp với học sinh nhỏ tuổi hơn.</p>',
     publishedAt:'',createdAt:'20/05/2025',updatedAt:'25/05/2025',views:0,commentCount:0},
    {id:'blog-006',title:'Kỹ năng đọc sách hiệu quả trong 30 phút mỗi ngày',slug:'ky-nang-doc-sach-30-phut',
     category:'hoc-tap',tags:['đọc sách','kỹ năng','thói quen'],status:'draft',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Chỉ cần 30 phút đọc sách mỗi ngày, bạn có thể đọc tới 12 cuốn sách một năm. Hãy bắt đầu ngay hôm nay!',
     content:'<h2>Tại sao 30 phút là đủ?</h2><p>Nghiên cứu cho thấy đọc sách tập trung 30 phút hiệu quả hơn đọc lan man 2 tiếng.</p>',
     publishedAt:'',createdAt:'18/05/2025',updatedAt:'18/05/2025',views:0,commentCount:0},
    {id:'blog-007',title:'Flash Sale Mùa Tựu Trường – Giảm đến 50% toàn bộ sách giáo khoa',slug:'flash-sale-tuu-truong',
     category:'khuyen-mai',tags:['khuyến mãi','flash sale','sách giáo khoa'],status:'hidden',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Chương trình Flash Sale mùa tựu trường với hàng nghìn đầu sách giảm giá tới 50%. Chỉ diễn ra từ 28-31/08/2025.',
     content:'<h2>Thông tin chương trình</h2><p>Thời gian: <strong>28/08/2025 – 31/08/2025</strong><br>Giảm giá: Lên đến 50% toàn bộ SGK<br>Freeship cho đơn từ 150.000đ.</p>',
     publishedAt:'',createdAt:'15/05/2025',updatedAt:'15/05/2025',views:0,commentCount:0},
    {id:'blog-008',title:'Chào mừng năm học mới 2025–2026: EduMart đồng hành cùng bạn',slug:'chao-mung-nam-hoc-moi-2025',
     category:'tin-tuc',tags:['năm học mới','thông báo'],status:'published',featured:false,
     authorName:'Admin EduMart',thumbnail:'',
     excerpt:'Năm học 2025–2026 đã bắt đầu. EduMart tự hào là người bạn đồng hành tin cậy của hơn 500.000 học sinh và phụ huynh trên toàn quốc.',
     content:'<h2>Năm học mới, hành trình mới</h2><p>EduMart vui mừng chào đón năm học 2025–2026 với nhiều tính năng và dịch vụ mới, giúp việc học tập trở nên dễ dàng và thú vị hơn bao giờ hết.</p>',
     publishedAt:'01/09/2025',createdAt:'01/09/2025',updatedAt:'01/09/2025',views:2104,commentCount:12}
  ];
  LS.set('cmsBlogs',cmsBlogs);
}
function saveCmsBlogs(){LS.set('cmsBlogs',cmsBlogs);}

let cmsComments=LS.get('cmsComments',null);
if(!cmsComments){
  cmsComments=[
    {id:'cmt-001',blogId:'blog-001',blogTitle:'10 phương pháp học hiệu quả cho học sinh THPT',userId:'user-101',userName:'Nguyễn Văn An',content:'Bài viết rất hay và hữu ích! Mình đã áp dụng Pomodoro được 2 tuần và thấy hiệu quả hơn hẳn.',createdAt:'16/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-002',blogId:'blog-001',blogTitle:'10 phương pháp học hiệu quả cho học sinh THPT',userId:'user-102',userName:'Trần Thị Bình',content:'Cảm ơn EduMart! Mình sẽ chia sẻ cho các bạn trong lớp.',createdAt:'16/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-003',blogId:'blog-001',blogTitle:'10 phương pháp học hiệu quả cho học sinh THPT',userId:'user-103',userName:'Lê Hoàng Dũng',content:'Bài hay nhưng thiếu phần ví dụ thực tế. Mong có bài viết sâu hơn.',createdAt:'17/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-004',blogId:'blog-001',blogTitle:'10 phương pháp học hiệu quả cho học sinh THPT',userId:'user-spam-01',userName:'SpamBot2025',content:'Mua sách lậu giá rẻ tại link... [SPAM]',createdAt:'17/06/2025',status:'deleted',bannedUser:true},
    {id:'cmt-005',blogId:'blog-001',blogTitle:'10 phương pháp học hiệu quả cho học sinh THPT',userId:'user-104',userName:'Phạm Minh Châu',content:'Phương pháp số 7 mình chưa hiểu lắm, bạn có thể giải thích thêm không?',createdAt:'18/06/2025',status:'pending',bannedUser:false},
    {id:'cmt-006',blogId:'blog-002',blogTitle:'Top 20 cuốn sách không thể thiếu cho học sinh lớp 10',userId:'user-105',userName:'Hoàng Thị Lan',content:'Danh sách tuyệt vời! Mình đã đọc được 8/20 cuốn rồi.',createdAt:'11/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-007',blogId:'blog-002',blogTitle:'Top 20 cuốn sách không thể thiếu cho học sinh lớp 10',userId:'user-106',userName:'Ngô Tuấn Kiệt',content:'Sao không có sách khoa học vũ trụ nhỉ? Mình nghĩ sách của Neil DeGrasse Tyson cũng rất phù hợp.',createdAt:'12/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-008',blogId:'blog-002',blogTitle:'Top 20 cuốn sách không thể thiếu cho học sinh lớp 10',userId:'user-107',userName:'Vũ Thị Hoa',content:'Cảm ơn! Nhưng mình thấy thiếu mảng sách lịch sử. Mong bài viết tiếp theo có thêm.',createdAt:'13/06/2025',status:'pending',bannedUser:false},
    {id:'cmt-009',blogId:'blog-003',blogTitle:'EduMart ra mắt tính năng gợi ý sách thông minh bằng AI',userId:'user-108',userName:'Đặng Quốc Bảo',content:'Tuyệt vời! Mong sớm ra mắt chính thức.',createdAt:'06/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-010',blogId:'blog-003',blogTitle:'EduMart ra mắt tính năng gợi ý sách thông minh bằng AI',userId:'user-109',userName:'Lý Thị Kim',content:'AI có thực sự hiểu sở thích của học sinh không? Mong team giải thích thêm.',createdAt:'07/06/2025',status:'pending',bannedUser:false},
    {id:'cmt-011',blogId:'blog-004',blogTitle:'Hướng dẫn chọn văn phòng phẩm chất lượng cao cho năm học mới',userId:'user-110',userName:'Nguyễn Thị Mai',content:'Bài viết thiết thực quá! Mình đang cần tư vấn mua đồ cho con vào lớp 6.',createdAt:'02/06/2025',status:'approved',bannedUser:false},
    {id:'cmt-012',blogId:'blog-008',blogTitle:'Chào mừng năm học mới 2025–2026',userId:'user-spam-02',userName:'QuảngCáoRẻ',content:'Quảng cáo sách lậu, đồ chơi giá rẻ tại... [NỘI DUNG VI PHẠM]',createdAt:'02/09/2025',status:'pending',bannedUser:false}
  ];
  LS.set('cmsComments',cmsComments);
}
function saveCmsComments(){LS.set('cmsComments',cmsComments);}

let cmsBanners=LS.get('cmsBanners',null);
if(!cmsBanners){
  cmsBanners=[
    {id:'ban-001',title:'Mùa Tựu Trường 2025 – Giảm 30% toàn bộ SGK',imageUrl:'',linkUrl:'/khuyen-mai/tuu-truong',alt:'Khuyến mãi tựu trường 2025',startDate:'15/08/2025',endDate:'15/09/2025',active:true,order:1},
    {id:'ban-002',title:'Sách Mới Tháng 9 – Hàng Nghìn Đầu Sách Mới Về',imageUrl:'',linkUrl:'/sach-moi',alt:'Sách mới tháng 9',startDate:'01/09/2025',endDate:'30/09/2025',active:true,order:2},
    {id:'ban-003',title:'Freeship Toàn Quốc cho đơn từ 99.000đ',imageUrl:'',linkUrl:'/',alt:'Freeship toàn quốc',startDate:'01/06/2025',endDate:'31/12/2025',active:false,order:3}
  ];
  LS.set('cmsBanners',cmsBanners);
}
function saveCmsBanners(){LS.set('cmsBanners',cmsBanners);}

let cmsPopup=LS.get('cmsPopup',null);
if(!cmsPopup){
  cmsPopup={enabled:false,title:'Ưu đãi đặc biệt hôm nay!',content:'Nhập mã EDUMART10 để được giảm 10% cho đơn hàng đầu tiên. Áp dụng đến hết tháng 9/2025.',imageUrl:'',linkUrl:'/khuyen-mai',linkText:'Mua ngay',delaySeconds:3,showOnce:true,updatedAt:''};
  LS.set('cmsPopup',cmsPopup);
}
function saveCmsPopup(){LS.set('cmsPopup',cmsPopup);}

let cmsStaticPages=LS.get('cmsStaticPages',null);
if(!cmsStaticPages){
  cmsStaticPages={
    about:{title:'Về chúng tôi',updatedAt:'01/06/2025',content:'<h2>EduMart – Người bạn đồng hành giáo dục</h2><p>EduMart là nền tảng thương mại điện tử chuyên biệt về sách, tài liệu học tập và đồ dùng giáo dục, ra đời với sứ mệnh <strong>kết nối tri thức đến mọi học sinh Việt Nam</strong>.</p><h2>Tầm nhìn</h2><p>Trở thành hệ sinh thái giáo dục số hàng đầu Việt Nam, nơi mỗi học sinh đều có thể tiếp cận nguồn tài liệu chất lượng cao với chi phí hợp lý nhất.</p><h2>Giá trị cốt lõi</h2><ul><li><strong>Chính xác:</strong> Chỉ cung cấp sách và tài liệu có nguồn gốc rõ ràng, được kiểm duyệt.</li><li><strong>Tiện lợi:</strong> Giao hàng nhanh, thanh toán đa dạng, hỗ trợ 24/7.</li><li><strong>Tin cậy:</strong> Hơn 500.000 học sinh và phụ huynh tin dùng.</li></ul><h2>Liên hệ</h2><p>Email: support@edumart.vn | Hotline: 1800 1234 (miễn phí)</p>'},
    terms:{title:'Điều khoản sử dụng',updatedAt:'01/06/2025',content:'<h2>1. Chấp thuận điều khoản</h2><p>Bằng việc truy cập và sử dụng EduMart, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây.</p><h2>2. Tài khoản người dùng</h2><p>Bạn có trách nhiệm bảo mật thông tin tài khoản. Mọi hoạt động phát sinh từ tài khoản của bạn là trách nhiệm của bạn.</p><h2>3. Quy định mua hàng</h2><p>Tất cả sản phẩm trên EduMart đều được kiểm duyệt về chất lượng và nguồn gốc xuất xứ trước khi được phép bán.</p><h2>4. Sở hữu trí tuệ</h2><p>Toàn bộ nội dung trên EduMart (logo, bài viết, hình ảnh) thuộc quyền sở hữu của EduMart hoặc được cấp phép hợp lệ.</p><h2>5. Giới hạn trách nhiệm</h2><p>EduMart không chịu trách nhiệm về thiệt hại gián tiếp phát sinh từ việc sử dụng dịch vụ.</p><h2>6. Thay đổi điều khoản</h2><p>EduMart có quyền cập nhật điều khoản này bất cứ lúc nào. Người dùng sẽ được thông báo qua email.</p>'},
    privacy:{title:'Chính sách bảo mật',updatedAt:'01/06/2025',content:'<h2>1. Thông tin chúng tôi thu thập</h2><p>EduMart thu thập thông tin bạn cung cấp khi đăng ký (họ tên, email, số điện thoại) và dữ liệu sử dụng dịch vụ.</p><h2>2. Mục đích sử dụng thông tin</h2><ul><li>Xử lý đơn hàng và thanh toán</li><li>Gửi thông báo về đơn hàng và khuyến mãi</li><li>Cải thiện chất lượng dịch vụ</li><li>Tuân thủ quy định pháp luật</li></ul><h2>3. Bảo vệ thông tin</h2><p>Chúng tôi sử dụng mã hóa SSL và các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ dữ liệu của bạn.</p><h2>4. Chia sẻ thông tin</h2><p>EduMart không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ với đối tác vận chuyển khi cần thiết để giao hàng.</p><h2>5. Quyền của người dùng</h2><p>Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân bằng cách liên hệ privacy@edumart.vn.</p>'},
    returns:{title:'Chính sách đổi/trả',updatedAt:'01/06/2025',content:'<h2>1. Điều kiện đổi/trả hàng</h2><p>EduMart chấp nhận đổi/trả trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng nếu sản phẩm có lỗi từ nhà sản xuất hoặc không đúng mô tả.</p><h2>2. Sản phẩm không được đổi/trả</h2><ul><li>Ebook và sản phẩm số (sau khi đã tải xuống)</li><li>Sách đã bị hư hỏng do người mua</li><li>Sản phẩm không có tem/nhãn hoặc đã bị tháo gỡ</li></ul><h2>3. Quy trình đổi/trả</h2><ol><li>Liên hệ hỗ trợ qua hotline 1800 1234 hoặc email support@edumart.vn</li><li>Cung cấp mã đơn hàng và ảnh chụp sản phẩm lỗi</li><li>Chờ xác nhận từ EduMart trong 24 giờ</li><li>Gửi hàng về kho EduMart (chi phí vận chuyển do EduMart chịu)</li></ol><h2>4. Hoàn tiền</h2><p>Sau khi nhận và kiểm tra hàng trả về, EduMart sẽ hoàn tiền trong vòng <strong>3–5 ngày làm việc</strong> qua phương thức thanh toán ban đầu.</p>'}
  };
  LS.set('cmsStaticPages',cmsStaticPages);
}
function saveCmsStaticPages(){LS.set('cmsStaticPages',cmsStaticPages);}

// ===== Promotion: Vouchers =====
let promoVouchers=LS.get('promoVouchers',null);
if(!promoVouchers){
  promoVouchers=[
    {id:'VC-001',code:'EDUBACK25',name:'Khai giảng Back to School',type:'percent',value:25,minOrder:200000,maxDiscount:80000,categories:['all'],maxUsage:1000,usedCount:342,startDate:'01/06/2025',endDate:'30/06/2025',status:'active',desc:'Giảm 25% cho tất cả đơn hàng từ 200k',createdAt:'01/06/2025'},
    {id:'VC-002',code:'SACHHE20',name:'Sách hè 20%',type:'percent',value:20,minOrder:150000,maxDiscount:60000,categories:['sach'],maxUsage:500,usedCount:198,startDate:'15/06/2025',endDate:'15/07/2025',status:'active',desc:'Giảm 20% danh mục Sách',createdAt:'10/06/2025'},
    {id:'VC-003',code:'FLAT50K',name:'Giảm 50k đơn từ 300k',type:'fixed',value:50000,minOrder:300000,maxDiscount:50000,categories:['all'],maxUsage:200,usedCount:200,startDate:'01/06/2025',endDate:'20/06/2025',status:'active',desc:'Giảm thẳng 50.000đ',createdAt:'01/06/2025'},
    {id:'VC-004',code:'NEWUSER30',name:'Chào người dùng mới',type:'percent',value:30,minOrder:0,maxDiscount:100000,categories:['all'],maxUsage:9999,usedCount:1024,startDate:'01/01/2025',endDate:'31/12/2025',status:'inactive',desc:'Voucher tặng cho user mới đăng ký',createdAt:'01/01/2025'},
    {id:'VC-005',code:'VPPFREE15',name:'VPP giảm 15%',type:'percent',value:15,minOrder:100000,maxDiscount:30000,categories:['vpp'],maxUsage:300,usedCount:87,startDate:'01/06/2025',endDate:'30/06/2025',status:'active',desc:'Giảm 15% văn phòng phẩm',createdAt:'01/06/2025'},
    {id:'VC-006',code:'GIAOVIEN40',name:'Ưu đãi giáo viên 40%',type:'percent',value:40,minOrder:200000,maxDiscount:120000,categories:['sach','tbgd'],maxUsage:100,usedCount:34,startDate:'15/11/2025',endDate:'25/11/2025',status:'active',desc:'Dành riêng cho giáo viên dịp 20/11',createdAt:'10/11/2025'},
    {id:'VC-007',code:'SUMMER25',name:'Hè rực rỡ 25%',type:'percent',value:25,minOrder:100000,maxDiscount:50000,categories:['all'],maxUsage:1000,usedCount:956,startDate:'01/05/2025',endDate:'31/05/2025',status:'expired',desc:'Voucher mùa hè 2025',createdAt:'01/05/2025'},
    {id:'VC-008',code:'EBOOK10',name:'Ebook & Sách nói giảm 10%',type:'percent',value:10,minOrder:50000,maxDiscount:30000,categories:['ebook','audiobook'],maxUsage:2000,usedCount:445,startDate:'01/06/2025',endDate:'31/07/2025',status:'active',desc:'Giảm 10% ebook và sách nói',createdAt:'01/06/2025'}
  ];
  LS.set('promoVouchers',promoVouchers);
}
function savePromoVouchers(){LS.set('promoVouchers',promoVouchers);}

// ===== Promotion: Flash Sales =====
let promoFlashSales=LS.get('promoFlashSales',null);
if(!promoFlashSales){
  promoFlashSales=[
    {id:'FS-001',name:'Flash Sale Khai Giảng 2025',startTime:'2025-06-01T08:00',endTime:'2025-06-01T22:00',status:'ended',desc:'Flash Sale mừng khai giảng năm học mới',totalRevenue:48600000,totalSold:312,endedEarlyAt:null,createdAt:'28/05/2025',
      products:[
        {productId:1,productName:'Bộ SGK lớp 6 - Kết nối tri thức',sellerName:'NXB Giáo Dục',originalPrice:187000,salePrice:130000,saleQty:80,soldQty:80,status:'approved'},
        {productId:2,productName:'Dế Mèn phiêu lưu ký',sellerName:'NXB Kim Đồng',originalPrice:45000,salePrice:30000,saleQty:100,soldQty:97,status:'approved'},
        {productId:5,productName:'Atomic Habits - Thay đổi tí hon',sellerName:'NXB Thế Giới',originalPrice:145000,salePrice:99000,saleQty:50,soldQty:50,status:'approved'},
        {productId:7,productName:'Combo bút bi Thiên Long 20 cây',sellerName:'Thiên Long',originalPrice:48000,salePrice:35000,saleQty:150,soldQty:85,status:'approved'}
      ]
    },
    {id:'FS-002',name:'Flash Sale Giữa Tuần',startTime:'2025-06-18T12:00',endTime:'2025-06-18T18:00',status:'ended',desc:'Flash Sale mid-week giảm sốc',totalRevenue:21700000,totalSold:180,endedEarlyAt:null,createdAt:'16/06/2025',
      products:[
        {productId:3,productName:'Tư duy nhanh và chậm',sellerName:'NXB Trẻ',originalPrice:169000,salePrice:120000,saleQty:60,soldQty:60,status:'approved'},
        {productId:6,productName:'Luyện thi THPT QG môn Toán',sellerName:'NXB ĐHQG',originalPrice:95000,salePrice:70000,saleQty:100,soldQty:72,status:'approved'},
        {productId:8,productName:'Vở Campus 200 trang (lốc 10)',sellerName:'Campus',originalPrice:102000,salePrice:75000,saleQty:80,soldQty:48,status:'approved'}
      ]
    },
    {id:'FS-003',name:'Flash Sale 20/11 Tri Ân Giáo Viên',startTime:'2025-11-20T07:00',endTime:'2025-11-20T23:59',status:'upcoming',desc:'Tri ân thầy cô nhân ngày Nhà giáo Việt Nam',totalRevenue:0,totalSold:0,endedEarlyAt:null,createdAt:'18/11/2025',
      products:[
        {productId:4,productName:'Mắt biếc',sellerName:'NXB Trẻ',originalPrice:88000,salePrice:65000,saleQty:200,soldQty:0,status:'approved'},
        {productId:9,productName:'Bộ bút màu Colokit 24 màu',sellerName:'Colokit',originalPrice:65000,salePrice:45000,saleQty:100,soldQty:0,status:'pending'},
        {productId:10,productName:'Balo chống gù Hami',sellerName:'Hami',originalPrice:320000,salePrice:249000,saleQty:50,soldQty:0,status:'pending'},
        {productId:1,productName:'Bộ SGK lớp 6 - Kết nối tri thức',sellerName:'NXB Giáo Dục',originalPrice:187000,salePrice:150000,saleQty:100,soldQty:0,status:'rejected'}
      ]
    }
  ];
  LS.set('promoFlashSales',promoFlashSales);
}
function savePromoFlashSales(){LS.set('promoFlashSales',promoFlashSales);}

// ===== Promotion: Points Config =====
let promoPoints=LS.get('promoPoints',null);
if(!promoPoints){
  promoPoints={
    earnRate:10000,
    redeemThreshold:100,
    redeemPoints:100,
    redeemVoucherPct:5,
    redeemMinOrder:100000,
    pointExpireDays:365,
    tiers:[
      {name:'Đồng',minPoints:0,badge:'🥉',multiplier:1,perks:'Tích điểm x1'},
      {name:'Bạc',minPoints:500,badge:'🥈',multiplier:1.2,perks:'Tích điểm x1.2, Miễn phí ship đơn từ 200k'},
      {name:'Vàng',minPoints:2000,badge:'🥇',multiplier:1.5,perks:'Tích điểm x1.5, Voucher sinh nhật 10%, Hoàn tiền 2%'},
      {name:'Kim Cương',minPoints:5000,badge:'💎',multiplier:2,perks:'Tích điểm x2, Miễn phí ship mọi đơn, Ưu tiên CSKH'}
    ],
    stats:{totalIssued:1248540,totalRedeemed:432100,totalExpired:87420,totalActiveUsers:8420,totalVouchersGenerated:4321,avgPointsPerUser:148},
    updatedAt:'01/06/2025'
  };
  LS.set('promoPoints',promoPoints);
}
function savePromoPoints(){LS.set('promoPoints',promoPoints);}

// ===== Email & Notifications =====
let emailCampaigns=LS.get('emailCampaigns',null);
if(!emailCampaigns){
  emailCampaigns=[
    {id:'EM-001',subject:'Thông báo khai giảng năm học 2025–2026',targetGroup:'all',targetCount:15420,sentAt:'05/08/2025',sentBy:'Admin',status:'sent',content:'<h2>Chuẩn bị cho năm học mới!</h2><p>EduMart trân trọng thông báo các chương trình ưu đãi mừng khai giảng năm học 2025–2026. Hãy ghé thăm sàn để nhận voucher giảm 25%.</p>',stats:{sent:15420,opened:7242,clicked:2150,bounced:312,unsubscribed:48}},
    {id:'EM-002',subject:'🎁 Flash Sale 20/11 — Tri ân thầy cô giáo',targetGroup:'all',targetCount:15420,sentAt:'18/11/2025',sentBy:'Admin',status:'sent',content:'<h2>Flash Sale tri ân Ngày Nhà giáo Việt Nam</h2><p>Nhân dịp 20/11, EduMart tổ chức Flash Sale đặc biệt với hàng nghìn sản phẩm giảm giá sâu từ 30–60%.</p>',stats:{sent:15420,opened:9105,clicked:4320,bounced:289,unsubscribed:31}},
    {id:'EM-003',subject:'🥇 Chúc mừng bạn đã đạt hạng Vàng!',targetGroup:'buyer',targetCount:4231,sentAt:'01/06/2025',sentBy:'Admin',status:'sent',content:'<h2>Chào mừng bạn gia nhập hạng Vàng</h2><p>Bạn đã tích lũy đủ 2.000 điểm để lên hạng Vàng. Từ nay bạn được hưởng hệ số tích điểm x1.5 và voucher sinh nhật đặc biệt.</p>',stats:{sent:4231,opened:3105,clicked:1820,bounced:87,unsubscribed:12}},
    {id:'EM-004',subject:'📈 Bí quyết tăng doanh số cho Seller EduMart',targetGroup:'seller',targetCount:892,sentAt:'15/06/2025',sentBy:'Admin',status:'sent',content:'<h2>Tối ưu gian hàng để tăng doanh thu</h2><p>Chúng tôi tổng hợp 5 chiến lược hiệu quả nhất giúp Seller tăng tỷ lệ chuyển đổi trên EduMart.</p>',stats:{sent:892,opened:621,clicked:298,bounced:14,unsubscribed:7}},
    {id:'EM-005',subject:'🎉 Voucher đặc biệt dành riêng cho bạn!',targetGroup:'new',targetCount:2145,sentAt:'20/06/2025',sentBy:'Admin',status:'sent',content:'<h2>Chào mừng đến với EduMart!</h2><p>Cảm ơn bạn đã đăng ký tài khoản. Sử dụng mã NEWUSER30 để được giảm 30% đơn hàng đầu tiên.</p>',stats:{sent:2145,opened:1876,clicked:1240,bounced:42,unsubscribed:19}},
    {id:'EM-006',subject:'📋 Cập nhật Điều khoản sử dụng EduMart',targetGroup:'all',targetCount:15420,sentAt:'01/06/2025',sentBy:'Admin',status:'sent',content:'<h2>Điều khoản sử dụng được cập nhật</h2><p>EduMart đã cập nhật Điều khoản sử dụng có hiệu lực từ ngày 01/07/2025. Vui lòng đọc kỹ trước khi tiếp tục sử dụng dịch vụ.</p>',stats:{sent:15420,opened:5102,clicked:2840,bounced:401,unsubscribed:88}}
  ];
  LS.set('emailCampaigns',emailCampaigns);
}
function saveEmailCampaigns(){LS.set('emailCampaigns',emailCampaigns);}

let newsletterSubs=LS.get('newsletterSubs',null);
if(!newsletterSubs){
  newsletterSubs=[
    {id:'NS-001',email:'nguyen.an@gmail.com',name:'Nguyễn An',userId:'U001',subscribedAt:'01/01/2025',status:'active',source:'register',tags:['hocsinh']},
    {id:'NS-002',email:'tran.binh@yahoo.com',name:'Trần Bình',userId:'U002',subscribedAt:'05/01/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-003',email:'le.cam@outlook.com',name:'Lê Cẩm',userId:'U003',subscribedAt:'10/01/2025',status:'unsubscribed',source:'register',tags:['buyer']},
    {id:'NS-004',email:'pham.dung@gmail.com',name:'Phạm Dũng',userId:'U004',subscribedAt:'12/01/2025',status:'active',source:'register',tags:['seller']},
    {id:'NS-005',email:'hoang.em@gmail.com',name:'Hoàng Em',userId:'U005',subscribedAt:'15/01/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-006',email:'vu.phuong@gmail.com',name:'Vũ Phương',userId:'U006',subscribedAt:'18/01/2025',status:'active',source:'manual',tags:['giaovien']},
    {id:'NS-007',email:'do.giang@gmail.com',name:'Đỗ Giang',userId:'U007',subscribedAt:'20/01/2025',status:'unsubscribed',source:'register',tags:['sinhvien']},
    {id:'NS-008',email:'bui.huong@gmail.com',name:'Bùi Hương',userId:'U008',subscribedAt:'22/01/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-009',email:'ngo.ich@gmail.com',name:'Ngô Ích',userId:'U009',subscribedAt:'25/01/2025',status:'active',source:'register',tags:['seller']},
    {id:'NS-010',email:'dinh.khanh@gmail.com',name:'Đinh Khánh',userId:'U010',subscribedAt:'28/01/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-011',email:'trinh.lan@gmail.com',name:'Trịnh Lan',userId:'U011',subscribedAt:'01/02/2025',status:'unsubscribed',source:'register',tags:['buyer']},
    {id:'NS-012',email:'cao.minh@gmail.com',name:'Cao Minh',userId:'U012',subscribedAt:'05/02/2025',status:'active',source:'manual',tags:['giaovien']},
    {id:'NS-013',email:'ly.nga@gmail.com',name:'Lý Nga',userId:'U013',subscribedAt:'10/02/2025',status:'active',source:'register',tags:['hocsinh']},
    {id:'NS-014',email:'thai.oanh@gmail.com',name:'Thái Oanh',userId:'U014',subscribedAt:'15/02/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-015',email:'ha.phat@gmail.com',name:'Hà Phát',userId:'U015',subscribedAt:'20/02/2025',status:'active',source:'register',tags:['seller']},
    {id:'NS-016',email:'truc.quoc@gmail.com',name:'Trúc Quốc',userId:'U016',subscribedAt:'01/03/2025',status:'active',source:'checkout',tags:['buyer']},
    {id:'NS-017',email:'mai.rong@gmail.com',name:'Mai Rồng',userId:'U017',subscribedAt:'05/03/2025',status:'unsubscribed',source:'register',tags:['buyer']},
    {id:'NS-018',email:'truong.son@gmail.com',name:'Trương Sơn',userId:'U018',subscribedAt:'10/03/2025',status:'active',source:'manual',tags:['seller']},
    {id:'NS-019',email:'vo.tam@gmail.com',name:'Võ Tâm',userId:'U019',subscribedAt:'15/03/2025',status:'active',source:'register',tags:['hocsinh']},
    {id:'NS-020',email:'chu.uan@gmail.com',name:'Chử Uẩn',userId:'U020',subscribedAt:'20/03/2025',status:'active',source:'checkout',tags:['buyer']}
  ];
  LS.set('newsletterSubs',newsletterSubs);
}
function saveNewsletterSubs(){LS.set('newsletterSubs',newsletterSubs);}

// ---- System Config seed ----
let sysConfig=LS.get('sysConfig',null);
if(!sysConfig){
  sysConfig={
    siteName:'EduMart',siteDesc:'Sàn thương mại điện tử sách & thiết bị giáo dục hàng đầu Việt Nam',
    logoUrl:'/logo.png',faviconUrl:'/favicon.ico',
    email:'support@edumart.vn',phone:'1900 1234',
    address:'123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    facebook:'https://facebook.com/edumart.vn',zalo:'0901234567',
    timezone:'Asia/Ho_Chi_Minh',currency:'VND',currencySymbol:'đ',dateFormat:'DD/MM/YYYY',
    modules:{ebook:true,vpp:true,tbgd:true,audiobook:true,blog:true,flashsale:true,voucher:true,points:true,review:true,chat:false}
  };
  LS.set('sysConfig',sysConfig);
}
function saveSysConfig(){LS.set('sysConfig',sysConfig);}

let sysPayment=LS.get('sysPayment',null);
if(!sysPayment){
  sysPayment={
    gateways:[
      {id:'momo',name:'MoMo',icon:'💜',enabled:true,clientId:'MOMOPAY_PARTNER_CODE',secretKey:'momo_secret_key_***',env:'sandbox',desc:'Ví điện tử MoMo'},
      {id:'zalopay',name:'ZaloPay',icon:'🔵',enabled:true,clientId:'553035',secretKey:'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',env:'sandbox',desc:'Ví ZaloPay / ZaloPay Gateway'},
      {id:'vnpay',name:'VNPAY',icon:'🔴',enabled:false,clientId:'EDUMART01',secretKey:'EDUMARTSECRETKEY2025',env:'production',desc:'Cổng thanh toán VNPAY (ATM, Visa, Master)'}
    ],
    shipping:{
      freeThreshold:300000,
      regions:[
        {id:'hcm',name:'TP. Hồ Chí Minh',fee:20000},
        {id:'hn',name:'Hà Nội',fee:25000},
        {id:'central',name:'Miền Trung',fee:35000},
        {id:'north',name:'Miền Bắc (ngoài HN)',fee:40000},
        {id:'south',name:'Miền Nam (ngoài HCM)',fee:35000},
        {id:'remote',name:'Vùng xa / Hải đảo',fee:60000}
      ]
    },
    tax:{vatEnabled:true,vatRate:10,vatIncluded:false,taxCode:'0312345678',companyName:'Công ty Cổ phần EduMart',taxAddress:'123 Nguyễn Huệ, Q.1, TP.HCM'}
  };
  LS.set('sysPayment',sysPayment);
}
function saveSysPayment(){LS.set('sysPayment',sysPayment);}

let sysOAuth=LS.get('sysOAuth',null);
if(!sysOAuth){
  sysOAuth={
    google:{enabled:true,clientId:'123456789-abcdefghijk.apps.googleusercontent.com',clientSecret:'GOCSPX-secretkey_placeholder',redirectUri:'https://edumart.vn/auth/google/callback'},
    facebook:{enabled:false,appId:'1234567890123456',appSecret:'fb_appsecret_placeholder',redirectUri:'https://edumart.vn/auth/facebook/callback'}
  };
  LS.set('sysOAuth',sysOAuth);
}
function saveSysOAuth(){LS.set('sysOAuth',sysOAuth);}

function escHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function _admLevelLbl(l){return {super:'Toàn quyền',readonly:'Chỉ xem',content:'Nội dung'}[l]||l;}
function fmtMil(n){if(n>=1e9)return (n/1e9).toFixed(1).replace('.',',')+'B';if(n>=1e6)return Math.round(n/1e6)+'M';return n.toLocaleString('vi-VN');}
function fmtBig(n){return Number(n).toLocaleString('vi-VN');}
function admGrowth(g){const up=g>=0;return '<span class="adm-growth '+(up?'up':'dn')+'">'+(up?'▲':'▼')+Math.abs(g)+'%</span>';}

function adminContent(){
  if(acctTab==='adm-users')   return adminUsers();
  if(acctTab==='adm-products')return adminProducts();
  if(acctTab==='adm-orders')  return adminOrdersMgmt();
  if(acctTab==='adm-finance') return adminFinance();
  if(acctTab==='adm-cms')     return adminCms();
  if(acctTab==='adm-promo')   return adminPromo();
  if(acctTab==='adm-notif')    return adminNotif();
  if(acctTab==='adm-settings') return adminSettings();
  if(acctTab==='adm-shops')   return adminShops();
  return adminOverview();
}
function adminOverview(){
  const d=adminDays, g=ADM.growth[d];
  const rev=ADM.perDay.revenue*d;
  const KPIC={
    users:'<circle cx="10" cy="7" r="4"/><path d="M2 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    sellers:'<path d="M3 9l1-5h16l1 5M5 9v11h14V9M9 14h6"/>',
    products:'<path d="M4 19V7l8-4 8 4v12l-8 4-8-4Z"/><path d="M12 3v18M4 7l8 4 8-4"/>',
    revenue:'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
  };
  const kpis=[
    {lbl:'Người dùng', val:fmtBig(ADM.totals.users),   sub:'+'+fmtBig(Math.round(ADM.perDay.users*d))+' kỳ này',       g:g.users,   ic:'users'},
    {lbl:'Người bán',  val:fmtBig(ADM.totals.sellers),  sub:'+'+Math.round(d*1.4)+' kỳ này',                            g:g.sellers, ic:'sellers'},
    {lbl:'Sản phẩm',   val:fmtBig(ADM.totals.products), sub:'+'+fmtBig(Math.round(d*38))+' kỳ này',                     g:g.products,ic:'products'},
    {lbl:'Doanh thu',  val:fmtMil(rev)+'đ',             sub:'trong '+d+' ngày',                                         g:g.revenue, ic:'revenue'}
  ];
  const kpiHtml=kpis.map(k=>
    '<div class="adm-kpi">'+
      '<div class="adm-kpi-top">'+
        '<div class="adm-kpi-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">'+KPIC[k.ic]+'</svg></div>'+
        admGrowth(k.g)+
      '</div>'+
      '<div class="adm-kpi-val">'+k.val+'</div>'+
      '<div class="adm-kpi-lbl">'+k.lbl+'</div>'+
      '<div class="adm-kpi-sub">'+k.sub+'</div>'+
    '</div>'
  ).join('');

  const ACT_IC={
    reg:'<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>',
    shop:'<path d="M3 9l1-5h16l1 5M5 9v11h14V9"/>',
    order:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>'
  };
  const ACT_CLR={reg:'#2980b9',shop:'#e67e22',order:'#27ae60'};
  const actHtml=ADM.act.map(a=>
    '<div class="adm-act-row">'+
      '<div class="adm-act-ic" style="background:'+ACT_CLR[a.tp]+'18;color:'+ACT_CLR[a.tp]+'">'+
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">'+ACT_IC[a.tp]+'</svg>'+
      '</div>'+
      '<div class="adm-act-body"><div class="adm-act-text">'+a.text+'</div></div>'+
      '<div class="adm-act-time">'+a.t+' trước</div>'+
    '</div>'
  ).join('');

  const maxRev=ADM.shops[0].rev;
  const shopsHtml=ADM.shops.map((s,i)=>
    '<div class="adm-shop-row">'+
      '<div class="adm-shop-rank">'+(i+1)+'</div>'+
      '<div class="adm-shop-info">'+
        '<div class="adm-shop-name">'+s.name+'</div>'+
        '<div class="adm-bar-wrap"><div class="adm-bar-fill" style="width:'+(s.rev/maxRev*100).toFixed(0)+'%"></div></div>'+
      '</div>'+
      '<div class="adm-shop-stats">'+
        '<div class="adm-shop-rev">'+fmtMil(s.rev)+'đ</div>'+
        '<div class="adm-shop-orders">'+fmtBig(s.orders)+' đơn</div>'+
        admGrowth(s.g)+
      '</div>'+
    '</div>'
  ).join('');

  const catsHtml=ADM.cats.map(c=>
    '<div class="adm-cat-row">'+
      '<div class="adm-cat-dot" style="background:'+c.clr+'"></div>'+
      '<div class="adm-cat-name">'+c.name+'</div>'+
      '<div class="adm-bar-wrap"><div class="adm-bar-fill" style="width:'+c.pct+'%;background:'+c.clr+'"></div></div>'+
      '<div class="adm-cat-pct">'+c.pct+'%</div>'+
      '<div class="adm-cat-rev">'+fmtMil(rev*c.pct/100)+'đ</div>'+
    '</div>'
  ).join('');

  const rangeHtml=[7,30,90].map(n=>
    '<button class="adm-range-btn'+(adminDays===n?' on':'')+'" onclick="adminDays='+n+';acctTab=\'dashboard\';renderAccount()">'+n+' ngày</button>'
  ).join('');

  return '<div class="adm-header">'+
      '<div><h2 class="adm-title">Tổng quan hệ thống</h2><p class="adm-subtitle">EduMart Admin · '+todayStr()+'</p></div>'+
      '<div class="adm-range">'+rangeHtml+'</div>'+
    '</div>'+
    '<div class="adm-kpi-grid">'+kpiHtml+'</div>'+
    '<div class="adm-2col">'+
      '<div class="acct-card">'+
        '<div class="adm-sec-hd"><h4>Hoạt động gần đây</h4><span class="adm-sec-tag live">● Trực tiếp</span></div>'+
        '<div class="adm-act-list">'+actHtml+'</div>'+
      '</div>'+
      '<div>'+
        '<div class="acct-card" style="margin-bottom:14px">'+
          '<div class="adm-sec-hd"><h4>Top 5 shop bán chạy</h4><span class="adm-sec-tag">'+d+' ngày qua</span></div>'+
          '<div class="adm-shop-list">'+shopsHtml+'</div>'+
        '</div>'+
        '<div class="acct-card">'+
          '<div class="adm-sec-hd"><h4>Phân bổ doanh thu</h4><span class="adm-sec-tag">Theo danh mục</span></div>'+
          '<div class="adm-cat-list">'+catsHtml+'</div>'+
          '<div class="adm-rev-total">Tổng '+d+' ngày: <b>'+fmtMil(rev)+'đ</b></div>'+
        '</div>'+
      '</div>'+
    '</div>';
}

/* ── ADMIN USER MANAGEMENT ─────────────────────── */
const ADM_ROLE_CLR={hocsinh:'#2980b9',sinhvien:'#8e44ad',parent:'#27ae60',school:'#e67e22',admin:'#c0392b',seller:'#795548'};
const ADM_STATUS_BADGE={
  active:'<span class="adm-badge green">Hoạt động</span>',
  locked:'<span class="adm-badge red">Bị khóa</span>',
  deleted:'<span class="adm-badge gray">Đã xóa</span>'
};
function _admStatus(u){return u.deletedAt?'deleted':(u.status||'active');}

function adminUsers(){
  if(admUsersView==='detail'&&admSelectedUserId)return adminUserDetail(admSelectedUserId);
  if(admUsersView==='new-admin')return adminNewAdminForm();
  return adminUserList();
}

function _admFiltered(){
  const q=(admUserSearch||'').toLowerCase().trim();
  return authUsers.filter(u=>{
    const st=_admStatus(u);
    if(admUserStatusFilter!=='all'&&st!==admUserStatusFilter)return false;
    if(admUserRoleFilter!=='all'&&u.role!==admUserRoleFilter)return false;
    if(q&&!(u.name||'').toLowerCase().includes(q)&&!(u.email||'').toLowerCase().includes(q))return false;
    return true;
  });
}

function adminUserList(){
  const all=_admFiltered();
  const PER=10, pages=Math.max(1,Math.ceil(all.length/PER));
  if(admUserPage>=pages)admUserPage=pages-1;
  const slice=all.slice(admUserPage*PER,(admUserPage+1)*PER);

  const rows=slice.map(u=>{
    const st=_admStatus(u);
    const clr=ADM_ROLE_CLR[u.role]||'#888';
    const av=u.name?.charAt(0)?.toUpperCase()||'?';
    const rowIsMe=user&&u.id===user.id;
    const lockQuick=rowIsMe||st==='deleted'?''
      :st==='locked'
        ?'<button class="adm-row-btn adm-unlock-btn" title="Mở khóa tài khoản này" onclick="event.stopPropagation();doAdminUnlock(\''+u.id+'\')">Mở khóa</button>'
        :'<button class="adm-row-btn adm-lock-btn" title="Khóa tài khoản này" onclick="event.stopPropagation();doAdminLock(\''+u.id+'\')">Khóa</button>';
    return '<tr class="adm-usr-row" onclick="admSelectedUserId=\''+u.id+'\';admUsersView=\'detail\';renderAccount()">'+
      '<td><div class="adm-usr-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div></td>'+
      '<td><div class="adm-usr-nm">'+escHtml(u.name||'—')+'</div><div class="adm-usr-em">'+escHtml(u.email||'—')+'</div></td>'+
      '<td><span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(ROLELBL[u.role]||u.role)+'</span>'+
        (u.adminLevel?' <span class="adm-badge gray">'+_admLevelLbl(u.adminLevel)+'</span>':'')+
      '</td>'+
      '<td>'+ADM_STATUS_BADGE[st]+'</td>'+
      '<td class="adm-usr-date">'+(u.createdAt||'—')+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admSelectedUserId=\''+u.id+'\';admUsersView=\'detail\';renderAccount()">Xem</button>'+
        lockQuick+
      '</td>'+
    '</tr>';
  }).join('');

  const roleOpts=['all','admin','hocsinh','sinhvien','parent','school','seller'].map(k=>
    '<option value="'+k+'"'+(admUserRoleFilter===k?' selected':'')+'>'+
    (k==='all'?'Tất cả vai trò':(ROLELBL[k]||k))+'</option>').join('');
  const stOpts=[['all','Tất cả trạng thái'],['active','Hoạt động'],['locked','Bị khóa'],['deleted','Đã xóa']].map(([v,l])=>
    '<option value="'+v+'"'+(admUserStatusFilter===v?' selected':'')+'>'+l+'</option>').join('');

  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admUserPage===0?'disabled':'')+' onclick="admUserPage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admUserPage+1)+'/'+pages+' · <b>'+all.length+'</b> người dùng</span>'+
    '<button class="adm-pager-btn" '+(admUserPage>=pages-1?'disabled':'')+' onclick="admUserPage++;renderAccount()">Tiếp →</button>'+
  '</div>';

  return '<div class="adm-sec-hd" style="margin-bottom:14px">'+
      '<h3 style="margin:0;font-size:17px;font-family:\'Lora\',serif;color:var(--ink-deep)">Quản lý người dùng</h3>'+
      '<button class="btn-primary" style="padding:8px 16px;font-size:13px" onclick="admUsersView=\'new-admin\';admSelectedUserId=null;renderAccount()">+ Tạo Admin mới</button>'+
    '</div>'+
    '<div class="adm-usr-toolbar">'+
      '<input class="adm-usr-search" placeholder="Tìm theo tên hoặc email..." value="'+escHtml(admUserSearch)+'" oninput="admUserSearch=this.value;admUserPage=0;renderAccount()">'+
      '<select class="adm-usr-filter" onchange="admUserRoleFilter=this.value;admUserPage=0;renderAccount()">'+roleOpts+'</select>'+
      '<select class="adm-usr-filter" onchange="admUserStatusFilter=this.value;admUserPage=0;renderAccount()">'+stOpts+'</select>'+
      '<button class="adm-row-btn" onclick="admUserSearch=\'\';admUserRoleFilter=\'all\';admUserStatusFilter=\'all\';admUserPage=0;renderAccount()">Xóa lọc</button>'+
    '</div>'+
    '<div class="adm-table-wrap"><table class="adm-usr-table">'+
      '<thead><tr><th></th><th>Người dùng</th><th>Vai trò</th><th>Trạng thái</th><th>Ngày tạo</th><th></th></tr></thead>'+
      '<tbody>'+rows+'</tbody>'+
    '</table></div>'+
    pager;
}

function adminUserDetail(uid){
  const u=authUsers.find(x=>x.id===uid);
  if(!u)return '<p>Không tìm thấy người dùng.</p>';
  const st=_admStatus(u);
  const clr=ADM_ROLE_CLR[u.role]||'#888';
  const av=u.name?.charAt(0)?.toUpperCase()||'?';
  const isMe=user&&u.id===user.id;
  const isDeleted=st==='deleted', isLocked=st==='locked';

  const statusBadge=isDeleted
    ?ADM_STATUS_BADGE.deleted
    :isLocked
    ?'<span class="adm-badge red">Bị khóa — '+escHtml(u.lockedReason||'')+'</span>'
    :ADM_STATUS_BADGE.active;

  const roleSelect='<select id="admChangeRole" class="adm-usr-filter">'+
    ['hocsinh','sinhvien','parent','school','admin'].map(k=>
      '<option value="'+k+'"'+(u.role===k?' selected':'')+'>'+ROLELBL[k]+'</option>'
    ).join('')+'</select>';

  const levelSection=u.role==='admin'
    ?'<div class="adm-detail-section">'+
        '<div class="adm-detail-label">Cấp quyền Admin</div>'+
        '<div class="adm-level-row">'+
          [['super','Toàn quyền'],['readonly','Chỉ xem'],['content','Nội dung']].map(([v,l])=>
            '<button class="adm-level-btn'+(( u.adminLevel||'super')===v?' on':'')+'" onclick="doAdminSetLevel(\''+uid+'\',\''+v+'\')">'+l+'</button>'
          ).join('')+
        '</div>'+
      '</div>'
    :'';

  const lockBtn=isDeleted?'':isLocked
    ?'<button class="adm-act-btn green" onclick="doAdminUnlock(\''+uid+'\')">Mở khóa tài khoản</button>'
    :(isMe?'':'<button class="adm-act-btn red" onclick="doAdminLock(\''+uid+'\')">Khóa tài khoản</button>');
  const deleteBtn=isDeleted||isMe?'':'<button class="adm-act-btn red-outline" onclick="doAdminDelete(\''+uid+'\')">Xóa mềm</button>';
  const restoreBtn=isDeleted?'<button class="adm-act-btn green" onclick="doAdminRestore(\''+uid+'\')">Khôi phục</button>':'';

  return '<button class="adm-back-btn" onclick="admUsersView=\'list\';renderAccount()">← Danh sách người dùng</button>'+
    '<div class="adm-detail-card">'+
      '<div class="adm-detail-head">'+
        '<div class="adm-detail-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div>'+
        '<div style="flex:1">'+
          '<div class="adm-detail-name">'+escHtml(u.name||'—')+
            (isMe?' <span style="font-size:12px;color:var(--text-soft)">(bạn)</span>':'')+
          '</div>'+
          '<div class="adm-detail-email">'+escHtml(u.email||'—')+'</div>'+
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'+
            '<span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(ROLELBL[u.role]||u.role)+'</span>'+
            (u.adminLevel?'<span class="adm-badge gray">'+_admLevelLbl(u.adminLevel)+'</span>':'')+
            statusBadge+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-detail-grid">'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Ngày tạo</div><div class="adm-detail-val">'+(u.createdAt||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Điểm thưởng</div><div class="adm-detail-val">'+(u.points||0).toLocaleString('vi-VN')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Số điện thoại</div><div class="adm-detail-val">'+(u.phone||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Mã giới thiệu</div><div class="adm-detail-val">'+(u.ref||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Đăng nhập qua</div><div class="adm-detail-val">'+(u.provider?u.provider.charAt(0).toUpperCase()+u.provider.slice(1):'Email & Mật khẩu')+'</div></div>'+
        (u.lockHistory?'<div class="adm-detail-item"><div class="adm-detail-label">Lần bị khóa</div><div class="adm-detail-val">'+u.lockHistory+' lần</div></div>':'')+
        (u.lockedAt?'<div class="adm-detail-item"><div class="adm-detail-label">Khóa lúc</div><div class="adm-detail-val">'+u.lockedAt+'</div></div>':'')+
        (u.deletedAt?'<div class="adm-detail-item"><div class="adm-detail-label">Xóa lúc</div><div class="adm-detail-val">'+u.deletedAt+'</div></div>':'')+
      '</div>'+
      levelSection+
      '<div class="adm-detail-section">'+
        '<div class="adm-detail-label">Đổi vai trò</div>'+
        '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;align-items:center">'+
          roleSelect+
          '<button class="adm-act-btn" onclick="doAdminChangeRole(\''+uid+'\')">Áp dụng</button>'+
        '</div>'+
      '</div>'+
      '<div class="adm-detail-actions">'+
        '<button class="adm-act-btn" onclick="doAdminResetPw(\''+uid+'\')">Reset mật khẩu</button>'+
        lockBtn+deleteBtn+restoreBtn+
      '</div>'+
    '</div>';
}

function adminNewAdminForm(){
  return '<button class="adm-back-btn" onclick="admUsersView=\'list\';renderAccount()">← Danh sách người dùng</button>'+
    '<div class="adm-detail-card">'+
      '<h3 style="margin:0 0 20px;font-family:\'Lora\',serif;color:var(--ink-deep)">Tạo tài khoản Admin mới</h3>'+
      '<div class="form-row">'+
        '<div class="form-field"><label>Họ và tên</label><input id="naName" placeholder="Nguyễn Văn Admin"></div>'+
        '<div class="form-field"><label>Email</label><input id="naEmail" type="email" placeholder="admin@edumart.vn"></div>'+
      '</div>'+
      '<div class="form-row">'+
        '<div class="form-field"><label>Mật khẩu</label><input id="naPw" type="password" placeholder="Tối thiểu 8 ký tự"></div>'+
        '<div class="form-field"><label>Xác nhận mật khẩu</label><input id="naPw2" type="password" placeholder="Nhập lại"></div>'+
      '</div>'+
      '<div class="form-field"><label>Cấp quyền Admin</label>'+
        '<div class="adm-level-cards" id="naLevelGroup">'+
          [['super','Toàn quyền','Truy cập và chỉnh sửa mọi tính năng, bao gồm quản lý admin khác'],
           ['readonly','Chỉ xem','Xem báo cáo và dữ liệu, không thể thay đổi'],
           ['content','Quản lý nội dung','Duyệt sản phẩm, shop, nội dung — không thể quản lý tài khoản']].map(([v,l,d],i)=>
            '<label class="adm-level-card'+(i===0?' on':'')+'" onclick="document.querySelectorAll(\'.adm-level-card\').forEach(x=>x.classList.remove(\'on\'));this.classList.add(\'on\')">'+
              '<input type="radio" name="naLevel" value="'+v+'"'+(i===0?' checked':'')+' style="display:none" onchange="">'+
              '<div class="adm-level-lbl">'+l+'</div>'+
              '<div class="adm-level-desc">'+d+'</div>'+
            '</label>'
          ).join('')+
        '</div>'+
      '</div>'+
      '<div id="naErr" class="field-error" style="margin-top:10px"></div>'+
      '<div style="display:flex;gap:10px;margin-top:20px">'+
        '<button class="btn-primary" onclick="doCreateAdmin()">Tạo tài khoản</button>'+
        '<button class="btn-ghost" onclick="admUsersView=\'list\';renderAccount()">Hủy</button>'+
      '</div>'+
    '</div>';
}

/* Admin user actions */
function doAdminLock(uid){
  const reason=prompt('Lý do khóa tài khoản:\n(VD: Vi phạm điều khoản, Gian lận...)','');
  if(reason===null)return;
  const idx=authUsers.findIndex(u=>u.id===uid);if(idx===-1)return;
  authUsers[idx].status='locked';
  authUsers[idx].lockedReason=reason.trim()||'Vi phạm điều khoản sử dụng';
  authUsers[idx].lockedAt=todayStr();
  authUsers[idx].lockHistory=(authUsers[idx].lockHistory||0)+1;
  saveAuthUsers();
  toast('Đã khóa: '+authUsers[idx].name);renderAccount();
}
function doAdminUnlock(uid){
  const idx=authUsers.findIndex(u=>u.id===uid);if(idx===-1)return;
  authUsers[idx].status='active';
  delete authUsers[idx].lockedReason;delete authUsers[idx].lockedAt;
  saveAuthUsers();toast('Đã mở khóa: '+authUsers[idx].name);renderAccount();
}
function doAdminDelete(uid){
  const u=authUsers.find(x=>x.id===uid);if(!u)return;
  if(!confirm('Xóa mềm tài khoản "'+u.name+'"?\n\nTài khoản bị vô hiệu hóa nhưng lịch sử đơn hàng vẫn giữ lại.'))return;
  const idx=authUsers.findIndex(x=>x.id===uid);
  authUsers[idx].deletedAt=todayStr();authUsers[idx].status='deleted';
  saveAuthUsers();toast('Đã xóa: '+u.name);admUsersView='list';renderAccount();
}
function doAdminRestore(uid){
  const idx=authUsers.findIndex(u=>u.id===uid);if(idx===-1)return;
  delete authUsers[idx].deletedAt;authUsers[idx].status='active';
  saveAuthUsers();toast('Đã khôi phục: '+authUsers[idx].name);renderAccount();
}
function doAdminResetPw(uid){
  const u=authUsers.find(x=>x.id===uid);if(!u)return;
  const newPw='Edu@'+Math.random().toString(36).slice(2,7).toUpperCase();
  const idx=authUsers.findIndex(x=>x.id===uid);
  authUsers[idx].pwHash=hashPw(newPw);saveAuthUsers();
  alert('Mật khẩu mới của '+u.name+':\n\n'+newPw+'\n\nGửi mật khẩu này cho người dùng qua email.');
}
function doAdminChangeRole(uid){
  const sel=document.getElementById('admChangeRole');if(!sel||!sel.value)return;
  const idx=authUsers.findIndex(u=>u.id===uid);if(idx===-1)return;
  const old=authUsers[idx].role;
  authUsers[idx].role=sel.value;
  if(sel.value==='admin'&&!authUsers[idx].adminLevel)authUsers[idx].adminLevel='readonly';
  if(sel.value!=='admin')delete authUsers[idx].adminLevel;
  saveAuthUsers();
  toast('Đổi vai trò: '+ROLELBL[old]+' → '+ROLELBL[sel.value]);renderAccount();
}
function doAdminSetLevel(uid,level){
  const idx=authUsers.findIndex(u=>u.id===uid);if(idx===-1)return;
  authUsers[idx].adminLevel=level;saveAuthUsers();
  const LBLS={super:'Toàn quyền',readonly:'Chỉ xem',content:'Quản lý nội dung'};
  toast('Cập nhật cấp quyền: '+LBLS[level]);renderAccount();
}
function doCreateAdmin(){
  const name=val('naName'),email=val('naEmail').toLowerCase().trim();
  const pw=val('naPw'),pw2=val('naPw2');
  const level=document.querySelector('input[name="naLevel"]:checked')?.value||'readonly';
  if(!name){showAuthErr('naErr','Vui lòng nhập họ tên');return;}
  if(!validEmail(email)){showAuthErr('naErr','Email không hợp lệ');return;}
  if(!pw||pw.length<8){showAuthErr('naErr','Mật khẩu phải từ 8 ký tự trở lên');return;}
  if(pw!==pw2){showAuthErr('naErr','Mật khẩu xác nhận không khớp');return;}
  if(authUsers.find(u=>u.email===email)){showAuthErr('naErr','Email này đã được sử dụng');return;}
  const nu={id:'adm'+Date.now().toString(36),name,email,pwHash:hashPw(pw),role:'admin',adminLevel:level,
    points:0,phone:'',ref:refCode(name),checkin:null,streak:0,createdAt:todayStr(),status:'active'};
  authUsers.push(nu);saveAuthUsers();
  toast('Đã tạo Admin: '+name);admUsersView='list';renderAccount();
}

/* ══════════════════════════════════════════════════════════════
   ADMIN — QUẢN LÝ SẢN PHẨM
══════════════════════════════════════════════════════════════ */
const PROD_STATUS_BADGE={
  pending:'<span class="adm-badge adm-badge-orange">Chờ duyệt</span>',
  'needs-edit':'<span class="adm-badge adm-badge-blue">Cần chỉnh sửa</span>',
  approved:'<span class="adm-badge green">Đã duyệt</span>',
  rejected:'<span class="adm-badge gray">Từ chối</span>'
};
const RP_STATUS_BADGE={
  active:'<span class="adm-badge adm-badge-orange">Đang hiển thị</span>',
  hidden:'<span class="adm-badge gray">Đã ẩn</span>',
  deleted:'<span class="adm-badge red">Đã xóa</span>'
};
const RP_REVIEW_BADGE={
  pending:'<span class="adm-badge red">Chưa xử lý</span>',
  resolved:'<span class="adm-badge green">Đã xử lý</span>'
};

function adminProducts(){
  if(admProductsView==='pending-detail'&&admProductsSelectedId)return adminProductPendingDetail(admProductsSelectedId);
  return adminProductsMain();
}

function adminProductsMain(){
  const pendingCount=pendingProds.filter(p=>p.status==='pending').length;
  const reportedCount=reportedProds.filter(r=>r.reviewStatus==='pending').length;
  const tabs=[['pending','Duyệt sản phẩm mới'],['reported','Kiểm duyệt nội dung'],['categories','Quản lý danh mục']];
  const tabHtml=tabs.map(([k,l])=>
    '<button class="adm-shops-tab'+(admProductsTab===k?' on':'')+'" onclick="admProductsTab=\''+k+'\';renderAccount()">'+l+
    (k==='pending'&&pendingCount>0?' <span class="adm-tab-badge">'+pendingCount+'</span>':'')+
    (k==='reported'&&reportedCount>0?' <span class="adm-tab-badge">'+reportedCount+'</span>':'')+
    '</button>'
  ).join('');
  let content='';
  if(admProductsTab==='pending')content=adminProductsPendingList();
  else if(admProductsTab==='reported')content=adminProductsReportedList();
  else content=adminProductsCategories();
  return '<div class="adm-shops-tabs">'+tabHtml+'</div>'+content;
}

/* ── TAB 1: DUYỆT SẢN PHẨM MỚI ─────────── */
function adminProductsPendingList(){
  const q=(admPendingSearch||'').toLowerCase().trim();
  const statusOrder={pending:0,'needs-edit':1,approved:2,rejected:3};
  const list=pendingProds
    .filter(p=>!q||(p.name||'').toLowerCase().includes(q)||(p.sellerName||'').toLowerCase().includes(q))
    .sort((a,b)=>(statusOrder[a.status]||9)-(statusOrder[b.status]||9));
  const PER=8,pages=Math.max(1,Math.ceil(list.length/PER));
  if(admPendingPage>=pages)admPendingPage=pages-1;
  const slice=list.slice(admPendingPage*PER,(admPendingPage+1)*PER);
  const stats=[
    {lbl:'Chờ duyệt',val:pendingProds.filter(p=>p.status==='pending').length,clr:'#e67e22'},
    {lbl:'Cần chỉnh sửa',val:pendingProds.filter(p=>p.status==='needs-edit').length,clr:'#2980b9'},
    {lbl:'Đã duyệt',val:pendingProds.filter(p=>p.status==='approved').length,clr:'#27ae60'},
    {lbl:'Từ chối',val:pendingProds.filter(p=>p.status==='rejected').length,clr:'#c0392b'}
  ].map(s=>'<div class="adm-kpi" style="padding:14px 18px">'+
    '<div class="adm-kpi-val" style="color:'+s.clr+';font-size:24px">'+s.val+'</div>'+
    '<div class="adm-kpi-lbl">'+s.lbl+'</div>'+
  '</div>').join('');
  const rows=slice.map(p=>{
    const clr=NCC_CAT_CLR[p.cat]||'#888';
    const av=(p.name||'?').charAt(0).toUpperCase();
    return '<tr class="adm-usr-row" onclick="admProductsSelectedId=\''+p.id+'\';admProductsView=\'pending-detail\';renderAccount()">'+
      '<td><div class="adm-usr-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div></td>'+
      '<td><div class="adm-usr-nm">'+escHtml(p.name)+'</div><div class="adm-usr-em">'+escHtml(p.by)+'</div></td>'+
      '<td class="adm-usr-em">'+escHtml(p.sellerName)+'</td>'+
      '<td><span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[p.cat]||p.cat)+'</span></td>'+
      '<td style="font-weight:500">'+fmt(p.price)+'</td>'+
      '<td class="adm-usr-date">'+escHtml(p.submittedAt)+'</td>'+
      '<td>'+(PROD_STATUS_BADGE[p.status]||p.status)+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admProductsSelectedId=\''+p.id+'\';admProductsView=\'pending-detail\';renderAccount()">Xem</button>'+
        (p.status==='pending'||p.status==='needs-edit'?'<button class="adm-row-btn adm-unlock-btn" onclick="event.stopPropagation();doApproveProd(\''+p.id+'\')">Duyệt</button>':'')+
      '</td>'+
    '</tr>';
  }).join('');
  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admPendingPage===0?'disabled':'')+' onclick="admPendingPage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admPendingPage+1)+'/'+pages+' · <b>'+list.length+'</b> sản phẩm</span>'+
    '<button class="adm-pager-btn" '+(admPendingPage>=pages-1?'disabled':'')+' onclick="admPendingPage++;renderAccount()">Tiếp →</button>'+
  '</div>';
  return '<div class="adm-kpi-grid" style="margin-bottom:16px">'+stats+'</div>'+
    '<div class="adm-sec-hd" style="margin-bottom:12px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Sản phẩm chờ duyệt</h3>'+
    '</div>'+
    '<div class="adm-usr-toolbar" style="margin-bottom:12px">'+
      '<input class="adm-usr-search" placeholder="Tìm theo tên sản phẩm hoặc tên seller..." value="'+escHtml(admPendingSearch)+'" oninput="admPendingSearch=this.value;admPendingPage=0;renderAccount()">'+
      '<button class="adm-row-btn" onclick="admPendingSearch=\'\';admPendingPage=0;renderAccount()">Xóa lọc</button>'+
    '</div>'+
    '<div class="adm-table-wrap"><table class="adm-usr-table">'+
      '<thead><tr><th></th><th>Sản phẩm</th><th>Seller</th><th>Danh mục</th><th>Giá</th><th>Ngày nộp</th><th>Trạng thái</th><th></th></tr></thead>'+
      '<tbody>'+(rows||'<tr><td colspan="8" style="text-align:center;color:var(--text-soft);padding:20px">Không có sản phẩm nào</td></tr>')+'</tbody>'+
    '</table></div>'+pager;
}

function adminProductPendingDetail(id){
  const p=pendingProds.find(x=>x.id===id);
  if(!p)return '<p>Không tìm thấy sản phẩm.</p>';
  const clr=NCC_CAT_CLR[p.cat]||'#888';
  const av=(p.name||'?').charAt(0).toUpperCase();
  const isDone=p.status==='approved'||p.status==='rejected';
  const noteBanner=p.reviewNote
    ?'<div class="adm-ncc-note '+(p.status==='rejected'?'red':'blue')+'">'+
        '<div class="adm-ncc-note-label">'+(p.status==='rejected'?'Lý do từ chối':'Yêu cầu chỉnh sửa')+'</div>'+
        '<div>'+escHtml(p.reviewNote)+'</div>'+
        (p.reviewedBy?'<div style="margin-top:8px;font-size:12px;color:var(--text-soft)">— '+escHtml(p.reviewedBy)+' · '+escHtml(p.reviewedAt)+'</div>':'')+
      '</div>'
    :'';
  const audBadges=(p.aud||[]).map(a=>'<span class="adm-badge gray" style="margin-right:4px">'+escHtml(AUD[a]||a)+'</span>').join('');
  const actionBtns=isDone?'':
    '<div class="adm-detail-actions">'+
      '<button class="adm-act-btn green" onclick="doApproveProd(\''+id+'\')">✓ Duyệt sản phẩm</button>'+
      '<button class="adm-act-btn" style="color:#2980b9;border-color:#2980b9" onclick="doRequestEditProd(\''+id+'\')">✏ Yêu cầu chỉnh sửa</button>'+
      '<button class="adm-act-btn red" onclick="doRejectProd(\''+id+'\')">✕ Từ chối</button>'+
    '</div>';
  return '<button class="adm-back-btn" onclick="admProductsView=\'list\';admProductsSelectedId=null;renderAccount()">← Danh sách sản phẩm</button>'+
    noteBanner+
    '<div class="adm-detail-card">'+
      '<div class="adm-detail-head">'+
        '<div class="adm-detail-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div>'+
        '<div style="flex:1">'+
          '<div class="adm-detail-name">'+escHtml(p.name)+'</div>'+
          '<div class="adm-detail-email">'+escHtml(p.by)+'</div>'+
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'+
            '<span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[p.cat]||p.cat)+'</span>'+
            (p.genre?'<span class="adm-badge gray">'+escHtml(p.genre)+'</span>':'')+
            (PROD_STATUS_BADGE[p.status]||'')+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-detail-grid">'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Giá bán</div><div class="adm-detail-val" style="color:var(--ink);font-size:16px">'+fmt(p.price)+(p.oldPrice?'<span style="font-size:12px;color:var(--text-soft);text-decoration:line-through;margin-left:8px">'+fmt(p.oldPrice)+'</span>':'')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Đối tượng</div><div class="adm-detail-val">'+audBadges+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Số ảnh nộp</div><div class="adm-detail-val">'+(p.imageCount||0)+' ảnh</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Ngày nộp</div><div class="adm-detail-val">'+escHtml(p.submittedAt)+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Seller</div><div class="adm-detail-val">'+escHtml(p.sellerName)+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Mã Seller</div><div class="adm-detail-val" style="font-size:12px;color:var(--text-soft)">'+escHtml(p.sellerId)+'</div></div>'+
      '</div>'+
      '<div class="adm-ncc-doc-section">'+
        '<div class="adm-ncc-doc-title">Mô tả sản phẩm</div>'+
        '<div class="adm-prod-desc">'+escHtml(p.desc||'—')+'</div>'+
      '</div>'+
      actionBtns+
    '</div>';
}

/* ── TAB 2: KIỂM DUYỆT NỘI DUNG ─────────── */
function adminProductsReportedList(){
  const q=(admReportedSearch||'').toLowerCase().trim();
  const list=reportedProds
    .filter(r=>!q||(r.productName||'').toLowerCase().includes(q)||(r.sellerName||'').toLowerCase().includes(q))
    .sort((a,b)=>(a.reviewStatus==='pending'?0:1)-(b.reviewStatus==='pending'?0:1));
  const statCards=[
    {lbl:'Chưa xử lý',val:reportedProds.filter(r=>r.reviewStatus==='pending').length,clr:'#c0392b'},
    {lbl:'Đã xử lý',val:reportedProds.filter(r=>r.reviewStatus==='resolved').length,clr:'#27ae60'},
    {lbl:'Đang ẩn',val:reportedProds.filter(r=>r.status==='hidden').length,clr:'#e67e22'},
    {lbl:'Đã xóa',val:reportedProds.filter(r=>r.status==='deleted').length,clr:'var(--text-soft)'}
  ].map(s=>'<div class="adm-kpi" style="padding:14px 18px">'+
    '<div class="adm-kpi-val" style="color:'+s.clr+';font-size:24px">'+s.val+'</div>'+
    '<div class="adm-kpi-lbl">'+s.lbl+'</div>'+
  '</div>').join('');
  const rows=list.map(r=>{
    const clr=NCC_CAT_CLR[r.cat]||'#888';
    const av=(r.productName||'?').charAt(0).toUpperCase();
    const topReasons=r.reports.slice(0,2).map(rpt=>
      '<div style="font-size:11.5px;color:var(--text-soft)">• '+escHtml(rpt.reason)+' ('+rpt.count+')</div>'
    ).join('');
    return '<tr class="adm-usr-row">'+
      '<td><div class="adm-usr-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div></td>'+
      '<td><div class="adm-usr-nm">'+escHtml(r.productName)+'</div><div class="adm-usr-em">'+escHtml(r.sellerName)+'</div></td>'+
      '<td>'+
        '<div style="font-weight:700;color:#c0392b;font-size:15px">'+r.reportCount+' báo cáo</div>'+
        topReasons+
      '</td>'+
      '<td>'+(RP_STATUS_BADGE[r.status]||r.status)+'</td>'+
      '<td>'+(RP_REVIEW_BADGE[r.reviewStatus]||r.reviewStatus)+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        (r.status==='active'?'<button class="adm-row-btn" style="color:#e67e22;border-color:#f5c881" onclick="doHideReportedProd(\''+r.id+'\')">Ẩn</button>':'')+
        (r.status==='hidden'?'<button class="adm-row-btn adm-unlock-btn" onclick="doUnhideReportedProd(\''+r.id+'\')">Hiện lại</button>':'')+
        (r.status!=='deleted'?'<button class="adm-row-btn" onclick="doWarnSellerFromReport(\''+r.id+'\')">Cảnh báo Seller</button>':'')+
        (r.status!=='deleted'?'<button class="adm-row-btn adm-lock-btn" onclick="doDeleteReportedProd(\''+r.id+'\')">Xóa SP</button>':'')+
      '</td>'+
    '</tr>';
  }).join('');
  return '<div class="adm-kpi-grid" style="margin-bottom:16px">'+statCards+'</div>'+
    '<div class="adm-sec-hd" style="margin-bottom:12px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Sản phẩm bị báo cáo</h3>'+
    '</div>'+
    '<div class="adm-usr-toolbar" style="margin-bottom:12px">'+
      '<input class="adm-usr-search" placeholder="Tìm theo tên sản phẩm hoặc tên seller..." value="'+escHtml(admReportedSearch)+'" oninput="admReportedSearch=this.value;renderAccount()">'+
      '<button class="adm-row-btn" onclick="admReportedSearch=\'\';renderAccount()">Xóa lọc</button>'+
    '</div>'+
    '<div class="adm-table-wrap"><table class="adm-usr-table">'+
      '<thead><tr><th></th><th>Sản phẩm</th><th>Báo cáo</th><th>Trạng thái SP</th><th>Xử lý</th><th></th></tr></thead>'+
      '<tbody>'+(rows||'<tr><td colspan="6" style="text-align:center;color:var(--text-soft);padding:20px">Không có sản phẩm bị báo cáo</td></tr>')+'</tbody>'+
    '</table></div>';
}

/* ── TAB 3: QUẢN LÝ DANH MỤC ─────────── */
function adminProductsCategories(){
  const showAdd=admCatView==='add';
  const editId=admCatView.startsWith('edit-')?admCatView.slice(5):null;
  const mainCats=adminCats.filter(c=>c.type==='main').sort((a,b)=>a.order-b.order);
  const genres=adminCats.filter(c=>c.type==='genre').sort((a,b)=>a.order-b.order);
  const addFormHtml=showAdd?adminCatAddForm():'';
  const mainHtml='<div class="adm-ncc-doc-section" style="margin-top:0">'+
    '<div class="adm-ncc-doc-title" style="margin-bottom:12px">Danh mục chính</div>'+
    '<div class="adm-cat-grid">'+mainCats.map(c=>adminCatCard(c,mainCats,editId)).join('')+'</div>'+
  '</div>';
  const genreHtml='<div class="adm-ncc-doc-section">'+
    '<div class="adm-ncc-doc-title" style="margin-bottom:12px">Thể loại (dưới Sách)</div>'+
    '<div class="adm-cat-grid">'+genres.map(c=>adminCatCard(c,genres,editId)).join('')+'</div>'+
  '</div>';
  return '<div class="adm-sec-hd" style="margin-bottom:14px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Quản lý danh mục</h3>'+
      '<button class="btn-primary" style="padding:8px 16px;font-size:13px" onclick="admCatView=\'add\';renderAccount()">+ Thêm danh mục</button>'+
    '</div>'+
    addFormHtml+
    '<div class="acct-card">'+mainHtml+genreHtml+'</div>';
}

function adminCatCard(c,sameTypeList,editId){
  const pos=sameTypeList.indexOf(c);
  const isFirst=pos===0, isLast=pos===sameTypeList.length-1;
  const productCount=P.filter(p=>p.cat===c.key||(typeof GENRE_MAP!=='undefined'&&GENRE_MAP[p.id]===c.key)).length;
  const isEditing=editId===c.id;
  const editHtml=isEditing?adminCatEditForm(c):'';
  return '<div class="adm-cat-card'+(c.visible?'':' adm-cat-hidden')+'">'+
    '<div class="adm-cat-icon">'+escHtml(c.icon||'📦')+'</div>'+
    '<div class="adm-cat-name">'+escHtml(c.name)+'</div>'+
    '<div class="adm-cat-desc">'+escHtml(c.desc)+'</div>'+
    '<div class="adm-cat-meta">'+
      '<span class="adm-badge '+(c.type==='main'?'adm-badge-blue':'gray')+'">'+
        (c.type==='main'?'Danh mục chính':'Thể loại')+
      '</span>'+
      '<span class="adm-badge gray">'+productCount+' SP</span>'+
      (!c.visible?'<span class="adm-badge gray">Đang ẩn</span>':'')+
    '</div>'+
    '<div class="adm-cat-card-actions">'+
      '<button class="adm-row-btn" onclick="admCatView=\'edit-'+c.id+'\';renderAccount()">Sửa</button>'+
      '<button class="adm-row-btn '+(c.visible?'adm-vis-btn-on':'adm-vis-btn-off')+'" onclick="doToggleCatVisibility(\''+c.id+'\')">'+
        (c.visible?'Ẩn':'Hiện')+
      '</button>'+
      '<div class="adm-cat-order-btns">'+
        '<button class="adm-cat-order-btn" '+(isFirst?'disabled':'')+' onclick="doMoveCatUp(\''+c.id+'\')">↑</button>'+
        '<button class="adm-cat-order-btn" '+(isLast?'disabled':'')+' onclick="doMoveCatDown(\''+c.id+'\')">↓</button>'+
      '</div>'+
      '<button class="adm-row-btn adm-lock-btn" onclick="doDeleteCat(\''+c.id+'\','+productCount+')">Xóa</button>'+
    '</div>'+
    editHtml+
  '</div>';
}

function adminCatAddForm(){
  return '<div class="adm-cat-add-form">'+
    '<h4 style="margin:0 0 14px;font-family:\'Lora\',serif;color:var(--ink-deep);font-size:15px">Thêm danh mục / thể loại mới</h4>'+
    '<div class="form-row" style="margin-bottom:10px">'+
      '<div class="form-field"><label>Tên hiển thị</label><input id="catName" placeholder="VD: Khoa học, Nghệ thuật..."></div>'+
      '<div class="form-field"><label>Key (không dấu, không khoảng trắng)</label><input id="catKey" placeholder="VD: khoahoc"></div>'+
    '</div>'+
    '<div class="form-row" style="margin-bottom:10px">'+
      '<div class="form-field"><label>Icon (emoji)</label><input id="catIcon" placeholder="📦" maxlength="4"></div>'+
      '<div class="form-field"><label>Loại danh mục</label>'+
        '<select id="catType" style="width:100%;padding:9px 12px;border:1.5px solid var(--line);border-radius:9px;font-size:13px;background:var(--paper)">'+
          '<option value="main">Danh mục chính</option>'+
          '<option value="genre">Thể loại (dưới Sách)</option>'+
        '</select>'+
      '</div>'+
    '</div>'+
    '<div class="form-field" style="margin-bottom:12px"><label>Mô tả ngắn</label><input id="catDesc" placeholder="Mô tả ngắn về danh mục..."></div>'+
    '<div id="catAddErr" class="field-error" style="display:none;margin-bottom:8px"></div>'+
    '<div style="display:flex;gap:8px">'+
      '<button class="btn-primary" style="padding:9px 18px;font-size:13px" onclick="doAddCat()">Thêm danh mục</button>'+
      '<button class="btn-ghost" style="padding:9px 18px;font-size:13px" onclick="admCatView=\'list\';renderAccount()">Hủy</button>'+
    '</div>'+
  '</div>';
}

function adminCatEditForm(c){
  return '<div class="adm-cat-edit-form">'+
    '<div class="form-row" style="margin-bottom:8px">'+
      '<div class="form-field"><label style="font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-soft)">Tên hiển thị</label><input id="editCatName-'+c.id+'" value="'+escHtml(c.name)+'"></div>'+
      '<div class="form-field"><label style="font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-soft)">Icon (emoji)</label><input id="editCatIcon-'+c.id+'" value="'+escHtml(c.icon||'')+'" maxlength="4"></div>'+
    '</div>'+
    '<div class="form-field" style="margin-bottom:10px"><label style="font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-soft)">Mô tả</label><input id="editCatDesc-'+c.id+'" value="'+escHtml(c.desc)+'"></div>'+
    '<div style="display:flex;gap:8px">'+
      '<button class="adm-act-btn green" style="font-size:12px;padding:7px 14px" onclick="doSaveCatEdit(\''+c.id+'\')">Lưu thay đổi</button>'+
      '<button class="adm-row-btn" onclick="admCatView=\'list\';renderAccount()">Hủy</button>'+
    '</div>'+
  '</div>';
}

/* ── PRODUCT ACTION FUNCTIONS ─────────── */
function doApproveProd(id){
  const idx=pendingProds.findIndex(p=>p.id===id);if(idx===-1)return;
  if(!confirm('Duyệt sản phẩm "'+pendingProds[idx].name+'"?\nSản phẩm sẽ xuất hiện trên sàn ngay sau khi duyệt.'))return;
  pendingProds[idx].status='approved';pendingProds[idx].reviewedBy='Admin EduMart';
  pendingProds[idx].reviewedAt=todayStr();pendingProds[idx].reviewNote='';
  savePendingProds();
  toast('✓ Đã duyệt: '+pendingProds[idx].name);
  admProductsView='list';admProductsSelectedId=null;renderAccount();
}
function doRequestEditProd(id){
  const msg=prompt('Nội dung yêu cầu chỉnh sửa gửi tới seller:','');
  if(msg===null)return;
  if(!msg.trim()){toast('Vui lòng nhập nội dung yêu cầu');return;}
  const idx=pendingProds.findIndex(p=>p.id===id);if(idx===-1)return;
  pendingProds[idx].status='needs-edit';pendingProds[idx].reviewNote=msg.trim();
  pendingProds[idx].reviewedBy='Admin EduMart';pendingProds[idx].reviewedAt=todayStr();
  savePendingProds();
  toast('Đã gửi yêu cầu chỉnh sửa tới seller: '+pendingProds[idx].sellerName);
  admProductsView='list';admProductsSelectedId=null;renderAccount();
}
function doRejectProd(id){
  const reason=prompt('Lý do từ chối (bắt buộc):','');
  if(reason===null)return;
  if(!reason.trim()){toast('Vui lòng nhập lý do từ chối');return;}
  const idx=pendingProds.findIndex(p=>p.id===id);if(idx===-1)return;
  pendingProds[idx].status='rejected';pendingProds[idx].reviewNote=reason.trim();
  pendingProds[idx].reviewedBy='Admin EduMart';pendingProds[idx].reviewedAt=todayStr();
  savePendingProds();
  toast('Đã từ chối sản phẩm: '+pendingProds[idx].name);
  admProductsView='list';admProductsSelectedId=null;renderAccount();
}
function doHideReportedProd(id){
  const r=reportedProds.find(x=>x.id===id);if(!r)return;
  if(!confirm('Ẩn sản phẩm "'+r.productName+'"?\nSản phẩm sẽ không hiển thị với khách hàng cho đến khi được mở lại.'))return;
  const idx=reportedProds.findIndex(x=>x.id===id);
  reportedProds[idx].status='hidden';saveReportedProds();
  toast('Đã ẩn sản phẩm: '+r.productName);renderAccount();
}
function doUnhideReportedProd(id){
  const idx=reportedProds.findIndex(x=>x.id===id);if(idx===-1)return;
  reportedProds[idx].status='active';reportedProds[idx].reviewStatus='resolved';
  reportedProds[idx].resolvedAt=todayStr();reportedProds[idx].resolvedBy='Admin EduMart';
  saveReportedProds();toast('Đã hiện lại sản phẩm: '+reportedProds[idx].productName);renderAccount();
}
function doDeleteReportedProd(id){
  const r=reportedProds.find(x=>x.id===id);if(!r)return;
  if(!confirm('XÓA sản phẩm "'+r.productName+'"?\n\nHành động này không thể hoàn tác.'))return;
  const idx=reportedProds.findIndex(x=>x.id===id);
  reportedProds[idx].status='deleted';reportedProds[idx].reviewStatus='resolved';
  reportedProds[idx].resolvedAt=todayStr();reportedProds[idx].resolvedBy='Admin EduMart';
  saveReportedProds();toast('Đã xóa sản phẩm: '+r.productName);renderAccount();
}
function doWarnSellerFromReport(id){
  const r=reportedProds.find(x=>x.id===id);if(!r)return;
  const defMsg='Sản phẩm "'+r.productName+'" nhận '+r.reportCount+' báo cáo vi phạm từ người dùng.';
  const msg=prompt('Nội dung cảnh báo gửi tới seller "'+r.sellerName+'":',defMsg);
  if(msg===null)return;
  if(!msg.trim()){toast('Vui lòng nhập nội dung cảnh báo');return;}
  const sidx=activeSellers.findIndex(s=>s.id===r.sellerId);
  if(sidx!==-1){
    activeSellers[sidx].warnings=(activeSellers[sidx].warnings||0)+1;
    if(activeSellers[sidx].status==='active')activeSellers[sidx].status='warning';
    activeSellers[sidx].violations.push({id:'v-rp-'+id+'-'+Date.now().toString(36),
      type:'description',desc:'Sản phẩm "'+r.productName+'" nhận '+r.reportCount+' báo cáo từ người dùng',
      date:todayStr(),severity:'medium',action:'warning',note:msg.trim()});
    saveActiveSellers();
  }
  const idx=reportedProds.findIndex(x=>x.id===id);
  reportedProds[idx].reviewStatus='resolved';reportedProds[idx].resolvedAt=todayStr();
  reportedProds[idx].resolvedBy='Admin EduMart';reportedProds[idx].adminNote=msg.trim();
  saveReportedProds();
  toast('Đã gửi cảnh báo tới seller: '+r.sellerName);renderAccount();
}

/* ── CATEGORY ACTION FUNCTIONS ─────────── */
function doAddCat(){
  const name=val('catName'),key=val('catKey').toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,'');
  const icon=val('catIcon')||'📦';
  const type=document.getElementById('catType')?.value||'main';
  const desc=val('catDesc');
  if(!name){showAuthErr('catAddErr','Vui lòng nhập tên danh mục');return;}
  if(!key){showAuthErr('catAddErr','Vui lòng nhập key danh mục (chỉ chữ thường và số)');return;}
  if(adminCats.find(c=>c.key===key)){showAuthErr('catAddErr','Key "'+key+'" đã tồn tại, vui lòng chọn key khác');return;}
  const sameType=adminCats.filter(c=>c.type===type);
  const maxOrd=sameType.length>0?Math.max(...sameType.map(c=>c.order)):0;
  adminCats.push({id:'c-'+key+'-'+Date.now().toString(36),key,name,icon,desc,order:maxOrd+1,visible:true,type,
    parentKey:type==='genre'?'sach':undefined});
  saveAdminCats();toast('Đã thêm danh mục: '+name);admCatView='list';renderAccount();
}
function doSaveCatEdit(id){
  const idx=adminCats.findIndex(c=>c.id===id);if(idx===-1)return;
  const nameEl=document.getElementById('editCatName-'+id);
  const iconEl=document.getElementById('editCatIcon-'+id);
  const descEl=document.getElementById('editCatDesc-'+id);
  const name=nameEl?nameEl.value.trim():'';
  if(!name){toast('Vui lòng nhập tên danh mục');return;}
  adminCats[idx].name=name;
  if(iconEl&&iconEl.value.trim())adminCats[idx].icon=iconEl.value.trim();
  if(descEl&&descEl.value.trim())adminCats[idx].desc=descEl.value.trim();
  saveAdminCats();toast('Đã cập nhật danh mục: '+name);admCatView='list';renderAccount();
}
function doToggleCatVisibility(id){
  const idx=adminCats.findIndex(c=>c.id===id);if(idx===-1)return;
  adminCats[idx].visible=!adminCats[idx].visible;saveAdminCats();
  toast((adminCats[idx].visible?'Đã hiện':'Đã ẩn')+' danh mục: '+adminCats[idx].name);renderAccount();
}
function doMoveCatUp(id){
  const cat=adminCats.find(c=>c.id===id);if(!cat)return;
  const same=adminCats.filter(c=>c.type===cat.type).sort((a,b)=>a.order-b.order);
  const pos=same.indexOf(cat);if(pos<=0)return;
  const prev=same[pos-1];
  const ci=adminCats.findIndex(c=>c.id===id),pi=adminCats.findIndex(c=>c.id===prev.id);
  const tmp=adminCats[ci].order;adminCats[ci].order=adminCats[pi].order;adminCats[pi].order=tmp;
  saveAdminCats();renderAccount();
}
function doMoveCatDown(id){
  const cat=adminCats.find(c=>c.id===id);if(!cat)return;
  const same=adminCats.filter(c=>c.type===cat.type).sort((a,b)=>a.order-b.order);
  const pos=same.indexOf(cat);if(pos>=same.length-1)return;
  const next=same[pos+1];
  const ci=adminCats.findIndex(c=>c.id===id),ni=adminCats.findIndex(c=>c.id===next.id);
  const tmp=adminCats[ci].order;adminCats[ci].order=adminCats[ni].order;adminCats[ni].order=tmp;
  saveAdminCats();renderAccount();
}
function doDeleteCat(id,productCount){
  const cat=adminCats.find(c=>c.id===id);if(!cat)return;
  if(productCount>0){
    alert('Không thể xóa danh mục "'+cat.name+'" vì đang có '+productCount+' sản phẩm thuộc danh mục này.\nHãy chuyển sản phẩm sang danh mục khác trước khi xóa.');return;
  }
  if(!confirm('Xóa danh mục "'+cat.name+'"?\nHành động này không thể hoàn tác.'))return;
  const idx=adminCats.findIndex(c=>c.id===id);
  adminCats.splice(idx,1);saveAdminCats();
  toast('Đã xóa danh mục: '+cat.name);admCatView='list';renderAccount();
}

/* ══════════════════════════════════════════════════════════════
   ADMIN — QUẢN LÝ NHÀ CUNG CẤP / SHOP
══════════════════════════════════════════════════════════════ */
const NCC_CAT_LBL={sach:'Sách',vpp:'Văn phòng phẩm',tbgd:'Thiết bị GD',ebook:'Ebook',audiobook:'Sách nói'};
const NCC_CAT_CLR={sach:'#c0392b',vpp:'#e67e22',tbgd:'#2980b9',ebook:'#27ae60',audiobook:'#8e44ad'};
const APP_STATUS_BADGE={
  pending:'<span class="adm-badge adm-badge-orange">Chờ duyệt</span>',
  'more-info':'<span class="adm-badge adm-badge-blue">Cần bổ sung</span>',
  rejected:'<span class="adm-badge gray">Đã từ chối</span>',
  approved:'<span class="adm-badge green">Đã duyệt</span>'
};
const SELLER_STATUS_BADGE={
  active:'<span class="adm-badge green">Hoạt động</span>',
  warning:'<span class="adm-badge adm-badge-orange">Cảnh báo</span>',
  suspended:'<span class="adm-badge red">Đình chỉ</span>',
  locked:'<span class="adm-badge gray">Đã khóa</span>'
};
const VIOL_SEV={
  low:'<span class="adm-badge adm-badge-blue">Nhẹ</span>',
  medium:'<span class="adm-badge adm-badge-orange">Trung bình</span>',
  high:'<span class="adm-badge red">Nghiêm trọng</span>'
};
const VIOL_TYPE={fake:'Hàng giả/nhái',description:'Mô tả sai lệch',return:'Tỷ lệ hoàn cao',fraud:'Gian lận',other:'Vi phạm khác'};

function adminShops(){
  if(admShopsView==='pending-detail'&&admShopsSelectedId)return adminShopsPendingDetail(admShopsSelectedId);
  if(admShopsView==='active-detail'&&admShopsSelectedId)return adminShopsActiveDetail(admShopsSelectedId);
  return adminShopsMain();
}

function adminShopsMain(){
  const pendingCount=sellerApps.filter(a=>a.status==='pending').length;
  const tabs=[['pending','Chờ duyệt'],['active','Đang hoạt động'],['commission','Cài đặt hoa hồng']];
  const tabHtml=tabs.map(([k,l])=>
    '<button class="adm-shops-tab'+(admShopsTab===k?' on':'')+'" onclick="admShopsTab=\''+k+'\';renderAccount()">'+l+
    (k==='pending'&&pendingCount>0?' <span class="adm-tab-badge">'+pendingCount+'</span>':'')+
    '</button>'
  ).join('');
  let content='';
  if(admShopsTab==='pending')content=adminShopsPendingList();
  else if(admShopsTab==='active')content=adminShopsActiveList();
  else content=adminShopsCommission();
  return '<div class="adm-shops-tabs">'+tabHtml+'</div>'+content;
}

/* ── PENDING APPLICATIONS ─────────── */
function adminShopsPendingList(){
  const q=(admShopsPendingSearch||'').toLowerCase().trim();
  const order={pending:0,'more-info':1,approved:2,rejected:3};
  const list=sellerApps
    .filter(a=>!q||(a.shopName||'').toLowerCase().includes(q)||(a.ownerName||'').toLowerCase().includes(q)||(a.email||'').toLowerCase().includes(q))
    .sort((a,b)=>(order[a.status]||9)-(order[b.status]||9));
  const PER=8,pages=Math.max(1,Math.ceil(list.length/PER));
  if(admShopsPendingPage>=pages)admShopsPendingPage=pages-1;
  const slice=list.slice(admShopsPendingPage*PER,(admShopsPendingPage+1)*PER);
  const rows=slice.map(a=>{
    const clr=NCC_CAT_CLR[a.category]||'#888';
    const av=(a.shopName||'?').charAt(0).toUpperCase();
    return '<tr class="adm-usr-row" onclick="admShopsSelectedId=\''+a.id+'\';admShopsView=\'pending-detail\';renderAccount()">'+
      '<td><div class="adm-usr-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div></td>'+
      '<td><div class="adm-usr-nm">'+escHtml(a.shopName)+'</div><div class="adm-usr-em">'+escHtml(a.ownerName)+' · '+escHtml(a.email)+'</div></td>'+
      '<td><span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[a.category]||a.category)+'</span></td>'+
      '<td class="adm-usr-date">'+escHtml(a.submittedAt)+'</td>'+
      '<td>'+(APP_STATUS_BADGE[a.status]||a.status)+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admShopsSelectedId=\''+a.id+'\';admShopsView=\'pending-detail\';renderAccount()">Xem hồ sơ</button>'+
        (a.status==='pending'?'<button class="adm-row-btn adm-unlock-btn" onclick="event.stopPropagation();doApproveSellerApp(\''+a.id+'\')">Duyệt</button>':'')+
      '</td>'+
    '</tr>';
  }).join('');
  const statCards=[
    {lbl:'Chờ duyệt',val:sellerApps.filter(a=>a.status==='pending').length,clr:'#e67e22'},
    {lbl:'Cần bổ sung',val:sellerApps.filter(a=>a.status==='more-info').length,clr:'#2980b9'},
    {lbl:'Đã duyệt',val:sellerApps.filter(a=>a.status==='approved').length,clr:'#27ae60'},
    {lbl:'Từ chối',val:sellerApps.filter(a=>a.status==='rejected').length,clr:'#c0392b'}
  ].map(s=>'<div class="adm-kpi" style="padding:14px 18px">'+
    '<div class="adm-kpi-val" style="color:'+s.clr+';font-size:24px">'+s.val+'</div>'+
    '<div class="adm-kpi-lbl">'+s.lbl+'</div>'+
  '</div>').join('');
  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admShopsPendingPage===0?'disabled':'')+' onclick="admShopsPendingPage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admShopsPendingPage+1)+'/'+pages+' · <b>'+list.length+'</b> hồ sơ</span>'+
    '<button class="adm-pager-btn" '+(admShopsPendingPage>=pages-1?'disabled':'')+' onclick="admShopsPendingPage++;renderAccount()">Tiếp →</button>'+
  '</div>';
  return '<div class="adm-kpi-grid" style="margin-bottom:16px">'+statCards+'</div>'+
    '<div class="adm-sec-hd" style="margin-bottom:12px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Hồ sơ đăng ký Seller</h3>'+
    '</div>'+
    '<div class="adm-usr-toolbar" style="margin-bottom:12px">'+
      '<input class="adm-usr-search" placeholder="Tìm theo tên shop, chủ sở hữu, email..." value="'+escHtml(admShopsPendingSearch)+'" oninput="admShopsPendingSearch=this.value;admShopsPendingPage=0;renderAccount()">'+
      '<button class="adm-row-btn" onclick="admShopsPendingSearch=\'\';admShopsPendingPage=0;renderAccount()">Xóa lọc</button>'+
    '</div>'+
    '<div class="adm-table-wrap"><table class="adm-usr-table">'+
      '<thead><tr><th></th><th>Thông tin shop</th><th>Danh mục</th><th>Ngày nộp</th><th>Trạng thái</th><th></th></tr></thead>'+
      '<tbody>'+(rows||'<tr><td colspan="6" style="text-align:center;color:var(--text-soft);padding:20px">Không có hồ sơ nào</td></tr>')+'</tbody>'+
    '</table></div>'+pager;
}

function adminShopsPendingDetail(id){
  const app=sellerApps.find(a=>a.id===id);
  if(!app)return '<p>Không tìm thấy hồ sơ.</p>';
  const clr=NCC_CAT_CLR[app.category]||'#888';
  const av=(app.shopName||'?').charAt(0).toUpperCase();
  const st=app.status;
  const isPending=st==='pending', isMoreInfo=st==='more-info';
  const isDone=st==='approved'||st==='rejected';
  const reviewNote=app.reviewNote
    ?'<div class="adm-ncc-note '+(st==='rejected'?'red':st==='more-info'?'blue':'')+'">'+
        '<div class="adm-ncc-note-label">'+(st==='rejected'?'Lý do từ chối':'Yêu cầu bổ sung thông tin')+'</div>'+
        '<div>'+escHtml(app.reviewNote)+'</div>'+
        (app.reviewedBy?'<div style="margin-top:8px;font-size:12px;color:var(--text-soft)">— '+escHtml(app.reviewedBy)+' · '+escHtml(app.reviewedAt)+'</div>':'')+
      '</div>'
    :'';
  const actionBtns=isDone?'':
    '<div class="adm-detail-actions">'+
      '<button class="adm-act-btn green" onclick="doApproveSellerApp(\''+id+'\')">✓ Duyệt hồ sơ</button>'+
      '<button class="adm-act-btn" style="color:#e67e22;border-color:#e67e22" onclick="doMoreInfoSellerApp(\''+id+'\')">⚠ Yêu cầu bổ sung</button>'+
      '<button class="adm-act-btn red" onclick="doRejectSellerApp(\''+id+'\')">✕ Từ chối</button>'+
    '</div>';
  return '<button class="adm-back-btn" onclick="admShopsView=\'list\';admShopsSelectedId=null;renderAccount()">← Danh sách hồ sơ</button>'+
    reviewNote+
    '<div class="adm-detail-card">'+
      '<div class="adm-detail-head">'+
        '<div class="adm-detail-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div>'+
        '<div style="flex:1">'+
          '<div class="adm-detail-name">'+escHtml(app.shopName)+'</div>'+
          '<div class="adm-detail-email">'+escHtml(app.ownerName)+' · '+escHtml(app.email)+'</div>'+
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'+
            '<span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[app.category]||app.category)+'</span>'+
            (APP_STATUS_BADGE[app.status]||'')+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-detail-grid">'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Số điện thoại</div><div class="adm-detail-val">'+escHtml(app.phone||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Email</div><div class="adm-detail-val">'+escHtml(app.email||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Ngày nộp hồ sơ</div><div class="adm-detail-val">'+escHtml(app.submittedAt||'—')+'</div></div>'+
      '</div>'+
      '<div class="adm-ncc-doc-section">'+
        '<div class="adm-ncc-doc-title">Giấy phép kinh doanh (GPKD)</div>'+
        '<div class="adm-detail-grid">'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Số đăng ký</div><div class="adm-detail-val">'+escHtml(app.gpkd.number)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Loại hình</div><div class="adm-detail-val">'+escHtml(app.gpkd.type)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Ngày cấp</div><div class="adm-detail-val">'+escHtml(app.gpkd.issued)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Nơi cấp</div><div class="adm-detail-val">'+escHtml(app.gpkd.place)+'</div></div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-ncc-doc-section">'+
        '<div class="adm-ncc-doc-title">Căn cước công dân (CCCD)</div>'+
        '<div class="adm-detail-grid">'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Số CCCD</div><div class="adm-detail-val">'+escHtml(app.cccd.number)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Họ và tên</div><div class="adm-detail-val">'+escHtml(app.cccd.name)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Ngày cấp</div><div class="adm-detail-val">'+escHtml(app.cccd.issued)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Nơi cấp</div><div class="adm-detail-val">'+escHtml(app.cccd.place)+'</div></div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-ncc-doc-section">'+
        '<div class="adm-ncc-doc-title">Thông tin Shop</div>'+
        '<div class="adm-detail-grid">'+
          '<div class="adm-detail-item" style="grid-column:1/-1"><div class="adm-detail-label">Mô tả shop</div><div class="adm-detail-val" style="line-height:1.5">'+escHtml(app.shopInfo.desc)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Địa chỉ kho hàng</div><div class="adm-detail-val">'+escHtml(app.shopInfo.address)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Tài khoản ngân hàng</div><div class="adm-detail-val">'+escHtml(app.shopInfo.bank)+'</div></div>'+
          '<div class="adm-detail-item"><div class="adm-detail-label">Sản phẩm chính</div><div class="adm-detail-val">'+app.shopInfo.mainCats.map(c=>'<span class="adm-badge gray" style="margin-right:4px">'+escHtml(c)+'</span>').join('')+'</div></div>'+
        '</div>'+
      '</div>'+
      actionBtns+
    '</div>';
}

/* ── ACTIVE SELLERS ─────────── */
function adminShopsActiveList(){
  const q=(admShopsActiveSearch||'').toLowerCase().trim();
  const list=activeSellers.filter(s=>{
    if(admShopsActiveFilter!=='all'&&s.status!==admShopsActiveFilter)return false;
    if(q&&!(s.shopName||'').toLowerCase().includes(q)&&!(s.ownerName||'').toLowerCase().includes(q))return false;
    return true;
  });
  const PER=8,pages=Math.max(1,Math.ceil(list.length/PER));
  if(admShopsActivePage>=pages)admShopsActivePage=pages-1;
  const slice=list.slice(admShopsActivePage*PER,(admShopsActivePage+1)*PER);
  const rows=slice.map(s=>{
    const clr=NCC_CAT_CLR[s.category]||'#888';
    const av=(s.shopName||'?').charAt(0).toUpperCase();
    const stars='★'.repeat(Math.round(s.rating||0))+'☆'.repeat(5-Math.round(s.rating||0));
    return '<tr class="adm-usr-row" onclick="admShopsSelectedId=\''+s.id+'\';admShopsView=\'active-detail\';renderAccount()">'+
      '<td><div class="adm-usr-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div></td>'+
      '<td><div class="adm-usr-nm">'+escHtml(s.shopName)+'</div><div class="adm-usr-em">'+escHtml(s.ownerName)+'</div></td>'+
      '<td><span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[s.category]||s.category)+'</span></td>'+
      '<td><span style="color:var(--marigold);font-size:12px;letter-spacing:-1px">'+stars+'</span> <span style="font-size:12.5px">'+s.rating+'</span></td>'+
      '<td><div style="font-weight:500">'+fmtMil(s.stats.totalRevenue)+'đ</div><div class="adm-usr-em">'+fmtBig(s.stats.totalOrders)+' đơn</div></td>'+
      '<td>'+(SELLER_STATUS_BADGE[s.status]||s.status)+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admShopsSelectedId=\''+s.id+'\';admShopsView=\'active-detail\';renderAccount()">Xem</button>'+
        (s.status==='active'||s.status==='warning'?'<button class="adm-row-btn" style="color:#e67e22;border-color:#f5c881" onclick="event.stopPropagation();doWarnSeller(\''+s.id+'\')">Cảnh báo</button>':'')+
        (s.status==='suspended'?'<button class="adm-row-btn adm-unlock-btn" onclick="event.stopPropagation();doReactivateSeller(\''+s.id+'\')">Mở lại</button>':'')+
      '</td>'+
    '</tr>';
  }).join('');
  const filterBtns=[
    ['all','Tất cả'],['active','Hoạt động'],['warning','Cảnh báo'],['suspended','Đình chỉ'],['locked','Đã khóa']
  ].map(([k,l])=>{
    const cnt=k==='all'?activeSellers.length:activeSellers.filter(s=>s.status===k).length;
    return '<button class="adm-row-btn'+(admShopsActiveFilter===k?' adm-filter-on':'')+'" onclick="admShopsActiveFilter=\''+k+'\';admShopsActivePage=0;renderAccount()">'+l+' ('+cnt+')</button>';
  }).join('');
  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admShopsActivePage===0?'disabled':'')+' onclick="admShopsActivePage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admShopsActivePage+1)+'/'+pages+' · <b>'+list.length+'</b> seller</span>'+
    '<button class="adm-pager-btn" '+(admShopsActivePage>=pages-1?'disabled':'')+' onclick="admShopsActivePage++;renderAccount()">Tiếp →</button>'+
  '</div>';
  return '<div class="adm-sec-hd" style="margin-bottom:12px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Seller đang hoạt động</h3>'+
    '</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+filterBtns+'</div>'+
    '<div class="adm-usr-toolbar" style="margin-bottom:12px">'+
      '<input class="adm-usr-search" placeholder="Tìm theo tên shop hoặc chủ sở hữu..." value="'+escHtml(admShopsActiveSearch)+'" oninput="admShopsActiveSearch=this.value;admShopsActivePage=0;renderAccount()">'+
      '<button class="adm-row-btn" onclick="admShopsActiveSearch=\'\';admShopsActiveFilter=\'all\';admShopsActivePage=0;renderAccount()">Xóa lọc</button>'+
    '</div>'+
    '<div class="adm-table-wrap"><table class="adm-usr-table">'+
      '<thead><tr><th></th><th>Shop</th><th>Danh mục</th><th>Đánh giá</th><th>Doanh thu</th><th>Trạng thái</th><th></th></tr></thead>'+
      '<tbody>'+(rows||'<tr><td colspan="7" style="text-align:center;color:var(--text-soft);padding:20px">Không có seller nào</td></tr>')+'</tbody>'+
    '</table></div>'+pager;
}

function adminShopsActiveDetail(id){
  const s=activeSellers.find(x=>x.id===id);
  if(!s)return '<p>Không tìm thấy seller.</p>';
  const clr=NCC_CAT_CLR[s.category]||'#888';
  const av=(s.shopName||'?').charAt(0).toUpperCase();
  const st=s.status;
  const commLabel=s.commissionOverride!=null
    ?s.commissionOverride+'% <span style="font-size:11px;color:#e67e22">(đặc biệt)</span>'
    :(commissionCfg.byCategory[s.category]||'—')+'% <span style="font-size:11px;color:var(--text-soft)">(danh mục)</span>';
  const violRows=s.violations.length===0
    ?'<tr><td colspan="5" style="text-align:center;color:var(--text-soft);padding:16px">Chưa có vi phạm nào được ghi nhận</td></tr>'
    :s.violations.slice().reverse().map(v=>
      '<tr>'+
        '<td class="adm-usr-date">'+escHtml(v.date)+'</td>'+
        '<td>'+escHtml(VIOL_TYPE[v.type]||v.type)+'</td>'+
        '<td style="font-size:12.5px">'+escHtml(v.desc)+'</td>'+
        '<td>'+(VIOL_SEV[v.severity]||v.severity)+'</td>'+
        '<td style="font-size:12px;color:var(--text-soft)">'+escHtml(v.note||'—')+'</td>'+
      '</tr>'
    ).join('');
  const suspendInfo=st==='suspended'&&s.suspendedUntil
    ?'<div class="adm-ncc-note red"><div class="adm-ncc-note-label">Đang đình chỉ đến '+escHtml(s.suspendedUntil)+'</div><div>'+escHtml(s.suspendedReason||'—')+'</div></div>'
    :'';
  const actionBtns='<div class="adm-detail-actions">'+
    (st==='active'||st==='warning'?'<button class="adm-act-btn" style="color:#e67e22;border-color:#e67e22" onclick="doWarnSeller(\''+id+'\')">⚠ Cảnh báo</button>':'')+
    (st==='active'||st==='warning'?'<button class="adm-act-btn red" onclick="doSuspendSeller(\''+id+'\')">⏸ Đình chỉ</button>':'')+
    (st!=='locked'?'<button class="adm-act-btn red-outline" onclick="doLockSeller(\''+id+'\')">🔒 Khóa tài khoản</button>':'')+
    (st==='suspended'||st==='locked'?'<button class="adm-act-btn green" onclick="doReactivateSeller(\''+id+'\')">✓ Mở lại</button>':'')+
    '<button class="adm-act-btn" onclick="doSetSellerCommission(\''+id+'\')">💰 Đặt hoa hồng</button>'+
  '</div>';
  return '<button class="adm-back-btn" onclick="admShopsView=\'list\';admShopsSelectedId=null;renderAccount()">← Danh sách seller</button>'+
    suspendInfo+
    '<div class="adm-detail-card">'+
      '<div class="adm-detail-head">'+
        '<div class="adm-detail-av" style="background:'+clr+'18;color:'+clr+'">'+av+'</div>'+
        '<div style="flex:1">'+
          '<div class="adm-detail-name">'+escHtml(s.shopName)+'</div>'+
          '<div class="adm-detail-email">'+escHtml(s.ownerName)+' · '+escHtml(s.email)+'</div>'+
          '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'+
            '<span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[s.category]||s.category)+'</span>'+
            (SELLER_STATUS_BADGE[s.status]||'')+
            (s.warnings>0?'<span class="adm-badge adm-badge-orange">'+s.warnings+' cảnh báo</span>':'')+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="adm-ncc-stat-grid">'+
        [
          {lbl:'Tổng đơn hàng',val:fmtBig(s.stats.totalOrders)},
          {lbl:'Tổng doanh thu',val:fmtMil(s.stats.totalRevenue)+'đ'},
          {lbl:'Số sản phẩm',val:fmtBig(s.totalProducts)},
          {lbl:'Tỷ lệ hoàn hàng',val:s.stats.returnRate+'%'},
          {lbl:'Đơn tháng này',val:fmtBig(s.stats.thisMonthOrders)+' '+admGrowth(s.stats.growth)},
          {lbl:'Doanh thu tháng',val:fmtMil(s.stats.thisMonthRev)+'đ'}
        ].map(it=>'<div class="adm-detail-item"><div class="adm-detail-label">'+it.lbl+'</div><div class="adm-detail-val">'+it.val+'</div></div>').join('')+
      '</div>'+
      '<div class="adm-detail-grid" style="margin-top:12px">'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Tham gia từ</div><div class="adm-detail-val">'+escHtml(s.joinedAt)+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Số điện thoại</div><div class="adm-detail-val">'+escHtml(s.phone||'—')+'</div></div>'+
        '<div class="adm-detail-item"><div class="adm-detail-label">Hoa hồng áp dụng</div><div class="adm-detail-val">'+commLabel+'</div></div>'+
      '</div>'+
      '<div class="adm-ncc-doc-section">'+
        '<div class="adm-ncc-doc-title">Lịch sử vi phạm ('+s.violations.length+')</div>'+
        '<div class="adm-table-wrap" style="margin-top:10px"><table class="adm-usr-table">'+
          '<thead><tr><th>Ngày</th><th>Loại</th><th>Mô tả</th><th>Mức độ</th><th>Ghi chú xử lý</th></tr></thead>'+
          '<tbody>'+violRows+'</tbody>'+
        '</table></div>'+
      '</div>'+
      actionBtns+
    '</div>';
}

/* ── COMMISSION ─────────── */
function adminShopsCommission(){
  const cats=[
    {key:'sach',lbl:'Sách'},{key:'vpp',lbl:'Văn phòng phẩm'},
    {key:'tbgd',lbl:'Thiết bị GD'},{key:'ebook',lbl:'Ebook'},{key:'audiobook',lbl:'Sách nói'}
  ];
  const catCards=cats.map(c=>{
    const rate=commissionCfg.byCategory[c.key]||0;
    const clr=NCC_CAT_CLR[c.key]||'#888';
    const cnt=activeSellers.filter(s=>s.status!=='locked'&&s.category===c.key&&s.commissionOverride==null).length;
    return '<div class="adm-comm-card">'+
      '<div class="adm-comm-cat-head">'+
        '<span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+c.lbl+'</span>'+
        '<div class="adm-comm-rate">'+rate+'%</div>'+
      '</div>'+
      '<div class="adm-comm-sellers">'+cnt+' seller đang dùng mức này</div>'+
      '<button class="adm-row-btn" style="width:100%;margin-top:10px;justify-content:center" onclick="doSetCategoryCommission(\''+c.key+'\',\''+c.lbl+'\')">Chỉnh sửa</button>'+
    '</div>';
  }).join('');
  const specialRows=activeSellers.filter(s=>s.commissionOverride!=null).map(s=>{
    const clr=NCC_CAT_CLR[s.category]||'#888';
    const defRate=commissionCfg.byCategory[s.category]||0;
    return '<tr>'+
      '<td><div class="adm-usr-nm">'+escHtml(s.shopName)+'</div><div class="adm-usr-em">'+escHtml(s.ownerName)+'</div></td>'+
      '<td><span class="adm-badge" style="background:'+clr+'15;color:'+clr+'">'+escHtml(NCC_CAT_LBL[s.category]||s.category)+'</span></td>'+
      '<td><span style="color:var(--text-soft);text-decoration:line-through">'+defRate+'%</span> → <b>'+s.commissionOverride+'%</b></td>'+
      '<td class="adm-row-actions">'+
        '<button class="adm-row-btn" onclick="doSetSellerCommission(\''+s.id+'\')">Đổi</button>'+
        '<button class="adm-row-btn adm-lock-btn" onclick="doRemoveSellerCommission(\''+s.id+'\')">Xóa ưu đãi</button>'+
      '</td>'+
    '</tr>';
  }).join('');
  const histRows=commissionCfg.history.slice().reverse().map(h=>{
    let fld='';
    if(h.field.startsWith('cat:')) fld='Danh mục: '+(NCC_CAT_LBL[h.field.slice(4)]||h.field.slice(4));
    else if(h.field.startsWith('seller:')){const sl=activeSellers.find(x=>x.id===h.field.slice(7));fld='Seller: '+(sl?sl.shopName:h.field.slice(7));}
    else fld=h.field;
    return '<tr>'+
      '<td class="adm-usr-date">'+escHtml(h.date)+'</td>'+
      '<td>'+escHtml(fld)+'</td>'+
      '<td><span style="color:var(--text-soft);text-decoration:line-through">'+h.oldVal+'%</span> → <b>'+h.newVal+'%</b></td>'+
      '<td style="font-size:12px;color:var(--text-soft)">'+escHtml(h.reason||'—')+'</td>'+
      '<td class="adm-usr-date">'+escHtml(h.by||'—')+'</td>'+
    '</tr>';
  }).join('');
  return '<div class="adm-sec-hd" style="margin-bottom:16px">'+
      '<h3 style="margin:0;font-size:16px;font-family:\'Lora\',serif;color:var(--ink-deep)">Cài đặt hoa hồng</h3>'+
    '</div>'+
    '<div class="acct-card" style="margin-bottom:14px">'+
      '<div class="adm-ncc-doc-title" style="margin-bottom:14px">Hoa hồng theo danh mục</div>'+
      '<div class="adm-comm-grid">'+catCards+'</div>'+
    '</div>'+
    '<div class="acct-card" style="margin-bottom:14px">'+
      '<div class="adm-sec-hd">'+
        '<div class="adm-ncc-doc-title">Hoa hồng đặc biệt theo Seller</div>'+
        '<button class="adm-row-btn" onclick="doSetSellerCommissionCustom()">+ Thêm ưu đãi</button>'+
      '</div>'+
      '<div class="adm-table-wrap" style="margin-top:12px"><table class="adm-usr-table">'+
        '<thead><tr><th>Seller</th><th>Danh mục</th><th>Mức hoa hồng</th><th></th></tr></thead>'+
        '<tbody>'+(specialRows||'<tr><td colspan="4" style="text-align:center;color:var(--text-soft);padding:20px">Chưa có mức hoa hồng đặc biệt nào</td></tr>')+'</tbody>'+
      '</table></div>'+
    '</div>'+
    '<div class="acct-card">'+
      '<div class="adm-ncc-doc-title" style="margin-bottom:12px">Lịch sử thay đổi hoa hồng</div>'+
      '<div class="adm-table-wrap"><table class="adm-usr-table">'+
        '<thead><tr><th>Ngày</th><th>Đối tượng</th><th>Thay đổi</th><th>Lý do</th><th>Người thực hiện</th></tr></thead>'+
        '<tbody>'+(histRows||'<tr><td colspan="5" style="text-align:center;color:var(--text-soft);padding:20px">Chưa có lịch sử thay đổi</td></tr>')+'</tbody>'+
      '</table></div>'+
    '</div>';
}

/* ── NCC ACTION FUNCTIONS ─────────── */
function doApproveSellerApp(id){
  if(!confirm('Xác nhận duyệt hồ sơ đăng ký Seller này?\nShop sẽ được kích hoạt ngay sau khi duyệt.'))return;
  const idx=sellerApps.findIndex(a=>a.id===id);if(idx===-1)return;
  sellerApps[idx].status='approved';sellerApps[idx].reviewedBy='Admin EduMart';sellerApps[idx].reviewedAt=todayStr();
  saveSellerApps();
  const app=sellerApps[idx];
  const newId='as-'+id;
  if(!activeSellers.find(s=>s.id===newId)){
    activeSellers.unshift({id:newId,shopName:app.shopName,ownerName:app.ownerName,email:app.email,phone:app.phone,joinedAt:todayStr(),
      status:'active',category:app.category,rating:0,totalProducts:0,
      stats:{totalOrders:0,totalRevenue:0,returnRate:0,thisMonthOrders:0,thisMonthRev:0,growth:0},
      violations:[],commissionOverride:null,warnings:0});
    saveActiveSellers();
  }
  toast('✓ Đã duyệt: '+app.shopName+' — Shop đã được kích hoạt');
  admShopsView='list';admShopsSelectedId=null;admShopsTab='pending';renderAccount();
}
function doRejectSellerApp(id){
  const reason=prompt('Lý do từ chối hồ sơ (bắt buộc):','');
  if(reason===null)return;
  if(!reason.trim()){toast('Vui lòng nhập lý do từ chối');return;}
  const idx=sellerApps.findIndex(a=>a.id===id);if(idx===-1)return;
  sellerApps[idx].status='rejected';sellerApps[idx].reviewNote=reason.trim();
  sellerApps[idx].reviewedBy='Admin EduMart';sellerApps[idx].reviewedAt=todayStr();
  saveSellerApps();
  toast('Đã từ chối hồ sơ: '+sellerApps[idx].shopName);
  admShopsView='list';admShopsSelectedId=null;renderAccount();
}
function doMoreInfoSellerApp(id){
  const msg=prompt('Nội dung yêu cầu bổ sung thông tin:','');
  if(msg===null)return;
  if(!msg.trim()){toast('Vui lòng nhập nội dung yêu cầu');return;}
  const idx=sellerApps.findIndex(a=>a.id===id);if(idx===-1)return;
  sellerApps[idx].status='more-info';sellerApps[idx].reviewNote=msg.trim();
  sellerApps[idx].reviewedBy='Admin EduMart';sellerApps[idx].reviewedAt=todayStr();
  saveSellerApps();
  toast('Đã gửi yêu cầu bổ sung tới: '+sellerApps[idx].shopName);
  admShopsView='list';admShopsSelectedId=null;renderAccount();
}
function doWarnSeller(id){
  const reason=prompt('Nội dung cảnh báo gửi tới seller:','');
  if(reason===null)return;
  if(!reason.trim()){toast('Vui lòng nhập nội dung cảnh báo');return;}
  const idx=activeSellers.findIndex(s=>s.id===id);if(idx===-1)return;
  activeSellers[idx].warnings=(activeSellers[idx].warnings||0)+1;
  activeSellers[idx].status='warning';
  activeSellers[idx].violations.push({id:'v-'+id+'-w'+activeSellers[idx].warnings,type:'other',desc:reason.trim(),
    date:todayStr(),severity:'low',action:'warning',note:'Cảnh báo lần '+activeSellers[idx].warnings+'. Ghi nhận bởi Admin EduMart.'});
  saveActiveSellers();
  toast('Đã gửi cảnh báo tới: '+activeSellers[idx].shopName);renderAccount();
}
function doSuspendSeller(id){
  const reason=prompt('Lý do đình chỉ (bắt buộc):','');
  if(reason===null)return;
  if(!reason.trim()){toast('Vui lòng nhập lý do đình chỉ');return;}
  const daysStr=prompt('Số ngày đình chỉ:','30');
  if(daysStr===null)return;
  const days=Math.max(1,parseInt(daysStr)||30);
  const idx=activeSellers.findIndex(s=>s.id===id);if(idx===-1)return;
  activeSellers[idx].status='suspended';activeSellers[idx].suspendedReason=reason.trim();
  const end=new Date();end.setDate(end.getDate()+days);
  activeSellers[idx].suspendedUntil=end.getDate()+'/'+(end.getMonth()+1)+'/'+end.getFullYear();
  activeSellers[idx].violations.push({id:'v-'+id+'-s'+Date.now().toString(36),type:'other',desc:reason.trim(),
    date:todayStr(),severity:'high',action:'suspended',note:'Đình chỉ '+days+' ngày (đến '+activeSellers[idx].suspendedUntil+'). Thực hiện bởi Admin EduMart.'});
  saveActiveSellers();
  toast('Đã đình chỉ seller: '+activeSellers[idx].shopName+' ('+days+' ngày)');renderAccount();
}
function doLockSeller(id){
  const reason=prompt('Lý do khóa vĩnh viễn tài khoản seller:','');
  if(reason===null)return;
  if(!reason.trim()){toast('Vui lòng nhập lý do');return;}
  if(!confirm('Xác nhận KHÓA VĨNH VIỄN seller này?\n\nHành động sẽ vô hiệu hóa toàn bộ shop, sản phẩm và ngừng thanh toán cho seller.'))return;
  const idx=activeSellers.findIndex(s=>s.id===id);if(idx===-1)return;
  activeSellers[idx].status='locked';
  activeSellers[idx].violations.push({id:'v-'+id+'-lk'+Date.now().toString(36),type:'other',desc:reason.trim(),
    date:todayStr(),severity:'high',action:'locked',note:'Khóa vĩnh viễn. Thực hiện bởi Admin EduMart.'});
  saveActiveSellers();
  toast('Đã khóa tài khoản seller: '+activeSellers[idx].shopName);renderAccount();
}
function doReactivateSeller(id){
  const s=activeSellers.find(x=>x.id===id);if(!s)return;
  if(!confirm('Mở lại tài khoản seller "'+s.shopName+'"?\nSeller sẽ được hoạt động bình thường trở lại.'))return;
  const idx=activeSellers.findIndex(x=>x.id===id);
  activeSellers[idx].status='active';delete activeSellers[idx].suspendedReason;delete activeSellers[idx].suspendedUntil;
  saveActiveSellers();
  toast('Đã mở lại seller: '+s.shopName);renderAccount();
}
function doSetCategoryCommission(catKey,catLbl){
  const cur=commissionCfg.byCategory[catKey]||0;
  const input=prompt('Mức hoa hồng mới cho danh mục "'+catLbl+'" (%):\nHiện tại: '+cur+'%',''+cur);
  if(input===null)return;
  const newRate=parseFloat(input);
  if(isNaN(newRate)||newRate<0||newRate>100){toast('Mức hoa hồng không hợp lệ (0 – 100%)');return;}
  const reason=prompt('Lý do thay đổi (không bắt buộc):','');
  if(reason===null)return;
  commissionCfg.byCategory[catKey]=newRate;
  commissionCfg.history.push({id:'ch-'+Date.now().toString(36),date:todayStr(),
    field:'cat:'+catKey,oldVal:cur,newVal:newRate,by:'Admin EduMart',reason:(reason||'').trim()});
  saveCommissionCfg();
  toast('Đã cập nhật hoa hồng danh mục '+catLbl+': '+newRate+'%');renderAccount();
}
function doSetSellerCommission(sellerId){
  const s=activeSellers.find(x=>x.id===sellerId);if(!s)return;
  const cur=s.commissionOverride!=null?s.commissionOverride:(commissionCfg.byCategory[s.category]||0);
  const input=prompt('Mức hoa hồng đặc biệt cho "'+s.shopName+'" (%):\nMức danh mục hiện tại: '+(commissionCfg.byCategory[s.category]||0)+'%',''+cur);
  if(input===null)return;
  const newRate=parseFloat(input);
  if(isNaN(newRate)||newRate<0||newRate>100){toast('Mức hoa hồng không hợp lệ');return;}
  const reason=prompt('Lý do (không bắt buộc):','');
  if(reason===null)return;
  const old=s.commissionOverride!=null?s.commissionOverride:(commissionCfg.byCategory[s.category]||0);
  const idx=activeSellers.findIndex(x=>x.id===sellerId);
  activeSellers[idx].commissionOverride=newRate;
  commissionCfg.history.push({id:'ch-'+Date.now().toString(36),date:todayStr(),
    field:'seller:'+sellerId,oldVal:old,newVal:newRate,by:'Admin EduMart',reason:(reason||'').trim()});
  saveActiveSellers();saveCommissionCfg();
  toast('Đã đặt hoa hồng đặc biệt cho '+s.shopName+': '+newRate+'%');renderAccount();
}
function doSetSellerCommissionCustom(){
  const list=activeSellers.filter(s=>s.status!=='locked');
  if(!list.length){toast('Không có seller nào đang hoạt động');return;}
  const names=list.map((s,i)=>(i+1)+'. '+s.shopName).join('\n');
  const pick=parseInt(prompt('Chọn seller theo số thứ tự:\n'+names,'1'));
  if(isNaN(pick)||pick<1||pick>list.length)return;
  doSetSellerCommission(list[pick-1].id);
}
function doRemoveSellerCommission(sellerId){
  const s=activeSellers.find(x=>x.id===sellerId);if(!s)return;
  const defRate=commissionCfg.byCategory[s.category]||0;
  if(!confirm('Xóa mức hoa hồng đặc biệt của "'+s.shopName+'"?\nSeller sẽ về lại mức danh mục: '+defRate+'%'))return;
  const old=s.commissionOverride;
  const idx=activeSellers.findIndex(x=>x.id===sellerId);
  activeSellers[idx].commissionOverride=null;
  commissionCfg.history.push({id:'ch-'+Date.now().toString(36),date:todayStr(),
    field:'seller:'+sellerId,oldVal:old,newVal:defRate,by:'Admin EduMart',reason:'Xóa ưu đãi đặc biệt, về lại mức danh mục'});
  saveActiveSellers();saveCommissionCfg();
  toast('Đã xóa hoa hồng đặc biệt của '+s.shopName);renderAccount();
}

/* ══════════════════════════════════════════
   QUẢN LÝ ĐƠN HÀNG — ADMIN
   ══════════════════════════════════════════ */
const ORD_STATUS={
  pending:'Chờ xác nhận',confirmed:'Đã xác nhận',processing:'Đang xử lý',
  shipping:'Đang giao',delivered:'Đã giao',completed:'Hoàn thành',
  cancelled:'Đã hủy',refunded:'Đã hoàn tiền'
};
const ORD_STATUS_BADGE={
  pending:'<span class="adm-badge adm-badge-orange">Chờ xác nhận</span>',
  confirmed:'<span class="adm-badge adm-badge-blue">Đã xác nhận</span>',
  processing:'<span class="adm-badge adm-badge-blue">Đang xử lý</span>',
  shipping:'<span class="adm-badge adm-badge-blue">Đang giao</span>',
  delivered:'<span class="adm-badge green">Đã giao</span>',
  completed:'<span class="adm-badge green">Hoàn thành</span>',
  cancelled:'<span class="adm-badge gray">Đã hủy</span>',
  refunded:'<span class="adm-badge red">Đã hoàn tiền</span>'
};
const COMPLAINT_STATUS_BADGE={
  open:'<span class="adm-badge red">Mới mở</span>',
  investigating:'<span class="adm-badge adm-badge-orange">Đang xem xét</span>',
  resolved:'<span class="adm-badge green">Đã giải quyết</span>',
  rejected:'<span class="adm-badge gray">Đã từ chối</span>'
};
const REFUND_STATUS_BADGE={
  requested:'<span class="adm-badge adm-badge-orange">Yêu cầu hoàn</span>',
  processing:'<span class="adm-badge adm-badge-blue">Đang xử lý</span>',
  completed:'<span class="adm-badge green">Đã hoàn tiền</span>',
  rejected:'<span class="adm-badge gray">Từ chối hoàn</span>'
};
const PAY_LBL={momo:'Ví MoMo',cod:'Tiền mặt (COD)',bank:'Chuyển khoản',card:'Thẻ ngân hàng'};

function adminOrdersMgmt(){
  if(admOrdersView==='detail'&&admOrdersSelectedId)return adminOrderDetail(admOrdersSelectedId);
  return adminOrdersMain();
}

function adminOrdersMain(){
  const pendingCnt=sysOrders.filter(o=>o.status==='pending').length;
  const openComplaint=sysOrders.filter(o=>o.complaint&&o.complaint.status==='open').length;
  const tabs=[['all','Tất cả đơn hàng'],['complaints','Khiếu nại'],['log','Nhật ký can thiệp']];
  const tabHtml=tabs.map(([k,l])=>
    '<button class="adm-shops-tab'+(admOrdersTab===k?' on':'')+'" onclick="admOrdersTab=\''+k+'\';renderAccount()">'+l+
    (k==='all'&&pendingCnt>0?' <span class="adm-tab-badge">'+pendingCnt+'</span>':'')+
    (k==='complaints'&&openComplaint>0?' <span class="adm-tab-badge">'+openComplaint+'</span>':'')+
    '</button>'
  ).join('');
  let content='';
  if(admOrdersTab==='all')content=adminOrdersAllList();
  else if(admOrdersTab==='complaints')content=adminOrdersComplaints();
  else content=adminOrdersInterventionLog();
  return '<div class="adm-shops-tabs">'+tabHtml+'</div>'+content;
}

/* ── TAB 1: TẤT CẢ ĐƠN HÀNG ──────────────────── */
function adminOrdersAllList(){
  const q=(admOrdersSearch||'').toLowerCase().trim();
  const statusF=admOrdersStatusFilter;
  const sellerF=admOrdersSellerFilter;
  let list=sysOrders.filter(o=>{
    if(statusF!=='all'&&o.status!==statusF)return false;
    if(sellerF!=='all'&&o.sellerId!==sellerF)return false;
    if(q){
      const m=(o.id||'').toLowerCase().includes(q)||(o.buyerName||'').toLowerCase().includes(q)||(o.buyerEmail||'').toLowerCase().includes(q)||(o.sellerName||'').toLowerCase().includes(q);
      if(!m)return false;
    }
    return true;
  }).sort((a,b)=>b.id.localeCompare(a.id));

  const stats=[
    {lbl:'Tổng đơn',val:sysOrders.length,clr:'#7a4a8c'},
    {lbl:'Chờ xác nhận',val:sysOrders.filter(o=>o.status==='pending').length,clr:'#e67e22'},
    {lbl:'Đang giao',val:sysOrders.filter(o=>o.status==='shipping').length,clr:'#2980b9'},
    {lbl:'Hoàn thành',val:sysOrders.filter(o=>o.status==='completed'||o.status==='delivered').length,clr:'#27ae60'},
    {lbl:'Hủy / Hoàn',val:sysOrders.filter(o=>o.status==='cancelled'||o.status==='refunded').length,clr:'#c0392b'}
  ].map(s=>'<div class="adm-kpi" style="padding:14px 18px">'+
    '<div class="adm-kpi-val" style="color:'+s.clr+';font-size:24px">'+s.val+'</div>'+
    '<div class="adm-kpi-lbl">'+s.lbl+'</div></div>').join('');

  const statusOpts=['all','pending','confirmed','processing','shipping','delivered','completed','cancelled','refunded'].map(v=>
    '<option value="'+v+'"'+(statusF===v?' selected':'')+'>'+(v==='all'?'Tất cả trạng thái':ORD_STATUS[v]||v)+'</option>').join('');
  const sellerOpts='<option value="all"'+(sellerF==='all'?' selected':'')+'>Tất cả seller</option>'+
    activeSellers.map(s=>'<option value="'+s.id+'"'+(sellerF===s.id?' selected':'')+'>'+escHtml(s.shopName)+'</option>').join('');

  const PER=8,pages=Math.max(1,Math.ceil(list.length/PER));
  if(admOrdersPage>=pages)admOrdersPage=0;
  const slice=list.slice(admOrdersPage*PER,(admOrdersPage+1)*PER);
  const rows=slice.map(o=>{
    const flags=(o.complaint?'<span class="adm-ord-flag complaint" title="Có khiếu nại"> ⚑</span>':'')+
                (o.refund?'<span class="adm-ord-flag refund" title="Có hoàn tiền"> ↩</span>':'');
    return '<tr class="adm-usr-row" onclick="admOrdersSelectedId=\''+o.id+'\';admOrdersView=\'detail\';renderAccount()">'+
      '<td style="font-weight:600;font-family:monospace;white-space:nowrap">#'+escHtml(o.id)+'</td>'+
      '<td><div class="adm-usr-nm">'+escHtml(o.buyerName)+'</div><div class="adm-usr-em">'+escHtml(o.buyerEmail)+'</div></td>'+
      '<td class="adm-usr-em">'+escHtml(o.sellerName)+'</td>'+
      '<td style="text-align:center">'+o.items.length+'</td>'+
      '<td style="font-weight:500;white-space:nowrap">'+fmt(o.total)+'</td>'+
      '<td class="adm-usr-date">'+escHtml(o.orderDate)+'</td>'+
      '<td>'+(ORD_STATUS_BADGE[o.status]||o.status)+flags+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admOrdersSelectedId=\''+o.id+'\';admOrdersView=\'detail\';renderAccount()">Chi tiết</button>'+
      '</td></tr>';
  }).join('');
  const hasFilter=q||statusF!=='all'||sellerF!=='all';
  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admOrdersPage===0?'disabled':'')+' onclick="admOrdersPage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admOrdersPage+1)+'/'+pages+' · <b>'+list.length+'</b> đơn</span>'+
    '<button class="adm-pager-btn" '+(admOrdersPage>=pages-1?'disabled':'')+' onclick="admOrdersPage++;renderAccount()">Tiếp →</button>'+
  '</div>';
  return '<div class="adm-kpi-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:16px">'+stats+'</div>'+
    '<div class="adm-usr-toolbar" style="margin-bottom:12px"><div style="display:flex;gap:8px;flex-wrap:wrap">'+
      '<input class="adm-usr-search" placeholder="Tìm mã đơn, người mua, seller..." value="'+escHtml(admOrdersSearch)+'" oninput="admOrdersSearch=this.value;admOrdersPage=0;renderAccount()" style="max-width:300px">'+
      '<select class="adm-filter-sel" onchange="admOrdersStatusFilter=this.value;admOrdersPage=0;renderAccount()">'+statusOpts+'</select>'+
      '<select class="adm-filter-sel" onchange="admOrdersSellerFilter=this.value;admOrdersPage=0;renderAccount()">'+sellerOpts+'</select>'+
      (hasFilter?'<button class="adm-row-btn" onclick="admOrdersSearch=\'\';admOrdersStatusFilter=\'all\';admOrdersSellerFilter=\'all\';renderAccount()">Xóa lọc</button>':'')+
    '</div></div>'+
    '<div style="overflow-x:auto"><table class="adm-usr-table"><thead><tr>'+
      '<th>Mã đơn</th><th>Người mua</th><th>Seller</th><th>SP</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Trạng thái</th><th></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>'+pager;
}

/* ── TAB 2: KHIẾU NẠI ──────────────────────────── */
function adminOrdersComplaints(){
  const list=sysOrders.filter(o=>!!o.complaint).sort((a,b)=>{
    const ord={open:0,investigating:1,resolved:2,rejected:3};
    return (ord[a.complaint.status]||9)-(ord[b.complaint.status]||9);
  });
  const stats=[
    {lbl:'Mới mở',val:list.filter(o=>o.complaint.status==='open').length,clr:'#c0392b'},
    {lbl:'Đang xem xét',val:list.filter(o=>o.complaint.status==='investigating').length,clr:'#e67e22'},
    {lbl:'Đã giải quyết',val:list.filter(o=>o.complaint.status==='resolved').length,clr:'#27ae60'},
    {lbl:'Đã từ chối',val:list.filter(o=>o.complaint.status==='rejected').length,clr:'#7a7a7a'}
  ].map(s=>'<div class="adm-kpi" style="padding:14px 18px">'+
    '<div class="adm-kpi-val" style="color:'+s.clr+';font-size:24px">'+s.val+'</div>'+
    '<div class="adm-kpi-lbl">'+s.lbl+'</div></div>').join('');
  const PER=8,pages=Math.max(1,Math.ceil(list.length/PER));
  if(admComplaintsPage>=pages)admComplaintsPage=0;
  const slice=list.slice(admComplaintsPage*PER,(admComplaintsPage+1)*PER);
  const rows=slice.map(o=>{
    const c=o.complaint;
    return '<tr class="adm-usr-row" onclick="admOrdersSelectedId=\''+o.id+'\';admOrdersView=\'detail\';renderAccount()">'+
      '<td style="font-weight:600;font-family:monospace;white-space:nowrap">#'+escHtml(o.id)+'</td>'+
      '<td><div class="adm-usr-nm">'+escHtml(o.buyerName)+'</div><div class="adm-usr-em">'+escHtml(o.buyerEmail)+'</div></td>'+
      '<td class="adm-usr-em">'+escHtml(o.sellerName)+'</td>'+
      '<td>'+escHtml(c.reason)+'</td>'+
      '<td class="adm-usr-date">'+escHtml(c.filedAt)+'</td>'+
      '<td>'+(COMPLAINT_STATUS_BADGE[c.status]||c.status)+'</td>'+
      '<td class="adm-row-actions" onclick="event.stopPropagation()">'+
        '<button class="adm-row-btn" onclick="admOrdersSelectedId=\''+o.id+'\';admOrdersView=\'detail\';renderAccount()">Xử lý</button>'+
        (c.status==='open'?'<button class="adm-row-btn adm-unlock-btn" onclick="event.stopPropagation();doResolveComplaint(\''+o.id+'\')">✓ Giải quyết</button>':'')+
      '</td></tr>';
  }).join('');
  const pager='<div class="adm-pager">'+
    '<button class="adm-pager-btn" '+(admComplaintsPage===0?'disabled':'')+' onclick="admComplaintsPage--;renderAccount()">← Trước</button>'+
    '<span>Trang '+(admComplaintsPage+1)+'/'+pages+' · <b>'+list.length+'</b> khiếu nại</span>'+
    '<button class="adm-pager-btn" '+(admComplaintsPage>=pages-1?'disabled':'')+' onclick="admComplaintsPage++;renderAccount()">Tiếp →</button>'+
  '</div>';
  return '<div class="adm-kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">'+stats+'</div>'+
    '<div style="overflow-x:auto"><table class="adm-usr-table"><thead><tr>'+
      '<th>Mã đơn</th><th>Người mua</th><th>Seller</th><th>Lý do khiếu nại</th><th>Ngày gửi</th><th>Trạng thái</th><th></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>'+pager;
}

/* ── TAB 3: NHẬT KÝ CAN THIỆP ─────────────────── */
function adminOrdersInterventionLog(){
  const allLogs=[];
  sysOrders.forEach(o=>{(o.adminLog||[]).forEach(l=>{allLogs.push({...l,orderId:o.id,buyerName:o.buyerName});});});
  allLogs.sort((a,b)=>b.id.localeCompare(a.id));
  if(!allLogs.length)return '<div class="acct-card" style="text-align:center;padding:32px"><p style="color:var(--text-soft)">Chưa có can thiệp nào được ghi nhận.</p></div>';
  const rows=allLogs.map(l=>
    '<tr>'+
      '<td style="font-family:monospace;white-space:nowrap"><button class="adm-ord-link-btn" onclick="admOrdersSelectedId=\''+escHtml(l.orderId)+'\';admOrdersView=\'detail\';renderAccount()">#'+escHtml(l.orderId)+'</button></td>'+
      '<td class="adm-usr-em">'+escHtml(l.buyerName)+'</td>'+
      '<td style="font-weight:500">'+escHtml(l.action)+'</td>'+
      '<td>'+escHtml(l.note||'—')+'</td>'+
      '<td class="adm-usr-date">'+escHtml(l.date)+'</td>'+
      '<td class="adm-usr-em">'+escHtml(l.by)+'</td>'+
    '</tr>'
  ).join('');
  return '<div style="overflow-x:auto"><table class="adm-usr-table"><thead><tr>'+
    '<th>Mã đơn</th><th>Người mua</th><th>Hành động</th><th>Ghi chú</th><th>Ngày</th><th>Admin</th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

/* ── CHI TIẾT ĐƠN HÀNG ─────────────────────────── */
function adminOrderDetail(id){
  const o=sysOrders.find(x=>x.id===id);
  if(!o)return '<div class="acct-card"><p>Không tìm thấy đơn hàng.</p></div>';
  const back='<button class="adm-back-btn" onclick="admOrdersView=\'list\';admOrdersSelectedId=null;renderAccount()">← Danh sách đơn hàng</button>';

  const itemsHtml=o.items.map(it=>
    '<tr><td>'+escHtml(it.prodName)+'</td>'+
    '<td style="text-align:center">'+it.qty+'</td>'+
    '<td style="text-align:right;white-space:nowrap">'+fmt(it.unitPrice)+'</td>'+
    '<td style="text-align:right;font-weight:500;white-space:nowrap">'+fmt(it.qty*it.unitPrice)+'</td></tr>'
  ).join('');

  const timelineHtml=(o.statusHistory||[]).map(h=>
    '<div class="adm-ord-timeline-item">'+
      '<div class="adm-ord-timeline-dot"></div>'+
      '<div class="adm-ord-timeline-body">'+
        '<div class="adm-ord-timeline-status">'+(ORD_STATUS[h.status]||h.status)+'</div>'+
        '<div class="adm-ord-timeline-meta">'+escHtml(h.date)+' · '+escHtml(h.note)+(h.by&&h.by!=='system'?' · <em>'+escHtml(h.by)+'</em>':'')+'</div>'+
      '</div></div>'
  ).join('');

  /* Complaint block */
  let complaintHtml;
  if(o.complaint){
    const c=o.complaint;
    complaintHtml='<div class="adm-ord-section">'+
      '<div class="adm-ncc-doc-title">📩 Khiếu nại</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0">'+
        '<div><div class="adm-usr-em">Lý do</div><div style="font-weight:500">'+escHtml(c.reason)+'</div></div>'+
        '<div><div class="adm-usr-em">Trạng thái</div>'+(COMPLAINT_STATUS_BADGE[c.status]||c.status)+'</div>'+
        '<div><div class="adm-usr-em">Ngày gửi</div><div>'+escHtml(c.filedAt)+'</div></div>'+
        (c.resolvedAt?'<div><div class="adm-usr-em">Ngày xử lý</div><div>'+escHtml(c.resolvedAt)+' · <em>'+escHtml(c.resolvedBy||'')+'</em></div></div>':'<div></div>')+
      '</div>'+
      '<div class="adm-ord-complaint-desc">'+escHtml(c.desc)+'</div>'+
      (c.resolution?'<div class="adm-ncc-note blue" style="margin-top:10px"><div class="adm-ncc-note-label">Kết quả xử lý</div>'+escHtml(c.resolution)+'</div>':'')+
      ((c.status==='open'||c.status==='investigating')
        ?'<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">'+
            '<button class="adm-row-btn adm-unlock-btn" onclick="doResolveComplaint(\''+id+'\')">✓ Giải quyết</button>'+
            (c.status==='open'?'<button class="adm-row-btn" onclick="doInvestigateComplaint(\''+id+'\')">🔍 Đang xem xét</button>':'')+
            '<button class="adm-row-btn adm-lock-btn" onclick="doRejectComplaint(\''+id+'\')">✕ Từ chối</button>'+
          '</div>'
        :'')+
    '</div>';
  } else {
    complaintHtml='<div class="adm-ord-section">'+
      '<div class="adm-ncc-doc-title">📩 Khiếu nại</div>'+
      '<p style="color:var(--text-soft);font-size:13px;margin:8px 0">Không có khiếu nại.</p>'+
      '<button class="adm-row-btn" onclick="doOpenComplaint(\''+id+'\')">+ Mở khiếu nại thay mặt người mua</button>'+
    '</div>';
  }

  /* Refund block */
  let refundHtml;
  if(o.refund){
    const r=o.refund;
    refundHtml='<div class="adm-ord-section">'+
      '<div class="adm-ncc-doc-title">💰 Hoàn tiền</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0">'+
        '<div><div class="adm-usr-em">Số tiền hoàn</div><div style="font-size:18px;font-weight:700;color:#c0392b">'+fmt(r.amount)+'</div></div>'+
        '<div><div class="adm-usr-em">Trạng thái</div>'+(REFUND_STATUS_BADGE[r.status]||r.status)+'</div>'+
        '<div><div class="adm-usr-em">Lý do</div><div>'+escHtml(r.reason)+'</div></div>'+
        '<div><div class="adm-usr-em">Yêu cầu lúc</div><div>'+escHtml(r.requestedAt)+'</div></div>'+
      '</div>'+
      (r.note?'<div class="adm-ncc-note" style="margin-bottom:10px"><div class="adm-ncc-note-label">Ghi chú</div>'+escHtml(r.note)+'</div>':'')+
      (r.status==='requested'
        ?'<div style="display:flex;gap:8px;flex-wrap:wrap">'+
            '<button class="adm-row-btn adm-unlock-btn" onclick="doProcessRefund(\''+id+'\')">✓ Xử lý hoàn tiền</button>'+
            '<button class="adm-row-btn adm-lock-btn" onclick="doRejectRefund(\''+id+'\')">✕ Từ chối hoàn</button>'+
          '</div>'
        :r.status==='processing'?'<button class="adm-row-btn adm-unlock-btn" onclick="doCompleteRefund(\''+id+'\')">✓ Xác nhận đã hoàn tiền</button>'
        :'')+
    '</div>';
  } else {
    const canRefund=o.status==='delivered'||o.status==='completed'||o.status==='shipping';
    refundHtml='<div class="adm-ord-section">'+
      '<div class="adm-ncc-doc-title">💰 Hoàn tiền</div>'+
      '<p style="color:var(--text-soft);font-size:13px;margin:8px 0">Không có yêu cầu hoàn tiền.</p>'+
      (canRefund?'<button class="adm-row-btn" onclick="doInitRefund(\''+id+'\')">↩ Khởi tạo hoàn tiền</button>':'')+
    '</div>';
  }

  /* Admin intervention panel */
  const statusOptions=Object.entries(ORD_STATUS).map(([k,v])=>
    '<option value="'+k+'"'+(o.status===k?' selected':'')+'>'+v+'</option>').join('');
  const actionHtml='<div class="adm-ord-section" style="margin-bottom:14px">'+
    '<div class="adm-ncc-doc-title" style="margin-bottom:12px">⚙ Can thiệp thủ công</div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">'+
      '<select id="ordStatusOverride" class="adm-filter-sel">'+statusOptions+'</select>'+
      '<input id="ordStatusNote" class="adm-usr-search" placeholder="Lý do can thiệp (bắt buộc)" style="flex:1;min-width:180px">'+
      '<button class="adm-row-btn adm-unlock-btn" onclick="doUpdateOrderStatus(\''+id+'\')">Cập nhật trạng thái</button>'+
    '</div>'+
    '<div style="display:flex;gap:8px">'+
      '<input id="ordAdminNote" class="adm-usr-search" placeholder="Ghi chú vào nhật ký..." style="flex:1">'+
      '<button class="adm-row-btn" onclick="doAddOrderNote(\''+id+'\')">Ghi chú</button>'+
    '</div>'+
  '</div>';

  /* Intervention log */
  const logHtml=(o.adminLog||[]).length>0
    ?'<div style="overflow-x:auto"><table class="adm-usr-table"><thead><tr><th>Ngày</th><th>Hành động</th><th>Ghi chú</th><th>Admin</th></tr></thead><tbody>'+
        [...(o.adminLog||[])].reverse().map(l=>
          '<tr><td class="adm-usr-date">'+escHtml(l.date)+'</td><td style="font-weight:500">'+escHtml(l.action)+'</td><td>'+escHtml(l.note||'—')+'</td><td class="adm-usr-em">'+escHtml(l.by)+'</td></tr>'
        ).join('')+
      '</tbody></table></div>'
    :'<p style="color:var(--text-soft);font-size:13px;padding:8px 0">Chưa có can thiệp nào.</p>';

  return back+
    '<div class="acct-card">'+
    /* Header */
    '<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:16px">'+
      '<div>'+
        '<h3 style="margin:0 0 4px;font-size:17px;font-family:\'Lora\',serif;color:var(--ink-deep)">#'+escHtml(o.id)+'</h3>'+
        '<div class="adm-usr-em">Ngày đặt: <b>'+escHtml(o.orderDate)+'</b> · Thanh toán: <b>'+escHtml(PAY_LBL[o.paymentMethod]||o.paymentMethod)+'</b></div>'+
      '</div>'+
      (ORD_STATUS_BADGE[o.status]||o.status)+
    '</div>'+
    /* Info grid */
    '<div class="adm-ord-info-grid" style="margin-bottom:18px">'+
      '<div class="adm-ord-info-box"><div class="adm-usr-em" style="margin-bottom:4px">Người mua</div><div style="font-weight:500">'+escHtml(o.buyerName)+'</div><div class="adm-usr-em">'+escHtml(o.buyerEmail)+'</div><div class="adm-usr-em">'+escHtml(o.buyerPhone)+'</div></div>'+
      '<div class="adm-ord-info-box"><div class="adm-usr-em" style="margin-bottom:4px">Seller</div><div style="font-weight:500">'+escHtml(o.sellerName)+'</div></div>'+
      '<div class="adm-ord-info-box"><div class="adm-usr-em" style="margin-bottom:4px">Địa chỉ giao</div><div style="font-size:13.5px">'+escHtml(o.shippingAddr)+'</div></div>'+
    '</div>'+
    /* Items */
    '<div class="adm-ncc-doc-title" style="margin-bottom:8px">📦 Sản phẩm</div>'+
    '<div style="overflow-x:auto;margin-bottom:4px"><table class="adm-usr-table"><thead><tr><th>Tên sản phẩm</th><th style="text-align:center">SL</th><th style="text-align:right">Đơn giá</th><th style="text-align:right">Thành tiền</th></tr></thead><tbody>'+itemsHtml+'</tbody></table></div>'+
    /* Totals */
    '<div style="text-align:right;margin-bottom:18px;padding:10px 8px 0">'+
      '<div class="adm-usr-em">Tạm tính: <b>'+fmt(o.subtotal)+'</b></div>'+
      '<div class="adm-usr-em">Phí vận chuyển: <b>'+fmt(o.shippingFee)+'</b></div>'+
      (o.discount>0?'<div class="adm-usr-em" style="color:#1a7a4a">Giảm giá: <b>-'+fmt(o.discount)+'</b></div>':'')+
      '<div style="font-size:17px;font-weight:700;color:var(--ink-deep);margin-top:6px">Tổng cộng: '+fmt(o.total)+'</div>'+
    '</div>'+
    /* Timeline */
    '<div class="adm-ncc-doc-title" style="margin-bottom:10px">📋 Lịch sử trạng thái</div>'+
    '<div class="adm-ord-timeline" style="margin-bottom:20px">'+timelineHtml+'</div>'+
    /* Complaint + Refund side by side */
    '<div class="adm-ord-dual-grid" style="margin-bottom:18px">'+complaintHtml+refundHtml+'</div>'+
    /* Admin actions */
    actionHtml+
    /* Log */
    '<div class="adm-ncc-doc-title" style="margin-bottom:8px">📝 Nhật ký can thiệp</div>'+
    logHtml+
  '</div>';
}

/* ── ACTION FUNCTIONS ──────────────────────────── */
function doUpdateOrderStatus(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o)return;
  const el=document.getElementById('ordStatusOverride');
  const noteEl=document.getElementById('ordStatusNote');
  if(!el||!noteEl)return;
  const newStatus=el.value;
  const note=(noteEl.value||'').trim();
  if(!note){toast('Nhập lý do can thiệp');noteEl.focus();return;}
  if(newStatus===o.status){toast('Trạng thái không thay đổi');return;}
  const old=o.status;
  o.status=newStatus;
  o.statusHistory.push({status:newStatus,date:todayStr(),note:'[Admin] '+note,by:'Admin EduMart'});
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Cập nhật trạng thái: '+(ORD_STATUS[old]||old)+' → '+(ORD_STATUS[newStatus]||newStatus),note,date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();
  toast('Đã cập nhật: #'+ordId+' → '+(ORD_STATUS[newStatus]||newStatus));renderAccount();
}

function doAddOrderNote(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o)return;
  const el=document.getElementById('ordAdminNote');
  const note=(el?el.value:'').trim();
  if(!note){toast('Nhập nội dung ghi chú');return;}
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Ghi chú admin',note,date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã ghi chú vào đơn #'+ordId);renderAccount();
}

function doOpenComplaint(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||o.complaint)return;
  const reason=prompt('Lý do khiếu nại:');if(!reason)return;
  const desc=prompt('Mô tả chi tiết:');if(desc===null)return;
  o.complaint={reason:reason.trim(),desc:(desc||'').trim(),filedAt:todayStr(),status:'open',resolution:'',resolvedAt:null,resolvedBy:null};
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Mở khiếu nại thay mặt người mua',note:reason.trim(),date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã mở khiếu nại cho đơn #'+ordId);renderAccount();
}

function doInvestigateComplaint(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.complaint)return;
  o.complaint.status='investigating';
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Chuyển khiếu nại sang Đang xem xét',note:'',date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã chuyển sang Đang xem xét');renderAccount();
}

function doResolveComplaint(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.complaint)return;
  const resolution=prompt('Kết quả giải quyết:');if(!resolution)return;
  o.complaint.status='resolved';o.complaint.resolution=resolution.trim();
  o.complaint.resolvedAt=todayStr();o.complaint.resolvedBy='Admin EduMart';
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Giải quyết khiếu nại',note:resolution.trim(),date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã giải quyết khiếu nại đơn #'+ordId);renderAccount();
}

function doRejectComplaint(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.complaint)return;
  const reason=prompt('Lý do từ chối khiếu nại:');if(!reason)return;
  o.complaint.status='rejected';o.complaint.resolution=reason.trim();
  o.complaint.resolvedAt=todayStr();o.complaint.resolvedBy='Admin EduMart';
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Từ chối khiếu nại',note:reason.trim(),date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã từ chối khiếu nại');renderAccount();
}

function doInitRefund(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||o.refund)return;
  const reason=prompt('Lý do hoàn tiền:');if(!reason)return;
  const amtStr=prompt('Số tiền hoàn (đồng) — Tổng đơn: '+o.total.toLocaleString('vi-VN')+'đ:',String(o.total));
  if(amtStr===null)return;
  const amount=parseInt(String(amtStr).replace(/\D/g,''));
  if(!amount||amount<=0){toast('Số tiền không hợp lệ');return;}
  if(amount>o.total){toast('Số tiền hoàn không thể lớn hơn tổng đơn');return;}
  o.refund={amount,reason:reason.trim(),status:'requested',requestedAt:todayStr(),processedAt:null,processedBy:null,note:''};
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Khởi tạo hoàn tiền: '+fmt(amount),note:reason.trim(),date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã khởi tạo yêu cầu hoàn tiền: '+fmt(amount));renderAccount();
}

function doProcessRefund(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.refund)return;
  const note=prompt('Ghi chú xử lý (tùy chọn):')||'';
  o.refund.status='processing';o.refund.note=note;
  o.refund.processedAt=todayStr();o.refund.processedBy='Admin EduMart';
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Bắt đầu xử lý hoàn tiền: '+fmt(o.refund.amount),note,date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã chuyển sang Đang xử lý hoàn tiền');renderAccount();
}

function doCompleteRefund(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.refund)return;
  if(!confirm('Xác nhận đã hoàn tiền '+fmt(o.refund.amount)+' cho khách hàng?'))return;
  o.refund.status='completed';o.refund.processedAt=todayStr();
  o.status='refunded';
  o.statusHistory.push({status:'refunded',date:todayStr(),note:'Hoàn tiền thành công: '+fmt(o.refund.amount),by:'Admin EduMart'});
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Hoàn tiền hoàn tất: '+fmt(o.refund.amount),note:'',date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Hoàn tiền hoàn tất cho đơn #'+ordId);renderAccount();
}

function doRejectRefund(ordId){
  const o=sysOrders.find(x=>x.id===ordId);if(!o||!o.refund)return;
  const reason=prompt('Lý do từ chối hoàn tiền:');if(!reason)return;
  o.refund.status='rejected';o.refund.note=reason.trim();
  o.refund.processedAt=todayStr();o.refund.processedBy='Admin EduMart';
  o.adminLog.push({id:'log-'+Date.now().toString(36),action:'Từ chối hoàn tiền',note:reason.trim(),date:todayStr(),by:'Admin EduMart'});
  saveAdminOrders();toast('Đã từ chối yêu cầu hoàn tiền');renderAccount();
}

/* ═══════════════════════════════════════════════════
   QUẢN LÝ TÀI CHÍNH
═══════════════════════════════════════════════════ */
const WD_STATUS_BADGE={
  pending:'<span class="adm-badge adm-badge-orange">Chờ duyệt</span>',
  processing:'<span class="adm-badge adm-badge-blue">Đang xử lý</span>',
  paid:'<span class="adm-badge adm-badge-green">Đã thanh toán</span>',
  rejected:'<span class="adm-badge red">Từ chối</span>'
};

function adminFinance(){
  const tab=admFinTab;
  const tabs=[['overview','Tổng quan tài chính'],['withdrawals','Thanh toán Seller'],['history','Lịch sử thanh toán']];
  const pendingCnt=finWithdrawals.filter(w=>w.status==='pending').length;
  const content=tab==='withdrawals'?adminFinWithdrawals():tab==='history'?adminFinPayHistory():adminFinOverview();
  return `<div class="adm-section">
  <h2 class="adm-section-title">Quản lý Tài chính</h2>
  <div class="adm-shops-tabs">
    ${tabs.map(([k,lbl])=>`<button class="adm-tab-btn${tab===k?' active':''}" onclick="admFinTab='${k}';renderAccount()">
      ${escHtml(lbl)}${k==='withdrawals'&&pendingCnt>0?` <span class="adm-tab-badge">${pendingCnt}</span>`:''}
    </button>`).join('')}
  </div>
  ${content}
  </div>`;
}

function adminFinOverview(){
  /* ── KPI row ── */
  const totalGMV=FIN_GMV.reduce((a,b)=>a+b,0);
  const totalComm=FIN_COMM.reduce((a,b)=>a+b,0);
  const latestGMV=FIN_GMV[FIN_GMV.length-1];
  const prevGMV=FIN_GMV[FIN_GMV.length-2];
  const growthPct=Math.round((latestGMV-prevGMV)/prevGMV*100*10)/10;
  const paidTotal=finPayments.reduce((a,p)=>a+p.amount,0);
  const pendingPayout=finWithdrawals.filter(w=>w.status==='pending').reduce((a,w)=>a+w.amount,0);

  /* ── Monthly bar chart ── */
  const maxMon=Math.max(...FIN_GMV);
  const maxComm=Math.max(...FIN_COMM);
  const barChart=`<div class="fin-chart-wrap">
    <div class="fin-chart-title">Doanh thu theo tháng (triệu đồng)</div>
    <div class="fin-chart-bars">
      ${FIN_MONTHS.map((m,i)=>`<div class="fin-chart-col">
        <div class="fin-bar-wrap">
          <div class="fin-bar fin-bar-gmv" style="height:${Math.round(FIN_GMV[i]/maxMon*110)}px" title="GMV: ${FIN_GMV[i]}M"></div>
          <div class="fin-bar fin-bar-comm" style="height:${Math.round(FIN_COMM[i]/maxComm*110)}px" title="Hoa hồng: ${FIN_COMM[i]}M"></div>
        </div>
        <div class="fin-chart-label">${m}</div>
      </div>`).join('')}
    </div>
    <div class="fin-chart-legend">
      <span class="fin-legend-dot" style="background:#c0392b;"></span>GMV
      <span class="fin-legend-dot" style="background:#27ae60;margin-left:16px;"></span>Hoa hồng
    </div>
  </div>`;

  /* ── Category breakdown ── */
  const catRows=FIN_CATS.map(c=>`<div class="fin-cat-row">
    <div class="fin-cat-name">${escHtml(c.name)}</div>
    <div class="fin-cat-bar-bg"><div class="fin-cat-bar-fill" style="width:${c.pct}%;background:${c.clr};"></div></div>
    <div class="fin-cat-pct">${c.pct}%</div>
    <div class="fin-cat-val">${c.rate}% hoa hồng · ${c.commM}M</div>
  </div>`).join('');

  /* ── Top sellers ── */
  const topSellers=[
    {name:'NXB Giáo dục VN',gmv:238.3,comm:19.1},
    {name:'Fahasa Official',gmv:137.9,comm:13.8},
    {name:'Alphabooks',gmv:112.9,comm:13.5},
    {name:'Đinh Tị Books',gmv:87.8,comm:10.5},
    {name:'EduPro Thiết bị GD',gmv:62.4,comm:7.5}
  ];
  const topRows=topSellers.map((s,i)=>`<tr>
    <td style="padding:8px 10px;text-align:center;">${i+1}</td>
    <td style="padding:8px 10px;font-weight:600;">${escHtml(s.name)}</td>
    <td style="padding:8px 10px;text-align:right;">${s.gmv}M</td>
    <td style="padding:8px 10px;text-align:right;color:#27ae60;font-weight:600;">${s.comm}M</td>
  </tr>`).join('');

  return `<div class="adm-kpi-grid">
    <div class="adm-kpi"><div class="adm-kpi-lbl">Tổng GMV (6 tháng)</div><div class="adm-kpi-val">${totalGMV}M</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Tổng hoa hồng</div><div class="adm-kpi-val" style="color:#27ae60;">${totalComm.toFixed(1)}M</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Tăng trưởng tháng gần nhất</div><div class="adm-kpi-val">${admGrowth(growthPct)}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đã thanh toán Seller</div><div class="adm-kpi-val" style="color:#2980b9;">${fmtBig(paidTotal)}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đang chờ duyệt rút tiền</div><div class="adm-kpi-val" style="color:#e67e22;">${fmtBig(pendingPayout)}</div></div>
  </div>
  <div class="fin-dual-grid" style="margin-top:18px;">
    <div>
      ${barChart}
    </div>
    <div>
      <div class="fin-chart-title" style="margin-bottom:10px;">Phân bổ doanh thu theo danh mục</div>
      <div class="fin-cats">${catRows}</div>
    </div>
  </div>
  <div style="margin-top:18px;">
    <div class="fin-chart-title" style="margin-bottom:10px;">Top 5 Seller đóng góp doanh thu</div>
    <table class="adm-usr-table" style="width:100%;">
      <thead><tr style="background:var(--paper);">
        <th style="padding:8px 10px;text-align:center;width:40px;">#</th>
        <th style="padding:8px 10px;">Seller</th>
        <th style="padding:8px 10px;text-align:right;">GMV (6T)</th>
        <th style="padding:8px 10px;text-align:right;">Hoa hồng (6T)</th>
      </tr></thead>
      <tbody>${topRows}</tbody>
    </table>
  </div>`;
}

function adminFinWithdrawals(){
  const subTab=admFinWithdrawTab;
  const subTabs=[['pending','Chờ duyệt'],['processing','Đang xử lý'],['paid','Đã thanh toán'],['rejected','Từ chối']];
  const tabCounts={};
  subTabs.forEach(([k])=>{tabCounts[k]=finWithdrawals.filter(w=>w.status===k).length;});
  const items=finWithdrawals.filter(w=>w.status===subTab);

  const search=admFinWdSearch.toLowerCase();
  const filtered=search?items.filter(w=>w.sellerName.toLowerCase().includes(search)||w.id.toLowerCase().includes(search)):items;

  const cards=filtered.length===0?`<div style="padding:28px;text-align:center;color:var(--text-soft);">Không có yêu cầu nào.</div>`
  :filtered.map(w=>`<div class="fin-wd-card">
    <div class="fin-wd-header">
      <span class="fin-wd-id">${escHtml(w.id)}</span>
      ${WD_STATUS_BADGE[w.status]||''}
    </div>
    <div class="fin-wd-body">
      <div><b>${escHtml(w.sellerName)}</b></div>
      <div style="font-size:13px;color:var(--text-soft);margin-top:2px;">${escHtml(w.bank)}</div>
      <div style="margin-top:6px;font-size:13px;">Số tiền yêu cầu: <b style="color:var(--ink);font-size:15px;">${fmtBig(w.amount)}</b></div>
      <div style="font-size:12px;color:var(--text-soft);">Số dư khả dụng: ${fmtBig(w.availableBalance)}</div>
      <div style="font-size:12px;color:var(--text-soft);margin-top:4px;">Yêu cầu lúc: ${escHtml(w.requestedAt)}</div>
      ${w.processedAt?`<div style="font-size:12px;color:var(--text-soft);">Xử lý lúc: ${escHtml(w.processedAt)} bởi ${escHtml(w.processedBy)}</div>`:''}
      ${w.rejectedReason?`<div style="font-size:12.5px;color:#c0392b;margin-top:4px;padding:8px;background:#fdf2f2;border-radius:6px;">Lý do từ chối: ${escHtml(w.rejectedReason)}</div>`:''}
      ${w.note&&w.status==='processing'?`<div style="font-size:12.5px;color:#2980b9;margin-top:4px;">${escHtml(w.note)}</div>`:''}
    </div>
    ${subTab==='pending'?`<div class="fin-wd-actions">
      <button class="adm-row-btn" onclick="doApproveWithdrawal('${escHtml(w.id)}')">✓ Duyệt xử lý</button>
      <button class="adm-lock-btn" onclick="doRejectWithdrawal('${escHtml(w.id)}')">✗ Từ chối</button>
    </div>`:''}
    ${subTab==='processing'?`<div class="fin-wd-actions">
      <button class="adm-row-btn" style="background:#27ae60;" onclick="doCompleteWithdrawal('${escHtml(w.id)}')">✓ Xác nhận đã thanh toán</button>
    </div>`:''}
  </div>`).join('');

  return `<div class="adm-shops-tabs">
    ${subTabs.map(([k,lbl])=>`<button class="adm-tab-btn${subTab===k?' active':''}" onclick="admFinWithdrawTab='${k}';renderAccount()">
      ${escHtml(lbl)}${tabCounts[k]>0?' <span class="adm-tab-badge">'+tabCounts[k]+'</span>':''}
    </button>`).join('')}
  </div>
  <div style="margin-bottom:12px;">
    <input class="adm-search-inp" placeholder="Tìm theo tên seller / mã yêu cầu..." value="${escHtml(admFinWdSearch)}"
      oninput="admFinWdSearch=this.value;renderAccount()" style="max-width:320px;">
  </div>
  <div class="fin-wd-grid">${cards}</div>`;
}

function adminFinPayHistory(){
  const search=admFinPaySearch.toLowerCase();
  const filtered=search?finPayments.filter(p=>p.sellerName.toLowerCase().includes(search)||p.id.toLowerCase().includes(search)||p.ref.toLowerCase().includes(search)):finPayments;

  const PAGE=10, total=filtered.length, pages=Math.ceil(total/PAGE)||1;
  admFinPayPage=Math.min(admFinPayPage,pages-1);
  const slice=filtered.slice(admFinPayPage*PAGE,(admFinPayPage+1)*PAGE);

  const rows=slice.length===0?`<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--text-soft);">Không có giao dịch.</td></tr>`
  :slice.map(p=>`<tr class="adm-usr-row">
    <td style="padding:9px 10px;font-family:monospace;font-size:13px;">${escHtml(p.id)}</td>
    <td style="padding:9px 10px;font-weight:600;">${escHtml(p.sellerName)}</td>
    <td style="padding:9px 10px;text-align:right;font-weight:700;color:var(--ink);">${fmtBig(p.amount)}</td>
    <td style="padding:9px 10px;font-size:12px;color:var(--text-soft);">${escHtml(p.period)}</td>
    <td style="padding:9px 10px;font-size:12.5px;">${escHtml(p.paidAt)}</td>
    <td style="padding:9px 10px;font-family:monospace;font-size:12px;color:#2980b9;">${escHtml(p.ref)}</td>
  </tr>`).join('');

  const pager=pages>1?`<div class="adm-pager">
    ${admFinPayPage>0?`<button class="adm-pager-btn" onclick="admFinPayPage--;renderAccount()">← Trước</button>`:''}
    <span style="font-size:13px;">Trang ${admFinPayPage+1}/${pages}</span>
    ${admFinPayPage<pages-1?`<button class="adm-pager-btn" onclick="admFinPayPage++;renderAccount()">Tiếp →</button>`:''}
  </div>`:'';

  const totalPaid=finPayments.reduce((a,p)=>a+p.amount,0);

  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
    <div>
      <input class="adm-search-inp" placeholder="Tìm theo seller / mã giao dịch..." value="${escHtml(admFinPaySearch)}"
        oninput="admFinPaySearch=this.value;admFinPayPage=0;renderAccount()" style="max-width:300px;">
    </div>
    <div style="display:flex;gap:10px;align-items:center;">
      <span style="font-size:13.5px;color:var(--text-soft);">Tổng đã thanh toán: <b style="color:#27ae60;">${fmtBig(totalPaid)}</b></span>
      <button class="adm-row-btn" onclick="doExportFinReport()">⬇ Xuất báo cáo</button>
    </div>
  </div>
  <table class="adm-usr-table" style="width:100%;">
    <thead><tr style="background:var(--paper);">
      <th style="padding:9px 10px;">Mã giao dịch</th>
      <th style="padding:9px 10px;">Seller</th>
      <th style="padding:9px 10px;text-align:right;">Số tiền</th>
      <th style="padding:9px 10px;">Kỳ thanh toán</th>
      <th style="padding:9px 10px;">Ngày thanh toán</th>
      <th style="padding:9px 10px;">Mã tham chiếu</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
  ${pager}`;
}

function doApproveWithdrawal(id){
  const w=finWithdrawals.find(x=>x.id===id);if(!w)return;
  const note=prompt(`Ghi chú xử lý cho ${w.id} – ${w.sellerName}:\n(Để trống nếu không có)`)??'';
  w.status='processing';w.note=note.trim()||'Đang tiến hành chuyển khoản.';
  w.processedAt=todayStr();w.processedBy='Admin EduMart';
  saveFinWithdrawals();toast('Đã duyệt yêu cầu rút tiền '+id);renderAccount();
}

function doRejectWithdrawal(id){
  const w=finWithdrawals.find(x=>x.id===id);if(!w)return;
  const reason=prompt(`Lý do từ chối yêu cầu ${id} của ${w.sellerName}:`);
  if(!reason||!reason.trim())return;
  w.status='rejected';w.rejectedReason=reason.trim();
  w.processedAt=todayStr();w.processedBy='Admin EduMart';
  saveFinWithdrawals();toast('Đã từ chối yêu cầu rút tiền '+id);renderAccount();
}

function doCompleteWithdrawal(id){
  const w=finWithdrawals.find(x=>x.id===id);if(!w)return;
  const ref=prompt(`Mã tham chiếu giao dịch ngân hàng cho ${id}:`);
  if(!ref||!ref.trim()){toast('Cần nhập mã tham chiếu giao dịch');return;}
  if(!confirm(`Xác nhận đã chuyển ${fmtBig(w.amount)} cho ${w.sellerName}?\nMã tham chiếu: ${ref}`))return;
  w.status='paid';w.processedAt=todayStr();w.processedBy='Admin EduMart';
  saveFinWithdrawals();
  /* Tạo bản ghi lịch sử thanh toán */
  const payId='PAY-'+id;
  const existing=finPayments.find(p=>p.id===payId);
  if(!existing){
    finPayments.unshift({id:payId,sellerId:w.sellerId,sellerName:w.sellerName,amount:w.amount,
      period:w.requestedAt+' – '+todayStr(),paidAt:todayStr(),bank:w.bank,
      ref:ref.trim(),by:'Admin EduMart'});
    saveFinPayments();
  }
  toast('Đã hoàn tất thanh toán '+id);renderAccount();
}

function doExportFinReport(){
  const lines=['BÁO CÁO TÀI CHÍNH EDUMART','='.repeat(50),''];
  lines.push('TỔNG QUAN (6 THÁNG GẦN NHẤT)');
  lines.push('-'.repeat(40));
  FIN_MONTHS.forEach((m,i)=>{lines.push(`${m}: GMV ${FIN_GMV[i]}M – Hoa hồng ${FIN_COMM[i]}M`);});
  const tGMV=FIN_GMV.reduce((a,b)=>a+b,0);
  const tComm=FIN_COMM.reduce((a,b)=>a+b,0);
  lines.push('',`Tổng GMV: ${tGMV}M | Tổng hoa hồng: ${tComm.toFixed(1)}M`,'');
  lines.push('DOANH THU THEO DANH MỤC');
  lines.push('-'.repeat(40));
  FIN_CATS.forEach(c=>{lines.push(`${c.name}: ${c.pct}% tổng GMV – Hoa hồng ${c.rate}% – ${c.commM}M`);});
  lines.push('','LỊCH SỬ THANH TOÁN SELLER');
  lines.push('-'.repeat(40));
  finPayments.forEach(p=>{lines.push(`${p.paidAt} | ${p.id} | ${p.sellerName} | ${fmtBig(p.amount)} | REF: ${p.ref}`);});
  const totalPaid=finPayments.reduce((a,p)=>a+p.amount,0);
  lines.push('',`Tổng đã thanh toán: ${fmtBig(totalPaid)}`,'');
  lines.push('TRẠNG THÁI YÊU CẦU RÚT TIỀN');
  lines.push('-'.repeat(40));
  finWithdrawals.forEach(w=>{lines.push(`${w.id} | ${w.sellerName} | ${fmtBig(w.amount)} | ${w.status} | ${w.requestedAt}`);});
  lines.push('','Xuất lúc: '+new Date().toLocaleString('vi-VN'));
  const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='bao-cao-tai-chinh-edumart.txt';
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(url);toast('Đã xuất báo cáo tài chính');
}

/* ═══════════════════════════════════════════════════
   QUẢN LÝ NỘI DUNG (CMS)
═══════════════════════════════════════════════════ */
const BLOG_CATS={
  'hoc-tap':'Học tập & Kỹ năng',
  'tin-tuc':'Tin tức giáo dục',
  'thu-vien':'Thư viện sách',
  'chia-se':'Chia sẻ kinh nghiệm',
  'khuyen-mai':'Khuyến mãi & Ưu đãi'
};

function adminCms(){
  const tabs=[['blog','Blog'],['comments','Bình luận'],['banners','Banner & Quảng cáo'],['static','Trang tĩnh']];
  const pendingCmt=cmsComments.filter(c=>c.status==='pending').length;
  const content=admCmsTab==='comments'?adminCmsComments():
    admCmsTab==='banners'?adminCmsBanners():
    admCmsTab==='static'?adminCmsStatic():
    adminCmsBlogSection();
  return `<div class="adm-section">
  <h2 class="adm-section-title">Quản lý Nội dung</h2>
  <div class="adm-shops-tabs">
    ${tabs.map(([k,lbl])=>`<button class="adm-tab-btn${admCmsTab===k?' active':''}" onclick="admCmsTab='${k}';admBlogEditId=null;renderAccount()">
      ${escHtml(lbl)}${k==='comments'&&pendingCmt>0?' <span class="adm-tab-badge">'+pendingCmt+'</span>':''}
    </button>`).join('')}
  </div>
  ${content}
  </div>`;
}

/* ── BLOG ── */
function adminCmsBlogSection(){
  if(admBlogEditId!==null)return adminBlogEditor(admBlogEditId);
  return adminBlogList();
}

function adminBlogList(){
  const total=cmsBlogs.length;
  const publishedCnt=cmsBlogs.filter(b=>b.status==='published').length;
  const draftCnt=cmsBlogs.filter(b=>b.status==='draft').length;
  const hiddenCnt=cmsBlogs.filter(b=>b.status==='hidden').length;
  let items=[...cmsBlogs];
  if(admBlogStatusFilter!=='all')items=items.filter(b=>b.status===admBlogStatusFilter);
  if(admBlogCatFilter!=='all')items=items.filter(b=>b.category===admBlogCatFilter);
  if(admBlogSearch){const q=admBlogSearch.toLowerCase();items=items.filter(b=>b.title.toLowerCase().includes(q)||b.tags.join(' ').toLowerCase().includes(q));}
  items.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)||(b.createdAt>a.createdAt?1:-1));
  const PAGE=8,pages=Math.ceil(items.length/PAGE)||1;
  admBlogPage=Math.min(admBlogPage,pages-1);
  const slice=items.slice(admBlogPage*PAGE,(admBlogPage+1)*PAGE);
  const SBADGE={published:'<span class="adm-badge adm-badge-green">Đã xuất bản</span>',draft:'<span class="adm-badge adm-badge-orange">Nháp</span>',hidden:'<span class="adm-badge">Ẩn</span>'};
  const rows=slice.length===0?`<tr><td colspan="6" style="padding:20px;text-align:center;color:var(--text-soft);">Không có bài viết nào.</td></tr>`
  :slice.map(b=>`<tr class="adm-usr-row">
    <td style="padding:9px 10px;max-width:280px;">
      <div style="font-weight:600;">${b.featured?'<span style="color:#e67e22;margin-right:4px;">📌</span>':''}${escHtml(b.title)}</div>
      <div style="font-size:11.5px;color:var(--text-soft);margin-top:2px;">${escHtml(BLOG_CATS[b.category]||b.category)}${b.tags.length?' · '+escHtml(b.tags.slice(0,2).join(', ')):''}${b.authorName?' · '+escHtml(b.authorName):''}</div>
    </td>
    <td style="padding:9px 10px;">${SBADGE[b.status]||''}</td>
    <td style="padding:9px 10px;text-align:center;font-size:13px;">${b.views.toLocaleString('vi')}</td>
    <td style="padding:9px 10px;text-align:center;font-size:13px;">${b.commentCount}</td>
    <td style="padding:9px 10px;font-size:12.5px;color:var(--text-soft);">${escHtml(b.publishedAt||b.createdAt)}</td>
    <td style="padding:9px 10px;white-space:nowrap;">
      <button class="adm-row-btn" onclick="admBlogEditId='${escHtml(b.id)}';renderAccount()">Sửa</button>
      <button class="adm-row-btn" style="background:${b.featured?'#e67e22':'#7f8c8d'};" onclick="doToggleFeatured('${escHtml(b.id)}')">${b.featured?'Bỏ ghim':'📌 Ghim'}</button>
      <button class="adm-lock-btn" onclick="doDeleteBlog('${escHtml(b.id)}')">Xóa</button>
    </td>
  </tr>`).join('');
  const pager=pages>1?`<div class="adm-pager">${admBlogPage>0?`<button class="adm-pager-btn" onclick="admBlogPage--;renderAccount()">← Trước</button>`:''}<span style="font-size:13px;">Trang ${admBlogPage+1}/${pages}</span>${admBlogPage<pages-1?`<button class="adm-pager-btn" onclick="admBlogPage++;renderAccount()">Tiếp →</button>`:''}</div>`:'';
  return `<div class="adm-kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;">
    <div class="adm-kpi"><div class="adm-kpi-lbl">Tổng bài viết</div><div class="adm-kpi-val">${total}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đã xuất bản</div><div class="adm-kpi-val" style="color:#27ae60;">${publishedCnt}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Bản nháp</div><div class="adm-kpi-val" style="color:#e67e22;">${draftCnt}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đang ẩn</div><div class="adm-kpi-val" style="color:#95a5a6;">${hiddenCnt}</div></div>
  </div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center;">
    <button class="adm-row-btn" style="background:#27ae60;font-size:13.5px;padding:8px 16px;" onclick="admBlogEditId='new';renderAccount()">+ Viết bài mới</button>
    <input class="adm-search-inp" placeholder="Tìm bài viết, tag..." value="${escHtml(admBlogSearch)}" oninput="admBlogSearch=this.value;admBlogPage=0;renderAccount()" style="max-width:240px;">
    <select class="adm-filter-sel" onchange="admBlogStatusFilter=this.value;admBlogPage=0;renderAccount()">
      <option value="all"${admBlogStatusFilter==='all'?' selected':''}>Tất cả trạng thái</option>
      <option value="published"${admBlogStatusFilter==='published'?' selected':''}>Đã xuất bản</option>
      <option value="draft"${admBlogStatusFilter==='draft'?' selected':''}>Bản nháp</option>
      <option value="hidden"${admBlogStatusFilter==='hidden'?' selected':''}>Đang ẩn</option>
    </select>
    <select class="adm-filter-sel" onchange="admBlogCatFilter=this.value;admBlogPage=0;renderAccount()">
      <option value="all"${admBlogCatFilter==='all'?' selected':''}>Tất cả danh mục</option>
      ${Object.entries(BLOG_CATS).map(([k,v])=>`<option value="${k}"${admBlogCatFilter===k?' selected':''}>${escHtml(v)}</option>`).join('')}
    </select>
  </div>
  <table class="adm-usr-table" style="width:100%;">
    <thead><tr style="background:var(--paper);">
      <th style="padding:9px 10px;">Tiêu đề</th>
      <th style="padding:9px 10px;">Trạng thái</th>
      <th style="padding:9px 10px;text-align:center;">Lượt xem</th>
      <th style="padding:9px 10px;text-align:center;">Bình luận</th>
      <th style="padding:9px 10px;">Ngày đăng</th>
      <th style="padding:9px 10px;">Thao tác</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>${pager}`;
}

function adminBlogEditor(id){
  const isNew=id==='new';
  const def={id:'',title:'',category:'hoc-tap',tags:[],status:'draft',featured:false,thumbnail:'',excerpt:'',content:'<p>Bắt đầu viết nội dung bài viết tại đây...</p>',publishedAt:'',createdAt:'',updatedAt:'',views:0,commentCount:0,authorName:'Admin EduMart',slug:''};
  const b=isNew?def:cmsBlogs.find(x=>x.id===id);
  if(!b)return `<div style="padding:20px;color:var(--text-soft);">Không tìm thấy bài viết.</div>`;
  const catOpts=Object.entries(BLOG_CATS).map(([k,v])=>`<option value="${k}"${b.category===k?' selected':''}>${escHtml(v)}</option>`).join('');
  return `<div style="margin-bottom:14px;display:flex;align-items:center;gap:12px;">
    <button class="adm-back-btn" onclick="admBlogEditId=null;renderAccount()">← Danh sách bài viết</button>
    <span style="font-size:16px;font-weight:700;color:var(--ink-deep);">${isNew?'Viết bài mới':'Chỉnh sửa bài viết'}</span>
    ${!isNew?`<span style="font-size:12px;color:var(--text-soft);">ID: ${escHtml(b.id)}</span>`:''}
  </div>
  <div class="cms-editor-layout">
    <div class="cms-editor-main">
      <div class="cms-field-group">
        <label class="cms-label">Tiêu đề bài viết <span style="color:#c0392b;">*</span></label>
        <input id="blogTitleInp" class="cms-input" placeholder="Nhập tiêu đề hấp dẫn..." value="${escHtml(b.title)}">
      </div>
      <div class="cms-field-group">
        <label class="cms-label">Tóm tắt (Excerpt)</label>
        <textarea id="blogExcerptInp" class="cms-textarea" rows="2" placeholder="Mô tả ngắn hiển thị ở danh sách bài viết...">${escHtml(b.excerpt)}</textarea>
      </div>
      <div class="cms-field-group">
        <label class="cms-label">Nội dung bài viết</label>
        <div class="cms-toolbar">
          <button type="button" class="cms-tb-btn" onclick="blogFmt('bold')" title="Đậm (Ctrl+B)"><b>B</b></button>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('italic')" title="Nghiêng (Ctrl+I)"><i>I</i></button>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('underline')" title="Gạch chân"><u>U</u></button>
          <span class="cms-tb-sep"></span>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('formatBlock','H2')" title="Tiêu đề H2">H2</button>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('formatBlock','H3')" title="Tiêu đề H3">H3</button>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('formatBlock','P')" title="Đoạn văn bản">¶</button>
          <span class="cms-tb-sep"></span>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('insertUnorderedList')" title="Danh sách không thứ tự">≡</button>
          <button type="button" class="cms-tb-btn" onclick="blogFmt('insertOrderedList')" title="Danh sách có số">1.</button>
          <span class="cms-tb-sep"></span>
          <button type="button" class="cms-tb-btn" onclick="blogInsertLink()" title="Chèn liên kết">🔗</button>
          <button type="button" class="cms-tb-btn" onclick="blogInsertImgUrl()" title="Chèn hình ảnh">🖼</button>
        </div>
        <div id="blogEditor" class="cms-editor" contenteditable="true" spellcheck="false">${b.content}</div>
      </div>
    </div>
    <div class="cms-editor-side">
      <div class="cms-side-section">
        <div class="cms-side-title">Xuất bản</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button class="adm-row-btn" style="background:#27ae60;width:100%;padding:9px;" onclick="doSaveBlog('${escHtml(id)}','published')">🌐 Xuất bản ngay</button>
          <button class="adm-row-btn" style="background:#7f8c8d;width:100%;padding:9px;" onclick="doSaveBlog('${escHtml(id)}','draft')">💾 Lưu nháp</button>
          <button class="adm-row-btn" style="background:#95a5a6;width:100%;padding:9px;" onclick="doSaveBlog('${escHtml(id)}','hidden')">🚫 Ẩn bài viết</button>
          ${!isNew?`<hr style="border:none;border-top:1px solid var(--line);margin:4px 0;">
          <button class="adm-lock-btn" style="width:100%;padding:9px;" onclick="doDeleteBlog('${escHtml(id)}')">🗑 Xóa bài viết</button>`:''}
        </div>
        ${!isNew?`<div style="margin-top:10px;font-size:12.5px;color:var(--text-soft);line-height:1.6;">Trạng thái: <b>${b.status==='published'?'Đã xuất bản':b.status==='draft'?'Bản nháp':'Đang ẩn'}</b><br>Đăng: ${b.publishedAt||'–'} · Cập nhật: ${b.updatedAt||'–'}</div>`:''}
      </div>
      <div class="cms-side-section">
        <div class="cms-side-title">Danh mục & Tag</div>
        <label class="cms-label">Danh mục</label>
        <select id="blogCatInp" class="adm-filter-sel" style="width:100%;margin-bottom:10px;">${catOpts}</select>
        <label class="cms-label">Tags <span style="font-size:11px;color:var(--text-soft);">(cách nhau bằng dấu phẩy)</span></label>
        <input id="blogTagsInp" class="cms-input" placeholder="học tập, kỹ năng, THPT..." value="${escHtml(b.tags.join(', '))}">
      </div>
      <div class="cms-side-section">
        <div class="cms-side-title">Ảnh bìa & Tùy chọn</div>
        <label class="cms-label">URL ảnh bìa (thumbnail)</label>
        <input id="blogThumbInp" class="cms-input" placeholder="https://..." value="${escHtml(b.thumbnail)}" style="margin-bottom:10px;">
        <label class="cms-label" style="display:flex;align-items:center;gap:8px;cursor:pointer;">
          <input type="checkbox" id="blogFeaturedInp" ${b.featured?'checked':''}> <span>Ghim bài viết lên đầu (Featured)</span>
        </label>
      </div>
    </div>
  </div>`;
}

function blogFmt(cmd,val){const el=document.getElementById('blogEditor');if(el){el.focus();document.execCommand(cmd,false,val||null);}}
function blogInsertLink(){const url=prompt('Nhập URL liên kết:');if(url&&url.trim())blogFmt('createLink',url.trim());}
function blogInsertImgUrl(){const url=prompt('Nhập URL hình ảnh:');if(url&&url.trim())blogFmt('insertImage',url.trim());}

function doSaveBlog(id,status){
  const title=(document.getElementById('blogTitleInp')||{}).value||'';
  if(!title.trim()){toast('Vui lòng nhập tiêu đề bài viết');return;}
  const excerpt=(document.getElementById('blogExcerptInp')||{}).value||'';
  const content=(document.getElementById('blogEditor')||{}).innerHTML||'';
  const category=(document.getElementById('blogCatInp')||{}).value||'hoc-tap';
  const tagsRaw=(document.getElementById('blogTagsInp')||{}).value||'';
  const tags=tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const thumbnail=(document.getElementById('blogThumbInp')||{}).value||'';
  const featured=!!(document.getElementById('blogFeaturedInp')||{}).checked;
  const today=todayStr();
  const slug=title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').slice(0,80);
  if(id==='new'){
    const newId='blog-'+Date.now().toString(36);
    cmsBlogs.unshift({id:newId,title:title.trim(),slug,category,tags,status,featured,
      authorName:'Admin EduMart',thumbnail,excerpt:excerpt.trim(),content,
      publishedAt:status==='published'?today:'',createdAt:today,updatedAt:today,views:0,commentCount:0});
    saveCmsBlogs();toast('Đã tạo bài viết mới');
  } else {
    const b=cmsBlogs.find(x=>x.id===id);if(!b)return;
    b.title=title.trim();b.slug=slug;b.category=category;b.tags=tags;b.status=status;
    b.featured=featured;b.thumbnail=thumbnail;b.excerpt=excerpt.trim();b.content=content;
    b.updatedAt=today;if(status==='published'&&!b.publishedAt)b.publishedAt=today;
    saveCmsBlogs();toast('Đã lưu bài viết');
  }
  admBlogEditId=null;renderAccount();
}

function doDeleteBlog(id){
  const b=cmsBlogs.find(x=>x.id===id);if(!b)return;
  if(!confirm('Xóa bài viết "'+b.title+'"?\nHành động này không thể hoàn tác.'))return;
  cmsBlogs=cmsBlogs.filter(x=>x.id!==id);
  cmsComments=cmsComments.filter(c=>c.blogId!==id);
  saveCmsBlogs();saveCmsComments();admBlogEditId=null;toast('Đã xóa bài viết');renderAccount();
}

function doToggleFeatured(id){
  const b=cmsBlogs.find(x=>x.id===id);if(!b)return;
  const next=!b.featured;
  if(next)cmsBlogs.forEach(x=>{x.featured=false;});
  b.featured=next;
  saveCmsBlogs();renderAccount();
  toast(next?'Đã ghim bài viết lên đầu':'Đã bỏ ghim bài viết');
}

/* ── COMMENTS ── */
function adminCmsComments(){
  const total=cmsComments.length;
  const pendingCnt=cmsComments.filter(c=>c.status==='pending').length;
  const approvedCnt=cmsComments.filter(c=>c.status==='approved').length;
  const deletedCnt=cmsComments.filter(c=>c.status==='deleted').length;
  let items=[...cmsComments];
  const q=admCmntSearch.toLowerCase();
  if(q)items=items.filter(c=>c.userName.toLowerCase().includes(q)||c.content.toLowerCase().includes(q)||c.blogTitle.toLowerCase().includes(q));
  if(admCmntStatusFilter!=='all')items=items.filter(c=>c.status===admCmntStatusFilter);
  items.sort((a,b)=>b.id>a.id?1:-1);
  const PAGE=12,pages=Math.ceil(items.length/PAGE)||1;
  admCmntPage=Math.min(admCmntPage,pages-1);
  const slice=items.slice(admCmntPage*PAGE,(admCmntPage+1)*PAGE);
  const CBADGE={pending:'<span class="adm-badge adm-badge-orange">Chờ duyệt</span>',approved:'<span class="adm-badge adm-badge-green">Đã duyệt</span>',deleted:'<span class="adm-badge">Đã xóa</span>'};
  const rows=slice.length===0?`<tr><td colspan="5" style="padding:20px;text-align:center;color:var(--text-soft);">Không có bình luận nào.</td></tr>`
  :slice.map(c=>`<tr class="adm-usr-row">
    <td style="padding:9px 10px;">
      <b>${escHtml(c.userName)}</b>
      ${c.bannedUser?'<span style="font-size:11px;background:#fde;color:#c0392b;padding:1px 5px;border-radius:4px;margin-left:4px;">Đã cấm</span>':''}
      <div style="font-size:11.5px;color:var(--text-soft);">${escHtml(c.createdAt)}</div>
    </td>
    <td style="padding:9px 10px;font-size:13px;max-width:260px;">${escHtml(c.content)}</td>
    <td style="padding:9px 10px;font-size:12px;color:var(--text-soft);max-width:160px;">${escHtml(c.blogTitle)}</td>
    <td style="padding:9px 10px;">${CBADGE[c.status]||''}</td>
    <td style="padding:9px 10px;white-space:nowrap;">
      ${c.status==='pending'?`<button class="adm-row-btn" onclick="doCmtApprove('${escHtml(c.id)}')">✓ Duyệt</button>`:''}
      ${c.status!=='deleted'?`<button class="adm-lock-btn" onclick="doCmtDelete('${escHtml(c.id)}')">Xóa</button>`:''}
      ${!c.bannedUser&&c.status!=='deleted'?`<button class="adm-row-btn" style="background:#8e44ad;" onclick="doCmtBanUser('${escHtml(c.id)}')">Cấm</button>`:''}
    </td>
  </tr>`).join('');
  const pager=pages>1?`<div class="adm-pager">${admCmntPage>0?`<button class="adm-pager-btn" onclick="admCmntPage--;renderAccount()">← Trước</button>`:''}<span style="font-size:13px;">Trang ${admCmntPage+1}/${pages}</span>${admCmntPage<pages-1?`<button class="adm-pager-btn" onclick="admCmntPage++;renderAccount()">Tiếp →</button>`:''}</div>`:'';
  return `<div class="adm-kpi-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;">
    <div class="adm-kpi"><div class="adm-kpi-lbl">Tổng bình luận</div><div class="adm-kpi-val">${total}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Chờ duyệt</div><div class="adm-kpi-val" style="color:#e67e22;">${pendingCnt}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đã duyệt</div><div class="adm-kpi-val" style="color:#27ae60;">${approvedCnt}</div></div>
    <div class="adm-kpi"><div class="adm-kpi-lbl">Đã xóa</div><div class="adm-kpi-val" style="color:#95a5a6;">${deletedCnt}</div></div>
  </div>
  <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
    <input class="adm-search-inp" placeholder="Tìm tên, nội dung, bài viết..." value="${escHtml(admCmntSearch)}" oninput="admCmntSearch=this.value;admCmntPage=0;renderAccount()" style="max-width:300px;">
    <select class="adm-filter-sel" onchange="admCmntStatusFilter=this.value;admCmntPage=0;renderAccount()">
      <option value="all"${admCmntStatusFilter==='all'?' selected':''}>Tất cả</option>
      <option value="pending"${admCmntStatusFilter==='pending'?' selected':''}>Chờ duyệt</option>
      <option value="approved"${admCmntStatusFilter==='approved'?' selected':''}>Đã duyệt</option>
      <option value="deleted"${admCmntStatusFilter==='deleted'?' selected':''}>Đã xóa</option>
    </select>
  </div>
  <table class="adm-usr-table" style="width:100%;">
    <thead><tr style="background:var(--paper);">
      <th style="padding:9px 10px;">Người dùng</th>
      <th style="padding:9px 10px;">Nội dung</th>
      <th style="padding:9px 10px;">Bài viết</th>
      <th style="padding:9px 10px;">Trạng thái</th>
      <th style="padding:9px 10px;">Thao tác</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>${pager}`;
}

function doCmtApprove(id){
  const c=cmsComments.find(x=>x.id===id);if(!c)return;
  const b=cmsBlogs.find(x=>x.id===c.blogId);
  c.status='approved';
  if(b&&c.status!=='approved')b.commentCount=Math.max(0,b.commentCount+1);
  saveCmsComments();saveCmsBlogs();renderAccount();toast('Đã duyệt bình luận');
}
function doCmtDelete(id){
  const c=cmsComments.find(x=>x.id===id);if(!c)return;
  if(!confirm('Xóa bình luận này?'))return;
  c.status='deleted';saveCmsComments();renderAccount();toast('Đã xóa bình luận');
}
function doCmtBanUser(id){
  const c=cmsComments.find(x=>x.id===id);if(!c)return;
  if(!confirm('Cấm người dùng "'+c.userName+'" bình luận trên toàn hệ thống?'))return;
  cmsComments.filter(x=>x.userId===c.userId).forEach(x=>{x.bannedUser=true;});
  saveCmsComments();renderAccount();toast('Đã cấm '+c.userName+' bình luận');
}

/* ── BANNERS ── */
function adminCmsBanners(){
  const subTabs=[['banners','Banner trang chủ'],['popup','Popup khuyến mãi']];
  const content=admCmsBannerSubTab==='popup'?adminCmsPopupForm():adminCmsBannerList();
  return `<div class="adm-shops-tabs">
    ${subTabs.map(([k,lbl])=>`<button class="adm-tab-btn${admCmsBannerSubTab===k?' active':''}" onclick="admCmsBannerSubTab='${k}';renderAccount()">${escHtml(lbl)}</button>`).join('')}
  </div>${content}`;
}

function adminCmsBannerList(){
  const bannerRows=cmsBanners.length===0?`<div style="padding:28px;text-align:center;color:var(--text-soft);">Chưa có banner nào. Nhấn "+ Thêm banner" để bắt đầu.</div>`
  :cmsBanners.map((b,i)=>`<div class="cms-banner-card${b.active?'':' cms-banner-inactive'}">
    <div class="cms-banner-order">${i+1}</div>
    <div class="cms-banner-info">
      <div class="cms-banner-title">${escHtml(b.title)}</div>
      <div class="cms-banner-meta">
        ${b.imageUrl?`<a href="${escHtml(b.imageUrl)}" target="_blank" style="color:#2980b9;font-size:11.5px;">Xem ảnh</a> · `:''}
        Link: <code style="font-size:11.5px;">${escHtml(b.linkUrl||'–')}</code> ·
        ${escHtml(b.startDate)} → ${escHtml(b.endDate||'Không hạn')} ·
        <b style="color:${b.active?'#27ae60':'#95a5a6'};">${b.active?'Đang hiển thị':'Tắt'}</b>
      </div>
    </div>
    <div class="cms-banner-actions">
      ${i>0?`<button class="adm-pager-btn" style="padding:4px 8px;" onclick="doBannerMove('${escHtml(b.id)}',-1)" title="Lên trên">▲</button>`:'<span style="width:32px;display:inline-block;"></span>'}
      ${i<cmsBanners.length-1?`<button class="adm-pager-btn" style="padding:4px 8px;" onclick="doBannerMove('${escHtml(b.id)}',1)" title="Xuống dưới">▼</button>`:'<span style="width:32px;display:inline-block;"></span>'}
      <button class="adm-row-btn" style="background:${b.active?'#7f8c8d':'#27ae60'};" onclick="doToggleBanner('${escHtml(b.id)}')">${b.active?'Tắt':'Bật'}</button>
      <button class="adm-row-btn" onclick="admBannerEditId='${escHtml(b.id)}';renderAccount()">Sửa</button>
      <button class="adm-lock-btn" onclick="doBannerDelete('${escHtml(b.id)}')">Xóa</button>
    </div>
  </div>`).join('');

  const editId=admBannerEditId;
  const isNewBanner=editId==='new';
  const eb=isNewBanner?{title:'',imageUrl:'',linkUrl:'',alt:'',startDate:'',endDate:'',active:true}:(editId?cmsBanners.find(x=>x.id===editId):null);
  const editForm=editId&&eb?`<div class="cms-side-section" style="margin-bottom:18px;max-width:680px;">
    <div class="cms-side-title" style="margin-bottom:12px;">${isNewBanner?'Thêm banner mới':'Chỉnh sửa banner'}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div><label class="cms-label">Tiêu đề <span style="color:#c0392b;">*</span></label><input id="banTitleInp" class="cms-input" value="${escHtml(eb.title)}" placeholder="Tên banner..."></div>
      <div><label class="cms-label">Alt text</label><input id="banAltInp" class="cms-input" value="${escHtml(eb.alt||'')}" placeholder="Mô tả ảnh..."></div>
      <div style="grid-column:1/-1;"><label class="cms-label">URL hình ảnh</label><input id="banImgInp" class="cms-input" value="${escHtml(eb.imageUrl)}" placeholder="https://..."></div>
      <div style="grid-column:1/-1;"><label class="cms-label">URL liên kết (khi click)</label><input id="banLinkInp" class="cms-input" value="${escHtml(eb.linkUrl)}" placeholder="/khuyen-mai hoặc https://..."></div>
      <div><label class="cms-label">Ngày bắt đầu</label><input id="banStartInp" class="cms-input" type="date" value="${escHtml(eb.startDate?eb.startDate.split('/').reverse().join('-'):'')}"></div>
      <div><label class="cms-label">Ngày kết thúc</label><input id="banEndInp" class="cms-input" type="date" value="${escHtml(eb.endDate?eb.endDate.split('/').reverse().join('-'):'')}" placeholder="Để trống = không hạn"></div>
    </div>
    <label class="cms-label" style="margin-top:10px;display:flex;align-items:center;gap:8px;cursor:pointer;">
      <input type="checkbox" id="banActiveInp" ${eb.active?'checked':''}> Hiển thị ngay sau khi lưu
    </label>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="adm-row-btn" style="background:#27ae60;" onclick="doSaveBanner('${editId}')">💾 Lưu banner</button>
      <button class="adm-row-btn" style="background:#7f8c8d;" onclick="admBannerEditId=null;renderAccount()">Hủy</button>
    </div>
  </div>`:editId?`<div style="padding:20px;color:var(--text-soft);">Không tìm thấy banner.</div>`:'';

  return `${editForm}<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
    <span style="font-size:14px;font-weight:600;color:var(--ink-deep);">${cmsBanners.length} banner · Kéo thả hoặc dùng ▲▼ để sắp xếp</span>
    <button class="adm-row-btn" style="background:#27ae60;" onclick="admBannerEditId='new';renderAccount()">+ Thêm banner</button>
  </div>
  <div class="cms-banner-list">${bannerRows}</div>`;
}

function adminCmsPopupForm(){
  const p=cmsPopup;
  return `<div class="cms-side-section" style="max-width:600px;">
    <div class="cms-side-title" style="margin-bottom:14px;">Cài đặt Popup khuyến mãi</div>
    <label class="cms-label" style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:14px;">
      <input type="checkbox" id="popupEnabledInp" ${p.enabled?'checked':''} style="width:16px;height:16px;">
      <span style="font-size:14px;font-weight:600;">Bật popup khuyến mãi</span>
      ${p.enabled?'<span class="adm-badge adm-badge-green">Đang bật</span>':'<span class="adm-badge">Đang tắt</span>'}
    </label>
    <label class="cms-label">Tiêu đề popup</label>
    <input id="popupTitleInp" class="cms-input" value="${escHtml(p.title)}" placeholder="Ưu đãi đặc biệt hôm nay!" style="margin-bottom:10px;">
    <label class="cms-label">Nội dung</label>
    <textarea id="popupContentInp" class="cms-textarea" rows="3" placeholder="Nhập nội dung ngắn gọn...">${escHtml(p.content)}</textarea>
    <label class="cms-label">URL hình ảnh (tùy chọn)</label>
    <input id="popupImgInp" class="cms-input" value="${escHtml(p.imageUrl)}" placeholder="https://..." style="margin-bottom:10px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
      <div><label class="cms-label">URL liên kết</label><input id="popupLinkInp" class="cms-input" value="${escHtml(p.linkUrl)}" placeholder="/khuyen-mai"></div>
      <div><label class="cms-label">Nhãn nút CTA</label><input id="popupBtnInp" class="cms-input" value="${escHtml(p.linkText)}" placeholder="Xem ngay"></div>
      <div><label class="cms-label">Hiện sau (giây)</label><input id="popupDelayInp" class="cms-input" type="number" min="0" max="60" value="${p.delaySeconds}"></div>
      <div><label class="cms-label" style="display:flex;align-items:center;gap:8px;margin-top:22px;cursor:pointer;"><input type="checkbox" id="popupOnceInp" ${p.showOnce?'checked':''}> Chỉ hiện 1 lần / người</label></div>
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;align-items:center;">
      <button class="adm-row-btn" style="background:#27ae60;" onclick="doSavePopup()">💾 Lưu cài đặt popup</button>
      ${p.updatedAt?`<span style="font-size:12px;color:var(--text-soft);">Cập nhật: ${escHtml(p.updatedAt)}</span>`:''}
    </div>
  </div>`;
}

function doToggleBanner(id){
  const b=cmsBanners.find(x=>x.id===id);if(!b)return;
  b.active=!b.active;saveCmsBanners();renderAccount();
  toast(b.active?'Đã bật banner':'Đã tắt banner');
}
function doBannerMove(id,dir){
  const i=cmsBanners.findIndex(x=>x.id===id);if(i<0)return;
  const ni=i+dir;if(ni<0||ni>=cmsBanners.length)return;
  [cmsBanners[i],cmsBanners[ni]]=[cmsBanners[ni],cmsBanners[i]];
  saveCmsBanners();renderAccount();
}
function doBannerDelete(id){
  const b=cmsBanners.find(x=>x.id===id);if(!b)return;
  if(!confirm('Xóa banner "'+b.title+'"?'))return;
  cmsBanners=cmsBanners.filter(x=>x.id!==id);
  saveCmsBanners();admBannerEditId=null;renderAccount();toast('Đã xóa banner');
}
function doSaveBanner(editId){
  const title=(document.getElementById('banTitleInp')||{}).value||'';
  if(!title.trim()){toast('Vui lòng nhập tiêu đề banner');return;}
  const imageUrl=(document.getElementById('banImgInp')||{}).value||'';
  const linkUrl=(document.getElementById('banLinkInp')||{}).value||'';
  const alt=(document.getElementById('banAltInp')||{}).value||'';
  const startRaw=(document.getElementById('banStartInp')||{}).value||'';
  const endRaw=(document.getElementById('banEndInp')||{}).value||'';
  const startDate=startRaw?startRaw.split('-').reverse().join('/'):'';
  const endDate=endRaw?endRaw.split('-').reverse().join('/'):'';
  const active=!!(document.getElementById('banActiveInp')||{}).checked;
  if(editId==='new'){
    cmsBanners.push({id:'ban-'+Date.now().toString(36),title:title.trim(),imageUrl,linkUrl,alt,startDate,endDate,active});
  } else {
    const b=cmsBanners.find(x=>x.id===editId);if(!b)return;
    Object.assign(b,{title:title.trim(),imageUrl,linkUrl,alt,startDate,endDate,active});
  }
  saveCmsBanners();admBannerEditId=null;renderAccount();toast('Đã lưu banner');
}
function doSavePopup(){
  const enabled=!!(document.getElementById('popupEnabledInp')||{}).checked;
  const title=(document.getElementById('popupTitleInp')||{}).value||'';
  const content=(document.getElementById('popupContentInp')||{}).value||'';
  const imageUrl=(document.getElementById('popupImgInp')||{}).value||'';
  const linkUrl=(document.getElementById('popupLinkInp')||{}).value||'';
  const linkText=(document.getElementById('popupBtnInp')||{}).value||'';
  const delaySeconds=parseInt((document.getElementById('popupDelayInp')||{}).value||'3',10)||3;
  const showOnce=!!(document.getElementById('popupOnceInp')||{}).checked;
  Object.assign(cmsPopup,{enabled,title,content,imageUrl,linkUrl,linkText,delaySeconds,showOnce,updatedAt:todayStr()});
  saveCmsPopup();renderAccount();toast('Đã lưu cài đặt popup');
}

/* ── STATIC PAGES ── */
function adminCmsStatic(){
  const pages=[['about','Về chúng tôi'],['terms','Điều khoản sử dụng'],['privacy','Chính sách bảo mật'],['returns','Chính sách đổi/trả']];
  const cur=admStaticPage;
  const pageData=cmsStaticPages[cur]||{title:'',content:'',updatedAt:''};
  return `<div class="adm-shops-tabs">
    ${pages.map(([k,lbl])=>`<button class="adm-tab-btn${cur===k?' active':''}" onclick="admStaticPage='${k}';renderAccount()">${escHtml(lbl)}</button>`).join('')}
  </div>
  <div class="cms-side-section" style="max-width:860px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div class="cms-side-title" style="margin:0;">${escHtml(pageData.title)}</div>
      ${pageData.updatedAt?`<span style="font-size:12px;color:var(--text-soft);">Cập nhật lần cuối: ${escHtml(pageData.updatedAt)}</span>`:''}
    </div>
    <div class="cms-toolbar" style="margin-bottom:4px;">
      <button type="button" class="cms-tb-btn" onclick="staticFmt('bold')"><b>B</b></button>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('italic')"><i>I</i></button>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('underline')"><u>U</u></button>
      <span class="cms-tb-sep"></span>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('formatBlock','H2')">H2</button>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('formatBlock','H3')">H3</button>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('formatBlock','P')">¶</button>
      <span class="cms-tb-sep"></span>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('insertUnorderedList')">≡</button>
      <button type="button" class="cms-tb-btn" onclick="staticFmt('insertOrderedList')">1.</button>
    </div>
    <div id="staticPageEditor" class="cms-editor" contenteditable="true" spellcheck="false" style="min-height:380px;">${pageData.content}</div>
    <div style="margin-top:12px;">
      <button class="adm-row-btn" style="background:#27ae60;padding:9px 20px;" onclick="doSaveStaticPage('${cur}')">💾 Lưu trang "${escHtml(pageData.title)}"</button>
    </div>
  </div>`;
}

function staticFmt(cmd,val){const el=document.getElementById('staticPageEditor');if(el){el.focus();document.execCommand(cmd,false,val||null);}}
function doSaveStaticPage(key){
  const el=document.getElementById('staticPageEditor');if(!el)return;
  if(!cmsStaticPages[key])return;
  cmsStaticPages[key].content=el.innerHTML;
  cmsStaticPages[key].updatedAt=todayStr();
  saveCmsStaticPages();renderAccount();toast('Đã lưu trang "'+cmsStaticPages[key].title+'"');
}

// =====================================================================
// QUẢN LÝ KHUYẾN MÃI
// =====================================================================
const PROMO_CATS={'all':'Tất cả danh mục','sach':'Sách','vpp':'Văn phòng phẩm','tbgd':'Thiết bị GD','ebook':'Ebook','audiobook':'Sách nói'};

function adminPromo(){
  const TABS=[['vouchers','Mã giảm giá'],['flashsale','Flash Sale'],['points','Điểm thưởng']];
  const content=admPromoTab==='flashsale'?adminPromoFlashSales():
    admPromoTab==='points'?adminPromoPoints():
    adminPromoVouchers();
  return `<div class="adm-section">
    <h2 class="adm-section-title">Quản lý Khuyến mãi</h2>
    <div class="adm-shops-tabs">
      ${TABS.map(([k,lbl])=>`<button class="adm-tab-btn${admPromoTab===k?' active':''}" onclick="admPromoTab='${k}';admVoucherEditId=null;admFlashSaleEditId=null;admFlashSaleDetailId=null;renderAccount()">${lbl}</button>`).join('')}
    </div>
    ${content}
  </div>`;
}

/* ---------- VOUCHERS ---------- */
function adminPromoVouchers(){
  if(admVoucherEditId!==null) return adminPromoVoucherEditor(admVoucherEditId);
  return adminPromoVoucherList();
}

function adminPromoVoucherList(){
  const search=admVoucherSearch.toLowerCase();
  const STATUS_LBL={active:'Hoạt động',inactive:'Đã tắt',expired:'Hết hạn'};
  const STATUS_CLR={active:'#27ae60',inactive:'#888',expired:'#e74c3c'};
  let list=promoVouchers.filter(v=>{
    if(search&&!v.code.toLowerCase().includes(search)&&!v.name.toLowerCase().includes(search))return false;
    if(admVoucherStatusFilter!=='all'&&v.status!==admVoucherStatusFilter)return false;
    return true;
  });
  const total=list.length;
  const PAGE=10,pages=Math.ceil(total/PAGE)||1;
  if(admVoucherPage>=pages)admVoucherPage=Math.max(0,pages-1);
  const page=list.slice(admVoucherPage*PAGE,(admVoucherPage+1)*PAGE);
  const active=promoVouchers.filter(v=>v.status==='active').length;
  const totalUsed=promoVouchers.reduce((s,v)=>s+v.usedCount,0);
  const rows=page.map(v=>{
    const usePct=v.maxUsage>0?Math.min(100,Math.round(v.usedCount/v.maxUsage*100)):0;
    const catLbl=v.categories.includes('all')?'Tất cả':v.categories.map(c=>PROMO_CATS[c]||c).join(', ');
    const valLbl=v.type==='percent'?v.value+'%':fmt(v.value);
    return `<tr>
      <td><strong style="font-family:monospace;font-size:13px;color:var(--ink)">${escHtml(v.code)}</strong><div style="font-size:12px;color:var(--text-soft)">${escHtml(v.name)}</div></td>
      <td>${valLbl}${v.type==='percent'?`<br><small style="color:#aaa">tối đa ${fmt(v.maxDiscount)}</small>`:''}</td>
      <td>${v.minOrder>0?fmt(v.minOrder):'—'}</td>
      <td style="font-size:12.5px">${escHtml(catLbl)}</td>
      <td><div style="font-size:13px">${v.usedCount.toLocaleString('vi-VN')} / ${v.maxUsage.toLocaleString('vi-VN')}</div><div style="background:#eee;border-radius:4px;height:5px;margin-top:4px"><div style="background:var(--ink);border-radius:4px;height:5px;width:${usePct}%"></div></div></td>
      <td><div>${v.startDate}</div><div style="color:var(--text-soft);font-size:12px">→ ${v.endDate}</div></td>
      <td><span style="color:${STATUS_CLR[v.status]||'#888'};font-weight:600;font-size:12.5px">${STATUS_LBL[v.status]||v.status}</span></td>
      <td><div style="display:flex;gap:5px;flex-wrap:wrap">
        ${v.status!=='expired'?`<button class="adm-btn-sm" onclick="admVoucherEditId='${v.id}';renderAccount()">Sửa</button>`:''}
        ${v.status==='active'?`<button class="adm-btn-sm" style="background:#f39c12;color:#fff" onclick="doToggleVoucher('${v.id}',false)">Tắt</button>`:''}
        ${v.status==='inactive'?`<button class="adm-btn-sm" style="background:#27ae60;color:#fff" onclick="doToggleVoucher('${v.id}',true)">Bật</button>`:''}
        <button class="adm-btn-sm danger" onclick="doDeleteVoucher('${v.id}')">Xóa</button>
      </div></td>
    </tr>`;
  }).join('');
  const pageLinks=pages>1?`<div style="display:flex;gap:6px;justify-content:flex-end;margin-top:12px">${Array.from({length:pages},(_,i)=>`<button class="adm-btn-sm${i===admVoucherPage?' active':''}" onclick="admVoucherPage=${i};renderAccount()">${i+1}</button>`).join('')}</div>`:'';
  return `
    <div class="adm-kpi-row" style="margin-bottom:18px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${active}</div><div class="adm-kpi-lbl">Đang hoạt động</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${totalUsed.toLocaleString('vi-VN')}</div><div class="adm-kpi-lbl">Tổng lượt sử dụng</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${promoVouchers.filter(v=>v.status==='expired').length}</div><div class="adm-kpi-lbl">Đã hết hạn</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${promoVouchers.filter(v=>v.status==='inactive').length}</div><div class="adm-kpi-lbl">Đã tắt</div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px;flex-wrap:wrap">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <input class="cms-input" placeholder="Tìm mã hoặc tên voucher..." value="${escHtml(admVoucherSearch)}" oninput="admVoucherSearch=this.value;admVoucherPage=0;renderAccount()" style="width:220px">
        <select class="cms-input" onchange="admVoucherStatusFilter=this.value;admVoucherPage=0;renderAccount()">
          <option value="all"${admVoucherStatusFilter==='all'?' selected':''}>Tất cả trạng thái</option>
          <option value="active"${admVoucherStatusFilter==='active'?' selected':''}>Hoạt động</option>
          <option value="inactive"${admVoucherStatusFilter==='inactive'?' selected':''}>Đã tắt</option>
          <option value="expired"${admVoucherStatusFilter==='expired'?' selected':''}>Hết hạn</option>
        </select>
      </div>
      <button class="adm-btn" onclick="admVoucherEditId='new';renderAccount()">+ Tạo voucher mới</button>
    </div>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>Mã / Tên</th><th>Giá trị</th><th>Đơn tối thiểu</th><th>Danh mục</th><th>Sử dụng</th><th>Thời hạn</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="8" style="text-align:center;color:#888;padding:24px">Không tìm thấy voucher nào</td></tr>'}</tbody>
      </table>
    </div>${pageLinks}`;
}

function adminPromoVoucherEditor(editId){
  const isNew=editId==='new';
  const v=isNew?null:promoVouchers.find(x=>x.id===editId);
  const toInputDate=s=>s?s.split('/').reverse().join('-'):'';
  const catOptions=Object.entries(PROMO_CATS).map(([k,lbl])=>`<option value="${k}"${(!isNew&&v&&v.categories.includes(k))?' selected':''}>${lbl}</option>`).join('');
  const usePct=!isNew&&v&&v.maxUsage>0?Math.min(100,Math.round(v.usedCount/v.maxUsage*100)):0;
  return `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
      <button class="adm-btn-sm" onclick="admVoucherEditId=null;renderAccount()">← Quay lại</button>
      <h3 style="margin:0">${isNew?'Tạo Voucher mới':'Chỉnh sửa: '+escHtml(v?v.code:'')}</h3>
    </div>
    <div class="promo-form-grid">
      <div class="adm-form-card" style="display:flex;flex-direction:column;gap:14px">
        <div><label class="adm-form-lbl">Mã voucher <span style="color:red">*</span></label>
          <input id="vcCode" class="cms-input" style="width:100%;text-transform:uppercase;font-family:monospace" placeholder="VD: SUMMER25" value="${isNew?'':escHtml(v.code)}" oninput="this.value=this.value.toUpperCase()"></div>
        <div><label class="adm-form-lbl">Tên chương trình <span style="color:red">*</span></label>
          <input id="vcName" class="cms-input" style="width:100%" placeholder="VD: Flash sale hè 2025" value="${isNew?'':escHtml(v.name)}"></div>
        <div><label class="adm-form-lbl">Mô tả</label>
          <textarea id="vcDesc" class="cms-input" style="width:100%;resize:vertical;min-height:56px" placeholder="Mô tả ngắn...">${isNew?'':escHtml(v.desc||'')}</textarea></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div><label class="adm-form-lbl">Loại giảm giá <span style="color:red">*</span></label>
            <select id="vcType" class="cms-input" style="width:100%">
              <option value="percent"${isNew||!v||v.type==='percent'?' selected':''}>Phần trăm (%)</option>
              <option value="fixed"${!isNew&&v&&v.type==='fixed'?' selected':''}>Số tiền cố định (đ)</option>
            </select></div>
          <div><label class="adm-form-lbl">Giá trị <span style="color:red">*</span></label>
            <input id="vcValue" type="number" class="cms-input" style="width:100%" placeholder="25 (%) hoặc 50000 (đ)" value="${isNew?'':v.value}"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div><label class="adm-form-lbl">Đơn tối thiểu (đ)</label>
            <input id="vcMinOrder" type="number" class="cms-input" style="width:100%" placeholder="0 = không giới hạn" value="${isNew?'':v.minOrder}"></div>
          <div><label class="adm-form-lbl">Giảm tối đa (đ)</label>
            <input id="vcMaxDiscount" type="number" class="cms-input" style="width:100%" placeholder="Chỉ dùng với %" value="${isNew?'':v.maxDiscount}"></div>
        </div>
        <div><label class="adm-form-lbl">Danh mục áp dụng</label>
          <select id="vcCats" class="cms-input" style="width:100%" multiple size="5">${catOptions}</select>
          <small style="color:#999;display:block;margin-top:3px">Giữ Ctrl để chọn nhiều. "Tất cả" = áp dụng toàn bộ.</small></div>
        <div><label class="adm-form-lbl">Số lần dùng tối đa</label>
          <input id="vcMaxUsage" type="number" class="cms-input" style="width:160px" placeholder="9999 = không giới hạn" value="${isNew?'':v.maxUsage}"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div><label class="adm-form-lbl">Ngày bắt đầu <span style="color:red">*</span></label>
            <input id="vcStart" type="date" class="cms-input" style="width:100%" value="${isNew?'':toInputDate(v.startDate)}"></div>
          <div><label class="adm-form-lbl">Ngày kết thúc <span style="color:red">*</span></label>
            <input id="vcEnd" type="date" class="cms-input" style="width:100%" value="${isNew?'':toInputDate(v.endDate)}"></div>
        </div>
        <div style="display:flex;gap:10px;margin-top:4px">
          <button class="adm-btn" onclick="doSaveVoucher('${editId}')">💾 Lưu voucher</button>
          <button class="adm-btn-sm" onclick="admVoucherEditId=null;renderAccount()">Hủy</button>
        </div>
      </div>
      ${!isNew&&v?`<div class="adm-form-card">
        <h4 style="margin:0 0 14px;font-size:14px">📊 Thống kê sử dụng</h4>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div style="background:var(--paper);border-radius:8px;padding:12px"><div style="font-size:24px;font-weight:700;color:var(--ink)">${v.usedCount.toLocaleString('vi-VN')}</div><div style="font-size:12.5px;color:var(--text-soft)">Tổng lượt sử dụng</div></div>
          <div style="background:var(--paper);border-radius:8px;padding:12px">
            <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text-soft)">Đã dùng</span><span style="font-weight:700;color:var(--ink)">${usePct}%</span></div>
            <div style="background:#e0e0e0;border-radius:4px;height:8px;margin-top:6px"><div style="background:var(--ink);border-radius:4px;height:8px;width:${usePct}%"></div></div>
            <div style="font-size:12px;color:#aaa;margin-top:4px">${v.usedCount.toLocaleString('vi-VN')} / ${v.maxUsage.toLocaleString('vi-VN')} lượt</div>
          </div>
          <div style="background:var(--paper);border-radius:8px;padding:12px"><div style="font-size:14px;font-weight:700;color:var(--ink-deep)">${fmtBig(Math.round(v.usedCount*(v.type==='percent'?v.value/100*280000:v.value)))}đ</div><div style="font-size:12.5px;color:var(--text-soft)">Ước tính tổng chiết khấu</div></div>
          <div style="background:var(--paper);border-radius:8px;padding:10px 12px;font-size:13px;color:var(--text-soft)">Trạng thái: <span style="font-weight:600;color:${v.status==='active'?'#27ae60':v.status==='expired'?'#e74c3c':'#888'}">${v.status==='active'?'Hoạt động':v.status==='expired'?'Hết hạn':'Đã tắt'}</span></div>
        </div>
      </div>`:'<div></div>'}
    </div>`;
}

function doSaveVoucher(editId){
  const code=((document.getElementById('vcCode')||{}).value||'').trim().toUpperCase();
  const name=((document.getElementById('vcName')||{}).value||'').trim();
  const type=(document.getElementById('vcType')||{}).value||'percent';
  const value=parseFloat((document.getElementById('vcValue')||{}).value||0);
  const minOrder=parseFloat((document.getElementById('vcMinOrder')||{}).value||0);
  const maxDiscount=parseFloat((document.getElementById('vcMaxDiscount')||{}).value||0);
  const maxUsage=parseFloat((document.getElementById('vcMaxUsage')||{}).value||9999);
  const startInput=(document.getElementById('vcStart')||{}).value||'';
  const endInput=(document.getElementById('vcEnd')||{}).value||'';
  const catsEl=document.getElementById('vcCats');
  const desc=((document.getElementById('vcDesc')||{}).value||'').trim();
  if(!code){toast('Vui lòng nhập mã voucher');return;}
  if(!name){toast('Vui lòng nhập tên chương trình');return;}
  if(!value||value<=0){toast('Vui lòng nhập giá trị hợp lệ (>0)');return;}
  if(!startInput||!endInput){toast('Vui lòng chọn thời hạn hiệu lực');return;}
  const startDate=startInput.split('-').reverse().join('/');
  const endDate=endInput.split('-').reverse().join('/');
  const cats=catsEl?Array.from(catsEl.selectedOptions).map(o=>o.value):['all'];
  const finalCats=cats.includes('all')?['all']:cats.length?cats:['all'];
  if(editId==='new'){
    if(promoVouchers.find(v=>v.code===code)){toast('Mã voucher đã tồn tại!');return;}
    promoVouchers.unshift({id:'VC-'+String(Date.now()).slice(-5),code,name,type,value,minOrder,maxDiscount:maxDiscount||999999999,categories:finalCats,maxUsage,usedCount:0,startDate,endDate,status:'active',desc,createdAt:todayStr()});
    toast('Đã tạo voucher '+code);
  }else{
    const v=promoVouchers.find(x=>x.id===editId);if(!v){toast('Không tìm thấy voucher');return;}
    Object.assign(v,{code,name,type,value,minOrder,maxDiscount:maxDiscount||999999999,categories:finalCats,maxUsage,startDate,endDate,desc});
    toast('Đã cập nhật voucher '+code);
  }
  savePromoVouchers();admVoucherEditId=null;renderAccount();
}

function doToggleVoucher(id,enable){
  const v=promoVouchers.find(x=>x.id===id);if(!v)return;
  v.status=enable?'active':'inactive';
  savePromoVouchers();renderAccount();
  toast(enable?'Đã bật voucher '+v.code:'Đã tắt voucher '+v.code);
}

function doDeleteVoucher(id){
  const v=promoVouchers.find(x=>x.id===id);if(!v)return;
  if(!confirm('Xóa voucher '+v.code+'?\nHành động không thể hoàn tác.'))return;
  promoVouchers=promoVouchers.filter(x=>x.id!==id);
  savePromoVouchers();renderAccount();toast('Đã xóa voucher');
}

/* ---------- FLASH SALE ---------- */
function adminPromoFlashSales(){
  if(admFlashSaleDetailId) return adminPromoFlashSaleDetail(admFlashSaleDetailId);
  if(admFlashSaleEditId!==null) return adminPromoFlashSaleEditor(admFlashSaleEditId);
  const STATUS_LBL={upcoming:'Sắp diễn ra',active:'Đang diễn ra',ended:'Đã kết thúc'};
  const STATUS_CLR={upcoming:'#3498db',active:'#27ae60',ended:'#888'};
  const list=promoFlashSales.filter(fs=>admFsFilter==='all'||fs.status===admFsFilter);
  const active=promoFlashSales.filter(f=>f.status==='active').length;
  const upcoming=promoFlashSales.filter(f=>f.status==='upcoming').length;
  const totalRev=promoFlashSales.filter(f=>f.status==='ended').reduce((s,f)=>s+f.totalRevenue,0);
  const totalSold=promoFlashSales.filter(f=>f.status==='ended').reduce((s,f)=>s+f.totalSold,0);
  const cards=list.map(fs=>{
    const pendingProds=fs.products.filter(p=>p.status==='pending').length;
    const totalProds=fs.products.length;
    const startFmt=fs.startTime.replace('T',' ');
    const endFmt=fs.endTime.replace('T',' ');
    return `<div class="promo-fs-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div style="flex:1">
          <div style="font-size:15px;font-weight:700;color:var(--ink-deep)">${escHtml(fs.name)}</div>
          <div style="font-size:12.5px;color:var(--text-soft);margin-top:3px">⏰ ${startFmt} → ${endFmt}</div>
        </div>
        <span style="font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;background:${STATUS_CLR[fs.status]}22;color:${STATUS_CLR[fs.status]};white-space:nowrap">${STATUS_LBL[fs.status]||fs.status}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">
        <div style="background:var(--paper);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:var(--ink-deep)">${totalProds}</div>
          <div style="font-size:11.5px;color:var(--text-soft)">Sản phẩm${pendingProds>0?`<span style="color:#e67e22"> (${pendingProds} chờ)</span>`:''}</div>
        </div>
        <div style="background:var(--paper);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:20px;font-weight:700;color:var(--ink-deep)">${fs.totalSold.toLocaleString('vi-VN')}</div>
          <div style="font-size:11.5px;color:var(--text-soft)">Đã bán</div>
        </div>
        <div style="background:var(--paper);border-radius:8px;padding:8px;text-align:center">
          <div style="font-size:16px;font-weight:700;color:var(--ink)">${fmtMil(fs.totalRevenue)}đ</div>
          <div style="font-size:11.5px;color:var(--text-soft)">Doanh thu</div>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:10px;flex-wrap:wrap">
        <button class="adm-btn-sm" onclick="admFlashSaleDetailId='${fs.id}';renderAccount()">📋 Chi tiết / Duyệt SP</button>
        ${fs.status!=='ended'?`<button class="adm-btn-sm" onclick="admFlashSaleEditId='${fs.id}';renderAccount()">Chỉnh sửa</button>`:''}
        ${fs.status==='active'?`<button class="adm-btn-sm danger" onclick="doEndFlashSale('${fs.id}')">⏹ Kết thúc sớm</button>`:''}
      </div>
    </div>`;
  }).join('');
  return `
    <div class="adm-kpi-row" style="margin-bottom:18px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${active}</div><div class="adm-kpi-lbl">Đang diễn ra</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${upcoming}</div><div class="adm-kpi-lbl">Sắp diễn ra</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${totalSold.toLocaleString('vi-VN')}</div><div class="adm-kpi-lbl">Tổng đã bán</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtMil(totalRev)}đ</div><div class="adm-kpi-lbl">Tổng doanh thu</div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${['all','upcoming','active','ended'].map(s=>`<button class="adm-tab-btn${admFsFilter===s?' active':''}" onclick="admFsFilter='${s}';renderAccount()">${s==='all'?'Tất cả':STATUS_LBL[s]||s}</button>`).join('')}
      </div>
      <button class="adm-btn" onclick="admFlashSaleEditId='new';renderAccount()">+ Tạo Flash Sale</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px">
      ${cards||'<div style="color:#888;padding:24px;text-align:center;grid-column:1/-1">Chưa có Flash Sale nào</div>'}
    </div>`;
}

function adminPromoFlashSaleEditor(editId){
  const isNew=editId==='new';
  const fs=isNew?null:promoFlashSales.find(x=>x.id===editId);
  return `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
      <button class="adm-btn-sm" onclick="admFlashSaleEditId=null;renderAccount()">← Quay lại</button>
      <h3 style="margin:0">${isNew?'Tạo Flash Sale mới':'Chỉnh sửa: '+escHtml(fs?fs.name:'')}</h3>
    </div>
    <div class="adm-form-card" style="max-width:580px;display:flex;flex-direction:column;gap:14px">
      <div><label class="adm-form-lbl">Tên chương trình <span style="color:red">*</span></label>
        <input id="fsName" class="cms-input" style="width:100%" placeholder="VD: Flash Sale Khai Giảng 2025" value="${isNew?'':escHtml(fs.name)}"></div>
      <div><label class="adm-form-lbl">Mô tả</label>
        <textarea id="fsDesc" class="cms-input" style="width:100%;resize:vertical;min-height:64px" placeholder="Mô tả ngắn về chương trình...">${isNew?'':escHtml(fs.desc||'')}</textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div><label class="adm-form-lbl">Thời gian bắt đầu <span style="color:red">*</span></label>
          <input id="fsStart" type="datetime-local" class="cms-input" style="width:100%" value="${isNew?'':fs.startTime}"></div>
        <div><label class="adm-form-lbl">Thời gian kết thúc <span style="color:red">*</span></label>
          <input id="fsEnd" type="datetime-local" class="cms-input" style="width:100%" value="${isNew?'':fs.endTime}"></div>
      </div>
      <div class="promo-fs-hint">ℹ️ Seller đăng ký sản phẩm tham gia sau khi Flash Sale được tạo. Admin duyệt từng sản phẩm trong trang Chi tiết.</div>
      <div style="display:flex;gap:10px;margin-top:4px">
        <button class="adm-btn" onclick="doSaveFlashSale('${editId}')">💾 Lưu Flash Sale</button>
        <button class="adm-btn-sm" onclick="admFlashSaleEditId=null;renderAccount()">Hủy</button>
      </div>
    </div>`;
}

function adminPromoFlashSaleDetail(fsId){
  const fs=promoFlashSales.find(x=>x.id===fsId);
  if(!fs)return '<p style="color:#888">Flash Sale không tồn tại.</p>';
  const STATUS_LBL={upcoming:'Sắp diễn ra',active:'Đang diễn ra',ended:'Đã kết thúc'};
  const PROD_CLR={pending:'#e67e22',approved:'#27ae60',rejected:'#e74c3c'};
  const PROD_LBL={pending:'Chờ duyệt',approved:'Đã duyệt',rejected:'Từ chối'};
  const approved=fs.products.filter(p=>p.status==='approved');
  const pending=fs.products.filter(p=>p.status==='pending');
  const totalSaleQty=approved.reduce((s,p)=>s+p.saleQty,0);
  const totalSold=approved.reduce((s,p)=>s+p.soldQty,0);
  const soldPct=totalSaleQty>0?Math.round(totalSold/totalSaleQty*100):0;
  const rows=fs.products.map(p=>{
    const disc=Math.round((p.originalPrice-p.salePrice)/p.originalPrice*100);
    const pSoldPct=p.saleQty>0?Math.round(p.soldQty/p.saleQty*100):0;
    return `<tr>
      <td><div style="font-weight:600;color:var(--ink-deep)">${escHtml(p.productName)}</div><div style="font-size:12px;color:var(--text-soft)">${escHtml(p.sellerName)}</div></td>
      <td><span style="text-decoration:line-through;color:#aaa;font-size:12px">${fmt(p.originalPrice)}</span><br><strong style="color:var(--ink)">${fmt(p.salePrice)}</strong></td>
      <td><span style="background:#ffe5e5;color:var(--ink);padding:2px 8px;border-radius:4px;font-size:12px;font-weight:700">-${disc}%</span></td>
      <td>${p.soldQty} / ${p.saleQty}<div style="background:#eee;border-radius:4px;height:5px;margin-top:4px"><div style="background:var(--ink);border-radius:4px;height:5px;width:${pSoldPct}%"></div></div></td>
      <td><span style="color:${PROD_CLR[p.status]||'#888'};font-weight:600;font-size:12.5px">${PROD_LBL[p.status]||p.status}</span></td>
      <td>${p.status==='pending'?`<div style="display:flex;gap:5px">
        <button class="adm-btn-sm" style="background:#27ae60;color:#fff" onclick="doApproveFlashSaleProduct('${fsId}',${p.productId})">Duyệt</button>
        <button class="adm-btn-sm danger" onclick="doRejectFlashSaleProduct('${fsId}',${p.productId})">Từ chối</button>
      </div>`:'—'}</td>
    </tr>`;
  }).join('');
  return `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
      <button class="adm-btn-sm" onclick="admFlashSaleDetailId=null;renderAccount()">← Quay lại</button>
      <h3 style="margin:0">${escHtml(fs.name)}</h3>
      <span style="font-size:12px;padding:3px 10px;border-radius:20px;background:${fs.status==='active'?'#27ae6022':'#88888820'};color:${fs.status==='active'?'#27ae60':'#888'}">${STATUS_LBL[fs.status]||fs.status}</span>
    </div>
    <div class="adm-kpi-row" style="margin-bottom:16px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fs.products.length}</div><div class="adm-kpi-lbl">Tổng sản phẩm</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val" style="color:#e67e22">${pending.length}</div><div class="adm-kpi-lbl">Chờ duyệt</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${totalSold} / ${totalSaleQty} <small style="font-size:13px;color:#888">(${soldPct}%)</small></div><div class="adm-kpi-lbl">Đã bán / Tổng SL</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtMil(fs.totalRevenue)}đ</div><div class="adm-kpi-lbl">Doanh thu</div></div>
    </div>
    <div class="adm-form-card" style="margin-bottom:16px;padding:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13.5px">
        <div>⏰ <strong>Bắt đầu:</strong> ${fs.startTime.replace('T',' ')}</div>
        <div>⏰ <strong>Kết thúc:</strong> ${fs.endTime.replace('T',' ')}</div>
        <div style="grid-column:1/-1">📝 ${escHtml(fs.desc||'Không có mô tả')}</div>
        ${fs.endedEarlyAt?`<div style="grid-column:1/-1;color:#e74c3c">⏹ Kết thúc sớm lúc: ${fs.endedEarlyAt}</div>`:''}
      </div>
      ${fs.status==='active'?`<div style="margin-top:10px"><button class="adm-btn-sm danger" onclick="doEndFlashSale('${fs.id}')">⏹ Kết thúc sớm Flash Sale</button></div>`:''}
    </div>
    <h4 style="margin:0 0 10px;font-size:14px">Danh sách sản phẩm tham gia</h4>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>Sản phẩm / Seller</th><th>Giá gốc → Sale</th><th>% giảm</th><th>Đã bán / SL</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="6" style="text-align:center;color:#888;padding:24px">Chưa có sản phẩm đăng ký</td></tr>'}</tbody>
      </table>
    </div>`;
}

function doSaveFlashSale(editId){
  const name=((document.getElementById('fsName')||{}).value||'').trim();
  const desc=((document.getElementById('fsDesc')||{}).value||'').trim();
  const startTime=(document.getElementById('fsStart')||{}).value||'';
  const endTime=(document.getElementById('fsEnd')||{}).value||'';
  if(!name){toast('Vui lòng nhập tên chương trình');return;}
  if(!startTime||!endTime){toast('Vui lòng chọn thời gian bắt đầu và kết thúc');return;}
  if(startTime>=endTime){toast('Thời gian kết thúc phải sau thời gian bắt đầu');return;}
  if(editId==='new'){
    promoFlashSales.unshift({id:'FS-'+String(Date.now()).slice(-4),name,desc,startTime,endTime,status:'upcoming',products:[],totalRevenue:0,totalSold:0,endedEarlyAt:null,createdAt:todayStr()});
    toast('Đã tạo Flash Sale: '+name);
  }else{
    const fs=promoFlashSales.find(x=>x.id===editId);if(!fs){toast('Không tìm thấy Flash Sale');return;}
    Object.assign(fs,{name,desc,startTime,endTime});toast('Đã cập nhật Flash Sale');
  }
  savePromoFlashSales();admFlashSaleEditId=null;renderAccount();
}

function doEndFlashSale(id){
  const fs=promoFlashSales.find(x=>x.id===id);if(!fs)return;
  if(!confirm('Kết thúc sớm Flash Sale "'+fs.name+'"?\nSản phẩm sale sẽ trở về giá gốc ngay lập tức.'))return;
  fs.status='ended';fs.endedEarlyAt=todayStr();
  savePromoFlashSales();renderAccount();toast('Đã kết thúc sớm Flash Sale: '+fs.name);
}

function doApproveFlashSaleProduct(fsId,productId){
  const fs=promoFlashSales.find(x=>x.id===fsId);if(!fs)return;
  const p=fs.products.find(x=>x.productId===productId);if(!p)return;
  p.status='approved';
  savePromoFlashSales();renderAccount();toast('Đã duyệt sản phẩm tham gia Flash Sale');
}

function doRejectFlashSaleProduct(fsId,productId){
  const fs=promoFlashSales.find(x=>x.id===fsId);if(!fs)return;
  const p=fs.products.find(x=>x.productId===productId);if(!p)return;
  const reason=prompt('Lý do từ chối sản phẩm "'+p.productName+'" tham gia Flash Sale:');
  if(reason===null)return;
  p.status='rejected';p.rejectReason=reason||'Không đạt yêu cầu';
  savePromoFlashSales();renderAccount();toast('Đã từ chối: '+p.productName);
}

/* ---------- ĐIỂM THƯỞNG ---------- */
function adminPromoPoints(){
  const TABS=[['settings','Cài đặt tích điểm'],['tiers','Hạng thành viên'],['stats','Thống kê']];
  const content=admPointsTab==='tiers'?adminPromoPointsTiers():
    admPointsTab==='stats'?adminPromoPointsStats():
    adminPromoPointsSettings();
  return `<div>
    <div class="adm-shops-tabs">
      ${TABS.map(([k,lbl])=>`<button class="adm-tab-btn${admPointsTab===k?' active':''}" onclick="admPointsTab='${k}';renderAccount()">${lbl}</button>`).join('')}
    </div>${content}
  </div>`;
}

function adminPromoPointsSettings(){
  const cfg=promoPoints;
  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start">
      <div class="adm-form-card" style="display:flex;flex-direction:column;gap:16px">
        <h4 style="margin:0 0 4px;font-size:14px;color:var(--ink-deep)">⭐ Cài đặt tích điểm & quy đổi</h4>
        <div><label class="adm-form-lbl">Tỷ lệ tích điểm: X đồng = 1 điểm</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ptEarnRate" type="number" class="cms-input" style="width:140px" value="${cfg.earnRate}" min="1000" step="1000">
            <span style="color:var(--text-soft);font-size:13.5px">đ = 1 điểm</span>
          </div></div>
        <div><label class="adm-form-lbl">Điểm tối thiểu để đổi thưởng</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ptRedeemThreshold" type="number" class="cms-input" style="width:100px" value="${cfg.redeemThreshold}" min="1">
            <span style="color:var(--text-soft);font-size:13.5px">điểm</span>
          </div></div>
        <div><label class="adm-form-lbl">Quy đổi: X điểm = 1 voucher giảm Y%</label>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <input id="ptRedeemPts" type="number" class="cms-input" style="width:80px" value="${cfg.redeemPoints}" min="1">
            <span style="color:var(--text-soft);font-size:13.5px">điểm =</span>
            <input id="ptRedeemPct" type="number" class="cms-input" style="width:70px" value="${cfg.redeemVoucherPct}" min="1" max="100">
            <span style="color:var(--text-soft);font-size:13.5px">%</span>
          </div></div>
        <div><label class="adm-form-lbl">Đơn tối thiểu để dùng voucher điểm (đ)</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ptRedeemMinOrder" type="number" class="cms-input" style="width:140px" value="${cfg.redeemMinOrder}" min="0" step="10000">
            <span style="color:var(--text-soft);font-size:13.5px">đ</span>
          </div></div>
        <div><label class="adm-form-lbl">Điểm hết hạn sau (ngày không hoạt động)</label>
          <div style="display:flex;align-items:center;gap:8px">
            <input id="ptExpireDays" type="number" class="cms-input" style="width:100px" value="${cfg.pointExpireDays}" min="30" max="3650">
            <span style="color:var(--text-soft);font-size:13.5px">ngày</span>
          </div></div>
        <button class="adm-btn" onclick="doSavePointsConfig()" style="align-self:flex-start">💾 Lưu cài đặt</button>
      </div>
      <div class="adm-form-card">
        <h4 style="margin:0 0 12px;font-size:14px;color:var(--ink-deep)">📋 Tóm tắt cấu hình hiện tại</h4>
        <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px">
          <div style="background:var(--paper);border-radius:8px;padding:11px 14px">🛒 Mua <strong>${fmt(cfg.earnRate)}</strong> → +1 điểm</div>
          <div style="background:var(--paper);border-radius:8px;padding:11px 14px">🎟 <strong>${cfg.redeemPoints}</strong> điểm → voucher giảm <strong>${cfg.redeemVoucherPct}%</strong> (đơn từ ${fmt(cfg.redeemMinOrder)})</div>
          <div style="background:var(--paper);border-radius:8px;padding:11px 14px">⚡ Đổi tối thiểu: <strong>${cfg.redeemThreshold} điểm</strong></div>
          <div style="background:var(--paper);border-radius:8px;padding:11px 14px">🕐 Hết hạn sau <strong>${cfg.pointExpireDays} ngày</strong> không dùng</div>
          <div style="font-size:12px;color:var(--text-soft);padding-left:4px">Cập nhật: ${cfg.updatedAt}</div>
        </div>
      </div>
    </div>`;
}

function adminPromoPointsTiers(){
  const tiers=promoPoints.tiers;
  const rows=tiers.map((t,i)=>`<tr>
    <td style="font-size:20px;text-align:center">${t.badge}</td>
    <td><strong>${escHtml(t.name)}</strong></td>
    <td>${i===0?'0 (mặc định)':fmtBig(t.minPoints)+' điểm'}</td>
    <td><span style="background:var(--ink)18;color:var(--ink);padding:2px 8px;border-radius:4px;font-weight:700">x${t.multiplier}</span></td>
    <td style="font-size:13px;color:var(--text-soft)">${escHtml(t.perks)}</td>
    <td><button class="adm-btn-sm" onclick="doEditTier(${i})">Sửa</button></td>
  </tr>`).join('');
  return `
    <div class="adm-form-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h4 style="margin:0;font-size:14px;color:var(--ink-deep)">🏅 Hạng thành viên</h4>
      </div>
      <div class="adm-table-wrap">
        <table class="adm-table">
          <thead><tr><th></th><th>Hạng</th><th>Điểm tối thiểu</th><th>Hệ số x</th><th>Đặc quyền</th><th>Sửa</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div style="margin-top:14px;padding:11px 14px;background:var(--paper);border-radius:8px;font-size:13px;color:var(--text-soft)">
        ℹ️ Hạng thành viên tính theo tổng điểm tích lũy. Hệ số nhân áp dụng khi tích điểm (ví dụ x1.5 → đơn 30k tích 4,5 điểm thay vì 3).
      </div>
    </div>`;
}

function doEditTier(idx){
  const t=promoPoints.tiers[idx];if(!t)return;
  const newPerks=prompt('Đặc quyền hạng '+t.name+':',t.perks);
  if(newPerks===null)return;
  const newMult=prompt('Hệ số tích điểm (>=1):',''+t.multiplier);
  if(newMult===null)return;
  const mult=parseFloat(newMult);
  if(isNaN(mult)||mult<1){toast('Hệ số phải >= 1');return;}
  t.perks=newPerks||t.perks;t.multiplier=mult;
  promoPoints.updatedAt=todayStr();
  savePromoPoints();renderAccount();toast('Đã cập nhật hạng '+t.name);
}

function adminPromoPointsStats(){
  const st=promoPoints.stats;
  const balance=st.totalIssued-st.totalRedeemed-st.totalExpired;
  const redeemPct=Math.round(st.totalRedeemed/st.totalIssued*100);
  const expPct=Math.round(st.totalExpired/st.totalIssued*100);
  const balPct=100-redeemPct-expPct;
  return `
    <div class="adm-kpi-row" style="margin-bottom:18px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtBig(st.totalIssued)}</div><div class="adm-kpi-lbl">Tổng điểm phát hành</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtBig(st.totalRedeemed)}</div><div class="adm-kpi-lbl">Đã quy đổi</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtBig(balance)}</div><div class="adm-kpi-lbl">Đang lưu hành</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtBig(st.totalActiveUsers)}</div><div class="adm-kpi-lbl">Người dùng có điểm</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
      <div class="adm-form-card">
        <h4 style="margin:0 0 14px;font-size:14px">Phân bổ điểm</h4>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${[['Đang lưu hành',balPct,'var(--ink)'],['Đã quy đổi',redeemPct,'#27ae60'],['Đã hết hạn',expPct,'#bbb']].map(([lbl,pct,clr])=>`
            <div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px"><span>${lbl}</span><span style="font-weight:600;color:${clr}">${pct}%</span></div>
              <div style="background:#eee;border-radius:4px;height:8px"><div style="background:${clr};border-radius:4px;height:8px;width:${pct}%"></div></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="adm-form-card">
        <h4 style="margin:0 0 14px;font-size:14px">Số liệu khác</h4>
        <div style="display:flex;flex-direction:column;gap:9px;font-size:13.5px">
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--paper);border-radius:8px"><span>Voucher đã tạo từ điểm</span><strong>${fmtBig(st.totalVouchersGenerated)}</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--paper);border-radius:8px"><span>Điểm trung bình / người dùng</span><strong>${fmtBig(st.avgPointsPerUser)}</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--paper);border-radius:8px"><span>Điểm đã hết hạn</span><strong style="color:#aaa">${fmtBig(st.totalExpired)}</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--paper);border-radius:8px"><span>Tỷ lệ quy đổi</span><strong style="color:#27ae60">${redeemPct}%</strong></div>
        </div>
      </div>
    </div>`;
}

function doSavePointsConfig(){
  const earnRate=parseFloat((document.getElementById('ptEarnRate')||{}).value||0);
  const redeemThreshold=parseFloat((document.getElementById('ptRedeemThreshold')||{}).value||0);
  const redeemPoints=parseFloat((document.getElementById('ptRedeemPts')||{}).value||0);
  const redeemVoucherPct=parseFloat((document.getElementById('ptRedeemPct')||{}).value||0);
  const redeemMinOrder=parseFloat((document.getElementById('ptRedeemMinOrder')||{}).value||0);
  const pointExpireDays=parseFloat((document.getElementById('ptExpireDays')||{}).value||0);
  if(!earnRate||earnRate<1000){toast('Tỷ lệ tích điểm tối thiểu 1.000đ = 1 điểm');return;}
  if(!redeemPoints||redeemPoints<1){toast('Số điểm quy đổi không hợp lệ');return;}
  if(!redeemVoucherPct||redeemVoucherPct<1||redeemVoucherPct>100){toast('% voucher quy đổi phải từ 1–100');return;}
  if(!pointExpireDays||pointExpireDays<30){toast('Điểm hết hạn tối thiểu sau 30 ngày');return;}
  Object.assign(promoPoints,{earnRate,redeemThreshold,redeemPoints,redeemVoucherPct,redeemMinOrder,pointExpireDays,updatedAt:todayStr()});
  savePromoPoints();renderAccount();toast('Đã lưu cài đặt điểm thưởng');
}

// =====================================================================
// CÀI ĐẶT HỆ THỐNG
// =====================================================================
const SYS_MODULES={
  ebook:{label:'Sách điện tử (Ebook)',icon:'📖',desc:'Cho phép mua/bán file ebook'},
  vpp:{label:'Văn phòng phẩm (VPP)',icon:'✏️',desc:'Danh mục văn phòng phẩm'},
  tbgd:{label:'Thiết bị giáo dục',icon:'🔭',desc:'Thiết bị dạy học, thí nghiệm'},
  audiobook:{label:'Sách nói (Audiobook)',icon:'🎧',desc:'Nội dung audio bản quyền'},
  blog:{label:'Blog / Tin tức',icon:'📰',desc:'Hệ thống bài viết & tin tức'},
  flashsale:{label:'Flash Sale',icon:'⚡',desc:'Chương trình khuyến mãi theo giờ'},
  voucher:{label:'Mã giảm giá',icon:'🏷️',desc:'Hệ thống voucher toàn sàn'},
  points:{label:'Điểm thưởng',icon:'⭐',desc:'Chương trình tích lũy điểm'},
  review:{label:'Đánh giá sản phẩm',icon:'⭐',desc:'Cho phép người mua đánh giá'},
  chat:{label:'Chat trực tiếp',icon:'💬',desc:'Chat giữa buyer và seller'}
};
const SYS_TIMEZONES=['Asia/Ho_Chi_Minh','Asia/Bangkok','Asia/Singapore','Asia/Tokyo','UTC'];
const SYS_CURRENCIES=[{code:'VND',symbol:'đ',name:'Việt Nam Đồng'},{code:'USD',symbol:'$',name:'US Dollar'},{code:'EUR',symbol:'€',name:'Euro'}];
const SYS_DATE_FORMATS=['DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD'];

function adminSettings(){
  const TABS=[['general','⚙️ Cấu hình chung'],['payment','💳 Thanh toán'],['oauth','🔐 OAuth']];
  const content=admSettingsTab==='payment'?adminSettingsPayment():
    admSettingsTab==='oauth'?adminSettingsOAuth():
    adminSettingsGeneral();
  return `<div class="adm-section">
    <h2 class="adm-section-title">Cài đặt hệ thống</h2>
    <div class="adm-shops-tabs">
      ${TABS.map(([k,lbl])=>`<button class="adm-tab-btn${admSettingsTab===k?' active':''}" onclick="admSettingsTab='${k}';renderAccount()">${lbl}</button>`).join('')}
    </div>
    ${content}
  </div>`;
}

/* ========== GENERAL ========== */
function adminSettingsGeneral(){
  const SUB=[['info','Thông tin chung'],['locale','Ngôn ngữ & Khu vực'],['modules','Tính năng']];
  const body=admSettingsGeneralTab==='locale'?_sysGeneralLocale():
    admSettingsGeneralTab==='modules'?_sysGeneralModules():
    _sysGeneralInfo();
  return `<div class="sys-sub-tabs" style="margin-bottom:16px">
    ${SUB.map(([k,lbl])=>`<button class="sys-sub-btn${admSettingsGeneralTab===k?' active':''}" onclick="admSettingsGeneralTab='${k}';renderAccount()">${lbl}</button>`).join('')}
  </div>
  ${body}`;
}

function _sysGeneralInfo(){
  const c=sysConfig;
  return `<div class="sys-form-grid">
    <div class="adm-form-card">
      <h3 class="sys-card-title">🏢 Thông tin website</h3>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Tên website <span style="color:red">*</span></label>
        <input id="cfgSiteName" class="cms-input" value="${escHtml(c.siteName)}" placeholder="EduMart">
      </div>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Mô tả website</label>
        <textarea id="cfgSiteDesc" class="cms-input" rows="2" style="resize:vertical">${escHtml(c.siteDesc)}</textarea>
      </div>
      <div class="sys-form-row">
        <div style="flex:1">
          <label class="adm-form-lbl">URL Logo</label>
          <input id="cfgLogoUrl" class="cms-input" value="${escHtml(c.logoUrl)}" placeholder="/logo.png">
        </div>
        <div style="flex:1">
          <label class="adm-form-lbl">URL Favicon</label>
          <input id="cfgFaviconUrl" class="cms-input" value="${escHtml(c.faviconUrl)}" placeholder="/favicon.ico">
        </div>
      </div>
      <div class="sys-logo-preview">
        <div class="sys-logo-box">
          <div style="font-size:11px;color:var(--text-soft);margin-bottom:4px">Logo preview</div>
          <div style="width:120px;height:40px;background:var(--ink);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px">📚 ${escHtml(c.siteName)}</div>
        </div>
        <div class="sys-logo-box">
          <div style="font-size:11px;color:var(--text-soft);margin-bottom:4px">Favicon preview</div>
          <div style="width:32px;height:32px;background:var(--ink);border-radius:4px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px">📚</div>
        </div>
      </div>
    </div>
    <div class="adm-form-card">
      <h3 class="sys-card-title">📞 Thông tin liên hệ</h3>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Email hỗ trợ</label>
        <input id="cfgEmail" class="cms-input" type="email" value="${escHtml(c.email)}" placeholder="support@edumart.vn">
      </div>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Hotline</label>
        <input id="cfgPhone" class="cms-input" value="${escHtml(c.phone)}" placeholder="1900 1234">
      </div>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Địa chỉ</label>
        <textarea id="cfgAddress" class="cms-input" rows="2" style="resize:vertical">${escHtml(c.address)}</textarea>
      </div>
      <div class="sys-form-row">
        <div style="flex:1">
          <label class="adm-form-lbl">Facebook</label>
          <input id="cfgFacebook" class="cms-input" value="${escHtml(c.facebook)}" placeholder="https://facebook.com/...">
        </div>
        <div style="flex:1">
          <label class="adm-form-lbl">Zalo</label>
          <input id="cfgZalo" class="cms-input" value="${escHtml(c.zalo)}" placeholder="Số điện thoại Zalo">
        </div>
      </div>
      <div style="margin-top:16px">
        <button class="adm-btn" onclick="doSaveGeneralInfo()">💾 Lưu thay đổi</button>
      </div>
    </div>
  </div>`;
}

function _sysGeneralLocale(){
  const c=sysConfig;
  return `<div class="adm-form-card" style="max-width:600px">
    <h3 class="sys-card-title">🌏 Ngôn ngữ & Khu vực</h3>
    <div class="sys-form-group">
      <label class="adm-form-lbl">Múi giờ</label>
      <select id="cfgTimezone" class="cms-input">
        ${SYS_TIMEZONES.map(tz=>`<option value="${tz}"${c.timezone===tz?' selected':''}>${tz}</option>`).join('')}
      </select>
      <div class="sys-hint">Múi giờ ảnh hưởng đến hiển thị ngày giờ đơn hàng, Flash Sale, báo cáo.</div>
    </div>
    <div class="sys-form-group">
      <label class="adm-form-lbl">Đơn vị tiền tệ</label>
      <select id="cfgCurrency" class="cms-input">
        ${SYS_CURRENCIES.map(cur=>`<option value="${cur.code}"${c.currency===cur.code?' selected':''}>${cur.name} (${cur.symbol})</option>`).join('')}
      </select>
    </div>
    <div class="sys-form-group">
      <label class="adm-form-lbl">Định dạng ngày</label>
      <select id="cfgDateFormat" class="cms-input">
        ${SYS_DATE_FORMATS.map(f=>`<option value="${f}"${c.dateFormat===f?' selected':''}>${f}</option>`).join('')}
      </select>
    </div>
    <div class="sys-locale-preview" style="margin-top:12px;padding:14px;background:var(--paper);border-radius:8px;font-size:13.5px">
      <div style="font-size:12px;color:var(--text-soft);margin-bottom:8px">Ví dụ hiển thị:</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div>📅 Ngày: <strong>${todayStr()}</strong></div>
        <div>💰 Giá: <strong>${fmt(125000)}</strong></div>
        <div>⏰ Múi giờ: <strong>${c.timezone}</strong></div>
      </div>
    </div>
    <div style="margin-top:16px"><button class="adm-btn" onclick="doSaveLocale()">💾 Lưu cài đặt</button></div>
  </div>`;
}

function _sysGeneralModules(){
  const mods=sysConfig.modules;
  const activeCount=Object.values(mods).filter(Boolean).length;
  return `<div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
      <div style="font-size:13.5px;color:var(--text-soft)">${activeCount}/${Object.keys(SYS_MODULES).length} tính năng đang bật</div>
      <div style="display:flex;gap:8px">
        <button class="adm-btn-sm" onclick="doToggleAllModules(true)">Bật tất cả</button>
        <button class="adm-btn-sm" onclick="doToggleAllModules(false)">Tắt tất cả</button>
      </div>
    </div>
    <div class="sys-modules-grid">
      ${Object.entries(SYS_MODULES).map(([key,m])=>{
        const on=!!mods[key];
        return `<div class="sys-module-card${on?'':' disabled'}">
          <div style="display:flex;align-items:flex-start;gap:10px">
            <span style="font-size:22px;line-height:1">${m.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:14px;color:var(--ink-deep)">${m.label}</div>
              <div style="font-size:12.5px;color:var(--text-soft);margin-top:2px">${m.desc}</div>
            </div>
            <label class="sys-toggle" title="${on?'Tắt':'Bật'} ${m.label}">
              <input type="checkbox" ${on?'checked':''} onchange="doToggleModule('${key}')">
              <span class="sys-toggle-slider"></span>
            </label>
          </div>
          <div class="sys-module-status ${on?'on':'off'}">${on?'✅ Đang hoạt động':'⚫ Đã tắt'}</div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function doSaveGeneralInfo(){
  const fields={
    siteName:document.getElementById('cfgSiteName'),
    siteDesc:document.getElementById('cfgSiteDesc'),
    logoUrl:document.getElementById('cfgLogoUrl'),
    faviconUrl:document.getElementById('cfgFaviconUrl'),
    email:document.getElementById('cfgEmail'),
    phone:document.getElementById('cfgPhone'),
    address:document.getElementById('cfgAddress'),
    facebook:document.getElementById('cfgFacebook'),
    zalo:document.getElementById('cfgZalo')
  };
  if(!fields.siteName||!fields.siteName.value.trim()){toast('Tên website không được để trống');return;}
  Object.entries(fields).forEach(([k,el])=>{if(el)sysConfig[k]=el.value.trim();});
  saveSysConfig();renderAccount();toast('✅ Đã lưu thông tin website');
}

function doSaveLocale(){
  const tz=document.getElementById('cfgTimezone');
  const cur=document.getElementById('cfgCurrency');
  const df=document.getElementById('cfgDateFormat');
  if(tz)sysConfig.timezone=tz.value;
  if(cur){sysConfig.currency=cur.value;const c=SYS_CURRENCIES.find(x=>x.code===cur.value);if(c)sysConfig.currencySymbol=c.symbol;}
  if(df)sysConfig.dateFormat=df.value;
  saveSysConfig();renderAccount();toast('✅ Đã lưu cài đặt khu vực');
}

function doToggleModule(key){
  sysConfig.modules[key]=!sysConfig.modules[key];
  saveSysConfig();renderAccount();
  toast((sysConfig.modules[key]?'✅ Đã bật: ':'⚫ Đã tắt: ')+SYS_MODULES[key].label);
}

function doToggleAllModules(val){
  Object.keys(sysConfig.modules).forEach(k=>{sysConfig.modules[k]=val;});
  saveSysConfig();renderAccount();toast(val?'✅ Đã bật tất cả tính năng':'⚫ Đã tắt tất cả tính năng');
}

/* ========== PAYMENT ========== */
function adminSettingsPayment(){
  const SUB=[['gateways','Cổng thanh toán'],['shipping','Phí vận chuyển'],['tax','Thuế (VAT)']];
  const body=admSettingsPaymentTab==='shipping'?_sysPayShipping():
    admSettingsPaymentTab==='tax'?_sysPayTax():
    _sysPayGateways();
  return `<div class="sys-sub-tabs" style="margin-bottom:16px">
    ${SUB.map(([k,lbl])=>`<button class="sys-sub-btn${admSettingsPaymentTab===k?' active':''}" onclick="admSettingsPaymentTab='${k}';renderAccount()">${lbl}</button>`).join('')}
  </div>
  ${body}`;
}

function _sysPayGateways(){
  const gws=sysPayment.gateways;
  return `<div>
    <p style="margin:0 0 14px;font-size:13.5px;color:var(--text-soft)">Cấu hình các cổng thanh toán. Chú ý: không chia sẻ Secret Key với bên thứ ba. Thông tin được lưu local.</p>
    <div class="sys-gw-grid">
      ${gws.map(gw=>`
        <div class="sys-gw-card${gw.enabled?'':' disabled'}">
          <div class="sys-gw-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:28px">${gw.icon}</span>
              <div>
                <div style="font-weight:700;font-size:15px;color:var(--ink-deep)">${gw.name}</div>
                <div style="font-size:12.5px;color:var(--text-soft)">${gw.desc}</div>
              </div>
            </div>
            <label class="sys-toggle">
              <input type="checkbox" ${gw.enabled?'checked':''} onchange="doToggleGateway('${gw.id}')">
              <span class="sys-toggle-slider"></span>
            </label>
          </div>
          <div class="sys-gw-body">
            <div class="sys-cred-row">
              <span class="sys-cred-lbl">Client ID / App ID</span>
              <span class="sys-cred-val">${escHtml(gw.clientId)}</span>
            </div>
            <div class="sys-cred-row">
              <span class="sys-cred-lbl">Secret Key</span>
              <span class="sys-cred-val sys-masked">••••••••••••</span>
            </div>
            <div class="sys-cred-row">
              <span class="sys-cred-lbl">Môi trường</span>
              <span style="font-size:12px;font-weight:600;padding:2px 8px;border-radius:4px;${gw.env==='production'?'background:#fff3cd;color:#856404':'background:#d4edda;color:#155724'}">${gw.env==='production'?'🔴 Production':'🟢 Sandbox'}</span>
            </div>
          </div>
          <div class="sys-gw-footer">
            <button class="adm-btn-sm" onclick="doEditGateway('${gw.id}')">⚙️ Cấu hình</button>
            <span class="sys-gw-status ${gw.enabled?'on':'off'}">${gw.enabled?'Đang hoạt động':'Đã tắt'}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="sys-gw-info" style="margin-top:16px">
      <div style="font-size:13px;color:var(--text-soft);background:var(--paper);border-left:3px solid var(--ink);padding:10px 14px;border-radius:0 8px 8px 0;line-height:1.7">
        💡 <strong>Sandbox</strong>: dùng để kiểm thử, giao dịch không thực. <strong>Production</strong>: giao dịch thật, cần tài khoản merchant đã được duyệt bởi đối tác thanh toán.
      </div>
    </div>
  </div>`;
}

function _sysPayShipping(){
  const s=sysPayment.shipping;
  return `<div class="adm-form-card" style="max-width:640px">
    <h3 class="sys-card-title">🚚 Cấu hình phí vận chuyển</h3>
    <div class="sys-form-group">
      <label class="adm-form-lbl">Miễn phí vận chuyển cho đơn từ (VNĐ)</label>
      <input id="shipFreeThreshold" class="cms-input" type="number" min="0" step="10000" value="${s.freeThreshold}" style="max-width:200px">
      <div class="sys-hint">Đặt 0 để tắt chính sách miễn phí vận chuyển.</div>
    </div>
    <h4 style="margin:18px 0 10px;font-size:14px;color:var(--ink-deep)">Phí theo khu vực</h4>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>Khu vực</th><th style="text-align:right;width:180px">Phí (VNĐ)</th></tr></thead>
        <tbody>
          ${s.regions.map((r,i)=>`<tr>
            <td>${escHtml(r.name)}</td>
            <td><input id="shipFee_${r.id}" class="cms-input" type="number" min="0" step="1000" value="${r.fee}" style="width:140px;text-align:right"></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="margin-top:16px"><button class="adm-btn" onclick="doSaveShipping()">💾 Lưu phí vận chuyển</button></div>
  </div>`;
}

function _sysPayTax(){
  const t=sysPayment.tax;
  return `<div class="adm-form-card" style="max-width:540px">
    <h3 class="sys-card-title">📋 Cài đặt Thuế (VAT)</h3>
    <div class="sys-form-group" style="display:flex;align-items:center;gap:12px">
      <label class="adm-form-lbl" style="margin:0;width:auto">Bật tính VAT</label>
      <label class="sys-toggle">
        <input type="checkbox" id="vatEnabled" ${t.vatEnabled?'checked':''}>
        <span class="sys-toggle-slider"></span>
      </label>
      <span style="font-size:13px;color:var(--text-soft)">${t.vatEnabled?'Đang áp dụng':'Không áp dụng'}</span>
    </div>
    <div class="sys-form-group">
      <label class="adm-form-lbl">Thuế suất VAT (%)</label>
      <div style="display:flex;align-items:center;gap:8px">
        <input id="vatRate" class="cms-input" type="number" min="0" max="100" step="1" value="${t.vatRate}" style="width:100px">
        <span style="font-size:13.5px;color:var(--text-soft)">%</span>
      </div>
    </div>
    <div class="sys-form-group" style="display:flex;align-items:center;gap:12px">
      <label class="adm-form-lbl" style="margin:0;width:auto">Giá đã bao gồm VAT</label>
      <label class="sys-toggle">
        <input type="checkbox" id="vatIncluded" ${t.vatIncluded?'checked':''}>
        <span class="sys-toggle-slider"></span>
      </label>
      <span style="font-size:13px;color:var(--text-soft)">${t.vatIncluded?'Giá hiển thị đã gồm VAT':'Giá hiển thị chưa gồm VAT'}</span>
    </div>
    <div style="border-top:1px solid var(--line);padding-top:14px;margin-top:6px">
      <h4 style="margin:0 0 12px;font-size:13.5px;color:var(--ink-deep)">Thông tin doanh nghiệp (xuất hóa đơn)</h4>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Tên công ty</label>
        <input id="taxCompany" class="cms-input" value="${escHtml(t.companyName)}">
      </div>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Mã số thuế</label>
        <input id="taxCode" class="cms-input" value="${escHtml(t.taxCode)}" placeholder="0312345678">
      </div>
      <div class="sys-form-group">
        <label class="adm-form-lbl">Địa chỉ đăng ký kinh doanh</label>
        <input id="taxAddress" class="cms-input" value="${escHtml(t.taxAddress)}">
      </div>
    </div>
    <div style="margin-top:16px"><button class="adm-btn" onclick="doSaveTax()">💾 Lưu cài đặt thuế</button></div>
  </div>`;
}

function doToggleGateway(id){
  const gw=sysPayment.gateways.find(g=>g.id===id);if(!gw)return;
  if(!gw.enabled&&(gw.clientId.includes('placeholder')||gw.secretKey.includes('***'))){
    if(!confirm('Cổng này chưa được cấu hình đầy đủ. Vẫn bật?'))return;
  }
  gw.enabled=!gw.enabled;
  saveSysPayment();renderAccount();
  toast((gw.enabled?'✅ Đã bật ':'⚫ Đã tắt ')+gw.name);
}

function doEditGateway(id){
  const gw=sysPayment.gateways.find(g=>g.id===id);if(!gw)return;
  const clientId=prompt('Client ID / App ID cho '+gw.name+':',gw.clientId);
  if(clientId===null)return;
  const secretKey=prompt('Secret Key cho '+gw.name+'\n(Để trống giữ nguyên giá trị cũ):','');
  const envOpt=prompt('Môi trường (sandbox / production):',gw.env);
  if(clientId!==null)gw.clientId=clientId.trim()||gw.clientId;
  if(secretKey&&secretKey.trim())gw.secretKey=secretKey.trim();
  if(envOpt&&(envOpt==='sandbox'||envOpt==='production'))gw.env=envOpt;
  saveSysPayment();renderAccount();toast('✅ Đã cập nhật cấu hình '+gw.name);
}

function doSaveShipping(){
  const threshEl=document.getElementById('shipFreeThreshold');
  if(threshEl)sysPayment.shipping.freeThreshold=Math.max(0,parseInt(threshEl.value)||0);
  sysPayment.shipping.regions.forEach(r=>{
    const el=document.getElementById('shipFee_'+r.id);
    if(el)r.fee=Math.max(0,parseInt(el.value)||0);
  });
  saveSysPayment();renderAccount();toast('✅ Đã lưu phí vận chuyển');
}

function doSaveTax(){
  const enabled=document.getElementById('vatEnabled');
  const rate=document.getElementById('vatRate');
  const included=document.getElementById('vatIncluded');
  const company=document.getElementById('taxCompany');
  const code=document.getElementById('taxCode');
  const addr=document.getElementById('taxAddress');
  if(rate&&(parseInt(rate.value)<0||parseInt(rate.value)>100)){toast('Thuế suất phải từ 0–100%');return;}
  if(enabled)sysPayment.tax.vatEnabled=enabled.checked;
  if(rate)sysPayment.tax.vatRate=parseInt(rate.value)||10;
  if(included)sysPayment.tax.vatIncluded=included.checked;
  if(company)sysPayment.tax.companyName=company.value.trim();
  if(code)sysPayment.tax.taxCode=code.value.trim();
  if(addr)sysPayment.tax.taxAddress=addr.value.trim();
  saveSysPayment();renderAccount();toast('✅ Đã lưu cài đặt thuế');
}

/* ========== OAUTH ========== */
function adminSettingsOAuth(){
  const o=sysOAuth;
  const providerCard=(key,title,icon,idLabel,secretLabel,idField,secretField)=>{
    const p=o[key];
    return `<div class="sys-oauth-card${p.enabled?'':' disabled'}">
      <div class="sys-oauth-header">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:32px">${icon}</span>
          <div>
            <div style="font-weight:700;font-size:16px;color:var(--ink-deep)">${title}</div>
            <div class="sys-gw-status ${p.enabled?'on':'off'}" style="margin-top:3px">${p.enabled?'✅ Đang bật':'⚫ Đã tắt'}</div>
          </div>
        </div>
        <label class="sys-toggle">
          <input type="checkbox" ${p.enabled?'checked':''} onchange="doToggleOAuth('${key}')">
          <span class="sys-toggle-slider"></span>
        </label>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:14px">
        <div>
          <label class="adm-form-lbl">${idLabel}</label>
          <input id="oauth_${key}_id" class="cms-input" value="${escHtml(idField)}" placeholder="${idLabel}...">
        </div>
        <div>
          <label class="adm-form-lbl">${secretLabel}</label>
          <div style="display:flex;gap:8px">
            <input id="oauth_${key}_secret" class="cms-input" type="password" value="${escHtml(secretField)}" placeholder="${secretLabel}..." style="flex:1">
            <button class="adm-btn-sm" onclick="sysOAuthToggleSecret('oauth_${key}_secret',this)" title="Hiện/Ẩn">👁</button>
          </div>
        </div>
        <div>
          <label class="adm-form-lbl">Redirect URI</label>
          <input id="oauth_${key}_redirect" class="cms-input" value="${escHtml(p.redirectUri)}" readonly style="background:var(--paper);cursor:default;color:var(--text-soft)">
          <div class="sys-hint">Đăng ký URI này trong Developer Console của ${title}.</div>
        </div>
      </div>
      <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="adm-btn" onclick="doSaveOAuth('${key}')">💾 Lưu cấu hình</button>
        <button class="adm-btn-sm" onclick="doTestOAuth('${key}')">🧪 Kiểm tra kết nối</button>
      </div>
    </div>`;
  };
  return `<div>
    <p style="margin:0 0 16px;font-size:13.5px;color:var(--text-soft)">Cấu hình đăng nhập qua tài khoản mạng xã hội. Cần đăng ký ứng dụng tại Developer Console của từng nhà cung cấp.</p>
    <div class="sys-oauth-grid">
      ${providerCard('google','Google OAuth','🔴','Client ID','Client Secret',o.google.clientId,o.google.clientSecret)}
      ${providerCard('facebook','Facebook OAuth','🔵','App ID','App Secret',o.facebook.appId,o.facebook.appSecret)}
    </div>
    <div class="sys-oauth-note" style="margin-top:16px;padding:12px 16px;background:var(--paper);border-left:3px solid var(--ink);border-radius:0 8px 8px 0;font-size:13px;color:var(--text-soft);line-height:1.7">
      🔐 <strong>Bảo mật:</strong> Không bao giờ commit Client Secret / App Secret vào source code. Trong môi trường production, lưu các giá trị này trong environment variables hoặc secret manager.
    </div>
  </div>`;
}

function sysOAuthToggleSecret(elId,btn){
  const el=document.getElementById(elId);if(!el)return;
  el.type=el.type==='password'?'text':'password';
  btn.textContent=el.type==='password'?'👁':'🙈';
}

function doToggleOAuth(key){
  const p=sysOAuth[key];if(!p)return;
  const name=key==='google'?'Google':'Facebook';
  if(!p.enabled){
    const idVal=key==='google'?sysOAuth.google.clientId:sysOAuth.facebook.appId;
    if(idVal.includes('placeholder')){
      if(!confirm(name+' OAuth chưa được cấu hình. Vẫn bật?'))return;
    }
  }
  p.enabled=!p.enabled;
  saveSysOAuth();renderAccount();
  toast((p.enabled?'✅ Đã bật ':'⚫ Đã tắt ')+name+' OAuth');
}

function doSaveOAuth(key){
  const p=sysOAuth[key];if(!p)return;
  const name=key==='google'?'Google':'Facebook';
  const idEl=document.getElementById('oauth_'+key+'_id');
  const secEl=document.getElementById('oauth_'+key+'_secret');
  if(key==='google'){
    if(idEl)p.clientId=idEl.value.trim()||p.clientId;
    if(secEl&&secEl.value.trim())p.clientSecret=secEl.value.trim();
  } else {
    if(idEl)p.appId=idEl.value.trim()||p.appId;
    if(secEl&&secEl.value.trim())p.appSecret=secEl.value.trim();
  }
  saveSysOAuth();renderAccount();toast('✅ Đã lưu cấu hình '+name+' OAuth');
}

function doTestOAuth(key){
  const p=sysOAuth[key];if(!p)return;
  const name=key==='google'?'Google':'Facebook';
  if(!p.enabled){toast('⚠️ '+name+' OAuth đang tắt. Hãy bật trước khi kiểm tra.');return;}
  const idVal=key==='google'?p.clientId:p.appId;
  if(idVal.includes('placeholder')){toast('⚠️ Chưa nhập Client ID hợp lệ cho '+name);return;}
  toast('🧪 Đang kiểm tra kết nối '+name+' OAuth... (Demo: kết nối thành công ✅)');
}

// =====================================================================
// QUẢN LÝ EMAIL & THÔNG BÁO
// =====================================================================
const EMAIL_TARGET_GROUPS={all:'Tất cả người dùng',buyer:'Người mua',seller:'Nhà bán hàng',new:'Người dùng mới (30 ngày)'};
const EMAIL_SOURCE_LBL={register:'Đăng ký',checkout:'Thanh toán',manual:'Thêm thủ công'};

function adminNotif(){
  const TABS=[['compose','✉ Soạn email'],['history','📊 Lịch sử gửi'],['newsletter','📋 Newsletter']];
  const content=admNotifTab==='history'?adminNotifHistory():
    admNotifTab==='newsletter'?adminNotifNewsletter():
    adminNotifCompose();
  return `<div class="adm-section">
    <h2 class="adm-section-title">Quản lý Email & Thông báo</h2>
    <div class="adm-shops-tabs">
      ${TABS.map(([k,lbl])=>`<button class="adm-tab-btn${admNotifTab===k?' active':''}" onclick="admNotifTab='${k}';renderAccount()">${lbl}</button>`).join('')}
    </div>
    ${content}
  </div>`;
}

/* ---------- SOẠN EMAIL ---------- */
function adminNotifCompose(){
  const totalUsers=15420;
  const groupCounts={all:15420,buyer:11231,seller:892,new:2145};
  return `
    <div class="notif-compose-grid">
      <div class="adm-form-card" style="display:flex;flex-direction:column;gap:16px">
        <h3 style="margin:0 0 4px;font-size:15px;color:var(--ink-deep)">✉ Soạn email thông báo</h3>
        <div>
          <label class="adm-form-lbl">Tiêu đề email <span style="color:red">*</span></label>
          <input id="emSubject" class="cms-input" style="width:100%" placeholder="Nhập tiêu đề email...">
        </div>
        <div>
          <label class="adm-form-lbl">Gửi đến nhóm <span style="color:red">*</span></label>
          <select id="emTarget" class="cms-input" style="width:100%" onchange="notifUpdateCount(this.value)">
            ${Object.entries(EMAIL_TARGET_GROUPS).map(([k,lbl])=>`<option value="${k}">${lbl} (${(groupCounts[k]||0).toLocaleString('vi-VN')} người)</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="adm-form-lbl">Nội dung email <span style="color:red">*</span></label>
          <div class="cms-toolbar">
            <button class="cms-tb-btn" title="In đậm" onclick="notifFmt('bold')"><b>B</b></button>
            <button class="cms-tb-btn" title="In nghiêng" onclick="notifFmt('italic')"><i>I</i></button>
            <button class="cms-tb-btn" title="Gạch chân" onclick="notifFmt('underline')"><u>U</u></button>
            <span class="cms-tb-sep"></span>
            <button class="cms-tb-btn" onclick="notifFmt('formatBlock','H2')">H2</button>
            <button class="cms-tb-btn" onclick="notifFmt('formatBlock','P')">¶</button>
            <span class="cms-tb-sep"></span>
            <button class="cms-tb-btn" onclick="notifFmt('insertUnorderedList')">≡</button>
            <button class="cms-tb-btn" onclick="notifInsertLink()">🔗</button>
          </div>
          <div id="emContent" class="cms-editor notif-editor" contenteditable="true" placeholder="Nhập nội dung email..."><p>Xin chào,</p><p></p><p>Trân trọng,<br><strong>Đội ngũ EduMart</strong></p></div>
        </div>
        <div id="notifCountBanner" class="notif-count-banner">
          📬 Email sẽ được gửi đến <strong id="notifCountNum">15.420</strong> người dùng
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="adm-btn" onclick="doSendEmail()">🚀 Gửi email ngay</button>
          <button class="adm-btn-sm" onclick="doPreviewEmail()">👁 Xem trước</button>
          <button class="adm-btn-sm" onclick="doClearCompose()">🗑 Xóa nháp</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="adm-form-card">
          <h4 style="margin:0 0 12px;font-size:14px;color:var(--ink-deep)">📊 Thống kê nhanh</h4>
          <div style="display:flex;flex-direction:column;gap:9px">
            ${Object.entries(EMAIL_TARGET_GROUPS).map(([k,lbl])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:var(--paper);border-radius:8px;font-size:13.5px"><span>${lbl}</span><strong>${(groupCounts[k]||0).toLocaleString('vi-VN')}</strong></div>`).join('')}
          </div>
        </div>
        <div class="adm-form-card">
          <h4 style="margin:0 0 10px;font-size:14px;color:var(--ink-deep)">💡 Mẹo soạn thảo</h4>
          <ul style="margin:0;padding-left:16px;font-size:13px;color:var(--text-soft);line-height:1.8">
            <li>Tiêu đề nên ngắn gọn, dưới 60 ký tự</li>
            <li>Bắt đầu bằng thông tin quan trọng nhất</li>
            <li>Thêm lời kêu gọi hành động (CTA) rõ ràng</li>
            <li>Kiểm tra kỹ trước khi gửi — không thể thu hồi</li>
          </ul>
        </div>
        <div class="adm-form-card">
          <h4 style="margin:0 0 10px;font-size:14px;color:var(--ink-deep)">📬 Gửi gần đây</h4>
          ${emailCampaigns.slice(0,3).map(c=>`<div style="padding:8px 0;border-bottom:1px solid var(--line);font-size:13px"><div style="font-weight:600;color:var(--ink-deep);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(c.subject)}</div><div style="color:var(--text-soft);font-size:12px;margin-top:2px">${c.sentAt} · ${EMAIL_TARGET_GROUPS[c.targetGroup]||c.targetGroup}</div></div>`).join('')}
        </div>
      </div>
    </div>`;
}

function notifFmt(cmd,val){const el=document.getElementById('emContent');if(el){el.focus();document.execCommand(cmd,false,val||null);}}
function notifInsertLink(){const url=prompt('Nhập URL liên kết:');if(url)notifFmt('createLink',url);}
function notifUpdateCount(group){
  const groupCounts={all:15420,buyer:11231,seller:892,new:2145};
  const el=document.getElementById('notifCountNum');
  if(el)el.textContent=(groupCounts[group]||0).toLocaleString('vi-VN');
}

function doSendEmail(){
  const subject=((document.getElementById('emSubject')||{}).value||'').trim();
  const target=(document.getElementById('emTarget')||{}).value||'all';
  const contentEl=document.getElementById('emContent');
  const content=contentEl?contentEl.innerHTML:'';
  if(!subject){toast('Vui lòng nhập tiêu đề email');return;}
  if(!content||content==='<br>'||content.replace(/<[^>]+>/g,'').trim()===''){toast('Vui lòng nhập nội dung email');return;}
  if(!confirm('Xác nhận gửi email:\n"'+subject+'"\nđến '+EMAIL_TARGET_GROUPS[target]+'?\n\nHành động này không thể thu hồi.')){return;}
  const groupCounts={all:15420,buyer:11231,seller:892,new:2145};
  const targetCount=groupCounts[target]||0;
  const newCampaign={
    id:'EM-'+String(Date.now()).slice(-5),
    subject,targetGroup:target,targetCount,
    sentAt:todayStr(),sentBy:user?user.name:'Admin',
    status:'sent',content,
    stats:{sent:targetCount,opened:0,clicked:0,bounced:0,unsubscribed:0}
  };
  emailCampaigns.unshift(newCampaign);
  saveEmailCampaigns();
  admNotifTab='history';
  renderAccount();
  toast('✅ Đã gửi email đến '+targetCount.toLocaleString('vi-VN')+' người dùng!');
}

function doPreviewEmail(){
  const subject=((document.getElementById('emSubject')||{}).value||'(Chưa có tiêu đề)').trim();
  const contentEl=document.getElementById('emContent');
  const html=contentEl?contentEl.innerHTML:'(Chưa có nội dung)';
  const win=window.open('','_blank','width=650,height=600,scrollbars=yes');
  if(!win)return;
  win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Preview: ${escHtml(subject)}</title><style>body{font-family:Georgia,serif;max-width:600px;margin:32px auto;color:#222;line-height:1.7;}.header{background:#c8362a;color:#fff;padding:20px 28px;border-radius:8px 8px 0 0;}.body{padding:24px 28px;background:#fffdf9;border:1px solid #eee;}.footer{background:#f7f2ea;padding:14px 28px;font-size:12px;color:#888;border-radius:0 0 8px 8px;text-align:center;}</style></head><body><div class="header"><h2 style="margin:0;font-size:18px">${escHtml(subject)}</h2><div style="font-size:13px;opacity:.85;margin-top:6px">Từ: EduMart &lt;noreply@edumart.vn&gt;</div></div><div class="body">${html}</div><div class="footer">© 2025 EduMart · <a href="#">Hủy đăng ký</a> · <a href="#">Chính sách bảo mật</a></div></body></html>`);
  win.document.close();
}

function doClearCompose(){
  if(!confirm('Xóa nội dung đang soạn?'))return;
  const s=document.getElementById('emSubject');const c=document.getElementById('emContent');
  if(s)s.value='';
  if(c)c.innerHTML='<p>Xin chào,</p><p></p><p>Trân trọng,<br><strong>Đội ngũ EduMart</strong></p>';
  toast('Đã xóa nháp');
}

/* ---------- LỊCH SỬ GỬI ---------- */
function adminNotifHistory(){
  const search=admEmailSearch.toLowerCase();
  const list=emailCampaigns.filter(c=>!search||c.subject.toLowerCase().includes(search));
  const PAGE=8,pages=Math.ceil(list.length/PAGE)||1;
  if(admEmailPage>=pages)admEmailPage=Math.max(0,pages-1);
  const page=list.slice(admEmailPage*PAGE,(admEmailPage+1)*PAGE);

  const totalSent=emailCampaigns.reduce((s,c)=>s+c.stats.sent,0);
  const avgOpen=emailCampaigns.length?Math.round(emailCampaigns.reduce((s,c)=>s+(c.stats.opened/c.stats.sent*100),0)/emailCampaigns.length):0;
  const avgClick=emailCampaigns.length?Math.round(emailCampaigns.reduce((s,c)=>s+(c.stats.clicked/c.stats.sent*100),0)/emailCampaigns.length):0;

  const rows=page.map(c=>{
    const openRate=c.stats.sent>0?Math.round(c.stats.opened/c.stats.sent*100):0;
    const clickRate=c.stats.sent>0?Math.round(c.stats.clicked/c.stats.sent*100):0;
    const bounceRate=c.stats.sent>0?Math.round(c.stats.bounced/c.stats.sent*100):0;
    const unsubRate=c.stats.sent>0?Math.round(c.stats.unsubscribed/c.stats.sent*100):0;
    return `<tr>
      <td style="max-width:260px">
        <div style="font-weight:600;color:var(--ink-deep);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px" title="${escHtml(c.subject)}">${escHtml(c.subject)}</div>
        <div style="font-size:12px;color:var(--text-soft);margin-top:2px">${c.sentAt} · ${escHtml(c.sentBy||'Admin')}</div>
      </td>
      <td><span style="font-size:12.5px;background:var(--paper);padding:2px 8px;border-radius:4px">${EMAIL_TARGET_GROUPS[c.targetGroup]||c.targetGroup}</span></td>
      <td style="text-align:right">${c.stats.sent.toLocaleString('vi-VN')}</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:600;color:${openRate>=40?'#27ae60':openRate>=25?'#e67e22':'#e74c3c'}">${openRate}%</span>
          <div style="flex:1;background:#eee;border-radius:4px;height:6px;min-width:60px"><div style="background:${openRate>=40?'#27ae60':openRate>=25?'#e67e22':'#e74c3c'};border-radius:4px;height:6px;width:${openRate}%"></div></div>
        </div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-weight:600;color:${clickRate>=20?'#27ae60':clickRate>=10?'#e67e22':'#e74c3c'}">${clickRate}%</span>
          <div style="flex:1;background:#eee;border-radius:4px;height:6px;min-width:40px"><div style="background:${clickRate>=20?'#27ae60':clickRate>=10?'#e67e22':'#e74c3c'};border-radius:4px;height:6px;width:${clickRate}%"></div></div>
        </div>
      </td>
      <td style="text-align:center;font-size:13px;color:${bounceRate>3?'#e74c3c':'#27ae60'}">${bounceRate}%</td>
      <td style="text-align:center;font-size:13px;color:${unsubRate>1?'#e74c3c':'#888'}">${unsubRate}%</td>
      <td>
        <button class="adm-btn-sm" onclick="doViewEmailDetail('${c.id}')">Xem</button>
      </td>
    </tr>`;
  }).join('');

  const pageLinks=pages>1?`<div style="display:flex;gap:6px;justify-content:flex-end;margin-top:12px">${Array.from({length:pages},(_,i)=>`<button class="adm-btn-sm${i===admEmailPage?' active':''}" onclick="admEmailPage=${i};renderAccount()">${i+1}</button>`).join('')}</div>`:'';

  return `
    <div class="adm-kpi-row" style="margin-bottom:18px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${emailCampaigns.length}</div><div class="adm-kpi-lbl">Chiến dịch đã gửi</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${fmtBig(totalSent)}</div><div class="adm-kpi-lbl">Tổng email đã gửi</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${avgOpen}%</div><div class="adm-kpi-lbl">Tỷ lệ mở TB</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${avgClick}%</div><div class="adm-kpi-lbl">Tỷ lệ click TB</div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px;flex-wrap:wrap">
      <input class="cms-input" placeholder="Tìm theo tiêu đề email..." value="${escHtml(admEmailSearch)}" oninput="admEmailSearch=this.value;admEmailPage=0;renderAccount()" style="width:280px">
      <button class="adm-btn" onclick="admNotifTab='compose';renderAccount()">+ Tạo chiến dịch mới</button>
    </div>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>Tiêu đề / Thời gian</th><th>Nhóm nhận</th><th style="text-align:right">Đã gửi</th><th>Tỷ lệ mở</th><th>Tỷ lệ click</th><th>Bounce</th><th>Hủy đăng ký</th><th></th></tr></thead>
        <tbody>${rows||'<tr><td colspan="8" style="text-align:center;color:#888;padding:24px">Chưa có chiến dịch nào</td></tr>'}</tbody>
      </table>
    </div>${pageLinks}`;
}

function doViewEmailDetail(id){
  const c=emailCampaigns.find(x=>x.id===id);if(!c)return;
  const openRate=c.stats.sent>0?Math.round(c.stats.opened/c.stats.sent*100):0;
  const clickRate=c.stats.sent>0?Math.round(c.stats.clicked/c.stats.sent*100):0;
  const win=window.open('','_blank','width=700,height=700,scrollbars=yes');
  if(!win)return;
  win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escHtml(c.subject)}</title>
  <style>body{font-family:Georgia,serif;max-width:680px;margin:24px auto;color:#222;line-height:1.7;}
  .stat{display:inline-block;background:#f7f2ea;border-radius:8px;padding:12px 18px;margin:6px 6px 6px 0;text-align:center;}
  .stat-val{font-size:22px;font-weight:700;color:#c8362a;}.stat-lbl{font-size:12px;color:#888;}
  .email-body{padding:20px 24px;background:#fffdf9;border:1px solid #eee;border-radius:8px;margin-top:16px;}</style></head>
  <body>
    <h2 style="margin-bottom:4px">${escHtml(c.subject)}</h2>
    <p style="color:#888;font-size:13px">Gửi lúc ${c.sentAt} · ${EMAIL_TARGET_GROUPS[c.targetGroup]} · ${c.stats.sent.toLocaleString('vi-VN')} người</p>
    <div>
      <div class="stat"><div class="stat-val">${c.stats.opened.toLocaleString('vi-VN')}</div><div class="stat-lbl">Đã mở (${openRate}%)</div></div>
      <div class="stat"><div class="stat-val">${c.stats.clicked.toLocaleString('vi-VN')}</div><div class="stat-lbl">Click (${clickRate}%)</div></div>
      <div class="stat"><div class="stat-val">${c.stats.bounced}</div><div class="stat-lbl">Bounce</div></div>
      <div class="stat"><div class="stat-val">${c.stats.unsubscribed}</div><div class="stat-lbl">Hủy ĐK</div></div>
    </div>
    <div class="email-body">${c.content}</div>
  </body></html>`);
  win.document.close();
}

/* ---------- NEWSLETTER ---------- */
function adminNotifNewsletter(){
  const search=admSubsSearch.toLowerCase();
  let list=newsletterSubs.filter(s=>{
    if(search&&!s.email.toLowerCase().includes(search)&&!s.name.toLowerCase().includes(search))return false;
    if(admSubsStatusFilter!=='all'&&s.status!==admSubsStatusFilter)return false;
    if(admSubsSourceFilter!=='all'&&s.source!==admSubsSourceFilter)return false;
    return true;
  });
  const total=list.length;
  const PAGE=10,pages=Math.ceil(total/PAGE)||1;
  if(admSubsPage>=pages)admSubsPage=Math.max(0,pages-1);
  const page=list.slice(admSubsPage*PAGE,(admSubsPage+1)*PAGE);

  const activeCount=newsletterSubs.filter(s=>s.status==='active').length;
  const unsubCount=newsletterSubs.filter(s=>s.status==='unsubscribed').length;
  const sourceCount={register:0,checkout:0,manual:0};
  newsletterSubs.forEach(s=>{sourceCount[s.source]=(sourceCount[s.source]||0)+1;});

  const rows=page.map(s=>`<tr>
    <td>
      <div style="font-weight:600;color:var(--ink-deep)">${escHtml(s.name)}</div>
      <div style="font-size:12.5px;color:var(--text-soft)">${escHtml(s.email)}</div>
    </td>
    <td style="font-size:12.5px">${s.subscribedAt}</td>
    <td><span style="font-size:12px;background:var(--paper);padding:2px 8px;border-radius:4px;color:var(--text-soft)">${EMAIL_SOURCE_LBL[s.source]||s.source}</span></td>
    <td><span style="font-size:12.5px;font-weight:600;color:${s.status==='active'?'#27ae60':'#e74c3c'}">${s.status==='active'?'✅ Đang đăng ký':'❌ Đã hủy'}</span></td>
    <td>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        ${s.status==='active'?`<button class="adm-btn-sm" style="background:#e67e22;color:#fff" onclick="doUnsubscribeNL('${s.id}')">Hủy đăng ký</button>`:`<button class="adm-btn-sm" style="background:#27ae60;color:#fff" onclick="doResubscribeNL('${s.id}')">Đăng ký lại</button>`}
        <button class="adm-btn-sm danger" onclick="doDeleteSub('${s.id}')">Xóa</button>
      </div>
    </td>
  </tr>`).join('');

  const pageLinks=pages>1?`<div style="display:flex;gap:6px;justify-content:flex-end;margin-top:12px">${Array.from({length:pages},(_,i)=>`<button class="adm-btn-sm${i===admSubsPage?' active':''}" onclick="admSubsPage=${i};renderAccount()">${i+1}</button>`).join('')}</div>`:'';

  return `
    <div class="adm-kpi-row" style="margin-bottom:18px">
      <div class="adm-kpi-card"><div class="adm-kpi-val">${newsletterSubs.length}</div><div class="adm-kpi-lbl">Tổng subscriber</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val" style="color:#27ae60">${activeCount}</div><div class="adm-kpi-lbl">Đang đăng ký</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val" style="color:#e74c3c">${unsubCount}</div><div class="adm-kpi-lbl">Đã hủy đăng ký</div></div>
      <div class="adm-kpi-card"><div class="adm-kpi-val">${activeCount>0?Math.round(activeCount/newsletterSubs.length*100):0}%</div><div class="adm-kpi-lbl">Tỷ lệ duy trì</div></div>
    </div>
    <div class="notif-sub-source-bar" style="margin-bottom:16px">
      <div style="font-size:13px;color:var(--text-soft);margin-bottom:8px">Nguồn subscriber:</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${Object.entries(EMAIL_SOURCE_LBL).map(([k,lbl])=>`<div style="display:flex;align-items:center;gap:6px;background:var(--paper);border-radius:8px;padding:7px 12px;font-size:13px"><span style="font-weight:600;color:var(--ink-deep)">${sourceCount[k]||0}</span><span style="color:var(--text-soft)">${lbl}</span></div>`).join('')}
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <input class="cms-input" placeholder="Tìm theo email hoặc tên..." value="${escHtml(admSubsSearch)}" oninput="admSubsSearch=this.value;admSubsPage=0;renderAccount()" style="width:220px">
      <select class="cms-input" onchange="admSubsStatusFilter=this.value;admSubsPage=0;renderAccount()">
        <option value="all"${admSubsStatusFilter==='all'?' selected':''}>Tất cả trạng thái</option>
        <option value="active"${admSubsStatusFilter==='active'?' selected':''}>Đang đăng ký</option>
        <option value="unsubscribed"${admSubsStatusFilter==='unsubscribed'?' selected':''}>Đã hủy</option>
      </select>
      <select class="cms-input" onchange="admSubsSourceFilter=this.value;admSubsPage=0;renderAccount()">
        <option value="all"${admSubsSourceFilter==='all'?' selected':''}>Tất cả nguồn</option>
        ${Object.entries(EMAIL_SOURCE_LBL).map(([k,lbl])=>`<option value="${k}"${admSubsSourceFilter===k?' selected':''}>${lbl}</option>`).join('')}
      </select>
      <div style="margin-left:auto;color:var(--text-soft);font-size:13.5px;align-self:center">${total} kết quả</div>
    </div>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>Tên / Email</th><th>Ngày đăng ký</th><th>Nguồn</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="5" style="text-align:center;color:#888;padding:24px">Không tìm thấy subscriber nào</td></tr>'}</tbody>
      </table>
    </div>${pageLinks}`;
}

function doUnsubscribeNL(id){
  const s=newsletterSubs.find(x=>x.id===id);if(!s)return;
  if(!confirm('Hủy đăng ký newsletter của '+s.name+' ('+s.email+')?'))return;
  s.status='unsubscribed';
  saveNewsletterSubs();renderAccount();toast('Đã hủy đăng ký: '+s.email);
}

function doResubscribeNL(id){
  const s=newsletterSubs.find(x=>x.id===id);if(!s)return;
  s.status='active';
  saveNewsletterSubs();renderAccount();toast('Đã khôi phục đăng ký: '+s.email);
}

function doDeleteSub(id){
  const s=newsletterSubs.find(x=>x.id===id);if(!s)return;
  if(!confirm('Xóa vĩnh viễn subscriber '+s.email+' khỏi danh sách?\nHành động không thể hoàn tác.'))return;
  newsletterSubs=newsletterSubs.filter(x=>x.id!==id);
  saveNewsletterSubs();renderAccount();toast('Đã xóa subscriber: '+s.email);
}

function navForRole(r){
  if(r==='admin'){
    const adminTabs=[
      ['dashboard','Tổng quan','<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'],
      ['adm-users','Người dùng','<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
      ['adm-products','Sản phẩm','<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'],
      ['adm-orders','Đơn hàng','<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'],
      ['adm-finance','Tài chính','<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'],
      ['adm-cms','Nội dung','<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'],
      ['adm-promo','Khuyến mãi','<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'],
      ['adm-notif','Thông báo','<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'],
      ['adm-settings','Cài đặt','<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'],
      ['adm-shops','Shop / NCC','<path d="M3 9l1-5h16l1 5"/><path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10"/>']
    ];
    return adminTabs;
  }
  if(r==='seller'){
    const myApp=user?sellerApps.find(a=>a.email===user.email):null;
    const isApproved=myApp&&myApp.status==='approved';
    const nav=isApproved
      ?[['seller-dashboard','Tổng quan'],['seller-notif','Thông báo'],['seller-orders','Đơn hàng'],['seller-warehouse','Kho hàng'],['seller-revenue','Doanh thu'],['seller-analytics','Phân tích'],['seller-reviews','Đánh giá'],['seller-products','Sách giấy'],['seller-ebooks','Ebook'],['seller-vpp','VPP'],['seller-tbgd','Thiết bị'],['seller-shop','Thông tin shop'],['seller-payment','Thanh toán'],['profile','Hồ sơ cá nhân']]
      :[['seller-reg',myApp?'Hồ sơ đăng ký':'Đăng ký bán hàng'],['seller-payment','Thông tin thanh toán'],['profile','Hồ sơ cá nhân']];
    return nav;
  }
  const nav=[['dashboard','Tổng quan'],['orders','Đơn hàng của tôi'],['returns','Đổi / Trả hàng']];
  /* Người mua — sub-types */
  if(r==='hocsinh')nav.push(['study','Học tập & Gợi ý sách']);
  if(r==='sinhvien')nav.push(['study','Tài liệu học phần'],['verify','Xác thực sinh viên']);
  if(r==='parent')nav.push(['children','Theo dõi học tập của con']);
  /* Trường học / Tổ chức */
  if(r==='school')nav.push(['rfq','Yêu cầu báo giá'],['classlist','Danh sách lớp']);
  /* Xác thực giáo viên — Người mua (không áp dụng Trường học) */
  if(user&&r!=='school'&&(user.teacherVerified||r==='hocsinh'||r==='sinhvien'||r==='parent'))
    nav.push(['teacher','Xác thực giáo viên']);
  nav.push(['profile','Hồ sơ cá nhân'],['address','Sổ địa chỉ'],['points','Điểm thưởng']);
  return nav;
}
function renderAccount(){
  if(!user){renderLogin();return;}
  const nav=navForRole(user.role);
  const isAdmin=user.role==='admin';
  const navBtnHtml=nav.map(n=>'<button class="'+(acctTab===n[0]?'on':'')+'" onclick="acctTab=\''+n[0]+'\';profileTab=\'info\';twoFAStep=null;pfEditMode=false;emailChangeStep=null;emailChangePending=\'\';renderAccount()">'
    +(isAdmin&&n[2]?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">'+n[2]+'</svg><span>'+n[1]+'</span>':n[1])
    +'</button>').join('');
  const logoutBtn='<button class="danger" onclick="logout()">'
    +(isAdmin?'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>Đăng xuất</span>':'Đăng xuất')
    +'</button>';
  document.getElementById('app').innerHTML=
  '<div class="acct'+(isAdmin?' adm-layout':'')+'"><aside class="acct-side'+(isAdmin?' adm-side':'')+'"><div class="acct-user"><div class="av">'+user.name.charAt(0).toUpperCase()+'</div><div><div class="nm">'+user.name+'</div><div class="rl">'+ROLELBL[user.role]+'</div></div></div>'+
    '<div class="acct-nav">'+navBtnHtml+logoutBtn+'</div></aside>'+
    '<div class="'+(isAdmin?'adm-content':'')+'">'+acctContent()+'</div></div>';
}

/* ---------------- Checkout ---------------- */
let coShip='std', coPay='momo';
function renderCheckout(){
  const ids=Object.keys(cart); if(!ids.length){go('cart');return;}
  const sub=cartSubtotal();
  const allDigital=ids.length>0 && ids.every(id=>{const pr=P.find(x=>x.id==id);return pr&&(pr.ebook||pr.audio);});
  const baseShip=allDigital?0:(sub>300000?0:25000);
  const ship=allDigital?0:baseShip+(coShip==='fast'?20000:0);
  const disc=Math.round(sub*voucherPct/100);
  const total=sub-disc+ship;
  const shipOpts=allDigital
    ?[['std','Giao hàng số — gửi ngay vào Tủ sách','Miễn phí']]
    :[['std','Giao tiêu chuẩn (2–4 ngày)',baseShip===0?'Miễn phí':fmt(baseShip)],['fast','Giao nhanh (1–2 ngày)',fmt(baseShip+20000)]];
  const pays=[['momo','Ví MoMo',''],['zalopay','ZaloPay',''],['vnpay','VNPay',''],['cod','Thanh toán khi nhận hàng (COD)','Phổ biến'],['atm','Thẻ ATM / Visa / Mastercard','']];
  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'cart\')">Giỏ hàng</a> › <b>Thanh toán</b></div>'+
  '<h1 class="page-title">Thanh toán</h1>'+
  '<div class="checkout-grid"><div>'+
    '<div class="step-card"><h3><span class="n">1</span>Địa chỉ nhận hàng</h3>'+
      '<div class="form-row"><div class="form-field"><label>Họ tên</label><input value="'+(user?user.name:'')+'"></div><div class="form-field"><label>Số điện thoại</label><input value="'+(user?user.phone:'')+'" placeholder="09xx xxx xxx"></div></div>'+
      '<div class="form-field"><label>Địa chỉ</label><input placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"></div></div>'+
    '<div class="step-card"><h3><span class="n">2</span>Phương thức vận chuyển</h3>'+
      shipOpts.map(o=>'<label class="pay-opt '+(coShip===o[0]?'on':'')+'"><input type="radio" name="ship" '+(coShip===o[0]?'checked':'')+' onchange="coShip=\''+o[0]+'\';renderCheckout()">'+o[1]+'<span class="tag">'+o[2]+'</span></label>').join('')+'</div>'+
    '<div class="step-card"><h3><span class="n">3</span>Phương thức thanh toán</h3>'+
      pays.map(o=>'<label class="pay-opt '+(coPay===o[0]?'on':'')+'"><input type="radio" name="pay" '+(coPay===o[0]?'checked':'')+' onchange="coPay=\''+o[0]+'\';renderCheckout()">'+o[1]+(o[2]?'<span class="tag">'+o[2]+'</span>':'')+'</label>').join('')+
      '<p style="font-size:12px;color:var(--text-soft);margin:10px 0 0">Bạn sẽ được chuyển tới cổng thanh toán an toàn để hoàn tất. EduMart không lưu thông tin thẻ của bạn.</p></div>'+
  '</div>'+
  '<div class="summary"><h3>Đơn hàng</h3>'+
    ids.map(id=>{const p=P.find(x=>x.id==id);return '<div class="sum-row"><span>'+p.name+' ×'+cart[id]+'</span><span>'+fmt(p.price*cart[id])+'</span></div>';}).join('')+
    '<div class="sum-row"><span>Tạm tính</span><span>'+fmt(sub)+'</span></div>'+
    (disc>0?'<div class="sum-row"><span>Giảm giá ('+voucherPct+'%)</span><span style="color:#1a7a4a">-'+fmt(disc)+'</span></div>':'')+
    '<div class="sum-row"><span>Vận chuyển</span><span>'+(ship===0?'Miễn phí':fmt(ship))+'</span></div>'+
    '<div class="sum-row total"><span>Tổng cộng</span><b>'+fmt(total)+'</b></div>'+
    '<button class="checkout" onclick="placeOrder('+total+')">Đặt hàng</button></div></div>';
}
function placeOrder(total){
  const id=String(Math.floor(Math.random()*90000)+10000);
  const items=Object.entries(cart).map(([k,q])=>({id:Number(k),qty:q}));
  const d=new Date(), date=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
  orders.unshift({id,items,total,date,status:'Chờ xác nhận',stage:0,placed:date,stageDates:[date]});
  saveOrders();
  const ebooksIn=items.filter(it=>{const pr=P.find(x=>x.id===it.id);return pr&&(pr.ebook||pr.audio);});
  ebooksIn.forEach(it=>grantEbook(it.id));
  cart={};voucherPct=0;saveCart();updateCartCount();
  const earnedPts=user?Math.floor(total/1000):0;
  if(user){user.points=(user.points||0)+earnedPts;saveUser();if(earnedPts>0){pointsLog.unshift({pts:earnedPts,date,desc:'Đơn #'+id,type:'earn'});savePointsLog();}}
  addNotif('Đơn hàng #'+id+' đã được đặt thành công, tổng '+fmt(total)+'.');
  if(ebooksIn.length)addNotif(ebooksIn.length+' sản phẩm số (ebook/sách nói) đã vào Tủ sách của bạn.');
  window._lastOrder={id,total,ebook:ebooksIn.length>0,pts:earnedPts};
  go('orderdone');
}
function renderOrderDone(){
  const o=window._lastOrder||{id:'00000',total:0,pts:0};
  document.getElementById('app').innerHTML=
  '<div class="done"><div class="check"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 13 4 4L19 7"/></svg></div>'+
    '<h1>Đặt hàng thành công!</h1><p>Cảm ơn bạn đã mua sắm tại EduMart.</p>'+
    '<p>Mã đơn hàng của bạn</p><div class="ocode">#'+o.id+'</div>'+
    '<p style="margin-top:10px">Tổng thanh toán: <b style="color:var(--coral)">'+fmt(o.total)+'</b></p>'+
    (o.pts>0?'<div class="pts-earned">⭐ +'+o.pts+' điểm thưởng đã được cộng vào tài khoản!</div>':'')+
    (o.ebook?'<p style="margin-top:10px;color:#1a7a4a;font-weight:500">📖 Ebook đã sẵn sàng trong Tủ sách của bạn!</p>':'')+
    '<div class="acts">'+(o.ebook?'<button class="btn-ghost" onclick="go(\'library\')">Vào Tủ sách</button>':'<button class="btn-ghost" onclick="goOrders()">Xem đơn hàng</button>')+'<button class="btn-primary" onclick="go(\'home\')">Tiếp tục mua sắm</button></div></div>';
}

/* ---------------- Shared helpers for new modules ---------------- */
function val(id){const e=document.getElementById(id);return e?e.value.trim():'';}
function todayStr(){const d=new Date();return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();}
function loginPrompt(action){
  document.getElementById('app').innerHTML='<div class="empty"><svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg><div style="font-size:17px;margin:8px 0 12px">Vui lòng đăng nhập để '+action+'.</div><a class="hero-cta" style="display:inline-flex" onclick="go(\'account\')">Đăng nhập / Đăng ký</a></div>';
}

/* ---------------- Wishlist page ---------------- */
function renderWishlist(){
  const items=wishlist.map(id=>P.find(p=>p.id===id)).filter(Boolean);
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Yêu thích</b></div>'+
   '<h1 class="page-title">Danh sách yêu thích'+(items.length?' ('+items.length+')':'')+'</h1>'+
   (items.length?'<div class="grid">'+items.map(pcard).join('')+'</div>'
    :'<div class="empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg><div style="font-size:17px;margin-bottom:6px">Chưa có sản phẩm yêu thích</div><a class="hero-cta" style="display:inline-flex" onclick="go(\'home\')">Khám phá sản phẩm</a></div>');
}

/* ---------------- Order tracking ---------------- */
function orderStage(o){return typeof o.stage==='number'?o.stage:(o.status==='Hoàn thành'?4:o.status==='Đang giao'?3:1);}
function advanceOrder(id){
  const o=orders.find(x=>x.id===id); if(!o)return;
  let s=orderStage(o);
  if(s<4){
    s++;o.stage=s;o.status=['Chờ xác nhận','Đang xử lý','Đang đóng gói','Đang giao','Đã giao'][s];
    if(!o.stageDates)o.stageDates=[o.placed||o.date];
    o.stageDates[s]=todayStr();
    saveOrders();addNotif('Đơn #'+id+' cập nhật: '+o.status);renderOrderDetail();
  }
}
function reorder(id){const o=orders.find(x=>x.id===id);if(!o)return;o.items.forEach(it=>{cart[it.id]=(cart[it.id]||0)+it.qty;});saveCart();updateCartCount();toast('Đã thêm lại sản phẩm vào giỏ');go('cart');}
function renderOrderDetail(){
  const o=orders.find(x=>x.id===arg);
  if(!o){go('account');return;}
  const STAGES=['Đã đặt hàng','Đang xử lý','Đang đóng gói','Đang giao','Đã giao'];
  const cur=orderStage(o);
  const sd=o.stageDates||[o.placed||o.date];
  const steps=STAGES.map((s,i)=>{
    const done=i<=cur, active=i===cur;
    return '<div class="tl-step'+(done?' done':'')+(active?' cur':'')+'">'+
      '<span class="dot"></span>'+
      '<div class="tl-info"><div class="lbl">'+s+'</div>'+(sd[i]?'<div class="tl-date">'+sd[i]+'</div>':'')+'</div>'+
    '</div>';
  }).join('');
  const items=o.items.map(it=>{const p=P.find(x=>x.id==it.id);return '<div class="oi"><div class="cover-sm">'+cover(p)+'</div><div style="flex:1">'+p.name+' × '+it.qty+'</div><div style="font-weight:600">'+fmt(p.price*it.qty)+'</div></div>';}).join('');
  const retReq=returns.find(r=>r.orderId===o.id);
  let returnSection='';
  if(cur===4){
    if(retReq){
      returnSection='<div class="panel" style="margin-top:16px"><h3>Yêu cầu đổi / trả</h3>'+
        '<div style="background:#fdf5e0;border:1.5px solid #e8d08a;border-radius:10px;padding:14px">'+
        '<div style="font-weight:600;color:#8a5a00">⏳ Đã gửi yêu cầu ngày '+retReq.date+'</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:6px">Lý do: '+retReq.reason+'</div>'+
        '<div style="font-size:13px;color:var(--text-soft)">Chi tiết: '+retReq.detail+'</div>'+
        '<div style="font-size:13px;margin-top:8px">Trạng thái: <b>'+retReq.status+'</b> — CSKH phản hồi trong 24h.</div></div></div>';
    } else {
      returnSection='<div class="panel" style="margin-top:16px"><h3>Yêu cầu đổi / trả</h3>'+
        '<p style="font-size:13.5px;color:var(--text-soft);margin:0 0 14px">Bạn có thể gửi yêu cầu đổi/trả trong vòng 7 ngày kể từ khi nhận hàng.</p>'+
        '<div class="form-field"><label>Lý do</label><select id="retReason">'+
          '<option>Sản phẩm bị lỗi / hư hỏng</option>'+
          '<option>Sai sản phẩm so với đơn đặt</option>'+
          '<option>Sản phẩm không như mô tả</option>'+
          '<option>Tôi đặt nhầm</option>'+
        '</select></div>'+
        '<div class="form-field"><label>Mô tả chi tiết</label><textarea id="retDetail" rows="3" placeholder="Mô tả tình trạng sản phẩm, vấn đề gặp phải..."></textarea></div>'+
        '<button class="btn-primary" onclick="submitReturn(\''+o.id+'\')">Gửi yêu cầu đổi / trả</button></div>';
    }
  }
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <a onclick="go(\'account\')">Tài khoản</a> › <b>Đơn #'+o.id+'</b></div>'+
   '<h1 class="page-title">Theo dõi đơn hàng #'+o.id+'</h1>'+
   '<div class="cart"><div>'+
     '<div class="panel"><h3>Trạng thái vận chuyển</h3>'+
       '<div class="timeline">'+steps+'</div>'+
       (cur<4?'<button class="btn-ghost" style="margin-top:16px" onclick="advanceOrder(\''+o.id+'\')">▶ Mô phỏng cập nhật trạng thái tiếp theo</button>':'<p style="color:#1a7a4a;font-weight:500;margin-top:16px">✔ Đơn hàng đã giao thành công.</p>')+
     '</div>'+
     '<div class="panel" style="margin-top:16px"><h3>Sản phẩm trong đơn</h3>'+items+'</div>'+
     returnSection+
   '</div>'+
   '<div class="summary"><h3>Thông tin đơn</h3>'+
     '<div class="sum-row"><span>Ngày đặt</span><span>'+(o.placed||o.date)+'</span></div>'+
     '<div class="sum-row"><span>Trạng thái</span><span>'+o.status+'</span></div>'+
     '<div class="sum-row"><span>Số sản phẩm</span><span>'+o.items.reduce((a,b)=>a+b.qty,0)+'</span></div>'+
     '<div class="sum-row total"><span>Tổng tiền</span><b>'+fmt(o.total)+'</b></div>'+
     (o.total>0?'<div class="sum-row"><span>Điểm tích lũy</span><span style="color:#1a7a4a">+'+Math.floor(o.total/1000)+' điểm</span></div>':'')+
     '<button class="checkout" onclick="reorder(\''+o.id+'\')">Mua lại đơn này</button>'+
   '</div></div>';
}
function submitReturn(orderId){
  const reason=document.getElementById('retReason')?.value||'Sản phẩm bị lỗi / hư hỏng';
  const detail=val('retDetail');
  if(!detail){toast('Vui lòng mô tả chi tiết vấn đề');return;}
  returns.unshift({id:'RET'+String(Math.floor(Math.random()*9000)+1000),orderId,reason,detail,date:todayStr(),status:'Đang xử lý'});
  saveReturns();
  addNotif('Yêu cầu đổi/trả đơn #'+orderId+' đã gửi — CSKH phản hồi trong 24h.');
  toast('Đã gửi yêu cầu đổi/trả thành công');
  renderOrderDetail();
}

/* ---------------- Notifications ---------------- */
function renderNotifications(){
  notifs.forEach(n=>n.read=true); saveNotifs();
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Thông báo</b></div>'+
   '<h1 class="page-title">Thông báo</h1>'+
   (notifs.length?'<div class="panel" style="padding:4px 18px">'+notifs.map(n=>'<div class="notif-row"><div class="ic">🔔</div><div><div>'+n.t+'</div><div class="tm">'+n.time+'</div></div></div>').join('')+'</div>':'<div class="empty">Chưa có thông báo nào.</div>');
}

/* ---------------- B2B: RFQ + class list ---------------- */
function renderRFQ(){
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Trường học · Mua sỉ</b></div>'+
   '<div class="b2b-hero"><p class="eyebrow">EduMart for Schools</p><h1>Mua sỉ &amp; Yêu cầu báo giá cho trường học</h1><p class="lead">Đặt số lượng lớn, nhận chiết khấu theo bậc, xuất hóa đơn VAT và biên bản giao nhận. Gửi yêu cầu, đội ngũ B2B phản hồi trong 24 giờ.</p><div class="b2b-perks"><span>✔ Chiết khấu theo số lượng</span><span>✔ Công nợ theo kỳ</span><span>✔ Hóa đơn VAT &amp; hợp đồng</span><span>✔ Giao theo lịch năm học</span></div></div>'+
   '<div class="checkout-grid"><div>'+
     '<div class="step-card"><h3><span class="n">1</span>Thông tin tổ chức</h3>'+
       '<div class="form-row"><div class="form-field"><label>Tên trường / tổ chức</label><input id="rqOrg" placeholder="VD: THCS Lê Quý Đôn"></div><div class="form-field"><label>Người phụ trách</label><input id="rqName" placeholder="Họ và tên"></div></div>'+
       '<div class="form-row"><div class="form-field"><label>Số điện thoại</label><input id="rqPhone" placeholder="09xx xxx xxx"></div><div class="form-field"><label>Email nhận báo giá</label><input id="rqEmail" placeholder="truong@edu.vn"></div></div></div>'+
     '<div class="step-card"><h3><span class="n">2</span>Danh sách cần báo giá</h3>'+
       '<div class="form-field"><label>Sản phẩm &amp; số lượng</label><textarea id="rqItems" rows="5" placeholder="VD:&#10;- Bộ SGK lớp 6 Kết nối tri thức × 120&#10;- Vở Campus 200 trang × 300 lốc"></textarea></div>'+
       '<div class="form-field"><label>Ghi chú</label><textarea id="rqNote" rows="2" placeholder="Cần nhận trước 15/08, xuất hóa đơn VAT…"></textarea></div></div>'+
   '</div>'+
   '<div class="summary"><h3>Bậc chiết khấu</h3><p style="font-size:13px;color:var(--text-soft);margin:0 0 12px">Yêu cầu miễn phí, không ràng buộc.</p>'+
     '<div class="bracket"><div class="br"><span>Từ 50 sản phẩm</span><b>-5%</b></div><div class="br"><span>Từ 200 sản phẩm</span><b>-10%</b></div><div class="br"><span>Từ 500 sản phẩm</span><b>-15%</b></div></div>'+
     '<button class="checkout" onclick="submitRFQ()">Gửi yêu cầu báo giá</button>'+
     '<button class="btn-ghost" style="width:100%;margin-top:10px" onclick="go(\'classlist\')">Mua theo danh sách lớp ›</button>'+
   '</div></div>';
}
function submitRFQ(){
  const org=val('rqOrg'),items=val('rqItems'),phone=val('rqPhone');
  if(!org||!phone||!items){toast('Nhập tên tổ chức, SĐT và danh sách sản phẩm nhé');return;}
  const id='RFQ'+(Math.floor(Math.random()*9000)+1000);
  rfqs.unshift({id,org,name:val('rqName'),phone,email:val('rqEmail'),items,note:val('rqNote'),date:todayStr(),status:'Chờ báo giá'});
  LS.set('rfqs',rfqs); addNotif('Yêu cầu báo giá '+id+' đã gửi, phản hồi trong 24h.');
  window.scrollTo(0,0);
  document.getElementById('app').innerHTML='<div class="done"><div class="check"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 13 4 4L19 7"/></svg></div><h1>Đã gửi yêu cầu báo giá!</h1><p>Mã yêu cầu của bạn</p><div class="ocode">#'+id+'</div><p style="margin-top:10px">Đội ngũ B2B sẽ liên hệ <b>'+org+'</b> trong vòng 24 giờ.</p><div class="acts"><button class="btn-ghost" onclick="go(\'home\')">Về trang chủ</button><button class="btn-primary" onclick="'+(user?'acctTab=\'rfq\';go(\'account\')':'go(\'classlist\')')+'">'+(user?'Xem yêu cầu của tôi':'Xem danh sách lớp')+'</button></div></div>';
}
let clsSel='Lớp 6';
function renderClassList(){
  const CLS={'Lớp 1':[2,9,10,8],'Lớp 6':[1,7,8,3],'Lớp 12':[6,11,12,5]};
  const ids=CLS[clsSel]||[];
  const rows=ids.map(id=>{const p=P.find(x=>x.id===id);return '<div class="cart-item"><div class="cover-sm">'+cover(p)+'</div><div class="ci-info"><div class="nm">'+p.name+'</div><div class="pr">'+fmt(p.price)+'</div></div><button class="add" style="width:auto;padding:8px 14px;flex:none" onclick="addToCart('+id+')">Thêm</button></div>';}).join('');
  const total=ids.reduce((s,id)=>s+P.find(x=>x.id===id).price,0);
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <a onclick="go(\'rfq\')">Mua sỉ</a> › <b>Danh sách theo lớp</b></div>'+
   '<h1 class="page-title">Danh sách đồ dùng học tập theo lớp</h1>'+
   '<p style="color:var(--text-soft);margin:0 0 16px">Chọn lớp để xem danh sách chuẩn nhà trường gợi ý — thêm cả bộ chỉ với một chạm.</p>'+
   '<div class="chiprow">'+Object.keys(CLS).map(c=>'<button class="fchip2 '+(clsSel===c?'on':'')+'" onclick="clsSel=\''+c+'\';renderClassList()">'+c+'</button>').join('')+'</div>'+
   '<div class="cart" style="margin-top:14px"><div>'+rows+'</div><div class="summary"><h3>Trọn bộ '+clsSel+'</h3><div class="sum-row"><span>'+ids.length+' sản phẩm</span><span>'+fmt(total)+'</span></div><div class="sum-row total"><span>Tạm tính</span><b>'+fmt(total)+'</b></div><button class="checkout" onclick="addAllClass(['+ids.join(',')+'])">Thêm cả bộ vào giỏ</button></div></div>';
}
function addAllClass(ids){ids.forEach(id=>{cart[id]=(cart[id]||0)+1;});saveCart();updateCartCount();toast('Đã thêm cả bộ vào giỏ');go('cart');}

/* ---------------- Promotions hub ---------------- */
function renderPromoHub(){
  const cards=[['🎡','Vòng quay may mắn','Quay mỗi ngày nhận voucher, điểm thưởng và quà.','wheel'],['✅','Nhiệm vụ &amp; điểm danh','Điểm danh mỗi ngày, làm nhiệm vụ để tích điểm.','missions'],['🤝','Giới thiệu bạn bè','Mời bạn, cả hai cùng nhận ưu đãi.','referral']];
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Ưu đãi</b></div>'+
   '<h1 class="page-title">Trung tâm ưu đãi</h1>'+
   '<div class="promo-hub">'+cards.map(c=>'<div class="ph-card" onclick="go(\''+c[3]+'\')"><div class="emo">'+c[0]+'</div><h3>'+c[1]+'</h3><p>'+c[2]+'</p><span class="coll-link">Tham gia ›</span></div>').join('')+'</div>'+
   '<div class="section-head"><h2>Mã giảm giá đang có</h2></div>'+
   '<div class="vouchers">'+[['EDU10','Giảm 10% cho mọi đơn hàng'],['GIAOVIEN','Ưu đãi giáo viên giảm 15%'],['FREESHIP','Miễn phí vận chuyển đơn từ 200k']].map(v=>'<div class="vch"><div class="vch-l"><div class="vcode">'+v[0]+'</div><div class="vd">'+v[1]+'</div></div><button class="act-copy" onclick="copyCode(\''+v[0]+'\')">Lưu mã</button></div>').join('')+'</div>';
}
function copyCode(c){toast('Đã lưu mã '+c+' — áp dụng ở bước thanh toán');}

/* Lucky wheel */
const WHEEL_PRIZES=['+50 điểm','Voucher 10k','+20 điểm','Freeship','Voucher 30k','May mắn lần sau'];
function renderWheel(){
  const can=LS.get('lastSpin',null)!==todayStr();
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'promo\')">Ưu đãi</a> › <b>Vòng quay</b></div>'+
   '<div class="wheel-wrap"><h1 class="page-title" style="text-align:center">🎡 Vòng quay may mắn</h1>'+
   '<div class="wheel"><div class="wheel-pin"></div></div>'+
   '<div id="wheelResult" class="wheel-res"></div>'+
   '<button class="checkout" id="spinBtn" style="max-width:240px" '+(can?'':'disabled')+' onclick="spinWheel()">'+(can?'Quay ngay (miễn phí)':'Mai quay tiếp nhé!')+'</button>'+
   '<p style="color:var(--text-soft);font-size:13px;margin-top:10px">Mỗi ngày quay 1 lần miễn phí.</p></div>';
}
function spinWheel(){
  if(LS.get('lastSpin',null)===todayStr()){toast('Hôm nay bạn đã quay rồi');return;}
  const prize=WHEEL_PRIZES[Math.floor(Math.random()*WHEEL_PRIZES.length)];
  LS.set('lastSpin',todayStr());
  const w=document.querySelector('.wheel'); if(w){w.classList.add('spin');}
  const btn=document.getElementById('spinBtn'); if(btn){btn.setAttribute('disabled','');btn.textContent='Mai quay tiếp nhé!';}
  setTimeout(()=>{
    const r=document.getElementById('wheelResult'); if(r)r.innerHTML='🎉 Bạn nhận được: <b>'+prize+'</b>';
    if(user&&prize.indexOf('điểm')>=0){user.points=(user.points||0)+parseInt(prize.replace(/\D/g,''))||0;saveUser();}
    addNotif('Vòng quay may mắn: bạn nhận "'+prize+'".');
    toast('Kết quả: '+prize);
  },1100);
}

/* Missions & check-in */
function renderMissions(){
  if(!user){loginPrompt('điểm danh và nhận điểm');return;}
  const today=todayStr(); const checked=user.checkin===today;
  const tasks=[['📅 Điểm danh hôm nay','+5 điểm',checked],['👀 Xem ít nhất 3 sản phẩm','+10 điểm',recentIds.length>=3],['❤️ Thêm 1 sản phẩm yêu thích','+5 điểm',wishlist.length>=1],['🛒 Hoàn tất 1 đơn hàng','+50 điểm',orders.length>=1]];
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'promo\')">Ưu đãi</a> › <b>Nhiệm vụ</b></div>'+
   '<h1 class="page-title">Nhiệm vụ &amp; Điểm danh</h1>'+
   '<div class="cart"><div>'+
     '<div class="panel"><h3>Điểm danh hằng ngày</h3><p style="color:var(--text-soft);font-size:13.5px;margin:0 0 12px">Chuỗi điểm danh: <b>'+(user.streak||0)+'</b> ngày liên tiếp.</p>'+
       '<button class="'+(checked?'btn-ghost':'btn-primary')+'" '+(checked?'disabled':'')+' onclick="checkin()">'+(checked?'Đã điểm danh hôm nay ✔':'Điểm danh nhận +5 điểm')+'</button></div>'+
     '<div class="panel" style="margin-top:16px"><h3>Nhiệm vụ hằng ngày</h3>'+tasks.map(t=>'<div class="mission"><div class="mi-ic '+(t[2]?'done':'')+'">'+(t[2]?'✔':'')+'</div><div style="flex:1">'+t[0]+'</div><span class="mi-rw">'+t[1]+'</span></div>').join('')+'</div>'+
   '</div>'+
   '<div class="summary"><h3>Điểm của bạn</h3><div class="stat-box" style="text-align:center"><div class="v">'+(user.points||0)+'</div><div class="l">điểm tích lũy</div></div><button class="checkout" onclick="go(\'wheel\')">Dùng điểm quay thưởng</button></div></div>';
}
function checkin(){
  if(!user)return; const today=todayStr(); if(user.checkin===today){toast('Bạn đã điểm danh hôm nay');return;}
  user.streak=(user.streak||0)+1; user.checkin=today; user.points=(user.points||0)+5; saveUser();
  addNotif('Điểm danh thành công +5 điểm. Chuỗi '+user.streak+' ngày!');
  toast('Điểm danh +5 điểm'); renderMissions();
}

/* Referral */
function renderReferral(){
  if(!user){loginPrompt('lấy mã giới thiệu của bạn');return;}
  const code=user.ref||refCode(user.name);
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'promo\')">Ưu đãi</a> › <b>Giới thiệu bạn bè</b></div>'+
   '<h1 class="page-title">Giới thiệu bạn — cả hai cùng lợi</h1>'+
   '<div class="ref-card"><p class="rl">Mã giới thiệu của bạn</p><div class="ref-code">'+code+'</div><button class="btn-primary" onclick="copyCode(\''+code+'\')">Sao chép mã</button>'+
   '<div class="ref-steps"><div><b>1</b> Gửi mã cho bạn bè</div><div><b>2</b> Bạn mới nhập mã khi đăng ký</div><div><b>3</b> Mỗi người nhận voucher 20k</div></div></div>';
}

/* ---------------- Ebook: CTA, reader, library ---------------- */
function rentPrice(p,days){const f=days<=7?0.3:0.5;return Math.round(p.price*f/1000)*1000;}
function doRent(id,days){rentEbook(id,days);const p=P.find(x=>x.id===Number(id));addNotif('Đã thuê "'+p.name+'" '+days+' ngày — hết hạn sẽ tự thu hồi.');toast('Thuê thành công — bắt đầu ngay!');p.audio?openPlayer(id):openReader(id,false);}
function rentBox(p){
  return '<div class="rent-box"><div class="rb-h">Hoặc thuê '+(p.audio?'nghe':'đọc')+' tiết kiệm</div><div class="rent-opts">'+
    '<button onclick="doRent('+p.id+',7)"><b>Thuê 7 ngày</b><span>'+fmt(rentPrice(p,7))+'</span></button>'+
    '<button onclick="doRent('+p.id+',30)"><b>Thuê 30 ngày</b><span>'+fmt(rentPrice(p,30))+'</span></button>'+
  '</div></div>';
}
function ebookCTA(p){
  const owned=isOwned(p.id), rented=rentalActive(p.id), access=owned||rented;
  const chapters=ebookChapters(p);
  const readMins=Math.round((p.pages||200)/250*60);
  const readTime=readMins>=60?Math.floor(readMins/60)+'h '+String(readMins%60).padStart(2,'0')+'min':readMins+' phút';
  let h='<div class="eb-specs">'+
    '<div class="ebs"><span class="k">Định dạng</span><b>'+(p.format||'PDF · EPUB')+'</b></div>'+
    '<div class="ebs"><span class="k">Số trang</span><b>'+(p.pages||'—')+'</b></div>'+
    '<div class="ebs"><span class="k">Dung lượng</span><b>'+(p.size||'—')+' MB</b></div>'+
    '<div class="ebs"><span class="k">Thời gian đọc</span><b>~'+readTime+'</b></div>'+
  '</div>';
  h+='<div class="toc-preview"><div class="toc-h">Nội dung sách <span class="free-tag">Chương 1 miễn phí</span></div>'+
    '<ol class="toc-list">'+chapters.map((c,i)=>'<li class="'+(i===0?'toc-free':'')+'">'+c.t+
      (i===0?'':(!access?' <span class="toc-lock">🔒</span>':''))+'</li>').join('')+'</ol></div>';
  if(access){
    h+='<div class="pdp-cta"><button class="buy-btn" onclick="openReader('+p.id+',true)">📖 Đọc ngay</button>'+(rented&&!owned?'<button class="cart-btn" onclick="addToCart('+p.id+');go(\'cart\')">Mua đứt</button>':'')+'</div>';
    h+=owned?'<div class="eb-owned">✔ Bạn sở hữu vĩnh viễn — có trong <a onclick="go(\'library\')">Tủ sách</a>.</div>':'<div class="eb-owned">⏳ Đang thuê · còn '+rentDaysLeft(p.id)+' ngày — <a onclick="go(\'library\')">Tủ sách</a>.</div>';
  }else{
    h+='<div class="pdp-cta"><button class="cart-btn" onclick="openReader('+p.id+',false)">📖 Đọc thử Chương 1</button><button class="buy-btn" onclick="addToCart('+p.id+');go(\'cart\')">Mua &amp; đọc ngay</button></div>'+rentBox(p);
  }
  return h+'<div class="perks"><span>📱 Đọc trên mọi thiết bị</span><span>⚡ Nhận ngay sau thanh toán</span><span>♾ Sở hữu vĩnh viễn</span><span>🔖 Ghi chú &amp; đánh dấu trang</span></div>';
}
function audioCTA(p){
  const owned=isOwned(p.id), rented=rentalActive(p.id), access=owned||rented;
  const dh=Math.floor(p.duration/60), dm=p.duration%60;
  const durLabel=dh>0?dh+'h '+String(dm).padStart(2,'0')+'min':dm+'min';
  let h='<div class="eb-specs">'+
    '<div class="ebs"><span class="k">Thời lượng</span><b>'+durLabel+'</b></div>'+
    '<div class="ebs"><span class="k">Người đọc</span><b>'+p.narrator+'</b></div>'+
    '<div class="ebs"><span class="k">Định dạng</span><b>'+p.format+'</b></div>'+
    '<div class="ebs"><span class="k">Bản thử</span><b>2 phút miễn phí</b></div>'+
  '</div>';
  if(p.tracks){
    h+='<div class="toc-preview"><div class="toc-h">Danh sách chương <span class="free-tag">Nghe thử 2 phút</span></div>'+
      '<ol class="toc-list">'+p.tracks.map((tr,i)=>'<li class="'+(i===0?'toc-free':'')+'">'+tr.t+
        ' <span style="color:var(--text-soft);font-size:12px">'+Math.floor(tr.d/60)+'\''+String(tr.d%60).padStart(2,'0')+'"</span>'+
        (i>0&&!access?' <span class="toc-lock">🔒</span>':'')+'</li>').join('')+'</ol></div>';
  }
  if(access){
    h+='<div class="pdp-cta"><button class="buy-btn" onclick="openPlayer('+p.id+')">🎧 Nghe ngay</button>'+(rented&&!owned?'<button class="cart-btn" onclick="addToCart('+p.id+');go(\'cart\')">Mua đứt</button>':'')+'</div>';
    h+=owned?'<div class="eb-owned">✔ Bạn sở hữu vĩnh viễn — có trong <a onclick="go(\'library\')">Tủ sách</a>.</div>':'<div class="eb-owned">⏳ Đang thuê · còn '+rentDaysLeft(p.id)+' ngày.</div>';
  }else{
    h+='<div class="pdp-cta"><button class="cart-btn" onclick="openPlayer('+p.id+')">🎧 Nghe thử 2 phút</button><button class="buy-btn" onclick="addToCart('+p.id+');go(\'cart\')">Mua &amp; nghe ngay</button></div>'+rentBox(p);
  }
  return h+'<div class="perks"><span>🎧 Nghe mọi lúc mọi nơi</span><span>⏩ Tua nhanh · chỉnh tốc độ</span><span>⚡ Nhận ngay sau thanh toán</span><span>🔖 Lưu vị trí nghe</span></div>';
}
let readerCh=0;
function openReader(id,resume){readerCh=resume?(readProgress()[id]||0):0;go('reader',id);}
function renderReader(){
  const p=P.find(x=>x.id==arg);
  if(!p||!p.ebook){go('home');return;}
  const access=hasAccess(p.id), owned=isOwned(p.id), rented=rentalActive(p.id);
  const chapters=ebookChapters(p);
  const maxCh=access?chapters.length:1;
  if(readerCh>=maxCh)readerCh=maxCh-1; if(readerCh<0)readerCh=0;
  setReadProgress(p.id,readerCh);
  const ch=chapters[readerCh];
  const theme=LS.get('readerTheme','light'), font=LS.get('readerFont',18);
  const pct=Math.round((readerCh+1)/chapters.length*100);
  const opts=chapters.map((c,i)=>'<option value="'+i+'"'+(i===readerCh?' selected':'')+(i>=maxCh?' disabled':'')+'>'+(isBookmarked(p.id,i)?'🔖 ':'')+c.t+(i>=maxCh?' 🔒':'')+'</option>').join('');
  const atSampleEnd=!access&&readerCh>=maxCh-1;
  const isLastCh=access&&readerCh===chapters.length-1;
  const bm=(bookmarks[p.id]||[]).slice().sort((a,b)=>a-b), notes=notesStore[p.id]||[];
  document.getElementById('app').innerHTML=
   '<div class="reader theme-'+theme+'">'+
     '<div class="reader-bar">'+
       '<button class="rb" onclick="go(\'product\','+p.id+')">‹ Thoát</button>'+
       '<div class="rb-title">'+p.name+(access?'':' · <span style="color:var(--coral)">Đọc thử</span>')+'</div>'+
       '<div class="rb-tools">'+
         '<select onchange="readerCh=+this.value;renderReader()">'+opts+'</select>'+
         '<button class="rb'+(isBookmarked(p.id,readerCh)?' on':'')+'" title="Đánh dấu chương" onclick="toggleBookmark('+p.id+')">🔖</button>'+
         '<button class="rb" title="Thu nhỏ chữ" onclick="readerFont(-1)">A−</button>'+
         '<button class="rb" title="Phóng to chữ" onclick="readerFont(1)">A+</button>'+
         '<button class="rb" title="Đổi nền" onclick="readerTheme()">🌓</button>'+
       '</div>'+
     '</div>'+
     '<div class="reader-progbar"><div class="rpb-fill" style="width:'+pct+'%"></div><span class="rpb-label">'+pct+'%</span></div>'+
     (rented&&!owned?'<div class="rent-banner">⏳ Đang thuê — còn '+rentDaysLeft(p.id)+' ngày. <a onclick="addToCart('+p.id+');go(\'cart\')">Mua đứt để giữ vĩnh viễn ›</a></div>':'')+
     '<div class="reader-page" style="font-size:'+font+'px">'+
       '<div class="chapter-meta"><span class="ch-num">Chương '+(readerCh+1)+' / '+chapters.length+'</span></div>'+
       '<h2 class="ch-title">'+ch.t+'</h2>'+ch.body+
       (atSampleEnd?'<div class="paywall"><div class="pw-ic">🔒</div><h3>Hết phần đọc thử</h3><p>Mua hoặc thuê để mở khóa toàn bộ '+chapters.length+' chương ('+p.pages+' trang).</p><div class="pw-acts"><button class="checkout" onclick="addToCart('+p.id+');go(\'cart\')">Mua '+fmt(p.price)+'</button><button class="btn-ghost" onclick="doRent('+p.id+',7)">Thuê 7 ngày · '+fmt(rentPrice(p,7))+'</button></div></div>':'')+
       (isLastCh?'<div class="finish-card">🎉 <b>Bạn đã đọc xong!</b> Hãy để lại đánh giá để giúp độc giả tiếp theo.<br><button class="btn-primary" style="margin-top:12px" onclick="go(\'product\','+p.id+')">Viết nhận xét ›</button></div>':'')+
     '</div>'+
     '<div class="reader-nav">'+
       '<button class="btn-ghost" '+(readerCh<=0?'disabled':'')+' onclick="readerCh--;renderReader();window.scrollTo(0,0)">‹ Chương trước</button>'+
       '<span class="nav-pos">'+(readerCh+1)+' / '+chapters.length+'</span>'+
       '<button class="btn-primary" '+(readerCh>=maxCh-1?'disabled':'')+' onclick="readerCh++;renderReader();window.scrollTo(0,0)">Chương sau ›</button>'+
     '</div>'+
     '<div class="reader-extra">'+
       (bm.length?'<div class="rx-block"><h4>🔖 Đánh dấu trang</h4><div class="bm-chips">'+bm.map(i=>'<button class="bm-chip" onclick="readerCh='+i+';renderReader();window.scrollTo(0,0)">'+chapters[i].t+'</button>').join('')+'</div></div>':'')+
       '<div class="rx-block"><h4>📝 Ghi chú của bạn</h4>'+
         '<div class="note-form"><textarea id="noteInput" placeholder="Ghi chú cho chương này…"></textarea><button class="btn-primary" onclick="addReaderNote('+p.id+')">Thêm ghi chú</button></div>'+
         (notes.length?'<div class="note-list">'+notes.map((n,idx)=>'<div class="note-item"><div class="ni-ch">'+chapters[n.ch].t+(n.ts?'<span class="ni-ts">'+n.ts+'</span>':'')+'</div><div class="ni-tx">'+n.text+'</div><button class="ni-del" onclick="delReaderNote('+p.id+','+idx+')">✕</button></div>').join('')+'</div>':'<p class="note-empty">Chưa có ghi chú nào.</p>')+
       '</div>'+
     '</div>'+
   '</div>';
}
function readerFont(d){let f=(LS.get('readerFont',18))+d*2;f=Math.max(14,Math.min(26,f));LS.set('readerFont',f);renderReader();}
function readerTheme(){const seq=['light','sepia','dark'];const t=LS.get('readerTheme','light');LS.set('readerTheme',seq[(seq.indexOf(t)+1)%3]);renderReader();}
/* ---- Audiobook player (mô phỏng phát) ---- */
const AUDIO_PREVIEW=120;                          // giây nghe thử khi chưa sở hữu
let audioId=null,audioCur=0,audioPlaying=false,audioSpeed=1,audioTimer=null;
function audioLimit(p){return hasAccess(p.id)?p.duration*60:AUDIO_PREVIEW;}
function openPlayer(id){
  audioId=Number(id); const p=P.find(x=>x.id===audioId);
  audioCur=Math.min(audioPos()[audioId]||0,audioLimit(p)-1); if(audioCur<0)audioCur=0;
  audioPlaying=false; audioSpeed=1; go('player',id);
}
function renderPlayer(){
  const p=P.find(x=>x.id==arg); if(!p||!p.audio){go('home');return;} audioId=p.id;
  const access=hasAccess(p.id),lim=audioLimit(p),total=p.duration*60;
  const tracks=p.tracks||[];
  // Chapter tick marks on seek bar
  let tickHtml='',tc=0;
  tracks.forEach((tr,i)=>{if(i>0){tickHtml+='<div class="pl-tick" style="left:'+(tc/total*100)+'%"></div>';}tc+=tr.d;});
  // Track list with data attributes for active highlighting
  let trackListHtml='', tc2=0;
  if(tracks.length){
    const rows=tracks.map((tr,i)=>{
      const s=tc2; tc2+=tr.d;
      const canPlay=access||(i===0);
      const isActive=audioCur>=s&&audioCur<tc2;
      return '<div class="pl-track'+(isActive?' active':'')+'" data-start="'+s+'" data-end="'+tc2+'" onclick="'+
        (canPlay?'audioCur='+s+';setAudioPos('+p.id+','+s+');updateAudioUI();if(!audioPlaying)toggleAudio()':'addToCart('+p.id+');go(\'cart\')')+'">'+'<span class="pt-num">'+(i+1)+'</span>'+
        '<span class="pt-title">'+tr.t+'</span>'+
        '<span class="pt-dur">'+Math.floor(tr.d/60)+'\''+String(tr.d%60).padStart(2,'0')+'"</span>'+
        (!canPlay?'<span class="pt-lock">🔒</span>':'')+
      '</div>';
    }).join('');
    trackListHtml='<div class="pl-tracks"><div class="pt-hd">Danh sách chương</div>'+rows+'</div>';
  }
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <a onclick="go(\'product\','+p.id+')">'+p.name+'</a> › <b>Trình nghe</b></div>'+
   '<div class="player">'+
     '<div class="pl-cover">'+cover(p)+'</div>'+
     '<div class="pl-main">'+
       '<div class="pl-title">'+p.name+(access?'':' · <span style="color:var(--coral)">Nghe thử</span>')+'</div>'+
       '<div class="pl-by">Người đọc: <b>'+p.narrator+'</b></div>'+
       '<div class="pl-seek" id="plSeek" onclick="seekAudio(event)"><div class="pl-fill" id="apFill"></div>'+tickHtml+(access?'':'<div class="pl-limit" style="left:'+(lim/total*100)+'%"></div>')+'</div>'+
       '<div class="pl-time"><span id="apCur">'+fmtTime(audioCur)+'</span><span id="apRem" style="color:var(--text-soft)">−'+fmtTime(total-audioCur)+'</span></div>'+
       '<div class="pl-ctrls"><button onclick="skipAudio(-15)" title="Tua lùi 15s">⏪15</button><button class="pl-play" id="apPlay" onclick="toggleAudio()">▶</button><button onclick="skipAudio(15)" title="Tua tiếp 15s">15⏩</button><button class="pl-speed" id="apSpeed" onclick="cycleSpeed()">1×</button></div>'+
       (access?'':'<div class="pl-paywall">Bản nghe thử giới hạn '+fmtTime(lim)+'. <a onclick="addToCart('+p.id+');go(\'cart\')">Mua nghe trọn bộ ›</a></div>')+
     '</div>'+
   '</div>'+
   trackListHtml;
  updateAudioUI();
}
function updateAudioUI(){
  const p=P.find(x=>x.id===audioId); if(!p)return; const total=p.duration*60;
  const f=document.getElementById('apFill'); if(f)f.style.width=(audioCur/total*100)+'%';
  const c=document.getElementById('apCur'); if(c)c.textContent=fmtTime(audioCur);
  const rem=document.getElementById('apRem'); if(rem)rem.textContent='−'+fmtTime(Math.max(0,total-audioCur));
  const pl=document.getElementById('apPlay'); if(pl)pl.textContent=audioPlaying?'❚❚':'▶';
  const sp=document.getElementById('apSpeed'); if(sp)sp.textContent=audioSpeed+'×';
  document.querySelectorAll('.pl-track[data-start]').forEach(el=>{
    el.classList.toggle('active',audioCur>=+el.dataset.start&&audioCur<+el.dataset.end);
  });
}
function toggleAudio(){audioPlaying=!audioPlaying;clearInterval(audioTimer);if(audioPlaying)audioTimer=setInterval(audioTick,1000);updateAudioUI();}
function audioTick(){
  const p=P.find(x=>x.id===audioId); if(!p){clearInterval(audioTimer);return;}
  const lim=audioLimit(p); audioCur+=audioSpeed;
  if(audioCur>=lim){audioCur=lim;audioPlaying=false;clearInterval(audioTimer);setAudioPos(audioId,Math.floor(audioCur));updateAudioUI();if(!hasAccess(p.id))toast('Hết phần nghe thử — mua để nghe tiếp');return;}
  setAudioPos(audioId,Math.floor(audioCur)); updateAudioUI();
}
function skipAudio(d){const p=P.find(x=>x.id===audioId);if(!p)return;audioCur=Math.max(0,Math.min(audioLimit(p),audioCur+d));setAudioPos(audioId,Math.floor(audioCur));updateAudioUI();}
function seekAudio(e){const p=P.find(x=>x.id===audioId);if(!p)return;const r=document.getElementById('plSeek').getBoundingClientRect();const pct=(e.clientX-r.left)/r.width;audioCur=Math.max(0,Math.min(audioLimit(p),pct*p.duration*60));setAudioPos(audioId,Math.floor(audioCur));updateAudioUI();}
function cycleSpeed(){const seq=[1,1.25,1.5,2];audioSpeed=seq[(seq.indexOf(audioSpeed)+1)%seq.length];updateAudioUI();}

/* ---- Cửa hàng Thiết bị giáo dục ---- */
const TBGD_SUBS={
  mtinh:{lbl:'Máy tính',icon:'🔢',desc:'Máy tính khoa học, đồ thị từ Casio và các hãng uy tín'},
  tn:{lbl:'Thí nghiệm',icon:'🔬',desc:'Kính hiển vi, bộ hóa học, mô hình sinh học & vật lý'},
  bando:{lbl:'Bản đồ & Địa cầu',icon:'🌍',desc:'Bản đồ treo tường, địa cầu và atlas các loại'},
  dayho:{lbl:'Dạy học',icon:'📋',desc:'Bảng trắng, đèn học, thẻ học và dụng cụ hỗ trợ giảng dạy'},
  cntt:{lbl:'Công nghệ',icon:'💻',desc:'Máy chiếu, camera tài liệu, máy đọc sách và màn chiếu'},
};
function renderTBGDStore(){
  const allTb=P.filter(p=>p.cat==='tbgd');
  const bestsellers=allTb.slice().sort((a,b)=>b.sold-a.sold).slice(0,4);
  const hotItems=allTb.filter(p=>p.tag==='hot');
  const newItems=allTb.filter(p=>p.tag==='new');
  const byAud={
    k12:allTb.filter(p=>p.aud&&p.aud.some(a=>['tieuhoc','thcs','thpt'].includes(a))),
    sv:allTb.filter(p=>p.aud&&p.aud.includes('sinhvien')),
    gv:allTb.filter(p=>p.aud&&(p.aud.includes('giaovien')||p.aud.includes('school'))),
  };
  function tCard(p){
    return '<div class="vpp-card" onclick="go(\'product\','+p.id+')">'+
      '<div class="vpp-card-cov">'+cover(p)+
        (p.tag?'<span class="eb-tag '+p.tag+'">'+(p.tag==='hot'?'🔥 Hot':'✨ Mới')+'</span>':'')+
        (p.old>p.price?'<span class="vpp-disc">-'+discount(p)+'%</span>':'')+
      '</div>'+
      '<div class="vpp-card-body">'+
        '<div class="vpp-card-nm">'+p.name+'</div>'+
        '<div class="vpp-card-by">'+p.by+' · '+(TBGD_SUBS[p.sub]||{lbl:'Thiết bị'}).lbl+'</div>'+
        (p.rate?'<div class="vpp-card-stars">'+('★'.repeat(Math.round(p.rate)))+'<span> '+p.rate+' ('+p.sold+')</span></div>':'')+
        '<div class="vpp-card-price"><span class="vpp-p">'+fmt(p.price)+'</span>'+(p.old>p.price?'<span class="vpp-old">'+fmt(p.old)+'</span>':'')+'</div>'+
      '</div>'+
    '</div>';
  }
  document.getElementById('app').innerHTML=
    '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Thiết bị giáo dục</b></div>'+

    '<div class="tbgd-hero">'+
      '<div class="tbh-l">'+
        '<div class="tbh-eyebrow">🏫 Thiết bị giáo dục EduMart</div>'+
        '<h1 class="tbh-h">Thiết bị &amp;<br>Công nghệ lớp học</h1>'+
        '<p class="tbh-sub">'+allTb.length+' sản phẩm · Máy tính, kính hiển vi, máy chiếu và thiết bị dạy học hiện đại</p>'+
        '<div class="tbh-actions">'+
          '<button class="btn-primary" onclick="go(\'listing\',\'tbgd\')">Xem tất cả thiết bị</button>'+
          '<button class="btn-ghost tbh-ghost" onclick="go(\'rfq\')">📋 Báo giá trường học</button>'+
        '</div>'+
      '</div>'+
      '<div class="tbh-stats">'+
        Object.entries(TBGD_SUBS).map(([k,v])=>{const cnt=P.filter(p=>p.cat==='tbgd'&&p.sub===k).length;
          return '<div class="tbhs" onclick="tbgdSub=\''+k+'\';go(\'listing\',\'tbgd\')"><div class="tbhs-ic">'+v.icon+'</div><div class="tbhs-nm">'+v.lbl+'</div><div class="tbhs-cnt">'+cnt+' sp</div></div>';
        }).join('')+
      '</div>'+
    '</div>'+

    '<h2 class="vpp-sec-h">🔥 Bán chạy nhất</h2>'+
    '<div class="vpp-grid">'+bestsellers.map(tCard).join('')+'</div>'+

    (hotItems.length?'<h2 class="vpp-sec-h">⚡ Đang khuyến mãi</h2>'+
    '<div class="vpp-grid">'+hotItems.map(tCard).join('')+'</div>':'')+

    (newItems.length?'<h2 class="vpp-sec-h">✨ Hàng mới về</h2>'+
    '<div class="vpp-grid">'+newItems.map(tCard).join('')+'</div>':'')+

    '<h2 class="vpp-sec-h">💻 Công nghệ lớp học</h2>'+
    '<div class="vpp-grid">'+P.filter(p=>p.cat==='tbgd'&&p.sub==='cntt').map(tCard).join('')+'</div>'+

    '<div class="tbgd-aud-grid">'+
      '<div class="tbgd-aud-col">'+
        '<div class="tac-h">🏫 Học sinh K–12 <span>('+byAud.k12.length+' sp)</span></div>'+
        byAud.k12.slice(0,4).map(p=>'<div class="tac-item" onclick="go(\'product\','+p.id+')">'+
          '<div class="tac-cov">'+cover(p)+'</div>'+
          '<div class="tac-info"><div class="tac-nm">'+p.name+'</div><div class="tac-pr">'+fmt(p.price)+'</div></div>'+
        '</div>').join('')+
        '<button class="elc-more btn-ghost" onclick="tbgdSub=\'all\';go(\'listing\',\'tbgd\')">Xem tất cả ›</button>'+
      '</div>'+
      '<div class="tbgd-aud-col">'+
        '<div class="tac-h">🎓 Sinh viên &amp; Giáo viên <span>('+byAud.gv.length+' sp)</span></div>'+
        byAud.gv.slice(0,4).map(p=>'<div class="tac-item" onclick="go(\'product\','+p.id+')">'+
          '<div class="tac-cov">'+cover(p)+'</div>'+
          '<div class="tac-info"><div class="tac-nm">'+p.name+'</div><div class="tac-pr">'+fmt(p.price)+'</div></div>'+
        '</div>').join('')+
        '<button class="elc-more btn-ghost" onclick="tbgdSub=\'all\';go(\'listing\',\'tbgd\')">Xem tất cả ›</button>'+
      '</div>'+
    '</div>'+

    '<div class="vpp-cta-bar">'+
      '<div>'+
        '<div class="vcb-t">Mua thiết bị cho trường học?</div>'+
        '<div class="vcb-s">Báo giá trang bị phòng học, phòng thí nghiệm theo số lượng lớn</div>'+
      '</div>'+
      '<button class="btn-primary" onclick="go(\'rfq\')">Yêu cầu báo giá ngay</button>'+
    '</div>';
}

/* ---- Cửa hàng Văn phòng phẩm ---- */
const VPP_SUBS={
  but:{lbl:'Bút viết',icon:'🖊',desc:'Bút bi, bút gel, bút chì, bút dạ quang từ các thương hiệu uy tín'},
  vo:{lbl:'Vở & giấy',icon:'📓',desc:'Vở học sinh, sổ tay, giấy in và các loại giấy văn phòng'},
  dungcu:{lbl:'Dụng cụ',icon:'📐',desc:'Thước, compa, máy tính, kéo và các dụng cụ học tập'},
  hoapham:{lbl:'Họa phẩm',icon:'🎨',desc:'Màu vẽ, cọ, sổ vẽ và dụng cụ mỹ thuật sáng tạo'},
  balo:{lbl:'Túi & balo',icon:'🎒',desc:'Balo học sinh, túi đựng bút và phụ kiện đựng đồ'},
};
function renderVPPStore(){
  const allVpp=P.filter(p=>p.cat==='vpp');
  const bestsellers=allVpp.slice().sort((a,b)=>b.sold-a.sold).slice(0,4);
  const hotItems=allVpp.filter(p=>p.tag==='hot');
  const newItems=allVpp.filter(p=>p.tag==='new');
  function vCard(p){
    return '<div class="vpp-card" onclick="go(\'product\','+p.id+')">'+
      '<div class="vpp-card-cov">'+cover(p)+
        (p.tag?'<span class="eb-tag '+p.tag+'">'+(p.tag==='hot'?'🔥 Hot':'✨ Mới')+'</span>':'')+
        (p.old>p.price?'<span class="vpp-disc">-'+discount(p)+'%</span>':'')+
      '</div>'+
      '<div class="vpp-card-body">'+
        '<div class="vpp-card-nm">'+p.name+'</div>'+
        '<div class="vpp-card-by">'+p.by+' · '+(VPP_SUBS[p.sub]||{lbl:'VPP'}).lbl+'</div>'+
        (p.rate?'<div class="vpp-card-stars">'+('★'.repeat(Math.round(p.rate)))+'<span> '+p.rate+' ('+p.sold+')</span></div>':'')+
        '<div class="vpp-card-price"><span class="vpp-p">'+fmt(p.price)+'</span>'+(p.old>p.price?'<span class="vpp-old">'+fmt(p.old)+'</span>':'')+'</div>'+
      '</div>'+
    '</div>';
  }
  document.getElementById('app').innerHTML=
    '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Văn phòng phẩm</b></div>'+
    '<div class="vpp-hero">'+
      '<div class="vph-l">'+
        '<div class="vph-eyebrow">✏ Cửa hàng văn phòng phẩm EduMart</div>'+
        '<h1 class="vph-h">Văn phòng phẩm<br>&amp; Dụng cụ học tập</h1>'+
        '<p class="vph-sub">'+allVpp.length+' sản phẩm · Bút viết, vở, dụng cụ, họa phẩm và túi balo cho mọi cấp học</p>'+
        '<div class="vph-actions">'+
          '<button class="btn-primary" onclick="go(\'listing\',\'vpp\')">Xem tất cả sản phẩm</button>'+
          '<button class="btn-ghost" onclick="vppSub=\'hot\';go(\'listing\',\'vpp\')">🔥 Đang giảm giá</button>'+
        '</div>'+
      '</div>'+
      '<div class="vph-stats">'+
        Object.entries(VPP_SUBS).map(([k,v])=>{const cnt=P.filter(p=>p.cat==='vpp'&&p.sub===k).length;return '<div class="vphs" onclick="vppSub=\''+k+'\';go(\'listing\',\'vpp\')"><div class="vphs-ic">'+v.icon+'</div><div class="vphs-nm">'+v.lbl+'</div><div class="vphs-cnt">'+cnt+' sp</div></div>';}).join('')+
      '</div>'+
    '</div>'+

    '<h2 class="vpp-sec-h">🔥 Bán chạy nhất</h2>'+
    '<div class="vpp-grid">'+bestsellers.map(vCard).join('')+'</div>'+

    (hotItems.length?'<h2 class="vpp-sec-h">⚡ Đang khuyến mãi</h2>'+
    '<div class="vpp-grid">'+hotItems.map(vCard).join('')+'</div>':'')+

    (newItems.length?'<h2 class="vpp-sec-h">✨ Hàng mới về</h2>'+
    '<div class="vpp-grid">'+newItems.map(vCard).join('')+'</div>':'')+

    '<h2 class="vpp-sec-h">🎨 Họa phẩm & Sáng tạo</h2>'+
    '<div class="vpp-grid">'+P.filter(p=>p.cat==='vpp'&&p.sub==='hoapham').map(vCard).join('')+'</div>'+

    '<div class="vpp-cta-bar">'+
      '<div>'+
        '<div class="vcb-t">Mua sỉ cho trường học?</div>'+
        '<div class="vcb-s">Đặt đơn số lượng lớn và nhận báo giá ưu đãi đặc biệt</div>'+
      '</div>'+
      '<button class="btn-primary" onclick="go(\'rfq\')">Yêu cầu báo giá</button>'+
    '</div>';
}

/* ---- Cửa hàng Ebook & Sách nói ---- */
function renderEbookStore(){
  const allEb=P.filter(p=>p.ebook&&!p.audio);
  const allAu=P.filter(p=>p.audio);
  const featured=P.filter(p=>(p.ebook||p.audio)&&p.tag==='hot');
  const newest=P.filter(p=>(p.ebook||p.audio)&&p.tag==='new');
  const byAud={
    tieuhoc:P.filter(p=>p.ebook&&p.aud&&p.aud.includes('tieuhoc')),
    thcs:P.filter(p=>p.ebook&&p.aud&&p.aud.includes('thcs')),
    thpt:P.filter(p=>p.ebook&&p.aud&&p.aud.includes('thpt')),
    sinhvien:P.filter(p=>(p.ebook||p.audio)&&p.aud&&p.aud.includes('sinhvien')),
    giaovien:P.filter(p=>(p.ebook||p.audio)&&p.aud&&p.aud.includes('giaovien')),
  };
  const CATS=[
    ['📖 Ebook','all-ebook','listing','ebook',allEb.length+' cuốn'],
    ['🎧 Sách nói','all-audio','listing','audiobook',allAu.length+' cuốn'],
    ['🏫 Học sinh K–12','k12','listing','thcs',P.filter(p=>p.ebook&&(p.aud||[]).some(a=>['tieuhoc','thcs','thpt'].includes(a))).length+' cuốn'],
    ['🎓 Sinh viên','sv','listing','sinhvien',byAud.sinhvien.length+' cuốn'],
    ['👨‍🏫 Giáo viên','gv','listing','giaovien',byAud.giaovien.length+' cuốn'],
    ['💡 Kỹ năng','kn','listing','kynang',P.filter(p=>(p.ebook||p.audio)&&p.genre==='kynang').length+' cuốn'],
    ['🌍 Ngoại ngữ','nn','listing','ngoaingu',P.filter(p=>(p.ebook||p.audio)&&p.genre==='ngoaingu').length+' cuốn'],
  ];
  function ebCard(p){
    const acc=hasAccess(p.id);
    const rentPr=p.price?fmt(rentPrice(p,30)):null;
    return '<div class="eb-card" onclick="go(\'product\','+p.id+')">'+
      '<div class="eb-card-cover">'+cover(p)+(p.tag?'<span class="eb-tag '+p.tag+'">'+(p.tag==='hot'?'🔥 Hot':'✨ Mới')+'</span>':'')+
        (acc?'<span class="eb-tag owned">✓ Đã có</span>':'')+
      '</div>'+
      '<div class="eb-card-body">'+
        '<div class="eb-card-nm">'+p.name+'</div>'+
        '<div class="eb-card-by">'+p.by+'</div>'+
        (p.rate?'<div class="eb-card-stars">'+('★'.repeat(Math.round(p.rate||0)))+'<span>'+p.rate+'</span><span class="ec-rc">('+p.sold+')</span></div>':'')+
        '<div class="eb-card-price">'+
          '<span class="ep">'+fmt(p.price)+'</span>'+
          (rentPr&&!acc?'<span class="er">thuê '+rentPr+'/tháng</span>':'')+
        '</div>'+
      '</div>'+
    '</div>';
  }
  document.getElementById('app').innerHTML=
    '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Ebook & Sách nói</b></div>'+
    '<div class="eb-store-hero">'+
      '<div class="esh-l">'+
        '<div class="esh-eyebrow">📚 Tủ sách số EduMart</div>'+
        '<h1 class="esh-h">Ebook & Sách nói</h1>'+
        '<p class="esh-sub">'+( allEb.length+allAu.length)+' đầu sách số · Nhận ngay sau thanh toán · Đọc/Nghe trên mọi thiết bị</p>'+
        '<div class="esh-actions">'+
          '<button class="btn-primary" onclick="go(\'listing\',\'ebook\')">Xem tất cả ebook</button>'+
          '<button class="btn-ghost" onclick="go(\'library\')">📚 Tủ sách của tôi</button>'+
        '</div>'+
      '</div>'+
      '<div class="esh-stats">'+
        '<div class="esh-stat"><div class="esh-sv">'+allEb.length+'</div><div class="esh-sl">Ebook</div></div>'+
        '<div class="esh-stat"><div class="esh-sv">'+allAu.length+'</div><div class="esh-sl">Sách nói</div></div>'+
        '<div class="esh-stat"><div class="esh-sv">PDF·EPUB·MP3</div><div class="esh-sl">Định dạng</div></div>'+
        '<div class="esh-stat"><div class="esh-sv">∞</div><div class="esh-sl">Sở hữu vĩnh viễn</div></div>'+
      '</div>'+
    '</div>'+

    (featured.length?'<h2 class="eb-sec-h">🔥 Nổi bật tháng này</h2>'+
    '<div class="eb-grid">'+featured.map(ebCard).join('')+'</div>':'')+

    (newest.length?'<h2 class="eb-sec-h">✨ Mới nhất</h2>'+
    '<div class="eb-grid">'+newest.map(ebCard).join('')+'</div>':'')+

    '<h2 class="eb-sec-h">🎧 Sách nói nổi bật</h2>'+
    '<div class="eb-grid">'+allAu.slice(0,4).map(ebCard).join('')+'</div>'+

    '<h2 class="eb-sec-h">📖 Ebook theo cấp học</h2>'+
    '<div class="eb-level-grid">'+[
      ['🏫 Tiểu học',byAud.tieuhoc,'tieuhoc'],
      ['📘 THCS',byAud.thcs,'thcs'],
      ['📗 THPT',byAud.thpt,'thpt'],
      ['🎓 Sinh viên',byAud.sinhvien,'sinhvien'],
    ].map(([lbl,items,key])=>items.length?
      '<div class="eb-level-col"><div class="elc-h">'+lbl+'</div>'+items.slice(0,3).map(p=>'<div class="elc-item" onclick="go(\'product\','+p.id+')"><div class="elc-cov">'+cover(p)+'</div><div class="elc-info"><div class="elc-nm">'+p.name+'</div><div class="elc-pr">'+fmt(p.price)+'</div></div></div>').join('')+
      '<button class="elc-more btn-ghost" onclick="go(\'listing\',\''+key+'\')">Xem tất cả ›</button></div>'
      :''
    ).join('')+'</div>';
}

/* ---- Tủ sách (sở hữu + đang thuê, ebook + audiobook) ---- */
function renderLibrary(){
  const activeRent=Object.keys(rentals).map(Number).filter(id=>rentalActive(id));
  const allIds=[...new Set([...library,...activeRent])];
  const prog=readProgress(), apos=audioPos();
  const filterMap={
    all:  ()=>true,
    ebook: id=>{const p=P.find(x=>x.id===id);return p&&p.ebook&&!p.audio;},
    audio: id=>{const p=P.find(x=>x.id===id);return p&&!!p.audio;},
    rent:  id=>rentalActive(id),
  };
  const filteredIds=allIds.filter(filterMap[libFilter]||filterMap.all);
  const items=filteredIds.map(id=>P.find(p=>p.id===id)).filter(Boolean);
  const chips=[['all','Tất cả'],['ebook','Ebook'],['audio','Sách nói'],['rent','Đang thuê']];
  const chipHtml='<div class="filter-chips">'+chips.map(([k,l])=>'<button class="chip'+(libFilter===k?' active':'')+'" onclick="libFilter=\''+k+'\';renderLibrary()">'+l+'</button>').join('')+'</div>';
  const expiring=activeRent.filter(id=>{const d=rentDaysLeft(id);return d>=0&&d<=3;});
  const expiryBanner=expiring.length?'<div class="expiry-banner">⚠ '+expiring.length+' cuốn sách thuê sắp hết hạn (≤ 3 ngày) — <a onclick="go(\'listing\',\'ebook\')">Gia hạn hoặc mua ngay ›</a></div>':'';
  function libCard(p){
    const owned=isOwned(p.id), isRent=rentalActive(p.id);
    const badge=owned?'<span class="lib-badge own">Sở hữu</span>':isRent?'<span class="lib-badge rent">Thuê · còn '+rentDaysLeft(p.id)+' ngày</span>':'';
    let pct=0, progLabel='';
    if(p.audio){
      const pos=apos[p.id]||0, tot=p.duration*60;
      pct=tot>0?Math.round(pos/tot*100):0;
      progLabel='Đã nghe: '+fmtTime(pos)+' / '+fmtTime(tot);
    }else{
      const ch=prog[p.id]||0, tot=ebookChapters(p).length;
      pct=tot>0?Math.round((ch+1)/tot*100):0;
      progLabel='Chương '+(ch+1)+' / '+tot;
    }
    const barHtml='<div class="lib-bar"><div class="lib-bar-fill" style="width:'+pct+'%"></div></div><span class="lib-pct">'+pct+'%</span>';
    const btn=p.audio?'<button class="btn-primary" onclick="openPlayer('+p.id+')">Nghe tiếp</button>':'<button class="btn-primary" onclick="openReader('+p.id+',true)">Đọc tiếp</button>';
    return '<div class="lib-item">'+
      '<div class="cover-sm">'+cover(p)+'</div>'+
      '<div class="li-info">'+
        '<div class="nm">'+p.name+'</div>'+
        '<div class="au">'+p.by+'</div>'+
        '<div class="li-badge-row">'+badge+'</div>'+
        '<div class="li-prog-row">'+barHtml+'</div>'+
        '<div class="li-sub">'+progLabel+'</div>'+
      '</div>'+
      btn+
    '</div>';
  }
  // Reading stats
  const totalEbooks=allIds.filter(id=>{const p=P.find(x=>x.id===id);return p&&p.ebook&&!p.audio;}).length;
  const totalAudio=allIds.filter(id=>{const p=P.find(x=>x.id===id);return p&&!!p.audio;}).length;
  const totalListenMins=allIds.reduce((s,id)=>{const p=P.find(x=>x.id===id);return p&&p.audio?(s+(apos[id]||0)/60):s;},0);
  const totalChapters=allIds.reduce((s,id)=>{const p=P.find(x=>x.id===id);return p&&p.ebook&&!p.audio?(s+(prog[id]||0)):s;},0);
  const statsHtml='<div class="lib-stats">'+
    '<div class="ls-item"><div class="ls-v">'+totalEbooks+'</div><div class="ls-l">Ebook</div></div>'+
    '<div class="ls-item"><div class="ls-v">'+totalAudio+'</div><div class="ls-l">Sách nói</div></div>'+
    '<div class="ls-item"><div class="ls-v">'+totalChapters+'</div><div class="ls-l">Chương đã đọc</div></div>'+
    '<div class="ls-item"><div class="ls-v">'+Math.round(totalListenMins)+'<span class="ls-unit">ph</span></div><div class="ls-l">Đã nghe</div></div>'+
  '</div>';
  document.getElementById('app').innerHTML=
   '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Tủ sách của tôi</b></div>'+
   '<h1 class="page-title">Tủ sách của tôi'+(allIds.length?' ('+allIds.length+')':'')+'</h1>'+
   (allIds.length?statsHtml:'')+expiryBanner+chipHtml+
   (items.length?'<div class="lib-grid">'+items.map(libCard).join('')+'</div>'
    :'<div class="empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19V5a1 1 0 0 1 1-1h6v16H5a1 1 0 0 1-1-1Z"/><path d="M13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6"/></svg><div style="font-size:17px;margin-bottom:6px">'+(libFilter==='all'?'Tủ sách của bạn đang trống':'Không có mục nào trong bộ lọc này')+'</div><a class="hero-cta" style="display:inline-flex" onclick="go(\'listing\',\'ebook\')">Khám phá ebook &amp; sách nói</a></div>');
}

/* ---------------- Mega-menu (mục Sách) ---------------- */
function toggleNav(e,el){e.preventDefault();e.stopPropagation();const n=el.closest('.navitem');const open=n.classList.contains('open');closeNav();if(!open)n.classList.add('open');}
function closeNav(){document.querySelectorAll('.mainnav .navitem.open').forEach(x=>x.classList.remove('open'));}
document.addEventListener('click',e=>{
  if(!e.target.closest('.has-menu'))closeNav();
  if(!e.target.closest('.search-wrap'))searchClose();
});

/* ---------------- init ---------------- */
// Seed demo accounts (chỉ tạo nếu chưa tồn tại)
(function(){
  const SEEDS=[
    {id:'demo-admin',name:'Admin EduMart',     email:'admin@edumart.vn',  pw:'admin123',role:'admin',  adminLevel:'super'},
    {id:'demo-hs',   name:'Nguyễn Học Sinh',   email:'hocsinh@demo.vn',   pw:'demo123', role:'hocsinh'},
    {id:'demo-sv',   name:'Trần Sinh Viên',     email:'sinhvien@demo.vn',  pw:'demo123', role:'sinhvien'},
    {id:'demo-ph',   name:'Lê Phụ Huynh',       email:'phuhuynh@demo.vn',  pw:'demo123', role:'parent'},
    {id:'demo-th',   name:'Trường THPT Demo',   email:'truonghoc@demo.vn', pw:'demo123', role:'school'},
    {id:'demo-sl',   name:'Nguyễn Văn Long',    email:'minhlong.vpp@gmail.com', pw:'demo123', role:'seller'},
    {id:'demo-sl2',  name:'Trần Thị Huyền',     email:'edu.tech.htn@gmail.com', pw:'demo123', role:'seller'},
  ];
  const MOCKS=[
    {id:'mock-01',name:'Nguyễn Văn An',    email:'nva001@gmail.com',     pw:'mock123',role:'hocsinh', status:'active',  createdAt:'15/03/2025',points:240,ref:'EDU4812'},
    {id:'mock-02',name:'Trần Thị Bình',    email:'ttbinh@yahoo.com',     pw:'mock123',role:'sinhvien',status:'active',  createdAt:'22/03/2025',points:180,ref:'EDU3300'},
    {id:'mock-03',name:'Lê Hồng Phúc',     email:'lhphuc@gmail.com',     pw:'mock123',role:'parent',  status:'active',  createdAt:'01/04/2025',points:95, ref:'EDU7721'},
    {id:'mock-04',name:'Phạm Minh Tuấn',   email:'pmtuan@edu.vn',        pw:'mock123',role:'school',  status:'active',  createdAt:'10/04/2025',points:0,  ref:'EDU5544'},
    {id:'mock-05',name:'Hoàng Thị Mai',    email:'htmai@gmail.com',      pw:'mock123',role:'hocsinh', status:'locked',  createdAt:'18/04/2025',points:60, ref:'EDU9002',lockedReason:'Đăng sản phẩm giả mạo',lockedAt:'02/06/2025',lockHistory:1},
    {id:'mock-06',name:'Vũ Quốc Bảo',      email:'vqbao@gmail.com',      pw:'mock123',role:'sinhvien',status:'active',  createdAt:'25/04/2025',points:315,ref:'EDU2288'},
    {id:'mock-07',name:'Đặng Thu Hà',      email:'dtha@gmail.com',       pw:'mock123',role:'parent',  status:'active',  createdAt:'05/05/2025',points:120,ref:'EDU6601'},
    {id:'mock-08',name:'Ngô Văn Hải',      email:'nvhai@outlook.com',    pw:'mock123',role:'hocsinh', status:'active',  createdAt:'12/05/2025',points:200,ref:'EDU4400'},
    {id:'mock-09',name:'Bùi Thị Lan',      email:'btlan@gmail.com',      pw:'mock123',role:'sinhvien',status:'deleted', createdAt:'20/05/2025',points:0,  ref:'EDU8811',deletedAt:'01/06/2025'},
    {id:'mock-10',name:'Trương Quang Nam', email:'tqnam@gmail.com',      pw:'mock123',role:'school',  status:'active',  createdAt:'28/05/2025',points:0,  ref:'EDU1199'},
    {id:'mock-11',name:'Lý Thị Kim',       email:'ltkim@gmail.com',      pw:'mock123',role:'hocsinh', status:'active',  createdAt:'03/06/2025',points:145,ref:'EDU3377'},
    {id:'mock-12',name:'Đinh Văn Mạnh',    email:'dvmanh@edu.vn',        pw:'mock123',role:'parent',  status:'locked',  createdAt:'08/06/2025',points:0,  ref:'EDU5566',lockedReason:'Gian lận điểm thưởng',lockedAt:'10/06/2025',lockHistory:2},
    {id:'mock-13',name:'Cao Thị Nhung',    email:'ctnhung@gmail.com',    pw:'mock123',role:'sinhvien',status:'active',  createdAt:'11/06/2025',points:88, ref:'EDU7733'},
    {id:'mock-14',name:'Phan Văn Lợi',     email:'pvloi@gmail.com',      pw:'mock123',role:'hocsinh', status:'active',  createdAt:'14/06/2025',points:175,ref:'EDU2244'},
    {id:'mock-15',name:'Đỗ Minh Quân',     email:'dmquan@admin.edumart', pw:'mock123',role:'admin',   status:'active',  createdAt:'01/02/2025',points:0,  ref:'EDU9988',adminLevel:'content'},
    {id:'mock-16',name:'Vương Thị Hoa',    email:'vthoa@gmail.com',      pw:'mock123',role:'hocsinh', status:'active',  createdAt:'15/06/2025',points:55, ref:'EDU4466'},
    {id:'mock-17',name:'Trịnh Công Sơn',   email:'tcson@music.vn',       pw:'mock123',role:'parent',  status:'active',  createdAt:'16/06/2025',points:210,ref:'EDU3355'},
    {id:'mock-18',name:'Nguyễn Thu Trang', email:'nttrang@sinhvien.vn',  pw:'mock123',role:'sinhvien',status:'active',  createdAt:'17/06/2025',points:130,ref:'EDU8822'},
  ];
  let changed=false;
  SEEDS.forEach(s=>{
    if(!authUsers.find(u=>u.email===s.email)){
      authUsers.push({id:s.id,name:s.name,email:s.email,pwHash:hashPw(s.pw),role:s.role,
        adminLevel:s.adminLevel||undefined,
        points:s.role==='admin'?0:120,phone:'',ref:'EDUDEMO',checkin:null,streak:0,
        createdAt:'01/01/2025',status:'active'});
      changed=true;
    }
  });
  MOCKS.forEach(m=>{
    if(!authUsers.find(u=>u.email===m.email)){
      const {pw,...rest}=m;
      authUsers.push({...rest,pwHash:hashPw(pw),phone:'',checkin:null,streak:0});
      changed=true;
    }
  });
  if(changed)saveAuthUsers();
})();
updateCartCount(); updateWishCount(); updateNotifCount();

/* ══════════════════════════════════════════════════════════════
   PHÂN HỆ NGƯỜI BÁN / NCC — SELLER PORTAL
   Nhóm chức năng: Đăng ký & Xác minh Seller
══════════════════════════════════════════════════════════════ */

/* ── Constants ── */
const SELLER_CAT_OPTS=[
  {k:'sach',    lbl:'Sách'},
  {k:'vpp',     lbl:'Văn phòng phẩm'},
  {k:'tbgd',    lbl:'Thiết bị Giáo dục'},
  {k:'ebook',   lbl:'Ebook'},
  {k:'audiobook',lbl:'Sách nói'}
];

/* ── Router ── */
function sellerContent(){
  const myApp=sellerApps.find(a=>a.email===user.email);
  const isApproved=myApp&&myApp.status==='approved';

  if(acctTab==='seller-reg')     return myApp?sellerAppStatus(myApp):sellerRegForm();
  if(acctTab==='seller-products')     return isApproved?sellerProductList():sellerAppStatus(myApp);
  if(acctTab==='seller-product-form') return isApproved?sellerProductForm(sellerEditProductId):sellerAppStatus(myApp);
  if(acctTab==='seller-product-import')return isApproved?sellerProductImport():sellerAppStatus(myApp);
  if(acctTab==='seller-ebooks')        return isApproved?sellerEbookList():sellerAppStatus(myApp);
  if(acctTab==='seller-ebook-form')    return isApproved?sellerEbookForm(sellerEditEbookId):sellerAppStatus(myApp);
  if(acctTab==='seller-ebook-stats')   return isApproved?sellerEbookStats(sellerEbookStatsId):sellerAppStatus(myApp);
  if(acctTab==='seller-vpp')           return isApproved?sellerVppList():sellerAppStatus(myApp);
  if(acctTab==='seller-vpp-form')      return isApproved?sellerVppForm(sellerEditVppId):sellerAppStatus(myApp);
  if(acctTab==='seller-tbgd')          return isApproved?sellerTbgdList():sellerAppStatus(myApp);
  if(acctTab==='seller-tbgd-form')     return isApproved?sellerTbgdForm(sellerEditTbgdId):sellerAppStatus(myApp);
  if(acctTab==='seller-orders')        return isApproved?sellerOrderList():sellerAppStatus(myApp);
  if(acctTab==='seller-order-detail')  return isApproved?sellerOrderDetail(sellerViewOrderId):sellerAppStatus(myApp);
  if(acctTab==='seller-warehouse')     return isApproved?sellerWarehouse():sellerAppStatus(myApp);
  if(acctTab==='seller-revenue')       return isApproved?sellerRevenueReport():sellerAppStatus(myApp);
  if(acctTab==='seller-analytics')     return isApproved?sellerAnalytics():sellerAppStatus(myApp);
  if(acctTab==='seller-reviews')       return isApproved?sellerReviewCenter():sellerAppStatus(myApp);
  if(acctTab==='seller-shop')    return isApproved?sellerShopEditor(myApp):sellerAppStatus(myApp);
  if(acctTab==='seller-payment') return sellerPaymentSettings(myApp);
  if(acctTab==='seller-dashboard')return isApproved?sellerDashboard(myApp):sellerAppStatus(myApp);
  if(acctTab==='seller-notif')    return sellerNotifCenter();
  /* fallthrough for 'profile', 'address', etc. handled by buyer acctContent below */
  return sellerDefaultContent(myApp,isApproved);
}

function sellerDefaultContent(myApp,isApproved){
  if(acctTab==='dashboard'){
    const myActiveSeller=isApproved?activeSellers.find(s=>s.email===user.email):null;
    if(isApproved&&myActiveSeller) return sellerDashboard(myApp);
    return sellerWelcome(myApp);
  }
  /* Share buyer profile/address/points */
  const tmpRole=user.role;
  user.role='hocsinh'; /* temporarily borrow buyer content for profile/address tabs */
  const html=acctContent();
  user.role=tmpRole;
  return html;
}

/* ── 1. Welcome (no application yet) ── */
function sellerWelcome(myApp){
  const statusBanner=myApp?sellerStatusBanner(myApp):'';
  return '<div class="panel">'+
    '<h3>Chào mừng đến Cổng Người bán EduMart!</h3>'+
    '<p style="color:var(--text-soft);margin:-4px 0 16px;font-size:13.5px">Bắt đầu hành trình kinh doanh sách & giáo dục cùng hàng triệu học sinh, sinh viên và giáo viên trên cả nước.</p>'+
    statusBanner+
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:20px 0">'+
      _sellerBenefitCard('📦','Đơn giản','Đăng ký miễn phí, duyệt trong 1–2 ngày làm việc')+
      _sellerBenefitCard('💰','Hoa hồng thấp','8–15% tùy danh mục, thấp nhất thị trường')+
      _sellerBenefitCard('📊','Minh bạch','Thống kê doanh thu, đơn hàng realtime')+
    '</div>'+
    (myApp
      ?'<button class="btn-primary" onclick="acctTab=\'seller-reg\';renderAccount()">Xem trạng thái hồ sơ ›</button>'
      :'<button class="btn-primary" onclick="acctTab=\'seller-reg\';renderAccount()">Đăng ký ngay ›</button>')+
  '</div>';
}
function _sellerBenefitCard(ic,title,desc){
  return '<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:12px;padding:16px 14px;text-align:center">'+
    '<div style="font-size:24px;margin-bottom:6px">'+ic+'</div>'+
    '<div style="font-weight:600;font-size:13.5px;margin-bottom:4px">'+title+'</div>'+
    '<div style="font-size:12.5px;color:var(--text-soft)">'+desc+'</div>'+
  '</div>';
}

/* ── 2. Registration form (multi-step) ── */
function sellerRegForm(){
  const steps=['Thông tin shop','Giấy phép KD','CCCD','Ngân hàng','Xác nhận'];
  const stepBar='<div style="display:flex;gap:0;margin-bottom:24px">'+
    steps.map((s,i)=>{
      const done=i<sellerRegStep-1, active=i===sellerRegStep-1;
      return '<div style="flex:1;text-align:center">'+
        '<div style="width:28px;height:28px;border-radius:50%;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;'+
          (done?'background:var(--ink);color:#fff':active?'background:var(--ink);color:#fff':'background:#e8e2db;color:var(--text-soft)')+
        '">'+(done?'✓':(i+1))+'</div>'+
        '<div style="font-size:11px;color:'+(active?'var(--ink-deep)':'var(--text-soft)')+'">'+s+'</div>'+
      '</div>'+(i<steps.length-1?'<div style="flex:none;width:20px;display:flex;align-items:flex-start;padding-top:12px"><div style="height:2px;width:100%;background:'+(done?'var(--ink)':'#e8e2db')+'"></div></div>':'');
    }).join('')+
  '</div>';

  let formHtml='';
  if(sellerRegStep===1) formHtml=_slRegStep1();
  else if(sellerRegStep===2) formHtml=_slRegStep2();
  else if(sellerRegStep===3) formHtml=_slRegStep3();
  else if(sellerRegStep===4) formHtml=_slRegStep4();
  else formHtml=_slRegStep5();

  const navBtns='<div style="display:flex;gap:10px;margin-top:20px">'+
    (sellerRegStep>1?'<button class="btn-ghost" onclick="sellerRegStep--;renderAccount()">← Quay lại</button>':'')+
    (sellerRegStep<5
      ?'<button class="btn-primary" onclick="doSellerRegNext()">Tiếp theo →</button>'
      :'<button class="btn-primary" onclick="doSubmitSellerApp()">Nộp hồ sơ</button>')+
  '</div>';

  return '<div class="panel"><h3>Đăng ký Người bán / NCC</h3>'+stepBar+formHtml+navBtns+'</div>';
}

function _slRegStep1(){
  return '<div style="font-weight:600;font-size:14px;margin-bottom:14px">📋 Thông tin Gian hàng</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Tên shop <span style="color:var(--ink)">*</span></label><input id="slShopName" value="'+(user.name||'')+'" placeholder="VD: Sách & VPP Minh Long"></div>'+
      '<div class="form-field"><label>Số điện thoại liên hệ <span style="color:var(--ink)">*</span></label><input id="slPhone" value="'+(user.phone||'')+'" placeholder="09xx xxx xxx"></div>'+
    '</div>'+
    '<div class="form-field"><label>Danh mục chính <span style="color:var(--ink)">*</span></label>'+
      '<select id="slCategory">'+SELLER_CAT_OPTS.map(c=>'<option value="'+c.k+'">'+c.lbl+'</option>').join('')+'</select>'+
    '</div>'+
    '<div class="form-field"><label>Mô tả gian hàng <span style="color:var(--ink)">*</span></label>'+
      '<textarea id="slDesc" rows="3" placeholder="Giới thiệu về sản phẩm bạn kinh doanh, kinh nghiệm, điểm khác biệt..."></textarea>'+
    '</div>'+
    '<div class="form-field"><label>Địa chỉ kho hàng / văn phòng <span style="color:var(--ink)">*</span></label><input id="slAddress" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"></div>'+
    '<div class="form-field"><label>Danh mục sản phẩm dự kiến</label><input id="slMainCats" placeholder="Sách GK, Sách tham khảo, Văn phòng phẩm..."></div>';
}

function _slRegStep2(){
  return '<div style="font-weight:600;font-size:14px;margin-bottom:14px">📄 Giấy phép Kinh doanh (GPKD)</div>'+
    '<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#7a6000">'+
      '⚠ Thông tin phải khớp chính xác với giấy phép kinh doanh bản gốc. Admin sẽ xác minh trước khi duyệt.'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Số đăng ký / Mã số KD <span style="color:var(--ink)">*</span></label><input id="slGpkdNum" placeholder="VD: ĐKKD-HN-2024-112345"></div>'+
      '<div class="form-field"><label>Loại hình kinh doanh <span style="color:var(--ink)">*</span></label>'+
        '<select id="slGpkdType">'+
          '<option>Hộ kinh doanh cá thể</option>'+
          '<option>Công ty TNHH MTV</option>'+
          '<option>Công ty TNHH</option>'+
          '<option>Công ty Cổ phần</option>'+
          '<option>Nhà xuất bản</option>'+
        '</select>'+
      '</div>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Ngày cấp <span style="color:var(--ink)">*</span></label><input id="slGpkdIssued" type="date"></div>'+
      '<div class="form-field"><label>Nơi cấp <span style="color:var(--ink)">*</span></label><input id="slGpkdPlace" placeholder="VD: Sở KH&ĐT Hà Nội"></div>'+
    '</div>'+
    '<div style="background:#f0f7ff;border:1.5px solid #c3daf5;border-radius:10px;padding:12px 14px;font-size:13px;color:#1a4a7a">'+
      '📎 <b>Bản demo:</b> Trong môi trường thực, bạn sẽ tải ảnh chụp GPKD bản gốc lên đây. Hiện tại điền thông tin text là đủ.'+
    '</div>';
}

function _slRegStep3(){
  return '<div style="font-weight:600;font-size:14px;margin-bottom:14px">🪪 Căn cước Công dân (CCCD)</div>'+
    '<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#7a6000">'+
      '⚠ Thông tin CCCD của chủ sở hữu / người đại diện pháp lý doanh nghiệp.'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Số CCCD (12 chữ số) <span style="color:var(--ink)">*</span></label><input id="slCccdNum" placeholder="034xxxxxxxxx" maxlength="12"></div>'+
      '<div class="form-field"><label>Họ và tên trên CCCD <span style="color:var(--ink)">*</span></label><input id="slCccdName" value="'+(user.name||'')+'" placeholder="Đúng như trên thẻ CCCD"></div>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Ngày cấp <span style="color:var(--ink)">*</span></label><input id="slCccdIssued" type="date"></div>'+
      '<div class="form-field"><label>Nơi cấp <span style="color:var(--ink)">*</span></label><input id="slCccdPlace" placeholder="VD: Công an TP Hà Nội"></div>'+
    '</div>'+
    '<div style="background:#f0f7ff;border:1.5px solid #c3daf5;border-radius:10px;padding:12px 14px;font-size:13px;color:#1a4a7a">'+
      '📎 <b>Bản demo:</b> Trong môi trường thực, bạn sẽ tải ảnh CCCD 2 mặt còn hiệu lực. Hiện tại điền thông tin text là đủ.'+
    '</div>';
}

function _slRegStep4(){
  return '<div style="font-weight:600;font-size:14px;margin-bottom:14px">🏦 Thông tin Tài khoản Ngân hàng</div>'+
    '<p style="font-size:13px;color:var(--text-soft);margin:-4px 0 16px">Tài khoản này dùng để EduMart thanh toán tiền bán hàng cho bạn sau khi đơn hoàn thành.</p>'+
    '<div class="form-field"><label>Ngân hàng <span style="color:var(--ink)">*</span></label>'+
      '<select id="slBankName">'+
        ['Vietcombank','Techcombank','MB Bank','BIDV','VietinBank','Agribank','TPBank','VPBank','SHB','ACB','Sacombank','HDBank','OCB','SeABank'].map(b=>'<option>'+b+'</option>').join('')+
      '</select>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Số tài khoản <span style="color:var(--ink)">*</span></label><input id="slBankAcc" placeholder="Nhập số tài khoản" type="text"></div>'+
      '<div class="form-field"><label>Tên chủ tài khoản <span style="color:var(--ink)">*</span></label><input id="slBankHolder" value="'+(user.name||'')+'" placeholder="Đúng như in trên thẻ ngân hàng"></div>'+
    '</div>'+
    '<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:10px;padding:12px 14px;font-size:13px;color:#1a5c38">'+
      '✅ Thông tin ngân hàng được mã hóa và chỉ được dùng để thanh toán. EduMart không lưu CVV hoặc thông tin thẻ.'+
    '</div>';
}

function _slRegStep5(){
  /* Read stored values from LS temp or just show summary prompt */
  return '<div style="font-weight:600;font-size:14px;margin-bottom:14px">✅ Xác nhận và Nộp hồ sơ</div>'+
    '<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:12px;padding:16px 18px;margin-bottom:16px">'+
      '<p style="margin:0 0 10px;font-weight:600">Trước khi nộp, hãy xác nhận:</p>'+
      '<ul style="margin:0;padding-left:18px;font-size:13.5px;line-height:1.8">'+
        '<li>Tất cả thông tin tôi cung cấp là <b>trung thực và chính xác</b></li>'+
        '<li>Giấy phép kinh doanh và CCCD còn <b>hiệu lực</b></li>'+
        '<li>Tôi đồng ý với <a style="color:var(--ink);font-weight:500" onclick="go(\'terms\')">Điều khoản dịch vụ Người bán</a> của EduMart</li>'+
        '<li>Tôi hiểu rằng vi phạm chính sách có thể dẫn đến đình chỉ hoặc khóa tài khoản</li>'+
      '</ul>'+
    '</div>'+
    '<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:10px;padding:14px 16px;font-size:13px">'+
      '<b>Quy trình sau khi nộp:</b><br>'+
      '① Admin EduMart xem xét hồ sơ (1–2 ngày làm việc)<br>'+
      '② Nhận thông báo kết quả tại đây và qua email<br>'+
      '③ Nếu được duyệt: tài khoản seller kích hoạt ngay lập tức'+
    '</div>'+
    '<label style="display:flex;align-items:flex-start;gap:10px;margin-top:16px;cursor:pointer">'+
      '<input type="checkbox" id="slConfirmCheck" style="margin-top:2px">'+
      '<span style="font-size:13.5px">Tôi xác nhận tất cả thông tin trên là đúng sự thật và đồng ý với điều khoản của EduMart.</span>'+
    '</label>';
}

/* ── 3. Application Status ── */
function sellerAppStatus(app){
  const st=app.status;
  let banner='', actions='';

  if(st==='pending'){
    banner='<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:12px;padding:16px 18px;margin-bottom:20px">'+
      '<div style="font-weight:700;font-size:15px;margin-bottom:4px">⏳ Hồ sơ đang chờ xét duyệt</div>'+
      '<p style="margin:0;font-size:13.5px;color:var(--text-soft)">Admin EduMart đang xem xét hồ sơ của bạn. Thường mất 1–2 ngày làm việc. Bạn sẽ nhận thông báo tại đây khi có kết quả.</p>'+
    '</div>';
  } else if(st==='more-info'){
    banner='<div style="background:#e8f4ff;border:1.5px solid #90c3f5;border-radius:12px;padding:16px 18px;margin-bottom:20px">'+
      '<div style="font-weight:700;font-size:15px;margin-bottom:6px">📋 Cần bổ sung thông tin</div>'+
      '<p style="margin:0 0 8px;font-size:13.5px">Admin yêu cầu bổ sung: <b>'+escHtml(app.reviewNote||'')+'</b></p>'+
      '<p style="margin:0;font-size:12.5px;color:var(--text-soft)">Xem xét bởi: '+escHtml(app.reviewedBy||'Admin EduMart')+' · '+escHtml(app.reviewedAt||'')+'</p>'+
    '</div>';
    actions='<button class="btn-primary" onclick="doSellerResubmit(\''+app.id+'\')">✏ Bổ sung và nộp lại</button> ';
  } else if(st==='rejected'){
    banner='<div style="background:#fff0f0;border:1.5px solid #f5c0c0;border-radius:12px;padding:16px 18px;margin-bottom:20px">'+
      '<div style="font-weight:700;font-size:15px;margin-bottom:6px;color:#c0392b">✕ Hồ sơ bị từ chối</div>'+
      '<p style="margin:0 0 8px;font-size:13.5px">Lý do: <b>'+escHtml(app.reviewNote||'Không đủ điều kiện')+'</b></p>'+
      '<p style="margin:0;font-size:12.5px;color:var(--text-soft)">Xem xét bởi: '+escHtml(app.reviewedBy||'Admin EduMart')+' · '+escHtml(app.reviewedAt||'')+'</p>'+
    '</div>';
    actions='<button class="btn-primary" onclick="doSellerNewApp()">Nộp hồ sơ mới</button> ';
  } else if(st==='approved'){
    banner='<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:12px;padding:16px 18px;margin-bottom:20px">'+
      '<div style="font-weight:700;font-size:15px;margin-bottom:4px;color:#1a5c38">✅ Hồ sơ đã được duyệt!</div>'+
      '<p style="margin:0;font-size:13.5px;color:var(--text-soft)">Tài khoản bán hàng của bạn đã kích hoạt. Duyệt bởi: '+escHtml(app.reviewedBy||'Admin EduMart')+' · '+escHtml(app.reviewedAt||'')+'</p>'+
    '</div>';
    actions='<button class="btn-primary" onclick="acctTab=\'seller-dashboard\';renderAccount()">Vào Tổng quan ›</button> ';
  }

  const clr=NCC_CAT_CLR[app.category]||'#888';
  const catLbl=NCC_CAT_LBL[app.category]||app.category;
  const infoGrid=(lbl,val)=>'<div style="padding:10px 0;border-bottom:1px solid var(--line)"><div style="font-size:11px;color:var(--text-soft);text-transform:uppercase;letter-spacing:.05em">'+lbl+'</div><div style="font-size:14px;font-weight:500;margin-top:2px">'+escHtml(String(val||'—'))+'</div></div>';

  return '<div class="panel"><h3>Hồ sơ Đăng ký Người bán</h3>'+
    banner+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0">'+
      infoGrid('Tên shop',app.shopName)+
      infoGrid('Chủ sở hữu',app.ownerName)+
      infoGrid('Email',app.email)+
      infoGrid('Số điện thoại',app.phone)+
      infoGrid('Danh mục','<span style="background:'+clr+'18;color:'+clr+';padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600">'+catLbl+'</span>')+
      infoGrid('Ngày nộp',app.submittedAt)+
    '</div>'+
    '<div style="margin-top:14px;padding:12px 0;border-top:1px solid var(--line)">'+
      '<div style="font-size:11.5px;color:var(--text-soft);margin-bottom:4px">MÔ TẢ GIAN HÀNG</div>'+
      '<p style="font-size:13.5px;margin:0">'+escHtml(app.shopInfo&&app.shopInfo.desc||'—')+'</p>'+
    '</div>'+
    '<div style="margin-top:16px">'+actions+'</div>'+
  '</div>';
}

function sellerStatusBanner(app){
  const st=app.status;
  if(st==='pending')
    return '<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13.5px">⏳ <b>Hồ sơ đang chờ xét duyệt.</b> <a style="color:var(--ink);font-weight:500" onclick="acctTab=\'seller-reg\';renderAccount()">Xem chi tiết ›</a></div>';
  if(st==='more-info')
    return '<div style="background:#e8f4ff;border:1.5px solid #90c3f5;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13.5px">📋 <b>Hồ sơ cần bổ sung.</b> <a style="color:var(--ink);font-weight:500" onclick="acctTab=\'seller-reg\';renderAccount()">Xem yêu cầu ›</a></div>';
  if(st==='rejected')
    return '<div style="background:#fff0f0;border:1.5px solid #f5c0c0;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13.5px">✕ <b>Hồ sơ bị từ chối.</b> <a style="color:var(--ink);font-weight:500" onclick="acctTab=\'seller-reg\';renderAccount()">Xem lý do ›</a></div>';
  if(st==='approved')
    return '<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13.5px">✅ <b>Hồ sơ đã được duyệt!</b> <a style="color:var(--ink);font-weight:500" onclick="acctTab=\'seller-dashboard\';renderAccount()">Vào Tổng quan ›</a></div>';
  return '';
}

/* ── 4. Seller Dashboard (approved) ── */
function sellerDashboard(app){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s)return '<div class="panel"><p>Đang khởi tạo tài khoản seller…</p></div>';
  const clr=NCC_CAT_CLR[s.category]||'#888';
  const catLbl=NCC_CAT_LBL[s.category]||s.category;
  const st=s.stats||{};
  const products=s.products||[];
  const outOfStock=products.filter(p=>p.stock===0);
  const lowStock=products.filter(p=>p.stock>0&&p.stock<=5);
  const allWarn=[...outOfStock.map(p=>({...p,wt:'out'})),...lowStock.map(p=>({...p,wt:'low'}))];
  const rOrders=s.recentOrders||[];
  const sNotifs=s.sellerNotifs||[];
  const unread=sNotifs.filter(n=>!n.read).length;

  const sBadge={active:'<span style="color:#27ae60;font-weight:600">● Hoạt động</span>',warning:'<span style="color:#e67e22;font-weight:600">⚠ Cảnh báo</span>',suspended:'<span style="color:#c0392b;font-weight:600">⏸ Đình chỉ</span>',locked:'<span style="color:#7f8c8d;font-weight:600">🔒 Đã khóa</span>'}[s.status]||'';

  // Period tabs & data
  const pData={today:{o:st.todayOrders||0,r:st.todayRev||0,l:'Hôm nay'},week:{o:st.thisWeekOrders||0,r:st.thisWeekRev||0,l:'Tuần này'},month:{o:st.thisMonthOrders||0,r:st.thisMonthRev||0,l:'Tháng này'}};
  const pd=pData[sellerDashPeriod]||pData.month;
  const periodTabs=['today','week','month'].map(p=>'<button onclick="sellerDashPeriod=\''+p+'\';renderAccount()" style="padding:4px 14px;border-radius:20px;border:1.5px solid '+(sellerDashPeriod===p?clr:'var(--line)')+';background:'+(sellerDashPeriod===p?clr+'20':'transparent')+';color:'+(sellerDashPeriod===p?clr:'var(--text-soft)')+';font-size:12.5px;cursor:pointer;font-weight:'+(sellerDashPeriod===p?'600':'400')+'">'+pData[p].l+'</button>').join('');

  // Revenue chart (7-day CSS bars)
  const chart=s.revenueChart||[0,0,0,0,0,0,0];
  const chartDays=s.revenueChartDays||['T2','T3','T4','T5','T6','T7','CN'];
  const maxR=Math.max(...chart,1);
  const CH=80;
  const valRow='<div style="display:flex;gap:4px">'+chart.map(v=>'<div style="flex:1;text-align:center;font-size:9px;color:var(--text-soft);height:14px;line-height:14px">'+(v>0?Math.round(v/1000)+'k':'')+'</div>').join('')+'</div>';
  const barRow='<div style="display:flex;align-items:flex-end;gap:4px;height:'+CH+'px">'+chart.map((v,i)=>'<div style="flex:1;height:'+Math.max(Math.round((v/maxR)*CH),3)+'px;border-radius:3px 3px 0 0;background:'+(i===chart.length-1?clr:'#d0c8bf')+'"></div>').join('')+'</div>';
  const dayRow='<div style="display:flex;gap:4px;margin-top:4px">'+chartDays.map((d,i)=>'<div style="flex:1;text-align:center;font-size:10.5px;color:'+(i===chart.length-1?clr:'var(--text-soft)')+'">'+d+'</div>').join('')+'</div>';

  // Recent orders rows
  const oStLbl={pending:'Chờ xác nhận',processing:'Đang xử lý',shipping:'Đang giao',delivered:'Đã giao',cancelled:'Đã hủy'};
  const oStClr={pending:'#e67e22',processing:'#2980b9',shipping:'#8e44ad',delivered:'#27ae60',cancelled:'#7f8c8d'};
  const orderRows=rOrders.length
    ?rOrders.slice(0,5).map(o=>'<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:7px 6px;font-size:12.5px;font-weight:600;color:var(--ink)">'+escHtml(o.id)+'</td>'+
        '<td style="padding:7px 6px;font-size:12.5px">'+escHtml(o.buyer)+'</td>'+
        '<td style="padding:7px 6px;font-size:12.5px;text-align:center">'+o.items+'</td>'+
        '<td style="padding:7px 6px;font-size:12.5px;font-weight:600">'+fmtBig(o.revenue)+'đ</td>'+
        '<td style="padding:7px 6px"><span style="font-size:11px;padding:2px 8px;border-radius:6px;background:'+(oStClr[o.status]||'#888')+'18;color:'+(oStClr[o.status]||'#888')+'">'+escHtml(oStLbl[o.status]||o.status)+'</span></td>'+
        '<td style="padding:7px 6px;font-size:11.5px;color:var(--text-soft)">'+escHtml(o.date)+'</td>'+
      '</tr>').join('')
    :'<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-soft);font-size:13.5px">Chưa có đơn hàng nào</td></tr>';

  // Stock warning cards
  const stockHtml=allWarn.length
    ?'<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:12px;padding:14px 16px;margin-bottom:20px">'+
        '<div style="font-weight:600;font-size:13.5px;margin-bottom:10px">⚠ Cảnh báo Tồn kho ('+allWarn.length+')</div>'+
        '<div style="display:flex;flex-wrap:wrap;gap:8px">'+
          allWarn.map(p=>'<div style="background:#fff;border:1.5px solid '+(p.wt==='out'?'#e74c3c':'#f39c12')+';border-radius:8px;padding:6px 12px;font-size:12.5px">'+
            (p.wt==='out'?'🔴':'🟡')+' <b>'+escHtml(p.name)+'</b> — <span style="color:'+(p.wt==='out'?'#c0392b':'#e67e22')+'">'+(p.wt==='out'?'Hết hàng':'Còn '+p.stock+' cái')+'</span></div>'
          ).join('')+
        '</div>'+
      '</div>'
    :'';

  const suspHtml=s.status==='suspended'?'<div style="background:#fff0f0;border:1.5px solid #f5c0c0;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13.5px">⏸ <b>Tài khoản đang bị đình chỉ đến '+escHtml(s.suspendedUntil||'?')+'.</b> Lý do: '+escHtml(s.suspendedReason||'—')+'</div>':'';

  return '<div class="panel">'+
    // Shop header
    '<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">'+
      '<div class="av" style="background:'+clr+'18;color:'+clr+';width:46px;height:46px;font-size:20px">'+escHtml(s.shopName.charAt(0).toUpperCase())+'</div>'+
      '<div style="flex:1">'+
        '<div style="font-weight:700;font-size:17px">'+escHtml(s.shopName)+'</div>'+
        '<div style="font-size:13px;color:var(--text-soft);margin-top:3px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">'+
          '<span style="background:'+clr+'18;color:'+clr+';padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:600">'+catLbl+'</span>'+
          sBadge+
          '<span>· Tham gia '+escHtml(s.joinedAt||'—')+'</span>'+
        '</div>'+
      '</div>'+
      (unread?'<div onclick="acctTab=\'seller-notif\';renderAccount()" style="cursor:pointer;background:#e74c3c;color:#fff;font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px;white-space:nowrap">🔔 '+unread+' chưa đọc</div>':'')+
    '</div>'+
    suspHtml+
    // Period selector
    '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">'+periodTabs+'</div>'+
    // KPI cards
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">'+
      '<div style="background:'+clr+'10;border:1.5px solid '+clr+'30;border-radius:12px;padding:14px">'+
        '<div style="font-size:10.5px;color:'+clr+';text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Doanh thu · '+pd.l+'</div>'+
        '<div style="font-size:17px;font-weight:700;color:var(--ink-deep)">'+fmtMil(pd.r)+'đ</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">'+pd.o+' đơn</div>'+
      '</div>'+
      '<div style="background:#2980b910;border:1.5px solid #2980b930;border-radius:12px;padding:14px">'+
        '<div style="font-size:10.5px;color:#2980b9;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Đơn mới hôm nay</div>'+
        '<div style="font-size:17px;font-weight:700;color:var(--ink-deep)">'+(st.todayOrders||0)+'</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">đơn hàng</div>'+
      '</div>'+
      '<div style="background:#27ae6010;border:1.5px solid #27ae6030;border-radius:12px;padding:14px">'+
        '<div style="font-size:10.5px;color:#27ae60;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Sản phẩm đang bán</div>'+
        '<div style="font-size:17px;font-weight:700;color:var(--ink-deep)">'+(s.totalProducts||products.length||0)+'</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">sản phẩm</div>'+
      '</div>'+
      '<div style="background:'+(allWarn.length?'#e67e2210':'var(--paper)')+';border:1.5px solid '+(allWarn.length?'#e67e2230':'var(--line)')+';border-radius:12px;padding:14px">'+
        '<div style="font-size:10.5px;color:'+(allWarn.length?'#e67e22':'var(--text-soft)')+';text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Cảnh báo tồn kho</div>'+
        '<div style="font-size:17px;font-weight:700;color:'+(allWarn.length?'#e67e22':'var(--ink-deep)')+'">'+allWarn.length+'</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">'+(allWarn.length?outOfStock.length+' hết · '+lowStock.length+' sắp hết':'Ổn định')+'</div>'+
      '</div>'+
    '</div>'+
    // Chart + Recent orders
    '<div style="display:grid;grid-template-columns:1fr 1.6fr;gap:16px;margin-bottom:20px">'+
      '<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:12px;padding:16px">'+
        '<div style="font-weight:600;font-size:13px;margin-bottom:12px;color:var(--ink-deep)">📈 Doanh thu 7 ngày</div>'+
        valRow+barRow+dayRow+
      '</div>'+
      '<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:12px;padding:16px;overflow:auto">'+
        '<div style="font-weight:600;font-size:13px;margin-bottom:10px;color:var(--ink-deep)">🧾 Đơn hàng gần đây</div>'+
        '<table style="width:100%;border-collapse:collapse;min-width:400px">'+
          '<thead><tr>'+
            '<th style="text-align:left;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">Đơn</th>'+
            '<th style="text-align:left;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">Khách hàng</th>'+
            '<th style="text-align:center;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">SP</th>'+
            '<th style="text-align:left;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">Doanh thu</th>'+
            '<th style="text-align:left;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">Trạng thái</th>'+
            '<th style="text-align:left;padding:0 6px 8px;font-size:11px;color:var(--text-soft);font-weight:500">Ngày</th>'+
          '</tr></thead>'+
          '<tbody>'+orderRows+'</tbody>'+
        '</table>'+
      '</div>'+
    '</div>'+
    stockHtml+
    // Quick actions
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">'+
      '<button class="dash-card" onclick="acctTab=\'seller-products\';renderAccount()">📦 Sản phẩm ›</button>'+
      '<button class="dash-card" onclick="acctTab=\'seller-payment\';renderAccount()">💰 Thanh toán ›</button>'+
      '<button class="dash-card" onclick="acctTab=\'seller-notif\';renderAccount()">'+(unread?'🔔 Thông báo ('+unread+') ›':'🔔 Thông báo ›')+'</button>'+
    '</div>'+
  '</div>';
}

/* ── 5. Seller Notification Center ── */
function sellerNotifCenter(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s)return '<div class="panel"><p>Không tìm thấy tài khoản seller.</p></div>';
  const sNotifs=s.sellerNotifs||[];
  const unread=sNotifs.filter(n=>!n.read).length;
  const typeIcon={order:'🛒',report:'⚠️',review:'⭐',stock:'📦'};
  const typeLbl={order:'Đơn hàng mới',report:'Sản phẩm bị báo cáo',review:'Đánh giá mới',stock:'Tồn kho'};
  const typeClr={order:'#2980b9',report:'#e74c3c',review:'#f39c12',stock:'#e67e22'};

  const rows=sNotifs.length
    ?sNotifs.map(n=>'<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);align-items:flex-start">'+
        '<div style="width:36px;height:36px;border-radius:50%;background:'+(typeClr[n.type]||'#888')+'18;color:'+(typeClr[n.type]||'#888')+';display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">'+(typeIcon[n.type]||'🔔')+'</div>'+
        '<div style="flex:1;min-width:0">'+
          '<div style="font-size:11.5px;color:'+(typeClr[n.type]||'#888')+';font-weight:600;margin-bottom:3px">'+escHtml(typeLbl[n.type]||'Thông báo')+'</div>'+
          '<div style="font-size:13.5px;color:var(--ink);line-height:1.4;'+(n.read?'':'font-weight:500')+'">'+escHtml(n.t)+'</div>'+
          '<div style="font-size:11.5px;color:var(--text-soft);margin-top:4px">'+escHtml(n.time)+'</div>'+
        '</div>'+
        (!n.read?'<div style="width:8px;height:8px;border-radius:50%;background:#e74c3c;flex-shrink:0;margin-top:6px"></div>':'')+
      '</div>'
    ).join('')
    :'<div style="text-align:center;padding:40px 20px;color:var(--text-soft)">🔔 Chưa có thông báo nào.</div>';

  const typeSummary=Object.entries(typeLbl).map(([k,v])=>{
    const cnt=sNotifs.filter(n=>n.type===k).length;
    const uCnt=sNotifs.filter(n=>n.type===k&&!n.read).length;
    if(!cnt)return '';
    return '<div style="display:flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;border:1.5px solid '+(typeClr[k]||'#888')+'30;background:'+(typeClr[k]||'#888')+'10;font-size:12px;color:'+(typeClr[k]||'#888')+'">'+
      (typeIcon[k]||'🔔')+' '+v+
      ' <span style="background:'+(typeClr[k]||'#888')+';color:#fff;border-radius:20px;padding:0 6px;font-size:10.5px;font-weight:600">'+cnt+(uCnt?' · '+uCnt+' mới':'')+' </span>'+
    '</div>';
  }).join('');

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<div>'+
        '<h3 style="margin:0">Thông báo Cổng Người bán</h3>'+
        '<p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">Đơn hàng mới, đánh giá, cảnh báo tồn kho và sản phẩm bị báo cáo.</p>'+
      '</div>'+
      (unread?'<button class="btn-ghost" onclick="doMarkSellerNotifsRead()" style="font-size:12.5px;padding:6px 14px">✓ Đánh dấu tất cả đã đọc</button>':'')+
    '</div>'+
    (typeSummary?'<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+typeSummary+'</div>':'')+
    rows+
  '</div>';
}

function doMarkSellerNotifsRead(){
  const idx=activeSellers.findIndex(x=>x.email===user.email);
  if(idx===-1)return;
  (activeSellers[idx].sellerNotifs||[]).forEach(n=>n.read=true);
  saveActiveSellers();
  toast('Đã đánh dấu tất cả thông báo là đã đọc.');
  renderAccount();
}

/* ── 6. Seller Product Management ── */
const SELLER_GENRE=[{k:'sgk',lbl:'Sách giáo khoa'},{k:'thamkhao',lbl:'Sách tham khảo'},{k:'vanhoc',lbl:'Văn học'},{k:'thieunhi',lbl:'Thiếu nhi'},{k:'kynang',lbl:'Kỹ năng sống'},{k:'ngoaingu',lbl:'Ngoại ngữ'}];
const SELLER_AUD=[{k:'tieuhoc',lbl:'Tiểu học'},{k:'thcs',lbl:'THCS'},{k:'thpt',lbl:'THPT'},{k:'sinhvien',lbl:'Sinh viên'},{k:'giaovien',lbl:'Giáo viên'}];
const SELLER_LANG=[{k:'vi',lbl:'Tiếng Việt'},{k:'en',lbl:'Tiếng Anh'},{k:'bilingual',lbl:'Song ngữ'}];
const SELLER_GENRE_LBL=Object.fromEntries(SELLER_GENRE.map(g=>[g.k,g.lbl]));

function sellerProductList(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s)return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const allProds=s.products||[];
  let prods=allProds.slice();
  if(sellerProductSearch){const q=sellerProductSearch.toLowerCase();prods=prods.filter(p=>p.name.toLowerCase().includes(q)||(p.by||'').toLowerCase().includes(q));}
  if(sellerProductStatusFilter==='outofstock')prods=prods.filter(p=>p.stock===0);
  else if(sellerProductStatusFilter!=='all')prods=prods.filter(p=>p.status===sellerProductStatusFilter);
  const total=allProds.length;
  const activeCnt=allProds.filter(p=>p.status==='active').length;
  const draftCnt=allProds.filter(p=>p.status==='draft').length;
  const outCnt=allProds.filter(p=>p.stock===0).length;
  const stBadge={active:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#27ae6020;color:#27ae60;font-weight:600">Đang bán</span>',draft:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#95a5a620;color:#7f8c8d;font-weight:600">Nháp</span>',outofstock:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#e67e2220;color:#e67e22;font-weight:600">Hết hàng</span>'};
  const clr=NCC_CAT_CLR[s.category]||'#c0392b';
  const filteredIds=prods.map(p=>p.id);
  const selAll=filteredIds.length>0&&filteredIds.every(id=>sellerSelectedProds.includes(id));

  const rows=prods.length
    ?prods.map(p=>{
        const isSel=sellerSelectedProds.includes(p.id);
        const stockClr=p.stock===0?'#e74c3c':p.stock<=5?'#e67e22':'#27ae60';
        const disc=p.oldPrice>0?Math.round((1-p.price/p.oldPrice)*100):0;
        const stars='★'.repeat(Math.round(p.rating||0))+'☆'.repeat(5-Math.round(p.rating||0));
        const badge=p.stock===0&&p.status!=='draft'?stBadge.outofstock:(stBadge[p.status]||stBadge.draft);
        return '<tr style="border-top:1px solid var(--line);background:'+(isSel?'#f5f0eb':'transparent')+'">'+
          '<td style="padding:10px 8px;width:34px"><input type="checkbox" '+(isSel?'checked':'')+' onclick="doSellerToggleSelect(\''+p.id+'\')" style="cursor:pointer;width:15px;height:15px"></td>'+
          '<td style="padding:10px 8px;width:40px"><div style="width:36px;height:48px;background:'+clr+'18;border-radius:4px;display:flex;align-items:center;justify-content:center;color:'+clr+';font-weight:700;font-size:16px">'+escHtml(p.name.charAt(0).toUpperCase())+'</div></td>'+
          '<td style="padding:10px 8px">'+
            '<div style="font-weight:600;font-size:13.5px;color:var(--ink-deep);margin-bottom:2px">'+escHtml(p.name)+'</div>'+
            '<div style="font-size:11.5px;color:var(--text-soft)">'+escHtml(p.by||'—')+
              (p.genre?' · <span style="background:#f0ebe4;border-radius:4px;padding:1px 6px;font-size:11px">'+escHtml(SELLER_GENRE_LBL[p.genre]||p.genre)+'</span>':'')+
            '</div>'+
          '</td>'+
          '<td style="padding:10px 8px;white-space:nowrap">'+
            '<div style="font-weight:700;font-size:13.5px;color:var(--coral)">'+fmtBig(p.price)+'đ</div>'+
            (disc>0?'<div style="font-size:11px;color:var(--text-soft);text-decoration:line-through">'+fmtBig(p.oldPrice)+'đ</div><span style="font-size:10.5px;background:#e74c3c20;color:#e74c3c;padding:1px 5px;border-radius:4px">-'+disc+'%</span>':'')+
          '</td>'+
          '<td style="padding:10px 8px;text-align:center"><span style="font-weight:700;font-size:14px;color:'+stockClr+'">'+p.stock+'</span></td>'+
          '<td style="padding:10px 8px;text-align:center;color:var(--text-soft);font-size:13.5px">'+p.sold+'</td>'+
          '<td style="padding:10px 8px;white-space:nowrap"><span style="font-size:12px;color:#f39c12">'+stars+'</span> <span style="font-size:11.5px;color:var(--text-soft)">('+((p.ratingCount||0))+')</span></td>'+
          '<td style="padding:10px 8px">'+badge+'</td>'+
          '<td style="padding:10px 8px;white-space:nowrap">'+
            '<button title="Sửa" onclick="sellerEditProductId=\''+p.id+'\';acctTab=\'seller-product-form\';sellerProductSearch=\'\';sellerSelectedProds=[];renderAccount()" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">✏</button>'+
            '<button title="Nhập hàng" onclick="doSellerToggleRestock(\''+p.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">📦</button>'+
            '<button title="Xóa" onclick="doSellerDeleteProduct(\''+p.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;cursor:pointer;color:#e74c3c">🗑</button>'+
          '</td>'+
        '</tr>'+
        (sellerRestockProductId===p.id?'<tr><td colspan="9" style="padding:0 8px 12px;background:#faf8f5">'+_sellerRestockInline(p)+'</td></tr>':'');
      }).join('')
    :'<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-soft);font-size:13.5px">Không tìm thấy sản phẩm nào.</td></tr>';

  const bulkBar=sellerSelectedProds.length
    ?'<div style="background:#f5f0eb;border:1.5px solid var(--line);border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span style="font-weight:600;font-size:13.5px">✓ Đã chọn '+sellerSelectedProds.length+' sản phẩm</span>'+
        '<div style="height:18px;width:1px;background:var(--line)"></div>'+
        '<div style="display:flex;align-items:center;gap:6px">'+
          '<input id="bulkPriceInput" type="number" placeholder="Giá mới (đ)" style="padding:5px 10px;border:1.5px solid var(--line);border-radius:6px;font-size:13px;width:130px">'+
          '<button onclick="doSellerBulkPriceUpdate()" style="padding:5px 12px;border-radius:6px;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:12.5px">Cập nhật giá</button>'+
        '</div>'+
        '<div style="height:18px;width:1px;background:var(--line)"></div>'+
        '<button onclick="doSellerBulkStatusUpdate(\'active\')" style="padding:5px 12px;border-radius:6px;background:#27ae6018;color:#27ae60;border:1.5px solid #27ae6030;cursor:pointer;font-size:12.5px">→ Đang bán</button>'+
        '<button onclick="doSellerBulkStatusUpdate(\'draft\')" style="padding:5px 12px;border-radius:6px;background:#7f8c8d18;color:#7f8c8d;border:1.5px solid #7f8c8d30;cursor:pointer;font-size:12.5px">→ Nháp</button>'+
        '<div style="margin-left:auto"><button onclick="doSellerBulkDelete()" style="padding:5px 12px;border-radius:6px;background:#e74c3c18;color:#e74c3c;border:1.5px solid #e74c3c30;cursor:pointer;font-size:12.5px">🗑 Xóa đã chọn</button></div>'+
      '</div>'
    :'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<div><h3 style="margin:0">Quản lý Sản phẩm</h3>'+
        '<p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">'+total+' sản phẩm · '+activeCnt+' đang bán · '+draftCnt+' nháp · '+outCnt+' hết hàng</p>'+
      '</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
        '<button onclick="sellerEditProductId=null;sellerProductSearch=\'\';acctTab=\'seller-product-form\';renderAccount()" class="btn-primary" style="font-size:13px">+ Thêm sách mới</button>'+
        '<button onclick="sellerProductSearch=\'\';acctTab=\'seller-product-import\';renderAccount()" class="btn-ghost" style="font-size:13px">📥 Nhập CSV</button>'+
      '</div>'+
    '</div>'+
    '<div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center">'+
      '<input placeholder="🔍 Tìm theo tên sách, tác giả..." value="'+escHtml(sellerProductSearch)+'" oninput="sellerProductSearch=this.value;sellerSelectedProds=[];renderAccount()" style="flex:1;min-width:200px;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
      [['all','Tất cả ('+total+')'],['active','Đang bán ('+activeCnt+')'],['draft','Nháp ('+draftCnt+')'],['outofstock','Hết hàng ('+outCnt+')']].map(([k,lbl])=>
        '<button onclick="sellerProductStatusFilter=\''+k+'\';sellerSelectedProds=[];renderAccount()" style="padding:5px 13px;border-radius:20px;border:1.5px solid '+(sellerProductStatusFilter===k?'var(--ink)':'var(--line)')+';background:'+(sellerProductStatusFilter===k?'var(--ink)':'transparent')+';color:'+(sellerProductStatusFilter===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+lbl+'</button>'
      ).join('')+
    '</div>'+
    bulkBar+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse;min-width:720px">'+
        '<thead><tr style="background:var(--paper)">'+
          '<th style="padding:8px;width:34px"><input type="checkbox" '+(selAll&&prods.length?'checked':'')+' onclick="doSellerToggleSelectAll()" style="cursor:pointer;width:15px;height:15px"></th>'+
          '<th style="padding:8px;width:40px"></th>'+
          '<th style="text-align:left;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Sản phẩm</th>'+
          '<th style="text-align:left;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Giá</th>'+
          '<th style="text-align:center;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Tồn kho</th>'+
          '<th style="text-align:center;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Đã bán</th>'+
          '<th style="text-align:left;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Đánh giá</th>'+
          '<th style="text-align:left;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Trạng thái</th>'+
          '<th style="text-align:center;padding:8px;font-size:11.5px;color:var(--text-soft);font-weight:500">Thao tác</th>'+
        '</tr></thead>'+
        '<tbody>'+rows+'</tbody>'+
      '</table>'+
    '</div>'+
  '</div>';
}

function _sellerRestockInline(p){
  const hist=p.restockHistory&&p.restockHistory.length?p.restockHistory.slice(-3).reverse():[];
  return '<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:10px;padding:14px 16px;margin-top:6px">'+
    '<div style="font-weight:600;font-size:13.5px;margin-bottom:12px">📦 Nhập hàng: '+escHtml(p.name)+'</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Số lượng nhập thêm <span style="color:var(--ink)">*</span></label><input id="rsQty_'+p.id+'" type="number" value="50" min="1" placeholder="Số lượng" style="max-width:120px"></div>'+
      '<div class="form-field" style="flex:2"><label>Lý do nhập hàng</label><input id="rsReason_'+p.id+'" value="Nhập hàng định kỳ" placeholder="VD: Nhập hàng mùa tựu trường..."></div>'+
    '</div>'+
    '<div style="display:flex;gap:8px">'+
      '<button class="btn-primary" onclick="doSellerRestockProduct(\''+p.id+'\')" style="font-size:13px;padding:7px 16px">✓ Xác nhận nhập</button>'+
      '<button class="btn-ghost" onclick="sellerRestockProductId=null;renderAccount()" style="font-size:13px;padding:7px 14px">Hủy</button>'+
    '</div>'+
    (hist.length?'<div style="margin-top:10px;font-size:12px;color:var(--text-soft)">Lần nhập gần nhất: '+hist.map(h=>'<b>+'+h.qty+'</b> ('+escHtml(h.date)+')').join(' · ')+'</div>':'')+
  '</div>';
}

function sellerProductForm(productId){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s)return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const isEdit=!!productId;
  const p=isEdit?(s.products||[]).find(x=>x.id===productId):null;
  const v=(f,def='')=>escHtml(String((p?p[f]:null)??def));
  const curAud=p?(p.aud||[]):[];
  const curGenre=p?(p.genre||'sgk'):'sgk';
  const curLang=p?(p.lang||'vi'):'vi';
  const curStatus=p?(p.status||'active'):'active';
  const disc=(p&&p.oldPrice>0)?Math.round((1-p.price/p.oldPrice)*100):0;
  const imgCnt=p?p.imageCount||1:1;

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">'+
      '<button onclick="acctTab=\'seller-products\';sellerEditProductId=null;renderAccount()" class="btn-ghost" style="padding:5px 12px;font-size:13px">← Danh sách</button>'+
      '<h3 style="margin:0">'+(isEdit?'Chỉnh sửa Sách':'Thêm Sách Mới')+'</h3>'+
    '</div>'+
    // Basic info
    '<div style="font-weight:600;font-size:14px;margin-bottom:14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">📋 Thông tin cơ bản</div>'+
    '<div class="form-row">'+
      '<div class="form-field" style="flex:2"><label>Tên sách <span style="color:var(--ink)">*</span></label><input id="pfName" value="'+v('name')+'" placeholder="Nhập tên đầy đủ của sách"></div>'+
      '<div class="form-field"><label>Tác giả <span style="color:var(--ink)">*</span></label><input id="pfBy" value="'+v('by')+'" placeholder="Tên tác giả / nhiều tác giả"></div>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Nhà xuất bản</label><input id="pfNxb" value="'+v('nxb')+'" placeholder="VD: NXB Giáo dục Việt Nam"></div>'+
      '<div class="form-field"><label>ISBN</label><input id="pfIsbn" value="'+v('isbn')+'" placeholder="978-..."></div>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Năm xuất bản</label><input id="pfYear" type="number" value="'+(p?p.year||'':'')+'" placeholder="2024" min="1900" max="2030"></div>'+
      '<div class="form-field"><label>Số trang</label><input id="pfPages" type="number" value="'+(p?p.pages||'':'')+'" placeholder="256" min="0"></div>'+
      '<div class="form-field"><label>Ngôn ngữ</label><select id="pfLang">'+SELLER_LANG.map(l=>'<option value="'+l.k+'"'+(curLang===l.k?' selected':'')+'>'+l.lbl+'</option>').join('')+'</select></div>'+
    '</div>'+
    // Category
    '<div style="font-weight:600;font-size:14px;margin:20px 0 14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">🏷 Phân loại</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Thể loại <span style="color:var(--ink)">*</span></label>'+
        '<select id="pfGenre">'+SELLER_GENRE.map(g=>'<option value="'+g.k+'"'+(curGenre===g.k?' selected':'')+'>'+g.lbl+'</option>').join('')+'</select>'+
      '</div>'+
      '<div class="form-field"><label>Đối tượng độc giả <span style="color:var(--ink)">*</span></label>'+
        '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:6px">'+
          SELLER_AUD.map(a=>'<label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" id="pfAud_'+a.k+'"'+(curAud.includes(a.k)?' checked':'')+'>'+a.lbl+'</label>').join('')+
        '</div>'+
      '</div>'+
    '</div>'+
    // Description
    '<div style="font-weight:600;font-size:14px;margin:20px 0 14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">📝 Mô tả sản phẩm</div>'+
    '<div class="form-field"><textarea id="pfDesc" rows="4" placeholder="Mô tả nội dung sách, ưu điểm nổi bật, đối tượng phù hợp...">'+escHtml(p?p.desc||'':'')+'</textarea></div>'+
    // Pricing & inventory
    '<div style="font-weight:600;font-size:14px;margin:20px 0 14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">💰 Giá & Tồn kho</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Giá bán <span style="color:var(--ink)">*</span></label><input id="pfPrice" type="number" value="'+(p?p.price||'':'')+'" placeholder="85000" min="0" oninput="pfCalcDisc()"></div>'+
      '<div class="form-field"><label>Giá gốc (để hiện giảm giá)</label><input id="pfOldPrice" type="number" value="'+(p?p.oldPrice||'':'')+'" placeholder="110000" min="0" oninput="pfCalcDisc()"></div>'+
      '<div class="form-field"><label>% Giảm giá</label>'+
        '<div id="pfDiscDisplay" style="padding:9px 12px;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;font-weight:600;color:'+(disc>0?'#e74c3c':'var(--text-soft)')+'">'+(disc>0?'-'+disc+'%':'—')+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="form-field" style="max-width:200px"><label>Số lượng tồn kho <span style="color:var(--ink)">*</span></label><input id="pfStock" type="number" value="'+(p?p.stock:0)+'" min="0"></div>'+
    // Images (demo)
    '<div style="font-weight:600;font-size:14px;margin:20px 0 14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">🖼 Ảnh bìa & ảnh bổ sung</div>'+
    '<div style="background:#f5f0eb;border:1.5px dashed var(--line);border-radius:10px;padding:16px">'+
      '<p style="font-size:12.5px;color:var(--text-soft);margin:0 0 12px">Demo: dùng số lượng ảnh. Bản production sẽ có upload file thực tế.</p>'+
      '<div class="form-field" style="max-width:180px"><label>Số ảnh (1–10)</label><input id="pfImageCount" type="number" value="'+imgCnt+'" min="1" max="10" oninput="pfRenderSlots()"></div>'+
      '<div id="pfImageSlots" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">'+
        Array.from({length:imgCnt},(_,i)=>'<div style="width:60px;height:80px;background:#d0c8bf;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--text-soft);font-size:11px;font-weight:500">'+(i===0?'Bìa':(i+1))+'</div>').join('')+
      '</div>'+
    '</div>'+
    // Status
    '<div style="font-weight:600;font-size:14px;margin:20px 0 14px;padding-bottom:8px;border-bottom:1.5px solid var(--line)">📢 Trạng thái đăng bán</div>'+
    '<div style="display:flex;gap:14px;flex-wrap:wrap">'+
      '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:12px 16px;border:1.5px solid '+(curStatus==='active'?'#27ae60':'var(--line)')+';border-radius:10px;background:'+(curStatus==='active'?'#27ae6010':'transparent')+'">'+
        '<input type="radio" name="pfStatus" value="active" '+(curStatus==='active'?'checked':'')+' style="cursor:pointer">'+
        '<div><div style="font-weight:600;font-size:13.5px">Đăng ngay</div><div style="font-size:12px;color:var(--text-soft)">Hiển thị trên cửa hàng</div></div>'+
      '</label>'+
      '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:12px 16px;border:1.5px solid '+(curStatus==='draft'?'#7f8c8d':'var(--line)')+';border-radius:10px;background:'+(curStatus==='draft'?'#7f8c8d10':'transparent')+'">'+
        '<input type="radio" name="pfStatus" value="draft" '+(curStatus==='draft'?'checked':'')+' style="cursor:pointer">'+
        '<div><div style="font-weight:600;font-size:13.5px">Lưu nháp</div><div style="font-size:12px;color:var(--text-soft)">Ẩn tạm, chỉ bạn thấy</div></div>'+
      '</label>'+
    '</div>'+
    '<div style="display:flex;gap:10px;margin-top:24px;padding-top:16px;border-top:1.5px solid var(--line)">'+
      '<button class="btn-primary" onclick="doSellerSaveProduct('+(isEdit?'\''+productId+'\'':'null')+')" style="font-size:13.5px;padding:10px 24px">'+(isEdit?'💾 Lưu thay đổi':'✓ Lưu sản phẩm')+'</button>'+
      '<button class="btn-ghost" onclick="acctTab=\'seller-products\';sellerEditProductId=null;renderAccount()">Hủy</button>'+
    '</div>'+
  '</div>';
}

function pfCalcDisc(){
  const price=parseFloat((document.getElementById('pfPrice')||{}).value)||0;
  const old=parseFloat((document.getElementById('pfOldPrice')||{}).value)||0;
  const disc=price>0&&old>price?Math.round((1-price/old)*100):0;
  const el=document.getElementById('pfDiscDisplay');
  if(el){el.textContent=disc>0?('-'+disc+'%'):'—';el.style.color=disc>0?'#e74c3c':'var(--text-soft)';}
}
function pfRenderSlots(){
  const cnt=Math.max(1,Math.min(10,parseInt((document.getElementById('pfImageCount')||{}).value)||1));
  const el=document.getElementById('pfImageSlots');
  if(el)el.innerHTML=Array.from({length:cnt},(_,i)=>'<div style="width:60px;height:80px;background:#d0c8bf;border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--text-soft);font-size:11px;font-weight:500">'+(i===0?'Bìa':(i+1))+'</div>').join('');
}

function sellerProductImport(){
  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">'+
      '<button onclick="acctTab=\'seller-products\';renderAccount()" class="btn-ghost" style="padding:5px 12px;font-size:13px">← Danh sách</button>'+
      '<h3 style="margin:0">Nhập sản phẩm từ file CSV</h3>'+
    '</div>'+
    '<div style="background:#f0f9ff;border:1.5px solid #b2d8f0;border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:13.5px;line-height:1.7">'+
      '<b>📋 Cấu trúc CSV (13 cột, không có dòng tiêu đề):</b><br>'+
      '<code style="font-size:11.5px;background:#e8f5ff;padding:4px 8px;border-radius:4px;display:inline-block;margin:6px 0">tên_sách, tác_giả, nxb, isbn, năm_xb, số_trang, ngôn_ngữ, thể_loại, đối_tượng, mô_tả, giá_bán, giá_gốc, tồn_kho</code><br>'+
      '• Thể loại: <b>sgk / thamkhao / vanhoc / thieunhi / kynang / ngoaingu</b><br>'+
      '• Đối tượng: <b>tieuhoc / thcs / thpt / sinhvien / giaovien</b> (phân cách bằng dấu <b>|</b>)<br>'+
      '• Ngôn ngữ: <b>vi / en / bilingual</b> · Giá gốc = 0 nếu không có giảm giá'+
    '</div>'+
    '<div style="margin-bottom:14px"><a onclick="doSellerDownloadCSVTemplate()" style="color:var(--ink);font-weight:600;cursor:pointer;font-size:13.5px;text-decoration:underline">⬇ Tải file mẫu CSV</a></div>'+
    '<div class="form-field">'+
      '<label>Dán nội dung CSV vào đây</label>'+
      '<textarea id="csvData" rows="8" placeholder="Sách GK Toán 6 Cánh Diều,Đỗ Đức Thái,NXB ĐH Sư phạm,978-604-0-98765-4,2024,168,vi,sgk,thcs|thpt,Sách giáo khoa Toán 6.,32000,0,28"></textarea>'+
    '</div>'+
    '<div style="display:flex;gap:10px;margin-top:4px">'+
      '<button class="btn-primary" onclick="doSellerImportCSV()" style="font-size:13.5px">📥 Nhập dữ liệu</button>'+
      '<button class="btn-ghost" onclick="acctTab=\'seller-products\';renderAccount()">Hủy</button>'+
    '</div>'+
  '</div>';
}

/* ── Seller Product Action Functions ── */
function doSellerSaveProduct(productId){
  const name=((document.getElementById('pfName')||{}).value||'').trim();
  const by=((document.getElementById('pfBy')||{}).value||'').trim();
  if(!name){toast('Vui lòng nhập tên sách.');return;}
  if(!by){toast('Vui lòng nhập tên tác giả.');return;}
  const nxb=((document.getElementById('pfNxb')||{}).value||'').trim();
  const isbn=((document.getElementById('pfIsbn')||{}).value||'').trim();
  const year=parseInt((document.getElementById('pfYear')||{}).value||0)||0;
  const pages=parseInt((document.getElementById('pfPages')||{}).value||0)||0;
  const lang=(document.getElementById('pfLang')||{}).value||'vi';
  const genre=(document.getElementById('pfGenre')||{}).value||'sgk';
  const aud=SELLER_AUD.map(a=>a.k).filter(k=>(document.getElementById('pfAud_'+k)||{}).checked);
  if(!aud.length){toast('Vui lòng chọn ít nhất một đối tượng độc giả.');return;}
  const desc=((document.getElementById('pfDesc')||{}).value||'').trim();
  const price=parseFloat((document.getElementById('pfPrice')||{}).value)||0;
  if(price<=0){toast('Vui lòng nhập giá bán hợp lệ (lớn hơn 0).');return;}
  const oldPrice=parseFloat((document.getElementById('pfOldPrice')||{}).value)||0;
  const stock=Math.max(0,parseInt((document.getElementById('pfStock')||{}).value||0)||0);
  const imageCount=Math.max(1,Math.min(10,parseInt((document.getElementById('pfImageCount')||{}).value||1)||1));
  const statusEl=document.querySelector('input[name="pfStatus"]:checked');
  const rawStatus=statusEl?statusEl.value:'active';
  const status=stock===0&&rawStatus==='active'?'outofstock':rawStatus;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);
  if(sIdx===-1)return;
  activeSellers[sIdx].products=activeSellers[sIdx].products||[];
  const today=todayStr();
  if(productId){
    const pIdx=activeSellers[sIdx].products.findIndex(x=>x.id===productId);
    if(pIdx===-1){toast('Không tìm thấy sản phẩm.');return;}
    const old=activeSellers[sIdx].products[pIdx];
    activeSellers[sIdx].products[pIdx]={...old,name,by,nxb,isbn,year,pages,lang,genre,aud,desc,price,oldPrice,stock,imageCount,status,updatedAt:today};
    toast('✓ Đã cập nhật sản phẩm!');
  } else {
    activeSellers[sIdx].products.unshift({id:'slp-'+Date.now().toString(36),name,by,nxb,isbn,year,pages,lang,genre,aud,desc,price,oldPrice,stock,sold:0,rating:0,ratingCount:0,imageCount,status,createdAt:today,updatedAt:today,restockHistory:[]});
    activeSellers[sIdx].totalProducts=(activeSellers[sIdx].totalProducts||0)+1;
    addNotif('Sản phẩm mới "'+name+'" đã được thêm vào gian hàng.');
    toast('✓ Đã thêm sản phẩm mới!');
  }
  saveActiveSellers();
  acctTab='seller-products';sellerEditProductId=null;
  renderAccount();
}

function doSellerDeleteProduct(id){
  if(!confirm('Xóa sản phẩm này? Hành động không thể hoàn tác.'))return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=activeSellers[sIdx].products.findIndex(x=>x.id===id);if(pIdx===-1)return;
  const name=activeSellers[sIdx].products[pIdx].name;
  activeSellers[sIdx].products.splice(pIdx,1);
  activeSellers[sIdx].totalProducts=Math.max(0,(activeSellers[sIdx].totalProducts||1)-1);
  saveActiveSellers();
  sellerSelectedProds=sellerSelectedProds.filter(x=>x!==id);
  if(sellerRestockProductId===id)sellerRestockProductId=null;
  toast('Đã xóa: '+name);renderAccount();
}

function doSellerToggleRestock(id){
  sellerRestockProductId=(sellerRestockProductId===id?null:id);renderAccount();
}

function doSellerRestockProduct(id){
  const qty=parseInt((document.getElementById('rsQty_'+id)||{}).value||0);
  const reason=((document.getElementById('rsReason_'+id)||{}).value||'Nhập hàng').trim();
  if(!qty||qty<=0){toast('Vui lòng nhập số lượng nhập hàng hợp lệ.');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=activeSellers[sIdx].products.findIndex(x=>x.id===id);if(pIdx===-1)return;
  const p=activeSellers[sIdx].products[pIdx];
  p.stock+=qty;
  p.restockHistory=p.restockHistory||[];
  p.restockHistory.push({qty,reason,date:todayStr()});
  if(p.status==='outofstock')p.status='active';
  p.updatedAt=todayStr();
  saveActiveSellers();
  sellerRestockProductId=null;
  toast('✓ Đã nhập thêm '+qty+' cuốn — tồn kho mới: '+p.stock);
  addNotif('Nhập hàng thành công: +'+qty+' "'+p.name+'" — tồn kho: '+p.stock);
  renderAccount();
}

function doSellerToggleSelect(id){
  const i=sellerSelectedProds.indexOf(id);
  if(i===-1)sellerSelectedProds.push(id);else sellerSelectedProds.splice(i,1);
  renderAccount();
}

function doSellerToggleSelectAll(){
  const s=activeSellers.find(x=>x.email===user.email);
  let prods=(s?s.products||[]:[]).slice();
  if(sellerProductSearch){const q=sellerProductSearch.toLowerCase();prods=prods.filter(p=>p.name.toLowerCase().includes(q)||(p.by||'').toLowerCase().includes(q));}
  if(sellerProductStatusFilter==='outofstock')prods=prods.filter(p=>p.stock===0);
  else if(sellerProductStatusFilter!=='all')prods=prods.filter(p=>p.status===sellerProductStatusFilter);
  const ids=prods.map(p=>p.id);
  const allSel=ids.every(id=>sellerSelectedProds.includes(id));
  if(allSel)sellerSelectedProds=sellerSelectedProds.filter(id=>!ids.includes(id));
  else ids.forEach(id=>{if(!sellerSelectedProds.includes(id))sellerSelectedProds.push(id);});
  renderAccount();
}

function doSellerBulkPriceUpdate(){
  const newPrice=parseFloat((document.getElementById('bulkPriceInput')||{}).value||0);
  if(!newPrice||newPrice<=0){toast('Nhập giá mới hợp lệ (lớn hơn 0).');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  let cnt=0;
  (activeSellers[sIdx].products||[]).forEach(p=>{if(sellerSelectedProds.includes(p.id)){p.price=newPrice;p.updatedAt=todayStr();cnt++;}});
  saveActiveSellers();sellerSelectedProds=[];
  toast('✓ Đã cập nhật giá '+fmtBig(newPrice)+'đ cho '+cnt+' sản phẩm');renderAccount();
}

function doSellerBulkStatusUpdate(newStatus){
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  let cnt=0;
  (activeSellers[sIdx].products||[]).forEach(p=>{
    if(sellerSelectedProds.includes(p.id)){p.status=newStatus==='active'&&p.stock===0?'outofstock':newStatus;p.updatedAt=todayStr();cnt++;}
  });
  saveActiveSellers();sellerSelectedProds=[];
  const lbl={active:'Đang bán',draft:'Nháp',outofstock:'Hết hàng'}[newStatus]||newStatus;
  toast('✓ Đã chuyển '+cnt+' sản phẩm → "'+lbl+'"');renderAccount();
}

function doSellerBulkDelete(){
  if(!sellerSelectedProds.length)return;
  if(!confirm('Xóa '+sellerSelectedProds.length+' sản phẩm đã chọn? Hành động không thể hoàn tác.'))return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const cnt=sellerSelectedProds.length;
  activeSellers[sIdx].products=(activeSellers[sIdx].products||[]).filter(p=>!sellerSelectedProds.includes(p.id));
  activeSellers[sIdx].totalProducts=Math.max(0,(activeSellers[sIdx].totalProducts||cnt)-cnt);
  saveActiveSellers();sellerSelectedProds=[];
  toast('✓ Đã xóa '+cnt+' sản phẩm');renderAccount();
}

function doSellerImportCSV(){
  const raw=((document.getElementById('csvData')||{}).value||'').trim();
  const lines=raw.split('\n').filter(l=>l.trim()&&!l.startsWith('#'));
  if(!lines.length){toast('Không có dữ liệu CSV nào để nhập.');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  activeSellers[sIdx].products=activeSellers[sIdx].products||[];
  let ok=0,err=0;const today=todayStr();
  lines.forEach((line,li)=>{
    const cols=line.split(',').map(s=>s.trim());
    if(cols.length<13){err++;return;}
    const[name,by,nxb,isbn,year,pages,lang,genre,audStr,desc,priceStr,oldPriceStr,stockStr]=cols;
    if(!name||!priceStr){err++;return;}
    const price=parseFloat(priceStr)||0;if(price<=0){err++;return;}
    const aud=audStr?audStr.split('|').map(s=>s.trim()).filter(Boolean):['thcs'];
    const st=parseInt(stockStr)>0?'active':'outofstock';
    activeSellers[sIdx].products.unshift({id:'slp-csv-'+today.replace(/\//g,'')+'-'+li,name,by:by||'',nxb:nxb||'',isbn:isbn||'',year:parseInt(year)||2024,pages:parseInt(pages)||0,lang:lang||'vi',genre:genre||'thamkhao',aud,desc:desc||'',price,oldPrice:parseFloat(oldPriceStr)||0,stock:parseInt(stockStr)||0,sold:0,rating:0,ratingCount:0,imageCount:1,status:st,createdAt:today,updatedAt:today,restockHistory:[]});
    ok++;
  });
  activeSellers[sIdx].totalProducts=(activeSellers[sIdx].totalProducts||0)+ok;
  saveActiveSellers();
  toast('✓ Đã nhập '+ok+' sản phẩm'+(err?' ('+err+' dòng lỗi bỏ qua)':'')+'!');
  acctTab='seller-products';renderAccount();
}

function doSellerDownloadCSVTemplate(){
  const hdr='tên_sách,tác_giả,nxb,isbn,năm_xb,số_trang,ngôn_ngữ,thể_loại,đối_tượng,mô_tả,giá_bán,giá_gốc,tồn_kho';
  const r1='Sách GK Toán 6 Cánh Diều,Đỗ Đức Thái,NXB ĐH Sư phạm,978-604-0-98765-4,2024,168,vi,sgk,thcs|thpt,Sách giáo khoa Toán 6 bộ Cánh Diều.,32000,0,28';
  const r2='Atomic Habits – Thói Quen Nguyên Tử,James Clear,NXB Lao động,978-604-3-34567-8,2023,344,vi,kynang,thpt|sinhvien,Sách về xây dựng thói quen tốt.,115000,145000,15';
  const blob=new Blob(['﻿'+hdr+'\n'+r1+'\n'+r2],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='mau-nhap-sach-edumart.csv';
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
}

/* ── 6b. Ebook Management ── */
function sellerEbookList(){
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  const ebooks=(sIdx!==-1&&activeSellers[sIdx].ebooks)||[];
  const filtered=sellerEbookStatusFilter==='all'?ebooks:ebooks.filter(e=>e.status===sellerEbookStatusFilter);
  const tabs=[['all','Tất cả'],['active','Hoạt động'],['draft','Nháp'],['paused','Tạm dừng']];
  const statusLabel={active:'<span class="badge badge-success">Hoạt động</span>',draft:'<span class="badge badge-secondary">Nháp</span>',paused:'<span class="badge badge-warning">Tạm dừng</span>'};
  const formatBadge=f=>`<span style="font-size:11px;background:#e8f4fd;color:#1565c0;border-radius:4px;padding:1px 6px;margin-right:3px;">${escHtml(f)}</span>`;
  const rows=filtered.map(e=>`
    <tr>
      <td><strong>${escHtml(e.name)}</strong><br><small style="color:#666;">${escHtml(e.by)}</small></td>
      <td>${e.formats.map(formatBadge).join('')}</td>
      <td style="text-align:right;">${fmtBig(e.price)}đ</td>
      <td style="text-align:right;">${fmtBig(e.totalDownloads)}</td>
      <td style="text-align:right;">${fmtBig(e.revenue)}đ</td>
      <td>${statusLabel[e.status]||e.status}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary" onclick="sellerEditEbookId='${e.id}';acctTab='seller-ebook-form';renderAccount();" title="Chỉnh sửa">✏️</button>
        <button class="btn btn-sm btn-outline-info" onclick="sellerEbookStatsId='${e.id}';acctTab='seller-ebook-stats';renderAccount();" title="Thống kê">📊</button>
        <button class="btn btn-sm btn-outline-${e.status==='active'?'warning':'success'}" onclick="doSellerToggleEbookStatus('${e.id}')" title="${e.status==='active'?'Tạm dừng':'Kích hoạt'}">${e.status==='active'?'⏸':'▶'}</button>
        <button class="btn btn-sm btn-outline-danger" onclick="doSellerDeleteEbook('${e.id}')" title="Xóa">🗑</button>
      </td>
    </tr>`).join('');
  return `
<div class="seller-section">
  <div class="seller-section-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
    <h2 style="margin:0;font-size:1.3rem;font-weight:700;">Quản lý Ebook</h2>
    <button class="btn btn-primary" onclick="sellerEditEbookId=null;acctTab='seller-ebook-form';renderAccount();">+ Thêm Ebook mới</button>
  </div>
  <div class="filter-tabs" style="margin-bottom:16px;">
    ${tabs.map(([k,l])=>`<button class="filter-tab${sellerEbookStatusFilter===k?' active':''}" onclick="sellerEbookStatusFilter='${k}';renderAccount();">${l}<span class="tab-count">${k==='all'?ebooks.length:ebooks.filter(e=>e.status===k).length}</span></button>`).join('')}
  </div>
  ${filtered.length===0?`<div class="empty-state"><p>Không có ebook nào${sellerEbookStatusFilter!=='all'?' trong bộ lọc này':''}.</p><button class="btn btn-primary" onclick="sellerEditEbookId=null;acctTab='seller-ebook-form';renderAccount();">Thêm ebook đầu tiên</button></div>`:`
  <div class="table-responsive">
    <table class="admin-table">
      <thead><tr><th>Tên Ebook</th><th>Định dạng</th><th>Giá</th><th>Lượt tải</th><th>Doanh thu</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`}
</div>`;
}

function sellerEbookForm(ebookId){
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  const ebooks=(sIdx!==-1&&activeSellers[sIdx].ebooks)||[];
  const eb=ebookId?ebooks.find(e=>e.id===ebookId):null;
  const isEdit=!!eb;
  const v=k=>eb?escHtml(String(eb[k]??'')):'';
  const chk=(arr,val)=>arr&&arr.includes(val)?'checked':'';
  const audArr=eb?eb.aud:[];
  const fmtArr=eb?eb.formats:['PDF'];
  const genreOpts=[['thamkhao','Tham khảo'],['sgk','Sách giáo khoa'],['vanhoc','Văn học'],['thieunhi','Thiếu nhi'],['kynang','Kỹ năng'],['ngoaingu','Ngoại ngữ'],['khoa-hoc','Khoa học']];
  const audOpts=[['tieuhoc','Tiểu học'],['thcs','THCS'],['thpt','THPT'],['sinhvien','Sinh viên'],['giaovien','Giáo viên'],['nguoilon','Người lớn']];
  return `
<div class="seller-section">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
    <button class="btn btn-sm btn-outline-secondary" onclick="acctTab='seller-ebooks';renderAccount();">← Quay lại</button>
    <h2 style="margin:0;font-size:1.3rem;font-weight:700;">${isEdit?'Chỉnh sửa Ebook':'Thêm Ebook mới'}</h2>
  </div>
  <form onsubmit="return false;">
    <!-- Thông tin cơ bản -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">1. Thông tin cơ bản</h3>
      <div class="form-row" style="display:grid;grid-template-columns:1fr;gap:12px;">
        <div><label class="form-label">Tên Ebook <span style="color:red">*</span></label><input id="sef-name" class="form-control" value="${v('name')}" placeholder="Nhập tên ebook..."></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div><label class="form-label">Tác giả <span style="color:red">*</span></label><input id="sef-by" class="form-control" value="${v('by')}" placeholder="Tên tác giả"></div>
          <div><label class="form-label">Nhà xuất bản</label><input id="sef-nxb" class="form-control" value="${v('nxb')}" placeholder="NXB..."></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
          <div><label class="form-label">Số trang</label><input id="sef-pages" type="number" class="form-control" value="${v('pages')}" min="1" placeholder="VD: 280"></div>
          <div><label class="form-label">Số trang đọc thử</label><input id="sef-preview" type="number" class="form-control" value="${v('previewPages')}" min="0" placeholder="VD: 30"></div>
          <div><label class="form-label">Dung lượng (MB)</label><input id="sef-size" type="number" step="0.1" class="form-control" value="${v('size')}" min="0.1" placeholder="VD: 8.5"></div>
        </div>
      </div>
    </div>
    <!-- Phân loại -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">2. Phân loại</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <label class="form-label">Thể loại <span style="color:red">*</span></label>
          <select id="sef-genre" class="form-control">
            ${genreOpts.map(([k,l])=>`<option value="${k}"${eb&&eb.genre===k?' selected':''}>${l}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Đối tượng</label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;">
            ${audOpts.map(([k,l])=>`<label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="checkbox" id="sef-aud-${k}" ${chk(audArr,k)}> ${l}</label>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <!-- Mô tả -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">3. Mô tả</h3>
      <div style="margin-bottom:12px;">
        <label class="form-label">Mô tả ngắn <span style="color:red">*</span></label>
        <textarea id="sef-desc" class="form-control" rows="4" placeholder="Giới thiệu nội dung ebook...">${eb?escHtml(eb.desc):''}</textarea>
      </div>
      <div>
        <label class="form-label">Mục lục</label>
        <textarea id="sef-toc" class="form-control" rows="6" placeholder="VD:\nChương 1: ...\nChương 2: ...">${eb?escHtml(eb.tableOfContents||''):''}</textarea>
      </div>
    </div>
    <!-- Định dạng & File -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">4. Định dạng & File</h3>
      <div style="margin-bottom:16px;">
        <label class="form-label">Định dạng cung cấp <span style="color:red">*</span></label>
        <div style="display:flex;gap:20px;margin-top:4px;">
          ${['PDF','EPUB','MOBI'].map(f=>`<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:${fmtArr.includes(f)?'600':'400'};"><input type="checkbox" id="sef-fmt-${f}" ${chk(fmtArr,f)}> ${f}</label>`).join('')}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
        ${['PDF','EPUB','MOBI'].map(f=>`
        <div>
          <label class="form-label">Upload file ${f}</label>
          <div style="border:2px dashed #ccc;border-radius:8px;padding:16px;text-align:center;color:#999;cursor:pointer;" onclick="toast('Demo: chức năng upload file sẽ tích hợp với server thực tế.');">
            <div style="font-size:24px;">📄</div>
            <div style="font-size:12px;">${isEdit&&fmtArr.includes(f)?`<span style="color:#388e3c;">✓ Đã có file ${f}</span>`:'Kéo thả hoặc click để chọn'}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Ảnh bìa -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">5. Ảnh bìa</h3>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <div style="width:120px;height:160px;border:2px dashed #1565c0;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#f8f9ff;" onclick="toast('Demo: upload ảnh bìa sẽ tích hợp với server thực tế.');">
          <span style="font-size:32px;">📗</span>
          <span style="font-size:11px;color:#666;margin-top:4px;">${isEdit?'Thay ảnh bìa':'+ Thêm ảnh bìa'}</span>
        </div>
        ${isEdit?`<div style="font-size:12px;color:#666;align-self:flex-end;padding-bottom:8px;">Ảnh hiện tại: <em>ebook-cover-${escHtml(eb.id)}.jpg</em></div>`:''}
      </div>
    </div>
    <!-- Giá & Trạng thái -->
    <div class="form-section-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;margin-bottom:20px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;color:#1565c0;">6. Giá & Trạng thái</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <label class="form-label">Giá bán (VNĐ) <span style="color:red">*</span></label>
          <input id="sef-price" type="number" class="form-control" value="${eb?eb.price:''}" min="0" step="1000" placeholder="VD: 49000">
        </div>
        <div>
          <label class="form-label">Trạng thái</label>
          <div style="display:flex;gap:16px;margin-top:6px;">
            <label style="cursor:pointer;"><input type="radio" name="sef-status" value="active" ${!isEdit||eb.status==='active'?'checked':''}> Hoạt động</label>
            <label style="cursor:pointer;"><input type="radio" name="sef-status" value="draft" ${isEdit&&eb.status==='draft'?'checked':''}> Nháp</label>
            <label style="cursor:pointer;"><input type="radio" name="sef-status" value="paused" ${isEdit&&eb.status==='paused'?'checked':''}> Tạm dừng</label>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:12px;justify-content:flex-end;">
      <button type="button" class="btn btn-outline-secondary" onclick="acctTab='seller-ebooks';renderAccount();">Hủy</button>
      <button type="button" class="btn btn-primary" onclick="doSellerSaveEbook(${isEdit?`'${eb.id}'`:null});">💾 ${isEdit?'Lưu thay đổi':'Thêm Ebook'}</button>
    </div>
  </form>
</div>`;
}

function sellerEbookStats(ebookId){
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  const ebooks=(sIdx!==-1&&activeSellers[sIdx].ebooks)||[];
  const eb=ebooks.find(e=>e.id===ebookId);
  if(!eb) return `<div class="seller-section"><p>Không tìm thấy ebook.</p><button class="btn btn-outline-secondary" onclick="acctTab='seller-ebooks';renderAccount();">← Quay lại</button></div>`;
  const chart=eb.revenueChart||[0,0,0,0,0,0,0];
  const maxVal=Math.max(...chart,1);
  const days=['T2','T3','T4','T5','T6','T7','CN'];
  const funnelPct=eb.previewCount>0?Math.round((eb.purchaseCount/eb.previewCount)*100):0;
  const fmtTotal=eb.downloadsByFormat||{PDF:0,EPUB:0,MOBI:0};
  const fmtPct=f=>eb.totalDownloads>0?Math.round((fmtTotal[f]/eb.totalDownloads)*100):0;
  return `
<div class="seller-section">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
    <button class="btn btn-sm btn-outline-secondary" onclick="acctTab='seller-ebooks';renderAccount();">← Quay lại</button>
    <h2 style="margin:0;font-size:1.2rem;font-weight:700;">Thống kê: ${escHtml(eb.name)}</h2>
  </div>
  <!-- KPI cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
    <div class="stat-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:18px;text-align:center;">
      <div style="font-size:28px;font-weight:700;color:#1565c0;">${fmtBig(eb.totalDownloads)}</div>
      <div style="font-size:13px;color:#666;margin-top:4px;">Tổng lượt tải</div>
    </div>
    <div class="stat-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:18px;text-align:center;">
      <div style="font-size:28px;font-weight:700;color:#2e7d32;">${fmtMil(eb.revenue)}đ</div>
      <div style="font-size:13px;color:#666;margin-top:4px;">Tổng doanh thu</div>
    </div>
    <div class="stat-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:18px;text-align:center;">
      <div style="font-size:28px;font-weight:700;color:#e65100;">${fmtBig(eb.previewCount)}</div>
      <div style="font-size:13px;color:#666;margin-top:4px;">Lượt đọc thử</div>
    </div>
    <div class="stat-card" style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:18px;text-align:center;">
      <div style="font-size:28px;font-weight:700;color:#6a1b9a;">${funnelPct}%</div>
      <div style="font-size:13px;color:#666;margin-top:4px;">Tỷ lệ đọc thử → mua</div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
    <!-- Lượt tải theo định dạng -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;">Lượt tải theo định dạng</h3>
      ${['PDF','EPUB','MOBI'].map(f=>`
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <span style="font-size:13px;font-weight:600;">${f}</span>
          <span style="font-size:13px;color:#666;">${fmtBig(fmtTotal[f]||0)} lượt (${fmtPct(f)}%)</span>
        </div>
        <div style="background:#f0f0f0;border-radius:4px;height:10px;">
          <div style="background:#1565c0;height:10px;border-radius:4px;width:${fmtPct(f)}%;"></div>
        </div>
      </div>`).join('')}
    </div>
    <!-- Funnel -->
    <div style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;">
      <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;">Phễu chuyển đổi</h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="background:#e3f2fd;border-radius:8px;padding:14px 16px;text-align:center;">
          <div style="font-size:20px;font-weight:700;color:#1565c0;">${fmtBig(eb.previewCount)}</div>
          <div style="font-size:12px;color:#666;">Lượt xem / đọc thử</div>
        </div>
        <div style="text-align:center;color:#999;font-size:18px;">↓ ${funnelPct}%</div>
        <div style="background:#e8f5e9;border-radius:8px;padding:14px 16px;text-align:center;">
          <div style="font-size:20px;font-weight:700;color:#2e7d32;">${fmtBig(eb.purchaseCount)}</div>
          <div style="font-size:12px;color:#666;">Lượt mua / tải</div>
        </div>
      </div>
    </div>
  </div>
  <!-- Revenue chart 7 days -->
  <div style="background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:20px;">
    <h3 style="font-size:1rem;font-weight:700;margin:0 0 16px;">Doanh thu 7 ngày gần nhất</h3>
    <div class="chart-wrap" style="display:flex;align-items:flex-end;gap:6px;height:160px;padding-bottom:24px;position:relative;">
      ${chart.map((val,i)=>{
        const h=Math.round((val/maxVal)*120);
        return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">
          <div style="font-size:10px;color:#666;margin-bottom:3px;">${val>0?fmtMil(val)+'đ':''}</div>
          <div style="width:100%;background:#1565c0;border-radius:4px 4px 0 0;height:${h}px;min-height:${val>0?4:0}px;"></div>
          <div style="font-size:11px;color:#888;margin-top:4px;">${days[i]}</div>
        </div>`;
      }).join('')}
    </div>
    <div style="text-align:center;font-size:13px;color:#388e3c;font-weight:600;">Tổng 7 ngày: ${fmtMil(chart.reduce((a,b)=>a+b,0))}đ</div>
  </div>
</div>`;
}

function doSellerSaveEbook(ebookId){
  const name=(document.getElementById('sef-name')||{}).value?.trim()||'';
  const by=(document.getElementById('sef-by')||{}).value?.trim()||'';
  const nxb=(document.getElementById('sef-nxb')||{}).value?.trim()||'';
  const genre=(document.getElementById('sef-genre')||{}).value||'thamkhao';
  const desc=(document.getElementById('sef-desc')||{}).value?.trim()||'';
  const toc=(document.getElementById('sef-toc')||{}).value?.trim()||'';
  const pages=parseInt((document.getElementById('sef-pages')||{}).value)||0;
  const previewPages=parseInt((document.getElementById('sef-preview')||{}).value)||0;
  const size=parseFloat((document.getElementById('sef-size')||{}).value)||0;
  const price=parseInt((document.getElementById('sef-price')||{}).value)||0;
  const statusEl=document.querySelector('input[name="sef-status"]:checked');
  const status=statusEl?statusEl.value:'draft';
  if(!name){toast('Vui lòng nhập tên ebook.');return;}
  if(!by){toast('Vui lòng nhập tên tác giả.');return;}
  if(!desc){toast('Vui lòng nhập mô tả.');return;}
  if(price<=0){toast('Vui lòng nhập giá hợp lệ.');return;}
  const fmtArr=['PDF','EPUB','MOBI'].filter(f=>{const el=document.getElementById('sef-fmt-'+f);return el&&el.checked;});
  if(fmtArr.length===0){toast('Vui lòng chọn ít nhất một định dạng.');return;}
  const audOpts=['tieuhoc','thcs','thpt','sinhvien','giaovien','nguoilon'];
  const aud=audOpts.filter(a=>{const el=document.getElementById('sef-aud-'+a);return el&&el.checked;});
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  if(sIdx===-1){toast('Lỗi: không tìm thấy tài khoản seller.');return;}
  if(!activeSellers[sIdx].ebooks) activeSellers[sIdx].ebooks=[];
  const today=todayStr();
  if(ebookId){
    const eIdx=activeSellers[sIdx].ebooks.findIndex(e=>e.id===ebookId);
    if(eIdx===-1){toast('Không tìm thấy ebook.');return;}
    Object.assign(activeSellers[sIdx].ebooks[eIdx],{name,by,nxb,genre,aud,desc,tableOfContents:toc,pages,previewPages,size,price,formats:fmtArr,status,updatedAt:today});
    saveActiveSellers();
    toast('Đã cập nhật ebook thành công!');
  } else {
    const newEb={id:'sle-'+Date.now().toString(36),name,by,nxb,genre,aud,desc,tableOfContents:toc,pages,previewPages,size,price,formats:fmtArr,status,imageCount:0,totalDownloads:0,downloadsByFormat:{PDF:0,EPUB:0,MOBI:0},previewCount:0,purchaseCount:0,revenue:0,revenueChart:[0,0,0,0,0,0,0],createdAt:today,updatedAt:today};
    activeSellers[sIdx].ebooks.push(newEb);
    saveActiveSellers();
    toast('Đã thêm ebook mới!');
    addNotif('Ebook mới "'+name+'" đã được tạo.');
  }
  acctTab='seller-ebooks';
  renderAccount();
}

function doSellerDeleteEbook(ebookId){
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  if(sIdx===-1) return;
  const eb=(activeSellers[sIdx].ebooks||[]).find(e=>e.id===ebookId);
  if(!eb) return;
  if(!confirm('Xóa ebook "'+eb.name+'"?\nHành động này không thể khôi phục.')) return;
  activeSellers[sIdx].ebooks=activeSellers[sIdx].ebooks.filter(e=>e.id!==ebookId);
  saveActiveSellers();
  toast('Đã xóa ebook.');
  renderAccount();
}

function doSellerToggleEbookStatus(ebookId){
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  if(sIdx===-1) return;
  const eIdx=(activeSellers[sIdx].ebooks||[]).findIndex(e=>e.id===ebookId);
  if(eIdx===-1) return;
  const cur=activeSellers[sIdx].ebooks[eIdx].status;
  const next=cur==='active'?'paused':'active';
  activeSellers[sIdx].ebooks[eIdx].status=next;
  activeSellers[sIdx].ebooks[eIdx].updatedAt=todayStr();
  saveActiveSellers();
  toast(next==='active'?'Đã kích hoạt ebook.':'Đã tạm dừng ebook.');
  renderAccount();
}

/* ── 6c. VPP (Stationery) Management ── */
const VPP_CAT=[
  {k:'viet',lbl:'Bút viết'},
  {k:'giay',lbl:'Giấy & Vở'},
  {k:'giam',lbl:'Kẹp & Bìa hồ sơ'},
  {k:'bang',lbl:'Bảng & Phấn'},
  {k:'cat', lbl:'Cắt & Dán'},
  {k:'muc', lbl:'Mực & Băng keo'},
  {k:'khac',lbl:'Khác'}
];
const VPP_CAT_LBL=Object.fromEntries(VPP_CAT.map(c=>[c.k,c.lbl]));
const VPP_UNITS=['Cái','Cây','Quyển','Hộp','Bộ','Tập','Cuộn'];
const VPP_LOW_DEFAULT=10;

function sellerVppList(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const all=s.vppProducts||[];
  let list=all.slice();
  if(sellerVppSearch){const q=sellerVppSearch.toLowerCase();list=list.filter(v=>v.name.toLowerCase().includes(q)||(v.brand||'').toLowerCase().includes(q));}
  if(sellerVppStatusFilter==='outofstock') list=list.filter(v=>v.stock===0);
  else if(sellerVppStatusFilter!=='all') list=list.filter(v=>v.status===sellerVppStatusFilter);

  const total=all.length;
  const activeCnt=all.filter(v=>v.status==='active').length;
  const draftCnt=all.filter(v=>v.status==='draft').length;
  const outCnt=all.filter(v=>v.stock===0).length;
  const lowStockItems=all.filter(v=>v.stock>0&&v.stock<=(v.lowStockThreshold||VPP_LOW_DEFAULT)&&v.status==='active');

  const stBadge={
    active:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#27ae6020;color:#27ae60;font-weight:600">Đang bán</span>',
    draft:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#95a5a620;color:#7f8c8d;font-weight:600">Nháp</span>',
    outofstock:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#e67e2220;color:#e67e22;font-weight:600">Hết hàng</span>'
  };

  const filterTabs=[['all','Tất cả',total],['active','Đang bán',activeCnt],['draft','Nháp',draftCnt],['outofstock','Hết hàng',outCnt]];

  const rows=list.length
    ?list.map(v=>{
      const thr=v.lowStockThreshold||VPP_LOW_DEFAULT;
      const stockClr=v.stock===0?'#e74c3c':v.stock<=thr?'#e67e22':'#27ae60';
      const lowWarn=v.stock>0&&v.stock<=thr?'<span title="Sắp hết hàng" style="margin-left:4px;font-size:11px;color:#e67e22">⚠</span>':'';
      const disc=v.oldPrice>0?Math.round((1-v.price/v.oldPrice)*100):0;
      const badge=v.stock===0&&v.status!=='draft'?stBadge.outofstock:(stBadge[v.status]||stBadge.draft);
      return '<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:10px 8px;width:40px">'+
          '<div style="width:36px;height:36px;background:#f0ebe420;border:1px solid var(--line);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px">'+
            (v.category==='viet'?'✏️':v.category==='giay'?'📋':v.category==='giam'?'📎':v.category==='bang'?'🖊️':v.category==='cat'?'✂️':v.category==='muc'?'🖨️':'📦')+
          '</div>'+
        '</td>'+
        '<td style="padding:10px 8px">'+
          '<div style="font-weight:600;font-size:13.5px;color:var(--ink-deep)">'+escHtml(v.name)+'</div>'+
          '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">'+
            (v.brand?escHtml(v.brand)+' · ':'')+
            '<span style="background:#f0ebe4;border-radius:4px;padding:1px 6px;font-size:11px">'+escHtml(VPP_CAT_LBL[v.category]||v.category)+'</span>'+
            ' · ĐVT: '+escHtml(v.unit||'Cái')+
          '</div>'+
        '</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<div style="font-weight:700;font-size:13.5px;color:var(--coral)">'+fmtBig(v.price)+'đ</div>'+
          (disc>0?'<div style="font-size:11px;color:var(--text-soft);text-decoration:line-through">'+fmtBig(v.oldPrice)+'đ</div>'+
            '<span style="font-size:10.5px;background:#e74c3c20;color:#e74c3c;padding:1px 5px;border-radius:4px">-'+disc+'%</span>':'')+
        '</td>'+
        '<td style="padding:10px 8px;text-align:center">'+
          '<span style="font-weight:700;font-size:14px;color:'+stockClr+'">'+v.stock+'</span>'+lowWarn+
          '<div style="font-size:10.5px;color:var(--text-soft)">ngưỡng: '+thr+'</div>'+
        '</td>'+
        '<td style="padding:10px 8px;text-align:center;color:var(--text-soft);font-size:13.5px">'+v.sold+'</td>'+
        '<td style="padding:10px 8px">'+badge+'</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<button title="Sửa" onclick="sellerEditVppId=\''+v.id+'\';acctTab=\'seller-vpp-form\';renderAccount()" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">✏</button>'+
          '<button title="Nhập hàng" onclick="doSellerToggleVppRestock(\''+v.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">📦</button>'+
          '<button title="Xóa" onclick="doSellerDeleteVpp(\''+v.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;cursor:pointer;color:#e74c3c">🗑</button>'+
        '</td>'+
      '</tr>'+
      (sellerRestockVppId===v.id?'<tr><td colspan="7" style="padding:0 8px 12px;background:#faf8f5">'+_sellerVppRestockInline(v)+'</td></tr>':'');
    }).join('')
    :'<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-soft);font-size:13.5px">Không tìm thấy sản phẩm VPP nào.</td></tr>';

  const lowWarnBanner=lowStockItems.length
    ?'<div style="background:#fff8e1;border:1.5px solid #ffe082;border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span style="font-size:18px">⚠️</span>'+
        '<div><strong style="font-size:13.5px;color:#f57f17">'+lowStockItems.length+' sản phẩm sắp hết hàng:</strong>'+
          '<div style="font-size:12.5px;color:#795548;margin-top:3px">'+
            lowStockItems.map(v=>'<strong>'+escHtml(v.name)+'</strong> (còn '+v.stock+' '+escHtml(v.unit||'cái')+')').join(' · ')+
          '</div>'+
        '</div>'+
      '</div>'
    :'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<div><h3 style="margin:0">Quản lý Văn phòng phẩm</h3>'+
        '<p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">'+total+' sản phẩm · '+activeCnt+' đang bán · '+draftCnt+' nháp · '+outCnt+' hết hàng</p>'+
      '</div>'+
      '<button onclick="sellerEditVppId=null;sellerVppSearch=\'\';acctTab=\'seller-vpp-form\';renderAccount()" class="btn-primary" style="font-size:13px">+ Thêm VPP mới</button>'+
    '</div>'+
    lowWarnBanner+
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">'+
      '<input placeholder="🔍 Tìm theo tên, thương hiệu..." value="'+escHtml(sellerVppSearch)+'" oninput="sellerVppSearch=this.value;renderAccount()" style="flex:1;min-width:200px;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
      '<div style="display:flex;gap:6px;flex-wrap:wrap">'+
        filterTabs.map(([k,lbl,cnt])=>
          '<button onclick="sellerVppStatusFilter=\''+k+'\';renderAccount()" style="padding:5px 13px;border-radius:20px;border:1.5px solid '+(sellerVppStatusFilter===k?'var(--ink)':'var(--line)')+';background:'+(sellerVppStatusFilter===k?'var(--ink)':'transparent')+';color:'+(sellerVppStatusFilter===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+lbl+' ('+cnt+')</button>'
        ).join('')+
      '</div>'+
    '</div>'+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse">'+
        '<thead><tr style="background:var(--paper-alt,#f8f6f3)">'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600"></th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Sản phẩm</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Giá</th>'+
          '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Tồn kho</th>'+
          '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Đã bán</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Hành động</th>'+
        '</tr></thead>'+
        '<tbody>'+rows+'</tbody>'+
      '</table>'+
    '</div>'+
  '</div>';
}

function _sellerVppRestockInline(v){
  return '<div style="background:#fff9f0;border:1.5px solid #ffe0b2;border-radius:8px;padding:14px 16px;margin-top:4px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<span style="font-weight:600;font-size:13px;color:#e65100">📦 Nhập hàng: '+escHtml(v.name)+'</span>'+
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
      '<input id="vrsQty_'+v.id+'" type="number" min="1" placeholder="Số lượng nhập" style="width:140px;padding:6px 10px;border:1.5px solid #ffe0b2;border-radius:6px;font-size:13px">'+
      '<input id="vrsReason_'+v.id+'" placeholder="Lý do (tùy chọn)" style="width:200px;padding:6px 10px;border:1.5px solid #ffe0b2;border-radius:6px;font-size:13px">'+
      '<button onclick="doSellerRestockVpp(\''+v.id+'\')" style="padding:6px 14px;background:#e65100;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">✓ Xác nhận</button>'+
      '<button onclick="sellerRestockVppId=null;renderAccount()" style="padding:6px 12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;font-size:13px">Hủy</button>'+
    '</div>'+
    '<div style="font-size:12px;color:#795548">Tồn hiện tại: <strong>'+v.stock+'</strong> '+escHtml(v.unit||'cái')+'</div>'+
  '</div>';
}

function sellerVppForm(vppId){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const all=s.vppProducts||[];
  const v=vppId?all.find(x=>x.id===vppId):null;
  const isEdit=!!v;
  const val=k=>v?escHtml(String(v[k]??'')):'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<button onclick="acctTab=\'seller-vpp\';sellerEditVppId=null;renderAccount()" class="btn-ghost" style="padding:5px 12px;font-size:13px">← Danh sách</button>'+
      '<h3 style="margin:0">'+(isEdit?'Chỉnh sửa VPP':'Thêm VPP mới')+'</h3>'+
    '</div>'+

    /* Section 1: Basic info */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:16px">'+
      '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)">1. Thông tin cơ bản</h4>'+
      '<div style="display:grid;gap:12px">'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Tên sản phẩm <span style="color:#e74c3c">*</span></label>'+
          '<input id="vf-name" class="form-input" value="'+val('name')+'" placeholder="VD: Bút bi Thiên Long TL-027" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
          '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Thương hiệu</label>'+
            '<input id="vf-brand" class="form-input" value="'+val('brand')+'" placeholder="VD: Thiên Long, Hồng Hà..." style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
          '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Đơn vị tính <span style="color:#e74c3c">*</span></label>'+
            '<select id="vf-unit" style="width:100%;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
              VPP_UNITS.map(u=>'<option value="'+u+'"'+(v&&v.unit===u?' selected':'')+'>'+u+'</option>').join('')+
            '</select></div>'+
        '</div>'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Danh mục <span style="color:#e74c3c">*</span></label>'+
          '<select id="vf-cat" style="width:100%;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
            VPP_CAT.map(c=>'<option value="'+c.k+'"'+(v&&v.category===c.k?' selected':'')+'>'+c.lbl+'</option>').join('')+
          '</select></div>'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Mô tả sản phẩm</label>'+
          '<textarea id="vf-desc" rows="3" placeholder="Mô tả ngắn về sản phẩm, chất liệu, thông số kỹ thuật..." style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper);resize:vertical">'+
            (v?escHtml(v.desc||''):'')+
          '</textarea></div>'+
      '</div>'+
    '</div>'+

    /* Section 2: Pricing */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:16px">'+
      '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)">2. Giá bán</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Giá bán (đ) <span style="color:#e74c3c">*</span></label>'+
          '<input id="vf-price" type="number" min="0" step="100" value="'+(v?v.price:'')+'" placeholder="VD: 4500" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Giá gốc (đ) <span style="font-size:11.5px;font-weight:400;color:var(--text-soft)">để hiện khuyến mãi</span></label>'+
          '<input id="vf-oldprice" type="number" min="0" step="100" value="'+(v&&v.oldPrice?v.oldPrice:'')+'" placeholder="Để trống nếu không giảm giá" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
      '</div>'+
    '</div>'+

    /* Section 3: Stock */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:16px">'+
      '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)">3. Kho hàng</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Số lượng tồn kho <span style="color:#e74c3c">*</span></label>'+
          '<input id="vf-stock" type="number" min="0" value="'+(v?v.stock:'')+'" placeholder="VD: 100" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Ngưỡng cảnh báo hết hàng <span style="font-size:11.5px;font-weight:400;color:var(--text-soft)">mặc định: '+VPP_LOW_DEFAULT+'</span></label>'+
          '<input id="vf-low" type="number" min="0" value="'+(v?v.lowStockThreshold:VPP_LOW_DEFAULT)+'" placeholder="'+VPP_LOW_DEFAULT+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
      '</div>'+
    '</div>'+

    /* Section 4: Images */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:16px">'+
      '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)">4. Ảnh sản phẩm</h4>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
        [1,2,3].map(i=>`
          <div onclick="toast('Demo: upload ảnh sẽ tích hợp với server thực tế.')" style="width:90px;height:90px;border:2px dashed ${isEdit&&v.imageCount>=i?'#27ae60':'var(--line)'};border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:${isEdit&&v.imageCount>=i?'#f0fff4':'transparent'}">
            <span style="font-size:24px">${isEdit&&v.imageCount>=i?'🖼️':'+'}</span>
            <span style="font-size:10.5px;color:var(--text-soft);margin-top:4px">${isEdit&&v.imageCount>=i?'Ảnh '+i:'Thêm ảnh'}</span>
          </div>`).join('')+
        '<div style="align-self:flex-end;padding-bottom:6px">'+
          '<label style="font-size:12.5px;color:var(--text-soft)">Số ảnh (demo):</label>'+
          '<input id="vf-imgcnt" type="number" min="0" max="10" value="'+(v?v.imageCount:1)+'" style="width:60px;padding:5px 8px;border:1.5px solid var(--line);border-radius:6px;font-size:13px;margin-left:6px;background:var(--paper)">'+
        '</div>'+
      '</div>'+
    '</div>'+

    /* Section 5: Status */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:20px">'+
      '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)">5. Trạng thái</h4>'+
      '<div style="display:flex;gap:20px;flex-wrap:wrap">'+
        [['active','Đang bán','#27ae60'],['draft','Nháp','#7f8c8d'],['outofstock','Hết hàng','#e67e22']].map(([val2,lbl,clr])=>
          '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 14px;border-radius:8px;border:1.5px solid '+(!v&&val2==='active'||v&&v.status===val2?clr:'var(--line)')+';background:'+(!v&&val2==='active'||v&&v.status===val2?clr+'15':'transparent')+'">'+
            '<input type="radio" name="vfStatus" value="'+val2+'" '+(!v&&val2==='active'||v&&v.status===val2?'checked':'')+' style="accent-color:'+clr+'">'+
            '<span style="font-size:13.5px;font-weight:600;color:'+clr+'">'+lbl+'</span>'+
          '</label>'
        ).join('')+
      '</div>'+
    '</div>'+

    '<div style="display:flex;gap:10px;justify-content:flex-end">'+
      '<button onclick="acctTab=\'seller-vpp\';sellerEditVppId=null;renderAccount()" class="btn-ghost" style="padding:8px 20px;font-size:13.5px">Hủy</button>'+
      '<button onclick="doSellerSaveVpp('+(isEdit?'\''+v.id+'\'':'null')+')" class="btn-primary" style="padding:8px 20px;font-size:13.5px">'+
        (isEdit?'💾 Lưu thay đổi':'+ Thêm sản phẩm')+
      '</button>'+
    '</div>'+
  '</div>';
}

function doSellerSaveVpp(vppId){
  const name=((document.getElementById('vf-name')||{}).value||'').trim();
  if(!name){toast('Vui lòng nhập tên sản phẩm.');return;}
  const brand=((document.getElementById('vf-brand')||{}).value||'').trim();
  const unit=(document.getElementById('vf-unit')||{}).value||'Cái';
  const category=(document.getElementById('vf-cat')||{}).value||'khac';
  const desc=((document.getElementById('vf-desc')||{}).value||'').trim();
  const price=parseFloat((document.getElementById('vf-price')||{}).value)||0;
  if(price<=0){toast('Vui lòng nhập giá bán hợp lệ (lớn hơn 0).');return;}
  const oldPrice=parseFloat((document.getElementById('vf-oldprice')||{}).value)||0;
  const stock=Math.max(0,parseInt((document.getElementById('vf-stock')||{}).value||0)||0);
  const lowStockThreshold=Math.max(0,parseInt((document.getElementById('vf-low')||{}).value||VPP_LOW_DEFAULT)||VPP_LOW_DEFAULT);
  const imageCount=Math.max(0,Math.min(10,parseInt((document.getElementById('vf-imgcnt')||{}).value||1)||1));
  const statusEl=document.querySelector('input[name="vfStatus"]:checked');
  const rawStatus=statusEl?statusEl.value:'active';
  const status=stock===0&&rawStatus==='active'?'outofstock':rawStatus;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);
  if(sIdx===-1) return;
  activeSellers[sIdx].vppProducts=activeSellers[sIdx].vppProducts||[];
  const today=todayStr();
  if(vppId){
    const pIdx=activeSellers[sIdx].vppProducts.findIndex(x=>x.id===vppId);
    if(pIdx===-1){toast('Không tìm thấy sản phẩm.');return;}
    const old=activeSellers[sIdx].vppProducts[pIdx];
    activeSellers[sIdx].vppProducts[pIdx]={...old,name,brand,unit,category,desc,price,oldPrice,stock,lowStockThreshold,imageCount,status,updatedAt:today};
    toast('✓ Đã cập nhật sản phẩm VPP!');
  } else {
    activeSellers[sIdx].vppProducts.unshift({id:'svp-'+Date.now().toString(36),name,brand,unit,category,desc,price,oldPrice,stock,lowStockThreshold,sold:0,rating:0,ratingCount:0,imageCount,status,createdAt:today,updatedAt:today,restockHistory:[]});
    addNotif('VPP mới "'+name+'" đã được thêm vào gian hàng.');
    toast('✓ Đã thêm sản phẩm VPP mới!');
  }
  saveActiveSellers();
  acctTab='seller-vpp';sellerEditVppId=null;
  renderAccount();
}

function doSellerDeleteVpp(id){
  if(!confirm('Xóa sản phẩm này? Hành động không thể hoàn tác.'))return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=(activeSellers[sIdx].vppProducts||[]).findIndex(x=>x.id===id);if(pIdx===-1)return;
  const name=activeSellers[sIdx].vppProducts[pIdx].name;
  activeSellers[sIdx].vppProducts.splice(pIdx,1);
  saveActiveSellers();
  if(sellerRestockVppId===id)sellerRestockVppId=null;
  toast('Đã xóa: '+name);renderAccount();
}

function doSellerToggleVppRestock(id){
  sellerRestockVppId=(sellerRestockVppId===id?null:id);renderAccount();
}

function doSellerRestockVpp(id){
  const qty=parseInt((document.getElementById('vrsQty_'+id)||{}).value||0);
  const reason=((document.getElementById('vrsReason_'+id)||{}).value||'Nhập hàng').trim();
  if(!qty||qty<=0){toast('Vui lòng nhập số lượng nhập hàng hợp lệ.');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=(activeSellers[sIdx].vppProducts||[]).findIndex(x=>x.id===id);if(pIdx===-1)return;
  const v=activeSellers[sIdx].vppProducts[pIdx];
  v.stock+=qty;
  v.restockHistory=v.restockHistory||[];
  v.restockHistory.push({qty,reason,date:todayStr()});
  if(v.status==='outofstock')v.status='active';
  v.updatedAt=todayStr();
  saveActiveSellers();
  sellerRestockVppId=null;
  toast('✓ Đã nhập thêm '+qty+' '+v.unit+' — tồn kho mới: '+v.stock);
  addNotif('Nhập hàng thành công: +'+qty+' "'+v.name+'" — tồn kho: '+v.stock);
  renderAccount();
}

/* ── 6d. TBGD (Educational Device) Management ── */
const TBGD_CAT=[
  {k:'maytinh',    lbl:'Máy tính / Tablet',   icon:'💻'},
  {k:'maychieuvan',lbl:'Máy chiếu / Màn chiếu',icon:'📽️'},
  {k:'amthanh',   lbl:'Âm thanh / Micro',      icon:'🔊'},
  {k:'bangbiet',  lbl:'Bảng & Phụ kiện bảng',  icon:'🖊️'},
  {k:'camera',    lbl:'Camera / Giám sát',      icon:'📷'},
  {k:'phukien',   lbl:'Phụ kiện thiết bị',      icon:'🔌'},
  {k:'khac',      lbl:'Thiết bị khác',          icon:'📦'}
];
const TBGD_CAT_MAP=Object.fromEntries(TBGD_CAT.map(c=>[c.k,c]));
const TBGD_UNITS=['Cái','Bộ','Chiếc','Hộp','Cuộn'];
const TBGD_LOW_DEFAULT=3;
const TBGD_WARRANTY_OPTS=[3,6,12,18,24,36,48,60];

function sellerTbgdList(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const all=s.tbgdProducts||[];
  let list=all.slice();
  if(sellerTbgdSearch){const q=sellerTbgdSearch.toLowerCase();list=list.filter(v=>v.name.toLowerCase().includes(q)||(v.brand||'').toLowerCase().includes(q));}
  if(sellerTbgdStatusFilter==='outofstock') list=list.filter(v=>v.stock===0);
  else if(sellerTbgdStatusFilter!=='all') list=list.filter(v=>v.status===sellerTbgdStatusFilter);

  const total=all.length;
  const activeCnt=all.filter(v=>v.status==='active').length;
  const draftCnt=all.filter(v=>v.status==='draft').length;
  const outCnt=all.filter(v=>v.stock===0).length;
  const lowItems=all.filter(v=>v.stock>0&&v.stock<=(v.lowStockThreshold||TBGD_LOW_DEFAULT)&&v.status==='active');

  const stBadge={
    active:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#27ae6020;color:#27ae60;font-weight:600">Đang bán</span>',
    draft:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#95a5a620;color:#7f8c8d;font-weight:600">Nháp</span>',
    outofstock:'<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:#e67e2220;color:#e67e22;font-weight:600">Hết hàng</span>'
  };
  const filterTabs=[['all','Tất cả',total],['active','Đang bán',activeCnt],['draft','Nháp',draftCnt],['outofstock','Hết hàng',outCnt]];

  const warrantyBadge=months=>{
    if(!months) return '<span style="font-size:11px;color:var(--text-soft)">Không bảo hành</span>';
    const years=months>=12?Math.floor(months/12):0;
    const rem=months%12;
    const txt=years>0?(rem>0?years+'N'+rem+'T':years+(years===1?' năm':' năm')):months+' tháng';
    return '<span style="font-size:11px;padding:2px 7px;border-radius:5px;background:#e8f4fd;color:#1565c0;font-weight:600">🛡 '+txt+'</span>';
  };

  const rows=list.length
    ?list.map(v=>{
      const thr=v.lowStockThreshold||TBGD_LOW_DEFAULT;
      const stockClr=v.stock===0?'#e74c3c':v.stock<=thr?'#e67e22':'#27ae60';
      const lowWarn=v.stock>0&&v.stock<=thr?'<span title="Sắp hết hàng" style="margin-left:4px;font-size:11px;color:#e67e22">⚠</span>':'';
      const disc=v.oldPrice>0?Math.round((1-v.price/v.oldPrice)*100):0;
      const badge=v.stock===0&&v.status!=='draft'?stBadge.outofstock:(stBadge[v.status]||stBadge.draft);
      const catInfo=TBGD_CAT_MAP[v.category]||{lbl:v.category,icon:'📦'};
      return '<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:10px 8px;width:40px">'+
          '<div style="width:38px;height:38px;background:#e8f4fd;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px">'+catInfo.icon+'</div>'+
        '</td>'+
        '<td style="padding:10px 8px;min-width:200px">'+
          '<div style="font-weight:600;font-size:13.5px;color:var(--ink-deep)">'+escHtml(v.name)+'</div>'+
          '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">'+
            (v.brand?'<strong>'+escHtml(v.brand)+'</strong> · ':'')+
            '<span style="background:#f0ebe4;border-radius:4px;padding:1px 6px;font-size:11px">'+escHtml(catInfo.lbl)+'</span>'+
            ' · ĐVT: '+escHtml(v.unit||'Cái')+
          '</div>'+
        '</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<div style="font-weight:700;font-size:13.5px;color:var(--coral)">'+fmtBig(v.price)+'đ</div>'+
          (disc>0?'<div style="font-size:11px;color:var(--text-soft);text-decoration:line-through">'+fmtBig(v.oldPrice)+'đ</div>'+
            '<span style="font-size:10.5px;background:#e74c3c20;color:#e74c3c;padding:1px 5px;border-radius:4px">-'+disc+'%</span>':'')+
        '</td>'+
        '<td style="padding:10px 8px;text-align:center">'+
          '<span style="font-weight:700;font-size:14px;color:'+stockClr+'">'+v.stock+'</span>'+lowWarn+
          '<div style="font-size:10.5px;color:var(--text-soft)">ngưỡng: '+thr+'</div>'+
        '</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+warrantyBadge(v.warrantyMonths)+
          (v.warrantyNote?'<div style="font-size:10.5px;color:var(--text-soft);max-width:160px;margin-top:2px;white-space:normal">'+escHtml(v.warrantyNote.substring(0,60))+(v.warrantyNote.length>60?'…':'')+'</div>':'')+
        '</td>'+
        '<td style="padding:10px 8px;text-align:center;color:var(--text-soft);font-size:13.5px">'+v.sold+'</td>'+
        '<td style="padding:10px 8px">'+badge+'</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<button title="Sửa" onclick="sellerEditTbgdId=\''+v.id+'\';acctTab=\'seller-tbgd-form\';renderAccount()" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">✏</button>'+
          '<button title="Nhập hàng" onclick="doSellerToggleTbgdRestock(\''+v.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">📦</button>'+
          '<button title="Xóa" onclick="doSellerDeleteTbgd(\''+v.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;cursor:pointer;color:#e74c3c">🗑</button>'+
        '</td>'+
      '</tr>'+
      (sellerRestockTbgdId===v.id?'<tr><td colspan="8" style="padding:0 8px 12px;background:#faf8f5">'+_sellerTbgdRestockInline(v)+'</td></tr>':'');
    }).join('')
    :'<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-soft);font-size:13.5px">Không tìm thấy thiết bị nào.</td></tr>';

  const lowBanner=lowItems.length
    ?'<div style="background:#fff8e1;border:1.5px solid #ffe082;border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span style="font-size:18px">⚠️</span>'+
        '<div><strong style="font-size:13.5px;color:#f57f17">'+lowItems.length+' thiết bị sắp hết hàng:</strong>'+
          '<div style="font-size:12.5px;color:#795548;margin-top:3px">'+
            lowItems.map(v=>'<strong>'+escHtml(v.name)+'</strong> (còn '+v.stock+' '+escHtml(v.unit||'cái')+')').join(' · ')+
          '</div>'+
        '</div>'+
      '</div>'
    :'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<div><h3 style="margin:0">Quản lý Thiết bị giáo dục</h3>'+
        '<p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">'+total+' thiết bị · '+activeCnt+' đang bán · '+draftCnt+' nháp · '+outCnt+' hết hàng</p>'+
      '</div>'+
      '<button onclick="sellerEditTbgdId=null;sellerTbgdSearch=\'\';acctTab=\'seller-tbgd-form\';renderAccount()" class="btn-primary" style="font-size:13px">+ Thêm thiết bị</button>'+
    '</div>'+
    lowBanner+
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">'+
      '<input placeholder="🔍 Tìm theo tên, thương hiệu..." value="'+escHtml(sellerTbgdSearch)+'" oninput="sellerTbgdSearch=this.value;renderAccount()" style="flex:1;min-width:200px;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
      '<div style="display:flex;gap:6px;flex-wrap:wrap">'+
        filterTabs.map(([k,lbl,cnt])=>
          '<button onclick="sellerTbgdStatusFilter=\''+k+'\';renderAccount()" style="padding:5px 13px;border-radius:20px;border:1.5px solid '+(sellerTbgdStatusFilter===k?'var(--ink)':'var(--line)')+';background:'+(sellerTbgdStatusFilter===k?'var(--ink)':'transparent')+';color:'+(sellerTbgdStatusFilter===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+lbl+' ('+cnt+')</button>'
        ).join('')+
      '</div>'+
    '</div>'+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse">'+
        '<thead><tr style="background:var(--paper-alt,#f8f6f3)">'+
          '<th style="padding:9px 8px"></th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Thiết bị</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Giá</th>'+
          '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Tồn kho</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Bảo hành</th>'+
          '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Đã bán</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Hành động</th>'+
        '</tr></thead>'+
        '<tbody>'+rows+'</tbody>'+
      '</table>'+
    '</div>'+
  '</div>';
}

function _sellerTbgdRestockInline(v){
  return '<div style="background:#fff9f0;border:1.5px solid #ffe0b2;border-radius:8px;padding:14px 16px;margin-top:4px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">'+
    '<span style="font-weight:600;font-size:13px;color:#e65100">📦 Nhập hàng: '+escHtml(v.name)+'</span>'+
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
      '<input id="trsQty_'+v.id+'" type="number" min="1" placeholder="Số lượng nhập" style="width:140px;padding:6px 10px;border:1.5px solid #ffe0b2;border-radius:6px;font-size:13px">'+
      '<input id="trsReason_'+v.id+'" placeholder="Lý do (tùy chọn)" style="width:200px;padding:6px 10px;border:1.5px solid #ffe0b2;border-radius:6px;font-size:13px">'+
      '<button onclick="doSellerRestockTbgd(\''+v.id+'\')" style="padding:6px 14px;background:#e65100;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">✓ Xác nhận</button>'+
      '<button onclick="sellerRestockTbgdId=null;renderAccount()" style="padding:6px 12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;font-size:13px">Hủy</button>'+
    '</div>'+
    '<div style="font-size:12px;color:#795548">Tồn hiện tại: <strong>'+v.stock+'</strong> '+escHtml(v.unit||'cái')+'</div>'+
  '</div>';
}

function sellerTbgdForm(tbgdId){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const all=s.tbgdProducts||[];
  const v=tbgdId?all.find(x=>x.id===tbgdId):null;
  const isEdit=!!v;
  const val=k=>v?escHtml(String(v[k]??'')):'';

  const inputStyle='width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)';
  const selectStyle='width:100%;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)';
  const sectionStyle='background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:18px 20px;margin-bottom:16px';
  const h4Style='margin:0 0 14px;font-size:14px;font-weight:700;color:var(--ink-deep)';
  const labelStyle='font-size:13px;font-weight:600;display:block;margin-bottom:5px';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'+
      '<button onclick="acctTab=\'seller-tbgd\';sellerEditTbgdId=null;renderAccount()" class="btn-ghost" style="padding:5px 12px;font-size:13px">← Danh sách</button>'+
      '<h3 style="margin:0">'+(isEdit?'Chỉnh sửa thiết bị':'Thêm thiết bị mới')+'</h3>'+
    '</div>'+

    /* 1. Basic info */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">1. Thông tin cơ bản</h4>'+
      '<div style="display:grid;gap:12px">'+
        '<div><label style="'+labelStyle+'">Tên thiết bị <span style="color:#e74c3c">*</span></label>'+
          '<input id="tf-name" value="'+val('name')+'" placeholder="VD: Máy chiếu Optoma X400LVe" style="'+inputStyle+'"></div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
          '<div><label style="'+labelStyle+'">Thương hiệu</label>'+
            '<input id="tf-brand" value="'+val('brand')+'" placeholder="VD: Samsung, Optoma..." style="'+inputStyle+'"></div>'+
          '<div><label style="'+labelStyle+'">Đơn vị tính <span style="color:#e74c3c">*</span></label>'+
            '<select id="tf-unit" style="'+selectStyle+'">'+
              TBGD_UNITS.map(u=>'<option value="'+u+'"'+(v&&v.unit===u?' selected':'')+'>'+u+'</option>').join('')+
            '</select></div>'+
        '</div>'+
        '<div><label style="'+labelStyle+'">Danh mục <span style="color:#e74c3c">*</span></label>'+
          '<select id="tf-cat" style="'+selectStyle+'">'+
            TBGD_CAT.map(c=>'<option value="'+c.k+'"'+(v&&v.category===c.k?' selected':'')+'>'+c.icon+' '+c.lbl+'</option>').join('')+
          '</select></div>'+
        '<div><label style="'+labelStyle+'">Mô tả sản phẩm</label>'+
          '<textarea id="tf-desc" rows="3" placeholder="Thông số kỹ thuật, tính năng nổi bật..." style="'+inputStyle+';resize:vertical">'+
            (v?escHtml(v.desc||''):'')+
          '</textarea></div>'+
      '</div>'+
    '</div>'+

    /* 2. Pricing */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">2. Giá bán</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
        '<div><label style="'+labelStyle+'">Giá bán (đ) <span style="color:#e74c3c">*</span></label>'+
          '<input id="tf-price" type="number" min="0" step="1000" value="'+(v?v.price:'')+'" placeholder="VD: 14500000" style="'+inputStyle+'"></div>'+
        '<div><label style="'+labelStyle+'">Giá gốc (đ) <span style="font-size:11.5px;font-weight:400;color:var(--text-soft)">để hiện khuyến mãi</span></label>'+
          '<input id="tf-oldprice" type="number" min="0" step="1000" value="'+(v&&v.oldPrice?v.oldPrice:'')+'" placeholder="Để trống nếu không giảm giá" style="'+inputStyle+'"></div>'+
      '</div>'+
    '</div>'+

    /* 3. Stock */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">3. Kho hàng</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
        '<div><label style="'+labelStyle+'">Số lượng tồn kho <span style="color:#e74c3c">*</span></label>'+
          '<input id="tf-stock" type="number" min="0" value="'+(v?v.stock:'')+'" placeholder="VD: 10" style="'+inputStyle+'"></div>'+
        '<div><label style="'+labelStyle+'">Ngưỡng cảnh báo <span style="font-size:11.5px;font-weight:400;color:var(--text-soft)">mặc định: '+TBGD_LOW_DEFAULT+'</span></label>'+
          '<input id="tf-low" type="number" min="0" value="'+(v?v.lowStockThreshold:TBGD_LOW_DEFAULT)+'" placeholder="'+TBGD_LOW_DEFAULT+'" style="'+inputStyle+'"></div>'+
      '</div>'+
    '</div>'+

    /* 4. Warranty */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">4. Bảo hành</h4>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
        '<div><label style="'+labelStyle+'">Thời hạn bảo hành</label>'+
          '<select id="tf-warranty" style="'+selectStyle+'">'+
            '<option value="0"'+(v&&!v.warrantyMonths?' selected':'')+'>Không bảo hành</option>'+
            TBGD_WARRANTY_OPTS.map(m=>{
              const years=m>=12?Math.floor(m/12):0;
              const rem=m%12;
              const txt=years>0?(rem>0?years+' năm '+rem+' tháng':years+' năm'):m+' tháng';
              return '<option value="'+m+'"'+(v&&v.warrantyMonths===m?' selected':'')+'>'+txt+'</option>';
            }).join('')+
          '</select></div>'+
        '<div><label style="'+labelStyle+'">Ghi chú bảo hành</label>'+
          '<input id="tf-warrantynote" value="'+(v?escHtml(v.warrantyNote||''):'')+'" placeholder="VD: Bảo hành tại trung tâm ủy quyền" style="'+inputStyle+'"></div>'+
      '</div>'+
      '<div style="margin-top:12px;background:#e8f4fd;border-radius:8px;padding:10px 14px;font-size:12.5px;color:#1565c0">'+
        '🛡 Thông tin bảo hành sẽ hiển thị trực tiếp trên trang sản phẩm và trong xác nhận đơn hàng của khách.'+
      '</div>'+
    '</div>'+

    /* 5. Images */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">5. Ảnh sản phẩm</h4>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">'+
        [1,2,3,4].map(i=>`
          <div onclick="toast('Demo: upload ảnh sẽ tích hợp với server thực tế.')" style="width:90px;height:90px;border:2px dashed ${isEdit&&v.imageCount>=i?'#1565c0':'var(--line)'};border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:${isEdit&&v.imageCount>=i?'#e8f4fd':'transparent'}">
            <span style="font-size:24px">${isEdit&&v.imageCount>=i?'🖼️':'+'}</span>
            <span style="font-size:10.5px;color:var(--text-soft);margin-top:4px">${isEdit&&v.imageCount>=i?'Ảnh '+i:'Thêm ảnh'}</span>
          </div>`).join('')+
        '<div style="padding-bottom:8px">'+
          '<label style="font-size:12.5px;color:var(--text-soft)">Số ảnh (demo):</label>'+
          '<input id="tf-imgcnt" type="number" min="0" max="10" value="'+(v?v.imageCount:1)+'" style="width:60px;padding:5px 8px;border:1.5px solid var(--line);border-radius:6px;font-size:13px;margin-left:6px;background:var(--paper)">'+
        '</div>'+
      '</div>'+
    '</div>'+

    /* 6. Status */
    '<div style="'+sectionStyle+'">'+
      '<h4 style="'+h4Style+'">6. Trạng thái</h4>'+
      '<div style="display:flex;gap:16px;flex-wrap:wrap">'+
        [['active','Đang bán','#27ae60'],['draft','Nháp','#7f8c8d'],['outofstock','Hết hàng','#e67e22']].map(([sv,lbl,clr])=>
          '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 16px;border-radius:8px;border:1.5px solid '+
            ((!v&&sv==='active')||(v&&v.status===sv)?clr:'var(--line)')+';background:'+
            ((!v&&sv==='active')||(v&&v.status===sv)?clr+'15':'transparent')+'">'+
            '<input type="radio" name="tfStatus" value="'+sv+'" '+((!v&&sv==='active')||(v&&v.status===sv)?'checked':'')+' style="accent-color:'+clr+'">'+
            '<span style="font-size:13.5px;font-weight:600;color:'+clr+'">'+lbl+'</span>'+
          '</label>'
        ).join('')+
      '</div>'+
    '</div>'+

    '<div style="display:flex;gap:10px;justify-content:flex-end">'+
      '<button onclick="acctTab=\'seller-tbgd\';sellerEditTbgdId=null;renderAccount()" class="btn-ghost" style="padding:8px 20px;font-size:13.5px">Hủy</button>'+
      '<button onclick="doSellerSaveTbgd('+(isEdit?'\''+v.id+'\'':'null')+')" class="btn-primary" style="padding:8px 20px;font-size:13.5px">'+
        (isEdit?'💾 Lưu thay đổi':'+ Thêm thiết bị')+
      '</button>'+
    '</div>'+
  '</div>';
}

function doSellerSaveTbgd(tbgdId){
  const name=((document.getElementById('tf-name')||{}).value||'').trim();
  if(!name){toast('Vui lòng nhập tên thiết bị.');return;}
  const brand=((document.getElementById('tf-brand')||{}).value||'').trim();
  const unit=(document.getElementById('tf-unit')||{}).value||'Cái';
  const category=(document.getElementById('tf-cat')||{}).value||'khac';
  const desc=((document.getElementById('tf-desc')||{}).value||'').trim();
  const price=parseFloat((document.getElementById('tf-price')||{}).value)||0;
  if(price<=0){toast('Vui lòng nhập giá bán hợp lệ (lớn hơn 0).');return;}
  const oldPrice=parseFloat((document.getElementById('tf-oldprice')||{}).value)||0;
  const stock=Math.max(0,parseInt((document.getElementById('tf-stock')||{}).value||0)||0);
  const lowStockThreshold=Math.max(0,parseInt((document.getElementById('tf-low')||{}).value||TBGD_LOW_DEFAULT)||TBGD_LOW_DEFAULT);
  const warrantyMonths=parseInt((document.getElementById('tf-warranty')||{}).value||0)||0;
  const warrantyNote=((document.getElementById('tf-warrantynote')||{}).value||'').trim();
  const imageCount=Math.max(0,Math.min(10,parseInt((document.getElementById('tf-imgcnt')||{}).value||1)||1));
  const statusEl=document.querySelector('input[name="tfStatus"]:checked');
  const rawStatus=statusEl?statusEl.value:'active';
  const status=stock===0&&rawStatus==='active'?'outofstock':rawStatus;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);
  if(sIdx===-1) return;
  activeSellers[sIdx].tbgdProducts=activeSellers[sIdx].tbgdProducts||[];
  const today=todayStr();
  if(tbgdId){
    const pIdx=activeSellers[sIdx].tbgdProducts.findIndex(x=>x.id===tbgdId);
    if(pIdx===-1){toast('Không tìm thấy thiết bị.');return;}
    const old=activeSellers[sIdx].tbgdProducts[pIdx];
    activeSellers[sIdx].tbgdProducts[pIdx]={...old,name,brand,unit,category,desc,price,oldPrice,stock,lowStockThreshold,warrantyMonths,warrantyNote,imageCount,status,updatedAt:today};
    toast('✓ Đã cập nhật thiết bị!');
  } else {
    activeSellers[sIdx].tbgdProducts.unshift({id:'std-'+Date.now().toString(36),name,brand,unit,category,desc,price,oldPrice,stock,lowStockThreshold,warrantyMonths,warrantyNote,sold:0,rating:0,ratingCount:0,imageCount,status,createdAt:today,updatedAt:today,restockHistory:[]});
    addNotif('Thiết bị mới "'+name+'" đã được thêm vào gian hàng.');
    toast('✓ Đã thêm thiết bị mới!');
  }
  saveActiveSellers();
  acctTab='seller-tbgd';sellerEditTbgdId=null;
  renderAccount();
}

function doSellerDeleteTbgd(id){
  if(!confirm('Xóa thiết bị này? Hành động không thể hoàn tác.'))return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=(activeSellers[sIdx].tbgdProducts||[]).findIndex(x=>x.id===id);if(pIdx===-1)return;
  const name=activeSellers[sIdx].tbgdProducts[pIdx].name;
  activeSellers[sIdx].tbgdProducts.splice(pIdx,1);
  saveActiveSellers();
  if(sellerRestockTbgdId===id)sellerRestockTbgdId=null;
  toast('Đã xóa: '+name);renderAccount();
}

function doSellerToggleTbgdRestock(id){
  sellerRestockTbgdId=(sellerRestockTbgdId===id?null:id);renderAccount();
}

function doSellerRestockTbgd(id){
  const qty=parseInt((document.getElementById('trsQty_'+id)||{}).value||0);
  const reason=((document.getElementById('trsReason_'+id)||{}).value||'Nhập hàng').trim();
  if(!qty||qty<=0){toast('Vui lòng nhập số lượng nhập hàng hợp lệ.');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const pIdx=(activeSellers[sIdx].tbgdProducts||[]).findIndex(x=>x.id===id);if(pIdx===-1)return;
  const v=activeSellers[sIdx].tbgdProducts[pIdx];
  v.stock+=qty;
  v.restockHistory=v.restockHistory||[];
  v.restockHistory.push({qty,reason,date:todayStr()});
  if(v.status==='outofstock')v.status='active';
  v.updatedAt=todayStr();
  saveActiveSellers();
  sellerRestockTbgdId=null;
  toast('✓ Đã nhập thêm '+qty+' '+v.unit+' — tồn kho mới: '+v.stock);
  addNotif('Nhập hàng thành công: +'+qty+' "'+v.name+'" — tồn kho: '+v.stock);
  renderAccount();
}

/* ── 6e. Seller Order Management ── */
const SELLER_ORDER_STATUS={
  pending:    {lbl:'Chờ xác nhận', clr:'#f57f17', bg:'#fff8e1'},
  processing: {lbl:'Đang xử lý',   clr:'#1565c0', bg:'#e8f4fd'},
  shipping:   {lbl:'Đang giao',    clr:'#6a1b9a', bg:'#f3e5f5'},
  delivered:  {lbl:'Đã giao',      clr:'#2e7d32', bg:'#e8f5e9'},
  cancelled:  {lbl:'Đã hủy',       clr:'#b71c1c', bg:'#ffebee'}
};

function _orderStatusBadge(st){
  const s=SELLER_ORDER_STATUS[st]||{lbl:st,clr:'#555',bg:'#eee'};
  return '<span style="font-size:11px;padding:2px 9px;border-radius:6px;background:'+s.bg+';color:'+s.clr+';font-weight:600">'+s.lbl+'</span>';
}

function sellerOrderList(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const all=s.orders||[];
  let list=all.slice();
  if(sellerOrderSearch){
    const q=sellerOrderSearch.toLowerCase();
    list=list.filter(o=>o.id.toLowerCase().includes(q)||o.buyer.toLowerCase().includes(q));
  }
  if(sellerOrderStatusFilter!=='all') list=list.filter(o=>o.status===sellerOrderStatusFilter);

  const cnt=k=>k==='all'?all.length:all.filter(o=>o.status===k).length;
  const filterTabs=[['all','Tất cả'],['pending','Chờ xác nhận'],['processing','Đang xử lý'],['shipping','Đang giao'],['delivered','Đã giao'],['cancelled','Đã hủy']];

  const selAll=list.length>0&&list.filter(o=>o.status!=='delivered'&&o.status!=='cancelled').every(o=>sellerOrderSelected.includes(o.id));
  const selectableList=list.filter(o=>o.status!=='delivered'&&o.status!=='cancelled');

  const bulkBar=sellerOrderSelected.length
    ?'<div style="background:#f5f0eb;border:1.5px solid var(--line);border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span style="font-weight:600;font-size:13.5px">✓ Đã chọn '+sellerOrderSelected.length+' đơn</span>'+
        '<button onclick="doSellerBulkConfirmOrders()" style="padding:5px 13px;border-radius:6px;background:#1565c020;color:#1565c0;border:1.5px solid #1565c040;cursor:pointer;font-size:12.5px">✓ Xác nhận đơn</button>'+
        '<button onclick="doSellerBulkPrintOrders()" style="padding:5px 13px;border-radius:6px;background:#6a1b9a20;color:#6a1b9a;border:1.5px solid #6a1b9a40;cursor:pointer;font-size:12.5px">🖨 In hàng loạt</button>'+
        '<div style="margin-left:auto"><button onclick="sellerOrderSelected=[];renderAccount()" style="padding:5px 12px;border-radius:6px;background:transparent;color:var(--text-soft);border:1.5px solid var(--line);cursor:pointer;font-size:12.5px">Bỏ chọn</button></div>'+
      '</div>'
    :'';

  const rows=list.length
    ?list.map(o=>{
      const isSel=sellerOrderSelected.includes(o.id);
      const canSel=o.status!=='delivered'&&o.status!=='cancelled';
      const total=o.total||((o.subtotal||0)+(o.shippingFee||0));
      return '<tr style="border-top:1px solid var(--line);background:'+(isSel?'#f5f0eb':'transparent')+'">'+
        '<td style="padding:10px 8px;width:34px">'+
          (canSel?'<input type="checkbox" '+(isSel?'checked':'')+' onclick="doSellerToggleOrderSelect(\''+o.id+'\')" style="cursor:pointer;width:15px;height:15px">':'<span style="color:var(--line)">—</span>')+
        '</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<div style="font-weight:700;font-size:13px;color:var(--ink-deep)">#'+escHtml(o.id)+'</div>'+
          '<div style="font-size:11.5px;color:var(--text-soft)">'+escHtml(o.date)+'</div>'+
        '</td>'+
        '<td style="padding:10px 8px">'+
          '<div style="font-weight:600;font-size:13px">'+escHtml(o.buyer)+'</div>'+
          (o.buyerPhone?'<div style="font-size:11.5px;color:var(--text-soft)">'+escHtml(o.buyerPhone)+'</div>':'')+
        '</td>'+
        '<td style="padding:10px 8px">'+
          '<div style="font-size:12.5px;color:var(--text-soft)">'+
            (o.items||[]).slice(0,2).map(it=>escHtml(it.name)+' ×'+it.qty).join('<br>')+
            ((o.items||[]).length>2?'<br><em style="color:#999">+'+((o.items||[]).length-2)+' sản phẩm nữa</em>':'')+
          '</div>'+
        '</td>'+
        '<td style="padding:10px 8px;text-align:right;white-space:nowrap">'+
          '<div style="font-weight:700;color:var(--coral)">'+fmtBig(total)+'đ</div>'+
          (o.shippingFee?'<div style="font-size:11px;color:var(--text-soft)">Ship: '+fmtBig(o.shippingFee)+'đ</div>':'')+
        '</td>'+
        '<td style="padding:10px 8px">'+_orderStatusBadge(o.status)+'</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          '<button onclick="sellerViewOrderId=\''+o.id+'\';acctTab=\'seller-order-detail\';renderAccount()" style="padding:5px 9px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px" title="Xem chi tiết">👁</button>'+
          (o.status==='pending'?'<button onclick="doSellerConfirmOrder(\''+o.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #1565c040;border-radius:6px;background:#e8f4fd;cursor:pointer;margin-right:3px;color:#1565c0" title="Xác nhận">✓</button>':'')+
          (o.status==='processing'?'<button onclick="doSellerStartShipping(\''+o.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #6a1b9a40;border-radius:6px;background:#f3e5f5;cursor:pointer;margin-right:3px;color:#6a1b9a" title="Giao hàng">🚚</button>':'')+
          (o.status==='shipping'?'<button onclick="doSellerMarkDelivered(\''+o.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #2e7d3240;border-radius:6px;background:#e8f5e9;cursor:pointer;margin-right:3px;color:#2e7d32" title="Đã giao">✅</button>':'')+
          (o.status!=='delivered'&&o.status!=='cancelled'?'<button onclick="doSellerOpenCancel(\''+o.id+'\')" style="padding:5px 9px;font-size:12px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;cursor:pointer;color:#e74c3c" title="Hủy đơn">✕</button>':'')+
        '</td>'+
      '</tr>';
    }).join('')
    :'<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-soft);font-size:13.5px">Không tìm thấy đơn hàng nào.</td></tr>';

  const cancelPanel=sellerCancelOrderId
    ?'<div style="background:#fff5f5;border:2px solid #ffcdd2;border-radius:10px;padding:16px 20px;margin-bottom:16px">'+
        '<h4 style="margin:0 0 10px;color:#b71c1c;font-size:14px">🚫 Hủy đơn #'+escHtml(sellerCancelOrderId)+'</h4>'+
        '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
          '<input id="cancelReasonInput" placeholder="Nhập lý do hủy đơn... (bắt buộc)" style="flex:1;min-width:240px;padding:8px 12px;border:1.5px solid #ffcdd2;border-radius:8px;font-size:13.5px">'+
          '<button onclick="doSellerConfirmCancel()" style="padding:7px 16px;background:#b71c1c;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13.5px">Xác nhận hủy</button>'+
          '<button onclick="sellerCancelOrderId=null;renderAccount()" style="padding:7px 14px;border:1.5px solid var(--line);background:transparent;border-radius:8px;cursor:pointer;font-size:13.5px">Hủy bỏ</button>'+
        '</div>'+
      '</div>'
    :'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<div>'+
        '<h3 style="margin:0">Quản lý Đơn hàng</h3>'+
        '<p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">'+all.length+' đơn · '+cnt('pending')+' chờ xác nhận · '+cnt('processing')+' đang xử lý · '+cnt('shipping')+' đang giao</p>'+
      '</div>'+
      '<button onclick="doSellerBulkPrintOrders()" style="padding:7px 16px;border:1.5px solid var(--line);border-radius:8px;background:transparent;cursor:pointer;font-size:13px">🖨 In đơn đã chọn</button>'+
    '</div>'+
    cancelPanel+
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">'+
      '<input placeholder="🔍 Tìm mã đơn, tên khách..." value="'+escHtml(sellerOrderSearch)+'" oninput="sellerOrderSearch=this.value;renderAccount()" style="flex:1;min-width:200px;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
    '</div>'+
    '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">'+
      filterTabs.map(([k,lbl])=>
        '<button onclick="sellerOrderStatusFilter=\''+k+'\';renderAccount()" style="padding:5px 13px;border-radius:20px;border:1.5px solid '+(sellerOrderStatusFilter===k?'var(--ink)':'var(--line)')+';background:'+(sellerOrderStatusFilter===k?'var(--ink)':'transparent')+';color:'+(sellerOrderStatusFilter===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+lbl+' ('+cnt(k)+')</button>'
      ).join('')+
    '</div>'+
    bulkBar+
    '<div style="overflow-x:auto">'+
      '<table style="width:100%;border-collapse:collapse">'+
        '<thead><tr style="background:var(--paper-alt,#f8f6f3)">'+
          '<th style="padding:9px 8px;width:34px">'+
            (selectableList.length?'<input type="checkbox" '+(selAll?'checked':'')+' onclick="doSellerToggleSelectAllOrders()" style="cursor:pointer;width:15px;height:15px">':'')+'</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Mã đơn</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Khách hàng</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Sản phẩm</th>'+
          '<th style="padding:9px 8px;text-align:right;font-size:12px;color:var(--text-soft);font-weight:600">Tổng tiền</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Hành động</th>'+
        '</tr></thead>'+
        '<tbody>'+rows+'</tbody>'+
      '</table>'+
    '</div>'+
  '</div>';
}

function sellerOrderDetail(orderId){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const o=(s.orders||[]).find(x=>x.id===orderId);
  if(!o) return '<div class="panel"><button onclick="acctTab=\'seller-orders\';renderAccount()" class="btn-ghost" style="margin-bottom:16px;padding:5px 12px;font-size:13px">← Quay lại</button><p>Không tìm thấy đơn hàng.</p></div>';

  const total=o.total||((o.subtotal||0)+(o.shippingFee||0));
  const st=SELLER_ORDER_STATUS[o.status]||{lbl:o.status,clr:'#555',bg:'#eee'};
  const timeline=[
    {st:'pending',    label:'Chờ xác nhận', icon:'📋'},
    {st:'processing', label:'Đang xử lý',   icon:'⚙️'},
    {st:'shipping',   label:'Đang giao',    icon:'🚚'},
    {st:'delivered',  label:'Đã giao',      icon:'✅'}
  ];
  const stOrder=['pending','processing','shipping','delivered'];
  const curIdx=stOrder.indexOf(o.status);

  const timelineHtml=o.status==='cancelled'
    ?'<div style="display:flex;align-items:center;gap:8px;padding:14px 0;border-top:1px solid var(--line)"><span style="font-size:20px">🚫</span><span style="font-weight:600;color:#b71c1c">Đơn đã bị hủy vào '+escHtml(o.cancelledAt||o.updatedAt)+'</span>'+(o.cancelReason?'<span style="color:var(--text-soft);margin-left:8px">— '+escHtml(o.cancelReason)+'</span>':'')+'</div>'
    :'<div style="display:flex;align-items:flex-start;gap:0;margin-top:16px;border-top:1px solid var(--line);padding-top:16px">'+
      timeline.map((t,i)=>{
        const done=i<=curIdx;
        const active=i===curIdx;
        return '<div style="flex:1;text-align:center;position:relative">'+
          (i>0?'<div style="position:absolute;top:13px;left:-50%;right:50%;height:2px;background:'+(done?'#2e7d32':'#e0e0e0')+'"></div>':'')+
          '<div style="width:28px;height:28px;border-radius:50%;background:'+(active?'#1565c0':done?'#2e7d32':'#e0e0e0')+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;margin:0 auto;position:relative;z-index:1;border:2px solid '+(active?'#1565c0':done?'#2e7d32':'#ccc')+'">'+
            (done&&!active?'✓':t.icon.replace('✅','✓'))+
          '</div>'+
          '<div style="font-size:11.5px;margin-top:6px;font-weight:'+(active?'700':'400')+';color:'+(active?'#1565c0':done?'#2e7d32':'var(--text-soft)')+'">'+t.label+'</div>'+
        '</div>';
      }).join('')+
    '</div>';

  const trackingPanel=(o.status==='processing'||o.status==='shipping')
    ?'<div style="background:#f3e5f5;border:1.5px solid #ce93d8;border-radius:8px;padding:12px 16px;margin-top:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<span style="font-size:13px;font-weight:600;color:#6a1b9a">🚚 Mã vận đơn:</span>'+
        (o.trackingNumber
          ?'<span style="font-size:13.5px;font-weight:700;font-family:monospace;color:#4a148c">'+escHtml(o.trackingNumber)+'</span>'+
            '<button onclick="sellerTrackingOrderId=\''+o.id+'\';renderAccount()" style="padding:4px 12px;border:1.5px solid #ce93d8;border-radius:6px;font-size:12px;cursor:pointer;background:transparent;color:#6a1b9a">Cập nhật</button>'
          :'<span style="color:#999;font-size:12.5px">Chưa nhập</span>'+
            '<button onclick="sellerTrackingOrderId=\''+o.id+'\';renderAccount()" style="padding:5px 14px;border:none;border-radius:6px;font-size:13px;cursor:pointer;background:#6a1b9a;color:#fff;font-weight:600">+ Nhập mã</button>'
        )+
      '</div>'
    :(o.trackingNumber?'<div style="background:#f3e5f5;border-radius:8px;padding:10px 14px;margin-top:10px;font-size:13px;color:#6a1b9a"><strong>🚚 Mã vận đơn:</strong> <span style="font-family:monospace;font-weight:700">'+escHtml(o.trackingNumber)+'</span></div>':'');

  const trackingInputPanel=sellerTrackingOrderId===o.id
    ?'<div style="background:#fff;border:1.5px solid #ce93d8;border-radius:8px;padding:12px 16px;margin-top:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
        '<input id="trackingInput" placeholder="Nhập mã vận đơn..." value="'+escHtml(o.trackingNumber||'')+'" style="flex:1;min-width:200px;padding:7px 12px;border:1.5px solid #ce93d8;border-radius:6px;font-size:13.5px;font-family:monospace">'+
        '<button onclick="doSellerSaveTracking(\''+o.id+'\')" style="padding:7px 16px;background:#6a1b9a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13.5px">Lưu</button>'+
        '<button onclick="sellerTrackingOrderId=null;renderAccount()" style="padding:7px 12px;border:1.5px solid var(--line);background:transparent;border-radius:6px;cursor:pointer;font-size:13.5px">Hủy</button>'+
      '</div>'
    :'';

  const cancelPanel=sellerCancelOrderId===o.id
    ?'<div style="background:#fff5f5;border:2px solid #ffcdd2;border-radius:10px;padding:14px 16px;margin-top:12px">'+
        '<h4 style="margin:0 0 10px;color:#b71c1c;font-size:14px">🚫 Xác nhận hủy đơn hàng này</h4>'+
        '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
          '<input id="cancelReasonInput" placeholder="Nhập lý do hủy đơn... (bắt buộc)" style="flex:1;min-width:200px;padding:8px 12px;border:1.5px solid #ffcdd2;border-radius:8px;font-size:13.5px">'+
          '<button onclick="doSellerConfirmCancel()" style="padding:7px 16px;background:#b71c1c;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600">Xác nhận hủy</button>'+
          '<button onclick="sellerCancelOrderId=null;renderAccount()" style="padding:7px 14px;border:1.5px solid var(--line);background:transparent;border-radius:8px;cursor:pointer">Hủy bỏ</button>'+
        '</div>'+
      '</div>'
    :'';

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">'+
      '<button onclick="acctTab=\'seller-orders\';sellerViewOrderId=null;renderAccount()" class="btn-ghost" style="padding:5px 12px;font-size:13px">← Danh sách đơn</button>'+
      '<h3 style="margin:0">Đơn hàng #'+escHtml(o.id)+'</h3>'+
      '<div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">'+
        (o.status==='pending'?'<button onclick="doSellerConfirmOrder(\''+o.id+'\')" style="padding:6px 16px;background:#1565c0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">✓ Xác nhận đơn</button>':'')+
        (o.status==='processing'?'<button onclick="doSellerStartShipping(\''+o.id+'\')" style="padding:6px 16px;background:#6a1b9a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">🚚 Bắt đầu giao</button>':'')+
        (o.status==='shipping'?'<button onclick="doSellerMarkDelivered(\''+o.id+'\')" style="padding:6px 16px;background:#2e7d32;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">✅ Đã giao xong</button>':'')+
        '<button onclick="doSellerPrintOrder(\''+o.id+'\')" style="padding:6px 16px;background:transparent;border:1.5px solid var(--line);border-radius:8px;cursor:pointer;font-size:13px">🖨 In phiếu</button>'+
        (o.status!=='delivered'&&o.status!=='cancelled'?'<button onclick="doSellerOpenCancel(\''+o.id+'\')" style="padding:6px 16px;background:#fff5f5;border:1.5px solid #ffcdd2;border-radius:8px;cursor:pointer;font-size:13px;color:#b71c1c">✕ Hủy đơn</button>':'')+
      '</div>'+
    '</div>'+

    /* Timeline */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:16px 20px;margin-bottom:16px">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">'+
        '<div><span style="font-size:13px;color:var(--text-soft)">Ngày đặt:</span> <strong>'+escHtml(o.date)+'</strong></div>'+
        '<div>'+_orderStatusBadge(o.status)+'</div>'+
      '</div>'+
      timelineHtml+
    '</div>'+

    /* Tracking */
    (o.status!=='pending'&&o.status!=='cancelled'?
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:14px 20px;margin-bottom:16px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:4px">📦 Thông tin vận chuyển</div>'+
        trackingPanel+trackingInputPanel+
      '</div>'
    :'')+

    /* Cancel input */
    (o.status!=='delivered'&&o.status!=='cancelled'?cancelPanel:'')+

    /* Customer */
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">'+
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:14px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:10px">👤 Thông tin khách hàng</div>'+
        '<div style="font-size:13.5px;line-height:1.8">'+
          '<div><strong>'+escHtml(o.buyer)+'</strong></div>'+
          (o.buyerPhone?'<div style="color:var(--text-soft)">📞 '+escHtml(o.buyerPhone)+'</div>':'')+
          (o.buyerAddress?'<div style="color:var(--text-soft)">📍 '+escHtml(o.buyerAddress)+'</div>':'')+
          (o.note?'<div style="margin-top:6px;padding:6px 10px;background:#fff8e1;border-radius:6px;font-size:12.5px;color:#795548">📝 '+escHtml(o.note)+'</div>':'')+
        '</div>'+
      '</div>'+
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:14px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:10px">💰 Thanh toán</div>'+
        '<div style="font-size:13.5px;line-height:2">'+
          '<div style="display:flex;justify-content:space-between"><span style="color:var(--text-soft)">Tạm tính:</span><span>'+fmtBig(o.subtotal||0)+'đ</span></div>'+
          '<div style="display:flex;justify-content:space-between"><span style="color:var(--text-soft)">Phí vận chuyển:</span><span>'+(o.shippingFee?fmtBig(o.shippingFee)+'đ':'Miễn phí')+'</span></div>'+
          '<div style="display:flex;justify-content:space-between;border-top:1.5px solid var(--line);padding-top:6px;margin-top:6px"><span style="font-weight:700">Tổng cộng:</span><span style="font-weight:700;color:var(--coral);font-size:15px">'+fmtBig(total)+'đ</span></div>'+
        '</div>'+
      '</div>'+
    '</div>'+

    /* Items */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:14px 20px">'+
      '<div style="font-weight:700;font-size:13.5px;margin-bottom:12px">🛒 Sản phẩm ('+(o.items||[]).length+')</div>'+
      '<table style="width:100%;border-collapse:collapse">'+
        '<thead><tr style="border-bottom:1.5px solid var(--line)">'+
          '<th style="text-align:left;padding:6px 8px;font-size:12px;color:var(--text-soft);font-weight:600">Tên sản phẩm</th>'+
          '<th style="text-align:center;padding:6px 8px;font-size:12px;color:var(--text-soft);font-weight:600">Số lượng</th>'+
          '<th style="text-align:right;padding:6px 8px;font-size:12px;color:var(--text-soft);font-weight:600">Đơn giá</th>'+
          '<th style="text-align:right;padding:6px 8px;font-size:12px;color:var(--text-soft);font-weight:600">Thành tiền</th>'+
        '</tr></thead>'+
        '<tbody>'+
          (o.items||[]).map(it=>'<tr style="border-bottom:1px solid var(--line)">'+
            '<td style="padding:8px;font-size:13.5px">'+escHtml(it.name)+(it.unit?' <span style="font-size:11.5px;color:var(--text-soft)">/ '+escHtml(it.unit)+'</span>':'')+'</td>'+
            '<td style="text-align:center;padding:8px;font-size:13.5px">'+it.qty+'</td>'+
            '<td style="text-align:right;padding:8px;font-size:13.5px">'+fmtBig(it.price)+'đ</td>'+
            '<td style="text-align:right;padding:8px;font-size:13.5px;font-weight:600">'+fmtBig(it.price*it.qty)+'đ</td>'+
          '</tr>').join('')+
        '</tbody>'+
      '</table>'+
    '</div>'+
  '</div>';
}

function doSellerToggleOrderSelect(id){
  const i=sellerOrderSelected.indexOf(id);
  if(i===-1)sellerOrderSelected.push(id);else sellerOrderSelected.splice(i,1);
  renderAccount();
}

function doSellerToggleSelectAllOrders(){
  const s=activeSellers.find(x=>x.email===user.email);
  const all=s?s.orders||[]:[];
  let list=all.filter(o=>o.status!=='delivered'&&o.status!=='cancelled');
  if(sellerOrderSearch){const q=sellerOrderSearch.toLowerCase();list=list.filter(o=>o.id.toLowerCase().includes(q)||o.buyer.toLowerCase().includes(q));}
  if(sellerOrderStatusFilter!=='all')list=list.filter(o=>o.status===sellerOrderStatusFilter);
  const ids=list.map(o=>o.id);
  const allSel=ids.every(id=>sellerOrderSelected.includes(id));
  sellerOrderSelected=allSel?sellerOrderSelected.filter(id=>!ids.includes(id)):[...new Set([...sellerOrderSelected,...ids])];
  renderAccount();
}

function _findOrder(id){
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);
  if(sIdx===-1)return{sIdx:-1,oIdx:-1};
  const oIdx=(activeSellers[sIdx].orders||[]).findIndex(x=>x.id===id);
  return{sIdx,oIdx};
}

function doSellerConfirmOrder(id){
  const {sIdx,oIdx}=_findOrder(id);if(oIdx===-1)return;
  activeSellers[sIdx].orders[oIdx].status='processing';
  activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
  saveActiveSellers();
  toast('✓ Đã xác nhận đơn #'+id+' — chuyển sang Đang xử lý');
  addNotif('Đơn hàng #'+id+' đã được xác nhận và đang xử lý.');
  renderAccount();
}

function doSellerStartShipping(id){
  const {sIdx,oIdx}=_findOrder(id);if(oIdx===-1)return;
  activeSellers[sIdx].orders[oIdx].status='shipping';
  activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
  saveActiveSellers();
  toast('🚚 Đơn #'+id+' đang được giao');
  renderAccount();
}

function doSellerMarkDelivered(id){
  const {sIdx,oIdx}=_findOrder(id);if(oIdx===-1)return;
  activeSellers[sIdx].orders[oIdx].status='delivered';
  activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
  saveActiveSellers();
  toast('✅ Đơn #'+id+' đã giao xong!');
  addNotif('Đơn hàng #'+id+' đã được giao thành công.');
  renderAccount();
}

function doSellerSaveTracking(id){
  const val=((document.getElementById('trackingInput')||{}).value||'').trim();
  if(!val){toast('Vui lòng nhập mã vận đơn.');return;}
  const {sIdx,oIdx}=_findOrder(id);if(oIdx===-1)return;
  activeSellers[sIdx].orders[oIdx].trackingNumber=val;
  activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
  saveActiveSellers();
  sellerTrackingOrderId=null;
  toast('✓ Đã lưu mã vận đơn: '+val);
  renderAccount();
}

function doSellerOpenCancel(id){
  sellerCancelOrderId=id;
  sellerTrackingOrderId=null;
  renderAccount();
}

function doSellerConfirmCancel(){
  const reason=((document.getElementById('cancelReasonInput')||{}).value||'').trim();
  if(!reason){toast('Vui lòng nhập lý do hủy đơn.');return;}
  const id=sellerCancelOrderId;
  const {sIdx,oIdx}=_findOrder(id);if(oIdx===-1)return;
  activeSellers[sIdx].orders[oIdx].status='cancelled';
  activeSellers[sIdx].orders[oIdx].cancelReason=reason;
  activeSellers[sIdx].orders[oIdx].cancelledAt=todayStr();
  activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
  saveActiveSellers();
  sellerCancelOrderId=null;
  sellerOrderSelected=sellerOrderSelected.filter(x=>x!==id);
  toast('Đơn #'+id+' đã bị hủy.');
  addNotif('Đơn hàng #'+id+' đã bị hủy — lý do: '+reason);
  renderAccount();
}

function doSellerBulkConfirmOrders(){
  if(!sellerOrderSelected.length)return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  let confirmed=0;
  sellerOrderSelected.forEach(id=>{
    const oIdx=(activeSellers[sIdx].orders||[]).findIndex(x=>x.id===id);
    if(oIdx!==-1&&activeSellers[sIdx].orders[oIdx].status==='pending'){
      activeSellers[sIdx].orders[oIdx].status='processing';
      activeSellers[sIdx].orders[oIdx].updatedAt=todayStr();
      confirmed++;
    }
  });
  saveActiveSellers();
  sellerOrderSelected=[];
  toast('✓ Đã xác nhận '+confirmed+' đơn hàng.');
  renderAccount();
}

function doSellerPrintOrder(orderId){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s)return;
  const o=(s.orders||[]).find(x=>x.id===orderId);
  if(!o){toast('Không tìm thấy đơn hàng.');return;}
  _sellerOpenPrintWindow([o],s);
}

function doSellerBulkPrintOrders(){
  if(!sellerOrderSelected.length){toast('Vui lòng chọn ít nhất 1 đơn hàng để in.');return;}
  const s=activeSellers.find(x=>x.email===user.email);if(!s)return;
  const orders=(s.orders||[]).filter(o=>sellerOrderSelected.includes(o.id));
  _sellerOpenPrintWindow(orders,s);
}

function _sellerOrderSlipHtml(o,shopName){
  const total=o.total||((o.subtotal||0)+(o.shippingFee||0));
  const rows=(o.items||[]).map(it=>
    '<tr><td style="padding:4px 6px;border:1px solid #ccc">'+it.name+'</td>'+
    '<td style="padding:4px 6px;border:1px solid #ccc;text-align:center">'+it.qty+(it.unit?' '+it.unit:'')+'</td>'+
    '<td style="padding:4px 6px;border:1px solid #ccc;text-align:right">'+fmtBig(it.price)+'đ</td>'+
    '<td style="padding:4px 6px;border:1px solid #ccc;text-align:right">'+fmtBig(it.price*it.qty)+'đ</td></tr>'
  ).join('');
  return '<div style="border:2px solid #333;border-radius:8px;padding:20px 24px;margin-bottom:24px;page-break-inside:avoid;font-family:Arial,sans-serif">'+
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #333;padding-bottom:12px;margin-bottom:12px">'+
      '<div><div style="font-size:18px;font-weight:700">PHIẾU GIAO HÀNG</div><div style="font-size:12px;color:#555;margin-top:4px">'+shopName+'</div></div>'+
      '<div style="text-align:right"><div style="font-size:15px;font-weight:700">#'+o.id+'</div><div style="font-size:12px;color:#555">'+o.date+'</div>'+
        (o.trackingNumber?'<div style="font-size:11px;background:#f3e5f5;padding:2px 8px;border-radius:4px;margin-top:4px;color:#6a1b9a">🚚 '+o.trackingNumber+'</div>':'')+
      '</div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:12px;font-size:13px">'+
      '<div><strong>Người nhận:</strong><br>'+o.buyer+'<br>'+(o.buyerPhone||'')+'<br><span style="color:#555">'+(o.buyerAddress||'')+'</span></div>'+
      '<div style="text-align:right"><strong>Trạng thái:</strong><br><span style="font-weight:700">'+((SELLER_ORDER_STATUS[o.status]||{}).lbl||o.status)+'</span>'+
        (o.note?'<br><span style="font-size:11px;color:#795548">📝 '+o.note+'</span>':'')+
      '</div>'+
    '</div>'+
    '<table style="width:100%;border-collapse:collapse;margin-bottom:10px;font-size:13px">'+
      '<thead><tr style="background:#f5f5f5">'+
        '<th style="padding:4px 6px;border:1px solid #ccc;text-align:left">Sản phẩm</th>'+
        '<th style="padding:4px 6px;border:1px solid #ccc;text-align:center">SL</th>'+
        '<th style="padding:4px 6px;border:1px solid #ccc;text-align:right">Đơn giá</th>'+
        '<th style="padding:4px 6px;border:1px solid #ccc;text-align:right">Thành tiền</th>'+
      '</tr></thead>'+
      '<tbody>'+rows+'</tbody>'+
    '</table>'+
    '<div style="text-align:right;font-size:13px">'+
      (o.shippingFee?'<div>Phí vận chuyển: '+fmtBig(o.shippingFee)+'đ</div>':'')+
      '<div style="font-size:15px;font-weight:700;margin-top:4px">Tổng cộng: '+fmtBig(total)+'đ</div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px;font-size:12px;text-align:center">'+
      '<div style="border-top:1px dashed #999;padding-top:8px;color:#555">Chữ ký người giao</div>'+
      '<div style="border-top:1px dashed #999;padding-top:8px;color:#555">Chữ ký người nhận</div>'+
    '</div>'+
  '</div>';
}

function _sellerOpenPrintWindow(orders,s){
  const shopName=s.shopName||'Gian hàng';
  const slips=orders.map(o=>_sellerOrderSlipHtml(o,shopName)).join('');
  const win=window.open('','_blank','width=800,height=900');
  if(!win){toast('Trình duyệt chặn popup. Vui lòng cho phép popup để in phiếu.');return;}
  win.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Phiếu giao hàng — '+shopName+'</title>'+
    '<style>body{font-family:Arial,sans-serif;margin:20px}@media print{body{margin:0}}</style></head>'+
    '<body>'+
      '<div style="text-align:right;margin-bottom:16px;font-size:13px"><button onclick="window.print()" style="padding:8px 20px;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600">🖨 In ngay</button></div>'+
      slips+
    '</body></html>');
  win.document.close();
}

/* ── 6f. Warehouse Management ── */
function _getAllSellerProducts(s){
  const rows=[];
  (s.products||[]).forEach(p=>rows.push({id:p.id,type:'books',typeLabel:'Sách giấy',name:p.name,unit:p.unit||'Quyển',stock:p.stock,lowStockThreshold:p.lowStockThreshold||5,status:p.status,price:p.price,sold:p.sold||0}));
  (s.vppProducts||[]).forEach(p=>rows.push({id:p.id,type:'vpp',typeLabel:'VPP',name:p.name,unit:p.unit||'Cái',stock:p.stock,lowStockThreshold:p.lowStockThreshold||10,status:p.status,price:p.price,sold:p.sold||0}));
  (s.tbgdProducts||[]).forEach(p=>rows.push({id:p.id,type:'tbgd',typeLabel:'Thiết bị',name:p.name,unit:p.unit||'Cái',stock:p.stock,lowStockThreshold:p.lowStockThreshold||3,status:p.status,price:p.price,sold:p.sold||0}));
  return rows;
}

function sellerWarehouse(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const tabBar=(tabs)=>tabs.map(([k,lbl])=>
    '<button onclick="sellerWarehouseTab=\''+k+'\';renderAccount()" style="padding:8px 20px;border:none;border-bottom:2.5px solid '+(sellerWarehouseTab===k?'#1565c0':'transparent')+';background:transparent;color:'+(sellerWarehouseTab===k?'#1565c0':'var(--text-soft)')+';font-size:13.5px;font-weight:'+(sellerWarehouseTab===k?'700':'400')+';cursor:pointer">'+lbl+'</button>'
  ).join('');

  const tabNav='<div style="display:flex;border-bottom:1.5px solid var(--line);margin-bottom:20px">'+
    tabBar([['stock','📦 Tồn kho'],['receipts','📋 Phiếu nhập'],['thresholds','🔔 Ngưỡng cảnh báo']])+
  '</div>';

  if(sellerWarehouseTab==='stock')     return '<div class="panel"><h3 style="margin:0 0 4px">Quản lý Kho hàng</h3><p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Theo dõi tồn kho toàn bộ sản phẩm.</p>'+tabNav+_warehouseStockTab(s)+'</div>';
  if(sellerWarehouseTab==='receipts')  return '<div class="panel"><h3 style="margin:0 0 4px">Quản lý Kho hàng</h3><p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Phiếu nhập kho.</p>'+tabNav+_warehouseReceiptsTab(s)+'</div>';
  if(sellerWarehouseTab==='thresholds')return '<div class="panel"><h3 style="margin:0 0 4px">Quản lý Kho hàng</h3><p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Cài đặt ngưỡng cảnh báo tồn kho.</p>'+tabNav+_warehouseThresholdsTab(s)+'</div>';
  return '<div class="panel">'+tabNav+'</div>';
}

function _warehouseStockTab(s){
  const all=_getAllSellerProducts(s);
  const low=all.filter(p=>p.stock>0&&p.stock<=p.lowStockThreshold);
  const out=all.filter(p=>p.stock===0);
  const totalItems=all.reduce((a,p)=>a+p.stock,0);
  const totalValue=all.reduce((a,p)=>a+p.stock*p.price,0);
  let list=all.slice();
  if(sellerStockSearch){const q=sellerStockSearch.toLowerCase();list=list.filter(p=>p.name.toLowerCase().includes(q));}
  if(sellerStockFilter==='low') list=list.filter(p=>p.stock>0&&p.stock<=p.lowStockThreshold);
  else if(sellerStockFilter==='out') list=list.filter(p=>p.stock===0);
  const typeClr={books:'#1565c0',vpp:'#2e7d32',tbgd:'#6a1b9a'};

  const rows=list.length
    ?list.map(p=>{
      const thr=p.lowStockThreshold;
      const stockClr=p.stock===0?'#e74c3c':p.stock<=thr?'#e67e22':'#27ae60';
      const warnIcon=p.stock===0?'🔴':p.stock<=thr?'🟡':'🟢';
      const pct=Math.min(100,Math.round((p.stock/(thr*3||15))*100));
      return '<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:9px 8px">'+
          '<span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:'+(typeClr[p.type]||'#555')+'18;color:'+(typeClr[p.type]||'#555')+';font-weight:600">'+escHtml(p.typeLabel)+'</span>'+
        '</td>'+
        '<td style="padding:9px 8px"><div style="font-weight:600;font-size:13.5px">'+escHtml(p.name)+'</div></td>'+
        '<td style="padding:9px 8px;text-align:center">'+
          warnIcon+' <span style="font-weight:700;font-size:14px;color:'+stockClr+'">'+p.stock+'</span> '+escHtml(p.unit)+
          '<div style="background:#f0f0f0;border-radius:4px;height:5px;width:80px;margin:4px auto 0">'+
            '<div style="background:'+stockClr+';height:5px;border-radius:4px;width:'+pct+'%"></div>'+
          '</div>'+
        '</td>'+
        '<td style="padding:9px 8px;text-align:center;font-size:12.5px;color:var(--text-soft)">ngưỡng: <strong>'+thr+'</strong></td>'+
        '<td style="padding:9px 8px;text-align:right;font-size:13.5px;color:var(--coral)">'+fmtBig(p.price)+'đ</td>'+
        '<td style="padding:9px 8px;text-align:right;font-size:13.5px;color:#1565c0;font-weight:600">'+fmtBig(p.stock*p.price)+'đ</td>'+
        '<td style="padding:9px 8px;text-align:center;font-size:13px;color:var(--text-soft)">'+p.sold+'</td>'+
        '<td style="padding:9px 8px">'+
          (p.stock===0||p.stock<=thr?'<button onclick="sellerWarehouseTab=\'receipts\';sellerEditReceiptId=\'new\';sellerReceiptLines=[{productId:\''+p.id+'\',productType:\''+p.type+'\',productName:'+JSON.stringify(p.name)+',unit:\''+p.unit+'\',qty:1,importPrice:0,total:0}];sellerReceiptSupplier=\'\';sellerReceiptNote=\'\';renderAccount()" style="padding:4px 10px;font-size:12px;border:1.5px solid #e65100;border-radius:6px;background:#fff9f0;color:#e65100;cursor:pointer">📦 Nhập hàng</button>':'')+
        '</td>'+
      '</tr>';
    }).join('')
    :'<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-soft)">Không có sản phẩm nào.</td></tr>';

  return '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px">'+
    '<div style="background:#e8f4fd;border-radius:10px;padding:16px 18px;text-align:center"><div style="font-size:24px;font-weight:700;color:#1565c0">'+all.length+'</div><div style="font-size:12.5px;color:#555;margin-top:4px">Tổng mặt hàng</div></div>'+
    '<div style="background:#e8f5e9;border-radius:10px;padding:16px 18px;text-align:center"><div style="font-size:24px;font-weight:700;color:#2e7d32">'+fmtBig(totalItems)+'</div><div style="font-size:12.5px;color:#555;margin-top:4px">Tổng tồn kho</div></div>'+
    '<div style="background:#fff8e1;border-radius:10px;padding:16px 18px;text-align:center"><div style="font-size:24px;font-weight:700;color:#f57f17">'+low.length+'</div><div style="font-size:12.5px;color:#555;margin-top:4px">Sắp hết hàng</div></div>'+
    '<div style="background:#ffebee;border-radius:10px;padding:16px 18px;text-align:center"><div style="font-size:24px;font-weight:700;color:#b71c1c">'+out.length+'</div><div style="font-size:12.5px;color:#555;margin-top:4px">Hết hàng</div></div>'+
  '</div>'+
  '<div style="background:#f8f6f3;border-radius:8px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">'+
    '<span style="font-size:13.5px;color:var(--text-soft)">Tổng giá trị tồn kho:</span>'+
    '<span style="font-size:18px;font-weight:700;color:#1565c0">'+fmtMil(totalValue)+'đ</span>'+
  '</div>'+
  '<div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;align-items:center">'+
    '<input placeholder="🔍 Tìm sản phẩm..." value="'+escHtml(sellerStockSearch)+'" oninput="sellerStockSearch=this.value;renderAccount()" style="flex:1;min-width:180px;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
    '<div style="display:flex;gap:6px">'+
      [['all','Tất cả ('+all.length+')'],['low','Sắp hết 🟡 ('+low.length+')'],['out','Hết hàng 🔴 ('+out.length+')']].map(([k,lbl])=>
        '<button onclick="sellerStockFilter=\''+k+'\';renderAccount()" style="padding:5px 13px;border-radius:20px;border:1.5px solid '+(sellerStockFilter===k?'var(--ink)':'var(--line)')+';background:'+(sellerStockFilter===k?'var(--ink)':'transparent')+';color:'+(sellerStockFilter===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+lbl+'</button>'
      ).join('')+
    '</div>'+
  '</div>'+
  '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+
    '<thead><tr style="background:#f8f6f3">'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Loại</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Tên sản phẩm</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Tồn kho</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Ngưỡng</th>'+
      '<th style="padding:9px 8px;text-align:right;font-size:12px;color:var(--text-soft);font-weight:600">Giá bán</th>'+
      '<th style="padding:9px 8px;text-align:right;font-size:12px;color:var(--text-soft);font-weight:600">Giá trị tồn</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Đã bán</th>'+
      '<th style="padding:9px 8px"></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function _warehouseReceiptsTab(s){
  const receipts=(s.receipts||[]).slice().reverse();
  const stBadge={
    confirmed:'<span style="font-size:11px;padding:2px 9px;border-radius:6px;background:#e8f5e9;color:#2e7d32;font-weight:600">✓ Đã xác nhận</span>',
    draft:'<span style="font-size:11px;padding:2px 9px;border-radius:6px;background:#fff8e1;color:#f57f17;font-weight:600">Nháp</span>'
  };

  /* Form tạo / chỉnh sửa phiếu */
  if(sellerEditReceiptId){
    const isNew=sellerEditReceiptId==='new';
    const existing=isNew?null:receipts.find(r=>r.id===sellerEditReceiptId);
    const allProds=_getAllSellerProducts(s);

    const lineRows=sellerReceiptLines.map((ln,i)=>'<tr style="border-top:1px solid var(--line)">'+
      '<td style="padding:8px;font-size:13px">'+escHtml(ln.productName)+'<br><span style="font-size:11px;color:var(--text-soft)">'+escHtml(ln.productType==='books'?'Sách':ln.productType==='vpp'?'VPP':'Thiết bị')+'</span></td>'+
      '<td style="padding:8px;text-align:center"><input type="number" min="1" value="'+ln.qty+'" onchange="sellerReceiptLines['+i+'].qty=Math.max(1,parseInt(this.value)||1);sellerReceiptLines['+i+'].total=sellerReceiptLines['+i+'].qty*sellerReceiptLines['+i+'].importPrice;renderAccount()" style="width:70px;padding:5px;border:1.5px solid var(--line);border-radius:6px;text-align:center;font-size:13px"></td>'+
      '<td style="padding:8px;text-align:center"><input type="number" min="0" step="100" value="'+ln.importPrice+'" onchange="sellerReceiptLines['+i+'].importPrice=parseFloat(this.value)||0;sellerReceiptLines['+i+'].total=sellerReceiptLines['+i+'].qty*sellerReceiptLines['+i+'].importPrice;renderAccount()" style="width:110px;padding:5px;border:1.5px solid var(--line);border-radius:6px;text-align:right;font-size:13px"></td>'+
      '<td style="padding:8px;text-align:right;font-weight:600;font-size:13.5px;color:#1565c0">'+fmtBig(ln.total)+'đ</td>'+
      '<td style="padding:8px;text-align:center"><button onclick="sellerReceiptLines.splice('+i+',1);renderAccount()" style="padding:4px 9px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;color:#e74c3c;cursor:pointer;font-size:12px">✕</button></td>'+
    '</tr>').join('');

    const totalQty=sellerReceiptLines.reduce((a,l)=>a+l.qty,0);
    const totalVal=sellerReceiptLines.reduce((a,l)=>a+l.total,0);

    const unusedProds=allProds.filter(p=>!sellerReceiptLines.find(l=>l.productId===p.id));

    return '<div style="background:#f8f6f3;border-radius:10px;padding:18px 20px">'+
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">'+
        '<button onclick="sellerEditReceiptId=null;sellerReceiptLines=[];renderAccount()" style="padding:5px 12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;font-size:13px">← Quay lại</button>'+
        '<h4 style="margin:0;font-size:1rem;font-weight:700">'+(isNew?'Tạo phiếu nhập kho mới':'Chỉnh sửa phiếu '+escHtml(sellerEditReceiptId))+'</h4>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Nhà cung cấp <span style="color:#e74c3c">*</span></label>'+
          '<input id="rcvSupplier" value="'+escHtml(sellerReceiptSupplier)+'" oninput="sellerReceiptSupplier=this.value" placeholder="Tên nhà cung cấp..." style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
        '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Ghi chú</label>'+
          '<input id="rcvNote" value="'+escHtml(sellerReceiptNote)+'" oninput="sellerReceiptNote=this.value" placeholder="Ghi chú phiếu nhập..." style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
      '</div>'+
      '<div style="margin-bottom:12px"><label style="font-size:13px;font-weight:600;display:block;margin-bottom:6px">Thêm sản phẩm vào phiếu</label>'+
        '<select onchange="if(this.value){const p='+JSON.stringify(allProds).replace(/"/g,'&quot;')+'.find(x=>x.id===this.value);if(p){sellerReceiptLines.push({productId:p.id,productType:p.type,productName:p.name,unit:p.unit,qty:1,importPrice:0,total:0});renderAccount();}this.value=\'\'}" style="padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper);max-width:400px">'+
          '<option value="">-- Chọn sản phẩm --</option>'+
          unusedProds.map(p=>'<option value="'+p.id+'">['+escHtml(p.typeLabel)+'] '+escHtml(p.name)+'</option>').join('')+
        '</select>'+
      '</div>'+
      (sellerReceiptLines.length
        ?'<table style="width:100%;border-collapse:collapse;margin-bottom:14px"><thead><tr style="background:#fff"><th style="padding:8px;text-align:left;font-size:12px;color:var(--text-soft)">Sản phẩm</th><th style="padding:8px;text-align:center;font-size:12px;color:var(--text-soft)">Số lượng</th><th style="padding:8px;text-align:center;font-size:12px;color:var(--text-soft)">Giá nhập (đ)</th><th style="padding:8px;text-align:right;font-size:12px;color:var(--text-soft)">Thành tiền</th><th></th></tr></thead><tbody>'+lineRows+'</tbody>'+
          '<tfoot><tr style="border-top:2px solid var(--line);background:#f8f6f3"><td colspan="2" style="padding:8px;font-weight:700">Tổng: '+totalQty+' sản phẩm</td><td></td><td style="padding:8px;text-align:right;font-weight:700;font-size:15px;color:#1565c0">'+fmtBig(totalVal)+'đ</td><td></td></tr></tfoot></table>'
        :'<div style="text-align:center;padding:20px;color:var(--text-soft);font-size:13.5px;border:2px dashed var(--line);border-radius:8px;margin-bottom:14px">Chọn sản phẩm từ danh sách trên để thêm vào phiếu nhập.</div>'
      )+
      '<div style="display:flex;gap:10px;justify-content:flex-end">'+
        '<button onclick="sellerEditReceiptId=null;sellerReceiptLines=[];renderAccount()" style="padding:8px 18px;border:1.5px solid var(--line);border-radius:8px;background:transparent;cursor:pointer;font-size:13.5px">Hủy</button>'+
        '<button onclick="doSellerSaveReceipt(\'draft\')" style="padding:8px 18px;border:1.5px solid #f57f17;border-radius:8px;background:#fff8e1;color:#f57f17;cursor:pointer;font-size:13.5px;font-weight:600">Lưu nháp</button>'+
        '<button onclick="doSellerSaveReceipt(\'confirmed\')" style="padding:8px 18px;border:none;border-radius:8px;background:#1565c0;color:#fff;cursor:pointer;font-size:13.5px;font-weight:600">✓ Xác nhận nhập kho</button>'+
      '</div>'+
    '</div>';
  }

  /* Danh sách phiếu nhập */
  const receiptRows=receipts.length
    ?receipts.map(r=>'<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:10px 8px;font-weight:600;font-size:13.5px">#'+escHtml(r.id)+'</td>'+
        '<td style="padding:10px 8px;font-size:13.5px">'+escHtml(r.supplier)+'</td>'+
        '<td style="padding:10px 8px;font-size:13.5px;color:var(--text-soft)">'+
          r.lines.slice(0,2).map(l=>escHtml(l.productName)+' ×'+l.qty).join(', ')+
          (r.lines.length>2?' +'+( r.lines.length-2)+' nữa':'')+
        '</td>'+
        '<td style="padding:10px 8px;text-align:center;font-size:13.5px">'+r.totalQty+'</td>'+
        '<td style="padding:10px 8px;text-align:right;font-weight:600;color:#1565c0">'+fmtMil(r.totalValue)+'đ</td>'+
        '<td style="padding:10px 8px">'+escHtml(r.createdAt)+'</td>'+
        '<td style="padding:10px 8px">'+(stBadge[r.status]||r.status)+'</td>'+
        '<td style="padding:10px 8px;white-space:nowrap">'+
          (r.status==='draft'?'<button onclick="doSellerEditReceipt(\''+r.id+'\')" style="padding:4px 10px;font-size:12px;border:1.5px solid var(--line);border-radius:6px;background:transparent;cursor:pointer;margin-right:3px">✏ Sửa</button>':'')+
          (r.status==='draft'?'<button onclick="doSellerConfirmReceipt(\''+r.id+'\')" style="padding:4px 10px;font-size:12px;border:none;border-radius:6px;background:#1565c0;color:#fff;cursor:pointer;margin-right:3px">✓ XN</button>':'')+
          (r.status==='draft'?'<button onclick="doSellerDeleteReceipt(\''+r.id+'\')" style="padding:4px 9px;font-size:12px;border:1.5px solid #f5c0c0;border-radius:6px;background:transparent;color:#e74c3c;cursor:pointer">🗑</button>':'')+
        '</td>'+
      '</tr>').join('')
    :'<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-soft)">Chưa có phiếu nhập kho nào.</td></tr>';

  return '<div style="display:flex;justify-content:flex-end;margin-bottom:14px">'+
    '<button onclick="sellerEditReceiptId=\'new\';sellerReceiptLines=[];sellerReceiptSupplier=\'\';sellerReceiptNote=\'\';renderAccount()" style="padding:8px 18px;border:none;border-radius:8px;background:#1565c0;color:#fff;cursor:pointer;font-size:13.5px;font-weight:600">+ Tạo phiếu nhập mới</button>'+
  '</div>'+
  '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+
    '<thead><tr style="background:#f8f6f3">'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Mã phiếu</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Nhà cung cấp</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Sản phẩm</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Tổng SL</th>'+
      '<th style="padding:9px 8px;text-align:right;font-size:12px;color:var(--text-soft);font-weight:600">Giá trị</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Ngày tạo</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
      '<th style="padding:9px 8px"></th>'+
    '</tr></thead><tbody>'+receiptRows+'</tbody></table></div>';
}

function _warehouseThresholdsTab(s){
  const all=_getAllSellerProducts(s);
  const typeClr={books:'#1565c0',vpp:'#2e7d32',tbgd:'#6a1b9a'};
  const rows=all.map((p,i)=>'<tr style="border-top:1px solid var(--line)">'+
    '<td style="padding:9px 8px">'+
      '<span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:'+(typeClr[p.type]||'#555')+'18;color:'+(typeClr[p.type]||'#555')+';font-weight:600">'+escHtml(p.typeLabel)+'</span>'+
    '</td>'+
    '<td style="padding:9px 8px;font-weight:600;font-size:13.5px">'+escHtml(p.name)+'</td>'+
    '<td style="padding:9px 8px;text-align:center">'+
      '<span style="font-weight:700;font-size:14px;color:'+(p.stock===0?'#e74c3c':p.stock<=p.lowStockThreshold?'#e67e22':'#27ae60')+'">'+p.stock+'</span> '+escHtml(p.unit)+
    '</td>'+
    '<td style="padding:9px 8px;text-align:center">'+
      '<input type="number" min="0" value="'+p.lowStockThreshold+'" id="thr_'+p.type+'_'+p.id+'" style="width:70px;padding:5px 8px;border:1.5px solid var(--line);border-radius:6px;text-align:center;font-size:13.5px;background:var(--paper)">'+
      ' '+escHtml(p.unit)+
    '</td>'+
    '<td style="padding:9px 8px;text-align:center">'+
      '<button onclick="doSellerSaveThreshold(\''+p.id+'\',\''+p.type+'\')" style="padding:5px 14px;border:none;border-radius:6px;background:#1565c0;color:#fff;cursor:pointer;font-size:12.5px;font-weight:600">Lưu</button>'+
    '</td>'+
  '</tr>').join('');

  return '<div style="background:#e8f4fd;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#1565c0">'+
    '🔔 Khi tồn kho của sản phẩm xuống dưới ngưỡng, hệ thống sẽ gửi thông báo vào mục <strong>Thông báo</strong> và hiển thị banner cảnh báo trong trang quản lý sản phẩm tương ứng.'+
  '</div>'+
  '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+
    '<thead><tr style="background:#f8f6f3">'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Loại</th>'+
      '<th style="padding:9px 8px;text-align:left;font-size:12px;color:var(--text-soft);font-weight:600">Tên sản phẩm</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Tồn hiện tại</th>'+
      '<th style="padding:9px 8px;text-align:center;font-size:12px;color:var(--text-soft);font-weight:600">Ngưỡng cảnh báo</th>'+
      '<th style="padding:9px 8px"></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>'+
  '<div style="display:flex;justify-content:flex-end;margin-top:14px">'+
    '<button onclick="doSellerSaveAllThresholds()" style="padding:8px 20px;border:none;border-radius:8px;background:#2e7d32;color:#fff;cursor:pointer;font-size:13.5px;font-weight:600">💾 Lưu tất cả ngưỡng</button>'+
  '</div>';
}

/* ── Warehouse action functions ── */
function doSellerSaveReceipt(status){
  const supplier=((document.getElementById('rcvSupplier')||{}).value||sellerReceiptSupplier).trim();
  if(!supplier){toast('Vui lòng nhập tên nhà cung cấp.');return;}
  if(!sellerReceiptLines.length){toast('Vui lòng thêm ít nhất 1 sản phẩm vào phiếu.');return;}
  if(status==='confirmed'&&sellerReceiptLines.some(l=>l.importPrice<=0)){toast('Vui lòng nhập giá nhập cho tất cả sản phẩm.');return;}
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  activeSellers[sIdx].receipts=activeSellers[sIdx].receipts||[];
  const today=todayStr();
  const totalQty=sellerReceiptLines.reduce((a,l)=>a+l.qty,0);
  const totalValue=sellerReceiptLines.reduce((a,l)=>a+l.total,0);
  const note=(document.getElementById('rcvNote')||{}).value||sellerReceiptNote;

  if(sellerEditReceiptId&&sellerEditReceiptId!=='new'){
    const rIdx=activeSellers[sIdx].receipts.findIndex(r=>r.id===sellerEditReceiptId);
    if(rIdx!==-1){
      const old=activeSellers[sIdx].receipts[rIdx];
      activeSellers[sIdx].receipts[rIdx]={...old,supplier,note,lines:[...sellerReceiptLines],totalQty,totalValue,status};
      if(status==='confirmed'&&old.status==='draft'){
        _applyReceiptToStock(sIdx,sellerReceiptLines);
        activeSellers[sIdx].receipts[rIdx].confirmedAt=today;
        toast('✓ Phiếu nhập đã xác nhận — tồn kho đã được cập nhật.');
        addNotif('Phiếu nhập '+sellerEditReceiptId+' đã được xác nhận, tồn kho đã cập nhật.');
      } else {
        toast('✓ Đã lưu phiếu nhập.');
      }
    }
  } else {
    const newId='PNK-'+Date.now().toString(36).toUpperCase();
    const receipt={id:newId,supplier,note,status,createdAt:today,confirmedAt:status==='confirmed'?today:'',lines:[...sellerReceiptLines],totalQty,totalValue};
    activeSellers[sIdx].receipts.push(receipt);
    if(status==='confirmed'){
      _applyReceiptToStock(sIdx,sellerReceiptLines);
      toast('✓ Phiếu nhập đã xác nhận — tồn kho đã được cập nhật.');
      addNotif('Phiếu nhập kho mới đã được xác nhận, tồn kho đã cập nhật.');
    } else {
      toast('Đã lưu phiếu nháp.');
    }
  }
  saveActiveSellers();
  sellerEditReceiptId=null;sellerReceiptLines=[];sellerReceiptSupplier='';sellerReceiptNote='';
  renderAccount();
}

function _applyReceiptToStock(sIdx,lines){
  lines.forEach(ln=>{
    if(ln.productType==='books'){
      const p=activeSellers[sIdx].products||[];
      const i=p.findIndex(x=>x.id===ln.productId);
      if(i!==-1){p[i].stock+=ln.qty;if(p[i].status==='outofstock')p[i].status='active';p[i].updatedAt=todayStr();}
    } else if(ln.productType==='vpp'){
      const p=activeSellers[sIdx].vppProducts||[];
      const i=p.findIndex(x=>x.id===ln.productId);
      if(i!==-1){p[i].stock+=ln.qty;if(p[i].status==='outofstock')p[i].status='active';p[i].updatedAt=todayStr();}
    } else if(ln.productType==='tbgd'){
      const p=activeSellers[sIdx].tbgdProducts||[];
      const i=p.findIndex(x=>x.id===ln.productId);
      if(i!==-1){p[i].stock+=ln.qty;if(p[i].status==='outofstock')p[i].status='active';p[i].updatedAt=todayStr();}
    }
  });
}

function doSellerEditReceipt(id){
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const r=(activeSellers[sIdx].receipts||[]).find(x=>x.id===id);
  if(!r||r.status!=='draft'){toast('Chỉ có thể sửa phiếu nháp.');return;}
  sellerEditReceiptId=id;
  sellerReceiptLines=r.lines.map(l=>({...l}));
  sellerReceiptSupplier=r.supplier;
  sellerReceiptNote=r.note||'';
  renderAccount();
}

function doSellerConfirmReceipt(id){
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const rIdx=(activeSellers[sIdx].receipts||[]).findIndex(x=>x.id===id);
  if(rIdx===-1)return;
  const r=activeSellers[sIdx].receipts[rIdx];
  if(r.status==='confirmed'){toast('Phiếu này đã được xác nhận rồi.');return;}
  if(r.lines.some(l=>l.importPrice<=0)){toast('Phiếu có sản phẩm chưa có giá nhập — vui lòng chỉnh sửa trước khi xác nhận.');return;}
  _applyReceiptToStock(sIdx,r.lines);
  activeSellers[sIdx].receipts[rIdx].status='confirmed';
  activeSellers[sIdx].receipts[rIdx].confirmedAt=todayStr();
  saveActiveSellers();
  toast('✓ Phiếu #'+id+' đã xác nhận — tồn kho đã cập nhật.');
  addNotif('Phiếu nhập kho #'+id+' đã xác nhận, tồn kho đã được cập nhật.');
  renderAccount();
}

function doSellerDeleteReceipt(id){
  if(!confirm('Xóa phiếu nhập #'+id+'? Hành động này không thể hoàn tác.'))return;
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const rIdx=(activeSellers[sIdx].receipts||[]).findIndex(x=>x.id===id);
  if(rIdx===-1)return;
  if(activeSellers[sIdx].receipts[rIdx].status==='confirmed'){toast('Không thể xóa phiếu đã xác nhận.');return;}
  activeSellers[sIdx].receipts.splice(rIdx,1);
  saveActiveSellers();
  toast('Đã xóa phiếu nhập #'+id+'.');
  renderAccount();
}

function doSellerSaveThreshold(productId,productType){
  const el=document.getElementById('thr_'+productType+'_'+productId);
  if(!el)return;
  const thr=Math.max(0,parseInt(el.value)||0);
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  const arr=productType==='books'?activeSellers[sIdx].products:productType==='vpp'?activeSellers[sIdx].vppProducts:activeSellers[sIdx].tbgdProducts;
  const pIdx=(arr||[]).findIndex(x=>x.id===productId);
  if(pIdx===-1)return;
  arr[pIdx].lowStockThreshold=thr;
  arr[pIdx].updatedAt=todayStr();
  saveActiveSellers();
  toast('✓ Đã cập nhật ngưỡng cảnh báo cho "'+arr[pIdx].name+'".');
  if(arr[pIdx].stock<=thr&&arr[pIdx].stock>0) addNotif('Cảnh báo: "'+arr[pIdx].name+'" đang có tồn kho ('+arr[pIdx].stock+') ≤ ngưỡng mới ('+thr+').');
  renderAccount();
}

function doSellerSaveAllThresholds(){
  const s=activeSellers.find(x=>x.email===user.email);if(!s)return;
  const all=_getAllSellerProducts(s);
  let saved=0;
  all.forEach(p=>{
    const el=document.getElementById('thr_'+p.type+'_'+p.id);
    if(!el)return;
    const thr=Math.max(0,parseInt(el.value)||0);
    const sIdx=activeSellers.findIndex(x=>x.email===user.email);
    const arr=p.type==='books'?activeSellers[sIdx].products:p.type==='vpp'?activeSellers[sIdx].vppProducts:activeSellers[sIdx].tbgdProducts;
    const pIdx=(arr||[]).findIndex(x=>x.id===p.id);
    if(pIdx!==-1){arr[pIdx].lowStockThreshold=thr;arr[pIdx].updatedAt=todayStr();saved++;}
  });
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);
  if(sIdx!==-1)saveActiveSellers();
  toast('✓ Đã lưu ngưỡng cảnh báo cho '+saved+' sản phẩm.');
  renderAccount();
}

/* ── 6g. Revenue Report ── */
function sellerRevenueReport(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const rd=s.revenueData||{balance:{},revenueByCategory:{},dailyChart:[],weeklyChart:[],monthlyChart:[],yearlyChart:[],transactions:[]};

  const periodCfg={
    day:  {lbl:'Hôm nay',    chart:rd.dailyChart||[],   days:['6h','9h','12h','15h','18h','21h','23h'],  totalKey:'todayRev'},
    week: {lbl:'Tuần này',   chart:rd.weeklyChart||[],  days:['T2','T3','T4','T5','T6','T7','CN'],       totalKey:'thisWeekRev'},
    month:{lbl:'Tháng này',  chart:rd.monthlyChart||[], days:['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'], totalKey:'thisMonthRev'},
    year: {lbl:'Năm nay',    chart:rd.yearlyChart||[],  days:['Q1','Q2','Q3','Q4'],                      totalKey:'totalRevenue'}
  };
  const cfg=periodCfg[sellerRevenuePeriod]||periodCfg.month;
  const chart=cfg.chart;
  const total=(s.stats||{})[cfg.totalKey]||chart.reduce((a,b)=>a+b,0);
  const prevTotal=Math.round(total*(0.78+Math.random()*0.15));
  const growth=prevTotal>0?Math.round(((total-prevTotal)/prevTotal)*100):0;
  const maxVal=Math.max(...chart,1);

  /* Category breakdown */
  const catData=[
    {k:'books', lbl:'Sách giấy', clr:'#1565c0', val:(rd.revenueByCategory||{}).books||0},
    {k:'ebook', lbl:'Ebook',     clr:'#6a1b9a', val:(rd.revenueByCategory||{}).ebook||0},
    {k:'vpp',   lbl:'VPP',       clr:'#2e7d32', val:(rd.revenueByCategory||{}).vpp||0},
    {k:'tbgd',  lbl:'Thiết bị',  clr:'#e65100', val:(rd.revenueByCategory||{}).tbgd||0}
  ];
  const catTotal=catData.reduce((a,c)=>a+c.val,0)||1;

  const periodBtns=[['day','Ngày'],['week','Tuần'],['month','Tháng'],['year','Năm']].map(([k,l])=>
    '<button onclick="sellerRevenuePeriod=\''+k+'\';renderAccount()" style="padding:6px 16px;border-radius:20px;border:1.5px solid '+(sellerRevenuePeriod===k?'#1565c0':'var(--line)')+';background:'+(sellerRevenuePeriod===k?'#1565c0':'transparent')+';color:'+(sellerRevenuePeriod===k?'#fff':'var(--text-soft)')+';font-size:13px;cursor:pointer;font-weight:'+(sellerRevenuePeriod===k?'700':'400')+'">'+l+'</button>'
  ).join('');

  const barChart='<div style="display:flex;align-items:flex-end;gap:4px;height:140px;padding-bottom:22px;position:relative;">'+
    chart.map((val,i)=>{
      const h=Math.round((val/maxVal)*110);
      return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">'+
        (val>0?'<div style="font-size:9px;color:#1565c0;margin-bottom:2px;font-weight:600">'+fmtMil(val)+'</div>':'')+
        '<div style="width:100%;background:#1565c0;border-radius:3px 3px 0 0;height:'+(val>0?h:2)+'px;opacity:'+(val>0?'1':'0.15')+'"></div>'+
        '<div style="font-size:10.5px;color:#888;margin-top:5px;white-space:nowrap">'+escHtml(cfg.days[i]||'')+'</div>'+
      '</div>';
    }).join('')+
  '</div>';

  const txRows=(rd.transactions||[]).slice(0,7).map(tx=>{
    const stClr={pending:'#f57f17',processing:'#1565c0',settled:'#2e7d32',refunded:'#b71c1c'};
    const stLbl={pending:'Chờ thanh toán',processing:'Đang xử lý',settled:'Đã quyết toán',refunded:'Hoàn tiền'};
    const catClr={books:'#1565c0',ebook:'#6a1b9a',vpp:'#2e7d32',tbgd:'#e65100'};
    const catLbl={books:'Sách',ebook:'Ebook',vpp:'VPP',tbgd:'Thiết bị'};
    return '<tr style="border-top:1px solid var(--line)">'+
      '<td style="padding:9px 8px;font-size:12.5px;font-weight:600;color:#1565c0">#'+escHtml(tx.orderId)+'</td>'+
      '<td style="padding:9px 8px;font-size:12.5px">'+escHtml(tx.buyer)+'</td>'+
      '<td style="padding:9px 8px;text-align:center">'+
        '<span style="font-size:10.5px;padding:2px 7px;border-radius:4px;background:'+(catClr[tx.category]||'#555')+'15;color:'+(catClr[tx.category]||'#555')+';font-weight:600">'+escHtml(catLbl[tx.category]||tx.category)+'</span>'+
      '</td>'+
      '<td style="padding:9px 8px;text-align:right;font-size:12.5px">'+fmtBig(tx.orderTotal)+'đ</td>'+
      '<td style="padding:9px 8px;text-align:right;font-size:12.5px;color:#e74c3c">'+tx.commissionRate+'% (−'+fmtBig(tx.commissionAmt)+'đ)</td>'+
      '<td style="padding:9px 8px;text-align:right;font-weight:700;font-size:13px;color:#2e7d32">'+fmtBig(tx.netAmt)+'đ</td>'+
      '<td style="padding:9px 8px">'+
        '<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:'+(stClr[tx.status]||'#555')+'15;color:'+(stClr[tx.status]||'#555')+';font-weight:600">'+escHtml(stLbl[tx.status]||tx.status)+'</span>'+
      '</td>'+
      '<td style="padding:9px 8px;font-size:11.5px;color:var(--text-soft)">'+escHtml(tx.date)+'</td>'+
    '</tr>';
  }).join('');

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">'+
      '<h3 style="margin:0">Báo cáo Doanh thu</h3>'+
      '<div style="display:flex;gap:6px">'+periodBtns+'</div>'+
    '</div>'+

    /* KPI row */
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px">'+
      '<div style="background:#e8f4fd;border-radius:12px;padding:16px 18px">'+
        '<div style="font-size:12px;color:#555;margin-bottom:6px">Tổng doanh thu</div>'+
        '<div style="font-size:22px;font-weight:700;color:#1565c0">'+fmtMil(total)+'đ</div>'+
        '<div style="font-size:11.5px;margin-top:4px;color:'+(growth>=0?'#2e7d32':'#e74c3c')+'">'+
          (growth>=0?'▲ +':' ▼ ')+Math.abs(growth)+'% so với kỳ trước'+
        '</div>'+
      '</div>'+
      '<div style="background:#e8f5e9;border-radius:12px;padding:16px 18px">'+
        '<div style="font-size:12px;color:#555;margin-bottom:6px">Thực nhận (sau phí)</div>'+
        '<div style="font-size:22px;font-weight:700;color:#2e7d32">'+fmtMil(Math.round(total*0.91))+'đ</div>'+
        '<div style="font-size:11.5px;margin-top:4px;color:var(--text-soft)">Trung bình phí: ~9%</div>'+
      '</div>'+
      '<div style="background:#fff8e1;border-radius:12px;padding:16px 18px">'+
        '<div style="font-size:12px;color:#555;margin-bottom:6px">Phí nền tảng</div>'+
        '<div style="font-size:22px;font-weight:700;color:#f57f17">'+fmtMil(Math.round(total*0.09))+'đ</div>'+
        '<div style="font-size:11.5px;margin-top:4px;color:var(--text-soft)">Tính theo từng giao dịch</div>'+
      '</div>'+
      '<div style="background:#f3e5f5;border-radius:12px;padding:16px 18px">'+
        '<div style="font-size:12px;color:#555;margin-bottom:6px">Đơn hoàn thành</div>'+
        '<div style="font-size:22px;font-weight:700;color:#6a1b9a">'+((s.orders||[]).filter(o=>o.status==='delivered').length)+'</div>'+
        '<div style="font-size:11.5px;margin-top:4px;color:var(--text-soft)">Tổng '+((s.orders||[]).length)+' đơn</div>'+
      '</div>'+
    '</div>'+

    /* Chart + category breakdown side by side */
    '<div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:20px">'+
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:14px">📊 Biểu đồ doanh thu — '+cfg.lbl+'</div>'+
        barChart+
        '<div style="text-align:center;font-size:12.5px;color:#2e7d32;font-weight:600;margin-top:4px">Tổng: '+fmtMil(chart.reduce((a,b)=>a+b,0))+'đ</div>'+
      '</div>'+
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:16px">📦 Theo loại sản phẩm</div>'+
        catData.map(c=>{
          const pct=Math.round((c.val/catTotal)*100);
          return '<div style="margin-bottom:14px">'+
            '<div style="display:flex;justify-content:space-between;margin-bottom:4px">'+
              '<span style="font-size:13px;font-weight:600;color:'+c.clr+'">'+c.lbl+'</span>'+
              '<span style="font-size:12.5px;color:var(--text-soft)">'+pct+'%</span>'+
            '</div>'+
            '<div style="background:#e0e0e0;border-radius:4px;height:8px">'+
              '<div style="background:'+c.clr+';height:8px;border-radius:4px;width:'+pct+'%"></div>'+
            '</div>'+
            '<div style="font-size:12px;color:var(--text-soft);margin-top:3px;text-align:right">'+fmtMil(c.val)+'đ</div>'+
          '</div>';
        }).join('')+
      '</div>'+
    '</div>'+

    /* Transaction table */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
      '<div style="font-weight:700;font-size:13.5px;margin-bottom:14px">🧾 Chi tiết giao dịch gần đây</div>'+
      '<div style="overflow-x:auto">'+
        '<table style="width:100%;border-collapse:collapse">'+
          '<thead><tr style="background:#fff">'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Mã đơn</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Khách</th>'+
            '<th style="padding:8px;text-align:center;font-size:11.5px;color:var(--text-soft);font-weight:600">Loại</th>'+
            '<th style="padding:8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Doanh thu</th>'+
            '<th style="padding:8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Phí nền tảng</th>'+
            '<th style="padding:8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Thực nhận</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Ngày</th>'+
          '</tr></thead>'+
          '<tbody>'+txRows+'</tbody>'+
        '</table>'+
        (!(rd.transactions&&rd.transactions.length)?'<div style="text-align:center;padding:30px;color:var(--text-soft)">Chưa có giao dịch nào.</div>':'')+
      '</div>'+
    '</div>'+
  '</div>';
}

/* ── 6h. Enhanced Payment (replace simple bank form) ── */
function sellerPaymentSettings(app){
  const s=app?activeSellers.find(x=>x.email===user.email):null;
  const rd=(s&&s.revenueData)||{balance:{available:0,pendingFromOrders:0,totalEarned:0,totalWithdrawn:0},withdrawals:[],transactions:[]};
  const bal=rd.balance||{};
  const bank=app&&app.shopInfo&&app.shopInfo.bank?app.shopInfo.bank:'';
  const parts=bank.split(' – ');
  const bankName=parts[0]||'',bankAcc=parts[1]||'',bankHolder=parts[2]||'';
  const BANKS=['Vietcombank','Techcombank','MB Bank','BIDV','VietinBank','Agribank','TPBank','VPBank','SHB','ACB','Sacombank','HDBank','OCB','SeABank'];
  const hasBank=bankName&&bankAcc&&bankHolder;
  const maskAcc=bankAcc?'****'+bankAcc.slice(-4):'—';

  const tabBtn=(k,lbl)=>'<button onclick="sellerPayTab=\''+k+'\';renderAccount()" style="padding:8px 20px;border:none;border-bottom:2.5px solid '+(sellerPayTab===k?'#1565c0':'transparent')+';background:transparent;color:'+(sellerPayTab===k?'#1565c0':'var(--text-soft)')+';font-size:13.5px;font-weight:'+(sellerPayTab===k?'700':'400')+';cursor:pointer">'+lbl+'</button>';
  const tabNav='<div style="display:flex;border-bottom:1.5px solid var(--line);margin-bottom:20px">'+
    tabBtn('balance','💰 Số dư & Rút tiền')+
    tabBtn('history','📋 Lịch sử giao dịch')+
    tabBtn('bank','🏦 Tài khoản ngân hàng')+
  '</div>';

  /* Tab: Balance & Withdrawal */
  if(sellerPayTab==='balance'){
    const wdStatusBadge={
      pending:'<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:#fff8e1;color:#f57f17;font-weight:600">Đang chờ</span>',
      processing:'<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:#e8f4fd;color:#1565c0;font-weight:600">Đang xử lý</span>',
      completed:'<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:#e8f5e9;color:#2e7d32;font-weight:600">Hoàn thành</span>',
      rejected:'<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:#ffebee;color:#b71c1c;font-weight:600">Từ chối</span>'
    };
    const withdrawalRows=(rd.withdrawals||[]).length
      ?(rd.withdrawals||[]).map(w=>'<tr style="border-top:1px solid var(--line)">'+
          '<td style="padding:9px 8px;font-size:12.5px;font-weight:600">#'+escHtml(w.id)+'</td>'+
          '<td style="padding:9px 8px;text-align:right;font-weight:700;font-size:13.5px;color:#1565c0">'+fmtMil(w.amount)+'đ</td>'+
          '<td style="padding:9px 8px;font-size:12.5px">'+escHtml(w.bankName)+' · '+escHtml(w.bankAcc)+'</td>'+
          '<td style="padding:9px 8px;font-size:12.5px;color:var(--text-soft)">'+escHtml(w.note||'—')+'</td>'+
          '<td style="padding:9px 8px">'+escHtml(w.requestedAt)+'</td>'+
          '<td style="padding:9px 8px">'+(w.completedAt?escHtml(w.completedAt):'—')+'</td>'+
          '<td style="padding:9px 8px">'+(wdStatusBadge[w.status]||w.status)+'</td>'+
        '</tr>').join('')
      :'<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-soft)">Chưa có lệnh rút tiền nào.</td></tr>';

    return '<div class="panel">'+
      '<h3 style="margin:0 0 4px">Thanh toán</h3>'+
      '<p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Quản lý số dư và yêu cầu rút tiền.</p>'+tabNav+
      /* Balance cards */
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px">'+
        '<div style="background:#e8f5e9;border-radius:12px;padding:18px 20px">'+
          '<div style="font-size:12px;color:#555;margin-bottom:8px">Số dư có thể rút</div>'+
          '<div style="font-size:26px;font-weight:700;color:#2e7d32">'+fmtMil(bal.available||0)+'đ</div>'+
          '<div style="font-size:11.5px;color:#555;margin-top:6px">Sau khi trừ phí nền tảng</div>'+
        '</div>'+
        '<div style="background:#fff8e1;border-radius:12px;padding:18px 20px">'+
          '<div style="font-size:12px;color:#555;margin-bottom:8px">Đang chờ từ đơn hàng</div>'+
          '<div style="font-size:26px;font-weight:700;color:#f57f17">'+fmtMil(bal.pendingFromOrders||0)+'đ</div>'+
          '<div style="font-size:11.5px;color:#555;margin-top:6px">Sẽ khả dụng sau T+3</div>'+
        '</div>'+
        '<div style="background:#f3e5f5;border-radius:12px;padding:18px 20px">'+
          '<div style="font-size:12px;color:#555;margin-bottom:8px">Tổng đã rút</div>'+
          '<div style="font-size:26px;font-weight:700;color:#6a1b9a">'+fmtMil(bal.totalWithdrawn||0)+'đ</div>'+
          '<div style="font-size:11.5px;color:#555;margin-top:6px">Lịch sử tất cả kỳ</div>'+
        '</div>'+
      '</div>'+
      /* Withdrawal form */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px;margin-bottom:20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:14px">💸 Yêu cầu rút tiền</div>'+
        (!hasBank?'<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:8px;padding:12px 14px;font-size:13.5px;margin-bottom:12px">⚠ Vui lòng <button onclick="sellerPayTab=\'bank\';renderAccount()" style="background:none;border:none;color:#1565c0;cursor:pointer;font-weight:700;font-size:13.5px">thêm tài khoản ngân hàng</button> trước khi rút tiền.</div>':'')+
        '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:12px;align-items:flex-end">'+
          '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Số tiền rút (đ)</label>'+
            '<input id="wdAmount" type="number" min="100000" step="100000" max="'+(bal.available||0)+'" placeholder="Tối thiểu 100,000đ" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
          '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Ghi chú (tùy chọn)</label>'+
            '<input id="wdNote" placeholder="VD: Rút tháng 7/2025" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
          '<button onclick="doSellerRequestWithdrawal()" style="padding:9px 20px;border:none;border-radius:8px;background:'+(hasBank?'#1565c0':'#9e9e9e')+';color:#fff;cursor:'+(hasBank?'pointer':'not-allowed')+';font-size:13.5px;font-weight:600;white-space:nowrap">Yêu cầu rút</button>'+
        '</div>'+
        (hasBank?'<div style="margin-top:10px;font-size:12.5px;color:var(--text-soft)">Chuyển về: <strong>'+escHtml(bankName)+'</strong> · '+escHtml(maskAcc)+' · '+escHtml(bankHolder)+' — Xử lý trong 1–3 ngày làm việc.</div>':'')+
      '</div>'+
      /* Withdrawal history */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:14px">📋 Lịch sử rút tiền</div>'+
        '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+
          '<thead><tr style="background:#fff">'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Mã lệnh</th>'+
            '<th style="padding:8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Số tiền</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Tài khoản</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Ghi chú</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Ngày yêu cầu</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Ngày hoàn thành</th>'+
            '<th style="padding:8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
          '</tr></thead>'+
          '<tbody>'+withdrawalRows+'</tbody>'+
        '</table></div>'+
      '</div>'+
    '</div>';
  }

  /* Tab: Transaction history */
  if(sellerPayTab==='history'){
    const txRows=(rd.transactions||[]).map(tx=>{
      const stClr={pending:'#f57f17',processing:'#1565c0',settled:'#2e7d32',refunded:'#b71c1c'};
      const stLbl={pending:'Chờ thanh toán',processing:'Đang xử lý',settled:'Đã quyết toán',refunded:'Hoàn tiền'};
      const catLbl={books:'Sách',ebook:'Ebook',vpp:'VPP',tbgd:'Thiết bị'};
      return '<tr style="border-top:1px solid var(--line)">'+
        '<td style="padding:9px 8px;font-size:12.5px;font-weight:600">#'+escHtml(tx.id)+'</td>'+
        '<td style="padding:9px 8px;font-size:12.5px;color:#1565c0;font-weight:600">#'+escHtml(tx.orderId)+'</td>'+
        '<td style="padding:9px 8px;font-size:12.5px">'+escHtml(tx.buyer)+'</td>'+
        '<td style="padding:9px 8px;font-size:12.5px;color:var(--text-soft)">'+escHtml(catLbl[tx.category]||tx.category)+'</td>'+
        '<td style="padding:9px 8px;text-align:right;font-size:12.5px">'+fmtBig(tx.orderTotal)+'đ</td>'+
        '<td style="padding:9px 8px;text-align:right;font-size:12.5px;color:#e74c3c">'+tx.commissionRate+'%<br><span style="font-size:11px">−'+fmtBig(tx.commissionAmt)+'đ</span></td>'+
        '<td style="padding:9px 8px;text-align:right;font-weight:700;color:#2e7d32">'+fmtBig(tx.netAmt)+'đ</td>'+
        '<td style="padding:9px 8px">'+
          '<span style="font-size:11px;padding:2px 8px;border-radius:5px;background:'+(stClr[tx.status]||'#555')+'15;color:'+(stClr[tx.status]||'#555')+';font-weight:600">'+escHtml(stLbl[tx.status]||tx.status)+'</span>'+
        '</td>'+
        '<td style="padding:9px 8px;font-size:11.5px;color:var(--text-soft)">'+escHtml(tx.date)+'</td>'+
      '</tr>';
    }).join('');

    const netSum=(rd.transactions||[]).reduce((a,tx)=>a+tx.netAmt,0);
    const commSum=(rd.transactions||[]).reduce((a,tx)=>a+tx.commissionAmt,0);
    const grossSum=(rd.transactions||[]).reduce((a,tx)=>a+tx.orderTotal,0);

    return '<div class="panel">'+
      '<h3 style="margin:0 0 4px">Thanh toán</h3>'+
      '<p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Lịch sử chi tiết từng giao dịch.</p>'+tabNav+
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">'+
        '<div style="background:#e8f4fd;border-radius:8px;padding:12px 14px;text-align:center"><div style="font-size:14px;font-weight:700;color:#1565c0">'+fmtMil(grossSum)+'đ</div><div style="font-size:11.5px;color:#555;margin-top:3px">Tổng doanh thu</div></div>'+
        '<div style="background:#ffebee;border-radius:8px;padding:12px 14px;text-align:center"><div style="font-size:14px;font-weight:700;color:#b71c1c">−'+fmtMil(commSum)+'đ</div><div style="font-size:11.5px;color:#555;margin-top:3px">Tổng phí nền tảng</div></div>'+
        '<div style="background:#e8f5e9;border-radius:8px;padding:12px 14px;text-align:center"><div style="font-size:14px;font-weight:700;color:#2e7d32">'+fmtMil(netSum)+'đ</div><div style="font-size:11.5px;color:#555;margin-top:3px">Tổng thực nhận</div></div>'+
      '</div>'+
      '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+
        '<thead><tr style="background:var(--paper-alt,#f8f6f3)">'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Mã TXN</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Đơn hàng</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Khách</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Loại</th>'+
          '<th style="padding:9px 8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Doanh thu</th>'+
          '<th style="padding:9px 8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Phí (%)</th>'+
          '<th style="padding:9px 8px;text-align:right;font-size:11.5px;color:var(--text-soft);font-weight:600">Thực nhận</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Trạng thái</th>'+
          '<th style="padding:9px 8px;text-align:left;font-size:11.5px;color:var(--text-soft);font-weight:600">Ngày</th>'+
        '</tr></thead>'+
        '<tbody>'+txRows+
          (!txRows?'<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--text-soft)">Chưa có giao dịch nào.</td></tr>':'')+
        '</tbody>'+
      '</table></div>'+
    '</div>';
  }

  /* Tab: Bank settings */
  return '<div class="panel">'+
    '<h3 style="margin:0 0 4px">Thanh toán</h3>'+
    '<p style="margin:0 0 16px;font-size:13px;color:var(--text-soft)">Tài khoản ngân hàng nhận tiền.</p>'+tabNav+
    (hasBank
      ?'<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px">'+
          '<div style="width:44px;height:44px;background:#e8f4fd;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px">🏦</div>'+
          '<div><div style="font-weight:700;font-size:15px">'+escHtml(bankName)+'</div>'+
            '<div style="font-size:13.5px;color:var(--text-soft)">'+maskAcc+' · '+escHtml(bankHolder)+'</div>'+
          '</div>'+
          '<span style="margin-left:auto;font-size:11px;padding:3px 10px;background:#e8f5e9;color:#2e7d32;border-radius:6px;font-weight:600">✓ Đã liên kết</span>'+
        '</div>'
      :'<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:12px;padding:14px 16px;margin-bottom:20px;font-size:13.5px">'+
          '⚠ Chưa có tài khoản ngân hàng. Vui lòng thêm để nhận thanh toán từ EduMart.'+
        '</div>')+
    '<h4 style="margin:0 0 14px;font-size:14px;font-weight:700">'+(hasBank?'Cập nhật':'Thêm')+'  Tài khoản Ngân hàng</h4>'+
    '<div style="display:grid;gap:12px;max-width:480px">'+
      '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Ngân hàng <span style="color:#e74c3c">*</span></label>'+
        '<select id="pyBankName" style="width:100%;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)">'+
          BANKS.map(b=>'<option'+(b===bankName?' selected':'')+'>'+b+'</option>').join('')+
        '</select></div>'+
      '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Số tài khoản <span style="color:#e74c3c">*</span></label>'+
        '<input id="pyBankAcc" value="'+escHtml(bankAcc)+'" placeholder="Nhập số tài khoản" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
      '<div><label style="font-size:13px;font-weight:600;display:block;margin-bottom:5px">Tên chủ tài khoản <span style="color:#e74c3c">*</span></label>'+
        '<input id="pyBankHolder" value="'+escHtml(bankHolder)+'" placeholder="NGUYEN VAN A (in hoa, đúng tên thẻ)" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1.5px solid var(--line);border-radius:8px;font-size:13.5px;background:var(--paper)"></div>'+
    '</div>'+
    '<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:10px;padding:12px 14px;font-size:13px;color:#1a5c38;margin:14px 0">'+
      '🔒 Thông tin ngân hàng được mã hóa. EduMart không lưu CVV hoặc mã PIN.'+
    '</div>'+
    '<button class="btn-primary" onclick="doUpdateSellerPayment('+(app?'\''+app.id+'\'':"null")+')">Lưu tài khoản ngân hàng</button>'+
  '</div>';
}

function doSellerRequestWithdrawal(){
  const s=activeSellers.find(x=>x.email===user.email);if(!s)return;
  const amount=parseInt((document.getElementById('wdAmount')||{}).value||0);
  if(!amount||amount<100000){toast('Số tiền rút tối thiểu 100.000đ.');return;}
  const available=(s.revenueData&&s.revenueData.balance&&s.revenueData.balance.available)||0;
  if(amount>available){toast('Số tiền rút vượt quá số dư có thể rút ('+fmtMil(available)+'đ).');return;}
  const note=((document.getElementById('wdNote')||{}).value||'').trim();
  const sIdx=activeSellers.findIndex(x=>x.email===user.email);if(sIdx===-1)return;
  if(!activeSellers[sIdx].revenueData) activeSellers[sIdx].revenueData={balance:{available:0,pendingFromOrders:0,totalEarned:0,totalWithdrawn:0},withdrawals:[],transactions:[]};
  const app=sellerApps.find(a=>a.email===user.email);
  const bank=app&&app.shopInfo&&app.shopInfo.bank?app.shopInfo.bank:'';
  const parts=bank.split(' – ');
  const wdId='WD-'+Date.now().toString(36).toUpperCase();
  activeSellers[sIdx].revenueData.withdrawals.unshift({id:wdId,amount,bankName:parts[0]||'—',bankAcc:parts[1]?'****'+parts[1].slice(-4):'—',bankHolder:parts[2]||'—',status:'pending',note,requestedAt:todayStr(),completedAt:''});
  activeSellers[sIdx].revenueData.balance.available-=amount;
  activeSellers[sIdx].revenueData.balance.totalWithdrawn=(activeSellers[sIdx].revenueData.balance.totalWithdrawn||0)+amount;
  saveActiveSellers();
  toast('✓ Yêu cầu rút '+fmtMil(amount)+'đ đã được gửi — xử lý trong 1–3 ngày làm việc.');
  addNotif('Yêu cầu rút tiền '+fmtMil(amount)+'đ đã được ghi nhận (#'+wdId+').');
  renderAccount();
}

/* ── 6i. Analytics & Sales Analysis ── */
function sellerAnalytics(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';
  const ad=s.analyticsData||{};
  const tabBtn=(k,lbl,icon)=>'<button onclick="sellerAnalyticsTab=\''+k+'\';renderAccount()" style="padding:8px 20px;border:none;border-bottom:2.5px solid '+(sellerAnalyticsTab===k?'#1565c0':'transparent')+';background:transparent;color:'+(sellerAnalyticsTab===k?'#1565c0':'var(--text-soft)')+';font-size:13.5px;font-weight:'+(sellerAnalyticsTab===k?'700':'400')+';cursor:pointer">'+icon+' '+lbl+'</button>';
  const tabNav='<div style="display:flex;border-bottom:1.5px solid var(--line);margin-bottom:20px;flex-wrap:wrap">'+
    tabBtn('basic','Phân tích cơ bản','📊')+
    tabBtn('advanced','Phân tích nâng cao','🔬')+
  '</div>';
  const content=sellerAnalyticsTab==='advanced'?_analyticsAdvancedTab(s,ad):_analyticsBasicTab(s,ad);
  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">'+
      '<div><h3 style="margin:0">Phân tích Bán hàng</h3><p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">Insights chi tiết về hiệu suất gian hàng.</p></div>'+
      '<div style="display:flex;gap:8px">'+
        '<button onclick="doSellerExportReport(\'excel\')" style="padding:7px 14px;border:1.5px solid #2e7d32;border-radius:8px;background:#e8f5e9;color:#2e7d32;cursor:pointer;font-size:13px;font-weight:600">📥 Excel</button>'+
        '<button onclick="doSellerExportReport(\'pdf\')" style="padding:7px 14px;border:1.5px solid #1565c0;border-radius:8px;background:#e8f4fd;color:#1565c0;cursor:pointer;font-size:13px;font-weight:600">📄 PDF</button>'+
      '</div>'+
    '</div>'+
    tabNav+content+
  '</div>';
}

function _analyticsBasicTab(s,ad){
  const trendData={
    day:  {chart:(ad.salesTrend||{}).daily||[],  labels:['T2','T3','T4','T5','T6','T7','CN'], lbl:'7 ngày qua'},
    week: {chart:(ad.salesTrend||{}).weekly||[], labels:['W-6','W-5','W-4','W-3','W-2','W-1','Tuần này'], lbl:'7 tuần qua'},
    month:{chart:(ad.salesTrend||{}).monthly||[],labels:['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],lbl:'12 tháng'}
  };
  const cfg=trendData[sellerAnalyticsPeriod]||trendData.week;
  const chart=cfg.chart; const maxVal=Math.max(...chart,1);
  const periodBtns=[['day','Ngày'],['week','Tuần'],['month','Tháng']].map(([k,l])=>
    '<button onclick="sellerAnalyticsPeriod=\''+k+'\';renderAccount()" style="padding:5px 14px;border-radius:16px;border:1.5px solid '+(sellerAnalyticsPeriod===k?'#1565c0':'var(--line)')+';background:'+(sellerAnalyticsPeriod===k?'#1565c0':'transparent')+';color:'+(sellerAnalyticsPeriod===k?'#fff':'var(--text-soft)')+';font-size:12.5px;cursor:pointer">'+l+'</button>'
  ).join('');

  const typeClr={books:'#1565c0',ebook:'#6a1b9a',vpp:'#2e7d32',tbgd:'#e65100'};
  const typeLbl={books:'Sách',ebook:'Ebook',vpp:'VPP',tbgd:'Thiết bị'};
  const topProds=(ad.topProducts||[]);

  const catTrends=(ad.categoryTrends||[]).map(c=>{
    const g=c.lastMonth>0?Math.round(((c.thisMonth-c.lastMonth)/c.lastMonth)*100):0;
    return '<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid var(--line)">'+
      '<div style="width:10px;height:10px;border-radius:50%;background:'+c.clr+';flex-shrink:0"></div>'+
      '<div style="flex:1;font-size:13.5px;font-weight:600">'+escHtml(c.lbl)+'</div>'+
      '<div style="text-align:right;min-width:90px"><div style="font-size:13.5px;font-weight:700;color:'+c.clr+'">'+fmtMil(c.thisMonth)+'đ</div>'+
        '<div style="font-size:11px;color:'+(g>=0?'#2e7d32':'#e74c3c')+'">'+(g>=0?'▲ +':' ▼ ')+Math.abs(g)+'% so kỳ trước</div>'+
      '</div>'+
    '</div>';
  }).join('');

  const barChart='<div style="display:flex;align-items:flex-end;gap:5px;height:150px;padding-bottom:24px">'+
    chart.map((val,i)=>{
      const h=Math.round((val/maxVal)*120);
      return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">'+
        (val>0?'<div style="font-size:9px;color:#1565c0;margin-bottom:2px;font-weight:600">'+fmtMil(val)+'</div>':'')+
        '<div style="width:100%;background:linear-gradient(180deg,#1565c0,#42a5f5);border-radius:4px 4px 0 0;height:'+(val>0?h:2)+'px;opacity:'+(val>0?'1':'0.2')+';transition:height .3s"></div>'+
        '<div style="font-size:10px;color:#888;margin-top:5px">'+escHtml(cfg.labels[i]||'')+'</div>'+
      '</div>';
    }).join('')+
  '</div>';

  /* Dual-color bar for new vs returning */
  const mix=ad.customerMix||{labels:[],newCustomers:[],returning:[]};
  const newArr=mix.newCustomers||[];
  const retArr=mix.returning||[];
  const maxMix=Math.max(...newArr,...retArr,1);
  const orderArr=ad.weeklyOrders||[];
  const maxOrd=Math.max(...orderArr,1);

  const topRows=topProds.slice(0,7).map((p,i)=>{
    const bar=Math.round((p.sold/(topProds[0].sold||1))*100);
    return '<tr style="border-top:1px solid var(--line)">'+
      '<td style="padding:9px 8px;font-size:13px;font-weight:600;color:var(--text-soft)">'+(i+1)+'</td>'+
      '<td style="padding:9px 8px">'+
        '<div style="font-weight:600;font-size:13.5px">'+escHtml(p.name)+'</div>'+
        '<div style="display:flex;align-items:center;gap:6px;margin-top:4px">'+
          '<span style="font-size:10.5px;padding:1px 6px;border-radius:4px;background:'+(typeClr[p.type]||'#555')+'15;color:'+(typeClr[p.type]||'#555')+';font-weight:600">'+escHtml(typeLbl[p.type]||p.type)+'</span>'+
          '<div style="flex:1;background:#f0f0f0;border-radius:3px;height:5px;max-width:120px"><div style="background:'+(typeClr[p.type]||'#555')+';height:5px;border-radius:3px;width:'+bar+'%"></div></div>'+
        '</div>'+
      '</td>'+
      '<td style="padding:9px 8px;text-align:center;font-weight:700;font-size:14px;color:#1565c0">'+p.sold+'</td>'+
      '<td style="padding:9px 8px;text-align:right;font-weight:700;color:#2e7d32;font-size:13.5px">'+fmtMil(p.revenue)+'đ</td>'+
      '<td style="padding:9px 8px;text-align:center;font-size:13px;color:var(--text-soft)">'+fmtBig(p.views||0)+'</td>'+
      '<td style="padding:9px 8px;text-align:center;font-size:13.5px;font-weight:600;color:'+(p.convRate>=5?'#2e7d32':p.convRate>=2?'#f57f17':'#e74c3c')+'">'+p.convRate+'%</td>'+
    '</tr>';
  }).join('');

  return '<div style="display:flex;gap:8px;margin-bottom:16px">'+periodBtns+'</div>'+
    /* Sales trend chart */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px;margin-bottom:16px">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">'+
        '<div style="font-weight:700;font-size:13.5px">📈 Biểu đồ doanh số — '+escHtml(cfg.lbl)+'</div>'+
        '<div style="font-size:13px;color:#2e7d32;font-weight:600">Tổng: '+fmtMil(chart.reduce((a,b)=>a+b,0))+'đ</div>'+
      '</div>'+
      barChart+
    '</div>'+
    '<div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:16px">'+
      /* Top products table */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:14px">🏆 Top sản phẩm bán chạy</div>'+
        '<table style="width:100%;border-collapse:collapse">'+
          '<thead><tr style="background:#fff">'+
            '<th style="padding:8px;font-size:11px;color:var(--text-soft);font-weight:600">#</th>'+
            '<th style="padding:8px;text-align:left;font-size:11px;color:var(--text-soft);font-weight:600">Sản phẩm</th>'+
            '<th style="padding:8px;text-align:center;font-size:11px;color:var(--text-soft);font-weight:600">Đã bán</th>'+
            '<th style="padding:8px;text-align:right;font-size:11px;color:var(--text-soft);font-weight:600">Doanh thu</th>'+
            '<th style="padding:8px;text-align:center;font-size:11px;color:var(--text-soft);font-weight:600">Lượt xem</th>'+
            '<th style="padding:8px;text-align:center;font-size:11px;color:var(--text-soft);font-weight:600">Conv.</th>'+
          '</tr></thead>'+
          '<tbody>'+topRows+'</tbody>'+
        '</table>'+
      '</div>'+
      /* Category trend */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:6px">📦 Xu hướng danh mục</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-bottom:10px">Tháng này so với tháng trước</div>'+
        catTrends+
      '</div>'+
    '</div>';
}

function _analyticsAdvancedTab(s,ad){
  /* Conversion Funnel */
  const fn=ad.funnel||{views:0,addToCart:0,checkout:0,purchased:0};
  const fSteps=[
    {lbl:'Lượt xem sản phẩm', val:fn.views,   clr:'#1565c0', icon:'👁'},
    {lbl:'Thêm vào giỏ',      val:fn.addToCart,clr:'#6a1b9a', icon:'🛒'},
    {lbl:'Tiến hành thanh toán',val:fn.checkout,clr:'#e65100', icon:'💳'},
    {lbl:'Đã mua thành công',  val:fn.purchased,clr:'#2e7d32', icon:'✅'}
  ];
  const fMax=fn.views||1;
  const funnelHtml=fSteps.map((f,i)=>{
    const pct=Math.round((f.val/fMax)*100);
    const dropPct=i>0?Math.round(((fSteps[i-1].val-f.val)/fSteps[i-1].val)*100):0;
    return '<div style="margin-bottom:12px">'+
      (i>0?'<div style="text-align:center;font-size:11.5px;color:#e74c3c;margin-bottom:4px">▼ Mất '+dropPct+'%</div>':'')+
      '<div style="display:flex;align-items:center;gap:10px">'+
        '<div style="width:24px;text-align:center;font-size:16px">'+f.icon+'</div>'+
        '<div style="flex:1">'+
          '<div style="display:flex;justify-content:space-between;margin-bottom:3px">'+
            '<span style="font-size:12.5px;font-weight:600">'+f.lbl+'</span>'+
            '<span style="font-size:13px;font-weight:700;color:'+f.clr+'">'+fmtBig(f.val)+' ('+pct+'%)</span>'+
          '</div>'+
          '<div style="background:#e0e0e0;border-radius:4px;height:12px">'+
            '<div style="background:'+f.clr+';height:12px;border-radius:4px;width:'+pct+'%;transition:width .4s"></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  }).join('');

  /* Traffic sources */
  const trafSrc=ad.trafficSources||[];
  const trafRows=trafSrc.map(t=>'<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--line)">'+
    '<div style="width:10px;height:10px;border-radius:50%;background:'+t.clr+';flex-shrink:0"></div>'+
    '<div style="flex:1;font-size:13px">'+escHtml(t.lbl)+'</div>'+
    '<div style="min-width:60px;text-align:right;font-size:13px;font-weight:600">'+fmtBig(t.visits)+'</div>'+
    '<div style="min-width:44px;text-align:right;font-size:12px;color:'+t.clr+';font-weight:700">'+t.pct+'%</div>'+
    '<div style="width:80px;background:#e0e0e0;border-radius:4px;height:7px">'+
      '<div style="background:'+t.clr+';height:7px;border-radius:4px;width:'+t.pct+'%"></div>'+
    '</div>'+
  '</div>').join('');

  /* Behavior metrics */
  const beh=ad.behavior||{avgTimeOnPage:0,bounceRate:0,avgPagesPerSession:0,avgSessionDuration:0};
  const fmt2min=s=>Math.floor(s/60)+'p '+(s%60)+'s';
  const behaviorCards=[
    {lbl:'Thời gian xem trang TB',val:fmt2min(beh.avgTimeOnPage||0),icon:'⏱',clr:'#1565c0',sub:'mỗi trang sản phẩm'},
    {lbl:'Tỷ lệ thoát (Bounce)',   val:(beh.bounceRate||0)+'%',      icon:'↩',clr:beh.bounceRate>50?'#e74c3c':'#2e7d32',sub:beh.bounceRate>50?'Cần cải thiện mô tả SP':'Tốt'},
    {lbl:'Trang/Phiên TB',         val:(beh.avgPagesPerSession||0)+'',icon:'📄',clr:'#6a1b9a',sub:'trang mỗi lần truy cập'},
    {lbl:'Thời lượng phiên TB',    val:fmt2min(beh.avgSessionDuration||0),icon:'🕐',clr:'#e65100',sub:'mỗi lần vào gian hàng'}
  ].map(c=>'<div style="background:var(--paper-alt,#f8f6f3);border-radius:10px;padding:16px 18px;text-align:center">'+
    '<div style="font-size:28px;margin-bottom:6px">'+c.icon+'</div>'+
    '<div style="font-size:22px;font-weight:700;color:'+c.clr+'">'+c.val+'</div>'+
    '<div style="font-size:12px;font-weight:600;color:var(--text-soft);margin-top:4px">'+c.lbl+'</div>'+
    '<div style="font-size:11px;color:'+c.clr+';margin-top:2px">'+c.sub+'</div>'+
  '</div>').join('');

  /* New vs Returning chart — stacked bar */
  const mix=ad.customerMix||{labels:[],newCustomers:[],returning:[]};
  const nArr=mix.newCustomers||[];
  const rArr=mix.returning||[];
  const mMax=Math.max(...nArr.map((v,i)=>v+(rArr[i]||0)),1);
  const custChart='<div style="display:flex;align-items:flex-end;gap:6px;height:120px;padding-bottom:22px">'+
    (mix.labels||[]).map((lbl,i)=>{
      const n=nArr[i]||0; const r=rArr[i]||0; const tot=n+r;
      const hN=Math.round((n/mMax)*90); const hR=Math.round((r/mMax)*90);
      return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">'+
        '<div style="width:100%;display:flex;flex-direction:column;align-items:stretch">'+
          '<div style="background:#6a1b9a;border-radius:3px 3px 0 0;height:'+hN+'px" title="Mới: '+n+'"></div>'+
          '<div style="background:#1565c0;border-radius:0 0 0 0;height:'+hR+'px" title="Quay lại: '+r+'"></div>'+
        '</div>'+
        '<div style="font-size:10px;color:#888;margin-top:4px">'+escHtml(lbl)+'</div>'+
      '</div>';
    }).join('')+
  '</div>'+
  '<div style="display:flex;gap:16px;justify-content:center;margin-top:4px">'+
    '<div style="display:flex;align-items:center;gap:5px"><div style="width:12px;height:12px;border-radius:2px;background:#6a1b9a"></div><span style="font-size:12px">Khách mới</span></div>'+
    '<div style="display:flex;align-items:center;gap:5px"><div style="width:12px;height:12px;border-radius:2px;background:#1565c0"></div><span style="font-size:12px">Khách quay lại</span></div>'+
  '</div>';

  const totalNew=nArr.reduce((a,b)=>a+b,0);
  const totalRet=rArr.reduce((a,b)=>a+b,0);
  const totalCust=totalNew+totalRet||1;

  return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">'+
      /* Conversion Funnel */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:6px">🔄 Phễu chuyển đổi</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-bottom:14px">Từ lượt xem → thêm giỏ → thanh toán → mua</div>'+
        funnelHtml+
        '<div style="margin-top:10px;background:#e8f5e9;border-radius:8px;padding:10px 14px;text-align:center">'+
          '<span style="font-size:13.5px;font-weight:700;color:#2e7d32">Tỷ lệ chuyển đổi cuối: '+Math.round((fn.purchased/fMax)*100)+'%</span>'+
          '<div style="font-size:11.5px;color:#555;margin-top:2px">'+fmtBig(fn.purchased)+' đơn từ '+fmtBig(fn.views)+' lượt xem</div>'+
        '</div>'+
      '</div>'+
      /* Traffic Sources */
      '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
        '<div style="font-weight:700;font-size:13.5px;margin-bottom:6px">🌐 Nguồn traffic</div>'+
        '<div style="font-size:11.5px;color:var(--text-soft);margin-bottom:10px">Tổng '+fmtBig(trafSrc.reduce((a,t)=>a+t.visits,0))+' lượt truy cập</div>'+
        trafRows+
      '</div>'+
    '</div>'+
    /* Behavior */
    '<div style="font-weight:700;font-size:13.5px;margin-bottom:12px">🧠 Hành vi khách hàng</div>'+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">'+behaviorCards+'</div>'+
    /* New vs Returning */
    '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:18px 20px">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">'+
        '<div>'+
          '<div style="font-weight:700;font-size:13.5px">👥 Khách hàng mới vs Quay lại (7 ngày)</div>'+
          '<div style="font-size:11.5px;color:var(--text-soft);margin-top:2px">Tổng '+totalCust+' lượt — Mới: '+Math.round((totalNew/totalCust)*100)+'% / Quay lại: '+Math.round((totalRet/totalCust)*100)+'%</div>'+
        '</div>'+
        '<div style="display:flex;gap:12px;font-size:13px">'+
          '<div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#6a1b9a">'+totalNew+'</div><div style="font-size:11px;color:#555">Khách mới</div></div>'+
          '<div style="text-align:center"><div style="font-size:20px;font-weight:700;color:#1565c0">'+totalRet+'</div><div style="font-size:11px;color:#555">Quay lại</div></div>'+
        '</div>'+
      '</div>'+
      custChart+
    '</div>';
}

function doSellerExportReport(fmt){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s){toast('Không tìm thấy dữ liệu gian hàng.');return;}
  const ad=s.analyticsData||{};
  const rd=s.revenueData||{};
  const shopName=s.shopName||'Gian hàng';
  const today=todayStr();

  if(fmt==='excel'){
    /* Build CSV content */
    const lines=[
      ['BÁO CÁO PHÂN TÍCH BÁN HÀNG — '+shopName,'','',''],
      ['Ngày xuất: '+today,'','',''],
      ['','','',''],
      ['=== DOANH THU THEO THÁNG ===','','',''],
      ['Tháng','Doanh thu (đ)','',''],
      ...((ad.salesTrend||{}).monthly||[]).map((v,i)=>['Tháng '+(i+1),v,'','']),
      ['','','',''],
      ['=== TOP SẢN PHẨM BÁN CHẠY ===','','',''],
      ['Tên sản phẩm','Loại','Đã bán','Doanh thu (đ)'],
      ...(ad.topProducts||[]).map(p=>[p.name,p.type==='books'?'Sách':p.type==='vpp'?'VPP':p.type==='tbgd'?'Thiết bị':'Ebook',p.sold,p.revenue]),
      ['','','',''],
      ['=== CHI TIẾT GIAO DỊCH ===','','',''],
      ['Mã TXN','Mã đơn','Khách hàng','Doanh thu (đ)','Phí nền tảng (đ)','Thực nhận (đ)','Trạng thái','Ngày'],
      ...(rd.transactions||[]).map(tx=>[tx.id,tx.orderId,tx.buyer,tx.orderTotal,tx.commissionAmt,tx.netAmt,tx.status,tx.date])
    ];
    const csv=lines.map(row=>row.map(c=>'"'+String(c||'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const bom='﻿';
    const blob=new Blob([bom+csv],{type:'text/csv;charset=utf-8;'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='bao-cao-phan-tich-'+today.replace(/\//g,'-')+'.csv';
    document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
    toast('✓ Đã xuất file Excel (CSV) thành công!');
  } else {
    /* PDF via print window */
    const topTable=(ad.topProducts||[]).slice(0,7).map((p,i)=>
      '<tr><td>'+(i+1)+'</td><td>'+p.name+'</td><td>'+(p.type==='books'?'Sách':p.type==='vpp'?'VPP':p.type==='tbgd'?'Thiết bị':'Ebook')+'</td><td style="text-align:right">'+p.sold+'</td><td style="text-align:right">'+fmtBig(p.revenue)+'đ</td><td style="text-align:center">'+p.convRate+'%</td></tr>'
    ).join('');
    const txTable=(rd.transactions||[]).map(tx=>
      '<tr><td>#'+tx.id+'</td><td>#'+tx.orderId+'</td><td>'+tx.buyer+'</td><td style="text-align:right">'+fmtBig(tx.orderTotal)+'đ</td><td style="text-align:right">'+tx.commissionRate+'% ('+fmtBig(tx.commissionAmt)+'đ)</td><td style="text-align:right;font-weight:700;color:#2e7d32">'+fmtBig(tx.netAmt)+'đ</td><td>'+tx.date+'</td></tr>'
    ).join('');
    const beh=ad.behavior||{};
    const fn=ad.funnel||{};
    const win=window.open('','_blank','width=900,height=900');
    if(!win){toast('Trình duyệt chặn popup. Vui lòng cho phép popup để xuất PDF.');return;}
    win.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Báo cáo Phân tích — '+shopName+'</title>'+
      '<style>body{font-family:Arial,sans-serif;margin:24px;color:#333}h1{color:#1565c0;border-bottom:2px solid #1565c0;padding-bottom:8px}h2{color:#1565c0;font-size:14px;margin-top:20px}table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12px}th{background:#e8f4fd;padding:6px 8px;text-align:left;border:1px solid #ccc}td{padding:5px 8px;border:1px solid #ddd}.meta{font-size:12px;color:#666;margin-bottom:16px}.kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:12px 0}.kpi-card{background:#f8f9ff;border-radius:6px;padding:12px;text-align:center;border:1px solid #ddd}.kpi-val{font-size:18px;font-weight:700;color:#1565c0}.kpi-lbl{font-size:11px;color:#666;margin-top:4px}@media print{body{margin:0}}</style>'+
      '</head><body>'+
      '<h1>Báo cáo Phân tích Bán hàng</h1>'+
      '<div class="meta"><strong>Gian hàng:</strong> '+shopName+' &nbsp;|&nbsp; <strong>Ngày xuất:</strong> '+today+'</div>'+
      '<div class="kpi">'+
        '<div class="kpi-card"><div class="kpi-val">'+fmtMil((rd.balance||{}).totalEarned||0)+'đ</div><div class="kpi-lbl">Tổng doanh thu</div></div>'+
        '<div class="kpi-card"><div class="kpi-val">'+(s.orders||[]).filter(o=>o.status==='delivered').length+'</div><div class="kpi-lbl">Đơn hoàn thành</div></div>'+
        '<div class="kpi-card"><div class="kpi-val">'+Math.round((fn.purchased/Math.max(fn.views,1))*100)+'%</div><div class="kpi-lbl">Tỷ lệ chuyển đổi</div></div>'+
        '<div class="kpi-card"><div class="kpi-val">'+(beh.bounceRate||0)+'%</div><div class="kpi-lbl">Tỷ lệ thoát</div></div>'+
      '</div>'+
      '<h2>Top sản phẩm bán chạy</h2>'+
      '<table><thead><tr><th>#</th><th>Tên sản phẩm</th><th>Loại</th><th>Đã bán</th><th>Doanh thu</th><th>Conv.</th></tr></thead><tbody>'+topTable+'</tbody></table>'+
      '<h2>Chi tiết giao dịch</h2>'+
      '<table><thead><tr><th>Mã TXN</th><th>Đơn hàng</th><th>Khách</th><th>Doanh thu</th><th>Phí nền tảng</th><th>Thực nhận</th><th>Ngày</th></tr></thead><tbody>'+txTable+'</tbody></table>'+
      '<h2>Hành vi khách hàng</h2>'+
      '<table><thead><tr><th>Chỉ số</th><th>Giá trị</th></tr></thead><tbody>'+
        '<tr><td>Thời gian xem trang TB</td><td>'+Math.floor((beh.avgTimeOnPage||0)/60)+'p '+(beh.avgTimeOnPage||0)%60+'s</td></tr>'+
        '<tr><td>Tỷ lệ thoát</td><td>'+(beh.bounceRate||0)+'%</td></tr>'+
        '<tr><td>Trang/Phiên TB</td><td>'+(beh.avgPagesPerSession||0)+'</td></tr>'+
      '</tbody></table>'+
      '<div style="margin-top:20px;text-align:right"><button onclick="window.print()" style="padding:8px 20px;background:#1565c0;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px">🖨 In / Lưu PDF</button></div>'+
      '</body></html>');
    win.document.close();
    toast('✓ Đã mở cửa sổ xuất PDF — nhấn "In" và chọn "Save as PDF".');
  }
}

/* ── 6j. Review Management ── */
function sellerReviewCenter(){
  const s=activeSellers.find(x=>x.email===user.email);
  if(!s) return '<div class="panel"><p>Không tìm thấy tài khoản.</p></div>';

  /* Build product map {pid -> {prodName, type}} */
  const prodMap={};
  (s.products||[]).forEach(function(p){prodMap[p.id]={prodName:p.name,type:'books'};});
  (s.ebooks||[]).forEach(function(p){prodMap[p.id]={prodName:p.name,type:'ebook'};});
  (s.vppProducts||[]).forEach(function(p){prodMap[p.id]={prodName:p.name,type:'vpp'};});
  (s.tbgdProducts||[]).forEach(function(p){prodMap[p.id]={prodName:p.name,type:'tbgd'};});

  /* Collect all reviews across seller's products */
  const allRevs=[];
  Object.keys(prodMap).forEach(function(pid){
    const pInfo=prodMap[pid];
    (reviewsStore[pid]||[]).forEach(function(rv,idx){
      allRevs.push(Object.assign({pid:pid,idx:idx,prodName:pInfo.prodName,pType:pInfo.type},rv));
    });
  });

  /* Sort newest first */
  allRevs.sort(function(a,b){
    function pd(ds){ if(!ds) return 0; var p=ds.split('/'); return new Date(+p[2],+p[1]-1,+p[0]).getTime(); }
    return pd(b.date)-pd(a.date);
  });

  /* Stats */
  const totalReplied=allRevs.filter(function(r){return !!r.reply;}).length;
  const cnt={
    all:allRevs.length,
    unanswered:allRevs.filter(function(r){return !r.reply;}).length,
    positive:allRevs.filter(function(r){return r.rate>=4;}).length,
    negative:allRevs.filter(function(r){return r.rate<=2;}).length
  };
  const avgRate=allRevs.length?allRevs.reduce(function(a,r){return a+r.rate;},0)/allRevs.length:0;

  /* Apply filters */
  var filtered=allRevs;
  if(sellerReviewFilter==='unanswered') filtered=filtered.filter(function(r){return !r.reply;});
  if(sellerReviewFilter==='positive')   filtered=filtered.filter(function(r){return r.rate>=4;});
  if(sellerReviewFilter==='negative')   filtered=filtered.filter(function(r){return r.rate<=2;});
  if(sellerReviewStarFilter>0) filtered=filtered.filter(function(r){return r.rate===sellerReviewStarFilter;});
  if(sellerReviewProductFilter!=='all') filtered=filtered.filter(function(r){return r.pid===sellerReviewProductFilter;});

  /* Tab buttons */
  function tabBtn(k,lbl){
    var active=sellerReviewFilter===k;
    return '<button onclick="sellerReviewFilter=\''+k+'\';renderAccount()" style="padding:8px 18px;border:none;border-bottom:2.5px solid '+(active?'#1565c0':'transparent')+';background:transparent;color:'+(active?'#1565c0':'var(--text-soft)')+';font-size:13.5px;font-weight:'+(active?'700':'400')+';cursor:pointer;white-space:nowrap;flex-shrink:0">'+lbl+
      '<span style="margin-left:5px;padding:1px 7px;border-radius:10px;background:'+(active?'#1565c0':'#e0e0e0')+';color:'+(active?'#fff':'#666')+';font-size:11.5px">'+cnt[k]+'</span></button>';
  }
  const tabs='<div style="display:flex;border-bottom:1.5px solid var(--line);margin-bottom:16px;overflow-x:auto">'+
    tabBtn('all','Tất cả')+tabBtn('unanswered','Chưa trả lời')+tabBtn('positive','Tích cực ≥4★')+tabBtn('negative','Tiêu cực ≤2★')+
  '</div>';

  /* Stats summary card */
  const rateDist=[5,4,3,2,1].map(function(n){
    var c=allRevs.filter(function(r){return r.rate===n;}).length;
    var pct=allRevs.length?Math.round((c/allRevs.length)*100):0;
    return '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">'+
      '<span style="font-size:12px;color:#f57f17;min-width:20px;text-align:right">'+n+'★</span>'+
      '<div style="flex:1;background:#e0e0e0;border-radius:3px;height:7px"><div style="background:#f57f17;height:7px;border-radius:3px;width:'+pct+'%"></div></div>'+
      '<span style="font-size:11.5px;color:var(--text-soft);min-width:24px">'+c+'</span>'+
    '</div>';
  }).join('');
  const statBlock='<div style="display:flex;gap:20px;align-items:center;background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:16px 20px;margin-bottom:16px;flex-wrap:wrap;gap:16px">'+
    '<div style="text-align:center;min-width:72px">'+
      '<div style="font-size:38px;font-weight:800;color:#f57f17;line-height:1">'+avgRate.toFixed(1)+'</div>'+
      '<div style="font-size:15px;color:#f57f17;margin:2px 0;letter-spacing:2px">'+'★'.repeat(Math.round(avgRate))+'</div>'+
      '<div style="font-size:12px;color:var(--text-soft)">'+allRevs.length+' đánh giá</div>'+
    '</div>'+
    '<div style="flex:1;min-width:160px">'+rateDist+'</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;min-width:200px">'+
      '<div style="background:#e8f5e9;border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:#2e7d32">'+cnt.positive+'</div><div style="font-size:11px;color:#2e7d32">Tích cực ≥4★</div></div>'+
      '<div style="background:#fce4ec;border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:#c62828">'+cnt.negative+'</div><div style="font-size:11px;color:#c62828">Tiêu cực ≤2★</div></div>'+
      '<div style="background:#fff8e1;border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:#f57f17">'+cnt.unanswered+'</div><div style="font-size:11px;color:#e65100">Chưa trả lời</div></div>'+
      '<div style="background:#e8f4fd;border-radius:8px;padding:10px;text-align:center"><div style="font-size:18px;font-weight:700;color:#1565c0">'+totalReplied+'</div><div style="font-size:11px;color:#1565c0">Đã trả lời</div></div>'+
    '</div>'+
  '</div>';

  /* Filter bar */
  const starBtns='<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">'+
    '<span style="font-size:12.5px;color:var(--text-soft)">Sao:</span>'+
    '<button onclick="sellerReviewStarFilter=0;renderAccount()" style="padding:4px 11px;border-radius:14px;border:1.5px solid '+(sellerReviewStarFilter===0?'#1565c0':'var(--line)')+';background:'+(sellerReviewStarFilter===0?'#1565c0':'transparent')+';color:'+(sellerReviewStarFilter===0?'#fff':'var(--text-soft)')+';font-size:12px;cursor:pointer">Tất cả</button>'+
    [5,4,3,2,1].map(function(n){return '<button onclick="sellerReviewStarFilter='+n+';renderAccount()" style="padding:4px 11px;border-radius:14px;border:1.5px solid '+(sellerReviewStarFilter===n?'#f57f17':'var(--line)')+';background:'+(sellerReviewStarFilter===n?'#fff8e1':'transparent')+';color:'+(sellerReviewStarFilter===n?'#f57f17':'var(--text-soft)')+';font-size:12px;cursor:pointer">'+n+'★</button>';}).join('')+
  '</div>';
  const prodOpts='<option value="all">Tất cả sản phẩm</option>'+
    Object.keys(prodMap).map(function(pid){
      return '<option value="'+pid+'" '+(sellerReviewProductFilter===pid?'selected':'')+'>'+escHtml(prodMap[pid].prodName)+'</option>';
    }).join('');
  const filterBar='<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:16px">'+
    starBtns+
    '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:12.5px;color:var(--text-soft)">Sản phẩm:</span>'+
      '<select onchange="sellerReviewProductFilter=this.value;renderAccount()" style="padding:5px 10px;border-radius:8px;border:1.5px solid var(--line);font-size:13px;background:var(--paper)">'+prodOpts+'</select>'+
    '</div>'+
  '</div>';

  /* Empty state */
  if(!filtered.length){
    return '<div class="panel">'+
      '<div style="margin-bottom:16px"><h3 style="margin:0">Đánh giá sản phẩm</h3><p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">Quản lý và phản hồi đánh giá từ khách hàng.</p></div>'+
      tabs+statBlock+filterBar+
      '<div style="text-align:center;padding:40px 20px;color:var(--text-soft)"><div style="font-size:40px;margin-bottom:10px">🌟</div><p>Không có đánh giá nào phù hợp bộ lọc.</p></div>'+
    '</div>';
  }

  const typeClr={books:'#1565c0',ebook:'#6a1b9a',vpp:'#2e7d32',tbgd:'#e65100'};
  const typeLbl={books:'Sách giấy',ebook:'Ebook',vpp:'VPP',tbgd:'Thiết bị'};

  const cards=filtered.map(function(rv){
    const editKey=rv.pid+':'+rv.idx;
    const isEditing=sellerReviewEditReplyId===editKey;
    const stars='★'.repeat(rv.rate)+'☆'.repeat(5-rv.rate);
    const starClr=rv.rate>=4?'#f57f17':rv.rate===3?'#ff8f00':'#e74c3c';
    const borderClr=rv.rate<=2?'#ffcdd2':rv.rate>=4?'#c8e6c9':'var(--line)';
    const avatarLetter=(rv.name||'K').charAt(0).toUpperCase();
    const avatarClr=['#1565c0','#6a1b9a','#2e7d32','#e65100','#00838f'][avatarLetter.charCodeAt(0)%5];
    const taId='srvReply_'+rv.pid.replace(/-/g,'_')+'_'+rv.idx;

    /* Reply block */
    var replyBlock='';
    if(rv.reply&&!isEditing){
      replyBlock='<div style="margin-top:12px;background:#e8f4fd;border-left:3px solid #1565c0;border-radius:0 8px 8px 0;padding:10px 14px">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'+
          '<span style="font-size:12px;font-weight:700;color:#1565c0">💬 Phản hồi của shop</span>'+
          '<span style="font-size:11.5px;color:var(--text-soft)">'+escHtml(rv.replyDate||'')+'</span>'+
        '</div>'+
        '<div style="font-size:13.5px;color:#333;white-space:pre-wrap;line-height:1.6">'+escHtml(rv.reply)+'</div>'+
        '<div style="margin-top:8px;display:flex;gap:8px">'+
          '<button onclick="sellerReviewEditReplyId=\''+editKey+'\';renderAccount()" style="padding:4px 12px;border-radius:6px;border:1.5px solid #1565c0;background:transparent;color:#1565c0;font-size:12px;cursor:pointer">✏️ Sửa</button>'+
          '<button onclick="doSellerDeleteReply(\''+rv.pid+'\','+rv.idx+')" style="padding:4px 12px;border-radius:6px;border:1.5px solid #e74c3c;background:transparent;color:#e74c3c;font-size:12px;cursor:pointer">🗑 Xóa</button>'+
        '</div>'+
      '</div>';
    } else if(isEditing){
      replyBlock='<div style="margin-top:12px;background:#f0f7ff;border-radius:8px;padding:12px 14px;border:1.5px solid #90caf9">'+
        '<div style="font-size:12.5px;font-weight:700;color:#1565c0;margin-bottom:8px">'+(rv.reply?'✏️ Chỉnh sửa phản hồi':'💬 Viết phản hồi')+'</div>'+
        '<textarea id="'+taId+'" rows="3" placeholder="Nhập phản hồi của shop..." style="width:100%;padding:8px 10px;border:1.5px solid #90caf9;border-radius:8px;font-size:13.5px;font-family:inherit;resize:vertical;box-sizing:border-box">'+escHtml(rv.reply||'')+'</textarea>'+
        '<div style="display:flex;gap:8px;margin-top:8px">'+
          '<button onclick="doSellerSaveReply(\''+rv.pid+'\','+rv.idx+',\''+taId+'\')" style="padding:6px 16px;border-radius:8px;border:none;background:#1565c0;color:#fff;font-size:13px;font-weight:600;cursor:pointer">💾 Lưu phản hồi</button>'+
          '<button onclick="sellerReviewEditReplyId=null;renderAccount()" style="padding:6px 14px;border-radius:8px;border:1.5px solid var(--line);background:transparent;color:var(--text-soft);font-size:13px;cursor:pointer">Hủy</button>'+
        '</div>'+
      '</div>';
    } else {
      replyBlock='<div style="margin-top:10px">'+
        '<button onclick="sellerReviewEditReplyId=\''+editKey+'\';renderAccount()" style="padding:6px 14px;border-radius:8px;border:1.5px solid #1565c0;background:transparent;color:#1565c0;font-size:12.5px;cursor:pointer;font-weight:600">💬 Viết phản hồi</button>'+
      '</div>';
    }

    /* Report badge or button */
    const reportBlock=rv.reported
      ?'<span style="padding:3px 8px;border-radius:5px;background:#fce4ec;color:#c62828;font-size:11px;font-weight:600">⚑ Đã báo cáo</span>'
      :'<button onclick="doSellerReportReview(\''+rv.pid+'\','+rv.idx+')" style="padding:3px 10px;border-radius:6px;border:1.5px solid #e0e0e0;background:transparent;color:var(--text-soft);font-size:11.5px;cursor:pointer" title="Báo cáo đánh giá này lên quản trị viên">⚑ Báo cáo</button>';

    return '<div style="background:var(--paper-alt,#f8f6f3);border-radius:12px;padding:16px 18px;margin-bottom:12px;border:1.5px solid '+borderClr+'">'+
      /* Header row */
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;flex-wrap:wrap;gap:8px">'+
        '<div style="display:flex;align-items:center;gap:10px">'+
          '<div style="width:38px;height:38px;border-radius:50%;background:'+avatarClr+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0">'+avatarLetter+'</div>'+
          '<div>'+
            '<div style="font-weight:700;font-size:13.5px">'+escHtml(rv.name||'Ẩn danh')+'</div>'+
            '<div style="font-size:14px;color:'+starClr+';letter-spacing:1px;margin-top:1px">'+stars+
              ' <span style="color:var(--text-soft);font-size:11px">('+rv.rate+'/5)</span>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
          '<span style="font-size:11px;padding:2px 8px;border-radius:4px;background:'+(typeClr[rv.pType]||'#555')+'18;color:'+(typeClr[rv.pType]||'#555')+';font-weight:700">'+escHtml(typeLbl[rv.pType]||rv.pType)+'</span>'+
          '<span style="font-size:11px;color:var(--text-soft)">'+escHtml(rv.date||'')+'</span>'+
          reportBlock+
        '</div>'+
      '</div>'+
      /* Product label */
      '<div style="font-size:11.5px;color:var(--text-soft);margin-bottom:6px">📦 '+escHtml(rv.prodName||'')+'</div>'+
      /* Review text */
      '<div style="font-size:14px;color:#333;line-height:1.7">'+escHtml(rv.text||'')+'</div>'+
      replyBlock+
    '</div>';
  }).join('');

  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">'+
      '<div><h3 style="margin:0">Đánh giá sản phẩm</h3><p style="margin:4px 0 0;font-size:13px;color:var(--text-soft)">Quản lý và phản hồi đánh giá từ khách hàng.</p></div>'+
    '</div>'+
    tabs+statBlock+filterBar+
    '<div style="font-size:13px;color:var(--text-soft);margin-bottom:10px">Hiển thị '+filtered.length+' / '+allRevs.length+' đánh giá</div>'+
    cards+
  '</div>';
}

function doSellerSaveReply(pid,idx,taId){
  var ta=document.getElementById(taId);
  if(!ta){toast('Không tìm thấy ô nhập phản hồi.');return;}
  var text=(ta.value||'').trim();
  if(!text){toast('Vui lòng nhập nội dung phản hồi.');return;}
  if(!reviewsStore[pid]||!reviewsStore[pid][idx]){toast('Không tìm thấy đánh giá.');return;}
  reviewsStore[pid][idx].reply=text;
  reviewsStore[pid][idx].replyDate=todayStr();
  LS.set('reviews',reviewsStore);
  sellerReviewEditReplyId=null;
  toast('✓ Đã lưu phản hồi thành công!');
  renderAccount();
}

function doSellerDeleteReply(pid,idx){
  if(!confirm('Xóa phản hồi này?')) return;
  if(!reviewsStore[pid]||!reviewsStore[pid][idx]) return;
  delete reviewsStore[pid][idx].reply;
  delete reviewsStore[pid][idx].replyDate;
  LS.set('reviews',reviewsStore);
  toast('✓ Đã xóa phản hồi.');
  renderAccount();
}

function doSellerReportReview(pid,idx){
  var reason=prompt('Lý do báo cáo đánh giá này lên quản trị viên:','');
  if(reason===null) return;
  reason=(reason||'').trim();
  if(!reason){toast('Vui lòng nhập lý do báo cáo.');return;}
  if(!reviewsStore[pid]||!reviewsStore[pid][idx]) return;
  reviewsStore[pid][idx].reported=true;
  reviewsStore[pid][idx].reportReason=reason;
  reviewsStore[pid][idx].reportDate=todayStr();
  LS.set('reviews',reviewsStore);
  addNotif('⚑ Bạn đã báo cáo 1 đánh giá — quản trị viên sẽ xem xét trong 24–48 giờ.');
  toast('✓ Đã báo cáo lên admin. Chúng tôi sẽ xem xét sớm!');
  renderAccount();
}

/* ── 7. Shop Editor (edit business info) ── */
function sellerShopEditor(app){
  const si=app.shopInfo||{};
  const clr=NCC_CAT_CLR[app.category]||'#888';
  const catLbl=NCC_CAT_LBL[app.category]||app.category;
  return '<div class="panel">'+
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">'+
      '<div class="av" style="background:'+clr+'18;color:'+clr+'">'+escHtml(app.shopName.charAt(0).toUpperCase())+'</div>'+
      '<div><div style="font-weight:700;font-size:16px">'+escHtml(app.shopName)+'</div>'+
        '<div style="font-size:12.5px;color:var(--text-soft)"><span style="background:'+clr+'18;color:'+clr+';padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600">'+catLbl+'</span> · Tham gia: '+escHtml(app.reviewedAt||'—')+'</div>'+
      '</div>'+
    '</div>'+
    '<h4 style="margin:0 0 14px">✏ Chỉnh sửa Thông tin Gian hàng</h4>'+
    '<div class="form-field"><label>Mô tả gian hàng</label>'+
      '<textarea id="seDesc" rows="4">'+escHtml(si.desc||'')+'</textarea>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Địa chỉ kho hàng</label><input id="seAddress" value="'+escHtml(si.address||'')+'"></div>'+
      '<div class="form-field"><label>Số điện thoại liên hệ</label><input id="sePhone" value="'+escHtml(app.phone||'')+'"></div>'+
    '</div>'+
    '<div class="form-field"><label>Sản phẩm chính (cách nhau bởi dấu phẩy)</label>'+
      '<input id="seMainCats" value="'+escHtml((si.mainCats||[]).join(', '))+'">'+
    '</div>'+
    '<div style="margin-top:16px;display:flex;gap:10px">'+
      '<button class="btn-primary" onclick="doUpdateSellerShop(\''+app.id+'\')">Lưu thay đổi</button>'+
      '<button class="btn-ghost" onclick="renderAccount()">Hủy</button>'+
    '</div>'+
  '</div>';
}

/* ── 6. Payment Settings ── */
function sellerPaymentSettings(app){
  const bank=app&&app.shopInfo&&app.shopInfo.bank?app.shopInfo.bank:'';
  const parts=bank.split(' – ');
  const bankName=parts[0]||'',bankAcc=parts[1]||'',bankHolder=parts[2]||'';
  const BANKS=['Vietcombank','Techcombank','MB Bank','BIDV','VietinBank','Agribank','TPBank','VPBank','SHB','ACB','Sacombank','HDBank','OCB','SeABank'];
  const bankOpts=BANKS.map(b=>'<option'+(b===bankName?' selected':'')+'>'+b+'</option>').join('');
  const hasBank=bankName&&bankAcc&&bankHolder;
  const maskAcc=bankAcc?'****'+bankAcc.slice(-4):'—';

  return '<div class="panel">'+
    '<h3>Thông tin Thanh toán</h3>'+
    '<p style="color:var(--text-soft);font-size:13.5px;margin:-4px 0 20px">EduMart sẽ chuyển tiền vào tài khoản này sau mỗi kỳ thanh toán (T+3 ngày làm việc sau khi đơn hoàn thành).</p>'+
    (hasBank
      ?'<div style="background:var(--paper);border:1.5px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:20px">'+
          '<div style="font-size:11px;color:var(--text-soft);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">TÀI KHOẢN HIỆN TẠI</div>'+
          '<div style="font-weight:700;font-size:16px">'+escHtml(bankName)+'</div>'+
          '<div style="font-size:14px;margin-top:2px;color:var(--text-soft)">'+maskAcc+' · '+escHtml(bankHolder)+'</div>'+
        '</div>'
      :'<div style="background:#fff9f0;border:1.5px solid #f5c518;border-radius:12px;padding:14px 16px;margin-bottom:20px;font-size:13.5px">'+
          '⚠ Chưa có tài khoản ngân hàng. Vui lòng thêm để nhận thanh toán.'+
        '</div>')+
    '<h4 style="margin:0 0 14px">'+(hasBank?'Cập nhật':'Thêm')+'  Tài khoản Ngân hàng</h4>'+
    '<div class="form-field"><label>Ngân hàng <span style="color:var(--ink)">*</span></label>'+
      '<select id="pyBankName">'+bankOpts+'</select>'+
    '</div>'+
    '<div class="form-row">'+
      '<div class="form-field"><label>Số tài khoản <span style="color:var(--ink)">*</span></label><input id="pyBankAcc" value="'+escHtml(bankAcc)+'" placeholder="Nhập số tài khoản"></div>'+
      '<div class="form-field"><label>Tên chủ tài khoản <span style="color:var(--ink)">*</span></label><input id="pyBankHolder" value="'+escHtml(bankHolder)+'" placeholder="Đúng như in trên thẻ"></div>'+
    '</div>'+
    '<div style="background:#f0fff5;border:1.5px solid #b2dfcc;border-radius:10px;padding:12px 14px;font-size:13px;color:#1a5c38;margin-bottom:16px">'+
      '🔒 Thông tin ngân hàng được mã hóa. EduMart không lưu CVV hoặc mã PIN.'+
    '</div>'+
    '<button class="btn-primary" onclick="doUpdateSellerPayment('+(app?'\''+app.id+'\'':"null")+')">Lưu tài khoản ngân hàng</button>'+
  '</div>';
}

/* ── Action Functions ── */

function doSellerRegNext(){
  if(sellerRegStep===1){
    const shopName=(document.getElementById('slShopName')||{}).value||'';
    const phone=(document.getElementById('slPhone')||{}).value||'';
    const desc=(document.getElementById('slDesc')||{}).value||'';
    const address=(document.getElementById('slAddress')||{}).value||'';
    if(!shopName.trim()){toast('Vui lòng nhập tên shop');return;}
    if(!phone.trim()){toast('Vui lòng nhập số điện thoại');return;}
    if(!desc.trim()){toast('Vui lòng nhập mô tả gian hàng');return;}
    if(!address.trim()){toast('Vui lòng nhập địa chỉ kho hàng');return;}
    LS.set('slReg1',{shopName:shopName.trim(),phone:phone.trim(),category:(document.getElementById('slCategory')||{}).value||'sach',desc:desc.trim(),address:address.trim(),mainCats:((document.getElementById('slMainCats')||{}).value||'').split(',').map(s=>s.trim()).filter(Boolean)});
  }
  if(sellerRegStep===2){
    const num=(document.getElementById('slGpkdNum')||{}).value||'';
    const place=(document.getElementById('slGpkdPlace')||{}).value||'';
    if(!num.trim()){toast('Vui lòng nhập số đăng ký GPKD');return;}
    if(!place.trim()){toast('Vui lòng nhập nơi cấp');return;}
    LS.set('slReg2',{number:num.trim(),type:(document.getElementById('slGpkdType')||{}).value||'',issued:(document.getElementById('slGpkdIssued')||{}).value||'',place:place.trim()});
  }
  if(sellerRegStep===3){
    const num=(document.getElementById('slCccdNum')||{}).value||'';
    const name=(document.getElementById('slCccdName')||{}).value||'';
    if(!num.trim()||num.trim().length<9){toast('Số CCCD không hợp lệ (tối thiểu 9 chữ số)');return;}
    if(!name.trim()){toast('Vui lòng nhập họ tên trên CCCD');return;}
    LS.set('slReg3',{number:num.trim(),name:name.trim(),issued:(document.getElementById('slCccdIssued')||{}).value||'',place:(document.getElementById('slCccdPlace')||{}).value||''});
  }
  if(sellerRegStep===4){
    const acc=(document.getElementById('slBankAcc')||{}).value||'';
    const holder=(document.getElementById('slBankHolder')||{}).value||'';
    if(!acc.trim()){toast('Vui lòng nhập số tài khoản ngân hàng');return;}
    if(!holder.trim()){toast('Vui lòng nhập tên chủ tài khoản');return;}
    LS.set('slReg4',{bankName:(document.getElementById('slBankName')||{}).value||'',acc:acc.trim(),holder:holder.trim()});
  }
  sellerRegStep++;
  renderAccount();
}

function doSubmitSellerApp(){
  const chk=document.getElementById('slConfirmCheck');
  if(!chk||!chk.checked){toast('Vui lòng xác nhận thông tin trước khi nộp');return;}
  const d1=LS.get('slReg1',{}), d2=LS.get('slReg2',{}), d3=LS.get('slReg3',{}), d4=LS.get('slReg4',{});
  if(!d1.shopName){toast('Thiếu thông tin bước 1. Vui lòng quay lại.');sellerRegStep=1;renderAccount();return;}
  const newId='sapp-'+Date.now().toString(36);
  const now=todayStr();
  const newApp={
    id:newId,
    shopName:d1.shopName,ownerName:user.name,email:user.email,phone:d1.phone,
    submittedAt:now,status:'pending',category:d1.category,
    gpkd:{number:d2.number||'',issued:d2.issued||'',place:d2.place||'',type:d2.type||''},
    cccd:{number:d3.number||'',name:d3.name||user.name,issued:d3.issued||'',place:d3.place||''},
    shopInfo:{name:d1.shopName,desc:d1.desc||'',address:d1.address||'',bank:(d4.bankName||'')+(d4.acc?' – '+d4.acc:'')+(d4.holder?' – '+d4.holder:''),mainCats:d1.mainCats||[]},
    reviewNote:'',reviewedBy:null,reviewedAt:null
  };
  sellerApps.push(newApp);
  saveSellerApps();
  LS.set('slReg1',null);LS.set('slReg2',null);LS.set('slReg3',null);LS.set('slReg4',null);
  sellerRegStep=1;
  acctTab='seller-reg';
  addNotif('Hồ sơ đăng ký người bán đã được gửi thành công! Chúng tôi sẽ xem xét và phản hồi trong 1–2 ngày làm việc.');
  toast('✓ Hồ sơ đã nộp thành công!');
  renderAccount();
}

function doSellerResubmit(appId){
  const reason=prompt('Bạn đã bổ sung thông tin gì? (tóm tắt cho Admin)','');
  if(reason===null)return;
  const idx=sellerApps.findIndex(a=>a.id===appId);
  if(idx===-1)return;
  sellerApps[idx].status='pending';
  sellerApps[idx].reviewNote='Seller đã bổ sung: '+(reason.trim()||'Đã cập nhật hồ sơ')+'. (Nộp lại '+todayStr()+')';
  sellerApps[idx].reviewedBy=null;
  sellerApps[idx].reviewedAt=null;
  saveSellerApps();
  toast('Đã nộp lại hồ sơ!');
  renderAccount();
}

function doSellerNewApp(){
  if(!confirm('Nộp hồ sơ đăng ký mới? Hồ sơ cũ sẽ được thay thế.'))return;
  sellerRegStep=1;
  acctTab='seller-reg';
  /* Mark old app as new attempt */
  const idx=sellerApps.findIndex(a=>a.email===user.email);
  if(idx!==-1) sellerApps.splice(idx,1);
  saveSellerApps();
  renderAccount();
}

function doUpdateSellerShop(appId){
  const desc=(document.getElementById('seDesc')||{}).value||'';
  const address=(document.getElementById('seAddress')||{}).value||'';
  const phone=(document.getElementById('sePhone')||{}).value||'';
  const mainCats=((document.getElementById('seMainCats')||{}).value||'').split(',').map(s=>s.trim()).filter(Boolean);
  const idx=sellerApps.findIndex(a=>a.id===appId);
  if(idx===-1)return;
  sellerApps[idx].shopInfo=sellerApps[idx].shopInfo||{};
  sellerApps[idx].shopInfo.desc=desc.trim();
  sellerApps[idx].shopInfo.address=address.trim();
  sellerApps[idx].shopInfo.mainCats=mainCats;
  sellerApps[idx].phone=phone.trim();
  /* Sync to activeSellers if exists */
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  if(sIdx!==-1){activeSellers[sIdx].phone=phone.trim();saveActiveSellers();}
  saveSellerApps();
  toast('Đã lưu thông tin gian hàng!');
  renderAccount();
}

function doUpdateSellerPayment(appId){
  const bankName=(document.getElementById('pyBankName')||{}).value||'';
  const acc=(document.getElementById('pyBankAcc')||{}).value||'';
  const holder=(document.getElementById('pyBankHolder')||{}).value||'';
  if(!bankName){toast('Vui lòng chọn ngân hàng');return;}
  if(!acc.trim()){toast('Vui lòng nhập số tài khoản');return;}
  if(!holder.trim()){toast('Vui lòng nhập tên chủ tài khoản');return;}
  const bankStr=bankName+' – '+acc.trim()+' – '+holder.trim();
  if(appId){
    const idx=sellerApps.findIndex(a=>a.id===appId);
    if(idx!==-1){
      sellerApps[idx].shopInfo=sellerApps[idx].shopInfo||{};
      sellerApps[idx].shopInfo.bank=bankStr;
      saveSellerApps();
    }
  }
  /* Also save to activeSellers if available */
  const sIdx=activeSellers.findIndex(s=>s.email===user.email);
  if(sIdx!==-1){
    activeSellers[sIdx].shopInfo=activeSellers[sIdx].shopInfo||{};
    activeSellers[sIdx].shopInfo.bank=bankStr;
    saveActiveSellers();
  }
  toast('Đã lưu thông tin tài khoản ngân hàng!');
  renderAccount();
}
render();
