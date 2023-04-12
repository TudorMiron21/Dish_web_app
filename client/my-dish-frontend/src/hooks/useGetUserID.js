
export const useGetUserId = ()=>{ //a hook to return the user id more elegantley
    return window.localStorage.getItem("userID");
}