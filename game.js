const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
    question: 'HTML stands for -',
    choice1:'HyperText Markup Language',
    choice2:'HyperText and links Markup Language',
    choice3:'HighText Machine Language',
    choice4:'None of these',
    answer:1 ,
    },
    {
        question: 'The HTML attribute used to define the inline styles is -',
    choice1:'style',
    choice2:'class',
    choice3:'styles',
    choice4:'None of the above',
    answer: 1,

    },
    {
        question: 'The CSS property used to make the text bold is -',
    choice1:'style: bold',
    choice2:'weight: bold',
    choice3:'font: bold',
    choice4:'font-weight : bold',
    answer:4 ,
    },
    {
        question: 'CSS stands for -',
    choice1:'Cascade style sheets',
    choice2:'Color and style sheets',
    choice3:'Cascading style sheets',
    choice4:'None of the above',
    answer: 3,
    } ,
    {
        question: 'The CSS property used to specify the transparency of an element is -',
    choice1:'filter',
    choice2:'opacity',
    choice3:'visibility',
    choice4:'overlay',
    answer: 2,
    } 
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'
        if(classToApply == 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
