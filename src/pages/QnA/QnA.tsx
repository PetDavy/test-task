import { CenteredLayout } from '~/components';
import untypedQnAItems from './items.json';

const QnAList = untypedQnAItems as QnAItem[];

interface QnAItem {
  id: number;
  question: string;
  answer: string;
}

const QnaRender = ({ question, answer }: QnAItem) => (
  <>
    <h3 className="font-bold text-lg">{question}</h3>
    <p className="mb-2">{answer}</p>
  </>
);

export const QnA = () => {
  return (
    <CenteredLayout className="gap-2">
      <div className="text-3xl mb-2">See the code</div>
      {QnAList.map((item) => (
        <QnaRender key={item.id} {...item} />
      ))}
    </CenteredLayout>
  );
};
