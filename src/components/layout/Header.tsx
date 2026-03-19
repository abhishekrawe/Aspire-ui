import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const getPageTitle = (): string => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/cards':
        return 'Cards';
      case '/payments':
        return 'Payments';
      case '/credit':
        return 'Credit';
      case '/settings':
        return 'Settings';
      default:
        return 'Aspire';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Aspire FE test</span>
        <span className="text-gray-400">&gt;</span>
        <span className="text-gray-800 font-medium">{getPageTitle()}</span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Zoom control - placeholder */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>100%</span>
        </div>

        {/* Icons */}
        <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>

        <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>

        {/* Sign In Button */}
        <button className="px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-dark transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;

