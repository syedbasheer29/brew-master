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
import { userService } from '../services/user';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  isLoggedIn: boolean;
  userEmail: string | null;
  onLogin: () => void;
  onSignUp: () => void;
  onLogout: () => void;
}

interface MenuOption {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  className?: string;
}

export default function ProfileMenu({ isLoggedIn, userEmail, onLogin, onSignUp, onLogout }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMyAccount = () => {
    setIsProfileOpen(true);
    setIsOpen(false);
  };

  const handleOrders = async () => {
    try {
      const orders = await userService.getOrders();
      // Navigate to orders page with the data
      navigate('/orders', { state: { orders } });
      setIsOpen(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleSavedBlends = async () => {
    try {
      const blends = await userService.getSavedBlends();
      // Navigate to saved blends page with the data
      navigate('/saved-blends', { state: { blends } });
      setIsOpen(false);
    } catch (err) {
      console.error('Error fetching saved blends:', err);
    }
  };

  const handleSubscription = async () => {
    try {
      const subscription = await userService.getSubscription();
      // Navigate to subscription page with the data
      navigate('/subscription', { state: { subscription } });
      setIsOpen(false);
    } catch (err) {
      console.error('Error fetching subscription:', err);
    }
  };

  const handlePaymentMethods = async () => {
    try {
      const paymentMethods = await userService.getPaymentMethods();
      // Navigate to payment methods page with the data
      navigate('/payment-methods', { state: { paymentMethods } });
      setIsOpen(false);
    } catch (err) {
      console.error('Error fetching payment methods:', err);
    }
  };

  const handleNotifications = async () => {
    try {
      const notifications = await userService.getNotifications();
      // Navigate to notifications page with the data
      navigate('/notifications', { state: { notifications } });
      setIsOpen(false);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const loggedInOptions: MenuOption[] = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'My Account',
      onClick: handleMyAccount
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      label: 'My Orders',
      onClick: handleOrders
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: 'Saved Blends',
      onClick: handleSavedBlends
    },
    {
      icon: <Coffee className="w-4 h-4" />,
      label: 'Subscription Plans',
      onClick: handleSubscription
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      label: 'Payment Methods',
      onClick: handlePaymentMethods
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: 'Notifications',
      onClick: handleNotifications
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      onClick: () => navigate('/support')
    },
    {
      icon: <LogOut className="w-4 h-4" />,
      label: 'Logout',
      onClick: () => {
        onLogout();
        setIsOpen(false);
      },
      className: 'text-red-600 hover:text-red-700'
    }
  ];

  const loggedOutOptions: MenuOption[] = [
    {
      icon: <LogIn className="w-4 h-4" />,
      label: 'Login',
      onClick: () => {
        onLogin();
        setIsOpen(false);
      }
    },
    {
      icon: <UserPlus className="w-4 h-4" />,
      label: 'Sign Up',
      onClick: () => {
        onSignUp();
        setIsOpen(false);
      }
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      onClick: () => navigate('/support')
    }
  ];

  const options = isLoggedIn ? loggedInOptions : loggedOutOptions;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-brown-700 hover:bg-brown-600 text-white px-4 py-2 rounded-full transition-colors"
      >
        <User className="h-5 w-5" />
        {isLoggedIn ? (
          <span className="text-sm font-medium">{userEmail}</span>
        ) : (
          <span className="text-sm font-medium">Sign In</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-slideIn">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-brown-50 flex items-center space-x-2 ${
                  option.className || ''
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={userEmail}
      />
    </div>
  );
} 