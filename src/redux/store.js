import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from '../comments/commentsSlice'
import usersReducer from '../users/usersSlicer'

export default configureStore({
    reducer: {
        comments: commentsReducer,
        users: usersReducer,
    },
})