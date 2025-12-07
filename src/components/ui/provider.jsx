import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const system = createSystem(defaultConfig)

// Provider component for Chakra UI theming and color mode
export function Provider(props) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={system}>
        {props.children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}
