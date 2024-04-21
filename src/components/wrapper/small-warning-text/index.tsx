import React, { PropsWithChildren } from 'react';

export const SmallWarningText: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  return <small className="text-red-600">{children}</small>;
});
SmallWarningText.displayName = 'SmallWarningText';
