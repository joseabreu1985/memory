import Image from 'react-bootstrap/Image';
import frontCardImg from '../images/question.png';

const SingleCard = ({ card, handleClick }) => {
	//console.log('card', card);
	return (
		<div
			id={card.image.uuid}
			className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${
				card.isMatched ? 'matched' : ''
			}`}
			onClick={handleClick}
		>
			<div className='card-inner'>
				<div className='card-front'>
					<Image src={frontCardImg} alt='card-front' thumbnail fluid />
				</div>
				<div className='card-back'>
					<Image src={card.image.url} alt={`${card.image.title}`} thumbnail fluid />
				</div>
			</div>
		</div>
	);
};

export default SingleCard;
