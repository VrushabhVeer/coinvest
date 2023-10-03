import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import cube from "../assets/cube.png";
import user from "../assets/user.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let token = localStorage.getItem("token");

  return (
    <>
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        px={{ base: "5", md: "12", lg: "24" }}
        position="sticky"
        top="0"
        zIndex="999"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"lg"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            _hover={{ variant: "ghost" }}
          />

          <Link to="/">
            <Flex alignItems="center" gap="1">
              <Image
                w={{ base: "5", md: "7" }}
                mt={{ base: "0", md: "1" }}
                src={cube}
                alt="logo"
              />
              <Text
                fontSize={{ base: "20px", md: "26px" }}
                fontWeight="700"
                color="#0052ff"
              >
                coinvest.
              </Text>
            </Flex>
          </Link>

          <HStack
            as={"nav"}
            spacing={5}
            display={{ base: "none", md: "flex" }}
            mt="1"
            color="#333d4a"
            fontSize="15px"
          >
            <Link to="/">
              <Text fontWeight="500">Cryptocurrencies</Text>
            </Link>
            <Link to="/user_profile">
              <Text fontWeight="500">My Coins</Text>
            </Link>
            <Link>
              <Text fontWeight="500">Contacts</Text>
            </Link>
          </HStack>

          <Flex alignItems={"center"} gap={{ base: "0", md: "3" }}>
            <Link to="/login">
              <Button
                bg="none"
                borderRadius="30"
                color="#0052ff"
                _hover={{ border: "1px solid #0052ff" }}
                size={{ base: "sm", md: "md" }}
                fontWeight="600"
                display={{ base: "none", md: "flex" }}
                isDisabled={token}
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                borderRadius="30"
                bg="#0052ff"
                color="white"
                size={{ base: "sm", md: "md" }}
                fontWeight="500"
                _hover={{ bg: "#033bb4" }}
                isDisabled={token}
              >
                Signup
              </Button>
            </Link>

            <Link to="/user_profile">
              <Image
                w={{ base: "5", md: "6" }}
                src={user}
                alt="user=icon"
                loading="lazy"
                ml="3"
              />
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={8} pt={6} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={7}>
              <Link to="/">
                <Text olor="#333d4a" fontSize="15px" fontWeight="500">
                  Cryptocurrencies
                </Text>
              </Link>
              <Link to="/user_profile">
                <Text olor="#333d4a" fontSize="15px" fontWeight="500">
                  My Coins
                </Text>
              </Link>
              <Link>
                {" "}
                <Text olor="#333d4a" fontSize="15px" fontWeight="500">
                  Contacts
                </Text>
              </Link>
              <Link>
                {" "}
                <Text olor="#333d4a" fontSize="15px" fontWeight="500">
                  Products
                </Text>
              </Link>
              <Link to="/login">
                <Button
                  borderRadius="30"
                  bg="#0052ff"
                  color="white"
                  _hover={{ bg: "#033bb4" }}
                  w="100%"
                  isDisabled={token}
                >
                  Login
                </Button>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
