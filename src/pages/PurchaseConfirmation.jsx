import { Box, Flex, Text } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { Link } from "react-router-dom";

const PurchaseConfirmation = () => {
  return (
    <>
      <Flex w={{ base: "60%", md: "30%", lg: "20%" }} m="auto" mt="10">
        <Box w="100%">
          <Player
            autoplay
            loop
            src="https://lottie.host/f7944d73-d9d4-4aba-93a4-4a98392a0156/TQcRkRopWh.json"
          ></Player>

          <Text
            textAlign="center"
            fontSize={{ base: "28px", md: "32px" }}
            color="#333d4a"
            fontWeight="700"
          >
            Payment Successfull
          </Text>

          <Link to="/user_profile">
            <Text textAlign="center" fontSize="18px" color="#0052ff" mt="3">
              Checkout your Coins
            </Text>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default PurchaseConfirmation;
