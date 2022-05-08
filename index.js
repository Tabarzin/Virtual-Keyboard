let div = document.createElement('textarea');
div.classList.add("text-input");
div.setAttribute("autofocus", "autofocus");
document.body.appendChild(div);

/*let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(keyboard);
*/

const Keyboard = {

  elements: {

    //main: null,
    keyboard: null,
    keys: []


  },

  eventHandlers: {
    oninput: null,
  },


  properties: {
    value: "",
    capsLock: false
  },


  init() {
    
    this.elements.keyboard = document.createElement("div");
    this.elements.keyboard.classList.add("keyboard");
    this.elements.keyboard.appendChild(this._createKeys());
    this.elements.keys = this.elements.keyboard.querySelectorAll(".key");

    
    document.body.appendChild(this.elements.keyboard);

    document.querySelectorAll(".text-input").forEach(elem => {
      
      elem.addEventListener("focus", () => {
        this.start(elem.value, currentValue => {
          elem.value = currentValue;
      });

    });

  });
  },

  
  _createKeys() {

    const fragment = document.createDocumentFragment();

    const layout = [
     "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
     "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "del",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "top", "right-shift",
      "ctrl", "alt", "space", "alt", "left", "down", "right", "ctrl"
  ];

    layout.forEach(key => {

      const keyButton = document.createElement('button');
      const lineBreak = ["backspace", "del", "enter", "right-shift"].indexOf(key) !== -1;

      keyButton.setAttribute("type", "button");
      keyButton.classList.add("key");

      switch(key) {

        case "backspace":
          keyButton.classList.add("key-big-backspace");
          keyButton.innerHTML = "Backspace";

          keyButton.addEventListener("click", () => {

            this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
            this._triggerEvent("oninput");
          });
          break;



        case "tab":
          keyButton.classList.add("key-big");
          keyButton.innerHTML = "Tab";
    
          keyButton.addEventListener("click", () => {
    
            this.properties.value += "  "; 
            this._triggerEvent("oninput");
              });
    
           break;  


        case "caps":
          keyButton.classList.add("key-big-caps");
          keyButton.innerHTML = "Caps Lock";
  
          keyButton.addEventListener("click", () => {
  
            this._toggleCapsLock(); 
            });
  
            break;

        case "shift":
          keyButton.classList.add("key-big");
          keyButton.innerHTML = "Shift";
    
          keyButton.addEventListener("click", () => {
    
          this._toggleShift(); 
          });
          
          break;

          case "right-shift":
            keyButton.classList.add("key-big");
            keyButton.innerHTML = "Shift";
      
            keyButton.addEventListener("click", () => {
      
            this._toggleShift(); 
            });
            
            break;

        case "enter":
          keyButton.classList.add("key-big");
          keyButton.innerHTML = "Enter";

          keyButton.addEventListener("click", () => {
    
            this.properties.value += "/n"; 
            this._triggerEvent("oninput");
            });

          break;

            
        case "space":
          keyButton.classList.add("key-space");
          keyButton.innerHTML = " ";

          keyButton.addEventListener("click", () => {
    
            this.properties.value += " "; 
            this._triggerEvent("oninput");
              });
    

          this._triggerEvent("oninput");
          break;

        case "del":
          keyButton.classList.add("key");
          keyButton.innerHTML = "Del";

          keyButton.addEventListener("click", () => {
    
            this.properties.value = "";
            this._triggerEvent("oninput");

          });

          break;


        default:
          keyButton.textContent = key;
          keyButton.addEventListener("click", () => {
    
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
                });
          break;
      

      }

      fragment.appendChild(keyButton);
      if(lineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;

  },

  _triggerEvent(handlerName) {
    
      if (typeof this.eventHandlers[handlerName] == "function") {
          this.eventHandlers[handlerName](this.properties.value);
      }

  },

  _toggleCapsLock() {

    this.properties.capsLock = !this.properties.capsLock;

    
    document.querySelector(".key-big-caps").classList.toggle("key-activated");
    
    for(const key of this.elements.keys) {

      if(key.childElementCount === 0 && (key.textContent !== "backspace") && (key.textContent !== "del") && (key.textContent !== "ctrl") && (key.textContent !== "alt") && (key.textContent !== "shift") && (key.textContent !== "enter") && (key.textContent !== "tab")) {
        
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();

      }
      
    }

  },

  start (initialValue, oninput) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    
},




};


window.addEventListener("DOMContentLoaded", function() {
  
  Keyboard.init();

});