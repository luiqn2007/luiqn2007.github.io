(function () {
    let thisJs = document.querySelector('#js')
    let commonJsReq = new XMLHttpRequest()
    commonJsReq.addEventListener('load', () => {
        let sc = document.createElement('script')
        sc.innerHTML = commonJsReq.responseText
        thisJs.parentNode.insertBefore(sc, thisJs)
    })
    commonJsReq.open('get', "js/common.js", false)
    commonJsReq.send()

    addHead('topic.html')

    let topics = {}
    let path = []
    let urlPath = []

    let topicsReq = new XMLHttpRequest()
    topicsReq.addEventListener('load', () => {
        topics = JSON.parse(topicsReq.responseText)
        updatePath()
    })
    topicsReq.open('get', '/data/topics.json')
    topicsReq.send()
    let cards = document.querySelector('.cards')

    function updatePath() {
        let obj = topics
        for (let p of path) {
            obj = obj[p]
        }
        for (let name in obj) {
            console.log(obj[name])
        }
    }
})()