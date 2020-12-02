import React, {useCallback } from 'react'
import * as actions from '../../store/actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {
    let history = useHistory()
    const props = useSelector(state => (
        {
            ...state, 
            isAuthenticated: state.token !== null,
            loading: state.loading,
            error: state.error
        }))

    const dispatch = useDispatch()
    const onAuth = useCallback(
        (username, email, passwordOne, passwordTwo) => dispatch(actions.authSignUp(username, email, passwordOne, passwordTwo))
    )
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onAuth(values.username, values.email, values.password, values.confirm)
        history.push('/')
    };


    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '1',
            }}
            scrollToFirstError
        >
            <Form.Item
                label="First Name"
                name="first_name"
                autoComplete="first_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="last_name"
                autoComplete="last_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                autoComplete="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                autoComplete="new-password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                autoComplete="new-password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Signup
                </Button>
                or
                <Nav.Link style={{ marginLeft: '10px' }} href='/login'>
                    Login
                </Nav.Link>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm