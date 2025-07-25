// コピー元
new Sortable(document.getElementById('input-1'), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false,
  filter: 'details', // details自体はドラッグ対象から除外
  preventOnFilter: false
});
new Sortable(document.getElementById('input-2'), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false,
  filter: 'details', // details自体はドラッグ対象から除外
  preventOnFilter: false
});
new Sortable(document.getElementById('input-3'), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false,
  filter: 'details', // details自体はドラッグ対象から除外
  preventOnFilter: false
});
new Sortable(document.getElementById('input-4'), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false,
  filter: 'details', // details自体はドラッグ対象から除外
  preventOnFilter: false
});
new Sortable(document.getElementById('input-5'), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false,
  filter: 'details', // details自体はドラッグ対象から除外
  preventOnFilter: false
});

// ドロップ先 (output)
new Sortable(document.getElementById('output'), {
  group: {
    name: 'shared',
    pull: true,
    put: true
  },
  animation: 150,
  draggable: 'div.item',
  onAdd: function (evt) {
    const item = evt.item;
    const parent = evt.to;

    // div.itemなら処理
    if (item.classList.contains('item')) {
      const newItem = document.createElement('div');
      newItem.className = 'item';

      // オプションの追加ボタンもここでつける場合
      const button = document.createElement('button');
      button.textContent = '削除';
      button.classList = 'delete_button button';
      button.onclick = deleteItem;
      newItem.appendChild(button);

      // spanとinputを順にコピー
      item.childNodes.forEach(node => {
        const select = node.cloneNode(true);
        newItem.appendChild(select);
      });

      // 元のコピーアイテムを新しいものに置き換え
      parent.replaceChild(newItem, item);
    }
  }
});

function deleteItem(event) {
  const button = event.target;
  const item = button.closest('.item'); // 最も近い .item を取得
  if (item) item.remove();
}

function ClickButton_ReasonNumber(data){
  Text_FromNumber.value += data;
}
