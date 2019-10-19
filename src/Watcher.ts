import { Card, Suit } from './Card';
import * as Logger from './Logger';

/////////////////////////////////////////////////////////////////////////////////////

/**
 * @description A Watcher takes max seven cards and provides functions to find the best combinations
 */
export class Watcher
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
	 * TODO handle straight from As to 5
	 */
	getStraight() : Card[] | undefined
	{
		const straight : Card[] = [];

		let sortedCards = this.sortCardsByValue( this.cards );
		let sortedValues = Array.from( sortedCards, card => card.value );

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

		console.log('eff', effectives );

		Object.keys( effectives ).forEach( value =>
		{
			console.log('bla', value );

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