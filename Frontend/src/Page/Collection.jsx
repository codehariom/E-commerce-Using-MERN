import React, { useEffect, useState } from "react";

function Collection() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const placeholderProduct = [
        {
          id: 1,
          name: "T-shirt",
          price: 250,
          img: [
            {
              url: "https://picsum.photos/200?random=12",
            },
          ],
        },
        {
          id: 2,
          name: "Shirt",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/200?random=13",
            },
          ],
        },
        {
          id: 3,
          name: "Top",
          price: 350,
          img: [
            {
              url: "https://picsum.photos/200?random=14",
            },
          ],
        },
        {
          id: 4,
          name: "Saree",
          price: 550,
          img: [
            {
              url: "https://picsum.photos/200?random=15",
            },
          ],
        },
        {
          id: 6,
          name: "T-shirt",
          price: 250,
          img: [
            {
              url: "https://picsum.photos/200?random=16",
            },
          ],
        },
        {
          id: 7,
          name: "Shirt",
          price: 150,
          img: [
            {
              url: "https://picsum.photos/200?random=17",
            },
          ],
        },
        {
          id: 8,
          name: "Top",
          price: 350,
          img: [
            {
              url: "https://picsum.photos/200?random=18",
            },
          ],
        },
        {
          id: 9,
          name: "Saree",
          price: 550,
          img: [
            {
              url: "https://picsum.photos/200?random=19",
            },
          ],
        },
      ];
    });
  });
  return <div>Collection</div>;
}

export default Collection;
