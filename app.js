const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({message: 'Hello from the server side!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can now access post method');
// });

const tours = JSON.parse( 
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res
    .status(200)
    .json({
        status: 'success',
        result: tours.length,
        requestedIn: req.requestTime,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1; //simply converting string into a number
    const tour = tours.find(el => el.id === id); //looping through tours array to find the same id and save into the binding

    if (!tour) {//if there is no tour (not found)
        return res
        .status(404)
        .json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour
        }
    });
};

const createTour =  (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    });
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
   
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    });
};

const deleteTour =  (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    //204 code means no content
    res.status(204).json({
        status: 'success',
        data: null
    });
}; 

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})