import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAPost } from "../../actions/post";
import PostItem from "../Posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = (props) => {
    const { getAPost, post, match } = props;

    React.useEffect(() => {
        if (match.params.id) getAPost(match.params.id);
    }, [getAPost, match.params.id]);

    if (!post || !post.post) return <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post.post} viewOnly />
            <CommentForm postId={post.post._id} />
            <div className="comments">
                {post.post.comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post.post._id}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

Post.propTypes = {
    getAPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getAPost })(Post);
