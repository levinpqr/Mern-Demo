import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LoadingSpinner = ({ loading }) => {
    if (!loading || !loading.flag) return null;
    return (
        <div
            style={{
                position: "fixed",
                right: "0px",
                bottom: "0px",
                top: "0px",
                left: "0px",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                opacity: "60%",
                width: "100%",
                height: "100%",
                zIndex: 100000000,
            }}
        >
            <div
                style={{
                    height: "100%",
                    outline: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#17a2b8",
                }}
            >
                <div className="loader center">
                    <i
                        className="fa fa-circle-notch fa-spin"
                        style={{ fontSize: 150 }}
                    />
                </div>
            </div>
        </div>
    );
};

LoadingSpinner.propTypes = {
    loading: PropTypes.object.isRequired,
};

export default connect((state) => ({ loading: state.loading }))(LoadingSpinner);
