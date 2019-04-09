/* global Model, TriviaApi, Question */

class Quiz extends Model {          // eslint-disable-line no-unused-vars

  // This class property could be used to determine the no. of quiz questions
  // In later implementations, the user could provide a quiz length and override
  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();

    // Your Quiz model's constructor logic should go here. There is just examples below.
    // this.questions = [{ id: 1, text: 'Question 1' }];

    this.unasked = [];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.highScore = 0;
  }

  initialize() {
    this.score = 0;
    this.clearQuestions();
    
    return new TriviaApi(5).getQuestions()
      .then((questions) => {
        questions.forEach(question => {
          this.unasked.push(new Question(question))
        });
      });
  }

  clearQuestions() {
    this.unasked.length = 0;
    this.asked.length = 0;
  }

  toggleActive() {
    this.active = !this.active;
  }

  askQuestion() {
    this.asked.push(this.unasked.pop());
  }

  incrementScore() {
    this.score++;
  }

  recordScore() {
    this.scoreHistory.push(this.score);
  }

  getHighScore() {
    let highScore = this.scoreHistory[0] || 0;

    for(let i=1; i<this.scoreHistory.length; i++) {
      if(this.scoreHistory[i] > highScore) {
        highScore = this.scoreHistory[i];
      }
    }

    return highScore;
  }

  setHighScore() {
    this.highScore = this.getHighScore();
  }

  getProgress() {
    if(!this.active) {
      return 'Inactive';
    } else {
      return `${this.asked.length} of ${this.asked.length + this.unasked.length}`;
    }
  }
}