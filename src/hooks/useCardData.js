import { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { shuffleCards } from '../helpers/shuffleCards';

const useCardData = () => {
	const [flippedIndexes, setFlippedIndexes] = useState([]);
	const [matchedPairs, setMatchedPairs] = useState([]);
	const [scoreSuccess, setScoreSuccess] = useState(0);
	const [scoreError, setScoreError] = useState(0);
	const [showCongratulations, setShowCongratulations] = useState(false);
	const [cards, setCards] = useState({});

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
				setScoreSuccess(scoreSuccess + 1);
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card, i) =>
							i === index1 || i === index2 ? { ...card, isFlipped: false } : card
						)
					);
					setScoreError(scoreError + 1);
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

	const onReplay = () => {
		console.log('replay');
		fetchCardData();
		setScoreError(0);
		setScoreSuccess(0);
		setMatchedPairs([]);
		setShowCongratulations(false);
	};

	//console.log(cards);

	return { cards, handleCardClick, scoreSuccess, scoreError, showCongratulations, onReplay };
};

export default useCardData;
