import React, { Component, PropTypes } from 'react';
import Tile from './Tile.jsx';
import {up_dir, down_dir, left_dir, right_dir} from '../game_utils/utils.js'

export default class Enemy extends Component {

	render() {
		const {
			enemy_len,
			enemy_pos: {
				top,
				left,
				dir
			},
			playerPos

		} = this.props
		return(
			<Tile 
              	length={enemy_len}
              	color='#800000' 
                position={{top, left}}
            />
		)
	}

	componentDidUpdate() {
		const {
			enemy_len,
			enemy_pos: {
				top,
				left,
				dir
			},
			playerPos

		} = this.props
		if(Math.abs(playerPos.top - top) >= enemy_len || Math.abs(playerPos.left - left) >= enemy_len) 
			return
		
		this.props.handleCollision()

	}
}