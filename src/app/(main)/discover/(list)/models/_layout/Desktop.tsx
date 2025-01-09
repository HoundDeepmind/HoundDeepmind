import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

// Remove imports related to models and model providers
// import { DEFAULT_LANG } from '@/const/locale';
// import { DiscoverService } from '@/server/services/discover';

import CategoryContainer from '../../../components/CategoryContainer';
// Remove import for Category component
// import Category from '../features/Category';

const Layout = async ({ children }: PropsWithChildren) => {
  // Remove code related to model providers
  // const discoverService = new DiscoverService();
  // const categoryList = await discoverService.getProviderList(DEFAULT_LANG);

  return (
    <Flexbox gap={24} horizontal style={{ position: 'relative' }} width={'100%'}>
      <CategoryContainer>
        {/* Remove Category component and related props */}
      </CategoryContainer>
      <Flexbox flex={1} gap={16}>
        {children}
      </Flexbox>
    </Flexbox>
  );
};

Layout.displayName = 'DesktopDiscoverLayout';

export default Layout;
