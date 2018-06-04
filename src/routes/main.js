import React, { Component } from "react";
import MangaList from "../components/mangaList";

class Main extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Manga App</h1>
				<button onClick={() => console.log(this.props.mangaArray)}>
					Check state of manga array
				</button>

				<MangaList mangaArray={this.props.mangaArray} />
			</div>
		);
	}
}

export default Main;
