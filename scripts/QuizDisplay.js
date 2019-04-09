'use strict';

/* global Renderer */

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'submit .answer-choices-form': 'handleSubmitAnswer',
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

  _generateQuestion() {
    return `
      <div>
        ${this.model.asked[0].text}
      </div>
      <form class="answer-choices-form">
        <input type="radio" name="answer-choice" value="${this.model.asked[0].answers[0]}">${this.model.asked[0].answers[0]}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[0].answers[1]}">${this.model.asked[0].answers[1]}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[0].correctAnswer}">${this.model.asked[0].correctAnswer}<br>
        <input type="radio" name="answer-choice" value="${this.model.asked[0].answers[2]}">${this.model.asked[0].answers[2]}<br>
        <input type="submit">
      </form>
    `;
  }

  _generateResult() {
    if(this.model.questionResult) {
      return `<div>YOU GOT IT! The correct answer is ${this.model.asked[0].correctAnswer}</div>`;
    } else {
      return `<div>YOU SUCK! The correct answer is ${this.model.asked[0].correctAnswer}</div>`;
    }
  }

  //TODO
  randomizer(){}

  template() {
    if (this.model.active) {
      if(this.model.questionResult !== null) {
        console.log('user answered');
        return this._generateResult();
      }
      console.log('questionResult is null');
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.toggleActive();
    this.model.askQuestion();
    this.model.update();
  }

  handleSubmitAnswer(event) {
    event.preventDefault();
    const userChoice = $('input[name=answer-choice]:checked').val();
    if(userChoice === this.model.asked[0].correctAnswer) {
      this.model.incrementScore();
      this.model.questionResult = true;
      this.render();
      this.model.questionResult = null;
    } else {
      this.model.questionResult = false;
      this.render();
      this.model.questionResult = null;
    }
  }
}