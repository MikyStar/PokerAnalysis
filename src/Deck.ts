import { Card, Suit, Face } from './Card';

export class Deck
{
	cards : Card[];

	constructor()
	{
		let cards = this.generateCards();
		this.cards = this.shuffle( cards );
	}

	private generateCards() : Card[]
	{
		let cards : Card[] = [];
		let suits : Suit[] = [ Suit.CUBS, Suit.DIAMOND, Suit.HEART, Suit.SPADES ];
		let faces : Face[] = [ Face.JACK, Face.QUEEN, Face.KING, Face.AS ];

		for( let suit = 0; suit < suits.length; suit++ )
		{
			for( let cardNumber = 2; cardNumber <= 10; cardNumber++ )
				cards.push( new Card( suits[ suit ], cardNumber ) );

			for( let face = 0; face < faces.length; face++ )
				cards.push( new Card( suits[ suit ], faces[ face ] ) );
		}

		return cards;
	}

	/**
	 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	 */
	private shuffle( array : Card[] ) : Card[]
	{
		let currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex)
		{
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
}