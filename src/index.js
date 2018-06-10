import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router';
import Layout from 'containers/layout';
// import Chairs from 'containers/chairs';
import Main from 'containers/main';
import Furniture from 'containers/furniture';


const store = createStore( reducers, composeWithDevTools(
	applyMiddleware(thunk)
));

const history = syncHistoryWithStore( browserHistory, store)
console.log(store.getState())
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={Layout}>
				<Route path="/" component={Main} />
				<Route path="/furniture" component={Furniture} />

			</Route>
			{/* <Route path="phones/:id" component={Phone} />
			<Route path="/basket" component={Basket} /> */}
		</Router>
	</Provider>,
	document.getElementById('root')
)