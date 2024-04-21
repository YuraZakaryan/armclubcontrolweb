import React, { PropsWithChildren } from 'react';

export const CategoryTitle: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  return <h2 className={'my-3 text-2xl font-semibold text-text_special'}>{children}</h2>;
});
CategoryTitle.displayName = 'CategoryTitle';
