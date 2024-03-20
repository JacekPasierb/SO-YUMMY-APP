import React, { useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";
import { MenuItem, Select, TextField } from "@mui/material";
import styled from "styled-components";

const RecipeIngredientsFields = () => {
  const [counter, setCounter] = useState(0);
  const [fields, setFields] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleDecreament = () => {
    setCounter(counter === 0 ? 0 : counter - 1);

    setFields((prev) => [...prev.slice(0, prev.length - 1)]);

    setInputValues((prev) => prev.slice(0, prev.length - 1));
  };
  const Select = styled("div")``;
  const MenuItem = styled("div")``;
  const TextField = styled("input")``;
  const handleIncreament = () => {
    setCounter(counter + 1);
    setFields((prev) => [...prev, { id: nanoid(), inputValues: "", qty: "" }]);

    setInputValues((prev) => [...prev, ""]);
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();
        console.log("data", data.ingredients);
        setIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    getIngredients();
  }, []);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };
  const [val, setVal] = useState("");

  const handleChange = (event) => {
    // handle selected option
  };

  const [filteredOptions, setFilteredOptions] = useState([]);
  useEffect(() => {}, [filteredOptions]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setVal(value);
  };

  return (
    <>
      <div className={css.row}>
        <h2>Ingredients</h2>
        <div className={css.counterBox}>
          <button type="button" className={css.btn} onClick={handleDecreament}>
            <svg className={css.iconMinus}>
              <use href={sprite + `#icon-Minus`}></use>
            </svg>
          </button>
          <span className={css.counterFont}>{counter}</span>
          <button type="button" className={css.btn} onClick={handleIncreament}>
            <svg className={css.icon}>
              <use href={sprite + `#icon-Plus`}></use>
            </svg>
          </button>
        </div>
      </div>
      <ul>
        {ingredients
          ? fields.map((field) => (
              <li
                key={field.id}
                className={css.rowItem}
                
              >
                <div className={css.boxField} onClick={() => {
                  setIsOpen(!isOpen);
                }}>
                  <TextField value={val} onChange={handleSearchChange} />
                  <Select
                    value=""
                    onChange={handleChange}
                    className={css.selectField}
                  >
                    {isOpen &&
                      ingredients
                        .filter((ingredient) =>
                          ingredient.ttl.toLowerCase().includes(val)
                        )
                        .map((option) => (
                          <MenuItem
                            key={option._id}
                            value={option.ttl}
                            className={css.menuItem}
                          >
                            {option.ttl}
                          </MenuItem>
                        ))}
                  </Select>
                </div>

                <div className={css.unitBox}>
                  <input
                    type="number"
                    min="0"
                    className={`${css.inputNum} ${css.noSpinButtons}`}
                  />
                  <select name="unitOpt" className={css.selectUnit}>
                    <option>tbs</option>
                    <option>tsp</option>
                    <option>kg</option>
                    <option>g</option>
                  </select>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};

export default RecipeIngredientsFields;
