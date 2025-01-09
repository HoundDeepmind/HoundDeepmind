import { ActionIcon } from '@lobehub/ui';
import { Wrench, LucideLoader2 } from 'lucide-react'; // Changed from Blocks to Wrench
import { Suspense, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useUserStore } from '@/store/user';
import { modelProviderSelectors } from '@/store/user/selectors';

import DropdownMenu from './Dropdown';

const Tools = memo(() => {
  const { t } = useTranslation('setting');
  const { enablePlugins } = useServerConfigStore(featureFlagsSelectors);

  const model = useAgentStore(agentSelectors.currentAgentModel);
  const enableFC = useUserStore(modelProviderSelectors.isModelEnabledFunctionCall(model));

  return (
    enablePlugins && (
      <Suspense fallback={<ActionIcon icon={LucideLoader2} spin />}>
        <DropdownMenu>
          <ActionIcon
            disable={!enableFC}
            icon={Wrench} // Replaced Blocks with Wrench
            placement={'bottom'}
            title={t(enableFC ? 'tools.title' : 'tools.disabled')}
          />
        </DropdownMenu>
      </Suspense>
    )
  );
});

export default Tools;
