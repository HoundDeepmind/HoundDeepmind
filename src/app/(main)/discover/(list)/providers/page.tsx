import StructuredData from '@/components/StructuredData';
import { Locales } from '@/locales/resources';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';

type Props = { searchParams: Promise<{ hl?: Locales }> };

export const generateMetadata = async (props: Props) => {
  const searchParams = await props.searchParams;
  const { t, locale } = await translation('metadata', searchParams?.hl);

  return metadataModule.generate({
    alternate: true,
    description: t('discover.providers.description'),
    locale,
    title: t('discover.providers.title'),
    url: '/discover/providers',
  });
};

const Page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const { t } = await translation('metadata', searchParams?.hl);

  const ld = ldModule.generate({
    description: t('discover.providers.description'),
    title: t('discover.providers.title'),
    url: '/discover/providers',
    webpage: {
      enable: true,
      search: '/discover/search',
    },
  });

  return (
    <>
      <StructuredData ld={ld} />
      {/* Removed List component and its props */}
    </>
  );
};

Page.displayName = 'DiscoverProviders';

export default Page;
