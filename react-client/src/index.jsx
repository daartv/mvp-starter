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
      items: [{Title:'Justice League', Year: '2017', imdbID: '34324'}, {Title:'Spiderman', Year:'2017', imdbID: '2352432'}],
      fetched: []
    }
  }


  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type:'POST',
      url:'http://127.0.0.1:3000/items',
      ContentType: 'text/plain',
      data: term,
      success: (data) => {
        console.log('Response from the post', data);
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
    console.log(`${movieID} was posted to server/database`);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3000/entry',
      ContentType: 'text/plain',
      data: movieID,
      success: (data) => {
        console.log('Response from the add button post', data);
      },
      error: (error) => {
        console.log('Errored out from add button post', error);
      }
    });
  }
  
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/items',
      ContentType: 'text/plain',
      success: (data) => {
        console.log(data)
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
    return (<div>
      <Search onSearch={this.search.bind(this)}/>
      <h1>Enjoy your Sunday:</h1>
      <List items={this.state.items} onClick={this.onAddClick.bind(this)} />
      <FetchList fetched={this.state.fetched} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));