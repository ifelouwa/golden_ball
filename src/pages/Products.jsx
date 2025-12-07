import { useState, useEffect, useContext } from 'react';
import { Box, Text, SimpleGrid, Spinner, Flex, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import api from '../api/api.client';
import ProductCard from '../components/ui/ProductCard';
import CreateProductForm from '../components/ui/CreateProductForm';
import PlaceBidForm from '../components/ui/PlaceBidForm';
import { AuthContext } from '../context/Auth.Context';
import { toaster } from '../components/ui/toaster';

// Products page component

function Products() {
  // Get user from auth context
  const { user } = useContext(AuthContext);
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [biddingProduct, setBiddingProduct] = useState(null);
  const [isBidFormOpen, setIsBidFormOpen] = useState(false);

  // Open create product form
  const handleOpen = () => {
    setIsFormOpen(true);
  };

  // Close create product form
  const handleClose = () => {
    setIsFormOpen(false);
  };

  // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        if (response.data.success && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setError('Invalid response from server');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch products on component mount
    useEffect(() => {
      fetchProducts();
    }, []);
  
    // Handle product creation
    const handleProductCreated = () => {
      fetchProducts();
    };
  
    // Handle bid initiation
    const handleBid = (product) => {
      setBiddingProduct(product);
      setIsBidFormOpen(true);
    };
  
    // Handle bid placement
    const handleBidPlaced = () => {
      setIsBidFormOpen(false);
      setBiddingProduct(null);
      fetchProducts();
    };
  
    // Handle bid form close
    const handleBidClose = () => {
      setIsBidFormOpen(false);
      setBiddingProduct(null);
    };
  
    // Handle product deletion
    const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await api.delete(`/products/${productId}`);
        if (response.data.success) {
          toaster.create({
            title: 'Product deleted successfully',
            type: 'success',
          });
          fetchProducts();
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete product';
        toaster.create({
          title: 'Error',
          description: message,
          type: 'error',
        });
      }
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={4}>
        <Text fontSize="2xl">Products</Text>
        <Button colorScheme="blue" onClick={handleOpen} size="md">
          <FaPlus style={{ marginRight: '8px' }} />
          Create Product
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            user={user}
            onDelete={handleDelete}
            onBid={handleBid}
          />
        ))}
      </SimpleGrid>
      <CreateProductForm
        isOpen={isFormOpen}
        onClose={handleClose}
        onProductCreated={handleProductCreated}
      />
      {biddingProduct && (
        <PlaceBidForm
          product={biddingProduct}
          isOpen={isBidFormOpen}
          onClose={handleBidClose}
          onBidPlaced={handleBidPlaced}
        />
      )}
    </Box>
  );
}

export default Products;