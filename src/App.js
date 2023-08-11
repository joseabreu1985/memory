import React, { useState, useEffect } from 'react';
import './App.css';

const cardImages = [
	'image1.jpg',
	'image2.jpg',
	// Add more image URLs here
];

function shuffleArray(array) {
	const shuffledArray = array.slice();
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

function App() {
	const [cards, setCards] = useState([]);
	const [flippedIndexes, setFlippedIndexes] = useState([]);
	const [matchedPairs, setMatchedPairs] = useState([]);

	useEffect(() => {
		const shuffledImages = shuffleArray(cardImages.concat(cardImages));
		const initialCards = shuffledImages.map((image, index) => ({
			image,
			isFlipped: false,
			isMatched: false,
			index,
		}));
		setCards(initialCards);
	}, []);

	const handleCardClick = (index) => {
		if (flippedIndexes.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) {
			setFlippedIndexes([...flippedIndexes, index]);
			setCards((prevCards) =>
				prevCards.map((card, i) => (i === index ? { ...card, isFlipped: true } : card))
			);
		}
	};

	useEffect(() => {
		if (flippedIndexes.length === 2) {
			const [index1, index2] = flippedIndexes;
			if (cards[index1].image === cards[index2].image) {
				setMatchedPairs([...matchedPairs, cards[index1].image]);
				setCards((prevCards) =>
					prevCards.map((card, i) =>
						i === index1 || i === index2 ? { ...card, isMatched: true } : card
					)
				);
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card, i) =>
							i === index1 || i === index2 ? { ...card, isFlipped: false } : card
						)
					);
				}, 1000);
			}
			setFlippedIndexes([]);
		}
	}, [flippedIndexes]);

	return (
		<div className='App'>
			<h1>Memory Game</h1>
			<div className='card-container'>
				{cards.map((card, index) => (
					<div
						key={index}
						className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
						onClick={() => handleCardClick(index)}
					>
						<div className='card-inner'>
							<div className='card-front'>?</div>
							<div className='card-back'>
								<img src={`/images/${card.image}`} alt={`Card ${index}`} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
