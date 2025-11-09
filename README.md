# Calc.js - Calculadora com Testes

Calculadora funcional com HTML, CSS e JavaScript puro, com suite completa de testes unitários usando Vitest.

## 📋 Estrutura do Projeto

```
CALCULADORA/
├── node_modules/
├── src/
│   ├── server/
│   │   └── index.js
│   ├── services/
│   │   └── calculatorService.js
│   ├── styles/
│   │   └── style.css
│   └── index.html
├── tests/
│   └── index.test.js
├── .gitignore
├── package.json
├── vitest.config.js
└── yarn.lock
```

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
yarn install
```

### 2. Rodar a Aplicação (Servidor Local)

A aplicação precisa rodar em um servidor local por causa dos módulos ES6.

**Opção 1: Com Node (npx)**
```bash
npx http-server
```

**Opção 2: Com Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `src/index.html`
- Selecione "Open with Live Server"

Depois acesse `http://localhost:8000` ou a porta indicada no navegador.

### 3. Rodar os Testes

```bash
yarn test
```

## 📊 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `yarn test` | Roda os testes em modo watch (observa mudanças) |
| `yarn test:ui` | Abre interface visual dos testes no navegador |
| `yarn test:run` | Roda os testes uma única vez |

## ✅ Testes (21 testes total)

A suite de testes cobre todas as funcionalidades principais:

### 📝 Testes de Input (4 testes)
- ✓ Adicionar valores ao clicar em botões
- ✓ Concatenar múltiplos valores
- ✓ Permitir entrada de decimais
- ✓ Permitir entrada de parênteses

### 🗑️ Testes de Clear (2 testes)
- ✓ Limpar o input
- ✓ Focar no input após limpar

### 🧮 Testes de Cálculo (6 testes)
- ✓ Adição
- ✓ Subtração
- ✓ Multiplicação
- ✓ Divisão
- ✓ Módulo
- ✓ Operações complexas com parênteses

### ⌨️ Testes de Teclado (5 testes)
- ✓ Entrada de números pelo teclado
- ✓ Entrada de operadores pelo teclado
- ✓ Backspace para remover caractere
- ✓ Enter para calcular
- ✓ Ignorar teclas não permitidas

### 🎨 Testes de Tema (4 testes)
- ✓ Iniciar com tema dark
- ✓ Trocar para light
- ✓ Trocar de volta para dark
- ✓ Atualizar CSS custom properties

## 🏗️ Arquitetura

### `src/index.html`
Página HTML com estrutura da calculadora. Contém:
- Input de entrada
- Botões de números e operadores
- Input de resultado (desabilitado)
- Botão de tema (dark/light)
- Botão de copiar resultado

### `src/server/index.js`
Arquivo principal que inicializa o calculator service:
```javascript
import { initCalculator } from '../services/calculatorService.js';
document.addEventListener('DOMContentLoaded', initCalculator);
```

### `src/services/calculatorService.js`
Módulo com toda a lógica da calculadora:
- `initCharKeyButtons()` - Setup dos botões de números/operadores
- `initClearButton()` - Setup do botão limpar
- `initInputKeyboard()` - Setup de entrada por teclado
- `initEqualButton()` - Setup do botão igual
- `calculateResult()` - Função de cálculo (exportada para testes)
- `initThemeSwitcher()` - Setup do tema dark/light
- `initCopyToClipboard()` - Setup do copiar para clipboard
- `initCalculator()` - Inicializa tudo

### `src/styles/style.css`
Estilos da calculadora com suporte a:
- Tema dark (padrão)
- Tema light
- CSS custom properties para cores
- Layout responsivo com grid

### `tests/index.test.js`
Suite completa de testes com:
- Testes de entrada de dados
- Testes de limpeza
- Testes de cálculo
- Testes de teclado
- Testes de tema
- 21 testes no total

## 🎯 Como Usar a Calculadora

1. **Números e Operadores**: Clique nos botões ou use o teclado
2. **Limpar**: Clique em "C" ou comece a digitar
3. **Calcular**: Clique em "=" ou pressione Enter
4. **Tema**: Clique em "Switch Theme Dark/Light"
5. **Copiar**: Clique em "Copy" para copiar o resultado

## 🧪 Executar Testes com Detalhes

Para ver mais detalhes dos testes:
```bash
yarn test:ui
```

Isso abre uma interface visual mostrando:
- Cada teste individualmente
- Status (passou/falhou)
- Tempo de execução
- Cobertura de código

## 📦 Dependências

- **vitest** - Framework de testes
- **@testing-library/dom** - Utilities para testes DOM
- **@testing-library/user-event** - Simulação de eventos de usuário
- **jsdom** - Simulador de DOM para testes

## ⚠️ Notas Importantes

1. O servidor deve estar rodando em `localhost` para a aplicação funcionar (por causa dos módulos ES6)
2. Os testes não precisam do servidor rodando, rode com `yarn test`
3. O `eval()` é usado no cálculo, então apenas expressões matemáticas válidas funcionam
4. Tema é armazenado em memória (reseta ao recarregar a página)

## 🔧 Troubleshooting

**Erro: "CORS policy"**
- Solução: Rode um servidor local (Python, npm http-server, ou Live Server)

**Testes falhando**
- Certifique-se que `yarn install` foi executado
- Verifique se os caminhos em `tests/index.test.js` estão corretos: `import * as calculator from '../src/services/calculatorService.js';`

**Calculadora não funciona**
- Verifique se o servidor local está rodando
- Abra o console (F12) para ver erros
- Certifique-se que todos os IDs do HTML correspondem aos do JavaScript

## 📝 Licença

MIT

## 👨‍💻 Desenvolvido com

- HTML, CSS, JavaScript puro
- Vitest para testes
- Testing Library para testes de DOM