'use strict';
var Sequelize = require('sequelize');
var Student = require('./student.js')
var db = require('../index.js');


module.exports = db.define('campus', {
  name: Sequelize.STRING,
  imgURL: Sequelize.STRING
},{
  hooks: {
    beforeDestroy: (campus) => {
      Student.findAll({
        where: {
          campusId: campus.id
        }
      }).then(function(students){
        students.forEach(student => {
          student.update({campusId: null});
        });
      });
    }
  }
});
