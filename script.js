const glChoices=["A","B","C","D","E","F"];
const timeAllowed=120;

var question = {
    question_text : "question_text_1",
    question_answers : [],
    question_correct_ans : 3 };

var questions= [question];
var glcurrentQtnArrayPos = 1;
//var glAnswered = [];
var glNumQuestions = 0;
var glSecsElapsed=0;
var glSecsAllowed=timeAllowed;
var glinterval;
var glScore=0;
var glcorrectAnswers=[];


    
function resetGlobalsToDefaults(){
    glcurrentQtnArrayPos = 0;
    glNumQuestions = 0;
    glSecsElapsed=0;
    glSecsAllowed=timeAllowed;
    glScore=0;
    glcorrectAnswers=[];
    $('#scoreresults').attr('class','row scoreresults scoreclass scoreclass_hidden');
    $('#scoredata').attr('class','col-md-4 scoreclass scoreclass_hidden d-flex align-items-start flex-column');
                
    return true;
};

function getCorrectAnswers(questions){
    var answers=[];
    $.each(questions,function(index){
        var ans=questions[index].question_correct_ans;
        answers[index] = glChoices[ans-1];
        //console.log(answers[index]);
    });
    //console.log(answers);
    return answers;
};

function startQuiz() {
    resetGlobalsToDefaults();

    var questionset=getQuestionSet();
    questions=questionset;
    
    //glcurrentQtnArrayPos=0;
    //console.log(questionset);
    glNumQuestions=questionset.length;

    //Array Not really required but makes life easier
    glcorrectAnswers=getCorrectAnswers(questionset);

    //console.log(glcorrectAnswers);
    return true;
};


function getQuestion (whichArrayPos= 0){
    var whichNumber=whichArrayPos+1;
   // console.log("Getting Question number " + (whichNumber));
    //console.log(questions);
    var thisquestion=questions[whichArrayPos];
   // console.log(thisquestion);
    return thisquestion;
};


$('#modalId').on('close.bs.modal', event => {
    var secondsLeft = glSecsAllowed-glSecsElapsed;
    stopTimerfn(secondsLeft);
});




function whichAnswerSelected(event){
    return event.target.id;
};

function renderModal(whichArrayPos=0){
    var one_question=getQuestion(whichArrayPos);
    //console.log(one_question);

    function updateModalWithData (one_question) {
        //console.log("updateModalWithData is here - rendering one question to the screen. Question" + glcurrentQtnArrayPos);
        var correctAns=glcorrectAnswers[glcurrentQtnArrayPos];
        //console.log("Correct Answer:"+ correctAns);
        var qanswerList= $('#answertext');
        var answerArray = one_question.question_answers;
    
        // clear the screen of the last set of questions
        qanswerList.empty();
    
        // Render the new questions
  
        var qtnnumbershown=glcurrentQtnArrayPos+1;
        $('#question_number').prop("innerHTML",qtnnumbershown);
        $('#question_text').prop("innerHTML", one_question.question_text);
    
        //updateScreenScore(glScore);
    
        //console.log(answerArray);
    
        // Create a new list item and set it up with the appropriate classes and contents
        $.each(answerArray,function(index,j=answerArray.length){
            var lielement=$('<li>');
            //console.log("Answer index: "+ index);
    
            lielement.attr('class','list-group-item answertextitem');
            lielement.attr('id','answer' + glChoices[index]);
            lielement.text(answerArray[index]);
    
            // If the user has previously selected an answer then add this class to change its colors
            // Not used initially - only helpful when back is enabled.
           /*  if(glChoices[index] === glAnswered[glcurrentQtnArrayPos-1]) {
                lielement.attr('class','list-group-item answertextitem selected');
            }; */
    
            qanswerList.append(lielement);
    
        });
        return correctAns;
    };
            
    var correctAns=updateModalWithData(one_question);
    //console.log("Render modal fn, correctAns returned: "+ correctAns);
    return correctAns;
};

function isAnswerCorrect(correctans,userans){
    //console.log("isAnswerCorrect fn.  CorrectAns: " + correctans + " UserAns: " + userans);
    if (correctans===userans) {
        return true;
    } else {
        return false;
    };
};

