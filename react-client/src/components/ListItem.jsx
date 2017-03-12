import React from 'react';

class ListItem extends React.Component {
	constructor(props) {
		super(props); 
  }

  post () {
  	this.props.onClick(this.props.item.imdbID);
  	this.forceUpdate();
  }

render() {
	return (
  		<div key = {this.props.item.imdbID}>
  		<img src={this.props.item.Poster} width='120px' height='200px'></img>
    		<h4> { this.props.item.Title } </h4>
    		<button className="btn btn-warning" onClick={this.post.bind(this)}>Add</button>
  		</div>
			)
	}
}

export default ListItem;