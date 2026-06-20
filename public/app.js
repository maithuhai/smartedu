/* ---------------- Persistence (localStorage) ---------------- */
const LS={
  get(k,d){try{const v=localStorage.getItem('edumart_'+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem('edumart_'+k,JSON.stringify(v));}catch(e){}}
};

/* ---------------- Data ---------------- */
const fmt = n => n.toLocaleString('vi-VN') + 'đ';
const AUD = {tieuhoc:'Tiểu học',thcs:'THCS',thpt:'THPT',sinhvien:'Sinh viên',giaovien:'Giáo viên',school:'Trường học'};
const CATLBL = {sach:'Sách',vpp:'Văn phòng phẩm',tbgd:'Thiết bị giáo dục',ebook:'Ebook',audiobook:'Sách nói'};

const P = [
  {id:1,name:'Bộ SGK lớp 6 - Kết nối tri thức',by:'NXB Giáo Dục Việt Nam',cat:'sach',aud:['thcs'],nxb:'Giáo Dục',price:187000,old:249000,rate:4.9,sold:1200,c:'#2f6ca5'},
  {id:2,name:'Dế Mèn phiêu lưu ký',by:'Tô Hoài',cat:'sach',aud:['tieuhoc'],nxb:'Kim Đồng',price:45000,old:55000,rate:4.8,sold:5400,c:'#3a7a52'},
  {id:3,name:'Tư duy nhanh và chậm',by:'Daniel Kahneman',cat:'sach',aud:['sinhvien'],nxb:'NXB Trẻ',price:169000,old:199000,rate:4.7,sold:2800,c:'#7a4a8c'},
  {id:4,name:'Mắt biếc',by:'Nguyễn Nhật Ánh',cat:'sach',aud:['thpt'],nxb:'NXB Trẻ',price:88000,old:110000,rate:5.0,sold:8100,c:'#c1572f'},
  {id:5,name:'Atomic Habits - Thay đổi tí hon',by:'James Clear',cat:'sach',aud:['sinhvien','thpt'],nxb:'Thế Giới',price:145000,old:180000,rate:4.9,sold:6700,c:'#1f6e6e'},
  {id:6,name:'Luyện thi THPT QG môn Toán',by:'NXB ĐHQG Hà Nội',cat:'sach',aud:['thpt'],nxb:'ĐHQG',price:95000,old:120000,rate:4.6,sold:3300,c:'#384c9c'},
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
  {id:12,name:'Bộ dụng cụ thí nghiệm Vật lý 12',by:'Thiết bị GD',cat:'tbgd',sub:'tn',aud:['thpt'],nxb:'Thiết bị GD',price:360000,old:450000,rate:4.6,sold:980,c:'#1f6e6e',icon:'flask'},
  {id:13,name:'Địa cầu phát sáng 25cm',by:'EduGlobe',cat:'tbgd',sub:'bando',aud:['tieuhoc','thcs'],nxb:'EduGlobe',price:210000,old:280000,rate:4.9,sold:1600,c:'#2f6ca5',icon:'globe'},
  {id:14,name:'Bộ dạy học giáo viên - bảng & phấn',by:'EduPro',cat:'tbgd',sub:'dayho',aud:['giaovien'],nxb:'EduPro',price:175000,old:230000,rate:4.7,sold:1100,c:'#7a4a8c',icon:'board'},
  /* ===== Thiết bị giáo dục mở rộng ===== */
  {id:59,name:'Máy tính Casio fx-991EX Classwiz',by:'Casio',cat:'tbgd',sub:'mtinh',aud:['thpt','sinhvien'],nxb:'Casio',price:295000,old:380000,rate:4.9,sold:8700,c:'#1a2a4a',tag:'hot',icon:'calc'},
  {id:60,name:'Máy tính đồ thị Casio fx-CG50',by:'Casio',cat:'tbgd',sub:'mtinh',aud:['sinhvien'],nxb:'Casio',price:1850000,old:2200000,rate:4.8,sold:1200,c:'#2a1a4a',icon:'calc'},
  {id:61,name:'Kính hiển vi học sinh 400x – 1000x',by:'Optima Lab',cat:'tbgd',sub:'tn',aud:['thcs','thpt'],nxb:'Optima Lab',price:680000,old:890000,rate:4.7,sold:840,c:'#1a4a2a',tag:'hot',icon:'micro'},
  {id:62,name:'Bộ thí nghiệm Hóa học THCS (25 dụng cụ)',by:'EduLab',cat:'tbgd',sub:'tn',aud:['thcs'],nxb:'EduLab',price:450000,old:580000,rate:4.5,sold:620,c:'#4a1a2a',icon:'flask'},
  {id:63,name:'Mô hình cấu trúc DNA 3D tháo lắp',by:'BioModel',cat:'tbgd',sub:'tn',aud:['thpt','sinhvien'],nxb:'BioModel',price:380000,old:490000,rate:4.7,sold:510,c:'#1a4a4a',tag:'new',icon:'flask'},
  {id:64,name:'Bản đồ Việt Nam treo tường 80×120cm',by:'EduMap',cat:'tbgd',sub:'bando',aud:['tieuhoc','thcs'],nxb:'EduMap',price:178000,old:245000,rate:4.6,sold:2300,c:'#3a5a1a',icon:'globe'},
  {id:65,name:'Địa cầu chính trị 30cm có đèn LED',by:'EduGlobe',cat:'tbgd',sub:'bando',aud:['thcs','thpt'],nxb:'EduGlobe',price:310000,old:420000,rate:4.8,sold:1450,c:'#1a3a6a',icon:'globe'},
  {id:66,name:'Bảng trắng từ tính 80×120cm khung nhôm',by:'EduPro',cat:'tbgd',sub:'dayho',aud:['giaovien','school'],nxb:'EduPro',price:470000,old:620000,rate:4.8,sold:1820,c:'#3a1a5a',tag:'hot',icon:'board'},
  {id:67,name:'Bộ thẻ học từ vựng Tiếng Anh 500 thẻ',by:'EduCard',cat:'tbgd',sub:'dayho',aud:['tieuhoc','thcs'],nxb:'EduCard',price:88000,old:120000,rate:4.7,sold:3400,c:'#5a3a1a',tag:'new',icon:'note'},
  {id:68,name:'Đèn học LED chống cận EduLight',by:'EduLight',cat:'tbgd',sub:'dayho',aud:['tieuhoc','thcs','thpt'],nxb:'EduLight',price:278000,old:360000,rate:4.9,sold:4200,c:'#4a4a1a',icon:'lamp'},
  {id:69,name:'Máy chiếu mini EduPro 3000 Lumen',by:'EduPro',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'EduPro',price:3200000,old:4200000,rate:4.7,sold:680,c:'#1a3a5a',tag:'hot',icon:'screen'},
  {id:70,name:'Máy đọc sách EduReader 6" E-Ink',by:'EduMart Tech',cat:'tbgd',sub:'cntt',aud:['sinhvien','giaovien'],nxb:'EduMart Tech',price:1290000,old:1680000,rate:4.6,sold:920,c:'#2a2a4a',tag:'new',icon:'note'},
  {id:71,name:'Camera tài liệu IPEVO V4K 4K',by:'IPEVO',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'IPEVO',price:2450000,old:3100000,rate:4.8,sold:460,c:'#1a4a3a',icon:'cam'},
  {id:72,name:'Màn chiếu gập EduScreen 120"',by:'EduPro',cat:'tbgd',sub:'cntt',aud:['giaovien','school'],nxb:'EduPro',price:890000,old:1200000,rate:4.5,sold:380,c:'#3a3a1a',icon:'screen'},
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
  {id:23,name:'Tắt đèn',by:'Ngô Tất Tố',cat:'sach',aud:['thpt'],nxb:'NXB Văn Học',price:72000,old:95000,rate:4.7,sold:2100,c:'#5a3a2a'},
  {id:24,name:'Cây chuối non đi giày xanh',by:'Nguyễn Nhật Ánh',cat:'sach',aud:['thcs','thpt'],nxb:'NXB Trẻ',price:110000,old:135000,rate:4.9,sold:4300,c:'#2f8f6a'},
  {id:25,name:'Bộ SGK lớp 1 - Cánh Diều',by:'NXB ĐH Sư Phạm',cat:'sach',aud:['tieuhoc'],nxb:'Cánh Diều',price:165000,old:210000,rate:4.8,sold:1800,c:'#c1572f'}
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
const GENRE_MAP={1:'sgk',2:'thieunhi',3:'kynang',4:'vanhoc',5:'kynang',6:'thamkhao',15:'kynang',16:'ngoaingu',17:'kynang',18:'thamkhao',19:'thamkhao',20:'kynang',21:'kynang',22:'ngoaingu',23:'vanhoc',24:'thieunhi',25:'sgk',35:'vanhoc',36:'thamkhao',37:'kynang',38:'sgk',39:'kynang',40:'ngoaingu',41:'kynang',42:'kynang',43:'kynang'};
P.forEach(p=>{if(GENRE_MAP[p.id])p.genre=GENRE_MAP[p.id];});

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
function go(v,a){if(typeof audioTimer!=='undefined'){clearInterval(audioTimer);audioPlaying=false;}view=v;arg=a||null;window.scrollTo(0,0);render();}
function doSearch(){const q=document.getElementById('searchInput').value.trim();go('listing',{q});}

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
}

/* ---------------- Cards ---------------- */
function pcard(p){
  return '<div class="pcard">'+
    '<div class="pcover" style="background:#f3ede3" onclick="go(\'product\','+p.id+')">'+
      (p.old>p.price?'<span class="badge">-'+discount(p)+'%</span>':'')+
      '<button class="fav'+(inWish(p.id)?' on':'')+'" data-wish="'+p.id+'" onclick="event.stopPropagation();toggleWish('+p.id+')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
      cover(p)+
    '</div>'+
    '<div class="pinfo">'+
      '<div class="nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="meta"><span class="star"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span>· đã bán '+(p.sold>=1000?(p.sold/1000).toFixed(1)+'k':p.sold)+'</div>'+
      '<div><span class="price">'+fmt(p.price)+'</span>'+(p.old>p.price?'<span class="price-old">'+fmt(p.old)+'</span>':'')+'</div>'+
      '<button class="add" onclick="addToCart('+p.id+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>'+
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
function uimg(slug,w){return 'https://images.unsplash.com/photo-'+slug+'?auto=format&fit=crop&w='+(w||600)+'&q=80';}
function himg(id,w){return uimg(HIMG[id],w);}
const ARR='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

/* Home-only product card (photo cover) — does not touch the shared pcard() */
function hmCard(p,dark){
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
      '<button class="hm-fav'+(inWish(p.id)?' on':'')+'" data-wish="'+p.id+'" onclick="event.stopPropagation();toggleWish('+p.id+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
    '</div>'+
    '<div class="hm-info">'+
      '<div class="hm-nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="hm-meta"><span class="hm-star"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span><span class="dot">·</span>Đã bán '+sold+'</div>'+
      '<div class="hm-price"><span class="now">'+fmt(p.price)+'</span><span class="old">'+fmt(p.old)+'</span></div>'+
      '<button class="hm-add" onclick="addToCart('+p.id+')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>'+
    '</div></div>';
}
function hmHead(title,kicker,target){
  return '<div class="hm-sechead"><div class="row"><div class="left">'+
    (kicker?'<span class="kick">'+kicker+'</span>':'')+'<h2>'+title+'</h2></div>'+
    (target?'<a class="all" onclick="go(\'listing\',\''+target+'\')">Xem tất cả '+ARR+'</a>':'')+
    '</div><div class="bar"></div></div>';
}
function hmColl(c,tall){
  return '<div class="hm-coll'+(tall?' tall':'')+'" onclick="go(\'listing\',\''+c[5]+'\')">'+
    '<img src="'+uimg(c[3],800)+'" alt="'+c[1]+'" loading="lazy">'+
    '<div class="tint" style="background:'+c[4]+'"></div><div class="grad"></div>'+
    '<span class="kick">'+c[0]+'</span>'+
    '<div class="body"><h3>'+c[1]+'</h3><p>'+c[2]+'</p><span class="link">Xem danh sách '+ARR+'</span></div>'+
  '</div>';
}

function shelfScroll(dir){
  const t=document.getElementById('shelfTrack');
  if(t)t.scrollBy({left:dir*560,behavior:'smooth'});
}

function renderHome(){
  const bestSach=P.filter(p=>p.cat==='sach').slice(0,5);
  const featBooks=P.filter(p=>p.cat==='sach').sort((a,b)=>b.sold*b.rate-a.sold*a.rate).slice(0,8);
  const bsTagMap={1:{l:'Bán chạy',c:'#c0392b'},2:{l:'Kinh điển',c:'#8e44ad'},3:{l:'Best seller',c:'#2980b9'},4:{l:'Yêu thích',c:'#c1572f'},5:{l:'HOT',c:'#e67e22'},6:{l:'Luyện thi',c:'#1a7a4a'},26:{l:'Giáo viên',c:'#27ae60'},27:{l:'Phương pháp',c:'#3498db'}};
  const vpp=P.filter(p=>p.cat==='vpp');
  const tb=P.filter(p=>p.cat==='tbgd');
  const flashItems=[7,4,1,5,9].map(id=>P.find(x=>x.id===id));
  const ebs=P.filter(p=>p.ebook||p.audio).slice(0,5);

  const COLLS=[
    ['Tuyển chọn biên tập','100 cuốn sách nên đọc trong đời','Hành trình văn học vượt thời gian, từ kinh điển đến hiện đại.','1771647287015-f30dbb239646','rgba(120,30,20,.6)','sach'],
    ['Học đường','Sách kinh điển cho học sinh','Những tác phẩm trong và ngoài chương trình nuôi dưỡng tâm hồn.','1535688391459-479d308104f8','rgba(30,50,80,.5)','thpt'],
    ['Ôn thi','Luyện thi THPT Quốc gia','Tuyển tập đề và sách luyện thi tinh gọn theo từng môn học.','1514369118554-e20d93546b30','rgba(80,55,15,.55)','thpt'],
    ['Người trẻ','Phát triển bản thân cho sinh viên','Tư duy, kỹ năng và những thói quen tốt dành cho người trẻ.','1570945880236-10f34833a271','rgba(30,65,40,.52)','sinhvien'],
    ['Thiếu nhi','Sách thiếu nhi hay nhất','Thế giới diệu kỳ và những bài học đầu đời cho các bạn nhỏ.','1777639629798-e3e75d967d3d','rgba(80,25,55,.5)','tieuhoc'],
    ['Sưu tầm','Sách cũ & sách hiếm','Những ấn bản đặc biệt và bản in đầu từ nhà cung cấp uy tín.','1644211492216-8a5e874023f4','rgba(40,28,18,.55)','sach']
  ];
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

  /* Collections */
  hmHead('Bộ sưu tập tuyển chọn','Biên tập viên gợi ý','sach')+
  '<div class="hm-colls">'+
    '<div class="feat-slot">'+hmColl(COLLS[0],true)+'</div>'+
    hmColl(COLLS[1])+hmColl(COLLS[2])+
    '<div class="coll-row">'+hmColl(COLLS[3])+hmColl(COLLS[4])+hmColl(COLLS[5])+'</div>'+
  '</div>'+

  /* Khám phá theo thể loại */
  hmHead('Khám phá theo thể loại','Sàn sách EduMart')+
  '<div class="gen-grid">'+GENT.map(g=>{const n=P.filter(p=>p.genre===g[0]).length;return '<div class="gen-card" style="background:'+g[2]+'" onclick="go(\'listing\',\''+g[0]+'\')"><div class="gic" style="color:'+g[3]+'"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">'+g[4]+'</svg></div><div class="gtx"><div class="gn" style="color:'+g[3]+'">'+g[1]+'</div><div class="gc">'+n+' sản phẩm</div></div></div>';}).join('')+'</div>'+

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

  /* ── Sách nổi bật — Bookshelf Row ── */
  '<div class="bs-section">'+
    '<div class="bs-section-hd">'+
      '<div class="bs-section-left">'+
        '<span class="bs-kicker">Biên tập viên gợi ý</span>'+
        '<h2 class="bs-section-title">📚 Sách nổi bật</h2>'+
      '</div>'+
      '<div class="bs-section-right">'+
        '<button class="bs-arr-btn" onclick="shelfScroll(-1)" aria-label="Trước"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg></button>'+
        '<button class="bs-arr-btn" onclick="shelfScroll(1)" aria-label="Tiếp"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg></button>'+
        '<a class="bs-viewall" onclick="go(\'listing\',\'sach\')">Xem tất cả <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>'+
      '</div>'+
    '</div>'+
    '<div class="bs-track" id="shelfTrack">'+
      featBooks.map(p=>{
        const slug=HIMG[p.id];
        const disc=Math.round((1-p.price/p.old)*100);
        const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':String(p.sold);
        const tag=bsTagMap[p.id];
        const cover=slug
          ?'<img src="'+uimg(slug,400)+'" alt="'+p.name+'" loading="lazy" class="bs-img">'
          :'<div class="bs-grad" style="background:linear-gradient(155deg,'+p.c+' 0%,rgba(0,0,0,.6) 100%)"><div class="bs-grad-nm">'+p.name+'</div><div class="bs-grad-by">'+p.by+'</div></div>';
        return '<div class="bs-item" onclick="go(\'product\','+p.id+')">'+
          '<div class="bs-cover">'+
            cover+
            (tag?'<span class="bs-tag" style="background:'+tag.c+'">'+tag.l+'</span>':'')+
            (disc>0?'<span class="bs-disc">-'+disc+'%</span>':'')+
            '<div class="bs-hover-panel">'+
              '<button class="bs-cart-btn" onclick="event.stopPropagation();addToCart('+p.id+')">'+
                '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg> Thêm vào giỏ'+
              '</button>'+
            '</div>'+
          '</div>'+
          '<div class="bs-info">'+
            '<div class="bs-nm">'+p.name+'</div>'+
            '<div class="bs-by">'+p.by+'</div>'+
            '<div class="bs-rating">'+
              '<svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+
              '<span class="bs-rate-val">'+p.rate.toFixed(1)+'</span>'+
              '<span class="bs-rate-sep">·</span>'+
              '<span class="bs-rate-sold">'+sold+' bán</span>'+
            '</div>'+
            '<div class="bs-pr">'+
              '<span class="bs-now">'+fmt(p.price)+'</span>'+
              (disc>0?'<span class="bs-old">'+fmt(p.old)+'</span>':'')+
            '</div>'+
          '</div>'+
        '</div>';
      }).join('')+
    '</div>'+
  '</div>'+

  /* Audience */
  hmHead('Mua theo đối tượng')+
  '<div class="hm-tiles">'+AUDT.map(t=>'<div class="hm-tile" style="background:'+t[1]+';border-color:'+t[2]+'22" onclick="go(\'listing\',\''+t[3]+'\')"><div class="ic" style="background:'+t[2]+'18;color:'+t[2]+'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">'+t[4]+'</svg></div><span style="color:'+t[2]+'">'+t[0]+'</span></div>').join('')+'</div>'+

  /* Bestsellers */
  hmHead('Sách bán chạy','Trending','sach')+
  '<div class="hm-grid g5">'+bestSach.map(p=>hmCard(p)).join('')+'</div>'+

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

/* ---------------- Listing ---------------- */
let filt={aud:null,price:'all',sort:'sold',brand:null,fmt:null,rating:false,sale:false,q:''};
let _listCtx=null;
const CATDESC={
  sach:'Sách giáo khoa, tham khảo, văn học và kỹ năng từ các nhà xuất bản uy tín.',
  ebook:'Sách số đọc ngay trên mọi thiết bị — mua hoặc thuê tiết kiệm.',
  audiobook:'Sách nói chất lượng cao, nghe mọi lúc mọi nơi, tự lưu vị trí.',
  vpp:'Bút viết, vở, dụng cụ học tập, họa phẩm và túi balo — đầy đủ văn phòng phẩm cho mọi cấp học.',
  tbgd:'Máy tính khoa học, kính hiển vi, bản đồ, thiết bị thí nghiệm và công nghệ lớp học hiện đại.'
};
const PRICE_LBL={all:'Tất cả',lo:'Dưới 100.000đ',mid:'100.000 – 300.000đ',hi:'Trên 300.000đ'};
const AUDDESC={
  tieuhoc:'Sách giáo khoa, truyện thiếu nhi, bút màu và dụng cụ học tập dành cho học sinh Tiểu học (lớp 1–5).',
  thcs:'Sách giáo khoa, bài tập và dụng cụ học tập cho học sinh THCS (lớp 6–9). Chuẩn bị tốt cho cấp 3.',
  thpt:'Sách giáo khoa, luyện thi THPT Quốc gia và sách phát triển kỹ năng cho học sinh lớp 10–12.',
  sinhvien:'Giáo trình, sách kỹ năng, ebook và tài liệu học tập chuyên sâu dành cho sinh viên đại học.',
  giaovien:'Sách tham khảo, giáo án điện tử, thiết bị dạy học và ưu đãi đặc biệt dành cho nhà giáo.',
  school:'Mua sỉ số lượng lớn, đặt hàng theo danh sách lớp và yêu cầu báo giá cho trường học.'
};
function clearFilter(k){if(k==='price')filt.price='all';else if(k==='rating')filt.rating=false;else if(k==='sale')filt.sale=false;else if(k==='q')filt.q='';else filt[k]=null;renderListing();}
function resetFilters(){filt.aud=null;filt.brand=null;filt.fmt=null;filt.price='all';filt.rating=false;filt.sale=false;filt.q='';renderListing();}
function setSearchQ(v){filt.q=(v||'').trim();renderListing();}
function renderListing(){
  let title='Tất cả sản phẩm', base=P.slice(), ctxKey='all', catKey=null, heroDesc='', audKey=null, ebSubTab=null, isVpp=false, isTbgd=false;
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
  } else if(arg&&arg.q){title='Kết quả cho "'+arg.q+'"';const q=arg.q.toLowerCase();base=P.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q));ctxKey='q:'+arg.q;}
  if(_listCtx!==ctxKey){_listCtx=ctxKey;filt.aud=null;filt.brand=null;filt.fmt=null;filt.price='all';filt.rating=false;filt.sale=false;filt.q='';}

  const isBookCat=!catKey||catKey==='sach'||catKey==='ebook'||catKey==='audiobook';
  const brandLabel=(catKey==='vpp'||catKey==='tbgd')?'Thương hiệu':'Nhà xuất bản';
  const brands=[...new Set(base.map(p=>p.nxb))].sort((a,b)=>a.localeCompare(b,'vi'));

  let list=base.slice();
  if(filt.aud)list=list.filter(p=>p.aud&&p.aud.includes(filt.aud));
  if(filt.brand)list=list.filter(p=>p.nxb===filt.brand);
  if(filt.fmt)list=list.filter(p=>(p.format||'').includes(filt.fmt));
  if(filt.price==='lo')list=list.filter(p=>p.price<100000);
  else if(filt.price==='mid')list=list.filter(p=>p.price>=100000&&p.price<300000);
  else if(filt.price==='hi')list=list.filter(p=>p.price>=300000);
  if(filt.rating)list=list.filter(p=>p.rate>=4.8);
  if(filt.sale)list=list.filter(p=>p.old>p.price);
  if(filt.q){const q=filt.q.toLowerCase();list=list.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q)||(p.nxb||'').toLowerCase().includes(q));}
  if(filt.sort==='sold')list.sort((a,b)=>b.sold-a.sold);
  else if(filt.sort==='priceAsc')list.sort((a,b)=>a.price-b.price);
  else if(filt.sort==='priceDesc')list.sort((a,b)=>b.price-a.price);
  else if(filt.sort==='rate')list.sort((a,b)=>b.rate-a.rate);

  const audOpts=Object.entries(AUD).map(([k,v])=>'<label><input type="radio" name="faud" '+(filt.aud===k?'checked':'')+' onchange="filt.aud=\''+k+'\';renderListing()">'+v+'</label>').join('');
  const brandOpts='<label><input type="radio" name="fbr" '+(!filt.brand?'checked':'')+' onchange="filt.brand=null;renderListing()">Tất cả</label>'+
    brands.map(b=>{const cnt=base.filter(p=>p.nxb===b).length;const be=b.replace(/'/g,"\\'");return '<label><input type="radio" name="fbr" '+(filt.brand===b?'checked':'')+' onchange="filt.brand=\''+be+'\';renderListing()">'+b+'<span class="fcount">'+cnt+'</span></label>';}).join('');
  const fmtOpts=catKey==='ebook'?'<label><input type="radio" name="ffmt" '+(!filt.fmt?'checked':'')+' onchange="filt.fmt=null;renderListing()">Tất cả</label>'+['PDF','EPUB'].map(f=>'<label><input type="radio" name="ffmt" '+(filt.fmt===f?'checked':'')+' onchange="filt.fmt=\''+f+'\';renderListing()">'+f+'</label>').join(''):'';
  const priceOpts=[['all','Tất cả'],['lo','Dưới 100.000đ'],['mid','100.000 – 300.000đ'],['hi','Trên 300.000đ']].map(([k,v])=>'<label><input type="radio" name="fpr" '+(filt.price===k?'checked':'')+' onchange="filt.price=\''+k+'\';renderListing()">'+v+'</label>').join('');
  const sortOpts=[['sold','Bán chạy'],['rate','Đánh giá cao'],['priceAsc','Giá thấp đến cao'],['priceDesc','Giá cao đến thấp']].map(([k,v])=>'<option value="'+k+'"'+(filt.sort===k?' selected':'')+'>'+v+'</option>').join('');

  const chips=[];
  if(filt.q)chips.push(['q','Tìm: "'+filt.q+'"']);
  if(filt.aud)chips.push(['aud',AUD[filt.aud]]);
  if(filt.brand)chips.push(['brand',filt.brand]);
  if(filt.fmt)chips.push(['fmt',filt.fmt]);
  if(filt.price!=='all')chips.push(['price',PRICE_LBL[filt.price]]);
  if(filt.rating)chips.push(['rating','Đánh giá 4.8★+']);
  if(filt.sale)chips.push(['sale','Đang giảm giá']);
  const chipHtml=chips.length?'<div class="active-chips">'+chips.map(c=>'<span class="achip">'+c[1]+'<button onclick="clearFilter(\''+c[0]+'\')">×</button></span>').join('')+'<button class="freset" onclick="resetFilters()">Xóa tất cả</button></div>':'';

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>'+title+'</b></div>'+
  '<div class="listing">'+
    '<aside class="filters">'+
      '<div class="filt-head"><h4>Bộ lọc</h4>'+(chips.length?'<button class="freset-sm" onclick="resetFilters()">Đặt lại</button>':'')+'</div>'+
      '<div class="fgroup"><div class="ftitle">Tìm trong danh mục</div><div class="filt-search"><input value="'+filt.q.replace(/"/g,'&quot;')+'" placeholder="Tên, tác giả…" onkeydown="if(event.key===\'Enter\')setSearchQ(this.value)"><button onclick="setSearchQ(this.previousElementSibling.value)">Tìm</button></div></div>'+
      '<div class="fgroup"><div class="ftitle">Đối tượng</div><label><input type="radio" name="faud" '+(!filt.aud?'checked':'')+' onchange="filt.aud=null;renderListing()">Tất cả</label>'+audOpts+'</div>'+
      (brands.length>1?'<div class="fgroup scroll"><div class="ftitle">'+brandLabel+'</div>'+brandOpts+'</div>':'')+
      (fmtOpts?'<div class="fgroup"><div class="ftitle">Định dạng</div>'+fmtOpts+'</div>':'')+
      '<div class="fgroup"><div class="ftitle">Khoảng giá</div>'+priceOpts+'</div>'+
      '<div class="fgroup"><div class="ftitle">Khác</div><label><input type="checkbox" '+(filt.rating?'checked':'')+' onchange="filt.rating=this.checked;renderListing()">Đánh giá 4.8★ trở lên</label><label><input type="checkbox" '+(filt.sale?'checked':'')+' onchange="filt.sale=this.checked;renderListing()">Đang giảm giá</label></div>'+
    '</aside>'+
    '<div>'+
      (heroDesc?'<div class="cat-hero"><h1>'+title+'</h1><p>'+heroDesc+'</p></div>':'')+
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
      '<div class="list-top"><span class="cnt"><b>'+list.length+'</b> sản phẩm</span>'+
        '<select onchange="filt.sort=this.value;renderListing()">'+sortOpts+'</select></div>'+
      (list.length?'<div class="grid listing-grid">'+list.map(pcard).join('')+'</div>':'<div class="empty"><div style="font-size:16px;margin-bottom:12px">Không tìm thấy sản phẩm phù hợp.</div><button class="btn-ghost" onclick="resetFilters()">Xóa bộ lọc</button></div>')+
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
    kind:'redirect',to:'seller.html'
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
let orderFilter='all';
let libFilter='all';
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
function escHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function _admLevelLbl(l){return {super:'Toàn quyền',readonly:'Chỉ xem',content:'Nội dung'}[l]||l;}
function fmtMil(n){if(n>=1e9)return (n/1e9).toFixed(1).replace('.',',')+'B';if(n>=1e6)return Math.round(n/1e6)+'M';return n.toLocaleString('vi-VN');}
function fmtBig(n){return Number(n).toLocaleString('vi-VN');}
function admGrowth(g){const up=g>=0;return '<span class="adm-growth '+(up?'up':'dn')+'">'+(up?'▲':'▼')+Math.abs(g)+'%</span>';}

function adminContent(){
  if(acctTab==='adm-users')   return adminUsers();
  if(acctTab==='adm-products')return '<div class="acct-card"><h3>Quản lý sản phẩm</h3><p class="wip-note">Đang phát triển — sẽ ra mắt trong phiên bản tới</p></div>';
  if(acctTab==='adm-orders')  return '<div class="acct-card"><h3>Quản lý đơn hàng</h3><p class="wip-note">Đang phát triển — sẽ ra mắt trong phiên bản tới</p></div>';
  if(acctTab==='adm-shops')   return '<div class="acct-card"><h3>Quản lý Shop / NCC</h3><p class="wip-note">Đang phát triển — sẽ ra mắt trong phiên bản tới</p></div>';
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

function navForRole(r){
  if(r==='admin'){
    const adminTabs=[['dashboard','Tổng quan'],['adm-users','Người dùng'],['adm-products','Sản phẩm'],['adm-orders','Đơn hàng'],['adm-shops','Shop / NCC']];
    return adminTabs;
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
  document.getElementById('app').innerHTML=
  '<div class="acct"><aside class="acct-side"><div class="acct-user"><div class="av">'+user.name.charAt(0).toUpperCase()+'</div><div><div class="nm">'+user.name+'</div><div class="rl">'+ROLELBL[user.role]+'</div></div></div>'+
    '<div class="acct-nav">'+nav.map(n=>'<button class="'+(acctTab===n[0]?'on':'')+'" onclick="acctTab=\''+n[0]+'\';profileTab=\'info\';twoFAStep=null;pfEditMode=false;emailChangeStep=null;emailChangePending=\'\';renderAccount()">'+n[1]+'</button>').join('')+'<button class="danger" onclick="logout()">Đăng xuất</button></div></aside>'+
    '<div>'+acctContent()+'</div></div>';
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

    '<h2 class="vpp-sec-h">📦 Danh mục</h2>'+
    '<div class="tbgd-cats">'+Object.entries(TBGD_SUBS).map(([k,v])=>{
      const items=P.filter(p=>p.cat==='tbgd'&&p.sub===k);
      const cnt=items.length;
      return '<div class="tbgd-cat" onclick="tbgdSub=\''+k+'\';go(\'listing\',\'tbgd\')">'+
        '<div class="tbc-head"><span class="tbc-icon">'+v.icon+'</span><div><div class="tbc-nm">'+v.lbl+'</div><div class="tbc-cnt">'+cnt+' sản phẩm</div></div></div>'+
        '<div class="tbc-desc">'+v.desc+'</div>'+
        '<div class="tbc-items">'+items.slice(0,2).map(p=>'<div class="tbci-nm">'+p.name+'</div>').join('')+'</div>'+
        '<div class="tbc-more">Xem tất cả ›</div>'+
      '</div>';
    }).join('')+'</div>'+

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

    '<h2 class="vpp-sec-h">📦 Danh mục</h2>'+
    '<div class="vpp-cats">'+Object.entries(VPP_SUBS).map(([k,v])=>{const cnt=P.filter(p=>p.cat==='vpp'&&p.sub===k).length;const items=P.filter(p=>p.cat==='vpp'&&p.sub===k).slice(0,3);return '<div class="vpp-cat" onclick="vppSub=\''+k+'\';go(\'listing\',\'vpp\')">'+
      '<div class="vc-head"><span class="vc-icon">'+v.icon+'</span><div><div class="vc-nm">'+v.lbl+'</div><div class="vc-cnt">'+cnt+' sản phẩm</div></div></div>'+
      '<div class="vc-desc">'+v.desc+'</div>'+
      '<div class="vc-items">'+items.map(p=>'<div class="vci-nm">'+p.name+'</div>').join('')+'</div>'+
      '<div class="vc-more">Xem tất cả ›</div>'+
    '</div>';}).join('')+'</div>'+

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

    '<h2 class="eb-sec-h">Danh mục</h2>'+
    '<div class="eb-cats">'+CATS.map(c=>'<div class="eb-cat" onclick="go(\''+c[2]+'\',\''+c[3]+'\')"><div class="ec-icon">'+c[0].split(' ')[0]+'</div><div class="ec-info"><div class="ec-nm">'+c[0].substring(c[0].indexOf(' ')+1)+'</div><div class="ec-cnt">'+c[4]+'</div></div></div>').join('')+'</div>'+

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
document.addEventListener('click',e=>{if(!e.target.closest('.has-menu'))closeNav();});

/* ---------------- init ---------------- */
// Seed demo accounts (chỉ tạo nếu chưa tồn tại)
(function(){
  const SEEDS=[
    {id:'demo-admin',name:'Admin EduMart',     email:'admin@edumart.vn',  pw:'admin123',role:'admin',  adminLevel:'super'},
    {id:'demo-hs',   name:'Nguyễn Học Sinh',   email:'hocsinh@demo.vn',   pw:'demo123', role:'hocsinh'},
    {id:'demo-sv',   name:'Trần Sinh Viên',     email:'sinhvien@demo.vn',  pw:'demo123', role:'sinhvien'},
    {id:'demo-ph',   name:'Lê Phụ Huynh',       email:'phuhuynh@demo.vn',  pw:'demo123', role:'parent'},
    {id:'demo-th',   name:'Trường THPT Demo',   email:'truonghoc@demo.vn', pw:'demo123', role:'school'},
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
render();
