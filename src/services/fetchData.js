import axios from 'axios';

const API_URL =
	'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';

export const fetchData = async () => {
	try {
		const { data } = await axios.get(API_URL);
		//console.log('cardImages axios', data);
		return data.entries;
	} catch (error) {
		console.error('Error fetching images:', error);
		throw error;
	}
};
