const fs = require('fs');

const tours = JSON.parse( 
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour =  (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour =  (req, res) => {
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