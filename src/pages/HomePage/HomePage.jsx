import cls from './HomePage.module.css';
import { QuestionCard } from '../../components/QuestionCard';
import { API_URL } from '../../../constants';
import { useEffect, useState } from 'react';

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
			{questions.map((card, index) => {
				return <QuestionCard card={card} key={index} />;
			})}
		</>
	);
};
