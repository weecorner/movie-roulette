import axios from 'axios'
import store from '../store'
import {browserHistory} from 'react-router'

//Constants
const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS'
const ADD_MOVIE = 'ADD_MOVIE'
const REMOVE_MOVIE = 'REMOVE_MOVIE'

export const receiveWatchLists = watchLists => ({
  type: RECEIVE_WATCHLISTS,
  watchLists
})

// export const receiveMovie = movie => ({
//   type: RECEIVE_MOVIE,
//   movie
// })

export const addNewMovie = movie => {
  return (dispatch, getState) => {
    const user = getState().auth
    return axios.post(`/api/watch-list/${user.id}`, {movieId: movie.id})
      .then(res => res.data)
      .then(movie => {
        const newWatchLists = getState().watchLists.list.concat([movie])
        dispatch(receiveWatchLists(newWatchLists))
        browserHistory.push('/watchList')
      })
  }
}