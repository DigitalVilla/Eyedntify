import React from 'react'
import Eyedntify, { setTitle } from '../components/Eyedntify';
import { hasLoaded, isLoading } from '../redux/actions/act_loader'
import { connect } from 'react-redux';

const Error404 = (props) => {
  setTitle('Error 404');

  // console.log('Error', props);

  // setTimeout(() => {
  //   props.hasLoaded();
  // }, 1000);

  return (
    <Eyedntify >
      <div className='container'>
        error 404
      </div>
    </Eyedntify>
  )
}
const mapStateToProps = state => ({
  loader: state.loader
});

const mapDispatchToProps = (dispatch) => ({
  hasLoaded: () => dispatch(hasLoaded()),
  isLoading: () => dispatch(isLoading())
})


export default connect(mapStateToProps, mapDispatchToProps)(Error404)
