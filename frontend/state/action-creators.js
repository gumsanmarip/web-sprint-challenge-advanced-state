// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import * as types from './action-types';

export const moveClockwise = (value) =>  {
  return({type: types.MOVE_CLOCKWISE, payload: value});
}
export const moveCounterClockwise = (value) =>  {
  return({type: types.MOVE_COUNTERCLOCKWISE, payload: value});
}
export const selectAnswer = (answer_id) =>  {
  return({type: types.SET_SELECTED_ANSWER, payload: answer_id});
}
export const setMessage = (message) =>  {
  return({type: types.SET_INFO_MESSAGE, payload: message});
}
export const setQuiz = (question) =>  {
  return({type: types.SET_QUIZ_INTO_STATE, payload: question});
}
export const inputChange = (value) => {
  return({type: types.INPUT_CHANGE, payload: value});
}
export const resetForm = () => {
  return({type: types.RESET_FORM});
}

// ❗ Async action creators
export function fetchQuiz() {
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res =>{
        dispatch(setQuiz(res.data));
      })
      .catch(err=> {});
    }
}
export function postAnswer({ quiz_id, answer_id }) {
  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
    .then(res => {
      dispatch(selectAnswer(null));
      dispatch(setQuiz(null));
      dispatch(fetchQuiz());
      dispatch(setMessage(res.data.message));
    })
    .catch(err=> {});
  }
}

export function postQuiz({question_text, true_answer_text, false_answer_text}) {
  // On successful POST:
  // - Dispatch the correct message to the the appropriate state
  // - Dispatch the resetting of the form
  // const payload = {question_text, true_answer_text, false_answer_text};
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { question_text, true_answer_text, false_answer_text })
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err=> {});
    }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
