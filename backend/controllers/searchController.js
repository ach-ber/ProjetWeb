const pool = require('../models/model');

const getCompany = (req, res) => {
    pool.query("select id_company as value, name_company as label from company", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
  };

const getuniversity = (req, res) => {
pool.query("select id_university as value, name_university as label from university", (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
});
};

const getspeciality = (req, res) => {
pool.query("select id_speciality as value, name_speciality as label from speciality", (error,results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
});
};

module.exports = {
    getCompany,
    getuniversity,
    getspeciality
};
  