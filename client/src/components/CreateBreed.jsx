import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postBreed, getDogsTemperaments} from '../actions';
import { useDispatch, useSelector } from "react-redux";

export default function CreateBreed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temeperaments = useSelector((state) => state.dogTemperaments)

    const [input, setInput] = useState({
        name: '',
        max_height: 0,
        min_height: 0,
        max_weight: 0,
        min_weight: 0,
        max_life_span: 0,
        min_life_span: 0,
        createdBreed: true,
        temeperament: []
    })

    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, [])


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
    }

    const handleSelect = (event) => {
        setInput ({
            ...input,
            temeperament: [...input.temeperament, event.target.value]
            
        })
        console.log(input)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postBreed(input));
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
            temeperament: []
        })
        history.push("/home");
    }

    return (
        <div>
            <Link to='/home'><button>Home</button></Link>
            <h1>Create your breed</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Max height</label>
                    <input type='number' value={input.max_height} name='max_height'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Min height</label>
                    <input type='number' value={input.min_height} name='min_height'
                        onChange={handleChange}/>
                </div>

                <div>
                    <label>Max weight</label>
                    <input type='number' value={input.max_weight} name='max_weight'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Min weight</label>
                    <input type='number' value={input.min_weight} name='min_weight'
                        onChange={handleChange}/>
                </div>

                <div>
                    <label>Max life span</label>
                    <input type='number' value={input.max_life_span} name='max_life_span'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Min life span</label>
                    <input type='number' value={input.min_life_span} name='min_life_span'
                        onChange={handleChange}/>
                </div>
                <select onChange={(event) => handleSelect(event)}>
                    {temeperaments.map((temperament) => (
                        <option value={temperament.name} key={temperament.id}>{temperament.name}</option>
                    ))}
                </select>
                <ul><li>{input.temeperament.map(option => `${option}, `)}</li></ul>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}