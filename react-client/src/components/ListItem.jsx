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
  		<div key = {this.props.item.imdbID}>
    		{ this.props.item.Title }
    		<button className="btn btn-warning" onClick={this.post.bind(this)}>Add</button>
  		</div>
			)
	}
}

/*const ListItem = (props) => (
  <div key = {props.item.imdbID}>
    { props.item.Title }
    <button className="btn btn-warning" onClick={props.onClick(props.item.imdbID)}>Add</button>
  </div>
)*/

export default ListItem;