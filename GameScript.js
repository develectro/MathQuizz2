//developer: https://github.com/develectro

/* Notes: */
/*
 */
//if you want to upload the game to a server consider document.cookies
//from PopUp change booleans : wronAnsBoolean, disableYes, disableNo, timerIsOver
//In gameover-no case, UIchanges.hideInterfaceTextsAndButtons() is used, and then reversed using New Game button
//within the newGameButtonHandler(), this is not a Bug, but a kind of fine UX.
/*
 *
 */

var random1; //num1
var random2; //num2
var random3Grade1;
var random3Grade2;
var trueAns;
var score = 0;

var scoreArray = new Array();
var scoreArrayLength = 5;
var scorePointer = '1';

var ansView; //Array
var ansViewLength = 2;
ansView = new Array();


var gameMode = 'simpleAdd';
var checkAns = false;


var wrongAnswers; //Array
var wrongAnsLength = 4;
wrongAnswers = new Array();

var checkSettingsFrameWidth = false;

//to check game Modes.
var isNormalMode = true;
var isComplex1Game = false;

$(document).ready(function() {

    //Main Game Function
    $.gameFunction = function() {
        //Important: this function is invoked directly some where beneath

        random1 = Math.floor(Math.random() * 10) + 1;
        random2 = Math.floor(Math.random() * 10) + 1;
        // random3 = Math.floor(Math.random() * 20) + 1; //index from 0

        switch (gameMode) {
            case 'simpleAdd':
                //simaple addition:
                trueAns = random1 + random2;
                $("#PlusSign").text("+");
                break;

            case 'simpleSub':
                //simple substraction:
                trueAns = random1 - random2;
                $("#PlusSign").text("-");
                break;

            case 'simpleMul':
                //simple multiplication:
                trueAns = random1 * random2;
                $("#PlusSign").text("x");
                break;

            case 'simpleDiv':

                //simple division:
                trueAns = random1 / random2;
                if (!Number.isInteger(trueAns)) {

                    console.log("Not Integer: " + trueAns);
                    trueAns = trueAns.toFixed(1);
                    console.log("Fixed Integer: " + trueAns);


                    wrongAnswers[0] = parseFloat(trueAns) + 0.5;
                    wrongAnswers[1] = parseFloat(trueAns) + 1;
                    wrongAnswers[2] = parseFloat(trueAns) + 1.5;
                    wrongAnswers[3] = parseFloat(trueAns) + 2;

                    console.log("test wrongAnswer[0]: " + wrongAnswers[0]);
                    console.log("test wrongAnswer[1]: " + wrongAnswers[1]);
                    console.log("test wrongAnswer[2]: " + wrongAnswers[2]);
                    console.log("test wrongAnswer[3]: " + wrongAnswers[3]);


                } else {
                    wrongAnswers[0] = parseFloat(trueAns) + 0.5;
                    wrongAnswers[1] = parseFloat(trueAns) + 1;
                    wrongAnswers[2] = parseFloat(trueAns) + 1.5;
                    wrongAnswers[3] = parseFloat(trueAns) + 2;

                    console.log("test wrongAnswer[0]: " + wrongAnswers[0]);
                    console.log("test wrongAnswer[1]: " + wrongAnswers[1]);
                    console.log("test wrongAnswer[2]: " + wrongAnswers[2]);
                    console.log("test wrongAnswer[3]: " + wrongAnswers[3]);

                }

                $("#PlusSign").text("÷");
                break;

            default:
                trueAns = random1 + random2;
                break;
        }


        //you can avoid using this for loop manually in a more clever way.
        console.log(gameMode + " test");

        switch (gameMode) {
            case 'simpleAdd':
            case 'simpleSub':
            case 'simpleMul':
                for (let i = 0; i < wrongAnsLength; i++) {

                    if (i == 0) {
                        wrongAnswers[i] = trueAns + 1;
                    } else if (i == 1) {
                        wrongAnswers[i] = trueAns + 2;
                    } else if (i == 2) {
                        wrongAnswers[i] = trueAns - 1;
                    } else if (i == 3) {
                        wrongAnswers[i] = trueAns - 2;
                    }
                }
                break;

            default:
                break;
        }


        // for (let i = 0; i < wrongAnsLength; i++) {
        //     console.log("wrongAnsArr: ");
        //     console.log(wrongAnswers[i]);
        // }

        //grade 1 randomized answers:
        random3Grade1 = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        console.log("let's check: " + random3Grade1);

        for (let i = 0; i < ansViewLength; i++) {
            if (i == 0) {
                ansView[i] = trueAns;
            } else if (i == 1) {
                ansView[i] = random3Grade1;
            }
        }
        ////Temp:
        // for (let i = 0; i < ansViewLength; i++) {
        //     console.log("AnsView: ");
        //     console.log(ansView[i]);
        // }

        //grade 2 randomized number for better resolution:
        random3Grade2 = ansView[Math.floor(Math.random() * ansView.length)];

        if (random3Grade2 == trueAns) {
            checkAns = true;
        } else {
            checkAns = false;
        }

        console.log("random1: " + random1);
        console.log("random2: " + random2);
        console.log("true answer" + trueAns);
        console.log("random3Grade2: " + random3Grade2);
        console.log("checkAns: " + checkAns);

        //change dom
        $("#firstNum").text(random1);
        $("#secondNum").text(random2);
        console.log(firstNum);
        $("#sum").text(random3Grade2);


    }

    //Score Handling:
    var GameScoreSystem = {

        setScore: function(scoreItem, scoreItemsValue) {
            this.scoreItem = scoreItem;
            this.scoreItemsValue = scoreItemsValue;
            let item = localStorage.setItem(scoreItem, scoreItemsValue);
            return item;
        },
        getScore: function(scoreItem) {
            this.scoreItem = scoreItem;
            let item = localStorage.getItem(scoreItem);
            return item;
        },

        checkScoreisNaN: function() {
            let scoreXInt = [
                scoreInitialValue.score1Int,
                scoreInitialValue.score2Int,
                scoreInitialValue.score3Int,
                scoreInitialValue.score4Int,
                scoreInitialValue.score5Int,
            ]

            for (let item of scoreXInt) {
                if (isNaN(item)) {
                    console.error("error: score value is NaN");
                    this.setScore("score1", 0);
                    this.setScore("score2", 0);
                    this.setScore("score3", 0);
                    this.setScore("score4", 0);
                    this.setScore("score5", 0);
                } else {}
            }
        }


    }
    console.log("score initial value: " + parseInt(GameScoreSystem.getScore("score1"))); //works !

    //These happy siblings are here to give us initial value for storage.
    var scoreInitialValue = {
        //the commented lines causes scores to reset when page reload don't use them except for reset score.

        //score1: GameScoreSystem.setScore("score1", 0),
        score1Value: GameScoreSystem.getScore("score1"),
        score1Int: parseInt(GameScoreSystem.getScore("score1")),
        //
        // score2: GameScoreSystem.setScore("score2", 0),
        score2Value: GameScoreSystem.getScore("score2"),
        score2Int: parseInt(GameScoreSystem.getScore("score2")),
        //
        // score3: GameScoreSystem.setScore("score3", 0),
        score3Value: GameScoreSystem.getScore("score3"),
        score3Int: parseInt(GameScoreSystem.getScore("score3")),
        //
        //score4: GameScoreSystem.setScore("score4", 0),
        score4Value: GameScoreSystem.getScore("score4"),
        score4Int: parseInt(GameScoreSystem.getScore("score4")),
        //
        // score5: GameScoreSystem.setScore("score5", 0),
        score5Value: GameScoreSystem.getScore("score5"),
        score5Int: parseInt(GameScoreSystem.getScore("score5")),

    }

    var setScoreArray = {
        a: scoreArray[0] = scoreInitialValue.score1Int,
        b: scoreArray[1] = scoreInitialValue.score2Int,
        c: scoreArray[2] = scoreInitialValue.score3Int,
        d: scoreArray[3] = scoreInitialValue.score4Int,
        e: scoreArray[4] = scoreInitialValue.score5Int,
        sort: scoreArray.sort() // scores in ascending order
            //if you like simplification you can set: x:scoreArray[y] = parseInt(localStorage.getItem("someItem"));
    }

    // checkScoreisNaN(): //when the game is run for the first time this function is required.
    //It's necesarry to prevent score from showing NaN values.
    GameScoreSystem.checkScoreisNaN();




    $.scoreFunc = function() {

        //console.log("It's not NaN ", scoreInitialValue.score1Int);


        switch (scorePointer) {

            case '1':
                console.log("case scorePointer " + scorePointer); //fodebgging 
                if (score > scoreInitialValue.score1Int) {

                    GameScoreSystem.setScore("score1", score);
                    scoreInitialValue.score1Int = score; //Now this is the new value that will be tested next time
                    scorePointer = '2';
                    scoreArray[0] = scoreInitialValue.score1Int;
                } else {
                    scoreArray[0] = scoreInitialValue.score1Int;
                    scorePointer = '2';
                }
                break;

            case '2':
                console.log("case scorePointer " + scorePointer); //fodebgging 
                if (score > scoreInitialValue.score2Int) {
                    //set the new highest score using window.localStorage
                    GameScoreSystem.setScore("score2", score);
                    scoreInitialValue.score2Int = score; //Now this is the new value that will be tested next time
                    scorePointer = '3';
                    scoreArray[1] = scoreInitialValue.score2Int;
                } else {
                    scoreArray[1] = scoreInitialValue.score2Int;
                    scorePointer = '3';

                }
                break;

            case '3':
                console.log("case scorePointer " + scorePointer); //fodebgging 


                if (score > scoreInitialValue.score3Int) {
                    //set the new highest score using window.localStorage
                    GameScoreSystem.setScore("score3", score);
                    scoreInitialValue.score3Int = score; //Now this is the new value that will be tested next time

                    scorePointer = '4';
                    scoreArray[2] = scoreInitialValue.score3Int;
                } else {
                    scoreArray[2] = scoreInitialValue.score3Int;
                    scorePointer = '4';
                }
                break;

            case '4':
                console.log("case scorePointer " + scorePointer); //fodebgging 


                if (score > scoreInitialValue.score4Int) {
                    //set the new highest score using window.localStorage
                    GameScoreSystem.setScore("score4", score);
                    scoreInitialValue.score4Int = score; //Now this is the new value that will be tested next time

                    scorePointer = '5';
                    scoreArray[3] = scoreInitialValue.score4Int; //newer high value
                } else {
                    scoreArray[3] = scoreInitialValue.score4Int;; //older high value
                    scorePointer = '5';
                }
                break;

            case '5':
                console.log("case scorePointer " + scorePointer); //fodebgging 

                if (score > scoreInitialValue.score5Int) {
                    //set the new highest score using window.localStorage
                    GameScoreSystem.setScore("score5", score);
                    scoreInitialValue.score5Int //Now this is the new value that will be tested next time
                    scorePointer = '1';
                    scoreArray[4] = scoreInitialValue.score5Int;
                } else {
                    scoreArray[4] = scoreInitialValue.score1Int;
                    scorePointer = '1';
                }
                break;

            default:
                break;
        }

    }

    $.gameOverFunc = function() {

        //the main gameover function, invoked almost in every case causes game to be over i.e. timeout
        $.scoreFunc(); //Records, handling and renders scores
        $("#firstNum").text(0);
        $("#secondNum").text(0);
        $("#sum").text(0);
        $("#scoreText").text(0);
        score = 0;
        //timerIsOver = true; //to terminte timer when player choose wrong answer.
        wronAnsboolean = true;
        //schenge setScoreto0 again here!
        showPopUp();
        soundEffects.glassEffect();
    }
    let gameOverByTimeout = function() {
        if (timerIsOver) {
            console.log("Nope!");
            $.gameOverFunc();
            disableNoButton = true;
            disableYesButton = true;
            timerIsOver = false;
        }
        showPopUp();
    }

    let showPopUp = function() {
        //Invoked inside: $.gameOverFunc() and gameOverByTimeout()
        //GameOver PopUp:
        $("#GameOverPopUp").slideDown();
        //hide some dom texts:
        let domTexts = [
            //this piece of code is iterated in event handlers section, it needs some modifications.
            $("#firstNum"), $("#PlusSign"),
            $("#secondNum"), $("#sum")
        ]
        for (let item of domTexts) {
            item.fadeTo("fast", 0.1);
        }

    }
    let hidePopUp = function() {
        $("#GameOverPopUp").fadeOut();
        //hide some dom texts:
        let domTexts = [
            //this piece of code is iterated in event handlers section, it needs some modifications.
            $("#firstNum"), $("#PlusSign"),
            $("#secondNum"), $("#sum")
        ]
        for (let item of domTexts) {
            item.fadeTo("fast", 1);
        }
    }

    //Timer:
    var timerSpeedSelector = 18;
    var resetTimer = true; // this will be toggled after correct or wrong answer using toggleTimer()

    var timerIsOver = false;
    var wronAnsboolean = false; //OK but how to true it again ? sing pop up
    //it's value changes in: gameOver() and timerFunction()
    //it's used for the pop up game over in addidtion to lose by wrong answer in $.gameOverFunc().

    $.timerFunction = function() {
        var i = 0
        var barWidth = 1;
        //var gameProgressBar = $("#gamesTimer");
        var iterateFill;
        if (i == 0) {
            i = 1;
            iterateFill = setInterval(fill, timerSpeedSelector);


            function fill() {
                //resetTimer for toggling timer progressbar with yes and no, wronAnsBoolean to stop timer when wrong answer choosen
                if ((barWidth >= 100) || resetTimer || wronAnsboolean) {

                    if (barWidth >= 100) {
                        //to set gameover due to time out
                        timerIsOver = true;
                        gameOverByTimeout();
                    }

                    //terminate execution
                    clearInterval(iterateFill);
                    this.i = 0;

                    //get things to the startpoint again:
                    resetTimer = false; // toggleTimer() wants to trick us be we trick it berfor ;) 
                    barWidth = 0;
                    $(".progress").width(barWidth + "%");



                } else {
                    barWidth++;
                    $(".progress").width(barWidth + "%"); //if you didn't add +"%" it will count it as pixels
                }
            }
        }
    }

    function toggleTimer() {

        if (resetTimer == true) {
            resetTimer = false;
        } else if (resetTimer == false) {
            resetTimer = true;
        }
    }
    $.gameFunction(); //On reload page.



    var soundEffects = {
        //jquery has some troubles with play() so keep it Vanilla!
        audio1: document.getElementById("soundEffect1"),
        audio2: document.getElementById("soundEffect2"),
        audio3: document.getElementById("soundEffect3"),
        speakerSwitch: true,

        coinEffect: function() {
            if (this.speakerSwitch) {
                this.audio1.play();
            }

        },

        pauseCoinEffect: function() {

            if (this.speakerSwitch) {
                this.audio1.pause();
                this.audio1.currentTime = 0;
            }

        },
        oneUpEffect: function() {
            if (this.speakerSwitch) {
                this.audio2.play();
            }

        },
        glassEffect: function() {
            if (this.speakerSwitch) {
                //invoked within gameOverFunc()
                this.audio3.play();
            }

        },
        enable_disable_sounds: function() {

        }


    }
    $("#speakerButton").click(function() {
        switch (soundEffects.speakerSwitch) {
            case true:
                console.log("sound is enabled");
                soundEffects.speakerSwitch = false;
                $("#speakerUp").hide();
                $("#speakerDown").show();

                break;
            case false:
                console.log("sound is disabled");
                soundEffects.speakerSwitch = true;
                $("#speakerUp").show();
                $("#speakerDown").hide();
                break;

        }

    });



    //Button Listeners:
    var disableYesButton = false;
    var disableNoButton = false;
    //these booleans are used to disable Yes/No button unless user click new game button OR yes in gameOver popUp.
    $("#yesButton").click(function() {

        $("#newGameButton").off('click');
        //$.gameFunction() is already invoked so these if statements could work.
        if (checkAns && !disableYesButton) {

            switch (isComplex1Game) {
                case true:
                    intermediateGameFunc();
                    $.timerFunction();
                    toggleTimer();
                    $.gameFunction();

                    score += 1;
                    $("#scoreText").text(score);
                    soundEffects.pauseCoinEffect();
                    soundEffects.coinEffect();

                    break;

                default:
                    score += 1;
                    $("#scoreText").text(score);
                    soundEffects.pauseCoinEffect();
                    soundEffects.coinEffect();

                    $.timerFunction();
                    toggleTimer();
                    $.gameFunction();

                    break;
            }

        } else {

            console.log("Nope!");
            $.gameOverFunc();
            disableYesButton = true;
            disableNoButton = true;
        }

    });
    $("#noButton").click(function() {

        $("#newGameButton").off('click');
        if (!checkAns && !disableNoButton) {
            console.log(isComplex1Game + " compoleto");
            switch (isComplex1Game) {
                case true:
                    intermediateGameFunc();

                    $.timerFunction();
                    toggleTimer();
                    $.gameFunction();

                    score += 1;
                    $("#scoreText").text(score);
                    soundEffects.pauseCoinEffect();
                    soundEffects.coinEffect();

                    break;
                default:

                    console.log("Yeah!!");
                    score += 1;
                    $("#scoreText").text(score);

                    soundEffects.pauseCoinEffect();
                    soundEffects.coinEffect();

                    $.timerFunction();
                    toggleTimer();
                    $.gameFunction();

                    break;
            }
        } else {
            console.log("Nope!");
            $.gameOverFunc();
            disableNoButton = true;
            disableYesButton = true;
        }
    });



    //Mode Selector Function
    $.gameModeFunc = function() {

    }

    //Menu Items:    
    displayElements = [
        $("#firstNum"), $("#secondNum"), $("#PlusSign"),
        $("#scoreText"), $("#sum"), $("#yesButton"), $("#noButton")
    ];

    //Settings Menu Stuff
    $("#gameModeSelector").click(function() {
        UIchanges.navBarCollapsing("#gameModeSelector");

        //$("#html").css("height", "160%"); //temporary fix for div background overflow when Gameplay is ON.
        UIchanges.enableOverflow();
        UIchanges.addOverflow();

        let docWidth = $(document).width();
        for (let item of displayElements) {

            item.fadeOut('fast');
            $("#gamePlay").fadeIn('fast');
        }
        //quick work for display beutiness
        if ((docWidth <= 1048) && (docWidth >= 601)) {
            $("#newGameButton").fadeOut("fast");
            console.log($(document).width() + " faded!");

        } else if (docWidth <= 600) {
            $("#newGameButton").fadeOut("fast");
            $("#speakerButton").fadeOut("fast")
        }

    });

    $("#gamePlayButton").click(function() {
        $("#newGameButton").fadeIn("fast"); //in the case it has been hidden.
        $("#speakerButton").fadeIn("fast"); //in the case it has been hidden.


        //$("html").css("height", "100%"); //temporary fix for div background overflow when Gameplay is ON.
        UIchanges.removeOverflow();
        //UIchanges.disableOverflow();

        $("#gamePlay").fadeOut('fast', function() {
            $(this).css("display", "none"); //not necessary
        });

        for (let item of displayElements) {
            item.fadeIn('fast');
        }

    });
    var gameModeString = {
        //only for listeners
        val: 'simpleAdd',
        val2: 'simpleSub',
        val3: 'simpleMul',
        val4: 'simpleDiv'
    };
    class GamePlaySettings {
        constructor() {

            this.updateGameMode = function() {
                return new Promise((resolve) => {
                    resolve((gameMode = this.val));

                }).then(function(result) {
                    $.gameFunction();
                    console.log("it's work!");
                    console.log(gameMode);
                });
            }
            this.updateGameMode2 = function() {
                return new Promise((resolve) => {
                    resolve((gameMode = this.val2));

                }).then(function(result) {
                    $.gameFunction();
                    console.log("it's work!");
                    console.log(gameMode);
                });
            }

            this.updateGameMode3 = function() {
                return new Promise((resolve) => {
                    resolve((gameMode = this.val3));

                }).then(function(result) {
                    $.gameFunction();
                    console.log("it's work!");
                    console.log(gameMode);
                });
            }

            this.updateGameMode4 = function() {
                return new Promise((resolve) => {
                    resolve((gameMode = this.val4));

                }).then(function(result) {
                    $.gameFunction();
                    console.log("it's work!");
                    console.log(gameMode);
                });
            }

            this.getGameMode = async function() {
                await this.updateGameMode();
                $.gameFunction();
                console.log(gameMode); // مبدئيا تعمل بشكل صحيح
            }

        }
    }
    var gameplayInstance = new GamePlaySettings();

    //Simple Game:
    $("#inlineRadio1").change(function() {
        gameplayInstance.updateGameMode.call(gameModeString);
        /*This approach can also be used to have the same functionality but it's not recommended.
        // function updateGameMode() {
        //     return new Promise((resolve) => {
        //         gameMode = 'simpleAdd';
        //     });
        // }
        // async function getGameMode() {
        //     await updateGameMode();
        //     $.gameFunction();
        }
        */
    });
    $("#inlineRadio2").change(function() {
        gameplayInstance.updateGameMode2.call(gameModeString);
        isComplex1Game = false;
    });
    $("#inlineRadio3").change(function() {
        gameplayInstance.updateGameMode3.call(gameModeString);
        isComplex1Game = false;

    });

    $("#inlineRadio4").change(function() {
        gameplayInstance.updateGameMode4.call(gameModeString);
        isComplex1Game = false;
    });


    let i = 1;


    //Intermediate Game:

    var gameMode2;
    var gameMode2Pointer;

    let intermediateGameFunc = function() {
        gameMode2Pointer = Math.floor(Math.random() * 2) + 1;
        console.log("Pointer Is: " + gameMode2Pointer);
        switch (gameMode2) {
            case 'AddAndSub':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleAdd';

                } else {
                    gameMode = 'simpleSub';
                }
                break;


            case 'MultAndDiv':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleMul';
                } else {
                    gameMode = 'simpleDiv';
                }
                break;

            case 'AddAndMult':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleAdd';
                } else {
                    gameMode = 'simpleMul';
                }
                break;

            case 'SubAndDiv':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleSub';
                } else {
                    gameMode = 'simpleDiv';
                }
                break;

            case 'AddAndDiv':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleAdd';
                } else {
                    gameMode = 'simpleDiv';
                }
                break;

            case 'MultAndSub':
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleMult';
                } else {
                    gameMode = 'simpleSub';
                }
                break;

                //for the Complex1 mode option
            case 'Complex1':
                gameMode2Pointer = Math.floor(Math.random() * 4) + 1;
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleAdd';
                } else if (gameMode2Pointer == 2) {
                    gameMode = 'simpleSub';
                } else if (gameMode2Pointer == 3) {
                    gameMode = 'simpleMul';
                } else { //gameMode2pointer == 4
                    gameMode = 'simpleDiv';

                }
                break;
            case 'Complex2':
                gameMode2Pointer = Math.floor(Math.random() * 3) + 1;
                if (gameMode2Pointer == 1) {
                    gameMode = 'simpleAdd';
                } else if (gameMode2Pointer == 2) {
                    gameMode = 'simpleSub';
                } else { //gameMode2Pointer == 3
                    gameMode = 'simpleMul';
                }
                break;

            default:
                break;
        }
    }
    var gameModeString2 = {
        //only for listeners
        val1: 'AddAndSub',
        val2: 'MultAndDiv',
        val3: 'AddAndMult',
        val4: 'SubAndDiv',
        val5: 'AddAndDiv',
        val6: 'MultAndSub',
        val7: 'Complex1',
        val8: 'Complex2'
    }

    class GamePlaySettings2 {
        constructor() {
            this.getIntermediateSetting1 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val1);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();
                });
            }

            this.getIntermediateSetting2 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val2);

                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }

            this.getIntermediateSetting3 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val3);

                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }

            this.getIntermediateSetting4 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val4);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }

            this.getIntermediateSetting5 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val5);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }

            this.getIntermediateSetting6 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val6);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }
            this.getIntermediateSetting7 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val7);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }
            this.getIntermediateSetting8 = function() {

                return new Promise((resolve) => {
                    resolve(gameMode2 = this.val8);
                }).then((result) => {
                    console.log("game mode2: " + gameMode2);
                    intermediateGameFunc();
                    $.gameFunction();

                });
            }
        }
    }

    let gameplayInstance2 = new GamePlaySettings2();
    $("#inlineRadio21").change(function() {
        gameplayInstance2.getIntermediateSetting1.call(gameModeString2);
        isComplex1Game = true;


    });
    $("#inlineRadio22").change(function() {
        gameplayInstance2.getIntermediateSetting2.call(gameModeString2);
        isComplex1Game = true;

    });
    $("#inlineRadio23").change(function() {
        gameplayInstance2.getIntermediateSetting3.call(gameModeString2);
        isComplex1Game = true;

    });
    $("#inlineRadio24").change(function() {
        gameplayInstance2.getIntermediateSetting4.call(gameModeString2);
        isComplex1Game = true;

    });
    $("#inlineRadio25").change(function() {
        gameplayInstance2.getIntermediateSetting5.call(gameModeString2);
        isComplex1Game = true;

    });
    $("#inlineRadio26").change(function() {
        gameplayInstance2.getIntermediateSetting6.call(gameModeString2);
        isComplex1Game = true;

    });
    $("#inlineRadioComplex1").change(function() {
        gameplayInstance2.getIntermediateSetting7.call(gameModeString2);
        isComplex1Game = true;

    });

    $("#inlineRadioComplex2").change(function() {
        gameplayInstance2.getIntermediateSetting8.call(gameModeString2);
        isComplex1Game = true;

    });

    //Timer settings:
    $("#inlineRadioEasy").change(function() {

        timerSpeedSelector = 18;
    });
    $("#inlineRadioHard").change(function() {
        timerSpeedSelector = 10;

    });
    $("#inlineRadioInsane").change(function() {
        timerSpeedSelector = 8;

    });




    //Themes settings:

    //Themes Settings Storage:
    class SettingsCache {
        constructor() {
            this.themesCache = function(selectedTheme) {
                localStorage.setItem("selectedTheme", selectedTheme);
            }

            //setTheme() invoked after color themes section.
            this.setTheme = function() {
                let themeStr = localStorage.getItem("selectedTheme");
                switch (themeStr) {
                    case 'Lime':
                        themesFun.lime();
                        $(".newGameEmoji").css("color", "green"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'Opal':
                        themesFun.opal();
                        $(".newGameEmoji").css("color", "#f7797d"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'DarkMode':
                        themesFun.darkMode();
                        $(".newGameEmoji").css("color", "Blue"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'SummerDays':
                        themesFun.summerDays();
                        $(".newGameEmoji").css("color", "Orange"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'SpringDays':
                        themesFun.springDays();
                        $(".newGameEmoji").css("color", "#78bcd6"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'MilkAndStrawberry':
                        themesFun.milkAndStrawberry();
                        $(".newGameEmoji").css("color", "#f80759"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'OceanCalmness':
                        themesFun.oceanCalmness();
                        $(".newGameEmoji").css("color", "#34aa9e"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    case 'DarkMagenta':
                        themesFun.rubyMine();
                        $(".newGameEmoji").css("color", "#240b36"); //Temporary fix for newGameEmoji color change with language reselection
                        break;
                    default:
                        themesFun.rubyMine();
                        break;
                }
            }
        }
    }
    let settingInstance = new SettingsCache();



    //Themes and UI configurations:
    var textArray = [
        $("#firstNum"),
        $("#secondNum"),
        $("#PlusSign"),
        $("#sum"),
        $("#scoreText"),
        $(".nav-link")
    ]
    var checkTextColorChange = false;
    var UIchanges = {

        navBarCollapsing: function(querySelectorStr) {
            //use this function to set frame kit to the top for smaller screens
            this.querySelectorStr = querySelectorStr;
            return new Promise(function(resolve) {

                resolve($(querySelectorStr).click(function() {}));

            }).then((result) => {
                $("#toggleNavbarButton").addClass('collapsed');
                $("#toggleNavbarButton").attr('aria-expanded', 'false');

                //this is how navbar collapsin actually works by adding and removeing bootsrap4 classes.
                $("#myNavbar").removeClass('show');
                $("#myNavbar").addClass('collapsing');
                $("#myNavbar").removeClass('collapsing');
                $("#myNavbar").addClass('collapse');
                setTimeout(() => { $("#myNavbar").removeAttr('style'); }, 1000);

            });
        },
        textChanged: function() {
            //currently only dark mode changes text's color
            if (true) {
                for (let item of textArray) {
                    item.css("color", "white");
                }
            }
        },
        themeSelected: function() {
            //same to navBarCollapsing() but used only with themes due to slide effects.
            //this function needs to be deprecated in the next release.
            return new Promise(function(resolve) {

                resolve($("#themes").slideUp('fast'));

            }).then((result) => {
                $("#toggleNavbarButton").addClass('collapsed');
                $("#toggleNavbarButton").attr('aria-expanded', 'false');

                //this is how navbar collapsing actually works by adding and removeing bootsrap4 classes.
                $("#myNavbar").removeClass('show');
                $("#myNavbar").addClass('collapsing');
                $("#myNavbar").removeClass('collapsing');
                $("#myNavbar").addClass('collapse');
                setTimeout(() => { $("#myNavbar").removeAttr('style'); }, 1000);

            });
        },
        hideInterfaceComponents: function() {
            // if ($(document).width() <= 549) {you can specify some conditions if you like}
            //consider css media queries
            for (let item of displayElements) {
                item.fadeOut();
            }
            $("#speakerButton").fadeOut();
            $("#newGameButton").fadeOut();

        },
        showInterfaceComponents: function() {
            for (let item of displayElements) {
                item.fadeIn();
            }
            $("#speakerButton").fadeIn();
            $("#newGameButton").fadeIn();
        },
        hideInterfaceTextsAndButtons: function() {
            for (let i = 0; i < textArray.length - 1; i++) {
                //textArray.length-1: because we don't need to hide nav-links
                textArray[i].fadeOut('fast');
            }
            $("#yesButton").slideUp();
            $("#noButton").slideUp();

        },
        showInterfaceTextsAndButtons: function() {
            for (let item of textArray) {
                item.fadeIn();
            }
            $("#yesButton").fadeIn();
            $("#noButton").fadeIn();
        },
        addOverflow: function() {
            $("#html").css("height", "140%");
            //temporary fix for div background overflow when Gameplay is ON.
        },

        removeOverflow: function() {
            $("#html").css("height", "100%");
            //temporary fix for div background overflow when Gameplay is ON.
        },
        disableOverflow: function() {
            $("#html").css("overflow", "hidden");
        },
        enableOverflow: function() {
            $("#html").css("overflow", "auto");
        }


    }

    //Some page overflows programatically handling
    $("#navbarDropdown").click(function() {

        $(".dropdown-menu").toggle('fast', function() {

            if ($(".dropdown-menu").attr('style') == 'display: block;') {
                UIchanges.disableOverflow();

            } else if ($(".dropdown-menu").attr('style') == 'display: none;') {
                UIchanges.enableOverflow();
            }

        });
    });
    $("#toggleNavbarButton").click(function() {
        if ($(this).attr("aria-expanded") == 'true') {
            setTimeout(() => { UIchanges.disableOverflow(); }, 50); //may be it tkaes a while to toggle true/false
        } else if ($(this).attr("aria-expanded") == 'false') {
            setTimeout(() => { UIchanges.enableOverflow(); }, 50); //may be it tkaes a while to toggle true/false
        }
    });


    //Color themes settings:

    $("#colorThemesSelector").click(function() {
        $("#themes").slideDown("fast");
        UIchanges.hideInterfaceComponents();
        UIchanges.navBarCollapsing("#themes")
    });

    var themesFun = {
            lime: function() {
                $("body").css("background", "linear-gradient(to top, #FDFC47,#24FE41 )");
                $(".navbar").css("background", "linear-gradient(to right, #6dd300 ,#00b859)");
                $("#gamesTimer").css("background-color", "#f5ff36");
                $(".fa-volume-up").css("color", "green");
                $(".fa-volume-mute").css("color", "green");
                $(".fa-gamepad").css("color", "green");
                $("#newGameButton").css("color", "green");
                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();
            },
            opal: function() {

                $("body").css("background", "linear-gradient(to bottom,#C6FFDD,#FBD786,#f7a9b6)");
                $(".navbar").css("background", "linear-gradient(to right,#C6FFDD,#FBD786,#f7a9b6)");
                $("#gamesTimer").css("background-color", "#f7797d");
                $(".fa-volume-up").css("color", "#f7797d");
                $(".fa-volume-mute").css("color", "#f7797d");
                $(".fa-gamepad").css("color", "#f7797d");
                $("#newGameButton").css("color", "#f7797d");

                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();
            },
            darkMode: function() {
                $("body").css("background", "black");
                $(".navbar").css("background", "linear-gradient(to right,#470b36,#240b36)");
                $("#gamesTimer").css("background-color", "Blue");
                $(".fa-volume-up").css("color", "Blue");
                $(".fa-volume-mute").css("color", "Blue");
                $(".fa-gamepad").css("color", "Blue");
                $("#newGameButton").css("color", "Blue");
                for (let item of textArray) {
                    item.css("color", "#662f90");
                }
                checkTextColorChange = true; //text color changed.
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();
            },
            summerDays: function() {
                $("body").css("background", "linear-gradient(to top, #fceabb, #f8b500)");
                $(".navbar").css("background", "linear-gradient(to right,#F9D423,#FF4E50)");
                $("#gamesTimer").css("background-color", "#FF2650");
                $(".fa-volume-up").css("color", "orange"); //nice color: #662f90
                $(".fa-volume-mute").css("color", "orange");
                $(".fa-gamepad").css("color", "orange");
                $("#newGameButton").css("color", "orange");

                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();

            },
            springDays: function() {
                $("body").css("background", "linear-gradient(to bottom, #a8ff78, #78ffd6)");
                $(".navbar").css("background", "rgba(255,255,255,0.5)");
                $(".nav-link").css("color", "#78bcd6")
                $("#gamesTimer").css("background-color", "#78bcd6");
                $(".fa-volume-up").css("color", "#78bcd6"); //nice color: #662f90
                $(".fa-volume-mute").css("color", "#78bcd6");
                $(".fa-gamepad").css("color", "#78bcd6");
                $("#newGameButton").css("color", "#78bcd6");
                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();

            },
            milkAndStrawberry: function() {
                $("body").css("background", "linear-gradient(to top,#fbffd7,#e8f0bf,#e8f0bf,#e8f0bf,#f1e5bc,#f5c6b9,#f7a9b6,#f38fb4)");
                // $("body").css({
                //     "background": "url('file:///C:/Users/INSPIRON/Desktop/JQuery/JQuery%20Math%20Game/1x/Asset%201.png')",
                //     "background-repeat": "no-repeat",
                //     "background-position": "center",
                //     "background-attachment": "fixed",
                //     "background-size": "cover"
                // });
                $(".navbar").css("background", "rgba(255,255,255,0.5)");
                $(".nav-link").css("color", "white");
                $("#gamesTimer").css("background-color", "#38ef7d");
                $(".fa-volume-up").css("color", "#f80759"); //nice color: #662f90
                $(".fa-volume-mute").css("color", "#f80759");
                $(".fa-gamepad").css("color", "#f80759");
                $("#newGameButton").css("color", "#f80759");
                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();

            },
            oceanCalmness: function() {
                $("body").css("background", "linear-gradient(to bottom,#34e89e,#0f3443)");
                $(".navbar").css("background", "rgba(255,255,255,0.5)");
                //file:///C:/Users/INSPIRON/Desktop/JQuery/JQuery%20Math%20Game/strawberry-in-milk-156923.jpg
                $(".nav-link").css("color", "white");
                $("#gamesTimer").css("background-color", "#34aa9e");
                $(".fa-volume-up").css("color", "#34aa9e"); //nice color: #662f90
                $(".fa-volume-mute").css("color", "#34aa9e");
                $(".fa-gamepad").css("color", "#34aa9e");
                $("#newGameButton").css("color", "#34aa9e");
                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();

            },
            rubyMine: function() {
                $("body").css("background", "linear-gradient(to top, rgb(99, 26, 32), rgb(233, 24, 69))");
                $(".navbar").css("background", " linear-gradient(to right, #c31432, #240b36)");
                $(".nav-link").css("color", "white");
                $("#gamesTimer").css("background-color", "darkmagenta");
                $(".fa-volume-up").css("color", "#240b36"); //nice color: #662f90
                $(".fa-volume-mute").css("color", "#240b36");
                $(".fa-gamepad").css("color", "#240b36");
                $("#newGameButton").css("color", "#240b36");
                UIchanges.textChanged();
                UIchanges.themeSelected();
                UIchanges.showInterfaceComponents();

            }
        }
        //Lime Theme:
    $("#Lime").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right, #FFFF00 ,#24FE41)");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#Lime").click(function() {
        themesFun.lime();
        settingInstance.themesCache('Lime');
    });

    //Opal theme:
    $("#Opal").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right,#C6FFDD,#FBD786,#f7a9b6)");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#Opal").click(function() {
        themesFun.opal();
        settingInstance.themesCache('Opal');
    });

    //Dark Mode theme:
    $("#DarkMode").mouseenter(function() {
        $(this).css({ "background": "black", "color": "blue" });
        $(this).mouseleave(function() {
            $(this).css({ "background": "none", "color": "#495057" });
        })
    });
    $("#DarkMode").click(function() {
        themesFun.darkMode();
        settingInstance.themesCache('DarkMode');
    });

    //Summer Days theme:
    $("#SummerDays").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right,#fceabb ,#f8b500 )");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#SummerDays").click(function() {
        themesFun.summerDays();
        settingInstance.themesCache('SummerDays');
    });

    //Spring Days theme:
    $("#SpringDays").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right,#a8ff78, #78ffd6)");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#SpringDays").click(function() {
        themesFun.springDays();
        settingInstance.themesCache('SpringDays');
    });

    //Milk $ Strawberry theme
    $("#MilkandStrawberry").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right,#fbffd7,#e8f0bf,#f1e5bc,#f5c6b9,#f7a9b6,#f38fb4)");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#MilkandStrawberry").click(function() {
        themesFun.milkAndStrawberry();
        settingInstance.themesCache('MilkAndStrawberry');
    });

    //Ocean Calmness theme:
    $("#OceanCalmness").mouseenter(function() {
        $(this).css("background", "linear-gradient(to right,#34e89e,#0f3443)");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#OceanCalmness").click(function() {
        themesFun.oceanCalmness();
        settingInstance.themesCache('OceanCalmness');
    });

    //Runy mine theme:
    $("#DarkMagenta").mouseenter(function() {
        $(this).css("background", "linear-gradient(to left,rgb(99, 26, 32), rgb(233, 24, 69))");
        $(this).mouseleave(function() {
            $(this).css("background", "none");
        })
    });
    $("#DarkMagenta").click(function() {
        themesFun.rubyMine();
        settingInstance.themesCache('DarkMagenta');
    });
    settingInstance.setTheme(); //this function set selected themes.



    //About Window:
    $("#about").click(function() {
        $("#aboutDeveloper").fadeIn("fast");
        UIchanges.hideInterfaceComponents(); //defined in themes settings section.
        UIchanges.navBarCollapsing();

    });
    $("#aboutOkButton").click(function() {
        $("#aboutDeveloper").fadeOut('fast');
        UIchanges.showInterfaceComponents();
    });

    //Gameover PopUp:
    $("#yesButton2").click(function() {
        hidePopUp();
        disableYesButton = false;
        disableNoButton = false;
        wronAnsboolean = false;

        resetTimer = true;
        //It's necessary for it to be true because since the last time button clicked toggleTimer() takes it's vaue
        //which is false and convert it to to true, and the timerFunction() is not invoked after that, scince every 
        //execution is terminated, SO: NO OTHER WAY TO RUN TIMER AGAIN UNLESS WE SET THIS TO TRUE so it will be toggled to false by
        //toggleFunction and Now Timer could run again, try to read it's documentation.

        $.gameFunction();
        $("#newGameButton").on('click', newGameButtonHandler);

    });
    $("#noButton2").click(function() {
        hidePopUp();
        UIchanges.hideInterfaceTextsAndButtons();
        $("#newGameButton").on('click', newGameButtonHandler);
    });


    //New Game Button
    let newGameButtonHandler = function() {
        //Unbind for this handler function is applyed only during the game is running, In other words, if 
        //#yesButton or #noButton clicked

        //Your score will not be lost:
        $.scoreFunc();
        $("#scoreText").text(0);
        score = 0;

        disableYesButton = false;
        disableNoButton = false;
        wronAnsboolean = false;
        resetTimer = true;
        $.gameFunction();

        UIchanges.showInterfaceTextsAndButtons();
    }
    $("#newGameButton").on('click', function() {
        newGameButtonHandler();
    });

    //Score Window:
    $("#ScoresSelector").click(function() {

        $("#highScores").fadeIn();
        UIchanges.navBarCollapsing("#ScoresSelector");
        UIchanges.hideInterfaceComponents();
        $("#sc1").text(setScoreArray.sort[0]);
        $("#sc2").text(setScoreArray.sort[1]);
        $("#sc3").text(setScoreArray.sort[2]);
        $("#sc4").text(setScoreArray.sort[3]);
        $("#sc5").text(setScoreArray.sort[4]);

    });
    $("#scoresButton").click(function() {
        $("#highScores").fadeOut();
        UIchanges.showInterfaceComponents();
    });



    //Languages support:

    class LangaugesSupport {
        constructor() {
            this.setLanguage = function(langStrArray, items) {

                for (let i = 0; i < langStrArray.length; i++) {
                    items[i].text(langStrArray[i]);
                    //Right Align المحاذاة لليمين
                    //items[i].css("text-align", "right");
                }
                //reset fontawesome icons:
                let yesEmoji = $("<i class='fas fa-grin-alt ml-2'></i>");
                let noEmoji = $("<i class='fas fa-frown ml-2'></i>");
                let newGameEmoji = $("<span><i class=' ml-2 fas fa-gamepad '></i></span>");
                let yes2Emoji = $("<i class='fas fa-check ml-2'></i>");
                let no2Emoji = $("<i class ='fas fa-times ml-2'></i>");
                $("#yesButton").append(yesEmoji);
                $("#noButton").append(noEmoji);

                $("#newGameButton").append(newGameEmoji);
                settingInstance.setTheme(); //temporary fix for newGameEmoji color changed with language.

                $("#yesButton2").append(yes2Emoji);
                $("#noButton2").append(no2Emoji);
            }
            this.items = [
                //Main navBar and options menu
                $("#navbarDropdown"), $("#gameModeSelector"), $("#ScoresSelector"),
                $("#colorThemesSelector"), $("#about"),

                //Gamplay frame
                $("#GamePlayStr"), $("#GamePlayParagraph"), $("#mode"),
                //Gameplay simple
                $("#simple"), $("#inlineRadio1Text"), $("#inlineRadio2Text"),
                $("#inlineRadio3Text"), $("#inlineRadio4Text"),
                //Gameplay Intermediate
                $("#intermediate"), $("#inlineRadio21Text"), $("#inlineRadio22Text"), $("#inlineRadio23Text"),
                $("#inlineRadio24Text"), $("#inlineRadio25Text"), $("#inlineRadio26Text"),
                //Gameplay Complex
                $("#complex"), $("#inlineRadioComplex1Text"), $("#inlineRadioComplex2Text"),
                //Gameplay difficultu
                $("#difficultyText"), $("#gameSpeedText"), $("#inlineRadioEasyText"), $("#inlineRadioHardText"),
                $("#inlineRadioInsaneText"), $("#gamePlayButton"),
                //Gameplay Language
                $("#langText"),

                //Themes
                $("#themesTitle"), $("#Lime"), $("#Opal"), $("#DarkMagenta"), $("#SpringDays"), $("#SummerDays"),
                $("#MilkandStrawberry"), $("#DarkMode"), $("#OceanCalmness"), $("#highScoreTitle"),

                //Scores
                $("#scoresButton"),

                //About Button
                $("#aboutOkButton"),
                //Gameover frame
                $("#gameoverTitle"), $("#gameoverParagraph"), $("#yesButton2"), $("#noButton2"),

                //Yes and No!
                $("#yesButton"), $("#noButton"),

                //New Game Button
                $("#newGameButton")

            ]
            this.arabicLang = [
                //main navBar and options menu
                "خيارات", "نمط اللعب", "النقاط", "نمط الألوان", "حول التطبيق",

                //GamePlay frame
                "نمط اللعب", "بإمكانك اختيار نمط اللعب و مستوى الصعوبة من خلال هذه القائمة", "النمط",

                //easy
                "سهل", "جمع", "طرح", "ضرب", "قسمة",

                //intermediate
                "متوسط", "جمع و طرح", "ضرب و قسمة", "جمع و ضرب", "طرح و قسمة", "جمع و قسمة", "ضرب و طرح",

                //complex
                "متقدم", "كل العمليات", "كل العمليات عدا القسمة",

                //difficulity and ok button
                "مستوى الصعوبة", "سرعة اللعب", "سهل", "صعب", "صعب جدا", "موافق",
                //Gameplay Language
                "اللغة",

                //Themes
                "السمات", "ليمون", "حجر الأوبال", "الياقوت الخافت", "فصل الربيع", "ايام الصيف", "حليب الفراولة", "النمط الداكن", "هدوء المحيط",

                //Scores
                "أعلى النقاط", "موافق",

                //About ok button
                "موافق",

                //Gamrover frame
                "!انتهت اللعبة", "هل ترغب في اللعب من جديد ؟", "نعم", "لا",

                //Yes and No !
                "نعم", "لا",

                //New Game
                "لعبة جديدة"
            ]

            this.englishLang = function(items) {
                //to store default language variables in the case that language changed 
                //currently default is english
                let tempStrArray = new Array(); //takes innerHTML
                for (let i = 0; i < items.length; i++) {
                    tempStrArray[i] = items[i].text();
                }
                let en = localStorage.setItem("en", JSON.stringify(tempStrArray));

                return en;
            }
            this.setSelectedLangCache = function(langCache) {
                //must be invoke whenever languge changed.
                localStorage.setItem('languageCache', langCache);
            }
            this.getLangCache = function() {

                let tempArr = JSON.parse(localStorage.getItem("en")); //must be defined here outside default:break;
                let langCache = localStorage.getItem('languageCache'); //by default Null
                //console.log(langCache);

                switch (langCache) {
                    case 'العربية':
                        this.setLanguage(this.arabicLang, this.items); //Causes issue
                        break;
                    case 'English':
                        this.setLanguage(tempArr, this.items);
                        break;
                    default:
                        //console.log(tempArr);
                        this.setLanguage(tempArr, this.items);
                        break;
                }
                return langCache;
            }
            this.checkAndSetLanguage = function() {
                //this function is important when ther is no language data stroed to prevent issues.
                if (this.getLangCache() == null) {
                    console.error("Language is not selected yet.");
                } else { this.getLangCache(); }
            }
        }
    }


    let lang = new LangaugesSupport();
    //these two statments must be in this order otherwise, you cant change languge back.

    (function() { lang.englishLang(lang.items); }());
    lang.checkAndSetLanguage(); //language changes works safely!

    $("#langSelector").on('change', function() {

        if ($("select option:selected").text() == "العربية") {
            //console.log(lang.arabicLang);
            lang.setLanguage(lang.arabicLang, lang.items);

            //save settings for selected languge 
            lang.setSelectedLangCache("العربية");

        } else if ($("select option:selected").text() == "English") {

            let englishLangStringsArr = JSON.parse(localStorage.getItem("en"));
            lang.setLanguage(englishLangStringsArr, lang.items);

            //save settings for selected languge 
            lang.setSelectedLangCache("English");

        }
        //add another statments if you have other languages settings.
    });


});




