import {
  Flex,
  Box,
  Input,
  Button,
  Text,
  InputRightElement,
  InputGroup,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import anime from "../assets/animation_lmimzb3l.json";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://coinvest-db-production.up.railway.app/user/signup";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const isDateOfBirthValid = () => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    if (
      today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
    ) {
      return age - 1 >= 18; // Check if age is 18 or older
    } else {
      return age >= 18; // Check if age is 18 or older
    }
  };

  const handleSignup = async () => {
    const payload = {
      name,
      email,
      dob,
      gender,
      password,
    };

    if (!isDateOfBirthValid()) {
      toast({
        title: "Invalid Date of Birth",
        description: "You must be at least 18 years old to sign up.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(API_URL, payload);

      if (response.data.message === "Email already exists") {
        toast({
          title: response.data.message,
          description: "Please try a different email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Signup Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      console.error(error);
      toast({
        title: "Signup Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="100%" m="auto" mt="10" alignItems="center" gap="0">
      <Box w="100%">
        <Box
          w={{ base: "90%", md: "70%" }}
          m="auto"
          mt={{ base: "0", md: "8" }}
        >
          <Text
            textAlign={{ base: "center", md: "left" }}
            color="#333d4a"
            fontWeight="bold"
            fontSize={{ base: "30px", md: "40px" }}
          >
            Signup
          </Text>
          <Text
            textAlign={{ base: "center", md: "left" }}
            color="#333d4a"
            fontSize="17px"
          >
            Welcome to Coinvest
          </Text>

          <Box mt="6">
            <Box>
              <Input
                border="1px solid #cecece"
                _hover={{ border: "1px solid #cecece" }}
                placeholder="full name"
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mt="5">
              <Input
                border="1px solid #cecece"
                _hover={{ border: "1px solid #cecece" }}
                placeholder="email address"
                type="email"
                isRequired
                onChange={(e) => setEmail(e.target.value)}
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
                type="date"
                placeholder="DOB"
                borderRadius="10"
                fontSize="15px"
                maxLength="3"
                onChange={(e) => setDob(e.target.value)}
              />

              <Select
                border="1px solid #cecece"
                type="number"
                borderRadius="10"
                fontSize="15px"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </Flex>
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
              onClick={handleSignup}
            >
              Signup
            </Button>

            <Text mt="8" textAlign={{ base: "center", md: "left" }}>
              Already have an account? please{" "}
              <Link to="/login">
                <span className="link">Login.</span>
              </Link>{" "}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box w="100%" display={{ base: "none", md: "flex" }}>
        <Player autoplay loop src={anime}></Player>
      </Box>
    </Flex>
  );
}
