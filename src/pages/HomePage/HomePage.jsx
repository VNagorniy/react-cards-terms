import cls from './HomePage.module.css';
import { QuestionCard } from '../../components/QuestionCard';
import { API_URL } from '../../../constants';
import { useEffect, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';

export const HomePage = () => {
	const [questions, setQuestions] = useState([]);

	const getQuestions = async () => {
		try {
			const response = await fetch(`${API_URL}/react`);
			const questions = await response.json();
			setQuestions(questions);
			console.log('questions', questions);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []);

	return (
		<>
			<QuestionCardList cards={questions} />
		</>
	);
};
