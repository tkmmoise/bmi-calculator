const initialState ={
}

const bmiDataReducer  = (state = initialState, action)=> {
    switch (action.type) {
        case 'ADD_BMI_DATA':
          console.log('add bmi data');
          return state
        case 'ADD_BMI_DATA_ERROR':
          console.log('add bmi data error', action.err)
          return state
        case 'DELETE_BMI_DATA':
          console.log('del all bmi data');
          return state
        case 'DELETE_BMI_DATA_ERROR':
          console.log('del all bmi data error', action.err)
          return state
        default :
          return state;
      }
}

export default bmiDataReducer;
