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
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/items',
      contentType: 'application/json',
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

  search (term) {
    $.ajax({
      type:'POST',
      url:'http://127.0.0.1:3000/items',
      contentType: 'application/json',
      data: JSON.stringify({term}),
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
    console.log(movieID);
    var nFetched = this.state.fetched.slice();
    $.ajax({
      url: '/entry',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({movieID}),
      success: (data) => {
        console.log('Succeed!')
        nFetched.push(data);
        this.setState({fetched: nFetched});
      },
      error: (error) => {
        console.log('Errored out from add button post', error);
      }
    });
  }

  onWatchedClick(movieTitle) {
    console.log(movieTitle);
    var nFetched = []
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/watch',
      contentType:'application/json',
      data: JSON.stringify({movieTitle}),
      success: (data) => {
        console.log('fetched state', this.state.fetched)
        console.log('New fetched state', nFetched)
        for (var i = 0; i < this.state.fetched.length; i++) {
          if (this.state.fetched[i].Title !== movieTitle) {
            nFetched.push(this.state.fetched[i]);
          }
        }
        this.setState({fetched: nFetched});
      },
      error: (error) => {
        console.log('Errored out from watched button post');
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