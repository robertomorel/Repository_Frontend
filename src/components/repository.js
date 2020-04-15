import React from "react";

const Repo = props => {
    const repo = props.repo;
    return (
        <li>
            <h3 style={{ color: "#009911" }}>{repo.title}</h3>
            <button onClick={() => props.onDelete(repo.id)}>
                Remover
            </button>
        </li>
    );
};

export default Repo;