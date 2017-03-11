import React from 'react';
import FetchListItem from './FetchListItem.jsx';

const FetchList = (props) => (
  <div>
    <h4> To Watch: </h4>
    <h3>There are { props.fetched.length } movies on your list:</h3>
    { props.fetched.map(item => <FetchListItem item={item}/>)}
  </div>
)

export default FetchList;