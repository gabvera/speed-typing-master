const API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const startBtn = document.getElementById('start-btn')
const start = document.getElementById('start')
const game = document.getElementById('game')
const gameOver = document.getElementById('game-over')
let scoreText = document.getElementById('score')
let fastestTimeText = document.getElementById('fastest-time')


startBtn.addEventListener('click', e => {
    
    let score = 0
    let fastTime = 999
    let over = ''
    let interval = ''
    scoreText.innerText = 0
    fastestTimeText.innerText = 0
    over = false
    start.classList.add('invisible')
    gameOver.classList.add('invisible')
    game.classList.remove('invisible')
    
    function getRandomQuote(){
        return fetch(API_URL)
            .then(response => response.json())
            .then(data => data.content)
        }
    
    async function renderNewQuote(){
            const quote = await getRandomQuote()
            quoteDisplayElement.innerHTML = ''
            quote.split('').forEach(character => {
                const characterSpan = document.createElement('span')
                characterSpan.innerText = character
                quoteDisplayElement.appendChild(characterSpan)
            })
            quoteInputElement.value = null
            
            startTimer()
    }
        
    quoteInputElement.addEventListener('input', () => {
        const arrayQuote = quoteDisplayElement.querySelectorAll('span')
        const arrayValue = quoteInputElement.value.split('')
        let correct = true
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if(character == null){
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            }else if(character === characterSpan.innerText){
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
            }else{
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                correct = false
            }
         })
    
    
         if(correct){
            score++
            scoreText.innerText = score
            startTime = 0
            window.clearTimeout(interval)
            renderNewQuote()

         if(timerElement.innerText < fastTime){
            fastTime = timerElement.innerText
            fastestTimeText.innerText = fastTime
         }
    }
    
})

function GameOverChecker(){
    if(timerElement.innerText == '30'){
        start.classList.remove('invisible')
        game.classList.add('invisible')
        gameOver.classList.remove('invisible')
        timerElement.innerText = '0'
        over = true
        window.clearTimeout(interval)
    }
}

let startTime = 0

function getTimerTime(){
    interval = setInterval(() => {
         GameOverChecker()
         if(over == true) return 0
            timer.innerText = startTime++
    }, 1000)
}

function startTimer(){
    window.clearTimeout(interval);
    getTimerTime()
}


renderNewQuote()

})