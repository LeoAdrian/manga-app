import React, {Component, Fragment}   from 'react';
import { Redirect }   from 'react-router-dom';
import store                from '../store';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { fetchDetails }     from '../actions/postActions';
import {isEmpty} from 'lodash'

class MangaPage extends Component {
  // constructor(props){
  //   super(props);
  //   let mangaArr;
  // }

  componentDidMount() {
    this.props.fetchDetails(this.getManga(this.props.listManga.manga, this.props));
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
    // console.log(arr.categories);
    // console.log(typeof arr.categories);
    // console.log(arr.author_kw);
    // console.log(arr.image);
    // console.log(arr.chapters[0])
    // arr.categories.map( el => {
    //   console.log(el);
    // })

    console.log('IN CASCUTZA', arr)

    return arr.categories.map((item, key) => <h5 key={key}>
      {item}
    </h5>)
  }

  render() {
    const mangaD = this.props.mangaDetails;
    console.log('CASCUTZA', mangaD);
    if(!mangaD) {
      return <div>Loading details...</div>
    } else {
      return (
        <Fragment>
        {!isEmpty(mangaD) && <div className = "manga-page">
          <h1>{mangaD.title}</h1>
          <div className = "other-details">
            <div>Genres: {this.displayGenres(mangaD)}</div>
            <img src = {'https://cdn.mangaeden.com/mangasimg/' + mangaD.image} alt = "manga"/>
          </div>
          <p>{mangaD.description}</p>
        </div>}

        </Fragment>
      )
    }

  }
}

MangaPage.propTypes = {
  fetchDetails  : PropTypes.func.isRequired,
  mangaDetails  : PropTypes.object
}

const mapStateToProps = state => ({
  mangaDetails  : state.posts.mangaDetails,
  listManga  : state.posts.listManga
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
