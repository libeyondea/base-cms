import { CSSProperties } from 'react';

import { FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormProviderProps = {
	id?: string;
	methods: UseFormReturn<any>;
	onSubmit?: SubmitHandler<any>;
	style?: CSSProperties;
	children: React.ReactNode;
};

const FormProvider = ({ id, methods, onSubmit, style, children }: FormProviderProps) => {
	return (
		<Form {...methods}>
			<form id={id} style={{ ...style }} onSubmit={onSubmit}>
				{children}
			</form>
		</Form>
	);
};

export default FormProvider;
