/* eslint-disable indent */
'use strict';

class TriviaApi {
    constructor () {
        this.base_url = 'https://opentdb.com/api.php';
        this.amount = 10;
    }

    getQuestions() {
        return fetch(`${this.base_url}?amount=${this.amount}`)
            .then(res => { return res.json(); })
            .then((data) => {
                return data.results;
            });
            // .then((questions) => {questions.forEach(question => Quiz.unasked.push(question));});
    }
}

// const api = new TriviaApi;
// api.getQuestions()
//     .then(questions)