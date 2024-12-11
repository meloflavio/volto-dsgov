import { useState, useEffect } from 'react';

const BrBreadcrumbs = (props) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@govbr-ds/react-components').then((module) => {
        setComponent(() => module.BrBreadcrumbs);
      });
    }
  }, []);

  if (!Component) return <>Loading...</>;

  return <Component {...props} />;
};

export default BrBreadcrumbs;
