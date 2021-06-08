import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = (props) => {
    const { auth, logout } = props;

    function AuthLinks() {
        return (
            <ul>
                <li>
                    <Link to="/profiles">Developers</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <i className="fas fa-user" />{" "}
                        <span className="hide-sm"> Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={logout} to="/login">
                        <i className="fas fa-sign-out-alt" />{" "}
                        <span className="hide-sm">Logout</span>
                    </Link>
                </li>
            </ul>
        );
    }

    function GuestLinks() {
        return (
            <ul>
                <li>
                    <Link to="/profiles">Developers</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            {!auth.loading && (
                <React.Fragment>
                    {auth.isAuthenticated ? <AuthLinks /> : <GuestLinks />}
                </React.Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
