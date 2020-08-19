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

	public static async resetUserPassword(idNumber, token: string) {
		try {
			const res = await axiosInstance.put(`/users/${idNumber}/resetPassword`, null, {
				params: {
					token
				}
			});

			return res.data;
		} catch (e) {
			throw e;
		}
	}

	public static async validateOtp(idNumber, otp, token: string) {
		try {
			const res = await axiosInstance.post(`/users/${idNumber}/validateOtp`, { otp }, {
				params: {
					token
				}
			});

			return res.data;
		} catch (e) {
			throw e;
		}
	}
}

export default RestService;