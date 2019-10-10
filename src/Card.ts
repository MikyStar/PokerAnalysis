export class Card
{
	suit ?: Suit;
	id ?: number | Face;
	value ?: number;

	constructor( suit ?: Suit, id ?: number | Face )
	{
		this.suit = suit;
		this.id = id;

		if( this.id ) this.setValue();
	}

	private setValue()
	{
		switch( this.id )
		{
			case Face.AS :
					this.value = 14;
				break;
			case Face.KING :
					this.value = 13;
				break;
			case Face.QUEEN :
					this.value = 12;
				break;
			case Face.JACK :
					this.value = 11;
				break;
			default :
					this.value = <number>this.id;
				break;
		}
	}
}

////////////////////////////////////////////////////////////////////

export enum Suit
{
	CUBS = 'cubs',
	DIAMOND = 'diamond',
	HEART = 'heart',
	SPADES = 'spades'
}

////////////////////////////////////////////////////////////////////

export enum Face
{
	JACK = 'jack',
	QUEEN = 'queen',
	KING = 'king',
	AS = 'as'
}