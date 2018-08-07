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
export { default as Template } from './views/Template';
export { default as http } from 'http';
export { default as fs } from 'fs';
