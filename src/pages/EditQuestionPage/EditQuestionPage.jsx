import { useParams } from 'react-router-dom';
import { API_URL } from '../../../constants';
import { useFetch } from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { EditQuestion } from './EditQuestion';

export const EditQuestionPage = () => {
	const { id } = useParams();
	const [question, setQuestion] = useState(null);

	const [fetchQuestion, isFetchLoading] = useFetch(async () => {
		const response = await fetch(`${API_URL}/react/${id}`);
		const data = await response.json();

		setQuestion(data);
	});

	useEffect(() => {
		fetchQuestion();
	}, []);

	return (
		<>
			{isFetchLoading && <Loader />}
			{question && <EditQuestion initialState={question} />}
		</>
	);
};
