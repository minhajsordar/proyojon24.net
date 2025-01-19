const users = []

// Join user to chat

function userJoin(_id, room){
    const user = {_id, room};
    users.push(user);
    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user=>user._id === id);
}

// User leaves chat
function userLeave(id){
    const index = users.findIndex(user => user._id === id)
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room){
    return users.filter(user=>user.room === room)
}

export {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}