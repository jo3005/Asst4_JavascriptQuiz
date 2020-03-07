function getQuestionSet() {
    // eventually replace this structure with a file.
        const questionArr= [
            {
                question_text:"JavaScript is commonly referred to as:",
                question_answers:["The programming language that makes websites look good.",
                                    "The programming language of the web.",
                                    "A standard markup language for the web.",
                                    "The only language a website requires."],
                question_correct_ans:2
            },
            {
                question_text:"Which of the following statement is false:",
                question_answers:["JavaScript can hide HTML elements.",
                                    "JavaScript can make HTML elements move.",
                                    "JavaScript can change the css file.",
                                    "JavaScript can change the styling of a webpage."],
                question_correct_ans:3
            },
            {
                question_text:"Which of the following is not a valid JavaScript data type:",
                question_answers:["Integer",
                                    "String",
                                    "Boolean",
                                    "Object"],
                question_correct_ans:1                                      
            },
            {
                question_text:"True or False: The same variable can hold different data types.",
                question_answers:["TRUE",
                                    "FALSE"],
                question_correct_ans:1                                      
            },
            {
                question_text:"Which of the following statements is FALSE:",
                question_answers:["A JavaScript function is a block of code designed to perform a particular task.",
                                    "JavaScript functions will run as soon as they are read.",
                                    "JavaScript functions will be executed when they are invoked.",
                                    "JavaScript functions do not need to have a name."],
                question_correct_ans:2                                      
            },
            {
                question_text:"Which of the following has the correct syntax for defining a function.",
                question_answers:["function myname(var i=5) { // do something}",
                                    "function myname {(// do something)}",
                                    "function myname() {// do something}",
                                    "myname function () {// do something}"],
                question_correct_ans:3                                      
            },
            {
                question_text:"What is the purpose of a function's parameters?",
                question_answers:["To pass into the function values or other function from the calling function that are used within the receiving function. ",
                                    "To copy in global variables.",
                                    "To pass out the result of the function.",
                                    "None of the above."],
                question_correct_ans:1                                      
            },
            {
                question_text:"How many times will the function_1 be executed in the following: <br> " +
                                "for(var i=1; i<6; i++){function_1}",
                question_answers:["1",
                                    "5",
                                    "6",
                                    "It is not possible to know from this information."],
                question_correct_ans:2                                      
            },
            {
                question_text:"What is the value of x after the following code is executed within the same function. <br> " +
                                "var x=0; const x=10; x++; x=x+6;",
                question_answers:["0",
                                    "6",
                                    "7",
                                    "10"],
                question_correct_ans:4                                      
            },
            {
                question_text:"JSON is:",
                question_answers:["Dependant on the user's language settings",
                                    "Directly readable by a webpage.",
                                    "Just another name for strings.",
                                    "A format for storing and transporting data compactly."],
                question_correct_ans:4                                      
            }
        ];
        return questionArr;
    };