import React from 'react';
import { Carousel } from 'react-bootstrap';

function App() {
  const slides = Array.from(
    document.querySelectorAll('#slides .slide'),
  ).map((slide) => slide.innerHTML);
  return (
    <div className="App">
      <Carousel
        interval={null}
        indicators={true}
        controls={false}
        touch={false}
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
