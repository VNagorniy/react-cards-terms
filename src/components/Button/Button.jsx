import React from 'react';
import cls from './Button.module.css';

export const Button = (props) => {
	const { children } = props;
	return (
		<button className={cls.btn} onClick={props.onClick}>
			{children}
		</button>
	);
};

export default Button;
