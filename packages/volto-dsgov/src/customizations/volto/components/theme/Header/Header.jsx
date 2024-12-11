import PropTypes from 'prop-types';

import React from 'react';

import { useSelector, shallowEqual } from 'react-redux';
import useHeader from '../../../../../hooks/useHeader';
import Avatar from '../Avatar/Avatar';
import useNavigation from '../../../../../hooks/useNavigation';
import useSearch from '../../../../../hooks/useSearch';
import { BrMenu, BrHeader } from '../../../../../components/BrComponents';

const Header = ({ pathname }) => {

  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const items = useSelector((state) => state.navigation.items, shallowEqual);
  const lang = useSelector((state) => state.intl.locale);
  const { firstText, secondText} =
    useHeader({ pathname });

  const { redirectToPath } = useNavigation();
  const { onSearch } = useSearch({pathname});

  return (
    <div>

      <BrHeader
        features={[
          {
            icon: 'chart-bar',
            label: 'Funcionalidade 1',
            onClick: function Dc(){}
          },
          {
            icon: 'headset',
            label: 'Funcionalidade 2',
            onClick: function Dc(){}
          },
          {
            icon: 'comment',
            label: 'Funcionalidade 3',
            onClick: function Dc(){}
          },
          {
            icon: 'adjust',
            label: 'Funcionalidade 4',
            onClick: function Dc(){}
          }
        ]}
        menuId="main-navigation"
        onClickLogin={() => redirectToPath('/login')}
        showLoginButton={true}
        loggedIn={token}
        quickAccessLinks={items.map(item =>  ({
          label: item.title,
          onClick: () => redirectToPath(item.url)
        }))}
        avatar={<Avatar  /> }
        showMenuButton
        showSearchBar
        onSearch={onSearch}
        signature={firstText}
        subTitle={secondText}
        title={firstText}
        urlLogo="https://www.gov.br/ds/assets/img/govbr-logo.png"
      />
      <BrMenu
        closable
        data={[
          {
            divider: true,
            icon: 'home',
            label: 'Página Inicial',
            onClick: function Dc(){}
          },
          {
            icon: 'calendar',
            label: 'Folder',
            submenu: [
              {
                icon: 'moon',
                label: 'Sub Folder 1',
                onClick: function Dc(){}
              },
              {
                icon: 'sun',
                label: 'Sub Folder 2',
                submenu: [
                  {
                    icon: 'wifi',
                    label: 'Sub Sub Folder 1',
                    onClick: function Dc(){}
                  }
                ]
              }
            ]
          }
        ]}
        externalLinks={[
          {
            label: 'Link externo 01',
            link: 'https://google.com/'
          },
          {
            label: 'Link externo 02',
            link: 'https://google.com/'
          }
        ]}
        id="main-navigation"
        info={<div className="text-center text-down-01">Todo o conteúdo deste site está publicado sob a licença{' '}<strong>Creative Commons Atribuição-SemDerivações 3.0</strong></div>}
        logos={[
          {
            alt: 'Logo 01',
            src: 'https://www.gov.br/ds/assets/img/govbr-logo.png'
          },
          {
            alt: 'Logo 02',
            src: 'https://www.gov.br/ds/assets/img/govbr-logo.png'
          }
        ]}
        socialNetworks={[
          {
            icon: 'fab fa-facebook-f',
            link: '#',
            name: 'Facebook'
          },
          {
            icon: 'fab fa-twitter',
            link: '#',
            name: 'Twitter'
          },
          {
            icon: 'fab fa-linkedin-in',
            link: '#',
            name: 'Linkedin'
          },
          {
            icon: 'fab fa-whatsapp',
            link: '#',
            name: 'Whatsapp'
          }
        ]}
        systemLogoUrl="https://www.gov.br/ds/assets/img/govbr-logo.png"
        systemName="Nome da aplicação"
      />
    </div>

  );
};

export default Header;

Header.propTypes = {
  token: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func,
  content: PropTypes.objectOf(PropTypes.any),
};

Header.defaultProps = {
  token: null,
  content: null,
};
