import React from 'react';

import { CalendarToday as CalendarIcon } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputAdornment, Popover, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

// Types
export interface DateRangeFilter {
	startDate?: moment.Moment | null;
	endDate?: moment.Moment | null;
}

export interface DateRangePickerProps {
	dateRange?: DateRangeFilter;
	onDateRangeChange?: (dateRange: DateRangeFilter) => void;
	placeholder?: string;
	size?: 'small' | 'medium';
	minWidth?: string | number;
	disabled?: boolean;
	fullWidth?: boolean;
}

const DateRangePicker = React.memo<DateRangePickerProps>(
	({ dateRange, onDateRangeChange, placeholder = 'Chọn khoảng thời gian', size = 'small', minWidth = '250px', disabled = false, fullWidth = true }) => {
		const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
		const [localDateRange, setLocalDateRange] = React.useState<DateRangeFilter>(dateRange || {});
		const open = Boolean(anchorEl);
		const theme = useTheme();

		// Sync local state when external dateRange changes
		React.useEffect(() => {
			setLocalDateRange(dateRange || {});
		}, [dateRange]);

		const handleClick = (event: React.MouseEvent<HTMLElement>) => {
			if (disabled) return;
			setAnchorEl(event.currentTarget);
			// Reset local state to current external state when opening
			setLocalDateRange(dateRange || {});
		};

		const handleClose = () => {
			setAnchorEl(null);
			// Reset local state when closing without applying
			setLocalDateRange(dateRange || {});
		};

		const handleStartDateChange = (date: moment.Moment | null) => {
			setLocalDateRange({
				...localDateRange,
				startDate: date
			});
		};

		const handleEndDateChange = (date: moment.Moment | null) => {
			setLocalDateRange({
				...localDateRange,
				endDate: date
			});
		};

		const handleClear = () => {
			setLocalDateRange({
				startDate: null,
				endDate: null
			});
		};

		const handleApply = () => {
			// Only execute callback when Apply is clicked
			if (onDateRangeChange) {
				onDateRangeChange(localDateRange);
			}
			setAnchorEl(null);
		};

		const formatDateRange = () => {
			const startDate = dateRange?.startDate;
			const endDate = dateRange?.endDate;

			if (!startDate && !endDate) {
				return placeholder;
			}

			const startStr = startDate ? startDate.format('DD/MM/YYYY') : '___';
			const endStr = endDate ? endDate.format('DD/MM/YYYY') : '___';

			return `${startStr} - ${endStr}`;
		};

		const hasValue = dateRange?.startDate || dateRange?.endDate;
		const hasLocalChanges =
			localDateRange.startDate?.format('YYYY-MM-DD') !== dateRange?.startDate?.format('YYYY-MM-DD') ||
			localDateRange.endDate?.format('YYYY-MM-DD') !== dateRange?.endDate?.format('YYYY-MM-DD');

		return (
			<>
				<TextField
					size={size}
					value={formatDateRange()}
					onClick={handleClick}
					placeholder={placeholder}
					disabled={disabled}
					fullWidth={fullWidth}
					slotProps={{
						input: {
							readOnly: true,
							endAdornment: (
								<InputAdornment position="end">
									<IconButton size="small" onClick={handleClick} disabled={disabled}>
										<CalendarIcon fontSize="small" />
									</IconButton>
								</InputAdornment>
							)
						}
					}}
					sx={{
						minWidth: fullWidth ? '100%' : minWidth,
						width: fullWidth ? '100%' : 'auto',
						cursor: disabled ? 'default' : 'pointer',
						'& .MuiInputBase-input': {
							cursor: disabled ? 'default' : 'pointer',
							color: hasValue ? 'text.primary' : 'text.secondary'
						}
					}}
				/>

				<Popover
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left'
					}}
					slotProps={{
						paper: {
							sx: {
								mt: 1,
								boxShadow: 3,
								border: '1px solid',
								borderColor: 'divider'
							}
						}
					}}
				>
					<Box sx={{ p: 3, minWidth: 350 }}>
						<Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
							Chọn khoảng thời gian
						</Typography>

						<Stack spacing={2.5}>
							<DatePicker
								label="Từ ngày"
								value={localDateRange?.startDate}
								onChange={handleStartDateChange}
								format="DD/MM/YYYY"
								slotProps={{
									textField: {
										variant: 'outlined',
										size: 'small',
										fullWidth: true,
										sx: {
											'& .MuiPickersOutlinedInput-root': {
												'&:hover .MuiPickersOutlinedInput-notchedOutline': {
													borderColor: theme.palette.primary.light
												},
												'&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
													borderColor: theme.palette.primary.main,
													borderWidth: '2px'
												}
											}
										}
									}
								}}
							/>
							<DatePicker
								label="Đến ngày"
								value={localDateRange?.endDate}
								onChange={handleEndDateChange}
								format="DD/MM/YYYY"
								minDate={localDateRange?.startDate || undefined}
								slotProps={{
									textField: {
										variant: 'outlined',
										size: 'small',
										fullWidth: true,
										sx: {
											'& .MuiPickersOutlinedInput-root': {
												'&:hover .MuiPickersOutlinedInput-notchedOutline': {
													borderColor: theme.palette.primary.light
												},
												'&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
													borderColor: theme.palette.primary.main,
													borderWidth: '2px'
												}
											}
										}
									}
								}}
							/>

							<Stack direction="row" spacing={1} sx={{ pt: 1 }}>
								<Button size="small" variant="outlined" onClick={handleClear} sx={{ flex: 1 }}>
									Xóa
								</Button>
								<Button size="small" variant="outlined" onClick={handleClose} sx={{ flex: 1 }}>
									Hủy
								</Button>
								<Button
									size="small"
									variant="contained"
									onClick={handleApply}
									sx={{
										flex: 1,
										bgcolor: hasLocalChanges ? 'primary.main' : 'grey.400',
										'&:hover': {
											bgcolor: hasLocalChanges ? 'primary.dark' : 'grey.500'
										}
									}}
								>
									Áp dụng
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Popover>
			</>
		);
	}
);

export default DateRangePicker;
