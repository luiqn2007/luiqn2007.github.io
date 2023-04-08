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
    addHead('index.html')
})()