const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];


const text = `SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students JOIN cohorts on students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2`;


// pool.query(`
// SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
// FROM students JOIN cohorts on students.cohort_id = cohorts.id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};
// `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`)
//     })
//   })
//   .catch(err => console.error('query error', err.stack));

pool
  .query(text, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`);
    });
  })
  .catch(e => console.error(e.stack))