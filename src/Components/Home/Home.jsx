import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <>
      <Link className='btn btn-danger m-3' to={'/login'}>login</Link>
      <Link className='btn btn-danger m-3' to={'/register'}>register</Link>
      <Link className='btn btn-danger m-3' to={'/instructor'}>Instructor</Link>
      </>
    )
  }
}
