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
    const res = await csrfFetch(`/api/images/${data.id}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(deleteImage(data.id));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


// TODO REDUCERS

// const imageReducer = (state = initialState, action) => {
//     switch (action.type)
//         case LOAD: {
//         const newState = {};
//         }
//     default:
//         return state;
// }
