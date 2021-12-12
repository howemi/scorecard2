import {
  Text,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react"
export const Tips = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'teal.400', color: 'white' }}>
            <Box flex='1' textAlign='left'>Tips</Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Text align="left">Press the green '+' buttons to add rounds and players</Text>
          <Text align="left">Press on player names to change them</Text>
          <Text align="left">Remove players and rounds by deleting their names</Text>
          <Text align="left">Press on scores to change them</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}