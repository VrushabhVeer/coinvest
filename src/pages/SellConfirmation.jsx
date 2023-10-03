import { Box, Flex, Text } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

const SellConfirmation = () => {
  let item = JSON.parse(localStorage.getItem("sell_coins"));
  return (
    <>
      <Flex w={{ base: "60%", md: "30%", lg: "20%" }} m="auto" mt="10">
        <Box w="100%">
          <Player
            autoplay
            loop
            src="https://lottie.host/f7944d73-d9d4-4aba-93a4-4a98392a0156/TQcRkRopWh.json"
          ></Player>
        </Box>
      </Flex>
      <Text
        textAlign="center"
        fontSize={{ base: "20px", md: "25px" }}
        color="#0bd600"
        fontWeight="500"
      >
        ₹{item.total_price}
      </Text>
      <Text textAlign="center" color="#333d4a">
        will be creadited to account within 3hr.
      </Text>

      <Box mt="10">
        <Text textAlign="center" color="#333d4a">
          Facing any problem to getting amount.
        </Text>
        <Text textAlign="center" color="#333d4a">
          contact our <span className="link">Help Center</span>.
        </Text>
      </Box>
    </>
  );
};

export default SellConfirmation;
