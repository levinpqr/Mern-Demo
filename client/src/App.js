import "./App.css";
import React from "react";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Alert from "./Components/Layout/Alert";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import LoadingSpinner from "./Components/Layout/LoadingSpinner";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import CreateProfile from "./Components/ProfileForm/CreateProfile";
import UpdateProfile from "./Components/ProfileForm/UpdateProfile";
import AddExperience from "./Components/ProfileForm/AddExperience";
import AddEducation from "./Components/ProfileForm/AddEducation";
import Profiles from "./Components/Profiles/Profiles";
import Profile from "./Components/Profile/Profile";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Post/Post";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    React.useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <LoadingSpinner />
            <Router>
                <React.Fragment className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing}></Route>
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/profiles"
                                component={Profiles}
                            />
                            <Route
                                exact
                                path="/profile/:id"
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path="/create-profile"
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/edit-profile"
                                component={UpdateProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/add-experience"
                                component={AddExperience}
                            />
                            <PrivateRoute
                                exact
                                path="/add-education"
                                component={AddEducation}
                            />
                            <PrivateRoute
                                exact
                                path="/posts"
                                component={Posts}
                            />
                            <PrivateRoute
                                exact
                                path="/post/:id"
                                component={Post}
                            />
                        </Switch>
                    </section>
                </React.Fragment>
            </Router>
        </Provider>
    );
}

export default App;
