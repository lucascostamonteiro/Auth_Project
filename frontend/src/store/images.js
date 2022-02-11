import { csrfFetch } from './csrf';

const LOAD = 'images/LOAD';
const CREATE = 'images/CREATE';
const DELETE = 'images/DELETE';
const EDIT = 'images/EDIT'

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
        dispatch(createImage(data));
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
        console.log('DATA', data);
        dispatch(editImage(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {};
            action.images.forEach(image => {
                newState[image.id] = image;
            })
            // TODO REVERSE
            // action.images.reverse();
            // console.log('+++IMAGES+++', action.images)
            return newState;
        }

        case CREATE: {
            const newState = { [action.image.id]: action.image, ...state };
            return newState
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
