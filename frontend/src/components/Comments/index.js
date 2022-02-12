import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../store/comments";
import SingleComment from "../SingleComment";
import './Comments.css';

function Comments({ image }) {
    const dispatch = useDispatch();
    const commentsObj = useSelector(state => state.comments);
    const comments = Object.values(commentsObj);
    const user = useSelector((state) => state.session.user);
    const [commentData, setCommentData] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const validate = () => {
        const validationErrors = [];
        if (!commentData.length) validationErrors.push('Please provide a comment');
        return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (errors.length > 0) return setValidationErrors(errors);
        const data = { userId: user.id, commentData };
        console.log('DATA', data)
        await dispatch(addComment(data))
    };


    useEffect(() => {
        dispatch(getComments(image.id))
    }, [dispatch, image.id]);

    return (
        <div className="comments-div">
            <div>
                <ul>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
            <h3>Comments</h3>
            {comments?.map((comment) => (
                <span>
                    <SingleComment key={comment.id} comment={comment} />
                </span>
            ))}
            <form className="form-comment">
                <textarea
                    name="new-comment"
                    className="new-comment-box"
                    value={commentData}
                    onChange={(e) => setCommentData(e.target.value)}
                    placeholder="Leave a comment"
                    required>
                </textarea>
                <button
                    className="comment-button"
                    type="submit"
                    onClick={handleSubmit}
                >Submit Comment
                </button>
            </form>
        </div>
    )
}

export default Comments;
