import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles } from "../../actions/profile";
import get from "lodash/get";
import ProfileItem from "./ProfileItem";

const Profiles = (props) => {
    const { getAllProfiles, profile } = props;

    React.useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    const profiles = get(profile, "profiles", []);
    const profileList = profiles.length ? (
        profiles.map((prof) => <ProfileItem key={prof._id} profile={prof} />)
    ) : (
        <h4>No profiles found...</h4>
    );

    return (
        <React.Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i>Browse and connect with
                developers
            </p>
            <div className="profiles">{profileList}</div>
        </React.Fragment>
    );
};

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
