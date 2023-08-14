import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const ScoreBoards = ({ successes, errors }) => {
	return (
		<Row>
			<Col lg='2'>
				<Badge bg='success'>
					Successes: <span>{successes}</span>
				</Badge>
			</Col>
			<Col lg='2'>
				<Badge bg='danger'>
					Errors: <span>{errors}</span>
				</Badge>
			</Col>
		</Row>
	);
};

export default ScoreBoards;
