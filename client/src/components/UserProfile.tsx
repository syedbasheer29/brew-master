import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin } from 'lucide-react';
import { userService, UserProfile as IUserProfile } from '../services/user';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
}

export default function UserProfile({ isOpen, onClose, userEmail }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserProfile>({
    email: userEmail || '',
    name: '',
    phone: '',
    address: '',
    savedBlends: [],
    orders: [],
    subscriptionPlan: null,
    paymentMethods: [],
    notifications: []
  });

  useEffect(() => {
    if (isOpen && userEmail) {
      loadUserProfile();
    }
  }, [isOpen, userEmail]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await userService.getProfile();
      setUserData(profile);
    } catch (err) {
      setError('Failed to load profile data. Please try again later.');
      console.error('Error loading profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProfile = await userService.updateProfile({
        name: userData.name,
        phone: userData.phone,
        address: userData.address
      });
      setUserData(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again later.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-brown-100 rounded-full p-4">
            <User className="h-8 w-8 text-brown-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Account</h2>
            <p className="text-gray-500">Manage your personal information</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center p-4">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-brown-600 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {/* Name */}
            <div className="flex items-start space-x-4">
              <User className="h-5 w-5 text-brown-600 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 text-brown-600 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-brown-600 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brown-500 focus:ring-brown-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                  disabled={isLoading}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 