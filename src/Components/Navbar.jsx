import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex height="80px" align="center" justifyContent="space-between" 
     bgColor={'yellow.600'}
    boxShadow="base" >
      <Box ml="20px" >
        <Text fontStyle="normal" fontSize="xl">Mart</Text>
      </Box>
      <Flex>
        <Text mr="60px" fontSize="2xl" color={'white'}>
          <Link to="/">Products</Link>
        </Text>
        <Text mr="60px" fontSize="2xl" color={'white'}>
          <Link to="/wishlist">Wishlist</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
