import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '@utils/constants';
import aspireLogo from '@assets/Images/Aspire-Logo.svg?url';
import homeIcon from '@assets/Images/Home.svg?url';
import cardIcon from '@assets/Images/Card.svg?url';
import paymentsIcon from '@assets/Images/Payments.svg?url';
import creditIcon from '@assets/Images/Credit.svg?url';
import accountIcon from '@assets/Images/Account.svg?url';


// Simple icon component - will be replaced with proper icons later
function NavIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, JSX.Element> = {
    home: <img src={homeIcon} alt="Home" className="w-6 h-6" />,
    cards: <img src={cardIcon} alt="Cards" className="w-6 h-6" />,
    payments: <img src={paymentsIcon} alt="Payments" className="w-6 h-6" />,
    credit: <img src={creditIcon} alt="Credit" className="w-6 h-6" />,
    settings: <img src={accountIcon} alt="Account" className="w-6 h-6" />,
  };

  return iconMap[icon] || null;
}

function Sidebar() {
  return (
    <aside className="w-[340px] bg-navy text-white flex flex-col shadow-sidebar hidden md:flex">
      {/* Logo */}
      <div className="px-10 py-12">
        <div className="flex items-center gap-2">
          <img src={aspireLogo} alt="Aspire" className="h-10" />
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
                    : 'text-gray-300 text-lg'
                  }`
                }
              >
                <NavIcon icon={item.icon} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

