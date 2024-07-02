import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavMenu from './NavMenu';
import './Layout.css'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true,
      columnCount: 2
    }
    this.toggleSideBar = this.toggleSideBar.bind(this)
  }

  toggleSideBar() {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen,
      columnCount: prevState.sidebarOpen ? 1 : 2
    }))
  }

  componentDidMount() {
    this.toggleSideBar()
  }

  render() {
    return (
      <div className='main-container'>
      
        <div className='color-bar'>
          <h1 className='project-name'>Digital Ballot Platform</h1>
        </div>

        <Container fluid className='px-0'>
          <Row md={0} noGutters>
            <Col md={this.state.columnCount} className='nav-bar'>
              <NavMenu toggleSideBar={this.toggleSideBar} />
            </Col>
            <Col md={9} className={`main-content ${this.state.sidebarOpen ? 'shift-right' : 'shift-left'}`}>
              <main>{this.props.children}</main>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}