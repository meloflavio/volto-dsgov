import { useHistory } from "react-router-dom";

export default function useSearch({ pathname }) {

  const history = useHistory();

  const onSearch = (terms) => {
    const path =
      pathname?.length > 0 ? `&path=${encodeURIComponent(pathname)}` : '';

    history.push(`./search?SearchableText=${encodeURIComponent(terms)}${path}`);
  };

  return {
    onSearch
  };
}
