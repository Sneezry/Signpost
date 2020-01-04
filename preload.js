let fs = require('fs');
let os = require('os');
let path = require('path');
let ioHook = require('iohook');
let keyCodes = {
  8: '⇤',
  9: '↹',
  13: '↵',
  27: 'ESC',
  32: 'Space',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  96: 'Num 0',
  97: 'Num 1',
  98: 'Num 2',
  99: 'Num 3',
  100: 'Num 4',
  101: 'Num 5',
  102: 'Num 6',
  103: 'Num 7',
  104: 'Num 8',
  105: 'Num 9',
  106: 'Num *',
  107: 'Num +',
  109: 'Num -',
  110: 'Num .',
  111: 'Num /',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: '\'',
  223: '`',
};

let homedir = os.homedir();
let configFolderPath = path.join(homedir, '.signpost');
let configFilePath = path.join(configFolderPath, 'config.json');
if (fs.existsSync(configFilePath)) {
  config = require(configFilePath);
} else {
  config = require('./config.json');
}

window.addEventListener('DOMContentLoaded', () => {
  let customCssPath = path.join(configFolderPath, 'custom.css');
  if (fs.existsSync(customCssPath)) {
    let customCss = document.createElement('link');
    customCss.rel = 'stylesheet';
    customCss.href = customCssPath;
    document.head.appendChild(customCss);
  }
  let signpost = document.getElementById('signpost');
  let signpostHiddenCounter;
  let fadeDelay = config.fadeDelay || 5;
  let pos = config.position || 'leftbottom';
  let offsetX = config.offsetX || 0;
  let offsetY = config.offsetY || 0;
  signpost.style.left = offsetX + 'px';
  signpost.style.top = offsetY + 'px';

  document.body.setAttribute('pos', pos);
  ioHook.on('keypress', evt => {
    let key = getKeyPress(evt);
    if (!key) {
      return;
    }
    clearTimeout(signpostHiddenCounter);
    signpost.innerHTML = key;
    signpost.removeAttribute('fadeout');
    signpostHiddenCounter = setTimeout(() => {
      signpost.setAttribute('fadeout', 'true')
    }, fadeDelay * 1000);
  });
  ioHook.start(true);
})

function getKeyPress(evt) {
  let keyArray = [];
  let key = keyCodes[evt.rawcode];
  if (!key) {
    return;
  }

  if (evt.metaKey) {
    keyArray.push('<span class="kbd">⊞</span>');
  }
  if (evt.ctrlKey) {
    keyArray.push('<span class="kbd">Ctrl</span>');
  }
  if (evt.shiftKey) {
    keyArray.push('<span class="kbd">Shift</span>');
  }
  if (evt.altKey) {
    keyArray.push('<span class="kbd">Alt</span>');
  }

  if (keyArray.length === 0 && !config.showPrintableKey && evt.rawcode >= 32) {
    return;
  }

  keyArray.push(`<span class="kbd">${key}</span>`);
  return keyArray.join('<span class="plus">+</span>');
}
