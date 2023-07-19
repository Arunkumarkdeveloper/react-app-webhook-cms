import React, { useState } from "react";

const optionsList = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

const ListItems = (props) => {
  const [options, setOptions] = useState(optionsList);

  const handleChange = async (e) => {
    let lastValue = e.target.getAttribute("lastElementValue");
    let newArrayItems = props.array;
    let listIndexItems = newArrayItems.findIndex((item) => item === lastValue);
    newArrayItems.splice(listIndexItems, 1, e.target.value);
    await props.setArray(() => [...newArrayItems]);
  };

  const deleteItem = (value) => {
    props.setArray((item) => item.filter((arr) => arr !== value));
  };

  return props.array.map((item) => (
    <div key={item} className="child-dropdown-items">
      <div
        className="list-circle-item"
        style={{ background: item === "account_name" ? "red" : "green" }}
      ></div>
      <select
        id="schema"
        lastElementValue={item}
        value={item}
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) =>
          props.array.includes(option.value) ? (
            <option key={option.value} default hidden value={option.value}>
              {option.label}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
      <div className="delete-item">
        <button
        value={item}
          onClick={(e) => deleteItem(e.target.value)}
        >
       –
        </button>
      </div>
    </div>
  ));
};

export default ListItems;
