import { Card } from './Card';

export class Calculator
{
	hands : any[];
	line : Card[];
	timestamp : TimeStamp;
	target : number;

	constructor( hands : any[], line : Card[], timestamp : TimeStamp , target : number )
	{
		this.hands = hands;
		this.line = line;
		this.timestamp = timestamp;
		this.target = target;
	}

	printAllStats()
	{
		
	}

	highCard()
	{

	}

	simplePair()
	{

	}

	twoPair()
	{

	}

	threeOfAKind()
	{

	}

	straight()
	{

	}

	flush()
	{

	}

	fullHouse()
	{

	}

	fourOfAKind()
	{

	}

	straightFlush()
	{

	}

	royalFlush()
	{

	}
}

export enum TimeStamp
{
	NONE = 'none',
	FLOP = 'flop',
	TURN = 'turn',
	REVERSE = 'reverse'
}