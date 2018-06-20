import React, { Component, Fragment }      from 'react';
import PropTypes                           from 'prop-types';
import { connect }                         from 'react-redux';
import { fetchChapter }                    from '../actions/postActions';
import { isEmpty }                         from 'lodash';

class ChapterPage extends Component {
  componentDidMount() {
    this.props.fetchChapter(this.props.match.params.chID);
  }

  displayPages(pagesArr) {
    return pagesArr.reverse().map((imageArr, key) => (
      <div key = { key }>
        <img src = {`https://cdn.mangaeden.com/mangasimg/${imageArr[1]}`}  alt = {`Page: ${imageArr[0]}`}/>
      </div>
    ) )
  }

  render() {
    const chapter = this.props.chapter;
    console.log(chapter);
    return (
      <Fragment>
      {!isEmpty(chapter) &&
          <div className = "chapter">{this.displayPages(chapter.images)}</div>
      }
      </Fragment>
    )
  }
}

ChapterPage.propTypes = {
  fetchChapter : PropTypes.func.isRequired,
  chapter      : PropTypes.object
}

const mapStateToProps = state => {
  return {
    listManga     : state.posts.listManga,
    mangaDetails  : state.posts.mangaDetails,
    chapter       : state.posts.chapter
  }
}

export default connect( mapStateToProps, { fetchChapter } )(ChapterPage);
