import { Input } from "@chakra-ui/input";
import React, { useState } from "react"


interface EditProps {
  handleOnSubmit?: Function;
  children: JSX.Element;
  value: string
}

export const Edit = (props: EditProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const originalRef = React.useRef<HTMLInputElement>(null);
  const handleClickText = () => {
    setEditing(true);
  }
  const handleOnBlur = (e: any) => {
    if (props.handleOnSubmit) {
      props.handleOnSubmit(e.target.value);
    }
    setEditing(false);
  }
  const handleOnChange = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur()
    }
  }
  const cloneWithText = React.cloneElement(props.children, {
    children: props.value,
    onClick: handleClickText,
    ref: originalRef,
  })
  const input = (
    <Input
      autoFocus
      size="xs"
      defaultValue={props.value}
      onKeyUp={handleOnChange}
      onBlur={handleOnBlur}
      ref={inputRef}
      variant="flushed"
    />
  )

  const cloneWithInput = React.cloneElement(props.children, {
    children: input,
    width: originalRef.current ? originalRef.current.offsetWidth + "px" : "100%"
  })
  return (
    <>
      {editing ? cloneWithInput : cloneWithText}
    </>
  )
}