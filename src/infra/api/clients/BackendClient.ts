import { ERROR_MESSAGES } from "@language/error";
import { AppError } from "@models/error";
import { DTO } from "@typing/http";
import axios, { AxiosError } from "axios";

export const BackendClient = axios.create({
	baseURL: `${process.env.VITE_API_URL ?? "/"}/api`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 5000,
});

BackendClient.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error: AxiosError<DTO>) {
		if (
			(error.code === "ECONNABORTED" &&
				error.message.indexOf("timeout") !== -1) ||
			!error.response
		) {
			return Promise.reject(
				AppError.Unknown(ERROR_MESSAGES.UNAVAILABLE_SERVICE)
			);
		}
		let formattedError;
		const message = String(error.response.data["message"]);
		switch (error.response.status) {
			case 400:
				if (
					message.includes("already exists") ||
					message.includes("already in use")
				) {
					formattedError = AppError.Unknown(message);
				}
				formattedError = AppError.Unknown;
				break;
			case 403:
				formattedError = AppError.Unauthorized(message);
				break;
			case 422:
				formattedError = AppError.UnprocessableEntity(message);
				break;
			case 500:
			case 501:
			case 502:
			case 503:
				formattedError = AppError.Unknown(
					ERROR_MESSAGES.UNAVAILABLE_SERVICE
				);
				break;
			default:
				formattedError = AppError.Unknown;
				break;
		}
		return Promise.reject(formattedError);
	}
);
