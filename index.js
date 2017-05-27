import React from 'react';
import ReactDOM from 'react-dom';
import Game from './src/game_container/Game.jsx';

ReactDOM.render(<Game boardLen={13} tileLen={30}/>, document.getElementById('app'));
