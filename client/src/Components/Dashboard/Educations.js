import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Educations = (props) => {
    const { educations, deleteEducation } = props;

    const edus = educations.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                {!edu.to ? (
                    "Now"
                ) : (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteEducation(edu._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <React.Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{edus}</tbody>
            </table>
        </React.Fragment>
    );
};

Educations.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Educations);
