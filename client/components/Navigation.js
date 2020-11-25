import React, { useContext } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useToast,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import CartItem from './CartItem';

import UserContext from './UserContext';

export default function Navigation(props) {
  const { authenticated, invalidateUser } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const history = useHistory();
  const toast = useToast();
  const [context, setContext] = useContext(UserContext);
  function clickLogo() {
    if (authenticated === true) {
      console.log('good');
      history.push('/');
    } else {
      console.log('bad');
      history.push('/login');
    }
  }

  function signOut() {
    invalidateUser();
    history.push('/login');
  }

  let dashboard = null;
  if (context && context.hasOwnProperty('farmId')) {
    dashboard = (
      <Link to="/dashboard">
        <Button bg="#bedbbb" margin="15px">
          Dashboard
        </Button>
      </Link>
    );
  }
  return (
    <div className="navbar">
      <div className="logo">
        {authenticated ? (
          <>
            <Button bg="#bedbbb" margin="15px" onClick={clickLogo}>
              {/* Shop */}
              <img
                src="https://i.ibb.co/JR8Q7q9/logo.png"
                className="egg-logo"
              />
            </Button>
            <>
              <Button ref={btnRef} bg="#bedbbb" onClick={onOpen}>
                Cart
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Cart</DrawerHeader>

                    <DrawerBody>
                      <CartItem />
                      <CartItem />
                      <CartItem />
                      <CartItem />
                      <CartItem />
                      <CartItem />
                    </DrawerBody>

                    <DrawerFooter>
                      <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button color="red">Checkout</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
            </>
          </>
        ) : null}
      </div>
      {dashboard}
      <Menu>
        <MenuButton as={Button} bg="#bedbbb" margin="15px">
          Profile
        </MenuButton>
        <MenuList>
          <Link to="/login">
            <MenuItem>Login</MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              signOut();
              toast({
                title: 'Logged out.',
                description: 'You have logged out of your account.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
              });
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
