const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length
/* lengthは、スライダーが何個あるかという意味で使われています。
私たちが選択しているのはすべての div であり、実際にはドキュメント内のすべての div が欲しいわけではなく、スライド内(slideRight内）にあるすべての div が欲しいからです。 */

//console.log (slidesLength)/* 検証→consoleで見てみると、４つのdivが取得されている。 */

let activeSlideIndex = 0
/*基本的にこれらは互いに重なるように配置されるので、どのインデックスが基本的に表示されているかを知る必要があるためです。*/ 

slideLeft.style.top =`-${(slidesLength - 1) * 100}vh`
/* last indexを取得（今回は3) スライド数は4だけど、indexは0から数えるので、-1が必要で、インデックスは4-1=3となる。*100は、vhの高さが100%になるため、この値を100倍して、ここにvhを追加します。 */

upButton.addEventListener('click', ()=> changeSlide('up'))
downButton.addEventListener('click', ()=> changeSlide('down'))

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    //console.log(sliderHeight)
    if(direction === 'up') {
        activeSlideIndex++
        if(activeSlideIndex > slidesLength -1) {/*最後のスライドまで行ったらindex = 0に戻る*/
            activeSlideIndex = 0
        }
    } else if(direction === 'down') {
        activeSlideIndex--
        if(activeSlideIndex < 0) {/* 最初のスライドまで戻ったら、indexを最後にする */
            activeSlideIndex = slidesLength - 1
        }
    }

    slideRight.style.transform =`translateY(-${activeSlideIndex * sliderHeight}px)`

    slideLeft.style.transform =`translateY(${activeSlideIndex * sliderHeight}px)`

}