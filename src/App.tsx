/**
 * TODO:
 *        - Export tips into own component and then make it hideable
 */
import * as React from "react"
import {
  ChakraProvider,
  VStack,
  Container,
  Text,
} from "@chakra-ui/react"
import ErrorBoundary from "./ErrorBoundary"
import theme from './theme'
import { ScoreCard } from "./ScoreCard"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App = () => (
  <ChakraProvider theme={theme}>
    <VStack textAlign="center" fontSize="xl" mb="40vh">
      <ColorModeSwitcher justifySelf="flex-end" />
      <Container maxW="container.lg">
        <ErrorBoundary>
          <ScoreCard />
          <Text mt="40px" align="left">Tips</Text>
          <Text mt="20px" align="left">Press the green '+' buttons to add rounds and players</Text>
          <Text mt="20px" align="left">Press on player names to change them</Text>
          <Text mt="20px" align="left">Remove players and rounds by deleting their names</Text>
          <Text mt="20px" align="left">Press on scores to change them</Text>
        </ErrorBoundary>
      </Container>
    </VStack>
  </ChakraProvider>
)
