import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Grid,
  Select,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";

const getData = (url) => {
  return axios(url).then((res) => res);
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [color, setColor] = useState(true);
  const toast = useToast();
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    setLoading(true);
    getData(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?filter=${filter}&limit=12&page=${page}`
    )
      .then((res) => {
        setProducts(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page, filter]);



  const handleSort = (e) => {
    setSort(e.target.value);
    getData(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=price&order=${sort}`
    )
      .then((res) => setProducts(res?.data?.data))
      .catch((err) => console.log(err));
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleWishlist = ({product,i}) => {
    setColor(!color)
    setWishlist([...wishlist, product]);
    toast({
      title: "Added to wishlist.",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

    useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Box>
      <Text fontSize="xl" color="Red.300">
         Products
      </Text>
      <Box>
        <Flex textAlign={'end'}>
          <Select name="" width="200px" ml="20px" onChange={handleSort}>
            <option value="">Sort By Price</option>
            <option value="asc">High To low</option>
            <option value="desc">low To High</option>
          </Select>
          <Select name="" width="200px" ml="20px" onChange={handleFilter}>
            <option value="">Filter By Category</option>
            <option value="men">Mens</option>
            <option value="kids">kids</option>
            <option value="women">Womens</option>
            <option value="homedecor">Homedecor</option>
          </Select>
        </Flex>
      </Box>
      <Box>
        {loading && <Text>Loading... please wait</Text>}
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap="30px"
          width="80vw"
          margin="20px auto"
        
        >
          {products?.map((product, i) => (
            <Box
              key={product.id}
              p={2}
              mb={4}
              borderRadius="10px"
              boxShadow={'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}
            >
              <Image src={product.image} width="100%" />
              <Text textAlign="left">{product.title}</Text>
              <Text textAlign="left">{product.brand}</Text>
              <Text textAlign="left">Category: {product.category}</Text>
              <Text textAlign="left">Price: {product.price}</Text>
           {color?  ( <AiOutlineHeart
                color="red"
                onClick={() => handleWishlist({product,i})}
              
              />):
                ( <AiFillHeart
                color="blue"
                onClick={() => handleWishlist({product,i})}
              />)}
            </Box>
          ))}
        </Grid>
      </Box>
      <button
        style={{
          boxShadow:'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
          padding: "10px",
          backgroundColor: "lightgray",
          marginLeft: "5px",
        }}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <Button ml="5px">{page}</Button>
      <button
        style={{
          boxShadow:'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
          padding: "10px",
          backgroundColor: "lightgray",
          marginLeft: "5px",
        }}
        disabled={page === 4}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </Box>
  );
}

export default Products;
