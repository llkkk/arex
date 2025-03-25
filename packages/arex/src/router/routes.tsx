import { RouterPath } from '@arextest/arex-core';
import { Spin } from 'antd';
import React, { FC, lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import Home from '../pages';

export type Routes = {
  path: string;
  auth?: boolean;
  component: React.LazyExoticComponent<FC> | FC;
  children?: Routes[];
};

const routes: Routes[] = Object.values(RouterPath)
  .map<Routes>((path) => ({
    path: '/arex' + path,
    component: Home,
    auth: true,
  }))
  .concat([
    {
      path: '/arex/oauth/:provider',
      component: lazy(() => import('../pages/Oauth')),
    },
    {
      path: '/arex/login',
      component: lazy(() => import('../pages/Login')),
    },
    {
      path: '/arex/logs',
      component: lazy(() => import('../pages/Logs')),
    },
    {
      path: '/arex/click',
      component: lazy(() => import('../pages/ValidInvitation')),
    },
  ]);

const syncRouter = (table: Routes[]): RouteObject[] =>
  table.map((route) => ({
    path: route.path,
    element: (
      <Suspense fallback={<Spin style={{ padding: '8px' }} />}>
        <route.component />
      </Suspense>
    ),
    children: route.children && syncRouter(route.children),
  }));

const getFreePath = (routes: Routes[]): string[] =>
  routes.reduce<string[]>((list, cur) => {
    if (!cur.auth) {
      list.push(cur.path);
    }
    return list;
  }, []);

const FreePath = getFreePath(routes);

export default syncRouter(routes);
export { FreePath };
