import { Dayjs } from 'dayjs';

export interface DateRangeFilter {
	startDate?: Dayjs | null;
	endDate?: Dayjs | null;
}
