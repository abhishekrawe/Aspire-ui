/**
 * Utility functions for generating random card data
 */

/**
 * Generates a random card number in the format XXXX XXXX XXXX XXXX
 * @param cardType - 'visa' or 'mastercard'
 * @returns Formatted card number string
 */
export const generateCardNumber = (cardType: 'visa' | 'mastercard' = 'visa'): string => {
  // Visa cards start with 4, Mastercard with 5
  const prefix = cardType === 'visa' ? '4' : '5';
  
  // Generate 15 random digits (first digit is the prefix)
  let cardNumber = prefix;
  for (let i = 0; i < 15; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }
  
  // Format as XXXX XXXX XXXX XXXX
  return cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber;
};

/**
 * Generates a random expiration date in MM/YY format
 * The date will be between 1-5 years in the future
 * @returns Expiration date string in MM/YY format
 */
export const generateExpirationDate = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Random month (1-12)
  const month = Math.floor(Math.random() * 12) + 1;
  
  // Random year (1-5 years in the future)
  const yearsToAdd = Math.floor(Math.random() * 5) + 1;
  const year = currentYear + yearsToAdd;
  
  // Format as MM/YY
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString().slice(-2);
  
  return `${monthStr}/${yearStr}`;
};

/**
 * Generates a random CVV (3 digits)
 * @returns CVV string
 */
export const generateCVV = (): string => {
  const cvv = Math.floor(Math.random() * 900) + 100; // 100-999
  return cvv.toString();
};

/**
 * Randomly selects a card type
 * @returns 'visa' or 'mastercard'
 */
export const getRandomCardType = (): 'visa' | 'mastercard' => {
  return Math.random() > 0.5 ? 'visa' : 'mastercard';
};

