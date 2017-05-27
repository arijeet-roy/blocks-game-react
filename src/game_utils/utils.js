import React from 'react';
import ReactDOM from 'react-dom';

//enums for directions
export const up_dir = 'UP';
export const down_dir = 'DOWN';
export const left_dir = 'LEFT';
export const right_dir = 'RIGHT';

//helper functions for generating random direction
export const randomGen = (array) => array[Math.floor(Math.random()*array.length)];
