import './Loading.scss'
import { CircleLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="loader-container">
      <CircleLoader color={'#4C4C6D'} size={50} />
    </div>
  )
}

export default Loading
