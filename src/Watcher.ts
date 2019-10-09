import { Card } from './Card';

/////////////////////////////////////////////////////////

/**
 * @description A Watcher takes five cards and look for the better combination
 */
export class Watcher
{
	cards : Card[];

	constructor( cards : Card[] )
	{
		this.cards = cards;
	}

	bestCombination()
	{
		this.cards.forEach( card =>
		{

		});
	}

	private bestPaire()
	{
		let pileToCheck = this.cards;
		let bestPairValue : number;
		let bestPair = [];

		pileToCheck.forEach( iMChecking =>
		{
			/*let element = this.cards.find( card => card.id === iMChecking );

			if( element )
			{
				if(bes)
				bestPair = [ iMChecking, element ]

			}*/
		});
	}
}