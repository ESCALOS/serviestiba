import { useEffect, useRef } from "react";

const statsData = [
    { id: 1, target: 20, icon: "services.png", description: "servicios." },
    { id: 2, target: 100, icon: "peru.png", description: "clientes a nivel nacional." },
    { id: 3, target: 80, icon: "trabajador.png", description: "colaboradores." },
    { id: 4, target: 48, icon: "geografia.png", description: "distritos de cobertura." },
];

const StatsComponent = () => {
    const countersRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Cuando el componente es visible
                    countersRef.current.forEach((counter) => {
                        const target = +counter.getAttribute("data-target")!;
                        const duration = 2000; // Duración de la animación en milisegundos (2 segundos)
                        const increment = target / (duration / 20); // Calcula el incremento basado en la duración deseada

                        const updateCount = () => {
                            const count = +counter.innerText.replace("+ ", ""); // Quita el "+" al convertir a número
                            if (count < target) {
                                counter.innerText = `+ ${Math.ceil(count + increment)}`; // Agrega el "+" delante del número
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = `+ ${target}`;
                            }
                        };

                        updateCount();
                    });
                } else {
                    // Cuando el componente no es visible
                    countersRef.current.forEach((counter) => (counter.innerText = "+0"));
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        const elementsToObserve = countersRef.current;

        elementsToObserve.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[#f4f5f0] py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Somos tu guía experto</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {statsData.map(({ id, icon, target, description }, index) => (
                        <div key={id}>
                            <div className="flex justify-center items-center mb-4">
                                <div className="rounded-full bg-green-100 p-4">
                                    <img src={`/stats/${icon}`} alt={icon} width={64} height={64} loading="lazy" />
                                </div>
                            </div>
                            <p
                                ref={(el) => (countersRef.current[index] = el!)}
                                className="text-3xl font-bold text-green-600 counter"
                                data-target={target}
                            >
                                +0
                            </p>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsComponent;
