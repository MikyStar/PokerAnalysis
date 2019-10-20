import React from 'react';

import { Card as CardModel, Suit, Face } from '../model/Card';
import { Card } from './Card';
import { TimeStamp } from '../model/Game';
import * as Logger from '../model/utils/Logger';

import '../style/FrontLine.css'

/////////////////////////////////////////////////////////////////

interface FrontLineProps
{
	cards : CardModel[],
	timeStamp : TimeStamp
}

/////////////////////////////////////////////////////////////////

export const FrontLine = ( { cards, timeStamp } : FrontLineProps ) =>
{
	const printLine = () =>
	{
		const jsx : JSX.Element[] = [];

		if( cards.length === 5 )
		{
			( function trimVisibleCardsGivenTimeStamp()
			{
				let cardsThatWontBeRevieled = 0;

				switch( timeStamp )
				{
					case TimeStamp.PRE_FLOP :
							cardsThatWontBeRevieled = 5;
						break;
					case TimeStamp.FLOP :
							cardsThatWontBeRevieled = 2;
						break;
					case TimeStamp.TURN :
							cardsThatWontBeRevieled = 1;
						break;
					case TimeStamp.RIVER :
							cardsThatWontBeRevieled = 0;
						break;
				}

				for( let i = 0; i < cardsThatWontBeRevieled; i++ )
					cards.pop();
			})();

			cards.forEach( ( card, index ) => jsx.push( <Card
															key={ index }
															suit={ card.suit as Suit }
															id={ card.id as ( number | Face ) }
														/> )
			);
		}
		else
			Logger.error( 'You must provide 5 cards for the front line.' );

		return jsx;
	}

	/////////////////////////////////////////////////////////////////

	return	(
				<div className='container'>
					{ printLine() }
				</div>
			);
}