import React, { Component } 						from "react";
import { Provider }                     from 'react-redux';
import store                    				from './store';
import Main 														from "./routes/main";
import MangaPage 												from "./routes/mangaPage";
import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<Provider store = {store}>
					<Switch>
						<Route exact path = '/' component = {Main} />
						<Route path='/manga/:i' component={MangaPage}/>
					</Switch>
				</Provider>
			</Router>
		)
	}
}

export default App;
