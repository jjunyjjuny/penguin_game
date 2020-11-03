let count_fail = 0
let count_remain = 0

const text_remain = document.getElementById('remain')
const text_fail = document.getElementById('fail')
const text_time = document.getElementById('time')
const text_message = document.getElementById('message')
const btn_level_1 = document.getElementById('btn_level_1')
const btn_level_2 = document.getElementById('btn_level_2')
const btn_level_3 = document.getElementById('btn_level_3')
const screen = document.getElementById('screen')

const img_egg = 'img/img_egg.png'
const img_penguin = 'img/img_penguin.png'
const img_fail = 'img/img_fail.png'

let isPlaying = false
let tds = []
let answer_card = []

function set() {
    createTable(5)
    insertImg(5)

}

function createTable(level) {
    while (screen.hasChildNodes()) {
        screen.removeChild(screen.firstChild)
    }

    const table = document.createElement('table')
    screen.appendChild(table)

    for (let i = 0; i < level; i++) {
        const tr = document.createElement('tr')
        table.appendChild(tr)
        for (let j = 0; j < level; j++) {
            const td = document.createElement('td')
            tr.appendChild(td)
        }
    }
    const gameover = document.createElement('div')
    gameover.id = 'gameover'
    screen.appendChild(gameover)

}

function insertImg(level) {
    let i = 0
    tds = screen.getElementsByTagName('td')
    while (i < level * level) {
        const img = new Image()
        img.setAttribute('src', img_egg)
        img.setAttribute('width', '80px')
        tds[i].appendChild(img)
        i++
    }
}

function reset() {
    isPlaying = false
    count_fail = 10
    count_remain = 0
    answer_card = []
    text_remain.innerText = '-'
    text_fail.innerText = '-'
    text_time.innerText = '-'
    text_message.innerText = '-'
}

function gameStart(level) {
    createTable(level)
    reset()
    text_message.innerText = '메세지 : 펭귄들의 위치를 기억하세요!!'
    btn_level_1.style.visibility = "hidden"
    btn_level_2.style.visibility = "hidden"
    btn_level_3.style.visibility = "hidden"
    tds = screen.getElementsByTagName('td')
    let count = 5000
    for (let i = 0; i < level * level; i++) {
        const card = new Card()
        card.img.onclick = card.click
        card.img.setAttribute("width", '80px')
        if (card.isPenguin) {
            answer_card.push(img_penguin)
        } else {
            answer_card.push(img_egg)
        }
        tds[i].appendChild(card.img)
    }
    countDown()
    setTimeout(function () {
        for (let i = 0; i < tds.length; i++) {
            tds[i].firstChild.setAttribute('src', img_egg)
        }
        setTime()
        isPlaying = true
        btn_level_1.style.visibility = "visible"
        btn_level_2.style.visibility = "visible"
        btn_level_3.style.visibility = "visible"
        text_fail.innerText = count_fail
        text_remain.innerText = count_remain
    }, count)

    count_fail = 10

}

function Card() {

    this.isPenguin = Math.random() >= 0.5
    const isPenguin = this.isPenguin
    let getAnswer = false
    if (this.isPenguin) {
        count_remain++
    }

    this.img = new Image();

    const img1 = new Image();
    img1.src = img_egg
    const img2 = new Image();
    img2.src = img_penguin

    if (this.isPenguin) {
        this.img = img2
    } else {
        this.img = img1
    }

    this.click = function () {
        if (isPlaying) {
            const self = this
            if (isPenguin && !getAnswer) {
                this.setAttribute('src', img_penguin)
                count_remain--
                getAnswer = true
                if (count_remain <= 0) {
                    text_remain.innerText = count_remain
                    winGame()

                }
            } else if (isPenguin && getAnswer) {
                return
            } else {
                this.setAttribute('src', img_fail)

                setTimeout(function () {
                    self.setAttribute('src', img_egg)
                }, 1000)

                count_fail--

                if (count_fail < 1) {
                    failGame()

                }
            }
            text_remain.innerText = count_remain
            text_fail.innerText = count_fail
        }
    }
}

function countDown() {
    const count_num = document.getElementById('count')
    let time = 5
    setTimeout(function count() {
        if (time > 0) {
            count_num.innerText = time
            time--
            setTimeout(count, 1000)
        } else {
            count_num.innerText = ''

        }
    })
}

function setTime() {
    text_message.innerText = '메세지 : 숨어있는 펭귄들을 찾아보세요!!'

    let time = 20
    setTimeout(function count() {
        if (time > 0 && isPlaying) {
            text_time.innerText = time + '초'
            time--
            setTimeout(count, 1000)
        } else if (time <= 0) {
            text_time.innerText = time + '초'
            failGame()
        }
    })
}



function failGame() {
    for (let i = 0; i < answer_card.length; i++) {
        tds[i].firstChild.src = answer_card[i]

    }
    isPlaying = false
    text_message.innerText = '실패! 다시 도전해보세요!'
    gameover.innerText = 'GAME OVER'
}

function winGame() {
    isPlaying = false
    const lev = tds.length
    switch (lev) {
        case 25:
            text_message.innerText = '1단계 성공! 다음 단계에 도전하세요!!'
            break
        case 36:
            text_message.innerText = '2단계 성공! 다음 단계에 도전하세요!!'
            break
        case 49:
            text_message.innerText = '최고 단계를 성공하셨습니다!!'
            break
    }
    gameover.innerText = 'SUCCESS'
}
