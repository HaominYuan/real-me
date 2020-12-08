const INIT = "INIT"
const ADD = "ADD"
const DELETE = "DELETE"

export default (state, action) => {
    if (!state) return {
        comments: []
    }
    switch (action.type) {
        case INIT:
            return {
                comments: action.comments
            }
        case ADD:
            return {
                comments: [action.comment, ...state.comments]
            }
        case DELETE:
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        default:
            return state;
    }
}


export const initComments = (comments) => {
    return { type: INIT, comments }
}

export const addComment = (comment) => {
    return { type: ADD, comment }
}

export const deleteComment = (commentIndex) => {
    return { type: DELETE, commentIndex }
}