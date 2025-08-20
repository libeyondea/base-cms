type PageContainerProps = {
	title?: string;
	description?: string;
	children: React.ReactNode;
};

const PageContainer = ({ title, description, children }: PageContainerProps) => {
	return (
		<>
			<title>{title ? `${title} - BASE CMS` : 'BASE CMS'}</title>
			<meta name="description" content={description || 'BASE CMS'} />
			{children}
		</>
	);
};

export default PageContainer;
