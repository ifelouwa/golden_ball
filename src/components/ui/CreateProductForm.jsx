import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import { toaster } from './toaster';
import api from '../../api/api.client';

// Component for creating new products
function CreateProductForm({ isOpen, onClose, onProductCreated }) {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    image: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await api.post('/products', formData);
          if (response.data.success) {
            toaster.create({
              title: 'Product created successfully',
              type: 'success',
            });
            onProductCreated();
            onClose();
            setFormData({
              title: '',
              description: '',
              startingPrice: '',
              image: '',
              startTime: '',
              endTime: '',
            });
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Failed to create product';
          toaster.create({
            title: 'Error',
            description: message,
            type: 'error',
          });
        } finally {
          setLoading(false);
        }
      };
    
      // Render form if open
      return (
    isOpen && (
      <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Box w="full">
              <Text mb={2} fontWeight="medium">Title *</Text>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </Box>

            <Box w="full">
              <Text mb={2} fontWeight="medium">Description</Text>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
              />
            </Box>

            <Box w="full">
              <Text mb={2} fontWeight="medium">Starting Price ($) *</Text>
              <Input
                name="startingPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.startingPrice}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </Box>

            <Box w="full">
              <Text mb={2} fontWeight="medium">Image URL *</Text>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </Box>

            <Box w="full">
              <Text mb={2} fontWeight="medium">Start Time *</Text>
              <Input
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </Box>

            <Box w="full">
              <Text mb={2} fontWeight="medium">End Time *</Text>
              <Input
                name="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </Box>

            <Box display="flex" gap={3} w="full">
              <Button variant="ghost" onClick={onClose} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={loading} flex={1}>
                Create Product
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    )
  );
}

export default CreateProductForm;