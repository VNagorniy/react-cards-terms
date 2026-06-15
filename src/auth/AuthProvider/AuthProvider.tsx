import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';
import { AUTH_STORAGE } from '../../constants/global.constants';
import type { IAuthContext } from '../../types/global.types';

export const AuthContext = createContext<IAuthContext>({
	isAuth: false,
	setIsAuth: () => {}
});

export interface IAuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
	const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || 'false');
	const [isAuth, setIsAuth] = useState<boolean>(isLogin);

	return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
