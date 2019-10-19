import { expect } from 'chai';

import { CombinationWatcher } from '../model/CombinationWatcher';
import { Card, Face, Suit } from '../model/Card';

describe( 'Watcher', () =>
{
	it( 'High card', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, 10 ),
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.DIAMOND, 2 ),
			new Card( Suit.SPADES, Face.AS ),

			new Card( Suit.SPADES, 2 ),
			new Card( Suit.HEART, Face.JACK ),
		]);

		let realHighCard = new Card( Suit.SPADES, Face.AS );


		let calculatedHighCard = watcher.getHighCard();

		expect( realHighCard ).eql( calculatedHighCard );
	});


	it( 'Pairs', () =>
	{
		let watcher = new CombinationWatcher(
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
		let watcher = new CombinationWatcher(
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

	it( 'Best double pair', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.CUBS, Face.AS ),
			new Card( Suit.CUBS, 6 ),
			new Card( Suit.HEART, 2 ),
			new Card( Suit.CUBS, Face.KING),
			new Card( Suit.DIAMOND, 2 ),

			new Card( Suit.SPADES, Face.AS ),
			new Card( Suit.HEART, Face.KING ),
		]);

		let realDoublePair =
		[
			[ new Card( Suit.CUBS, Face.KING), new Card( Suit.HEART, Face.KING ) ],
			[ new Card( Suit.CUBS, Face.AS ), new Card( Suit.SPADES, Face.AS ) ]
		];

		let calculated = watcher.getBestDoublePair();

		expect( calculated ).eql( realDoublePair );
	})

	it( 'Three of a kind', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, 5 ),
			new Card( Suit.DIAMOND, 8 ),
			new Card( Suit.CUBS, Face.QUEEN ),
			new Card( Suit.SPADES, 5 ),

			new Card( Suit.CUBS, 5 ),
			new Card( Suit.CUBS, Face.AS ),
		]);

		let realThree = [ new Card( Suit.HEART, 5 ), new Card( Suit.SPADES, 5 ), new Card( Suit.CUBS, 5 ) ];

		let calculated = watcher.getBest3ofAKind();

		expect( calculated ).eql( realThree );
	})

	it( 'Straight', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.DIAMOND, 6 ),
			new Card( Suit.HEART, 5 ),
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.CUBS, Face.QUEEN ),
			new Card( Suit.SPADES, 5 ),

			new Card( Suit.CUBS, 2 ),
			new Card( Suit.CUBS, 4 ),
		]);

		let realStraight =
		[
			new Card( Suit.CUBS, 2 ),
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.CUBS, 4 ),
			new Card( Suit.HEART, 5 ),
			new Card( Suit.DIAMOND, 6 )
		];

		let calculated = watcher.getStraight();

		expect( calculated ).eql( realStraight );
	});

	it( 'The Wheel', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.CUBS, Face.AS ),
			new Card( Suit.CUBS, 3 ),
			new Card( Suit.HEART, 2 ),
			new Card( Suit.CUBS, Face.KING),
			new Card( Suit.DIAMOND, 5 ),
			new Card( Suit.SPADES, 4 ),
			new Card( Suit.HEART, Face.KING ),
		]);

		let realStraight =
		[
			new Card( Suit.CUBS, Face.AS ),
			new Card( Suit.HEART, 2 ),
			new Card( Suit.CUBS, 3 ),
			new Card( Suit.SPADES, 4 ),
			new Card( Suit.DIAMOND, 5 ),
		];

		let calculated = watcher.getStraight();

		expect( calculated ).eql( realStraight );
	});

	it( 'Flush', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.CUBS, Face.KING ),
			new Card( Suit.DIAMOND, 5 ),
			new Card( Suit.DIAMOND, 8 ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
			new Card( Suit.DIAMOND, 10 ),

			new Card( Suit.CUBS, Face.AS ),
			new Card( Suit.DIAMOND, 3 ),
		]);

		let realFlush =
		[
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.DIAMOND, 5 ),
			new Card( Suit.DIAMOND, 8 ),
			new Card( Suit.DIAMOND, 10 ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
		];

		let calculatedFlush = watcher.getFlush();

		expect( calculatedFlush ).eql( realFlush );
	});

	it( 'Full house', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.CUBS, Face.KING ),
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.CUBS, 3 ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
			new Card( Suit.DIAMOND, 10 ),

			new Card( Suit.HEART, 3 ),
			new Card( Suit.SPADES, 3 ),
		]);

		let realFullHouse =
		[
			new Card( Suit.CUBS, 3 ),
			new Card( Suit.HEART, 3 ),
			new Card( Suit.SPADES, 3 ),
			new Card( Suit.CUBS, Face.KING ),
			new Card( Suit.DIAMOND, Face.KING ),
		];

		let calculatedFlush = watcher.getFullHouse();

		expect( calculatedFlush ).eql( realFullHouse );
	});

	it( 'Four of a kind', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, Face.KING ),
			new Card( Suit.DIAMOND, Face.QUEEN ),
			new Card( Suit.DIAMOND, 2 ),
			new Card( Suit.SPADES, Face.KING ),

			new Card( Suit.SPADES, 2 ),
			new Card( Suit.CUBS, Face.KING ),
		]);

		let real4ofA =
		[
			new Card( Suit.DIAMOND, Face.KING ),
			new Card( Suit.HEART, Face.KING ),
			new Card( Suit.SPADES, Face.KING ),
			new Card( Suit.CUBS, Face.KING ),
		];

		let calculatedFlush = watcher.getBest4ofAKind();

		expect( calculatedFlush ).eql( real4ofA );
	});

	it( 'Straight flush', () =>
	{
		let watcher = new CombinationWatcher(
		[
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.HEART, Face.KING ),
			new Card( Suit.DIAMOND, 6 ),
			new Card( Suit.DIAMOND, 2 ),
			new Card( Suit.DIAMOND, 5 ),

			new Card( Suit.DIAMOND, 4 ),
			new Card( Suit.CUBS, Face.KING ),
		]);

		let straightFlush =
		[
			new Card( Suit.DIAMOND, 2 ),
			new Card( Suit.DIAMOND, 3 ),
			new Card( Suit.DIAMOND, 4 ),
			new Card( Suit.DIAMOND, 5 ),
			new Card( Suit.DIAMOND, 6 ),
		];

		let calculatedFlush = watcher.getStraightFlush();

		expect( calculatedFlush ).eql( straightFlush );
	});
})