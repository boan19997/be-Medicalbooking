import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            resolve('Đã lưu thành công')

        } catch (e) {
            reject(e);
        }
    })

    console.log('data trong file service')
    console.log(data)
    console.log(hashPasswordFromBcrypt)
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hasPassword = await bcrypt.hashSync(password, salt);
            resolve(hasPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let readAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getInfoById = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // tìm id của user trong database
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            // sau khi tìm đc thì đẩy cái đã sửa vào và lưu lại
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUser = await db.User.findAll()
                resolve(allUser);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }

            resolve()
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    readAllUser: readAllUser,
    getInfoById: getInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,

}