'use client';

import { useCallback } from 'react';
import { useToast } from '@/src/components/ui/Toast';
import {
  isApiError,
  isWalletError,
  isSorobanError,
  isAppError,
  toAppError,
  type AppError,
} from '@/src/lib/errors';

/**
 * Mapping of error codes to user-friendly messages.
 * These messages are used for toast notifications.
 */
const ERROR_CODE_MESSAGES: Record<string, string> = {
  // API Errors
  API_401: 'Your session has expired. Please reconnect your wallet.',
  API_403: 'You do not have permission to perform this action.',
  API_404: 'The requested resource was not found.',
  API_429: 'Too many requests. Please wait a moment and try again.',
  API_500: 'A server error occurred. Please try again later.',
  API_502: 'Unable to connect to the server. Please check your connection.',
  API_503: 'The service is temporarily unavailable. Please try again later.',

  // Wallet Errors
  WALLET_CONNECT: 'Failed to connect to wallet.',
  WALLET_DISCONNECT: 'Wallet disconnected unexpectedly.',

  // Soroban Errors
  SOROBAN_BUDGETEXCEEDED: 'Transaction fee exceeds budget. Try with smaller amounts.',
  SOROBAN_INSUFFICIENTBALANCE: 'Insufficient balance to complete this transaction.',
  SOROBAN_CONTRACTNOTFOUND: 'The contract could not be found.',
  SOROBAN_EXECUTIONFAILED: 'Contract execution failed.',
};

/**
 * Gets a user-friendly message for an error.
 * Falls back to the error's message if no specific mapping exists.
 */
function getErrorMessage(error: AppError): string {
  // Check for specific error code mapping
  const mappedMessage = ERROR_CODE_MESSAGES[error.code];
  if (mappedMessage) {
    return mappedMessage;
  }

  // For API errors with specific status codes, provide contextual messages
  if (isApiError(error)) {
    switch (error.status) {
      case 0:
        return 'Network connection failed. Please check your internet connection.';
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 408:
        return 'Request timed out. Please try again.';
      case 504:
        return 'Gateway timeout. The server took too long to respond.';
    }
  }

  // For wallet errors with specific wallet types
  if (isWalletError(error)) {
    if (error.action === 'connect' && error.walletType) {
      const walletMessages: Record<string, string> = {
        freighter: 'Freighter wallet not detected. Please install Freighter.',
        ledger: 'Ledger device not detected. Please connect your Ledger.',
      };
      if (walletMessages[error.walletType.toLowerCase()]) {
        return walletMessages[error.walletType.toLowerCase()];
      }
    }
  }

  // Fall back to the error's own message
  return error.getUserMessage();
}

/**
 * Determines the appropriate toast type based on error severity.
 */
function getToastType(error: AppError): 'success' | 'error' | 'warning' | 'info' {
  switch (error.severity) {
    case 'low':
      return 'info';
    case 'medium':
      return 'warning';
    case 'high':
    case 'critical':
      return 'error';
    default:
      return 'error';
  }
}

/**
 * Hook that provides error toast functionality.
 * Automatically formats error messages based on error type and code.
 */
export function useErrorToast() {
  const { addToast } = useToast();

  /**
   * Shows a toast notification for an error.
   * Automatically formats the message based on error type.
   */
  const showErrorToast = useCallback(
    (error: unknown, context?: string) => {
      const appError = toAppError(error, context);
      const message = getErrorMessage(appError);
      const type = getToastType(appError);

      addToast(message, type);
    },
    [addToast],
  );

  /**
   * Shows a success toast notification.
   */
  const showSuccessToast = useCallback(
    (message: string) => {
      addToast(message, 'success');
    },
    [addToast],
  );

  /**
   * Shows a warning toast notification.
   */
  const showWarningToast = useCallback(
    (message: string) => {
      addToast(message, 'warning');
    },
    [addToast],
  );

  /**
   * Shows an info toast notification.
   */
  const showInfoToast = useCallback(
    (message: string) => {
      addToast(message, 'info');
    },
    [addToast],
  );

  return {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
    showInfoToast,
  };
}
