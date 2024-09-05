import { useEffect, useState } from "react"
import { navItems, topbarLinks } from "src/constants"

type Props = {
    logo: string,
    routePath: string
}

type TopBarProps = {
    scrolled: boolean;
    routePath: string;
}

function TopBar({ scrolled, routePath }: TopBarProps) {


    return (
        <div className={`${scrolled ? 'bg-gray-200 text-green-700' : 'bg-black bg-opacity-50 text-white'} hidden lg:block fixed top-0 w-full z-20`}>
            <div className="max-w-7xl mx-auto px-4">
                <ul
                    className="flex justify-end items-center gap-4 font-bold text-sm py-2"
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

function NavList({ scrolled }: { scrolled: boolean }) {
    return (
        <ul className={`lg:flex hidden justify-around gap-4 items-center font-bold text-lg ${scrolled ? 'text-green-700' : 'text-white'}`}>
            {
                navItems.map(({ id, name, href }) =>
                    <li key={id}>
                        <a href={href}>{name}</a>
                    </li>
                )
            }
            <li className="pl-4">
                <a className={`py-2 px-4 rounded-md text-xl text-white transition-all ${scrolled ? 'bg-green-400 hover:bg-green-700' : 'border hover:bg-green-500'}`} href="/contact">Intranet</a>
            </li>
        </ul>
    )
}

function Navbar({ logo, routePath }: Props) {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <TopBar routePath="/" scrolled={scrolled} />
            <div className={`fixed top-0 lg:top-9 z-20 w-full py-4 ${scrolled ? 'bg-white' : 'bg-transparent backdrop-blur-md'}`}>
                <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <img src={logo} alt="Logo" width={200} />
                    <NavList scrolled={scrolled} />
                </nav>
            </div>
        </>
    )
}

export default Navbar;