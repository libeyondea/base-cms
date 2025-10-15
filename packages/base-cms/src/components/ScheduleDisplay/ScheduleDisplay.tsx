import { useMemo } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { WEEK_DAYS_CONSTANT } from '~/utils/constant';

// Cấu trúc dữ liệu thời gian biểu
export interface ScheduleItem {
	days: string[]; // 0,1,2,3,4,5,6 tương ứng CN-T7 (multiple days)
	entry_start?: string; // Giờ vào bắt đầu
	entry_end?: string; // Giờ vào kết thúc
	exit_start?: string; // Giờ ra bắt đầu
	exit_end?: string; // Giờ ra kết thúc
	start?: string; // Giờ bắt đầu (cho định dạng đơn giản)
	end?: string; // Giờ kết thúc (cho định dạng đơn giản)
}

// Type guard để kiểm tra đối tượng có tuân theo kiểu ScheduleItem không
const isScheduleItem = (item: any): item is ScheduleItem => {
	return (
		item &&
		Array.isArray(item.days) &&
		(!item.entry_start || typeof item.entry_start === 'string') &&
		(!item.entry_end || typeof item.entry_end === 'string') &&
		(!item.exit_start || typeof item.exit_start === 'string') &&
		(!item.exit_end || typeof item.exit_end === 'string') &&
		(!item.start || typeof item.start === 'string') &&
		(!item.end || typeof item.end === 'string')
	);
};

// Kiểm tra mảng có tuân theo ScheduleItem[]
const isScheduleItemArray = (arr: any[]): arr is ScheduleItem[] => {
	return Array.isArray(arr) && arr.every((item) => isScheduleItem(item));
};

interface ScheduleDisplayProps {
	scheduleData?: ScheduleItem[] | string; // Có thể là mảng ScheduleItem hoặc chuỗi JSON
	label?: string; // Nhãn hiển thị
	simpleMode?: boolean; // Có sử dụng chế độ đơn giản không
}

/**
 * Component hiển thị dữ liệu lịch trình dạng read-only
 * Có thể sử dụng độc lập không cần React Hook Form
 */
export const ScheduleDisplay = ({ scheduleData, label, simpleMode = false }: ScheduleDisplayProps) => {
	const parsedData = useMemo(() => {
		if (!scheduleData) return [];

		if (typeof scheduleData === 'string') {
			try {
				const parsed = JSON.parse(scheduleData);
				// Kiểm tra dữ liệu đã parse có đúng định dạng không
				if (!isScheduleItemArray(parsed)) {
					console.warn('Dữ liệu lịch trình không đúng định dạng ScheduleItem[]');
					return [];
				}
				return parsed;
			} catch (e) {
				console.error('Lỗi parse dữ liệu lịch trình:', e);
				return [];
			}
		}

		// Kiểm tra nếu scheduleData là mảng nhưng không phải ScheduleItem[]
		if (!isScheduleItemArray(scheduleData)) {
			console.warn('scheduleData không đúng định dạng ScheduleItem[]');
			return [];
		}

		return scheduleData;
	}, [scheduleData]);

	return (
		<Box>
			{label && (
				<Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
					{label}:
				</Typography>
			)}
			{parsedData.length > 0 ? (
				<Grid container spacing={1}>
					{parsedData.map((item, index) => (
						<Grid key={index} size={12}>
							<Box sx={{ p: 1, border: '1px solid #eee', borderRadius: 1 }}>
								<Grid container spacing={1}>
									<Grid size={4}>
										<Typography variant="caption" color="textSecondary">
											Ngày:
										</Typography>
										<Typography variant="body2">
											{item.days?.map((day) => WEEK_DAYS_CONSTANT.find((d) => d.id === day)?.name).join(', ')}
										</Typography>
									</Grid>
									{simpleMode ? (
										<>
											<Grid size={4}>
												<Typography variant="caption" color="textSecondary">
													Bắt đầu:
												</Typography>
												<Typography variant="body2">{item.start || '-'}</Typography>
											</Grid>
											<Grid size={4}>
												<Typography variant="caption" color="textSecondary">
													Kết thúc:
												</Typography>
												<Typography variant="body2">{item.end || '-'}</Typography>
											</Grid>
										</>
									) : (
										<>
											<Grid size={4}>
												<Typography variant="caption" color="textSecondary">
													Vào:
												</Typography>
												<Typography variant="body2">{`${item.entry_start || '-'} - ${item.entry_end || '-'}`}</Typography>
											</Grid>
											<Grid size={4}>
												<Typography variant="caption" color="textSecondary">
													Ra:
												</Typography>
												<Typography variant="body2">{`${item.exit_start || '-'} - ${item.exit_end || '-'}`}</Typography>
											</Grid>
										</>
									)}
								</Grid>
							</Box>
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="body1">-</Typography>
			)}
		</Box>
	);
};
