const express = require('express');

const helmet = require('helmet');

const logger = require('morgan');

/////Import of Models from Data Directory.....ensure correct
///paths here first as debugging

const notesModel = require('./data/helpers/notesModel');


const server = express();

////// ++++++++MIDDLEWARE +++++++//////////

server.use(
    express.json(),
    logger(":method :url :status :response-time ms"),
    helmet()
    );

////////////+++ProjectModel Routes++++/////////////////////////////

server.get('/', (req, res) => {
    res.send("It's note time, sonny");
  });

server.post('/notes', (req, res) => {
    const {name, description} = req.body;
    const newNote = { name, description };
    console.log(req.body);
    notesModel
    .insert(newNote)
    .then(noteId => {
        const { id } = noteId;
        console.log("id", typeof(id));
        notesModel
        .get( id )
        .then(note => {
            console.log("project", note);
            if(!note) {
                return res
                .status(422)
                .send({ Error: `Note ID ${id} not found`});
            }
        res.status(201).json(note);
        });
    })
    .catch(err => console.log(err))
});

server.get('/notes', (req, res) => {
    notesModel
    .get()
    .then(notes => {
        console.log(`\n** notes **`, notes);
    res
    .json(notes)
    })
    .catch(err => res.send(err))
});

// server.get('/projects/:id/actions', (req, res) => {
//     console.log(req.query);
//     const { id } = req.params;
    
//     projectModel
//     .get(id)
//     .then(projects => {
//         res
//         .json(projects)
//     })
//     .catch(err => res.send(err))
// });

server.put('/notes/:id', (req, res) => {
    console.log(req.query);
    const { id } = req.params;
    const { name } = req.body;
    const note = { name, id};

    noteModel
    .update(id, note)
    .then(editedNote => {
        noteModel
        .get(id)
        .then(foundNote => res.status(200).send(foundNote))
    })
        .catch(err => res.status(500).send(err,"null"));
});

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    noteModel
    .remove(id)
    .then(removedNote => {
        console.log(removedNote);
        res
        .status(200).send(`Note ID ${id} has been deleted.`)
    })
    .catch(err => res.status(500).send(`There has been an error.`))
});



/////////actionModel Routes///////////////

// server.post('/actions', (req, res) => {
//     const { project_id, description, notes } = req.body;
//     const newAction = { project_id, description, notes };
//     console.log(newAction);
//     actionModel
//     .insert(newAction)
//     .then(actionId => {
//         const { id } = actionId;
//         console.log("id", typeof(id));
//         actionModel
//         .get( id )
//         .then(action => {
//             console.log("action", action);
//             if(!action) {
//                 return res
//                 .status(422)
//                 .send({ Error: `ID ${id} not found`});
//             }
//         res.status(201).json(action);
//         });
//     })
//     .catch(err => console.log(err))
// });

// server.get('/actions', (req, res) => {
//     actionModel
//     .get()
//     .then(actions => {
//         console.log(`\n** actions **`, actions);
//     res
//     .json(actions)
//     })
//     .catch(err => res.send(err))
// });

// server.put('/actions/:id', (req, res) => {
//     console.log(req.query);
//     const { id } = req.params;
//     const { description } = req.body;
//     const action = { description, id};

//     actionModel
//     .update(id, action)
//     .then(editedAction => {
//         actionModel
//         .get(id)
//         .then(foundAction => res.status(200).send(foundAction))
//     })
//         .catch(err => res.status(500).send(null));
// });

// server.delete('/actions/:id', (req, res) => {
//     const { id } = req.params;
//     actionModel
//     .remove(id)
//     .then(removedAction => {
//         console.log(removedAction);
//         res
//         .status(200).send(`ID ${id} has been deleted.`)
//     })
//     .catch(err => res.status(500).send(`Error Ya'll`))
// });
  


  
  const port = 9000;
  server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
  });