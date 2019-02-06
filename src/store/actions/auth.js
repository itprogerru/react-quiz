import axios from '../../axios/axios-quiz'
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const autData = {
      email, password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCrotOBlHUUQL6PhB-dXhG2f-1xQWSEIOA'
    if (isLogin) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCrotOBlHUUQL6PhB-dXhG2f-1xQWSEIOA'
    }

    const response = await axios.post(url, autData)
    const data = response.data

    console.log(data)
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    console.log(expirationDate)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate',  expirationDate)

    dispatch(authSuccess(data.idToken))

    dispatch(autoLogout(data.expiresIn))

  }
}

export function autoLogout (time) {
  console.log(time)
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout())
    }, time*1000)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin () {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      console.log(expirationDate, new Date())
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime()- new Date().getTime())/ 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}