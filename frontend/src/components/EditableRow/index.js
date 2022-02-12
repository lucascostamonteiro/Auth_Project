import React from "react";

const EditableRow = ({ commentData, handleEditFormChange, handleCancelClick }) => {
    return (
            <tr>
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter new comment..."
                        name="comment"
                    // value={commentData.comment}
                    // onChange={handleEditFormChange}
                    ></input>
                </td>
                <td>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </td>
            </tr>
    );
};

export default EditableRow;
