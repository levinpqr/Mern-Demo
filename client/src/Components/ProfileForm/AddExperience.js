import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import cloneDeep from "lodash/cloneDeep";

const AddExperience = (props) => {
    const { addExperience, history } = props;

    const [formData, setFormData] = React.useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData;

    const onChange = (e) => {
        if (e.target.name === "current") {
            setFormData({ ...formData, current: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let data = cloneDeep(formData);
        if (data.current) data.to = "";
        addExperience(data, history);
    };

    return (
        <React.Fragment>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        required
                        onChange={onChange}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        required
                        onChange={onChange}
                        value={company}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        onChange={onChange}
                        value={location}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        onChange={onChange}
                        value={from}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={current}
                            onChange={onChange}
                        />{" "}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        disabled={current}
                        value={to}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        onChange={onChange}
                        value={description}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </React.Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
