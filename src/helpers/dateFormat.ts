export const dateFormat = (date: Date): string => {
	return Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
};
