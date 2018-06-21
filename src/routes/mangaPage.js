import React, {Component, Fragment}   from 'react';
import PropTypes                      from 'prop-types';
import { connect }                    from 'react-redux';
import { Link }                       from 'react-router-dom';
import { fetchDetails }               from '../actions/postActions';
import { isEmpty, find }              from 'lodash';

class MangaPage extends Component {
  componentDidMount() {
    this.props.fetchDetails(this.findManga(this.props.listManga.manga, this.props));
  }

  findManga(mArr, p) {
    const copy = [...mArr];
    const m = find(copy, el => el.i === p.match.params.i);
    return m;
  }

  displayGenres (arr) {
    console.log(typeof arr.chapters[0][1]);
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
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date   = new Date(timestamp*1000);
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
  mangaDetails  : PropTypes.object
}

const mapStateToProps = state => ({
  mangaDetails  : state.posts.mangaDetails,
  listManga     : state.posts.listManga
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
