(function() {
  var questions = [{
    question: "What level of competition currently exists for your product or niche?",
    choices: ['Low Competition', 'Medium Competition', 'High Competition'],
    correctAnswer: 0,
    altAnswer: 1 // medium competion
  }, {
    question: "Is your product and niche a trend, fad, stable or growing market?",
    choices: ['Fad', 'Trend', 'Stable Market', 'Growing Market'],
    correctAnswer: 1,
    altAnswer: 3 // Growing Market
  }, {
    question: "Is your product available locally?",
    choices: ['Widely Available Locally', 'Limited Local Availability', 'No Local Availability'],
    correctAnswer: 2,
    altAnswer: 1 // Limited Local Availability
  }, {
    question: "Is your potential taret market capable of purchasing online?",
    choices: ['Yes', "No"],
    correctAnswer: 0,
    altAnswer: 1 // No
  }, {
    question: "What is the potential markup of your product?",
    choices: ['less than 1x markup', '1-2x markup', '3-5x markup', '6-10x or higher markup'],
    correctAnswer: 3,
    altAnswer: 2 // 3-5x markup
  }, {
    question: "What is the potential selling price of your product",
    choices: ['$1-25', '$26-50', '$50-100', '$100-200', '$200+'],
    correctAnswer: 1,
    altAnswer: 4 // 200+
  },
  {
    question: "Is your product a product that someone would want to subscribe and receive on a regular basis?",
    choices:['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },{
    question: "What is the size of your product?",
    choices: ['Small (Wallet)', 'Medium (Soccer ball)', 'Large (computer monitor)', 'Oversized (patio set)'],
    correctAnswer: 0,
    altAnswer: 1 // Medium
  },{
    question: "Is your product durable enough to not be broken during shipping?",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },{
    question: "Does your product have large seasonal swings in purchasing swings in purchasing behavior",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: 1 // No
  },{
    question: "Does your product solve a pain point amongst customers or does it serve a passion",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },{
    question: "How often will you have to redesign your product, swap out or bring in new products?",
    choices: ['Never', 'Yearly', "Multiple Times per year"],
    correctAnswer:0,
    altAnswer: 1 // Yearly
  },{
    question: "Is your product meant to be consumed or disposed of after a certain period of time?",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },{
    question: "Does your product perish, break down or degrade over a short period of time?",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },
  {
    question: "Does your product have restrictions or regulations against them that can aggect importation, sales or shipping?",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  },{
    question: "Can you scale your product and business if demand increased significantly?",
    choices: ['Yes', 'No'],
    correctAnswer:0,
    altAnswer: null // No
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect+2;
      } else if (selections[i] === questions[i].altAnswer){
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
