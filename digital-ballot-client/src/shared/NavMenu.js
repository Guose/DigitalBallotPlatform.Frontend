import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavMenuData } from './NavMenuData'
import * as MdIcons from 'react-icons/md'
import { IconContext } from 'react-icons'
import './NavMenu.css';

export default class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      sidebar: false
    }
    this.toggleNavBar = this.toggleNavBar.bind(this)
  }

  componentDidMount() {
    this.toggleNavBar()
  }

  toggleNavBar() {
    this.setState((prevState) => ({
        collapsed: !prevState.collapsed,
        sidebar: !prevState.sidebar
    }))
    this.props.toggleSideBar()
  }

  render() {
    return (
        <IconContext.Provider value={{color: '#ffffff'}}>
            <div className='navbar'>
                <ul>
                    <li className='list-items'>
                        <Link to='#' className='menu-bars'>
                            <MdIcons.MdKeyboardDoubleArrowRight onClick={this.toggleNavBar} />                
                        </Link>
                    </li>
                {NavMenuData.map((item, index) => (
                    <li key={index} className='navbar-icons'>
                        <Link to={item.path}>
                            {item.icon}
                        </Link>
                    </li>
                ))}
                </ul>                
            </div>

            <nav className={this.state.sidebar  ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-close'> 
                            <MdIcons.MdKeyboardDoubleArrowLeft className='close-icon' onClick={this.toggleNavBar} />
                        </Link>
                    </li>
                {NavMenuData.map((item, index) => (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span className={this.state.collapsed  ? 'show' : 'hide'}>{item.title}</span>
                        </Link>
                    </li>
                ))}
                </ul>
            </nav>
        </IconContext.Provider>     
    )
  }
}