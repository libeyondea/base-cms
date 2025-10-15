import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, Chip, ChipProps, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';

import { hexToRgba } from '~/utils/color';

import { Avatar } from '../Avatar';
import { StatusChip } from '../StatusChip';

export interface CustomFieldProps {
	label: string;
	value?: React.ReactNode;
	bold?: boolean;
	isStatusChip?: boolean;
	statusData?: any[];
	statusValue?: number | string;
	chipSize?: ChipProps['size'];
	chipVariant?: ChipProps['variant'];
}

export interface CustomListItemProps {
	id?: string | number;
	title?: string;
	subtitle?: string;
	description?: string;
	path?: string;
	path2?: string;
	path3?: string;
	tripleImage?: boolean;
	action?: React.ReactNode;
	statusLabel?: string;
	status?: number;
	statusData?: any[];
	customFields?: CustomFieldProps[];
	baseUrl?: string;
	dualImage?: boolean;
	dataInitial?: any;
}

export interface ItemListProps {
	titleSX?: SxProps<Theme>;
	items: CustomListItemProps[];
	onItemClick?: (item: CustomListItemProps) => void;
	onItemClick2?: (item: CustomListItemProps) => void;
	selectedId?: string | number | null;
	emptyMessage?: string;
	baseUrl?: string;
	maxHeight?: string;
}

// Default color when statusData is not available
const DEFAULT_COLOR = '#9e9e9e';

// Helper function to get color from statusData
const getColorFromStatusData = (status: number | undefined, statusData: any[] | undefined): string => {
	if (status === undefined || !statusData) return DEFAULT_COLOR;

	const statusItem = statusData.find((item) => item.id === status);
	return statusItem?.color || DEFAULT_COLOR;
};

const getBackgroundByType = (item: CustomListItemProps, theme: Theme) => {
	const { status, statusData } = item;

	// Get color from statusData or use default
	const color = getColorFromStatusData(status, statusData);
	return `linear-gradient(90deg, ${hexToRgba(color, 0.1)} 70%, ${theme.palette.background.paper} 100%)`;
};

const getBorderLeftByType = (item: CustomListItemProps) => {
	const { status, statusData } = item;

	// Get color from statusData or use default
	const color = getColorFromStatusData(status, statusData);

	// Use the color directly for the border
	return `5px solid ${color}`;
};

const getBoxShadowByType = (item: CustomListItemProps, theme: Theme) => {
	const { status, statusData } = item;

	// Get color from statusData or use default
	const color = getColorFromStatusData(status, statusData);
	return `0px 2px 5px ${hexToRgba(color, 1)}`;
};

const getColorByType = (item: CustomListItemProps) => {
	const { status, statusData } = item;

	// Get color from statusData or use default
	return getColorFromStatusData(status, statusData);
};

