import Question from '../Question/Question'
import './Questions.scss'
import { useSelector } from 'react-redux/'

const Questions = () => {
  const { questions } = useSelector((state) => state.questions)
  const { user } = useSelector((state) => state.user)
  const questionList = questions.map((question) => {
    return <Question key={question._id} question={question} user={user}  />
  })
  
  return (
    <section className='questions__container'>
        {questionList}
    </section>
  )
}

export default Questions
