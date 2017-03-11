import React from 'react';

class FetchListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	delete () {
		this.props.onClick(this.props.item.Title);
	}

	render () {
		return (
			<div key = {this.props.item.imdbID}>
    		{ this.props.item.Title }
    			<button className="btn btn-warning" onClick={this.delete.bind(this)}>Watched</button>
  			</div>
			)
	}
}

/*const FetchListItem = (props) => (
  <div key = {props.item.imdbID}>
    { props.item.Title }
    <button className="btn btn-warning">Watched</button>
  </div>
)*/

export default FetchListItem;