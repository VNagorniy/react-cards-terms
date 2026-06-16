import cls from './HomePage.module.css';
import { API_URL } from '../../constants/global.constants';
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import type { IQuestionCardData } from '../../types/global.types';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
	const [searchParams, setSearchParams] = useState<string>(`?_page=1&_limit=${DEFAULT_PER_PAGE}`);
	const [questions, setQuestions] = useState<IQuestionCardData | null>(null);
	const [searchValue, setSearchValue] = useState<string>('');
	const [sortSelectValue, setSortSelectValue] = useState<string>('');
	const [countSelectValue, setCountSelectValue] = useState<string>(DEFAULT_PER_PAGE.toString());

	const controlsContainerRef = useRef<HTMLDivElement | null>(null);

	const getActivePageNumber = (questions: IQuestionCardData): number | null => (questions.next === null ? questions.last : questions.next - 1);

	const [getQuestions, isLoading, error] = useFetch(async (url) => {
		const response = await fetch(`${API_URL}/${url}`);
		const questions = await response.json();

		setQuestions(questions);
		return questions;
	});

	const cards = useMemo(() => {
		if (questions?.data) {
			if (searchValue.trim()) {
				return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
			} else {
				return questions.data;
			}
		}
		return [];
	}, [questions, searchValue]);

	const pagination = useMemo(() => {
		const totalCardsCount = questions?.pages || 0;

		return Array(totalCardsCount)
			.fill(0)
			.map((_, i) => i + 1);
	}, [questions]);

	useEffect(() => {
		getQuestions(`react${searchParams}`);
	}, [searchParams]);

	const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(e.target.value);
	};

	const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setSortSelectValue(e.target.value);

		setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
	};

	const paginationHandler = (e: MouseEvent<HTMLDivElement>): void => {
		const targetElement = e.target as HTMLElement;

		if (targetElement.tagName === 'BUTTON') {
			setSearchParams(`?_page=${targetElement.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);
			controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const onCountChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setCountSelectValue(e.target.value);
		setSearchParams(`?_page=1&_limit=${e.target.value}&${sortSelectValue}`);
	};

	return (
		<>
			<div className={cls.controlsContainer} ref={controlsContainerRef}>
				<SearchInput value={searchValue} onChange={onSearchChangeHandler} />

				<select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
					<option value="">sort by</option>
					<hr />
					<option value="_sort=level">level ASC</option>
					<option value="_sort=-level">level DESC</option>
					<option value="_sort=completed">completed ASC</option>
					<option value="_sort=-completed">completed DESC</option>
				</select>

				<select value={countSelectValue} onChange={onCountChangeHandler} className={cls.select}>
					<option disabled>count</option>
					<hr />
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>

			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<QuestionCardList cards={cards} />

			{cards.length === 0 ? (
				<p className={cls.noCardsInfo}>No cards...</p>
			) : (
				pagination.length > 1 && (
					<div className={cls.paginationContainer} onClick={paginationHandler}>
						{pagination.map((value) => {
							return (
								<Button key={value} isActive={value === getActivePageNumber(questions as IQuestionCardData)}>
									{value}
								</Button>
							);
						})}
					</div>
				)
			)}
		</>
	);
};
