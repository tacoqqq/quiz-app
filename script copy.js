let score = 0;
let questionsArray = [{
    question: 'Name one problem that led to the Civil War.',
    options: ['Sugar', 'Slavery', 'Oil', 'Westward Expansion'],
    answer: 'Slavery'
},
{
    question: 'Blah',
    options: ['a', 'b', 'c', 'd'],
    answer: 'a'
},
{
    question: 'Blahblah',
    options: ['a', 'b', 'c', 'd'],
    answer: 'a'
}]

let currentQuestion = 0;
let lastQuestion = 3;

function startTest() {
    //initializes the page (so maybe does an animation or calls one)
    //jumps to question 1
      $('.start-btn').click(function(event){
      $('.test-form').remove();
      nextQuestion();
    })
}

function nextQuestion() {
    console.log(currentQuestion);
    if (currentQuestion === lastQuestion){
        endGame();
    } else {
        //$.scroll(html).css()
        $('.display-result').html(`<div class='display-score'>
        <ul>
        <li>Question: ${currentQuestion + 1}/${lastQuestion}</li>
        <li>Test Score: ${score}/${lastQuestion}</li>
        </ul>
        </div>`);
        
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
            </fieldset>`
        )
    }
}

/*
function validateQuestion(input) {
    // if no choice selected
    //show error message
    //else 
    isCorrect(input)

}
*/

function buttonListener(){
    let inputName = 'question' + currentQuestion;
    $('.test-form-container').on('click','.submit-btn', function(event){
        isCorrect($(`input[name=${inputName}]:checked`).val());
    });

    $('main').on('click' , '.play-again-btn' , function(event){
        $('.big-final-score-container').remove();
        currentQuestion = 0;
        score = 0;
        $('form').show();
        $('.display-result').show();
        nextQuestion();
    })
}


function isCorrect(answer) {
    console.log('isCorrect');
    //check is the input field actually checked before submit?
    //if not then show error they need to choose
    $('.submit-btn').remove();
    $('.question-form').append(`<button type="button" class="next-btn">Next Question ></button>`);

    if (answer == questionsArray[currentQuestion].answer) {
        //correct
        //update currentQuestion
        score++;
        console.log('correct');
    } else {
        //display error message
        console.log('wrong');
    }

    $('.question-form').on('click','.next-btn', function(event){
        currentQuestion++;
        nextQuestion();
    })
}


function endGame() {
    let scorePercentage = Math.floor( score / lastQuestion * 100 );
    console.log('in endgame');
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


function test (){
    startTest();
    buttonListener();
}

$(test)
