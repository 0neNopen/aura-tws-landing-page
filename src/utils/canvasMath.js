/**
 * Helper utility for object-fit: contain canvas drawing math.
 */
export function calculateContainDimensions(srcWidth, srcHeight, containerWidth, containerHeight) {
  const srcRatio = srcWidth / srcHeight;
  const containerRatio = containerWidth / containerHeight;
  
  let drawWidth = containerWidth;
  let drawHeight = containerHeight;
  
  if (containerRatio > srcRatio) {
    drawWidth = containerHeight * srcRatio;
  } else {
    drawHeight = containerWidth / srcRatio;
  }
  
  const x = (containerWidth - drawWidth) / 2;
  const y = (containerHeight - drawHeight) / 2;
  
  return { x, y, width: drawWidth, height: drawHeight };
}
