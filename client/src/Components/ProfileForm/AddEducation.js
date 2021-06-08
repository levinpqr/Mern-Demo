import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import cloneDeep from "lodash/cloneDeep";

const AddEducation = (props) => {
    const { addEducation, history } = props;

    const [formData, setFormData] = React.useState({
        school: "",
        degree: "",
        field: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const {
        school,
        degree,
        field,
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
        addEducation(data, history);
    };

    return (
        <React.Fragment>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school, or bootcamp that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School/Bootcamp"
                        name="school"
                        required
                        onChange={onChange}
                        value={school}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree/Certificate"
                        name="degree"
                        required
                        onChange={onChange}
                        value={degree}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="field"
                        onChange={onChange}
                        value={field}
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
                        placeholder="Program Description"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
