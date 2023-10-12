import { useEffect, useState } from 'react';
import { useIsLoadedMap } from '../map/IsLoadedMapContext';

export default function PlaceList() {
  const isLoaded = useIsLoadedMap();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    if(!isLoaded) return;
    setPs(new kakao.maps.services.Places());
  }, [isLoaded])

  useEffect(() => {
    if(!ps) return;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
      }
    })

  }, [keyword, ps])
  return <div>
    <input type="text" onChange={(e) => {
      setKeyword(e.target.value)
      }}/>

  </div>;
}