function initTimer(){
    glSecsElapsed=0;
    return true;
};

function updateFinalScore(score){
    $('#finalscore').text(score);
    return true;
};

function updateFinalTime(secsLeft){
    $('#finaltime').text(secsLeft);
    return true;
};

function updateResults(){
    //console.log("updating results to main screen");
    var secsLeft=glSecsAllowed - glSecsElapsed;
    $('#scoreresults').attr('class','row scoreresults scoreclass scoreclass_visible');
    $('#scoredata').attr('class','col-md-4 scoreclass scoreclass_visible d-flex align-items-start flex-column');


    updateFinalScore(glScore);
    updateFinalTime(secsLeft);
    var newInitials=getInitials();
    var newResultsList=amendResultsList(newInitials,glScore);
    //console.log("newResultsListToStore:" + newResultsList);
    saveListToLocalStorage(newResultsList,"QuizResults");
    return true;
};

function getInitials(){
    var initials= prompt('Enter your initials so your results can be saved.');
    //console.log(initials);
    return initials;
};

function getListFromLocalStorage(listname=""){
    var localStorageValue=localStorage.getItem(listname);
    //console.log("Local Storage Value Retrieved: " + localStorage);
    if(localStorageValue!=undefined){
        var resultslistArray=JSON.parse(localStorageValue);
        //console.log(resultslistArray);
        return resultslistArray;
    } else return;
};

function saveListToLocalStorage(sortedArray,listname="QuizResults"){
    //console.log("Sorted array to save: " + sortedArray);
    if(sortedArray===null || sortedArray=== undefined || sortedArray.length===0){
        //Do nothing
    } else {
        localStorage.setItem(listname,JSON.stringify(sortedArray));
    };
    return true;
};

function amendResultsList(newInitials="",newScore=0){
    var lsresultsArr=getListFromLocalStorage("QuizResults");
    //console.log("Results from LocalStorage: " + lsresultsArr);
    //console.log(lsresultsArr);
    if (lsresultsArr == undefined || lsresultsArr == null) {
        var resultsArr=[{initials:newInitials,score:newScore}];
        return resultsArr;
    } else {
        //console.log("Local storage not empty - valid data");
        lsresultsArr.push({initials:newInitials,score:newScore});
        //console.log(lsresultsArr);
        lsresultsArr=sortArray(lsresultsArr);
        //console.log(lsresultsArr);

        // Keep only top 10 results
        lsresultsArr=lsresultsArr.slice(0,9);
        return lsresultsArr;
    };
};

/* function getOrderedList(){
    var resultsArray=getListFromLocalStorage("QuizResults");
    resultsArray=sortArray(resultsArray);
    return resultsArray;
};
 */
function sortArray(resultsArray){
    if(resultsArray!=null){
        var sortedArray=resultsArray.sort(function(a,b){
            // TODO: This does not work 
            var diff=a.score-b.score;
            return diff;
        });
        //console.log("SortedArray: " );
        sortedArray=sortedArray.reverse();
        //console.log(sortedArray);
        return sortedArray;
    } else {
        //console.log("Array empty");
        return;
    };
};

function clearOldValues(){
    var updatedScore=false;
    var updatedTime=false;
    var globalsSet=true;
    globalsSet=startQuiz();
    updatedScore=updateScreenScore(0);
    updatedTime=updateScreenTime(0);

    //this is here to slow the script down until values are updated
    if (updatedScore=== true && updatedTime === true && globalsSet){
        return true;
    } else return false;
};

function initValues(){
    var valuesCleared=false;
    var init=0;
    
    initTimer();
    /* while (!valuesCleared && init<1000) {
        valuesCleared=clearOldValues();
        init++;
    }; */
};




function startTimer(){
    glinterval = setInterval(updateScreenTime,1000);
};
    
function stopTimerfn(secondsToGo=0){

    
    clearInterval(glinterval);
    if(secondsToGo>0){
        quizCompleteAlert();
    } else {
        timesUpAlert();
        
    };
    
    $('#modalId').modal('hide');
    updateResults();
    
};
    
function timesUpAlert(){
    alert("Your time has elapsed.");
};

