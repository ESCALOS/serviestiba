// SuggestionForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface SuggestionFormValues {
    firstName: string;
    lastName: string;
    jobArea: string;
    suggestion: string;
    acceptedPolicy: boolean;
}

const SuggestionForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SuggestionFormValues>();

    const onSubmit = (data: SuggestionFormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <input
                    {...register('firstName', { required: 'El nombre es obligatorio' })}
                    placeholder="Nombres*"
                    className="input-field"
                />
                {errors.firstName && <span>{errors.firstName.message}</span>}

                <input
                    {...register('lastName', { required: 'El apellido es obligatorio' })}
                    placeholder="Apellidos*"
                    className="input-field"
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}

                <input
                    {...register('jobArea', { required: 'El área de trabajo es obligatoria' })}
                    placeholder="Área de trabajo*"
                    className="input-field"
                />
                {errors.jobArea && <span>{errors.jobArea.message}</span>}

                <textarea
                    {...register('suggestion', { required: 'El detalle de la sugerencia es obligatorio' })}
                    placeholder="Detalle de sugerencia*"
                    className="input-field"
                />
                {errors.suggestion && <span>{errors.suggestion.message}</span>}

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register('acceptedPolicy', { required: 'Debe aceptar la política de privacidad' })}
                    />
                    <span className="ml-2">He leído y acepto las Políticas de Privacidad de Datos</span>
                </div>
                {errors.acceptedPolicy && <span>{errors.acceptedPolicy.message}</span>}

                <button type="submit" className="btn-primary">Enviar</button>
            </div>
        </form>
    );
};

export default SuggestionForm;
