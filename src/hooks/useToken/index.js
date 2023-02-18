import { getLocalStorage } from '../../utils/localStorage';

export default function Index() {
  return getLocalStorage('token');
}
