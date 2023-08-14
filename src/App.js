import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import { fetchData } from './services/fetchData';
import ScoreBoards from './components/ScoreBoards';
import SingleCard from './components/SingleCard';

function shuffleCards(cards) {
	const shuffledCards = cards.slice();
	for (let i = shuffledCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
	}
	return shuffledCards;
}

function App() {
	const [username, setUsername] = useState(String);
	const [showGame, setShowGame] = useState(false);
	const [showCongratulations, setShowCongratulations] = useState(false);
	const [cards, setCards] = useState({});
	const [flippedIndexes, setFlippedIndexes] = useState([]);
	const [matchedPairs, setMatchedPairs] = useState([]);
	const [scoreSuccess, setScoreSuccess] = useState(0);
	const [scoreError, setScoreError] = useState(0);

	const fetchCardData = async () => {
		try {
			const data = await fetchData();
			const cardImages = data.map((entry) => entry.fields.image);
			//console.log('rawImages', cardImages);
			const shuffledImages = shuffleCards(cardImages.concat(cardImages));
			//console.log('shuffledImages', shuffledImages);
			const initialCards = shuffledImages.map((imageId, index) => ({
				image: imageId,
				isFlipped: false,
				isMatched: false,
				index,
			}));
			//console.log('initialCards', initialCards);
			setCards(initialCards);
		} catch (error) {
			console.error('Error fetching:', error);
			throw error;
		}
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

	const handleSubmit = (event) => {
		setShowGame(true);
		event.preventDefault();
	};

	const onReplay = () => {
		//console.log('replay');
		fetchCardData();
		setScoreError(0);
		setScoreSuccess(0);
		setShowCongratulations(false);
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
		//console.log('clicked');
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
			<Container className='mt-4 mb-4'>
				<Row className='justify-content-md-center text-center'>
					<Col>
						<h1>Memory Game</h1>
					</Col>
				</Row>

				{!showGame ? (
					<Row className='justify-content-md-center'>
						<Col xs sm='8'>
							<Form className='m-4' onSubmit={handleSubmit}>
								<Row className='align-items-end'>
									<Col xs={12} sm={10}>
										<FloatingLabel controlid='floatingInput' label='Please enter your name:'>
											<Form.Control
												type='text'
												placeholder='Enter your name'
												value={username}
												onChange={handleUsernameChange}
											/>
										</FloatingLabel>
									</Col>
									<Col xs={12} sm={2} className='d-grid gap-2 d-md-block mt-4'>
										<Button type='submit' size='lg'>
											Submit
										</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				) : (
					<>
						<Row className='justify-content-md-center mt-2 mb-4'>
							<Col className='score-card fs-3 text'>
								{username && <p>Welcome, {username}!</p>}
								<ScoreBoards successes={scoreSuccess} errors={scoreError} />
							</Col>
						</Row>
						{showCongratulations && username ? (
							<Row>
								<Col>
									<Alert key='success' variant='success' className='congratulations'>
										Congratulations, {username}! <br /> You've successfully matched all the cards!{' '}
										<br />
										<Button variant='success' onClick={onReplay} className='mt-2'>
											Replay!
										</Button>
									</Alert>
								</Col>
							</Row>
						) : null}
						<Row>
							<Col>
								<div className='card-container'>
									{cards.length &&
										cards.map((card, index) => {
											return (
												<SingleCard
													card={card}
													key={index}
													index={index}
													handleClick={() => handleCardClick(index)}
												/>
											);
										})}
								</div>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</div>
	);
}

export default App;
