import api from "./axios";

export async function getUniversities() {
    const response = await api.get("/universities");

    return response.data;
}

export async function getCourses(universityId: number) {
    const response = await api.get(
        `/universities/${universityId}/courses`
    );

    return response.data;
}