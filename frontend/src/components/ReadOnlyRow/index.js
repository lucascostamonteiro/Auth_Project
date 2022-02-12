import React from "react";

const ReadOnlyRow = ({ comment, handleEditClick, handleDeleteClick }) => {
    return (
            <tr>
                {/* <td>{comment}</td> */}
                <td>
                    <button
                        type="button"
                    // onClick={(event) => handleEditClick(event, comment)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                    // onClick={() => handleDeleteClick(comment.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
    );
};

export default ReadOnlyRow;
