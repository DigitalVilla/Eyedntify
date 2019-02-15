import React, { Component } from 'react'
import classnames from 'classnames'

let speed = 150;
let pid1;
let pid2;
export default class spinning extends Component {
  state = {
    spinning: true,
    still: 'myid0',
    marginTop: "-3.8rem",
  }

  componentDidMount() {
    this.spinning();
    pid1 = setInterval(() => this.spinning(), speed * 6);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.spinning){
      this.unload()
      clearInterval(pid1)
      clearTimeout(pid2);
      setTimeout(() => {
        this.setState({ spinning: 'none' })
      }, 500);
    } 
  }

  componentWillUnmount() {
    clearInterval(pid1)
      clearTimeout(pid2);
  }

  spinning = (showMenu) => {
    this.animate(0);
  }

  unload = () => {
    let container = document.getElementById("loadingScreen");
    container.classList.toggle("fadeOut")
  }

  animate = (a) => {
    for (let i = 1; i <= 5; i++) {
      pid2 = setTimeout(() => {

        let still = 1 === 4 ? 'myColibri4c' : 'myColibri' + i;
        let marginTop = 1 === i ? '0'
          : 3 === i ? '2rem'
            : 5 === i ?  '1rem' :
              this.state.marginTop;
        this.setState({ still, marginTop })
      }, a += speed);
    }
    this.setState({ still: 'myColibri0', marginTop: '0'})
  }



  render() {
    console.log("spinning ender");
    const { still, spinning, marginTop } = this.state;
      return (
        <div id='SpinnerBtn' style={{display: spinning?'block': 'none'}}>
          <div id='SpinnerBird'
            style={{ marginTop }}
            className={classnames("myColibri0", { [still]: spinning })}>
          </div>
        </div>
      )
  }
}

