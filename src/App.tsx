/**
 * TODO:
 */
import {
  ChakraProvider,
  VStack,
  Container,
  Box,
} from "@chakra-ui/react"
import ErrorBoundary from "./ErrorBoundary"
import theme from './theme'
import { Tips } from "./Tips"
import { ScoreCard } from "./ScoreCard"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

export const App = () => (
  <ChakraProvider theme={theme}>
    <VStack textAlign="center" fontSize="xl" mb="40vh">
      <ColorModeSwitcher justifySelf="flex-end" />
      <Container maxW="container.lg">
        <ErrorBoundary>
          <ScoreCard />
          <Box mt={4}>
            <Tips />
          </Box>
        </ErrorBoundary>
      </Container>
    </VStack>
  </ChakraProvider>
)
