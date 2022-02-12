import React, { useState } from 'react';
import ReadOnlyRow from '../ReadOnlyRow';
import EditableRow from '../EditableRow';

const SingleComment = ({ comment }) => {
    const [editFormData, setEditFormData] = useState('')
    const username = comment.User.username;
    // console.log("***USEER***", comment.User.username);


    return (
        <form>
                <>
                <span>{username}: {comment.comment}</span>
                    <EditableRow />
                    <ReadOnlyRow comment={comment} />
                </>
        </form>
    )
}
export default SingleComment;
