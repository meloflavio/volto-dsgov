import React from 'react';
import { BrFooter } from '../../../../../components/BrComponents';

import { useSelector, shallowEqual } from 'react-redux';
import useGovBrComponents from '../../../../../hooks/useGovBrComponents';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

function transformDataCategories(data) {
  const result = {};

  data.forEach((item) => {
    const category = item.category || "Default";

    if (!result[category]) {
      result[category] = {
        category: category,
        items: [],
      };
    }

    result[category].items.push({
      label: item.title,
      link: item.url,
    });
  });

  return Object.values(result);
}
const Footer = ({ intl }) => {

  const { siteActions = [] } = useSelector(
    (state) => ({
      siteActions: state.actions?.actions?.site_actions,
    }),
    shallowEqual,
  );



  return (

      <div>
        <BrFooter
          footerImages={[
            {
              link: '#',
              name: 'Footer Image 1',
              url: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png'
            },
            {
              link: '#',
              name: 'Footer Image 2',
              url: 'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-assign-negative.png'
            }
          ]}
          links={transformDataCategories(siteActions)}
          urlLogo="https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-negative.png"
          userLicenseText={<FormattedMessage
            id="Distributed under the {license}."
            defaultMessage="Distributed under the {license}."
            values={{
              license: (
                <a
                  className="item"
                  href="http://creativecommons.org/licenses/GPL/2.0/"
                >
                  <FormattedMessage
                    id="GNU GPL license"
                    defaultMessage="GNU GPL license"
                  />
                </a>
              ),
            }}
          />}
        />
      </div>
  )

};

export default injectIntl(Footer);


