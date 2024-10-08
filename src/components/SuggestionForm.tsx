// SuggestionForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface SuggestionFormValues {
    firstName: string;
    lastName: string;
    jobArea: string;
    suggestion: string;
    acceptedPolicy: boolean;
}

const SuggestionForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SuggestionFormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: SuggestionFormValues) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/sendSuggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                Swal.fire("¡Mensaje Enviado!", "", "success");
            } else {
                Swal.fire("Error al enviar el mensaje", "", "warning");
            }
            reset()
        } catch (error) {
            Swal.fire("Error al enviar el mensaje", "", "error");
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-3xl text-green-900 text-center mb-4 font-bold'>Buzón de Sugerencias</h2>
            <div className="flex flex-col gap-4 justify-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        {...register('firstName', { required: 'El nombre es obligatorio' })}
                        placeholder=" "
                        required
                        id="firstname"
                        className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition duration-300 required:valid:border-green-500"
                    />
                    <label
                        htmlFor="firstname"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-green-500 peer-focus:text-xs peer-valid:top-0 peer-valid:text-green-500 peer-valid:text-xs transition-all duration-300"
                    >
                        Nombre
                    </label>
                    {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        {...register('lastName', { required: 'El apellido es obligatorio' })}
                        placeholder=" "
                        required
                        id="lastname"
                        className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition duration-300 required:valid:border-green-500"
                    />
                    <label
                        htmlFor="lastname"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-green-500 peer-focus:text-xs peer-valid:top-0 peer-valid:text-green-500 peer-valid:text-xs transition-all duration-300"
                    >
                        Apellido
                    </label>
                    {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message}</span>}
                </div>

                <div className="relative w-full">
                    <input
                        type="text"
                        {...register('jobArea', { required: 'El área de trabajo es obligatoria' })}
                        placeholder=" "
                        required
                        id="jobArea"
                        className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition duration-300 required:valid:border-green-500"
                    />
                    <label
                        htmlFor="lastname"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-green-500 peer-focus:text-xs peer-valid:top-0 peer-valid:text-green-500 peer-valid:text-xs transition-all duration-300"
                    >
                        Área de trabajo
                    </label>
                    {errors.jobArea && <span className="text-sm text-red-500">{errors.jobArea.message}</span>}
                </div>

                <div className="relative w-full">
                    <textarea
                        {...register('suggestion', { required: 'El detalle de la sugerencia es obligatorio' })}
                        placeholder=" "
                        required
                        id='message'
                        className="peer h-24 w-full px-4 py-2 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition duration-300 required:valid:border-green-500"
                    />
                    <label
                        htmlFor="message"
                        className="absolute left-4 top-6 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-green-500 peer-focus:text-xs peer-valid:top-0 peer-valid:text-green-500 peer-valid:text-xs transition-all duration-300"
                    >
                        Detalle de la sugerencia
                    </label>
                    {errors.suggestion && <span className="text-sm text-red-500">{errors.suggestion.message}</span>}
                </div>
                <div className="flex items-center" >
                    <input
                        type="checkbox"
                        {...register('acceptedPolicy', { required: 'Debe aceptar la política de privacidad' })}
                        className="accent-green-500"
                    />
                    <span className="ml-2 text-sm">
                        He leído y acepto las <a href="/politicas" target='_blank' className='text-green-500 underline'>Políticas de Privacidad de Datos</a> de Serviestiba
                    </span>
                </div>
                {errors.acceptedPolicy && <span className="text-sm text-red-500">{errors.acceptedPolicy.message}</span>}

                <div className='text-center'>
                    <button type="submit" className="w-36 h-10 rounded-3xl bg-green-500 text-white">
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin mr-2 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Enviando
                            </span>
                        ) : (
                            'Enviar'
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SuggestionForm;
