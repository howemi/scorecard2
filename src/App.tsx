import * as React from "react"
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  VStack,
  // Code,
  Grid,
  Container,
} from "@chakra-ui/react"
import theme from './theme'
import { ScoreCard } from "./ScoreCard"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
// import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <VStack textAlign="center" fontSize="xl">
      <ColorModeSwitcher justifySelf="flex-end" />
      {/* <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link> */}
      <Container>
        <ScoreCard />
      </Container>
    </VStack>
  </ChakraProvider>
)
