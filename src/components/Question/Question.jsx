import './Question.scss'
import { useNavigate } from 'react-router-dom'

const Question = (question) => {
  const {_id: id, title, description, tag } = question
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${id}`)
  }
  return (
    <section className="question__container" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {tag.length > 0 && <div className='tag__container'>
        {tag.map((tag, idx) => (
          <div key={idx} className="tag">
            {tag}
          </div>
        ))}
      </div>}
    </section>
  )
}

export default Question
