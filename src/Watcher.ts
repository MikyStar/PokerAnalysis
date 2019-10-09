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

	getAllPairs() : Card[][]
	{
		let pileToCheck = this.cards;
		let pairs = [];

		for( let i = 0; i < ( pileToCheck.length - 1 ); i++ )
		{
			let iMChecking = pileToCheck[ i ];

			for( let j = ( i + 1 ); j < pileToCheck.length; j++ )
			{
				if( iMChecking.value === pileToCheck[ j ].value )
				{
					pairs.push( [ iMChecking, pileToCheck[ j ] ] )
				}
			}
		}

		return pairs;
	}

	getBestPair() : Card[]
	{
		let bestPair : Card[] = [];
		let bestValue = 0;

		this.getAllPairs().forEach( pair =>
		{
			let pairValue = <number>pair[ 0 ].value;
			if( pairValue > bestValue )
			{
				bestValue = pairValue
				bestPair = pair;
			}
		});

		return bestPair;
	}

	getHighCard() : Card
	{
		let best = 0;
		let highCard : Card = new Card();

		this.cards.forEach( card =>
		{
			if( <number>card.value > best )
			{
				best = <number>card.value;
				highCard = card;
			}
		});

		return highCard;
	}

	getAll3ofAKind() : Card[][] | undefined
	{
		let pileToCheck = this.cards;
		let combinations : Card[][] = [];

		for( let i = 0; i < ( pileToCheck.length - 2 ); i++ )
		{
			let iMChecking = pileToCheck[ i ];

			for( let j = ( i + 1 ); j < ( pileToCheck.length - 1 ); j++ )
			{
				if( iMChecking.value === pileToCheck[ j ].value )
				{
					for( let k = ( j + 1 ); k < pileToCheck.length; k++ )
					{
						if( iMChecking.value === pileToCheck[ k ].value )
							combinations.push( [ pileToCheck[ i ], pileToCheck[ j ], pileToCheck[ k ] ] );
					}
				}
			}
		}

		return combinations;
	}

	getBest3ofAKind() : Card[]
	{
		let bestValue = 0;
		let bestCombination : Card[] = [];

		( <Card[][]>this.getAll3ofAKind() ).forEach( combination =>
		{
			let value = <number>combination[ 0 ].value ;

			if( value > bestValue )
			{
				bestValue = value;
				bestCombination = combination;
			}
		});

		return bestCombination;
	}

	private removeFromArray( array : any[], element : any )
	{
		for( let i = 0; i < array.length; i++ )
		{
			if ( array[ i ] === element )
				array.splice(i, 1);
		}
	}
}