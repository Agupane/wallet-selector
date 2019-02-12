import logdown from 'logdown'
const logger = logdown('WalletSelector:ReduxUtiliys')
logger.state.isEnabled = process.env.NODE_ENV !== 'production'

/** Updates the state with immutability **/
export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

/** Loads the persisted state on localStorage **/
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

/** Persist the current state to localStorage **/
export const saveState = state => {
  logger.log('saving state ', state)
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    logger.error('Error saving state: ', error)
  }
}
