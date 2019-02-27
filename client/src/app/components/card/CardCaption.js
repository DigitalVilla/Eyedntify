import React from 'react'

const CardCaption = ({ likes, caption, author }) => {
  const likeTag = likes >= 2 ? likes + " Likes" : likes === 1 ? likes + " Like" : "";
  return (
    <div className="EyeCard__caption">
      <span className="likes">{likeTag}</span>
      <p className="caption">
        <span>{author}: </span>
        {caption}
      </p>
    </div>
  )
}

export default CardCaption
