const mockData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

export function getData() {
  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000)) // 模拟延迟
}
