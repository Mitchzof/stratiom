import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

let style = {
  backgroundColor: '#f2f6f9',
  minHeight: '100vh',
  minWidth: '100vw',
  paddingBottom: '20px'
}

//Render app based on current route
class App extends Component {
  render() {
    return (
      <div style={ style }>
        <Switch>
          {routes.map(route =>
            <Route key={ (route.path) ? route.path : '404' } { ...route }/>
          )}
        </Switch>
      </div>
    );
  }
}

export default App;
