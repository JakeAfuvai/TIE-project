import React, {useState} from "react"
import { withContext } from "../AppContext"
import "./AddHelmetForm.css"

const AddHelmetForm = props => {
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [helmetNumber, setHelmetNumber] = useState("")
    const [size, setSize] = useState("Large")

    const clearState = () => {
        setMake("")
        setModel("")
        setHelmetNumber("")
        setSize("Large")
    }

    const handleModalLogic = () => {
        props.handleAddHelmetModal()
        clearState()
    }

    const handleSubmit = e => {
        e.preventDefault()

        let newHelmet = {
            make,
            model,
            size,
            helmetNumber
        }
        props.addHelmet(newHelmet)
        props.getHelmets()

        clearState()
        newHelmet = {}
        
        props.handleAddHelmetModal()
    }

    const submitNewHelmet = make !== "" && model !== "" && helmetNumber !== "" ?
    <div className="add-btn-container"><button className="add-btn">Add {make}-{helmetNumber} to Inventory</button></div>
    :
    <h3 style={{color: "red", textAlign: "center", padding: "8pt 0"}}>Required: Helmet Make, Model, Number and Size</h3>

    return (
        <form className="add-helmet-form-container" onSubmit={handleSubmit}>
        <div className="close-btn-container" onClick={handleModalLogic}>
                <p className="close-btn">X</p>
            </div>
            <div className="helmet-name-container">
                <h2>Helmet Info</h2>
                <input 
                    id="make-input"
                    type="text"
                    name="make"
                    value={make}
                    placeholder="Helmet Make..."
                    onChange={e => setMake(e.target.value)}
                    minLength={2}
                />
                <input 
                    id="model-input"
                    type="text"
                    name="model"
                    value={model}
                    placeholder="Helmet Model..."
                    onChange={e => setModel(e.target.value)}
                    minLength={2}
                />
                <input 
                    id="helmetNumber-input"
                    type="text"
                    name="helmetNumber"
                    value={helmetNumber}
                    placeholder="Helmet Number..."
                    onChange={e => setHelmetNumber(e.target.value)}
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
            {submitNewHelmet}
        </form>
    )
}

export default withContext(AddHelmetForm)