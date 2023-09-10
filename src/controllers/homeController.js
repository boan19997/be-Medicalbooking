import db from "../models/index"
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll() //tìm tất cả dữ liệu trong bảng user
        return res.render('homepage.ejs', { //ko cần đường link do trong file viewEngine đã quy định khúc đầu của link
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}

let getTestPage = (req, res) => {
    return res.render('test.ejs')
}

let getCrudPage = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('Chúc mừng Nguyễn Đạt đã POST CRUD thành công')
}

let readCRUD = async (req, res) => {
    let data = await CRUDService.readAllUser();
    return res.render('readCRUD.ejs', {
        dataTable: data
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getInfoById(userId)
        // check user data not found
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('User not found!')
    }

}
//1 Object lun có 1 key, value trong js

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data)
    return res.render('readCRUD.ejs', {
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    // khi dùng chấm hỏi trên thanh địa chỉ thì sử dụng req.query

    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Chúc mừng Nguyễn Đạt đã Delete được!')
    } else {
        return res.send('User not found!')
    }

}

module.exports = {
    getHomePage: getHomePage,
    getTestPage: getTestPage,
    getCrudPage: getCrudPage,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}