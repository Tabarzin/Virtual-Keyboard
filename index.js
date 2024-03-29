// ---------- Main ---------
let rus = false;
let capsLock = false;
const div = document.createElement('textarea');
div.classList.add('text-input');
div.setAttribute('autofocus', 'autofocus');
div.setAttribute('readonly', 'readonly');
div.setAttribute('id', 'area');
document.body.appendChild(div);
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);
const textRuEn = document.createElement('span');
textRuEn.classList.add('descr');
textRuEn.innerHTML = 'Made in Linux. Switch layout: Ctrl + Alt';
document.body.appendChild(textRuEn);

const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backslash', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
  'BracketRight', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'];

const layoutRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', '◄', '▲', '▼', '►'];

const layoutEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', 'Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl', '◄', '▲', '▼', '►'];

// Create key buttons and handle key events

function createKeys() {
  for (let i = 0; i < keyCodes.length; i += 1) {
    const keyButton = document.createElement('button');
    keyButton.setAttribute('type', 'button');
    keyButton.classList.add('key');
    keyboard.appendChild(keyButton);

    keyButton.id = keyCodes[i];
    switch (keyCodes[i]) {
      case 'Backspace':
        keyButton.classList.add('key-big-backspace');

        break;
      case 'Tab':
        keyButton.classList.add('key-big');
        break;
      case 'CapsLock':
        keyButton.classList.add('key-big-caps');
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        keyButton.classList.add('key-big');
        break;
      case 'Enter':
        keyButton.classList.add('key-big');
        break;
      case 'Space':
        keyButton.classList.add('key-space');
        break;
    }

    keyButton.addEventListener('click', (event) => {
      console.log(event.target);
      const button = event.target;
      button.classList.add('key-activated');

      setTimeout(() => {
        button.classList.remove('key-activated');
      }, 1000);

      let text = document.getElementById('area');

      switch (button.id) {
        case 'Backspace':
          text.value = text.value.substring(0, text.value.length - 1);
          break;

        case 'Tab':
          text.value += '\t';
          break;

        case 'CapsLock':
          capsLock = !capsLock;
          document.getElementById('CapsLock').classList.toggle('caps-active');

          for (const key of document.querySelectorAll('.key')) {
            if ((key.id !== 'Backspace') && (key.id !== 'ControlLeft') && (key.id !== 'ControlRight') && (key.id !== 'AltLeft') && (key.id !== 'AltRight') && (key.id !== 'ShiftLeft') && (key.id !== 'ShiftRight') && (key.id !== 'Enter') && (key.id !== 'Tab') && (key.id !== 'Space')) {
              key.textContent = capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
          }
          break;

        case 'Space':
          text.value += ' ';
          break;

        case 'Enter':
          text.value += '\n';
          break;

        case 'ControlLeft':
        case 'ControlRight':
        case 'AltLeft':
        case 'AltRight':
        case 'ShiftLeft':
        case 'ShiftRight':

          break;

        default:
          text = document.getElementById('area');
          text.value += button.innerHTML;
          break;
      }
    });
  }
}
// Generate En/Ru layouts
function generateLayout() {
  let arr = layoutEn;
  if (rus) {
    arr = layoutRu;
  }

  for (let i = 0; i < keyCodes.length; i += 1) {
    const buttonID = document.getElementById(keyCodes[i]);
    buttonID.textContent = arr[i];
  }
}

// Switch layouts
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    rus = !rus;
    generateLayout();
  } else {
    const button = document.getElementById(event.code);
    const evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    button.dispatchEvent(evt);
  }
});

createKeys();
generateLayout();
