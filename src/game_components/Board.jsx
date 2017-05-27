import React, { Component, PropTypes } from 'react';

const style = (maxBoardLen) => {
	return {
		height: maxBoardLen+'px',
		width: maxBoardLen+'px',
		background: '#d4e1ea',
		borderRadius: '10px',
		position: 'relative',
		margin: '25px auto',
		overflow: 'hidden',
		WebkitBoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3)',
		MozBoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25),inset 0 -15px 30px rgba(0,0,0,0.3)',
		BoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3)',
		background:'rgba(0,0,0,0.25)'
	}
}

export default class Board extends Component {

	render() {
		const { maxBoardLen, children} = this.props;
		return (
			<div style={style(maxBoardLen)}>
        		{children}
    		</div>
		);
	}
}