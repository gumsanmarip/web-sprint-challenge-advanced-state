import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { inputChange, postQuiz, form} = props;
  
  const onChange = (e) => {
    const { value, id } = e.target
    const newQuestion = {...form, [id]:value}
   inputChange(newQuestion)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    postQuiz({
      question_text: props.form.newQuestion, 
      true_answer_text: props.form.newTrueAnswer, 
      false_answer_text: props.form.newFalseAnswer
    })
  }

  const enabled = 
    props.form.newQuestion.trim('').length > 0 &&
    props.form.newTrueAnswer.trim('').length > 0 &&
    props.form.newFalseAnswer.trim('').length > 0

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={form.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={form.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={form.newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={!enabled} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
