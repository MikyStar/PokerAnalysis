import { Card, Color, Face } from './Card';

export class Deck
{
	cards : Card[];

	constructor()
	{
		this.cards = this.generateCards();
	}

	private generateCards() : Card[]
	{
		let cards : Card[] = [];
		let colors : Color[] = [ Color.CUBS, Color.DIAMOND, Color.HEART, Color.SPIKE ];
		let faces : Face[] = [ Face.JACK, Face.QUEEN, Face.KING, Face.AS ];

		for( let color = 0; color < colors.length; color++ )
		{
			for( let cardNumber = 2; cardNumber <= 10; cardNumber++ )
				cards.push( new Card( colors[ color ], cardNumber ) );

			for( let face = 0; face < faces.length; face++ )
				cards.push( new Card( colors[ color ], faces[ face ] ) );
		}

		return cards;
	}
}