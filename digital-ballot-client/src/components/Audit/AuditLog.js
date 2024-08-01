import React, { Component } from 'react'
import axios from 'axios'
import './audit.css'
import '../../shared/styles/tables.css'

export class AuditLog extends Component {
  static displayName = AuditLog.name

  constructor(props) {
    super(props)
    this.state = { 
      auditLog: '', 
      loading: true,
      categories: []
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
      
    })
  }

  async retrieve() {
    await axios.get("http://localhost:3001/BallotCategory")
    .then((res) => {
      const categoryData = [...res.data]
      console.log('categories: ', categoryData)
      this.setState({
        categories: categoryData,
        loading: false
      })
    })
  }

  static renderAuditLogPage(auditLog) {
    return(
      auditLog
    )
  }

  render() {
    const { auditLog, loading, categories: category } = this.state

    let contents = loading ? <p><em>Loading...</em></p> : AuditLog.renderAuditLogPage(auditLog)
    console.log('data: ', this.state)

    const categoryData = category.map((item, index) => {
      return(
        <tr key={index} className='header'>
          <td>{item.category}</td>
          <td>{item.subCategory}</td>
          <td>{item.description}</td>
          <td>{item.isTestdeck}</td>
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
                <th>Category</th>
                <th>SubCategory</th>
                <th>Description</th>
                <th>Testdecks</th>
              </tr>
            </thead>
            <tbody>
            {loading ? <tr><td colSpan="4"><em>Loading...</em></td></tr> : categoryData}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}