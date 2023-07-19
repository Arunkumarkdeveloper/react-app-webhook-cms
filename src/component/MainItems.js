import React from "react";
import { useState, useEffect } from "react";
import ListItems from "./ListItems";

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

const MainItems = (props) => {
  const [segementName, setSegmentName] = useState("");
  const [array, setArray] = useState([]);
  const [options, setOptions] = useState(optionsList);
  const [value, setvalue] = useState(null);

  const onchange = (item) => {
    setvalue(item);
  };

  const addItemsList = () => {
    if (value) {
      setArray((arr) => [...arr, value]);
      setvalue(null);
    }
  };

  useEffect(() => {
    setArray(["first_name", "account_name"]);
  }, []);

  const listDetails = () => {
    return (
      array.length > 0 && (
        <div className="box-container">
          <ListItems
            setArray={setArray}
            options={options}
            array={array}
            value={value}
          />
        </div>
      )
    );
  };

  const onSaveSegment = async () => {
    if (segementName && array.length > 0) {
      let schema = options.filter((current) => array.includes(current.value));
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segment_name: segementName,
          schema: schema,
        }),
      };
      try {
        await fetch(
          "https://webhook.site/6e18c003-404e-47de-ae55-18f7e75e47fd",
          requestOptions
        ).then((response) => {
          if (response.status === 200) {
            props.setPopup(false);
          } else {
            props.setPopup(false);
          }
        });
      } catch (e) {
        props.setPopup(false);
      }
    }
  };

  return (
    <React.Fragment>
      <header>
        <span
          className="icon"
          onClick={() => props.setPopup(false)}
        ></span>

        <p className="text-heading">Saving Segment</p>
      </header>
      <div className="Template">
        <div className="main-container">
          <div className="group-field">
            <p>Enter the Name of the Segment</p>
            <input
              onChange={(e) => setSegmentName(e.target.value)}
              type="input"
              placeholder="Name of the segment"
              required
            />
            <p>
              To Save your segment, you need to add the schemas to build the
              query
            </p>
          </div>
          <div className="idea-group">
            <div className="user-group">
              <span>.</span>{" "} - User Traits
            </div>
            <div className="group">
              <span>.</span>{" "} - Group Traits
            </div>
          </div>
          {listDetails()}
          <div className="filter-field">
            <div
              className="list-circle-item"
            ></div>
            <select onChange={(e) => onchange(e.target.value)} id="schema">
              <option value="Add schema to segment">
                Add schema to segment
              </option>
              {options.map(
                (option) =>
                  !array.includes(option.value) && (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className="add-item-shema">
            <button onClick={addItemsList}>+Add new schema</button>
          </div>
          <div className="button-field">
            <button onClick={onSaveSegment}>Save the Segment</button>
            <button onClick={() => props.setPopup(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MainItems;
