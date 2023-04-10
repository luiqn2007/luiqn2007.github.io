(function () {
    activeHead('topic.html')

    function tid(topic) {
        return topic['..id']
    }

    function tstatus(topic) {
        return topic['..status']
    }

    function tprogress(topic) {
        return topic['..progress']
    }

    function tpriority(topic) {
        return topic['..priority']
    }

    function tpage(topic) {
        return topic['..page']
    }

    let topics = {}
    let topicsReq = new XMLHttpRequest()
    let menu = document.querySelector('.topics .menu')
    let properties = ['下次一定', '极高', '高', '中', '低', '极低']
    topicsReq.addEventListener('load', () => {
        function buildTopic(topics, list, level) {
            let count = 0
            for (const name in topics) {
                if (name.slice(0, 2) === '..') continue
                count++
                let li = document.createElement('li')
                let topic = topics[name]
                let status = tstatus(topic)
                li.innerHTML = `
                <div class="menu-item" id="tn-${tid(topic)}" 
                     data-topic-status="${status}" ${
                    (status === 1 || status === 2) ? 'data-topic-progress="' + tprogress(topic) + '"'
                        : (status === 3 || status === 4) ? 'data-topic-priority="' + tpriority(topic) + '"'
                            : (status === 5 || status === 6) ? 'data-topic-page="' + tpage(topic) + '"' : ""}>
                  <span class="iconfont icon-youjiantou" data-level="${level + ''}"></span>
                  <span class="topic">${name}</span>
                  <ul class="submenu list-unstyled w-100"></ul>
                </div>
                `
                let l = li.querySelector('.submenu')
                let c = buildTopic(topics[name], l, level + 1)
                if (c === 0) {
                    li.querySelector('span.iconfont').classList.remove('iconfont', 'icon-youjiantou')
                }
                li.addEventListener('click', ev => {
                    if (ev.target.tagName === 'SPAN') {
                        let ele = ev.target
                        if (ele.classList.contains('topic')) {
                        } else if (ele.classList.contains('iconfont')) {
                            console.log(ele.classList)
                            if (ele.classList.contains('icon-youjiantou')) {
                                ele.classList.remove('icon-youjiantou')
                                ele.classList.add('icon-a-putongjiantouzhankai')
                                l.classList.add('submenu-open')
                            } else if (ele.classList.contains('icon-a-putongjiantouzhankai')) {
                                ele.classList.remove('icon-a-putongjiantouzhankai')
                                ele.classList.add('icon-youjiantou')
                                l.classList.remove('submenu-open')
                            }
                        }
                        ev.stopPropagation()
                    }
                })
                list.append(li)
            }
            return count
        }

        function buildCard(name, topic) {
            let div = document.createElement('div')
            div.classList.add('card')
            div.id = topic['..id']
            switch (topic['..status']) {
                case 1: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：笔记转换中</p>
                      <p class="card-text">进度：${topic['..progress']}%</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    break
                case 2: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：笔记整理中</p>
                      <p class="card-text">进度：${topic['..progress']}%</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    break
                case 3: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：等待整理笔记</p>
                      <p class="card-text">优先级：${properties[topic['..priority']]}</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    break
                case 4: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：等待学习</p>
                      <p class="card-text">优先级：${properties[topic['..priority']]}</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    break
                case 5: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：学习中</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    div.style.cursor = 'pointer'
                    div.addEventListener('click', () => window.open(topic['..page']))
                    break
                case 6: div.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${topic['..message']}</h6>
                      <p class="card-text">状态：已完成</p>
                      ${topic['..about'] ? `<a href="${topic['..about']}" class="btn btn-primary">相关链接</a>` : ""}
                    </div>
                    `
                    div.style.cursor = 'pointer'
                    div.addEventListener('click', () => window.open(topic['..page']))
                    break
            }
            return div
        }

        function buildCards(name, topics, li) {
            if (topics['..status'] !== 0) {
                li.append(buildCard(name, topics));
            }
            for (const name in topics) {
                if (name.slice(0, 2) === '..') continue
                buildCards(name, topics[name], li);
            }
        }

        topics = JSON.parse(topicsReq.responseText)
        buildTopic(topics, menu, 0)
        let cards = document.querySelector('.content .display-all')
        for (const name in topics) {
            if (name.slice(0, 2) === '..') continue
            let li = document.createElement('li')
            buildCards(name, topics[name], li)
            cards.append(li)
        }
    })
    topicsReq.open('get', '/data/topics.json')
    topicsReq.send()
})()