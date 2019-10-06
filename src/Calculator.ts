import { Card } from './Card';

export class Calculator
{
	hands : any[];
	line : Card[];

	constructor( hands : any[], line : Card[] )
	{
		this.hands = hands;
		this.line = line;
	}
}