import { csrfFetch } from './csrf';

const FAVORITE = 'images/FAVORITE';
const UNFAVORITE = 'images/UNFAVORITE'
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';

const favorite = (image, userId) => {
  return {
    type: FAVORITE,
    image,
    userId
  }
}

const unfavorite = (image, userId) => {
  return {
    type: UNFAVORITE,
    image,
    userId
  }
}

const loadFavorites = (images) => {
  return {
    type: LOAD_FAVORITES,
    images
  }
}


export const addFavorites = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  if (response.ok) {
    return;
  } else {
    const errors = await response.json();
    console.log(errors.errors);
  }
};

export const deleteFavorites = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/`, {
    method: 'DELETE',
    body: JSON.stringify(data)
  })

  if (response.ok) {
    return;
  } else {
    const errors = await response.json();
    console.log(errors.errors);
  }
};

export const loadFavoriteImages = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/`)

  if (response.ok) {
    const favorites = await response.json();
    dispatch(loadFavorites(favorites));
  } else {
    const errors = await response.json();
    console.log(errors.errors);
  }
}


const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FAVORITES: {
      const newState = {};
      action.images.forEach((image) => {
        newState[image.id] = image;
      })
      return newState;
    }

    case FAVORITE: {
      return { [action.image.id]: action.image, ...state };
    }

    case UNFAVORITE: {
      const newState = { ...state };
      delete newState[action.image.id]
      return newState;
    }

    default:
      return state;
  }
}


export default favoritesReducer;
