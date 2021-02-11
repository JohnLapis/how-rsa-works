export default function NextButton(props) {
  section = get_somehow_current_section()
  nextSectionId = "section-" + (+section.match(/section-(\d+)/)[1] + 1)
  nextSection = docs.querySelector(`#${nextSectionId}`)
  if (nextSection) transition(section, nextSection)
}
