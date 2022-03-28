
const pool = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createStudent = (req, res) => {
  
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const speciality = req.body.speciality;
    const university = req.body.university;
    const email = req.body.email;
    const password = bcrypt.hash(req.body.password, 10);
  
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const password = hash;
        pool.query('INSERT INTO student ( firstname_student, lastname_student, fk_university, fk_speciality,email_student,passhash_student) VALUES ($1,$2,$3,$4,$5,$6)', 
        [firstname,lastname,university,speciality,email,password], (error, results) => {
          if (error) {
            throw error
          }
          res.status(201).send(`student added: ${email}`)
      })
    }).catch(error => res.status(500).json({ error }));
  };
  
  
  const loginStudent = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query('SELECT * FROM student WHERE email_student = $1',[email], (error, results) => {
      if (error) {
        throw error
      };
      if (results.rows == '') {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      else {
        // return res.status(201).send(results.rows[0].passhash_student)
        bcrypt.compare(password, results.rows[0].passhash_student)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: results.rows[0].id_student,
            token: jwt.sign(
              { userId: results.rows[0].id_student },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '1h' }
            )
            });
        })
      }
    });
  };
  
  const createAvis = (req, res) => {
    const avis = req.body.avis;
    const date = req.body.date;
    const ids = req.body.ids;
    const idc = req.body.idc;
    const note = req.body.note;
    const title = req.body.title;
    pool.query('INSERT INTO avis ( text_avis, date_avis, fk_student, fk_company, note_avis, title_avis) VALUES ($1, $2, $3, $4, $5,$6)', [ avis,date,ids,idc,note,title], (error,results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`idavis added: ${ids}`);
  });
  };
  
  const createCompany = (req, res) => {
  const name = req.body.name;
  pool.query('INSERT INTO company (name_company) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`company added: ${name}`)
  })
  };
  
  
  const modifyAvis = (req, res) => {
    const id = Number(req.params.id);
    const idavis = Number(req.params.idavis);
    const avis = req.body.text;
    const titre = req.body.title;
    const note = req.body.note;
    const date = req.body.date;
    pool.query('UPDATE avis SET text_avis = $1, title_avis= $2, note_avis= $3, date_avis= $4 WHERE id_avis = $5 AND fk_student = $6',[avis,titre,note,date,idavis,id] ,(error,results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`avis modify: ${idavis}`);
  });
  };
  
  const deleteAvis = (req, res) => {
    const id = Number(req.params.id);
    const idavis = Number(req.params.idavis);
    pool.query(" DELETE FROM avis WHERE id_avis ="+idavis+"AND fk_student ="+id, (error,results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`avis delete : ${idavis}`);
    });
  };
  

  module.exports = {
    createStudent,
    loginStudent,
    createAvis,
    createCompany,
    modifyAvis,
    deleteAvis
};
  