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
})