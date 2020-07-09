import { useCallback, useReducer } from 'react';

const formReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

// useReducerの二つ目の戻り値、ここではdispatchには、formStateの更新処理が設定されている。
// dispatchの引数は上記関数formReducerの引数であるactionへ自動的に連携される
// useReducerの一つ目の戻り値、ここではformStateには、dispatchによって更新されたStateの最新版が保管される
// つまりformReducerはStateとそれを更新する関数(action)というuseStateと似たような構成であるが、更新する関数の処理内容を自分で決められるという特性を持つ
// Reduxのreducer同様、タイプで処理を指定することで一つのstateに対して複数の処理を設定できる。
export const useForm = (initialInputs:any, initialFormValidity:any) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};