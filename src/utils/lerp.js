// Smooth lerp utility for cinematic animations
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor
}

// Smooth camera movement
export const smoothCameraLerp = (current, target, factor = 0.05) => {
  return lerp(current, target, factor)
}

// Smooth rotation lerp
export const smoothRotationLerp = (current, target, factor = 0.1) => {
  return lerp(current, target, factor)
}

// Smooth position lerp
export const smoothPositionLerp = (current, target, factor = 0.08) => {
  return lerp(current, target, factor)
}
