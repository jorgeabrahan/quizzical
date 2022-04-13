import React from 'react';
import { nanoid } from 'nanoid';

export default function Question({ questionId, question, options, setOptionsConf, showAnswers }) {
    function toggleSelected(optionId, questionId) {
        setOptionsConf(prevOptionsConf => {
            const newOptionsConf = [];
            // foreach question 
            for (let question of prevOptionsConf) {
                // if is the one where the user select an option
                if (question.id === questionId) {
                    const newOptions = [];
                    let isSelectedTheCorrect = false;
                    // foreach option of the question
                    for (let option of question.options) {
                        // if is the option selected by the user
                        if (option.id === optionId) {
                            isSelectedTheCorrect = option.correct;
                            // toggle selected
                            newOptions.push({
                                ...option,
                                selected: true
                            });
                        } else {
                            // for all the other options, set selected to false
                            newOptions.push({
                                ...option,
                                selected: false
                            });
                        }
                    }
                    newOptionsConf.push({
                        id: questionId,
                        correct: isSelectedTheCorrect,
                        answered: true,
                        options: newOptions
                    });
                } else {
                    newOptionsConf.push(question);
                }
            }
            return newOptionsConf;
        })
    };

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    let optionsElement;
    options.forEach(option => {
        if (option.id === questionId) {
            optionsElement = option.options.map(optInfo => {
                function ifSelectedWrong() {
                    if (optInfo.selected && showAnswers) {
                        if (!optInfo.correct) return 'option--wrong';
                    }
                    return '';
                }
                return (
                    <button
                        key={nanoid()}
                        className={`option ${showAnswers && optInfo.correct ? 'option--right' : ''} ${optInfo.selected ? 'option--selected' : ''} ${ifSelectedWrong()}`}
                        onClick={({ target }) => toggleSelected(target.id, target.parentElement.parentElement.id)}
                        id={optInfo.id}
                        disabled={showAnswers}
                    >
                        {decodeHtml(optInfo.option)}
                    </button>
                )
            });
        }
    });

    return (
        <div className="quizz__question" id={questionId}>
            <p className="question">{decodeHtml(question)}</p>
            <div className="quizz__options">
                {optionsElement}
            </div>
        </div>
    );
}