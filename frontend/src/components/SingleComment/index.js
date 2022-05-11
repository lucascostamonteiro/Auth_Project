import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReadOnlyRow from '../ReadOnlyRow';
import EditableRow from '../EditableRow';
import './SingleComment.css'


const SingleComment = ({ comment }) => {
    const username = comment.User.username;
    const [editCommentId, setEditCommentId] = useState(null);
    const user = useSelector(state => state.session.user);


    // console.log('DEBUG ++', comment)

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditCommentId(user.id);
    }

    const handleDoneClick = () => {
        setEditCommentId(null);
    }


    return (
        <div className='comment-main'>
            <div className='span-comment'><span className='username-comment'>{username}:</span> <span className='comment-content'>{comment.comment}</span></div>
            <div className='edit-buttons-comment'>
                {editCommentId === user.id ? (
                    <EditableRow
                        className="editable-button"
                        comment={comment}
                        handleDoneClick={handleDoneClick}
                    />
                ) :
                    <ReadOnlyRow
                        className="read-button-edit"
                        comment={comment}
                        handleEditClick={handleEditClick}
                    />}
            </div>
        </div>
    )
}
export default SingleComment;
