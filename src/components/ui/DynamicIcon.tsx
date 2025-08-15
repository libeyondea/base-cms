import { IconBaseProps } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';

const DefaultIcon = FaIcons.FaQuestionCircle;

type IconPack = {
	[key: string]: React.ComponentType<IconBaseProps>;
};

const iconPacks: Record<string, IconPack> = {
	fa: FaIcons,
	ai: AiIcons,
	md: MdIcons,
	tb: TbIcons
	// Có thể thêm các nhóm khác nếu muốn
};

type DynamicIconProps = {
	iconName?: string; // Ví dụ: "FaBeer", "AiFillHome", "MdEmail"
} & IconBaseProps;

const DynamicIcon = ({ iconName, ...props }: DynamicIconProps) => {
	if (!iconName) return <DefaultIcon {...props} />;
	// Lấy prefix: 2 ký tự đầu và viết thường
	const prefix = iconName.slice(0, 2).toLowerCase();
	const iconPack = iconPacks[prefix];

	// Nếu không có nhóm icon, trả icon mặc định
	if (!iconPack) return <DefaultIcon {...props} />;

	const IconComponent = iconPack[iconName];

	// Nếu không có icon, trả icon mặc định
	if (!IconComponent) return <DefaultIcon {...props} />;

	return <IconComponent {...props} size={20} />;
};

export default DynamicIcon;
