import ArticleIcon from '@mui/icons-material/ArticleOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import WidgetsIcon from '@mui/icons-material/WidgetsOutlined';
import { uniqueId } from 'lodash-es';

import { SidebarItem } from '~/components/Layout';

const Menuitems: SidebarItem[] = [
	{
		id: uniqueId(),
		navlabel: true,
		title: 'Trang chủ',
		subMenu: [
			{
				id: uniqueId(),
				title: 'Dashboard',
				icon: DashboardIcon
			},
			{
				id: uniqueId(),
				title: 'Menu AI',
				icon: WidgetsIcon,
				href: '/menu-ai'
			}
		]
	},
	{
		id: uniqueId(),
		navlabel: true,
		title: 'Danh sách',
		subMenu: [
			{
				id: uniqueId(),
				title: 'Camera',
				icon: VideocamIcon,
				href: '/camera'
			},
			{
				id: uniqueId(),
				title: 'Đăng ký khuôn mặt',
				icon: PersonAddIcon,
				href: '/register-face'
			},
			{
				id: uniqueId(),
				title: 'Lịch điểm danh',
				icon: CalendarMonthIcon,
				href: '/attendance'
			},
			{
				id: uniqueId(),
				title: 'OCR',
				icon: LibraryBooksIcon,
				href: '/orc'
			},
			{
				id: uniqueId(),
				title: 'Lịch sử',
				icon: HistoryIcon,
				href: '/history'
			}
		]
	},
	{
		id: uniqueId(),
		navlabel: true,
		title: 'Hệ thống',
		subMenu: [
			{
				id: uniqueId(),
				title: 'Cán bộ',
				icon: PersonIcon,
				href: '/user'
			},
			{
				id: uniqueId(),
				title: 'Phạm nhân',
				icon: PersonIcon,
				href: '/prisoner'
			},
			{
				id: uniqueId(),
				title: 'Đội/nhóm',
				icon: GroupIcon,
				href: '/group'
			},
			{
				id: uniqueId(),
				title: 'Cài đặt',
				icon: SettingsIcon,
				href: '/setting'
			},
			{
				id: uniqueId(),
				title: 'Nhật ký hoạt động',
				icon: ArticleIcon,
				href: '/log'
			}
		]
	}
];

export default Menuitems;
