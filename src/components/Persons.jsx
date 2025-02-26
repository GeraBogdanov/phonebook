const Persons = ({ persons, del }) => {
  return (
    <ul>
      {persons.map((person) =>
        <li className='note' key={person.id}>{person.name} {person.number} <button onClick={() => del(person)}>delete</button></li>)}
    </ul>
  )
}

export default Persons