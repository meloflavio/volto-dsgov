import  { useState, useEffect } from 'react';

export default function useGovBrComponents() {
  const defaultState = {
    isLoading: true,
    BrAvatar: null,
    BrBreadcrumbs: null,
    BrHeader: null,
    BrMenu: null,
    BrFooter: null,
  }
  const [components, setComponents] = useState(defaultState);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@govbr-ds/react-components').then((module) => {
        setComponents({
          isLoading: false,
          BrAvatar: module.BrAvatar,
          BrBreadcrumbs: module.BrBreadcrumbs,
          BrHeader: module.BrHeader,
          BrMenu: module.BrMenu,
          BrFooter: module.BrFooter,
        });
      });
    }
  }, []);

  return components;
}
