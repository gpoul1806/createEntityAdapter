import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Comments from './comments';
import Users from './users';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const Router = () => {
    const [current, setCurrent] = useState('mail');

    const navigate = useNavigate();

    const items = [
        {
            label: 'Comments',
            key: '/',
            icon: <CommentOutlined />,
        },
        {
            label: 'Users',
            key: 'users',
            icon: <UserOutlined />,
        },
    ];

    const onClick = (e) => {
        setCurrent(e.key);
        navigate(e.key)
    };

    return <>
        <Menu mode="horizontal" onClick={onClick} selectedKeys={[current]} items={items} />
        <Routes>
            <Route path='/' element={<Comments />} />
            <Route path='/users' element={<Users />} />
        </Routes>
    </>
}

export default Router