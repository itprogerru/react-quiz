import axios from 'axios'

export default axios.create({
  baseURL:  'https://react-quiz-4b9ca.firebaseio.com/'
})