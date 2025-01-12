'use client';

import { MobileNavBar } from '@lobehub/ui';
import { memo } from 'react';

import { useInitAgentConfig } from '@/app/(main)/chat/(workspace)/_layout/useInitAgentConfig';
import { INBOX_SESSION_ID } from '@/const/session';
import { useQueryRoute } from '@/hooks/useQueryRoute';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

import SettingButton from '../../../features/SettingButton';
import ChatHeaderTitle from './ChatHeaderTitle';

const MobileHeader = memo(() => {
  const router = useQueryRoute();

  const { isAgentEditable } = useServerConfigStore(featureFlagsSelectors);
  useInitAgentConfig();

  return (
    <MobileNavBar
      center={<ChatHeaderTitle />}
      onBackClick={() =>
        router.push('/chat', { query: { session: INBOX_SESSION_ID }, replace: true })
      }
      right={
        isAgentEditable && <SettingButton mobile />
      }
      showBackButton
      style={{ width: '100%' }}
    />
  );
});

export default MobileHeader;
