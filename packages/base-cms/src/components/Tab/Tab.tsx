import { SyntheticEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Badge, Box, Fade, Tab as MuiTab, Tabs as MuiTabs, Typography, alpha, styled } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

export interface TabItem {
	id: string | number;
	label: string;
	icon?: React.ReactElement;
	disabled?: boolean;
	badge?: string | number;
	badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	content?: React.ReactNode;
}

export interface TabProps {
	tabs: TabItem[];
	defaultValue?: string | number;
	value?: string | number;
	onChange?: (value: string | number, index: number) => void;
	variant?: 'standard' | 'scrollable' | 'fullWidth';
	orientation?: 'horizontal' | 'vertical';
	centered?: boolean;
	allowScrollButtonsMobile?: boolean;
	indicatorColor?: 'primary' | 'secondary';
	textColor?: 'primary' | 'secondary' | 'inherit';
	size?: 'small' | 'medium' | 'large';
	persistState?: string; // Key for session storage
	animate?: boolean;
	keepMounted?: boolean; // Keep all tab content mounted to avoid re-rendering
	sx?: SxProps<Theme>;
	tabSx?: SxProps<Theme>;
	contentSx?: SxProps<Theme>;
	ariaLabel?: string;
}

// Styled Components - Enhanced with orientation support
const StyledTabs = styled(MuiTabs, {
	shouldForwardProp: (prop) => !['customSize'].includes(prop as string)
})<{ customSize?: 'small' | 'medium' | 'large'; orientation?: 'horizontal' | 'vertical' }>(({ theme, customSize, orientation = 'horizontal' }) => ({
	'& .MuiTabs-indicator': {
		...(orientation === 'horizontal'
			? {
					height: customSize === 'small' ? 2 : 3,
					width: 'auto',
					borderRadius: 2,
					background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
				}
			: {
					width: customSize === 'small' ? 2 : 3,
					height: 'auto',
					borderRadius: 2,
					background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
				})
	},
	'& .MuiTabs-flexContainer': {
		gap: theme.spacing(0.5),
		...(orientation === 'vertical' && {
			alignItems: 'flex-start'
		})
	},
	'& .MuiTabs-scroller': {
		// borderRadius: theme.spacing(1)
		// backgroundColor: alpha(theme.palette.background.paper, 0.5),
		// boxShadow: theme.shadows[1]
	},
	...(orientation === 'vertical' && {
		minWidth: 200,
		'& .MuiTabs-root': {
			alignItems: 'flex-start'
		}
	})
}));

const StyledTab = styled(MuiTab, {
	shouldForwardProp: (prop) => !['customSize', 'orientation'].includes(prop as string)
})<{ customSize?: 'small' | 'medium' | 'large'; orientation?: 'horizontal' | 'vertical' }>(({ theme, customSize, orientation = 'horizontal' }) => ({
	textTransform: 'none',
	fontWeight: 500,
	fontSize: customSize === 'small' ? '0.875rem' : customSize === 'large' ? '1rem' : '0.9375rem',
	minHeight: customSize === 'small' ? 36 : customSize === 'large' ? 56 : 48,
	minWidth: orientation === 'vertical' ? '100%' : customSize === 'small' ? 80 : customSize === 'large' ? 120 : 100,
	maxWidth: orientation === 'vertical' ? 'none' : undefined,
	padding: theme.spacing(customSize === 'small' ? 0.75 : customSize === 'large' ? 1.5 : 1, customSize === 'small' ? 1.5 : customSize === 'large' ? 3 : 2),
	borderRadius: theme.spacing(1),
	color: theme.palette.text.secondary,
	transition: theme.transitions.create(['color', 'background-color'], {
		duration: theme.transitions.duration.short
	}),
	justifyContent: orientation === 'vertical' ? 'flex-start' : 'center',
	alignItems: 'center',

	'&:hover': {
		color: theme.palette.primary.main,
		backgroundColor: alpha(theme.palette.primary.main, 0.04)
	},

	'&.Mui-selected': {
		color: theme.palette.primary.main,
		fontWeight: 600,
		backgroundColor: alpha(theme.palette.primary.main, 0.08)
	},

	'&.Mui-disabled': {
		color: theme.palette.text.disabled
	},

	'& .MuiTab-iconWrapper': {
		...(orientation === 'horizontal'
			? {
					marginBottom: customSize === 'small' ? 2 : 4,
					marginRight: 0
				}
			: {
					marginBottom: 0,
					marginRight: theme.spacing(1)
				}),
		'& svg': {
			fontSize: customSize === 'small' ? '1.2rem' : customSize === 'large' ? '1.5rem' : '1.3rem'
		}
	},

	...(orientation === 'vertical' && {
		'& .MuiTab-wrapper': {
			flexDirection: 'row',
			alignItems: 'center'
		}
	})
}));

const TabContent = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(1),
	minHeight: 200
}));

