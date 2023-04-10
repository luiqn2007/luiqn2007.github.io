(function () {
    activeHead('gallery.html')

    let list = document.querySelector('.gallery .content ul')
    let nav = document.querySelector('.gallery nav ul')
    let prev = nav.querySelector('.prev')
    let next = nav.querySelector('.next')
    let show = document.querySelector('.gallery .show')
    let showLoading = show.querySelector('.spinner-holder')
    let showImage = show.querySelector('img')
    let total, per = 10;
    let images = {};
    let imageKeys = []

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
                loading.style.display = 'block'
                let img = li.querySelector(`img`)
                let obj = images[imageKeys[start + i]]
                img.src = obj.icon
                img.alt = imageKeys[start + i]
                img.dataset.imgId = (start + i) + ""
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
    showImage.addEventListener('load', () => {
        showLoading.style.display = 'none'
    })
    window.addEventListener('resize', onresize)

    let imgLoading = new XMLHttpRequest()
    imgLoading.addEventListener('load', () => {
        images = JSON.parse(imgLoading.responseText)
        imageKeys = Object.keys(images)
        total = Math.ceil(imageKeys.length / per)
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
            li.innerHTML = `
              <div class="image position-relative">
                <img class="img-thumbnail rounded object-fit-cover" src="" alt="">
                <div class="loading position-absolute">
                  <div class="spinner-holder position-absolute">
                    <div class="spinner-border text-info">
                    </div>
                  </div>
                </div>
              </div>`
            li.style.display = 'none'
            li.querySelector('img').addEventListener('click', ev => {
                let idx = ev.target.dataset.imgId
                show.style.display = 'block'
                showLoading.style.display = 'block'
                showImage.src = images[imageKeys[idx]].img
            })
            list.appendChild(li)
        }
        updatePage(1)
        console.log(1)
    })
    imgLoading.open('GET', '/data/gallery_imgs.json')
    imgLoading.send()
    onresize()
})()