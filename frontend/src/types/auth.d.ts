export type Login = {
    email: string;
    password: string;
};

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type Register = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
};
