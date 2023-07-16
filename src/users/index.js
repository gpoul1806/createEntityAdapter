import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUsers, updateUser, usersSelector } from './usersSlicer'
import { Button } from 'antd';

const Users = () => {

    const dispatch = useDispatch();

    const { users } = useSelector(state => state);

    console.log({ ldg: users.loading, users })

    const total = useSelector(usersSelector.selectAll)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const onUpdate = (data) => dispatch(updateUser({ id: data.id, newObj: data }))
    const onDelete = (id) => dispatch(deleteUser(id))

    return <div style={{ padding: 12 }}>
        {
            total.map(user =>
                <div>
                    <span>{user.name}</span>
                    <br />
                    <span>{user.email}</span>
                    <br />
                    <Button onClick={() => onUpdate({ ...user, email: 'XA' })}>Update</Button>
                    <Button onClick={() => onDelete(user.id)}>Delete</Button>
                    <br />
                    <br />
                    <br />
                </div>
            )
        }
    </div>
}

export default Users