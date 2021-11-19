import {
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { ErrorInfo } from "react";
interface State {
  hasError: boolean;
}
interface Props {

}
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  handleReset() {
    localStorage.clear()
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (

        <Box>
          <Text>Something went wrong.</Text>
          <Button onClick={this.handleReset}>Reset Card</Button>
          <Text>And then refresh the page</Text>
          <Text>And then don't do what you just did</Text>
          <Text>sorry... seriously</Text>

        </Box>
      );
    }
    return this.props.children;
  }
}
