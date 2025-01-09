/* eslint-disable react/jsx-sort-props, sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props, sort-keys-fix/sort-keys-fix, unicorn/numeric-separators-style */
// eslint-disable-next-line no-console

import { ActionIcon, MobileNavBarTitle } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { topicSelectors } from '@/store/chat/selectors';
import { useGlobalStore } from '@/store/global';

const ChatHeaderTitle = memo(() => {
  const { t } = useTranslation(['chat', 'topic']);
  const toggleConfig = useGlobalStore((s) => s.toggleMobileTopic);
  const [topicLength, topic] = useChatStore((s) => [
    topicSelectors.currentTopicLength(s),
    topicSelectors.currentActiveTopic(s),
  ]);
  const theme = useTheme();

  return (
    <MobileNavBarTitle
      desc={
        <Flexbox align="center" gap={4} horizontal onClick={() => toggleConfig()}>
          <span>{topic?.title || t('title', { ns: 'topic' })}</span>
          <ActionIcon
            active
            icon={ChevronDown}
            size={{ blockSize: 14, borderRadius: '50%', fontSize: 12 }}
            style={{
              background: theme.colorFillSecondary,
              color: theme.colorTextDescription,
            }}
          />
        </Flexbox>
      }
      title={
        <div
          onClick={() => toggleConfig()}
          style={{
            maxWidth: '64vw',
            marginRight: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Flexbox align="center" gap={4} style={{ flexDirection: 'row' }}>
            <span
              style={{
                color: '#333', // Dark text color
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              HoundDeepMind
            </span>
            <svg
              className="bi bi-check-circle-fill"
              fill="#0d6efd" // Blue check icon color
              height="16"
              style={{ verticalAlign: 'middle' }}
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </Flexbox>
          {topicLength > 1 ? `(${topicLength + 1})` : ''}
        </div>
      }
    />
  );
});

export default ChatHeaderTitle;
