import React, { Component } from "react";
import MangaList from "../components/mangaList";
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { fetchManga }       from '../actions/postActions';

class Main extends Component {
  componentWillMount() {
    this.props.fetchManga();
  }
  render() {
    return (
      <div>
        <h1>Manga Homepage</h1>
        <MangaList mangaArray = {this.props.listManga.manga}/>
      </div>
    )
  }
}

Main.propTypes = {
  fetchManga  : PropTypes.func.isRequired,
  listManga   : PropTypes.object
}

const mapStateToProps = state => ({
  listManga : state.posts.listManga
})

export default connect( mapStateToProps, { fetchManga } )(Main);
















// import React, { Component } from "react";
// import MangaList from "../components/mangaList";
// import PropTypes            from 'prop-types';
// import { connect }          from 'react-redux';
// import { fetchManga }       from '../actions/postActions';
//
// class Main extends Component {
// 	componentWillMount () {
// 			this.props.fetchManga();
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<h1>Manga App</h1>
// 				<button onClick={() => console.log(this.props.listManga)}>
// 					Check state of manga array
// 				</button>
//
// 			<MangaList mangaArray={this.props.listManga.manga} />
// 			</div>
// 		);
// 	}
// }
//
// Main.propTypes = {
//   fetchManga  : PropTypes.func.isRequired,
//   listManga       : PropTypes.object,
// }
//
// const mapStateToProps = state => ({
//   listManga   : state.posts.listManga
// });
//
// export default connect(mapStateToProps, { fetchManga })(Main);
