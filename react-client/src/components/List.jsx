import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Find your movie and add it! </h4>
    There are { props.items.length } movies.
    { props.items.map(item => <ListItem item={item} onClick={props.onClick} />)}
  </div>
)

export default List;