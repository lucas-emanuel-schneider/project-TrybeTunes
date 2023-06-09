import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login { ...props } />) }
          />
          <Route
            exact
            path="/search"
            render={ () => <Search /> }
          />
          <Route
            exact
            path="/album/:id"
            render={ (props) => (<Album { ...props } />) }
          />
          <Route
            exact
            path="/favorites"
            render={ () => <Favorites /> }
          />
          <Route
            exact
            path="/profile"
            render={ () => <Profile /> }
          />
          <Route
            exact
            path="/profile/edit"
            render={ () => <ProfileEdit /> }
          />
          <Route render={ () => <NotFound /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
