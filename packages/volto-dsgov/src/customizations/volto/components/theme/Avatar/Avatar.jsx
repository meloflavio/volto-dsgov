/**
 * Avatar component.
 * @module components/theme/Avatar/Avatar
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getInitials } from '@plone/volto/helpers/Utils/Utils';
import { Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUser, logout } from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import { BrAvatar } from '../../../../../components/BrComponents';

const defaultColor = 'Teal';
const defaultClassName = 'avatar circular';

const Avatar = ({ src, title, text, size, color, className }) => {
  const [selected, setSelected] = useState(false);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const user = useSelector((state) => state.users.user);
  const userId = token ? jwtDecode(token).sub : '';
  const isLogged = userId && 'fullname' in user;
  const dispatch = useDispatch();
  let initial = getInitials(title, 1);
  const pushToLogout = () => dispatch(logout());

  useEffect(() => {
    if (userId && !isLogged) {
      dispatch(getUser(userId));
    }
  }, [dispatch, isLogged, userId]);

  const getAvailableName = () => title || user?.fullname || user?.username;
  const getFirstName = (name) => name?.split(' ')[0] ?? '';

  const trigger = () => {
    const firstName = getFirstName(getAvailableName());
    if (initial === '' && firstName?.length > 0)
      initial = getInitials(firstName, 1);
    return (
      <div className="br-sign-in">
        {src && (
          <BrAvatar src={src} type="image" size={size} className={className} />
        )}
        {!src && (
          <BrAvatar
            src={src ?? initial}
            type="letter"
            size={size}
            className={className}
          />
        )}

        <span className="ml-2 text-gray-80 text-weight-regular">
          Olá, <span className="text-weight-semi-bold">{firstName}</span>
        </span>

        <i className={`fas fa-caret-${selected ? 'up' : 'down'}`} />
      </div>
    );
  };

  return (
    <div>
      <Dropdown
        trigger={trigger()}
        onOpen={() => setSelected(true)}
        onClose={() => setSelected(false)}
      >
        <Dropdown.Menu className="br-list" style={{ minWidth: '200px' }}>
          <Dropdown.Header
            content={
              <div>
                {getAvailableName()}
                <br />
                {user?.email}
              </div>
            }
          />

          <Dropdown.Item
            className="br-item"
            onClick={pushToLogout}
            text={'Sair'}
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  src: null,
  title: '',
  text: null,
  size: null,
  color: defaultColor,
  className: defaultClassName,
};

export default Avatar;
