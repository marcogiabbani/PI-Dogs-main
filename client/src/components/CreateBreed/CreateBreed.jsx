import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postBreed, getDogsTemperaments, clearErrorHandler} from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import "./CreateBreed.css"


function validate (input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'A name is required';
    }
    if (!input.min_height || !input.max_height) {
        errors.height = 'Height range is required';
    }
    if (!input.min_weight || !input.max_weight) {
        errors.weight = 'Weight range is required';
    }

    if (input.min_height < 0 || input.min_weight < 0 || input.min_life_span < 0 ||
        input.max_height < 0 || input.max_weight < 0 || input.max_life_span < 0){
        errors.min = 'Values should not be less than 0';
    }
    if (input.min_height > 200 || input.min_weight > 200 || input.min_life_span > 200 ||
        input.max_height > 200 || input.max_weight > 200 || input.max_life_span > 200){
        errors.max = 'Values should not be more than 200';
    }
    return errors;
}





export default function CreateBreed() {

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.dogTemperaments);
    const errorOcurred = useSelector((state) => state.errorhandler);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        max_height: 0,
        min_height: 0,
        max_weight: 0,
        min_weight: 0,
        max_life_span: 0,
        min_life_span: 0,
        createdBreed: true,
        temperament: [],

    })

    useEffect(() => {
        if (!temperaments.length){
        dispatch(getDogsTemperaments());}

    }, [dispatch])


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleSelect = (event) => {
        setInput ({
            ...input,
            temperament: [...input.temperament, event.target.value]
        })
    }

    const handleDelete = (tempToDelete) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(temper => temper !== tempToDelete)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
            dispatch(postBreed({
                name: input.name,
                height: {
                    metric: `${input.max_height} - ${input.min_height}`,
                },
                weight: {
                    metric: `${input.max_weight} - ${input.min_weight}`,
                    metricAverage: (parseInt(input.max_weight) + parseInt(input.min_weight)) / 2
                },
                life_span: `${input.max_life_span} - ${input.min_life_span} years`,
                createdBreed: true,
                temperament: input.temperament
                
                }));
    }
    const handleReset = (event) => {
        setInput({
            name: '',
            max_height: 0,
            min_height: 0,
            max_weight: 0,
            min_weight: 0,
            max_life_span: 0,
            min_life_span: 0,
            createdBreed: true,
            temperament: []
        })
        history.push("/home");
    }


    return (
        <div className="detailContainer">
            
            <h1 className="welcome-title form">Create your breed</h1>
            <div>
            <form className="form-container" onSubmit={(event) => handleSubmit(event)}>
                <div className="form-number form-name">
                    <label>*Name:</label>
                    <input className="search-input form" type='text' value={input.name} name='name'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label >*Max height in cm</label>
                    <input className="search-input from-number" type='number' value={input.max_height} name='max_height'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label>*Min height in cm</label>
                    <input className="search-input from-number" type='number' value={input.min_height} name='min_height'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label>*Max weight in kg</label>
                    <input className="search-input from-number" type='number' value={input.max_weight} name='max_weight'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label>*Min weight in kg</label>
                    <input className="search-input from-number" type='number' value={input.min_weight} name='min_weight'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label>Max life span in years</label>
                    <input className="search-input from-number" type='number' value={input.max_life_span} name='max_life_span'
                        onChange={handleChange}/>
                </div>

                <div className="form-number">
                    <label>Min life span in years</label>
                    <input className="search-input from-number" type='number'     value={input.min_life_span} name='min_life_span'
                        onChange={handleChange}/>
                </div>

                <select className="select-button" onChange={(event) => handleSelect(event)}>
                    {temperaments.map((temperament) => (
                        <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                    ))}
                </select>


                 <button className='button-53 create' type="submit" disabled={(Object.keys(errors) != 0)}>Create</button>
            </form>
            <div className="container">
            {errors.name && (<p className="error">{errors.name}</p>)}
            {errors.min && (<p className="error">{errors.min}</p>)}
            {errors.max && (<p className="error">{errors.max}</p>)}
            {errors.height && (<p className="error">{errors.height}</p>)}
            {errors.weight && (<p className="error">{errors.weight}</p>)}
            {errors.temperament && (<p className="error">{errors.temperament}</p>)}
            {errorOcurred && (<p>{errorOcurred}</p>)}
            <ul>
            {input.temperament.map(temp => (
                <div className="number temper-container">
                    <button onClick={() => handleDelete(temp)}>X</button>
                    <li>{temp}</li>
                </div>
            ))}
            </ul>




            <Link to='/home'><button onClick={event => dispatch(clearErrorHandler())} className='button-53'>Home</button></Link>
            </div>
        </div>
        </div>
    )
}