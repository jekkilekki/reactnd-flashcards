export const logger = (store) => (next) => (action) => {
  console.group( action.type )
    console.log( 'Action performed: ', action )
    const returnValue = next(action)
    // Disable later - major slowdown in performance when logging New state (5900+ )
    // console.log( 'New state: ', store.getState() )
  console.groupEnd()
  return returnValue
}

export default logger