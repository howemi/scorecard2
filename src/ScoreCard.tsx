import React, { useEffect } from "react"
import { useState } from "react"
import {
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
} from "@chakra-ui/react"
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import './ScoreCard.css'

export const ScoreCard = () => {
  const [players, setPlayers]: [Array<string>, Function] = useState(["Player 1"]);
  const [rounds, setRounds]: [Array<string>, Function] = useState(["Round 1"]);
  const [cells, setCells]: [Array<Array<number>>, Function] = useState(
    Array.from({ length: players.length }, () => Array.from({ length: rounds.length }, () => 0))
  );
  const [controlsOpen, setControlsOpen]: [boolean, Function] = useState(false);
  const [templatesOpen, setTemplatesOpen]: [boolean, Function] = useState(false);

  const addPlayer = () => {
    setPlayers([...players, `Player ${players.length + 1}`])
    setCells([...cells, []]);
  }
  const addRound = (roundName: string) => {
    setRounds([...rounds, roundName])
    setCells([...cells, []]);
  }
  const toggleControls = () => {
    setControlsOpen(!controlsOpen);
  }
  const toggleTemplates = () => {
    setTemplatesOpen(!templatesOpen);
  }

  const updateName = (name: string, index: number) => {
    name = name.trim();
    if (name === players[index]) return;
    if (name.length) {
      setPlayers([...players.slice(0, index), name, ...players.slice(index + 1)]);
    }
    else {
      setPlayers([...players.slice(0, index), ...players.slice(index + 1)]);
      setCells([...cells.slice(0, index), ...cells.slice(index + 1)]);
    }
  }

  const updateCell = (value: string, column: number, row: number) => {

  }

  const deletePlayers = () => {
    setPlayers(["Player 1"]);
  }
  const deleteRounds = () => {
    setRounds(["Round 1"]);
  }
  const clearScores = () => {
    setPlayers([]);
  }
  const playMayI = () => {
    let r = ["2 sets", "1 set 1 run", "2 runs", "3 sets", "1 set 2 runs", "2 runs 1 set", "3 runs"];
    setRounds(r);
  }

  useEffect(() => {
    console.log(players)
  }, [players]);
  useEffect(() => {
    console.log(rounds)
  }, [rounds]);

  const playerCols = players.map((player, index) =>
    <Th key={index}>
      <Editable onSubmit={(nextValue) => {
        updateName(nextValue, index)
      }}
        defaultValue={player}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Th>
  )

  const roundRows = rounds.map((round, roundIndex) =>
    <Tr key={roundIndex}>
      <Td>{round}</Td>
      {
        cells[roundIndex].map((cell, cellIndex) => {
          <Td>
            <Editable onSubmit={(nextValue) => {
              updateCell(nextValue, roundIndex, cellIndex)
            }}
              defaultValue={cell + ""}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Td>
        })
      }
    </Tr>
  );



  return (
    <>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>#</Th>
            {
              playerCols
            }
            <Th>
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
            <Th>
              <Button
                onClick={() => {addRound(`Round ${rounds.length + 1}`)}}
                border="2px"
                borderColor="green.500"
              >
                <AddIcon color="green.500" />
              </Button>
            </Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
          <Tr>
            <Th>Totals</Th>
          </Tr>
        </Tfoot>
      </Table>
      <Button onClick={toggleControls}>{controlsOpen ? "Hide" : "Show"} controls</Button>
      <Collapse in={controlsOpen}>
        <ButtonGroup isAttached>
          <Button onClick={clearScores}>Clear Scores</Button>
          <Button onClick={deletePlayers} isDisabled={players.length === 1} colorScheme="blue">Reset Players</Button>
          <Button onClick={deleteRounds} isDisabled={rounds.length === 1}>Delete Rounds</Button>
        </ButtonGroup>
      </Collapse>
      <Button onClick={toggleTemplates}>{controlsOpen ? "Hide" : "Show"} templates</Button>
      <Collapse in={templatesOpen}>
        <Button onClick={playMayI}>May I</Button>
      </Collapse>

    </>
  )
}