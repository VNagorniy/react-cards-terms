import React, { useState } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);

	const setCounter = () => {
		setCount((prev) => prev + 1);
		setCount((prev) => prev + 1);
		setCount((prev) => prev + 1);
	};

	return <button onClick={setCounter}>Цифра равна {count}</button>;
};

export default Counter;
