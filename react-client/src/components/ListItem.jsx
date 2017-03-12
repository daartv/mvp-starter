import React from 'react';

class ListItem extends React.Component {
	constructor(props) {
		super(props); 
  }

  post () {
  	this.props.onClick(this.props.item.imdbID);
  }

render() {
	return (
  		<div className='container' key = {this.props.item.imdbID}>
  		<img src={this.props.item.Poster} width='140px' height='220px' className='img-thumbnail'></img>
    		<h4> { this.props.item.Title } </h4>
    		<button className="btn btn-primary" onClick={this.post.bind(this)}>Add</button>
  		</div>
			)
	}
}

export default ListItem;