export default function hotelsAvailables() {
  const hotels = [
    {
      id: 1,
      name: "Driven Resort",
      accommodationsType: ["Single", "Double"],
      beds: 103,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    },
    {
      id: 2,
      name: "Driven Palace",
      accommodationsType: ["Single", "Double", "Triple"],
      beds: 25,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f7/8b/38/exterior.jpg?w=900&h=-1&s=1",
    },
    {
      id: 3,
      name: "Driven World",
      accommodationsType: ["Single", "Double"],
      beds: 2,
      image:
        "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg",
    },
  ];
  return hotels;
}
