/**
 * Parse version labels into a tree structure based on naming conventions.
 *
 * Conventions:
 *   "A"      → root (single letter)
 *   "F1"     → parent "F"  (letter + number)
 *   "F3-A"   → parent "F3" (dash-separated, parent is everything before last dash)
 *   "R2-C"   → parent "R2"
 */

export function parseParent(label) {
  if (!label) return null

  // Contains a dash → parent is everything before the last dash
  if (label.includes('-')) {
    return label.slice(0, label.lastIndexOf('-'))
  }

  // Letter(s) followed by digit(s) → parent is the letter prefix
  const match = label.match(/^([A-Za-z]+)(\d+)$/)
  if (match) {
    return match[1]
  }

  // Single letter or any other root-level label → no parent
  return null
}

export function buildTree(versions) {
  const byLabel = new Map()
  versions.forEach((v) => byLabel.set(v.label, { ...v, children: [] }))

  const roots = []

  versions.forEach((v) => {
    const parentLabel = parseParent(v.label)
    const node = byLabel.get(v.label)

    if (parentLabel && byLabel.has(parentLabel)) {
      byLabel.get(parentLabel).children.push(node)
    } else {
      roots.push(node)
    }
  })

  // Sort children by createdAt within each group
  function sortChildren(node) {
    node.children.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    node.children.forEach(sortChildren)
  }
  roots.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  roots.forEach(sortChildren)

  return roots
}

export function flattenTree(tree, depth = 0, parentLabels = []) {
  const result = []

  tree.forEach((node, idx) => {
    const isLastChild = idx === tree.length - 1
    result.push({
      label: node.label,
      notes: node.notes,
      isMain: node.isMain,
      createdAt: node.createdAt,
      depth,
      hasChildren: node.children.length > 0,
      isLastChild,
      parentLabels: [...parentLabels],
    })
    if (node.children.length > 0) {
      result.push(...flattenTree(node.children, depth + 1, [...parentLabels, node.label]))
    }
  })

  return result
}
