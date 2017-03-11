import React from 'react';
import FetchListItem from './FetchListItem.jsx';

const FetchList = (props) => (
  <div>
    <h4> To Watch: </h4>
    There are { props.fetched.length } movies.
    { props.fetched.map(item => <FetchListItem item={item}/>)}
  </div>
)

export default FetchList;