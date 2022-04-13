  /* 
  Mathematics
  https://opentdb.com/api.php?amount=5&category=19&difficulty=medium&type=multiple
  Computer science
  https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple
  General knowledge
  https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple
  Books
  https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple
  Music
  https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple
  */

export default function Start({ setFirstQuizz, setCategory }) {

    function startQuizz(cat) {
        const categories = [
            'https://opentdb.com/api.php?amount=5&category=19&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&category=10&difficulty=medium&type=multiple',
            'https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple'
        ]
        setCategory(categories[cat]);
        setFirstQuizz(false);
    }

    return (
        <div className="start">
            <div className='start__info'>
                <h1>Quizzical</h1>
                <p>Select the category of your quizz</p>
            </div>
            <div className="start__categories">
                <button
                    className="start__button"
                    onClick={() => startQuizz(0)}
                >Mathematics</button>
                <button
                    className="start__button"
                    onClick={() => startQuizz(1)}
                >Computer science</button>
                <button 
                    className="start__button" 
                    onClick={() => startQuizz(2)}
                >General knowledge</button>
                <button 
                    className="start__button" 
                    onClick={() => startQuizz(3)}
                >Books</button>
                <button 
                    className="start__button" 
                    onClick={() => startQuizz(4)}
                >Music</button>
            </div>
        </div>
    );
}