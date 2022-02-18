// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";

export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE';
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE';
export const SELECT_ANSWER = 'SELECT_ANSWER';
export const SET_MESSAGE = 'SET_MESSAGE'; 
export const SET_QUIZ = 'SET_QUIZ';
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const RESET_FORM = 'RESET_FORM';

export const moveClockwise = () =>  {
  return({type: MOVE_CLOCKWISE, payload: id});
}
export const moveCounterClockwise = () =>  {
  return({type: MOVE_COUNTERCLOCKWISE, payload: id});
}
export const selectAnswer = () =>  {
  return({type: SELECT_ANSWER, payload: className});
}
export const setMessage = () =>  {
  return({type: SET_MESSAGE});
}
export const setQuiz = () =>  {
  return({type: SET_QUIZ});
}
export const inputChange = (value) => {
  return({type: INPUT_CHANGE, payload: value});
}
export const resetForm = () => {
  return({type: RESET_FORM});
}

// ❗ Async action creators
export const fetchQuiz = () => (dispatch) => {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res =>{
        dispatch(resetForm());
        dispatch({type: SET_QUIZ, payload: res.data.data });
      })
      .catch(err=> {});
  }
export const postAnswer = () => (dispatch) => {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const payload = {quiz_id, answer_id};
    axios.post('http://localhost:9000/api/quiz/new', payload )
      .then(res =>{
        dispatch(resetForm());
        dispatch({type: SET_MESSAGE, payload: res.data.message});
        dispatch(fetchQuiz());
        
      })
      .catch(err => console.log({err}));
  }

export const postQuiz = () => (dispatch) => {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
     const payload = {question_text, true_answer_text, false_answer_text};
    axios.post('http://localhost:9000/api/quiz/new', payload)
      .then(res =>{
        dispatch({type: SET_MESSAGE, payload: res.data.message});
        dispatch(resetForm());
        
      })
      .catch(err => console.log({err}));
  }

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
