import cls from './HomePage.module.css';
import { API_URL } from '../../../constants';
import { useEffect, useRef, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';

export const HomePage = () => {
	const [questions, setQuestions] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const inputRef = useRef();

	const [getQuestions, isLoading, error] = useFetch(async (url) => {
		const response = await fetch(`${API_URL}/${url}`);
		const questions = await response.json();

		setQuestions(questions);
		return questions;
	});

	useEffect(() => {
		getQuestions('react');
	}, []);

	const onSearchChangeHandler = (e) => {
		console.log(e.target.value);
		setSearchValue(e.target.value);
	};

	return (
		<>
			<input type="text" value={searchValue} onChange={onSearchChangeHandler} />
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<QuestionCardList cards={questions} />
		</>
	);
};
