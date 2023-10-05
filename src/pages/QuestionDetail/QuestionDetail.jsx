import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleQuestion } from "../../api"
import './QuestionDetail.scss'

const QuestionDetail = () => {
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const { title, description, tag } = question
  const { id } = useParams()

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const { data } = await getSingleQuestion(id)
        setQuestion(data.question)
        setAnswers(data.answers)
      } catch (error) {
        console.log(error)
      }
    }
    getQuestion()
  }, []) 

  console.log(question)
  console.log(answers)
  return (
    <div className="details__container">
      <h4>{title}</h4>
      <div className="details__wrapper">
        <p>{description}</p>
        {tag?.length > 0 && (
          <div className="tag__container">
            {tag?.map((tag, idx) => (
              <div key={idx} className="tag">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      { answers.length > 0 && <div className="answers__container">
        { answers.map((answer, idx) => {
          return (
            <div key={idx} className="answer__wrapper">
              <p>{answer.answer}</p>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default QuestionDetail
