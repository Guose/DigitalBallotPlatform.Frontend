import React, { Component } from 'react'
import axios from 'axios'
import './audit.css'

export class AuditLog extends Component {
  static displayName = AuditLog.name

  constructor(props) {
    super(props)
    this.state = { 
      auditLog: '', 
      loading: true,
      weather: []
    }
    this.populateAuditLogs = this.populateAuditLogs.bind(this)
    this.retrieve = this.retrieve.bind(this)
  }

  componentDidMount() {
    this.populateAuditLogs()
    this.retrieve()
  }

  async populateAuditLogs() {
    this.setState({
      auditLog: 'This is the Audit Log page where it will list a log of user-level operations',
      loading: false
    })
  }

  async retrieve() {
    await axios.get("http://localhost:3001/weather")
    .then((res) => {
      const weatherData = [...res.data]
      console.log('weather: ', weatherData)
      this.setState({
        weather: weatherData
      })
    })
  }

  static renderAuditLogPage(auditLog) {
    return(
      auditLog
    )
  }

  render() {
    const { auditLog, loading, weather } = this.state

    let contents = loading ? <p><em>Loading...</em></p> : AuditLog.renderAuditLogPage(auditLog)
    console.log('data: ', this.state)

    const weatherData = weather.map((item, index) => {
      return(
        <tr key={index} className='header'>
          <td>{item.date}</td>
          <td>{item.temperatureC}</td>
          <td>{item.temperatureF}</td>
          <td>{item.summary}</td>
        </tr>
      )
    })

    return(
      <div>
        <div>
          <h1 id='auditLogLabel'>Audit Log Page</h1>
          <p>{contents}</p>
        </div>
        <div className='table-container'>
          <table className='content-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>TemperatureC</th>
                <th>TemperatureF</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
            {loading ? <tr><td colSpan="4"><em>Loading...</em></td></tr> : weatherData}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}