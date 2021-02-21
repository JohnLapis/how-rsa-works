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
        indicators={false}
        touch={false}
        prevIcon={<img
                    src="/css/chevron-left.svg"
                    alt="prev slide"
                    className="position-fixed"
                    width="50"
                    height="75"
                  />}
        nextIcon={<img
                      src="/css/chevron-right.svg"
                      alt="next slide"
                      className="position-fixed"
                      width="50"
                      height="75"
                  />}
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
