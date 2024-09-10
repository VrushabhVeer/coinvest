import {
  Flex,
  Box,
  Input,
  Button,
  Text,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import anime from "../assets/animation_lmipit0l.json";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    axios
      .post("https://coinvest-db-production.up.railway.app/user/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        console.log(response);
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        const { from } = location.state || { from: { pathname: "/" } };
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Login Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex w="100%" m="auto" mt="10" alignItems="center" gap="0">
      <Box w="100%">
        <Box w={{ base: "90%", md: "70%" }} m="auto">
          <Text
            textAlign={{ base: "center", md: "left" }}
            color="#333d4a"
            fontWeight="bold"
            fontSize={{ base: "30px", md: "40px" }}
          >
            Login
          </Text>
          <Text
            textAlign={{ base: "center", md: "left" }}
            color="#333d4a"
            fontSize="17px"
          >
            Welcome back to Coinvest
          </Text>

          <Box mt="6">
            <Box mt="5">
              <Input
                border="1px solid #cecece"
                _hover={{ border: "1px solid #cecece" }}
                placeholder="email address"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mt="5">
              <InputGroup>
                <Input
                  border="1px solid #cecece"
                  _hover={{ border: "1px solid #cecece" }}
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    _hover={{ variant: "ghost" }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Button
              mt="8"
              w="100%"
              bg="#0052ff"
              color="white"
              fontSize="16px"
              fontWeight="500"
              _hover={{ bg: "#033bb4" }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Text mt="8" textAlign={{ base: "center", md: "left" }}>
              Don’t have an account? please{" "}
              <Link to="/signup">
                <span className="link">Signup</span>
              </Link>{" "}
              first.
            </Text>
          </Box>
        </Box>
      </Box>

      <Box w="100%" display={{ base: "none", md: "flex" }}>
        <Box w="80%" m="auto">
          <Player autoplay loop src={anime}></Player>
        </Box>
      </Box>
    </Flex>
  );
}
