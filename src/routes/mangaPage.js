import React, {Component, Fragment}   from 'react';
import PropTypes                      from 'prop-types';
import { connect }                    from 'react-redux';
import { Link }                       from 'react-router-dom';
import { fetchDetails }               from '../actions/postActions';
import { isEmpty, find }              from 'lodash';

class MangaPage extends Component {
  componentDidMount() {
    this.checkForManga();
    // this.props.fetchDetails(this.findManga(this.props.listManga.manga, this.props));
    console.log(this.props);
  }

  findManga(mArr, p, type='all') {
    const copy = [...mArr];
    // console.log(copy);
    let i;
    type === 'all' ?  i = 'i' : i = 'manga_id';
    const m = find(copy, el => el[i] === p.match.params.i);
    return m;
  }

  checkForManga() {
    // !this.findManga(this.props.listManga.manga, this.props) ?
    //   this.props.fetchDetails(this.findManga(this.props.popular, this.props, 'popular')):
    //   this.props.fetchDetails(this.findManga(this.props.listManga.manga, this.props))
      if(!this.findManga(this.props.listManga.manga, this.props) && !this.findManga(this.props.popular, this.props, 'popular')){
        console.log('First case');
       this.props.fetchDetails(this.findManga(this.props.searched, this.props))
     }
      else if (!this.findManga(this.props.listManga.manga, this.props)) {
        console.log('First case');
        this.props.fetchDetails(this.findManga(this.props.popular, this.props, 'popular'))
      }
  }

  displayGenres (arr) {
    // console.log(typeof arr.chapters[0][1]);
    return arr.categories.map((item, key) => <span key={key}>
      {item}
    </span>)
  }

  decodeHTML(text) {
    const entities = [
      ['amp', `&`],
      ['apos', `'`],
      ['#x27', `'`],
      ['#x2F', `/`],
      ['#39', `'`],
      ['#039', `'`],
      ['#47', `/`],
      ['lt', `<`],
      ['gt', `>`],
      ['nbsp', ` `],
      ['quot', `"`],
      ['ldquo', `“`],
      ['rdquo', `”`],
      ['rsquo', `’`],
      ['lsquo', `‘`],
      ['hellip', `…`],
      ['eacute', `é`]
    ]
    entities.forEach(entity => {
      text = text.replace(new RegExp('&' + entity[0] + ';', 'g'), entity[1]);
    })

    return text;
  }

  displayChapters(chapters, mangaID) {
    return chapters.map((chapter, key) => (
      <div className = "chapter-info" key = {key}>
        <Link to = {`/manga/${mangaID}/${chapter[3]}`}>
          <h3>Chapter {chapter[0]}: {chapter[2]}</h3>
        </Link>
        <h5>{this.getDate(chapter[1])}</h5>
      </div>))
  }

  getDate(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    if(typeof timestamp === 'number'){
      timestamp *= 1000;
    }
    const date   = new Date(timestamp);
    const day    =  '0' + date.getDate();
    const month  =  '0' + (date.getMonth() + 1);
    const year   =   date.getFullYear();
    return `${day.substr(-2)}/${month.substr(-2)}/${year}`;
  }

  displayStatus(manga) {
    let status = '';
    manga.status === 1 ? status = 'Ongoing' : status = 'Completed';
    return status;
  }

  render() {
    const mangaD = this.props.mangaDetails;
    if(!mangaD) {
      return <div>Loading details...</div>
    } else {
      console.log(this.props);
      return (
        <Fragment>
          {!isEmpty(mangaD) && <div className = "manga-page">
            <h1>{mangaD.title}</h1>
            <div className = "other-details">
              <img src = {'https://cdn.mangaeden.com/mangasimg/' + mangaD.image} alt = "manga"/>
              <div className = "text-details">
                <div className = "genres" ><b>Genres:</b>{this.displayGenres(mangaD)}</div>
                <div ><b>Status: </b>{this.displayStatus(mangaD)}</div>
                <div ><b>Chapters: </b>{mangaD.chapters_len}</div>
              </div>
            </div>
            <p>{this.decodeHTML(mangaD.description)}</p>
            <div className = "column-info">
              <h2>Chapters</h2>
              <h2>Date added</h2>
            </div>
            <div className = "chapters">{this.displayChapters(mangaD.chapters, this.props.match.params.i)}</div>
          </div>}
        </Fragment>
      )
    }
  }
}

MangaPage.propTypes = {
  fetchDetails  : PropTypes.func.isRequired,
  mangaDetails  : PropTypes.object,
  popular       : PropTypes.array
}

const mapStateToProps = state => ({
  mangaDetails  : state.posts.mangaDetails,
  listManga     : state.posts.listManga,
  popular       : state.posts.popular,
  searched      : state.posts.searched
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
