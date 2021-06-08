import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    getProfileByUsrId,
    getUserGithubRepositories,
} from "../../actions/profile";
import { Link } from "react-router-dom";
import get from "lodash/get";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = (props) => {
    const {
        getProfileByUsrId,
        getUserGithubRepositories,
        profile,
        auth: { isAuthenticated, user_details },
        match,
    } = props;

    const isAuth = Boolean(isAuthenticated);
    const auth_id = get(user_details, "_id", undefined);

    const profileView = get(profile, "profile", undefined);
    const prof_id = get(profileView, "user_details._id", undefined);

    const isMe = Boolean(isAuth && auth_id && prof_id && auth_id === prof_id);

    React.useEffect(() => {
        getProfileByUsrId(match.params.id);
    }, [getProfileByUsrId, match.params.id]);

    const [githubUsername, setGithubUsername] = React.useState("");

    React.useEffect(() => {
        const ghubUsername = get(profile, "profile.github_username", "");
        if (ghubUsername && !githubUsername) {
            setGithubUsername(ghubUsername);
            getUserGithubRepositories(ghubUsername);
        }
    }, [getUserGithubRepositories, profile, githubUsername]);

    if (!profileView) return <React.Fragment></React.Fragment>;

    const experiences = get(profileView, "experiences", []);
    const educations = get(profileView, "education", []);
    const ghubRepos = get(profile, "repos", []);

    return (
        <React.Fragment>
            <Link to="/profiles" className="btn btn-light">
                Back To Profiles
            </Link>
            {isMe && (
                <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>
            )}
            <div className="profile-grid my-1">
                <ProfileTop profile={profileView} />
                <ProfileAbout profile={profileView} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {experiences.length ? (
                        <React.Fragment>
                            {experiences.map((experience) => (
                                <ProfileExperience
                                    key={experience._id}
                                    experience={experience}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <h4>No experience credentials</h4>
                    )}
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {educations.length ? (
                        <React.Fragment>
                            {educations.map((education) => (
                                <ProfileEducation
                                    key={education._id}
                                    education={education}
                                />
                            ))}
                        </React.Fragment>
                    ) : (
                        <h4>No education credentials</h4>
                    )}
                </div>
                {Boolean(ghubRepos.length) && <ProfileGithub />}
            </div>
        </React.Fragment>
    );
};

Profile.propTypes = {
    getProfileByUsrId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getUserGithubRepositories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    getProfileByUsrId,
    getUserGithubRepositories,
})(Profile);
