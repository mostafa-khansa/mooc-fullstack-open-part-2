const PersonForm = ({ handleSubmit, newName, newPhone, handleNameChange, handlePhoneChange }) => {
    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newPhone} onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>)
}

export default PersonForm