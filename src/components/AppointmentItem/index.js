// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {onToggleIcon, eventData} = props
  const {id, searchInput, eventDate, isMarked} = eventData
  const toggleFunc = () => {
    onToggleIcon(id)
  }
  const imgUrl = isMarked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const dateTime = format(eventDate, 'dd MMMM yyyy, EEEE')

  return (
    <li className="event-item">
      <div className="event-head">
        <h1 className="event-title">{searchInput}</h1>
        <button
          className="toggle-btn"
          testid="star"
          type="button"
          onClick={toggleFunc}
        >
          <img className="star-pic" src={imgUrl} alt="star" />
        </button>
      </div>
      <p className="date-time">{dateTime}</p>
    </li>
  )
}

export default AppointmentItem
