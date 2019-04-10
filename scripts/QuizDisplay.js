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
      <div class="grid-row col-3">
        <header class="grid-item">
          <h1>Welcome to the Trivia Quiz</h1>
        </header>
      </div>
      <div class="grid-row grid-item col-2">
        <button class="start">Start</button>
      </div>
    `;
  }

  _generateOutro() {
    let highScoreText = '';
    console.log(this.model.scoreHistory);

    if (this.model.score > this.model.highScore) {
      highScoreText = `<p class="grid-row col-2">That's a new high score!</p>`;
    };

    this.model.setHighScore();

    return `
      <div class="grid-row col-3">
        <div class="grid-row col-3">  
          <p>Good Job!</p>
        </div>
        <div class="grid-row col-3">
          <p>You scored ${this.model.score} out of ${this.model.asked.length}!</p>
        </div>
        ${highScoreText}
      </div>
      <div class="grid-row grid-item col-2">
        <button class="start">Play Again</button>
      </div>
    `
  }

  _generateQuestion() {
    const index = this.model.asked.length - 1;
    
    return `
      <div class="grid-row col-3">
        <h2>${this.model.asked[index].text}</h2>
      </div>
      <form class="grid-row answer-choices-form">
        <div class="col-3">
          <input class="grid-item" type="radio" name="answer-choice" id="a" value="${this.model.asked[index].choicesArray[0]}">
          <label class="grid-item col-2" for="a">${this.model.asked[index].choicesArray[0]}</label>
        </div>
        <div class="col-3">
          <input class="grid-item" type="radio" name="answer-choice" id="b" value="${this.model.asked[index].choicesArray[1]}">
          <label class="grid-item col-2" for="b">${this.model.asked[index].choicesArray[1]}</label>
        </div>
        <div class="col-3">
          <input class="grid-item" type="radio" name="answer-choice" id="c" value="${this.model.asked[index].choicesArray[2]}">
          <label class="grid-item col-2" for="c">${this.model.asked[index].choicesArray[2]}</label>
        </div>
        <div class="col-3">
          <input class="grid-item" type="radio" name="answer-choice" id="d" value="${this.model.asked[index].choicesArray[3]}">
          <label class="grid-item col-2" for="d">${this.model.asked[index].choicesArray[3]}</label>
        </div>
        <div class="grid-row grid-item col-2">
          <input type="submit">
        </div>
      </form>
    `;
  }

  _generateResult() {
    const index = this.model.asked.length - 1;
    let answerDiv = '';
    const correctAnswer = `<br>The correct answer was:<br>${this.model.asked[this.model.asked.length - 1].correctAnswer}`;

    if (this.model.asked[this.model.asked.length - 1].answerStatus() === 1) {
        answerDiv = `
        <div class="grid-row col-3">
          <h2>${this.model.asked[index].text}</h2>
        </div>
        <div class="grid-row col-3">
          <h3 class="grid-item col-2">YOU GOT IT!${correctAnswer}</h3>
        </div>`;
      } else {
      answerDiv = `
        <div class="grid-row col-3" >
          <h2>${this.model.asked[index].text}</h2>
        </div >
        <div class="grid-row col-3">
          <h3 class="grid-item col-2">Sorry that's incorrect.<br>You answered:<br>${this.model.asked[this.model.asked.length-1].userAnswer}</h3>
          <h3 class="grid-item col-2">${correctAnswer}</h3>
        </div>`;
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