import { csrfFetch } from './csrf';

const FAVORITE = 'favorites/FAVORITE';
const UNFAVORITE = 'favorites/UNFAVORITE'
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';
const IMAGE_FAVORITES = 'favorites/IMAGE_FAVORITES';


const addFavorite = (favorite) => {
  return {
    type: FAVORITE,
    favorite,
  }
}

const removeFavorite = (favorite) => {
  return {
    type: UNFAVORITE,
    favorite,
  }
}

const userFavorites = (favorites) => {
  return {
    type: LOAD_FAVORITES,
    favorites
  }
}

const imageFavorites = (favorites) => {
  return {
    type: IMAGE_FAVORITES,
    favorites
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
    dispatch(addFavorite(favoritedImage));
    return favoritedImage;
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
};

export const deleteFavorites = ({ id }) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/${id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    const unFavoritedImage = await res.json();
    console.log('unFavoritedImage', unFavoritedImage);
    dispatch(removeFavorite(unFavoritedImage));
    return;
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
};

export const loadFavoriteImages = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/image/${id}`)
  if (res.ok) {
    const favorites = await res.json();
    dispatch(imageFavorites(favorites));
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
}

export const loadUserFavorites = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/${userId}`)
  if (res.ok) {
    const favorites = await res.json();
    dispatch(userFavorites(favorites));
  } else {
    const errors = await res.json();
    console.log(errors.errors);
  }
}



const initialState = { user: {}, images: {} };

const favoritesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case IMAGE_FAVORITES: {
      newState = { user: { ...state.user } };
      const imageFavorites = {}
      action.favorites.forEach(favorite => {
        imageFavorites[favorite.userId] = favorite;
      })
      newState.images = imageFavorites;
      return newState;
    }

    case LOAD_FAVORITES: {
      newState = { images: { ...state.images } }
      const userFavorites = {}
      action.favorites.forEach(favorite => {
        userFavorites[favorite.imageId] = favorite;
      })
      newState.user = userFavorites;
      return newState;
    }

    case FAVORITE: {
      const newState = { user: { ...state.user }, images: { ...state.images } };
      newState.user[action.favorite.id] = action.favorite
      newState.images[action.favorite.id] = action.favorite
      return newState
    }

    case UNFAVORITE: {
      const newState = { user: { ...state.user }, images: { ...state.images } };
      delete newState.user[action.favorite.id]
      delete newState.images[action.favorite.id]
      return newState;
    }

    default:
      return state;
  }
}


export default favoritesReducer;
