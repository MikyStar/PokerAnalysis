export class Card
{
	color ?: Color;
	id ?: number | Face;

	constructor( color ?: Color, id ?: number | Face )
	{
		this.color = color;
		this.id = id;
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