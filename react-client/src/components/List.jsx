import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className='container jumbotron'>
    <h4> Find your movie and add it! </h4>
    <h3>Your search returned { props.items.length } movies: </h3>
    { props.items.map(item => <ListItem item={item} onClick={props.onClick} />)}
  </div>
)

export default List;