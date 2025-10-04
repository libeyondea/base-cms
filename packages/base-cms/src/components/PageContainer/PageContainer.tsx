interface PageContainerProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

export const PageContainer = ({ title, description, children }: PageContainerProps) => {
	return (
		<>
			<title>{title ? `${title} - BASE CMS` : 'BASE CMS'}</title>
			<meta name="description" content={description || 'BASE CMS'} />
			{children}
		</>
	);
};
