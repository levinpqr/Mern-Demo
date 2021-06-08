import React from "react";
import PropTypes from "prop-types";
import pick from "lodash/pick";
import get from "lodash/get";

const ProfileTop = (props) => {
    const {
        profile: { status, company, location, website, social, user_details },
    } = props;

    const details = pick(user_details, [
        "first_name",
        "middle_name",
        "suffix",
        "last_name",
        "avatar",
    ]);

    const { first_name, middle_name, suffix, last_name, avatar } = details;

    const full_name =
        first_name +
        " " +
        middle_name +
        " " +
        last_name +
        (suffix ? " " + suffix : "");

    const twitter = get(social, "twitter", undefined);
    const fb = get(social, "twitter", undefined);
    const linkedin = get(social, "linkedin", undefined);
    const youtube = get(social, "youtube", undefined);
    const ig = get(social, "instagram", undefined);

    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt="" />
            <h1 className="large">{full_name}</h1>
            <p className="lead">
                {status} {company && <span> at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}
                {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}
                {fb && (
                    <a href={fb} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}
                {linkedin && (
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}
                {youtube && (
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}
                {ig && (
                    <a href={ig} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileTop;
