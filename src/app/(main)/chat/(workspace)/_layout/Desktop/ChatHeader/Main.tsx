/* eslint-disable react/jsx-sort-props, sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props, sort-keys-fix/sort-keys-fix, unicorn/numeric-separators-style */
// eslint-disable-next-line no-console

import { ActionIcon, Avatar } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Suspense, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useOpenChatSettings } from '@/hooks/useInterceptingRoutes';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';
import { useSessionStore } from '@/store/session';
import { sessionMetaSelectors, sessionSelectors } from '@/store/session/selectors';

import { useInitAgentConfig } from '../../useInitAgentConfig';

const Main = memo(() => {
  const { t } = useTranslation('chat');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect dark mode based on system settings
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    // Listen for changes to dark mode preference
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    darkModeQuery.addEventListener('change', handleDarkModeChange);

    // Cleanup listener
    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  useInitAgentConfig();
  const [isPinned] = useQueryState('pinned', parseAsBoolean);

  const [init, avatar, backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    sessionMetaSelectors.currentAgentAvatar(s),
    sessionMetaSelectors.currentAgentBackgroundColor(s),
  ]);

  const openChatSettings = useOpenChatSettings();
  const showSessionPanel = useGlobalStore(systemStatusSelectors.showSessionPanel);
  const updateSystemStatus = useGlobalStore((s) => s.updateSystemStatus);

  // Text color changes based on dark mode
  const textColor = isDarkMode ? '#fff' : '#333';

  return !init ? (
    <Flexbox horizontal>
      <Skeleton
        active
        avatar={{ shape: 'circle', size: 'default' }}
        paragraph={false}
        title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
      />
    </Flexbox>
  ) : (
    <Flexbox align="center" gap={4} horizontal>
      {!isPinned && (
        <ActionIcon
          aria-label={t('agents')}
          icon={showSessionPanel ? PanelLeftClose : PanelLeftOpen}
          onClick={() => {
            updateSystemStatus({
              sessionsWidth: showSessionPanel ? 0 : 320,
              showSessionPanel: !showSessionPanel,
            });
          }}
          size={DESKTOP_HEADER_ICON_SIZE}
          title={t('agents')}
        />
      )}
      <Avatar
        avatar={avatar}
        background={backgroundColor}
        onClick={openChatSettings}
        size={40}
        title={t('agents')}
      />

      {/* Company name and blue check icon in the header */}
      <Flexbox direction="horizontal" gap={4} align="center" style={{ margin: '0 auto' }}>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: textColor, // Apply dynamic color based on dark mode
            textAlign: 'center',
          }}
        >
          HoundDeepMind
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#0d6efd"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
          style={{ marginLeft: '8px', verticalAlign: 'middle' }}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      </Flexbox>
    </Flexbox>
  );
});

export default () => (
  <Suspense
    fallback={
      <Skeleton
        active
        avatar={{ shape: 'circle', size: 'default' }}
        paragraph={false}
        title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
      />
    }
  >
    <Main />
  </Suspense>
);
