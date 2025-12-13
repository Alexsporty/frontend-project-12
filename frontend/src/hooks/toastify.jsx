// toast.js
import { toast } from 'react-toastify';
import i18n from '../init';

export const toastSuccess = (key) => {
  toast.success(
    <div>{i18n.t(key)}</div>, // текст в отдельном div
    {
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: undefined, // отключаем анимацию для тестов
    }
  );
};

export const toastError = (key) => {
  toast.error(<div>{i18n.t(key)}</div>, {
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: undefined,
  });
};
