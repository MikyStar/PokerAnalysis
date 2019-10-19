import { Card } from './Card';

export class Player
{
	hand : Card[];
	private pot ?: number;
	bet ?: number;

	constructor( hand ?: Card[], pot ?: number )
	{
		this.hand = hand || [];
		this.pot = pot;
	}
}