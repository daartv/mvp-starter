import React from 'react';

const FetchListItem = (props) => (
  <div key = {props.item.imdbID}>
    { props.item.Title }
    <button className="btn btn-warning">Watched</button>
  </div>
)

export default FetchListItem;