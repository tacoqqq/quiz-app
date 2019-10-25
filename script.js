let questionsArray = [{
    question: 'Name one problem that led to the Civil War.',
    options: ['Sugar', 'Slavery', 'Oil', 'Westward Expansion'],
    answer: 'Slavery'
},
{
    question: 'When was the Declaration of Independence adopted?',
    options: ['July 4, 1776', 'July 4, 1789', 'March 4, 1789', 'December 7, 1787'],
    answer: 'July 4, 1776'
},
{
    question: 'Name one of the two longest rivers in the United States.',
    options: ['Mississippi River', 'Colorado River', 'Ohio River', 'Rio Grande River'],
    answer: 'Mississippi River'
},
{
    question: 'What is one right or freedom from the First Amendment?',
    options: ['to vote', 'to bear arms', 'trial by jury', 'speech'],
    answer: 'speech'
},
{
    question: 'How many justices are on the Supreme Court?',
    options: ['ten (10)', 'nine (9)', 'twelve (12)', 'eleven (11)'],
    answer: 'nine (9)'
},
{
    question: 'In what month do we vote for President?',
    options: ['January', 'February', 'October', 'November'],
    answer: 'November'
},
{
    question: 'What territory did the United States buy from France in 1803?',
    options: ['Quebec', 'Hawaii', 'Alaska', 'the Louisiana Territory'],
    answer: 'the Louisiana Territory'
},
{
    question: 'When is the last day you can send in federal income tax forms?',
    options: ['March 15', 'May 15', 'July 4', 'April 15'],
    answer: 'April 15'
},
{
    question: 'Name one right only for United States citizens.',
    options: ['run for federal office', 'freedom of speech', 'attend public school', 'freedom of religion'],
    answer: 'run for federal office'
},
{
    question: 'What are the two parts of the U.S. Congress?',
    options: ['the Senate and the courts', 'the Senate and House of Representatives', 'the House of Representatives and the courts', 'the House of Lords and the House of Commons'],
    answer: 'the Senate and House of Representatives'
},
]

let score = 0;
let currentQuestion = 0;
let lastQuestion = questionsArray.length;

function startTest() {
    //initializes the page (so maybe does an animation or calls one)
    //jumps to question 1
      $('.start-btn').click(function(event){
      $('.test-form').remove();
      displayQuestion();
    })
}

function displayQuestion() {

    //showing the current question number and current score 
    $('.display-result').html(`<div class='display-score'>
    <ul>
    <li>Question: ${currentQuestion + 1}/${lastQuestion}</li>
    <li>Test Score: ${score}/${lastQuestion}</li>
    </ul>
    </div>`);
    
    //showing the question and options
    let question = questionsArray[currentQuestion];
    let inputName = 'question' + currentQuestion;
    
    $('form').html(`
        <fieldset class="question-form">
        <legend>${question.question}</legend>
        <label for="answer1"><input type="radio" checked="checked" id="answer1" name="${inputName}" value="${question.options[0]}">${question.options[0]}</label>
        <br>
        <label for="answer2"><input type="radio" id="answer2" name="${inputName}" value="${question.options[1]}">${question.options[1]}</label>
        <br>
        <label for="answer3"><input type="radio" id="answer3" name="${inputName}" value="${question.options[2]}">${question.options[2]}</label>
        <br>
        <label for="answer4"><input type="radio" id="answer4" name="${inputName}" value="${question.options[3]}">${question.options[3]}</label>
        <br>
        <button type="button" class="submit-btn">Submit ></button>
        </fieldset>
    `)
}


function isCorrect() {
    $('form').on('click','.submit-btn', function(event){

        //after clicked the submit button, the form options can't be selected anymore
        $("input[type=radio]").attr('disabled', true);

        //display button for 'next question'
        //if the current question is the last question, change the display button to be 'see result'
        $('.submit-btn').remove();
        $('.question-form').append(`<button type="button" class="next-btn">Next Question ></button>`);

        if (currentQuestion + 1 === lastQuestion){
            $('.next-btn').text('See Result >')
        }

        //get the input answer value and verify if it's correct
        let inputName = 'question' + currentQuestion;
        let answer = $(`input[name=${inputName}]:checked`).val();
        console.log(answer);

        if (answer == questionsArray[currentQuestion].answer) {
            //correct
            //update currentQuestion
            score++;
            $('.display-result').html(`<div class='display-score'>
            <ul>
            <li>Question: ${currentQuestion + 1}/${lastQuestion}</li>
            <li>Test Score: ${score}/${lastQuestion}</li>
            </ul>
            </div>`);
            console.log('correct');
            $('.answer-alert-container').append(`
              <div class="answer-alert">
              <p class="correct-answer-message">Correct! You got it right.</p>
              </div>`
            )
        } else {
            //display error message
            console.log('wrong');
            $('.answer-alert-container').append(`
              <div class="answer-alert">
              <p class="wrong-answer-message">Uh-oh...Wrong answer. The answer is "${questionsArray[currentQuestion].answer}"</p>
              </div>`
            )
        }
    });
}


function nextQuestion() {
    $('form').on('click','.next-btn', function(event){
        $('.answer-alert').remove();
        currentQuestion++;
        if (currentQuestion === lastQuestion){
            endGame();
        }
        else{
            displayQuestion();
        }        
    });
}


function endGame() {
    let scorePercentage = Math.floor( score / lastQuestion * 100 );
    $('.display-result').hide();
    $('form').hide();
    $('main').append(`
    <section class="big-final-score-container">
        <div class="final-score-container">
        <div class="final-score">
            <div class="score-text">Your Score</div>
            <div class="score-percentage">${scorePercentage}%</div>
        </div>
        <div>
            <p>You answered ${score} of ${lastQuestion} questions correctly.</p>
            <p>If you would like to keep practicing, you can take another practice test.<p>
            <button type="button" class="play-again-btn">Practice again ></button>
        </div>
        <div>
    </section>`
  );
}

function restartQuiz(){
    $('main').on('click' , '.play-again-btn' , function(event){
        $('.big-final-score-container').remove();
        currentQuestion = 0;
        score = 0;
        $('form').show();
        $('.display-result').show();
        displayQuestion();
    })
}


function test(){
    startTest();
    isCorrect();
    nextQuestion();
    restartQuiz();
}

$(test)
