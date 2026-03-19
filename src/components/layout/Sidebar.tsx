import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '@utils/constants';
// Images loaded directly


// Simple icon component - will be replaced with proper icons later
function NavIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, JSX.Element> = {
    home: <img src="/src/assets/Images/Home.svg" alt="Home" className="w-6 h-6" />,
    cards: <img src="/src/assets/Images/Card.svg" alt="Cards" className="w-6 h-6" />,
    payments: <img src="/src/assets/Images/Payments.svg" alt="Payments" className="w-6 h-6" />,
    credit: <img src="/src/assets/Images/Credit.svg" alt="Credit" className="w-6 h-6" />,
    settings: <img src="/src/assets/Images/Account.svg" alt="Account" className="w-6 h-6" />,
  };

  return iconMap[icon] || null;
}

function Sidebar() {
  return (
    <aside className="w-[340px] bg-navy text-white flex flex-col shadow-sidebar hidden md:flex">
      {/* Logo */}
      <div className="px-10 py-12">
        <div className="flex items-center gap-2">
          <img src="/src/assets/Images/Aspire-Logo.svg" alt="Aspire" className="h-10" />
        </div>
        <p className="text-gray-400 text-md mt-6 leading-relaxed">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-8">
        <ul className="space-y-4">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-6 px-4 ${isActive
                    ? ' text-primary font-bold text-lg' 
                    : 'text-gray-300 text-lg font-bold'
                  }`
                }
              >
                <NavIcon icon={item.icon} />
                <span className="font-bold text-md">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

