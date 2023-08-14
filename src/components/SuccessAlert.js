import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const SuccessAlert = ({ username, onReplay }) => {
	return (
		<Row>
			<Col>
				<Alert key='success' variant='success' className='congratulations'>
					Congratulations, {username}! <br /> You've successfully matched all the cards! <br />
					<Button variant='success' onClick={onReplay} className='mt-2'>
						Replay!
					</Button>
				</Alert>
			</Col>
		</Row>
	);
};

export default SuccessAlert;
