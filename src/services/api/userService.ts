import { User, Balance, ApiResponse } from '@/types';
import { mockUser, mockBalance, simulateDelay } from './mockData';
import { storageService } from '@services/storage/storageService';

const USER_STORAGE_KEY = 'aspire_user';
const BALANCE_STORAGE_KEY = 'aspire_balance';

export const userService = {
  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await simulateDelay();
    const storedUser = storageService.get<User>(USER_STORAGE_KEY);
    const user = storedUser || mockUser;
    
    if (!storedUser) {
      storageService.set(USER_STORAGE_KEY, mockUser);
    }
    
    return {
      data: user,
      success: true,
    };
  },

  // Get user balance
  async getBalance(): Promise<ApiResponse<Balance>> {
    await simulateDelay();
    const storedBalance = storageService.get<Balance>(BALANCE_STORAGE_KEY);
    const balance = storedBalance || mockBalance;
    
    if (!storedBalance) {
      storageService.set(BALANCE_STORAGE_KEY, mockBalance);
    }
    
    return {
      data: balance,
      success: true,
    };
  },

  // Update user
  async updateUser(user: User): Promise<ApiResponse<User>> {
    await simulateDelay();
    storageService.set(USER_STORAGE_KEY, user);
    return {
      data: user,
      success: true,
    };
  },
};

