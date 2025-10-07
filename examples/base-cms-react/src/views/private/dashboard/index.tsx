import { useEffect } from 'react';

import { PageContainer } from '@libeyondea/base-cms';

import useUserApi from '~/hooks/api/useUserApi';

const Dashboard = () => {
	const { qGetAllUser } = useUserApi({
		filter: {}
	});

	console.log(qGetAllUser.data);

	// useEffect(() => {
	// 	qGetAllUser.refetch();
	// }, [qGetAllUser.refetch]);

	return (
		<PageContainer title="Dashboard">
			<div>Dashboard</div>
		</PageContainer>
	);
};
export default Dashboard;
