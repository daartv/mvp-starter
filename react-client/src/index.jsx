import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import FetchList from './components/FetchList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      fetched: []
    }
  }

  search (term) {
    $.ajax({
      type:'POST',
      url:'http://127.0.0.1:3000/items',
      ContentType: 'text/plain',
      data: term,
      success: (data) => {
        this.setState({
          items: JSON.parse(data).Search
        })
      },
      error: (err) => {
        console.log('Errored out from the post', err);
      }
    });
  }

  onAddClick (movieID) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/entry',
      ContentType: 'text/plain',
      data: movieID,
      success: (data) => {
        console.log('Succeed!')
        var nFetched = this.state.fetched.slice();
        nFetched.push(data);
        this.setState({fetched: nFetched});
      },
      error: (error) => {
        console.log('Errored out from add button post', error);
      }
    });
  }

  onWatchedClick(movieTitle) {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/watch',
      ContentType:'text/plain',
      data: movieTitle,
      success: (data) => {
        var nFetched = this.state.fetched.slice();
        for (var i = 0; i < nFetched.length; i++) {
          console.log('nFetched Title', nFetched[i].Title);
          console.log('movieTitle', movieTitle);
          if (nFetched[i].Title === movieTitle) {
            nFetched.splice(i);
          }
        }
        this.setState({fetched: nFetched});
      },
      error: (error) => {
        console.log('Errored out from watched button post');
      }
    });
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/items',
      ContentType: 'text/plain',
      success: (data) => {
        this.setState({
          fetched: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div className='container'>
      <Search onSearch={this.search.bind(this)}/>
      <h1>Enjoy your Sunday:</h1>
      <List items={this.state.items} onClick={this.onAddClick.bind(this)} />
      <FetchList fetched={this.state.fetched} onClick={this.onWatchedClick.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));