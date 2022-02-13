import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReadOnlyRow from '../ReadOnlyRow';
import EditableRow from '../EditableRow';


const SingleComment = ({ comment }) => {
    const username = comment.User.username;
    const [editCommentId, setEditCommentId] = useState(null);
    const user = useSelector(state => state.session.user);
    // console.log('COMT', comment);

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditCommentId(user.id);
    }

    const handleDoneClick = () => {
        setEditCommentId(null);
    }


    return (
        <>
            <span>{username}: {comment.comment}</span>
            <>
                {editCommentId === user.id ? (
                    <EditableRow
                        comment={comment}
                        handleDoneClick={handleDoneClick}
                    />
                ) :
                    <ReadOnlyRow
                        comment={comment}
                        handleEditClick={handleEditClick}
                    />}

            </>
        </>
    )
}
export default SingleComment;
