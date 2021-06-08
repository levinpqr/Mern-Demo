import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUpdateProfile, getCurrentProfile } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";
import get from "lodash/get";

const UpdateProfile = (props) => {
    const { createUpdateProfile, history, profile, getCurrentProfile } = props;
    const [formData, setFormData] = React.useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        github_username: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    });

    const {
        company,
        website,
        location,
        status,
        skills,
        github_username,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    React.useEffect(() => {
        if (!get(profile, "profile", undefined)) {
            getCurrentProfile();
        } else {
            const prof = get(profile, "profile", undefined);
            const social = get(profile, "profile.social", {});
            const skills = get(profile, "profile.skills", []);
            setFormData({
                company: prof.company || "",
                website: prof.website || "",
                location: prof.location || "",
                status: prof.status || "",
                skills: skills.length ? skills.join(",") : "",
                github_username: prof.github_username || "",
                bio: prof.bio || "",
                twitter: social.twitter || "",
                facebook: social.facebook || "",
                linkedin: social.linkedin || "",
                youtube: social.youtube || "",
                instagram: social.instagram || "",
            });
        }
    }, [profile, getCurrentProfile]);

    const [socialMedia, toggleSocialMedia] = React.useState(false);

    const onChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createUpdateProfile(formData, history, true);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <React.Fragment>
            <h1 className="large text-primary">Update Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <select name="status" onChange={onChange} value={status}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">
                            Junior Developer
                        </option>
                        <option value="Senior Developer">
                            Senior Developer
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">
                            Student or Learning
                        </option>
                        <option value="Instructor">
                            Instructor or Teacher
                        </option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        onChange={onChange}
                        value={company}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        onChange={onChange}
                        value={website}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        onChange={onChange}
                        value={location}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        onChange={onChange}
                        value={skills}
                    />
                    <small className="form-text">
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="github_username"
                        onChange={onChange}
                        value={github_username}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include
                        your username
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        onChange={onChange}
                        value={bio}
                    ></textarea>
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>

                <div className="my-2">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => toggleSocialMedia(!socialMedia)}
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {socialMedia && (
                    <React.Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                onChange={onChange}
                                value={twitter}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                onChange={onChange}
                                value={facebook}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                onChange={onChange}
                                value={youtube}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                onChange={onChange}
                                value={linkedin}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                onChange={onChange}
                                value={instagram}
                            />
                        </div>
                    </React.Fragment>
                )}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </React.Fragment>
    );
};

UpdateProfile.propTypes = {
    createUpdateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {
    createUpdateProfile,
    getCurrentProfile,
})(withRouter(UpdateProfile));
