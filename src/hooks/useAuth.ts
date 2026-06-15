import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import type { IAuthContext } from '../auth/AuthProvider/AuthProvider';

export const useAuth = (): IAuthContext => {
	return useContext(AuthContext);
};
