'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_Infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            //tất cả các trường id ko cho null nên thêm dòng allNull:false
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            specialtyId: {
                type: Sequelize.INTEGER,
            },
            clinicId: {
                type: Sequelize.INTEGER,
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING
            },
            //riêng trường giá này cần set cho bằng 0
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Doctor_Infor');
    }
};