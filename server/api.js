'use strict'
const api = require('express').Router()
const db = require('../db')
const models = require('../db/models');
const User = models.User;
const Student = models.Student;
const Campus = models.Campus;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/campuses', function(req, res, next){
	Campus.findAll({})
	.then(function(foundCampuses){
		res.json(foundCampuses);
	});
});

api.get('/campuses/:id', function(req, res, next){
	const id = req.params.id;
	Campus.findById(id)
	.then(function(foundCampus){
		res.json(foundCampus)
	});
});

api.get('/students', function(req, res, next){
	Student.findAll({})
	.then(function(foundStudents){
		res.json(foundStudents);
	})
});

api.get('/students/:id', function(req, res, next){
	const id = req.params.id;
	Student.findById(id)
	.then(function(foundStudents){
		res.json(foundStudents);
	})
});

api.post('/campuses', function(req, res, next){
	console.log('reached campuses POST!');
	Campus.create(req.body)
	.then(function(newCampus){
		res.json(newCampus);
	})
});

api.post('/students', function(req, res, next){
	const campusId = req.body.campusId;
	Student.create(req.body.student)
	.then(function(newStudent){
		newStudent.setCampus(campusId);
		res.json(newStudent);
	})
});

api.put('/students/:id', function(req, res, next){
	const id = req.params.id;
	const newName = req.body.newName; // CHANGE THIS AND THE ABOVE TO DESTRUCTURING!!!
	const newCampus = req.body.newCampus;
	Student.findById(id)
	.then(function(student){
		student.update({
			name: newName || student.name,
			campusId: newCampus || student.campus
		});
		res.send(student);
	});
});

api.put('/campuses/:id', function(req, res, next){
	console.log('reached campus info PUT!');
	const id = req.params.id;
	Campus.findById(id)
	.then(function(campus){
		campus.update({/* ADD IN THE APPROPRIATE OBJECT HERE! */});
	});
});

api.delete('/campuses/:id', function(req, res, next){
	console.log('reached campus DELETE!');
	const id = req.params.id;
	Campus.findById(id)
	.then(function(campus){
		campus.destroy();
		res.send('Campus deleted');
	});
});

api.delete('/students/:id', function(req, res, next){
	const id = req.params.id;
	Student.findById(id)
	.then(function(student){
		student.destroy();
		res.send('Student deleted');
	});
});

module.exports = api;