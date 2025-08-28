const get = id => document.getElementById(id);
const show = id => get(id).classList.remove('invisible');
const hide = id => get(id).classList.add('invisible');
let outputId = 0;
let reasonNumbering = 0;
let doubleAssumption1Value;
let doubleAssumption2Value;
let singleAssumptionValue;

// ドラッグ可能な要素 (input)
['assumption', 'derive-basis', 'relation-side-angle', 'conclusion'].forEach(el => {
  new Sortable(get(el), {
    group: {
      name: 'shared',
      pull: 'clone',
      put: false
    },
    sort: false,
    filter: 'button', // button自体はドラッグ対象から除外
    preventOnFilter: false
    });
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
    console.log(evt.item.classList.value);
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
      if (node.nodeType === 1 && (node.classList.contains('delete-button') || node.classList.contains('numbering-button'))) {
        return; // 特殊ボタンはスキップ
      }
      if (node.nodeType === 1 && node.id === 'double-assumption-1') {
        doubleAssumption1Value = node.value;
        node.removeAttribute('id'); // IDを削除
      }
      if (node.nodeType === 1 && node.id === 'double-assumption-2') {
        doubleAssumption2Value = node.value;
        node.removeAttribute('id'); // IDを削除
      }
      if (node.nodeType === 1 && node.id === 'single-assumption') {
        singleAssumptionValue = node.value;
        node.removeAttribute('id'); // IDを削除
      }
      const cloned = node.cloneNode(true);
      newItem.appendChild(cloned);
    });

    // 番号ボタン
    if (item.classList.contains('can-numbering')) {
      // 空白
      const space = document.createElement('span');
      space.textContent = ' ';
      newItem.appendChild(space);

      const numberingButton = document.createElement('button');
      numberingButton.textContent = '番号をつける';
      numberingButton.className = 'numbering-button button';
      numberingButton.onclick = eventNumbering;
      newItem.appendChild(numberingButton);
    }

    // 番号削除ボタン
    if (item.classList.contains('was-numbered')) {
      numbering(item);
    }

    // テンプレートなら処理
    if (item.classList.contains('double-triangle') || item.classList.contains('single-triangle')) {
      const spacer = document.createElement('div');
      spacer.innerHTML = '<div>&emsp;</div>';
      newItem.appendChild(spacer);
      
      // 新しい出力エリアを作成
      newOutput = document.createElement('div');
      newOutput.className = 'output-area level-2';
      newOutput.id = `output-${outputId++}`;
      newItem.appendChild(newOutput);

      if (item.classList.contains('double-triangle')) {
        const conclusionBasis = document.createElement('div');
        conclusionBasis.innerHTML = `<div class="item"><select><optgroup label="合同"><option>1組の辺とその両端の角がそれぞれ等しいから</option><option>2組の辺とその間の角がそれぞれ等しいから</option><option>3組の辺がそれぞれ等しいから</option></optgroup><optgroup label="相似"><option>2組の角がそれぞれ等しいから</option><option>2組の辺の比とその間の角がそれぞれ等しいから</option><option>3組の辺の比がそれぞれ等しいから</option></optgroup></select></div>`;
        const conclusionBasisFirstChild = conclusionBasis.firstChild;
        get('default-output').appendChild(conclusionBasisFirstChild);
        onAddExe({item: conclusionBasisFirstChild, to: get('default-output')});

        const conclusion = document.createElement('div');
        conclusion.innerHTML = `<div class="item">△<input type="text" value=${doubleAssumption1Value}><select><option value="≡">≡</option><option value="∽">∽</option></select>△<input type="text" value=${doubleAssumption2Value}></div>`; //  can-numbering
        const conclusionFirstChild = conclusion.firstChild;
        get('default-output').appendChild(conclusionFirstChild);
        onAddExe({item: conclusionFirstChild, to: get('default-output')});
      } else {
        const conclusion = document.createElement('div');
        conclusion.innerHTML = `<div class="item">△<input type="text" value=${singleAssumptionValue}>は<select><option value="正三角形">正三角形</option><option value="二等辺三角形">二等辺三角形</option><option value="直角三角形">直角三角形</option></select></div>`;  //  can-numbering
        const tempFirstChild = conclusion.firstChild;
        get('default-output').appendChild(tempFirstChild);
        onAddExe({item: tempFirstChild, to: get('default-output')});
      }
    }

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

