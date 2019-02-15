import React, {Component} from 'react'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import CardCaption from './CardCaption'
import Icon from '../Icon'
import classnames from 'classnames'
import {renderURL} from '../../redux/actions/act_fileUploader'
import {binarySearch} from '../../redux/utils/utils'


let counter = 0;
class Card extends Component {
  state = {
    liked : false,
    favorite: false
  }


  likeHandler = (e) => {
    if (e.target.nodeName !=='BUTTON' && ++counter === 2) {
      this.setState({liked: !this.state.liked})
      // dispatch({ type: 'LIKE_IMAGE', payload: body.id })
      counter = 0
    } else if (e.target.nodeName ==='BUTTON' )
    this.setState({liked: !this.state.liked})
  }

  faveHandler = () => {
      this.setState({favorite: !this.state.favorite})
      // dispatch({ type: 'LIKE_IMAGE', payload: body.id })
    }

  setStatus= () => {
    let array = this.props.body.likes;
    console.log('card', array);
    console.log('card', this.props.user['id']);
    let found = false;
    if (array.length > 0) {
      let found =  binarySearch(array, this.props.user['id']) >= 0;
      console.log( found);
    }
  }

componentDidMount() {
  this.setStatus()
}

render() {
  const {liked, favorite} = this.state; 
  const {owner, image  } = this.props.body; 
  return (
    <div className="EyeCard">
      <CardHeader logo={renderURL('avatar', owner.avatar)} author={owner.username} />
      <figure onClick={this.likeHandler} >
        <img src={renderURL('post',image)}  alt="Your pic!" />
          <Icon
            className={classnames({ "hide": !liked })}
            icon={"heartFull"} />
      </figure>
      <CardFooter faveHandler={this.faveHandler} likeHandler={this.likeHandler}
      state={{liked, favorite}} body={this.props.bodyy} />
      <CardCaption author={owner.username} body={this.props.body} />
    </div>
  )
}
}

export default Card
