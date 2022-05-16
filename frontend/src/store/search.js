import { csrfFetch } from './csrf';

const LOAD_SEARCH = 'search/LOAD_SEARCH';

const load = (results) => ({
  type: LOAD_SEARCH,
  images: results
})

export const loadSearch = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/search/${data.searchQuery}`);

  if (response.ok) {
    const results = await response.json();
    dispatch(load(results));
  } else {
    const errors = await response.json();
    console.log(errors.errors);
  }
}

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SEARCH: {
      const newState = {};
      action.images.forEach(image => {
        newState[image.id] = image;
      });

      return { ...newState }
    }

    default:
      return state;
  }
}

export default searchReducer;
