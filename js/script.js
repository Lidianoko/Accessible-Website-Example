
// Collapsible accordion
const workflowAccordion = document.getElementById('workflow-accordion');
const buttons = workflowAccordion.querySelectorAll('.accordion__header');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    // Close all panels
    buttons.forEach(btn => {
      const pid = btn.getAttribute('aria-controls');
      const pnl = document.getElementById(pid);
      btn.setAttribute('aria-expanded', 'false');
      pnl.classList.remove('open');
      pnl.setAttribute('aria-hidden', 'true');
    });

    // If closed, we open it
    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      panel.classList.add('open');
      panel.setAttribute('aria-hidden', 'false');
    }
  });
});

// Tabs
const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tablist = tab.parentElement;
    const panels = tablist.parentElement.querySelectorAll('[role="tabpanel"]');

    // Reset all tabs
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.hidden = true);

    // Activate selected tab
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
  });
});

// MODAL
const modal = document.getElementById('prompt-modal');
const openBtn = document.querySelectorAll('.modal-trigger');
const closeElements = modal.querySelectorAll('[data-close]');
let lastFocusedElement;
const pageContent = document.querySelector('main');

openBtn.forEach(el => {
  el.addEventListener('click', () => {
    lastFocusedElement = document.activeElement;
    pageContent.setAttribute('aria-hidden', 'true'); // hide bg content
    modal.hidden = false;
    modal.querySelector('.modal__close').focus();
  });
});

closeElements.forEach(el => el.addEventListener('click', closeModal));

document.addEventListener('keydown', e => {
  if (!modal.hidden) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  }
});

function closeModal() {
  modal.hidden = true;
  pageContent.removeAttribute('aria-hidden'); // show bg content
  lastFocusedElement.focus();
}

// Focus trap
function trapFocus(e) {
  const focusableEls = modal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  if (e.shiftKey && document.activeElement === firstEl) {
    e.preventDefault();
    lastEl.focus();
  } else if (!e.shiftKey && document.activeElement === lastEl) {
    e.preventDefault();
    firstEl.focus();
  }
}
