import React, {useState, useEffect} from 'react';
import Start from './components/Start';
import Quizz from './components/Quizz';
import { nanoid } from 'nanoid';
export default function App() {
  const [firstQuizz, setFirstQuizz] = React.useState(true);
  const [quizzData, setQuizzData] = useState([]);
  const [quizzCounter, setQuizzCounter] = useState(0);
  const [category, setCategory] = useState('');

  function sortRandomly(incorrectAnswers, correctAnswer) {
    const all = [...incorrectAnswers, correctAnswer];
    for (let i = all.length - 1; i > 0; i--) { //loop through options from last to first element
        let ranPosition = Math.floor(Math.random() * i); //generate and store a random number between 0 and the amount of elements of the array (0-5)
        let preserveValue = all[i]; //preserve the value of the current position of the array
        all[i] = all[ranPosition]; //change the preserved value for the one in the random position
        all[ranPosition] = preserveValue; //store the preserved value on the random position
    }
    return {all, correctAnswer};
  }

  useEffect(() => {
    function setObjOptions(options, correct) {
      const optionsObj = []
      for (let option of options) {
        optionsObj.push({
          id: nanoid(),
          option: option,
          selected: false,
          correct: option === correct
        });
      }
      return optionsObj;
    }
    if (!category) return; //In case there's no category selected
    
    //If there's a category selected we call the API
    fetch(category)
        .then(res => res.json())
        .then(data => {
          const restructuredData = [];
          for (let res of data.results) {
            const options = sortRandomly(res.incorrect_answers, res.correct_answer);
            restructuredData.push({ id: nanoid(), question: res.question, options: setObjOptions(options.all, options.correctAnswer), correctAnswer: options.correctAnswer });
          }
          setQuizzData(restructuredData);
        });
  }, [quizzCounter, category]);

  function justOptionsFromData(quizzData) {
    const allOpts = [];
    for (let data of quizzData) {
      allOpts.push({
        id: data.id,
        correct: false,
        answered: false,
        options: data.options
      });
    };
    return allOpts;
  }

  return (
    <main>
      {
        firstQuizz ? 
          <Start
            setFirstQuizz={setFirstQuizz}
            setCategory={setCategory}
          /> :
          <Quizz
            quizzData={quizzData}
            options={justOptionsFromData(quizzData)}
            setQuizzCounter={setQuizzCounter}
          />
      }
    </main>
  );
}

