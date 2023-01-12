const boxes = document.querySelectorAll('.box')

window.addEventListener('scroll',checkBoxes)//scrollされたらcheckBoxesという関数をコールする。理由：それぞれのboxについて、チェックしたい。boxはsectionやimageなど何にでも対応している。

checkBoxes()//これが無いと最初はスクロールするまで何も表示されない

function checkBoxes() {
    //console.log(window.innerHeight)//innerHeightはwindow内部高さをピクセル単位で返す。
    const triggerBottom = window.innerHeight / 5 * 4 
    
    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top
        //getBoundingClientRectはビューポートに対する要素のサイズと位置情報を提供するDOMRectオブジェクトを返します
        //DomRectは矩形のサイズと位置を記述する。
        if(boxTop < triggerBottom) {
            box.classList.add('show')
        } else {
            box.classList.remove('show')
        }
    })
}