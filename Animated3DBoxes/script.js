const boxesContainer = document.getElementById('boxes')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'))

function createBoxes() {
    for(let i=0; i < 4; i++) {
        for(let j=0; j < 4; j++) {
            const box = document.createElement('div')//分割したboxを作成
            box.classList.add('box')//作成したboxにクラスを付与
            box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`
            boxesContainer.appendChild(box)//親要素に子要素を追加していく
        }
    }
}

createBoxes()