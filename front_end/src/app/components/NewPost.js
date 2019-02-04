import React from 'react'
import CardHeader from '../components/card/CardHeader'
import sprite from '../../img/sprite.svg'

export default function NewPost(props) {

  // const upHandler =() => {
  //   upLoader();
  // }

  return (
    <React.Fragment>
      <div className="newPost__BG">
      </div>
      <div className="newPost">
        <CardHeader icon="cancel" action={props.action} logo={props.logo} author={props.username} />
        <form id="file-upload-form" className="uploader">
          <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
          <label htmlFor="file-upload" id="file-drag">
            <img id="file-image" src="#" alt="Preview" className="hidden" />
            <div id="start">
              <svg id="file-upload-btn">
                <use
                  href={sprite + '#icon-photo'}>
                </use>
              </svg>
              <div className="caption"><span>Eyedentify the world!</span></div>
              <div id="notimage" className="hidden">Please select an image</div>

            </div>
            <div id="response" className="hidden">
              <div id="messages"></div>
              <progress className="progress" id="file-progress" value="0">
                <span>0</span>%
              </progress>
            </div>
          </label>
          <textarea placeholder="Write a caption in 144 characters or less!" className="textArea" maxLength="144" >
          
          </textarea>
          <div className="stats"></div>
        </form>
      </div>
    </React.Fragment>
  )
}
