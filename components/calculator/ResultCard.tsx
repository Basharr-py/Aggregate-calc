import Card from "../ui/Card";
import Button from "../ui/Button";

type Props = {
  aggregateResult: number | null;
  onCalculate: () => void;
};

function ResultCard({
  aggregateResult,
  onCalculate,
}: Props) {
  return (
    <Card title="Result">
      <p>Aggregate Score</p>

      <h2>
        {aggregateResult ?? "--"}
      </h2>

      <Button onClick={onCalculate}>
        Calculate
      </Button>
    </Card>
  );
}

export default ResultCard;