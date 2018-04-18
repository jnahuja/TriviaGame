$(document).ready(function() {

    var currentTriviaQuestion = "";
    var currentCorrectAnswer = "";
    var currentTriviaAnswers = []; // ["", "", "", ""];
    var questionCounter = 0;
    var wins = 0;
    var losses = 0;
    var answerIndex = ["A. ", "B. ", "C. ", "D. "];

    // var triviaQuestions = [{
    //     questionNumber: 0,
    //     question: "",
    //     correctAnswer: "",
    //     incorrectAnswers: ["","",""]
    // }];

    var triviaQuestions = [];


    var main = $("body");
    var btns = main.find("button");

    function initialize() {
        triviaQuestions = [];
        currentTriviaQuestion = "";
        currentTriviaAnswers = []; // ["", "", "", ""];
        questionCounter = 0;
    }


    // "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"

    // Function to make a call to a trivia API and store the results in a Trivia Object for each game
    function ajaxTriviaCall(difficulty) {

        // $(".triviaAnswer").empty();
        // var answerPosition = $(this).attr("data-answer");

        var queryURL = "https://opentdb.com/api.php?amount=5&difficulty="+difficulty+"&type=multiple"
        
        // "https://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
            console.log("In Ajax Call");
            console.log(response);

            for (i=0; i<response.results.length; i++) {
                // triviaQuestions
                var questionObject = {}
                questionObject.questionNumber = difficulty + "_" + i;
                questionObject.question = response.results[i].question;
                questionObject.correctAnswer = response.results[i].correct_answer;
                questionObject.incorrectAnswers = response.results[i].incorrect_answers;
                triviaQuestions.push(questionObject);
                // console.log(questionObject);
            }

            
            // triviaQuestions[0].question = response.results[0].question;;
            // console.log(triviaQuestions);

        //   $("#movie-view").append("<h1>"+response.Title+"</h1>");
        //   $("#movie-view").append("<img src="+response.Poster+" alt='Poster'>");
        //   $("#movie-view").append("<p>"+response.Rated+"</p>");
        //   $("#movie-view").append("<p>"+response.Released+"</p>");
        //   $("#movie-view").append("<p>"+response.Plot+"</p>");
        });
    }

    function buildTriviaQuestions() {
        ajaxTriviaCall("easy");
        ajaxTriviaCall("medium");
        ajaxTriviaCall("hard");
    }
    
    function begin() {

        var answerDiv = $("<div>");
        answerDiv.addClass("row justify-content-center answerButton");
        
        var answerDivLeftTriangle = $("<div>");
        answerDivLeftTriangle.addClass("triangleLeft");

        var answerDivRightTriangle = $("<div>");
        answerDivRightTriangle.addClass("triangleRight");

        var buttonDiv = $("<button>");
        buttonDiv.addClass("triviaAnswer");
        // buttonDiv.attr("data-answer", i);
        buttonDiv.text("Begin");
        
        $("#triviaQuestion").append(answerDiv);
        answerDiv.append(answerDivLeftTriangle);
        answerDiv.append(buttonDiv);
        answerDiv.append(answerDivRightTriangle);
    }

    // Function to display the next trivia question and answers in the div
    function displayTriviaQuestion(answerPosition) {

        // $("#triviaAnswers").empty();
        console.log("In display answers function");
        $("#triviaQuestion").empty();
        $("#triviaQuestion").html(currentTriviaQuestion).text();

        $("#firstAnswerColumn").empty();
        $("#secondAnswerColumn").empty();



        // Looping through the array of questions
        for (var i = 0; i < 4; i++) {

          var answerDiv = $("<div>");
          answerDiv.addClass("row justify-content-center");
          
          var answerDivLeftTriangle = $("<div>");
          answerDivLeftTriangle.addClass("triangleLeft");

          var answerDivRightTriangle = $("<div>");
          answerDivRightTriangle.addClass("triangleRight");

          
          var buttonDiv = $("<button>");
          buttonDiv.addClass("triviaAnswer");
          buttonDiv.addClass("answerButton");
          if (i==answerPosition) {
            buttonDiv.attr("answer-review", "correct");
          }
          else {
            buttonDiv.attr("answer-review", "incorrect");
          }
          //   buttonDiv.attr("data-answer", i);
        //   buttonDiv.attr("answerCorrect", i);
        //   buttonDiv.text(currentTriviaAnswers[i]);
        //   var answerContent = html(currentTriviaAnswers[i]);
        //   buttonDiv.text(answerContent + "ASDFADSF");
          buttonDiv.html("<span class='answerIndex'>"+answerIndex[i]+"</span>"+currentTriviaAnswers[i]).text();
        //   <span style="color:black">A. </span>

          if (i==0 || i==3) {
            $("#firstAnswerColumn").append(answerDiv);
          }
          else {
            $("#secondAnswerColumn").append(answerDiv);
          }
          
          answerDiv.append(answerDivLeftTriangle);
          answerDiv.append(buttonDiv);
          answerDiv.append(answerDivRightTriangle);
        }

//         <div class="row justify-content-center answerButton">
//         <div class="triangleLeft"></div>
//         <button class="triviaAnswer" data-answer="1">Answer 1</button>
//         <div class="triangleRight"></div>
// </div>

    }

    // function decodeString() {
    //     var enc = encodeURIComponent(currentTriviaQuestion);
    //     var dec = decodeURIComponent(enc);
    //     console.log(dec);
    //     currentTriviaQuestion = dec;
    //     console.log("decode string function " + currentTriviaQuestion);
    // }

    function populateCurrentAnswers(questionIndex) {
        currentTriviaQuestion = "";
        currentCorrectAnswer = "";
        currentTriviaAnswers = [];
        currentTriviaQuestion = triviaQuestions[questionIndex].question;
        currentCorrectAnswer = triviaQuestions[questionIndex].correctAnswer;
        // console.log(currentTriviaQuestion);
        // console.log(triviaQuestions);
        var answerPosition = Math.floor(Math.random()*4);
        // console.log(answerPosition);
        var incorrectCounter = 0;
        for (i=0; i<4; i++) {
            // console.log("I iteration " + i);
            if (i==answerPosition) {
                currentTriviaAnswers.push(triviaQuestions[questionIndex].correctAnswer)
            }
            else {
                // console.log(incorrectCounter);
                // console.log(triviaQuestions[0].incorrectAnswers[incorrectCounter]);
                currentTriviaAnswers.push(triviaQuestions[questionIndex].incorrectAnswers[incorrectCounter]);
                incorrectCounter = incorrectCounter + 1;
            }
        }
        console.log(currentTriviaAnswers);
        questionCounter = questionCounter + 1;
        // decodeString();
        displayTriviaQuestion(answerPosition);
    }

    function runNewQuestion() {
        // $("#triviaQuestion").empty();
        // $("#firstAnswerColumn").empty();
        // $("#secondAnswerColumn").empty();
        // $("#triviaQuestion").text("That is Correct!");
        populateCurrentAnswers(questionCounter);
        stopwatch.reset();
        stopwatch.start();

    }

    // displayTriviaQuestion();
    begin();
    buildTriviaQuestions();
    // populateCurrentAnswers();

    var clockRunning = false;
    var stopwatch = {
        time: 30,
        reset: function() {      
          stopwatch.time = 30;
          // DONE: Change the "display" div to "00:00."
          $("#timer").text("30");
        },
        start: function() {
          // DONE: Use setInterval to start the count here and set the clock to running.
          if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
          }
        },
        stop: function() {
      
          // DONE: Use clearInterval to stop the count here and set the clock to not be running.
          clearInterval(intervalId);
          clockRunning = false;
        },
        count: function() {
          // DONE: increment time by 1, remember we cant use "this" here.
          stopwatch.time = stopwatch.time - 1;
          // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
          //       and save the result in a variable.
          var converted = stopwatch.timeConverter(stopwatch.time);
          if (converted == "00") {
            $("#triviaQuestion").empty();
            $("#firstAnswerColumn").empty();
            $("#secondAnswerColumn").empty();
            $("#triviaQuestion").text('Time is up. The correct answer is "' + currentCorrectAnswer + '".');
            stopwatch.stop();
            setTimeout(runNewQuestion,5000);
          }
          console.log(converted);
          // DONE: Use the variable we just created to show the converted time in the "display" div.
          $("#timer").text(converted);
        },
        timeConverter: function(seconds) {
      
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return seconds;
        }
      };

    // $(document).on("click", ".movie", displayMovieInfo);
    $("button").on("click", function() {
        console.log("button click");
        // $("#triviaQuestion").empty();
        // console.log(triviaQuestions);
        populateCurrentAnswers(questionCounter);
        stopwatch.reset();
        // setInterval(stopwatch.count, 1000);
        stopwatch.start();
        
        // displayTriviaQuestion();
        // In this case, the "this" keyword refers to the button that was clicked
        // var person = $(this).attr("data-person");
    });

    $("body").on("click", ".answerButton", function() {
        console.log("button click");
        console.log(this);
        console.log($(this).attr("answer-review"));

        if ($(this).attr("answer-review")=="correct") {
            // alert("correct");
            // displayCorrect();
            $("#triviaQuestion").empty();
            $("#firstAnswerColumn").empty();
            $("#secondAnswerColumn").empty();
            $("#triviaQuestion").text("That is Correct!");
            stopwatch.stop();
            setTimeout(runNewQuestion,3000);
            
            // delayButtonAlert = setTimeout(function() {
            //     alert("Alert #2");
            //   }, 3000);

        }
        else {
            // alert("wrong");
            // alert("wrong");
            $("#triviaQuestion").empty();
            $("#firstAnswerColumn").empty();
            $("#secondAnswerColumn").empty();
            $("#triviaQuestion").text('That is Incorrect. The correct answer is "' + currentCorrectAnswer + '".');
            stopwatch.stop();
            setTimeout(runNewQuestion,3000);
        }



    });

    // $(".triviaAnswer").on("click", function() {
    //     console.log("button click");
    //     // $("#triviaQuestion").empty();
    //     // console.log(triviaQuestions);
    //     populateCurrentAnswers(questionCounter);
    //     // displayTriviaQuestion();
    //     // In this case, the "this" keyword refers to the button that was clicked
    //     // var person = $(this).attr("data-person");
    // });
    


    












































































    // var main = $("body");
    // var charactersDiv = main.find("#characters");
    // var rulesDiv = main.find("#rules");
    // var arenaHeadingDiv = main.find("#arenaHeading");
    // var attackButtonDiv = main.find("#attackButton");

    // var audioElement = document.createElement("audio");
    // audioElement.setAttribute("src", "assets/star-wars-theme.mp3");

    // // Theme Button
    // $("#musicControls").on("click", ".theme-button", function () {
    //     audioElement.play();
    // }).on("click", ".pause-button", function () {
    //     audioElement.pause();
    // });

    // var gameCounters = {
    //     clickCounter: 0 // Can be 0 at the start of the game, switch to 1 when the player's character is chosen, and switch to 2 when the enemy's charater is chosen
    // }


    // var characterObject = {
    //     characterArray: [
    //         {
    //             name: 'Millennium Falcon',
    //             visual: 'assets/images/millennium-falcon.jpg',
    //             healthPoints: 160, 
    //             attackPower: 10,
    //             counterAttackPower: 20,
    //         },
    //         {
    //             name: 'USS Enterprise',
    //             visual: 'assets/images/uss-enterprise.png', 
    //             healthPoints: 130,
    //             attackPower: 15,
    //             counterAttackPower: 30,
    //         },
    //         {
    //             name: 'Serenity',
    //             visual: 'assets/images/serenity.jpg', 
    //             healthPoints: 130,
    //             attackPower: 15,
    //             counterAttackPower: 30,
    //         },
    //         {
    //             name: 'Heart of Gold',
    //             visual: 'assets/images/heart-of-gold.jpg', 
    //             healthPoints: 130,
    //             attackPower: 15,
    //             counterAttackPower: 30,
    //         },
    //         {
    //             name: 'Tardis',
    //             visual: 'assets/images/tardis.jpg', 
    //             healthPoints: 130,
    //             attackPower: 15,
    //             counterAttackPower: 30,
    //         }]
    // }

    // var gameSetup = {
    //     defineRules: function () {
    //         rulesDiv.text("Pick Your Ship!");
    //     },
    //     updateRules: function () {
    //         rulesDiv.text("Pick Your Enemy!");
    //         arenaHeadingDiv.text("Fighting Arena");
    //     },
    //     buildCharacterCards: function () {
    //         for (var i = 0; i < characterObject.characterArray.length; i++) {
    //             // 1. Create a variable named "letterDiv" equal to $("<div>") to hold our new div and div properties
    //             var currentDiv = $("<div>");
    //             // 2. Then give letterDiv the relevant class, attributes, and text content
    //             currentDiv.addClass("newCharacterDiv");
    //             currentDiv.attr("id",("characterIndex"+i));
    //             currentDiv.attr("character-index", (i));
    //             currentDiv.append("<p>"+characterObject.characterArray[i].name+"</p>");
    //             currentDiv.append("<img src="+characterObject.characterArray[i].visual+" width='100' height='100'>")
    //             currentDiv.append("<p id='userHP"+i+"'>HP: "+characterObject.characterArray[i].healthPoints+"</p>");
    //             // letterDiv.attr("data-letter", ("Index" + i)); // this.mainWord[i]
    //             // currentDiv.text("0");
    //             // letterDiv.text(this.mainWord[i]);
    //             // letterDiv.css('color', blue);
    //             // 3. Append our new div to "colorPicker", which will fill up with a new div each time this "for" loop executes
    //             charactersDiv.append(currentDiv);
    //         }
    //     },
    // }

    // gameSetup.buildCharacterCards();
    // gameSetup.defineRules();

    // var gamePlay = {
    //     userHP: 0,
    //     userAttack: 0,
    //     userCounterAttack: 0,
    //     userCharacterIndex: 0,
    //     opponentHP: 0,
    //     opponentAttack: 0,
    //     opponentCounterAttack: 0,
    //     opponentCharacterIndex: 0,

    //     attack: function () {
    //         gamePlay.opponentHP = gamePlay.opponentHP - gamePlay.userAttack;
    //         gamePlay.userHP = gamePlay.userHP - gamePlay.opponentCounterAttack;

    //         var currentDiv = $("#yourFightStatus");
    //         currentDiv.text("You attacked opponent with "+gamePlay.userAttack);
    //         currentDiv = $("#opponentFightStatus");
    //         currentDiv.text("Your opponent attacked you with "+gamePlay.opponentCounterAttack);

    //         gamePlay.userAttack = gamePlay.userAttack + characterObject.characterArray[gamePlay.userCharacterIndex].attackPower;
    //     },

    //     updateHP: function () {
    //         var currentDiv = $("#userHP"+gamePlay.userCharacterIndex);
    //         currentDiv.text("HP: "+gamePlay.userHP);
    //         // alert("Updating User HP");
    //         currentDiv = $("#userHP"+gamePlay.opponentCharacterIndex);
    //         currentDiv.text("HP: "+gamePlay.opponentHP);
    //         // alert("Updating Opponent HP");
    //     }

    //     // initialize: function() {
    //     //     this.userHP = 0,
    //     //     this.userAttack = 0,
    //     //     userCounterAttack = 0,
    //     //     opponentHP = 0,
    //     //     opponentAttack = 0,
    //     //     opponentCounterAttack = 0,
    //     // },
    // }


    // // $("#characters").on("click", stopwatch.recordLap);
    // // btns.on("click", ".letter-button", function() {
    // $("#characters").on("click", ".newCharacterDiv", function() {
    //     // console.log("click worked");
    //     // console.log(this.id);

    //     // MOVE ALL OF THIS CONTENT INTO A CHARACTER SELECTION OBJECT, WHICH COULD BE COMBINED WITH GAMECOUNTERS AND BECOME AN OBJECT FOR SELECTING YOUR CHARACTERS
    //     if (gameCounters.clickCounter == 0) {
    //         for (i=0; i<characterObject.characterArray.length; i++) {
    //             // characterObject.characterArray[i];
    //             var currentDiv = $("#characterIndex"+i);
    //             // currentDiv.removeClass("newCharacterDiv");    
    //             currentDiv.addClass("updatedCharacter");
    //             console.log("for loop");
    //         }
            
    //         var currentDiv = $("#"+this.id);
    //         currentDiv.removeClass("newCharacterDiv");    
    //         currentDiv.addClass("chosenCharacterDiv");
    //         currentDiv.appendTo("#yourCharacter");
    //         gameCounters.clickCounter = 1;
    //         console.log(gameCounters.clickCounter);

    //         // var characterArrayIndex = parseInt(currentDiv.attr("character-index"));
    //         // gamePlay.userHP = characterObject.characterArray[characterArrayIndex].healthPoints;
    //         // gamePlay.userAttack = characterObject.characterArray[characterArrayIndex].attackPower;
    //         // gamePlay.userCounterAttack = characterObject.characterArray[characterArrayIndex].counterAttackPower;
    //         // console.log(gamePlay.userHP);

    //         gamePlay.userCharacterIndex = parseInt(currentDiv.attr("character-index"));
    //         gamePlay.userHP = characterObject.characterArray[gamePlay.userCharacterIndex].healthPoints;
    //         gamePlay.userAttack = characterObject.characterArray[gamePlay.userCharacterIndex].attackPower;
    //         gamePlay.userCounterAttack = characterObject.characterArray[gamePlay.userCharacterIndex].counterAttackPower;
    //         console.log(gamePlay.userHP);


    //         // currentDiv = $("#yourCharacter").find("#userHP");        // This works, but it might be easier to update during the fight if the HP div for your character and the opponent's charachter have unique ids
            
    //         // ACTION - Wrap this in a method for updating the user's HP
    //         currentDiv = $("#userHP"+gamePlay.userCharacterIndex);
    //         currentDiv.text("HP: "+gamePlay.userHP);
    //         // currentDiv.append("<p>HP: "+gamePlay.userHP+"</p>");

    //         gameSetup.updateRules();            
            
    //     }
    //     else if (gameCounters.clickCounter == 1) {
    //         console.log(this.id);
    //         console.log("elseif");
    //         var currentDiv = $("#"+this.id);
    //         currentDiv.removeClass("newCharacterDiv");
    //         currentDiv.removeClass("updatedCharacter");
    //         currentDiv.addClass("opponentCharacterDiv");
    //         currentDiv.appendTo("#opponentCharacter");

    //         gamePlay.opponentCharacterIndex = parseInt(currentDiv.attr("character-index"));
    //         gamePlay.opponentHP = characterObject.characterArray[gamePlay.opponentCharacterIndex].healthPoints;
    //         gamePlay.opponentAttack = characterObject.characterArray[gamePlay.opponentCharacterIndex].attackPower;
    //         gamePlay.opponentCounterAttack = characterObject.characterArray[gamePlay.opponentCharacterIndex].counterAttackPower;

    //         gameCounters.clickCounter = 2;
    //     }
    // });

    // attackButtonDiv.on("click", function() {
    //     if (gameCounters.clickCounter==2) {
    //         // alert("attack");
    //         gamePlay.attack();
    //         gamePlay.updateHP();

    //     }
        
    // });



});