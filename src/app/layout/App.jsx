import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import NavBar from "../../features/nav/navBar/NavBar";

import PostDashboard from "../../features/posts/postsDashboard/postDashboard";
import HomePage from "../../features/home/homePage";
import PostDetailsPage from "../../features/posts/postDetails/PostDetailsPage";
import PeopleDashboard from "../../features/user/peopleDashboard/peopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "../../features/user/userDetailed/UserDetailedPage";

import PostForm from "../../features/posts/PostForm/PostForm";
import ModalManager from "../../features/Modals/ModalManager";
import { UserIsAuthenticated } from "../../features/Auth/AuthWrapper";
import NotFound from "./NotFound";
import { TrainingsDashboard } from "../../features/Trainings/TrainingsDashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <ModalManager />
          <Route exact path='/' component={props => <HomePage {...props} />} />
          <Route
            path='/(.+)'
            render={() => (
              <Fragment>
                <NavBar />
                <Container className='main'>
                  <Switch>
                    <Route exact path='/posts' component={PostDashboard} />
                    <Route
                      path='/posts/:id'
                      component={UserIsAuthenticated(PostDetailsPage)}
                    />
                    <Route
                      path='/people'
                      component={UserIsAuthenticated(PeopleDashboard)}
                    />
                    <Route
                      path='/profile/:id'
                      component={UserIsAuthenticated(UserDetailedPage)}
                    />
                    <Route
                      path='/settings'
                      component={UserIsAuthenticated(SettingsDashboard)}
                    />
                    <Route
                      path='/manage/:id'
                      component={UserIsAuthenticated(PostForm)}
                    />
                    <Route
                      path='/createPost'
                      component={UserIsAuthenticated(PostForm)}
                    />

                    <Route
                      path='/trainings'
                      component={UserIsAuthenticated(TrainingsDashboard)}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </Fragment>
            )}
          />
        </Fragment>
      </BrowserRouter>
    );
  }
}
export default withRouter(App);
