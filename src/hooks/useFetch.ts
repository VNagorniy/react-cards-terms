import { useState } from 'react';
import { delayFn } from '../helpers/delayFn';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetch = (callback: (...args: any[]) => void): [(...args: any[]) => Promise<void>, boolean, string] => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fetchFn = async (...args: any[]) => {
		try {
			setIsLoading(true);
			setError('');
			await delayFn();

			const response = callback(...args);

			return response;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error?.message);
			toast.error(error?.message);
		} finally {
			setIsLoading(false);
		}
	};

	return [fetchFn, isLoading, error];
};
