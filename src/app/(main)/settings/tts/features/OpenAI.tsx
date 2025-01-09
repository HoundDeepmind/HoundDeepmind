'use client';

import { Form } from '@lobehub/ui';
import { memo } from 'react';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

const CustomSettings = memo(() => {
  const [form] = Form.useForm();
  const settings = useUserStore(settingsSelectors.currentSettings);
  const [setSettings] = useUserStore((s) => [s.setSettings]);

  return (
    <Form
      form={form}
      initialValues={settings}
      onValuesChange={setSettings}
    />
  );
});

export default CustomSettings;
