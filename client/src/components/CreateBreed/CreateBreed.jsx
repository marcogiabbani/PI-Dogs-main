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
        <div className='detailContainer'>
            
            <h1 className="welcome-title">Create your breed</h1>
            <div className='container'>
            <form className="form-container" onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name'
                        onChange={handleChange}/>
                </div>

                <div>
                    <label>Max height</label>
                    <input type='number' value={input.max_height} name='max_height'
                        onChange={handleChange}/>
                    <label>{input.max_height} cm</label>
                </div>

                <div>
                    <label>Min height</label>
                    <input type='number' value={input.min_height} name='min_height'
                        onChange={handleChange}/>
                        <label>{input.min_height} cm</label>
                </div>

                <div>
                    <label>Max weight</label>
                    <input type='number' value={input.max_weight} name='max_weight'
                        onChange={handleChange}/>
                        <label>{input.max_weight} kg</label>
                </div>

                <div>
                    <label>Min weight</label>
                    <input type='number' value={input.min_weight} name='min_weight'
                        onChange={handleChange}/>
                        <label>{input.min_weight} kg</label>
                </div>

                <div>
                    <label>Max life span</label>
                    <input type='number' value={input.max_life_span} name='max_life_span'
                        onChange={handleChange}/>
                        <label>{input.max_life_span} years</label>
                </div>

                <div>
                    <label>Min life span</label>
                    <input type='number'     value={input.min_life_span} name='min_life_span'
                        onChange={handleChange}/>
                        <label>{input.min_life_span} years</label>
                </div>

                <select className="select-button" onChange={(event) => handleSelect(event)}>
                    {temperaments.map((temperament) => (
                        <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                    ))}
                </select>


                 <button type="submit" disabled={(Object.keys(errors) != 0)}>Create</button>
            </form>

            <ul>
            {input.temperament.map(temp => (
                <div className="number temper-container">
                    <button className='xButton' onClick={() => handleDelete(temp)}>X</button>
                    <li>{temp}</li>
                </div>
            ))}
            </ul>

            {errors.name && (<p className="error">{errors.name}</p>)}
            {errors.min && (<p className="error">{errors.min}</p>)}
            {errors.max && (<p className="error">{errors.max}</p>)}
            {errors.height && (<p className="error">{errors.height}</p>)}
            {errors.weight && (<p className="error">{errors.weight}</p>)}
            {errors.temperament && (<p className="error">{errors.temperament}</p>)}
            {errorOcurred && (<p className="error">{errorOcurred}</p>)}


            <Link to='/home'><button className='button-53'>Home</button></Link>
        </div>
        </div>
    )
}