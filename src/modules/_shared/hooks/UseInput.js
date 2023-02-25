import { useState } from 'react';

export default function useInput(initialValue, type = 'text') {
    const stringToBoolean = (value) => {
        return String(value) === '1' || String(value).toLowerCase() === 'true';
    };
    const [value, setValue] = useState(initialValue);

    const reset = () => {
        setValue(initialValue);
    };

    let bind = {
        value,
        onChange: (e) =>
            setValue(() =>
                type === 'checkbox'
                    ? !stringToBoolean(e.target.value)
                    : e.target.value
            ),
    };

    if (type === 'checkbox') {
        bind = { ...bind, ...{ checked: stringToBoolean(value) } };
    }

    return [value, bind, reset];
}
