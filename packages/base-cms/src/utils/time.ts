import moment, { MomentInput } from 'moment';

export const fTimeNow = () => {
	return moment().format('HH:mm');
};

export const fDateNow = () => {
	return moment().format('YYYY-MM-DD');
};

export const fDateTimeNow = () => {
	return moment().format('YYYY-MM-DD HH:mm');
};

export const fTime = (date: MomentInput, newFormat?: string) => {
	const fm = newFormat || 'HH:mm';

	return date ? moment(date).format(fm) : '';
};

export const fDate = (date: MomentInput, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY';

	return date ? moment(date).format(fm) : '';
};

export const fDateTime = (date: MomentInput, newFormat?: string) => {
	const fm = newFormat || 'DD/MM/YYYY HH:mm';

	return date ? moment(date).format(fm) : '';
};

export const fTimestamp = (date: MomentInput) => {
	return date ? moment(date).valueOf() : '';
};
