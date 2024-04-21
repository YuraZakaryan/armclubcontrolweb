import { useCallback, useEffect, useState } from 'react';

export const useActiveTab = (storageTabName: string, initialTab: string) => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(storageTabName) || initialTab);

  const handleTabClick = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      localStorage.setItem(storageTabName, tab);
    },
    [storageTabName],
  );

  useEffect(() => {
    const storedTab = localStorage.getItem(storageTabName);
    if (storedTab && storedTab !== activeTab) {
      setActiveTab(storedTab);
    }
  }, [activeTab, storageTabName]);

  return { activeTab, handleTabClick };
};
