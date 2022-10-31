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
        question: 'Which of the following element is responsible for making the text bold in HTML?',
    choice1:'<pre>',
    choice2:'<a>',
    choice3:'<b>',
    choice4:'<br>',
    answer: 3,

    },
    {
        question: 'Which of the following tag is used for inserting the largest heading in HTML?',
    choice1:'<h3>',
    choice2:'<h1>',
    choice3:'<h5>',
    choice4:'<h6>',
    answer:2 ,
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
        question: 'Which of the following CSS property is used to represent the overflowed text which is not visible to the user?',
    choice1:'text-shadow',
    choice2:'text-stroke',
    choice3:'text-decoration',
    choice4:'text-overflow',
    answer: 4,
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