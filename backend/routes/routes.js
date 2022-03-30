/* --------------------------- importation controller --------------------------- */

const { Router } = require('express');
const avis = require('../controllers/avisController');
const student = require('../controllers/studentController');
const search = require('../controllers/searchController');
const user = require('../controllers/userController');
const router = Router();
const auth = require('../middleware/authentification.js');

/* --------------------------- avis routes --------------------------- */

router.get("/avis", avis.getavis);
router.get("/Bestavis", avis.getBestAvis);
router.get("/Recentavis", avis.getRecentAvis);
router.get("/avis/:idavis", avis.getoneAvis);
router.get("/avis/:idspec/:iduniv", avis.getavisSorted);

/* --------------------------- student routes --------------------------- */

router.get("/student/:id/avis", student.getAvisofoneStudent);
router.get("/student/:id/avis/:idavis", student.getoneAvisofoneStudent);
router.get("/studentemail", student.getStudentsemail);
router.get("/student", student.getStudents);
router.get("/student/:id", student.getoneStudent);

/* --------------------------- search routes --------------------------- */

router.get("/company", search.getCompany);
router.get("/speciality", search.getspeciality);
router.get("/university", search.getuniversity);

/* --------------------------- user routes --------------------------- */

router.post("/createStudent", user.createStudent);
router.post("/login", user.loginStudent);
router.post("/createavis", auth,user.createAvis);
router.post("/createcompany", auth,user.createCompany);
router.put("/student/:id/avis/:idavis",auth,user.modifyAvis);
router.delete("/student/:id/avis/:idavis", auth,user.deleteAvis);


module.exports = router;