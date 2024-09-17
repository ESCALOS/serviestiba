// ContactForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

interface ContactFormValues {
    name: string;
    email: string;
    phone: string;
    province: string;
    city: string;
    message: string;
    acceptedPolicy: boolean;
}

const ContactForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/sendContact', {
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
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        {...register('name', { required: 'El nombre es obligatorio' })}
                        placeholder=" "
                        required
                        id="name"
                        className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                    >
                        Nombres y Apellidos
                    </label>
                    {errors.name && <span className="text-sm text-red-700">{errors.name.message}</span>}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                    <div className="relative w-full">
                        <input
                            type="email"
                            {...register('email', { required: 'El correo es obligatorio' })}
                            placeholder=" "
                            required
                            id="email"
                            className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                        >
                            Correo Electrónico
                        </label>
                        {errors.email && <span className="text-sm text-red-700">{errors.email.message}</span>}
                    </div>
                    <div className="relative w-full">
                        <input
                            type="tel"
                            {...register('phone', { required: 'El teléfono es obligatorio' })}
                            placeholder=" "
                            required
                            id="phone"
                            className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                        />
                        <label
                            htmlFor="phone"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                        >
                            Celular
                        </label>
                        {errors.phone && <span className="text-sm text-red-700">{errors.phone.message}</span>}
                    </div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            {...register('province', { required: 'Ingrese la provincia' })}
                            placeholder=" "
                            required
                            id="province"
                            className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                        />
                        <label
                            htmlFor="province"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                        >
                            Provincia
                        </label>
                        {errors.province && <span className="text-sm text-red-700">{errors.province.message}</span>}
                    </div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            {...register('city', { required: 'Ingrese la ciudad' })}
                            placeholder=" "
                            required
                            id="city"
                            className="peer h-12 w-full px-4 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                        />
                        <label
                            htmlFor="city"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                        >
                            Ciudad
                        </label>
                        {errors.city && <span className="text-sm text-red-700">{errors.city.message}</span>}
                    </div>
                </div>
                

                <div className="relative w-full">
                    <textarea
                        {...register('message', { required: 'Dinos tu duda' })}
                        placeholder=" "
                        required
                        id='message'
                        className="peer h-24 w-full px-4 py-2 text-gray-900 placeholder-transparent bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-primary-700 transition duration-300 required:valid:border-primary-700"
                    />
                    <label
                        htmlFor="message"
                        className="absolute left-4 top-6 -translate-y-1/2 text-gray-400 bg-white px-1 peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-primary-700 peer-focus:text-xs peer-valid:top-0 peer-valid:text-primary-700 peer-valid:text-xs transition-all duration-300"
                    >
                        ¿Tienes alguna duda?
                    </label>
                    {errors.message && <span className="text-sm text-red-700">{errors.message.message}</span>}
                </div>
                <div className="flex items-center" >
                    <input
                        type="checkbox"
                        {...register('acceptedPolicy', { required: 'Debe aceptar la política de privacidad' })}
                        className="accent-primary-700"
                    />
                    <span className="ml-2 text-sm">
                        He leído y acepto las <a href="/politicas" target='_blank' className='text-primary-700 underline'>Políticas de Privacidad de Datos</a> de Serviestiba
                    </span>
                </div>
                {errors.acceptedPolicy && <span className="text-sm text-red-700">{errors.acceptedPolicy.message}</span>}

                <div className='text-center'>
                    <button type="submit" className="w-36 h-10 rounded-3xl bg-primary-500 hover:bg-primary-600 text-white">
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

export default ContactForm;
