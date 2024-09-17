import { useEffect, useState, type ReactNode } from "react"
import { navItems } from "src/constants"
import { FaXmark } from "react-icons/fa6"
import { FaBars } from "react-icons/fa"
import SuggestionForm from "../components/SuggestionForm"
import Modal from "../components/Modal"
import SocialResponsibility from "./SocialResponsibility"

type Props = {
    logo: string,
    routePath: string
}

type TopBarProps = {
    handleOpenModal: (content: ReactNode) => void
}

type SidebarProps = {
    open: boolean;
    routePath: string;
    handleOpenModal: (content: ReactNode) => void
}

const topbarItems = [
    {
        id: 1,
        name: "Responsabilidad Social",
        content: <SocialResponsibility />,
    },
    {
        id: 2,
        name: "Canal de denuncias",
        content: <SuggestionForm />, // Puedes usar el mismo formulario o crear uno nuevo
    },
    {
        id: 3,
        name: "Buzón de sugerencias",
        content: <SuggestionForm />, // Formulario de sugerencias
    },
];

function TopBar({ handleOpenModal }: TopBarProps) {
    return (
        <div>
            <div className={`bg-white text-info-500 hidden lg:block fixed top-0 w-full z-20`}>
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex justify-end items-center gap-4 font-bold text-sm h-10">
                        {topbarItems.map(({ id, name, content }) => (
                            <li key={id}>
                                <button
                                    onClick={() => handleOpenModal(content)}
                                    className="hover:opacity-80 transition duration-300"
                                >
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function NavList({ routePath }: { routePath: string }) {

    return (
        <ul className={`lg:flex hidden justify-around gap-4 items-center font-bold text-lg text-white`}>
            {
                navItems.map(({ id, name, href }) =>
                    <li key={id}>
                        <a className={`${routePath !== href ? 'hover:text-secondary-500' : 'text-secondary-500'}`} href={href}>{name}</a>
                    </li>
                )
            }
            <li className="pl-4">
                <a className={`py-2 px-4 rounded-md text-xl text-white transition-all border hover:bg-white hover:text-primary-500`} href="/intranet">Intranet</a>
            </li>
        </ul >
    )
}

function Sidebar({ open, routePath, handleOpenModal }: SidebarProps) {
    return (
        <div className="relative lg:hidden">
            <div
                className={`fixed right-0 h-full top-24 w-full sm:w-[400px] bg-white transform ${open ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <ul className="flex flex-col h-full gap-8 p-8">
                    {navItems.map(({ id, name, href }) =>
                            <li key={id}>
                                <a className={`text-lg uppercase font-bold  ${routePath === href ? 'text-secondary-500' : 'text-primary-500 hover:text-secondary-500'}`} href={href}>{name}</a>
                            </li>
                    )}
                    {topbarItems.map(({ id, name, content }) => (
                        <li key={id}>
                            <button
                                onClick={() => handleOpenModal(content)}
                                className={`text-lg uppercase font-bold  ${'text-primary-500 hover:text-secondary-500'}`}
                            >
                                {name}
                            </button>
                        </li>
                    ))}
                    <li className="mt-8">
                        <a className={`py-4 px-8 rounded-2xl text-lg uppercase font-bold text-primary-500 border border-primary-500 hover:text-white hover:bg-primary-500`} href="/intranet">Intranet</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

function Navbar({ logo, routePath }: Props) {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const handleOpenModal = (content: React.ReactNode) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    const toggleSidebar = () => {
        setOpen(!open);
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 1024 && setOpen(false),
        );
    }, []);

    return (
        <>
            <TopBar handleOpenModal={handleOpenModal} />
            <div className={`fixed top-0 lg:top-10 z-20 w-full bg-primary-500`}>
                <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
                    <a href="/"><img className="brightness-[8]" src={logo} alt="Logo" width={200} /></a>
                    <NavList routePath={routePath} />
                    {/* Botón para abrir/cerrar la sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="p-4 focus:outline-none lg:hidden text-white"
                    >
                        {open ? <FaXmark size={24} /> : <FaBars size={24} />}
                    </button>
                </nav>
            </div>
            <div className={`h-24 relative lg:h-[136px] bg-white`}></div>
            <Sidebar open={open} routePath={routePath} handleOpenModal={handleOpenModal} />
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalContent}
            </Modal>
        </>
    )
}

export default Navbar;