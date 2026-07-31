import Card from "../ui/Card";
import Input from "../ui/Input";

type Props = {
  jambScore: string;
  setJambScore: React.Dispatch<
    React.SetStateAction<string>
  >;
};

function JambSection({
  jambScore,
  setJambScore,
}: Props) {
  return (
    <Card title="JAMB">
      <Input
        label="JAMB Score"
        type="number"
        value={jambScore}
        onChange={(e) => setJambScore(e.target.value)}
      />
    </Card>
  );
}

export default JambSection;