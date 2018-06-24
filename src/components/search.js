import React from 'react';

const Search = (props) => {
  console.log(props.location)
  if(props.location.search){
    console.log('ssssssssssssssss');
  }
  return (
    <div><h1>Search</h1></div>
  )
}

export default Search;
