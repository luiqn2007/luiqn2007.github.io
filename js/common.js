(function () {
    let nav = document.createElement('nav')
    // noinspection HtmlUnknownTarget
    nav.innerHTML = `
      <header class="container">
        <a class="navbar-brand" href="index.html">
          <img class="rounded-circle d-inline-block align-text-top" src="image/logo.png" alt="">
          Hello
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav">
            <li class="nav-item"> 
              <a class="nav-link" href="index.html">主页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="gallery.html">画廊</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="topic.html">主题馆</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="note.html">随手记</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="apps.html">小工具</a>
            </li>
          </ul>
        </div>
      </header>
    `
    nav.classList.add('navbar', 'navbar-expand', 'bg-body-tertiary')
    let body = document.documentElement.querySelector('body')
    if (body.children.length === 0) {
        body.append(nav)
    } else {
        body.insertBefore(nav, body.childNodes[0])
    }
})()

function activeHead(active) {
    let nav = document.querySelector('nav.navbar')
    nav.querySelector(`.nav-link[href="${active}"]`).classList.add('active')
    return nav
}
