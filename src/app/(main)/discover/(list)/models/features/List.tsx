'use client';

import { memo } from 'react';

export interface ListProps {
  category?: string;
  items?: any[];
  mobile?: boolean;
  searchKeywords?: string;
}

const List = memo<ListProps>(() => {
  return null;
});

export default List;
