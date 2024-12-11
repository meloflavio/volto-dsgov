import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import { getNavigation } from '@plone/volto/actions/navigation/navigation';

export default function useHeader({ pathname }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSession.token, shallowEqual);

  let firstText = '';
  let secondText = '';
  let thirdText = '';

    firstText = 'Universidade Federal do Tocantins';
    secondText = '';
    thirdText = '';


  React.useEffect(() => {
    const { settings } = config;

    if (!hasApiExpander('navigation', getBaseUrl(pathname))) {
      dispatch(getNavigation(getBaseUrl(pathname), settings.navDepth));
    }

  }, [pathname, token,  dispatch]);

  return {
    firstText,
    secondText,
    thirdText,
  };
}
