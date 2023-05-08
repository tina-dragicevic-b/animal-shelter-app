import {getAnimals, getTypes, updateAnimal} from '../utils/api'
import { useState, useEffect, useContext } from 'react'
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import {Button} from 'primereact/button'
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { UserContext } from "../context/UserContext";
import AnimasFilter from './AnimalsFilter';
 
const Animals = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
    const [_animals, setAnimals] = useState([]);
    const [_filteredAnimals, setFilteredAnimals] = useState([]);
    const [_animalTypes, setAnimalTypes] = useState(["All"]);
    const shadow = (isAdopted) => {
        return isAdopted ? "8px 10px 5px #fcba03" : "8px 10px 5px #fc035a"
    }
    const [showPopup, setShowPopup] = useState(false)
    const [animalDetails, setAnimalDetails] = useState();
    const [animalDetailsCopy, setAnimalDetailsCopy] = useState();
    const header = (image) => (<img alt="Card" src={`${image}`}/>)

    const [isAnimalDetails, setIsAnimalDetails] = useState(false);
    const [isAnimalUpdate, setIsAnimalUpdate] = useState(false);
    const [filterByType, setFilterByType] = useState();
    // const [filterByAdoption, setFilterByAdopted] = useState("");
    const [filterByAdopted, setFilterByAdopted] = useState(false);
    const [filterByNotAdopted, setFilterByNotAdopted] = useState(false);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getAnimals().then(response => {
          setAnimals(() => [...response.data])
          setFilteredAnimals(() => [...response.data])
        })
        getTypes().then(response => {setAnimalTypes((prev) => [...prev,...response.data])})
    }, [])

    useEffect(() => {
      if(_animals.length !== 0){
        let a = [..._animals]
        if (filterByAdopted) {
          a = a.filter((animal) => animal.adopted === true);
          onFilterByTypeHelper(a);

        } else if(filterByNotAdopted){
          a = a.filter((animal) => animal.adopted === false)
          onFilterByTypeHelper(a);

        } else if(!(filterByAdopted && filterByNotAdopted)){
          onFilterByTypeHelper(a);
        }
      }
      if(isAnimalUpdate){
        setAnimalDetailsCopy(animalDetails);
      }
    }, [filterByType, filterByAdopted, filterByNotAdopted, isAnimalUpdate])
    
    const onFilterByTypeHelper = (data) => {
      if(filterByType === "All" || filterByType === undefined){
        setFilteredAnimals([...data]);
      } else {
        data = data.filter((animal) => animal.type === filterByType);
        setFilteredAnimals([...data]);
      }
    }

    const onFilterByAdoption = (e) => {
      if(e.value === "Adopted"){
        setFilterByAdopted(e.checked);
        setFilterByNotAdopted(false);
      } if(e.value === "Not adopted"){
        setFilterByAdopted(false);
        setFilterByNotAdopted(e.checked);
      }
    }

    const onOpenPopup = (animal) => {
        setShowPopup(true);
        setIsAnimalDetails(true);
        setAnimalDetails({...animal});
    }
    const onClosePopup = () => {
      setShowPopup(false);
      setIsAnimalDetails(false);
      setIsAnimalUpdate(false)
  }

    const onShowUpdatePopup = () => {
      setIsAnimalDetails(!isAnimalDetails);
      setIsAnimalUpdate(!isAnimalUpdate);
    }
    const onSubmit = () => {
      updateAnimal(animalDetailsCopy).then((response) => {

        setIsAnimalUpdate(false);
        setIsAnimalDetails(false);
        setShowPopup(false)
        const updateState = _animals.map((animal) => {
          if(animal.id === animalDetailsCopy.id){
            return response.data
          } else return animal
        })
        setAnimals([...updateState])
      })
    }

    const onAdopt = () => {
      animalDetails.adopted = true; 
      const updateState = _animals.map((animal) => {
        if(animal.id === animalDetails.id){
          animal.adopted = true;
          return animal
        } else return animal
      })
      setAnimals([...updateState])
      updateAnimal(animalDetails).then((response) => {
        setIsAnimalDetails(false);
        setShowPopup(false)
      })
    }

    const onChangeHandler = (event) => {
      const { name, value } = event.target;
      if(name === "adopted"){
        setAnimalDetailsCopy({...animalDetailsCopy, adopted: !animalDetailsCopy.adopted})
      }
      setAnimalDetailsCopy({...animalDetailsCopy, [name]: value})
  }
    return (
      // <div className='flex' style={{fontFamily: "cursive", color: "#0b213f", display: "flex", justifyContent: "space-between"}}>
      <div>
        <AnimasFilter
          setFilterByType={setFilterByType}
          filterByNotAdopted={filterByNotAdopted}
          onFilterByAdoption={onFilterByAdoption}
          filterByAdopted={filterByAdopted}
          _animalTypes={_animalTypes}
          filterByType={filterByType}
        />
        
        <div
          className="animalsGrid"
          style={{
            fontFamily: "cursive",
            color: "#0b213f",
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gap: "20px",
          }}
        >
          {_filteredAnimals.map((animal, index) => (
            <div key={index}>
              <img
                style={{ boxShadow: `${shadow(animal.adopted)}` }}
                className="animalImage w-full h-96 md:h-24 object-cover"
                onClick={() => onOpenPopup(animal)}
                src={`${animal.image}`}
              />
            </div>
          ))}
          <Dialog
            header={`${animalDetails?.name}`}
            visible={showPopup}
            style={{ width: "40vw", fontFamily: "cursive" }}
            onHide={onClosePopup}
          >
            {isAnimalDetails && (
              <Card
                header={header(animalDetails?.image)}
                style={{ fontFamily: "cursive" }}
              >
                <small>
                  {animalDetails?.type} |{" "}
                  {animalDetails?.adopted ? "Adopted 💕 " : "Not adopted 🥺 "} |
                  Age: {animalDetails?.age}
                </small>
                <p>{animalDetails?.description}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  {!animalDetails?.adopted && (
                    <Button label="Adopt 💜 " className="p-button-success" onClick={onAdopt} />
                  )}{" "}
                  {/* ovaj true se mijenja s isAdmin */}
                  {user === "Admin" && (
                    <Button
                      onClick={onShowUpdatePopup}
                      label="Edit"
                      className="p-button-warning"
                    />
                  )}
                </div>
              </Card>
            )}
            {isAnimalUpdate && (
              <Card
                header={header(animalDetails?.image)}
                style={{ fontFamily: "cursive" }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputText
                    {...register("name")}
                    value={animalDetailsCopy?.name}
                    name="name"
                    onChange={onChangeHandler}
                    style={{width: "100%"}}
                  />
                  {/* <input
                    type="text"
                    {...register("name")}
                    value={animalDetailsCopy?.name}
                    name="name"
                    onChange={onChangeHandler}
                  ></input> */}
                  <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px", marginBottom: "20px"}}>
                    Adoption status:{" "}
                    {animalDetailsCopy?.adopted && <p>Adopted</p>}
                    {!animalDetailsCopy?.adopted && <p>Not adopted</p>}
                    <Checkbox
                      {...register("adopted")}
                      checked={animalDetailsCopy?.adopted}
                      onChange={() =>
                        setAnimalDetailsCopy({
                          ...animalDetailsCopy,
                          adopted: !animalDetailsCopy.adopted,
                        })
                      }
                      name="adopted"
                    />
                  </div>
                  <div style={{display: "flex", justifyContent: "space-around"}}>
                  <Dropdown
                    {...register("type")}
                    name="type"
                    placeholder="Filter by Type"
                    options={_animalTypes}
                    value={animalDetailsCopy?.type}
                    onChange={onChangeHandler}
                    style={{height: "50px", width: "49%"}}
                  />
                  <InputTextarea
                    rows={5}
                    cols={30}
                    {...register("description", {
                      maxLength: 50,
                    })}
                    value={animalDetailsCopy?.description}
                    name="description"
                    onChange={onChangeHandler}
                    style={{width: "50%"}}
                  />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      type="cancle"
                      label="Cancle"
                      onClick={onShowUpdatePopup}
                      className="mt-2 p-button-help"
                    />
                    <Button type="submit" label="Submit" className="mt-2 p-button-success" />
                  </div>
                </form>
              </Card>
            )}
          </Dialog>
        </div>
      </div>
    );

}; export default Animals;