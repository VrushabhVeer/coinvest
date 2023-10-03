import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";

const SeparateCoin = () => {
  const [coinsData, setCoinsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${params.coin_id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      )
      .then((response) => {
        setCoinsData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, [params]);

  const getData = (i) => {
    let total_price = coinsData.market_data.current_price.inr * quantity;
    let qty = quantity;
    i.selected_qty = qty;
    i.total_price = total_price;
    localStorage.setItem("coinsData", JSON.stringify(i));
    navigate("/payment");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Flex
      w={{ base: "90%", md: "87%" }}
      m="auto"
      mt={{ base: "8", md: "12" }}
      gap="10"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box w="100%">
        <Flex alignItems="center" gap="3">
          <Image w="10" src={coinsData.image.large} alt="coin-image" />
          <Text
            fontSize={{ base: "25px", md: "30px" }}
            fontWeight="700"
            color="#333d4a"
          >
            {coinsData.name}
            <span className="currency">/INR</span>
          </Text>
        </Flex>

        <Flex alignItems="center" gap="4" mt="5" flexFlow="wrap">
          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Current Rank
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              {coinsData.market_data.market_cap_rank}
            </Text>
          </Box>

          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Price INR
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              ₹ {coinsData.market_data.current_price.inr}
            </Text>
          </Box>
          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Market Cap
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              {coinsData.market_data.market_cap.inr}
            </Text>
          </Box>

          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Market Cap 24hr
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              {coinsData.market_data.market_cap_change_24h}
            </Text>
          </Box>

          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Total Supply
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              {coinsData.market_data.total_volume.inr}
            </Text>
          </Box>

          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Valuation INR
            </Text>
            <Text color="#6e71cc" mt="2" fontSize="15px">
              {coinsData.market_data.fully_diluted_valuation.inr}
            </Text>
          </Box>

          <Box
            p="3"
            border="1px solid #cecece"
            borderRadius="10"
            textAlign="center"
          >
            <Text fontWeight="500" color="#333d4a" fontSize="14px">
              Change 24hr
            </Text>
            <Text
              mt="2"
              color={
                coinsData.market_data.market_cap_change_percentage_24h >= 0
                  ? "#29a745"
                  : "#ed1b41"
              }
            >
              {coinsData.market_data.market_cap_change_percentage_24h}%
            </Text>
          </Box>
        </Flex>

        <Box mt="8" display={{ base: "none", md: "inherit" }}>
          <Text
            fontSize={{ base: "20px", md: "25px" }}
            fontWeight="700"
            color="#333d4a"
          >
            About {coinsData.name}
          </Text>
          <Text
            w={{ base: "100%", md: "95%" }}
            mt="2"
            fontSize="15px"
            color="#7b8287"
            dangerouslySetInnerHTML={{ __html: coinsData.description.en }}
          ></Text>
        </Box>
      </Box>

      <Box w={{ base: "100%", md: "28%" }} mt={{ base: "0", md: "5" }}>
        <Box
          w="100%"
          textAlign="center"
          bg="#1c1c27"
          color="white"
          p="5"
          borderRadius="10"
        >
          Buy <span className="coinName">{coinsData.name}</span>
        </Box>

        <Text mt="6" fontSize="17px" fontWeight="500">
          Price for One
        </Text>
        <Box
          py="3"
          px="2"
          mt="1"
          border="1px solid #cecece"
          borderRadius="10"
          fontSize="15px"
        >
          ₹ {coinsData.market_data.current_price.inr}
        </Box>

        <Text mt="6" fontSize="17px" fontWeight="500">
          Enter Quantity
        </Text>
        <Input
          py="6"
          px="2"
          mt="1"
          placeholder="Add Quantity"
          border="1px solid #cecece"
          borderRadius="10"
          fontSize="15px"
          maxLength="2"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Text color="red" mt="1" fontSize="14px">
          {quantity <= 0 ? "Please enter valid quantity" : ""}
        </Text>

        <Text mt="8" fontSize="17px" fontWeight="500">
          Total Price
        </Text>
        <Box
          py="3"
          px="2"
          mt="1"
          border="1px solid #cecece"
          borderRadius="10"
          fontSize="15px"
        >
          ₹ {coinsData.market_data.current_price.inr * quantity}
        </Box>

        <Button
          bg="#0052ff"
          color="white"
          fontSize="15px"
          w="100%"
          mt="10"
          size="lg"
          fontWeight="500"
          _hover={{ bg: "#033bb4" }}
          onClick={() => getData(coinsData)}
          isDisabled={quantity <= 0}
        >
          To Payment
        </Button>
      </Box>

      <Box mt="8" display={{ base: "inherit", md: "none" }}>
        <Box>
          <Text
            fontSize={{ base: "20px", md: "25px" }}
            fontWeight="700"
            color="#333d4a"
          >
            About {coinsData.name}
          </Text>
          <Text
            w={{ base: "100%", md: "95%" }}
            mt="2"
            fontSize="15px"
            color="#7b8287"
            dangerouslySetInnerHTML={{ __html: coinsData.description.en }}
          ></Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default SeparateCoin;
