import React, { useState, useContext } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  ButtonGroup,
  Container,
  Header,
  useToast,
  CloseButton,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';

import UserContext from './UserContext';

const LoginForm = (props) => {
  const history = useHistory();
  const { validateUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [context, setContext] = useContext(UserContext);

  const handlePass = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch('/user/login', request);
    const data = await response.json();
    console.log(response);
    if (response.status === 200) {
      console.log('data', data);
      setContext(JSON.parse(data));
      history.push('/');
      validateUser();
    } else {
      history.push('/login');
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      bg="#e8e8e8"
      color="black"
      width="450px"
      borderRadius="8px"
      padding="30px"
    >
      <InputGroup mt="10px" width="sm">
        <InputLeftAddon children="Email:" />
        <Input variant="filled" onChange={(e) => setEmail(e.target.value)} />
      </InputGroup>
      <InputGroup mt="10px" width="sm">
        <InputLeftAddon children="Password:" pr="20px" />
        <Input
          type={showPassword ? 'text' : 'password'}
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlePass}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button mt="30px" mb="30px" width="sm" onClick={handleSubmit}>
        Sign In
      </Button>
    </Flex>
  );
};

export default LoginForm;
