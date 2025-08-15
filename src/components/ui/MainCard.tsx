import { forwardRef } from 'react';

import { Box, Button, Card, CardActions, CardContent, CardContentProps, CardHeader, CardProps, Divider, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

import CustomBreadcrumbs from './CustomBreadcrumbs';
import DateRangePicker, { DateRangeFilter } from './DateRangePicker';
import SearchCustom from './SearchCustom';

// Types
export interface MainCardProps {
	// Card Properties
	children: React.ReactNode | string;
	border?: boolean;
	boxShadow?: boolean;
	elevation?: number;
	content?: boolean;
	contentSX?: CardContentProps['sx'];
	sx?: CardProps['sx'];

	// Header Properties
	title?: React.ReactNode | string;
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

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
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

			return <SearchCustom keyName={keyName} />;
		};

		// Render date filter component
		const renderDateFilter = () => {
			if (!isShowDateFilter) return null;

			return (
				<Stack direction="row" spacing={1} alignItems="center">
					<DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
				</Stack>
			);
		};

		// Render submit button
		const renderSubmitButton = () => {
			if (!isShowSubmitButton) return null;

			return (
				<Button variant={submitButtonVariant} size={submitButtonSize} onClick={onSubmit} disabled={isSubmitDisabled} loading={isSubmitLoading}>
					{submitButtonText}
				</Button>
			);
		};

		// Render toolbar section
		const renderToolbar = () => {
			const hasToolbarItems = componentToolbar || isShowSearch || isShowDateFilter || isShowSubmitButton || componentAction;

			if (!hasToolbarItems) return null;

			return (
				<Stack direction={toolbarDirection} spacing={2} alignItems="center" sx={{}}>
					{componentToolbar && <Box sx={{ minWidth: 300 }}>{componentToolbar}</Box>}

					<Stack direction="row" spacing={1} alignItems="center">
						{componentActionLeft && (
							<Stack direction="row" spacing={1} alignItems="center">
								{componentActionLeft}
							</Stack>
						)}
						{renderDateFilter()}
						{renderSearch()}
						{renderSubmitButton()}
						{componentAction && (
							<Stack direction="row" spacing={1} alignItems="center">
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
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 1,
						minHeight: 60,
						paddingY: 1,
						paddingX: 2,
						bgcolor: grey[100]
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
				{breadcrumbs && breadcrumbs.length > 0 && <CustomBreadcrumbs breadcrumbs={breadcrumbs} />}

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

export default MainCard;
