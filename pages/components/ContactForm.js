
import React, {useState} from 'react'

export default function ContactForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [accept, setAccept] = useState(false);
    const [validMessage, setValidMessage] = useState('');


    const handleAccept = () => {
        const newAccept = accept;
        setAccept(!newAccept);
    }

  const handleSubmit = e => {
    e.preventDefault();
    if (accept) {
        const data = {
        name,
        email,
        message,
        };
        setValidMessage('Enviando...')
        fetch('/api/contact', {
            method: 'post',
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            if(data.status === 'OK') {
                setName('');
                setEmail('');
                setMessage('');
                Array.from(document.querySelectorAll('input')).forEach(
                    input => (input.value = '')
                );
                document.getElementById('message').value = '';
                setValidMessage('Gracias por tu interés, en breve contactaremos')
            } else {
                setValidMessage('Error de envío, por favor inténtelo de nuevo más tarde')
            }
        });
    } else {
        setValidMessage('Por favor, acepta la política de protección de datos')
    }
  };

    return (
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-50 left-container">
                        <label>Nombre y Apellidos</label>
                        <input type="text" 
                               onChange={e => setName(e.target.value)}            
                               id="name"/>
                    </div>
                    <div className="col-50 right-container">
                        <label>Correo Electrónico</label>
                        <input type="email" 
                               onChange={e => setEmail(e.target.value)}
                               id="email"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-100">
                        <label>Mensaje</label>
                        <textarea rows="8"
                                  onChange={e => setMessage(e.target.value)}
                                  id="message"></textarea>
                    </div>
                </div>
                <div className="buttons">
                    <div>
                        <input onClick={() => handleAccept()} type="checkbox" id="accept" />
                        <label htmlFor="accept">
                            He leído y acepto la <a href="http://isca.itweblearning.com/aviso-legal" target="_blank">política de privacidad</a>  de este sitio web
                        </label>
                    </div>
                    <button type="submit">Enviar</button>
                </div>
                <div className="row">
                    {validMessage.length > 0 ? 
                        <div className="col-100" style={{border: '1px solid white', paddingTop: '1rem'}}>
                                <p className="center">{validMessage}</p>
                        </div>
                    : ''}
                </div>
            </form>
    )
}



