import { Game } from './Game';
import { Player } from './Player';
import { TimeStamp, Calculator } from './Calculator'

////////////////////////////////////////////////////////////

const NUMBER_OF_PLAYERS = 4;
const START_LITTLE_BLIND = 5;

////////////////////////////////////////////////////////////

let players = createPlayers( NUMBER_OF_PLAYERS );

let game = new Game( players, START_LITTLE_BLIND );
let timestamps = [ TimeStamp.NONE, TimeStamp.FLOP, TimeStamp.TURN, TimeStamp.REVERSE ]
let line = game.makeTheLine();

////////////////////////////////////////////////////////////

printPlayersHands();
printLine();
printStats();

////////////////////////////////////////////////////////////


function createPlayers( number : number ) : Player[]
{
	let players = [];

	for( let i = 0; i < number; i++ )
		players.push( new Player() );

	return players;
}

function printPlayersHands()
{
	console.log( '\n-----HANDS-----' );

	players.forEach( ( player, id ) =>
	{
		console.log( `Player ${ id } : `, player.hand[ 0 ], player.hand[ 1 ] );
	})
}

function printLine()
{
	console.log( '\n-----LINE-----' );

	console.log( 'FLOP : ', line[ 0 ], line[ 1 ], line [ 2 ] );
	console.log( 'TURN : ', line[ 3 ] );
	console.log( 'REVERSE : ', line[ 4 ] );
}

function printStats()
{
	console.log( '\n-----STATS-----\n' );

	players.forEach( ( player, id ) =>
	{
		console.log( `Player ${ id }\n` );

		timestamps.forEach( timestamp =>
		{
			let calculator = new Calculator( getHands(), line, timestamp, id );

			calculator.printAllStats();
		})
	})

	////////////////////////////////////////////////

	function getHands() : any[]
	{
		let hands : any[] = [];

		players.forEach( player =>
		{
			hands.push( [ player.hand[ 0 ], player.hand[ 1 ] ] );
		});

		return hands;
	}
}