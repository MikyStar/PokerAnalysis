import React from 'react';
import './App.css';
import { Card } from './components/Card';
import { Suit, Face } from './model/Card';
import { FrontLine } from './components/FrontLine';
import { Card as CardModel } from './model/Card';
import { TimeStamp } from './model/Game';

////////////////////////////////////////////////////////////////////

const App : React.FC = () =>
{
	return 	(
				<div>

					<FrontLine
						cards= 	{[
									new CardModel( Suit.CUBS, 5 ),
									new CardModel( Suit.HEART, 5 ),
									new CardModel( Suit.DIAMOND, Face.JACK ),
									new CardModel( Suit.DIAMOND, Face.AS ),
									new CardModel( Suit.DIAMOND, 10 ),
								]}
						timeStamp={ TimeStamp.FLOP }
					/>

				</div>
			);
}

export default App;
