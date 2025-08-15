import moment from 'moment';

type InputValue = Date | string | number | null | undefined;

export const fTimeNow = () => {
	return moment().format('HH:mm');
};

export const fDateNow = () => {
	return moment().format('YYYY-MM-DD');
};

export const fDateTimeNow = () => {
	return moment().format('YYYY-MM-DD HH:mm');
};

export const fTime = (date: InputValue, newFormat?: string) => {
	const fm = newFormat || 'HH:mm';

	return date ? moment(date).format(fm) : '';
};

export const fDate = (date: InputValue, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY';

	return date ? moment(date).format(fm) : '';
};

export const fDateTime = (date: InputValue, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY HH:mm';

	return date ? moment(date).format(fm) : '';
};

export const fTimestamp = (date: InputValue) => {
	return date ? moment(date).valueOf() : '';
};
