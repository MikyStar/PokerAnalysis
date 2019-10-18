import { expect } from 'chai';

import { Watcher } from '../src/Watcher';
import { Card, Face, Suit } from '../src/Card';

describe( 'Watcher', () =>
{
	it( 'Check pairs', () =>
	{
		let watcher = new Watcher(
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, Face.KING ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
			new Card( Suit.DIAMOND, 2 ),
			new Card( Suit.SPADES, Face.KING ),

			new Card( Suit.SPADES, 2 ),
			new Card( Suit.HEART, Face.JACK ),
		]);

		let realPairs =
		[
			[ new Card( Suit.DIAMOND, 2 ), new Card( Suit.SPADES, 2 ) ],
			[ new Card( Suit.DIAMOND, Face.KING ), new Card( Suit.HEART, Face.KING ) ],
			[ new Card( Suit.DIAMOND, Face.KING ), new Card( Suit.SPADES, Face.KING ), ],
			[ new Card( Suit.HEART, Face.KING ), new Card( Suit.SPADES, Face.KING ) ]
		];

		let calculatedPairs = watcher.getAllPairs();

		expect( realPairs ).eql( calculatedPairs ); // eql enables deep equality checking for arrays
	})

	it( 'Best pair', () =>
	{
		let watcher = new Watcher(
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, Face.AS ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
			new Card( Suit.CUBS, Face.QUEEN ),
			new Card( Suit.SPADES, Face.JACK ),

			new Card( Suit.SPADES, 2 ),
			new Card( Suit.CUBS, Face.AS ),
		]);

		let bestPair = [ new Card( Suit.HEART, Face.AS ), new Card( Suit.CUBS, Face.AS ) ]

		let calculated = watcher.getBestPair();

		expect( calculated ).eql( bestPair );
	})
})