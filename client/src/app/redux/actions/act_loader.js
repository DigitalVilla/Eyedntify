import { IS_LOADING, HAS_LOADED, START_SPINNING, DONE_SPINNING } from './types';

// Register User
export const hasLoaded = () => dispatch => dispatch({ type: HAS_LOADED });
export const isLoading = () => dispatch => dispatch({ type: IS_LOADING });
export const startSpin = () => dispatch => dispatch({ type: START_SPINNING });
export const stopSpin = () => dispatch => dispatch({ type: DONE_SPINNING });
