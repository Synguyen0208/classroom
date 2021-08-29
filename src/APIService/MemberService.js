import CallAPI from './CallApi';

const inviteMember=(classId, data)=>{
    return CallAPI(`classrooms/${classId}/invite`, 'post', data);
}
const removeMember=(classId, memberEmail)=>{
    const data={
        email:memberEmail
    }
    return CallAPI(`classrooms/${classId}/removeMember`, 'post', data)
}
export default {inviteMember, removeMember};