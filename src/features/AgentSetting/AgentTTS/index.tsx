'use client';

import { VoiceList } from '@lobehub/tts';
import { Form, ItemGroup } from '@lobehub/ui';
import { Switch } from 'antd';
import { debounce } from 'lodash-es';
import { Mic } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/selectors';

import { useStore } from '../store';
import { useAgentSyncSettings } from '../useSyncAgemtSettings';

const TTS_SETTING_KEY = 'tts';

const AgentTTS = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = Form.useForm();

  const voiceList = useUserStore((s) => {
    const locale = userGeneralSettingsSelectors.currentLanguage(s);
    return (all?: boolean) => new VoiceList(all ? undefined : locale);
  });

  const [showAllLocaleVoice, updateConfig] = useStore((s) => [
    s.config.tts.showAllLocaleVoice,
    s.setAgentConfig,
  ]);

  useAgentSyncSettings(form);

  const { edgeVoiceOptions, microsoftVoiceOptions } = useMemo(
    () => voiceList(showAllLocaleVoice),
    [showAllLocaleVoice],
  );

  const tts: ItemGroup = {
    children: [
      {
        children: <Switch />,
        desc: t('settingTTS.showAllLocaleVoice.desc'),
        label: t('settingTTS.showAllLocaleVoice.title'),
        name: [TTS_SETTING_KEY, 'showAllLocaleVoice'],
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        desc: t('settingTTS.voice.desc'),
        label: t('settingTTS.voice.title'),
        name: [TTS_SETTING_KEY, 'voice'],
        valuePropName: 'checked',
      },
    ],
    icon: Mic,
    title: t('settingTTS.title'),
  };

  return (
    <Form
      form={form}
      initialValues={{
        [TTS_SETTING_KEY]: {
          voice: {
            edge: edgeVoiceOptions?.[0]?.value || null,
            microsoft: microsoftVoiceOptions?.[0]?.value || null,
          },
        },
      }}
      items={[tts]}
      itemsType="group"
      onValuesChange={debounce(updateConfig, 100)}
      variant="pure"
      {...FORM_STYLE}
    />
  );
});

export default AgentTTS;
