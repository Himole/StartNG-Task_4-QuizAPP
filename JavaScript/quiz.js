const question = document.getElementById("question");
const options = Array.from(document.getElementsByClassName("option-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('scoreCounter');
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

    //Array of question to be display
let questons = [
    {
        question: "The brain uses what percentage of the body's energy?",
        option1: "2 per cent",
        option2: "10 per cent",
        option3: "20 per cent",
        option4: "50 per cent",
        answer: 3
    },
    {
        question: "What is not found in grey matter, a major component of the brain?",
        option1: "Dura mater",
        option2: "Glial cells",
        option3: "Nerve cellst",
        option4: "Capillaries",
        answer: 1
    },
    {
        question: " Which statement is true of grey matter?",
        option1: "It is the primary source of intelligence",
        option2: "It is located mainly in the frontal lobes",
        option3: "It processes information",
        option4: "It is the dominant type of nervous tissue in the brain",
        answer: 3
    },
    {
        question: "What is not a part of the brain?",
        option1: "Cerebellum",
        option2: "Brain stem",
        option3: "Foramen magnum",
        option4: "Cerebrum",
        answer: 3
    },
    {
        question: "Which area of the brain is not part of the cerebral cortex?",
        option1: "Frontal lobe",
        option2: "Cerebellum",
        option3: "Parietal lobe",
        option4: "Temporal lobe",
        answer: 2
    },
    {
        question: "Which part of the brain moves the right side of your body?",
        option1: "Left parietal lobe",
        option2: "Left frontal lobe",
        option3: "Right temporal lobe",
        option4: "Right frontal lobe",
        answer: 2
    },
    {
        question: "Which part of the brain is important for language comprehension?",
        option1: "Wernicke's area",
        option2: "Circle of Willis",
        option3: "Hersch's gyrus",
        option4: "Schwann's cells",
        answer: 1
    },
    {
        question: "Which task would not be affected by damage to the right parietal lobe?",
        option1: "Recognising shapes",
        option2: "Dressing",
        option3: "Doing arithmetic",
        option4: "Writing",
        answer: 4
    },
    {
        question: "What part of the brain stem regulates your heartbeat?",
        option1: "Pons",
        option2: "Medulla",
        option3: "Hypothalamus",
        option4: "Thalamus",
        answer: 2
    },
    {
        question: "Which cranial nerve allows us to chew food?",
        option1: "Facial",
        option2: "Abducens",
        option3: "Trochlear",
        option4: "Trigeminal",
        answer: 4
    }
]; 

// CONSTANTS
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questons]; 
    getNewQuestion(); 
};
    
    //This function get new Question till the max-Question is reached
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('latestScore', score);
        //go to the end page
        return window.location.assign ("quizEnd.html");
    }
    questionCounter++;

        //USING STRING CONCARTENATION TO UPDATE THE QUESTION COUNTER
    // questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;
    
        //USING ES6 TEMPLATE LITERAL TO UPDATE THE QUESTION COUNTER
    questionCounterText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
        //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

        /*This is to get the question displayed at random position and 
        also removes the question once displayed from the array till another cycle*/
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

        //Calling the option Answers for each Question using the data-number property
    options.forEach( option => {
        const number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number]
    });

    availableQuestions.splice(questionIndex, 1);  
    acceptingAnswers = true;
};

options.forEach( option => {
    option.addEventListener("click", e => {
        if(!acceptingAnswers) return;
    
        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

            // This block applies class of 'CORRECT' and 'INCORRECT' to the Answers
            //This method below uses "if statement"
        /*const classToApply = 'incorrect';
            if (selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            };*/
    
            // This method applies class as stated in comment above using Tenary Operator
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct'
        : 'incorrect';

        if(classToApply ==='correct') {
            incrementScore(CORRECT_BONUS);
        }
     
        selectedOption.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 600);
    });
});

    //Displaying the score on the topr right corner of the question page
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
  
startGame();