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
import TestComponent from "../../features/TestArea/TestComponent";
import PostForm from "../../features/posts/PostForm/PostForm";
import ModalManager from "../../features/Modals/ModalManager";
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
                    <Route path='/posts/:id' component={PostDetailsPage} />
                    <Route path='/people' component={PeopleDashboard} />
                    <Route path='/profile/:id' component={UserDetailedPage} />
                    <Route path='/settings' component={SettingsDashboard} />
                    <Route path='/manage/:id' component={PostForm} />
                    <Route path='/createPost' component={PostForm} />
                    <Route path='/test' component={TestComponent} />
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
