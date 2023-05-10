import { useState } from "react";

function useValidation(inputValues) {
  const [values, setValues] = useState(inputValues);

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === 'name') {
      if (value.length >= 2 && value.length <= 40)
        setValues({ ...values, [name]: true });
      else
        setValues({ ...values, [name]: false });
    }
    if (name === 'email') {
      if (value.length >= 2 && value.length <= 40 && reg.test(value))
        setValues({ ...values, [name]: true });
      else
        setValues({ ...values, [name]: false });

    }
    if (name === 'password') {
      if (value.length >= 8 && value.length <= 40)
        setValues({ ...values, [name]: true });
      else
        setValues({ ...values, [name]: false });
    }
  };

  return {
    values,
    handleChange,
    setValues,
  };
}

export default useValidation;