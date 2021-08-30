const LessonLink=id=>{
    return `/flashcard/${id}/lesson`;
}
const FlashcardLink=(id, classId)=>{
    return `/flashcard/${classId}/lesson/${id}/card`;
}
export default {LessonLink, FlashcardLink};