import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Translate = (key, data) => {
  const localize = useSelector((state) => state.localize);
  return getTranslate(localize)(key, data);
};

export default Translate;
