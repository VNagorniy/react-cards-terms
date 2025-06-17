import cls from './HomePage.module.css';
import { API_URL } from '../../../constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';

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

	const cards = useMemo(() => {
		return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
	}, [questions, searchValue]);

	useEffect(() => {
		getQuestions('react');
	}, []);

	const onSearchChangeHandler = (e) => {
		console.log(e.target.value);
		setSearchValue(e.target.value);
	};

	return (
		<>
			<div className={cls.controlsContainer}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />

				<select value={'s'} onChange={() => {}} className={cls.select}>
					<option value="">sort by</option>
					<hr />
					<option value="">level ASC</option>
					<option value="">level DESC</option>
					<option value="">completed ASC</option>
					<option value="">completed DESC</option>
				</select>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			{cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}
			<QuestionCardList cards={cards} />
		</>
	);
};
