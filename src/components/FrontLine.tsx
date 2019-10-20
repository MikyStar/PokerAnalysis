import React from 'react';

import { Card as CardModel, Suit, Face } from '../model/Card';
import { Card } from './Card';
import { TimeStamp } from '../model/Game';
import * as Logger from '../model/utils/Logger';

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
		let jsx : JSX.Element[] = [];

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

			cards.forEach( card => jsx.push( <Card suit={ card.suit as Suit } id={ card.id as ( number | Face ) } /> ) );
		}
		else
			Logger.error( 'You must provide 5 cards for the front line.' );

		return jsx;
	}

	/////////////////////////////////////////////////////////////////

	return	(
				<div>
					{ printLine() }
				</div>
			);
}