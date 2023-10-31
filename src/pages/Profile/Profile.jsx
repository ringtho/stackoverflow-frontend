import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../api'
import './Profile.scss'
import { useEffect } from 'react'
import { setProfile } from '../../reduxSlice/usersSlice'
import QuestionProfile from '../../components/QuestionProfile/QuestionProfile'
import EditQuestion from '../../components/EditQuestion/EditQuestion'
import DeleteQuestion from '../../components/DeleteQuestion/DeleteQuestion'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.user)
  const { isEditActive, isDeleteActive } = useSelector(
    (state) => state.questions
  )
  const { id}  = useParams()
  const { name, email, questions } = profile

  useEffect(() => {
    const getUserDetails = async () => {
      dispatch(setProfile({}))
      try {
        const { data: { user } } = await getUser(id)
        console.log(user)
        dispatch(setProfile(user))
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails()

  },[])

  const questionsList = questions?.map((question) => {
    return <QuestionProfile key={question._id} {...question} />
  })

  return (
    <div className="details__container">
      <div className="details__wrapper">
        <div className="details user">
          <div className="avatar">SR</div>
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
        <div className="user__stats">
          <p>
            Questions Asked: <span>{questions?.length}</span>
          </p>
        </div>
        <div className='questionprofile__list'>{questionsList}</div>
        <div className="answers__container"></div>
      </div>
      {isEditActive && <EditQuestion />}
      {isDeleteActive && <DeleteQuestion />}
    </div>
  )
}

export default Profile
