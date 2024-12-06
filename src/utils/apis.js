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

export const addItem = async (userId, goodsId, num, price) => {
    const params = {
        userId: userId,
        goodsId: goodsId,
        num: num,
        price: price
    }
    return (await instance.get(`/cart/add`,{params: params})).data;
}

export const getUserAddedItems = async (userId) => {
    const params = {
        userId: userId
    }
    return (await instance.get(`/cart/listByUser`,{params: params})).data;
};

export const deleteItem = async (userId, cartId) => {
    const param = {
        userId: userId,
        cartId: cartId
    }
    return (await instance.get('/cart/deleteById', {params: param})).data
}

export const addItemNumber = async (userId, goodsId, price) => {
    const currentItems = await getUserAddedItems(userId)
    const targetItem = currentItems.find(item => item.goodsId === goodsId)
    if (targetItem == null) {
        await addItem(userId, goodsId, 1, price)
        return
    }
    const newNum = parseInt(targetItem.num) + 1
    const newPrice = parseFloat(targetItem.price) + parseFloat(targetItem.price)
    await deleteItem(userId, targetItem.cardid)
    await addItem(userId, goodsId, newNum.toString(), newPrice.toString())
}
