import { csrfFetch } from './csrf';

const LOAD = 'images/LOAD';
const CREATE = 'images/CREATE';
const DELETE = 'images/DELETE';
const EDIT = 'images/EDIT'
const FAVORITE = 'images/FAVORITE';
const UNFAVORITE = 'images/UNFAVORITE'
const LOAD_FAVORITES = 'favorites/LOAD_FAVORITES';

const loadImages = images => ({
    type: LOAD,
    images
});

const createImage = image => ({
    type: CREATE,
    image
});

const deleteImage = image => ({
    type: DELETE,
    image
});

const editImage = image => ({
    type: EDIT,
    image
});

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

const loadFavorites = (favoriteImages) => {
    return {
        type: LOAD_FAVORITES,
        favoriteImages
    }
}


export const getImages = () => async dispatch => {
    const res = await csrfFetch(`/api/images`);
    if (res.ok) {
        const images = await res.json();
        dispatch(loadImages(images));
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


export const addImage = formData => async dispatch => {
    const res = await csrfFetch(`/api/images`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    });
    if (res.ok) {
        const image = await res.json();
        dispatch(createImage(image));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


export const eraseImage = data => async dispatch => {
    const res = await csrfFetch(`/api/images/`, {
        method: "DELETE",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        dispatch(deleteImage(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};

export const editDescription = data => async dispatch => {
    const res = await csrfFetch(`/api/images/`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        dispatch(editImage(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};

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

export const getFavoriteImages = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/favorites/`)

    if (response.ok) {
        const favorites = await response.json();
        dispatch(loadFavorites(favorites));
    } else {
        const errors = await response.json();
        console.log(errors.errors);
    }
}


const initialState = { favoritesPage: {} };

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {};
            action.images.forEach(image => {
                newState[image.id] = image;
            })
            return newState;
        }

        case LOAD_FAVORITES: {
            const allFavorites = {};
            action.favoriteImages.forEach((image) => {
                allFavorites[image.id] = image;
            })
            const newState = { ...state, favoritesPage: { ...allFavorites } }
            return newState;
        }
        // TODO CASE for favorites

        // case FAVORITE: {
        //     const newState = {
        //         ...state, [action.image.id]: {
        //             ...state[action.image.id], Favorites: [...state[action.image.id].Favorites, { userId: action.userId, imageId: action.image.id }
        //             ]
        //         }
        //     };
        //     return newState;
        // }

        // case UNFAVORITE: {
        //     const newState = {
        //         ...state, [action.imageId]: { ...state[action.image.id], Favorites: [...state[action.image.id].Favorites] }
        //     }
        //     return newState;
        // }

        case CREATE: {
            return { [action.image.id]: action.image, ...state };
        }

        case DELETE: {
            const newState = { ...state };
            delete newState[action.image.id];
            return newState;
        }

        case EDIT: {
            const newState = { ...state, [action.image.id]: action.image }
            return newState;
        }

        default:
            return state;
    }
}

export default imageReducer;
