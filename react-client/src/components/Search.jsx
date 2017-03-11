import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Search your movie!</h4>
      Enter a movie title: <input value={this.state.terms}/>     
      <button onClick={this.search.bind(this)}> Find movies! </button>
    </div>) 
  }
}

export default Search;