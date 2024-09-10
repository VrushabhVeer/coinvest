import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import man from "../assets/man.png";
import woman from "../assets/woman.png";
import defaultImg from "../assets/default.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const { onOpen } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    let userId = localStorage.getItem("userId");

    axios
      .get(`https://coinvest-db-production.up.railway.app/coins/my_coins/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sellCoin = (i) => {
    console.log(i);
    localStorage.setItem("sell_coins", JSON.stringify(i));
    navigate("/account_details");
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");

    axios
      .get(`https://teal-crab-kit.cyclic.cloud/user/user_details/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editProfile = (i) => {
    let { name, email, gender, dob, _id } = i;
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("gender", gender);
    localStorage.setItem("dob", dob);
    localStorage.setItem("id", _id);
    navigate("/edit_profile");
  };

  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  const age = calculateAge(userDetails.dob);

  let gender = userDetails.gender;
  const src =
    gender === "male" ? man : gender === "female" ? woman : defaultImg;

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        mt="10"
        gap={{ base: "5", md: "10" }}
      >
        <Box>
          <Image
            borderRadius="50%"
            w={{ base: "28", md: "40" }}
            src={src}
            alt="avatar"
          />
        </Box>
        <Box>
          <Flex alignItems="center" gap="5">
            <Text
              color="#333d4a"
              fontSize={{ base: "25px", md: "30px" }}
              fontWeight="700"
            >
              {userDetails.name}
            </Text>

            <Menu>
              <MenuButton onClick={onOpen}>
                <Text
                  mt="2"
                  color="#333d4a"
                  cursor="pointer"
                  fontSize="14px"
                  border="1px solid #cecece"
                  px="3"
                  py="1"
                  borderRadius="30"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => editProfile(userDetails)}>
                  Edit Profile
                </MenuItem>
                <MenuItem color="red">Delete Account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Text color="#6e71cc" ml="1" fontSize="15px" fontStyle="italic">
            <i className="fa-solid fa-location-dot"></i> {userDetails.country}
          </Text>

          <Text ml="1" fontSize="15px">
            <strong>Gender </strong> {userDetails.gender}
          </Text>

          <Text ml="1" fontSize="15px">
            <strong>Age </strong> {age} years
          </Text>
        </Box>
      </Flex>

      <Box
        w={{ base: "90%", md: "85%" }}
        m="auto"
        mt={{ base: "10", md: "16" }}
      >
        <Text fontSize="17px" fontWeight="700" color="#0052ff">
          My Coins
        </Text>

        <Text textAlign="center" fontSize="20px" fontWeight="700">
          {data.length === 0 ? "Your Wallet is empty!" : ""}
        </Text>

        <SimpleGrid
          borderTopWidth={1}
          pt="10"
          borderStyle={"solid"}
          borderColor="gray.200"
          columns={[1, 1, 1, 2, 2]}
          spacing={{ base: "30px", md: "40px" }}
        >
          {data.map((item, index) => (
            <Box
              key={item.id || index}
              p="5"
              border="1px solid #cecece"
              borderRadius="10"
              textAlign="center"
            >
              <Flex justifyContent="space-between" alignItems="center">
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

                <Button
                  bg="#1c1c27"
                  color="darkorange"
                  fontSize="15px"
                  size="sm"
                  fontWeight="500"
                  _hover={{ bg: "black" }}
                  onClick={() => sellCoin(item)}
                >
                  Sell
                </Button>
              </Flex>

              <Flex
                alignItems="center"
                justifyContent="space-between"
                mt="5"
                gap="5"
                flexFlow="wrap"
              >
                <Box>
                  <Text fontWeight="500" color="#333d4a" fontSize="14px">
                    Price INR
                  </Text>
                  <Text color="#6e71cc" mt="2" fontSize="15px">
                    ₹ {item.price}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="500" color="#333d4a" fontSize="14px">
                    Market Cap
                  </Text>
                  <Text color="#6e71cc" mt="2" fontSize="15px">
                    {item.market_cap}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="500" color="#333d4a" fontSize="14px">
                    Change 24hr
                  </Text>
                  <Text
                    mt="2"
                    color={item.change_24hr >= 0 ? "#29a745" : "#ed1b41"}
                  >
                    {item.change_24hr}%
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="500" color="#333d4a" fontSize="14px">
                    Quantity
                  </Text>
                  <Text color="#6e71cc" mt="2" fontSize="15px">
                    {item.quantity}
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="500" color="#333d4a" fontSize="14px">
                    Total
                  </Text>
                  <Text color="#6e71cc" mt="2" fontSize="15px">
                    {item.total_price}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Profile;
