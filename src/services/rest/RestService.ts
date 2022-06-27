import {axiosInstance, faqAxiosInstance} from "../../clients/axiosClient";

class RestService {
	static async checkUser(idNumber: string, captchaToken: string) {
		const res = await axiosInstance.post(`/users`, { idNumber, "g-recaptcha-response": captchaToken });
		return res.data;
	}

	static async validateCode(idNumber, code) {
		const res = await axiosInstance.post(`/users/${idNumber}/validateCode`, { code });
		return res.data;
	}

	static async validateOtp(idNumber, otp) {
		const res = await axiosInstance.post(`/users/${idNumber}/validateOtp`, { otp });
		return res.data;
	}

	static async resetUserPassword(generateCode: boolean = true) {
		const res = await axiosInstance.put(`/me/resetPassword`, {generateCode});
		return res.data;
	}

	static async unlockUser() {
		const res = await axiosInstance.put(`/me/unlock`, {});
		return res.data;
	}


	static async registerUser() {
		const res = await axiosInstance.put(`/me/register`);
		return res.data;
	}

	static async sendFinishSMS() {
		const res = await axiosInstance.get(`/me/finish`);
		return res.data;
	}

	static async getFaqs() {
		const res = await faqAxiosInstance.get(`/`);
		return res.data;
	}
}

export default RestService;