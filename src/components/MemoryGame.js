import React from 'react';
import useCardData from '../hooks/useCardData';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SuccessAlert from './SuccessAlert';
import ScoreBoards from './ScoreBoards';

import SingleCard from './SingleCard';

const MemoryGame = ({ username }) => {
	const {
		cards,
		handleCardClick,
		scoreSuccess,
		scoreError,
		showCongratulations,
		onReplay,
	} = useCardData();

	return (
		<>
			<Row className='justify-content-md-center mt-2 mb-4'>
				<Col className='score-card fs-3 text'>
					{username && <p>Welcome, {username}!</p>}
					<ScoreBoards successes={scoreSuccess} errors={scoreError} />
				</Col>
			</Row>
			{showCongratulations && username ? (
				<SuccessAlert username={username} onReplay={onReplay} />
			) : null}
			<Row>
				<Col>
					<div className='card-container'>
						{cards.length &&
							cards.map((card, index) => {
								return (
									<SingleCard card={card} key={index} handleClick={() => handleCardClick(index)} />
								);
							})}
					</div>
				</Col>
			</Row>
		</>
	);
};

export default MemoryGame;
