import React, {useState, useEffect} from "react"
import { withContext } from "../AppContext"
import "./AddShoulderpadForm.css"

const AddShoulderpadForm = props => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [shoulderpadNumber, setShoulderpadNumber] = useState("")
    const [size, setSize] = useState("Large")

    const clearState = () => {
        setMake("")
        setModel("")
        setShoulderpadNumber("")
        setSize("Large")
    }

    const handleModalLogic = () => {
        props.handleAddShoulderpadModal()
        clearState()
    }

    const handleSubmit = e => {
        e.preventDefault()

        let newShoulderpad = {
            make,
            model,
            size,
            shoulderpadNumber
        }
        props.addShoulderpad(newShoulderpad)
        props.getShoulderpads()

        clearState()
        newShoulderpad = {}
        
        props.handleAddShoulderpadModal()
    }

    const submitNewShoulderpad = make !== "" && model !== "" && shoulderpadNumber !== "" ?
    <div className="add-btn-container"><button className="add-btn">Add {make}-{shoulderpadNumber} to Inventory</button></div>
    :
    <h3 style={{color: "red", textAlign: "center", padding: "8pt 0"}}>Required: Shoulder Pad Make, Model, Number*(unique) and Size</h3>

    return (
        <form className="add-shoulderpad-form-container" onSubmit={handleSubmit}>
        <div className="close-btn-container" onClick={handleModalLogic}>
                <p className="close-btn">X</p>
            </div>
            <div className="shoulderpad-name-container">
                <h2>Shoulder Pad Info</h2>
                <input 
                    id="make-input"
                    type="text"
                    name="make"
                    value={make}
                    placeholder="Shoulder Pad Make..."
                    onChange={e => setMake(e.target.value)}
                    minLength={2}
                />
                <input 
                    id="model-input"
                    type="text"
                    name="model"
                    value={model}
                    placeholder="Shoulder Pad Model..."
                    onChange={e => setModel(e.target.value)}
                    minLength={2}
                />
                <input 
                    id="shoulderpadNumber-input"
                    type="text"
                    name="shoulderpadNumber"
                    value={shoulderpadNumber}
                    placeholder="Shoulder Pad Number (must be unique)..."
                    onChange={e => setShoulderpadNumber(e.target.value)}
                    minLength={2}
                />
            </div>
            <div className="radio-container">
                <h2>Size <span>*Large selected by default</span></h2>
                <label>
                    <input 
                        id="size-input"
                        type="radio"
                        name="size"
                        value="Small"
                        checked={size === "Small"}
                        onChange={e => setSize(e.target.value)}
                    /> Small
                </label> 
                <label>
                    <input 
                        type="radio"
                        name="size"
                        value="Medium"
                        checked={size === "Medium"}
                        onChange={e => setSize(e.target.value)}
                    /> Medium
                </label>
                <label>
                    <input 
                        type="radio"
                        name="size"
                        value="Large"
                        checked={size === "Large"}
                        onChange={e => setSize(e.target.value)}
                    /> Large
                </label>
                <label>
                    <input 
                        type="radio"
                        name="size"
                        value="XLarge"
                        checked={size === "XLarge"}
                        onChange={e => setSize(e.target.value)}
                    /> XLarge
                </label>
            </div>
            {submitNewShoulderpad}
        </form>
    )
}

export default withContext(AddShoulderpadForm)