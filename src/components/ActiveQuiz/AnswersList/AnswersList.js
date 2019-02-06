import React from 'react'
import './AnswersList.scss'
import AnswerItem from './AnswersItem/AnswersItem'

const AnswersList = props => (
  <ul className='answers-list'>
    {props.answers.map((answer,index) => {
      return (
        <AnswerItem
          key = {index}
          answer = {answer}
          onAnswerClick= {props.onAnswerClick}
          state = {props.state ? props.state[answer.id]: null}
        />
      )
    })}
  </ul>
)
export default AnswersList