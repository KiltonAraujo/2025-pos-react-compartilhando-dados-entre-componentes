"use client";

import type React from "react";

import { useEffect, useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from '@/componentes/ModalTarefa';


interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido ? "bg-red-600 hover:border-gray-800" : "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={() => escutarClique()}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TareafasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>(dados);
  const [mostrarModal, setMostrarModal] = useState(false);

  const adicionarNovaTarefa = (novaTarefa: string) => {
    const nova: TarefaInterface = {
      id: tarefas.length + 1, // Gera um ID único
      title: novaTarefa,
      completed: false, // Por padrão, a tarefa começa como "não concluída"
    };
    setTarefas([...tarefas, nova]); // Adiciona a nova tarefa ao estado
  };

  return (
    <div className="container mx-auto p-4">
      <Cabecalho />
      <button onClick={() => setMostrarModal(true)}>Adicionar Tarefa</button>
      <Tarefas dados={tarefas} />
      {mostrarModal && (
        <ModalTarefa
          onAddTarefa={adicionarNovaTarefa}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
};

export default Home;