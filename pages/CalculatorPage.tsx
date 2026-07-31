import { useEffect, useState } from "react";

import type { OlevelEntry } from "../types/olevel";
import type { University } from "../types/university";
import type { Course } from "../types/course";
import type { Subject } from "../types/subject";

import { getUniversities, getCourses } from "../api/university";
import { getSubjects } from "../api/subject";
import { calculateAggregate } from "../api/calculator";

import UniversityCourseCard from "../components/calculator/UniversityCourseCard";
import ExamScoreCard from "../components/calculator/ExamScoreCard";
import ResultCard from "../components/calculator/ResultCard";

function CalculatorPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  
  const [jambScore, setJambScore] = useState("");
  const [putmeScore, setPutmeScore] = useState("");

  const [aggregateResult, setAggregateResult] =
    useState<number | null>(null);

  const handleCalculate = async () => {
    const payload = {
        university_id: selectedUniversity,
        course_id: selectedCourse,
        jamb_score: Number(jambScore),
        putme_score: putmeScore
            ? Number(putmeScore)
            : null,

        grades: olevelSubjects.map((item) => ({
            subject_id: item.subjectId,
            grade: item.grade,
        })),
    };

    console.log(payload);

    try {
        const result =
            await calculateAggregate(payload);

        setAggregateResult(
            result.aggregate_score
        );

    } catch (error) {
        console.error(error);
    }
};

  const [olevelSubjects, setOlevelSubjects] = useState<OlevelEntry[]>([
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
    { subjectId: null, grade: "" },
   ]);

  async function handleUniversityChange(id: number) {
  setSelectedUniversity(id);

  const courses = await getCourses(id);

  setCourses(courses);

  setSelectedCourse(null);
  }

  useEffect(() => {
    async function loadData() {
      const universities = await getUniversities();
      const subjects = await getSubjects();

      setUniversities(universities);
      setSubjects(subjects);
    }

    loadData();
  }, []);

  return (
    <>
      <h1>University Aggregate Calculator</h1>

      <UniversityCourseCard
        universities={universities}
        courses={courses}
        selectedUniversity={selectedUniversity}
        selectedCourse={selectedCourse}
        onUniversityChange={handleUniversityChange}
        onCourseChange={(id) => setSelectedCourse(id)}
        />

      <ExamScoreCard subjects={subjects}
      olevelSubjects={olevelSubjects}
      setOlevelSubjects={setOlevelSubjects}
      jambScore={jambScore}
      setJambScore={setJambScore}
      putmeScore={putmeScore}
      setPutmeScore={setPutmeScore}
      />

      <ResultCard
        aggregateResult={aggregateResult}
        onCalculate={handleCalculate}
      />
    </>
  );
}

export default CalculatorPage;