import { Icon } from '@lobehub/ui';
import { Bot, House, Puzzle, Wallet, Briefcase } from 'lucide-react'; // Removed unused Network icon
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import urlJoin from 'url-join';

import type { MenuProps } from '@/components/Menu';
import { useQuery } from '@/hooks/useQuery';
import { DiscoverTab } from '@/types/discover';

export const useNav = () => {
  const pathname = usePathname();
  const { type } = useQuery();
  const { t } = useTranslation('discover');
  const iconSize = { fontSize: 16 };

  const activeKey = useMemo(() => {
    for (const value of Object.values(DiscoverTab)) {
      if (pathname === '/discover/search') {
        return (type as DiscoverTab) || DiscoverTab.Assistants;
      } else if (pathname.includes(urlJoin('/discover', value))) {
        return value;
      }
    }
    return DiscoverTab.Home;
  }, [pathname]);

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: <Icon icon={House} size={iconSize} />,
        key: DiscoverTab.Home,
        label: t('tab.home'),
      },
      {
        icon: <Icon icon={Bot} size={iconSize} />,
        key: DiscoverTab.Assistants,
        label: "Transformers", // Changed label to Transformers
      },
      {
        icon: <Icon icon={Puzzle} size={iconSize} />,
        key: DiscoverTab.Plugins,
        label: t('tab.plugins'),
      },
      {
        icon: <Icon icon={Wallet} size={iconSize} />, // Changed to Wallet icon
        key: DiscoverTab.Models,
        label: "Hound Pay", // Changed label to Hound Pay
      },
      {
        icon: <Icon icon={Briefcase} size={iconSize} />, // Changed icon to Briefcase
        key: DiscoverTab.Providers,
        label: "Workspace", // Changed label to Workspace
      },
    ],
    [t],
  );

  const activeItem = items.find((item: any) => item.key === activeKey) as {
    icon: ReactNode;
    key: string;
    label: string;
  };

  return {
    activeItem,
    activeKey,
    items,
  };
};
