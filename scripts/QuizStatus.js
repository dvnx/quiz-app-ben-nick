'use strict';

/* global Renderer, q */

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <span class="score">${q.score}</span>
      <span class="high-score">${q.getHighScore()}</span>
      <span class="progress">${q.getProgress()}</span>
    `;
  }
}
