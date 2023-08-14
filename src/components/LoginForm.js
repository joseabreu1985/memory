import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const LoginForm = ({ username, handleSubmit, handleOnChange }) => {
	//console.log('username', username);
	return (
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
									onChange={handleOnChange}
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
	);
};

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleOnChange: PropTypes.func.isRequired,
};

export default LoginForm;