export const ItemList = ({
	items,
	onItemClick,
	onItemClick2,
	selectedId,
	emptyMessage,
	baseUrl,
	maxHeight = 'calc(100vh - 300px)',
	titleSX
}: ItemListProps) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				flex: 1,
				overflow: 'auto',
				pr: 1,
				// Custom scrollbar styling
				'&::-webkit-scrollbar': {
					width: '8px'
				},
				'&::-webkit-scrollbar-track': {
					background: theme.palette.grey[100],
					borderRadius: '4px'
				},
				'&::-webkit-scrollbar-thumb': {
					background: theme.palette.grey[400],
					borderRadius: '4px',
					'&:hover': {
						background: theme.palette.grey[600]
					}
				},
				'&::-webkit-scrollbar-thumb:active': {
					background: theme.palette.primary.main
				},
				// Firefox scrollbar styling
				scrollbarWidth: 'thin',
				scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[100]}`
				// height: maxHeight
			}}
		>
			<List sx={{ width: '100%', height: maxHeight, p: 0 }}>
				{items.length === 0 ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<SentimentDissatisfiedIcon color="action" style={{ fontSize: 60, opacity: 0.6 }} />
						<Typography color="text.secondary">{emptyMessage || 'Không có dữ liệu'}</Typography>
					</Box>
				) : (
					items.map((item, index) => {
						return (
							<Paper
								key={item.id || index}
								elevation={selectedId === item.id ? 8 : 1}
								sx={{
									mb: 1.5,
									borderRadius: 2,
									background: getBackgroundByType(item, theme),
									boxShadow: 3,
									// borderLeft: getBorderLeftByType(item),
									transition: 'all 0.18s',
									'&:hover': {
										transform: 'translateX(2px)',
										boxShadow: getBoxShadowByType(item, theme)
									},
									cursor: 'pointer'
								}}
							>
								<ListItem
									alignItems="center"
									onClick={() => onItemClick && onItemClick(item)}
									sx={{
										p: 1.5,
										'& .MuiListItemSecondaryAction-root': {
											position: 'absolute',
											top: '90%',
											right: 8
										}
									}}
									// secondaryAction={
									// 	item.action ? (
									// 		<Box
									// 			sx={{
									// 				display: 'flex',
									// 				flexDirection: 'column',
									// 				alignItems: 'flex-end'
									// 			}}
									// 		>
									// 			<Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5 }}>
									// 				{item.action}
									// 			</Typography>
									// 		</Box>
									// 	) : undefined
									// }
								>
									<ListItemAvatar
										sx={{
											m: 0,
											mr: 1,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 1
										}}
									>
										<Avatar
											currentImage={{
												path: item.path ? (baseUrl ? `${baseUrl}${item.path}` : item.path) : '',
												title: item.title || ''
											}}
										/>
										{item.dualImage && (
											<Avatar
												currentImage={{
													path: item.path2 ? (baseUrl ? `${baseUrl}${item.path2}` : item.path2) : '',
													title: item.title || ''
												}}
											/>
										)}
										{item.tripleImage && (
											<Avatar
												currentImage={{
													path: item.path3 ? (baseUrl ? `${baseUrl}${item.path3}` : item.path3) : '',
													title: item.title || ''
												}}
											/>
										)}
									</ListItemAvatar>
									<ListItemText
										onClick={() => onItemClick2 && onItemClick2(item)}
										sx={{ m: 0 }}
										slotProps={{
											primary: { component: Box },
											secondary: { component: Box }
										}}
										primary={
											<Stack spacing={0.5}>
												{/* Main title */}
												{item.title && (
													<Typography
														fontWeight={600}
														fontSize="1.07rem"
														sx={{
															// color: getColorByType(item),
															...titleSX
														}}
													>
														{item.title}
													</Typography>
												)}

												{/* Subtitle if available */}
												{item.subtitle && (
													<Typography
														fontSize="0.95rem"
														component="span"
														sx={{
															// color: getColorByType(item),
															fontStyle: 'italic',
															fontWeight: 600,
															wordBreak: 'break-word',
															whiteSpace: 'pre-line',
															overflowWrap: 'break-word',
															display: 'block'
														}}
													>
														{item.subtitle}
													</Typography>
												)}

												{/* Description if available */}
												{item.description && (
													<Typography variant="body2" color="text.secondary">
														{item.description}
													</Typography>
												)}

												{/* Status chip if status data provided */}
												{item.status !== undefined && item.statusData && (
													<Stack direction="row" spacing={0.5} alignItems="center">
														<Typography>{item.statusLabel || 'Trạng thái'}:</Typography>
														<StatusChip value={item.status} data={item.statusData} />
													</Stack>
												)}

												{/* Custom fields */}
												{item.customFields &&
													item.customFields.map((field, idx) => (
														<Stack key={idx} direction="row" spacing={0.5} alignItems="center">
															<Typography>{field.label}:</Typography>
															{field.isStatusChip ? (
																<StatusChip
																	value={field.statusValue}
																	data={field.statusData || []}
																	size={field.chipSize || 'small'}
																	variant={field.chipVariant || 'filled'}
																/>
															) : (
																<Box fontWeight={field.bold ? 600 : undefined} display="flex" alignItems="center" gap={0.5}>
																	{field.value || '-'}
																</Box>
															)}
														</Stack>
													))}
											</Stack>
										}
										secondary={
											item.action ? (
												<Box
													sx={{
														mt: 1,
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'flex-end',
														gap: 0.5,
														fontSize: '0.75rem',
														lineHeight: 1
													}}
												>
													{item.action}
												</Box>
											) : undefined
										}
									/>
								</ListItem>
							</Paper>
						);
					})
				)}
			</List>
		</Box>
	);
};
