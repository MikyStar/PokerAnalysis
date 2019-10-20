import React from 'react';

import { Suit, Face } from '../model/Card';
import { Card as CardModel } from '../model/Card';
import { TimeStamp } from '../model/Game';
import { CardSection } from './CardSection'

import '../style/App.css';

////////////////////////////////////////////////////////////////////

export const App : React.FC = () =>
{
	return 	(
				<>
					<CardSection
						lineCards=	{[
										new CardModel( Suit.CUBS, 5 ),
										new CardModel( Suit.HEART, 5 ),
										new CardModel( Suit.DIAMOND, Face.JACK ),
										new CardModel( Suit.DIAMOND, Face.AS ),
										new CardModel( Suit.DIAMOND, 10 )
									]}
						holeCards=	{[
											new CardModel( Suit.SPADES, 7 ),
											new CardModel( Suit.HEART, Face.AS )
									]}
						timeStamp={ TimeStamp.FLOP }
					/>
				</>
			);
}
