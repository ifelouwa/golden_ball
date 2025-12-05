import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const system = createSystem(defaultConfig)

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      {props.children}
    </ChakraProvider>
  )
}
