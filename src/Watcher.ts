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
		//TODO
	}

	// TODO make private
	bestPaire() : Card[]
	{
		let pileToCheck = this.cards;
		let bestPairValue = 0;
		let bestPair : Card[] = [];

		for( let i = 0; i < ( pileToCheck.length - 1 ); i++ )
		{
			let iMChecking = pileToCheck[ i ];

			for( let j = ( i + 1 ); j < pileToCheck.length; j++ )
			{
				if( iMChecking.value === pileToCheck[ j ].value )
				{
					bestPairValue = iMChecking.value as number;
					bestPair = [ iMChecking, pileToCheck[ j ] ]
				}
			}


		}

		/* pileToCheck.forEach( iMChecking =>
		{
			let element = this.cards.find( card => card.value === iMChecking.value );

			if( element )
			{
				if( element.value && ( element.value > bestPairValue ) )
				{
					bestPairValue = element.value;
					bestPair = [ iMChecking, element ]
				}
			}
		}); */

		return bestPair;
	}
}