const get = id => document.getElementById(id);
const show = id => get(id).classList.remove('invisible');
const hide = id => get(id).classList.add('invisible');
let outputId = 0;
let reasonNumber = 0;
let doubleAssumption1Value;
let doubleAssumption2Value;
let singleAssumptionValue;

// ドラッグ可能な要素 (input)
['assumption', 'derive-basis', 'relation-side-angle', 'conclusion'].forEach(el => {
  if (el.classList.contains('item') {
    new Sortable(get(el), {
      group: {
        name: 'shared',
        pull: 'clone',
        put: false
      },
      sort: false,
      filter: 'button', // button自体はドラッグ対象から除外
      preventOnFilter: false
  }});
});

// ドロップ先 (output)
function setOutput(el) {
  new Sortable(get(el), {
    group: {
      name: 'shared',
      pull: true,
      put: true
    },
    animation: 150,
    draggable: 'div.item',
    onAdd: onAddExe
  });
};
setOutput(get('default-output').id);

function onAddExe(evt) {
  const item = evt.item;
  const parent = evt.to;
      
  if (item.classList.contains('item')) {
    const newItem = document.createElement('div');
    newItem.className = `${item.classList.value} inserted-item`;
    let newOutput;

    // 削除ボタン
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.classList = 'delete-button button';
    deleteButton.onclick = deleteItem;
    newItem.appendChild(deleteButton);
    
    // 空白
    const space = document.createElement('span');
    space.textContent = ' ';
    newItem.appendChild(space);

    // div.itemの内容をコピー
    item.childNodes.forEach(node => {
      const cloned = node.cloneNode(true);
      if (cloned.nodeType === Node.ELEMENT_NODE) {
        if (cloned.id){
          cloned.removeAttribute('id'); // id属性を削除
        }
        // select要素の場合は選択状態を維持
        if (cloned.tagName === 'SELECT') {
          console.log(cloned)
          cloned.selectedIndex = node.selectedIndex;
        }
      }

      newItem.appendChild(cloned);
    });

    // 番号付けボタン
    const numbering = document.createElement('button');
    numbering.textContent = '+';
    numbering.classList = 'mini-button button';
    numbering.onclick = numberingItem;
    newItem.appendChild(numbering);

    // 元のコピーアイテムを新しいものに置き換え
    parent.replaceChild(newItem, item);
    if (newOutput) {
      setOutput(newOutput.id);
    }
  }
}

function deleteItem(event) {
  const button = event.target;
  const item = button.closest('.item'); // 最も近い .item を取得
  if (item) item.remove();
}

function numberingItem(event) {
  const button = event.target;
  const parent = event.target.parentElement;
  
  const number = document.createElement('button');
  number.textContent = `...(${++reasonNumber})`;
  number.classList = 'numbered-button button';
  number.onclick = useNumber;

  const remove = document.createElement("button");
  remove.textContent = '×';
  remove.classList = 'mini-button button';
  remove.onclick = removeNumber;

  parent.removeChild(button);
  parent.appendChild(number);
  parent.appendChild(remove);
}

function useNumber(event) {
  const button = event.target;
  const result = button.textContent.slice(3);

  const reason = get('reason-numbering');
  reason.value = reason.value + result;
}

function removeByClass(parent, className) {
  const children = parent.querySelectorAll(`.${className}`);
  children.forEach(child => child.remove());
}

function removeNumber(event) {
  const button = event.target;
  const parent = event.target.parentElement;
  
  // 番号付けボタン
  const numbering = document.createElement('button');
  numbering.textContent = '+';
  numbering.classList = 'mini-button button';
  numbering.onclick = numberingItem;
  
  reasonNumber--;

  removeByClass(parent, 'numbered-button');
  parent.removeChild(button);
  parent.appendChild(numbering);  
}

function showScreen(id) {
  ['assumption', 'derive-basis', 'relation-side-angle', 'conclusion'].forEach(area => {
    get(area).classList.add('invisible');
  });
  show(id);
}

function openModal(){
  get("modal").style.display = "flex";
}
function closeModal(){
  get("modal").style.display = "none";
}

// イベントリスナー
get("theme").addEventListener("change", (e) => {
  currentTheme = e.target.value;
  applyTheme(e.target.value);
});

const themes = {
 white: {
    "--bg-color": "#f8f8f8",
    "--text-color": "#000000",
    "--btn-bg": "#999999",
    "--btn-text": "#000000",
    "--title-color": "#e6e6e6",
    "--item-color": "#e0e0e0",
    "--box-color": "#ffffff",
    "--box-text": "#000000",
    "--border-color": "#bfbfbf"
  },
  black: {
    "--bg-color": "#1a1a1a",
    "--text-color": "#ffffff",
    "--btn-bg": "#555555",
    "--btn-text": "#ffffff",
    "--title-color": "#2a2a2a",
    "--item-color": "#262626",
    "--box-color": "#0d0d0d",
    "--box-text": "#ffffff",
    "--border-color": "#666666"
  },
  red: {
    "--bg-color": "#ffe5e5",
    "--text-color": "#660000",
    "--btn-bg": "#990000",
    "--btn-text": "#ffffff",
    "--title-color": "#ffb3b3",
    "--item-color": "#ffcccc",
    "--box-color": "#fff5f5",
    "--box-text": "#000000",
    "--border-color": "#b30000"
  },
  blue: {
    "--bg-color": "#e5f0ff",
    "--text-color": "#002266",
    "--btn-bg": "#003399",
    "--btn-text": "#ffffff",
    "--title-color": "#b3d1ff",
    "--item-color": "#cce0ff",
    "--box-color": "#f5f9ff",
    "--box-text": "#000000",
    "--border-color": "#002299"
  },
  green: {
    "--bg-color": "#e5ffe5",
    "--text-color": "#003300",
    "--btn-bg": "#006600",
    "--btn-text": "#ffffff",
    "--title-color": "#b3ffb3",
    "--item-color": "#ccffcc",
    "--box-color": "#f5fff5",
    "--box-text": "#000000",
    "--border-color": "#004400"
  },
  yellow: {
    "--bg-color": "#fffde5",
    "--text-color": "#665500",
    "--btn-bg": "#cc9900",
    "--btn-text": "#000000",
    "--title-color": "#fff2b3",
    "--item-color": "#fff7cc",
    "--box-color": "#fffff5",
    "--box-text": "#000000",
    "--border-color": "#cc6600"
  },
  purple: {
    "--bg-color": "#f0e5ff",
    "--text-color": "#330066",
    "--btn-bg": "#4d0099",
    "--btn-text": "#ffffff",
    "--title-color": "#d1b3ff",
    "--item-color": "#e0ccff",
    "--box-color": "#faf5ff",
    "--box-text": "#000000",
    "--border-color": "#8000ff"
  }
};

function applyTheme(themeName) {
  const theme = themes[themeName];
  for (const key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
}

// 初期テーマ
applyTheme("white");

const images = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg", "img/img7.jpg", "img/img8.jpg"];
let current = 0;

const imgElement = get("sliderImage");
const indicators = get("indicators");

// インジケータ更新（クリック可能）
function updateIndicators() {
  indicators.innerHTML = ""; // 一度リセット
  images.forEach((_, i) => {
    const span = document.createElement("span");
    span.textContent = (i === current ? "〇" : "●");
    span.classList.add("indicator");
    span.addEventListener("click", () => {
      current = i;
      updateImage();
    });
    indicators.appendChild(span);
  });
}

// 表示更新
function updateImage() {
  imgElement.src = images[current];
  updateIndicators();
}

// 初期表示
updateImage();

// 進む
function prevHTU() {
  current = (current - 1 + images.length) % images.length;
  updateImage();
};

// 戻る
function nextHTU() {
  current = (current + 1) % images.length;
  updateImage();

};

