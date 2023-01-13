import React, { useEffect } from 'react'
import { fetchQuiz } from '../state/action-creators';
import { connect } from 'react-redux';


export function Quiz(props) {
  const { quiz, fetchQuiz } = props;


    useEffect(() => {
      fetchQuiz()
    }, [])
  console.log(quiz.question);
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        false ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {quiz.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              {quiz.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : <div className="loading" > Loading next quiz... </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz
  }
}

export default connect(mapStateToProps, {fetchQuiz})(Quiz);
