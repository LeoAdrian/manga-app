import React, {Component}   from 'react';
import { Redirect }   from 'react-router-dom';
import store                from '../store';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { fetchDetails }     from '../actions/postActions';


class MangaPage extends Component {
  // constructor(props){
  //   super(props);
  //   let mangaArr;
  // }

  componentWillMount () {
    if(!store.getState().posts.listManga.manga){
      return <Redirect to = '/' />
    }
  }

  componentDidMount() {
    this.props.fetchDetails(this.getManga(store.getState().posts.listManga.manga, this.props));
    // this.mangaArr     = store.getState().posts.listManga.manga;
    // console.log('Checking ')
  }

  getManga(mArr, p) {
    const copy = [...mArr];
    console.log('Get manga function start');
    console.log(p);
    const m = copy.find(el => el.i === p.match.params.i);
    console.log('M variable');
    console.log(m);
    return m;
  }

  displayGenres (arr) {
    console.log(arr.categories);
    console.log(typeof arr.categories);
    console.log(arr.author_kw);
    console.log(arr.chapters[0])
    // arr.categories.map( el => {
    //   console.log(el);
    // })
  }

  render() {
    const mangaD = this.props.mangaDetails;
    return (
      <div className = "manga-page">
        <h1>{mangaD.title}</h1>
        <div className = "other-details">
          <div>Genres: {this.displayGenres(mangaD)}</div>
          <img src = {mangaD.imageURL} alt = "manga"/>
        </div>
        <p>{mangaD.description}</p>
      </div>
    )
  }
}

MangaPage.propTypes = {
  fetchDetails  : PropTypes.func.isRequired,
  mangaDetails  : PropTypes.object
}

const mapStateToProps = state => ({
  mangaDetails  : state.posts.mangaDetails
})

export default connect( mapStateToProps, { fetchDetails } )(MangaPage);


// const fetchDetails = (v, m) => {
//   fetch(`https://www.mangaeden.com/api/manga/${m.i}/`)
//   .then(response => response.json())
//   .then(data => v = data)
//   .then(() => console.log(v))
// }
//
// const MangaPage = ( props ) => {
//   const mangaArr  = store.getState().posts.listManga.manga;
//   if(!mangaArr) {
//     return <Redirect to = '/' />
//   }
//   const manga  =  mangaArr.find(el => el.i === props.match.params.i);
//   let mangaDetails;
//   fetchDetails(mangaDetails, manga);
//
//   if(!manga) {
//     return <div>Sorry, manga was not found!</div>;
//   }
//   if(!mangaDetails) {
//     return <div>Loading...</div>
//   }
//   return (
//     <div>
//       <h1>{mangaDetails.t}</h1>
//       {/* <h3>{manga.}</h3> */}
//     </div>
//   )
// }
