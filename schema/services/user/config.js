require("dotenv").config();

module.exports = {
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	HOST: process.env.HOST,
	PORT: process.env.PORT,
	MONGODB: process.env.MONGODB,

	forgetPasswordExpired: 1,
	email: {
		from: "dev@microgen.com",
		emailImageHeader: null
	},
	feathers: {
		paginate: {
			default: 20,
			limit: 20
		},
		authentication: {
			entity: "user",
			service: "users",
			secret: "dkWG2RZXO3u4mOgJKXxmWE0mUWM=",
			authStrategies: ["jwt", "local"],
			jwtOptions: {
				header: {
					typ: "access"
				},
				audience: "https://yourdomain.com",
				issuer: "feathers",
				algorithm: "HS256",
				expiresIn: "1d"
			},
			local: {
				usernameField: "email",
				passwordField: "password"
			},
			oauth:{
				"redirect": "/frontend",
				google: {
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				}
			}
		}
	}
};
