import { getLocalStorage } from '@/utils';

export default function Index() {
  return getLocalStorage('token');
}
