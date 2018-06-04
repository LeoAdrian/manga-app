import React, { Component } from "react";
import logo from "./logo.svg";
import Main from "./routes/main";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mangaA: null
		};
	}

	componentWillMount() {
		fetch("https://www.mangaeden.com/api/list/0/?p=0&l=25")
			.then(result => result.json())
			.then(data => this.setMangaObj(data));
	}

	setMangaObj = passedData => {
		this.setState({ mangaA: passedData });
	};

	// Check state of the manga returned
	checkManga = () => {
		console.log(this.state.mangaA);
	};

	render() {
		return (
			<div className="App">
				<Main mangaArray={this.state.mangaA} />
			</div>
		);
	}
}

export default App;
