import dayjs, { Dayjs } from 'dayjs';

export const fTimeNow = () => {
	return dayjs().format('HH:mm');
};

export const fDateNow = () => {
	return dayjs().format('YYYY-MM-DD');
};

export const fDateTimeNow = () => {
	return dayjs().format('YYYY-MM-DD HH:mm');
};

export const fTime = (date: string | number | Date | Dayjs | null | undefined, newFormat?: string) => {
	const fm = newFormat || 'HH:mm';

	return date ? dayjs(date).format(fm) : '';
};

export const fDate = (date: string | number | Date | Dayjs | null | undefined, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY';

	return date ? dayjs(date).format(fm) : '';
};

export const fDateTime = (date: string | number | Date | Dayjs | null | undefined, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY HH:mm';

	return date ? dayjs(date).format(fm) : '';
};

export const fTimestamp = (date: string | number | Date | Dayjs | null | undefined) => {
	return date ? dayjs(date).valueOf() : '';
};
