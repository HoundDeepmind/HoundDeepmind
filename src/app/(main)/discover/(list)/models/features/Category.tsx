'use client';

import { memo } from 'react';

const EmptyComponent = memo(() => {
  return null;  // This component now does nothing and renders nothing
});

export default EmptyComponent;
