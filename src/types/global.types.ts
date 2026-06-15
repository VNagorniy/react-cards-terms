import type { Dispatch, SetStateAction } from 'react';

export interface IAuthContext {
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export interface IThemeContext {
	theme: THEME_ENUM;
	setTheme: Dispatch<SetStateAction<THEME_ENUM>>;
}

export enum THEME_ENUM {
	LIGHT = 'light',
	DARK = 'dark'
}
