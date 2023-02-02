const labels = document.querySelectorAll('.form-control label')

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')//テキストを分割
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)//mapでletterにindex番号を紐つけて配列処理.transition delayでかくidxに遅らせる処理を追加している。
        .join('')//mapのデータをstringに変換する。配列 (または配列風オブジェクト) の全要素を順に連結した文字列を新たに作成して返します。 
})