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
export const fetchQuiz = () => (dispatch) => {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res =>{
        dispatch({type: SET_QUIZ, payload: res.data.data });
      })
      .catch(err=> {});
  }
export const postAnswer = ({quiz_id, answer_id}) => (dispatch) => {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const payload = {quiz_id, answer_id};
    axios.post('http://localhost:9000/api/quiz/new', payload )
      .then(res =>{
        dispatch(selectAnswer(null));
        dispatch(setQuiz(null));
        dispatch(fetchQuiz());
        dispatch(setMessage(res.data.message));
      })
      .catch(err => console.log({err}));
  }

export const postQuiz = ({question_text, true_answer_text, false_answer_text}) => (dispatch) => {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    // const payload = {question_text, true_answer_text, false_answer_text};
    payload = {question_text, true_answer_text, false_answer_text};

    axios.post('http://localhost:9000/api/quiz/new', payload)
      .then(res =>{
        dispatch({type: SET_MESSAGE(`Congrats: "${res.data.question}" is a great question!`) });
        dispatch(resetForm());
      })
      .catch(err => console.log({err}));
  }

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
