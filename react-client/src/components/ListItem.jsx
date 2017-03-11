import React from 'react';

const ListItem = (props) => (
  <div key = {props.item.id}>
    { props.item.title }
    <button className="btn btn-warning">Edit</button>
    <button className="btn btn-danger">Delete</button>
    <button>Watched</button>
  </div>
)

export default ListItem;