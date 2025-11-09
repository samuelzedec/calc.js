import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import * as calculator from '../src/services/calculatorService';

// Mock do HTML
const setupDOM = () => {
  document.body.innerHTML = `
    <main data-theme="dark">
      <header class="flex align-center justify-between">
        <h1>Calc.js</h1>
        <button id="themeSwitcher">Switch Theme Dark/Light</button>
      </header>
      <input type="text" id="input" autocomplete="off">
      <div id="keys">
        <button id="clear">C</button>
        <button class="charKey" data-value=" ( ">(</button>
        <button class="charKey" data-value=" ) ">)</button>
        <button class="charKey" data-value=" / ">/</button>
        <button class="charKey" data-value="7">7</button>
        <button class="charKey" data-value="8">8</button>
        <button class="charKey" data-value="9">9</button>
        <button class="charKey" data-value=" * ">*</button>
        <button class="charKey" data-value="4">4</button>
        <button class="charKey" data-value="5">5</button>
        <button class="charKey" data-value="6">6</button>
        <button class="charKey" data-value=" - ">-</button>
        <button class="charKey" data-value="1">1</button>
        <button class="charKey" data-value="2">2</button>
        <button class="charKey" data-value="3">3</button>
        <button class="charKey" data-value=" + ">+</button>
        <button class="charKey" data-value="0">0</button>
        <button class="charKey" data-value=".">.</button>
        <button class="charKey" data-value=" % ">mod</button>
        <button id="equal">=</button>
      </div>
      <section class="flex align-center justify-between">
        <button id="copyToClipboard">Copy</button>
        <input type="text" id="result" disabled>
      </section>
    </main>
  `;
};

// Funções auxiliares
const getInput = () => document.getElementById('input');
const getResult = () => document.getElementById('result');
const getMainElement = () => document.querySelector('main');
const getThemeSwitcher = () => document.getElementById('themeSwitcher');
const getClearButton = () => document.getElementById('clear');
const getEqualButton = () => document.getElementById('equal');
const getCopyButton = () => document.getElementById('copyToClipboard');
const getCharKeyByValue = (value) => {
  return Array.from(document.querySelectorAll('.charKey')).find(
    btn => btn.dataset.value === value
  );
};

describe('Calculadora - Testes de Input', () => {
  beforeEach(() => {
    setupDOM();
    calculator.initCharKeyButtons();
  });

  it('deve adicionar valores ao input quando clicar em botões de caracteres', () => {
    const input = getInput();
    const btn7 = getCharKeyByValue('7');
    const btnPlus = getCharKeyByValue(' + ');
    
    btn7.click();
    expect(input.value).toBe('7');
    
    btnPlus.click();
    expect(input.value).toBe('7 + ');
  });

  it('deve concatenar múltiplos valores no input', () => {
    const input = getInput();
    const btn7 = getCharKeyByValue('7');
    const btn8 = getCharKeyByValue('8');
    const btn9 = getCharKeyByValue('9');
    
    btn7.click();
    btn8.click();
    btn9.click();
    
    expect(input.value).toBe('789');
  });

  it('deve permitir entrada de decimais', () => {
    const input = getInput();
    const btn7 = getCharKeyByValue('7');
    const btnDot = getCharKeyByValue('.');
    const btn8 = getCharKeyByValue('8');
    
    btn7.click();
    btnDot.click();
    btn8.click();
    
    expect(input.value).toBe('7.8');
  });

  it('deve permitir entrada de parênteses', () => {
    const input = getInput();
    const btnOpen = getCharKeyByValue(' ( ');
    const btn7 = getCharKeyByValue('7');
    const btnClose = getCharKeyByValue(' ) ');
    
    btnOpen.click();
    btn7.click();
    btnClose.click();
    
    expect(input.value).toBe(' ( 7 ) ');
  });
});

