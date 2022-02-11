import { csrfFetch } from './csrf';

const LOAD = 'comments/LOAD';
const CREATE = 'comments/CREATE';
const DELETE = 'comments/DELETE';
const EDIT = 'comments/EDIT'

const loadComments = comments => ({
    type: LOAD,
    comments
});

const createComment = comment => ({
    type: CREATE,
    comment
});

const deleteComment = comment => ({
    type: DELETE,
    comment
});

const editComment = comment => ({
    type: EDIT,
    comment
});


export const getComments = () => async dispatch => {
    const res = await csrfFetch(`/api/comments`);
    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments));
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


export const addComment = data => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        dispatch(createComment(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};


export const eraseComment = data => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: "DELETE",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        dispatch(deleteComment(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};

export const editPictureComment = data => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
    if (res.ok) {
        console.log('DATA', data);
        dispatch(editComment(data));
        return;
    } else {
        const errors = await res.json();
        console.log(errors.errors);
    };
};

// TODO REDUCER

const initialState = {};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default commentReducer;
