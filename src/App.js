import React from 'react';
import { Carousel } from 'react-bootstrap';

function App() {
  const slides = Array.from(document.querySelectorAll('#slides .slide'));
  return (
    <div className="App">
      <Carousel
        interval={null}
        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      >
        {slides.map((slide, id) => (
          <Carousel.Item
            key={id}
            dangerouslySetInnerHTML={{ __html: slide.innerHTML }}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default App;
