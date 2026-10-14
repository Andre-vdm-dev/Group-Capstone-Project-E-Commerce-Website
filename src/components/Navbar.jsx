import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Store', icon: '/assets/icons/storefront.svg' },
  { to: '/cart', label: 'Bag', icon: '/assets/icons/bag.svg' },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-[104px] shrink-0">
    <nav
      className={`fixed left-4 top-4 z-50 flex h-[calc(100vh-32px)] flex-col justify-between rounded-lg bg-white p-2 transition-all duration-200 ${
        expanded ? 'w-[140px] shadow-input' : 'w-[72px]'
      }`}
    >
      <div className={`flex flex-col gap-8 p-2 ${expanded ? 'items-start' : 'items-center'}`}>
        {/* Logo */}
          <Link
            to="/"
            onClick={() => setExpanded(false)}
            aria-label="Go to home"
            className="flex items-center justify-center rounded bg-white p-2"
          >
            <img src="/assets/icons/logo.svg" alt="Logo" className="h-[20.7px] w-4" />
          </Link>

        {/* Menu toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Close menu' : 'Open menu'}
          className="p-2"
        >
          <img src={expanded ? '/assets/icons/close.svg' : '/assets/icons/menu.svg'} alt="" className="size-6" />
        </button>

        {/* Links */}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-nav p-2 ${expanded ? 'w-full' : ''} ${
                isActive ? 'bg-dark text-white' : 'text-dark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img src={link.icon} alt="" className={`size-6 brightness-0 ${isActive ? 'invert' : ''}`} />
                {expanded && <span className="text-h5">{link.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-2">
        <button className={`flex items-center gap-2 rounded-nav bg-danger p-2 text-white ${expanded ? 'w-full' : ''}`}>
          <img src="/assets/icons/logout.svg" alt="" className="size-6" />
          {expanded && <span className="text-h5">Logout</span>}
        </button>
      </div>
        </nav>
    </div>
  );
}