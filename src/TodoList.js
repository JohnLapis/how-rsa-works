import React, { useState } from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Container, ListGroup, Button} from 'react-bootstrap'

export default function TodoList() {
  const [items, setItems] = useState([
    { id: "a", text: 'Buy eggs' },
    { id: "ab", text: 'Pay bills' },
    { id: "abc", text: 'Invite friends over' },
    { id: "abcd", text: 'Fix the TV' },
  ]);
  return (
    <Container>
      <ListGroup style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="todo-list">
          {items.map(({ id, text }) => (
            <CSSTransition
              key={id}
              timeout={500}
              /* classNames="item" */
              classNames="slide-test"
            >
              <ListGroup.Item>
                <Button
                  className="remove-btn"
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setItems(items =>
                      items.filter(item => item.id !== id)
                    )
                  }
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      <Button
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems(items => [
              ...items,
              { id: "aa", text },
            ]);
          }
        }}
      >
        Add Item
      </Button>
    </Container>
  );
}
