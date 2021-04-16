import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AgriculturistPage from './pages/AgriculturistPage';
import AgriculturistEditPage from './pages/AgriculturistEditPage';
import TablesPage from './pages/TablesPage';
import NotFoundPage from './pages/NotFoundPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={DashboardPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/agricultores/:id' component={AgriculturistEditPage} />
        <Route path='/agricultores' component={AgriculturistPage} />
        <Route path='/tables' component={TablesPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
