import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { message } from 'antd'

export const fetchComments = createAsyncThunk(
    'comments/fetch',
    async () => await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10').then(res => res.json())
)

export const deleteComment = createAsyncThunk(
    'comments/delete',
    async id => {
        await fetch('https://jsonplaceholder.typicode.com/comments/' + id, { method: 'DELETE' })
        return id
    }
)

export const updateComment = createAsyncThunk(
    'comments/update',
    async (newObj) => {
        console.log({ newObj })
        await fetch('https://jsonplaceholder.typicode.com/comments/' + newObj.id, { method: 'PUT', body: newObj.newObj })
        return { id: newObj.id, changes: newObj.newObj }
    }
)

const commentsAdapter = createEntityAdapter({
    selectId: comm => comm.id
})

const commentSlice = createSlice({
    name: 'comments',
    initialState: commentsAdapter.getInitialState({ loading: false }),
    reducers: {
        setAllComments: commentsAdapter.setAll,
        setOneComments: commentsAdapter.removeOne,
        setManyComments: commentsAdapter.addMany,
        updateOneComment: commentsAdapter.updateOne,
    },
    extraReducers: {
        [fetchComments.pending](state) {
            state.loading = true
        },
        [fetchComments.fulfilled](state, { payload }) {
            state.loading = false
            commentsAdapter.setAll(state, payload)
        },
        [fetchComments.rejected](state) {
            state.loading = false
        },
        [deleteComment.pending](state) {
            state.loading = true
        },
        [deleteComment.fulfilled](state, { payload: id }) {
            state.loading = false
            commentsAdapter.removeOne(state, id)
            message.success('success')
        },
        [deleteComment.rejected](state) {
            state.loading = false
            message.error('error')
        },
        [updateComment.pending](state) {
            state.loading = true
        },
        [updateComment.fulfilled](state, { payload }) {
            state.loading = false
            commentsAdapter.updateOne(state, { id: payload.id, changes: payload.changes })
            message.success('success')
        },
        [updateComment.rejected](state) {
            state.loading = false
            message.error('error')

        },
    },
})

export const {
    setAllComments,
    setOneComments,
    setManyComments,
    updateOneComment,
} = commentSlice.actions

export const commentsSelectors = commentsAdapter.getSelectors(state => state.comments)

export default commentSlice.reducer

