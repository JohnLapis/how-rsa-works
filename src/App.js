import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Carousel, Container, ListGroup, Button,
} from 'react-bootstrap';

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
            dangerouslySetInnerHTML={{__html: slide.innerHTML}}>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

function App2() {
  const [inProp, setInProp] = useState(false);
  return (
    <div className="App">
      {/* <TransitionGroup> */}
      {/* </TransitionGroup> */}
      {inProp && alert('hey')}
      <CSSTransition in={inProp} timeout={10000} classNames="my-node" appear>
        <ListGroup.Item>
          text supposeddly text supposeddly text supposeddly
        </ListGroup.Item>
      </CSSTransition>
      <button onClick={() => setInProp(true)}> &times; some buttontotnotto </button>
      <hr />
      <hr />
    </div>
  );
}

export default App;
