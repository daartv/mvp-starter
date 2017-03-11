import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [{title: 'Star Wars', year: 2015, id:'1'}, {title: 'Sharknado', year: 2013, id:'2'}]
    }
  }

  search (term) {
    console.log(`${term} was searched`);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:3000/items',
      ContentType: 'text/plain',
/*      headers: {
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-MEthods': '*'
      },*/
      success: (data) => {
        this.setState({
          items: data
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
      <h1>Your movies:</h1>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));