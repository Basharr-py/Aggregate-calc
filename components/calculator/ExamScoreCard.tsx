import Card from "../ui/Card";

import OlevelSection from "./OlevelSection";
import JambSection from "./JambSection";
import PutmeSection from "./PutmeSection";
import type { Subject } from "../../types/subject";


type OlevelEntry = {
  subjectId: number | null;
  grade: string;
};
type Props = {
  subjects: Subject[];
  olevelSubjects: OlevelEntry[];
  setOlevelSubjects: React.Dispatch<
    React.SetStateAction<OlevelEntry[]>
  >;
jambScore: string;
    setJambScore: React.Dispatch<
        React.SetStateAction<string>
    >;

    putmeScore: string;
    setPutmeScore: React.Dispatch<
        React.SetStateAction<string>
    >;
};

function ExamScoreCard({
    subjects,
    olevelSubjects,
    setOlevelSubjects,
    jambScore,
    setJambScore,
    putmeScore,
    setPutmeScore,
}: Props) {
  return (
    <Card title="Examination Scores">
      

      <OlevelSection
  subjects={subjects}
  olevelSubjects={olevelSubjects}
  setOlevelSubjects={setOlevelSubjects}
/>
<JambSection
    jambScore={jambScore}
    setJambScore={setJambScore}
/>

<PutmeSection
    putmeScore={putmeScore}
    setPutmeScore={setPutmeScore}
/>
    </Card>
  );
}

export default ExamScoreCard;