'use strict';

/* global Renderer, q */

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <span class="score">Score: ${q.score}</span>
      <span class="high-score">High Score: ${q.getHighScore()}</span>
      <span class="progress">${q.getProgress()}</span>
    `;
  }
}
