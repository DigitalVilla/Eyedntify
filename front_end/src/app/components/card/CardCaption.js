import React from 'react'

const CardCaption = ({body, author}) => {
  const likes = (body.likes).length;
  const likeTag = likes >= 2 ? likes+" Likes" : likes === 1 ? likes+" Like" : "";
  return (
    <div className="EyeCard__caption">
        <span className="likes">{likeTag}</span>
        <p className="caption">
          <span>{author}: </span>
          {body.caption}
        </p>
    </div>
  )
}

export default CardCaption
