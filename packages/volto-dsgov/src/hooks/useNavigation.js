import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@plone/volto/actions';

export default function useNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();

  const pushToLogout = () => dispatch(logout());
  const redirectToPath = (path) => history.push(path);

  return {
    pushToLogout,
    redirectToPath,
  };
}
