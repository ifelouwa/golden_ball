import { Container, Flex, HStack, Button, Heading, Text, IconButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth.Context'
import { MdPublic } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <Container maxW="container.xl" px={4} py={4}>
            <Flex justify="space-between" align="center" wrap="wrap">
                <HStack>
                    <Heading as="h1" size="lg">
                        <Link to="/">The Golden Ball</Link>
                    </Heading>
                    <MdPublic size={24} color="black" />
                </HStack>

                <HStack spacing={4} alignItems="center">
                    <Link to="/">
                        <Button variant="ghost">Home</Button>
                    </Link>
                    <Link to="/products">
                        <Button variant="ghost">Products</Button>
                    </Link>
                    {user ? (
                        <IconButton
                            icon={<CgProfile />}
                            variant="outline"
                            onClick={logout}
                            aria-label="Profile"
                            borderColor="black"
                            color="black"
                        />
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="ghost">Register</Button>
                            </Link>
                        </>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
}

export default Navbar