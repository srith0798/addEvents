// Write your code here
import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

let maintainAll = []

class Appointments extends Component {
  state = {
    searchInput: '',
    eventDate: '',
    scheduleList: [],
    isActive: false,
  }

  onAddEvent = event => {
    event.preventDefault()
    const {searchInput, eventDate} = this.state
    const scheduleTime = {
      id: uuidV4(),
      searchInput,
      eventDate: new Date(eventDate),
      isMarked: false,
    }
    this.setState(prevData => ({
      scheduleList: [...prevData.scheduleList, scheduleTime],
      searchInput: '',
      eventDate: '',
    }))
    console.log(scheduleTime)
  }

  onSearchValue = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onGetDate = event => {
    this.setState({
      eventDate: event.target.value,
    })
  }

  onToggleIcon = id => {
    const {scheduleList} = this.state
    const getUpdateList = scheduleList.map(every => {
      if (every.id === id) {
        const statusChange = !every.isMarked
        return {...every, isMarked: statusChange}
      }
      return every
    })
    maintainAll = getUpdateList
    this.setState({
      scheduleList: getUpdateList,
    })
  }

  getMarkedItems = () => {
    const {scheduleList, isActive} = this.state
    console.log(isActive)
    if (isActive === false) {
      const starEvents = scheduleList.filter(
        eachEvent => eachEvent.isMarked === true,
      )
      this.setState({
        scheduleList: starEvents,
        isActive: !isActive,
      })
    } else {
      this.setState({
        scheduleList: maintainAll,
        isActive: !isActive,
      })
    }
  }

  render() {
    const {searchInput, isActive, scheduleList, eventDate} = this.state
    const btnClick = isActive ? 'active-btn' : ''
    return (
      <div className="bg-layer">
        <div className="card">
          <div className="card-header">
            <form className="form-box" onSubmit={this.onAddEvent}>
              <h1 className="title">Add Appointment</h1>
              <label className="label-tag" htmlFor="title">
                TITLE
              </label>
              <input
                className="text-box"
                type="text"
                onChange={this.onSearchValue}
                placeholder="Title"
                value={searchInput}
              />
              <label className="label-tag" htmlFor="date">
                DATE
              </label>
              <input
                className="text-box"
                type="date"
                onChange={this.onGetDate}
                value={eventDate}
              />
              <button className="submit-btn" type="submit">
                Add
              </button>
            </form>
            <img
              className="pic"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="card-footer">
            <div className="head">
              <h1 className="sub-title">Appointments</h1>
              <button
                className={`status-btn ${btnClick}`}
                type="button"
                onClick={this.getMarkedItems}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {scheduleList.map(eachEvent => (
                <AppointmentItem
                  key={eachEvent.id}
                  onToggleIcon={this.onToggleIcon}
                  eventData={eachEvent}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
