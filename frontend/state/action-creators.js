// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, RESET_QUIZ_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, RESET_ANSWER_STATE, INPUT_CHANGE, RESET_FORM } from "./action-types";
import axios from "axios";

export function moveClockwise(id) {
  return({type: MOVE_CLOCKWISE, payload: id });
 }

export function moveCounterClockwise(id) {
  return({type: MOVE_COUNTERCLOCKWISE, payload: id });
 }

export function selectAnswer(answer) { 
  return({type: SET_SELECTED_ANSWER, payload: answer})
}

export function setMessage(message) { 
  return({type: SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(quiz) { 
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
}

export function resetQuiz() {
  return({type: RESET_QUIZ_STATE})
}

export function resetAnswer() {
  return ({type: RESET_ANSWER_STATE})
}

export function inputChange(value, id) { 
  return({type: INPUT_CHANGE, id: id, payload: value})
}

export function resetForm() { 
  return({type: RESET_FORM})
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetQuiz());
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res => {
        dispatch(setQuiz(res.data))
        console.log("Quiz Set")
      })
      .catch(err => console.log(err))
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quiz, answer) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/answer", { "quiz_id": quiz, "answer_id": answer })
    .then(res => {
      dispatch(resetAnswer())
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err => {
      console.log(err)
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(formValues) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/new", { "question_text": formValues.newQuestion, "true_answer_text": formValues.newTrueAnswer, "false_answer_text": formValues.newFalseAnswer })
    .then(res => {
      console.log(res)
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!` ))
      dispatch(resetForm())
    })
    .catch(err => {
      console.log(err)
    })
    
    
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
