import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={"solid"}
      borderColor="gray.200"
      bg="#1b1e2d"
      color="#f2f2f2"
      mt="20"
    >
      <Container as={Stack} maxW={"7xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Text fontWeight="500">Company</Text>
            <Text color="#c5c9cd">About Us</Text>
            <Text color="#c5c9cd">Blog</Text>
            <Text color="#c5c9cd">Careers</Text>
            <Text color="#c5c9cd">Contact Us</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="500">Legal</Text>
            <Text color="#c5c9cd">Cookies Policy</Text>
            <Text color="#c5c9cd">Privacy Policy</Text>
            <Text color="#c5c9cd">Terms of Service</Text>
            <Text color="#c5c9cd">Law Enforcement</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="500">Support</Text>
            <Text color="#c5c9cd">Help Center</Text>
            <Text color="#c5c9cd">Safety Center</Text>
            <Text color="#c5c9cd">Community Guidelines</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight="500">Install App</Text>
            <Image
              w="120px"
              src="https://coinswitch.co/_next/static/media/app-store-download.fb5659b5.png"
              alt="google-play"
              loading="lazy"
            />
            <Image
              w="120px"
              src="https://coinswitch.co/_next/static/media/google-play-download.1c0e3a31.png"
              alt="app-store"
              loading="lazy"
            />
          </Stack>
        </SimpleGrid>
      </Container>

      <Flex borderTopWidth={1} borderStyle={"solid"} borderColor="gray">
        <Container
          as={Stack}
          maxW={"7xl"}
          py={5}
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "4", md: "24" }}
          align={{ md: "center" }}
        >
          <Text>© 2023 Made by Vrushabh Veer.</Text>
          <Stack
            direction={"row"}
            spacing={{ base: "4", md: "6" }}
            fontSize={{ base: "15px", md: "16px" }}
          >
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
}
