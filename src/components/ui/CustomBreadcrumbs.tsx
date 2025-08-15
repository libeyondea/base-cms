import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
	title: string;
	link?: string;
}

interface CustomBreadcrumbsProps {
	breadcrumbs: BreadcrumbItem[];
}

const CustomSeparator = () => <NavigateNextIcon fontSize="small" sx={{ color: 'gray' }} />;

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ breadcrumbs }) => {
	const fullBreadcrumbs: BreadcrumbItem[] = [{ title: 'Trang chủ', link: '/' }, ...breadcrumbs];

	return (
		<Breadcrumbs
			separator={<CustomSeparator />}
			aria-label="breadcrumb"
			sx={{
				'& .MuiBreadcrumbs-separator': {
					mx: 0
				}
			}}
		>
			{fullBreadcrumbs.map((item, index) => {
				const isLast = index === fullBreadcrumbs.length - 1;
				const { title, link } = item;

				if (!link || isLast) {
					return (
						<Typography key={index} color="gray">
							{title}
						</Typography>
					);
				}

				return (
					<MuiLink key={index} component={Link} to={link} underline="hover" color="primary">
						{item.title}
					</MuiLink>
				);
			})}
		</Breadcrumbs>
	);
};

export default CustomBreadcrumbs;
