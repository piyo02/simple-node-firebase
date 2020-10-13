import firebase, { database } from '../../firebase';

export const actionUsername = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({type: "CHANGE_USER", value: "Zidni"})
    }, 2000)
}

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_LOADING", value: true});
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                console.log('success: ', res);
                dispatch({type: "CHANGE_LOADING", value: false});
                resolve(true);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                dispatch({type: "CHANGE_LOADING", value: false});
                reject(false);
            })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_LOADING", value: true});
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                console.log('success: ', res);
                const dataUser = {
                    email: res.user.email,
                    emailVerified: res.user.emailVerified,
                    uid: res.user.uid,
                    refreshToken: res.user.refreshToken
                }
                dispatch({type: "CHANGE_LOADING", value: false});
                dispatch({type: "CHANGE_ISLOGIN", value: true});
                dispatch({type: "CHANGE_USER", value: dataUser});
                resolve(dataUser);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                dispatch({type: "CHANGE_LOADING", value: false});
                dispatch({type: "CHANGE_ISLOGIN", value: false});
                reject(false);
            })
    })
}

export const addDataToAPI = (data) => (dispatch) => {
    database.ref('notes/' + data.userId).push({
        title: data.title,
        content: data.content,
        date: data.date
    })
}

export const getDataFromAPI = (userId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const urlNotes = database.ref('notes/' + userId);
        urlNotes.on('value', function(snapshot) {
            // object -> array
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })

            dispatch({type: "SET_NOTES", value: data});
            resolve(snapshot.val())    
        });
    })   
}

export const updateDataFromAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err){
                reject(false);
            }else {
                resolve(true)
            }
        });
    })   
}

export const deleteDataFromAPI = (data) => (dispatch) => {
    const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.remove(); 
    })
}