
var question = {
    question_text : "question_text_1",
    question_answers : [],
    question_correct_ans : 3 };

var questions= [question];
var glcurrentQuestion = 1;
var glAnswered = [];
var glNumQuestions = 0;
var glSecsElapsed=0;
var glSecsAllowed=300;
var glinterval;

const glChoices=["A","B","C","D","E","F"];
    
    
    function startQuiz() {
        //console.log("Starting the quiz");
        questions=getQuestionSet();
        //var myjsonobject= JSON.stringify(questions);
        //console.log(questions);
        glNumQuestions=questions.length;
    
    };
    
    function getQuestionSet() {
    // eventually replace this structure with a file.
       var questionArr= [
            {
                question_text:"question_text_1",
                question_answers:["question_ans_1a",
                                    "question_ans_1b",
                                    "question_ans_1c",
                                    "question_ans_1d"],
                question_correct_ans:3
            },
            {
                question_text:"question_text_2",
                question_answers:["question_ans_2a",
                                    "question_ans_2b",
                                    "question_ans_2c",
                                    "question_ans_2d"],
                question_correct_ans:4
            },
            {
                question_text:"question_text_3",
                question_answers:["question_ans_3a",
                                    "question_ans_3b",
                                    "question_ans_3c",
                                    "question_ans_3d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_4",
                question_answers:["question_ans_4a",
                                    "question_ans_4b",
                                    "question_ans_4c",
                                    "question_ans_4d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_5",
                question_answers:["question_ans_5a",
                                    "question_ans_5b",
                                    "question_ans_5c",
                                    "question_ans_5d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_6",
                question_answers:["question_ans_6a",
                                    "question_ans_6b",
                                    "question_ans_6c",
                                    "question_ans_6d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_7",
                question_answers:["question_ans_7a",
                                    "question_ans_7b",
                                    "question_ans_7c",
                                    "question_ans_7d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_8",
                question_answers:["question_ans_8a",
                                    "question_ans_8b",
                                    "question_ans_8c",
                                    "question_ans_8d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_9",
                question_answers:["question_ans_9a",
                                    "question_ans_9b",
                                    "question_ans_9c",
                                    "question_ans_9d"],
                question_correct_ans:1                                      
            },
            {
                question_text:"question_text_10",
                question_answers:["question_ans_10a",
                                    "question_ans_10b",
                                    "question_ans_10c",
                                    "question_ans_10d"],
                question_correct_ans:1                                      
            }
        ];
        return questionArr;
    };

    
    function getQuestion (whichNumber = 1){
        console.log("Getting Question number " + (whichNumber-1));
        var thisquestion=questions[whichNumber-1];
        return thisquestion;
    };
    

    $('#modalId').on('close.bs.modal', event => {
        stopTimerfn();
    });


    function updateModalWithData (one_question) {
        console.log("updateModalWithData is here");
        var correctAns=glChoices[one_question.question_correct_ans-1];
        console.log("Correct Answer:"+ correctAns);
        var qanswerList= $('#answertext');
        var answerArray = one_question.question_answers;
        {/* <li class="list-group-item answertextitem" id="answerA" value="a">answer A text</li>
        <li class="list-group-item answertextitem selected" id="answerB" value="b">answer B text</li>
        <li class="list-group-item answertextitem" id="answerC" value="c">answer C text</li>
        <li class="list-group-item answertextitem" id="answerD" value="d">answer D text</li> */}
    
        qanswerList.empty();

        $('#question_number').prop("innerHTML",glcurrentQuestion);
        $('#question_text').prop("innerHTML", one_question.question_text);

        console.log(answerArray);

        $.each(answerArray,function(index,j=answerArray.length){
            var lielement=$('<li>');
            console.log("Answer index "+ index);

            lielement.attr('class','list-group-item answertextitem');
            lielement.attr('id','answer' + glChoices[index]);
            lielement.text(answerArray[index]);
            console.log("glChoices[index]: "+ glChoices[index] + " glAnswered[glcurrentQuestion]: " + glAnswered[glcurrentQuestion] );

            
            if(glChoices[index] === glAnswered[glcurrentQuestion-1]) {
                lielement.attr('class','list-group-item answertextitem selected');
            };

            qanswerList.append(lielement);

        });
        return correctAns;
    };

    function whichAnswerSelected(event){
        return event.target.id;
    };

    function setupModal(whichQuest=1){
        var one_question=getQuestion(whichQuest);
        
        //check if any of the items were selected.  If so, change the class of that item to selected
        //for non-selected items, remove the selected   


        console.log(one_question.answerlist);
        
        var correctAns=updateModalWithData(one_question);
        //console.log(correctAns);
        return correctAns;
    };

    function isAnswerCorrect(correctans,userans){
        if (correctans===userans) {
            return true;
        } else return false;
    };

    function initTimer(){
        var today=new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("Start time:" + time);
        glSecsElapsed=0;
        return time;
    };
      
    function startTimer(){
        glinterval = setInterval(updateScreenTime,1000);
        return;
    };
      
    function stopTimerfn(secondsLeft){
        clearInterval(glinterval);
        return;
    };
      
    function updateScreenTime(){
        glSecsElapsed++;
        //console.log(glSecsElapsed);
        $('#minutesDisplay').text(getmins(glSecsElapsed));
        $('#secondsDisplay').text(getsecs(glSecsElapsed));
        return;
      };
      
      function getmins(seconds){
        var wholeminsdone=Math.floor(seconds/60);
        //console.log("whole minutes left: "+ wholeminsdone);
        return wholeminsdone;
      };
      
      function getsecs(seconds){
        var secsRemainder=seconds%60;
        //console.log("leftover seconds: "+ secsRemainder);
        return secsRemainder;
      };
      
      
      
      /*3. When the timer is finished, alert the user that it is time to take a break.
      */


      function breakTimeAlert(){
        alert("Your time has elapsed.");
      };
      
      function setStopNow(){
        var glstopnow=true;
        console.log("Setting stopnow to true.");
        return glstopnow;
      };
      


    $('#modalId').on('shown.bs.modal',function(){
        console.log("on modal shown");
        glsecsElapsed=initTimer();
        glcurrentQuestion=1;
        var timeobj=startTimer();
        var secondsLeft=glSecsAllowed - glSecsElapsed;
        setupModal(glcurrentQuestion);
        
        $('#nextbtn').on('click',function (){
            console.log("Pressed next btn");
            
            //if last answer was incorrect subtract time
            //var isanscorrect=checkAnswer();
            //if no answer has been selected then ???

            //check how many questions there are
            if((glcurrentQuestion)>=glNumQuestions){
                alert("No more questions - stopping now!"); 
                stopTimerfn(secondsLeft);
                //get score & save results
                return;
            } else
            {
                glcurrentQuestion++;
                setupModal(glcurrentQuestion);
                return;

            };

        });

        $('#backbtn').on('click',function (){
            console.log("Pressed last btn");
            var secondsLeft=0;
            //if last answer was incorrect subtract time

            //if no answer has been selected then ???

            //check how many questions there are
            if((glcurrentQuestion)===1){
                alert("No more questions"); 
                stopTimerfn(secondsLeft);
                //get score & save results
                return;
            } else
            {
                glcurrentQuestion--;
                setupModal(glcurrentQuestion);
                return;

            };
        });

        $(".answertext").on('click',function (event){
            //console.log("Clicked the answer block");
            var currentAnswerID= whichAnswerSelected(event);
            glAnswered[glcurrentQuestion-1]=currentAnswerID.substr(6,1);
            $('#'+ currentAnswerID).attr('class','list-group-item answertextitem selected');
            
            //console.log(glAnswered);
        });
    });

    $('#startbtn').on('click',function(){
        $('#modalId').modal('show');
        startQuiz();
    });

    