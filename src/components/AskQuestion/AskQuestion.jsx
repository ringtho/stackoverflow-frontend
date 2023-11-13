import { useState } from 'react'
import './AskQuestion.scss'
import { addQuestion } from '../../api'
import { useDispatch } from 'react-redux'
import { setAskActive, setReload } from '../../reduxSlice/questionsSlice'
import { useForm } from 'react-hook-form'

const AskQuestion = () => {
  const [question, setQuestion] = useState({
    title: '',
    description: '',
    tag: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch()
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setQuestion({...question, [name]: value })
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
        await addQuestion(question)
        setIsSubmitting(false)
        dispatch(setAskActive())
        dispatch(setReload(true))
    } catch(error) {
        console.log(error)
    }
  }

  const { handleSubmit, formState: { errors }, register } = useForm()

  return (
    <section className="ask__container form__container">
      <form className="ask__wrapper" onSubmit={handleSubmit(onSubmit)}>
        <h4>Ask Question</h4>
        <label htmlFor="title">Title</label>
        <input
          {...register('title', { required: 'Please provide a title' })}
          type="text"
          name="title"
          value={question.title}
          onChange={handleChange}
          id="title"
        />
        {errors?.title?.message && (
          <small className="errors">{errors.title.message}</small>
        )}
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={question.description}
          onChange={handleChange}
          id="description"
        />
        <button
          type="button"
          className="cancel-button"
          onClick={() => dispatch(setAskActive())}
        >
          Cancel
        </button>
        <button className="submit-button">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default AskQuestion
