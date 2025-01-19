import Text from "@/component/common/Text";
import styled from "styled-components";
import Input from "@/component/common/Input";
import Flex from "@/component/common/styles/Flex";
import Button from "@/component/common/Button";

const Login = () => {
  return (
    <div>
      <Text variants="ExtraLarge" margin="5rem 0 0 10rem">Login</Text>
      <Flex $flex_direction="column" $marginTop="10rem">
        <Input variants="default" placeholder="please enter your e-mail" />
        <Input $marginTop="1.5rem" variants="default" placeholder="please enter your password" />
        <Button $marginTop="10rem" variants="Medium">login</Button>
      </Flex>
    </div>
  )

}

export default Login