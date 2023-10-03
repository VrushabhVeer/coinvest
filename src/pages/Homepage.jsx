import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 30;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr")
      .then((response) => {
        setCoinsData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Function to slice data for the current page
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;
    return coinsData.slice(startIndex, endIndex);
  };

  // Next page handler
  const nextPage = () => {
    const totalPages = Math.ceil(coinsData.length / coinsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Previous page handler
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const currentPageData = getCurrentPageData();

  return (
    <Box w={{ base: "95%", md: "89%" }} m="auto" mt={{ base: "5", md: "8" }}>
      <Text
        fontSize={{ base: "28px", md: "32px" }}
        color="#333d4a"
        fontWeight="700"
        ml="6"
      >
        Crypto Prices
      </Text>
      <TableContainer mt="10">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>Coin Name</Th>
              <Th>Price INR</Th>
              <Th>Market Cap</Th>
              <Th>Change</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPageData.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Image w="8" src={item.image} alt="coin-image" />
                </Td>
                <Td>
                  <Text>{item.name}</Text>
                </Td>
                <Td>₹ {item.price_change_24h.toFixed(3)}</Td>
                <Td>{item.market_cap}</Td>
                <Td>
                  <Text
                    color={
                      item.price_change_percentage_24h >= 0
                        ? "#29a745"
                        : "#ed1b41"
                    }
                  >
                    {item.price_change_percentage_24h}%
                  </Text>
                </Td>

                <Td>
                  <Link to={`coin/${item.id}`}>
                    <Button
                      borderRadius="30"
                      bg="#0052ff"
                      color="white"
                      fontSize="15px"
                      size="sm"
                      fontWeight="500"
                      _hover={{ bg: "#033bb4" }}
                      px="10"
                    >
                      Buy
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* pagination */}
      <Flex justifyContent="center" mt={{ base: "8", md: "10" }}>
        <Button
          fontSize="15px"
          size="sm"
          fontWeight="500"
          px="5"
          onClick={prevPage}
          isDisabled={currentPage === 1}
          mr="2"
        >
          Prev
        </Button>
        <Button
          fontSize="15px"
          size="sm"
          fontWeight="500"
          px="5"
          onClick={nextPage}
          isDisabled={
            currentPage === Math.ceil(coinsData.length / coinsPerPage)
          }
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Homepage;
