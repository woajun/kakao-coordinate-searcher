import { useEffect, useState } from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import { usePlaceSearchList, usePlaceSearchListDispatch } from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';

export default function PlaceList() {
  const isLoaded = useIsLoadedMap();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [keyword, setKeyword] = useState('');
  const pListDispatcher = usePlaceSearchListDispatch();
  const pList = usePlaceSearchList();

  useEffect(() => {
    if (!isLoaded) return;
    setPs(new kakao.maps.services.Places());
  }, [isLoaded]);

  useEffect(() => {
    if (!ps || !pListDispatcher) return;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        pListDispatcher({
          type: 'set',
          payload: {
            data,
            pagination,
          },
        });
      }
    });
  }, [keyword, ps, pListDispatcher]);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {
        pList && pList.data.map((e) => {
          return <div key={e.id} onMouseOver={() => {
            console.log('bbb')
          }}>
            {e.place_name}
          </div>
        })
      }
    </div>
  );
}
