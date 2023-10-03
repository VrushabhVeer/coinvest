import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import cards from "../assets/cards.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("coinsData"));
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryYear, setExpiryYear] = useState("");

  const completePayment = () => {
    const payload = {
      image: storedData.image.large,
      name: storedData.name,
      market_cap: storedData.market_data.market_cap.inr,
      change_24hr: storedData.market_data.market_cap_change_percentage_24h,
      price: storedData.market_data.current_price.inr,
      quantity: storedData.selected_qty,
      total_price: storedData.total_price,
      userId: localStorage.getItem("userId"),
    };

    axios
      .post("https://teal-crab-kit.cyclic.cloud/coins/buy_coins", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        navigate("/purchase_confirmation");
      })
      .catch(function (error) {
        console.error(error);
        toast({
          title: "Something Went Wrong, please buy again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      w={{ base: "90%", md: "87%" }}
      m="auto"
      mt={{ base: "8", md: "12" }}
      gap={{ base: "10", md: "20" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      {/* Payment Details */}
      <Box w="100%">
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          color="#333d4a"
          fontWeight="700"
          textAlign="left"
        >
          Payment
        </Text>
        <Flex alignItems="center" gap="2">
          <Text>Total Amount</Text>
          <Text>₹{storedData.total_price}</Text>
        </Flex>

        {/* Payment Methods */}

        <Box mt="8">
          <Flex alignItems="center" justifyContent="space-between">
            <Text>Credit Card or Debit Card</Text>
            <Image w="120px" src={cards} alt="cards" loading="lazy" />
          </Flex>

          {/* Card Inputs */}
          <Box mt="2">
            <Input
              border="1px solid #cecece"
              size="lg"
              type="text"
              placeholder="Account Holder Name"
              borderRadius="10"
              fontSize="15px"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
            />
          </Box>

          <Box mt="5">
            <Input
              border="1px solid #cecece"
              size="lg"
              type="number"
              placeholder="Card Number"
              borderRadius="10"
              fontSize="15px"
              maxLength={12}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </Box>

          <Flex
            mt="5"
            flexDirection={{ base: "column", md: "row" }}
            gap="5"
            alignItems="center"
          >
            <Input
              border="1px solid #cecece"
              size="lg"
              type="password"
              placeholder="CVV"
              borderRadius="10"
              fontSize="15px"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />

            <Input
              border="1px solid #cecece"
              size="lg"
              type="number"
              placeholder="Expiry Year"
              borderRadius="10"
              fontSize="15px"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
            />
          </Flex>
          {accountHolderName === "" ||
          cardNumber === "" ||
          cvv === "" ||
          expiryYear === "" ? (
            <Alert
              status="warning"
              fontSize="15px"
              borderRadius="5"
              p="2"
              mt="5"
            >
              <AlertIcon />
              Please fill all fields.
            </Alert>
          ) : (
            ""
          )}

          {/* Confirm Payment Button */}
          <Box>
            <Button
              bg="#1c1c27"
              color="white"
              fontSize="15px"
              w="100%"
              mt="10"
              size="lg"
              fontWeight="500"
              _hover={{ bg: "black" }}
              onClick={completePayment}
              isDisabled={
                accountHolderName === "" ||
                cardNumber === "" ||
                cvv === "" ||
                expiryYear === ""
              }
            >
              Confirm Payment
            </Button>

            <Text fontSize="14px" mt="4">
              By clicking 'Confirm Payment' I agree to our{" "}
              <span className="signup">Terms & Services</span>.
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Coin Details */}
      <Box w="100%">
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          color="#333d4a"
          fontWeight="700"
          textAlign="left"
        >
          Your Coins
        </Text>
        <Text>Coins you are buying</Text>

        {/* Coin Information */}
        <Box
          p="5"
          mt={{ base: "6", md: "10" }}
          border="1px solid #cecece"
          borderRadius="10"
        >
          <Flex alignItems="center" gap="3">
            <Image w="10" src={storedData.image.large} alt="coin-image" />
            <Text
              fontSize={{ base: "25px", md: "30px" }}
              fontWeight="700"
              color="#333d4a"
            >
              {storedData.name}
              <span className="currency">/INR</span>
            </Text>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" mt="8">
            <Text fontWeight="500">Price of one</Text>
            <Text color="#6e71cc" fontWeight="500">
              ₹ {storedData.market_data.current_price.inr}
            </Text>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" mt="5">
            <Text fontWeight="500">Your Quantity</Text>
            <Text color="#6e71cc" fontWeight="500">
              {storedData.selected_qty}
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            mt="5"
            borderTop="1px solid #cecece"
          >
            <Text mt="4" fontWeight="500">
              Total Price
            </Text>
            <Text mt="4" color="#6e71cc" fontWeight="500">
              ₹ {storedData.total_price}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Payment;
