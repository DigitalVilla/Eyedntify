import React from 'react'
import Icon from '../components/Icon'


export default function searchBox(props) {

    return (
        <div className="searchBar">
            <input type="text"
                onChange={(event) => props.onChange(event.target.value)}
                value={props.value}
                className="searchBar__input"
                placeholder={props.placeholder} />
            <Icon icon="search"
                className="searchBar__icon" />
        </div>
    )
}
