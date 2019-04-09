/* eslint-disable indent */
'use strict';

class TriviaApi {
    constructor (amt) {
        this.base_url = 'https://opentdb.com/api.php';
        this.amount = amt;
    }

    getQuestions() {
        return fetch(`${this.base_url}?amount=${this.amount}`)
            .then(res => { return res.json(); })
            .then((data) => {
                return data.results;
            });
    }
}

// const api = new TriviaApi;
// api.getQuestions()
//     .then(questions)