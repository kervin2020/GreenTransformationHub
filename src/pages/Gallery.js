import React from "react";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: "/images/gallery/project1.jpg",
      title: "Transformation d'un parking",
      description: "Un ancien parking transformé en jardin communautaire",
    },
    {
      id: 2,
      image: "/images/gallery/project2.jpg",
      title: "Toit vert urbain",
      description: "Installation of a green roof on a commercial building",
    },
    {
      id: 3,
      image: "/images/gallery/project3.jpg",
      title: "Corridor vert",
      description: "Création d'un corridor écologique en milieu urbain",
    },
  ];

  return (
    <div className="gallery-page">
      <section className="gallery-section">
        <div className="container">
          <h1>Nos Réalisations</h1>
          <div className="gallery-grid">
            {galleryItems.map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.image} alt={item.title} />
                <div className="gallery-item-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
