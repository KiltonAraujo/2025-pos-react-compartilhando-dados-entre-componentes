import React, { useState } from 'react';

interface ModalTarefaProps {
  onAddTarefa: (novaTarefa: string) => void;
  onClose: () => void;
}


const ModalTarefa: React.FC<ModalTarefaProps> = ({ onAddTarefa, onClose }) => {
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      onAddTarefa(novaTarefa);
      setNovaTarefa('');
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          className='border-2 border-gray-300 rounded p-2 fixed'
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite a nova tarefa"
        />
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalTarefa;