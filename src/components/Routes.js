import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AgriculturistPage from './pages/AgriculturistPage';
import AgriculturistEditPage from './pages/AgriculturistEditPage';
import AgriculturistRegisterPage from './pages/AgriculturistRegisterPage';
import NotFoundPage from './pages/NotFoundPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={DashboardPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route exact path='/agricultores' component={AgriculturistPage} />
        <Route exact path='/agricultores/cadastro' component={AgriculturistRegisterPage} />
        <Route path='/agricultores/:id' component={AgriculturistEditPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
