/**
 * 青商H5 - 企业健康体检
 * 脚本入口
 */

// Swiper 初始化
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  speed: 300,
  on: {
    progress: function(progress) {
      document.getElementById('progressBar').style.width = (progress * 100) + '%';
    }
  }
});

// Tab 切换
document.querySelectorAll('.sol-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.sol-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.sol-content').forEach(c => c.classList.remove('active'));
    document.getElementById('sol-' + target).classList.add('active');
  });
});

// 表单提交
function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('reservationForm');
  const btn = document.getElementById('submitBtn');
  const name = form.querySelector('[name="name"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const need = form.querySelector('[name="need"]').value;

  if (!name || !company || !phone) {
    alert('请填写必填项');
    return false;
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    alert('请填写正确的手机号码');
    return false;
  }

  btn.disabled = true;
  btn.textContent = '提交中...';

  const message = [
    '📋 企业体检预约信息',
    '',
    '👤 姓名：' + name,
    '🏢 公司：' + company,
    '📞 电话：' + phone,
    '💰 融资需求：' + (need || '未填写'),
    '',
    '⏰ 预约时间：' + new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
  ].join('\n');

  fetch('https://open.feishu.cn/open-apis/bot/v2/hook/8a3faff5-65f1-473e-93dc-1a8b0655e9bf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg_type: 'text', content: { text: message } })
  })
  .then(() => { window.location.href = 'success.html'; })
  .catch(() => { window.location.href = 'success.html'; });

  return false;
}