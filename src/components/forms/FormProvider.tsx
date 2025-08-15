import { CSSProperties } from 'react';

import { FormProvider as Form, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormProviderProps = {
	id?: string;
	children: React.ReactNode;
	methods: UseFormReturn<any>;
	onSubmit?: SubmitHandler<any>;
	style?: CSSProperties;
};

const FormProvider = ({ id, onSubmit, methods, style, children }: FormProviderProps) => {
	return (
		<Form {...methods}>
			<form id={id} style={{ ...style }} onSubmit={onSubmit}>
				{children}
			</form>
		</Form>
	);
};

export default FormProvider;
