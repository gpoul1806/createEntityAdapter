import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit'
import { message } from 'antd'

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async () => await fetch('https://jsonplaceholder.typicode.com/users?_limit=10').then(res => res.json())
)

export const deleteUser = createAsyncThunk(
    'users/delete',
    async id => {
        await fetch('https://jsonplaceholder.typicode.com/users/' + id, { method: 'DELETE' })
        return id
    }
)

export const updateUser = createAsyncThunk(
    'users/update',
    async (newObj) => {
        await fetch('https://jsonplaceholder.typicode.com/users/' + newObj.id, { method: 'PUT', body: newObj.newObj })
        return { id: newObj.id, changes: newObj.newObj }
    }
)

const usersAdapter = createEntityAdapter({
    selectId: user => user.id
})

const addressAdapter = createEntityAdapter({
    selectId: address => address.id
})

const companyAdapter = createEntityAdapter({
    selectId: company => company.id
})

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        loading: false,
    }),
    reducers: {},
    extraReducers: {
        [fetchUsers.pending](state) {
            state.loading = true
        },
        [fetchUsers.fulfilled](state, { payload }) {
            console.log({ payload })
            state.loading = false
            usersAdapter.setAll(state, payload)
            message.success('Users have been fetched successfully!')
        },
        [fetchUsers.rejected](state) {
            state.loading = false
        },
        [updateUser.pending](state) {
            state.loading = true
        },
        [updateUser.fulfilled](state, { payload }) {
            state.loading = false
            usersAdapter.updateOne(state, { id: payload.id, changes: payload.changes })
            message.success('User has been updated successfully!')
        },
        [updateUser.rejected](state) {
            state.loading = false
        },
        [deleteUser.pending](state) {
            state.loading = true
        },
        [deleteUser.fulfilled](state, { payload: id }) {
            state.loading = false
            usersAdapter.removeOne(state, id)
            message.success('User has been deleted successfully!')
        },
        [deleteUser.rejected](state) {
            state.loading = false
        },
    },
})

export const { getOneUser } = usersSlice.actions

export const usersSelector = usersAdapter.getSelectors(state => state.users)

export default usersSlice.reducer
