import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  Settings,
  ShoppingBag,
  CreditCard,
  Coffee,
  Bell,
  HelpCircle,
  UserPlus,
  LogIn,
  Heart
} from 'lucide-react';

interface ProfileMenuProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userEmail?: string | null;
}

interface MenuOption {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  className?: string;
}

export default function ProfileMenu({ isLoggedIn, onLogin, onLogout, userEmail }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loggedInOptions: MenuOption[] = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'My Account',
      onClick: () => console.log('My Account clicked')
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      label: 'My Orders',
      onClick: () => console.log('My Orders clicked')
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: 'Saved Blends',
      onClick: () => console.log('Saved Blends clicked')
    },
    {
      icon: <Coffee className="w-4 h-4" />,
      label: 'Subscription Plans',
      onClick: () => console.log('Subscription Plans clicked')
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      label: 'Payment Methods',
      onClick: () => console.log('Payment Methods clicked')
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: 'Notifications',
      onClick: () => console.log('Notifications clicked')
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => console.log('Settings clicked')
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      onClick: () => console.log('Help & Support clicked')
    },
    {
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      onClick: onLogout,
      className: 'text-red-600 hover:text-red-700'
    }
  ];

  const loggedOutOptions: MenuOption[] = [
    {
      icon: <LogIn className="w-4 h-4" />,
      label: 'Login',
      onClick: onLogin
    },
    {
      icon: <UserPlus className="w-4 h-4" />,
      label: 'Sign Up',
      onClick: () => console.log('Sign Up clicked')
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      onClick: () => console.log('Help & Support clicked')
    }
  ];

  const options = isLoggedIn ? loggedInOptions : loggedOutOptions;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-brown-200 p-1 rounded-full hover:bg-brown-800 transition-colors"
      >
        <User className="h-6 w-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
          {isLoggedIn && (
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Account</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          )}
          
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left flex items-center space-x-2 hover:bg-gray-100 transition-colors ${
                  option.className || 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 