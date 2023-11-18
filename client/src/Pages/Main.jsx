import React, { useState } from 'react';
import '../styles/main.css';

function Main() {
  const [textoValue, setTextoValue] = useState('');
  const [tituloValue, setTituloValue] = useState('');

  const handleTituloChange = (event) => {
    setTituloValue(event.target.value);
  };

  const handleTextoChange = (event) => {
    setTextoValue(event.target.value);
  };

  const handleTextoKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      setTextoValue(textoValue + '\n'); 
    }
  };

  const guardarTexto = async () => {
    try {
      const response = await fetch('http://localhost:3000/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: tituloValue,
          text: textoValue,
        }),
      });

      if (response.ok) {
        console.log('Texto guardado con éxito');
      } else {
        console.error('Error al guardar el texto');
      }
    } catch (error) {
      console.error('Error al realizar la petición', error);
    }
  };

  return (
    <div className='main-container'>
      <div className='poema'>
        <form>
          <input
            className='titulo'
            type='text'
            name='titulo'
            placeholder='Titulo'
            value={tituloValue}
            onChange={handleTituloChange}
          />
          <textarea
            className='texto'
            name='texto'
            placeholder='Escriba su texto acá...'
            value={textoValue}
            onChange={handleTextoChange}
            onKeyDown={handleTextoKeyDown}
          />
          <div className='controles'>
            <div> 
              <button>
                Cambiar Alineación
              </button>
            </div>

            <div className='btn'>
              <button className='btn-publicar' onClick={guardarTexto}>Publicar</button>
              <button className='btn-guardar'>Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Main;
