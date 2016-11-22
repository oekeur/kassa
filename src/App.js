import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Horizon, HorizonProvider } from 'react-hz';

import WebFont from 'webfontloader'

WebFont.load({
    google: {
      families: ['Droid Sans', 'Droid Serif', 'Titillium Web', "Muli"]
    }
})

/* eslint-disable */
const horizonInstance = Horizon({ host: '127.0.0.1:8181' });
/* eslint-enable */

import './index.css'

export default () => (
  <HorizonProvider instance={horizonInstance}>
    <Router routes={routes} history={browserHistory} />
  </HorizonProvider>
)
