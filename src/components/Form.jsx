import React, { useEffect } from 'react';

const Form = () => {

    useEffect(() => {
        console.log("INSIDE USE-EFFECT OF FORM");
    }, [])

    const [FirstName, setFirstName] = useState("");

    useEffect(() => {
        console.log("firstname");
    }, [])

    return (
        <div>
        <hr />
            <form>
                <div>
                    <label for="FirstName">Nome:</label>
                    <input type="text" id="FirstName" name="FirstName" onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div>
                    <label for="LastName">Cognome:</label>
                    <input type="text" id="LastName" name="Cognome" />
                </div>
                <div>
                    <label for="Email">Email:</label>
                    <input type="email" id="Email" name="Email" />
                </div>
                <div>
                    <label for="Identifier">ID:</label>
                    <input type="Identifier" id="Matricola" name="ID" />
                </div>
                <div>
                    <button >CONFERMA</button>
                </div>
            </form>
        </div>

    )

}

export default Form;