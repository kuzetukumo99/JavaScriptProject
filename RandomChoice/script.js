const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

//ページロード時に自動的に入力欄にカーソルが向かうようにする。
textarea.focus()

//さて、文字入力を開始しましょう。テキストエリアにリスナーを追加します。キーダウンとキーアップがあり、キーを押して離すと、このイベントが発生します。このとき、イベント・パラメータを渡します。そして、e.targetのドット・バリューを渡します。
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {         //Enterを押した際
        setTimeout(() => {//時間によるリフレッシュ
            e.target.value = ''//値をnothingにする。
        }, 10)//10秒でリフレッシュする

        randomSelect() 
    }
})

function createTags(input) {
    //console.log(input) 入力されている様子がコンソール画面で確認できる。
    //コンパでスプリットして、配列で格納したい。
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    //console.log(tags) コンソールログで、コンマで分けられて配列に格納されていることが確認できる。
    //さらに、スペースをfilterで排除したい。filterも条件に応じて特定のものを返すことができる高次の配列メソッドです。
    //各タグについて、例えば tag dot trim とします。これは空白を切り捨てるもので、もしこれが空文字列と等しくなければ、それを返します。それから、配列を操作するマップが必要です。つまり、空文字列であってはいけないということです。また、空白をトリミングします。
    //console.log(tags)
    //map は　manipulateの意 操作する、操る。


    //ということがわかったので、これらのタグをhtmlに貼り付けてみましょう。そこで、これを取り除き、tag要素を取り出してクリアします。そうしないと、タグがどんどん溜まってしまうので、何かをする前に、これをクリアします。
    tagsEl.innerHTML = ''
    //innerHTMLはHTMLの中身を変えるプロパティのこと。

    //以下でタグを生成する
    /*タグを配列として受け取り、for eachでループさせます。
    各タグについて、タグの要素を作成します document.createelement そして、スパンを作成します spanにクラスを追加します タグ要素を取得して、classlist.add class of tag とします .
    そして、タグの内側のテキストを設定します。ここではループしているので、タグの内側のテキストを設定します。
    最後に、tag要素を取得します。ここにsがあることを確認してください。これは、tagというidを持つdivのidです。*/
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag//対象の要素のテキストを取得
        tagsEl.appendChild(tagEl)//tagsEL(親)にtagEl(子)を末尾に加える
        //appendChildは特定の親要素の中に要素を追加するためのメソッドです。 要素を指定し、その要素の子要素として、HTMLタグを追加することができます。 追加される場所は、親要素の末尾です。
    })
}

function randomSelect() {
    const times = 30//ランダムにそれぞれのタグをハイライトする回数、30回

    const interval = setInterval(() => {//ハイライトをつけたり消したりするためのインターバル
        const randomTag = pickRandomTag()//ランダムタグをpickする
        highlightTag(randomTag)//ランダムタグをハイライトする

        setTimeout(() => {
            unHighlightTag(randomTag)
        },100)//毎100ミリ秒
    }, 100);//毎100ミリ秒

    setTimeout(() => {//ランダムセレクティングをストップして、ピックされたタグをハイライトする。
        clearInterval(interval)
        
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)//30回のランダムチョイスハイライト終わる時間　30回 * 100ミリ秒
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')//全タグを取得。クラス="tag"がついた全ての要素やspanを取得する.node listに登録される。以降でこのリストから一つピックさせる。
    return tags[Math.floor(Math.random() * tags.length)]
}

/*
クエリセレクタを使うときは、すべてノードリストとして持っていくことになります。
つまりこれらはすべてノードリストに入れられます。これはインデックスを持つ配列のようなものです。
インデックスがランダムになるので、math.floorを使って切り捨てます。
math.randomはランダムな小数を与えるので、それにタグの配列の長さを掛ければ良いだけです。
Math.random: 0 以上 1 未満 (0 は含むが、 1 は含まない) の範囲で浮動小数点の擬似乱数を返します。
Math.floor: 小数点以下を切り捨てる。
length: 配列の要素数を返します。
なぜ配列の要素数をかけるのか？以下考え方を参照
0~１の間の擬似乱数を得ることができたとすると、
case 1~10のランダム:1の10倍は10です。乱数を1〜10までにしたい場合は10を掛ければいいということになります。
case 1~6（サイコロ）のランダム:サイコロの1〜6にしたい場合はどうなるでしょうか。6を掛ければ実現できそうです。
つまり、範囲を決めた乱数を作るときには、「Math.random()」に最大値を掛けることで実現します。
*/

function highlightTag(tag) {
    tag.classList.add('highlight')//class="highlight"を付与する
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')//class="highlight"を削除する
}