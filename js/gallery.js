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
    addHead('gallery.html')

    let list = document.querySelector('.gallery .content ul')
    let nav = document.querySelector('.gallery nav ul')
    let prev = nav.querySelector('.prev')
    let next = nav.querySelector('.next')
    let show = document.querySelector('.gallery .show')
    let total, per = 12;
    let images = [];

    function updatePage(page) {
        show.style.display = 'none'
        nav.querySelector('.active').classList.remove('active')
        nav.querySelectorAll('li')[page].classList.add('active')
        let start = (page - 1) * per;
        for (let i = 0; i < per; ++i) {
            let li = list.querySelectorAll(`li`)[i]
            if (start + i >= images.length) {
                li.style.display = 'none'
            } else {
                li.style.display = 'block'
                let loading = li.querySelector('.loading')
                let progress = loading.children[0].children[0].children[0]
                progress.style.width = '0'
                loading.style.display = 'block'
                let imgReq = new XMLHttpRequest()
                let img = li.querySelector(`img`)
                imgReq.open('get', `/image/gallery/${images[start + i]}`)
                imgReq.responseType = 'blob'
                imgReq.addEventListener('progress', ev => {
                    if (ev.lengthComputable) {
                        let percent = ev.loaded / ev.total * 100
                        progress.style.width = `${percent}%`
                    }
                })
                imgReq.addEventListener('load', () => {
                    img.src = window.URL.createObjectURL(imgReq.response)
                })
                imgReq.addEventListener('error', ev => {
                    progress.classList.add('bg-danger')
                })
                imgReq.send()
                img.addEventListener('load', () => {
                    loading.style.display = 'none'
                })
            }
        }
        if (page === total) next.classList.add('disabled')
        else next.classList.remove('disabled')
        if (page === 1) prev.classList.add('disabled')
        else prev.classList.remove('disabled')
    }
    function onresize() {
        let top = document.querySelector('nav').clientHeight
        show.style.top = top + 'px'
        show.style.height = (window.innerHeight - top) + 'px'
    }

    document.querySelector('.gallery .show span').addEventListener('click', () => {
        show.style.display = 'none'
    })
    prev.addEventListener('click', () => {
        let page = parseInt(nav.querySelector('.active').dataset['page'])
        if (page !== 1) updatePage(page - 1)
    })
    next.addEventListener('click', () => {
        let page = parseInt(nav.querySelector('.active').dataset['page'])
        if (page !== total) updatePage(page + 1)
    })
    window.addEventListener('resize', onresize)

    let imgLoading = new XMLHttpRequest()
    imgLoading.addEventListener('load', () => {
        images = JSON.parse(imgLoading.responseText)
        total = Math.ceil(images.length / per)
        for (let node of nav.childNodes)
            if (node.tagName === 'LI' && node.dataset && node.dataset.page)
                nav.removeChild(node)
        for (let i = 1; i <= total; ++i) {
            let li = document.createElement('li')
            li.innerHTML = `<a class="page-link" href="javascript:;">${i}</a>`
            li.dataset['page'] = i + ''
            if (i === 1)
                li.classList.add('active')
            li.querySelector('a').addEventListener('click', () => {
                updatePage(i)
            })
            nav.insertBefore(li, next)
        }
        for (let i = 0; i < per; ++i) {
            let li = document.createElement('li');
            li.innerHTML = `<div class="image position-relative">
                      <img class="img-thumbnail rounded object-fit-cover" src="" alt="">
                      <div class="loading position-absolute"><div class="position-relative">
                        <div class="progress position-absolute">
                          <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
                        </div>
                      </div></div>
                    </div>`
            li.classList.add('col-2')
            li.style.display = 'none'
            li.querySelector('img').addEventListener('click', ev => {
                show.style.display = 'block'
                show.children[1].src = ev.target.src
            })
            list.appendChild(li)
        }
        updatePage(1)
        console.log(1)
    })
    imgLoading.open('GET', '/image/gallery/images.json')
    imgLoading.send()
    onresize()
})()