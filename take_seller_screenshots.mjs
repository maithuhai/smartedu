import { chromium } from 'playwright';

const br = await chromium.launch({ headless: true });
const ctx = await br.newContext({ viewport: { width: 1280, height: 900 } });
const pg = await ctx.newPage();

const sellerUser = JSON.stringify({
  id: 'demo-sl',
  name: 'Nguyễn Văn Long',
  email: 'minhlong.vpp@gmail.com',
  role: 'seller',
  pwHash: '',
  points: 0,
  ref: 'EDU1234',
  checkin: null,
  streak: 0,
  createdAt: '12/06/2025'
});

await pg.addInitScript(`localStorage.setItem('edumart_user', ${JSON.stringify(sellerUser)});`);

await pg.goto('http://localhost:5173');
await pg.waitForLoadState('networkidle');
await pg.waitForTimeout(800);

// Navigate to account
await pg.evaluate(() => { go('account'); });
await pg.waitForTimeout(1000);

// Dashboard
await pg.screenshot({ path: 'sc_new_01_dashboard.png' });
console.log('01 dashboard done');

// Nav links by text
const navItems = [
  ['Đơn hàng', 'sc_new_02_orders.png'],
  ['Kho hàng', 'sc_new_03_warehouse.png'],
  ['Doanh thu', 'sc_new_04_revenue.png'],
  ['Phân tích', 'sc_new_05_analytics.png'],
  ['Đánh giá', 'sc_new_06_reviews.png'],
  ['Khuyến mãi', 'sc_new_07_promo.png'],
  ['Thanh toán', 'sc_new_08_payment.png'],
  ['Thông tin shop', 'sc_new_09_shop.png'],
  ['Sách giấy', 'sc_new_10_products.png'],
];

for (const [label, fname] of navItems) {
  const btn = pg.locator('.acct-nav button', { hasText: label });
  const count = await btn.count();
  if (count > 0) {
    await btn.first().click();
    await pg.waitForTimeout(700);
    await pg.screenshot({ path: fname });
    console.log(fname, 'done');
  } else {
    console.log('NOT FOUND:', label);
    // Try exact text match
    const allBtns = await pg.locator('.acct-nav button').allTextContents();
    console.log('Available nav buttons:', allBtns);
  }
}

await br.close();
console.log('all done');
