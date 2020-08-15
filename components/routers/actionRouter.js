const express = require('express');
const Actions = require('../../data/helpers/actionModel.js');

const router = express.Router();

// Endpoints

// add a new action to a project
// must have a provided project_id
router.post('/', (req, res, next) => {
  Actions.get()
    .then(() => {
      if (!req.body.project_id || !req.body.description) {
        res.status(400).json({
          message: "Missing a required field"
        })
      } else {
        Actions.insert(req.body)
          .then(action => {
            res.status(200).json(action)
          })
          .catch(err => {
            console.log("Error: ", err);
            res.status(500).json({
              message: "Could not add action"
            })
          })
      }
    })
    .catch(next)
})

router.get('/', (req, res) => {
  res.status(200).json({
    message: "No actions can be provided without a project_id"
  })
})

// get action by id
router.get('/:id', validateId(), (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(500).json({
        message: "Could not retrieve action with this id"
      })
    })
})

// update action by id
router.put('/:id', validateId(), (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(updatedAction => {
      res.status(200).json(updatedAction)
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "Could not update action"
      })
    })
})

// delete action by id
router.delete('/:id', validateId(), (req, res) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "Action removed from database"
      })
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({
        message: "Could not remove action"
      })
    })
})

// Middleware

function validateId() {
  return (req, res, next) => {
    Actions.get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action
          next();
        } else {
          res.status(400).json({
            message: "Invalid id"
          })
        }
      })
      .catch(next)
  }
}

module.exports = router;