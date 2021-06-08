import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";

const ProfileAbout = ({ profile }) => {
    const bio = get(profile, "bio", "");
    const skills = get(profile, "skills", []);
    const first_name = get(profile, "user_details.first_name", "");

    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <React.Fragment>
                    <h2 className="text-primary">{first_name}'s Bio</h2>
                    <p>{bio}</p>
                    <div className="line"></div>
                </React.Fragment>
            )}
            {skills.length && (
                <React.Fragment>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">
                        {skills.map((skill, index) => (
                            <div className="p-1" key={index}>
                                <i className="fa fa-check"></i> {skill}
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
