const pool = require('../models/model');


const getavis = (req,res) => {
    pool.query("SELECT * FROM avis", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};



const getBestAvis = (req,res) => {
    pool.query("SELECT * FROM avis,company  where fk_company = id_company ORDER BY note_avis DESC FETCH FIRST 5 ROWS ONLY;", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getRecentAvis = (req,res) => {
    pool.query("SELECT * FROM avis,company  where fk_company = id_company ORDER BY date_avis DESC FETCH FIRST 5 ROWS ONLY;", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getoneAvis = (req,res) => {
    const idavis = Number(req.params.idavis);
    pool.query("SELECT text_avis,date_avis,title_avis,name_company,name_speciality, name_university ,email_student,note_avis FROM avis,company,speciality,student,university where fk_university = id_university and fk_company = id_company and fk_speciality = id_speciality and fk_student = id_student and id_avis = $1", [idavis],(error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getavisSorted = (req, res) => {
    const speciality = Number(req.params.idspec);
    const university = Number(req.params.iduniv);
    pool.query('SELECT id_avis,text_avis, date_avis,note_avis,title_avis,name_company FROM avis,company,student WHERE id_student = fk_student and id_company = fk_company  AND fk_speciality = $1  AND fk_university =$2 order by note_avis desc;', [speciality,university],(error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getavis,
    getBestAvis,
    getRecentAvis,
    getoneAvis,
    getavisSorted,
};