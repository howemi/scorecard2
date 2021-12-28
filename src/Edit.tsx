import { Input } from "@chakra-ui/input";
import React, { useState } from "react"


interface EditProps {
  handleOnSubmit?: Function;
  children: JSX.Element;
  value: string;
  isNumber?: boolean;
  noTabIndex?: boolean;
  autoSelect?: boolean;
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
    onFocus: handleClickText,
    tabIndex: props.noTabIndex ? -1 : 0,
    ref: originalRef,
  })

  const inputProps = {
    autoFocus: true,
    defaultValue: props.value,
    onKeyUp: handleOnChange,
    onBlur: handleOnBlur,
    ref: inputRef,
    variant: "flushed",
    my: "-3px",
  }

  const input = (
    <Input
      {...inputProps}
      type={ props.isNumber ? "tel" : "text" }
    />
  )

  const cloneWithInput = React.cloneElement(props.children, {
    children: input,
    width: originalRef.current ? originalRef.current.offsetWidth + "px" : "100%",
    height: originalRef.current ? originalRef.current.offsetHeight + "px" : "100%",
    py: "0",
  })
  return (
    <>
      { editing ? cloneWithInput : cloneWithText }
    </>
  )
}