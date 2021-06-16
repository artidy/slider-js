export function createElement(tagName, selector, html = '') {
  const element = document.createElement(tagName)
  element.classList.add(...selector)
  element.innerHTML = html
  return element
}