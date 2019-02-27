import { IS_LOADING, HAS_LOADED, START_SPINNING, DONE_SPINNING } from './types';

// Register User
export const hasLoaded = () => dispatch => dispatch({ type: HAS_LOADED });
export const isLoading = () => dispatch => dispatch({ type: IS_LOADING });