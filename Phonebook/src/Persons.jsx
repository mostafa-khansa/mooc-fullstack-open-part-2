const Persons = ({ people, deleteHandler }) => {
    return (<>
        {people.map((p) => <div key={p.id}><p>{p.name} {p.phone}</p><button onClick={() => { deleteHandler(p.id) }}>Delete</button></div>)}
    </>)
}

export default Persons