import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';
import { toaster } from './toaster';
import api from '../../api/api.client';

// Component for placing bids on products
function PlaceBidForm({ product, isOpen, onClose, onBidPlaced }) {
  // Form state
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate current price and minimum bid
  const currentPrice = product.currentPrice || product.startingPrice;
  const minBid = currentPrice + 1; // Must be higher than current price

  // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      const amount = parseFloat(bidAmount);
  
      if (amount < minBid) {
        setError(`Bid must be at least $${minBid}`);
        setLoading(false);
        return;
      }
  
      try {
        const response = await api.post(`/bids/${product._id}/bid`, { amount });
  
        if (response.data.success) {
          toaster.create({
            title: 'Bid placed successfully!',
            type: 'success',
          });
          onBidPlaced();
          onClose();
          setBidAmount('');
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to place bid';
        setError(message);
        toaster.create({
          title: 'Bid failed',
          description: message,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
  
    // Don't render if not open
    if (!isOpen) return null;
  
    // Render bid form
    return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4} bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold">
            Place Bid on: {product.title}
          </Text>

          <Box>
            <Text mb={2}>Current Price: <strong>${currentPrice}</strong></Text>
            <Text mb={2} fontSize="sm" color="gray.600">
              Minimum bid: ${minBid}
            </Text>
          </Box>

          <Box>
            <Text mb={2} fontWeight="medium">Your Bid Amount *</Text>
            <Input
              type="number"
              step="0.01"
              min={minBid}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Enter amount (min: $${minBid})`}
              required
            />
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Box display="flex" gap={3} w="full">
            <Button variant="ghost" onClick={onClose} flex={1}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading}
              flex={1}
              isDisabled={!bidAmount || parseFloat(bidAmount) < minBid}
            >
              Place Bid
            </Button>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}

export default PlaceBidForm;