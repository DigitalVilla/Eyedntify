import React, { Component } from 'react'
import classnames from 'classnames'

export default class spinning extends Component {
  constructor(props) {
    super(props)
    this.speed = 200;
    this.pid1 = '';
    this.pid2 = '';

    this.state = {
      still: 'myid0',
      spinning: false,
      marginTop: "-3.8rem",
    }
  }

  componentDidMount() {
    // this.spinning();
    //  this.pid1 = setInterval(() => this.spinning(),  this.speed * 6);
  }
  componentWillReceiveProps(nextProps) {

    if (this.state.spinning && !nextProps.spinning) {
      this.relaod(false)
      clearInterval(this.pid1)
      clearTimeout(this.pid1);
      setTimeout(() => {
        this.setState({ spinning: false })
      }, 1000);
    } else if (!this.state.spinning && nextProps.spinning) {
      this.setState({ spinning: true })
      this.spinning();
      this.relaod(true)
      this.pid1 = setInterval(() => this.spinning(), this.speed * 6);
    }
  }

  componentWillUnmount() {
    clearInterval(this.pid1)
    clearTimeout(this.pid1);
  }

  spinning = (showMenu) => {
    this.animate(0);
  }

  relaod = (laod) => {
    let bird = document.getElementById("SpinnerBtn");
    if (laod) {
      bird.classList.remove("fadeOut")
      bird.classList.add("fadeIn")
    } else {
      bird.classList.remove("fadeIn")
      bird.classList.add("fadeOut")
    }
  }

  animate = (a) => {
    for (let i = 1; i < 5; i++) {
      this.pid1 = setTimeout(() => {

        let still = 1 === 4 ? 'myColibri4c' : 'myColibri' + i;
        let marginTop = 1 === i ? '0'
          : 3 === i ? '1rem'
            : 5 === i ? '.5rem' :
              this.state.marginTop;
        this.setState({ still, marginTop })
      }, a += this.speed);
    }
    this.setState({ still: 'myColibri0', marginTop: '0' })
  }

  render() {
    console.log("spinning render");
    const { still, spinning, marginTop } = this.state;
    return (
      <div id='SpinnerBtn' className='fadeIn' style={{ display: spinning ? 'block' : 'none' }}>
        <div id='SpinnerBird'
          style={{ marginTop }}
          className={classnames("myColibri0", { [still]: spinning })}>
        </div>
      </div>
    )
  }
}
