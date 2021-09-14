import {axiosInstance, faqAxiosInstance} from "../../clients/axiosClient";

class RestService {
	static async checkUser(idNumber: string, captchaToken: string) {
		const res = await axiosInstance.post(`/users`, { idNumber, "g-recaptcha-response": captchaToken });
		return res.data;
	}

	static async resetUserPassword() {
		const res = await axiosInstance.put(`/users/me/resetPassword`);
		return res.data;
	}

	static async validateOtp(idNumber, otp) {
		const res = await axiosInstance.post(`/users/${idNumber}/validateOtp`, { otp });
		return res.data;
	}

	static async sendFinishSMS() {
		const res = await axiosInstance.get(`/users/me/finish`);
		return res.data;
	}

	static async getFaqs() {
		const res = await faqAxiosInstance.get(`/`);
		return res.data;
	}
}

export default RestService;