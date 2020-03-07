# Asst4_JavascriptQuiz
Create a timed javascript quiz

url:https://jo3005.github.io/Asst4_JavascriptQuiz/.
github repository: 

## Description:

This webpage takes a set of questions and answers from a separate javascript file and renders them to the screen.  The initial timer is set to 120 seconds. 
When the user presses the start quiz button the quiz starts and the timer is initiated.

One question is rendered to the screen at a time in a modal popup box. As soon as the user selects an answer by click it, the next question is rendered to the screen.  Each wrong answer reduces the time by 10 seconds.

When the 10 questions have been answered or the timer gets to zero the quiz completes.  

The user is asked to provide their initials.  If they are in the top 10 of scores, then their score is saved to the localdrive.

The user can also view a list of the top 10 scores by  clicking a button on the front page.

The page uses a Bootstrap 4.4 framework.

Currently only default alerts and popup alerts are used.  Future versions will develop a custom alert (But this is currently not working and has been commented out.)


## Original User criteria:
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
