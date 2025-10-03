import { ElementType, ReactNode } from 'react';

import { Link } from 'react-router-dom';

interface MenuItemProps {
	component?: ElementType; // Accepts any valid component (default: "a")
	children: ReactNode;
	[key: string]: any; // Allows passing additional props dynamically
}

const Links: React.FC<MenuItemProps> = ({ component: Component = Link, children, ...props }) => {
	return (
		<Component {...props} style={{ textDecoration: 'none' }}>
			{children}
		</Component>
	);
};

export default Links;
