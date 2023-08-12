import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL =
	'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

function shuffleArray(array) {
	const shuffledArray = array.slice();
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

function App() {
	const [username, setUsername] = useState('');
	const [showCongratulations, setShowCongratulations] = useState(false);
	const [cards, setCards] = useState({});
	const [flippedIndexes, setFlippedIndexes] = useState([]);
	const [matchedPairs, setMatchedPairs] = useState([]);
	const [scoreSuccess, setScoreSuccess] = useState(0);
	const [scoreError, setScoreError] = useState(0);

	const fetchCardData = () => {
		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => {
				const cardImages = data.entries.map((entry) => entry.fields.image);
				console.log('cardImages', cardImages);
				const shuffledImages = shuffleArray(cardImages.concat(cardImages));
				console.log('shuffledImages', shuffledImages);
				const initialCards = shuffledImages.map((imageId, index) => ({
					image: imageId,
					isFlipped: false,
					isMatched: false,
					index,
				}));
				console.log('initialCards', initialCards);
				setCards(initialCards);
			})
			.catch((error) => {
				console.error('Error fetching images:', error);
			});
	};

	useEffect(() => {
		fetchCardData();
	}, []);

	useEffect(() => {
		if (matchedPairs.length === cards.length / 2) {
			setShowCongratulations(true);
		}
	}, [matchedPairs, cards]);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
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
				setScoreSuccess(scoreSuccess + 1); // Increase successful matches score
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card, i) =>
							i === index1 || i === index2 ? { ...card, isFlipped: false } : card
						)
					);
					setScoreError(scoreError + 1); // Increase errors score
				}, 1000);
			}
			setFlippedIndexes([]);
		}
	}, [flippedIndexes, cards, matchedPairs, scoreSuccess, scoreError]);

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
	}, [flippedIndexes, cards, matchedPairs]);

	return (
		<div className='App'>
			<h1>Memory Game</h1>
			{showCongratulations ? (
				<div className='congratulations'>
					Congratulations, {username}!<p>You've successfully matched all the cards!</p>
				</div>
			) : (
				<div className='username-input'>
					<label>
						Please enter your name:
						<input type='text' value={username} onChange={handleUsernameChange} />
					</label>
				</div>
			)}
			<div className='score-card'>
				<div className='score-item success'>
					<span>Success:</span>
					<span>{scoreSuccess}</span>
				</div>
				<div className='score-item error'>
					<span>Error:</span>
					<span>{scoreError}</span>
				</div>
			</div>
			<div className='card-container'>
				{cards.length &&
					cards.map((card, index) => {
						return (
							<div
								key={index}
								id={card.image.uuid}
								className={`card ${card.isFlipped ? 'flipped' : ''} ${
									card.isMatched ? 'matched' : ''
								}`}
								onClick={() => handleCardClick(index)}
							>
								<div className='card-inner'>
									<div className='card-front'>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Card_back_01.svg/703px-Card_back_01.svg.png'
											alt='card-front'
										/>
									</div>
									<div className='card-back'>
										<img src={card.image.url} alt={`Card ${index}`} />
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;
