import React from 'react'
import EyeBtn from '../components/EyeBtn'
import classnames from "classnames";
export default function searchBox(props) {

  // console.log(props.toSearch);

  return (
    <div className={classnames("searchBar", {
      "searchBar__active": props.toSearch
    })}>
      <div className={classnames("searchBar__bg", {
        "active": props.toSearch
      })}>

        <input type="text"
          onChange={(event) => props.onChange(event.target.value)}
          value={props.value}
          className="searchBar__input"
          placeholder={props.placeholder} />
      </div>
      <EyeBtn icon={true ? "search" : "upload"}
        onClick={props.onClick} />
    </div>
  )
}
