import { Card, Suit } from './Card';
import * as Logger from './utils/Logger';

/////////////////////////////////////////////////////////////////////////////////////

/**
 * @description A Watcher takes max seven cards and provides functions to find the best combinations
 */
export class CombinationWatcher
{
	cards : Card[];

	constructor( cards : Card[] )
	{
		if( this.checkEveryCardIsDifferent( cards ) )
			this.cards = cards;
		else
		{
			this.cards = [];
			Logger.error( "Cards provided are not all differents" );
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////

	bestCombination()
	{
		//TODO
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

	/**
	 * @returns retrieve all pairs, sorted by decreasing value
	 */
	getAllPairs() : Card[][]
	{
		let pileToCheck =  this.sortCardsByValue( this.cards );
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

	/**
	 * @returns An array of pairs of cards sorted in increasing order by their value
	 */
	getBestDoublePair() : Card[][] | undefined
	{
		let doublePair : Card[][] = [];
		let bestValue = 0;
		let secondBestValue = 0;

		let effectives = this.getNbOfEachValue( this.cards );

		Object.keys( effectives ).forEach( id =>
		{
			if( effectives[ id ] === 2 )
			{
				if( bestValue < Number( id ) )
				{
					secondBestValue = bestValue;
					bestValue = Number( id )
				}
				else if( secondBestValue < Number( id ) )
					secondBestValue = Number( id )
			}
		});

		if( bestValue && secondBestValue )
		{
			this.getAllPairs().forEach( pair =>
			{
				if( pair[ 0 ].value === bestValue )
					doublePair = [ ...doublePair, pair ]; // Array destructuring this way to sort them

				if( pair[ 0 ].value === secondBestValue )
					doublePair = [ pair, ...doublePair ]; // Array destructuring this way to sort them
			});

			return doublePair;
		}
		else
			return []
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

	/**
	 * @summary It sort the cards by their value and check if 5 cards in a row follows each others
	 */
	getStraight() : Card[] | undefined
	{
		const straight : Card[] = [];

		let sortedCards = this.sortCardsByValue( this.cards );
		let sortedValues = Array.from( sortedCards, card => card.value );

		let isThereTheWheel = ( sortedValues[ 0 ] === 2 ) && ( sortedValues[ 1 ] === 3 )
			&& ( sortedValues[ 2 ] === 4 ) && ( sortedValues[ 3 ] === 5 ) && ( sortedValues[ 6 ] === 14 );

		if( isThereTheWheel )
			return [ sortedCards[ 6 ], sortedCards[ 0 ], sortedCards[ 1 ], sortedCards[ 2 ], sortedCards[ 3 ] ];

		for( let i = 0; i < ( sortedCards.length - 1 ); i++ )
		{
			let current = <number>sortedValues[ i ];
			let next = <number>sortedValues[ i + 1 ];

			if( ( current + 1 ) === next )
			{
				if( straight.length === 0 )
					straight.push( sortedCards[ i ] );

				straight.push( sortedCards[ i + 1 ] );
			}
		}

		return this.keepTheFiveBestFromValue( straight );
	}

	/**
	 * @returns The flush cards in increasing order
	 */
	getFlush() : Card[] | undefined
	{
		let flush : Card[] = [];
		let largestQtty = 0;

		let counters = this.getNbOfEachSuit();

		Object.keys( counters ).forEach( suit =>
		{
			if( counters[ suit ] > largestQtty )
			{
				let allOfThem = this.cards.filter( card => card.suit === suit );
				flush = this.sortCardsByValue( allOfThem );
				largestQtty = counters[ suit ];
			}
		})

		return this.keepTheFiveBestFromValue( flush );
	}

	/**
	 * @returns The flush cards in increasing order
	 */
	getFullHouse() : Card[] | undefined
	{
		const CARDS_NEEDED_IN_A_ROW = 5;

		let three = this.getBest3ofAKind();
		let pairs = this.getAllPairs().reverse() // To have the best ones first;
		let thePair : Card[] = [];

		searchBestPairOtherThanThoseFromThree :
		for( let i = 0; i < pairs.length; i++ )
		{
			if( pairs[ i ][ 0 ].value !== three[ 0 ].value )
			{
				thePair = pairs[ i ];
				break searchBestPairOtherThanThoseFromThree;
			}
		}

		let full = [ ...three, ...thePair ];

		if( full.length === CARDS_NEEDED_IN_A_ROW )
			return full;
		else
			[];
	}

	getBest4ofAKind() : Card[] | undefined
	{
		let effectives = this.getNbOfEachValue( this.cards );
		let fourOfAKind : Card[] = [];
		let biggestValue : number = 0;

		Object.keys( effectives ).forEach( value =>
		{
			if( ( effectives[ value ] === 4 ) && ( biggestValue < ( value as unknown as number  ) ) )
				biggestValue = Number( value );
		});

		if( biggestValue !== 0 )
		{
			this.sortCardsByValue( this.cards ).forEach( card =>
			{
				if( card.value === biggestValue )
					fourOfAKind.push( card );
			})
		}

		return fourOfAKind;
	}

	getStraightFlush() : Card[] | undefined
	{
		let straight = this.getStraight();
		let flush = this.getFlush();

		if( straight && flush )
		{
			for( let i = 0; i < straight.length; i++ )
				if( ( straight[ i ].suit !== flush[ i ].suit ) || ( straight[ i ].value !== flush[ i ].value ) )
					return []

			return [ ...straight ];
		}
		else
			return []
	}

	/////////////////////////////////////////////////////////////////////////////////////

	/**
	 * @param cards - In increasing order
	 */
	private sortCardsByValue( cards : Card[] )
	{
		return cards.sort( ( a, b ) =>
		{
			if ( <number>a.value < <number>b.value )
				return -1;
			if ( <number>a.value > <number>b.value )
				return 1;

			return 0;
		});
	}

	/**
	 * @description Sort cards in increasing order and returns only the 5 highest ones (based on their value)
	 */
	private keepTheFiveBestFromValue( cards : Card[] ) : Card[] | undefined
	{
		const CARDS_NEEDED_IN_A_ROW = 5;

		cards = this.sortCardsByValue( cards )

		if( cards.length === CARDS_NEEDED_IN_A_ROW )
			return cards;
		else if( cards.length > CARDS_NEEDED_IN_A_ROW )
		{
			while( cards.length !== CARDS_NEEDED_IN_A_ROW )
				cards.shift();

			return cards;
		}
		else
			return [];
	}

	private checkEveryCardIsDifferent( cards : Card[] ) : boolean
	{
		for( let i = 0; i < cards.length; i++ )
			for( let j = 0; j < cards.length; j++)
				if( ( i !== j )
					&& ( ( cards[ i ].suit === cards[ j ].suit ) && ( cards[ i ].value === cards[ j ].value ) ) )
					return false;

		return true;
	}

	/**
	 * @returns An object where the key is the suit and the value is the quantity
	 */
	private getNbOfEachSuit()
	{
		let counters : any = {};

		this.cards.forEach( card =>
		{
			if( counters === {} )
				counters = { [ <string>card.suit ] : 1 };
			else if( counters.hasOwnProperty( `${ <Suit>card.suit }` ) )
				counters[ `${ <Suit>card.suit }` ]++;
			else
				counters[ `${ <Suit>card.suit }` ] = 1;
		});

		return counters;
	}

	/**
	 * @returns An object where value is key and number is value. Sorted increasingly
	 */
	private getNbOfEachValue( cards : Card[] )
	{
		let counters : any = {};

		cards.forEach( card =>
		{
			if( Object.keys( counters ).length === 0 )
				counters = { [ <number>card.value ] : 1 };
			else if( counters.hasOwnProperty( `${ card.value }` ) )
				counters[ `${ card.value }` ]++;
			else
				counters[ `${ card.value }` ] = 1;
		});

		return counters;
	}
}