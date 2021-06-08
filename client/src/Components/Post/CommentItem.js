import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
import get from "lodash/get";

const CommentItem = (props) => {
    const { comment, deleteComment, auth, postId } = props;

    const loggedUserId = get(auth, "user_details._id", "");
    const commentUserId = get(comment, "user_id", "");
    const isSameUser = Boolean(
        loggedUserId && commentUserId && loggedUserId === commentUserId
    );
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${comment.user_id}`}>
                    <img className="round-img" src={comment.avatar} alt="" />
                    <h4>{comment.first_name + " " + comment.last_name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{comment.text}</p>
                <p className="post-date">
                    <Moment format="YYYY/MM/DD">{comment.date_created}</Moment>
                </p>
                {isSameUser && (
                    <button
                        onClick={(e) => deleteComment(postId, comment._id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
