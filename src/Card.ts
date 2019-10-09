export class Card
{
	color ?: Color;
	id ?: number | Face;
	value ?: number;

	constructor( color ?: Color, id ?: number | Face )
	{
		this.color = color;
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

export enum Color
{
	CUBS = 'cubs',
	DIAMOND = 'diamond',
	HEART = 'heart',
	SPIKE = 'spike'
}

////////////////////////////////////////////////////////////////////

export enum Face
{
	JACK = 'jack',
	QUEEN = 'queen',
	KING = 'king',
	AS = 'as'
}