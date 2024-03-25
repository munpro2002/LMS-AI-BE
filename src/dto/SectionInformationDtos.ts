export class SectionInformationDtos {
    name: string;
    courseId: number;
    lessons: LessonInformationDtos[];
    quiz: QuizInformationDtos;
}

export class LessonInformationDtos {
    name: string;
    video_path: string;
}

export class QuizInformationDtos {
    question: string;
    first_choice: string;
    second_choice: string;
    third_choice: string;
    fourth_choice: string;
    correct_choice: string;
}