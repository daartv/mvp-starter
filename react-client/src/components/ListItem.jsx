import React from 'react';

const ListItem = (props) => (
  <div key = {props.item.imdbID}>
    { props.item.Title }
    <button className="btn btn-warning" onClick={props.onClick(props.item.imdbID)}>Add</button>
  </div>
)

export default ListItem;