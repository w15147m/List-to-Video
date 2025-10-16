import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

/**
 * Common confirmation dialog
 * @param {Object} options
 * @param {string} options.title - Title of the alert
 * @param {string} options.message - Message body
 * @param {Function} options.onConfirm - Function to run on confirmation
 * @param {Function} [options.onCancel] - Function to run on cancel (optional)
 */
export const showConfirmDialog = ({
  title = 'Confirmation',
  message = 'Are you sure?',
  onConfirm,
  onCancel,
}) => {
  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            await onConfirm();
          } catch (err) {
            toast.error('Something went wrong');
          }
        },
      },
      {
        label: 'Cancel',
        onClick: () => {
          if (onCancel) onCancel();
          else toast.info('Action cancelled');
        },
      },
    ],
  });
};
