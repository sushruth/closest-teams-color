import { Flex, Input } from "@fluentui/react-northstar"

export const Header = () => {
  return (
    <Flex >
      <Flex.Item>
        <Input placeholder="color here" />
      </Flex.Item>
    </Flex>
  )
}