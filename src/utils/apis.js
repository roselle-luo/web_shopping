import instance from "@/utils/internet";

export const userRegister = async (username, password) => {
    const params = {
        name: username,
        password: password
    }
    return instance.get(`/user/register`, {params: params});
};

export const userLogin = async (username, password) => {
    const params = {
        name: username,
        password: password
    }
    return instance.get('/user/login', {params: params})
};

export const getLists = async () => {
    return (await instance.get(`/goods/list`)).data;
};
