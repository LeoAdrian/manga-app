import React from 'react';
import { isEmpty, upperFirst } from 'lodash';


const Suggest = ( props ) => {
  // console.log(props);
  const boldTerm = (str, idx) => {
    console.log(str);
    let capitalizeQuery = props.term.replace(new RegExp(`(${props.term})`, 'gi'), `$1`);
    let remainingWord   = str.slice(props.term.length);
    // return {
    //   capitalized : capitalizeQuery,
    //   text : remainingWord
    // }
    // Push message if no result was found
			if (props.term === '') {
				return (
					<div key = {idx}></div>
				);
      } else {
        return (
          <li key={ idx }>
            <b>{capitalizeQuery}</b>
            {remainingWord}
          </li>
        )
      }

  }

  const getElement = () => (
    <li key={boldTerm().capitalized + boldTerm().text}>
      <b>{boldTerm().capitalized}</b>
      {boldTerm().text}
    </li>
  );
  let classState = '';

  if(isEmpty(props.suggestion)){
    return <div></div>
  }
  else {
    classState = 'suggest-list'
    if(!props.term){
      classState = 'suggest-list-hidden';
    }
    props.suggestion.length = 12;
    const list = props.suggestion.map((manga, index) => (boldTerm(manga.t, index)) )
    return <ul className={classState}>{list}</ul>
    // return <ul className = "suggest-list">{list}</ul>

  }
}

export default Suggest;
