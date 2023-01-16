import React, { useState, useEffect } from 'react'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';
import { connect } from 'react-redux';


export function Quiz(props) {
  const { quiz, selectedAnswer, fetchQuiz, selectAnswer, postAnswer } = props;

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      fetchQuiz()
    }, [])
    


    const handleSelect = (answer) => {
      selectAnswer(answer)
      setDisabled(false);
        // const button = document.querySelector("#submitAnswerBtn");
        // button.enabled = true;
    }

    const submitAnswer = (quiz, answer) => {
      console.log(quiz, answer);
      postAnswer(quiz, answer);
      setDisabled(true);
      // evt.target.disabled;
    }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        {quiz} ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {
                quiz.answers.map((answer, idx) => (<div key={idx} className={`answer${answer === selectedAnswer ? ' selected' : ''}`}>
                {answer.text}
                <button onClick={() => handleSelect(answer)}>
                  {answer === selectedAnswer ? 'SELECTED' : 'Select'}
                </button>
              </div>
              ))}
              {/* <div className="answer">
                {quiz.answers[0].text}
                <button onClick={handleSelect}>
                  Select
                </button>
              </div>

              <div className="answer">
              {quiz.answers[1].text}
                <button onClick={handleSelect}>
                  Select
                </button>
              </div> */}
            </div>

            <button id="submitAnswerBtn" disabled={disabled} onClick={() => submitAnswer(quiz.quiz_id, selectedAnswer.answer_id)}>Submit answer</button>
          </>
        ) : <div className="loading" > Loading next quiz... </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz);
