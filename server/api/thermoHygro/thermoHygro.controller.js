/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/thermoHygros              ->  index
 * POST    /api/thermoHygros              ->  create
 * GET     /api/thermoHygros/:id          ->  show
 * PUT     /api/thermoHygros/:id          ->  update
 * DELETE  /api/thermoHygros/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ThermoHygro from './thermoHygro.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ThermoHygros
export function index(req, res) {
  var now = new Date();
  req.y = req.y || now.getFullYear();
  req.m = req.m - 1 || now.getMonth();
  req.d = req.d || now.getDate();
  var startAt = new Date(req.y, req.m, req.d, 0);
  var endAt   = new Date(req.y, req.m, req.d, 24);
  return ThermoHygro.find({createAt: {$gte: startAt, lt: endAt}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ThermoHygro from the DB
export function show(req, res) {
  return ThermoHygro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ThermoHygro in the DB
export function create(req, res) {
  return ThermoHygro.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ThermoHygro in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return ThermoHygro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ThermoHygro from the DB
export function destroy(req, res) {
  return ThermoHygro.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
