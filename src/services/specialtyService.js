const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name || !data.imageBase64 ||
                !data.descriptionHTML || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save specialty succeed!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()

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
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter bla bla!"
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                })
                if (data) {
                    // có 2 cách để làm 1 là sử dụng thuộc tính model để mốc bảng 
                    //cách 2 sẽ query 2 lần 
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    } else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialty, getAllSpecialty, getDetailSpecialtyById
}