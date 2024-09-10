import { useEffect, useState } from "react"
import { navItems, topbarLinks } from "src/constants"
import { FaXmark } from "react-icons/fa6"
import { FaBars } from "react-icons/fa"

type Props = {
    logo: string,
    routePath: string
}

type TopBarProps = {
    scrolled: boolean;
    isHome: boolean;
}

type SidebarProps = {
    open: boolean;
    routePath: string;
}

function TopBar({ scrolled, isHome }: TopBarProps) {
    return (
        <div className={`${scrolled || !isHome ? 'bg-tertiary-500 text-green-700' : 'bg-black bg-opacity-50 text-white'} hidden lg:block fixed top-0 w-full z-20`}>
            <div className="max-w-7xl mx-auto px-4">
                <ul
                    className="flex justify-end items-center gap-4 font-bold text-sm h-10"
                >
                    {
                        topbarLinks.map(({ id, name, href }) => (
                            <li key={id}>
                                <a
                                    href={href}
                                    className="hover:text-gray-300 transition duration-300"
                                >
                                    {name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>

    )
}

function NavList({ scrolled, routePath }: { scrolled: boolean, routePath: string }) {
    const isHome = routePath === "/";

    return (
        <ul className={`lg:flex hidden justify-around gap-4 items-center font-bold text-lg ${scrolled || !isHome ? 'text-green-700' : 'text-white'}`}>
            {
                navItems.map(({ id, name, href }) =>
                    <li key={id}>
                        <a className={`${routePath !== href ? 'hover:text-green-500' : 'text-green-500'}`} href={href}>{name}</a>
                    </li>
                )
            }
            <li className="pl-4">
                <a className={`py-2 px-4 rounded-md text-xl text-white transition-all ${scrolled || !isHome ? 'bg-green-400 hover:bg-green-700' : 'border hover:bg-green-500'}`} href="/intranet">Intranet</a>
            </li>
        </ul >
    )
}

function Sidebar({ open, routePath }: SidebarProps) {
    const isHome = routePath === "/";
    const items = navItems.concat(topbarLinks);
    return (
        <div className="relative lg:hidden">
            <div
                className={`fixed right-0 h-full top-24 w-full sm:w-[400px] bg-white transform ${open ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                <ul className="flex flex-col h-full gap-8 p-8">
                    {
                        items.map(({ id, name, href }) =>
                            <li key={id}>
                                <a className={`text-lg uppercase font-bold  ${isHome ? 'text-stone-600 hover:text-green-700' : 'text-green-700'}`} href={href}>{name}</a>
                            </li>
                        )
                    }
                    <li className="mt-8">
                        <a className={`py-4 px-8 rounded-2xl text-lg uppercase font-bold text-green-700 border border-green-700 hover:text-white hover:bg-green-700`} href="/intranet">Intranet</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

function Navbar({ logo, routePath }: Props) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = routePath === "/";

    const toggleSidebar = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 1024 && setOpen(false),
        );
    }, []);

    return (
        <>
            <TopBar scrolled={scrolled} isHome={isHome} />
            <div className={`fixed top-0 lg:top-10 z-20 w-full ${(scrolled || !isHome) ? 'bg-white border-b' : 'bg-white lg:bg-transparent lg:backdrop-blur-md'}`}>
                <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
                    <a href="/"><img className={`${!scrolled && isHome && 'lg:brightness-[8]'}`} src={logo} alt="Logo" width={200} /></a>
                    <NavList scrolled={scrolled} routePath={routePath} />
                    {/* Botón para abrir/cerrar la sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="p-4 focus:outline-none lg:hidden text-green-600"
                    >
                        {open ? <FaXmark size={24} /> : <FaBars size={24} />}
                    </button>
                </nav>
            </div>
            <div className={`h-24 relative ${isHome ? 'lg:h-0' : 'lg:h-[136px]'} bg-white`}></div>
            <Sidebar open={open} routePath={routePath} />
        </>
    )
}

export default Navbar;