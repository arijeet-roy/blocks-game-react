import React from 'react';
import ReactDOM from 'react-dom';

const style_Fn = ({length, color, position}) => {

	return {
		height: length+'px',
		width: length+'px',
		position: 'absolute',
		backgroundColor: color,
		borderRadius: '10px',
		WebkitBoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3)',
		MozBoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25),inset 0 -15px 30px rgba(0,0,0,0.3)',
		BoxShadow:'0 2px 6px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.3), inset 0 10px rgba(255,255,255,0.2), inset 0 10px 20px rgba(255,255,255,0.25), inset 0 -15px 30px rgba(0,0,0,0.3)',
		transition: 'all 0.1s ease',
		top: position.top + 'px',
        left: position.left + 'px',
	}
}


export default props => <div style={style_Fn(props)}/>