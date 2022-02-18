// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as creators from './action-creators';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  return state;
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state;
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state;
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state;
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: ''
}

function form(state = initialFormState, action) {
  switch(action.type) {
    case creators.INPUT_CHANGE: 
      return action.payload;
    case creators.postQuiz:
      return action.payload;     
    case creators.RESET_FORM: 
      return initialFormState;        
  }
  return state;
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
