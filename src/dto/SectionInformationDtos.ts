export class SectionInformationDtos {
    sectionId?:number
    name: string;
    courseId: number;
    lessons: LessonInformationDtos[];
    quiz: QuizInformationDtos;
    materials: MaterialInformationDtos[];
}

export class LessonInformationDtos {
    lessonId?: number
    name: string;
    video_path: string;
}

export class QuizInformationDtos {
    quizId?: number;
    question: string;
    first_choice: string;
    second_choice: string;
    third_choice: string;
    fourth_choice: string;
    correct_choice: string;
}

export class MaterialInformationDtos {
    materialId?: number;
    activity_type: string;
    url_path: string;
}