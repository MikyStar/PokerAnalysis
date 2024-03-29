import { Card } from './Card';
import { TimeStamp } from './Game';

export class Calculator
{
	hands : any[];
	line ?: Card[];
	timestamp : TimeStamp;
	target : number;

	constructor( hands : any[], line : Card[], timestamp : TimeStamp , target : number )
	{
		this.hands = hands;
		this.timestamp = timestamp;
		this.target = target;

		switch( timestamp )
		{
			case TimeStamp.PRE_FLOP :
					this.line = [];
				break;
			case TimeStamp.FLOP :
					this.line = [ line[ 0 ], line[ 1 ], line[ 2 ] ];
				break;
			case TimeStamp.TURN :
					this.line = [ line[ 0 ], line[ 1 ], line[ 2 ], line[ 4 ] ];
				break;
			case TimeStamp.RIVER :
					this.line = line;
				break;
		}
	}

	printAllStats()
	{
		//TODO
	}

	getBestCombination()
	{

	}

	isPaire( effectiveCards : Card[] )
	{

	}
}