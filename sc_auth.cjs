const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if(m.type()==='error') errs.push(m.text()); });
  await p.setViewportSize({ width: 1280, height: 900 });
  await p.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await p.waitForTimeout(800);

  // Go to login
  await p.evaluate(() => { localStorage.clear(); go('account'); });
  await p.waitForTimeout(600);

  // Demo panel should be visible immediately
  const hasDemoPanel = await p.evaluate(() => !!document.querySelector('.demo-panel'));
  const pillCount    = await p.evaluate(() => document.querySelectorAll('.demo-pill').length);
  const activePill   = await p.evaluate(() => document.querySelector('.demo-pill.on')?.textContent);
  console.log('1. Demo panel visible:', hasDemoPanel, '| pills:', pillCount, '| active:', activePill);

  // Email/pw auto-filled for default role (hocsinh)
  const defaultEmail = await p.evaluate(() => document.getElementById('lgEmail')?.value);
  const defaultPw    = await p.evaluate(() => document.getElementById('lgPw')?.value);
  console.log('2. Default prefill: email=', defaultEmail, 'pw=', defaultPw);

  await p.screenshot({ path: 'sc_demo_panel_default.png', fullPage: true });

  // Click admin pill
  await p.click('.demo-pill[data-role="admin"]');
  await p.waitForTimeout(400);
  const adminEmail = await p.evaluate(() => document.getElementById('lgEmail')?.value);
  const adminPw    = await p.evaluate(() => document.getElementById('lgPw')?.value);
  const adminPill  = await p.evaluate(() => document.querySelector('.demo-pill.on')?.textContent);
  console.log('3. After admin pill: email=', adminEmail, 'pw=', adminPw, 'active=', adminPill);

  await p.screenshot({ path: 'sc_demo_panel_admin.png', fullPage: true });

  // Login as admin
  await p.click('button[onclick="doLogin()"]');
  await p.waitForTimeout(800);
  const role = await p.evaluate(() => user?.role);
  const onDash = await p.evaluate(() => !!document.querySelector('.adm-kpi-grid'));
  console.log('4. Login result: role=', role, '| admin dashboard=', onDash);

  // Test sinhvien pill
  await p.evaluate(() => { logout(); go('account'); });
  await p.waitForTimeout(500);
  await p.click('.demo-pill[data-role="sinhvien"]');
  await p.waitForTimeout(300);
  const svEmail = await p.evaluate(() => document.getElementById('lgEmail')?.value);
  console.log('5. Sinhvien pill email:', svEmail);
  await p.click('button[onclick="doLogin()"]');
  await p.waitForTimeout(600);
  console.log('6. Sinhvien login role:', await p.evaluate(() => user?.role));

  console.log('JS ERRORS:', errs.length > 0 ? errs[0].substring(0,80) : 'none');
  await b.close();
})().catch(e => { console.error('ERR:', e.message); process.exit(1); });
