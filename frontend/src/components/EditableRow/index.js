import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { editPictureComment } from '../../store/comments';
import './EditableRow.css'

const EditableRow = ({ comment, handleDoneClick }) => {
    const dispatch = useDispatch();
    const [editCommentData, setEditCommentData] = useState(comment.comment);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: comment.id,
            comment: editCommentData,
            imageId: comment.imageId,
            userId: comment.userId
        }
        dispatch(editPictureComment(data));
    }

    return (
        <>
            <form onSubmit={handleEditSubmit}>
                <>
                    <tr>
                        <td>
                            <input
                                type="text"
                                required="required"
                                placeholder="Enter new comment..."
                                name="comment"
                                value={editCommentData}
                                onChange={(e) => setEditCommentData(e.target.value)}
                            >
                            </input>
                        </td>
                        <td >
                            <button
                                className="submit-edit-cmt-button"
                                type="submit"
                            >
                                Submit
                            </button>
                            <button
                                className="done-edit-button"
                                type="button"
                                onClick={handleDoneClick}>
                                Done
                            </button>
                        </td>
                    </tr>
                </>
            </form>
        </>
    );
};

export default EditableRow;
