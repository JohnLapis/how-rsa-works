import React from 'react';
import { Carousel } from 'react-bootstrap';

function App() {
  const slides = Array.from(
    document.querySelectorAll('#slides .slide')
  ).map((slide) => slide.innerHTML);
  return (
    <div className="App container">
      <Carousel
        interval={null}
        nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      >
        {slides.map((slide, id) => (
          <Carousel.Item
            key={id}
            dangerouslySetInnerHTML={{ __html: slide }}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default App;
