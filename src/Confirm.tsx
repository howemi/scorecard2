import React from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"

interface ConfirmProps {
  displayText: string;
  title?: string;
  body?: string;
  yesFunction: Function ;
}

export const Confirm = (props: ConfirmProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const yesFunction = () => {
    props.yesFunction();
    setIsOpen(false);
  }
  const cancelRef = React.useRef().current

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={() => setIsOpen(true)}>
        { props.displayText }
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              { props.title }
            </AlertDialogHeader>
            <AlertDialogBody>
              { (!props.body) && ("Are you sure?") }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={ onClose }>
                No
              </Button>
              <Button colorScheme="red" onClick={ yesFunction } ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}