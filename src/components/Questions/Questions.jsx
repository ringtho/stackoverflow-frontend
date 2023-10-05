import Question from '../Question/Question'
import './Questions.scss'
import { useSelector } from 'react-redux/'

const Questions = () => {
  const { questions: { questions } } = useSelector((state) => state)
  const questionList = questions.map((question) => {
    return <Question key={question._id} {...question} />
  })
  
  return (
    <section className='questions__container'>
        {questionList}
    </section>
  )
}

export default Questions
