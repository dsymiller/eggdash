import React, { useState, useEffect } from 'react';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Textarea,
  Select,
} from '@chakra-ui/react';

const CreateProduct = (props) => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [productType, setProductType] = useState(null);
  const [productTypes, setProductTypes] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  useEffect(() => {
    fetch('/products/types')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        setProductTypes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createNewProductHandler = (e) => {
    onClose();

    const body = {
      FarmId: '1',
      name,
      description,
      price,
      ProductTypeId: productType,
    };

    // create new product
    fetch('/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      // .then((response) => response.json())
      .then(() => {
        console.log('running...');
        // console.log();
        props.fetchAllProducts();
      })
      .catch((err) => console.log(err));
    // clear fields

    // reload page to get new state?
  };

  const setProductTypeHandler = (type) => {
    setProductType(type);
  };

  return (
    <React.Fragment>
      <Button onClick={onOpen} className="mt">
        Add Product
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={props.initialRef}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ice cream?"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              {/* <Input
                placeholder="Description"
                onChange={(e) => setName(e.target.value)}
              /> */}
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This cheese is the best."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="4.99"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select a category"
                onChange={(e) => setProductTypeHandler(e.target.value)}
              >
                {productTypes &&
                  productTypes.map((type) => {
                    return (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={createNewProductHandler}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default CreateProduct;
