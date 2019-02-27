import React, { Component } from 'react'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import CardCaption from './CardCaption'
import Icon from '../Icon'
import classnames from 'classnames'
import { renderURL } from '../../redux/actions/act_fileUploader'
import { bFilter } from '../../redux/utils/utils'
import { likePost, toFavorite, deletePost } from '../../redux/actions/act_post'
import store from '../../redux/store';

let counter = 0;
class Card extends Component {
  state = {
    liked: false,
    favorite: false,
    likesCount: 0
  }

  likeHandler = (postId) => {
    likePost(postId); //api
    let liked = this.state.liked;
    let likesCount = this.state.likesCount;
    likesCount = liked ? likesCount - 1 : likesCount + 1;
    this.setState((ps) => ({ liked: !ps.liked, likesCount }))
  };

  likeHandlerIMG = (postId) => {
    if (++counter === 2) {
      this.likeHandler(postId)
      counter = 0
    }

  }


  faveHandler = (postId) => {
    this.setState(prevState => ({ favorite: !prevState.favorite }))
    toFavorite(postId)
  }

  setStatus = () => {
    const { post, user } = this.props;

    let likes = post.likes;
    let favorites = user.favorite;
    let liked = false;
    let favorite = false;
    let likesCount = likes.length;

    if (likesCount > 0) {
      let match = bFilter(likes, (e) => e._id === user['id']);
      liked = match.length > 0;

      match = bFilter(favorites, (e) => e === post._id);
      favorite = match.length > 0;
    }

    this.setState((ps) => ({
      likesCount,
      liked,
      favorite,
    }))
  }

  componentDidMount() {
    this.setStatus()
  }

  deletePost(postID) {
    store.dispatch(deletePost(postID));
  }

  render() {
    const { liked, favorite, likesCount } = this.state;
    const { owner, image, _id, caption } = this.props.post;
    return (
      <div className="EyeCard">
        <CardHeader logo={renderURL('avatar', owner.avatar)}
          owner={this.props.user['id'] === owner._id}
          onClick={this.deletePost.bind(this, _id)}
          author={owner.username} />
        <figure className='noSelect' onClick={() => this.likeHandlerIMG(_id)} >
          <img src={renderURL('post', image)} alt="Your pic!" />
          <Icon className={classnames("likeIMG", { "hide": !liked })}
            icon={"heartFull"} />
        </figure>
        <CardFooter faveHandler={this.faveHandler.bind(this, _id)} likeHandler={this.likeHandler.bind(this, _id)}
          state={{ liked, favorite }} />
        <CardCaption caption={caption} author={owner.username} likes={likesCount} />
      </div>
    )
  }
}

export default Card
