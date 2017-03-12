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
			<div key = {this.props.item.id}>
			<img src={this.props.item.Poster} width='120px' height='200px'></img>
    		<h4> { this.props.item.Title } </h4>
    			<button className="btn btn-danger" onClick={this.delete.bind(this)}>Watched</button>
  			</div>
			)
	}
}

export default FetchListItem;