import { csrfFetch } from './csrf';

const LOAD = 'images/LOAD';
const CREATE = 'images/CREATE';
const DELETE = 'images/DELETE';

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


export const addImage = data => async dispatch => {
    const res = await csrfFetch(`/api/images`, {
        method: "POST",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        const image = await res.json();
        dispatch(createImage(image));
        return image;
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
        const image = await res.json();
        dispatch(deleteImage(image));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


// TODO REDUCER

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {};
            action.images.forEach(image => {
                newState[image.id] = image;
            })
            return newState;
        }

        case CREATE: {
            const newState = { [action.image.id]: action.image, ...state };
            return newState;
        }

        case DELETE: {
            const newState = { ...state };
            delete newState[action.imageId];
            return newState;
        }

        default:
            return state;
    }
}

export default imageReducer;
