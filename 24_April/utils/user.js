const users=[];

const userJoin=(id,username,room)=>{
    const user={id,username,room};
    users.push(user);
    return user
}

function getAllUser(room){
    return users.filter(el=>el.room===room)
}

function getCurrentUser(id){
    return users.find(el=>el.id===id)
}

module.exports={userJoin,getAllUser,getCurrentUser};