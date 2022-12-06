const loadText = document.querySelector('.loading-text')
const bg = document.querySelector('.bg')

let load = 0 //initialize, started from zero

let int = setInterval(blurring, 30) //30ミリ秒間隔

function blurring() {
    load++ //1ずつ増やす

        if(load > 99) {//100になったら増加を止める。これで0->100の増加を表現できる。
            clearInterval(int)
        }

    console.log(load)//検証ウインドウのカウンター計測用
    loadText.innerText = `${load}%`//数字が増加する様子を表示する。
    loadText.style.opacity = scale(load, 0, 100, 1, 0) //徐々に数字自体はフェードアウトする
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
}


/* opacityは、loadのように0 ~１００ではなく、0~1の指定（ただし今回は1から0に向かう）のため、 
map a rage of numbers to another range of numbers
数範囲を別の数範囲に写す
をする。// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
参照
*/
function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}