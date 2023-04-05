(function () {
    let container = document.querySelector('.mileposts')
    let mileposts = {}

    let xmlReq = new XMLHttpRequest()
    xmlReq.addEventListener('progress', ev => {
        // todo loading
        console.log(ev.loaded + "/" + ev.total)
    })
    xmlReq.addEventListener('load', () => {
        mileposts = JSON.parse(xmlReq.responseText)
        for (let name in mileposts) {
            let milepost = document.createElement('div')
            milepost.innerHTML = `
            <button class="milepost-head">${name}</button>
            `
            milepost.classList.add('milepost')
            container.append(milepost)
        }
    })
    xmlReq.addEventListener('error', () => {

    })
    xmlReq.open('GET', '/data/mileposts.json')
    xmlReq.send()
})()