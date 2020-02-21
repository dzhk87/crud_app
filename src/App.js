import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import PostListPage from './pages/PostList/PostListPage.component';
import PostAddPage from './pages/PostAdd/PostAddPage.component';
import PostEditPage from './pages/PostEdit/PostEditPage.component';
import PostViewPage from './pages/PostView/PostViewPage.component';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='logo-container'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/posts'/>
          </Route>
          <Route exact path='/posts' component={PostListPage} />
          <Route exact path='/posts/new' component={PostAddPage} />
          <Route path='/posts/:id/edit' component={PostEditPage} />
          <Route path='/posts/:id' component={PostViewPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
