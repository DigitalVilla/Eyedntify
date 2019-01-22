import React from 'react'
import Card from './card'
import {Consumer} from '../Context'

const Cards = () => {
    return (
      <Consumer>
        {value => {
          const {dispatch, cards} = value;
          return (
            <React.Fragment>
              {
                cards.map((c) => {
                  return <Card key={c.id} body={c} dispatch={dispatch}/>
                })
              }
            </React.Fragment>
          )
        }}
      </Consumer>
    )
}
export default Cards
