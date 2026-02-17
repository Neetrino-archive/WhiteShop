import { Card } from '@shop/ui';
import { UserAvatar } from '../../components/UserAvatar';
import { ProfileMenuDrawer } from '../../components/ProfileMenuDrawer';
import type { UserProfile, ProfileTab, ProfileTabConfig } from './types';

interface ProfileHeaderProps {
  profile: UserProfile | null;
  tabs: ProfileTabConfig[];
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  t: (key: string) => string;
}

export function ProfileHeader({ profile, tabs, activeTab, onTabChange, t }: ProfileHeaderProps) {
  return (
    <>
      <div className="lg:w-64 flex-shrink-0">
        {/* Profile Header Section */}
        <Card className="mb-4 p-4">
          <div className="flex flex-row items-center gap-4">
            {/* Avatar */}
            <UserAvatar
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              size="lg"
              className="flex-shrink-0"
            />
            
            {/* User Info */}
            <div className="flex-1 min-w-0 break-words">
              <h1 className="text-lg font-bold text-gray-900 mb-1 break-words">
                {profile?.firstName && profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : profile?.firstName
                  ? profile.firstName
                  : profile?.lastName
                  ? profile.lastName
                  : t('profile.myProfile')}
              </h1>
              {profile?.email && (
                <p className="text-sm font-bold text-gray-900 mb-1 break-words">{profile.email}</p>
              )}
              {profile?.phone && (
                <p className="text-sm text-gray-500 break-words">{profile.phone}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Sidebar Navigation */}
        <aside className="hidden lg:block">
          <nav className="bg-white border border-gray-200 rounded-lg p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
                  {tab.icon}
                </span>
                <span className="text-left">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {/* Mobile Menu Drawer */}
      <div className="lg:hidden mb-6">
        <ProfileMenuDrawer
          tabs={tabs}
          activeTab={activeTab}
          onSelect={(tabId) => onTabChange(tabId as ProfileTab)}
        />
      </div>
    </>
  );
}



