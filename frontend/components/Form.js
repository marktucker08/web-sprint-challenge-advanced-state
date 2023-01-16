import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import * as Yup from 'yup';

export function Form(props) {

  const formSchema = Yup.object().shape({
    newQuestion: Yup
      .string()
      .required("Question Required!"),
    newTrueAnswer: Yup
      .string()
      .required("True Answer Required!"),
    newFalseAnswer: Yup
      .string()
      .required("False Answer Required!")
  });

  const onChange = evt => {
    const { value, id } = evt.target
    props.inputChange(value, id)
  }

  const onSubmit = evt => {
    evt.target.preventDefault();
    props.postQuiz(props.form);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion}/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer}/>
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
