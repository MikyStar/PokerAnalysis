import React from 'react';

import { Card as CardModel, Suit, Face } from '../model/Card'
import { Card } from './Card';

import '../style/UserHole.css'

///////////////////////////////////////////////////

interface UserHoleProps
{
	cards : CardModel[]
}

///////////////////////////////////////////////////

export const UserHole = ( { cards } : UserHoleProps ) =>
(
	<div className='container-userhole'>
		{ printCards( cards ) }
	</div>
);

///////////////////////////////////////////////////

const printCards = ( cards : CardModel[] ) =>
{
	const jsx : JSX.Element[] = [];

	if( cards.length === 2 )
		cards.forEach( ( card, index ) => jsx.push( <Card
														key={ index }
														suit={ card.suit as Suit }
														id={ card.id as ( number | Face ) }
													/> )
		);

	return jsx;
}