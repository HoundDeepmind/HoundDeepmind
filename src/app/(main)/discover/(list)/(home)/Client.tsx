'use client';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { DiscoverAssistantItem, DiscoverPlugintem } from '@/types/discover';

import Title from '../../components/Title';
import AssistantList from './features/AssistantList';
import PluginList from './features/PluginList';

interface ClientProps {
  assistantList: DiscoverAssistantItem[];
  pluginList: DiscoverPlugintem[];
}

const Client = memo<ClientProps>(({ assistantList, pluginList }) => {
  const { t } = useTranslation('discover');
  return (
    <>
      <Title more={t('home.more')} moreLink={'/discover/assistants'}>
        {t('home.featuredAssistants')}
      </Title>
      <AssistantList data={assistantList} />
      <div />
      <Title more={t('home.more')} moreLink={'/discover/plugins'}>
        {t('home.featuredTools')}
      </Title>
      <PluginList data={pluginList} />
      <div />
    </>
  );
});

export default Client;
