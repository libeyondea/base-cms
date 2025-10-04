import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
	title: string;
	link?: string;
}

interface BreadcrumbsProps {
	breadcrumbs: BreadcrumbItem[];
}

const CustomSeparator = () => <NavigateNextIcon fontSize="small" sx={{ color: 'gray' }} />;

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
	const fullBreadcrumbs: BreadcrumbItem[] = [{ title: 'Trang chủ', link: '/' }, ...breadcrumbs];

	return (
		<MuiBreadcrumbs
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
		</MuiBreadcrumbs>
	);
};
