import TodoDa from './todo.da';

export default {
    getAll,
    update,
    create,
    remove
};

function getAll(req, res) {
    TodoDa.getAll()
        .then((todos) => { res.status(200).json(todos); })
        .catch(() => { res.sendStatus(422); });
}

function update(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const completed = req.body.completed;

    TodoDa.update(id, name, completed)
        .then(() => { res.sendStatus(200); })
        .catch(() => { res.sendStatus(422); });
}

function create(req, res) {
    const name = req.body.name;

    TodoDa.create(name)
        .then((todo) => { res.status(200).json(todo); })
        .catch(() => { res.sendStatus(422); });
}

function remove(req, res) {
    const id = req.params.id;

    TodoDa.remove(id)
        .then(() => { res.sendStatus(200); })
        .catch(() => { res.sendStatus(422); });
}
