import React from 'react';
import { Locales } from '@/locales/resources';
import Back from '../../(detail)/features/Back';

interface ProvidersResultProps {
  locale: Locales;
  mobile?: boolean;
  q: string;
}

const ProvidersResult: React.FC<ProvidersResultProps> = ({ mobile }) => {
  // Removed DiscoverService and items related to model providers

  return (
    <>
      {!mobile && <Back href={'/discover/providers'} style={{ marginBottom: 0 }} />}
      {/* Removed the List component usage */}
    </>
  );
};

export default ProvidersResult;
