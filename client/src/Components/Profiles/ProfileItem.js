import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProfileItem = (props) => {
    const { profile } = props;
    const { user_details, status, company, location, skills } = profile;
    const {
        first_name,
        middle_name,
        suffix,
        last_name,
        avatar,
        _id,
    } = user_details;

    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>
                    {last_name}, {first_name + " " + middle_name}
                    {suffix ? ", " + suffix : ""}
                </h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                {location && (
                    <p>
                        <span>from {location}</span>
                    </p>
                )}
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default connect()(ProfileItem);
