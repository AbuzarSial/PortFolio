// Utility for mouse tilt effects on cards and sections

/**
 * Calculates tilt values based on mouse position relative to element
 * @param {MouseEvent} e - Mouse event
 * @param {HTMLElement} element - Target element
 * @param {number} maxTilt - Maximum tilt angle in degrees (default: 5)
 * @returns {Object} - { rotateX, rotateY, translateZ }
 */
export function calculateTilt(e, element, maxTilt = 5) {
  if (!element) return { rotateX: 0, rotateY: 0, translateZ: 0 }
  
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const mouseX = e.clientX - centerX
  const mouseY = e.clientY - centerY
  
  const rotateY = (mouseX / (rect.width / 2)) * maxTilt
  const rotateX = -(mouseY / (rect.height / 2)) * maxTilt
  const translateZ = Math.abs(mouseX / rect.width) * 8 + Math.abs(mouseY / rect.height) * 8
  
  return {
    rotateX: Math.max(-maxTilt, Math.min(maxTilt, rotateX)),
    rotateY: Math.max(-maxTilt, Math.min(maxTilt, rotateY)),
    translateZ: Math.min(translateZ, 12),
  }
}
