import React, { useReducer } from 'react';

const SingleComment = ({ comment }) => {
    const username = comment.User.username;
    return (
        <div className='single-comment-div'>
            <p>{username}: {comment.comment}</p>
        </div>
    )
}
export default SingleComment;
