import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  const { quiz, postAnswer } = props;

  useEffect(() => {
      props.fetchQuiz();
    }
  , [])

  const onClick = (id) => {
    props.selectAnswer(id)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer
    })
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`${props.selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}`}>
                {quiz.answers[0].text}
                <button onClick={() => onClick(quiz.answers[0].answer_id)}>
                {props.selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`${props.selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : "answer"}`}>
                {quiz.answers[1].text}
                <button onClick={() => onClick(quiz.answers[1].answer_id)}>
                {props.selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={!props.selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
export default connect( st => st, actionCreators)(Quiz)