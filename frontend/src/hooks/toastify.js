import { toast } from 'react-toastify';
import i18n from '../init';

export const toastSuccess = (key) => toast.success(i18n.t(key));
export const toastError = (key) => toast.error(i18n.t(key));
