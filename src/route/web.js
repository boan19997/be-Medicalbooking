import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import clinicController from "../controllers/cliniccontroller";

let router = express.Router();

let initWWebRouters = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/test', homeController.getTestPage);
    router.get('/crud', homeController.getCrudPage);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/read-crud', homeController.readCRUD)
    // edit
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/put-crud', homeController.putCRUD)
    // delete
    router.get('/delete-crud', homeController.deleteCRUD)

    //api
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUsers)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode', userController.getAllcode)

    //api cho homepage
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)

    //api manage-doctor
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.post('/api/send-remedy', doctorController.sendRemedy)

    //api component riêng (DoctorExtra)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)

    //api component profile doctor
    router.get('/api/get-profile-doctor-id', doctorController.getProfileDoctorById)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)

    //patient
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    //specialty
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)

    //clinic
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-all-clinic', clinicController.getAllClinic)
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById)



    return app.use("/", router);
}

module.exports = initWWebRouters;