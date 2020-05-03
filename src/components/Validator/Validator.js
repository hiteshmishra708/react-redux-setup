export const isVaild = (type, val) => {
    let re;
    switch (type) {
        case 'mobilenum':
            re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
            break;
        case 'pincode':
            re = /^[1-9][0-9]{5}$/;
            break;
        case 'Otp':
            re = /^\d{4}[1-9]*$/;
            break;
        case 'text':
            re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            break;
        case 'int':
            re = /^\d*[1-9]\d*$/;
            break;
        case 'only1num':
            re = /^([1-9]|1[0])$/;
            break;
        case 'notspace':
            re = /^(\w+\S+)$/;
            break;
        case 'email':
            re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            break;
        default:
            re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            break;
    }
    return val && re.test(val) && val.trim();
}

export const isEmpty = (val) => {
    return val && val.trim();
}

export const getNum = (val) => {
    if (val) return Number(val);
    return 0;
}

export const getFormattedDate = (date) => {
    if (date) {
        var datearray = date.split("/");
        return new Date(datearray[1] + '/' + datearray[0] + '/' + datearray[2]);
    } else {
        return null;
    }
}

export const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) token = sessionStorage.getItem("token");
    // console.log("token", token)
    return token
}

export const setToken = (token, isLocal) => {
    removeToken();
    if (!isLocal) {
        sessionStorage.setItem("token", token);
    } else {
        localStorage.setItem("token", token);
    }
}

export const removeToken = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
}

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const MENU = [
    { url: '/shop_list', option: 'Shop List', when: ['OrgAdmin'] },
    // { url: '/feedback_form', option: 'Feedback Form', when: ['OrgAdmin'] },
    { url: '/counter_list', option: 'Counter List', when: ['ShopAdmin'] },
    { url: '/cashier_list', option: 'Cashier List', when: ['ShopAdmin'] },
    { url: '/block_users', option: 'Blocked Users', when: ['OrgAdmin'] },
    // { url: '/statistics', option: 'Statistics', when: ['OrgAdmin', 'ShopAdmin'] },
    { url: '/create_edit', option: 'Create/Edit Details', when: ['OrgAdmin'] },
    { url: '/create_edit', option: 'Edit Details', when: ['ShopAdmin'] },
    { url: '/queue', option: 'Queue', when: ['Cashier'] },
    { url: '/booking', option: 'Booking', when: ['Cashier'] },
    { url: '/not_appeared', option: 'Not Appeared', when: ['Cashier'] },
    { url: '/reset_counter', option: 'Reset Counter', when: ['ShopAdmin'] },
    { url: '/login', option: 'Logout', when: ['OrgAdmin', 'ShopAdmin', 'Cashier'] },
];