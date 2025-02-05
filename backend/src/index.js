import express from "express";

const app = express();

app.use(express.json());

const hotels = [
  {
    _id: "1",
    name: "The Grand Hotel",
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    reviews: "2049",
    price: "600",
  },
  {
    _id: "2",
    name: "Hotel Luxe",
    location: "London, UK",
    image:
      "https://media.glamourmagazine.co.uk/photos/673dde53f0a4ec2b20b6076e/master/w_1600%2Cc_limit/COURTYARD_DUSK_135698073_V2.jpg",
    rating: 4.7,
    reviews: "1927",
    price: "400",
  },
  {
    _id: "3",
    name: "Hotel Crown",
    location: "Paris, France",
    image:
      "https://media.architecturaldigest.com/photos/665dd5b2fec3359240899bf5/16:9/w_1600,c_limit/jcr_content%20(1).jpeg",
    rating: 4.9,
    reviews: "1899",
    price: "300",
  },
  {
    _id: "4",
    name: "Hotel H4",
    location: "Berlin, Germany",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/118769167.jpg?k=405c933b82a50bbe1def3660ba4252ba1e1ebf406b6b4277490c2c4674ddf8c4&o=&hp=1",
    rating: 4.8,
    reviews: "1865",
    price: "500",
  },
  {
    _id: "5",
    name: "Hotel Estate",
    location: "Tokyo, Japan",
    image:
      "https://nightscape.tokyo/en/wp-content/uploads/2023/01/prince-hotel-room-02-1-1024x683.jpg",
    rating: 4.6,
    reviews: "1900",
    price: "700",
  },
  {
    _id: "6",
    name: "Hotel Residence",
    location: "Sydney, Australia",
    image:
      "https://www.crownsydney.com.au/getmedia/cb0ecca8-0dbf-49f4-8735-6a9999ef9ba6/210225-Crown-Sydney-Hotel-Deluxe-King-Room-4961x3307.jpg?width=1800",
    rating: 4.5,
    reviews: "1910",
    price: "800",
  },
];

app.get("/", (req, res) => {
  res.send(hotels);
});

app.get("/:id", (req, res) => {
  const hotel = hotels.find((hotel) => hotel._id === req.params.id);
  // const hotel = hotels.filter((hotel) => hotel._id === req.params.id)
  if (!hotel) {
    return res.status(404).send("Hotel not found");
  }
  res.status(200).send(hotel);
});

app.post("/", (req, res) => {
  const hotel = req.body;
  console.log(hotel);

  res.status(200).send(hotel);
});


app.delete("/:id", (req, res) => {
  const hotelId = req.params.id;

  const index = hotels.findIndex((hotel) => hotel._id === hotelId);
  if (index === -1) {
    return res.status(404).send("Hotel not found");
  }
  hotels.splice(index, 1);

  res.status(200).json({"message" : "hotel deleted successfully"})
});

app.put("/:id", (req, res) => {
  const hotelId = req.params.id;
  const updatedHotel = req.body;

  hotels.filter((hotel) => {
    if (hotel._id === hotelId) {
      hotel.name = updatedHotel.name;
      hotel.location = updatedHotel.location;
      hotel.image = updatedHotel.image;
      hotel.rating = updatedHotel.rating;
      hotel.reviews = updatedHotel.reviews;
      hotel.price = updatedHotel.price;
    } 
  })

  res.status(200).json(hotels.find((hotel) => hotel._id === hotelId))
});

app.listen(3000, console.log("server listening on port 3000"));