function quizCompleteAlert(){
    alert("Quiz complete.");
};

function updateScreenTime(penalty=1){
    function getWholeMins(totalseconds){
        var wholeminsdone=Math.floor(totalseconds/60);
        //console.log("whole minutes left: "+ wholeminsdone);
        return wholeminsdone;
        };
            
    function getRemSecs(totalseconds){
        var secsRemainder=totalseconds%60;
        //console.log("leftover seconds: "+ secsRemainder);
        return secsRemainder;
        };

    glSecsElapsed=glSecsElapsed+penalty;

    var secondsLeft=glSecsAllowed - glSecsElapsed;
    //console.log(secondsLeft);
    var minutes=getWholeMins(secondsLeft);
    $("#minutesDisplay").html(( minutes < 10 ? "0" : "" ) + minutes);
    
    var seconds=getRemSecs(secondsLeft);
    
    $("#secondsDisplay").html(( seconds < 10 ? "0" : "" ) + seconds);
    
    if (secondsLeft>0){
        return secondsLeft;
    } else {
        stopTimerfn(secondsLeft);
        return 0;
    };
};
    
function updateScreenScore(score){
    $('#totalscore').text(score);
    return true;
}

$('#modalId').on('shown.bs.modal',function(){
    //console.log("Modal being shown");
    
    initValues();
    startTimer();
    var qtnshown=glcurrentQtnArrayPos+1;
    //console.log("current question number: " + qtnshown);
    renderModal(0);
    
});

function getCorrectAnswer(whichArrayPos=0){

    var correctAnswer= glcorrectAnswers[whichArrayPos];
    //console.log("current question " + glcurrentQtnArrayPos);
    //console.log("Correct Answer = " + correctAnswer);
    return correctAnswer;
};

function loadScoresModal(){
    $('#modalScores').modal('show');
};

$('#modalScores').on('shown.bs.modal',function(){
    //console.log("modal has opened");
    var resultsArray=getListFromLocalStorage("QuizResults");
    var scorelist=$('#resultscores');
    $.each(resultsArray,function(next){
        //console.log(next);
        var newscorelist=$('<li>');
        newscorelist.attr('class','list-group-item scorelistitem');
        newscorelist.text(resultsArray[next].score + ' - ' + resultsArray[next].initials);
        scorelist.append(newscorelist);
    })
});


$("#getScores").on('click',function(){
    loadScoresModal();
})

$(".answertext").on('click',function (event){
    //console.log("Clicked the answer block");
    $('#'+ currentAnswerID).attr('class','list-group-item answertextitem selected');
    var currentAnswerID= whichAnswerSelected(event);
    var userAnswer=currentAnswerID.substr(6,1);
    var correctAnswer=getCorrectAnswer(glcurrentQtnArrayPos);
    var isCorrect= isAnswerCorrect(correctAnswer,userAnswer);
    var qtnshown=glcurrentQtnArrayPos+1;
    //console.log("Is answer to Q" + qtnshown + " correct? " + isCorrect);
    
    if(isCorrect){
        ++glScore;
        //console.log("newscore: " + glScore);
        updateScreenScore(glScore);
    } else {
        updateScreenTime(10);
    };

    var secondsLeft=glSecsAllowed-glSecsElapsed; 
    if((glcurrentQtnArrayPos>=glNumQuestions-1) || secondsLeft<0){
        //console.log("stopping now!");
        stopTimerfn(secondsLeft);
    } else 
    {
        //The first time this runs, the global variable glcurrentQtnArrayPos is updated properly.
        // The second time this runs, the global variable is incremented by 2
        // The third time this runs, the global variable is incremented by 3...

        //console.log("Current question: " + qtnshown);
        ++glcurrentQtnArrayPos;
        var nextqtn=glcurrentQtnArrayPos+1;
        //console.log("New question number: " + nextqtn);
        renderModal(glcurrentQtnArrayPos);
    };
});


$('#startbtn').on('click',function(){
    $('#modalId').modal('show');
    startQuiz();
});

$('#modalId').on('closed.bs.modal',function(){
    //never runs
    alert('Your score was '+ glScore);
});
