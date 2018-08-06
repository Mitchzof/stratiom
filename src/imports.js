/* import express from 'express';
import { router as api } from './api/api';
import { router as protectedApi } from './api/protected';

import React from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';

import Template from './views/Template';
import routes from './client/routes';

import { initializeSession, preload } from './store/actions';
import { reducer } from './store/reducers';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { matchPath } from 'react-router-dom';

import App from './client/App';
import bodyParser from 'body-parser'; */

//Import management.  Prevents server file from getting too cluttered

export { default as express } from 'express';
//export { default as session } from 'express-session';
export { default as React } from 'react';
export { renderToString } from 'react-dom/server';
export { default as StaticRouter } from 'react-router-dom/StaticRouter';
export { preload, loginSuccess, loginError } from './store/actions';
export { default as reducer } from './store/reducers';
export { createStore } from 'redux';
export { Provider } from "react-redux";
export { matchPath } from 'react-router-dom';
export { default as App } from './client/App';
export { default as Template } from './views/Template';
export { default as routes } from './client/routes';
//export { default as bodyParser } from 'body-parser';
export { default as http } from 'http';
export { default as https } from 'https';
export { default as fs } from 'fs';
//export { default as connectRedis } from 'connect-redis';
//export { default as redis } from 'redis';
