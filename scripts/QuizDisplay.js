'use strict';

/* global Renderer */

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
 
  getEvents() {
    return {
      'click .start': 'handleStart',
      'submit .answer-choices-form': 'handleSubmitAnswer',
      'click .continue': 'handleContinue',
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateOutro() {
    let highScoreText = '';
    console.log(this.model.scoreHistory);

    if (this.model.score > this.model.highScore) {
      highScoreText = `<p>That's a new high score!</p>`;
    };

    this.model.setHighScore();

    return `
      <div>
        <p>Good Job!</p>
        <p>You scored ${this.model.score} out of ${this.model.asked.length}!</p>
        ${highScoreText}
      </div>
      <div>
        <button class="start">Play Again</button>
      </div>
    `
  }

  _generateQuestion() {
    const index = this.model.asked.length - 1;
    
    return `
      <div>
        ${this.model.asked[index].text}
      </div>
      <form class="answer-choices-form">
        <input type="radio" name="answer-choice" value="${this.model.asked[index].choicesArray[0]}">${this.model.asked[index].choicesArray[0]}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[index].choicesArray[1]}">${this.model.asked[index].choicesArray[1]}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[index].choicesArray[2]}">${this.model.asked[index].choicesArray[2]}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[index].choicesArray[3]}">${this.model.asked[index].choicesArray[3]}<br>
        <input type="submit">
      </form>
    `;
  }

  _generateResult() {
    let answerDiv = '';

    if (this.model.asked[this.model.asked.length - 1].answerStatus() === 1) {
        answerDiv = `<div>YOU GOT IT! The correct answer is ${this.model.asked[this.model.asked.length - 1].correctAnswer}</div>`;
      } else {
        answerDiv = `<div>YOU SUCK! The correct answer is ${this.model.asked[this.model.asked.length - 1].correctAnswer}</div>`;
      };
    
    const continueButton = '<button type="button" class="continue">Continue</button>';

    return answerDiv + continueButton;
  }

  template() {
    console.log(this.model.asked);
    if (this.model.active) {
      if (this.model.asked[this.model.asked.length - 1].answerStatus() !== -1) {
        return this._generateResult();
      }
      return this._generateQuestion();
    } else if (this.model.asked.length === 0) {
      return this._generateIntro();
    } else {
      return this._generateOutro();
    };  
  }

  handleStart() {
    this.model.initialize()
        .then(() => {
          this.model.toggleActive();
          this.model.askQuestion();
          this.model.update();
        });
  }

  handleSubmitAnswer(event) {
    event.preventDefault();
    const userChoice = $('input[name=answer-choice]:checked').val();

    this.model.asked[this.model.asked.length - 1].submitAnswer(userChoice);
    const answerStatus = this.model.asked[this.model.asked.length - 1].answerStatus();
    
    if(answerStatus === 1) {
      this.model.incrementScore();
    } 
    this.model.update();
  }

  handleContinue() {
    if (this.model.unasked.length === 0) {
      this.model.recordScore();
      this.model.toggleActive();
      this.model.update();
      console.log('game over');
    } else {
    this.model.askQuestion();
    this.model.update();
    }
  }
  
}