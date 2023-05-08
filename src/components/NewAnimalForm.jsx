import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { InputText } from 'primereact/inputtext';
import {getTypes} from '../utils/api'
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'primereact/button'
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { createAnimal } from '../utils/api'
import { redirect, useNavigate } from "react-router-dom";
const NewAnimalForm = () => {
    const {user} = useContext(UserContext);
    const [animalTypes, setAnimalTypes] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [isAdopted, setIsAdopted] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  
    useEffect(() => {
        getTypes().then((response) => setAnimalTypes([...response.data]))
    }, [])

    const onSubmit = (data) => {
        data.adopted = isAdopted;
        console.log(isAdopted, data)
        createAnimal(data).then(() => navigate("/animals"))
        .catch(() => console.log(errors))
    }

    return (
      <>
        {user === "User" && (
          <p style={{ color: "red", textAlign: "center" }}>
            Only ADMIN can access this page.{" "}
          </p>
        )}
        {user == "Admin" && (
          <div
            style={{
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "30px",
                backgroundColor: "#a5b4fc",
                color: "#666566",
                fontFamily: "fantasy",
                justifyContent: "center",
              }}
            >
              <p>Create New Animal</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  marginTop: "30px",
                  justifyContent: "space-evenly",
                  display: "flex",
                }}
              >
                <div>
                  <div style={{ marginBottom: "30px" }}>
                    <span className="p-float-label">
                      <InputText
                        name="name"
                        {...register("name", { required: true })}
                      />
                      <label htmlFor="name">Name*</label>
                    </span>
                    {errors.name && (
                      <div>
                        <span className="p-error">Name is required. </span>
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <Dropdown
                      style={{ width: "205px" }}
                      {...register("type", { required: true })}
                      name="type"
                      placeholder="--Type of Animal--"
                      options={animalTypes}
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.value)}
                    />
                    {errors.type && (
                      <div>
                        <span className="p-error">Select type of animal. </span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <span className="p-float-label">
                      <InputText
                        name="age"
                        {...register("age", { required: true })}
                        type="number"
                      />
                      <label htmlFor="age">Age*</label>
                    </span>
                    {errors.age && (
                      <div>
                        <span className="p-error">Insert animal age. </span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <span className="p-float-label">
                      <InputTextarea
                        style={{ width: "205px" }}
                        {...register("description")}
                        name="description"
                      />
                      <label htmlFor="description">Description</label>
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "30px" }}>
                    <span>
                      <Checkbox
                        {...register("adopted")}
                        name="adopted"
                        onChange={() => setIsAdopted(!isAdopted)}
                        checked={isAdopted}
                      ></Checkbox>

                      {/* <Checkbox checked={isAdopted} onChange={() => setIsAdopted(!isAdopted)} {...register("adopted")} name="adopted"></Checkbox> */}
                      <label style={{ color: "#666566" }}>Adopted</label>
                    </span>
                  </div>
                  <div style={{ marginBottom: "30px" }}>
                    <span className="p-float-label">
                      <Calendar
                        name="lastCheckup"
                        {...register("lastCheckup")}
                      />
                      <label>Last checkup</label>
                    </span>
                  </div>
                  <div>
                    <span className="p-float-label">
                      <InputText 
                        name="image"
                        {...register("image", {required: true})}/>
                      <label>Image*</label>
                    </span>
                    {errors.image && (
                      <div>
                        <span className="p-error">Paste image link. </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button type="submit" style={{width: "100%"}} label="Submit" className="p-button p-component p-button-raised p-button-help p-button-text" />
            </form>
          </div>
        )}
      </>
    );
}; export default NewAnimalForm;