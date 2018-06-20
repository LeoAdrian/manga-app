import React, { Component } 						from "react";
import { Provider }                     from 'react-redux';
import { Redirect }         						from 'react-router-dom';
import store                    				from './store';
import Main 														from "./routes/main";
import MangaPage 												from "./routes/mangaPage";
import ChapterPage 											from "./routes/chapterPage";
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
						<Route exact path = '/' 	component = {Main} />
						{/* <Route path = '/manga/:i' component = {MangaPage} /> */}
						<Route exact path = '/manga/:i' render = {(props) => (
							!store.getState().posts.listManga.manga ? ( <Redirect to = '/' /> ) : ( <MangaPage {...props} /> )
						)}/>
						<Route path = '/manga/:i/:chID' component = {ChapterPage}/>
					</Switch>
				</Provider>
			</Router>
		)
	}
}

export default App;
