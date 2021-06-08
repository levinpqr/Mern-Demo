import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import get from "lodash/get";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experiences from "./Experiences";
import Educations from "./Educations";

function ProfileComponent({ profile, deleteAccount }) {
    if (!profile)
        return (
            <React.Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </React.Fragment>
        );
    return (
        <React.Fragment>
            <DashboardActions />
            <Experiences experiences={profile.experiences || []} />
            <Educations educations={profile.education || []} />
            <div className="my-2">
                <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                >
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>
        </React.Fragment>
    );
}

const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount }) => {
    React.useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const { user_details } = auth;

    let welcomeString = "Welcome!";
    if (user_details && user_details.first_name) {
        welcomeString = `Welcome, ${user_details.first_name}!`;
    }
    const usr_profile = get(profile || {}, "profile", undefined);

    return (
        <React.Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"> {" " + welcomeString}</i>
            </p>
            <ProfileComponent
                profile={usr_profile}
                deleteAccount={deleteAccount}
            />
        </React.Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
