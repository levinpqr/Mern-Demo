import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = (props) => {
    const { addComment, postId } = props;

    const [text, setText] = React.useState("");

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment...</h3>
            </div>
            <form
                className="form my-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    addComment(postId, { text });
                    setText("");
                }}
            >
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Add a comment"
                    required
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></textarea>
                <input
                    type="submit"
                    className="btn btn-dark my-1"
                    value="Submit"
                />
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
