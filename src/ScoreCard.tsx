/**
 * TODO:  - Highlight winner
 *        - Choose win order (high score or low score wins)
 *        - Add undo/redo list
 */
import useLocalStorage from "./customHooks"
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Collapse,
  Button,
  useColorModeValue,
  Box,
  HStack,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import './ScoreCard.css'
import { Edit } from "./Edit"
export const ScoreCard = () => {
  const [players, setPlayers] = useLocalStorage("players", ["P1"]);
  const [rounds, setRounds] = useLocalStorage("rounds", ["1"]);
  const [cells, setCells] = useLocalStorage("cells",
    Array.from({ length: rounds.length }, () => Array.from({ length: players.length }, () => 0))
  );
  const { isOpen: controlsOpen, onToggle: toggleControls } = useDisclosure();
  const { isOpen: templatesOpen, onToggle: toggleTemplates } = useDisclosure();
  // TODO: Choose a better th color
  const thColor = useColorModeValue("white", "gray.800")
  const collapseBorderColor = useColorModeValue("black", "white")
  const collapseBoxProps = {
    p: "30px",
    border: "1px",
    borderColor: collapseBorderColor,
    rounded: "md",
    shadow: "md",
    mt: 4,
  }


  const addPlayer = () => {
    setPlayers((prevPlayers: Array<string>) => ([...prevPlayers, `P${prevPlayers.length + 1}`]));
    setCells((prevCells: Array<Array<number>>) => (
      prevCells.map(row => {
        return [...row].concat([0]);
      })
    ));
  }
  const addRound = (roundName: string) => {
    setRounds((prevRounds: Array<string>) => ([...prevRounds, roundName]))
    setCells((prevCells) => ([...prevCells, Array.from({ length: players.length }, () => 0)]));
  }

  const updatePlayerName = (name: string, index: number) => {
    name = name.trim();
    if (name === players[index]) return;
    if (name.length) {
      setPlayers((p: Array<string>) => ([...p.slice(0, index), name, ...p.slice(index + 1)]));
    }
    else {
      setPlayers([...players.slice(0, index), ...players.slice(index + 1)]);
      setCells(cells.map(row => [...row.slice(0, index), ...row.slice(index + 1)]))
    }
  }

  const updateRoundName = (name: string, index: number) => {
    name = name.trim();
    if (name === rounds[index]) return;
    if (name.length) {
      setRounds((p: Array<string>) => ([...p.slice(0, index), name, ...p.slice(index + 1)]));
    }
    else {
      setRounds([...rounds.slice(0, index), ...rounds.slice(index + 1)]);
      setCells([...cells.slice(0, index), ...cells.slice(index + 1)]);
    }
  }

  const updateCell = (value: string, row: number, col: number) => {
    let newValue = Number.isNaN(Number(value)) ? 0 : Number(value);
    setCells([...cells.slice(0, row),
    [...cells[row].slice(0, col), newValue, ...cells[row].slice(col + 1)],
    ...cells.slice(row + 1)]);
  }

  const deletePlayers = () => {
    setPlayers(["P1"]);
    setCells(
      cells.map(row => {
        return [...row.splice(0, 1)]
      })
    );
  }
  const resetRounds = () => {
    setRounds(() => (["1"]));
    setCells(
      Array.from({ length: 1 }, () => Array.from({ length: players.length }, () => 0))
    );
  }
  const resetScores = () => {
    setCells(
      Array.from({ length: rounds.length }, () => Array.from({ length: players.length }, () => 0))
    );
  }

  const loadTemplate = (template: string[]) => {
    setRounds(template);
    setCells(Array.from({ length: template.length }, () => Array.from({ length: players.length }, () => 0)));

  }

  const playMayI = () => {
    let r = ["2 sets", "1 set 1 run", "2 runs", "3 sets", "1 set 2 runs", "2 runs 1 set", "3 runs"];
    loadTemplate(r);
  }

  const playerCols = players.map((player, index) =>
    <Edit key={index} value={player} handleOnSubmit={(nextValue: string) => {
      updatePlayerName(nextValue, index)
    }}>
      <Th bg={thColor}>
      </Th>
    </Edit>
  )

  const roundRows = rounds.map((round, roundIndex) =>
    <Tr key={roundIndex}>
      <Edit
        value={round}
        noTabIndex
        handleOnSubmit={(nextValue: string) => {
          updateRoundName(nextValue, roundIndex)
        }}
      >
      <Th bg={thColor} px="10px" variant="filled"></Th>
      </Edit>
      {
        cells[roundIndex].map((cell, cellIndex) =>
          <Edit
            isNumber={true}
            value={cell + ""}
            key={cellIndex}
            handleOnSubmit={((newVal: string) => {
              updateCell(newVal, roundIndex, cellIndex)
            })}
          >
            <Td >
            </Td>
          </Edit>
        )
      }
    </Tr>
  );

  const totals = () => {
    let res = Array.from({ length: players.length }, () => 0)
    cells.forEach(row => {
      row.forEach((value: number, col: number) => {
        res[col] += value;
      })
    })
    return res
  }

  return (
    <Box>
      <Box
        maxW="100%"
        overflow="auto"
        maxH="75vh"
      >
        <Table
          variant="striped"
        >
          <Thead>
            <Tr>
              <Th bg={thColor}>#</Th>
              {
                playerCols
              }
              <Th
                w="50px"
              >
                <Button
                  onClick={addPlayer}
                  border="2px"
                  borderColor="green.500"
                >
                  <VisuallyHidden>Add Player</VisuallyHidden>
                  <AddIcon color="green.500" />
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              roundRows
            }
          </Tbody>
          <Tfoot>
            <Tr>
              <Th px="10px" bg={thColor}>Total</Th>
              {
                totals().map((value, index) =>
                  <Th fontSize="xl" bg={thColor} key={index}>{value}</Th>
                )
              }
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <HStack
        align="flex-start"
      >
        <Button
          onClick={() => { addRound(`${rounds.length + 1}`) }}
          border="2px"
          borderColor="green.500"
        >
          <VisuallyHidden>Add Round</VisuallyHidden>
          <AddIcon color="green.500" />
        </Button>
      </HStack>

      <VStack
        spacing={4}
      >
        <Box>
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={toggleControls}
          >{controlsOpen ? "Hide" : "Show"} controls</Button>
          <Collapse in={controlsOpen} animateOpacity>
            <VStack {...collapseBoxProps}
            >
              <Button
                variant="outline"
                isFullWidth
                onClick={resetScores}
              >Reset Scores</Button>
              <Button
                variant="outline"
                isFullWidth
                onClick={deletePlayers}
                isDisabled={players.length === 1}
              >Reset Players</Button>
              <Button
                variant="outline"
                isFullWidth
                onClick={resetRounds}
                isDisabled={rounds.length === 1}
              >Reset Rounds</Button>
            </VStack>
          </Collapse>
        </Box>
        <Box>
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={toggleTemplates}
          >{templatesOpen ? "Hide" : "Show"} templates</Button>
          <Collapse in={templatesOpen} animateOpacity>
            <Box {...collapseBoxProps} >
              <Button
                isFullWidth
                variant="outline"
                onClick={playMayI}
              >May I</Button>
            </Box>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  )
}
