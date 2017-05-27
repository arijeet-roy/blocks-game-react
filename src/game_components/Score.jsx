import React, { Component, PropTypes } from 'react';

export default class Score extends Component {


	style = () => {
		return {
			container: {
            	textAlign: 'center'
	        },
	        info: {
        		fontFamily: 'Lobster, Georgia, Serif',
        		fontWeight: '400',
        		src: 'local("Lobster"), url(lobster.woff) format("woff")',
        		fontStyle: 'italic',
        		textShadow: '1px 1px lightgrey',
	            display: 'flex',
	            flexFlow: 'row nowrap',
	            justifyContent: 'space-around'
	        }
		}
	}

	render() {
		const {
			playerScore,
			timeElapsed,
			highScore
		} = this.props

		return(
			<div style = {this.style().container}>
				<div style = {this.style().info}>
					<p>Time: {timeElapsed}</p>
                	<p>Score: {playerScore}</p>
				</div>
				<div style={this.style().info}>
	                <p>High Score: {highScore}</p>
	            </div>
			</div>
		)
	}
}