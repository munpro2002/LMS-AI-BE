export class SectionInformationDtos {
    sectionId?:number
    name: string;
    courseId: number;
}

export class LessonInformationDtos {
    lessonId?: number
    sectionId: number
    name: string;
    video_path: string;
}

export class QuizInformationDtos {
    quizId?: number;
    sectionId: number;
    question: string;
    first_choice: string;
    second_choice: string;
    third_choice: string;
    fourth_choice: string;
    correct_choice: string;
    courseId: number;
}

export class MaterialInformationDtos {
    materialId?: number;
    sectionId: number;
    activity_type: string;
    url_path: string;
    title: string;
}