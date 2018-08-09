import Q from 'q';
import Todo from './todo.model';

export default {
  getAll,
  update,
  create,
  remove
};

function getAll() {
  const deferred = Q.defer();

  Todo.find({}, (err, todos) => {
    if (err) deferred.reject(err);
    deferred.resolve(todos);
  });

  return deferred.promise;
}

function update(id, name, completed) {
  const deferred = Q.defer();
  const query = {};

  if (name) query.name = name;
  if (completed) query.completed = completed;

  if (Object.keys(query).length > 0) {
    Todo.update({ _id: id }, { $set: query }, (err, todo) => {
      if (err) deferred.reject(err);

      deferred.resolve(todo);
    });
  } else {
    // reject promise if name and completed information is missing
    deferred.reject({});
  }

  return deferred.promise;
}

function create(name) {
  const deferred = Q.defer();
  const todo = new Todo({ name });
  todo.save((err, savedTodo) => {
    if (err) deferred.reject(err);

    deferred.resolve(savedTodo);
  });

  return deferred.promise;
}

function remove(id) {
  const deferred = Q.defer();
  Todo.remove({ _id: id }, (err, todo) => {
    if (err) deferred.reject(err);

    deferred.resolve(todo);
  });

  return deferred.promise;
}
