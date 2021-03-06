import React from 'react';
import FetchListItem from './FetchListItem.jsx';

const FetchList = (props) => (
  <div className='container jumbotron'>
    <h4> To Watch: </h4>
    <h3>There are { props.fetched.length } movies on your list:</h3>
    { props.fetched.map(item => <FetchListItem item={item} onClick={props.onClick} />)}
  </div>
)

export default FetchList;