//Documnetation:
//var GameCookies = {
//     setGameCookies: function(cookieName, cookieValue, cookieExpiration) {

//         let date = new Date();
//         date.setTime(date.getTime() + (cookieExpiration * 24 * 60 * 60 * 1000)); //1000 ms to sec.
//         let expires = "expires=" + date.toUTCString();
//         document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
//     },
//     getGameCookies: function(cookieName) {

//         let name = cookieName + "=";
//         let co = document.cookie.split(';');
//         for (let i = 0; i < co.length; i++) {
//             var c = co[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 console.log("Score cookies: " + c.substring(name.length, c.length));
//                 for (let i = 0; i < scoreArrayLength; i++) {

//                 }
//                 return c.substring(name.length, c.length);

//             }
//         }
//         return "";

//     },
//     getGameCookies: function(cookieName) {

//         let name = cookieName + "=";
//         let co = document.cookie.split(';');
//         for (let i = 0; i < co.length; i++) {
//             var c = co[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 console.log("Score cookies: " + c.substring(name.length, c.length));
//                 for (let i = 0; i < scoreArrayLength; i++) {

//                 }
//                 return c.substring(name.length, c.length);

//             }
//         }
//         return "";

//     }

// }


//  //here score is set using cookies inside $.gameOver();
//  GameCookies.setGameCookies("score", score + "", 365); //key , value , ex date
//  GameCookies.getGameCookies("score"); //score: cookieInteger