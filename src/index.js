
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AppContainer } from 'react-hot-loader'


ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	document.getElementById("app")
);

if (module.hot) { // 1
  module.hot.accept("./App", () => { // 2
    const NextApp = require("./App").default; // 3
    ReactDOM.render(
    	<AppContainer>
    		<NextApp />
    	</AppContainer>,
		document.getElementById("app")
	); // 4
  });
}

