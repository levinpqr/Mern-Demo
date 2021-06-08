import React from "react";
import PropTypes from "prop-types";
import { getAllPosts } from "../../actions/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = (props) => {
    const { getAllPosts, post } = props;
    const { posts } = post;
    React.useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return (
        <React.Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map((p) => (
                    <PostItem key={p._id} post={p} />
                ))}
            </div>
        </React.Fragment>
    );
};

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
