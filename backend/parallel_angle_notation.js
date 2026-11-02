// Normalize the angle names used by Lesson 9, including indexed names like A_1.
// Applying this to stored JSON preserves keys, option IDs and numerical values.
function overheadAngles(value) {
  if (typeof value === 'string') {
    return value.replace(/\\angle\s*([A-Za-z]+(?:_(?:\{[^{}]*\}|[A-Za-z0-9]))?)/g, '\\widehat{$1}');
  }
  if (Array.isArray(value)) return value.map(overheadAngles);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, overheadAngles(item)]));
  }
  return value;
}

module.exports = { overheadAngles };
