import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { likeAPost, unlikeAPost, deleteAPost } from "../../actions/post";

const PostItem = (props) => {
    const { post, auth, likeAPost, unlikeAPost, deleteAPost, viewOnly } = props;
    const {
        user_id,
        _id,
        first_name,
        last_name,
        avatar,
        text,
        date_created,
        likes,
        comments,
    } = post;

    const loggedUserId = get(auth, "user_details._id", "");
    const isMe = Boolean(user_id && loggedUserId && loggedUserId === user_id);

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user_id}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{first_name + " " + last_name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on{" "}
                    <Moment format="YYYY/MM/DD">{date_created}</Moment>
                </p>
                {!viewOnly && (
                    <React.Fragment>
                        <button
                            onClick={() => likeAPost(_id)}
                            type="button"
                            className="btn btn-light"
                        >
                            <i className="fas fa-thumbs-up"></i>{" "}
                            <span>
                                {Boolean(likes && likes.length) && (
                                    <span>{likes.length}</span>
                                )}
                            </span>
                        </button>
                        <button
                            onClick={() => unlikeAPost(_id)}
                            type="button"
                            className="btn btn-light"
                        >
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary">
                            Discussion{" "}
                            {Boolean(comments && comments.length) && (
                                <span className="comment-count">
                                    {comments.length}
                                </span>
                            )}
                        </Link>
                        {isMe && (
                            <button
                                onClick={() => deleteAPost(_id)}
                                type="button"
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    viewOnly: false,
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    likeAPost: PropTypes.func.isRequired,
    unlikeAPost: PropTypes.func.isRequired,
    deleteAPost: PropTypes.func.isRequired,
    viewOnly: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    likeAPost,
    unlikeAPost,
    deleteAPost,
})(PostItem);
