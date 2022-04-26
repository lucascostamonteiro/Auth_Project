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
  const res = await csrfFetch(`/api/favorites/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const favoritedImage = await res.json();
    dispatch(favorite(favoritedImage));
    return favoritedImage;
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
};

export const deleteFavorites = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const unFavoritedImage = await res.json();
    dispatch(unfavorite(id));
    return;
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
};

export const loadFavoriteImages = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/`)
  if (res.ok) {
    const favorites = await res.json();
    dispatch(loadFavorites(favorites));
  } else {
    const errors = await res.json();
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
      delete newState[action.image]
      return newState;
    }

    default:
      return state;
  }
}


export default favoritesReducer;
