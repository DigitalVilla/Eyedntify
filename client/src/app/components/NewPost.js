import React, { Component } from 'react'
import CardHeader from '../components/card/CardHeader'
import CardFooter from '../components/card/CardFooter'
import { uploadImage, renderURL, renderLocal } from '../redux/actions/act_fileUploader'
import { connect } from 'react-redux';
import postImg from '../../img/holder_P.png';
class NewPost extends Component {

  state = {
    loading: false,
    postImg
  }
  // const upHandler =() => {
  //   upLoader();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile && nextProps.profile.profile) {
      const { following, followers, posts, favorite, user, intro } = nextProps.profile.profile;
      this.setState({ following, followers, posts, favorite, user, intro });
    }

    // if (nextProps.uploads && nextProps.uploads.file)
    //   this.setState({ image: nextProps.uploads.file });

    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });
  }

  loadImage = (e) => {
    const image = e.target.files[0];
    if (image && image.type.indexOf('image') === 0) {
      renderLocal(image, (url) => {
        this.setState({postImg: url, postFile: image })
      })
      this.props.setImage(image)
    }
  }


  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        <div className="newPost__BG">
        </div>
        <div className="newPost">
          <CardHeader icon="cancel" action={this.props.cancel} logo={renderURL('avatar', this.props.avatar)} author={this.props.username} />

          <form className="uploader">

            <input type="file" id="uploader"
              onChange={this.loadImage} name="post"
              ref={fileInput => this.postPicture = fileInput} />

            <figure onClick={() => this.postPicture.click()} >
              <img id="file-image" src={renderURL('post', this.state.postImg)} alt="placeholder" className="" />

              {loading &&
                <div id="messages">
                  <progress className="progress" id="file-progress" value="0">
                    <span>0</span>%
              </progress>
                </div>
              }

            </figure>
            <textarea  onChange={this.props.onChange} placeholder="Write a caption in 144 characters or less!"
              className="textArea" maxLength="144" >
            </textarea>
          </form>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  uploads: state.uploads,
  profile: state.profile
});

export default connect(mapStateToProps, { uploadImage })(NewPost);
