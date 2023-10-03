import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const toast = useToast();
  let navigate = useNavigate();
  let id = localStorage.getItem("id");

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

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setGender(localStorage.getItem("gender"));
    setDob(localStorage.getItem("dob"));
  }, []);

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      dob,
      gender,
    };

    const url = `https://teal-crab-kit.cyclic.cloud/user/update/${id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .put(url, payload, { headers })
      .then((response) => {
        console.log(response.data);

        toast({
          title: "Updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/user_profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      w={{ base: "90%", md: "60%", lg: "35%" }}
      m="auto"
      mt={{ base: "8", md: "12" }}
    >
      <Box mt="5">
        <Input
          type="text"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box mt="5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box mt="5">
        <InputGroup>
          <InputLeftAddon color="grey" children="Date of Birth" />
          <Input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </InputGroup>
      </Box>
      {!isDateOfBirthValid() ? (
        <Alert status="error" fontSize="14px">
          <AlertIcon />
          <AlertTitle>Invalid Date of Birth</AlertTitle>
          <AlertDescription>
            You must be at least 18 years old to sign up.
          </AlertDescription>
        </Alert>
      ) : (
        ""
      )}

      <Select
        mt="5"
        color="grey"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>

      <Button
        bg="#0052ff"
        color="white"
        fontSize="15px"
        w="100%"
        mt="10"
        size="lg"
        fontWeight="500"
        _hover={{ bg: "#033bb4" }}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditProfile;
