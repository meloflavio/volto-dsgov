import { useState, useEffect } from 'react';

const BrAvatar = (props) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@govbr-ds/react-components').then((module) => {
        setComponent(() => module.BrAvatar);
      });
    }
  }, []);

  if (!Component) return <>Loading...</>;

  return <Component {...props} />;
};

export default BrAvatar;
