import React, { Component } from 'react'
import Icon from '../components/Icon'
import {Link} from 'react-router-dom'
export default class Profile extends Component {
  render() {
    return (
      <div className="container camera">
        <div className="grid">
        <div className="row"></div>
        <div className="col"></div>
        </div>
        <div className="topController">
          <Icon className="iCam md" icon="flash_on" />
          <Icon className="iCam md" icon="retweet" />
          <Icon className="iCam lg" icon="iso" />
          <Icon className="iCam md" icon="whiteBal" />
          <Link to="/home">
          <Icon className="iCam lg" icon="return" />
          </Link>
        </div>
        <div className="botController">
          <Icon className="iCam lg" icon="mic" />
          <Icon className="iCam xl" icon="shutter" />
          <Icon className="iCam lg" icon="video" />
        </div>
        <div className="gallery">
          
        </div>
      </div>
    )
  }
}
