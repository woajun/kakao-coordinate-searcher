import { createFuzzyMatcher } from './searchKorean';

type Props = {
  keyword: string;
  text: string;
};

export default function TextHighligher({ keyword, text }: Props) {
  const regex = createFuzzyMatcher(keyword);
  const v = text.replace(
    regex,
    (value) => `<span class='bg-gray-300'>${value}</span>`,
  );
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: v }} />;
}
