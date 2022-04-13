import React, { useEffect, useState } from 'react';
import Question from './Question';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';


export default function Quizz({quizzData, options, setQuizzCounter}) {

    const [showAnswers, setShowAnswers] = useState(false);
    const [optionsConf, setOptionsConf] = useState(options);

    useEffect(() => {
        setOptionsConf(options);
    }, [options]);

    const questions = quizzData.map(obj => (
        <Question
            key={nanoid()}
            questionId={obj.id}
            question={obj.question}
            options={optionsConf}
            setOptionsConf={setOptionsConf}
            showAnswers={showAnswers}
        />
    ));

    function checkAnswers() {
        if (showAnswers) {
            setShowAnswers(false);
            setQuizzCounter(prevQuizzCounter => prevQuizzCounter + 1);
        } else {
            const allAnswered = optionsConf.every(question => question.answered);
            if (allAnswered) setShowAnswers(true);
        }
    }

    function wrongCounter() {
        let counter = 0;
        for (let question of optionsConf) {
            if (question.correct) counter++;
        }
        return counter;
    }

    return (
        <>
            {
                showAnswers &&
                wrongCounter() === 5 &&
                <Confetti />
            }
            <section className="quizz">
                <div className="quizz__questions">
                    {questions}
                </div>
                <div className='quizz__results'>
                    {showAnswers && <p className='quizz__score'>You scored {wrongCounter()}/5 correct answers</p>}
                    <button className="quizz__button" onClick={checkAnswers}>{showAnswers ? 'New quizz' : 'Check answers'}</button>
                </div>
            </section>
        </>
    );
}