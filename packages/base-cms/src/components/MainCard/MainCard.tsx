import { forwardRef } from 'react';

import { Box, Button, Card, CardActions, CardContent, CardContentProps, CardHeader, CardProps, Divider, Stack, useTheme } from '@mui/material';

import { Breadcrumbs } from '../Breadcrumbs';
import { DateRangeFilter, DateRangePicker } from '../DateRangePicker';
import { NDatePicker } from '../Input';
import { MainCardSearch } from './MainCardSearch';

interface MainCardProps {
	// Card Properties
	children: React.ReactNode | string;
	border?: boolean;
	boxShadow?: boolean;
	elevation?: number;
	content?: boolean;
	contentSX?: CardContentProps['sx'];
	sx?: CardProps['sx'];

	// Header Properties
	title?: React.ReactNode | string | undefined;
	headerAlign?: 'left' | 'center' | 'right';

	// Toolbar Properties
	componentActionLeft?: React.ReactNode;
	componentAction?: React.ReactNode;
	componentToolbar?: React.ReactNode;
	toolbarDirection?: 'row' | 'column';

	// Search Properties
	isShowSearch?: boolean;
	searchPlaceholder?: string;
	keyName?: string;
	onSearchChange?: (value: string) => void;

	// Date Filter Properties
	isShowDateFilter?: boolean;
	dateRange?: DateRangeFilter;
	onDateRangeChange?: (dateRange: DateRangeFilter) => void;
	dateRangePlaceholder?: string;

	// Single Date Filter Properties
	isShowSingleDateFilter?: boolean;
	singleDate?: string | null;
	onSingleDateChange?: (date: string | null) => void;
	singleDatePlaceholder?: string;

	// Submit Button Properties
	isShowSubmitButton?: boolean;
	submitButtonText?: string;
	submitButtonVariant?: 'text' | 'outlined' | 'contained';
	submitButtonSize?: 'small' | 'medium' | 'large';
	onSubmit?: () => void;
	isSubmitDisabled?: boolean;
	isSubmitLoading?: boolean;

	// Footer Properties
	componentActionFooter?: React.ReactNode;

	// Breadcrumbs
	breadcrumbs?: {
		title: string;
		link?: string;
	}[];
}

export const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
	(
		{
			// Card props
			children,
			border = false,
			boxShadow = true,
			elevation = 4,
			content = true,
			contentSX = {},
			sx = {},

			// Header props
			title,
			headerAlign = 'left',

			// Toolbar props
			componentActionLeft,
			componentAction,
			componentToolbar,
			toolbarDirection = 'row',

			// Search props
			isShowSearch = true,
			searchPlaceholder = 'Tìm kiếm...',
			keyName = '',
			onSearchChange,

			// Date filter props
			isShowDateFilter = false,
			dateRange,
			onDateRangeChange,
			dateRangePlaceholder,

			// Single date filter props
			isShowSingleDateFilter = false,
			singleDate,
			onSingleDateChange,
			singleDatePlaceholder = 'Chọn ngày',

			// Submit button props
			isShowSubmitButton = false,
			submitButtonText = 'Áp dụng',
			submitButtonVariant = 'contained',
			submitButtonSize = 'medium',
			onSubmit,
			isSubmitDisabled = false,
			isSubmitLoading = false,

			// Footer props
			componentActionFooter,

			// Breadcrumbs
			breadcrumbs = [],

			...others
		},
		ref
	) => {
		const theme = useTheme();

		// Render search component
		const renderSearch = () => {
			if (!isShowSearch) return null;

			return (
				<Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
					<MainCardSearch keyName={keyName} />
				</Box>
			);
		};

		// Render date filter component
		const renderFromToDateFilter = () => {
			if (!isShowDateFilter) return null;

			return (
				<Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
					<DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} placeholder={dateRangePlaceholder} />
				</Box>
			);
		};

		// Render single date filter component
		const renderDateFilter = () => {
			if (!isShowSingleDateFilter) return null;

			return (
				<Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
					<NDatePicker
						value={singleDate}
						onChange={onSingleDateChange}
						fullWidth={false}
						size="small"
						slotProps={{
							textField: {
								placeholder: singleDatePlaceholder
							}
						}}
					/>
				</Box>
			);
		};

		// Render submit button
		const renderSubmitButton = () => {
			if (!isShowSubmitButton) return null;

			return (
				<Button
					variant={submitButtonVariant}
					size={submitButtonSize}
					onClick={onSubmit}
					disabled={isSubmitDisabled}
					loading={isSubmitLoading}
					sx={{ width: { xs: '100%', sm: 'auto' } }}
				>
					{submitButtonText}
				</Button>
			);
		};

		// Render toolbar section
		const renderToolbar = () => {
			const hasToolbarItems =
				componentToolbar || isShowSearch || isShowDateFilter || isShowSingleDateFilter || isShowSubmitButton || componentAction || componentActionLeft;

			if (!hasToolbarItems) return null;

			return (
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
					{componentToolbar && <Box sx={{ width: { xs: '100%', sm: 300 } }}>{componentToolbar}</Box>}

					<Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
						{componentActionLeft && (
							<Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
								{componentActionLeft}
							</Stack>
						)}
						{renderFromToDateFilter()}
						{renderDateFilter()}
						{renderSearch()}
						{renderSubmitButton()}
						{componentAction && (
							<Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
								{componentAction}
							</Stack>
						)}
					</Stack>
				</Stack>
			);
		};

		// Render header
		const renderHeader = () => {
			const hasHeader = title || renderToolbar();
			if (!hasHeader) return null;
			return (
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 2,
						minHeight: 60,
						paddingY: 1,
						paddingX: 2
						// bgcolor: theme.palette.grey[50]
					}}
				>
					{title && (
						<CardHeader
							sx={{
								'& .MuiCardHeader-action': { mr: 0 },
								flex: headerAlign === 'center' ? 1 : 'none',
								padding: 0
							}}
							title={title}
						/>
					)}
					{renderToolbar()}
				</Box>
			);
		};

		return (
			<>
				{breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}

				<Card
					elevation={elevation}
					ref={ref}
					sx={{
						border: border ? '1px solid' : 'none',
						borderColor: border ? theme.palette.divider : 'transparent',
						width: '100%',
						height: 'auto',
						display: 'flex',
						flexDirection: 'column',
						...sx
					}}
					{...others}
				>
					{renderHeader()}

					{/* Content divider */}
					{(title || renderToolbar()) && <Divider />}

					{/* Card content */}
					{content ? (
						<CardContent
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								padding: '16px !important',
								...contentSX
							}}
						>
							{children}
						</CardContent>
					) : (
						<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
					)}
					{componentActionFooter && <CardActions sx={{ p: 2, mt: 'auto' }}>{componentActionFooter}</CardActions>}
				</Card>
			</>
		);
	}
);
