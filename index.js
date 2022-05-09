let rus = false;

let keys = ["`","1","2","3","4","5","6","7","8","9","0","-","=", "backSlash", "Backspace", "Tab", "q","w","e","r","t","y","u","i","o","p","[", "]", "Caps", "a","s","d","f","g","h","j","k","l",";","'", "Enter", "lShift", "z","x","c","v","b","n","m",",",".","/", "rShift", "lCtrl", "lAlt", "space", "rAlt", "rCtrl", "left", "top", "down", "right" ];
                    
let keyCodes = ["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0", "Minus","Equal","Backslash", "Backspace", "Tab", "KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft",
"BracketRight", "CapsLock", "KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter", "ShiftLeft", "KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash", "ShiftRight", "ControlLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight" ];

const layoutRu = ["ё","1","2","3","4","5","6","7","8","9","0","-","=", "\\", "Backspace", "Tab", "й","ц","у","к","е","н","г","ш","щ","з","х", "ъ", "Caps Lock", "ф","ы","в","а","п","р","о","л","д","ж","э", "Enter", "lShift", "я","ч","с","м","и","т","ь","б","ю",".", "Shift", "Ctrl", "Alt", "space", "Alt", "Ctrl", "◄", "▲", "▼", "►" ];

const layoutEn = ["`","1","2","3","4","5","6","7","8","9","0","-","=", "\\", "Backspace", "Tab", "q","w","e","r","t","y","u","i","o","p","[", "]", "Caps", "a","s","d","f","g","h","j","k","l",";","'", "Enter", "Shift", "z","x","c","v","b","n","m",",",".","/", "Shift", "Ctrl", "Alt", "Space", "Alt", "Ctrl",  "◄", "▲", "▼", "►"  ];


let div = document.createElement('textarea');
div.classList.add("text-input");
div.setAttribute("autofocus", "autofocus");
div.setAttribute("readonly", "readonly");
div.setAttribute("id", "area");
document.body.appendChild(div);


let keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
document.body.appendChild(keyboard)
;


for (let i = 0; i < keyCodes.length; i++) {
   const keyButton = document.createElement('button');
   keyButton.setAttribute("type", "button");
   keyButton.classList.add("key");
   keyboard.appendChild(keyButton);
  
  keyButton.id = keyCodes[i];
  switch(keyCodes[i]) {
    case "Backspace":
      keyButton.classList.add("key-big-backspace");
      break;
    case "Tab":
      keyButton.classList.add("key-big");
      break;
    case "CapsLock":
      keyButton.classList.add("key-big-caps");
      break;
    case "ShiftLeft":
    case "ShiftRight":
      keyButton.classList.add("key-big");
      break;
    case "Enter":
      keyButton.classList.add("key-big");
      break;
    case "Space":
      keyButton.classList.add("key-space");         
      break;
  }
  
  keyButton.addEventListener("click", (event) => {
    console.log(event.target)
    let button = event.target;
    let text = document.getElementById('area');
    text.value += button.innerHTML;
  });
    
}
  

  function generateLayout () {
    
    let arr = layoutEn;
    if (rus) {
      arr = layoutRu;
    }
      
   for(let i = 0; i < keyCodes.length; i++)    {
      
    let buttonID = document.getElementById(keyCodes[i]);
      buttonID.textContent = arr[i];
             
   }
  }

generateLayout();

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey) {
      rus = !rus;
      generateLayout();
    } else {
      let button = document.getElementById(event.code);
      console.log("button: ", button)
      let evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      button.dispatchEvent(evt);
    }
 });


