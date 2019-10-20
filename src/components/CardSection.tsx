import React from 'react';

import { Card as CardModel } from '../model/Card'
import { TimeStamp } from '../model/Game';
import { FrontLine } from './FrontLine';
import { UserHole } from './UserHole';

import '../style/CardSection.css';

/////////////////////////////////////////////

interface CardSectionProps
{
	lineCards : CardModel[],
	holeCards : CardModel[],
	timeStamp : TimeStamp
}

/////////////////////////////////////////////

export const CardSection = ( props : CardSectionProps ) =>
(
	<div className='container-cards'>
		<UserHole
			cards={ props.holeCards }
		/>

		<FrontLine
			cards={ props.lineCards }
			timeStamp={ props.timeStamp }
		/>
	</div>
)