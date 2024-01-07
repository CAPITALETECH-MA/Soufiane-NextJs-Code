import Link from "next/link";
import Image from "next/image";

const logoSrc = "/CapTechBg.png";
const plusIcon = "/plus.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/users", label: "Users" },
  { href: "/users/new", label: "Add Users" },
  // { href: "/avoirs", label: "Avoirs" },
  // { href: "/facturesAcompte", label: "Factures d'acompte" },
];

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={logoSrc}
            alt="Logo"
            width={220}
            height={120}
            className="rounded-full"
          />
        </div>

        {/* Links */}
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li
              key={link.href}
              className="flex items-center space-x-2 hover:bg-[#124366] hover:rounded-md p-2"
            >
              <Link href={link.href}>{link.label}</Link>

              {/* plus icon */}
              <Image
                src={plusIcon}
                alt="Plus Icon"
                width={20}
                height={20}
                className="transition-transform transform hover:scale-150"
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
