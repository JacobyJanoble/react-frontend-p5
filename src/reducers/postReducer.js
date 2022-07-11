const initialState = {
    allPosts: [],
    newPost: {},
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POSTS' : {
            return {
                ...state,
                allPosts: action.posts
            }
        }
        case 'ADD_POST' : {
            return {
                ...state,
                allPosts: [...state.allPosts, action.post],
                newPost: action.post
            }
        }
        case 'UPDATE_POST' : {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.post.id)
            return {
                ...state,
                allPosts: [...newAllPosts, action.post]
            }
        }
        case 'DELETE_POST' : {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.post.id)
            if (action.post.postable_type === "Post") {
                let parentPost = newAllPosts.find(post => post.id === action.post.postable_id)
                parentPost.posts.filter(po.id !== action.post.id)
                newAllPosts.filter(post => post.id !== parentPost.id)
                newAllPosts = [...newAllPosts, parentPost]
            }
            return {
                ...state,
                allPosts: [...newAllPosts]
            }
        }
        case 'ADD_REPLY' : {
            let parentPost = state.allPosts.find(post => post.id === action.reply.postable_id)
            let newAllPosts = state.allPosts.filter(post => post.id !== action.reply.postable_id)

            parentPost.posts = [...parentPost.posts, action.reply]
            return {
                ...state,
                allPosts: [...newAllPosts, parentPost, action.reply]
            }
        }
        case 'LIKE' : {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.like.post_id)
            let likedPost = state.allPosts.find(post => post.id!== action.lile.post_id)
            likedPost.likes.push(action.like)
            return {
                ...state,
                allPosts: [likedPost, ...newAllPosts]
            }
        }
        case 'UNLIKE' : {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.unlike.post_id)
            let unlikedPost = state.allPosts.find(post => post.id === action.unlike.post_id)
            unlikedPost.likes = unlikedPost.likes.filter(like => like.id !== action.unlike)
            return {
                ...state,
                allPosts: [unlikedPost, ...newAllPosts]
            }
        }
        case 'DISLIKE' : {
            let newAllPosts = state.allPosts.filter(post => post.id !== action.dislike.post.id)
            let dislikedPost = state.allPosts.find(post => post.id === action.dislike.post.id)
            dislikedPost.dislikes.push(action.dislike)
            return {
                ...state,
                allPosts: [...newAllPosts, dislikedPost]
            }
        }
        default:
            return state;
    }
};

export default postReducer;