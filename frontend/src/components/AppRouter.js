import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';
import Home from './Home';
import Profile from './Profile';
import Tasks from './Tasks';
import NotFound from './NotFound';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Login} />
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/tasks" component={Tasks} />
        <Route component={NotFound} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
