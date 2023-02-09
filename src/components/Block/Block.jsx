import React from "react";
import s from "./Block.module.scss";

const Block = ({
    value,
    currencies,
    currency,
    onChangeValue,
    onChangeSelect,
}) => {
    return (
        <>
            <div className={s.Block__row}>
                <input
                    className={s.Block__input}
                    type="number"
                    value={value}
                    onChange={(e) => onChangeValue(e.target.value)}
                    placeholder="From"
                />
                <select
                    className={s.Block__select}
                    value={currency}
                    onChange={(e) => onChangeSelect(e.target.value)}
                >
                    {Object.entries(currencies).map((c) => (
                        <option key={c[0]} value={c[0]}>
                            {c[0]} - {c[1].Name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Block;
