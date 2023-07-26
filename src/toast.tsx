import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const success_toast = (data: any) => {
	if (data.success) {
		return toast.success(data.message);
	} else {
		return toast.error(data.message);
	}
};

export const error_toast = (error: any) => {
	return toast.error(error.response.data.message);
};

