import { Player } from './Player';
import { Deck } from './Deck';
import { Card } from './Card';

export class Game
{
	players : Player[];
	deck : Deck;

	littleBlind : number;
	//playerTurn : number; // Position in the players array

	constructor( players : Player[], littleBlind : number )
	{
		this.players = players;
		this.littleBlind = littleBlind;
		this.deck = new Deck();

		this.distribute();
	}

	riseTheBlind( newLittleBlind : number )
	{

	}

	distribute()
	{
		this.players.forEach( player =>
		{
			player.hand.push( this.pickCard() );
			player.hand.push( this.pickCard() );
		})
	}

	pickCard() : Card
	{
		let card : Card = new Card();

		if( this.deck.cards.length > 0 )
		{
			card = this.deck.cards[ this.deck.cards.length - 1 ];
			this.deck.cards.pop();
		}
		else
			throw new Error();

		return card;
	}

	makeTheLine() : Card[]
	{
		let line = [];

		line.push( this.pickCard() );
		line.push( this.pickCard() );
		line.push( this.pickCard() );

		this.deck.cards.pop();
		line.push( this.pickCard() );

		this.deck.cards.pop();
		line.push( this.pickCard() );

		return line;
	}
}

////////////////////////////////////////////////////////////////////////////

export enum TimeStamp
{
	PRE_FLOP = 'pre-flop',
	FLOP = 'flop',
	TURN = 'turn',
	RIVER = 'river'
}