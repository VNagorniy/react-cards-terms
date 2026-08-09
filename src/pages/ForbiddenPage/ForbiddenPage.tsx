import { useLocation, useNavigate } from 'react-router-dom';
import cls from './ForbiddenPage.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export const ForbiddenPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuth } = useAuth();

	const fromPage = location.state?.from || '/';

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		isAuth && navigate(fromPage, { replace: true });
	}, [isAuth]);

	return <h2 className={cls.title}>Page is forbidden!!!</h2>;
};
