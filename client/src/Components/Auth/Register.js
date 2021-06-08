import React from "react";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../../API/User";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../../actions/types";
import get from "lodash/get";
import { setLoading } from "../../actions/loading";

const Register = (props) => {
    const { setAlert, register, isAuthenticated, setLoading } = props;

    const [formData, setFormData] = React.useState({
        first_name: "",
        middle_name: "",
        suffix: "",
        last_name: "",
        email: "",
        password: "",
        passwordConf: "",
    });

    const {
        first_name,
        middle_name,
        suffix,
        last_name,
        email,
        password,
        passwordConf,
    } = formData;

    const onChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                first_name,
                middle_name,
                suffix,
                last_name,
                password,
                passwordConf,
                email,
            };
            setLoading(true);
            const res = await registerUser(payload);
            setLoading(false);
            register(REGISTER_SUCCESS, res.data);
        } catch (err) {
            const errors = get(err, "response.data.errors", undefined);
            if (errors) {
                err.response.data.errors.forEach((err) => {
                    setAlert(err.msg, "danger");
                });
            }
            console.log(err);
            register(REGISTER_FAIL);
        }
    };

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <React.Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={first_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Middle Name"
                        name="middle_name"
                        value={middle_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Suffix"
                        name="suffix"
                        value={suffix}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={last_name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="passwordConf"
                        minLength="6"
                        value={passwordConf}
                        onChange={onChange}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </React.Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, setLoading })(
    Register
);
