import { useState, useEffect } from 'react';

const BrHeader = (props) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@govbr-ds/react-components').then((module) => {
        setComponent(() => module.BrHeader);
      });
    }
  }, []);

  if (!Component) return <>Loading...</>;

  return <Component {...props} />;
};

export default BrHeader;
