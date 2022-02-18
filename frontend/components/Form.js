import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  
  const onChange = (e) => {
    props.inputChange(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.postQuiz(props.question_text, props.true_answer_text, props.false_answer_text)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={props.question_text} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={props.true_answer_text} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={props.false_answer_text} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