describe('Calculadora - Testes de Clear', () => {
  beforeEach(() => {
    setupDOM();
    calculator.initClearButton();
  });

  it('deve limpar o input quando clicar em Clear', () => {
    const input = getInput();
    const clearButton = getClearButton();
    
    input.value = '7 + 5';
    clearButton.click();
    
    expect(input.value).toBe('');
  });

  it('deve focar no input após limpar', () => {
    const input = getInput();
    const clearButton = getClearButton();
    
    clearButton.click();
    
    expect(document.activeElement).toEqual(input);
  });
});

describe('Calculadora - Testes de Cálculo', () => {
  beforeEach(() => {
    setupDOM();
    calculator.initEqualButton();
  });

  it('deve calcular adição corretamente', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '7 + 3';
    calculator.calculateResult();
    
    expect(result.value).toBe('10');
  });

  it('deve calcular subtração corretamente', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '10 - 4';
    calculator.calculateResult();
    
    expect(result.value).toBe('6');
  });

  it('deve calcular multiplicação corretamente', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '5 * 6';
    calculator.calculateResult();
    
    expect(result.value).toBe('30');
  });

  it('deve calcular divisão corretamente', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '20 / 4';
    calculator.calculateResult();
    
    expect(result.value).toBe('5');
  });

  it('deve calcular módulo corretamente', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '10 % 3';
    calculator.calculateResult();
    
    expect(result.value).toBe('1');
  });

  it('deve lidar com operações complexas', () => {
    const input = getInput();
    const result = getResult();
    
    input.value = '( 5 + 3 ) * 2';
    calculator.calculateResult();
    
    expect(result.value).toBe('16');
  });
});

describe('Calculadora - Testes de Teclado', () => {
  beforeEach(() => {
    setupDOM();
    calculator.initInputKeyboard();
  });

  it('deve permitir entrada de números pelo teclado', () => {
    const input = getInput();
    
    fireEvent.keyDown(input, { key: '5', code: 'Digit5' });
    
    expect(input.value).toBe('5');
  });

  it('deve permitir entrada de operadores pelo teclado', () => {
    const input = getInput();
    
    fireEvent.keyDown(input, { key: '+' });
    
    expect(input.value).toContain('+');
  });

  it('deve remover último caractere com Backspace', () => {
    const input = getInput();
    
    input.value = '7 + 5';
    fireEvent.keyDown(input, { key: 'Backspace' });
    
    expect(input.value).toBe('7 + ');
  });

  it('deve calcular ao pressionar Enter', () => {
    const input = getInput();
    const result = getResult();
    
    calculator.initEqualButton();
    
    input.value = '5 + 3';
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(result.value).toBe('8');
  });

  it('deve ignorar teclas não permitidas', () => {
    const input = getInput();
    
    input.value = '';
    fireEvent.keyDown(input, { key: 'a' });
    
    expect(input.value).toBe('');
  });
});

describe('Calculadora - Testes de Tema', () => {
  beforeEach(() => {
    setupDOM();
    calculator.initThemeSwitcher();
  });

  it('deve iniciar com tema dark', () => {
    const main = getMainElement();
    
    expect(main.dataset.theme).toBe('dark');
  });

  it('deve trocar para light ao clicar no botão de tema', () => {
    const main = getMainElement();
    const themeSwitcher = getThemeSwitcher();
    
    themeSwitcher.click();
    
    expect(main.dataset.theme).toBe('light');
  });

  it('deve trocar de volta para dark ao clicar novamente', () => {
    const main = getMainElement();
    const themeSwitcher = getThemeSwitcher();
    
    themeSwitcher.click();
    expect(main.dataset.theme).toBe('light');
    
    themeSwitcher.click();
    expect(main.dataset.theme).toBe('dark');
  });

  it('deve atualizar CSS custom properties ao trocar tema', () => {
    const themeSwitcher = getThemeSwitcher();
    const root = document.documentElement;
    
    themeSwitcher.click();
    
    const bgColorLight = root.style.getPropertyValue('--bg-color');
    expect(bgColorLight).toBe('#f1f5f9');
    
    themeSwitcher.click();
    
    const bgColorDark = root.style.getPropertyValue('--bg-color');
    expect(bgColorDark).toBe('#212529');
  });
});