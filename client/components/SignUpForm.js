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
  ButtonGroup,
  Container,
  Header,
  useToast,
  Select,
  CloseButton,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import FarmerForm from './FarmerForm.js';
import UserContext from './UserContext';

const SignUp = (props) => {
  const { validateUser } = props;
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  // Farmer Sign Up Data
  const [farmName, setFarmName] = useState('');
  const [farmStreet, setFarmStreet] = useState('');
  const [farmZipcode, setFarmZipcode] = useState('');
  const [farmEmail, setFarmEmail] = useState('');
  const [farmDescription, setFarmDescription] = useState('');
  const [farmImage, setFarmImage] = useState('');
  const [context, setContext] = useContext(UserContext);
  const handleSubmit = async () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        streetAddress,
        zipCode,
        email,
        password,
        accountType,
        farmName,
        farmStreet,
        farmZipcode,
        farmEmail,
        farmDescription,
        farmImage,
      }),
    };
    console.log(request);
    // const response = await fetch('/user/signup', request);
    // console.log(response);
    // const data = await response.json();
    // console.log(data);
    const response = await fetch('/user/signup', request);
    const data = await response.json();
    if (response.status === 200) {
      setContext(JSON.parse(data));
      history.push('/');
      validateUser();
    } else {
      history.push('/login');
    }
  };

  const toast = useToast();
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
      <InputGroup mt="10px">
        <InputLeftAddon children="First Name:" />
        <Input
          variant="filled"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </InputGroup>
      <InputGroup mt="10px">
        <InputLeftAddon children="Last Name:" />
        <Input variant="filled" onChange={(e) => setLastName(e.target.value)} />
      </InputGroup>
      <InputGroup mt="10px">
        <InputLeftAddon children="Street Address:" />
        <Input
          variant="filled"
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </InputGroup>
      <InputGroup mt="10px">
        <InputLeftAddon children="Zipcode:" />
        <Input variant="filled" onChange={(e) => setZipCode(e.target.value)} />
      </InputGroup>
      <InputGroup mt="10px">
        <InputLeftAddon children="Email:" />
        <Input variant="filled" onChange={(e) => setEmail(e.target.value)} />
      </InputGroup>
      <InputGroup mt="10px">
        <InputLeftAddon children="Password:" pr="20px" />
        <Input variant="filled" onChange={(e) => setPassword(e.target.value)} />
      </InputGroup>
      <Select
        mt="10px"
        variant="filled"
        placeholder="User Type"
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="merchant">Merchant</option>
        <option value="customer">Customer</option>
      </Select>

      {/* Conditional Toggle Routing */}
      {accountType === 'merchant' ? (
        <Flex
          direction="column"
          align="center"
          bg="#e8e8e8"
          color="black"
          width="450px"
          borderRadius="8px"
        >
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Name:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmName(e.target.value)}
            />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Street Address:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmStreet(e.target.value)}
            />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Zipcode:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmZipcode(e.target.value)}
            />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Email:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Description:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmDescription(e.target.value)}
            />
          </InputGroup>
          <InputGroup mt="10px" width="sm">
            <InputLeftAddon children="Farm Image:" />
            <Input
              variant="filled"
              onChange={(e) => setFarmImage(e.target.value)}
            />
          </InputGroup>
        </Flex>
      ) : null}

      <Button
        mt="30px"
        mb="30px"
        width="sm"
        onClick={() => {
          handleSubmit();
          toast({
            title: 'Signed up.',
            description: "We've created a new account for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }}
      >
        Sign Up
      </Button>
    </Flex>
  );
};

export default SignUp;

/*
  const defaultState = {
    firstname: '',
    lastname: '',
    streetaddress: '',
    zipcode: '',
    username: '',
    password: '',
    userType: '',
  };

  const [state, setState] = useState(defaultState);

  function firstnameChange(field) {
    setState({
      ...state,
      firstname: field.target.value,
    });
  }

  function lastnameChange(field) {
    setState({
      ...state,
      lastname: field.target.value,
    });
  }

  function streetaddressChange(field) {
    setState({
      ...state,
      streetaddress: field.target.value,
    });
  }

  function zipcodeChange(field) {
    setState({
      ...state,
      zipcode: field.target.value,
    });
  }

  function usernameChange(field) {
    setState({
      ...state,
      username: field.target.value,
    });
  }

  function passwordChange(field) {
    setState({
      ...state,
      password: field.target.value,
    });
  }

  function userTypeChange(field) {
    setState({
      ...state,
      userType: field.target.value,
    });
  }

  function clicked() {
    signedUp(
      state.firstname,
      state.lastname,
      state.streetaddress,
      state.zipcode,
      state.username,
      state.password,
      state.userType
    );
  }
  */
