import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthPage } from '../pages/auth';
import { Dashboard } from '../pages/dashboard';
import { Edit } from '../pages/dashboard/sensors/Edit';
import { useAuth } from './useAuth';

const pages = [
  { key: 'dashboard', value: <Dashboard /> },
  { key: 'edit', value: <Edit /> },
  { key: 'login', value: <AuthPage /> },
];

const getPageById = (key: string) => pages.find((item) => (item.key === key))?.value;

const mainMenu = [
  {
    title: 'Dashboard',
    link: '/',
    itmeIcon: 'bi bi-border-all',
    key: 'dashboard',
    default: true,
    inMenu: true,
  },
  {
    title: 'Create',
    link: '/create',
    itmeIcon: 'bi bi-border-all',
    key: 'edit',
    default: false,
    inMenu: true,
  },
  {
    title: 'Edit',
    link: '/edit/:id',
    itmeIcon: 'bi bi-border-all',
    key: 'edit',
    default: false,
    inMenu: true,
  },
];

const loginMenu = [{
  title: 'Login',
  link: '/',
  itmeIcon: 'bi bi-border-all',
  key: 'login',
  default: false,
  inMenu: true,
}];

const normalizeMainMenu = mainMenu.map((item) => ({ ...item, component: getPageById(item.key) }));
const normalizeLoginMenu = loginMenu.map((item) => ({ ...item, component: getPageById(item.key) }));

const Routing = () => {
  const auth = useAuth();

  if (auth?.user) {
    const defaultRout = mainMenu.find((item) => (item.default === true));

    return (
      <Switch>
        {normalizeMainMenu.map((item) => (
          <Route
            exact
            path={item.link}
            /* component={item.component} */
            key={item.key}
          >
            {item.component}
          </Route>
        ))}
        <Redirect to={(defaultRout) ? defaultRout.link : mainMenu[0].link} />
      </Switch>

    );
  }

  const defaultRout = normalizeLoginMenu.find((item) => (item.default === true));
  return (
    <Switch>
      {normalizeLoginMenu.map((item) => (
        <Route
          exact
          path={item.link}
          /* component={item.component} */
          key={item.key}
        >
          {item.component}
        </Route>
      ))}
      <Redirect to={(defaultRout) ? defaultRout.link : mainMenu[0].link} />
    </Switch>
  );
};

export default Routing;
