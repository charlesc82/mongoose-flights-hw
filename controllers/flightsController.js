const { Flight, Destinations } = require("../models/flightsModel");

module.exports.index = async (req, res) => {
  // const flights = await Flight.find().sort({ createdAt: 1 })
  try {
    const flightData = await Flight.find();
    res.render("flights/Index", { flight: flightData });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.new = async (req, res) => {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  console.log("dt", dt);
  console.log(newFlight);
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/New", { departsDate });
};
// module.exports.new = (req, res) => {
//   const newFlight = new Flight({
//     airline: req.body.airline,
//     flightNo: req.body.flightNo,
//     departs: req.body.departs,
//     airport: req.body.airport,
//   });

//   // Obtain the default date
//   const dt = newFlight.departs;
//   // Format the date for the value attribute of the input
//   const departsDate = dt.toISOString().slice(0, 16);
//   res.render("flights/New", { departsDate });
// };

// Those anonymous callback functions now have names: "index" and "show"
module.exports.show = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate(
      "destinations"
    );
    res.render("flights/Show", { flight });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};
// Create to add new flights
module.exports.create = async (req, res) => {
  try {
    await Flight.create(req.body);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
  res.redirect("/flight");
};
