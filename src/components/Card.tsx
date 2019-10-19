import React from 'react';

import { Suit, Face } from '../model/Card'
import './Card.css'
import cubs from '../assets/cubs.png';
import spades from '../assets/spades.png';
import heart from '../assets/heart.png';
import diamond from '../assets/diamond.png';

///////////////////////////////////////////////////

type CardProps =
{
	suit : Suit,
	id : number | Face
}

///////////////////////////////////////////////////

export const Card = ( { suit, id} : CardProps ) =>
(
	<div>
		<h3 className='id'>{ handleID( id ) }</h3>
		<img className='suit' src={ getIcon( suit ) } width={ 80 } height={ 80 } />
	</div>
)

///////////////////////////////////////////////////

const getIcon = ( suit : Suit ) : string =>
{
	switch( suit )
	{
		case Suit.CUBS :
			return cubs;
		case Suit.HEART :
			return heart;
		case Suit.SPADES :
			return spades;
		case Suit.DIAMOND :
			return diamond;
	}
}

const handleID = ( id : number | Face ) : string =>
{
	switch( id )
	{
		case Face.AS :
			return 'A';
		case Face.KING :
			return 'K';
		case Face.QUEEN :
			return 'Q';
		case Face.JACK :
			return 'J';
		default :
			return String( id );
	}
}