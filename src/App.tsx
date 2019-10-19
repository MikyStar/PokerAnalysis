import React from 'react';
import './App.css';
import { Card } from './components/Card';
import { Suit, Face } from './model/Card';

////////////////////////////////////////////////////////////////////

const App : React.FC = () =>
{
	return 	(
				<div>

					<Card
						id={ Face.KING }
						suit={ Suit.CUBS }
					/>

					<Card
						id={ 10 }
						suit={ Suit.HEART }
					/>
				</div>
			);
}

export default App;
