import { createFuzzyMatcher } from "./searchKorean";

type Props = {
  keyword: string;
  text: string;
};

export default function TextHighligher({ keyword, text }: Props) {
  const regex = createFuzzyMatcher(keyword);
  const v = text.replace(
    regex,
    (v) => `<span class='bg-gray-300'>${v}</span>`
  );
  return <div dangerouslySetInnerHTML={{ __html: v }}></div>;
}
