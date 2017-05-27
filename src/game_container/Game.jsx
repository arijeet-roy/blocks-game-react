import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {up_dir, down_dir, left_dir, right_dir, randomGen} from '../game_utils/utils.js';
import Board from '../game_components/Board.jsx';
import Enemy from '../game_components/Enemy.jsx';
import Player from '../game_components/Player.jsx';
import Score from '../game_components/Score.jsx';


let defaultGameState = ({boardLen, tileLen, highScore = 0}) => {
	// console.log(boardLen, tileLen, highScore)
		const init_player_pos = Math.floor(boardLen / 2) * tileLen
		return {
			size: {
	            board_len: boardLen,
	            player_len: tileLen,
	            max_board_len: boardLen * tileLen
	        },
	        positions: {
	            player: {
	                top: init_player_pos,
	                left: init_player_pos
	            },
	            enemies: []
	        },
	        playerScore: 0,
	        highScore,
	        timeElapsed: 0,
	        enemyPosition: 5,
	        enemyIndex: 0,
	        activeEnemies: 1,
	        baseScore: 10
		}
}

export default class Game extends Component {
	constructor(props) {
		super(props)
		const {
			boardLen,
			tileLen
		} = props
		this.state = defaultGameState({boardLen, tileLen})
	}

	render() {
		const { 
            size: { board_len, player_len }, 
            positions: { player: playerPos },
            playerScore,
            timeElapsed,
            highScore
        } = this.state;

        const headerStyle = {
        	textAlign: 'center',
        	textDecoration: 'underline',
        	fontFamily: 'Trebuchet MS, Verdana, cursive',
        	textShadow: '-1px -1px 1px #aaa, 0px 4px 1px lightgrey, 4px 4px 5px lightgrey, 0px 0px 7px lightgrey'
        }

        const NewEnemy = this.state.positions.enemies.map(enemy => 
									<Enemy key={enemy.key}
										enemy_len = {player_len}
										enemy_pos = {enemy}
										playerPos = {playerPos}
										handleCollision = {this.handleCollision} />)
		return(
			<div>
				<h3 style = {headerStyle}>Move the block using the keyboard arrows.</h3>
					<Board maxBoardLen={board_len * player_len}>
						<Player
							length={player_len} 
                        	position={playerPos}
                        	handlePlayerMove={this.handlePlayerMove}
						/>
						{NewEnemy}
					</Board>

					<Score
					playerScore = {playerScore}
					timeElapsed = {timeElapsed}
					highScore = {highScore}
				/>
			</div>
		)
	}

	handleCollision = () => {
		this.resetGame()
	}

	resetGame = () => {
		const{
			boardLen,
			tileLen
		} = this.props

		const {
			playerScore, 
			highScore
		} = this.state

        clearInterval(this.gameInterval); 
        clearInterval(this.enemyInterval);
        clearInterval(this.timeInterval);

        //to implement the global high score 
        //
        this.setState({
        	...defaultGameState({boardLen, tileLen, highScore}),
        	highScore: (playerScore > highScore) ? playerScore : highScore
        })

        //start game again
        this.startGame()
	}

	handlePlayerMove = (direction) => {
		const {top, left} = this.state.positions.player
		const {player_len, board_len, max_board_len} = this.state.size

		//restrict in case of boundaries
		switch(direction.dir) {
			case up_dir:
				if(top === 0) return
				break
			case down_dir:
				if(top === max_board_len - player_len) return
				break
			case left_dir:
				if(left === 0) return
				break
			case right_dir:
				if(left === max_board_len - player_len) return
				break

		}
		//render UI again
		this.setState({
			positions:{
				...this.state.positions,
				player: {
					top: top + (direction.top * player_len),
					left: left + (direction.left * player_len)
				}
			}
		})
	}

	startGame = () => {
		//updating enemy positions every 50 milliseconds
		this.enemyInterval = setInterval(this.updatecurrentEnemySpeed, 40);
        this.timeInterval = setInterval(this.updateGame, 1000);
        this.gameInterval = setInterval(this.incrementEnemyCount, 250);
	}

	incrementEnemyCount = () => {
		const {
			enemies
		} = this.state.positions

		const {
			activeEnemies
		} = this.state

		if(enemies.length < activeEnemies) {
			this.placeEnemy()
		}
	}

	placeEnemy = () => {
		const{
			board_len,
			player_len,
			max_board_len
		} = this.state.size

		// const {top, left} = this.state.positions.player
		const { player: playerPos } = this.state.positions;
		const randomSide = randomGen([up_dir, down_dir, left_dir, right_dir])

		//generate a new enemy on the random side
		this.setState({
				enemyIndex: this.state.enemyIndex + 1
		})

		const newEnemy = {
			key: this.state.enemyIndex,
			dir: randomSide
		}

		switch(randomSide) {
			case up_dir:
				newEnemy.top = max_board_len
				newEnemy.left = playerPos.left
				break

			case down_dir:
				newEnemy.top = 0 - player_len
				newEnemy.left = playerPos.left
				break

			case left_dir:
				newEnemy.top = playerPos.top
				newEnemy.left = max_board_len
				break

			case right_dir:
				newEnemy.top = playerPos.top
				newEnemy.left = 0 - player_len
				break
		}

		this.setState({
			positions:{
				...this.state.positions,
				enemies: [...this.state.positions.enemies].concat(newEnemy)
			}
		})
	}

	updateGame = () => {
		const {
			timeElapsed,
			playerScore,
			baseScore,
			enemyPosition,
			activeEnemies
		} = this.state

		this.setState({
			playerScore: playerScore + baseScore,
			timeElapsed: timeElapsed + 1
		})

		if(timeElapsed > 0) {
			//increase the speed
			if(timeElapsed % 3 == 0) {
				this.setState({
					enemyPosition: parseFloat((enemyPosition + 0.25).toFixed(2))
				})
			}

			//increase the count of enemies by 1
			if(timeElapsed % 10 == 0) {
				this.setState({
					activeEnemies: activeEnemies + 1
				})
			}
		}
	}

	updatecurrentEnemySpeed = () => {
		const {
			positions:{
				enemies
			},
			size: {
				player_len,
				max_board_len
			},
			enemyPosition
		} = this.state

		this.setState({
			positions: {
				...this.state.positions,
				enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
					if(enemy.top < (0 - player_len) || enemy.top > max_board_len + player_len
						|| enemy.left < (0 - player_len) || enemy.left > max_board_len + player_len) {
						enemy.remove = true
						return enemy
					}

					//update the position of enemy
					switch(enemy.dir) {
						case up_dir:
							enemy.top -= enemyPosition
							break
						case down_dir:
							enemy.top += enemyPosition
							break
						case left_dir:
							enemy.left -= enemyPosition
							break
						case right_dir:
							enemy.left += enemyPosition
							break 
					}

					return enemy
				})
			}
		})
	}

	componentDidMount() {
		this.startGame()
	}

	componentWillUnmount() {

	}
}