import React from "react"
import { useState } from "react"
import {
  Container,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Collapse,
  ButtonGroup,
  Button,
  useColorModeValue,
  Box,
  HStack,
  useDisclosure,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import './ScoreCard.css'
import { Edit } from "./Edit"
export const ScoreCard = () => {
  const [players, setPlayers]: [Array<string>, Function] = useState(["P1"]);
  const [rounds, setRounds]: [Array<string>, Function] = useState(["R1"]);
  const [cells, setCells]: [Array<Array<number>>, Function] = useState(
    Array.from({ length: players.length }, () => Array.from({ length: rounds.length }, () => 0))
  );
  const { isOpen: controlsOpen, onToggle: toggleControls } = useDisclosure();
  const { isOpen: templatesOpen, onToggle: toggleTemplates } = useDisclosure();
  // TODO: Choose a better th color
  const thColor = useColorModeValue("white", "gray.800")
  const collapseBoxProps = {
    p: "40px",
    color: "white",
    mt: "4",
    bg: "teal.500",
    rounded: "md",
    shadow: "md",
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
    setCells((prevCells: Array<number>) => ([...prevCells, Array.from({ length: players.length }, () => 0)]));
  }

  const updateName = (name: string, index: number) => {
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
  const deleteRounds = () => {
    setRounds(() => (["R1"]));
    setCells(
      Array.from({ length: 1 }, () => Array.from({ length: players.length }, () => 0))
    );
  }
  const clearScores = () => {
    setCells(
      Array.from({ length: rounds.length }, () => Array.from({ length: players.length }, () => 0))
    );
  }
  const playMayI = () => {
    let r = ["2 sets", "1 set 1 run", "2 runs", "3 sets", "1 set 2 runs", "2 runs 1 set", "3 runs"];
    setRounds(() => ([]));
    setCells(() => ([]));
    for (let round of r) {
      addRound(round);
    }
  }

  const playerCols = players.map((player, index) =>
    <Edit key={index} value={player} handleOnSubmit={(nextValue: string) => {
      updateName(nextValue, index)
    }}>
      <Th bg={thColor}>
      </Th>
    </Edit>
  )

  const roundRows = rounds.map((round, roundIndex) =>
    <Tr key={roundIndex}>
      <Th bg={thColor} variant="filled">{round}</Th>
      {
        cells[roundIndex].map((cell, cellIndex) =>
          <Edit
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
    // <VStack
    //   spacing={4}
    // >
    <Box
    // w="100%"
    >
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
              <Th bg={thColor}>Total</Th>
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
          onClick={() => { addRound(`R${rounds.length + 1}`) }}
          border="2px"
          borderColor="green.500"
        >
          <AddIcon color="green.500" />
        </Button>
      </HStack>

      <VStack>
        <Button onClick={toggleControls}>{controlsOpen ? "Hide" : "Show"} controls</Button>
        {/* TODO: Make the collapse area look nicer */}
        <Collapse in={controlsOpen}>
          <VStack {...collapseBoxProps}
          >
            <Button
              onClick={clearScores}
            >Clear Scores</Button>
            <Button
              onClick={deletePlayers}
              isDisabled={players.length === 1}
            >Reset Players</Button>
            <Button
              onClick={deleteRounds}
              isDisabled={rounds.length === 1}
            >Delete Rounds</Button>
          </VStack>
        </Collapse>
        <Button
          onClick={toggleTemplates}
        >{templatesOpen ? "Hide" : "Show"} templates</Button>
        <Collapse in={templatesOpen}>
          <Box {...collapseBoxProps} >
            <Button onClick={playMayI}>May I</Button>
          </Box>
        </Collapse>
      </VStack>
    </Box>
    // </VStack>
  )
}