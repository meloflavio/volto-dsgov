import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { BrBreadcrumbs } from '../../../../../components/BrComponents';

import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import useGovBrComponents from '../../../../../hooks/useGovBrComponents';
import useNavigation from '../../../../../hooks/useNavigation';
import './breadcrumbs.less'
const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

const BreadcrumbsComponent = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.breadcrumbs.items, shallowEqual);
  const root = useSelector((state) => state.breadcrumbs.root);
  const { redirectToPath } = useNavigation();

  const initialCrumb = {
    isHome: true,
    label: intl.formatMessage(messages.home),
    onClick: () => redirectToPath(root || '/')
  }


  useEffect(() => {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(pathname))) {
      dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  return (
    <Container>

    <BrBreadcrumbs crumbs={[ initialCrumb, ...items.map((item, index) => ( {
            href: item.url,
            label: item.title,
            active: index === items.length - 1,
      }
        )) ]} />
    </Container>

  );
};

BreadcrumbsComponent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default BreadcrumbsComponent;
