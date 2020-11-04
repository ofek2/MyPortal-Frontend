import axiosInstance from "../../clients/axiosClient";

class RestService {
	public static async checkUser(idNumber: string) {
		try {
			const res = await axiosInstance.post(`/users`, { idNumber });
			return res.data;
		} catch (e) {
			throw e;
		}
	}

	public static async resetUserPassword() {
		try {
			const res = await axiosInstance.put(`/users/me/resetPassword`);

			return res.data;
		} catch (e) {
			throw e;
		}
	}

	public static async validateOtp(idNumber, otp) {
		try {
			const res = await axiosInstance.post(`/users/${idNumber}/validateOtp`, { otp });

			return res.data;
		} catch (e) {
			throw e;
		}
	}
}

export default RestService;