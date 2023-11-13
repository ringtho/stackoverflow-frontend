import { useState } from 'react'
import './AddAnswer.scss'
import { useSelector } from 'react-redux'
import { addAnswer } from '../../api'
import { useForm } from 'react-hook-form'

const AddAnswer = () => {
  const [answer, setAnswer] = useState('')
  const { question } = useSelector(state => state.questions)

  const handleOnchange = (e) => {
    setAnswer(e.target.value)
  }

  const onSubmit = async () => {
    try {
        const res = await addAnswer({id: question._id, answer})
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }

  const { handleSubmit, formState: { errors }, register} = useForm()
  return (
    <div>
      <form className="add__answer" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="answer">Add Answer</label>
        <textarea
          {...register('answer', {required: 'Please provide an answer'})}
          id="answer"
          placeholder="eg React or JS"
          onChange={handleOnchange}
          value={answer}
        />
        {errors?.answer?.message && (
          <small className='errors'>{errors.answer.message}</small>
        )}
        <button className="submit-button">Submit</button>
      </form>
    </div>
  )
}

export default AddAnswer
