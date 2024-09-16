// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { FaFilePdf } from 'react-icons/fa6';

type Props = {
    title: string;
    itemTitle: string;
    items: {
        id: number,
        name:string
    }[],
    filesLocation: string;
}

function DocumentSlider({ title, itemTitle, items, filesLocation }: Props) {
    return (
<div className='px-4 mx-auto max-w-7xl py-24'>
    <h2 className="text-3xl font-bold text-primary-900 mb-2">
        {title}
    </h2>
        <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            className='custom-swiper'
        >
            {
                items.map(({ id, name }) =>
                    <SwiperSlide key={id} className='flex items-center justify-center text-center bg-white'>
                        <div className='group relative'>
                            <img
                                src={`/images/${filesLocation}/${name}.webp`}
                                alt={`${name} - Serviestiba`}
                                className='h-[450px] md:h-[550px] lg:h-[650px] object-cover w-full'
                                loading='lazy' />
                            <div 
                            className="group-hover:flex hidden gap-4 flex-col justify-center items-center absolute h-full bg-white bg-opacity-50 transition-all duration-300 w-full top-0"
                            >
                                <a href={`/${filesLocation}/${name}.pdf`} target='_blank' className='rounded-lg bg-secondary-500 text-white px-4 py-2 font-bold w-full max-w-52 inline-block'>
                                    Ver {itemTitle}
                                </a>
                                <a href={`/${filesLocation}/${name}.pdf`} target='_blank' download className='text-tertiary-900 flex gap-1 justify-center items-center'>
                                    <FaFilePdf />
                                    Descargar
                                </a>
                            </div>
                        </div>
                            <p className='w-full max-w-52 text-center mx-auto pt-8 text-primary-900 text-sm capitalize'>
                                {name.replaceAll("_", " ")}
                            </p>
                    </SwiperSlide>
                )
            }
        </Swiper>
        </div>
    )
}

export default DocumentSlider
