export type KakaoMap = {
  map: kakao.maps.Map,
  places: kakao.maps.services.Places
}

type KakaoMapSet = {
  type: 'set';
  payload: KakaoMap
};

export type KakaoMapAction = KakaoMapSet;
