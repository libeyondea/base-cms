interface PageContainerProps {
	title?: string;
	appName?: string;
	description?: string;
	children: React.ReactNode;
}

export const PageContainer = ({ title, appName = 'Base CMS', description, children }: PageContainerProps) => {
	return (
		<>
			<title>{title ? `${title} - ${appName}` : `${appName}`}</title>
			<meta name="description" content={description || appName} />
			{children}
		</>
	);
};
