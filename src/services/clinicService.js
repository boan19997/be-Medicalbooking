const db = require("../models")

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name || !data.imageBase64 || !data.address ||
                !data.descriptionHTML || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save clinic succeed!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll()

            //chuyển ảnh
            if (data && data.length > 0) {
                //conver hình ảnh 
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter bla bla!"
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })
                if (data) {
                    // có 2 cách để làm 1 là sử dụng thuộc tính model để mốc bảng 
                    //cách 2 sẽ query 2 lần 
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createClinic, getAllClinic, getDetailClinicById
}