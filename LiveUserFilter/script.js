const result = document.getElementById('result')
const filter = document.getElementById('filter') 
const listItems = []; //データ格納用の配列の準備

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))//インプットがあるとフィルターをする

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')
    //fetch(url)の結果をawaitしているので、実際にレスポンスが返るまでこれ以降の処理は保留されます。
    //fetch(url)の結果のレスポンスが返ると変数resにレスポンスオブジェクトが格納されます。

    const {results} = await res.json()
    //次にres.json()を実行し、結果をjsondataに格納します。この結果も、awaitしているので、jsonデータを生成するまでこれ以降の処理は保留されます。

    //console.log(data)←チェック用

    // Clear result
    result.innerHTML = ''

    results.forEach(user => {
        //console.log(user)　←チェック用
        const li = document.createElement('li')//各ユーザーにたいし、リストアイテムを作る

        listItems.push(li)//初期は空欄の配列にpushで配列末尾にひとつずつliを追加していく

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>


        `
        //user.picture.largeやuser.name.firstは各apiによってことなるので、apiドキュメントをみて確認すること

        result.appendChild(li)//一つずつ親要素の子要素として追加していく
    })
}
/*これは同期awaitを使うので、非同期になります。足並みを揃えずにホイホイ勝手に進める
ドット・アンド・シンタックスを使うつもりはありません。
というわけで、asyncとします。
randomuser.meから50個の結果（フェイクのIDデータ）を取得する
*/


function filterData(searchTerm) {//入力したものをキャプチャーする。これは検索語と呼ばれるものを取り込みますので、入力されたものは何でも取り込めます。
    //console.log(searchTerm)
    listItems.forEach(item => {//listItemについて繰り返し処理
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {//入力値(全て小文字に変換したものを対象)を含む場合
            item.classList.remove('hide')//hideクラスを削除する（見えるようになる）
        } else {
            item.classList.add('hide')//hideクラスを追加する（見えないようになる）
        }
    })
}

/*というわけで、リストアイテム、つまりユーザーの配列を取り出し、ループさせることにします。
各項目を呼び出すとします。
各項目について、私はチェックしたいのです。
つまり、基本的にユーザーと一致するかどうかをチェックしたいのです。
そのためには、item.innerTextがitemのinnerTextであれば、リストアイテムはliなので、lisを通過して各アイテムをチェックし、inner textをチェックすることになります。*/