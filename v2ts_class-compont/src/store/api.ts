const getGoodsList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: '魅族', price: 2000 },
        { name: '红米', price: 1000 }
      ])
    }, 3000)
  })
}

export { getGoodsList }