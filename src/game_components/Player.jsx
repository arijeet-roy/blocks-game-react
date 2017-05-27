import React, { Component, PropTypes } from 'react';
import Tile from './Tile.jsx';
import {up_dir, down_dir, left_dir, right_dir} from '../game_utils/utils.js'

export default class Player extends Component {
	//add event
	handleKeyDown = evt => {
		let new_dir
		switch(evt.keyCode) {
			case 37:
				new_dir = {
					top: 0,
					left: -1,
					dir: left_dir
				}
				break

			case 38:
				new_dir = {
					top: -1,
					left: 0,
					dir: up_dir
				}
				break

			case 39:
				new_dir = {
					top: 0,
					left: 1,
					dir: right_dir
				}
				break

			case 40:
				new_dir = {
					top: 1,
					left: 0,
					dir: down_dir
				}
				break

			default:
				return

		}
		this.props.handlePlayerMove(new_dir)

	}

	componentDidMount() {
		window.onkeydown = this.handleKeyDown
	}

	render() {
		const {
			length,
			position: {
				top,
				left
			}
		} = this.props

		return (
				<div>
					<Tile
						length={length}
						color='#002b55'
						position={{top, left}}
					/>
				</div>
			)
	}
}