// Main Component
export const Tab = ({
	tabs,
	defaultValue,
	value: controlledValue,
	onChange,
	variant = 'standard',
	orientation = 'horizontal',
	centered = false,
	allowScrollButtonsMobile = false,
	indicatorColor = 'primary',
	textColor = 'primary',
	size = 'medium',
	persistState,
	animate = true,
	keepMounted = false,
	sx,
	tabSx,
	contentSx,
	ariaLabel,
	...otherProps
}: TabProps) => {
	// State management
	const [internalValue, setInternalValue] = useState<string | number>(() => {
		if (controlledValue !== undefined) return controlledValue;
		if (persistState) {
			const stored = sessionStorage.getItem(persistState);
			if (stored) return stored;
		}
		return defaultValue || tabs[0]?.id || 0;
	});

	const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

	// Handlers
	const handleChange = useCallback(
		(event: SyntheticEvent, newValue: string | number) => {
			if (controlledValue === undefined) {
				setInternalValue(newValue);
			}

			if (persistState) {
				sessionStorage.setItem(persistState, String(newValue));
			}

			const tabIndex = tabs.findIndex((tab) => tab.id === newValue);
			onChange?.(newValue, tabIndex);
		},
		[controlledValue, persistState, tabs, onChange]
	);

	// Effects
	useEffect(() => {
		if (controlledValue !== undefined) {
			setInternalValue(controlledValue);
		}
	}, [controlledValue]);

	// Render tab with badge
	const renderTab = useCallback(
		(tab: TabItem) => {
			const label = tab.badge ? (
				<Box display="flex" alignItems="center" gap={1} sx={{ width: '100%' }}>
					<Typography variant="inherit" component="span" sx={{ flexGrow: 1 }}>
						{tab.label}
					</Typography>
					<Badge
						badgeContent={tab.badge}
						color={tab.badgeColor || 'primary'}
						sx={{
							'& .MuiBadge-badge': {
								fontSize: '0.7rem',
								minWidth: 16,
								height: 16
							}
						}}
					/>
				</Box>
			) : (
				tab.label
			);

			return (
				<StyledTab
					key={tab.id}
					value={tab.id}
					disabled={tab.disabled}
					customSize={size}
					orientation={orientation}
					icon={tab.icon}
					label={label}
					sx={tabSx}
				/>
			);
		},
		[size, orientation, tabSx]
	);

	// Current tab content
	const currentTab = useMemo(() => tabs.find((tab: TabItem) => tab.id === currentValue), [tabs, currentValue]);

	// Render tab content based on keepMounted prop
	const renderTabContent = useCallback(() => {
		if (keepMounted) {
			// Render all tab contents but only show the active one
			return tabs.map((tab) => (
				<TabContent
					key={tab.id}
					sx={{
						flex: 1,
						display: tab.id === currentValue ? 'block' : 'none',
						...(orientation === 'vertical' && {
							marginLeft: 0,
							minHeight: 'auto'
						}),
						...contentSx
					}}
				>
					{animate ? (
						<Fade in={tab.id === currentValue} timeout={300}>
							<div>{tab.content}</div>
						</Fade>
					) : (
						tab.content
					)}
				</TabContent>
			));
		} else {
			// Original behavior: only render current tab content
			return currentTab?.content ? (
				<TabContent
					sx={{
						flex: 1,
						...(orientation === 'vertical' && {
							marginLeft: 0,
							minHeight: 'auto'
						}),
						...contentSx
					}}
				>
					{animate ? (
						<Fade in timeout={300}>
							<div>{currentTab.content}</div>
						</Fade>
					) : (
						currentTab.content
					)}
				</TabContent>
			) : null;
		}
	}, [keepMounted, tabs, currentValue, currentTab, animate, orientation, contentSx]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: orientation === 'vertical' ? 'row' : 'column',
				gap: orientation === 'vertical' ? 2 : 0,
				width: '100%',
				minHeight: orientation === 'vertical' ? 400 : 'auto'
			}}
		>
			{/* Tabs Header */}
			<StyledTabs
				value={currentValue}
				onChange={handleChange}
				variant={variant}
				orientation={orientation}
				centered={centered}
				allowScrollButtonsMobile={allowScrollButtonsMobile}
				indicatorColor={indicatorColor}
				textColor={textColor}
				aria-label={ariaLabel || 'custom tabs'}
				customSize={size}
				sx={{
					...(orientation === 'horizontal'
						? { width: '100%', borderBottom: 1, borderColor: 'divider' }
						: {
								minWidth: 240,
								maxWidth: 300,
								borderRight: 1,
								borderColor: 'divider'
							}),
					...sx
				}}
				{...otherProps}
			>
				{tabs.map(renderTab)}
			</StyledTabs>

			{/* Tab Content */}
			{renderTabContent()}
		</Box>
	);
};
