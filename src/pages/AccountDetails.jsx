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
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  let item = JSON.parse(localStorage.getItem("sell_coins"));
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const handleComplete = (_id) => {
    axios
      .delete(`https://coinvest-db-production.up.railway.app/coins/delete_coin/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate("/selling_confirmation");
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
      <Box w="100%">
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          color="#333d4a"
          fontWeight="700"
          textAlign="left"
        >
          Enter Account Details
        </Text>
        <Flex alignItems="center" gap="2">
          <Text>Total Amount</Text>
          <Text>₹{item.total_price} will be creadited to account.</Text>
        </Flex>

        <Box mt="8">
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
            placeholder="Account Number"
            borderRadius="10"
            fontSize="15px"
            maxLength={12}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Box>

        <Box mt="5">
          <Input
            border="1px solid #cecece"
            size="lg"
            type="text"
            placeholder="Bank Name"
            borderRadius="10"
            fontSize="15px"
            maxLength={12}
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </Box>

        <Box mt="5">
          <Input
            border="1px solid #cecece"
            size="lg"
            type="number"
            placeholder="IFSC Code"
            borderRadius="10"
            fontSize="15px"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </Box>
        {accountHolderName === "" ||
        bankName === "" ||
        ifscCode === "" ||
        accountNumber === "" ? (
          <Alert status="warning" fontSize="15px" borderRadius="5" p="2" mt="5">
            <AlertIcon />
            Please fill all fields.
          </Alert>
        ) : (
          ""
        )}

        <Button
          bg="#1c1c27"
          color="white"
          fontSize="15px"
          w="100%"
          mt="10"
          size="lg"
          fontWeight="500"
          _hover={{ bg: "black" }}
          onClick={() => handleComplete(item._id)}
          isDisabled={
            accountHolderName === "" ||
            bankName === "" ||
            ifscCode === "" ||
            accountNumber === ""
          }
        >
          Submit
        </Button>
      </Box>

      <Box w="100%">
        <Text
          fontSize={{ base: "28px", md: "32px" }}
          color="#333d4a"
          fontWeight="700"
          textAlign="left"
        >
          Your Coin
        </Text>
        <Text>Coins you are selling</Text>

        {/* Coin Information */}
        <Box
          p="5"
          mt={{ base: "6", md: "10" }}
          border="1px solid #cecece"
          borderRadius="10"
        >
          <Flex alignItems="center" gap="3">
            <Image w="10" src={item.image} alt="coin-image" />
            <Text
              fontSize={{ base: "25px", md: "30px" }}
              fontWeight="700"
              color="#333d4a"
            >
              {item.name}
              <span className="currency">/INR</span>
            </Text>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" mt="8">
            <Text fontWeight="500">Price of one</Text>
            <Text color="#6e71cc" fontWeight="500">
              ₹ {item.price}
            </Text>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" mt="5">
            <Text fontWeight="500">Your Quantity</Text>
            <Text color="#6e71cc" fontWeight="500">
              {item.quantity}
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
              ₹ {item.total_price}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default AccountDetails;
