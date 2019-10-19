import { Game } from './Game';
import { Player } from './Player';
import { TimeStamp, Calculator } from './Calculator'
import { Card, Face, Suit } from './Card';
import { Watcher } from './Watcher';

////////////////////////////////////////////////////////////

const NUMBER_OF_CARDS_IN_A_DECK = 4 * ( 10 + 3 );
const NUMBER_OF_PLAYERS = 4;
const START_LITTLE_BLIND = 5;

////////////////////////////////////////////////////////////

let players = createPlayers( NUMBER_OF_PLAYERS );

let game = new Game( players, START_LITTLE_BLIND );
let timestamps = [ TimeStamp.NONE, TimeStamp.FLOP, TimeStamp.TURN, TimeStamp.RIVER ]
let line = game.makeTheLine();

////////////////////////////////////////////////////////////

// printConfig();
// printPlayersHands();
// printLine();
// printStats();
let cards =
[
	new Card( Suit.CUBS, Face.AS ),
	new Card( Suit.CUBS, 6 ),
	new Card( Suit.HEART, 2 ),
	new Card( Suit.CUBS, Face.KING),
	new Card( Suit.DIAMOND, 2 ),
	new Card( Suit.SPADES, Face.AS ),
	new Card( Suit.HEART, Face.KING ),
]
let watcher = new Watcher( cards );

console.table( cards );

console.log('\n\n double', watcher.getBestDoublePair() );

////////////////////////////////////////////////////////////


function createPlayers( number : number ) : Player[]
{
	let players = [];

	for( let i = 0; i < number; i++ )
		players.push( new Player() );

	return players;
}

function printConfig()
{
	console.log( '\n-----CONFIG-----\n' );
	console.log( `${ NUMBER_OF_PLAYERS } players` )
	console.log( `${ game.deck.cards.length } cards remaining` );
	console.log( `${ NUMBER_OF_CARDS_IN_A_DECK - game.deck.cards.length } cards used` );
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
	console.log( '\n-----STATS-----' );

	players.forEach( ( player, id ) =>
	{
		console.log( `\n---Player ${ id } :` );

		timestamps.forEach( ( timestamp, id ) =>
		{
			console.log( `\n-Timestamp '${ timestamps[ id ] as string }' :` );

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