import { Box, Image, Text, VStack, HStack, Badge, IconButton, Button } from '@chakra-ui/react';
import { FaTrashAlt, FaGavel } from "react-icons/fa";
import api from '../../api/api.client';

function ProductCard({ product, user, onDelete, onBid }) {
  const canDelete = user && (user.id === product.seller || user.role === 'admin') && onDelete;
  const canBid = user && user.id !== product.seller && product.status === 'active' && new Date() < new Date(product.endTime) && onBid;
  const currentPrice = product.currentPrice || product.startingPrice;

  return (
    // Product card container
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} shadow="md" position="relative">
      <Box position="relative">
        <Image src={product.image.startsWith('http') ? product.image : `${api.defaults.baseURL.replace('/api', '')}${product.image}`} alt={product.title} boxSize="200px" objectFit="cover" />
        {canDelete && (
          <VStack
            position="absolute"
            top={0}
            right={0}
            height="200px"
            justify="center"
            spacing={2}
            p={2}
            bg="rgba(0, 0, 0, 0.7)"
            borderRadius="md"
          >
            <IconButton
              icon={<FaTrashAlt />}
              size="sm"
              color="white"
              bg="red.500"
              _hover={{ bg: "red.600" }}
              _icon={{ color: "white" }}
              onClick={() => onDelete(product._id)}
              aria-label="Delete product"
            />
          </VStack>
       )}
     </Box>
     {/* Product details */}
     <VStack align="start" mt={4} spacing={2}>
        <Text fontSize="xl" fontWeight="bold">{product.title}</Text>
        <Text>{product.description}</Text>
        <HStack>
          <Badge colorScheme="green">Starting: ${product.startingPrice}</Badge>
          <Badge colorScheme="blue">Current: ${currentPrice}</Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          Ends: {product.endTime ? new Date(product.endTime).toLocaleDateString() : 'N/A'}
        </Text>
        {canBid && (
          <Button
            leftIcon={<FaGavel />}
            colorScheme="blue"
            size="sm"
            onClick={() => onBid(product)}
            mt={2}
          >
            Place Bid
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default ProductCard;