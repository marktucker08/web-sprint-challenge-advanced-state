// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, RESET_QUIZ_STATE, SET_SELECTED_ANSWER, RESET_ANSWER_STATE, SET_INFO_MESSAGE } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE: 
    if (action.payload + 1 > 5) {
      return 0
    }
      return (action.payload + 1)
    case MOVE_COUNTERCLOCKWISE: 
      if (action.payload - 1 < 0) {
        return 5
      }
      return (action.payload - 1)
    default:
      return state;
    }
}

const initialQuizState = {
    quiz_id: null,
    question: "",
    answers: [
      {
        answer_id: null,
        text: ""
      },
      {
        answer_id: null,
        text: ""
      }
    ],
}

const quiz = (state = initialQuizState, action) => {
  switch(action.type) {
    case SET_QUIZ_INTO_STATE: 
      const newQuiz = action.payload;
      return newQuiz
    case RESET_QUIZ_STATE:
      return initialQuizState
    default:
      return state
  }
  
}

const initialSelectedAnswerState = {
  answer_id: null,
  text: ""
}

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case SET_SELECTED_ANSWER:
      return action.payload
    case RESET_ANSWER_STATE:
      return initialSelectedAnswerState
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
