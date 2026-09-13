const routes = ['home', 'overview', 'academy', 'playbook', 'certificate', 'bots', 'checklist'];
const titleMap = { home: 'Home', overview: 'Overview', academy: 'Academy', playbook: 'My playbook', certificate: 'Certificate', bots: 'EA bots', checklist: 'Trade checklist' };
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function navigate(route) {
  if (!routes.includes(route)) route = 'home';
  routes.forEach((name) => {
    const view = document.getElementById(`${name}View`);
    if (view) view.classList.toggle('hidden', name !== route);
  });
  document.getElementById('appShell').classList.toggle('landing-mode', route === 'home');
  document.querySelectorAll('[data-route]').forEach((item) => item.classList.toggle('active', item.dataset.route === route));
  document.getElementById('breadcrumbTitle').textContent = titleMap[route];
  document.getElementById('sidebar').classList.remove('open');
  window.location.hash = route;
}

document.querySelectorAll('[data-route]').forEach((item) => item.addEventListener('click', () => navigate(item.dataset.route)));
window.addEventListener('hashchange', () => navigate(window.location.hash.slice(1) || 'home'));
navigate(window.location.hash.slice(1) || 'home');

document.getElementById('mobileMenu').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

['landingLogin', 'landingSignup', 'heroSignup'].forEach((id) => document.getElementById(id).addEventListener('click', () => document.getElementById('authModal').classList.remove('hidden')));

document.getElementById('resumeButton').addEventListener('click', () => navigate('academy'));

document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).classList.add('hidden')));

document.getElementById('profileButton').addEventListener('click', () => document.getElementById('authModal').classList.remove('hidden'));
document.getElementById('toggleAuth').addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.getElementById('authTitle');
  const name = document.getElementById('authName');
  const submit = document.querySelector('#authForm .primary-button');
  const loggingIn = title.textContent.includes('Log');
  title.textContent = loggingIn ? 'Open your account.' : 'Log back in.';
  name.parentElement.style.display = loggingIn ? 'block' : 'none';
  submit.innerHTML = loggingIn ? 'Create account <span>-></span>' : 'Log in <span>-></span>';
  event.currentTarget.textContent = loggingIn ? 'Log in' : 'Create an account';
});
document.getElementById('authForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('authModal').classList.add('hidden');
  showToast('Welcome to your private workspace.');
});

document.getElementById('startQuiz').addEventListener('click', () => document.getElementById('quizModal').classList.remove('hidden'));
document.querySelectorAll('.quiz-options button').forEach((button) => button.addEventListener('click', () => {
  const result = document.getElementById('quizResult');
  if (button.dataset.answer === 'correct') {
    result.textContent = 'Correct. Your risk stays constant while your position size adapts.';
    button.style.borderColor = '#9ab543';
    button.style.background = '#f3f8e9';
    showToast('Checkpoint passed. Module progress saved.');
    setTimeout(() => { document.getElementById('quizModal').classList.add('hidden'); }, 900);
  } else {
    result.textContent = 'Not quite. Return to the fixed-risk principle and try again.';
    result.style.color = '#c7623d';
  }
}));

document.getElementById('downloadPdf').addEventListener('click', () => {
  const pdfContent = 'AXIOM TRADE ACADEMY\nTrading Psychology Workbook\n\nReflection prompt: What does a good loss look like in your process?';
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'axiom-trading-psychology-workbook.pdf';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Workbook download started.');
});

document.getElementById('savePlan').addEventListener('click', () => {
  const plan = {};
  document.querySelectorAll('.form-panel input, .form-panel textarea').forEach((field) => { plan[field.id] = field.value; });
  localStorage.setItem('axiomPlan', JSON.stringify(plan));
  document.getElementById('savedLabel').textContent = 'Saved just now';
  showToast('Saved to your private workspace.');
});
const savedPlan = JSON.parse(localStorage.getItem('axiomPlan') || 'null');
if (savedPlan) Object.entries(savedPlan).forEach(([id, value]) => { const field = document.getElementById(id); if (field) field.value = value; });

const checkboxes = [...document.querySelectorAll('.large-check input')];
function updateCheckCount() { document.getElementById('checkCount').textContent = `${checkboxes.filter((box) => box.checked).length}/6`; }
checkboxes.forEach((box) => box.addEventListener('change', updateCheckCount));
document.getElementById('resetChecklist').addEventListener('click', () => { checkboxes.forEach((box) => { box.checked = false; }); updateCheckCount(); showToast('Checklist reset. Start with a clear mind.'); });
