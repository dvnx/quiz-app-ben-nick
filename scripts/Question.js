/* eslint-disable indent */
'use strict';

// Attrs:
//   text (string)           - Question text
//   answers (array)         - Array of strings, each a unique answer
//   correctAnswer (string)  - Correct answer string, must match at least one element of answers array
//   userAnswer (string)     - Answer provided by user

// Methods:
//   submitAnswer(answer: string)  - sets the userAnswer prop
//   answerStatus()                - returns {Integer} indicating question's state:
//                                   -1: unanswered, 0: answered incorrectly, 1: answered correctly

class Question {
    constructor (apiQuestion) {
        this.text = apiQuestion.question;
        this.answers = [...apiQuestion.incorrect_answers];
        this.correctAnswer = apiQuestion.correct_answer;
        this.userAnswer;
    }

    submitAnswer(answer) {
        this.userAnswer = answer;
    }

    answerStatus() {
        let status = null;

        if(!this.userAnswer) {
            status = -1;
        } else if(this.userAnswer === this.correctAnswer) {
            status = 1;
        } else {
            status = 0;
        }

        return status;
    }
}