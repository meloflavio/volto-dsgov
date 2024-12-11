import { useState, useEffect } from 'react';

const BrFooter = (props) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@govbr-ds/react-components').then((module) => {
        setComponent(() => module.BrFooter);
      });
    }
  }, []);

  if (!Component) return <>Loading...</>;

  return <Component {...props} />;
};

export default BrFooter;
