$(document).ready(function() {

    var main = $("body");
    var charactersDiv = main.find("#characters");
    var rulesDiv = main.find("#rules");
    var arenaHeadingDiv = main.find("#arenaHeading");
    var attackButtonDiv = main.find("#attackButton");

    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/star-wars-theme.mp3");

    // Theme Button
    $("#musicControls").on("click", ".theme-button", function () {
        audioElement.play();
    }).on("click", ".pause-button", function () {
        audioElement.pause();
    });

    var gameCounters = {
        clickCounter: 0 // Can be 0 at the start of the game, switch to 1 when the player's character is chosen, and switch to 2 when the enemy's charater is chosen
    }


    var characterObject = {
        characterArray: [
            {
                name: 'Millennium Falcon',
                visual: 'assets/images/millennium-falcon.jpg',
                healthPoints: 160, 
                attackPower: 10,
                counterAttackPower: 20,
            },
            {
                name: 'USS Enterprise',
                visual: 'assets/images/uss-enterprise.png', 
                healthPoints: 130,
                attackPower: 15,
                counterAttackPower: 30,
            },
            {
                name: 'Serenity',
                visual: 'assets/images/serenity.jpg', 
                healthPoints: 130,
                attackPower: 15,
                counterAttackPower: 30,
            },
            {
                name: 'Heart of Gold',
                visual: 'assets/images/heart-of-gold.jpg', 
                healthPoints: 130,
                attackPower: 15,
                counterAttackPower: 30,
            },
            {
                name: 'Tardis',
                visual: 'assets/images/tardis.jpg', 
                healthPoints: 130,
                attackPower: 15,
                counterAttackPower: 30,
            }]
    }

    var gameSetup = {
        defineRules: function () {
            rulesDiv.text("Pick Your Ship!");
        },
        updateRules: function () {
            rulesDiv.text("Pick Your Enemy!");
            arenaHeadingDiv.text("Fighting Arena");
        },
        buildCharacterCards: function () {
            for (var i = 0; i < characterObject.characterArray.length; i++) {
                // 1. Create a variable named "letterDiv" equal to $("<div>") to hold our new div and div properties
                var currentDiv = $("<div>");
                // 2. Then give letterDiv the relevant class, attributes, and text content
                currentDiv.addClass("newCharacterDiv");
                currentDiv.attr("id",("characterIndex"+i));
                currentDiv.attr("character-index", (i));
                currentDiv.append("<p>"+characterObject.characterArray[i].name+"</p>");
                currentDiv.append("<img src="+characterObject.characterArray[i].visual+" width='100' height='100'>")
                currentDiv.append("<p id='userHP"+i+"'>HP: "+characterObject.characterArray[i].healthPoints+"</p>");
                // letterDiv.attr("data-letter", ("Index" + i)); // this.mainWord[i]
                // currentDiv.text("0");
                // letterDiv.text(this.mainWord[i]);
                // letterDiv.css('color', blue);
                // 3. Append our new div to "colorPicker", which will fill up with a new div each time this "for" loop executes
                charactersDiv.append(currentDiv);
            }
        },
    }

    gameSetup.buildCharacterCards();
    gameSetup.defineRules();

    var gamePlay = {
        userHP: 0,
        userAttack: 0,
        userCounterAttack: 0,
        userCharacterIndex: 0,
        opponentHP: 0,
        opponentAttack: 0,
        opponentCounterAttack: 0,
        opponentCharacterIndex: 0,

        attack: function () {
            gamePlay.opponentHP = gamePlay.opponentHP - gamePlay.userAttack;
            gamePlay.userHP = gamePlay.userHP - gamePlay.opponentCounterAttack;

            var currentDiv = $("#yourFightStatus");
            currentDiv.text("You attacked opponent with "+gamePlay.userAttack);
            currentDiv = $("#opponentFightStatus");
            currentDiv.text("Your opponent attacked you with "+gamePlay.opponentCounterAttack);

            gamePlay.userAttack = gamePlay.userAttack + characterObject.characterArray[gamePlay.userCharacterIndex].attackPower;
        },

        updateHP: function () {
            var currentDiv = $("#userHP"+gamePlay.userCharacterIndex);
            currentDiv.text("HP: "+gamePlay.userHP);
            // alert("Updating User HP");
            currentDiv = $("#userHP"+gamePlay.opponentCharacterIndex);
            currentDiv.text("HP: "+gamePlay.opponentHP);
            // alert("Updating Opponent HP");
        }

        // initialize: function() {
        //     this.userHP = 0,
        //     this.userAttack = 0,
        //     userCounterAttack = 0,
        //     opponentHP = 0,
        //     opponentAttack = 0,
        //     opponentCounterAttack = 0,
        // },
    }


    // $("#characters").on("click", stopwatch.recordLap);
    // btns.on("click", ".letter-button", function() {
    $("#characters").on("click", ".newCharacterDiv", function() {
        // console.log("click worked");
        // console.log(this.id);

        // MOVE ALL OF THIS CONTENT INTO A CHARACTER SELECTION OBJECT, WHICH COULD BE COMBINED WITH GAMECOUNTERS AND BECOME AN OBJECT FOR SELECTING YOUR CHARACTERS
        if (gameCounters.clickCounter == 0) {
            for (i=0; i<characterObject.characterArray.length; i++) {
                // characterObject.characterArray[i];
                var currentDiv = $("#characterIndex"+i);
                // currentDiv.removeClass("newCharacterDiv");    
                currentDiv.addClass("updatedCharacter");
                console.log("for loop");
            }
            
            var currentDiv = $("#"+this.id);
            currentDiv.removeClass("newCharacterDiv");    
            currentDiv.addClass("chosenCharacterDiv");
            currentDiv.appendTo("#yourCharacter");
            gameCounters.clickCounter = 1;
            console.log(gameCounters.clickCounter);

            // var characterArrayIndex = parseInt(currentDiv.attr("character-index"));
            // gamePlay.userHP = characterObject.characterArray[characterArrayIndex].healthPoints;
            // gamePlay.userAttack = characterObject.characterArray[characterArrayIndex].attackPower;
            // gamePlay.userCounterAttack = characterObject.characterArray[characterArrayIndex].counterAttackPower;
            // console.log(gamePlay.userHP);

            gamePlay.userCharacterIndex = parseInt(currentDiv.attr("character-index"));
            gamePlay.userHP = characterObject.characterArray[gamePlay.userCharacterIndex].healthPoints;
            gamePlay.userAttack = characterObject.characterArray[gamePlay.userCharacterIndex].attackPower;
            gamePlay.userCounterAttack = characterObject.characterArray[gamePlay.userCharacterIndex].counterAttackPower;
            console.log(gamePlay.userHP);


            // currentDiv = $("#yourCharacter").find("#userHP");        // This works, but it might be easier to update during the fight if the HP div for your character and the opponent's charachter have unique ids
            
            // ACTION - Wrap this in a method for updating the user's HP
            currentDiv = $("#userHP"+gamePlay.userCharacterIndex);
            currentDiv.text("HP: "+gamePlay.userHP);
            // currentDiv.append("<p>HP: "+gamePlay.userHP+"</p>");

            gameSetup.updateRules();            
            
        }
        else if (gameCounters.clickCounter == 1) {
            console.log(this.id);
            console.log("elseif");
            var currentDiv = $("#"+this.id);
            currentDiv.removeClass("newCharacterDiv");
            currentDiv.removeClass("updatedCharacter");
            currentDiv.addClass("opponentCharacterDiv");
            currentDiv.appendTo("#opponentCharacter");

            gamePlay.opponentCharacterIndex = parseInt(currentDiv.attr("character-index"));
            gamePlay.opponentHP = characterObject.characterArray[gamePlay.opponentCharacterIndex].healthPoints;
            gamePlay.opponentAttack = characterObject.characterArray[gamePlay.opponentCharacterIndex].attackPower;
            gamePlay.opponentCounterAttack = characterObject.characterArray[gamePlay.opponentCharacterIndex].counterAttackPower;

            gameCounters.clickCounter = 2;
        }
    });

    attackButtonDiv.on("click", function() {
        if (gameCounters.clickCounter==2) {
            // alert("attack");
            gamePlay.attack();
            gamePlay.updateHP();

        }
        
    });



});