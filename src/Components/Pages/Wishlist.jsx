import { Box, Text, Image, Grid, Center, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function Wishlist() {
  const toast = useToast();
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleDelete = (i) => {
    setWishlist(wishlist.filter((el, index) => index !== i));
    toast({
      title: 'Deleted succefully',
      status: 'success',
      duration: 1500,
      isClosable: true,
    })
  };

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap="25px"
        width="80vw"
        margin="20px auto"
      >
        {wishlist?.map((product, i) => (
          <Box
            key={product.id}
            p={2}
            mb={4}
            boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}
            borderRadius="10px"
          >
            <Image src={product.image} width="100%" />
            <Text textAlign="left">{product.title}</Text>
            <Text textAlign="left">{product.brand}</Text>
            <Text textAlign="left">Category: {product.category}</Text>
            <Text textAlign="left">Price: {product.price}</Text>
            <Center mt="5px"><AiFillDelete onClick={()=>handleDelete(i)}/></Center>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default Wishlist;
