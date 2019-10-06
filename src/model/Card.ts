export class Card
{
	color : Color;
	id : number | Face;

	constructor( color : Color, id : number | Face )
	{
		this.color = color;
		this.id = id;
	}
}

////////////////////////////////////////////////////////////////////

export enum Color
{
	CUBS,
	DIAMOND,
	HEART,
	SPIKE
}

////////////////////////////////////////////////////////////////////

export enum Face
{
	JACK,
	QUEEN,
	KING,
	AS
}