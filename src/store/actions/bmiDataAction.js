//arrondi decimal fonction
(function(){
	function decimalAdjust(type, value, exp) {
		// Si l'exposant vaut undefined ou zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// Si value n'est pas un nombre 
        // ou si l'exposant n'est pas entier
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Décalage
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Re "calage"
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Arrondi décimal
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
})();
export const addDataBmi = (height,weight) =>{
    return (dispatch, getState,{getFirestore})=> {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        const bmi = Math.round10(weight/(Math.pow(height*0.01,2)),-1);
        firestore.collection('bmiData').add({
            authorId: authorId,
            height: height,
            weight: weight,
            bmi:bmi,
            date: new Date()
        }).then(()=>{
            dispatch({type: 'ADD_BMI_DATA'})
        }).catch((err)=>{
            dispatch({type: 'ADD_BMI_DATA_ERROR',err})
        })
    }
}
export const delAllDataBmi = (id) => {
	return(dispatch,getState,{getFirestore}) => {
	  const firestore = getFirestore();
  
	  firestore.collection('bmiData').doc(id).delete().then(()=>{
		dispatch({type: 'DELETE_BMI_DATA', id})
	  }).catch((err)=>{
		dispatch({type: 'DELETE_BMI_DATA_ERROR',err})
	  })
	}
  }