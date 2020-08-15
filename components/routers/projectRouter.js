const express = require('express');
const Projects = require('../../data/helpers/projectModel.js');

const router = express.Router();

// Endpoints

// CREATE add a new project
router.post('/', validateProject(), (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log('Error: ', err)
      res.status(500).json({
        message: "Could not create project"
      })
    })
})

// READ get all projects
router.get('/', async (req, res) => {
    const projectList = await Projects.get();
    if (projectList) {
        return res.status(200).json(projectsList);
	} else {
		return res
			.status(500)
			.json({ error: "The list of projects could not be retrieved." });
	}
})

//   Projects.get()
//     .then(projects => {
//       res.status(200).json(projects)
//     })
//     .catch(err => {
//       console.log('Errror: ', err);
//       res.status(500).json({
//         message: "Could not retrieve list of projects"
//       })
//     })
// })

// get project by id
router.get('/:id', validateId(), (req, res) => {
  res.status(200).json(req.project)
})

// get all project actions
router.get('/:id/actions', validateId(), (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(500).json({
        message: "Could not retrieve project actions"
      })
    })
})

// UPDATE project by id
router.put('/:id', validateId(), (req, res) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(500).json({
        message: "Could not update project, please ensure all fields are filled out"
      })
    })
})

// DELETE project
router.delete('/:id', validateId(), (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(500).json({
        message: "Could not remove project"
      })
    })
})

// custom middleware 

function validateId() {
  return (req, res, next) => {
    if (req.params.id) {
      Projects.get(req.params.id)
        .then(project => {
          if (project) {
            req.project = project
            next()
          } else {
            res.status(400).json({
              message: "Invalid project id"
            })
          }
        })
        .catch(err => {
          console.log("Error: ", err)
          res.status(500).json({
            message: "Problem retrieving project"
          })
        })
    } else {
      res.status(400).json({
        message: "No project id provided"
      })
    }
  }
}

function validateProject() {
  return (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      res.status(400).json({
        message: "Please provide both name and description"
      })
    } else {
      next();
    }
  }
}

module.exports = router;
