import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import MemoryGame from './components/MemoryGame';
import LoginForm from './components/LoginForm';
import { storedUsername } from './helpers/storedUsername';

function App() {
	const [username, setUsername] = useState(storedUsername() || '');
	const [showGame, setShowGame] = useState(false);

	useEffect(() => {
		if (storedUsername()) {
			setShowGame(true);
		}
	}, []);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		localStorage.setItem('userName', username);
		setShowGame(true);
	};

	return (
		<div className='App'>
			<Container className='mt-4 mb-4'>
				<Header />
				{!showGame ? (
					<LoginForm
						username={username}
						handleOnChange={handleUsernameChange}
						handleSubmit={handleSubmit}
					/>
				) : (
					<MemoryGame username={username} />
				)}
			</Container>
		</div>
	);
}

export default App;
