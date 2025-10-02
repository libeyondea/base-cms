import React, { useEffect, useRef, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Divider, FormLabel, Grid, IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import { WEEK_DAYS } from '~/utils/constant';

// Json mẫu:
// [
//     {
//         "days": ["2"],
//         "entry_start": "08:00",
//         "entry_end": "10:00",
//         "exit_start": "16:00",
//         "exit_end": "18:00"
//     },
//     {
//         "days": ["0", "1"],
//         "entry_start": "08:00",
//         "entry_end": "10:00",
//         "exit_start": "16:00",
//         "exit_end": "18:00"
//     }
// ]

// Json mẫu 2:
// [
//     {
//         "days": ["2"],
//         "start": "08:00",
//         "end": "10:00"
//     },
//     {
//         "days": ["0", "1"],
//         "start": "08:00",
//         "end": "10:00"
//     }
// ]

// TODO: Fix bug: Khi chọn ngày vào lịch khác thì ngày đó sẽ bị mất

// Cấu trúc dữ liệu thời gian biểu
interface ScheduleItem {
	days: string[]; // 0,1,2,3,4,5,6 tương ứng CN-T7 (multiple days)
	entry_start?: string; // Giờ vào bắt đầu
	entry_end?: string; // Giờ vào kết thúc
	exit_start?: string; // Giờ ra bắt đầu
	exit_end?: string; // Giờ ra kết thúc
	start?: string; // Giờ bắt đầu (cho định dạng đơn giản)
	end?: string; // Giờ kết thúc (cho định dạng đơn giản)
}

interface RHFScheduleTimePickerProps {
	name: string; // Tên trường form
	label?: string; // Nhãn hiển thị
	simpleMode?: boolean; // Có sử dụng chế độ đơn giản không
	type?: 'all' | 'entry' | 'exit'; // Loại hiển thị: all (cả entry và exit), entry (chỉ entry), exit (chỉ exit)
}

const RHFScheduleTimePicker = ({ name, label, simpleMode = false, type = 'all' }: RHFScheduleTimePickerProps) => {
	const { control, setValue, watch } = useFormContext();

	const scheduleValue = watch(name);

	const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
	const [daySelectionError, setDaySelectionError] = useState<number | null>(null);

	const isInitialized = useRef(false);
	const previousType = useRef(type);

	// Tính toán ngày đã được chọn trong các lịch khác
	const getUsedDaysExcept = (currentIndex: number) => {
		const usedDays = new Set<string>();
		scheduleItems.forEach((item, idx) => {
			if (idx !== currentIndex) {
				item.days?.forEach((day) => usedDays.add(day));
			}
		});
		return usedDays;
	};

	// Kiểm tra xem tất cả các ngày trong tuần đã được chọn hay chưa
	const areAllDaysCovered = () => {
		const allDays = ['0', '1', '2', '3', '4', '5', '6'];
		const selectedDays = new Set<string>();

		scheduleItems.forEach((item) => {
			item.days?.forEach((day) => selectedDays.add(day));
		});

		return allDays.every((day) => selectedDays.has(day));
	};

	// Khởi tạo thời gian biểu từ giá trị form
	useEffect(() => {
		if (scheduleValue) {
			try {
				const parsedSchedule = JSON.parse(scheduleValue);
				setScheduleItems(parsedSchedule);
			} catch (e) {
				// Nếu parse lỗi, tạo một mục mặc định theo chế độ hiện tại và type
				const defaultItem = simpleMode
					? { days: ['1'], start: '00:00', end: '00:00' }
					: type === 'entry'
						? { days: ['1'], entry_start: '00:00', entry_end: '00:00' }
						: type === 'exit'
							? { days: ['1'], exit_start: '00:00', exit_end: '00:00' }
							: { days: ['1'], entry_start: '00:00', entry_end: '00:00', exit_start: '00:00', exit_end: '00:00' };

				setScheduleItems([defaultItem]);
				setValue(name, JSON.stringify([defaultItem]));
			}
		} else {
			// Nếu chưa có giá trị, tạo mục mặc định theo chế độ hiện tại và type
			const defaultItem = simpleMode
				? { days: ['1'], start: '00:00', end: '00:00' }
				: type === 'entry'
					? { days: ['1'], entry_start: '00:00', entry_end: '00:00' }
					: type === 'exit'
						? { days: ['1'], exit_start: '00:00', exit_end: '00:00' }
						: { days: ['1'], entry_start: '00:00', entry_end: '00:00', exit_start: '00:00', exit_end: '00:00' };

			setScheduleItems([defaultItem]);
			setValue(name, JSON.stringify([defaultItem]));
		}
		isInitialized.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Cập nhật scheduleValue khi type thay đổi
	useEffect(() => {
		// Chỉ chạy khi đã khởi tạo và type thay đổi
		if (isInitialized.current && previousType.current !== type && scheduleItems.length > 0) {
			// Chuyển đổi dữ liệu hiện tại để phù hợp với type mới
			const convertedItems = scheduleItems.map((item) => {
				if (simpleMode) {
					return { days: item.days, start: item.start || '00:00', end: item.end || '00:00' };
				}

				const newItem: ScheduleItem = { days: item.days };

				if (type === 'entry' || type === 'all') {
					newItem.entry_start = item.entry_start || '00:00';
					newItem.entry_end = item.entry_end || '00:00';
				}

				if (type === 'exit' || type === 'all') {
					newItem.exit_start = item.exit_start || '00:00';
					newItem.exit_end = item.exit_end || '00:00';
				}

				return newItem;
			});

			setScheduleItems(convertedItems);
			setValue(name, JSON.stringify(convertedItems));
		}
		previousType.current = type;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	// Thêm mục lịch mới
	const addScheduleItem = () => {
		// Kiểm tra xem tất cả các ngày đã được chọn chưa
		if (areAllDaysCovered()) {
			return; // Không cho phép thêm mới nếu đã chọn đủ các ngày
		}

		// Tìm ngày đầu tiên chưa được sử dụng
		const allDays = ['0', '1', '2', '3', '4', '5', '6'];
		const usedDays = new Set<string>();
		scheduleItems.forEach((item) => {
			item.days?.forEach((day) => usedDays.add(day));
		});

		const availableDays = allDays.filter((day) => !usedDays.has(day));
		const defaultDay = availableDays.length > 0 ? availableDays[0] : '1';

		const newItem = simpleMode
			? { days: [defaultDay], start: '00:00', end: '00:00' }
			: type === 'entry'
				? { days: [defaultDay], entry_start: '00:00', entry_end: '00:00' }
				: type === 'exit'
					? { days: [defaultDay], exit_start: '00:00', exit_end: '00:00' }
					: { days: [defaultDay], entry_start: '00:00', entry_end: '00:00', exit_start: '00:00', exit_end: '00:00' };

		const newItems = [...scheduleItems, newItem];
		setScheduleItems(newItems);
		setValue(name, JSON.stringify(newItems));
	};

	// Xóa mục lịch
	const removeScheduleItem = (index: number) => {
		const newItems = scheduleItems.filter((_, i) => i !== index);
		setScheduleItems(newItems);
		setValue(name, JSON.stringify(newItems));
		setDaySelectionError(null);
	};

	// Cập nhật ngày trong tuần
	const updateScheduleItemDays = (index: number, days: string[]) => {
		// Không cho phép bỏ chọn tất cả các ngày
		if (!days || days.length === 0) {
			setDaySelectionError(index);
			return;
		}

		// Kiểm tra xem ngày đã được chọn trong lịch khác chưa
		const usedDays = getUsedDaysExcept(index);
		const oldDays = scheduleItems[index].days;

		// Tìm các ngày mới được thêm vào
		const newDaysToAdd = days.filter((day) => !oldDays.includes(day));

		// Kiểm tra xem những ngày mới có bị trùng với các lịch khác không
		const conflictDays = newDaysToAdd.filter((day) => usedDays.has(day));

		if (conflictDays.length > 0) {
			// Nếu có ngày bị trùng, giữ nguyên lựa chọn cũ
			return;
		}

		setDaySelectionError(null);
		const newItems = [...scheduleItems];
		newItems[index].days = days;
		setScheduleItems(newItems);
		setValue(name, JSON.stringify(newItems));
	};

	// Cập nhật thời gian
	const updateScheduleItemTime = (
		index: number,
		field: 'entry_start' | 'entry_end' | 'exit_start' | 'exit_end' | 'start' | 'end',
		value: moment.Moment | null
	) => {
		const newItems = [...scheduleItems];
		// Chuyển đổi giá trị từ moment object thành string format HH:mm
		const timeString = value ? value.format('HH:mm') : '00:00';
		newItems[index][field] = timeString;

		// Tự động set giờ kết thúc bằng giờ bắt đầu + 1 tiếng khi thay đổi giờ bắt đầu
		if (field === 'start' && simpleMode) {
			const endTime = value ? value.add(1, 'hour').format('HH:mm') : '01:00';
			newItems[index].end = endTime;
		} else if (field === 'entry_start' && !simpleMode) {
			const endTime = value ? value.add(1, 'hour').format('HH:mm') : '01:00';
			newItems[index].entry_end = endTime;
		} else if (field === 'exit_start' && !simpleMode) {
			const endTime = value ? value.add(1, 'hour').format('HH:mm') : '01:00';
			newItems[index].exit_end = endTime;
		}

		setScheduleItems(newItems);
		setValue(name, JSON.stringify(newItems));
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<>
					<TextField {...field} type="hidden" sx={{ display: 'none' }} />
					<Box>
						{label && <FormLabel>{label}</FormLabel>}

						{scheduleItems.map((item, index) => {
							// Lấy danh sách ngày đã được sử dụng trong các lịch khác
							const usedDaysInOtherSchedules = getUsedDaysExcept(index);

							return (
								<Card key={index} sx={{ mb: 2, p: 1.5 }}>
									<Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
										<Typography variant="body2" sx={{ minWidth: 80 }}>
											Chọn ngày:
										</Typography>
										<Box>
											<ToggleButtonGroup value={item.days} size="small" onChange={(_, value) => updateScheduleItemDays(index, value)}>
												{WEEK_DAYS.map((day) => (
													<ToggleButton
														key={day.id}
														value={day.id}
														sx={{ minWidth: 40 }}
														disabled={!item.days?.includes(day.id) && usedDaysInOtherSchedules.has(day.id)}
													>
														{day.name}
													</ToggleButton>
												))}
											</ToggleButtonGroup>
											{daySelectionError === index && (
												<Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
													Phải chọn ít nhất 1 ngày
												</Typography>
											)}
										</Box>

										<IconButton
											edge="end"
											color="error"
											onClick={() => removeScheduleItem(index)}
											sx={{ ml: 'auto' }}
											disabled={scheduleItems.length <= 1}
										>
											<DeleteIcon />
										</IconButton>
									</Stack>
									{simpleMode ? (
										// Chế độ đơn giản với start và end
										<Grid container spacing={2}>
											<Grid
												size={{
													xs: 12,
													md: 6
												}}
											>
												<Stack direction="row" spacing={1} alignItems="center">
													<Typography variant="body2" sx={{ minWidth: 100 }}>
														Giờ bắt đầu:
													</Typography>
													<MobileTimePicker
														openTo="hours"
														value={item.start ? moment(item.start, 'HH:mm') : null}
														onChange={(value) => updateScheduleItemTime(index, 'start', value)}
														ampm={false}
														slotProps={{
															textField: {
																size: 'small'
															}
														}}
													/>
												</Stack>
											</Grid>
											<Grid
												size={{
													xs: 12,
													md: 6
												}}
											>
												<Stack direction="row" spacing={1} alignItems="center">
													<Typography variant="body2" sx={{ minWidth: 100 }}>
														Giờ kết thúc:
													</Typography>
													<MobileTimePicker
														openTo="hours"
														value={item.end ? moment(item.end, 'HH:mm') : null}
														onChange={(value) => updateScheduleItemTime(index, 'end', value)}
														ampm={false}
														slotProps={{
															textField: {
																size: 'small'
															}
														}}
													/>
												</Stack>
											</Grid>
										</Grid>
									) : (
										// Chế độ chi tiết với entry_start, entry_end, exit_start, exit_end
										<Grid container spacing={2}>
											{(type === 'all' || type === 'entry') && (
												<>
													<Grid
														size={{
															xs: 12,
															md: 6
														}}
													>
														<Stack direction="row" spacing={1} alignItems="center">
															<Typography variant="body2" sx={{ minWidth: 100 }}>
																Giờ vào bắt đầu:
															</Typography>
															<MobileTimePicker
																openTo="hours"
																value={item.entry_start ? moment(item.entry_start, 'HH:mm') : null}
																onChange={(value) => updateScheduleItemTime(index, 'entry_start', value)}
																ampm={false}
																slotProps={{
																	textField: {
																		size: 'small'
																	}
																}}
															/>
														</Stack>
													</Grid>
													<Grid
														size={{
															xs: 12,
															md: 6
														}}
													>
														<Stack direction="row" spacing={1} alignItems="center">
															<Typography variant="body2" sx={{ minWidth: 100 }}>
																Giờ vào kết thúc:
															</Typography>
															<MobileTimePicker
																openTo="hours"
																value={item.entry_end ? moment(item.entry_end, 'HH:mm') : null}
																onChange={(value) => updateScheduleItemTime(index, 'entry_end', value)}
																ampm={false}
																slotProps={{
																	textField: {
																		size: 'small'
																	}
																}}
															/>
														</Stack>
													</Grid>
												</>
											)}

											{type === 'all' && (
												<Grid
													size={{
														xs: 12,
														md: 12
													}}
												>
													<Divider />
												</Grid>
											)}

											{(type === 'all' || type === 'exit') && (
												<>
													<Grid
														size={{
															xs: 12,
															md: 6
														}}
													>
														<Stack direction="row" spacing={1} alignItems="center">
															<Typography variant="body2" sx={{ minWidth: 100 }}>
																Giờ ra bắt đầu:
															</Typography>
															<MobileTimePicker
																openTo="hours"
																value={item.exit_start ? moment(item.exit_start, 'HH:mm') : null}
																onChange={(value) => updateScheduleItemTime(index, 'exit_start', value)}
																ampm={false}
																slotProps={{
																	textField: {
																		size: 'small'
																	}
																}}
															/>
														</Stack>
													</Grid>
													<Grid
														size={{
															xs: 12,
															md: 6
														}}
													>
														<Stack direction="row" spacing={1} alignItems="center">
															<Typography variant="body2" sx={{ minWidth: 100 }}>
																Giờ ra kết thúc:
															</Typography>
															<MobileTimePicker
																openTo="hours"
																value={item.exit_end ? moment(item.exit_end, 'HH:mm') : null}
																onChange={(value) => updateScheduleItemTime(index, 'exit_end', value)}
																ampm={false}
																slotProps={{
																	textField: {
																		size: 'small'
																	}
																}}
															/>
														</Stack>
													</Grid>
												</>
											)}
										</Grid>
									)}
								</Card>
							);
						})}

						<Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={addScheduleItem} disabled={areAllDaysCovered()} sx={{ mb: 1 }}>
							Thêm lịch
						</Button>
						{areAllDaysCovered() && (
							<Typography variant="caption" color="primary" sx={{ display: 'block', ml: 1 }}>
								Đã chọn tất cả các ngày trong tuần
							</Typography>
						)}
						{error && (
							<Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
								{error.message}
							</Typography>
						)}
					</Box>
				</>
			)}
		/>
	);
};

export default RHFScheduleTimePicker;
