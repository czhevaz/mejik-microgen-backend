const typeDef = `
    input LoginInput {
        email: String!,
        password: String
    }
	
	input RegisterInput {
		email: String!,
		password: String!,
		firstName: String!,
		lastName: String
	}

	input UpdateUserInput {
		email: String
		password: String
		firstName: String
		lastName: String
		phoneNumbers: String
		image: String
	}

    input CreateUserInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String
        phoneNumbers: String
        role: String!
	}
	
	input VerifyEmailInput {
		token: String!
	}

    extend type Query {
        users (query: JSON): [User]
        user: User
    }

    extend type Mutation {
        login(input: LoginInput): Login
        register(input: RegisterInput): Login
        createUser(input: CreateUserInput): Login
        forgetPassword(input: ForgetPasswordInput): Response
		resetPassword(input: ResetPasswordInput): Response
		verifyEmail(input: VerifyEmailInput): Response
		updateUser(input: UpdateUserInput, _id: String!): User
		deleteUser(_id: String!): User
		changeProfile(input: UpdateUserInput): User
    }

    type User {
        _id: ID!
        firstName: String
        lastName: String
		email: String
		status: Int
		role: String
    }

    type ForgetPassword {
        token: String!
    }

    type Login {
        token: String
        user: User
    }

    input ForgetPasswordInput {
        email : String!
    }
        
    input ResetPasswordInput {
        newPassword: String!
        token: String!
    }

`;
const resolvers = {
	Query: {
		users: async (_, { query }, { userRequester }) => {
			return await userRequester.send({
				type: "index",
				query
			});
		},
		user: async (_, args, { headers, userRequester }) => {
			return await userRequester.send({
				type: "user",
				headers
			});
		}
	},
	Mutation: {
		resetPassword: async (_, { input = {} }, { userRequester, headers }) => {
			let data = await userRequester.send({
				type: "resetPassword",
				body: input,
				headers
			});
			return data;
		},
		forgetPassword: async (_, { input = {} }, { userRequester, headers }) => {
			let data = await userRequester.send({
				type: "forgetPassword",
				body: input,
				headers
			});
			return data;
		},
		createUser: async (_, { input }, { userRequester, headers }) => {
			return await userRequester.send({
				type: "createUser",
				body: input,
				headers
			});
		},
		updateUser: async (_, { input = {}, _id }, { userRequester, headers }) => {
			return await userRequester.send({
				type: "updateUser",
				body: input,
				_id,
				headers
			});
		},
		deleteUser: async (_, { input = {}, _id }, { userRequester, headers }) => {
			return await userRequester.send({
				type: "deleteUser",
				body: input,
				_id,
				headers
			});
		},
		changeProfile: async (_, { input = {} }, { userRequester, headers }) => {
			return await userRequester.send({
				type: "update",
				body: input,
				headers
			});
		},
		verifyEmail: async (_, { input }, { userRequester, headers }) => {
			return await userRequester.send({
				type: "verifyEmail",
				body: input,
				headers
			});
		},
		login: async (_, { input }, { userRequester }) => {
			return await userRequester.send({
				type: "login",
				body: input
			});
		},
		register: async (_, { input }, { userRequester }) => {
			return await userRequester.send({
				type: "register",
				body: input
			});
		}
	}
};

module.exports = {
	typeDef,
	resolvers
};
