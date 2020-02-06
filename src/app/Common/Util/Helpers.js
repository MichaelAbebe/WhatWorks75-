


export const objectToArray=(object)=>{
  if(object){
    return Object.entries(object).map(e=>Object.assign({},e[1],{id:e[0]}))
  }
} 


export const createNewPost = (user, photoURL, post,firestore) => {
  return {
    ...post,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/Assets/user.png",
    created: new Date(),
    participants: {
      [user.uid]: {
        participating: true,
        joinDate: new Date(),
        photoURL: photoURL || "/Assets/user.png",
        displayName: user.displayName,
        host: true
      }
    }
  };
};


export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};