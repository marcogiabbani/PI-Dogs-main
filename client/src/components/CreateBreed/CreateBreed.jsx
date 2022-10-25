import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postBreed, getDogsTemperaments} from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import "./CreateBreed.css"

//ejemplo de validaciones
function validate (input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'A name is required';
    } else if (!input.temperament){
        errors.temperament = 'At least one temperament is required';
    }
    return errors;
}




export default function CreateBreed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.dogTemperaments);
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
        temperament: []
    })

    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, [])


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value                 //ERRRORS HANDLERS
        }))
    }

    const handleSelect = (event) => {
        setInput ({
            ...input,
            temperament: [...input.temperament, event.target.value]
            
        })
        console.log(input)
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
        alert("New breed created");
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
                    {errors.name && (
                        <p className="error">{errors.name}</p>                  //ERROR HANDLING
                    )}
                </div>
                <div>
                    <label>Max height</label>
                    <input type='range' min="0" max="200" value={input.max_height} name='max_height'
                        onChange={handleChange}/>
                    <label>{input.max_height} cm</label>
                </div>
                <div>
                    <label>Min height</label>
                    <input type='range' min="0" max="200" value={input.min_height} name='min_height'
                        onChange={handleChange}/>
                        <label>{input.min_height} cm</label>
                </div>

                <div>
                    <label>Max weight</label>
                    <input type='range' min="0" max="200" value={input.max_weight} name='max_weight'
                        onChange={handleChange}/>
                        <label>{input.max_weight} kg</label>
                </div>
                <div>
                    <label>Min weight</label>
                    <input type='range' min="0" max="200" value={input.min_weight} name='min_weight'
                        onChange={handleChange}/>
                        <label>{input.min_weight} kg</label>
                </div>

                <div>
                    <label>Max life span</label>
                    <input type='range' min="0" max="50" value={input.max_life_span} name='max_life_span'
                        onChange={handleChange}/>
                        <label>{input.max_life_span} years</label>
                </div>
                <div>
                    <label>Min life span</label>
                    <input type='range' min="0" max="50" value={input.min_life_span} name='min_life_span'
                        onChange={handleChange}/>
                        <label>{input.min_life_span} years</label>
                </div>
                <select className="select-button" onChange={(event) => handleSelect(event)}>

                    {temperaments.map((temperament) => (
                        <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                    ))}

                </select>

                {/* <ul><li>{input.temperament.map(option => `${option}, `)}</li></ul> */}

                <button type="submit">Create</button>
            </form>
            <ul>
            {input.temperament.map(temp => (
                <div className="number temper-container">
                    <button className='xButton' onClick={() => handleDelete(temp)}>X</button>
                    <li>{temp}</li>
                </div>
                
            ))}
            </ul>
            <Link to='/home'><button className='button-53'>Home</button></Link>
        </div>
        </div>
    )
}