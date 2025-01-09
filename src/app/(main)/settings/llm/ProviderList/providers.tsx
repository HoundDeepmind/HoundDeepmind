'use client';

import { useMemo } from 'react';

// Removed all model provider imports

import { ProviderItem } from '../type';
// Removed all custom provider hooks

export const useProviderList = (): ProviderItem[] => {
  return useMemo(
    () => [], // Return an empty array to ensure no providers are displayed
    []
  );
};
