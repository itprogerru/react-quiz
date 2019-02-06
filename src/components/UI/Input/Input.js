import React from 'react'
import './Input.scss'

function isInvalid ({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {

  const inputType = props.type || 'text'
  const cls = ['input']
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push('invalid')
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value ={props.value}
        onChange = {props.onChange}
      />
      {isInvalid(props)
        ?  <span>{props.errorMessage}</span> || 'введите корректные данные'
        :  null
      }

    </div>
  )
}

export default Input