import { Game } from './Game';
import { Player } from './Player';

////////////////////////////////////////////////////////////

const NUMBER_OF_PLAYERS = 4;
const START_LITTLE_BLIND = 5;

////////////////////////////////////////////////////////////

let players = createPlayers( NUMBER_OF_PLAYERS );

let game = new Game( players, START_LITTLE_BLIND );

game.distribute();

players.forEach( ( player, id ) => console.log(`hand ${ id }`, player.hand ) )

////////////////////////////////////////////////////////////


function createPlayers( number : number ) : Player[]
{
	let players = [];

	for( let i = 0; i < number; i++ )
		players.push( new Player() );

	return players;
}