const pool = require('../models/model');

/* ------------------------- Controller concernant les routes student ------------------------- */

const getAvisofoneStudent = (req,res) => {
  const id = Number(req.params.id)
  pool.query("SELECT * FROM avis,company  where fk_company = id_company and fk_student ="+id, (error,results) => {
      if (error) throw error;
      if (results.rows == '') {
        return res.status(404).send('Aucun avis trouvé pour cet étudiant!');
      }
      else {
        res.status(200).json(results.rows);
      }
  });
};

const getoneAvisofoneStudent = (req,res) => {
  const id = Number(req.params.id);
  const idavis = Number(req.params.idavis);
  pool.query("SELECT text_avis as avistext, date_avis as date,note_avis as note,title_avis as title FROM avis WHERE fk_student ="+id+" AND id_avis ="+idavis, (error,results) => {
      if (error) throw error;
      if (results.rows == '') {
        return res.status(404).send('Aucun avis trouvé pour cet étudiant et cet idavis !');
      }
      else {
        res.status(200).json(results.rows);
      }
  });
};


const getStudents = (req,res) => {
    pool.query("SELECT * FROM student", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getoneStudent = (req,res) => {
  const id = req.params.id;
  pool.query("SELECT firstname_student,lastname_student, email_student FROM student WHERE id_student ="+id, (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

  
const getStudentsemail = (req, res) => {
  pool.query("select email_student as email from student", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};
  


module.exports = {
    getAvisofoneStudent,
    getoneAvisofoneStudent,
    getStudents,
    getoneStudent,
    getStudentsemail
};
  
  
  
