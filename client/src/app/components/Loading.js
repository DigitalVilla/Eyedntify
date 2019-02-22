import React, { Component } from 'react'
import classnames from 'classnames'

let pid1, pid2, speed = 150;

export default class Loading extends Component {

  state = {
    loading: 'block',
    still: 'myid0',
    opacity: "-3.8rem"
  }

  componentDidMount() {
    this.loading();
    pid1 = setInterval(() => this.loading(), speed * 9);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      clearInterval(pid1)
      clearTimeout(pid2);
      this.unload()
      setTimeout(() => {
        this.setState({ loading: 'none' })
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(pid1)
    clearTimeout(pid2);
  }

  loading = (showMenu) => {
    this.animate(0);
  }

  unload = () => {
    let container = document.getElementById("loadingScreen");
    container.classList.add("fadeOut")
  }

  animate = (a) => {
    for (let i = 1; i <= 8; i++) {
      pid2 = setTimeout(() => {
        let still = "myid" + i;
        let opacity = 1 === i ? .9
          : 3 === i ? 1
            : 8 === i ? .8 :
              this.state.opacity;
        this.setState({ still, opacity })
      }, a += speed);
    }
    this.setState({ still: 'myid0', opacity: .7 })
  }

  render() {
    const { still, loading, opacity } = this.state;
    return (
      <div id='loadingScreen' style={{ display: loading }}>
        <div id='loadingBird'
          style={{ opacity }}
          className={classnames("myid0", { [still]: loading })}>
        </div>
        <h1>© Digital Villa</h1>
      </div>
    )
  }
}