function numbering(item) {
  // .numbering-button をすべて取得し削除
  const numberingButtons = item.querySelectorAll('.numbering-button');
  numberingButtons.forEach(btn => btn.remove());

  const text_1 = document.createTextNode('...(');
  item.appendChild(text_1);
  
  const number = document.createElement('input');
  number.type = 'number';
  number.className = 'numbering-input';
  number.value = ++reasonNumbering; // 番号をインクリメント
  number.min = 1;
  number.onchange = function() {
    reasonNumbering = this.value; // 入力値で番号を更新
  }
  item.appendChild(number);

  const text_2 = document.createTextNode(')');
  item.appendChild(text_2);
  
  item.classList.remove('can-numbering'); // 番号付け可能な状態を解除
  item.classList.add('was-numbered'); // 番号が付けられたことを示すクラスを追加


  const deleteNumber = document.createElement('button');
  deleteNumber.textContent = '番号を削除';
  deleteNumber.className = 'delete-numbering-button button';
  deleteNumber.onclick = function() {
    item.classList.remove('was-numbered'); // 番号が付けられた状態を解除
    item.classList.add('can-numbering'); // can-numbering クラスを戻す
    reasonNumbering--; // 番号をデクリメント
    // 番号を削除する処理
    item.removeChild(text_1);
    item.removeChild(number);
    item.removeChild(text_2);
    item.removeChild(deleteNumber); // ボタンを削除
    
    // 元の「番号をつける」ボタンを復元
    const numberingButton = document.createElement('button');
    numberingButton.textContent = '番号をつける';
    numberingButton.className = 'numbering-button button';
    numberingButton.onclick = eventNumbering;
    item.appendChild(numberingButton);
  };
  item.appendChild(deleteNumber);
}
function eventNumbering(event) {
  numbering(event.target.closest('.item'));
}

function ClickButton_ReasonNumber(data){
  Text_FromNumber.value += data;
}

function showScreen(id) {
  ['assumption', 'derive-basis', 'relation-side-angle', 'conclusion'].forEach(area => {
    get(area).classList.add('invisible');
  });
  show(id);
}

function openModal(){
  modal = get("modal");
  let modalHTML = `<div>
    <span class="modal-close" onclick="closeModal()">×</span>
    <p>これはモーダルウィンドウです。</p>
    <p>This is modal window.</p>
    <div class="theme-selector">
      <label for="theme">テーマカラー:</label>
      <select id="theme">
        <option value="red">赤</option>
        <option value="blue">青</option>
        <option value="green">緑</option>
        <option value="yellow">黄色</option>
        <option value="purple">紫</option>
        <option value="white">白</option>
        <option value="black">黒</option>
      </select>
    </div>
  </div>`;

  modal.innerHTML = modalHTML;
  modal.style.display = "flex";
}

function closeModal(){
  get("modal").style.display = "none";
}

const themes = {
 white: {
    "--bg-color": "#ffffff",
    "--text-color": "#000000",
    "--move-btn-bg": "#cccccc",
    "--delete-btn-bg": "#999999",
    "--btn-text": "#000000",
    "--title-color": "#e6e6e6",
    "--item-color": "#f2f2f2",
    "--box-color": "#ffffff",
    "--box-text": "#000000"
  },
  black: {
    "--bg-color": "#1a1a1a",
    "--text-color": "#ffffff",
    "--move-btn-bg": "#333333",
    "--delete-btn-bg": "#666666",
    "--btn-text": "#ffffff",
    "--title-color": "#2a2a2a",
    "--item-color": "#262626",
    "--box-color": "#0d0d0d",
    "--box-text": "#ffffff"
  },
  red: {
    "--bg-color": "#ffe5e5",
    "--text-color": "#660000",
    "--move-btn-bg": "#cc0000",
    "--delete-btn-bg": "#990000",
    "--btn-text": "#ffffff",
    "--title-color": "#ffb3b3",
    "--item-color": "#ffcccc",
    "--box-color": "#fff5f5",
    "--box-text": "#000000"
  },
  blue: {
    "--bg-color": "#e5f0ff",
    "--text-color": "#002266",
    "--move-btn-bg": "#0044cc",
    "--delete-btn-bg": "#003399",
    "--btn-text": "#ffffff",
    "--title-color": "#b3d1ff",
    "--item-color": "#cce0ff",
    "--box-color": "#f5f9ff",
    "--box-text": "#000000"
  },
  green: {
    "--bg-color": "#e5ffe5",
    "--text-color": "#003300",
    "--move-btn-bg": "#008800",
    "--delete-btn-bg": "#006600",
    "--btn-text": "#ffffff",
    "--title-color": "#b3ffb3",
    "--item-color": "#ccffcc",
    "--box-color": "#f5fff5",
    "--box-text": "#000000"
  },
  yellow: {
    "--bg-color": "#fffde5",
    "--text-color": "#665500",
    "--move-btn-bg": "#e6c300",
    "--delete-btn-bg": "#cc9900",
    "--btn-text": "#000000",
    "--title-color": "#fff2b3",
    "--item-color": "#fff7cc",
    "--box-color": "#fffff5",
    "--box-text": "#000000"
  },
  purple: {
    "--bg-color": "#f0e5ff",
    "--text-color": "#330066",
    "--move-btn-bg": "#6600cc",
    "--delete-btn-bg": "#4d0099",
    "--btn-text": "#ffffff",
    "--title-color": "#d1b3ff",
    "--item-color": "#e0ccff",
    "--box-color": "#faf5ff",
    "--box-text": "#000000"
  }
};

const themeSelect = document.getElementById("theme");

function applyTheme(themeName) {
  const theme = themes[themeName];
  for (const key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
}

// 初期テーマ
applyTheme("red");

// イベントリスナー
themeSelect.addEventListener("change", (e) => {
  applyTheme(e.target.value);
});