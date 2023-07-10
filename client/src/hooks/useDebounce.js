import React, { useEffect, useState } from "react";

const useDebounce = (value, time) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => clearTimeout(idTimeout);
  }, [value, time]);
  return debounceValue;
};

export default useDebounce;
