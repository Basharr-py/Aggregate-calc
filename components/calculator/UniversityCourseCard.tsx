import Card from "../ui/Card";
import Select from "../ui/Select";
import type { University } from "../../types/university";
import type { Course } from "../../types/course";

type Props = {
  universities: University[];
  courses: Course[];
  selectedUniversity: number | null;
  selectedCourse: number | null;
  onUniversityChange: (id: number) => void;
  onCourseChange: (id: number) => void;
};

function UniversityCourseCard({
    universities,
    courses,
    selectedUniversity,
    selectedCourse,
    onUniversityChange,
    onCourseChange,
    }: Props) {
    const handleUniversityChange = (value: string | number) => {
        onUniversityChange(Number(value));
    };

    const handleCourseChange = (value: string | number) => {
        onCourseChange(Number(value));
    };

    return (
        <Card title="University & Course">
        <Select
            label="University"
            options={universities.map((university) => ({
                value: university.id,
                label: university.name,
            }))}
            value={selectedUniversity ?? ""}
            onChange={handleUniversityChange}
            />

        <Select
            label="Course"
            options={courses.map((course) => ({
                value: course.id,
                label: course.name,
            }))}
            value={selectedCourse ?? ""}
            onChange={handleCourseChange}
        />
        </Card>
    );
}

export default UniversityCourseCard;