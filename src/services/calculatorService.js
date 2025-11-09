const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

export function initCharKeyButtons() {
  document.querySelectorAll('.charKey').forEach(function(charKeyButton) {
    charKeyButton.addEventListener('click', function() {
      const value = charKeyButton.dataset.value;
      const input = document.getElementById('input');
      input.value += value;
    });
  });
}

export function initClearButton() {
  const input = document.getElementById('input');
  document.getElementById('clear').addEventListener('click', function(ev) {
    input.value = '';
    input.focus();
  });
}

export function initInputKeyboard() {
  const input = document.getElementById('input');
  input.addEventListener('keydown', function(ev) {
    ev.preventDefault();

    if(allowedKeys.includes(ev.key)) {
      input.value += ev.key;
      return;
    }

    if(ev.key === 'Backspace') {
      input.value = input.value.slice(0, -1);
    }

    if(ev.key === 'Enter') {
      calculateResult();
    }
  });
}

export function initEqualButton() {
  document.getElementById('equal').addEventListener('click', calculateResult);
}

export function calculateResult() {
  const input = document.getElementById('input');
  const resultInput = document.getElementById('result');
  
  try {
    const result = eval(input.value);
    resultInput.classList.remove('error');
    resultInput.value = result;
  } catch (e) {
    resultInput.value = 'Error';
    resultInput.classList.add('error');
  }
}

export function initThemeSwitcher() {
  const main = document.querySelector('main');
  const root = document.querySelector(':root');
  
  document.getElementById('themeSwitcher').addEventListener('click', function() {
    if(main.dataset.theme === 'dark') {
      root.style.setProperty('--bg-color', '#f1f5f9');
      root.style.setProperty('--border-color', '#aaa');
      root.style.setProperty('--font-color', '#212529');
      root.style.setProperty('--primary-color', '#26834a');
      main.dataset.theme = 'light';
    } else {
      root.style.setProperty('--bg-color', '#212529');
      root.style.setProperty('--border-color', '#666');
      root.style.setProperty('--font-color', '#f1f5f9');
      root.style.setProperty('--primary-color', '#4dff91');
      main.dataset.theme = 'dark';
    }
  });
}

export function initCopyToClipboard() {
  const resultInput = document.getElementById('result');
  
  document.getElementById('copyToClipboard').addEventListener('click', function(ev) {
    const button = ev.currentTarget;
    if(button.innerText === 'Copy') {
      button.innerText = 'Copied!';
      button.classList.add('success');
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = 'Copy';
      button.classList.remove('success');
    }
  });
}

export function initCalculator() {
  initCharKeyButtons();
  initClearButton();
  initInputKeyboard();
  initEqualButton();
  initThemeSwitcher();
  initCopyToClipboard();
}