import React, { Component } from 'react';

export default function PrevButton(props) {
  section = get_somehow_current_section()
  prevSectionId = "section-" + (+section.match(/section-(\d+)/)[1] - 1)
  prevSection = docs.querySelector(`#${prevSectionId}`)
  if (prevSection) transition(section, prevSection)
}
