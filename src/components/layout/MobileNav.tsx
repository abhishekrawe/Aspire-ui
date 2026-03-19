import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '@utils/constants';
// Images loaded directly

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 gap-1">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-400'
              }`
            }
          >
            <NavIcon icon={item.icon} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

// Simple icon component
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

export default MobileNav;

