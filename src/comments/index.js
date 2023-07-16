import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentsSelectors, fetchComments, deleteComment, updateComment } from './commentsSlice';

const Comments = () => {
    const dispatch = useDispatch();

    const { users } = useSelector(state => state);
    const total = useSelector(commentsSelectors.selectTotal)
    const selectAll = useSelector(commentsSelectors.selectAll)
    const selectone = useSelector(state => commentsSelectors.selectById(state, 5))



    console.log({ users: users.entities })
    useEffect(() => {
        dispatch(fetchComments())
    }, [])

    const onDelete = id => {
        dispatch(deleteComment(id))
    };

    const onUpdate = useCallback((id, newObj) => {
        dispatch(updateComment({ id, newObj }))
    }, []);

    return (
        <div>
            {
                selectAll.map(comm =>
                    <div key={comm.id}>
                        <span>{comm.id}</span>
                        <br />
                        <span>{comm.name}</span>
                        <br />
                        <span>{comm.body}</span>
                        <br />
                        <button onClick={() => onDelete(comm.id)} >Delete</button>
                        <button onClick={() => onUpdate(comm.id, { ...comm, name: 'NEW TEXT' })} >Update</button>
                        <br />
                        <br />
                        <br />
                    </div>
                )
            }
        </div>

    )
}

export default Comments;
