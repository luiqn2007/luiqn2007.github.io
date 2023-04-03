function addHead(activeUrl) {
    let nav = document.createElement('nav')
    nav.classList.add('navbar', 'navbar-expand', 'bg-body-tertiary')
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
            <li class="nav-ite">
              <a class="nav-link" href="ways.html">里程碑</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="notes.html">随手记</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="apps.html">小工具</a>
            </li>
          </ul>
        </div>
      </header>
    `
    console.log(`ul.navbar-nav a[href="${activeUrl}"]`)
    nav.querySelector(`ul.navbar-nav a[href="${activeUrl}"]`).classList.add('active')
    if (document.documentElement.children.length === 0)
        document.documentElement.append(nav, null)
    else
        document.documentElement.insertBefore(nav, document.documentElement.children[0])
    return nav
}